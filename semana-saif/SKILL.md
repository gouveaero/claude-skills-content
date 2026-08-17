---
name: semana-saif
description: >-
  Orquestrador semanal de conteúdo da CLÍNICA do Dr. Saif (Zahnspange Home, @zahnspange_home, B2C
  pacientes, Werberecht). Use quando o usuário quiser "planejar a semana do Saif", "monta a Week NN do
  Saif/da clínica", "próxima semana de conteúdo Saif", "semana-saif", "planejamento semanal Zahnspange",
  ou der um brief de semana ("essa semana a gente vai fazer X"). A skill lê o Content_Calendar (o que já
  foi produzido), as tendências (last30days) e a performance da semana anterior, ACEITA UM BRIEF/DIREÇÃO
  do usuário e o material bruto disponível, planeja 2 vídeos + 3 carrosséis (cadência DURA) seguindo a
  base (09/03/08/Werberecht), e **APRESENTA O PLANO NO CHAT pra aprovação**. Só depois de aprovado
  escreve os MD (week plan + scripts) **+ o DOCX do planejamento junto** (English-only, sem PDF), e monta
  o pedido de footage ao Saif. A produção/render dos carrosséis é da skill `content-machine-clinic`.
  NUNCA escreve arquivo nem renderiza asset antes da aprovação no chat. NÃO é a skill de render.
  ⚠️ NÃO planeja SECRET Align: a semana da @secret_aligners é planejada no workspace
  🚀_Projects/Secret_Align/ (base própria: 03_CONTENT_OPS.md + 01_BRAND/).
---

# semana-saif — orquestrador semanal da clínica (Zahnspange Home)

Planeja a semana da **@zahnspange_home** e **valida com o Gustavo no chat antes de gravar qualquer
coisa**. É o "cérebro" semanal; a produção visual é da [`content-machine-clinic`]. Bastidor: lê a base,
propõe, só materializa depois do "aprovado".

**🔀 Escopo pós-migração (23–24/07/26):** esta skill é **CLÍNICA-ONLY**. A **SECRET Align** tem workspace
próprio `🚀_Projects/Secret_Align/` — a semana SECRET é planejada LÁ (base: `Secret_Align/03_CONTENT_OPS.md`
+ `01_BRAND/BRAND_FOUNDATION.md` + `VOICE.md`, treatment-first). Se o brief pedir SECRET, avise e aponte o
workspace — não misture as duas contas num plano.

**Base clínica (projeto Saif):** `08_CONTENT_OPS.md` (cadência, template semanal §9, ritual, Drive/naming)
· `09_BRAND_VOICE_BASELINE.md` (voz/pilares/tokens da clínica) · `03_MARKET_RESEARCH.md` (arquétipos/reel
ideas) · `CLAUDE.md` (regras 1–8) · o `Content_Calendar` na Shared Drive "Zahnspange Home" (o que JÁ foi
produzido — não repetir ângulo) · `Brand_Sources/Zahnspange_Home/` (banco de imagem real).

## 1. Entrada — o BRIEF da semana (a skill é DIRIGÍVEL)

Antes de planejar, monte o brief a partir de **três fontes** (sempre, nesta ordem):

1. **Direção do usuário (prioridade máxima).** Se o Gustavo disser "essa semana a gente vai fazer X / foca em
   Y / usa esse material", **isso manda** — o plano se molda ao brief, não ao contrário. Sem direção
   explícita, siga o rumo travado "continuar + afiar" a baseline.
2. **Material bruto disponível.** Pergunte/verifique o que já existe pra editar nesta semana — ex.: **uma
   pasta de vídeos+imagens** do Saif, antes/depois novos, b-roll de clínica. Se houver, **planeje peças em
   cima desse material**. Se o usuário apontar uma pasta, escaneie-a (nomes/contagem) e cite os arquivos no plano.
3. **Estado + pesquisa.** O que já saiu no `Content_Calendar` (evitar repetição) + tendências (`last30days`,
   vídeo dentista/ortho) + **performance da semana anterior** (ver `references/performance-source.md`).

> A skill **não é um gerador fixo**: ela é um planejador que **negocia** com o brief do usuário e o material
> que existe. O default (sem brief) é a baseline; com brief, o brief vence.

## 2. Fluxo (com o GATE de aprovação no chat)

```
brief (§1) → planeja a Week → APRESENTA O TEXTO DO PLANO NO CHAT → [GATE]
   ├─ usuário aprova  → escreve MD + DOCX + scaffold das pastas + pedido de footage
   └─ usuário edita   → ajusta no chat e reapresenta → [GATE] de novo
```

- **Planeja:** **2 vídeos + 3 carrosséis** (template §9 do `08_CONTENT_OPS`). Tudo em **inglês** (educação de
  paciente acessível + autoridade clínica; inglês SIMPLES, sem idiom), **Werberecht por peça** (regra 1),
  **autoridade = Fachzahnarzt für KFO, nunca o cargo ÖGAO** (regra 4); perfil pessoal > clínica (regra 5).
  Cada peça: hook (linha 1) — **default = pergunta/curiosidade; nunca negação-primeiro ("No, X does not...")**
  —, arquétipo/ângulo, legenda final (só o texto — regra 7), e **o footage a pedir ao Saif**.
- **Diversidade de tema:** as 5 peças não repetem tema entre si; reels miram VIRAL (curiosity-gap / mito /
  reframe), não reforçam o carrossel.
- **APRESENTA NO CHAT (gate — obrigatório):** mande o **texto do plano inteiro aqui no chat** (as 5 peças +
  pedidos de footage + open items). **NÃO escreva nenhum arquivo ainda.** Espere o "aprovado" ou as edições.
- **Itera no chat** até aprovar.

## 3. Pós-aprovação — grava LOCAL (editável) + Drive (só FINAIS)

Só depois do "aprovado". **Editável mora LOCAL** em `🚀_Projects/Saif/Content_Production/Week_<NN>_<MonDD>/`;
**o Drive compartilhado só recebe FINAIS** (DOCX plano · DOCX roteiros · Carousels PNG · Videos MP4).

**LOCAL (editável):**
1. `_plan/Zahnspange_Home___WEEK_PLAN.md` (template §9 preenchido) + `_plan/Zahnspange_Home___FOOTAGE_REQUEST.md`
   (pedido de footage ao Saif, incl. **cota de antes/depois da semana**).
2. **1 pasta por peça** `Zahnspange_Home/W<NN>_.../` com `SCRIPT.md` (**em inglês**, só o texto — regra 7; sem
   linha PT) **e** `<slug>.docx` (pandoc).

**DRIVE (finais)** → `Content_Calendar/Zahnspange_Home/Week_<NN>_<MonDD>/`:
3. **`_WEEK_PLAN.docx`** (`pandoc _WEEK_PLAN.md -f markdown-smart -o _WEEK_PLAN.docx`; ver `weekly-process.md §DOCX`).
4. **`_SCRIPTS.docx`** — consolidando os `SCRIPT.md` de todas as peças, **gerado A PARTIR do build** (um slide
   por bloco, tudo rotulado — ver `make_scripts_doc.py` da última Week), sem em-dash.
5. (na produção) `Carousels/<piece>/NN.png` + `Videos/<piece>.mp4`.

**Render dos carrosséis** (PNG → Drive) = **`content-machine-clinic`** (edita local, publica só o PNG final).

## 4. Decisões travadas

- **Performance (semana anterior):** opção **A — Meta MCP com fallback gracioso**. Tenta insights do IG
  (alcance/engajamento por post); **cold-start / sem dados → degrada** pra `last30days` + baseline, e liga o
  "top performers" sozinho quando houver dado. Detalhe em `references/performance-source.md`.
  ⚠️ **Nunca invente números** (regra 3) — sem dado real, diga que veio da baseline/tendências.
- **Cota de antes/depois:** **2 casos/semana** a pedir ao Saif (configurável pelo brief). Sempre ClinCheck 3D
  como "antes/depois digital" quando faltar consentimento (Werberecht).
- **Entrega em `.docx`** via `pandoc` (`-f markdown-smart`, sem em-dash). **Sem PDF** (mudança jul/2026).
- **Gatilho:** o Gustavo roda a skill por semana (manual). Dá pra agendar depois.

## Decisão 21/07/26 — dedup visual cross-week + capas variadas

- **Nenhuma imagem repete em semanas consecutivas.** Toda imagem consumida é logada via
  `catalog_lookup.py use`; ao planejar, checar `used` + os builds das semanas anteriores. Capas mantêm o
  ESTILO CLÁSSICO (texto à esquerda + cutout transparente na posição do Saif); o que varia é a IMAGEM do
  cutout (Saif, alinhador, produto, modelo) — nunca capa-que-parece-card (reprovado 21/07).
- **Footage request** deve pedir também material de capa variado (produto, cena, paciente consentido, criança
  sem rosto p/ peças de pais) — o banco não tem modelo-com-alinhador nem criança real compliant.
- **IA liberada com QA** (política 21/07): gerar quando o real não for ideal (ferramenta = **Magnific**);
  luvas/anatomia corretas; sinalizar ao Saif os cards gerados. Produção visual = `content-machine-clinic`.

## Cadência é DURA (lição 22/07)

- **2 vídeos + 3 carrosséis. Exatamente.** Quando o Gustavo/Saif introduz uma peça nova no meio da semana,
  ela **SUBSTITUI** um slot — não soma. Pergunte/afirme explicitamente qual peça sai; nunca entregue 3 vídeos
  "porque o asset já existia".
- Asset pronto que perdeu o slot **não vai pro Drive da semana** — fica anotado como candidato da semana seguinte.
- **Post multi-arquivo (carrossel de vídeos) = 1 slot de vídeo** e entra no Drive em **pasta própria**
  `Videos/W<NN>_V<n>_<slug>/01_x.mp4…` — nunca arquivos soltos no Videos/.

## Mandamentos

1. **GATE primeiro.** Nunca grave arquivo nem renderize asset antes do "aprovado" no chat. O plano vai como
   **texto no chat**.
2. **Dirigível.** O brief do usuário e o material que existe **moldam o plano** — não force a baseline por cima.
3. **Não inventa número** (regra 3). Sem dado de performance real → baseline/tendências, declarado.
4. **Drive só FINAIS** (`_WEEK_PLAN.docx` + `_SCRIPTS.docx` + `Carousels/` PNG + `Videos/` MP4); **todo editável**
   mora **LOCAL** em `Saif/Content_Production/` (mapa em `_README.md`).
5. Produção visual = `content-machine-clinic` (skill separada). Esta aqui **planeja**, não renderiza.
6. **Clínica-only.** SECRET Align = workspace `Secret_Align/` (não entra no plano desta skill).
