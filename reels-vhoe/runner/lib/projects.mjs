import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

// lib/ → runner/ → reels-vhoe/ → skills/ → .claude/ → Projeto_Vhoe/
const __dirname = dirname(fileURLToPath(import.meta.url));
const RUNNER_DIR = join(__dirname, '..');       // runner/
const SKILL_DIR = join(RUNNER_DIR, '..');       // reels-vhoe/
const SKILLS_DIR = join(SKILL_DIR, '..');       // skills/
const CLAUDE_DIR = join(SKILLS_DIR, '..');      // .claude/
// Override: VHOE_DIR aponta pra raiz do projeto quando a skill não está em <Projeto>/.claude/skills/
const VHOE_DIR = process.env.VHOE_DIR || join(CLAUDE_DIR, '..');  // Projeto_Vhoe/

export const REELS_DIR = join(VHOE_DIR, 'Reels_Feitos');

export function resolveReelDir(codinome) {
  const dir = join(REELS_DIR, 'em_producao', codinome);
  mkdirSync(join(dir, 'imagens'), { recursive: true });
  mkdirSync(join(dir, 'imagens_escolhidas'), { recursive: true });
  mkdirSync(join(dir, 'videos_kling'), { recursive: true });
  return dir;
}

export function resolveBacklogPath(codinome) {
  return join(REELS_DIR, 'backlog', `${codinome}.md`);
}

export function resolveImagesDir(codinome) {
  return join(REELS_DIR, 'em_producao', codinome, 'imagens');
}

export function resolveChosenImagesDir(codinome) {
  return join(REELS_DIR, 'em_producao', codinome, 'imagens_escolhidas');
}

export function resolveVideosDir(codinome) {
  return join(REELS_DIR, 'em_producao', codinome, 'videos_kling');
}

export function resolveIndice() {
  return join(REELS_DIR, '_INDICE.md');
}
