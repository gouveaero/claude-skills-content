---
name: newsroom
description: >-
  Sistema BrandsDecoded de news-jacking visual (Newsroom 1.1): pega uma notícia quente da semana
  e entrega UMA capa única de Instagram em 1080×1350 pronta pra publicar antes do tema esfriar —
  busca de notícias na web (últimos 7 dias, fontes editoriais), 10 headlines no padrão BrandsDecoded,
  render da capa e export PNG. Dispara com "newsroom", "news-jacking", "capa de notícia", "transforma
  essa notícia em capa/post", "capa pra Instagram a partir de notícia", "qual notícia quente do meu
  nicho", "preciso surfar essa notícia", ou quando o usuário quer reagir rápido a uma notícia com um
  post visual de Instagram. É CAPA ÚNICA, não carrossel: pra carrossel editorial completo use a skill
  content-machine; pra slides de palestra use slidev. NÃO use pra escrever a matéria/artigo em si.
---

# Newsroom — News-jacking visual (BrandsDecoded)

Resolve uma dor específica: **velocidade**. O usuário vê uma notícia subindo no feed e tem ~2h pra
publicar antes do tema esfriar. O Newsroom cobre essa janela: nicho → busca de notícias verificadas
→ 10 headlines calibradas → uma capa de Instagram pronta. **Entrega exatamente uma coisa: a capa.**
Não gera carrossel, não escreve slides internos, não posta automaticamente.

O bastidor é 100% invisível — o usuário vê só o resultado de cada etapa.

## Antes de responder: leia a spec

A spec operacional canônica é **[references/system-prompt.md](references/system-prompt.md)** —
**leia por completo antes de responder** e siga-a à risca (identidade, mandamentos de comportamento,
o fluxo de etapas, validação de headlines, regras de busca, design da capa). As notas abaixo só
**substituem a mecânica específica do Claude.ai**.

## Ambiente: rodando no Claude Code (não no Claude.ai)

- **Entrega de arquivos (`present_files`):** não existe aqui. Escreva o arquivo no disco e devolva o
  caminho como link clicável. Pra o HTML, rode `open <arquivo.html>` (macOS) pra abrir no navegador.
- **Pasta de saída:** crie `newsroom-out/<slug>/` no diretório de trabalho atual. O HTML vai como
  `newsroom-capa-<slug>.html`; o PNG ao lado dele.
- **Paths do sandbox (`/home/claude/`, `/mnt/user-data/outputs/`):** ignore — use a pasta acima.
- **Busca de notícias (Etapa 2):** use `WebSearch` (queries em paralelo, sempre com `2026`/mês atual)
  e `WebFetch` pra extrair o contexto da matéria escolhida (Etapa 3). Carregue via ToolSearch se
  necessário. **Antes de listar, cheque a data (DD/MM) — só notícia dentro da janela de 7 dias e de
  fonte Tier 1/2.** Prefira 5 notícias verificadas a 8 com 3 inventadas. Nunca inventar manchete/fonte/data.
  ⚠️ Confira a data real com `date` antes de montar as queries — em sessões longas a data do contexto não atualiza.
- **Imagem (Etapa 4):** o usuário passa um **caminho de arquivo**, não upload de chat. Leia, converta
  pra base64, embuta. A `.capa-bg` usa `background-size:cover`, então o recorte 1080×1350 acontece no
  CSS — pré-redimensionar é opcional (use `magick`/`convert` se quiser reduzir o base64; em macOS sem
  ImageMagick, `sips` resolve um resize simples).
- **Fontes:** nunca `<link>` do Google Fonts. Gere `@font-face` base64 com o script (abaixo) e cole no `<style>`.
- **Export PNG (Etapa 5.5, gatilho "exportar"):** rode o script (abaixo) — screenshota o elemento `#capa`. Sem narrar processo.

## Fluxo (visão geral — detalhe completo na spec)

1. **Boas-vindas + Nicho** — pedir nicho/tema, recorte regional (Brasil/internacional/ambos) e @ do Instagram.
2. **Busca de Notícias** — web, últimos 7 dias, fontes editoriais; tabela de 5-8 manchetes verificadas com potencial (padrões de lift). Honestidade quando a busca falha (oferecer 14 dias / mudar ângulo).
3. **10 Headlines** — `WebFetch` no link escolhido + 10 opções no padrão BrandsDecoded, cada uma validada silenciosamente. → `references/banco-hooks.md` + `references/anti-slop.md`.
4. **Imagem da Capa** — pedir foto (vertical, 1080px+, sujeito no terço superior, sem texto sobreposto); aguardar; processar em silêncio.
5. **Render da Capa** — HTML auto-contido 1080×1350, defaults BrandsDecoded (laranja #F73600), briefing rápido de cor/fonte. → `references/design.md`.
6. **Export PNG (+ Legenda opcional)** — só com "exportar"; depois "legenda" se pedir.

## Quando ler cada reference

- **[references/system-prompt.md](references/system-prompt.md)** — SEMPRE primeiro. Fluxo completo, regras de busca, comportamento invisível.
- **[references/banco-hooks.md](references/banco-hooks.md)** — ao gerar as 10 headlines (Etapa 3): banco de 56 hooks reais (+10k likes), padrões de lift.
- **[references/anti-slop.md](references/anti-slop.md)** — checklist de rejeição de headline, palavras/construções proibidas.
- **[references/design.md](references/design.md)** — ao montar o HTML da capa (Etapa 5): tipografia, gradiente, hierarquia, escala da headline.

## Scripts bundled

- **Fontes → base64 `@font-face`:**
  `python scripts/fonts_to_base64.py "Helvetica Neue:900" "Plus Jakarta Sans:400,700" > fonts.css`
  (Helvetica Neue costuma ser local no macOS; pra headline web use Bebas Neue / Barlow Condensed.)
- **Export PNG (capa única 1080×1350):**
  `python scripts/export_png.py newsroom-out/<slug>/newsroom-capa-<slug>.html`
  Screenshota o elemento `#capa` no tamanho nativo.
- **Dependência:** Playwright + Chromium — `pip install playwright && python -m playwright install chromium`.

## Mandamento

O sistema é invisível. A velocidade é tudo. A capa é o produto. Nunca narrar busca, processamento de
imagem, ajuste de fonte ou render — entregar só o resultado final de cada etapa. Só notícia verificada,
dentro da janela de 7 dias, de fonte editorial.
