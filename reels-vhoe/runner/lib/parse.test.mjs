import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRoteiro } from './parse.mjs';

test('retém negativos e todas as linhas de vídeo, sem absorver a próxima cena', () => {
  const { cenas } = parseRoteiro(`## 4. Cenas
**CENA 1 — PRIMEIRA**
**Narração**: Primeira fala.
**Visual**: Perfil.
**Texto na tela**: PRIMEIRA

**CENA 2 — SEGUNDA**
**Narração**: Segunda fala.
**Visual**: Formação. Teste alternativo Kling: decolagem por texto.
**Texto na tela**: SEGUNDA

## 5. Narração completa
Texto de conferência que não pode virar overlay.

## 7. Vídeo
**Cena 1**
Track the aircraft with a stable camera.
Preserve all original surfaces.
Negative prompt: morphing, cockpit canopy
---
**Cena 2**
Keep both aircraft separate in level flight.
Negative prompt: merging aircraft, swapping identities

## 8. Legenda
Não é prompt.
`);
  assert.equal(cenas.length, 2);
  assert.equal(cenas[1].textoTela, 'SEGUNDA');
  assert.equal(cenas[0].promptKling.positive, 'Track the aircraft with a stable camera.\nPreserve all original surfaces.');
  assert.equal(cenas[0].promptKling.negative, 'morphing, cockpit canopy');
  assert.equal(cenas[1].promptKling.negative, 'merging aircraft, swapping identities');
  assert.doesNotMatch(cenas[1].promptKling.positive, /Legenda|Não é prompt/);
});

test('aceita roteiro legado sem seção 4 e vídeo sem negativos', () => {
  const { cenas } = parseRoteiro(`**CENA 1 — LEGADO**
**Narração**: Fala original.
**Visual**: Uma aeronave.
**Texto na tela**: LEGADO

## 7. Vídeo
**Cena 1**
Track one aircraft across the sky.
`);
  assert.equal(cenas[0].narracao, 'Fala original.');
  assert.equal(cenas[0].promptKling.positive, 'Track one aircraft across the sky.');
  assert.equal(cenas[0].promptKling.negative, '');
});
