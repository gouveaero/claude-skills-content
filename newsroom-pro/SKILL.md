---
name: newsroom-pro
description: >-
  Versão PRO do news-jacking visual BrandsDecoded — UMA capa de notícia 1080×1350 pra Instagram, agora
  com FUNDO gerado por IA (Higgsfield) ou buscado na web quando você não tem foto, UI nível impeccable
  (tipografia/proporção/cor), paleta derivada da MARCA do projeto e SEM marca d'água. Use quando o
  usuário quiser uma capa de notícia "premium/caprichada", citar "newsroom pro", "capa de notícia com
  imagem de fundo", "capa de notícia sem foto", "gera a imagem da capa", "surfar essa notícia com visual
  forte", ou pedir uma capa de news-jacking pra uma marca específica. Mesmo fluxo da newsroom (nicho →
  busca de notícias últimos 7 dias → 10 headlines → imagem → capa → PNG), mas com design novo e geração/
  busca de fundo. É CAPA ÚNICA — pra carrossel completo use content-machine-pro; pra deck use slidev.
  Prefira esta à `newsroom` original (exige upload, com watermark) quando quiser gerar/buscar o fundo e acabamento premium.
---

# Newsroom PRO — Capa de notícia com fundo gerado/buscado (BrandsDecoded)

Fork "pro" do news-jacking. Mesmo fluxo veloz — nicho + recorte + @ → busca de notícias verificadas
(últimos 7 dias) → 10 headlines no padrão → imagem da capa → render 1080×1350 → PNG — com upgrades:

1. **Fundo gerado por IA (Higgsfield) ou buscado na web** quando o usuário não tem foto (o original exigia upload).
2. **UI nível impeccable** + **cor da marca** + **canvas preenchido**.
3. **Sem white-label**: rail com `@handle`/marca, nada de "Powered by Newsroom".

Bastidor invisível. Velocidade é tudo. A capa é o produto.

## Antes de responder

- **[references/system-prompt.md](references/system-prompt.md)** — fluxo + busca + headlines (verbatim). Leia primeiro.
- **[references/design.md](references/design.md)** — o NOVO visual da capa (substitui o design do system-prompt). Cor da marca, tracking, scrim, brand bar sem watermark, fundo IA/web.
- **[references/impeccable-baked.md](references/impeccable-baked.md)** — regras de UI + checklist.

**Onde conflitar, design.md + impeccable-baked vencem o system-prompt.** Em particular: **ignore "Powered by Newsroom" e o default laranja fixo #F73600** — brand bar sem white-label, cor da marca.

## Ambiente (Claude Code) + imagem

`present_files` → gravar + `open`; saída em `newsroom-pro-out/<slug>/`; export `scripts/export_png.py` (screenshota `#capa`); fontes via `scripts/fonts_to_base64.py`. **A imagem da capa pode vir de 3 fontes** (Etapa 4): upload do usuário, **gerada (Higgsfield, padrão sem foto)**, ou **buscada (web/stock)** — ver [references/image-direction.md](references/image-direction.md). Gera/baixa via MCP → `scripts/fetch_image.py` normaliza pra 1080×1350 + mede luma → base64. Ciente do saldo (`balance`), sem narrar.

## Fluxo (6 etapas)

1. Boas-vindas + nicho/recorte/@. 2. Busca de notícias (web, 7 dias, fontes editoriais; tabela 5–8). 3. 10 headlines (`WebFetch` no link + padrão BrandsDecoded). **4. Imagem da capa — upload OU gerar (Higgsfield) OU buscar (web/stock)**, conforme image-direction.md. 5. Render da capa (design.md: cor da marca, full-bleed + scrim AA, sem watermark). 6. Export PNG ("exportar") + legenda opcional.

## Scripts

- `python3 scripts/fonts_to_base64.py "Fonte:700" "Fonte Body:400,700" > fonts.css`
- `python3 scripts/fetch_image.py --source url --url "<url>" --out capa.jpg --crop smart --measure-luma --emit-base64`
- `python3 scripts/export_png.py newsroom-pro-out/<slug>/newsroom-capa.html` (screenshota `#capa`)
- Deps: Playwright+Chromium, Pillow (fallback sips/magick). Python 3.9.

## Polimento opcional

Regras bakeadas em impeccable-baked.md. Passe extra: `/impeccable audit` / `polish` sobre o HTML.

## Mandamento

Velocidade + acabamento premium. Cor da marca, fundo gerado/buscado, sem watermark, scrim legível. A capa é o produto.
