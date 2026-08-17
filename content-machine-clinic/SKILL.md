---
name: content-machine-clinic
description: >-
  Use when the task is a carousel (or single image post) for Dr. Saif's B2C clinic account Zahnspange Home
  (@zahnspange_home) — invisible-aligner patient content in Austria, governed by Werberecht. Triggers:
  "carrossel Zahnspange Home", "carrossel da clínica do Saif", "post da clínica", "carrossel de paciente
  do Saif", or rendering a C<n> of the Zahnspange_Home week in the Saif Content_Calendar. It is English-only
  (accessible patient education + clinical authority), runs a per-slide Werberecht gate, and uses real
  polished Saif photos. PREFER this over content-machine-pro and content-machine-secret whenever the brand
  is the clinic. NOT for SECRET Align (use content-machine-secret), other clients (content-machine-pro),
  decks/palestra (slidev), or a single news cover (newsroom-pro).
---

# Content Machine CLINIC — carrossel premium da Zahnspange Home (@zahnspange_home)

Fork mono-marca do `content-machine-pro` para **UMA** marca: **Zahnspange Home** — clínica de alinhadores
invisíveis em Krems, **B2C, público = paciente**, sob **Werberecht** (direito de publicidade odontológica
austríaco). Herda o pipeline HTML 1080×1350 → PNG do pro; troca a paleta "derivada" por **1 preset travado**
(petróleo/Lato), o Higgsfield pelo **MCP Magnific**, e adiciona um **gate Werberecht por slide**. Bastidor
invisível — o usuário vê só o resultado.

> **Marca gêmea:** carrossel do software (SECRET Align, B2B, regra 6) → use **`content-machine-secret`**.
> Esta skill é **clínica-only**; nunca produza conteúdo do SECRET aqui.

## Antes de responder: leia as referências (nesta ordem)

- **[references/design-system-clinic.md](references/design-system-clinic.md)** — o **sistema visual TRAVADO**
  da clínica (preset petróleo/Lato, topbar two-tone, padrão mito ✕/✓, foto real com scrim petróleo, logo, CTA).
  **Leia primeiro.** Onde conflitar, **este arquivo + impeccable-baked.md vencem o Bloco 6** do system-prompt.
- **[references/werberecht-gate-clinic.md](references/werberecht-gate-clinic.md)** — o **gate Werberecht por
  slide**. **Rode ANTES de exportar PNG**; bloqueia o export se algo não passar.
- **[references/visual-resources.md](references/visual-resources.md)** — o **banco catalogado** de recursos
  visuais da clínica (antes/depois publicados, stills `cl_*`, vídeos do Saif) + a ferramenta
  `scripts/catalog_lookup.py` com **controle de uso** (não repetir antes/depois). **É a fonte (1)+(2) do
  sourcing — busque aqui ANTES de Magnific/stock/IA.**
- **[references/magnific-images.md](references/magnific-images.md)** — sourcing de imagem via **Magnific**
  (foto REAL do Saif polida — img2img / relight / bg-remove; nunca rosto/dente gerado por IA).
- **[references/impeccable-baked.md](references/impeccable-baked.md)** — regras de UI + checklist pré-export.
- **(modo standalone)** `references/system-prompt.md` + `banco-de-headlines.md` + `filtro-editorial.md` — o
  cérebro do pro, **calibrado na voz da clínica** (abaixo) antes do render.

## Idioma e voz (English-only — ver projeto Saif `09_BRAND_VOICE_BASELINE.md`)

**A conta é 100% inglês** (decisão do dono, jul/2026 — antes era DE-paciente / EN-autoridade). O inglês agora
carrega **as duas funções** que a divisão bilíngue separava: **alcance** (educação de paciente acessível, ~6ª
série no hook) **e** autoridade (credibilidade clínica). **Hook default = pergunta/curiosidade; NUNCA abrir
capa com negação ("No, X does not...") — reprovado 21/07.** **CAPA = ESTILO CLÁSSICO TRAVADO (21/07-b, Gustavo/Saif):** campo sky + texto à ESQUERDA + imagem de
FUNDO TRANSPARENTE (cutout) na posição clássica do Saif. A IMAGEM pode variar (Saif, alinhador flutuando,
produto, modelo) — o POSICIONAMENTO não. **Nunca** capa que parece card de meio de carrossel (foto em card
borda-rosa na capa = REPROVADO 21/07). Não repetir o mesmo cutout de semanas anteriores; cutout novo via
remove_background (aparar SEMPRE ao alpha-bbox antes de posicionar). **Fonte ideal de cutout de "Saif
atendendo": frames dos vídeos dele** (catalog `video` → `src_local` + ffmpeg no timestamp) → rembg.
**Quando o Gustavo pedir opções de capa: entregar múltiplas variações renderizadas** numa pasta
`_APPROVAL_Covers_<data>/` no Drive (hábito 21/07-c).

**Regras de craft 22/07 (3ª revisão — aplicar sempre):**
- **Rosto do Saif em IA = SEMPRE o pack multi-referência** `Content_Production/_studio/assets/saif_refs/` (5 fotos)
  no `references[]` do Magnific — 1 referência só = likeness fraca (reprovado 21/07; com o pack = aprovado 22/07).
  Máscara facilita a likeness (menos rosto exposto).
- **Borda de recorte cortada NUNCA aparece dentro do quadro:** se o sujeito foi cortado pela borda do frame de
  origem (cabelo/braço), o cutout só pode ser usado com essas bordas SANGRANDO pra fora do canvas — senão,
  gerar um sujeito completo via Magnific. Cortes duros visíveis = reprovado (V4/V5 21/07).
- **Visual reprovado 2x = TROCAR estilo/metáfora**, nunca iterar o mesmo estilo pela 3ª vez (flat de mandíbula
  reprovada 2x → clay 3D aprovada). Oferecer 2 estilos candidatos na troca.
- **Produto de marca em cena gerada = referência na MAIOR resolução disponível + conferência LADO A LADO com a
  foto original antes de usar** (forma, cor, wordmark). Reprovado 22/07: case SECRET gerado como "pill teal" quando
  o real é redondo PRETO com aba teal — só passou depois da ref 2048px + comparação. Se divergir, usar a foto real.
- **Fotos de modelo/produto do site do cliente (secretalign.com etc.) são fonte REAL válida** p/ capa e cards
  (bg removido no Magnific quando virar cutout de capa).
- **Pós-rembg obrigatório (2 passes, sempre):** (1) matar sombras/manchas soltas — zerar alpha de todo pixel que
  não esteja a <=3px de um pixel sólido (alpha>=200); o rembg deixa borrões semitransparentes do fundo (cadeira,
  sombra) que aparecem como manchas azuladas no campo. (2) re-trim no alpha-bbox. Sem isso a capa "parece mal
  cortada".
- **Fundo teal/colorido em PNG do site não sai no rembg** (já é "transparente" pro modelo): fazer chroma-key local
  do tom + erode 1px, senão sobra um disco fantasma atrás do sujeito.
**Documento de scripts p/ aprovação do Saif (regra Gustavo 24/07 — travada):**
- O Saif aprova o que está NO documento. Entregar só a headline de cada slide fez ele revisar pela metade.
  **SEMPRE incluir o texto COMPLETO de cada slide: top text (headline) + text below (subtexto) + kicker +
  bullets do checklist + botão/under-button do CTA.**
- **Um slide por bloco**, com cabeçalho "**Slide N (Cover/Checklist/Call to action)**" e linhas rotuladas
  ("Top text:", "Text below:", "Kicker:", "Button:"). NUNCA um blocão "1) ... 2) ... 3) ..." numa linha só.
- **Gerar o documento A PARTIR DO BUILD** (os dicts `h`/`sub`/`bullets` dos slides são a fonte-verdade), não à mão:
  senão o resumo dessincroniza do que foi renderizado (aconteceu 24/07: doc dizia "trays/24 aligners" e o slide
  já era "aligner"). Legendas vêm dos SCRIPT.md por peça (já com edições do Saif). Modelo reproduzível:
  `Content_Production/Week_03_Jul20/_build/make_scripts_doc.py` (importa o build, varre C1..C4, emite MD sem em-dash).
- Vídeos: incluir caption + voiceover completo + shot list (overlays) + footage — tudo que o Saif precisa revisar.

**Banco NÃO tem foto real de criança (confirmado 24/07 — 0 hits em Brand_Sources + catálogo).** Para conteúdo
kids/pais: capa e cards de pessoa usam **foto real do Saif** (`cl_saif_cutout.png` = clássico Week01, jaleco navy
com logo real — capa preferida; NÃO gerar Saif por IA quando existe a real, o Gustavo reprova). A criança em si,
quando precisa aparecer, é **gerada no Magnific SEM rosto identificável** (de costas/perfil, olhos fora do quadro)
e sinalizada ao Saif; o fix real é footage consentida dele (fica no pedido de material). Nunca usar as fakes
`cl_teen_patient.jpg`/`cl_ages.jpg`.

**Léxico do cliente (Saif 24/07 — travado, aplicar em TODA copy publicada da clínica, slide e legenda):**
- **Nunca a palavra "tray"/"trays" sozinha → sempre "aligner"/"aligners".** Compostos que ele aceita: "aligner tray".
  Ex.: "each tray moves" → "each aligner moves"; "the trays are thin" → "the aligners are thin".
- **Não usar o parêntese alemão "(Fachzahnarzt für Kieferorthopädie)" na copy publicada** — escrever só
  "an orthodontics specialist". (A qualificação-autoridade continua valendo, mas em inglês simples; o termo alemão
  fica só para hashtags de SEO tipo #kieferorthopädie.) Regra 4/5 do projeto intacta: nunca ÖGAO como gancho.
- **Rinse com "warm water", never hot** (não "cool water") — preferência do Saif no roteiro de cuidados.
- **Primeira avaliação da criança = "around age 7"** (atualizado 30/07: ele tinha mudado 7→6 em 24/07 e
  voltou pra **7**; bate com a AAO, "no later than 7"). Regra geral: idade/claim clínico é **sempre** a
  última orientação do Saif — quando ele mudar, varrer TODAS as ocorrências (slide, legenda, SCRIPT.md,
  _SCRIPTS, week plan) na mesma rodada, não só o slide.
- Evitar afirmar contagem específica de alinhadores / "no refinement" numa legenda de caso, a menos que o Saif peça.

- **NÃO colocar o logo Zahnspange Home no jaleco de foto gerada** (decisão Gustavo 22/07). Tentado das duas
  formas (PNG colado e regeneração no Magnific com o logo de referência) e **as duas reprovadas** — o jaleco vai
  liso. A marca já aparece no `@zahnspange_home` do rodapé. Se algum dia voltar o pedido, lembrar: em foto
  espelhada o texto do bordado sai invertido e precisa de des-espelhamento do patch.
- **Recorte sobre painel de cor: a imagem PREENCHE o frame padrão** (compor o cutout num canvas landscape na
  proporção do frame e usar `fit=cover`). Nem cutout pequeno num retângulo grande, nem mudar o formato do frame
  para quadrado: as duas variantes foram reprovadas (22/07) por parecer "recorte dentro de recorte".

**Regras de craft 21/07-c (aprendidas em revisão, aplicar sempre):**
- **Painel `contain` ABRAÇA a imagem** (`pw` = largura que casa com o aspect; imagem quadrada → painel quadrado
  centrado). Nunca "imagem dentro de painel" com margens laterais grandes.
- **CTA text-only:** sub curto SEM disclaimers empilhados; pílula "Book a consultation"; **"Link in bio." vai
  ABAIXO da pílula** (param `below`).
- **Claim clínico numérico/etário = fact-check em fonte confiável antes de publicar** e citar no SCRIPT.md
  (ex.: idade-7 = AAO, aaoinfo.org). Regra 3 vale pra claims, não só pra métricas.
- **Inglês simples** (público austríaco): sem idioma/expressão opaca ("hair-thin" → "thinner than a fingernail"). Voz: corpo curto, caloroso, **hook de pergunta**
(*"Is there…?" / "Did you know…?"*), frases curtas, emoji contido (~3/post), **CTA suave ou ausente** (90% sem
CTA — é conta de marca/educação, não hard-sell). **CTA padrão em inglês = "Book a consultation · Link in bio".**
Só as hashtags mantêm alguns termos DE/AT de geo/tratamento como **SEO local** (`#krems #kieferorthopädie …`).

**Pilares reais (histórico):** Aligner-education/Tips **49%** (núcleo) · Patient-story 10% · Tech/Scan/AI 8% ·
Kids/Family 8% · Before/After 6% · Appointment-CTA 6% · Seasonal 5% · **Authority 4%** (minúsculo em volume,
gigante em engajamento). A autoridade vem do **Fachzahnarzt für Kieferorthopädie** + a qualidade intelectual do
planejamento — **nunca do cargo na ÖGAO** (regra 4).

## Modo English-only (1 carrossel = 1 post)

**Todo carrossel da Zahnspange é produzido em inglês** — **1 conceito → 1 render → 1 post**. Não há mais par DE/EN.

- **1 design, 1 render.** Gere as imagens Magnific uma vez por conceito e monte os slides em inglês.
- **Pasta única:** `W<NN>_C<n>_<slug>/` com `index.html` + `png/slide_NN.png` + `<slug>.docx` + `images/`
  (sem sufixo `-de`/`-en`).
- **Gate:** rode o Werberecht **por slide**, uma vez (em inglês).
- **Vídeos da clínica:** 1 asset visual, legenda/`SCRIPT.md` em **inglês** (overlay em inglês). Render de
  carrossel não se aplica; quem escreve a legenda é a `semana-saif`.

## ⚠️ Werberecht — gate por slide (não-negociável)

Rodar **por slide** (não só na legenda). O Saif **já comete** violações no histórico — **não replicar**:

| ❌ Proibido | ✅ Faça em vez |
|---|---|
| Promessa de resultado ("perfektes Lächeln", "dream smile", sorriso perfeito garantido) | "schonend und nahezu unsichtbar korrigieren" (educação, sem promessa) |
| Antes/depois sensacionalista de rosto | antes/depois **clínico/educacional**; ClinCheck 3D como "antes/depois digital" |
| Superlativo ("best", "magic", "unschlagbar") | claim concreto e verificável |
| Comparação com concorrente ("unlike other brands", "melhor que DrSmile") | "Facharzt statt DIY-Kit." (nunca comparação direta) |
| Linguagem saldão / marktschreierisch | educação neutra |
| Influencer leigo promovendo dispositivo médico | educação do profissional / autoridade do **Fachzahnarzt** |

**Reforços (regras 4-5):** a autoridade é o **Fachzahnarzt für Kieferorthopädie** (título de especialista) + a
qualidade intelectual do planejamento. **NUNCA use o cargo de presidente da ÖGAO como gancho comercial** (regra
4) — só cabe em contexto neutro de peer (congresso/educação), nunca pra vender. Perfil pessoal > perfil da clínica.

## Dois modos

- **Render-default (orquestrador — padrão):** você **recebe a copy de slide já pronta** (em inglês) + as
  imagens. Você **não escreve copy**. Aplica o preset, monta as imagens (Magnific), **roda o gate Werberecht**
  e **renderiza os PNGs** da pasta única.
- **Standalone-editorial (peça avulsa):** roda o cérebro do pro (briefing → 10 headlines → espinha → validação →
  texto), na **voz da clínica em inglês** (educação de paciente acessível + autoridade; hook de pergunta
  *"Is there…?" / "Did you know…?"*), sempre **Werberecht** (sem promessa/superlativo/comparação; **sem gancho
  ÖGAO** — regra 4). Bloco local-SEO **~25-30 hashtags** (núcleo `#zahnspange #zahnspangehome #krems #wien
  #zahnarzt #kieferorthopädie #österreich`). Depois cai no mesmo render (1 idioma, 1 post).

## O preset (travado — detalhe em design-system-clinic.md)

> **⚠️ OVERRIDE 21/07-c (Gustavo) — FERRAMENTA DE GERAÇÃO = SÓ MAGNIFIC neste projeto.** Higgsfield NÃO deve ser
> usado p/ criar imagem do Saif/clínica (usado excepcionalmente em 21/07 enquanto o Magnific estava com OAuth
> expirado; o material criado foi aproveitado com autorização). Se o Magnific estiver desconectado → avisar o
> Gustavo p/ reconectar via /mcp; não trocar de ferramenta por conta própria.
>
> **⚠️ OVERRIDE 21/07/26 (Gustavo) — IA LIVRE COM QA (supersede o "zero IA" 13/07 abaixo):** geração (Magnific)
> **liberada sempre que a imagem real não for ideal**, com gate duro de qualidade: **luvas em procedimento, anatomia
> correta, natural, sem uncanny**; rosto de criança nunca identificável; e **TODA imagem gerada é SINALIZADA ao Saif**
> na entrega (lista "AI-generated" no SCRIPT.md + _SCRIPTS). Banco real continua PRIMEIRO na ordem de busca.
> Lição 21/07: `cl_teen_patient.jpg` e `cl_ages.jpg` (W01 _media) SÃO IA sintética — nunca tratar como "foto real".
>
> **(histórico) OVERRIDE 13/07/26 (reunião Saif) — SEM IMAGEM DE IA (supersede o "geração LIBERADA" abaixo):** Saif reprovou fotos de IA (a de procedimento estava **sem luvas** → falsa). **Por padrão, ZERO imagem gerada por IA.** Fonte, nesta ordem: **(1) foto real de paciente** das pastas existentes; **(2) screenshot de vídeo do Saif** (pasta "OD"/não-publicados + `Brand_Sources/Zahnspange_Home/` + os vídeos que ele manda); **(3) stock da Three Shape**. IA **não é proibição absoluta** — é **último recurso**, o mínimo possível, e **só quando não há alternativa real**; onde usar, **sinalizar**.
>
> **As fontes (1) e (2) agora são BUSCÁVEIS** no banco catalogado → **rode `scripts/catalog_lookup.py` (ver `references/visual-resources.md`) ANTES** de recorrer a Three Shape/IA. Antes/depois vêm dos 250 publicados (`beforeafter --unused --no-face`); frames de procedimento/Saif vêm dos vídeos (`video`) e stills (`stills`). **Todo antes/depois consumido tem que ser marcado com `use`** — é o que impede repetir o mesmo antes/depois. Em procedimento clínico, a imagem **tem que ter luvas**; rosto nunca cortado.
>
> **⚠️ OVERRIDE 12/07/26 (ver bloco 12/07 no topo de `design-system-clinic.md`):** **SEGUIR O DOC AO PÉ DA LETRA** — linha 1 = headline, linha 2/3 = sub **na ORDEM do doc** (não inverter); **onde o doc pula linha, o sub pula** (`<br>`); palavras exatas (não parafrasear/juntar/inventar eyebrow). **NÃO auto-suavizar/corrigir** promessa Werberecht nem typo → renderizar exato + **SINALIZAR** ao Gustavo. Headline longa → `hsize` menor. **Capa: 1º carrossel = 2 versões** (original c/ sub + nova só a pergunta); demais = minimal. **Visual inalterado** (aprovado).
>
> **⚠️ Histórico 10-11/07/26 (contexto; o MODELO FINAL está no topo de `design-system-clinic.md` + na tabela abaixo):**
> - **Template = foto num CARD centralizado com borda rosa** (variação 1), **NÃO** full-bleed/meta-cutout (Saif rejeitou o fundo-foto). Campo petrol/sky + **dots** (textura única, sem rotação). **Sem IG-chrome.** `@zahnspange_home` no canto inf-esq. Fonte-verdade = `_concepts/build_zh13.py`.
> - **Acento = rosa EXATO do logo `#DE318B`** (não `#FF7EC0`), 1 palavra/slide. Texto GRANDE (headline ~82px).
> - **Mídia por card (nada de blur/pillarbox — é o "forced-frame" rejeitado):** FOTO → `cover` preenche a borda (corte focal, **rosto nunca cortado**); screenshot → `contain` painel branco; **conceito anatômico → ILUSTRAÇÃO flat** (não render 3D uncanny), `contain` com `cbg` = cor da arte.
> - **Composição individual por card** (rodar `clinic-per-card-review`); imagem mostra o conceito da headline. ~~Geração de rosto/dente LIBERADA~~ **← REVERTIDO pelo override 13/07 acima: sem IA por padrão, usar real/screenshot/Three Shape.** Werberecht ainda proíbe close de resultado/antes-depois.
> - **Faixa etária = paralelo crianças↔adultos** (não só adulto). **Nunca reusar a mesma imagem na clínica e na SECRET.**

| | **Zahnspange Home — MODELO FINAL** (fonte-verdade `_concepts/build_zh13.py`) |
|---|---|
| Conta · língua | @zahnspange_home · **English** (educação de paciente + autoridade) |
| Tokens | campo petrol `#005280` / sky `#1E8AC4→#116BA0` (alterna) · **acento rosa-logo `#DE318B`** (headline+borda+pílula) · **Lato** · sem amarelo |
| Estética | **foto num CARD centralizado c/ borda rosa** no campo de cor + **dots** + @handle inf-esq. **Sem IG-chrome, sem full-bleed, sem recorte-meta.** |
| Tipos | eyebrow opcional (só se no doc) · headline Lato-900 **82px** (`hsize` menor p/ linha longa) · **sub 44px / lh 1.34 / margin-top 40px** (grande, com respiro) · capa 102px (`hsize`+`wide` se longa) |
| Imagem | 1 por card (`fit`+`focus`+`pmax`): FOTO=`cover` (**rosto inteiro** — aumentar `pmax`/ajustar `focus` se cortar) · UI/3D=`contain` painel branco · anatomia=ilustração flat. Equilibrar via `pmax`. Nunca reusar imagem entre clínica e SECRET. |
| Copy | **doc do Saif AO PÉ DA LETRA** (ordem linha1→h/linha2→sub · quebra=`<br>` · exato) · promessa Werberecht/typo dele = **exato + sinalizar** |
| Capa | 1º carrossel = **2 versões** · demais minimal (só a frase do doc) |
| CTA | pílula rosa **"Book a consultation"** + "Link in bio" · **variação 21/07:** CTA pode ser **text-only** (sem foto, bloco centrado verticalmente) ou com imagem de produto — sem obrigação de retrato do Saif |

Marca = **`@zahnspange_home` (texto) no canto inf-esq de todo slide** (sem IG-chrome, sem logo nos campos).
Autoridade vem da copy (**Fachzahnarzt für KFO** + qualidade do planejamento — nunca ÖGAO, regra 4), não do logo.

## Pipeline

1. **Entrada:** modo (render/standalone) + a copy (se render-default, em inglês) + o tipo de conteúdo.
2. **[standalone]** tipo → headlines → espinha → validação → texto aprovado **na voz da clínica** (inglês).
3. **Imagens:**
   1. **Buscar no banco PRIMEIRO** (`references/visual-resources.md`): para cada slide que precisa de imagem,
      rode `scripts/catalog_lookup.py` — antes/depois (`beforeafter --unused --no-face`), retrato/procedimento/scan
      (`stills --subject …`), ou um frame de vídeo do Saif (`video --query …` → montage/transcript/timestamp).
      Esse banco é a fonte (1) foto real + (2) screenshot; só caia em stock/IA se o banco não tiver.
      **1b. VER ANTES DE USAR (obrigatório, 21/07/26):** abrir (Read) CADA candidata em resolução real antes de
      colocá-la num slide — `subject`/`note` do catálogo vêm de triagem automática em thumbnail e ERRAM
      (ex.: "scan-3d" que era mãos em coração; "aligner" que era um cabo num corredor). Rejeitar na hora:
      cursor/UI de tela, qualidade webcam/borrada, legenda queimada, subject errado, aparelho metálico em
      peça de "clear aligner". Preferir `--no-framegrab` (foto composta) quando existir.
   2. **Polir (Magnific):** seguir `magnific-images.md` — **foto REAL** do Saif polida (`images_remove_background`,
      `images_relight`, `images_upscale`, `images_skin_enhancer`) + scrim petróleo; fundo abstrato IA só onde é
      Werberecht-safe (sem rosto/dente). Teto ~2–4 imagens/carrossel; reaproveita entre os slides.
   3. **Marcar uso (OBRIGATÓRIO p/ TODA imagem consumida — 21/07/26):** antes/depois, still `cl_*`, frame de
      vídeo e foto do shoot → `catalog_lookup.py use <asset> --where W<NN>_C<n>`. O `stills/video --unused`
      agora esconde os usados (fix 21/07). **Regra: nenhuma imagem repete em semanas consecutivas** (checar
      também os builds das semanas anteriores; `cl_saif_favorite` = `FAVORITE.jpg` = `cl_saif_portrait_studio`,
      são o MESMO arquivo).
4. **Render HTML** 1080×1350 no preset (`design-system-clinic.md`; fontes via `scripts/fonts_to_base64.py` em
   base64, **latin + latin-ext** — inofensivo, cobre nomes/hashtags DE; imagens via `scripts/fetch_image.py`) →
   **GATE Werberecht** (`werberecht-gate-clinic.md`, slide a slide) → **export PNG** (`scripts/export_png.py`).
4b. **QA VISUAL PER-CARD (obrigatório antes de publicar, 21/07/26):** rodar um review card-a-card com
   **agentes paralelos (Sonnet), 1 agente por card**, lendo o PNG renderizado: a imagem retrata a headline?
   zoom/enquadramento ok? artefato (cursor, webcam, borrão, IA-uncanny)? vazio vertical não-intencional?
   legibilidade? Werberecht visual? Corrigir bloqueantes e re-rodar até zero. (Foi esse gate que pegou
   14 defeitos na Week_03 antes do cliente ver.)
5. **Salvar todos os materiais editáveis** na pasta única (abaixo).

## Saída — FINAIS no Drive · EDITÁVEIS no LOCAL

**Drive compartilhado = só os PNGs finais (pasta única, inglês):**
```
Content_Calendar/Zahnspange_Home/Week_<NN>_<MonDD>/Carousels/W<NN>_C<n>_<slug>/  01.png … 06.png
```
**Todo o material editável fica LOCAL** em `🚀_Projects/Saif/Content_Production/`:
```
Content_Production/Week_<NN>_<MonDD>/Zahnspange_Home/W<NN>_C<n>_<slug>/
  ├─ index.html          # HTML self-contained (fonte + imagem em base64) — editável
  ├─ images/             # foto real polida + fundos (orig + polidas)
  ├─ png/slide_NN.png    # PNGs fonte (a cópia final NUMERADA vai pro Drive)
  └─ <slug>.docx         # legenda em inglês (regra 7: só texto, sem stage-direction, sem linha PT)
```
**Sempre guarde o editável no LOCAL** pra ajuste pontual (reabrir e reeditar, **nunca regerar do zero**). **No
Drive só entram os finais.** Clínica = **pasta única em inglês** (local e Drive; sem mais par `-de`/`-en`).

**⚠️ Higiene do Drive (regra dura):** o Shared Drive recebe **SÓ finais** — PNGs (assets), `.docx` (docs) e vídeos.
**Nunca** Markdown, **PDF**, `index.html`, `images/`, superseded ou intermediários: tudo isso fica **no LOCAL**
(`Content_Production/`). O Markdown é a fonte; o `.docx` é a entrega.

## Scripts (herdados do pro)

`fonts_to_base64.py` (Lato **latin + latin-ext** p/ acentos DE) · `fetch_image.py` (normaliza/crop 4:5/mede
luma do scrim/base64) · `export_png.py` (Playwright, screenshota cada `.slide` em 1080×1350). Deps: Playwright +
Chromium, Pillow.

> **Render sem Playwright (fallback):** se `playwright` não estiver instalado mas o Chromium do `ms-playwright`
> estiver, renderize **uma página 1080×1350 por slide** com o binário direto (`--headless --hide-scrollbars
> --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=2500 --screenshot`). Embuta fontes
> **base64** + imagens base64.

> **⚠️ Foto de paciente:** só anonimizada e enquadrada como educação (Werberecht). Antes/depois = clínico, nunca
> glamour. Texto sobre foto com scrim que garanta **AA ≥ 4.5:1** (`fetch_image.py --measure-luma`).

## Mandamento

Bastidor invisível. **Educação, não promessa.** Cor da marca certa. **Gate Werberecht por slide.**
Foto REAL do Saif (nunca rosto/dente IA). **Editável no LOCAL, só finais no Drive.** **Tudo em inglês**
(educação de paciente + autoridade); autoridade = **Fachzahnarzt für KFO**, nunca ÖGAO (regra 4). Sem em-dash.
O sistema é invisível; o carrossel é tudo.
