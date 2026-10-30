#!/usr/bin/env bash
# qa-frames.sh — QA de morphing: extrai frames de cada clipe (2/5/8,5 s; clipes > 11 s: 2/7/13 s) → <missão>/review/
# Uso: qa-frames.sh <pasta da missão> [pasta de clipes, default videos/ ou videos_kling/]
set -euo pipefail
M="${1:?uso: qa-frames.sh <pasta da missão> [videos_dir]}"; M="$(cd "$M" && pwd)"
V="${2:-}"; if [ -z "$V" ]; then { [ -d "$M/videos" ] && V="$M/videos"; } || V="$M/videos_kling"; fi
mkdir -p "$M/review"
for f in "$V"/cena_*.mp4; do
  b=$(basename "${f%.mp4}"); case "$b" in *_slow) continue;; esac
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  for t in $(awk -v d="$d" 'BEGIN{print (d>11)?"2 7 13":"2 5 8.5"}'); do
    tt=$(awk -v t="$t" -v d="$d" 'BEGIN{m=d-0.2; printf "%.2f",(t>m)?m:t}')
    ffmpeg -nostdin -loglevel error -y -ss "$tt" -i "$f" -frames:v 1 -update 1 -q:v 2 "$M/review/${b}_${t}s.jpg"
  done
  echo "$b: ${d}s → review/${b}_{2,5,8.5}s.jpg"
done
