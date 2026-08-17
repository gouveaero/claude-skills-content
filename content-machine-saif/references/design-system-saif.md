# Design System — content-machine-saif (LOCKED VISUAL)

> **Fork de `content-machine-pro`.** Este arquivo é o **sistema visual TRAVADO** dos dois carrosséis do Dr. Saif. Foi codificado a partir do mockup aprovado pelo usuário (`carousel-styles-v2.html`) — **espelhe-o, não reinvente.** Onde este arquivo definir um token, ele é lei.
>
> **Precedência (conflito):** **este arquivo + [impeccable-baked.md](impeccable-baked.md) vencem o `Bloco 6` do system-prompt do `pro`** e qualquer paleta "derivada da marca" do `design-system.md` original. As cores aqui são **hardcoded por marca** (não derivadas no briefing). O resto do pipeline do `pro` (HTML 1080×1350 → `scripts/export_png.py` Playwright; fontes via `scripts/fonts_to_base64.py` em base64, **nunca `<link>`**; imagens via `scripts/fetch_image.py`) **continua valendo**.
>
> **Duas marcas, dois presets travados:** SECRET Align (B2B, dark/teal) · Zahnspange Home (B2C, light/petróleo). Nunca misture tokens entre marcas.
>
> **Dois modos da skill:**
> - **(A) render-default** — recebe a copy de slide já pronta do orquestrador + o preset da marca + imagens; só renderiza PNGs premium. Não escreve copy.
> - **(B) standalone-editorial** — cérebro editorial completo adaptado às 2 vozes (10 headlines → spine → validação → texto), e depois cai no mesmo render.
>
> Em ambos os modos o output respeita o **EDITABLE-MATERIALS STANDARD** (§7).

---

## 1. Arquitetura de slide (comum às duas marcas)

- **Canvas:** `1080×1350` nativo (4:5), um `.slide` por imagem, empilhados (`flex-direction:column; gap`) pro preview; export screenshota cada `.slide`.
- **Safe margins:** conteúdo respira **64px** nas laterais; topo **~88px** (chrome: logo/kicker), base **~80px** (footer). O mockup usa 22–26px no preview de 300px → em 1080px isso é **~80–94px** de padding. Use **64px lateral / 88px topo / 80px base** como zona segura útil.
- **Fill-the-canvas** (herdado do pro): nenhum slide com metade vazia; conteúdo ocupa **55–75%** da altura útil. SECRET é a exceção controlada — usa **muito negative space premium** (ver §2), então mira a base inferior da faixa (~55%) com tipo grande e centrado.
- **4 tipos de slide** (ambas as marcas):
  1. **Cover (capa)** — kicker + headline forte + chrome de marca; SECRET ganha textura abstrata, Zahnspange ganha foto-com-scrim ou fundo limpo.
  2. **Content (interno)** — headline leve/forte + corpo; SECRET pode trazer o **frame de computador** (§2); Zahnspange pode trazer o padrão **mito ✕/✓** (§3).
  3. **Image (foto/mídia)** — SECRET: screenshot de software no frame de computador OU textura teal abstrata. Zahnspange: **foto real do Saif** com scrim petróleo + logo em chip branco.
  4. **CTA (último)** — limpo, sem foto; logo da marca + URL/ação. SECRET → wordmark em chip branco + `secretalign.com`. Zahnspange → pílula magenta `Termin buchen · Link in Bio`.
- **Sequência sugerida (9 slides):** Capa(img) → alterna content/image → penúltimo = direção/transição → **CTA limpo**. Os últimos 2–3 slides preparam o CTA. (Mesma lógica do pro §8, só que com os tratamentos de imagem por marca da §6.)
- **Bans herdados (impeccable):** sem side-stripe (`border-left` colorido), sem gradient-text (`background-clip:text`), sem em-dash em chrome/label, sem glassmorphism decorativo gratuito, sem watermark "Powered by Content Machine". ≤4 ideias por slide. Squint test obrigatório.

---

## 2. Preset SECRET Align (B2B · dark · premium-minimal)

**Personalidade:** premium-minimal **DARK**, muito negative space, engineered, sem hype. Casa com os feature-videos já renderizados (mesmo teal de engine).

### 2.1 Tokens (copy-paste — hex travado, **não derivar**)

```css
/* ───────── SECRET Align — brand tokens (LOCKED) ───────── */
:root{
  --sa-ink:      #0A1412;   /* fundo escuro canônico (engine ink) */
  --sa-ink2:     #0E1D1B;   /* superfície de painel/frame de computador */
  --sa-ink3:     #0A1614;   /* barra do frame (mais escura que o painel) */
  --sa-teal:     #00C8B4;   /* ACCENT — kicker, hairline, "=", palavra-chave, save-badge */
  --sa-teal-dim: rgba(0,200,180,.25); /* bordas/linhas teal a baixa opacidade */
  --sa-fg:       #EAF3F1;   /* texto corpo (off-white esverdeado, não #fff) */
  --sa-white:    #FFFFFF;   /* só na palavra-chave em <b> da headline + chip do logo */
  --sa-foot:     #6F8784;   /* footer/legenda (cinza-petróleo) */
  --sa-wm:       #CFEAE6;   /* wordmark do footer (claro) */
  --sa-font:     'Poppins', system-ui, sans-serif;
}
```

### 2.2 Escala de tipo (px @1080 — o mockup é 1:3.6, valores já convertidos)

| Papel | @1080 | Peso | Notas |
|---|---|---|---|
| Kicker (eyebrow) | **34px** | 600 | UPPERCASE, `letter-spacing:.22em`, cor `--sa-teal` |
| Headline interna | **83px** | **300** | `line-height:1.28`, `letter-spacing:-.005em` (light = a assinatura SECRET) |
| Headline CTA | **65px** | 300 | menor que a interna |
| URL CTA | **47px** | 500 | cor `#9FC7C2` (teal apagado), `letter-spacing:.04em` |
| Footer wordmark "SECRET=" | **40px** | 600 | `letter-spacing:.06em`, cor `--sa-wm`; o `=` em `--sa-teal` |
| Footer / legenda | **34px** | 400 | cor `--sa-foot`, `letter-spacing:.04em` |

> **Ponderação da headline (regra-chave):** a headline é **leve (weight 300)** com **1–2 palavras-chave destacadas** — uma em **branco (weight 600)** via `<b>`, e/ou uma em **teal (weight 500)** via `.t`. Nunca toda a frase em peso alto. Isso é o que dá o ar "engineered, premium" do guia SECRET.

### 2.3 Kicker + hairline (a marca de abertura)

```css
.sa .kick{ font-size:34px; letter-spacing:.22em; text-transform:uppercase;
  color:var(--sa-teal); font-weight:600; }
.sa .rule{ width:94px; height:7px; background:var(--sa-teal); margin-top:40px; } /* hairline 26px@300 → 94px@1080 */
.sa h2{ font-weight:300; font-size:83px; line-height:1.28; letter-spacing:-.005em; color:var(--sa-fg); }
.sa h2 b{ font-weight:600; color:var(--sa-white); }   /* palavra-chave branca */
.sa h2 .t{ color:var(--sa-teal); font-weight:500; }    /* palavra-chave teal */
```

### 2.4 Fundos de textura abstrata (capa + internos esparsos)

Two-layer: **gradiente escuro de legibilidade** + **glow radial teal** + **hachura diagonal repetida** (a "textura engineered"). Estes são gerados/derivados; quando vier do Magnific (textura teal abstrata), entram como `imgbg` por baixo **com o mesmo scrim**.

```css
.sa.tex{ background:
  linear-gradient(180deg, rgba(10,20,18,.35), rgba(10,20,18,.94) 74%),
  radial-gradient(130% 90% at 82% 8%, rgba(0,200,180,.32), transparent 55%),
  repeating-linear-gradient(125deg, #0C1A18 0 47px, #0A1412 47px 94px); } /* 13/26px@300 → 47/94px@1080 */
.sa::after{ content:""; position:absolute; right:-324px; top:-324px;
  width:828px; height:828px;
  background:radial-gradient(closest-side, rgba(0,200,180,.20), transparent 70%);
  pointer-events:none; }
```

### 2.5 Frame de COMPUTADOR pro software (regra 6)

**Nunca** mockup de celular pro software (exceção única documentada: a feature "Send to Patient"). Screenshot do **software novo + 3D models novos** (nunca a plataforma preta antiga) sempre dentro de um frame de janela desktop com barra de "trânsito" teal:

```css
.scr{ margin:auto 0; width:100%; background:var(--sa-ink2);
  border:1px solid var(--sa-teal-dim); border-radius:29px; overflow:hidden; }
.scr .bar{ height:58px; background:var(--sa-ink3); display:flex; align-items:center;
  gap:14px; padding:0 29px; border-bottom:1px solid rgba(0,200,180,.15); }
.scr .bar i{ width:18px; height:18px; border-radius:50%; background:rgba(0,200,180,.5); } /* 3 dots teal */
.scr .save b{ font-size:29px; color:var(--sa-ink); background:var(--sa-teal);
  padding:11px 29px; border-radius:14px; letter-spacing:.04em; } /* "SAVED" badge teal→ink */
```

- O **conteúdo do frame é a screenshot real do Magnific** (relight/upscale do print do app), ou — quando não há print — os placeholders teal do mockup (tooth-ring + lines). **Uploads sempre rápidos** (regra 6: não parecer lento).
- **Nunca rostos/dentes/pessoas gerados por IA** no SECRET. Texturas e o frame, sim.

### 2.6 Footer wordmark + chip do logo no CTA

```css
.sa .foot{ display:flex; justify-content:space-between; align-items:center;
  font-size:34px; color:var(--sa-foot); letter-spacing:.04em; }
.sa .wm{ font-weight:600; letter-spacing:.06em; color:var(--sa-wm); font-size:40px; }
.sa .wm .eq{ color:var(--sa-teal); }   /* o "=" em teal → "SECRET=" */
```

- **Footer interno:** a **LOGO REAL da SECRET em versão BRANCA** (letras claras + `=` teal preservado) — arquivo `assets/secret-logo-white.png` (gerado de `secret-logo.png` com `magick … -fuzz 18% -fill "#EAF3F1" -opaque "#4C4C4C"`), pequena (~40px), discreta, à esquerda. **NUNCA** o wordmark de TEXTO `SECRET=` — parece a logo mas **não é**. **Sem contador de slide** (não usar `1/6`, `2/6`).
- **CTA slide:** a **logo real branca** maior (~100px) direto sobre o fundo escuro (é clara, dispensa chip). URL = **`secretalign.com`**. (Só se usar a logo escura `secret-logo.png` é que vai num **chip branco**.)

```css
.sa.cta .body{ flex-direction:column; align-items:flex-start; justify-content:center; gap:58px; }
.chip{ background:#fff; border-radius:36px; padding:47px 58px; display:inline-flex; }
.chip img{ height:86px; display:block; }   /* secret-logo.png dentro do chip branco */
.sa.cta .url{ font-size:47px; color:#9FC7C2; letter-spacing:.04em; font-weight:500; }
```

**Logo file:** `…/Saif/secret-align-remotion/public/secret-logo.png` (wordmark escuro com `=` teal). Em slide escuro → **sempre chip branco**. Nunca aplicar `invert` nele (descaracteriza o `=` teal); use o chip.

---

## 3. Preset Zahnspange Home (B2C · light · clean-medical)

**Personalidade:** premium-clean austríaco; fundo **branco**, azul-petróleo de autoridade + 1 acento magenta; a assinatura é o **dente-partido azul/rosa** (eco do logo). Educação-led, **Werberecht-safe** (§8).

### 3.1 Tokens (copy-paste — hex travado, verbatim do site da clínica)

```css
/* ───────── Zahnspange Home — brand tokens (LOCKED) ───────── */
:root{
  --zh-petrol:   #005280;   /* PRIMÁRIA — petróleo: títulos (Lato 900), corpo, ink */
  --zh-sky:      #26A1D8;   /* azul-céu — kicker, links/CTA, "Zahnspange"/dente esq. */
  --zh-petrol-d: #003A5C;   /* derivado (NÃO no site) — scrim de foto */
  --zh-magenta:  #DF378B;   /* ACENTO — magenta: "Home"/dente dir., ✓, pílula CTA */
  --zh-gray:     #9AA3B2;   /* texto "mito" tachado (✕) */
  --zh-no:       #C2566F;   /* o glifo ✕ (vermelho-rosé) */
  --zh-bg:       #FFFFFF;   --zh-bg-alt:#F2F4F5;
  --zh-ink-soft: #6B748B;   /* footer / corpo secundário */
  --zh-border:   #DCE0E3;
  --zh-font:     'Lato', system-ui, sans-serif;
}
```

### 3.2 Escala de tipo (px @1080) + pesos Lato

| Papel | @1080 | Peso | Notas |
|---|---|---|---|
| Kicker | **32px** | **700** | UPPERCASE, `letter-spacing:.16em`, cor `--zh-sky` |
| Headline | **90px** | **900** | `line-height:1.16`, cor `--zh-petrol` (Lato Black é o look) |
| Headline em foto | **79px** | 900 | branco sobre scrim petróleo |
| Corpo "mito" | **50px** | 400/700 | `line-height:1.32` |
| CTA pílula | **47px** | 700 | branco sobre magenta |
| Footer / handle | **34px** | 700 | handle em `--zh-sky` 700. **Sem contador de slide** (`1/6` etc.) |

Pesos Lato disponíveis: **300 / 400 / 700 / 900**. Título **sempre 900**; corpo 400; ênfase 700.

### 3.3 Hairline two-tone + ênfase + chrome

```css
.zh{ background:#FFFFFF; color:var(--zh-petrol); font-family:var(--zh-font); }
.zh .topbar{ height:14px; width:166px; border-radius:11px;       /* eco do dente-partido */
  background:linear-gradient(90deg, var(--zh-sky) 0 50%, var(--zh-magenta) 50%); }
.zh .brandlogo{ height:72px; opacity:.95; }   /* logo no topo dos slides claros */
.zh .kick{ font-size:32px; letter-spacing:.16em; text-transform:uppercase;
  color:var(--zh-sky); font-weight:700; margin-top:47px; }
.zh h2{ font-weight:900; font-size:90px; line-height:1.16; color:var(--zh-petrol); }
.zh h2 .acc{ box-shadow:inset 0 -29px 0 rgba(223,55,139,.18); }   /* underline magenta (não border) */
.zh .foot{ font-size:34px; color:var(--zh-ink-soft); }
.zh .foot .h{ color:var(--zh-sky); font-weight:700; } .zh .dot{ color:var(--zh-magenta); }
```

### 3.4 Padrão "mito" ✕ cinza / ✓ magenta (slide de educação/desmistificação)

O carrossel de mito-vs-fato vira: a afirmação errada em **cinza tachada com ✕** e a correção em **petróleo bold com ✓ magenta**. Werberecht-safe: educa, não promete.

```css
.myth{ font-size:50px; line-height:1.32; }
.myth .no{ color:var(--zh-gray); margin-top:18px; }
.myth .no::before{ content:"\2715  "; color:var(--zh-no); font-weight:700; }     /* ✕ */
.myth .yes{ color:var(--zh-petrol); font-weight:700; margin-top:29px; }
.myth .yes::before{ content:"\2713  "; color:var(--zh-magenta); font-weight:900; } /* ✓ */
```

### 3.5 Foto real do Saif — scrim duotone petróleo + logo em chip

Fotos reais (antes/depois clínico, clínica, Saif no palco) polidas no Magnific (img2img / relight / bg-remove), com **scrim petróleo** por cima e logo em **chip branco** no canto.

```css
.zh.photo{ padding:0; color:#fff; }
.zh.photo .img{ position:absolute; inset:0; background-size:cover; background-position:center;
  filter:grayscale(.4); }
.zh.photo .scrim{ position:absolute; inset:0;
  background:linear-gradient(180deg, rgba(0,58,92,.15), rgba(0,58,92,.86)); } /* petróleo, NÃO neutro */
.zh.photo .chipw{ position:absolute; top:65px; left:65px; background:#fff;
  border-radius:29px; padding:25px 36px; }   /* logo em chip branco sobre a foto */
.zh.photo .chipw img{ height:54px; display:block; }
.zh.photo .label{ position:absolute; top:65px; right:65px; font-size:31px; color:#eaf3fa;
  background:rgba(0,58,92,.5); padding:14px 29px; border-radius:72px; }   /* etiqueta opcional */
.zh.photo h2{ color:#fff; font-size:79px; }
.zh.photo .ov{ position:relative; margin-top:auto; padding:79px; }   /* texto ancora no rodapé */
.zh.photo .foot .h{ color:#fff; }
```

> **Exceção ao scrim neutro do pro:** aqui o scrim é **petróleo (`rgba(0,58,92,…)`) por design** (é a assinatura clínica), não o scrim neutro do `design-system.md §5`. Legibilidade ainda exige AA ≥ 4.5:1 sob o texto — use `fetch_image.py --measure-luma` e suba a opacidade do scrim se a foto for clara.

### 3.6 CTA Zahnspange

```css
.zh.cta .body{ align-items:flex-start; }
.pill{ display:inline-block; background:var(--zh-magenta); color:#fff; font-weight:700;
  font-size:47px; padding:40px 72px; border-radius:108px; margin-top:14px; }
.zh.cta .biolink{ font-size:40px; color:var(--zh-sky); font-weight:700; margin-top:36px; }
```

CTA padrão = pílula magenta **`Termin buchen · Link in Bio`**.

---

## 4. Regras de uso do logo (por marca)

| Marca | Arquivo / URL | Onde | Como |
|---|---|---|---|
| **SECRET** | `…/Saif/secret-align-remotion/public/secret-logo.png` (wordmark escuro, `=` teal) | só no **CTA** | em **chip branco** (`.chip`), 86px de altura. Internos usam o **wordmark de texto** `SECRET=` no footer (não o arquivo). **Nunca** `invert` (perde o `=` teal). |
| **Zahnspange** | header (vivo): `https://zahnspangehome.at/wp-content/uploads/2025/12/ZahnspangeHome_NO-BG-1.png` · branco: `…/2023/10/ZahnspangeHome_ِwhite-Copy.png` · glyph/favicon: `…/2023/11/fav-icon-300x300.png` | **topo dos slides claros**; em foto → **chip branco** no canto | logo colorido no topo dos slides brancos (`.brandlogo`, 72px). Em slide-foto, **chip branco** (`.chipw`, logo 54px). Versão branca só se for direto sobre o scrim escuro sem chip. |

Regra geral: logo **discreto**, nunca dominante. A autoridade vem da copy (ÖGAO, regra 4), não do tamanho do logo.

---

## 5. Padrões de CTA (default + variação por tipo de conteúdo)

**Defaults travados:**
- **SECRET** → chip branco com `secret-logo.png` + URL **`secretalign.com`** (teal apagado `#9FC7C2`). Sem exclamação, sem emoji, sem "vagas limitadas".
- **Zahnspange** → pílula magenta **`Termin buchen · Link in Bio`**.

**Variam pelo tipo de conteúdo** (mas mantêm preset/tokens):

| Tipo de conteúdo | SECRET (EN, B2B) | Zahnspange (DE paciente / EN autoridade) |
|---|---|---|
| Educação / explainer | `secretalign.com` | **`Termin buchen · Link in Bio`** (DE) |
| Feature / caso / prova | `Request access · secretalign.com` | `Mehr erfahren · Link in Bio` (DE) |
| Evento / congresso | `secretalign.com` (recap, sem pitch) | autoridade EN: `Treated by the ÖGAO president · Link in Bio` |
| Kids / sazonal / agendamento | — | **`Termin buchen · Link in Bio`** (DE), tom caloroso |
| Peer / clínico (autoridade) | `secretalign.com` | EN: `Book a consultation · Link in Bio` |

- **SECRET:** voz engineered, ponto final, zero hype (a voz nova do guia — regra 7).
- **Zahnspange:** CTA suave; o histórico tem 90% dos posts **sem CTA** — não force hard-sell. Default é o convite `Termin buchen`.
- **Sempre** entregar **só o texto do CTA/legenda** (regra 7): sem stage-direction de IA ("first seconds / show these visuals").
- **Sempre** pareie copy não-PT com uma **linha de intenção PT-BR** pro Gustavo revisar.

---

## 6. Imagery HÍBRIDA por marca (o que o Magnific produz, e onde)

**Ferramenta de imagem = MCP do Magnific (Nano Banana Pro). NÃO Higgsfield.** O fluxo do pro (`fetch_image.py` → base64) continua; só a fonte muda.

### 6.1 SECRET (regra 6 — higiene rígida)

| Slide | Fonte | O que |
|---|---|---|
| Capa / esparso | **Magnific — textura teal abstrata** | `images_generate({prompt:"abstract teal engineered texture, dark, topographic lines, no text, no people, 4:5", aspectRatio:"4:5"})` → entra como `imgbg` sob o gradiente `.sa.tex`. |
| Software | **Print real do app no frame de computador** | screenshot do **software novo + 3D novos** → `images_relight`/`images_upscale` no Magnific → dentro do `.scr`. **Nunca** a plataforma preta antiga; uploads rápidos. |
| Internos | tipográfico/limpo (sem imagem) | premium-minimal: negative space é a feature. |

> **PROIBIDO no SECRET:** rostos, dentes, pessoas ou bocas geradas por IA. Só texturas abstratas + prints reais de software. Esconder nome do paciente E do Saif.

### 6.2 Zahnspange (foto real polida)

| Slide | Fonte | O que |
|---|---|---|
| Foto (antes/depois clínico, clínica, Saif) | **Foto REAL do Saif, polida no Magnific** | `images_remove_background` (recortar), `images_relight` (uniformizar luz), `images_upscale`, `images_skin_enhancer` se for retrato. Depois aplica o **scrim duotone petróleo** + chip do logo. |
| Fundo abstrato (onde for seguro) | **Magnific IA** | texturas/ambientes neutros **sem rosto/dente** — só onde não há risco Werberecht. |
| Educação / mito / dado | limpo, sem foto | fundo branco + tipo grande + topbar two-tone. |

> Antes/depois é **clínico/educacional** (ClinCheck 3D como "antes/depois digital"), **nunca glamour/sensacionalista** (Werberecht — §8). Foto de paciente real só anonimizada e enquadrada como educação.

### 6.3 Comum

- Teto ~4 imagens/carrossel (custo + carga). Capa sempre tem tratamento visual.
- Cheque `mcp__magnific__account_balance` na 1ª geração da sessão; lote enxuto.
- Texto sobre imagem: scrim que garanta **AA ≥ 4.5:1** (`fetch_image.py --measure-luma`).

---

## 7. EDITABLE-MATERIALS STANDARD (skill-wide)

**Regra: no Drive só entra o PNG final; todo o editável fica LOCAL** em `🚀_Projects/Saif/Content_Production/`.

**Drive compartilhado (final):**
```
Content_Calendar/<Brand>/Week_<NN>_<MonDD>/Carousels/W<NN>_C<n>_<slug>/  01.png … 06.png
```
**Local (editável) — guarde TODAS as fontes:**
```
Content_Production/Week_<NN>_<MonDD>/<Brand>/W<NN>_C<n>_<slug>/
  ├─ index.html          # todos os slides (fontes + imagens em base64) — editável
  ├─ images/             # imagens (Magnific / foto / textura) orig + polidas
  ├─ <slug>.docx         # legenda (regra 7: só texto) + linha de intenção PT-BR
  └─ png/slide_NN.png    # PNGs fonte (a cópia final NUMERADA vai pro Drive)
```
Reutilizáveis: `Content_Production/_studio/` (`render.py`, `fonts.css`, `assets/`: logos + texturas). Dados dos
slides: `Week_<NN>/_build/carousels.py`. **Publicar PNGs → Drive:** `python3 Week_<NN>/_build/publish_to_drive.py`.
Mapa completo: `Content_Production/_README.md`.

- `<Brand>` = `SECRET_Align` | `Zahnspange_Home`. Carrossel da clínica = par `..._de/` + `..._en/` (local e Drive).
- Ritual de entrega (CLAUDE.md / 08_CONTENT_OPS): os finais em `02_For_Approval/` (ou direto na `Week`) → Saif aprova → `03_Approved/` → agenda.

---

## 8. Filtro Werberecht por slide (só Zahnspange; SECRET = mais leve, discreto)

Rodar **por slide** (não só na legenda). Aplica à **Zahnspange Home** (B2C/paciente). SECRET (B2B/dentista) é mais leve — mas continue discreto e sem hype.

| ❌ Proibido (não replicar — o Saif já comete) | ✅ Faça em vez |
|---|---|
| Promessa de resultado ("perfektes Lächeln", "sorriso perfeito garantido") | "schonend und nahezu unsichtbar korrigieren" / "Entenda como o planejamento prevê seu resultado." |
| Linguagem saldão / marktschreierisch ("Melhor preço!", "Desconto louco!") | educação neutra, claim concreto e verificável |
| Comparação com concorrente ("melhor que DrSmile", "unlike other brands") | "Facharzt statt DIY-Kit." (nunca na conta da clínica) |
| Antes/depois sensacionalista de rosto | antes/depois **clínico/educacional**; ClinCheck 3D como "antes/depois digital" |
| Superlativo ("best", "magic", "unschlagbar") | claim concreto |
| Influencer leigo promovendo dispositivo médico | educação do profissional / autoridade ÖGAO |

**Reforços (regras 4–5):** o título **"Präsident der ÖGAO" / "President of the ÖGAO"** é a USP — declare-o (hoje invisível). Perfil pessoal > perfil da clínica pro ângulo de autoridade.

**Língua por camada (Zahnspange):** **DE** = paciente (educação/agendamento/kids/sazonal → alcance); **EN** = clínico/autoridade/peer (casos, TADs, congresso, ÖGAO → likes). **SECRET = EN** (premium-minimal). Sempre pareie com a linha de intenção PT-BR.

---

## 9. Checklist pré-export (este fork)

- [ ] Preset correto e **isolado** (tokens SECRET ↔ Zahnspange nunca misturados).
- [ ] **SECRET:** headline weight 300 com 1–2 palavras-chave (`<b>` branco / `.t` teal); kicker `.22em` teal + hairline teal; footer `SECRET=` (`=` teal); CTA = chip branco + `secretalign.com`; **zero rosto/dente/pessoa IA**; nada da plataforma preta antiga; uploads rápidos; nomes (paciente + Saif) escondidos.
- [ ] **Zahnspange:** título Lato 900 petróleo; topbar two-tone (sky→magenta); mito ✕ cinza/✓ magenta; foto com scrim **petróleo** + chip branco; CTA = pílula magenta `Termin buchen · Link in Bio`.
- [ ] Werberecht rodado **por slide** (só Zahnspange); SECRET sem hype/emoji/exclamação.
- [ ] Bans impeccable: sem side-stripe, sem gradient-text, sem em-dash em chrome, sem watermark "Powered by".
- [ ] Canvas preenchido (55–75%; SECRET pode ~55% com negative space); squint test; ≤4 ideias/slide.
- [ ] Texto sobre foto com scrim AA ≥ 4.5:1 (`--measure-luma`).
- [ ] Fontes **base64** (Poppins / Lato, latin + latin-ext pra acentos DE), nunca `<link>`.
- [ ] EDITABLE-MATERIALS salvo: `index.html` + `images/` + `.docx` (só o texto + linha PT-BR) + `png/` em `Content_Calendar/<Brand>/Week_<NN>/W<NN>_C<n>_<slug>/`.
- [ ] Copy não-PT pareada com linha de intenção PT-BR (regra 2/7).

---

### Notas do operador (PT-BR)

- O mockup-fonte (`carousel-styles-v2.html`) está em **escala de preview 300×375 (1:3.6)**. Todos os px deste arquivo já estão **convertidos pra 1080×1350** — use estes, não os do mockup cru.
- Em **conflito**, a ordem de precedência é: **este arquivo → [impeccable-baked.md](impeccable-baked.md) → Bloco 6 do system-prompt do `pro`**. As cores são **hardcoded por marca**; ignore qualquer instrução do `pro` pra "derivar a cor do briefing".
- Modo **render-default**: você recebe a copy pronta — só renderize com o preset certo. Modo **standalone-editorial**: rode o cérebro editorial do `pro`, mas calibrado pelas vozes de `09_BRAND_VOICE_BASELINE.md` (projeto Saif) (DE-paciente/EN-autoridade na clínica; EN engineered no SECRET) antes de cair no render.
