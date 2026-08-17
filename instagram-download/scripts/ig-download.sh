#!/usr/bin/env bash
#
# ig-download.sh — baixa mídia do Instagram (posts, carrosséis, reels, perfis)
# usando gallery-dl, com as dependências e defaults que evitam as dores de cabeça
# comuns (login redirect, slides de vídeo que não baixam, rate-limit).
#
# Uso:
#   ig-download.sh [opções] URL [URL ...]
#   ig-download.sh [opções] -i lista_de_urls.txt
#
# Opções:
#   -o DIR        Pasta de saída (default: ./instagram_downloads)
#   -i FILE       Arquivo .txt com uma URL por linha (em vez de passar na linha de comando)
#   -b BROWSER    Navegador de onde extrair os cookies de login (default: chrome)
#                 aceita: chrome, firefox, safari, edge, brave, chromium...
#   -s "MIN MAX"  Intervalo de sleep (segundos) entre requisições (default: "2.0 4.0")
#   -n            Sem cookies (anônimo) — só funciona pra conteúdo público; geralmente cai em login.
#   -h            Ajuda
#
# Pré-requisitos: o navegador escolhido precisa estar LOGADO no Instagram.
#
set -euo pipefail

OUTDIR="./instagram_downloads"
URLFILE=""
BROWSER="chrome"
SLEEP="2.0 4.0"
USE_COOKIES=1
URLS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    -o) OUTDIR="$2"; shift 2;;
    -i) URLFILE="$2"; shift 2;;
    -b) BROWSER="$2"; shift 2;;
    -s) SLEEP="$2"; shift 2;;
    -n) USE_COOKIES=0; shift;;
    -h|--help) sed -n '2,30p' "$0"; exit 0;;
    -*) echo "opção desconhecida: $1" >&2; exit 1;;
    *) URLS+=("$1"); shift;;
  esac
done

# ---- 1. garantir gallery-dl ----
if ! command -v gallery-dl >/dev/null 2>&1; then
  echo "→ gallery-dl não encontrado. Instalando via Homebrew..."
  if ! command -v brew >/dev/null 2>&1; then
    echo "ERRO: Homebrew não está instalado. Instale gallery-dl manualmente:" >&2
    echo "  pipx install gallery-dl   (ou)   pip install --user gallery-dl" >&2
    exit 1
  fi
  brew install gallery-dl
fi

# ---- 2. garantir yt-dlp DENTRO do ambiente do gallery-dl ----
# Carrosséis mistos têm slides de vídeo. O gallery-dl precisa IMPORTAR o yt-dlp
# como módulo (não basta o binário do brew). Instalamos no venv dele se faltar.
GDL_PY="$(ls /opt/homebrew/Cellar/gallery-dl/*/libexec/bin/python3 2>/dev/null | head -1 || true)"
if [[ -n "$GDL_PY" ]] && ! "$GDL_PY" -c "import yt_dlp" >/dev/null 2>&1; then
  echo "→ habilitando download de vídeos (instalando yt-dlp no venv do gallery-dl)..."
  "$GDL_PY" -m pip install -q yt-dlp || echo "  (aviso: vídeos podem não baixar; imagens não são afetadas)"
fi

# ---- 3. montar argumentos ----
SMIN="${SLEEP%% *}"; SMAX="${SLEEP##* }"
CONFIG="$(mktemp -t gdl_ig_config.XXXXXX.json)"
cat > "$CONFIG" <<JSON
{
  "extractor": {
    "instagram": {
      "directory": ["{post_shortcode}"],
      "filename": "{num:>02}.{extension}",
      "sleep-request": [${SMIN}, ${SMAX}]
    }
  }
}
JSON
trap 'rm -f "$CONFIG"' EXIT

ARGS=(-c "$CONFIG" -d "$OUTDIR")
[[ "$USE_COOKIES" -eq 1 ]] && ARGS+=(--cookies-from-browser "$BROWSER")
[[ -n "$URLFILE" ]] && ARGS+=(-i "$URLFILE")

if [[ -z "$URLFILE" && ${#URLS[@]} -eq 0 ]]; then
  echo "ERRO: passe ao menos uma URL ou um arquivo com -i" >&2; exit 1
fi

mkdir -p "$OUTDIR"
echo "→ baixando para: $OUTDIR  (cookies: $([[ $USE_COOKIES -eq 1 ]] && echo "$BROWSER" || echo "nenhum"), sleep ${SMIN}-${SMAX}s)"

# ---- 4. baixar ----
gallery-dl "${ARGS[@]}" "${URLS[@]+"${URLS[@]}"}"

# ---- 5. resumo ----
echo ""
echo "================ RESUMO ================"
echo "pastas (posts): $(find "$OUTDIR" -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')"
echo "imagens:        $(find "$OUTDIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) | wc -l | tr -d ' ')"
echo "vídeos:         $(find "$OUTDIR" -type f \( -iname '*.mp4' -o -iname '*.mov' \) | wc -l | tr -d ' ')"
echo "tamanho:        $(du -sh "$OUTDIR" 2>/dev/null | cut -f1)"
echo "Cada pasta = 1 post (nome = shortcode). Arquivos numerados pela ordem do carrossel."
