#!/usr/bin/env bash
# ken-burns.sh — fallback 0 crédito: anima o still escolhido (PNG 9:16) com zoom 1,00→1,08 + drift leve → videos/cena_NN_kb.mp4
# Uso: ken-burns.sh <pasta da missão> <NN> [segundos, default 10]   (depois registre em clips.json: { "cena_NN": "cena_NN_kb.mp4" })
set -euo pipefail
M="${1:?uso: ken-burns.sh <pasta da missão> <NN> [s]}"; NN="${2:?NN}"; SEC="${3:-10}"; M="$(cd "$M" && pwd)"
N=$((SEC*30)); L=$((N-1)); OUTDIR="$M/videos"; [ -d "$OUTDIR" ] || OUTDIR="$M/videos_kling"; mkdir -p "$OUTDIR"
IN="$M/imagens_escolhidas/cena_$NN.png"; [ -f "$IN" ] || { echo "falta $IN"; exit 1; }
ffmpeg -nostdin -y -loglevel error -i "$IN" \
  -vf "scale=2160:3840:force_original_aspect_ratio=increase:flags=lanczos,crop=2160:3840,format=rgb24,zoompan=z='1+0.08*(on-1)/$L':x='(iw-iw/zoom)*(0.45+0.10*(on-1)/$L)':y='(ih-ih/zoom)*(0.55-0.10*(on-1)/$L)':d=$N:s=1080x1920:fps=30,format=yuv420p" \
  -frames:v $N -r 30 -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -an -movflags +faststart "$OUTDIR/cena_${NN}_kb.mp4"
echo "✅ $OUTDIR/cena_${NN}_kb.mp4 (${SEC}s)"
