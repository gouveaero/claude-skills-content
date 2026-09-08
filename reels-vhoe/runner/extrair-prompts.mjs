#!/usr/bin/env node
/**
 * Extrai os prompts por cena de um roteiro de reel e imprime JSON no stdout.
 *
 * Substitui o papel que os antigos gerar-imagens.mjs / gerar-videos.mjs tinham
 * de "preparar a lista de cenas": agora QUEM gera é o agente, chamando a MCP do
 * Magnific (Nano Banana Pro p/ imagem, Kling 2.5 p/ vídeo). Este script só faz a
 * parte determinística — ler o markdown e devolver os prompts limpos.
 *
 * Usage:
 *   node extrair-prompts.mjs --file <path-to-roteiro.md>
 *
 * Saída (stdout): JSON
 *   {
 *     "codinome": "01_f15e_104a0",
 *     "tema": "...", "aircraft": ["F-15E"], "duration_target": "padrao",
 *     "scene_count": 12,
 *     "cenas": [
 *       { "label": "cena_01", "num": 1, "titulo": "...",
 *         "promptNanoBanana": "Cinematic photograph of ...",
 *         "promptKling": { "positive": "An F-15E ...", "negative": "morphing, ..." } },
 *       ...
 *     ],
 *     "faltando": { "imagens": ["cena_07"], "videos": [] }
 *   }
 */

import { parseRoteiroFile } from './lib/parse.mjs';

const args = process.argv.slice(2);
function getArg(name, def = null) {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : def;
}

const filePath = getArg('--file');
if (!filePath) {
  console.error('Uso: node extrair-prompts.mjs --file <path-to-roteiro.md>');
  process.exit(1);
}

let header, cenas;
try {
  ({ header, cenas } = parseRoteiroFile(filePath));
} catch (err) {
  console.error(`[extrair-prompts] ${err.message}`);
  process.exit(1);
}

const cenasOut = cenas.map((c) => ({
  label: c.label,
  num: c.num,
  titulo: c.titulo,
  // promptNanoBanana no roteiro é um objeto { prompt: "..." }; devolve só a string.
  promptNanoBanana: c.promptNanoBanana
    ? (typeof c.promptNanoBanana === 'string' ? c.promptNanoBanana : c.promptNanoBanana.prompt)
    : null,
  promptKling: c.promptKling || null, // { positive, negative } ou null
}));

const out = {
  codinome: header.codinome || null,
  tema: header.tema || null,
  aircraft: header.aircraft || [],
  duration_target: header.duration_target || null,
  scene_count: header.scene_count || cenasOut.length,
  cenas: cenasOut,
  faltando: {
    imagens: cenasOut.filter((c) => !c.promptNanoBanana).map((c) => c.label),
    videos: cenasOut.filter((c) => !c.promptKling).map((c) => c.label),
  },
};

process.stdout.write(JSON.stringify(out, null, 2) + '\n');
