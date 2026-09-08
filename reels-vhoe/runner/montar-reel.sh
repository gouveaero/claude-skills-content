#!/usr/bin/env bash
# montar-reel.sh — Fase 6 (Montagem): monta o projeto Remotion e renderiza o reel.
#
# Por que um tmp dir: o webpack/Remotion quebra com espaços/acentos no path (Google Drive).
# Scaffold + build + assets ficam num path limpo; só o final.mp4/proxy.mp4 volta pra missão.
#
# Uso:
#   ./montar-reel.sh <pasta da missão> [proxy|final]
#     proxy (default) → proxy.mp4 540x960 (revisão); final → final.mp4 1080x1920 H.264 CRF18
#
# Pré: edit_plan.json + narracao.mp3 + videos_kling/*.mp4 já na pasta da missão
#      (gere com montar-reel-plan.mjs). .video-editor.json é criado com default Vhoe se faltar.
set -euo pipefail

DIR="${1:?uso: montar-reel.sh <pasta da missão> [proxy|final]}"
MODE="${2:-proxy}"
VE_SKILL="${VE_SKILL:-$HOME/.claude/skills/video-editor-remotion}"
SPEED="${SPEED:-1.25}"  # velocidade final (padrão Vhoe 1.25× — 1.2× ficou arrastado em teste real). SPEED=1.0 desliga, SPEED=1.3 acelera mais.
DIR="$(cd "$DIR" && pwd)"
NAME="$(basename "$DIR" | tr -cs 'A-Za-z0-9' '-' | tr '[:upper:]' '[:lower:]')"
WORK="${TMPDIR:-/tmp}/reels-vhoe-remotion/$NAME"
REM="$WORK/remotion"

[ -f "$DIR/edit_plan.json" ] || { echo "falta edit_plan.json em $DIR (rode montar-reel-plan.mjs)"; exit 1; }
[ -f "$DIR/narracao.mp3" ]  || { echo "falta narracao.mp3 em $DIR"; exit 1; }

# brand config default (Vhoe) se não existir
if [ ! -f "$DIR/.video-editor.json" ]; then
  cat > "$DIR/.video-editor.json" <<'JSON'
{
  "brand": { "accent_color": "#FF6A2B", "text_color": "#FFFFFF", "primary_color": "#0A0A0A", "background_color": "#0A0A0A", "font_family": "Inter" },
  "remotion": { "logo_bug": { "enabled": false }, "css_filter": "contrast(1.06) saturate(1.08)" }
}
JSON
  echo "criado .video-editor.json (default Vhoe)"
fi

mkdir -p "$WORK"
# 1) scaffold (uma vez)
if [ ! -f "$REM/package.json" ]; then
  echo "→ scaffolding Remotion em $REM"
  ( cd "$WORK" && npx --yes create-video@latest --yes --blank remotion >/dev/null 2>&1 )
  ( cd "$REM" && npm install --no-audit --no-fund >/dev/null 2>&1 )
fi

# 2) build_remotion (gera Root/Reel/components a partir do edit_plan)
echo "→ build_remotion"
python3 "$VE_SKILL/scripts/build_remotion.py" --plan "$DIR/edit_plan.json" --remotion-dir "$REM" --brand-config "$DIR/.video-editor.json" >/dev/null

# 3) copia assets (clipes + narração) — build_remotion NÃO copia esses
mkdir -p "$REM/public/clips" "$REM/public/music"
cp "$DIR"/videos_kling/*.mp4 "$REM/public/clips/" 2>/dev/null || true
cp "$DIR/narracao.mp3" "$REM/public/music/narracao.mp3"

# 4) render
if [ "$MODE" = "final" ]; then
  RENDER_SCALE="${RENDER_SCALE:-1}"   # 1 = 1080x1920 · 2 = 2160x3840 (4K supersample; texto/overlays nítidos, ~3× tempo)
  echo "→ render FINAL 1080x1920 base (scale ${RENDER_SCALE}× → $([ "$RENDER_SCALE" = "2" ] && echo 2160x3840 || echo 1080x1920)) H.264 CRF18"
  python3 "$VE_SKILL/scripts/final_render.py" --remotion-dir "$REM" --out "$WORK/final_raw.mp4" --codec h264 --crf 18 --scale "$RENDER_SCALE"
  if [ "$SPEED" != "1.0" ] && [ "$SPEED" != "1" ]; then
    echo "→ acelerando ${SPEED}× (vídeo + narração juntos, pitch preservado)"
    ffmpeg -nostdin -loglevel error -y -i "$WORK/final_raw.mp4" \
      -filter_complex "[0:v]setpts=PTS/${SPEED}[v];[0:a]atempo=${SPEED}[a]" \
      -map "[v]" -map "[a]" -r 30 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k "$WORK/final.mp4"
    cp "$WORK/final_raw.mp4" "$DIR/final_1.0x.mp4"        # velocidade normal (sempre salva)
    cp "$WORK/final.mp4"     "$DIR/final_${SPEED}x.mp4"    # velocidade acelerada (rótulo explícito)
  else
    cp "$WORK/final_raw.mp4" "$WORK/final.mp4"
    cp "$WORK/final_raw.mp4" "$DIR/final_1.0x.mp4"
  fi
  cp "$WORK/final.mp4" "$DIR/final.mp4"                    # final.mp4 = velocidade padrão p/ publicar
  echo "✅ $DIR/final.mp4 (=${SPEED}× padrão) + final_1.0x.mp4 + final_${SPEED}x.mp4"
else
  echo "→ render PROXY 540x960 (revisão)"
  python3 "$VE_SKILL/scripts/render_proxy.py" --remotion-dir "$REM" --output "$WORK/proxy.mp4" --aspect 9:16
  cp "$WORK/proxy.mp4" "$DIR/proxy_PREVIEW.mp4"
  echo "✅ $DIR/proxy_PREVIEW.mp4 — revise os frames antes do --final"
fi
