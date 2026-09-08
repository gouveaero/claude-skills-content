# Montagem do Reel — orquestração Remotion (Fases 4–5)

> A `reels-vhoe` é o **orquestrador**. A edição é feita pela skill generalista
> **`video-editor-remotion`** (motor Remotion compartilhado). Esta doc cobre como ligar
> os assets gerados (clipes Kling + narração) ao editor e entregar o `final.mp4`.

---

## 1. Config de voz (`.eleven.json`)

```json
{
  "voice_id": "7i7dgyCkKt4c16dLtwT3",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": { "stability": 0.45, "similarity_boost": 0.8, "style": 0.15, "use_speaker_boost": true }
}
```

- `voice_id` **não é segredo** → pode ser commitado (na pasta da missão ou raiz do projeto).
- **API key é segredo** → vem do env `ELEVENLABS_API_KEY`. **Nunca** commite a key nem escreva ela em arquivo dentro do repo. Se o usuário colar a key no chat, use-a só em memória e **lembre de pedir pra rotacionar depois**.
- `eleven_multilingual_v2` é o melhor p/ PT-BR. `style` baixo (0.15) = leitura sóbria (combina com a voz Vhoe).

---

## 2. `montar-reel-plan.mjs` — narração + edit_plan

```bash
ELEVENLABS_API_KEY=sk_... node .claude/skills/reels-vhoe/runner/montar-reel-plan.mjs \
  --dir "Reels_Feitos/em_producao/NN_codinome" [--config <.eleven.json>] [--emph "a,b,c"]
```

Lê `<dir>/roteiro.md` (cenas via `lib/parse.mjs`) + `<dir>/videos_kling/cena_NN_v1.mp4`. Escreve `narracao.mp3`, `edit_plan.json`, `timings.json`.

**Decisões que ele toma (não refaça à mão):**
- **Sync por `with-timestamps`**: o ElevenLabs devolve o tempo de cada caractere do texto enviado → derivo timing de cada palavra. Imune a erro de transcrição ("F-39E", "150" = "cento e cinquenta").
- **Corte cena→cena no meio da pausa** entre frases (`(fim_da_cena_i + início_da_cena_i+1)/2`). Timeline = soma das durações = duração do áudio.
- **Slow-clip**: cena que narra mais que ~10s (limite do clipe Kling) → o clipe é desacelerado via `setpts` (slow-mo imperceptível num jato) p/ cobrir a cena sem quebrar o sync. Gera `cena_NN_v1_slow.mp4`.
- **Legendas word-level**: chunks de ≤4 palavras, quebra em pontuação forte; contínuas (cada legenda termina onde a próxima começa). Ênfase automática: **números/modelos → laranja (keyword)**, **palavras de marca (Brasil/FAB/Gripen/soberania…) → dourado (emphasis)**.

Valide a saída: `timeline ≈ áudio` e nenhuma cena `⚠️ DESALINHADO`.

---

## 3. `montar-reel.sh` — build + render

```bash
.claude/skills/reels-vhoe/runner/montar-reel.sh "<dir da missão>" proxy           # 540×960, revisão
.claude/skills/reels-vhoe/runner/montar-reel.sh "<dir da missão>" final            # 1080×1920 (1.2× default)
SPEED=1.0 .claude/skills/reels-vhoe/runner/montar-reel.sh "<dir da missão>" final  # sem aceleração
```

**Velocidade (`SPEED`, default `1.2`):** a narração a 1× fica arrastada, então o final mode acelera vídeo+narração juntos (`setpts`+`atempo`, pitch preservado; legendas seguem sincronizadas). Salva **as duas**: `final.mp4` (=1.2×, publicar), `final_1.0x.mp4` (normal) e `final_<SPEED>x.mp4` (rótulo). `SPEED=1.0` desliga.

O que ele faz: scaffold do Remotion num **tmp dir sem espaços** (`$TMPDIR/reels-vhoe-remotion/<nome>`) → `npm install` (1× cacheado) → `build_remotion.py` (gera Root/Reel/components do `edit_plan.json`) → copia `videos_kling/*.mp4` → `public/clips/` e `narracao.mp3` → `public/music/` → render. O resultado volta pra pasta da missão (`proxy_PREVIEW.mp4` / `final.mp4`).

Cria um `.video-editor.json` default (paleta Vhoe: accent laranja afterburner, texto branco, fundo charcoal) se não existir.

---

## 4. Revisão visual + armadilhas (tudo já tropeçado em produção)

**QA obrigatório no proxy** (pegou erros reais): extraia 1 frame por cena (`ffmpeg -ss <t> -frames:v 1`) e avalie:
- **sync** legenda↔voz↔clipe (o frame da cena N deve mostrar a legenda da frase N);
- **espaçamento das legendas** — devem respirar, nunca grudadas;
- clipe certo na cena; sem morphing.

**Estilo de legenda** vive em `video-editor-remotion/templates/components/KineticCaption.tsx` (e na cópia gerada em `src/components/`). Calibrado p/ Vhoe: `gap: 1.05em`, `fontSize 60-74`, `WebkitTextStroke 6px`, `letterSpacing 0.06em`, `lineHeight 1.3`. Se ficar apertado/grande, é aqui.

**Armadilhas do Remotion/build:**
| Sintoma | Causa / fix |
|---|---|
| webpack: `snippets/CountUp doesn't exist` | `build_remotion.py` não copiava o subdir `snippets/` — **corrigido** (copia recursivo). |
| webpack: `@remotion/lottie doesn't exist` | `Reel.tsx` importa `RichOverlays` (puxa lottie/rive/three) sem uso — `build_remotion.py` agora **stripa** quando o plano não usa `rich_overlays`. |
| bundle quebra com caracteres estranhos no path | path do Google Drive tem espaços/acentos/`&` → **sempre** scaffoldar em tmp sem espaços (o `montar-reel.sh` já faz). |
| `final.mp4` "moov atom not found" | copiou o arquivo **enquanto o render escrevia**. Espere o processo terminar antes de copiar. |
| `simulate_cost` de vídeo dá "api field required" | o simulador de vídeo quer args **planos** (`slug`/`duration` na raiz), não o `video.clips[]` aninhado do `video_generate`. |

**Custo/tempo:** proxy ~1-3 min; final HQ ~5-15 min. Rode o final em background e espere a notificação.
