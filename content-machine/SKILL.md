---
name: content-machine
description: >-
  Sistema BrandsDecoded de criação de carrosséis VIRAIS pra Instagram (Content Machine /
  Máquina de Carrosséis 5.5). Use sempre que o usuário quiser transformar um conteúdo, link,
  notícia, tendência ou insight num carrossel editorial pronto pra publicar — com briefing de
  marca, 10 headlines calibradas por um banco de 56 hooks (+10k likes), filtro anti-AI-slop,
  design alternado claro/escuro em 1080×1350 e export PNG. Dispara com "content machine",
  "máquina de carrosséis", "carrossel viral", "carrossel pro Instagram", "cria um carrossel
  sobre X", "transforma isso em carrossel", "carrossel BrandsDecoded", ou quando o usuário cola
  um texto/link pedindo pra virar post de Instagram em formato carrossel. Prefira esta skill à
  carousel-generator genérica quando o objetivo for carrossel viral no método BrandsDecoded
  (headlines calibradas + pipeline editorial). NÃO use pra slides de palestra/deck (use slidev)
  nem pra capa única de notícia (use a skill newsroom).
---

# Content Machine — Máquina de Carrosséis (BrandsDecoded)

Um sistema **com opinião editorial** que transforma um insumo (conteúdo, link, tendência ou
insight) num carrossel viral de Instagram pronto pra publicar: briefing de marca → 10 headlines
calibradas → espinha narrativa → validação editorial → texto aprovado → imagens → HTML
1080×1350 → PNGs. Construído sobre a metodologia da conta que foi de 0 a 272k seguidores e
R$4M em 14 meses, 100% orgânico, 100% carrossel.

Não é um gerador genérico. Tem fluxo rígido, filtro anti-AI-slop e um veredito interno por
headline. O bastidor é invisível: o usuário vê só o resultado de cada etapa.

## Antes de responder: leia a spec

A spec operacional canônica é **[references/system-prompt.md](references/system-prompt.md)** —
**leia por completo antes de responder ao usuário** e siga-a à risca (identidade, mandamentos de
comportamento, o pipeline de etapas, engine de headlines, design system, regras globais). Ela é o
cérebro do produto, preservada na íntegra. As notas abaixo só **substituem a mecânica específica
do Claude.ai** — o resto da spec vale como está.

## Ambiente: rodando no Claude Code (não no Claude.ai)

A spec foi escrita pra um Projeto do Claude.ai. Aqui você roda no Claude Code. Traduções:

- **Entrega de arquivos (`present_files`, "entregar como arquivo"):** não existe aqui. Em vez
  disso, **escreva o arquivo no disco** e devolva o caminho como link clicável em markdown. Pra o
  HTML, rode `open <arquivo.html>` (macOS) pra abrir no navegador padrão do usuário.
- **Pasta de saída:** crie `content-machine-out/<slug>/` no diretório de trabalho atual (o `slug`
  vem do tema/headline). O `carousel.html` vai nessa pasta; os PNGs vão em `content-machine-out/<slug>/slides/`.
  Se o cwd parecer inadequado (ex.: raiz de um repo de cliente), pergunte onde salvar numa linha.
- **Paths do sandbox (`/home/claude/`, `/mnt/user-data/outputs/`):** ignore — use a pasta de saída acima.
- **Imagens (Etapa 4):** no Claude Code o usuário passa **caminhos de arquivo**, não uploads de
  chat. Leia cada arquivo, converta pra base64 e embuta no HTML. TODAS as imagens enviadas devem
  ser usadas (regra da spec). Se o usuário não tiver imagem, siga com fundo sólido + gradiente.
- **Pesquisa web (insumo vago na Etapa 1):** use as ferramentas `WebSearch` / `WebFetch` do Claude
  Code (carregue via ToolSearch se necessário). Nunca inventar dados/fontes.
- **Fontes:** nunca usar `<link>` do Google Fonts — o Playwright headless não renderiza de forma
  consistente. Gere o CSS `@font-face` base64 com o script de fontes (abaixo) e cole no `<style>`.
- **Export PNG (Etapa 5.5, gatilho "exportar"):** rode o script de export (abaixo). Não narre o processo.

## Pipeline (visão geral — detalhe completo na spec)

1. **Entrada.** Ao acionar a skill, abra com a saudação e as 2 intenções (1 = transformar conteúdo
   existente · 2 = criar a partir de um insight). Se o usuário já colou o insumo + intenção, reconheça
   e pule pro briefing.
2. **Briefing Criativo** — 7 perguntas numa tacada: marca/@, nicho, cor (hex ou "não sei" → paleta por
   nicho), estilo visual, tipo de carrossel, CTA do último slide, nº de slides + quantos com imagem.
3. **Headlines (Etapa 2)** — 10 opções nos formatos rígidos (Investigação Cultural 1-5, Narrativa
   Magnética 6-10), cada uma passando pelo veredito interno. → consulte `references/banco-de-headlines.md`.
4. **Espinha Dorsal (Etapa 3)** — estrutura narrativa; aprovação do usuário.
5. **Validação Editorial (Etapa 3.5)** — 7 parâmetros + 5 testes finais. → `references/filtro-editorial.md` + `references/manual-de-qualidade.md`.
6. **Aprovação de Texto (Etapa 3.7)** — texto slide a slide; só avança com "aprovado".
7. **Imagens (3.8 + 4)** — sugerir slides candidatos; receber caminhos; base64.
8. **Render HTML (Etapa 5)** — design system aplicado, 1080×1350 nativos. → `references/design-system.md` + `references/principios-design.md`.
9. **Export PNG (Etapa 5.5)** — só com "exportar".
10. **Legenda (Etapa 6)** — gancho + contexto + análise + CTA + hashtags.

## Quando ler cada reference

- **[references/system-prompt.md](references/system-prompt.md)** — SEMPRE primeiro. Spec operacional completa.
- **[references/banco-de-headlines.md](references/banco-de-headlines.md)** — ao gerar/avaliar as 10 headlines (Etapa 2) e a headline de capa.
- **[references/filtro-editorial.md](references/filtro-editorial.md)** + **[references/manual-de-qualidade.md](references/manual-de-qualidade.md)** — na validação editorial (Etapa 3.5) e nos títulos internos.
- **[references/design-system.md](references/design-system.md)** + **[references/principios-design.md](references/principios-design.md)** — ao montar o HTML (Etapa 5): CSS, templates de slide, hierarquia visual, escala tipográfica.
- **[references/referencias.md](references/referencias.md)** — 2 carrosséis completos de exemplo; consultar pra calibrar tom, ritmo e estrutura.
- **[references/boas-praticas.md](references/boas-praticas.md)** — dúvidas de uso, ideias de pauta, prompts prontos, customização visual, calendário editorial, checklist antes de publicar.

## Scripts bundled

Os dois passos mecânicos recorrentes estão prontos — não os reescreva a cada carrossel:

- **Fontes → base64 `@font-face`:**
  `python scripts/fonts_to_base64.py "Barlow Condensed:900" "Plus Jakarta Sans:400,700,800" > fonts.css`
  Cola o conteúdo no `<style>` do HTML. Embute `latin` + `latin-ext` (acentos PT-BR).
- **Export PNG (1080×1350 por slide):**
  `python scripts/export_png.py content-machine-out/<slug>/carousel.html`
  Screenshota cada elemento `.slide` no tamanho nativo; salva em `.../slides/`.
- **Dependência:** Playwright + Chromium — `pip install playwright && python -m playwright install chromium`.
  Se o export falhar por fonte não carregada, aumente os `wait_for_timeout` no script.

## Mandamento

Bastidor invisível. Nunca narrar etapas, regras internas, eixos, classificação ou "vou
processar/renderizar". Resolver dúvidas de execução internamente e mostrar só o resultado correto
da etapa atual. O sistema é invisível; o carrossel é tudo.
