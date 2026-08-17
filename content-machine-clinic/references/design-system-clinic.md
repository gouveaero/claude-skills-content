# Design System — content-machine-clinic (LOCKED VISUAL · Zahnspange Home · **Meta-Editorial**)

> **Fork de `content-machine-pro`.** Este arquivo é o **sistema visual TRAVADO** do carrossel da **Zahnspange Home**. O padrão foi **atualizado em 07/07/2026** do antigo branco-chapado bilíngue para **"Meta-Editorial"** — campos de cor sky/petróleo + tipo colossal Lato + **recorte do Dr. Saif** (autoridade) + **IG-chrome** + textura rotativa + palavra-acento rosa. **Espelhe-o, não reinvente.** Onde este arquivo definir um token, ele é lei.
>
> **Renderer canônico (ATUAL):** **`Content_Production/_concepts/build_zh13.py`** — é ele que pinta os PNGs finais da clínica (template card+borda-rosa). Este doc **espelha** aquele CSS/dados; em divergência, `build_zh13.py` é a fonte-verdade. *(O `render.py` branch `.zh` é a base Meta-Editorial antiga — NÃO é o template final da clínica.)*
>
> **Precedência (conflito):** **este arquivo + [impeccable-baked.md](impeccable-baked.md) vencem o `Bloco 6` do system-prompt do `pro`** e qualquer paleta "derivada da marca". Cores hardcoded. O pipeline do `pro` (HTML 1080×1350; fontes via `scripts/fonts_to_base64.py` em base64, **nunca `<link>`**; imagens via `scripts/fetch_image.py`) **continua valendo**.
>
> **Uma marca:** Zahnspange Home (B2C, Werberecht, **inglês-only**). Carrossel do software → `content-machine-secret`.
>
> **Mudanças de escopo (jul/26, já refletidas aqui):** **(1) inglês-only** — a clínica saiu do bilíngue DE/EN; toda copy do cliente é **inglês** (alcance + autoridade). **(2) ÖGAO NUNCA é gancho de venda** (regra 4) — lidere com **Fachzahnarzt für Kieferorthopädie** + qualidade do planejamento; ÖGAO só em contexto neutro (congresso). **(3) sem amarelo** — não é cor de marca.
>
> **Dois modos da skill:** **(A) render-default** — recebe a copy pronta (EN) + imagens; só renderiza via `render.py`. **(B) standalone-editorial** — cérebro editorial na voz da clínica, depois cai no mesmo render. Ambos respeitam o **EDITABLE-MATERIALS STANDARD** (§7).
>
> **★★ MODELO FINAL — CONSOLIDADO (12/07/2026, Semana 1 fechada). Isto é a VERDADE ATUAL; em conflito com qualquer bloco datado abaixo, ISTO vence. Fonte-verdade da produção = `_concepts/build_zh13.py` (espelhe-o).**
> - **Layout do card (tokens exatos do `build_zh13.py`):** campo `.card` petrol `#005280` / sky `linear-gradient(160deg,#1E8AC4,#116BA0)` **alternando** por slide · **dots** (textura única) · **@handle `@zahnspange_home` no canto inf-esq de TODO slide** · **sem IG-chrome**. Borda do card de foto = **rosa-logo `#DE318B`** 5px, radius 20.
> - **Tipos + tamanhos (finais):** `eyebrow` = **opcional** (`#bfe6f7`, 32px) — **só quando o doc traz** (ex. "Question N"); senão **omitir** (card = headline direto). `headline .card .h` = **82px** (default); **linha longa do doc → `hsize` menor por card** (ex. 50–66) pra caber SEM cortar/parafrasear. **`sub .card .sub` = 44px · line-height 1.34 · margin-top 40px** — grande e com respiro da imagem (NUNCA pequeno/grudado). Capa `.cover .h` = 102px; **capa com frase longa → `hsize`+`wide`+`vpos`** (ex. C2 `hsize=64, wide=920, vpos="500px 0 auto"` = centraliza vertical, pode sobrepor o terno ESCURO do Saif [branco legível] — evitar rosto/mãos). NUNCA deixar a capa a 50px amontoada no rodapé com vazio em cima. CTA `.cta .h` = 88px + pílula rosa.
> - **Imagem por card = `fit` + `focus` + `pmax` individuais:** **FOTO → `cover`** (preenche a borda; **rosto NUNCA cortado** — se cortar, **aumentar `pmax` e/ou ajustar `focus`** [ex. Q5 Saif: `pmax=580, focus="center 3%"`], nunca letterbox). **Screenshot/UI/3D → `contain` em painel BRANCO** (`.pic.contain{background:#fff}` + `.fill{inset:22px}`). **Conceito anatômico → ilustração flat** (não render 3D uncanny). **Equilíbrio:** faixa vazia embaixo → **aumentar `pmax`** (imagem maior); faltou espaço → reduzir `hsize` da headline e/ou apertar o sub via `submt` (nunca cortar texto/rosto). **Retrato com zoom demais / rosto cortado → aumentar `pmax`** (frame mais alto = menos zoom, mostra ombros) + `focus` com folga no topo (ex. Q5 Saif: `pmax=660, focus="center 3%", hsize=70, submt=24`).
> - **Cor:** **1 acento rosa `#DE318B` por headline** + borda + pílula. Sem amarelo, sem rosa-claro `#FF7EC0`.
> - **COPY = seguir o doc do Saif AO PÉ DA LETRA:** linha1 = headline (topo), linha2/3 = sub **na ordem do doc** (não inverter); **quebra do doc = `<br>` no sub**; palavras EXATAS (não parafrasear/juntar/inventar eyebrow). **NÃO auto-suavizar/corrigir** promessa Werberecht nem typo → renderizar EXATO + **SINALIZAR ao Gustavo**. Extrair o doc com `textutil -convert txt` + **numerar as linhas** antes de montar.
> - **Capa:** 1º carrossel entrega **2 versões** (original c/ sub + nova só a pergunta); demais = **minimal** (só a frase do doc, sem sub inventado).
> - **Fechamento obrigatório = revisão visual card-a-card** (rosto inteiro · sub não grudado/pequeno · sem overflow · texto = doc). Abrir cada PNG (montar a partir de cópia LOCAL — DriveFS serve thumb cacheado no `montage`).
>
> **⚠️⚠️ REVISÃO 12/07/2026 (Saif reescreveu a copy — `Zahnspange_W01_Scripts.docx`):**
> - **SEGUIR O DOC AO PÉ DA LETRA — na ORDEM dele, com as QUEBRAS dele (Gustavo reprovou 2x: parafrasear, inverter, e juntar linhas):**
>   - **Ordem:** **linha 1 do doc = headline (topo); linha 2 (e 3) = sub, na ordem do doc.** NÃO inverter (ex.: doc "Most people picture an ideal age. / A specialist asks a different question first." → h=`Most people picture an ideal age.` + sub=`A specialist asks a different question first.`, NÃO o contrário).
>   - **Quebras:** **onde o doc pula uma linha DENTRO do slide, o card pula** — sub com `<br>` (ex.: doc "Read and adjusted by Dr. Saif... / It stays a treatment simulation tool, not a guarantee." → sub com `<br>` entre as duas).
>   - **Palavras EXATAS:** não parafrasear, não juntar linhas, não inventar eyebrow (dropar os que não estão no doc; manter só "Question N" quando o doc traz). Extrair o doc com quebras via `textutil -convert txt` + numerar linhas antes de montar.
>   - **NÃO auto-suavizar nem auto-corrigir:** promessa Werberecht ("transforms to a beautiful one", "smile you always dreamt about") e typos ("Aligners Treatment") = **renderizar EXATO + SINALIZAR ao Gustavo** (ele decide), não trocar por conta própria. Headline longa demais → `hsize` menor (não cortar texto).
> - **Capa:** o **primeiro carrossel entrega 2 versões da capa** — (a) original com sub pequeno, (b) nova só com a pergunta, sem sub (ele escolhe). Demais capas = **minimal**, só a(s) frase(s) do doc, sem sub inventado (C2 = 1 frase; C3 = 2 frases).
> - **Estrutura pode mudar:** o Saif **mesclou teens + adults num card só**. Seguir a estrutura/contagem que ELE mandar no docx (Week 1: C1=6, C2=6, C3=7 slides), não a antiga.
> - **Werberecht (⚠️ SUPERSEDIDO pelo MODELO FINAL no topo):** quando a copy é **do próprio Saif** (docx dele), promessa de resultado ("transforms to a beautiful one", "smile you always dreamt about") = **renderizar EXATO + SINALIZAR ao Gustavo** (ele decide se suaviza), **NÃO** trocar sozinho. *(Só suavizo por conta própria quando EU estou escrevendo a copy do zero, não quando é o texto que o Saif mandou.)*
> - **Visual inalterado** (Gustavo 12/07: "o visual já está bom, não precisa de ajuste profundo"): mantém card+borda rosa `#DE318B` + dots + campos petrol/sky + `cover`/`contain` por mídia. Fonte-verdade da produção da clínica = `_concepts/build_zh13.py`.
>
> **⚠️ REVISÃO 10/07/2026 (reunião Saif — OVERRIDE do padrão 07/07):**
> - **Template = VARIAÇÃO 1 — foto num CARD CENTRALIZADO dentro do frame** (NÃO full-bleed de fundo; Gustavo corrigiu 11/07: "manter a v1, só aumentar o texto"). Campo de cor petrol/sky + dots + eyebrow + **headline GRANDE** (~70px) + **card de foto com borda rosa-logo `#DE318B`** (centralizado, `fit=contain` p/ screenshots de UI/3D) + sub grande + **@handle** (canto inf. esq.). Capa = recorte do Saif no campo sky. Fonte-verdade = `_concepts/build_zh13.py`. Texto grande é o ponto — Saif achou pequeno.
> - **Acento = rosa EXATO do logo `#DE318B`** (NÃO sky/azul, NÃO rosa claro `#FF7EC0`) — **1 palavra-acento por slide** na headline + borda do card + pílula CTA. (Gustavo 11/07 reverteu o sky de volta pro rosa-logo.)
> - **A copy TEM QUE EXPLICAR** (Gustavo 11/07: terso demais "não passa a mensagem"): headline curta + **sub de ~2 linhas que de fato explica** o ponto; o carrossel ensina/convence, não só rotula. Texto grande (`.card .h` ~76px). Continua claro/Werberecht-safe (rodar /roteiro-council).
> - **⚠️ CADA CARD É COMPOSTO INDIVIDUALMENTE (não programatizar tudo igual — Gustavo 11/07):** por card, escolher `fit` + `focus` focal + tamanho (`pmax`). **NUNCA cortar rosto/sujeito.** A **imagem TEM que mostrar o conceito da headline** (ex.: "teeth move through living bone" → render de dente movendo em osso, NÃO foto genérica de pessoa; gerar via Magnific quando não existir). Imagem realista, idade certa, sem dente falso. **Rodar review card-a-card** (workflow `clinic-per-card-review`: 1 agente por card checa se mostra o conceito + rosto não cortado + coerente) antes de fechar. Rostos recorrentes do Saif: variar o retrato (sorriso natural — gerar se o real ficar estranho).
> - **⚠️ NADA de blur/pillarbox (review card-a-card 11/07 — é EXATAMENTE o "forced-frame" que o cliente rejeitou):** o blur-fill atrás de imagem contida foi REPROVADO. Regra dura por tipo de mídia: **FOTO → `cover`** preenche a borda inteira, corte focal por card (rosto nunca cortado; se o corte tira algo → trocar a foto por uma de sujeito único / gerar / recortar a fonte, **nunca** letterbox). **Screenshot/render de UI/3D → `contain` num painel BRANCO limpo** (`.pic.contain{background:#fff}` + `.fill{inset:22px;background-size:contain}`), margem par, **sem blur**. Se o screenshot estiver de baixa-res → **upscalar** (Magnific) ou recapturar, não esticar no cover.
> - **⚠️ NUNCA reusar a MESMA imagem nas DUAS contas** (Gustavo 11/07: "card 5 Secret = card 6 clínica, trocar"): screenshot/render que aparece na SECRET não repete na clínica e vice-versa — parece copy-paste entre as marcas. Se o mesmo asset servir aos dois conceitos, gerar/escolher uma variante distinta pra um deles.
> - **⚠️ CONCEITO ANATÔMICO/3D "esquisito" → usar ILUSTRAÇÃO, não render foto-realista (Gustavo 11/07):** render 3D foto-realista de dente/osso/movimento tende a sair uncanny ("estranho", parece extração/dente caindo). Pra conceito biológico (dente movendo no osso, remodelação) preferir **ilustração flat/vetorial / infográfico editorial limpo** (Magnific: prompt "flat 2D vector medical illustration, infographic, not 3D, not photorealistic, no text, no labels"). Sempre: **zero leitura de extração/dente saindo** (o dente fica ancorado), e **sem texto/label** embutido (compete com a headline). Se for aparelho, é **alinhador transparente**, nunca braces (a clínica é de alinhador invisível).
> - **"Specialist checks/attends" → Saif ATENDENDO paciente, não retrato sozinho (Gustavo 11/07):** slide de autoridade/atendimento pede o Saif **com um paciente** (consulta, segurando um alinhador). Não há foto real disso no Brand_Sources → **gerar no Magnific com as fotos-referência do Saif** (`cl_saif_portrait/smile1/smile3`) como `references` — likeness ~4/5 sai convincente; navy scrubs c/ logo Zahnspange. Enquadrar (`focus`+`pmax`) pra caber **os dois rostos + o alinhador** (card mais alto).
> - **Faixa etária: fazer o PARALELO crianças↔adultos (Gustavo 11/07):** conteúdo de "idade certa" não pode falar só de adulto — inclui um card de **younger patients/teens** (timing segue o crescimento do maxilar) ao lado do card de **adultos** (nunca velho demais). Dois cards paralelos, imagens paralelas (teen c/ alinhador + adulto c/ alinhador). Teen gerado: wholesome ~13-15, dentes naturais, alinhador transparente (nunca braces).
> - **Cópia CURTA:** poucas palavras, **texto GRANDE**, direto pro público alemão, foco **idade + "Book a consultation"**; detalhe longo → **caption** (não no slide). Quebrar frase confusa.
> - **Imagens IA:** idade **realista** (~50-55, nunca "grandpa" 80) e **sem dente falso de IA**. **Dots mantidos** (textura única da clínica; sem rotação). Capa com **headline GRANDE** (~102px) preenchendo o espaço.
> - **COPY (lição do /roteiro-council 11/07 — Saif rejeitou 2x por "AI-ish" e sem sentido):** clara + didática, **UMA ideia concreta por slide** (nada de fragmento tipo "No upper limit / From teens to adults" — o cliente perguntou "o que isso significa?"); **Werberecht: PROIBIDO promessa de resultado** (ex. "you see the result before you start" / "how yours would look" = Erfolgsversprechen) e **PROIBIDO comparação com concorrente** (ex. "an orthodontist, not a lab" / "not just a quick scan" = disparagement); autoridade sempre **"specialist / Fachzahnarzt"** (nunca ÖGAO); evitar idioma que alemão não pega ("a tooth falls behind" → "moves slowly"); CTA com risk-reversal suave ("a first visit just answers that"); inglês simples; **sem travessão**. **Rodar `/roteiro-council` na copy antes de fechar.**

---

## 1. Arquitetura de slide

- **Canvas:** `1080×1350` nativo (4:5), um `.slide` por imagem; export screenshota cada `.slide`.
- **Safe margins:** `72px` nas laterais; topo `~96px` (kicker), base `~40px` (IG-chrome).
- **Preencher o quadro (anti-minimalismo):** o campo de cor + textura + tipo colossal + IG-chrome preenchem a slide inteira — **nunca** metade vazia (era a crítica do branco-chapado antigo). O visual É o campo, não um texto flutuando no branco.
- **Tipos de slide:**
  1. **cover (capa)** — campo sky + textura + kicker + **headline colossal Lato-900** + lead + IG-chrome.
  2. **content (interno)** — campo sky/petróleo (alterna) + textura + kicker + headline colossal + lead + IG-chrome.
  3. **meta (autoridade)** — **recorte do Dr. Saif** (`cl_saif_cutout.png`) sangrando pela direita sobre o campo + headline colossal à esquerda + label + IG-chrome.
  4. **photo (foto real full-bleed)** — foto real da clínica/scan com **scrim petróleo** + label + headline no rodapé.
  5. **cta (último)** — campo petróleo + headline colossal + **pílula magenta** + IG-chrome.
- **Ritmo:** o `field` **alterna sky/petróleo** entre os slides de texto (cover sky, content1 petrol, content2 sky, …); o `cta` é sempre petróleo. Isso dá cadência sem sair da marca.
- **Bans herdados (impeccable):** sem side-stripe, sem gradient-text, sem em-dash em chrome/label, sem glassmorphism gratuito, sem watermark "Powered by". ≤4 ideias/slide. Squint test.

---

## 2. Preset Zahnspange Home (B2C · **Meta-Editorial** · campos de cor + tipo colossal)

**Personalidade:** editorial bold, Instagram-nativo, autoridade calorosa. Campos de cor petróleo/sky cheios + tipo colossal Lato-900 + recorte real do Saif + IG-chrome + 1 palavra-acento rosa. Educação-led, **Werberecht-safe** (§6). **Sem amarelo.**

### 2.1 Tokens (copy-paste — hex travado)

```css
/* ───────── Zahnspange Home — Meta-Editorial tokens (LOCKED · 07/07/26) ───────── */
:root{
  --zh-field-sky:    linear-gradient(180deg,#1272A6,#0C5A85 55%,#08405F); /* campo sky — azul PROFUNDO (não claro) */
  --zh-field-petrol: linear-gradient(160deg,#0A5C8C,#004A70 58%,#002E48); /* campo petróleo — navy-teal */
  --zh-type:    #FFFFFF;   /* tipo colossal (branco sobre campo) */
  --zh-acc:     #FF7EC0;   /* palavra-acento ROSA na headline (NÃO amarelo) */
  --zh-kick:    #CDEBFB;   /* kicker (sky claro) */
  --zh-lead:    #EAF3FA;   /* lead/sub */
  --zh-magenta: #DF378B;   /* pílula CTA */
  --zh-font:    'Lato', system-ui, sans-serif;
}
```

### 2.2 Escala de tipo (px @1080) + pesos Lato

| Papel | @1080 | Peso | Notas |
|---|---|---|---|
| Kicker | **30px** | **700** | UPPERCASE, `letter-spacing:.16em`, cor `#CDEBFB` |
| Headline colossal (padrão) | **82px** | **900** | `line-height:1.0`, `letter-spacing:-.02em`, branco; `.acc` = `#FF7EC0` |
| Headline capa / cta | **90px** | 900 | um pouco maior |
| Headline em foto | **70px** | 900 | branco sobre scrim petróleo |
| Lead / sub | **40–42px** | 400 | cor `#EAF3FA`, `line-height:1.3` |
| Pílula CTA | **46px** | 700 | branco sobre magenta |
| IG handle | **27px** | 800 | "zahnspange_home" no chrome |

Pesos Lato: **400 / 700 / 900**. Título **sempre 900**. **1 palavra-acento rosa** por headline (a keyword), via `<span class='acc'>…</span>`.

### 2.3 Campo de cor + textura + tipo

```css
.zh{ position:relative; color:#fff; font-family:'Lato',sans-serif; padding:96px 72px 0; display:flex; flex-direction:column; }
.zh>*{ position:relative; z-index:2; }
.zh .zfield{ position:absolute; inset:0; z-index:0; }
.zh.field-sky .zfield{ background:radial-gradient(120% 82% at 18% 6%,#1E7DB2,transparent 58%),linear-gradient(180deg,#1272A6,#0C5A85 55%,#08405F); }
.zh.field-petrol .zfield{ background:linear-gradient(160deg,#0A5C8C,#004A70 58%,#002E48); }
.zh .zkick{ font-size:30px; letter-spacing:.16em; text-transform:uppercase; color:#CDEBFB; font-weight:700; }
.zh .zbody{ flex:1; display:flex; flex-direction:column; justify-content:flex-end; padding-bottom:26px; }
.zh .zh1{ font-weight:900; font-size:82px; line-height:1.0; letter-spacing:-.02em; color:#fff; }
.zh .zh1 .acc{ color:#FF7EC0; }             /* palavra-acento ROSA (nunca amarelo) */
.zh .zlead{ font-size:42px; font-weight:400; line-height:1.3; color:#eaf3fa; margin-top:26px; max-width:860px; }
.zh.cover .zh1,.zh.cta .zh1{ font-size:90px; }
```

> **⚠️ CONTRASTE (regra dura, aprendida 07/07):** os campos **têm que ser escuros** (luminância ≤ ~0.10). Um campo sky **claro** reprova AA — texto branco fica ~2.4:1 e a **palavra-acento rosa some** (~1–2:1). Com os campos profundos acima, o branco fica 5–14:1 e o rosa `#FF7EC0` fica 3.2–5:1 (passa AA large e quase AA full). **Nunca** clarear os campos; se precisar de mais brilho, use só o glow radial no topo (onde só entra kicker branco).

### 2.4 Textura de fundo — **ROTAÇÃO (1 por carrossel)**, aplicada em `.zfield::after`

**5 texturas** (branco sobre o campo de cor), **1 por carrossel**, ciclando. Ordem canônica: **dots · hatch · halftone · contour · grid**. **NÃO existe `mesh` aqui** (a variante mesh usava amarelo — excluída). No `render.py` é o campo `texture="<nome>"` no dict do carrossel (senão auto-cicla).

```css
.zh .zfield::after{ content:""; position:absolute; inset:0; }
.zh.tx-dots .zfield::after{ background-image:radial-gradient(circle 3px at center,rgba(255,255,255,.14) 96%,transparent 0); background-size:44px 44px; }
.zh.tx-hatch .zfield::after{ background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.11) 0 2px,transparent 2px 22px); }
.zh.tx-halftone .zfield::after{ background-image:radial-gradient(circle 5px at center,rgba(255,255,255,.15) 92%,transparent 0); background-size:30px 30px; mask-image:linear-gradient(120deg,#000,transparent 72%); }
.zh.tx-contour .zfield::after{ background-image:repeating-radial-gradient(circle at 18% 14%,transparent 0 44px,rgba(255,255,255,.10) 44px 46px); }
.zh.tx-grid .zfield::after{ background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.09) 0 1px,transparent 1px 56px),repeating-linear-gradient(90deg,rgba(255,255,255,.09) 0 1px,transparent 1px 56px); }
```

### 2.5 Recorte do Saif (`meta`) + foto real (`photo`)

**meta** = recorte `cl_saif_cutout.png` (Saif de jaleco ZH, fundo transparente) sangrando pela direita sobre o campo; texto colossal à esquerda (`max-width:600`). É o slide de **autoridade** (rule 5: Saif figura pública) — **lidere com Fachzahnarzt für KFO no label, NUNCA ÖGAO** (rule 4).

```css
.zh.meta .metacut{ position:absolute; right:-6%; bottom:0; height:93%; object-fit:contain; object-position:bottom right; z-index:1; filter:drop-shadow(0 18px 40px rgba(0,42,66,.4)); }
.zh.meta .zbody,.zh.meta .zkick{ max-width:600px; }
```

**photo** = foto REAL full-bleed (scan, sala, clínica) + **scrim petróleo** (une ao deck) + label. `.bgimg` precisa de seletor específico pra vencer `.zh>*`:

```css
.zh.photo{ padding:0; }
.zh.photo .bgimg{ position:absolute; inset:0; z-index:0; background-size:cover; background-position:center; }
.zh.photo .pscrim{ position:absolute; inset:0; z-index:1; background:linear-gradient(180deg,rgba(0,58,92,.12),rgba(0,50,78,.45) 45%,rgba(0,40,64,.92)); }
.zh.photo .pchip{ position:absolute; top:60px; right:60px; z-index:3; background:rgba(255,255,255,.16); color:#fff; font-size:27px; font-weight:700; padding:14px 28px; border-radius:60px; }
.zh.photo .pov{ position:absolute; left:72px; right:72px; bottom:0; z-index:3; padding-bottom:82px; }
.zh.photo .zh1{ font-size:70px; }
```

> **Scrim petróleo por design** (assinatura clínica). AA ≥ 4.5:1 sob o texto — `fetch_image.py --measure-luma`; suba a opacidade se a foto for clara.
> **Foto real do banco > gerada** quando existe (autenticidade). Quando não existe, **pode gerar** (Magnific, inclusive rosto/dente — liberado 08/07); só respeite o Werberecht (§6). Fonte real: `Brand_Sources/Zahnspange_Home/` + `_media/`; pack de referência do Saif p/ geração em `_studio/assets/saif_refs/` (§5).

### 2.6 CTA + IG-chrome

```css
.zh.cta .pill{ align-self:flex-start; display:inline-block; background:#DF378B; color:#fff; font-weight:700; font-size:46px; padding:34px 60px; border-radius:100px; margin-top:40px; }
.zh .igchrome{ padding:22px 0 40px; }                       /* barra IG-nativa no rodapé */
.zh .igicons{ font-size:33px; color:#fff; letter-spacing:3px; }   /* ♡ ○ ➤ */
.zh .igcap{ font-size:27px; color:#dbeefb; margin-top:12px; } .zh .igcap b{ font-weight:800; color:#fff; }
```

CTA padrão = pílula magenta **`Book a consultation · Link in bio`** (EN). IG-chrome (♡ ○ ➤ + `zahnspange_home`) em cover/content/meta/cta.

---

## 3. Uso do logo

- **Meta-Editorial NÃO usa o logo como imagem** nos slides de campo — a marca aparece como **texto** `zahnspange_home` no IG-chrome (é a assinatura Instagram-nativa). Sem `.topbar`, sem `.brandlogo`.
- Em `photo`, a marca fica no **label** (`.pchip`) + no handle do overlay. Sem chip de logo.
- A autoridade vem da copy (Fachzahnarzt + qualidade do planejamento), **não** do logo nem do cargo ÖGAO (regra 4).

---

## 4. Padrões de CTA

**Variação 21/07/26:** CTA **text-only** é permitida (sem foto; bloco top-bar+headline+sub+pílula **centrado verticalmente**) e CTA com **foto de produto** também — retrato do Saif não é obrigatório no CTA.

**Default:** pílula magenta **`Book a consultation · Link in bio`** (EN).

| Tipo de conteúdo | CTA (EN) |
|---|---|
| Educação / explainer | `Book a consultation · Link in bio` |
| Feature / caso | `See how it works · Link in bio` |
| Peer / autoridade | `Book a consultation · Link in bio` |

- CTA suave; o histórico tem muitos posts sem CTA — não force hard-sell.
- **Sempre** entregar **só o texto** do CTA/legenda (regra 7). **Sem travessão** (use `·`). **Sem linha PT-BR** no material do cliente (a intenção fica no doc interno se preciso).

---

## 5. Imagery — **framework de mídia (imagem com sentido em TODO slide)** (atualizado 09/07/2026)

> **Regra-mãe (Gustavo, 09/07):** carrossel bom NÃO tem slide "só texto num campo vazio". **Cada slide recebe UMA mídia**, escolhida por regra + **julgamento visual crítico** ("essa imagem diz a frase? não ficou nada a ver?"). **Ícone SVG = último recurso** (o Gustavo achou os ícones fracos; prefira foto/screenshot). Faça uma análise visual do PNG antes de fechar.

**Decisão de mídia por slide (nesta ordem):**
1. **Screenshot real do software SECRET** — quando a frase é sobre planejamento/3D/CBCT/plano. Mostra a parte técnica **e faz a associação SECRET sem citar a marca** (conteúdo de planejamento da clínica puxa ativo/screenshot da SECRET; o Saif faz parte da SECRET). Preencha caixas de UII com conteúdo real (ex.: comentário de planejamento com IPR/attachments/staging) — não deixe "Please type".
2. **Foto real do banco** — `Brand_Sources/Zahnspange_Home/` + `_media/` (scanner, cadeira, sala, raio-X/CBCT, retrato/recorte do Saif). Foto real > gerada quando existe.
3. **Imagem gerada no Magnific** (Nano Banana Pro) — para cenas/pessoas que o banco não tem (paciente, idades, consulta, scan, diagnóstico). **Geração de rosto/dente é permitida** (o Gustavo liberou 08/07 — a antiga proibição de "rosto/dente IA" foi retirada). Werberecht ainda vale (§6): cenas **neutras/educacionais**, **nunca close de "sorriso perfeito"/resultado nem antes-depois sensacional**.
4. **Texto puro** — só onde uma frase-tese pede respiro (raro).

**Gerar cena com o rosto do Saif (semelhança):** suba o **pack de referência** `_studio/assets/saif_refs/` (retrato estúdio + fotos do congresso, ângulos variados — ~5 fotos) via `creations_request_upload`→PUT→`creations_finalize_upload`, e passe **TODAS como `references[]` (type `image`)** no `images_generate`. Multi-referência = semelhança muito melhor (1 foto só saiu fraca). Prompt: "the exact same man as in the reference photos (identical face...)". Atualize o pack quando chegarem fotos novas do Saif.

**⚠️ Tela de computador NÃO pode ser IA-inventada (surreal).** Cena "Saif no software" gera um modelo 3D **surreal/derretido** na tela — inaceitável. Correção: **edite a imagem no Magnific** passando `references[]` = `[imagem_base, screenshot_REAL_da_SECRET]` (ex.: `ft-plan.png`) com prompt "keep the exact photo; the ONLY change: replace the content on the monitor screen with the real dental software from the second reference, correct perspective, remove distorted teeth". Nano Banana Pro encaixa a UI real na tela mantendo o rosto/cena. Sempre que a clínica falar de planejamento/3D, a tela = **SECRET Navigator real**.

**Estrutura VARIADA + Saif com parcimônia (não repetir o mesmo esqueleto):**
- **Saif ~2 por carrossel** (não 4). Ele reforça o perfil pessoal (regra 5), mas **não exagere**.
- **Não faça todos os carrosséis com a MESMA estrutura.** Em especial, o slide de autoridade do Saif **não pode ser sempre o recorte-estúdio no penúltimo**. Varie: um usa o recorte estúdio (`meta`); outro usa uma **cena candid** (Saif revisando/consultando, tipo `photo`) **no meio** e deixa o penúltimo non-Saif; outro não usa recorte nenhum.
- Alterne tratamentos do Saif (recorte estúdio / planejando no monitor / revisando com colega / consultando paciente).

**Tipos de slide de imagem:** `photo` (full-bleed real/gerada + scrim petróleo + tipo colossal; aceita `pill` p/ CTA-com-foto) · `meta` (recorte do Saif sangrando sobre o campo — use com moderação) · screenshot SECRET entra como `photo` full-bleed também. `find_img` acha em `_media/` e `_studio/assets/`.

---

## 6. Filtro Werberecht por slide (não-negociável)

Rodar **por slide**. Detalhe + pares "diga-assim-não-assim" em [werberecht-gate-clinic.md](werberecht-gate-clinic.md).

| ❌ Proibido | ✅ Faça em vez |
|---|---|
| Promessa de resultado ("perfect smile", "guaranteed") | "gently and almost invisibly" / "understand how the planning reads your case" |
| Linguagem saldão / marktschreierisch | educação neutra, claim concreto |
| Comparação com concorrente | evitar; foco no método (specialist-planned) |
| Antes/depois sensacionalista de rosto | antes/depois **clínico/educacional**; ClinCheck 3D |
| Superlativo ("best", "magic") | claim concreto |
| Influencer leigo | educação / autoridade do especialista |
| **ÖGAO como venda (regra 4)** | **Fachzahnarzt für Kieferorthopädie** + qualidade do planejamento; ÖGAO só em contexto neutro |

**Reforço (regras 4–5):** lidere com **Fachzahnarzt für KFO** (qualificação de especialista). Perfil pessoal do Saif > perfil da clínica pro ângulo de autoridade. **Toda copy do cliente é inglês** (owner decision jul/26).

---

## 7. EDITABLE-MATERIALS STANDARD

**Regra: no Drive só entra o PNG final; todo o editável fica LOCAL.** Clínica = **inglês-only, pasta única** (acabou o par bilíngue `-de/-en`).

**Local (editável):**
```
Content_Production/Week_<NN>_<MonDD>/Zahnspange_Home/W<NN>_C<n>_<slug>/
  ├─ index.html          # todos os slides (fontes + imagens base64) — editável
  ├─ images/             # foto real polida + recorte
  ├─ <slug>.docx         # legenda (regra 7: só texto, EN)
  └─ png/slide_NN.png    # PNGs fonte (cópia final NUMERADA vai pro Drive)
```
Build spec: `Week_<NN>/_build/carousels_clinic_*.py`. Render:
`SPEC=.../_build/carousels_clinic_en.py WK=Week_<NN> python3 _studio/render.py --shoot`.
Ritual: finais em `02_For_Approval/` → Saif aprova → `03_Approved/` → agenda.

---

## 8. Checklist pré-export (Zahnspange · Meta-Editorial)

**Adições 21/07/26 (obrigatórias):**
- [ ] **Imagem retrata a headline** (literalmente — "essa imagem diz essa frase?") em TODO slide com imagem.
- [ ] **`clinic-per-card-review` rodado**: agentes paralelos (Sonnet), 1 por card, no PNG renderizado — zoom/enquadramento, cursor/webcam/borrão/IA-uncanny, vazio vertical, dedup vs semanas anteriores, Werberecht visual. Zero bloqueante antes de publicar.
- [ ] **Toda imagem vista em resolução real antes do uso** (nunca escolher pelo nome/categoria).
- [ ] **Ilustração flat em painel `contain`: `cbg` = cor EXATA do fundo da arte** (amostrar canto com PIL) — cbg diferente cria "retângulo aninhado" visível.
- [ ] **Conteúdo do card centrado verticalmente** (sem vazio não-intencional entre sub e handle).

- [ ] Campo de cor **sky/petróleo** preenchido (nunca branco-chapado/metade vazia); Lato; sem token de outra marca.
- [ ] **Textura** aplicada (1 por carrossel), variando entre os 3 carrosséis (dots/hatch/halftone/contour/grid). **Sem mesh, sem amarelo.**
- [ ] Headline colossal Lato-900 branca; **1 palavra-acento rosa** `#FF7EC0` (`.acc`), nunca amarelo.
- [ ] `field` alterna sky/petróleo pra dar ritmo; `cta` sempre petróleo.
- [ ] Slide de autoridade = `meta` com **recorte do Saif**; label = **Fachzahnarzt für KFO** (NUNCA ÖGAO — regra 4).
- [ ] Foto real (`photo`) com scrim petróleo + label; `.bgimg` renderiza (seletor específico).
- [ ] **IG-chrome** (♡ ○ ➤ + zahnspange_home) no rodapé de cover/content/meta/cta.
- [ ] CTA = pílula magenta `Book a consultation · Link in bio`.
- [ ] **Imagem com sentido em TODO slide** (screenshot SECRET / foto real / gerada / texto só onde a tese pede) + análise visual crítica de cada PNG.
- [ ] **Saif ~2 por carrossel** (não exagerar) + **estrutura variada** entre os carrosséis (recorte-estúdio NÃO no penúltimo de todos; alternar tratamentos).
- [ ] Cena com rosto do Saif = gerada com o **pack multi-referência** (`_studio/assets/saif_refs/`), semelhança conferida vs foto real.
- [ ] **Werberecht rodado por slide** (sem promessa/superlativo/comparação; sem close de resultado; antes/depois só clínico).
- [ ] **Inglês-only**; **sem travessão**; sem linha PT-BR no material do cliente.
- [ ] Bans impeccable: sem side-stripe, sem gradient-text, sem em-dash em chrome, sem watermark "Powered by".
- [ ] Texto sobre foto com scrim AA ≥ 4.5:1; caixas de UI em screenshots preenchidas com conteúdo real (não "Please type").
- [ ] Fontes **base64** (Lato, latin + latin-ext pros acentos DE do label), nunca `<link>`.
- [ ] EDITABLE-MATERIALS salvo: `index.html` + `images/` + `.docx` (só texto EN) + `png/`.

---

### Notas do operador (PT-BR)

- **Fonte-verdade do visual = `Content_Production/_studio/render.py` (branch `.zh`).** Este doc espelha aquele CSS; ao mudar o padrão, mude os dois juntos.
- Em **conflito**, precedência: **este arquivo → [impeccable-baked.md](impeccable-baked.md) → Bloco 6 do `pro`**. Cores hardcoded.
- Modo **render-default**: recebe a copy pronta (EN) — só renderize via `render.py`. Modo **standalone-editorial**: rode o cérebro editorial calibrado pela voz da clínica (`09_BRAND_VOICE_BASELINE.md`) antes do render.
- **Mudança 07/07/26:** padrão saiu de branco-chapado bilíngue → **Meta-Editorial** (campos de cor + tipo colossal + recorte + IG-chrome), **inglês-only**, **sem ÖGAO-venda**, **sem amarelo**. Backup do render antigo em `_studio/render.py.bak-preswiss`.
