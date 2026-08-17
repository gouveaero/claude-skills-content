---
name: content-machine-secret
description: >-
  Use when the task is a carousel (or single image post) for Dr. Saif's B2B account SECRET Align
  (@secret_aligners) — the SECRET clear aligner system (SECRET Navigator = internal planning tool, not
  the brand), whose audience is orthodontists/dentists (NOT patients). Triggers: "carrossel SECRET Align", "carrossel SECRET",
  "post do SECRET Navigator", "carrossel B2B do Saif", or rendering a C<n> of the SECRET_Align week in
  the Saif Content_Calendar. It is EN premium-minimal, rule-6 hygiene, and treatment-first (copy source =
  BRAND_FOUNDATION.md + VOICE.md). PREFER this over content-machine-pro and content-machine-clinic whenever the brand is
  SECRET. NOT for the clinic Zahnspange Home (use content-machine-clinic), other clients
  (content-machine-pro), decks/palestra (slidev), or a single news cover (newsroom-pro).
---

> **⚠️ OVERRIDE 23/07/26 (áudio do Saif):** a **SECRET vende TRATAMENTO, não planejamento**. A tagline **"the aligner planning software" está PROIBIDA** como identidade. Fonte de copy = workspace próprio `🚀_Projects/Secret_Align/01_BRAND/BRAND_FOUNDATION.md` + `VOICE.md` (não mais o editorial-line antigo). Navigator = ferramenta interna, citada com moderação.

# Content Machine SECRET — carrossel premium do SECRET Align (@secret_aligners)

Fork mono-marca do `content-machine-pro` para **UMA** marca: **SECRET Align** — empresa de **alinhadores
transparentes** (SECRET Clear Aligner System; o Navigator é o software de planejamento interno, não a marca),
**B2B, comprador = ortodontista**. Voz **premium-minimal EN**, higiene
**regra 6**. Herda o pipeline HTML 1080×1350 → PNG do pro; troca a paleta "derivada" por **1 preset travado**
(teal/Poppins), o Higgsfield pelo **MCP Magnific**, e adiciona um **gate regra-6 por slide** + o **gate
anti-demo/substância**. Bastidor invisível — o usuário vê só o resultado.

> **Marca gêmea:** carrossel da clínica (Zahnspange Home, B2C, Werberecht) → use **`content-machine-clinic`**.
> Esta skill é **SECRET-only**; nunca produza conteúdo de clínica aqui.

## Antes de responder: leia as referências (nesta ordem)

- **[references/design-system-secret.md](references/design-system-secret.md)** — o **sistema visual TRAVADO**
  do SECRET (preset teal/Poppins, frame de computador, logo, CTA, imagery). **Leia primeiro.** Onde conflitar,
  **este arquivo + impeccable-baked.md vencem o Bloco 6** do system-prompt do pro. **§5.1 = diretrizes de
  modificação (ritmo visual + centralização de imagem) — aplicar em TODA seção** (statement/software/typographic,
  ~metade das slides sem `.scr`, frames centralizados e casados à frase).
- **[references/hygiene-gate-secret.md](references/hygiene-gate-secret.md)** — o **gate regra-6 por slide**.
  **Rode ANTES de exportar PNG**; bloqueia o export se algo não passar.
- **[references/magnific-images.md](references/magnific-images.md)** — sourcing de imagem via **Magnific**
  (textura teal abstrata + screenshot real do software no frame de PC).
- **[references/impeccable-baked.md](references/impeccable-baked.md)** — regras de UI + checklist pré-export.
- **(modo standalone)** `references/system-prompt.md` + `banco-de-headlines.md` + `filtro-editorial.md` — o
  cérebro do pro, **calibrado na voz SECRET** (abaixo) antes do render.

## A LINHA EDITORIAL — treatment-first (fonte canônica: `Secret_Align/01_BRAND/BRAND_FOUNDATION.md` + `VOICE.md`)

> **A SECRET vende TRATAMENTO** (áudio Saif 23/07). O herói é o resultado no dente; a tecnologia do alinhador (3-layer, scalloped edge, menos refinements) é o porquê; o software é ferramenta. **Num B2B competente, previsibilidade lê como confiabilidade** — o inimigo não é a repetição, é a **falta de prova**. A prova vem **dos casos** (tratamento real), nunca de uma tese sobre "planejamento".

**Pilares (por peso de prova):**
1. 🥇 **The Case** (espinha, **≥1 por semana**) — caso difícil real e anonimizado: *caso → a jogada de
   planejamento → a lógica do resultado*. É o que para o scroll (história com um problema) e o único pilar que
   **não dá pra falsificar**. Ex.: *"Open bites relapse when treatment ignores the tongue."*
2. 🥈 **Feature Teardown** — uma capability do Navigator, problema → mecanismo → prova, **screenshot real** no
   `.scr`. Ex.: *"Root control was invisible until you could watch it move."*
3. 🧂 **Predictability / Proof** (tempero, teto **~1 em 4**, NÃO pilar) — afirmação declarativa sobre o
   **tratamento previsível**. Sozinha vira feed-de-manifesto vazio; **pareie sempre com prova na mesma peça**.
   Ex.: *"The aligner is a commodity. The treatment is not."* (nunca *"the plan is not"* — planejamento não é o
   produto; ⚠️ testar leitura — pode soar "o que você comprou é lixo").
4. 🎪 **Congress / Engineered in Austria** (ocasional, **só com footage de evento**; NÃO evergreen) — prova de
   que o planejamento SECRET é ensinado em nível de sociedade. Ocioso no gap Jul-Ago.

**Regras da linha:**
- **Variedade vem dos CASOS, não de matriz.** As lentes são só formas de *entrar* num caso/feature (Teardown ·
  Myth→Mechanism · The Parameter [lidera com número/spec] · Field Note · Two Approaches [plano A vs B, **nunca
  marca vs marca**]) — não um eixo a satisfazer.
- **Guia mole (não trava o slot):** não repita o mesmo pilar em 3 posts seguidos; **sem inventário, publique a
  peça mais forte disponível** — nunca segure um slot pela regra.
- **Produza do `_AssetBank/`**, não de pedido ao vivo (todo dump do Saif é cortado em 8-10 screenshots/clipes
  numerados e tagueados por pilar). A restrição da conta é **matéria-prima**, não design editorial.
- **Medição:** anote `saves` + `DMs/demo` + `shares` por peça (não likes) — leading indicator B2B.
- **Distribuição:** a linha é **camada de credibilidade**, não motor de demanda — casada com o alcance/DMs do
  Saif + congresso + rede ÖGAO + lista de usuários. CTA sempre com um caminho "try it on one case".

## Formato: carrossel NÃO é o único (nota 27/07)

Um slot de estático pode ser **imagem única (`P`)** em vez de carrossel — mesmo sistema visual travado (Swiss Grid mint), só 1 card. Use `P` quando o ângulo cabe numa frase (quote-card, statement de posicionamento, product-macro). Base: análise de 2.667 posts de marcas de alinhadores — a imagem única é formato de primeira classe nelas (Spark 498 FEED × 86 carrossel), e a SECRET só produzia carrossel. Padrões e arquétipos: `Secret_Align/02_REFERENCES/COMPETITOR_PATTERNS.md`. Banco de ângulos prontos (com marcação `C`/`P`): `Content_Production/_concepts/APPROACH_BANK_2607.md`. Mix sugerido na semana: **2 carrosséis + 1 imagem única**, revezando a linguagem dominante (§5.1) entre as peças.

## Dois modos

- **Render-default (orquestrador — padrão):** você **recebe a copy de slide já pronta** (do `SCRIPT` da Week,
  escrito pela `semana-saif`) + as imagens. Você **não escreve copy**. Seu trabalho: aplicar o preset, montar
  as imagens (Magnific), **rodar os gates** e **renderizar os PNGs**.
- **Standalone-editorial (peça avulsa):** roda o cérebro editorial do pro (briefing → 10 headlines → espinha →
  validação → texto), porém na **voz SECRET**: premium-minimal, **sem emoji, sem "!"**, hook na linha 1, **≤5
  hashtags** (`#clearaligners #secretalign #orthodontist #alignerstreatment`), frases curtas com ponto, **sem
  travessão**. Escolha o pilar pela linha editorial acima. Depois cai no mesmo render.

## Substância — gate anti-demo (lição do roteiro-council)

**Treatment-first + anti-filler (lição W03).** O Saif rejeitou os 3 carrosséis da W03 (*"I didn't understand a word, it's just a filling of text"* + *"DON'T SEND ME AI TEXT AGAIN WITHOUT READING IT"*, 23/07). Um carrossel que só **mostra a tela** ou **explica o óbvio** (aula de staging/attachment que o ortodontista já sabe) é dump — ninguém salva. Siga a **estrutura canônica June-caption + barra "so what"** em `Secret_Align/01_BRAND/VOICE.md §4`. Antes de renderizar, exija **substância**:
- **Stake real** — dor clínica/negócio concreta, não abstração de vendor. Ex.: *"You can't plan around bone you
  can't see."*
- **Mecanismo** — a frase que o ortodontista **printa** (por que o jeito antigo falha). Ex.: *"A library 3D
  model is an average. Your patient's roots are not."*
- **Especificidade** — um cenário nomeado (*"maxillary expansion, root at the cortical plate"*), não genérico.
- **Definir o produto cedo** — *"SECRET, the clear aligner system"* logo no começo (NUNCA *"the aligner planning software"*; o Navigator é ferramenta, citado no máx 1x).
- **Formato save-worthy** — checklist, reveal/comparação (biblioteca vs CBCT), mito/POV, ou case-decision story.
- **Through-line da semana** — uma tese que amarra as peças.
- **Gate "so what" (slide a slide):** um ortodontista **aprende/sente algo específico** aqui, ou é frase que **qualquer marca** escreveria? Genérico → corta. Vender **tratamento/resultado**, não explicar o óbvio.
- **Terminologia travada:** "aligners" (**NUNCA "trays"** — Saif 23/07) · "treated/treatment" (nunca "planned/planning" como produto) · produto = "SECRET, the clear aligner system".
- **Leitura humana obrigatória antes de mandar pro Saif** (exigência dele "read it"): passe de coerência humano + remover qualquer stage-direction de IA; entregar **só o texto final**. Não existe "entrega direto do gerador".

## ⚠️ Regras duras (todas as peças + docs)

- **NUNCA "President of the ÖGAO"** (nem presidente/OEGAO). Regra do Conselho odontológico da Áustria. O produto
  é *"SECRET, the clear aligner system"* — **nunca** *"the aligner planning software"* (áudio Saif 23/07); Navigator = ferramenta interna, citada com moderação.
- **SEM travessões (—)** em nenhuma copy. Vírgula/ponto/dois-pontos.
- **⚠️⚠️ OVERRIDE 12/07/26 — PALETA TRAVADA AO MANUAL (ver bloco 12/07 no topo de `design-system-secret.md`):**
  SÓ 5 cores do manual (p.11): `#FFFFFF` · `#C4C3C2` cinza(texto) · `#209194` teal · `#80C6C7` teal-claro(anel) · `#1D252D` navy(headline). Screenshot bg = `#FFFFFF`.
  **Canto sup-DIREITO = SÓ o tracinho teal, SEM "SECRET Navigator"** (é a SECRET Align). **Logo rodapé/CTA = UMA logo = o lockup** `secret-logo-full.png` ("SECRET" + "CLEAR ALIGNER SYSTEM" embaixo, **extraído do card `Plan Your Case.png` — cinza `#787878`, contraste bom**; NÃO o do manual `#C4C3C2` que some, NÃO um 2º badge). **Anel = `#80C6C7`**. **Contour BEM FRACO: `secret_contour_light.png` (#80C6C7) @ opacity .16 + `background-position:left`** (a `#209194`@.20 ficou forte — Gustavo). Superfície mint `#E9F2F1`. Vale p/ carrossel **e** vídeo (`EventFilm.tsx`). Verificar contra o card `Plan Your Case`.
- **⚠️ OVERRIDE 14/07/26 (Gustavo — padrões fechados):**
  (1) **Pattern contour = 10% é o PADRÃO** em TODOS os cards SECRET (carrossel + vídeo). `render.py` default `SA_PAT_OP=.10`; `EventFilm.tsx` `PAT_OP` default `0.10`. (override pontual: `.16`).
  (2) **CTA copy fechada** (marca sempre **SECRET** em CAIXA ALTA — ID da marca, nunca "Secret"): C1/C2 = `Submit your cases with SECRET`; C3 = `Submit your next case with SECRET and see what a predictable treatment looks like.` (C3 mantém as 2 linhas; nunca "real planning"). Desenho = **PILL** (`ctaver="2"`) + logo no rodapé.
  (3) **Vídeos: outro oficial.** A cartela final dos event-films foi substituída pelo **vídeo de outro** `secret-align-remotion/public/secret-outro.mp4` (animação da logo em fundo branco, 10s, sem áudio; a trilha do filme continua e faz fade por baixo). `EventFilm.tsx`: `EndCard` renderiza `OffthreadVideo` do outro; `END=300`. Vale p/ TODOS os vídeos SECRET.
  (4) **Teal de TEXTO = SEMPRE #209194 (16/07 — Saif reclamou de cor errada).** O accent/destaque de texto é o teal OFICIAL `#209194` em TUDO (carrossel + vídeo, cartela clara E sobre footage). **`#80C6C7` (teal-claro) é só DECORATIVO** (anel/círculo/glow/contour) — **nunca texto**. No vídeo (`EventFilm.tsx`) `TEAL` mudou de #80C6C7 → #209194; p/ legibilidade sobre footage: accent com peso 500 + scrim escuro reforçado (radial 0.80 / banda 0.26).
- **⚠️ OVERRIDE 13/07/26 (reunião Saif — ajustes finais Semana 1):**
  (1) **Pattern contour ainda mais transparente.** `opacity` do `.sa.tx-contour::before` é **parametrizado por env `SA_PAT_OP`** (default `.16`). Saif pediu mais fraco → gerei amostras **16/15/10%**; **recomendação = 10%** (diferença 16→15 é imperceptível; 10% fica premium e o padrão ainda aparece). Ao aplicar a escolha final, refletir também no vídeo (`EventFilm.tsx` contour).
  (2) **CTA — logo no rodapé + tratamento da URL (13/07-c: FECHADO = PILL).** O tipo `cta` = composição do deck (frase à esquerda → tratamento da URL → **logo SECRET no rodapé `.foot`**, canto inf-esq como os outros cards; nunca logo-herói centralizado nem card-in-card/glass/faixa-de-cor — todos reprovados). A ÚNICA variável é **como apresentar `secretalign.com`**: `ctaver` **1** seta-accent · **2 PILL (botão teal sólido, texto branco) ← ESCOLHIDO por Gustavo, aplicado nos 3** · **3** chip outline · **4** fio+url (Swiss) · **5** barra de ação full-width. **C3 mantém a copy própria** (2 linhas) — só o desenho da URL é comum aos 3.
  (3) **`credit`/sub explicativo = navy legível.** `.sa .credit` = **~40px, `#1D252D`** (era 30px cinza-pálido `#C4C3C2` que sumia — Saif reclamou do "Challenge Accepted!" s6).
  (4) **NUNCA inventar/preencher label de UI.** O campo **"Comment to Planning Doctor" preenchido NÃO existe** no Navigator (Saif) → não usar `ft-modify-clinic.png` (tinha comentário fake). Telas de staging/setup limpas = **`send-plan.jpg`** (setup 3D com attachments + callouts, sem label). Só screenshots reais e limpos do Navigator novo.
- **⚠️ OVERRIDE 10-11/07/26 (ver bloco datado no topo de `design-system-secret.md` — é a verdade atual):**
  (1) **textura = CONTOUR ÚNICA** (padrão do Saif; acabou a rotação grid/dots/blueprint/hatch/mesh);
  (2) **cópia do Saif = VERBATIM** quando ele manda o docx (linha1=topo/linha2=embaixo na ordem dele, quebra=`<br>`, palavras exatas; só remover "—" + fix de caixa; audit vs docx). ⚠️ **A voz DELE é PUNCHY/contrarian** ("Stop paying for the logo", "Challenge Accepted!", "The plastic doesn't matter. The planning does." SÃO copy real dele, não invenção) → ao GERAR do zero, escrever nessa voz (ver MODELO FINAL em design-system-secret.md);
  (3) **screenshots PADRONIZADOS** `.sa .scr img{height:430px;object-fit:contain;background:#F5FAF9}` (todos do mesmo tamanho, footer não desloca);
  (4) **nunca reusar a mesma imagem na SECRET e na clínica.**
- **Padrão Swiss Grid:** superfície **clara** `#EEF4F2` + textura **contour** + teal + **cards de canto reto**. Capa = **type-led** (kicker+hairline+headline+anel teal, sem foto); software = frame `.scr` **claro** centrado, tamanho fixo.
- **Higiene regra 6:** esconder nome do paciente **e** do Saif; **só software/3D novos** (nunca a plataforma preta
  antiga); roots à esquerda + plano reto; **Save & Submit** visível; uploads acelerados; **zero rosto/dente/pessoa
  gerados por IA**.

**Tics de IA que o council pega (proibir):**
- **Paralelismo negativo** de abertura (*"X isn't Y, so Y"* / *"No two smiles are alike, your setup shouldn't be"*).
- **Par de substantivos-CTA vazios** (*"Total control. Personalized results."*). CTA = resultado concreto +
  **alavanca** (ex.: *"See it on your next case · secretalign.com"*).
- **Um payoff, no último slide** — não dispare a virada 2×.
- Promessa de resultado (*"they say yes / faster starts"*).

**QA obrigatório:** rode a skill **`roteiro-council`** nos roteiros **antes** de renderizar; aplique os fixes.

## O preset (travado — detalhe em design-system-secret.md)

| | **SECRET Align** |
|---|---|
| Conta · língua | @secret_aligners · **EN** |
| Tokens (manual p.11) | surface mint `#E9F2F1` · texto cinza `#C4C3C2` · headline navy `#1D252D` · teal `#209194` · anel/círculo `#80C6C7` · **Poppins** |
| Estética | superfície mint clara + **contour do Saif MUITO fraco (`#80C6C7`, `opacity` = **.10** PADRÃO (14/07), via env `SA_PAT_OP`, left)** + **logo lockup** (do card `Plan Your Case`) no rodapé + **tracinho no canto sup-DIREITO** (sem "Navigator") + anel `#80C6C7` |
| Imagem | textura contour (CSS) + screenshot do software em frame **branco** de PC, **altura fixa 430px** (padronizado) |
| Cópia | Voz **punchy/direta/contrarian B2B** (frases-soco 2 linhas · "Stop X. Start Y." · desafio ao concorrente OK · "!"). Docx do Saif → **VERBATIM** (ordem+quebras+exato, audit); gerar do zero → **nessa voz** |
| Regra dura | **regra 6** (sem nome paciente/Saif; só software/3D novos; sem rosto/dente IA) |
| CTA | **PILL** (`ctaver="2"`: `secretalign.com` em botão teal sólido) + logo no RODAPÉ. Copy (14/07): C1/C2 `Submit your cases with SECRET`; C3 `Submit your next case with SECRET and…` (2 linhas). **Marca sempre em CAIXA ALTA "SECRET"** (ID da marca) |

Logo SECRET = `_studio/assets/secret-logo.png` (wordmark **escuro** com `=` teal) direto na superfície clara
(~40px footer, ~88px CTA). **Sem chip, sem invert, sem logo branca** (era pro fundo escuro antigo). Sem contador `1/6`.

## Pipeline

1. **Entrada:** modo (render/standalone) + a copy (se render-default) + o pilar da linha editorial.
2. **[standalone]** pilar → headlines → espinha → validação → texto aprovado **na voz SECRET**.
3. **Imagens (Magnific):** a textura de fundo é **procedural (CSS)** — não gere textura. Use Magnific só p/ o
   **print real do app**: `images_relight`/`images_upscale` (segue `magnific-images.md`). Teto ~2–4 imagens/carrossel.
4. **Render HTML** 1080×1350 no preset (`design-system-secret.md`; fontes via `scripts/fonts_to_base64.py` em
   base64; imagens via `scripts/fetch_image.py`) → **GATES** (`hygiene-gate-secret.md` + anti-demo, slide a
   slide) → **export PNG** (`scripts/export_png.py`, Playwright).
5. **Salvar todos os materiais editáveis** na pasta da peça (abaixo).

## Saída — FINAIS no Drive · EDITÁVEIS no LOCAL

**Drive compartilhado = só os PNGs finais:**
```
Content_Calendar/SECRET_Align/Week_<NN>_<MonDD>/Carousels/W<NN>_C<n>_<slug>/  01.png … 06.png
```
**Todo o material editável fica LOCAL** em `🚀_Projects/Secret_Align/Content_Production/`:
```
Content_Production/Week_<NN>_<MonDD>/W<NN>_C<n>_<slug>/
  ├─ index.html          # HTML self-contained (fonte + imagem em base64) — editável
  ├─ images/             # textura + screenshot (orig + polidas)
  ├─ png/slide_NN.png    # PNGs fonte (a cópia final NUMERADA vai pro Drive)
  └─ <slug>.docx         # legenda (regra 7: só texto) + linha de intenção PT-BR
```
Reutilizáveis em `Content_Production/_studio/`. **Sempre guarde o editável no LOCAL** pra ajuste pontual
(reabrir e reeditar, **nunca regerar do zero**). **No Drive só entram os finais.** SECRET = pasta única (EN-only,
sem par bilíngue).

**Docs de entrega (PADRÃO — toda seção/semana, gerar SEMPRE junto dos PNGs):** 2 arquivos `.docx` em **INGLÊS**
(via `pandoc`, sem PDF; alinha com [08_CONTENT_OPS §3]), publicados na **raiz da Week no Drive**:
- `SECRET_W<NN>_Overview.docx` — overview client-facing: a "one idea this week" + 1 linha por peça (vídeos + carrosséis).
- `SECRET_W<NN>_Scripts.docx` — roteiro **slide-a-slide** + a **legenda** + hashtags, **numerado** batendo com as pastas `Carousels/W<NN>_C<n>_<slug>/`.
Fonte MD editável em `_drafts/` (`SECRET_OVERVIEW_en.md` + `SECRET_SCRIPTS_en.md`); converter: `pandoc <md> -o <out>.docx`. Cadência/ritual completo em `Secret_Align/03_CONTENT_OPS.md`.
Regerar os dois **sempre que a copy/estrutura mudar** (mantê-los em sincronia com os PNGs publicados).

**⚠️ Higiene do Drive (regra dura):** o Shared Drive recebe **SÓ finais** — PNGs (assets), `.docx` (docs) e vídeos.
**Nunca** Markdown, **PDF**, `index.html`, `images/`, pastas `_Superseded`/superseded ou qualquer intermediário/editável:
**tudo isso fica no LOCAL** (`Content_Production/`, incluindo as fontes `_drafts/*.md` e o `_CAPTIONS…md` com a linha PT).
Só `.docx` e assets finais atravessam pro Drive; o Markdown é a fonte, o `.docx` é a entrega.

## Scripts (herdados do pro)

`fonts_to_base64.py` (Poppins latin+latin-ext) · `fetch_image.py` (normaliza/crop 4:5/mede luma/base64) ·
`export_png.py` (Playwright, screenshota cada `.slide` em 1080×1350). Deps: Playwright + Chromium, Pillow.

> **Render sem Playwright (fallback):** se `playwright` não estiver instalado mas o Chromium do `ms-playwright`
> estiver, renderize **uma página 1080×1350 por slide** com o binário direto (`--headless --hide-scrollbars
> --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=2500 --screenshot`). Embuta fontes
> **base64** + imagens base64.

> **⚠️ Textura Magnific:** **nunca** ponha hex no prompt (`#00C8B4`) — o modelo desenha o código como texto.
> Descreva a cor em palavras + `no text, no letters, no numbers` e confira o output. Ver `magnific-images.md §2`.

## Mandamento

Bastidor invisível. **Prova antes de variedade.** Cor da marca certa. Imagem dentro da regra 6. **Gates antes do
export.** **Editável no LOCAL, só finais no Drive.** **SECRET usa a LOGO REAL** (`secret-logo.png` / variante
branca), nunca o wordmark de texto. O sistema é invisível; a prova é tudo.
