# Formato do roteiro (o que `runner/lib/parse.mjs` lê)

O roteiro é um markdown com header YAML e 10 blocos numerados. O runner depende só do header, do bloco §4 (cenas) e dos blocos §6 e §7 (prompts). Os outros blocos servem ao humano, ao gate do `roteiro-council` e à legenda do post. Exemplo real completo: `Reels_Feitos/em_producao/02_gripen_soberano/roteiro.md`.

## Header YAML

```yaml
---
codinome: 02_gripen_soberano
tema: "Soberania não se compra, se constrói. O F-39E Gripen montado no Brasil"
aircraft: ["F-39E Gripen"]
duration_target: curto          # curto | padrao | longo
scene_count: 9
scene_duration_s: 7
created: 2026-06-26
provider: magnific              # imagem: Nano Banana Pro · vídeo: Kling 2.5
council_reviewed: true          # marcado após o gate 1.4
---
```

`aircraft` é lista JSON numa linha. `scene_count` e `scene_duration_s` são inteiros (defaults 12 e 7 se faltarem).

## Os 10 blocos

| # | Bloco | Quem lê |
|---|---|---|
| 1 | Título + ficha (formato, pilar, tom, ritmo) num bloco de código | humano |
| 2 | 3 Hooks de narração (marcar o RECOMENDADO) | humano + council |
| 3 | 3 Hooks visuais / texto na tela | humano |
| 4 | Estrutura cena a cena | **runner** (narração, visual, texto) |
| 5 | Narração completa (TTS) | humano (conferência) |
| 6 | Prompts Nano Banana Pro (imagem) | **runner** |
| 7 | Prompts Kling 2.5 (vídeo) | **runner** |
| 8 | Legenda Instagram (CTA duplo + hashtags) | vira `legenda.txt` |
| 9 | Sugestão de música | humano |
| 10 | Notas de produção | humano |

## §4 Cena a cena (regras do parser)

- Cabeçalho da cena: `**CENA N — TÍTULO (0s-7s)**`. Precisa da palavra CENA, do número e de um traço (`—`, `–` ou `-`) antes do título. O intervalo de tempo entre parênteses é opcional.
- Campos, um por linha, em negrito e com dois-pontos: `**Narração**:`, `**Visual**:`, `**Texto na tela**:`. Aliases aceitos: `Narracao`/`Narration`; `Cena visual`/`Descrição visual`; `Texto overlay`/`Overlay`.
- A narração de cada cena é exatamente o texto que vai pro TTS (`montar-reel-plan.mjs`). Nada de indicação de direção dentro dela.
- A soma das narrações precisa bater com o perfil de duração (`curto` ~150 palavras, `padrao` ~225, `longo` ~300).

```markdown
**CENA 1 — MONTADO NO BRASIL (0s-7s)**
**Narração**: "Esse caça é montado aqui no Brasil. Voa pela FAB. E carrega um dos mísseis mais letais do mundo."
**Visual**: Close-up three-quarter frontal do F-39E Gripen em solo na base de Anápolis ao amanhecer, marcações da FAB visíveis.
**Texto na tela**: MONTADO NO BRASIL | VOA PELA FAB
```

## §6 Prompts de imagem

- O título da seção começa com `## 6.` (o parser isola a seção por esse prefixo).
- Um sub-bloco `### Cena N` por cena, cada um com um bloco ```json contendo `{ "prompt": "..." }`.
- Prompt em inglês, texto puro: começa com `Cinematic photograph of`, tem ângulo de câmera, iluminação e color grading, termina com `film grain`. Sem negative prompt e sem código hex (o modelo renderiza o texto na imagem).

```markdown
## 6. Prompts — NanoBanana Pro (imagem)

### Cena 1

```json
{ "prompt": "Cinematic photograph of a Saab JAS-39E Gripen ... film grain texture" }
```
```

## §7 Prompts de vídeo

- O título da seção começa com `## 7.`.
- Por cena: `**Cena N**`, depois o prompt positivo (uma ou mais linhas), depois uma linha `Negative prompt: ...` e um `---` separando da próxima cena. O negative é opcional.
- Positivo em inglês: verbo de câmera (dolly in, lateral tracking, orbit, tilt up, boom, pull back), ação contínua, termina com `ultra realistic military footage`.

```markdown
## 7. Prompts — Kling 2.5 (vídeo)

**Cena 1**
A Saab JAS-39E Gripen fighter jet sits on a military airbase tarmac at dawn, camera performs a slow dolly in ... ultra realistic military aviation footage

Negative prompt: cartoon, anime, morphing, deformation, blurry, static, jittery, wrong aircraft type

---
```

## Checagem antes da Fase 2

```bash
node .claude/skills/reels-vhoe/runner/extrair-prompts.mjs --file "Reels_Feitos/backlog/NN_codinome.md"
```

`faltando.imagens` e `faltando.videos` precisam vir vazios e `cenas.length` igual a `scene_count`.
