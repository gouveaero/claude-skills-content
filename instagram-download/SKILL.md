---
name: instagram-download
description: >-
  Baixa mídia do Instagram (fotos, carrosséis, reels, vídeos, ou perfis inteiros)
  usando gallery-dl. Use SEMPRE que o usuário quiser salvar/baixar/arquivar conteúdo
  do Instagram localmente — frases como "baixa as imagens desse carrossel", "salva esse
  post do Instagram", "baixa esse reel", "arquiva esses links do Insta", "download das
  fotos desse perfil", "tenho uma planilha de links do Instagram pra baixar", ou quando
  houver uma lista/CSV de URLs do Instagram (instagram.com/p/, /reel/, /tv/) para baixar
  em lote. Cobre post único, carrossel com vários slides (inclusive slides de vídeo),
  reels, e download em massa a partir de um arquivo de URLs. NÃO use para criar/gerar
  carrosséis novos (isso é content-machine/carousel) nem para baixar de TikTok/YouTube.
---

# Instagram media download

Baixa mídia pública/logada do Instagram de forma confiável com **gallery-dl**. Esta skill
existe porque o caminho "ingênuo" falha de três jeitos previsíveis — e cada um tem uma
correção específica que você precisa aplicar de antemão.

## As 3 pegadinhas (e por que importam)

1. **Sem cookies = redirect pra tela de login.** O Instagram exige sessão autenticada
   para servir quase tudo hoje, mesmo conteúdo público. A solução é extrair os cookies de
   um navegador onde o usuário **já está logado** (`--cookies-from-browser chrome`).
   Sintoma se esquecer: `HTTP redirect to login page (.../accounts/login/)`.

2. **Slides de vídeo de carrossel não baixam.** Um carrossel pode misturar fotos e
   vídeos. O gallery-dl baixa as fotos sozinho, mas para os vídeos ele precisa **importar
   o `yt-dlp` como módulo Python** — ter só o binário do `brew` não basta. Então o yt-dlp
   tem que estar instalado no *mesmo ambiente Python* do gallery-dl.
   Sintoma se esquecer: `[downloader.ytdl][error] Cannot import yt-dlp or youtube-dl`.

3. **Rate-limit em lote.** Baixar dezenas/centenas de posts em rajada faz o Instagram
   bloquear. Um `sleep` de alguns segundos entre requisições resolve. Re-rodar é seguro:
   o gallery-dl pula o que já existe, então um lote interrompido continua de onde parou.

## Caminho rápido (use isto na maioria dos casos)

O script `scripts/ig-download.sh` já cuida das 3 pegadinhas (instala dependências, ativa
vídeo, aplica sleep e cookies). Prefira-o a montar o comando na mão.

```bash
# um post / carrossel / reel
scripts/ig-download.sh -o ./saida "https://www.instagram.com/p/XXXXXXXX"

# vários de uma vez
scripts/ig-download.sh -o ./saida URL1 URL2 URL3

# em lote, a partir de um arquivo com 1 URL por linha
scripts/ig-download.sh -o ./saida -i urls.txt

# um perfil inteiro
scripts/ig-download.sh -o ./saida "https://www.instagram.com/usuario/"
```

Opções úteis: `-b firefox` (outro navegador logado), `-s "3.0 6.0"` (sleep maior para
lotes grandes), `-n` (anônimo, só conteúdo público — geralmente cai em login).

**Resultado:** uma pasta por post (nome = shortcode), com os arquivos numerados pela
ordem do carrossel (`01.jpg`, `02.jpg`, …, e `0N.mp4` para slides de vídeo).

> O script assume macOS + Homebrew. Em outro ambiente, instale `gallery-dl` e `yt-dlp`
> manualmente e use o comando manual abaixo.

## Comando manual (quando precisar de controle fino)

```bash
# 1. dependências (uma vez)
brew install gallery-dl
# habilitar vídeos: instalar yt-dlp NO venv do gallery-dl
"$(ls /opt/homebrew/Cellar/gallery-dl/*/libexec/bin/python3 | head -1)" -m pip install yt-dlp

# 2. baixar
gallery-dl \
  --cookies-from-browser chrome \
  -o instagram.directory='["{post_shortcode}"]' \
  -o instagram.filename='{num:>02}.{extension}' \
  -o instagram.sleep-request='[2.0, 4.0]' \
  -d ./saida \
  "https://www.instagram.com/p/XXXXXXXX"
```

## Pré-requisito que você deve confirmar com o usuário

O download depende de o usuário estar **logado no Instagram no navegador** escolhido
(Chrome por padrão). Se aparecer login redirect mesmo com cookies, peça para ele abrir o
instagram.com nesse navegador, confirmar que está logado, e tente de novo (ou troque o
`-b` para o navegador certo).

## Trabalhando a partir de uma planilha/CSV de links

Caso de uso comum: o usuário tem um CSV exportado (links + métricas como likes,
comentários, data, legenda) e quer baixar tudo e organizar. Padrão recomendado:

1. **Extraia as URLs** da coluna de link para um `urls.txt` (uma por linha) com um
   parser de CSV de verdade (`python3 -c 'import csv...'`) — legendas têm vírgulas e
   quebras de linha que quebram `cut`/`awk`.
2. **Baixe** com `ig-download.sh -i urls.txt`.
3. **Enriqueça/organize** com um script Python pós-download, se o usuário pediu. Padrões
   que costumam aparecer:
   - salvar um `_INFO.txt` em cada pasta com a legenda + métricas daquele post;
   - separar posts por desempenho (ex.: top quartil de um score `likes + k×comentários`)
     em subpastas; explique o critério e o limiar usados;
   - gerar um `INDEX.md` com a tabela rankeada.

   Reaproveite o que já estiver baixado (o gallery-dl pula arquivos existentes), e só
   baixe as URLs que ainda faltam, para não bater no Instagram à toa.

## Metadados disponíveis para nomear pastas/arquivos

Para layouts customizados, estes campos do extractor `instagram` são úteis em
`directory`/`filename`: `num` (posição no carrossel), `count` (total no post),
`post_shortcode`, `post_url`, `date`, `username`, `likes`, `description`.
Liste todos com `gallery-dl -K <url>`.

## Limites / quando NÃO usar

- Não contorna contas privadas às quais o usuário logado não tem acesso, nem paywalls.
- É para uso legítimo (arquivo pessoal, análise de referência/concorrência). Respeite
  direitos autorais e os termos da plataforma ao redistribuir.
- Para **criar** carrosséis/conteúdo novo, use as skills de geração (content-machine /
  carousel), não esta.
