# Design System — content-machine-secret (LOCKED VISUAL · SECRET Align · **Swiss Grid**)

> **Fork de `content-machine-pro`.** Este arquivo é o **sistema visual TRAVADO** do carrossel do **SECRET Align**. O padrão foi **atualizado em 07/07/2026** do antigo dark/teal para **"Swiss Grid"** — superfície clara graphite + textura técnica + teal + cards de canto reto. **Espelhe-o, não reinvente.** Onde este arquivo definir um token, ele é lei.
>
> **Renderer canônico:** `Content_Production/_studio/render.py`, branch `.sa` (a string `CSS`). É ele que pinta os PNGs da semana; este doc **espelha** aquele CSS. Se divergirem, o `render.py` é a fonte-verdade da produção — sincronize este doc a ele.
>
> **Precedência (conflito):** **este arquivo + [impeccable-baked.md](impeccable-baked.md) vencem o `Bloco 6` do system-prompt do `pro`** e qualquer paleta "derivada da marca". As cores aqui são **hardcoded** (não derivadas no briefing). O resto do pipeline do `pro` (HTML 1080×1350 → `scripts/export_png.py` Playwright; fontes via `scripts/fonts_to_base64.py` em base64, **nunca `<link>`**; imagens via `scripts/fetch_image.py`) **continua valendo**.
>
> **Uma marca:** SECRET Align (B2B, premium-minimal, regra 6). Carrossel da clínica → `content-machine-clinic`.
>
> **Dois modos da skill:** **(A) render-default** — recebe a copy pronta + imagens; só renderiza PNGs via `render.py`. **(B) standalone-editorial** — cérebro editorial na voz SECRET (10 headlines → spine → validação → texto), depois cai no mesmo render. Em ambos o output respeita o **EDITABLE-MATERIALS STANDARD** (§6).
>
> **★★ MODELO FINAL — CONSOLIDADO (12/07/2026, Semana 1 fechada). Isto é a VERDADE ATUAL; em conflito com qualquer bloco/token datado abaixo (Swiss-Grid `#EEF4F2`/`#0B7E78`/`#00C8B4` etc.), ISTO vence. Fonte-verdade = `render.py` branch `.sa` + vídeo `EventFilm.tsx`.**
> - **Paleta = SÓ as 5 do manual p.11** (nenhuma fora): `#FFFFFF` · `#C4C3C2` cinza · `#209194` teal · `#80C6C7` teal-claro · `#1D252D` navy.
> - **Superfície = mint `#E9F2F1`** (tint de #80C6C7, do card do Saif). Poppins. Padding 96/64/84.
> - **Texto:** headline/`stmt` = **navy `#1D252D`** (82/66px); sub/caption = **cinza da LOGO `#787878`** (30-32px, weight 400 — ⚠️ 21/07: pálido `#C4C3C2` ilegível → navy → acerto final = cinza-logo, ver bloco 21/07); ênfase/`.rule`/url/step/bignum = **teal `#209194`**; **anel/círculo (capa+cta) = `#80C6C7`**.
> - **Textura = contour do Saif BEM FRACO:** `secret_contour_light.png` (linhas `#80C6C7`) `opacity:.16` `background-position:left center`. Verificar contra o card `Plan Your Case`.
> - **Canto sup-DIREITO = só o tracinho teal `.rule`** (`position:absolute;top:96;right:64`) — **SEM eyebrow "SECRET Navigator"** (é SECRET Align).
> - **Logo rodapé + CTA = UMA logo = o lockup** `secret-logo-full.png` ("SECRET" + "CLEAR ALIGNER SYSTEM" embaixo), **extraído do card `Plan Your Case.png`** (cinza `#787878`, contraste bom) — NÃO o do manual PDF (`#C4C3C2`, some), NÃO um 2º badge. wmlogo 118px, ctalogo 150px.
> - **Screenshots padronizados:** `.scr img{height:430px;object-fit:contain;background:#FFFFFF}`.
> - **Cópia — a VOZ do Saif é PUNCHY / direta / contrarian (B2B)** (confirmado no doc dele `~/Downloads/SECRET_W01_Scripts.docx.md`, 13/07): frases-soco curtas em 2 linhas ("Same malocclusion. / Two different brands."), **contrastes imperativos** ("**Stop** paying for the logo. **Start** planning for predictable results."), **desafio ao concorrente é OK** (é B2B: "from our competitors", "Challenge Accepted!"), hooks provocativos ("The plastic doesn't matter. The planning does."), "!" permitido. CTA = "Submit your next case with secretalign." **Quando o Saif MANDA docx → seguir AO PÉ DA LETRA** (linha1=topo, linha2=embaixo na ordem dele, quebra=`<br>`, palavras exatas; só remover travessão "—" e fix de caixa; audit vs docx). **Quando GERAR do zero → escrever NESSA voz punchy.** Higiene regra 6. Nunca reusar imagem com a clínica.
> - **Vídeo (`EventFilm.tsx`) = mesmos tokens** (mint, navy/cinza/teal, contour .16 light, logo completa, anel `#80C6C7`).
>
> **⚠️⚠️⚠️ REVISÃO 23-24/07/2026 (áudio + docx do PRÓPRIO SAIF — OVERRIDE de posicionamento, vale sobre tudo abaixo):**
> - **A SECRET VENDE TRATAMENTO, NÃO PLANEJAMENTO** (áudio 23/07: "You are doing treatment, not planning. We are not selling plans. We are selling treatments."). A tese "the plan not the plastic"/prova-primeiro está MORTA como tema.
> - **Frame de produto NOVO (docx do Saif 24/07, verbatim): "SECRET Navigator, the intelligence behind SECRET Aligners."** O antigo "SECRET Navigator, the aligner planning software" está PROIBIDO como tagline/identidade.
> - **"Planning" só qualificado por TREATMENT** — o Saif mesmo escreve "treatment plans"/"treatment planning" ("Until insights become treatment plans.", "Predictability starts with treatment planning."). Nunca "plan/planning" como o produto ou como identidade da marca.
> - **Banco de frases do Saif (usar como referência de voz):** "Until insights become treatment plans." · "Predictability starts with treatment planning." · "all powered by SECRET Navigator, the intelligence behind SECRET Aligners" · "Every smile is unique. Your Clear Aligner System should be too."
> - Migração CONCLUÍDA (24/07): a SECRET tem workspace próprio `🚀_Projects/Secret_Align/` com `01_BRAND/BRAND_FOUNDATION.md` + `VOICE.md` (baseados no site secretalign.com) como **fonte de copy**. Os 3 carrosséis da W03 estão marcados pra REFAZER treatment-first (auditoria antes de re-render).
>
> **⚠️⚠️ REVISÃO 21/07/2026 (review Gustavo Semana 3 — OVERRIDE do "sub/caption = cinza" do MODELO FINAL; corrigida no 2º review do mesmo dia):**
> - **TEXTO DE APOIO = CINZA DA LOGO `#787878`** (o mesmo cinza do wordmark extraído do card `Plan Your Case`). Histórico do acerto: o cinza pálido `#C4C3C2` ficou ilegível ("muito difícil de ler") → tentei navy → Gustavo corrigiu: **"o cinza estava melhor, só que muito esmaecido... cinza um pouco mais escuro, o cinza da logo da Secret"**. Regra final: `.sa .sub` = 30px `#787878` weight 400 · `.sa .caphi` = 32px `#787878` · `.duo .lab.a` = `#787878` (o `.lab.b` segue teal). O `#C4C3C2` fica restrito a UI decorativa (hairline `.scr`, bolinhas) — **nunca texto**; navy `#1D252D` = só headline/statement. Aplicado no `render.py` (fonte-verdade).
> - **TERMINOLOGIA CLÍNICA:** nunca "tray" para o alinhador — o termo é **"aligner"** (Gustavo 21/07: "esse suporte não é trei"). Em dúvida de termo, usar o vocabulário do site `secretalign.com` ou do docx do Saif.
> - **CLAIMS SÓ VERIFICÁVEIS:** afirmação clínica comparativa (ex. "aligners match brackets") só se o site da SECRET ou material do Saif sustentar; senão, reformular pro que é defensável (o site fala de rotações/scalloped edge, maloclusões, menos refinements — não de paridade com brackets).
> - **SCREENSHOT DE UI NÃO-ÓBVIA = EXPLICAR NO PRÓPRIO CARD.** Imagem tipo Gantt/tabela de staging que um leigo não decodifica ("não entendi o que significa essa imagem" — Gustavo) precisa de **anotação visual na imagem** (label/seta teal, ex. "each row = one tooth · 20 stages →") ou de um caption que traduza literalmente o que se vê. Sem isso, trocar a imagem.
> - **SUJEITO CENTRADO NO CROP.** Toda captura entra com o objeto (arco/modelo) **centralizado na janela** — crop assimétrico com o arco encostado num canto é reprovado ("a imagem ficou completamente descentralizada nas janelas").
> - **LAYOUT TEXTO-IMAGEM-TEXTO (card de fechamento de case):** o `soft` aceita `h2` = segunda frase GRANDE abaixo da imagem (mesma fonte/tamanho do `h`). Padrão do Gustavo p/ card-clímax: frase em cima (destaque teal no fim), imagem, frase embaixo (destaque teal no fim). **Nunca rebaixar frase de conteúdo pra caption/credit pequena** — se a frase é parte do argumento, ela é grande.
> - **PROVENIÊNCIA OBRIGATÓRIA:** toda captura do Navigator entra com o caminho-de-clique documentado em `_media/nav_caps/ORIGEM_DAS_CAPTURAS.md` da semana (ferramenta da barra esquerda + estado do slider). O Saif pergunta "onde você achou isso" — a resposta tem que existir por escrito ANTES de entregar.
> - **CLAIM CLÍNICA CALIBRADA:** attachments/recursos **melhoram/tornam previsível** um movimento; nunca "makes it possible / impossible without" (rotação roda sem attachment, só pior). Verbo certo: *predictable, controlled, improves* — não *possible*.
> - **FUNDO DE SCREENSHOT EQUALIZADO.** O print do Navigator vinha com painel cinza-gelo (~`#F5FAF9`) + sobras brancas nas laterais destoando do card ("branco meio creme vs branco gelo... equalizar essas cores" — Gustavo 21/07). Regra: **toda captura entra viewport-tight (recortada só no 3D) e com fundo ACHATADO pra branco puro `#FFFFFF`** (ImageMagick: `-fuzz 8% -fill white -opaque <cinza-do-painel>` ou level dos near-whites) ANTES do render. Nada de faixas cinza nem recortes brancos dentro do frame.
> - **VARIEDADE DE IMAGEM:** não repetir a mesma captura entre carrosséis da mesma semana; cada peça com set próprio. Before/after (dual) tem que ser **visivelmente diferente no thumbnail** (ex.: vista oclusal apinhado vs alinhado), senão trocar a vista.
>
> **⚠️⚠️ REVISÃO 12/07/2026 (reunião Saif + manual da marca — OVERRIDE de TUDO abaixo em cor/logo/textura):**
> - **PALETA TRAVADA AO MANUAL DA MARCA (`SECRET_Navigator_Material/Branding Guidelines/SECRET ALIGNER.pdf` p.11) — SÓ estas 5 cores, nenhuma fora disso:** `#FFFFFF` branco · `#C4C3C2` cinza (texto) · `#209194` teal (acento) · `#80C6C7` teal-claro (círculo/anel) · `#1D252D` navy (headline/ênfase). **Aposentados** os off-brand `#0B7E78`/`#00C8B4`/`#0A1412`/`#4A625C`/`#06322D`. "Nenhuma cor pode sair desse padrão" (Gustavo 12/07).
> - **Texto:** headline/statement = **navy `#1D252D`** (legível na superfície clara); secundário (sub/caption/credit/foot) = **cinza `#C4C3C2`**; ênfase (`<b>`/`.t`), rule, url, step, bignum = **teal `#209194`**. *(Saif pediu "texto = cinza #C4C3C2"; usamos o cinza no texto de apoio. Headline em #C4C3C2 puro sobre o mint claro dá ~1.5:1 = ilegível no feed, então headline = navy do manual. Se ele quiser TUDO cinza como o card hero "Plan Your Case", é 1 linha no `render.py`.)*
> - **Círculo/anel (capa+CTA) = `#80C6C7`** (o "circulo" que o Saif citou) — **não** o mint brilhante `#00C8B4`.
> - **Marca de canto = SÓ o tracinho teal `.rule`, no canto SUPERIOR-DIREITO — SEM o eyebrow "SECRET Navigator".** Estes posts são da **SECRET Align**, não do software Navigator. (A caption/corpo pode citar "SECRET Navigator"; o **rótulo de canto não**.) No `render.py`: `TOP="<div class='rule'></div>"` em todo slide (`.rule` = `position:absolute;top:96px;right:64px`), zero `kick`.
> - **Logo do rodapé (canto inf. esq.) + CTA = UMA logo só = o lockup** (`secret-logo-full.png`): **"SECRET" wordmark + "CLEAR ALIGNER SYSTEM" embaixo** (o subtítulo TEM que aparecer). É **uma** logo — **NÃO** empilhar um segundo badge "SECRET" (Gustavo 12/07: "colocou como se fossem dois logos"). ⚠️ **Extrair do card do Saif `Plan Your Case.png`** (white-key → transparente), NÃO da PDF do manual — o do manual tem o wordmark no cinza claro `#C4C3C2` que **some** no mint; o do card tem cinza **`#787878` (mais escuro)** = contraste bom + subtítulo legível. Teal E preservado. Branca p/ dark = `secret-logo-full-white.png`. Não recolorir (manual p.6).
> - **Textura contour BEM FRACA (Gustavo 12/07: a `#209194`@.20 ainda ficou forte):** `.sa.tx-contour::before{background-image:url(secret_contour_light.png);background-size:cover;background-position:left center;opacity:.16}`. Asset = contour do Saif **recolorido pro teal-CLARO `#80C6C7`** (palette, bem mais pálido que `#209194`) → linhas quase imperceptíveis, como no card do Saif. `background-position:left` = "pattern encostado no canto esquerdo". **Verificar sempre contra o card `Plan Your Case`.**
> - **Screenshots em fundo BRANCO `#FFFFFF`** (era `#F4FAF9` — fora da paleta). Auditar TODO hex do `.sa` ∈ {5 cores do manual}.
> - **Superfície = mint `#E9F2F1`** (tint baixo de `#80C6C7`, = o card do Saif). Tudo espelhado no `render.py` branch `.sa` (fonte-verdade da produção).
> - **Vídeo (event-films):** mesmas regras — `EventFilm.tsx` tokens = navy/cinza/teal/teal-claro; contour 20% left; cartelas title/end no mint; logo completa (`SecretLogo` → `secret-logo-full*.png`); anéis `#80C6C7`.
>
> **⚠️ REVISÃO 10/07/2026 (reunião Saif — OVERRIDE do padrão 07/07):**
> - **Textura = CONTOUR ÚNICA** (acabou a rotação de 6). É o **padrão topográfico do próprio Saif** (`Pattern Design-02` → curvas de nível teal, linhas **FINAS e opacidade MUITO baixa ~.18** — Saif quer discreto/sutil, não grosseiro). `render.py`: `SA_TEX=["contour"]` + `.sa.tx-contour::before{background-image:url(secret_contour_teal.png);background-size:cover;opacity:.18}`. Asset derivado do `Pattern Design-02` via high-pass suave (blur 18 + level 42%). **SEM dots** — os dots ficaram exclusivos da clínica pra as duas contas não parecerem "conectadas". Superfície **clara mantida**.
> - **⚠️⚠️ CÓPIA SECRET = VERBATIM AO DOCX DO SAIF — REGRA DURA, NÃO-NEGOCIÁVEL (double-check Gustavo 11/07).** Quando o Saif manda os scripts (`SECRET_W01_Scripts.docx` etc.), a cópia de TODO slide + a caption + as hashtags são **as palavras EXATAS dele**. Permitido SÓ: (a) corrigir typo óbvio, (b) remover travessão (o "01 — X" vira `n="01"` + texto), (c) `<b>`/`<span class='t'>` de ênfase (estilo, não muda palavra). **PROIBIDO:** parafrasear, encurtar, reordenar, **inventar frase/slide que ele não escreveu**, adicionar subtítulo que ele não escreveu, ou trocar hashtag. A estrutura segue as N linhas do docx (1 slide por bullet) + caption/hashtags exatos. ⚠️ **CORREÇÃO 13/07:** "Stop paying for the logo", "Challenge Accepted!", "biomechanics" **NÃO eram invenção — são a copy REAL do Saif** (`SECRET_W01_Scripts.docx.md`). **A voz DELE É punchy/contrarian** (ver MODELO FINAL no topo). Ou seja: quando ele manda docx = verbatim; quando gerar do zero = escrever nessa voz punchy dele (marcar rascunho até validar).
> - **✅ VERIFICAÇÃO OBRIGATÓRIA antes de fechar:** rodar um diff/audit slide-a-slide da cópia renderizada contra o docx do Saif (`textutil -convert txt`), classificar cada linha MATCH/DEVIATION/INVENTED, e só liberar com tudo MATCH (fora typo/travessão). Já pegou um render inteiro reescrito que se dizia "verbatim" e não era.
> - **Screenshots sempre alta-res** (Saif: nunca baixa-res; usar versões upscaladas quando não der pra recapturar). **Texto de statement maior** (`.sa .stmt` = 68px). Slide de texto vazio pode ganhar uma **foto de produto** (ex. dois alinhadores) SEM borda/card: `soft` + `cutout=True` com PNG **transparente**. **Borda/card de imagem é só da CLÍNICA**; SECRET usa cutout borderless.
> - **CADA CARD INDIVIDUAL + screenshots PADRONIZADOS (Gustavo 11/07):** os prints de software não podem variar de tamanho/zoom/enquadramento entre slides (a "logo"/marcador da Secret não pode aparecer cortado num slide e sumir noutro). **Regra travada no `render.py`:** `.sa .scr img{width:100%;height:430px;object-fit:contain;background:#F5FAF9}` — **altura FIXA + contain** em TODO screenshot (soft **e** num), pra todos ficarem do mesmo tamanho, nada cortado, e o **wordmark SECRET do footer nunca deslocar/cortar** (screenshot alto estava transbordando o `.body flex:1` e empurrando o footer pra fora do canvas de 1350px com `overflow:hidden`). Cada card mostra o conceito da frase; compor individualmente (mesma filosofia da clínica).
> - **⚠️ NUNCA reusar a MESMA imagem nas DUAS contas** (Gustavo 11/07): o mesmo print (ex. o gizmo de movimento `sw2_ft_model`) não pode aparecer na SECRET **e** na clínica — parece copy-paste. Mantém o asset na conta onde ele é núcleo da mensagem e troca na outra.

---

## 1. Arquitetura de slide

- **Canvas:** `1080×1350` nativo (4:5), um `.slide` por imagem, empilhados pro preview; export screenshota cada `.slide`.
- **Safe margins:** conteúdo respira **64px** nas laterais; topo **~88px**, base **~80px** (footer).
- **Superfície clara (NÃO escura):** o Swiss Grid vive numa superfície **graphite claro `#EEF4F2`** — nunca fundo escuro. O respiro premium continua, agora **sobre luz** + uma textura técnica sutil.
- **Tipos de slide:**
  1. **Cover (capa)** — kicker teal + hairline + headline Poppins-300 + **anel teal** (assinatura Swiss) + logo escura no rodapé. Type-led, sem foto full-bleed.
  2. **stmt (statement)** — texto grande (`stmtbig`) direto sobre a superfície + textura; sem frame.
  3. **soft (software)** — screenshot do software num **frame de janela CLARO de canto reto** (§2.5).
  4. **num (checklist)** — número teal grande + statement; sem frame.
  5. **CTA (último)** — logo escura + `line` + `secretalign.com` + anel teal.
- **Sequência sugerida (6 slides):** Capa → alterna stmt/soft/num → penúltimo = payoff (`stmt`) → **CTA limpo**.
- **Bans herdados (impeccable):** sem side-stripe, sem gradient-text (`background-clip:text`), sem em-dash em chrome/label, sem glassmorphism gratuito, sem watermark "Powered by". ≤4 ideias por slide. Squint test obrigatório.

---

## 2. Preset SECRET Align (B2B · **Swiss Grid** · light + teal + técnico)

**Personalidade:** engineered, técnico, premium-minimal, **CLARO**. Traduz "a inteligência do planejamento" numa gramática de grade CAD: superfície graphite clara, textura técnica, teal como único acento, cards de canto reto. Sem hype, sem escuro.

### 2.1 Tokens (copy-paste — hex travado, **não derivar**)

```css
/* ───────── SECRET Align — Swiss Grid tokens (LOCKED · 07/07/26) ───────── */
:root{
  --sa-surface: #EEF4F2;   /* superfície graphite clara canônica (fundo de tudo) */
  --sa-ink:     #0A1412;   /* texto/headline (quase-preto esverdeado) */
  --sa-deep:    #06322D;   /* palavra-chave em <b> (teal-preto) */
  --sa-tealink: #0B7E78;   /* teal escuro p/ texto/kicker/url (AA em superfície clara) */
  --sa-teal:    #00C8B4;   /* teal vivo — hairline, anel, dots do frame (NÃO em texto pequeno) */
  --sa-cap:     #4A625C;   /* legenda/credit/footer (cinza-petróleo) */
  --sa-card:    #FFFFFF;   /* fundo do frame de software (branco) */
  --sa-font:    'Poppins', system-ui, sans-serif;
}
```

> **Contraste (AA):** teal vivo `#00C8B4` **só** em elementos gráficos grandes (hairline, anel, número gigante usa `--sa-tealink`). Texto/kicker/url usam **`#0B7E78`** (teal escuro) sobre a superfície clara.

### 2.2 Escala de tipo (px @1080)

| Papel | @1080 | Peso | Notas |
|---|---|---|---|
| Kicker (eyebrow) | **34px** | 600 | UPPERCASE, `letter-spacing:.22em`, cor `--sa-tealink` |
| Headline capa | **83px** | **300** | `line-height:1.24`, `letter-spacing:-.005em`; `<b>` em `--sa-deep`, `.t` em `--sa-tealink` |
| stmtbig | **78px** | 300 | statement grande sobre a grade |
| stmt | **62px** | 300 | statement médio (soft/num) |
| Número gigante | **184px** | 600 | cor `--sa-tealink`, `line-height:.86` |
| URL CTA | **47px** | 500 | cor `--sa-tealink` |
| Footer/legenda/credit | **30–34px** | 400 | cor `--sa-cap` |

> **Ponderação da headline (regra-chave):** headline **leve (300)** com **1–2 palavras-chave** — uma em **`--sa-deep` (600)** via `<b>`, e/ou uma em **teal (500)** via `.t`. Nunca a frase toda em peso alto. É o que dá o ar "engineered".

### 2.3 Kicker + hairline

```css
.sa .kick{ font-size:34px; letter-spacing:.22em; text-transform:uppercase; color:#0B7E78; font-weight:600; }
.sa .rule{ width:94px; height:7px; background:#00C8B4; margin-top:34px; }
.sa h2{ font-weight:300; font-size:83px; line-height:1.24; letter-spacing:-.005em; color:#0A1412; }
.sa h2 b{ font-weight:600; color:#06322D; }
.sa h2 .t{ color:#0B7E78; font-weight:500; }
```

### 2.4 Textura de fundo — **ROTAÇÃO (1 por carrossel)**

O Swiss Grid tem **6 texturas** aplicadas via `.sa::before` (full-bleed, `z-index:0`; conteúdo em `.sa>*{z-index:2}`). **Uma textura por carrossel**, ciclando entre os carrosséis pra dar variedade no feed. Ordem canônica: **grid · dots · blueprint · hatch · contour · mesh**. No `render.py` isso é o campo `texture="<nome>"` no dict do carrossel (ou auto-cicla por índice).

```css
.sa{ background:#EEF4F2; color:#0A1412; font-family:'Poppins',sans-serif; padding:88px 64px 80px; }
.sa>*{ position:relative; z-index:2; }
.sa::before{ content:""; position:absolute; inset:0; z-index:0; }
.sa.tx-grid::before{ background-image:repeating-linear-gradient(90deg,rgba(11,110,104,.12) 0 1.5px,transparent 1.5px 25%); }
.sa.tx-dots::before{ background-image:radial-gradient(circle 2.5px at center,rgba(11,110,104,.14) 96%,transparent 0); background-size:40px 40px; }
.sa.tx-blueprint::before{ background-image:repeating-linear-gradient(0deg,rgba(11,110,104,.10) 0 1px,transparent 1px 58px),repeating-linear-gradient(90deg,rgba(11,110,104,.10) 0 1px,transparent 1px 58px); }
.sa.tx-hatch::before{ background-image:repeating-linear-gradient(135deg,rgba(11,110,104,.09) 0 2px,transparent 2px 22px); }
.sa.tx-contour::before{ background-image:repeating-radial-gradient(circle at 82% 12%,transparent 0 44px,rgba(11,110,104,.10) 44px 46px); }
.sa.tx-mesh{ background:radial-gradient(60% 55% at 16% 12%,rgba(0,200,180,.20),transparent 55%),radial-gradient(55% 55% at 88% 86%,rgba(0,183,166,.16),transparent 55%),linear-gradient(180deg,#F1F7F5,#E3F2EE); }
.sa.tx-mesh::before{ content:none; }
/* anel teal — assinatura Swiss (capa + cta) */
.sa.cover::after{ content:""; position:absolute; bottom:-160px; right:-120px; width:470px; height:470px; border-radius:50%; border:26px solid #00C8B4; opacity:.85; z-index:1; }
.sa.cta::after{ content:""; position:absolute; top:-150px; left:-150px; width:420px; height:420px; border-radius:50%; border:24px solid rgba(0,200,180,.5); z-index:1; }
```

### 2.5 Frame de COMPUTADOR pro software (regra 6) — **CLARO, canto reto**

**Nunca** mockup de celular pro software (exceção única: "Send to Patient"). Screenshot do **software novo + 3D novos** (nunca a plataforma preta antiga) num frame de janela **claro, de canto reto** (Swiss):

```css
.sa .scr{ width:100%; background:#fff; border:1.5px solid rgba(11,110,104,.4); border-radius:0; overflow:hidden; box-shadow:0 24px 54px rgba(6,44,38,.14); }
.sa .scr .bar{ height:50px; background:#E7F1EE; display:flex; align-items:center; gap:13px; padding:0 24px; border-bottom:1px solid rgba(11,110,104,.16); }
.sa .scr .bar i{ width:14px; height:14px; border-radius:50%; background:rgba(11,110,104,.32); }
.sa .scr img{ width:100%; display:block; }
```

- Conteúdo = **print real** do app (relight/upscale no Magnific), centralizado (§5.1). **Uploads rápidos** (regra 6).
- **Nunca rostos/dentes/pessoas gerados por IA.** Só a textura procedural + prints reais de software/3D.

### 2.6 Footer + logo

```css
.sa .foot{ display:flex; justify-content:space-between; align-items:center; font-size:34px; color:#4A625C; margin-top:40px; }
.sa .wmlogo{ height:40px; display:block; opacity:.96; }   /* secret-logo.png ESCURA no rodapé */
.sa .ctalogo{ height:88px; display:block; }               /* secret-logo.png ESCURA no CTA */
```

- Superfície clara ⇒ use a **logo ESCURA** `assets/secret-logo.png` (letras escuras + `=` teal). **Sem chip** (não precisa, a superfície é clara). **Nunca** a logo branca (era pro fundo escuro antigo), **nunca** `invert`, **sem contador `1/6`**.

---

## 3. Uso do logo

| Arquivo | Onde | Como |
|---|---|---|
| `_studio/assets/secret-logo.png` (escura, `=` teal) | footer (todos) + CTA | direto na superfície clara: ~40px no footer, ~88px no CTA. Sem chip, sem invert. |

Logo **discreto**; a autoridade vem da copy (substância/prova), não do tamanho do logo.

---

## 4. Padrões de CTA

**Default travado:** logo escura + URL **`secretalign.com`** (`#0B7E78`) + `line` curta. Sem exclamação, emoji, "vagas limitadas".

| Tipo de conteúdo | CTA (EN, B2B) |
|---|---|
| Educação / explainer | `secretalign.com` |
| Feature / caso / prova | `See it on your next case · secretalign.com` |
| Evento / congresso | `secretalign.com` (recap, sem pitch) |

- Voz engineered, ponto final, zero hype. CTA = resultado concreto + alavanca, **sem travessão** (use `·`).
- **Sempre** entregar **só o texto** do CTA/legenda (regra 7). Copy é **EN-only** (SECRET não usa linha PT-BR no material do cliente; a intenção PT-BR fica no doc interno se preciso).

---

## 5. Imagery (regra 6)

**Ferramenta de imagem = MCP do Magnific (Nano Banana Pro). NÃO Higgsfield.** Detalhe em [magnific-images.md](magnific-images.md).

| Slide | Fonte | O que |
|---|---|---|
| Capa / stmt | **textura procedural CSS** (§2.4) | não precisa de imagem — a grade/textura + anel teal É o visual. |
| soft (software) | **print real do app** no `.scr` claro | software novo + 3D novos → `images_relight`/`images_upscale` → dentro do frame. Nunca a plataforma preta antiga; uploads rápidos. |
| num | número teal (sem imagem) | tipográfico. |

> **PROIBIDO:** rostos, dentes, pessoas ou bocas geradas por IA. Só textura procedural + prints reais. Esconder nome do paciente E do Saif.
> Texto sobre imagem (raro no Swiss) com scrim AA ≥ 4.5:1 (`fetch_image.py --measure-luma`).

## 5.1 Ritmo visual & centralização (v4 Swiss Grid — 07/07/2026)

**1. Cada carrossel tem UMA linguagem dominante + UMA textura.** Não faça toda slide ser um `.scr`; **~metade** deve ser texto/número. Varie a linguagem E a textura ENTRE os carrosséis da semana:
- **statement-led** — texto grande (`stmt`) sobre a grade, 0–1 frame.
- **software-led** — frames `.scr` claros centralizados (a prova); 1 `stmt` de payoff no fim.
- **typographic** — números grandes (`num`), zero frame.

**2. Tipos de slide no renderer** (`render.py`, branch SECRET):
| tipo | o que | quando |
|---|---|---|
| `cover` | capa type-led: kicker+hairline+headline+anel teal | slide 1 |
| `stmt` | `stmtbig` sobre a superfície+textura, sem frame | tese, payoff, conceito |
| `soft` | frame `.scr` claro (screenshot) + `cap` | mostrar a feature/prova |
| `num` | número teal grande (`n="01"`) + `h` + `cap` | checklist/passos |
| `cta` | logo escura + `line` + `url` + anel teal | último slide |

O carrossel declara a textura via `texture="grid|dots|blueprint|hatch|contour|mesh"` no dict (senão auto-cicla).

**3. Imagem SEMPRE casada à frase + pensar o que a imagem DIZ (Gustavo, 08/07).** Todo screenshot ilustra **exatamente** a linha, e você faz **análise visual crítica** ("essa tela comunica a frase? não ficou poluída/genérica?"). Ex.: "roots not crowns" → CBCT/raízes; "anchorage" → attachments; "what catches it" → o modal de review/modify. **Preencha caixas de UI com conteúdo real** (ex.: comentário de planejamento com IPR/attachments/staging) — nunca deixe "Please type" vazio. Prefira **screenshot limpo** a UI cheia de painéis.

**3b. `num` com imagem (checklist novo, 09/07):** o layout é **número → texto → imagem embaixo** (campo `img=` no `num` → frame `.scr` claro abaixo do statement; imagem em `object-fit:contain`). Cada card de número ganha um screenshot real que prova a linha. **Não** use ícone no canto (o Gustavo achou fraco) — prefira o screenshot.

**3c. Geração p/ cenas B2B** (evento/curso/dois-ortodontistas): o Swiss Grid é claro+técnico, então **priorize screenshots**; se gerar uma cena com o Saif, use o **pack multi-referência** `_studio/assets/saif_refs/` (§ clínica) p/ semelhança. Regra-6 continua nos slides de software (esconder nome de paciente/Saif; só software novo).

**4. Frames vêm do banco de VÍDEO** (não do Magnific): `SECRET_Navigator_Material/scene_takes/` + `cbct_library/`. Prefira capturas front-on. Extração: `ffmpeg -ss <t> -i <clip> -frames:v 1 <out>.png`.

**5. Centralização (CONFERIR o PNG final).** Trim + shave + center-extent:
```bash
magick <frame>.png -shave 2%x2% -fuzz 22% -trim +repage \
  -resize 1060x670 -background '#FFFFFF' -gravity center -extent 1240x860 <out>.jpg
```

---

## 6. EDITABLE-MATERIALS STANDARD

**Regra: no Drive só entra o PNG final; todo o editável fica LOCAL** em `🚀_Projects/Secret_Align/Content_Production/`.

**Local (editável):**
```
Content_Production/Week_<NN>_<MonDD>/W<NN>_C<n>_<slug>/
  ├─ index.html          # todos os slides (fontes + imagens base64) — editável
  ├─ images/             # screenshots (orig + polidas)
  ├─ <slug>.docx         # legenda (regra 7: só texto)
  └─ png/slide_NN.png    # PNGs fonte (cópia final NUMERADA vai pro Drive)
```
Build spec: `Week_<NN>/_build/carousels_secret_*.py`. Reutilizáveis: `_studio/`. Render:
`SPEC=.../_build/carousels_secret_weekN.py WK=Week_<NN> python3 _studio/render.py --shoot`.
SECRET = pasta única (EN-only). Ritual: finais em `02_For_Approval/` → Saif aprova → `03_Approved/` → agenda.

---

## 7. Checklist pré-export (SECRET · Swiss Grid)

- [ ] Superfície **clara** `#EEF4F2` (nunca escura); Poppins; tokens teal/ink Swiss, sem token de outra marca.
- [ ] **Textura** aplicada (1 por carrossel), variando entre os 3 carrosséis da semana (grid/dots/blueprint/hatch/contour/mesh).
- [ ] Headline weight 300 com 1–2 palavras-chave (`<b>` `#06322D` / `.t` `#0B7E78`); kicker `.22em` `#0B7E78` + hairline `#00C8B4`.
- [ ] **Anel teal** na capa e no CTA (assinatura Swiss).
- [ ] Frame de software **claro, canto reto** (`border-radius:0`, fundo branco, borda teal, barra clara).
- [ ] Footer + CTA = **logo escura** `secret-logo.png` (sem chip, sem invert, sem contador `1/6`).
- [ ] **Regra 6:** zero rosto/dente/pessoa IA; nada da plataforma preta antiga; uploads rápidos; nomes (paciente + Saif) escondidos.
- [ ] Sem hype/emoji/exclamação; **sem travessão** em nenhuma copy.
- [ ] Bans impeccable: sem side-stripe, sem gradient-text, sem em-dash em chrome, sem watermark "Powered by".
- [ ] **Ritmo (§5.1):** 1 linguagem dominante; ~metade das slides NÃO é `.scr`; as 3 peças variam entre si.
- [ ] **Centralização:** todo `.scr` centralizado e CONFERIDO no PNG.
- [ ] Fontes **base64** (Poppins), nunca `<link>`.
- [ ] EDITABLE-MATERIALS salvo: `index.html` + `images/` + `.docx` (só texto) + `png/`.

---

### Notas do operador (PT-BR)

- **Fonte-verdade do visual = `Content_Production/_studio/render.py` (branch `.sa`).** Este doc espelha aquele CSS; ao mudar o padrão, mude os dois juntos.
- Em **conflito**, precedência: **este arquivo → [impeccable-baked.md](impeccable-baked.md) → Bloco 6 do `pro`**. Cores hardcoded; ignore "derive a cor do briefing".
- Modo **render-default**: recebe a copy pronta — só renderize via `render.py`. Modo **standalone-editorial**: rode o cérebro editorial calibrado pela voz SECRET (`Secret_Align/01_BRAND/VOICE.md` + `BRAND_FOUNDATION.md`, treatment-first) antes de cair no render.
- **Mudança 07/07/26:** o padrão saiu de dark/teal → **Swiss Grid** (claro). O backup do render antigo está em `_studio/render.py.bak-preswiss`.
