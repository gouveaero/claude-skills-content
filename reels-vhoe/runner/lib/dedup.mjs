import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { REELS_DIR } from './projects.mjs';

const HISTORY_DEPTH = 5; // número de missões recentes a checar

// Pool de aeronaves conhecidas para extração de texto
const KNOWN_AIRCRAFT = [
  'B-2 Spirit', 'B-2', 'F-22 Raptor', 'F-22', 'A-10 Warthog', 'A-10',
  'F-14 Tomcat', 'F-14', 'EA-18G Growler', 'EA-18', 'Growler',
  'F-15E Strike Eagle', 'F-15E', 'F-15',
  'F-39E Gripen', 'Gripen', 'F-39',
  'MQ-9 Reaper', 'MQ-9',
  'RQ-4 Global Hawk', 'RQ-4',
  'RQ-170', 'MQ-25', 'MQ-28',
  'AF-1 Skyhawk', 'AF-1',
  'KC-390', 'Super Tucano',
  'F-35', 'F-35A', 'F-35B', 'F-35C',
  'Su-57', 'Su-35', 'Su-27',
  'MiG-29', 'MiG-31',
  'Rafale', 'Eurofighter', 'Typhoon',
  'B-52', 'B-1B',
  'C-130', 'MC-130J',
  'F-16', 'F-18', 'F/A-18',
  'AH-64 Apache', 'CH-47', 'UH-60',
];

export function buildHistory() {
  const missions = [];

  // 1. Lê _INDICE.md se existir
  const indicePath = join(REELS_DIR, '_INDICE.md');
  if (existsSync(indicePath)) {
    const missions_from_indice = parseIndice(readFileSync(indicePath, 'utf8'));
    missions.push(...missions_from_indice);
  }

  // 2. Lê headers YAML dos roteiros em backlog/ em_producao/ publicados/
  for (const folder of ['backlog', 'em_producao', 'publicados']) {
    const dir = join(REELS_DIR, folder);
    if (!existsSync(dir)) continue;

    let entries;
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { continue; }

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        // backlog: arquivo direto
        const content = safeRead(join(dir, entry.name));
        const yamlAircraft = extractYamlAircraft(content);
        const yamlTheme = extractYamlField(content, 'tema');
        const yamlCodinome = extractYamlField(content, 'codinome') || entry.name.replace('.md', '');
        if (yamlAircraft.length > 0 || yamlTheme) {
          missions.push({ codinome: yamlCodinome, aircraft: yamlAircraft, theme: yamlTheme || '' });
        }
      } else if (entry.isDirectory()) {
        // em_producao / publicados: pasta/roteiro.md
        const roteiroPath = join(dir, entry.name, 'roteiro.md');
        if (existsSync(roteiroPath)) {
          const content = safeRead(roteiroPath);
          const yamlAircraft = extractYamlAircraft(content);
          const yamlTheme = extractYamlField(content, 'tema');
          if (yamlAircraft.length > 0 || yamlTheme) {
            missions.push({ codinome: entry.name, aircraft: yamlAircraft, theme: yamlTheme || '' });
          }
        }
      }
    }
  }

  // 3. Lê CSV histórico (legendas dos reels publicados — últimas 11 com texto)
  const csvPath = join(REELS_DIR, 'report (1).csv');
  if (existsSync(csvPath)) {
    const csvMissions = parseCsvCaptions(readFileSync(csvPath, 'utf8'));
    missions.push(...csvMissions);
  }

  return missions;
}

export function checkDuplicate(history, tema, aircraft = []) {
  const recent = history.slice(-HISTORY_DEPTH);
  const warnings = [];

  const temaLower = (tema || '').toLowerCase();
  const aircraftLower = aircraft.map(a => a.toLowerCase());

  for (const m of recent) {
    // Verifica aeronaves repetidas
    for (const a of m.aircraft) {
      if (aircraftLower.some(ac => ac.includes(a.toLowerCase()) || a.toLowerCase().includes(ac))) {
        warnings.push(`Aeronave "${a}" aparece na missão recente "${m.codinome}".`);
      }
    }
    // Verifica tema semelhante (keyword match)
    if (m.theme) {
      const mThemeLower = m.theme.toLowerCase();
      const overlap = temaLower.split(' ').filter(w => w.length > 4 && mThemeLower.includes(w));
      if (overlap.length >= 2) {
        warnings.push(`Tema "${tema}" tem palavras em comum com missão recente "${m.codinome}" ("${m.theme}").`);
      }
    }
  }

  return warnings;
}

export function extractAircraftFromText(text) {
  const found = new Set();
  const textLower = (text || '').toLowerCase();
  for (const aircraft of KNOWN_AIRCRAFT) {
    if (textLower.includes(aircraft.toLowerCase())) {
      // Prefer full names
      const baseModel = aircraft.split(' ')[0];
      const alreadyHasFull = [...found].some(f => f.startsWith(baseModel) && f.length > baseModel.length);
      if (!alreadyHasFull) found.add(aircraft);
    }
  }
  return [...found];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeRead(path) {
  try { return readFileSync(path, 'utf8'); } catch { return ''; }
}

function extractYamlField(content, field) {
  const m = content.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

function extractYamlAircraft(content) {
  const m = content.match(/^aircraft:\s*\[(.+)\]$/m);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}

function parseIndice(content) {
  const missions = [];
  // Formato: "| NN_codinome | aircraft | theme | status | data |"
  const rowRe = /\|\s*(\S+)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|/g;
  let m;
  while ((m = rowRe.exec(content)) !== null) {
    const codinome = m[1].trim();
    if (codinome.startsWith('-') || codinome.toLowerCase() === 'codinome') continue;
    const aircraft = m[2].trim().split(',').map(s => s.trim()).filter(Boolean);
    const theme = m[3].trim();
    missions.push({ codinome, aircraft, theme });
  }
  return missions;
}

function parseCsvCaptions(csv) {
  const lines = csv.split('\n').slice(1); // skip header
  const missions = [];
  for (const line of lines) {
    const captionM = line.match(/,"([^"]{50,})"/);
    if (!captionM) continue;
    const caption = captionM[1];
    const aircraft = extractAircraftFromText(caption);
    if (aircraft.length > 0) {
      missions.push({ codinome: 'csv_historico', aircraft, theme: caption.slice(0, 60) });
    }
  }
  return missions;
}
