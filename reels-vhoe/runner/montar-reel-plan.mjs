#!/usr/bin/env node
/**
 * montar-reel-plan.mjs — Fase 6 (Montagem): gera narração + edit_plan.json + timings.json
 * a partir de um roteiro.md, sincronizando legendas word-level pela narração.
 *
 * Lê as cenas do roteiro (via lib/parse.mjs → cenas[].narracao), chama o ElevenLabs
 * `with-timestamps` (alinhamento exato do texto enviado — melhor que Whisper p/ "F-39E"/"150"),
 * deriva fronteiras de cena (corte no meio das pausas), desacelera clipes cuja cena narra mais
 * que o clipe dura, e quebra a narração em legendas curtas word-level.
 *
 * Uso:
 *   ELEVENLABS_API_KEY=sk_... node montar-reel-plan.mjs \
 *     --dir "Reels_Feitos/em_producao/NN_codinome" [--config <.eleven.json>]
 *
 * Espera em <dir>: roteiro.md + videos_kling/cena_NN_v1.mp4 (1..scene_count).
 * Escreve em <dir>: narracao.mp3, edit_plan.json, timings.json (+ cena_NN_v1_slow.mp4 se preciso).
 *
 * Config (.eleven.json, opcional — voice_id NÃO é segredo; a key vem de env):
 *   { "voice_id": "7i7dgyCkKt4c16dLtwT3", "model_id": "eleven_multilingual_v2",
 *     "voice_settings": { "stability": 0.45, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": true } }
 */
import { writeFile, readFile } from 'fs/promises';
import { execSync } from 'child_process';
import { parseRoteiroFile } from './lib/parse.mjs';

const args = process.argv.slice(2);
const getArg = (n, d = null) => { const i = args.indexOf(n); return i !== -1 ? args[i + 1] : d; };
const DIR = getArg('--dir');
const CONFIG = getArg('--config');
const FPS = 30;
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FFPROBE = process.env.FFPROBE || 'ffprobe';
const KEY = process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_KEY;
if (!DIR) { console.error('uso: --dir <pasta da missão>'); process.exit(1); }
if (!KEY) { console.error('faltando ELEVENLABS_API_KEY no env'); process.exit(1); }

// palavras de marca que ganham destaque dourado (emphasis); números/modelos viram keyword (laranja) automático
const EMPH = new Set((getArg('--emph') || 'brasil,brasileiro,fab,soberania,soberano,nacional,vhoe,gripen,meteor,invisível,stealth').split(',').map(s => s.trim().toLowerCase()).filter(Boolean));

let cfg = { voice_id: '7i7dgyCkKt4c16dLtwT3', model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true } };
if (CONFIG) { try { cfg = { ...cfg, ...JSON.parse(await readFile(CONFIG, 'utf8')) }; } catch (e) { console.error('config inválida:', e.message); } }

// 1) cenas do roteiro
const { cenas } = parseRoteiroFile(`${DIR}/roteiro.md`);
const ordered = cenas.slice().sort((a, b) => a.num - b.num);
const SCENES = ordered.map(c => (c.narracao || '').trim()).filter(Boolean);
if (SCENES.length !== ordered.length) console.error('AVISO: alguma cena sem narração no §4 do roteiro');

const fullText = SCENES.join(' ');
const sceneRanges = []; { let p = 0; for (const s of SCENES) { sceneRanges.push([p, p + s.length]); p += s.length + 1; } }

// 2) ElevenLabs with-timestamps
const url = `https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice_id}/with-timestamps?output_format=mp3_44100_128`;
const res = await fetch(url, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ text: fullText, model_id: cfg.model_id, voice_settings: cfg.voice_settings }) });
if (!res.ok) { console.error(`ElevenLabs HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`); process.exit(2); }
const data = await res.json();
await writeFile(`${DIR}/narracao.mp3`, Buffer.from(data.audio_base64, 'base64'));
const A = data.alignment, cs = A.character_start_times_seconds, ce = A.character_end_times_seconds;
if (A.characters.length !== fullText.length) console.error(`AVISO: chars ${A.characters.length} != texto ${fullText.length}`);

// 3) palavras com timing + cena
const words = [];
for (let i = 0; i < fullText.length;) {
  if (/\s/.test(fullText[i])) { i++; continue; }
  let j = i; while (j < fullText.length && !/\s/.test(fullText[j])) j++;
  const raw = fullText.slice(i, j);
  const scene = sceneRanges.findIndex(([a, b]) => i >= a && i < b);
  const clean = raw.replace(/[.,:;!?—–"]/g, '').toLowerCase();
  // pula tokens que são só pontuação (ex.: travessão "—" isolado virava uma legenda sem sentido)
  if (!clean) { i = j; continue; }
  let emphasis = 'normal';
  if (/\d/.test(raw)) emphasis = 'keyword'; else if (EMPH.has(clean)) emphasis = 'emphasis';
  words.push({ text: raw, start: cs[i] ?? 0, end: ce[j - 1] ?? 0, scene, emphasis });
  i = j;
}
const audioDur = ce[ce.length - 1] ?? words[words.length - 1].end;

// 4) fronteiras de cena (meio da pausa) + clipes (slow se a cena > clipe)
const scenes = SCENES.map((_, s) => { const ws = words.filter(w => w.scene === s); return { scene: s + 1, start: ws[0].start, end: ws[ws.length - 1].end }; });
const cuts = scenes.map((sc, s) => s === scenes.length - 1 ? audioDur : (scenes[s].end + scenes[s + 1].start) / 2);
const probe = f => parseFloat(execSync(`${FFPROBE} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${DIR}/videos_kling/${f}"`).toString().trim());

const v1 = []; let prev = 0;
for (let s = 0; s < SCENES.length; s++) {
  const num = ordered[s].num;
  const dur = +(cuts[s] - prev).toFixed(3);
  let clip = `cena_${String(num).padStart(2, '0')}_v1.mp4`;
  const origLen = probe(clip);
  if (dur > origLen - 0.05) {
    const factor = ((dur + 0.25) / origLen).toFixed(4);
    const slow = clip.replace('.mp4', '_slow.mp4');
    execSync(`${FFMPEG} -nostdin -y -loglevel error -i "${DIR}/videos_kling/${clip}" -filter:v "setpts=${factor}*PTS" -an -c:v libx264 -crf 18 -pix_fmt yuv420p "${DIR}/videos_kling/${slow}"`);
    console.error(`  ↳ cena ${num}: desacelerada x${factor} p/ cobrir ${dur}s`);
    clip = slow;
  }
  v1.push({ clip, source_in: 0, source_out: dur, zoom: 1.0, y_offset: 0, slug: `cena-${String(num).padStart(2, '0')}` });
  prev = cuts[s];
}

// 5) legendas: chunks de ≤4 palavras, quebra em pontuação forte; contínuas (end = início do próximo)
const STRONG = /[.:;—!?]$/;
const groups = [];
for (let s = 0; s < SCENES.length; s++) {
  let chunk = []; const flush = () => { if (chunk.length) { groups.push(chunk); chunk = []; } };
  for (const w of words.filter(w => w.scene === s)) { chunk.push(w); if (STRONG.test(w.text) || chunk.length >= 4) flush(); }
  flush();
}
const subtitle_track = groups.map((ch, i) => ({
  start: +ch[0].start.toFixed(3), end: +((groups[i + 1]?.[0].start) ?? audioDur).toFixed(3), style: 'highlight_accent',
  words: ch.map(w => ({ text: w.text, start: +w.start.toFixed(3), end: +w.end.toFixed(3), emphasis: w.emphasis })),
}));

const plan = {
  name: (DIR.split('/').pop() || 'reel').replace(/[^a-z0-9-]/gi, '-').toLowerCase(),
  aspect: '9:16', fps: FPS, resolution: [1080, 1920], target_duration_s: +audioDur.toFixed(3),
  v1_main: v1, transitions: [], subtitle_track,
  music: [{ file: 'narracao.mp3', start_ms: 0, volume_db: 0 }],
  color_correction: { css_filter: 'contrast(1.06) saturate(1.08)' },
};
await writeFile(`${DIR}/edit_plan.json`, JSON.stringify(plan, null, 2));
await writeFile(`${DIR}/timings.json`, JSON.stringify({ audioDur, scenes, cuts, clips: v1.map(c => ({ clip: c.clip, dur: c.source_out })), captions: subtitle_track.length }, null, 2));

console.log(`OK | cenas ${SCENES.length} | narração ${audioDur.toFixed(2)}s | palavras ${words.length} | legendas ${subtitle_track.length}`);
v1.forEach(c => console.log(`  ${c.slug}: ${c.source_out.toFixed(2)}s → ${c.clip}`));
const total = v1.reduce((a, c) => a + c.source_out, 0);
console.log(`timeline ${total.toFixed(2)}s (áudio ${audioDur.toFixed(2)}s)${Math.abs(total - audioDur) > 0.1 ? ' ⚠️ DESALINHADO' : ' ✅'}`);
