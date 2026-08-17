# Design da Capa — Newsroom Pro (1080×1350)

Versão Pro. Capa única de news-jacking. Mesmas três mudanças do carrossel-pro: **cor da marca** (não fixa), **canvas preenchido**, **sem watermark** — e a grande adição: a capa pode ter o **fundo gerado por IA ou buscado na web** quando o usuário não tem foto.

Princípios de UI: [impeccable-baked.md](impeccable-baked.md). Fluxo/headlines: [system-prompt.md](system-prompt.md) verbatim — **onde conflitar, este arquivo vence** (cor, tracking, brand bar, fundo).

## Tokens (escala modular, canvas fixo)

```css
:root{
  --t-cap: 19px;     /* eyebrow / rail (ALL-CAPS) */
  --t-meta: 22px;    /* fonte/data, footer */
  --t-sub: 30px;     /* subtítulo da capa */
  --t-h1: 100px;     /* headline (cabe em ≤4 linhas) */
  --t-display: 124px;/* headline curta / palavra-display */
}
```
**Tracking:** headline ALL-CAPS condensada `-0.02em`; eyebrow/rail `0.08–0.10em` (não 3px); sub `0`. **Light-on-dark** (a capa é quase sempre texto claro sobre foto escura): line-height +0.05, letter-spacing +0.01em, peso +1. `text-wrap:balance` na headline.

**Headline:** 124px se ≤3 linhas, 100px se 4–5, **88px mínimo**. Se não couber, encurtar mantendo o padrão (dois-pontos continua dois-pontos, "Investigando X" continua "Investigando X").

## Paleta da MARCA

Idêntico ao carrossel (design-system §2 do content-machine-pro): derivar `--P/--PL/--PD/--A2` + neutros tintados do hex da marca, em OKLCH, com guard anti-slop. Briefing pergunta a cor (ou usa o default da marca). **Sem default laranja fixo** — a cor é de quem publica.

## Estilos

- **Editorial** (flagship): rail superior com fio + `MARCA — Nº/DATA`, kicker, headline pesada no terço inferior, accent secundário no destaque.
- **Clean:** badge do @ + headline, mínimo de ornamento.

## Fundo da capa — 3 fontes (a grande adição)

A capa SEMPRE tem imagem full-bleed. De onde vem (decidir deliberadamente):

1. **Foto do usuário** (caminho de arquivo) → `scripts/fetch_image.py --source url --url file://... ` ou ler+base64.
2. **Gerada por IA (Higgsfield, padrão quando não há foto)** → `generate_image({params:{model:"recraft-v4-1", prompt, aspect_ratio:"4:5", colors:[marca]}})` → `job_status(sync)` → URL → `fetch_image.py`. Prompt: assunto da notícia + "editorial photography, cinematic, muted <cor da marca>, deep dark negative space in lower third, no text/logos, 4:5".
3. **Buscada na web (assunto real concreto)** → Magnific `stock_search`→`stock_download`, ou Unsplash → `fetch_image.py`.

Ver `image-direction.md` pra heurística (gerar vs buscar) e fluxo completo.

## Camadas + legibilidade (contrato)

```css
.capa{ width:1080px; height:1350px; position:relative; overflow:hidden; background:var(--DB); }
.imgbg{ position:absolute; inset:0; background-size:cover; background-position:center; z-index:0; }
.imgbg.duo{ filter:grayscale(.9) contrast(1.06) brightness(.84); }      /* opcional p/ coesão */
.duotone{ position:absolute; inset:0; z-index:1; background:var(--P); mix-blend-mode:color; opacity:.5; }
.scrim{ position:absolute; inset:0; z-index:2; background:linear-gradient(to bottom,
  rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 26%, rgba(0,0,0,.5) 56%, rgba(0,0,0,.9) 80%, rgba(0,0,0,.99) 100%); }
```
- Texto sobre foto: scrim AA ≥ 4.5:1 no rodapé; usar `fetch_image.py --measure-luma` → `SCRIM_SUGGEST`. Scrim **neutro/escuro**, nunca colorido.
- **Canvas preenchido:** a foto full-bleed já preenche; o bloco de texto (eyebrow + headline + sub) ocupa o terço inferior com folga. Headline grande — sem capa "vazia".

## Chrome — SEM watermark

```css
.accent{ position:absolute; top:0; left:0; right:0; height:6px; z-index:30; background:linear-gradient(90deg,var(--P),var(--A2,var(--PL))); }
.rail{ position:absolute; top:6px; left:0; right:0; padding:34px 56px 0; display:flex; justify-content:space-between;
  z-index:20; font-size:var(--t-cap); font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:rgba(255,255,255,.55); }
.headline-area{ position:absolute; bottom:110px; left:0; right:0; padding:0 56px; z-index:10; }
.badge{ display:flex; align-items:center; gap:14px; width:fit-content; margin-bottom:28px;
  background:rgba(0,0,0,.4); border:1.5px solid rgba(255,255,255,.14); border-radius:60px; padding:12px 26px 12px 14px; }
.headline{ font-family:var(--FH); font-size:var(--t-h1); font-weight:700; line-height:.95; letter-spacing:-0.02em; text-transform:uppercase; color:#fff; text-wrap:balance; }
.headline em{ font-style:normal; color:var(--A2,var(--PL)); }
.sub{ font-size:var(--t-sub); font-weight:400; line-height:1.4; color:rgba(255,255,255,.7); margin-top:22px; max-width:30ch; }
```
Rail: `MARCA · DATA` (esquerda) e seção/nicho (direita) — **nunca "Powered by Newsroom"**. Badge com `@handle`. Export screenshota `#capa` (já é o id que o `export_png.py` busca).

> Override: ignore a linha "Powered by Newsroom" e os defaults laranja fixos (#F73600) do system-prompt — cor é da marca, brand bar é sem white-label.
