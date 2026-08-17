---
name: secret-event-video
description: Use when producing a SECRET Align EVENT video (recap/"Story" or thesis/"Manifesto") from intensive-course/event footage — the dynamic ~45–50s vertical Remotion event-film. Content is parametrized via a props JSON (beats: text/media/duration); the STYLE (Poppins, locked palette, teal-text #209194, scrims, music-synced cuts, closing text card → SECRET logo outro) is baked in code. Triggers: "vídeo do evento SECRET", "event-film SECRET", "recap/manifesto do curso da SECRET", "novo vídeo de evento do Saif (SECRET)". NOT for SECRET carousels (content-machine-secret), the clinic (content-machine-clinic), or SECRET Navigator feature/product-demo videos (the separate feature-video template).
---

> **⚠️ OVERRIDE 23/07/26 (áudio do Saif):** a **SECRET vende TRATAMENTO, não planejamento**. A tagline **"the aligner planning software" está PROIBIDA** como identidade (Navigator = "the intelligence behind SECRET Aligners", citado com moderação). Fonte de copy = `🚀_Projects/Secret_Align/01_BRAND/BRAND_FOUNDATION.md` + `VOICE.md`.

# SECRET Event Video — parametrized event-film

Produz os **event-films da SECRET** (vídeos verticais ~45–50s do curso/evento: recap dinâmico ou manifesto). O **estilo é travado** no componente `EventFilm.tsx`; você só define o **conteúdo** num **JSON de props** (beats). Zero edição de `.tsx` pra um vídeo novo.

- **Projeto:** `Secret_Align/secret-align-remotion/` (Remotion, 1080×1920 @ 30fps).
- **Composition:** `event-film` (prop-driven; duração derivada dos beats).
- **Render:** `node_modules/.bin/remotion render src/index.ts event-film out/<nome>.mp4 --props=_props_event_<nome>.json --codec=h264 --log=error`
- **Templates prontos (copiar e editar):** `_props_event_story.json` (recap dinâmico) · `_props_event_manifesto.json` (tese/manifesto). São os V1/V2 da Semana 1 — use como base.

## Quando usar / NÃO usar
- **USAR:** novo event-film SECRET a partir de footage de evento/curso (recap, manifesto, teaser de evento).
- **NÃO usar:** carrossel SECRET → `content-machine-secret`; clínica → `content-machine-clinic`; vídeo de **FEATURE** do Navigator (demo do software) → template `feature-video` (`_props_*.json` de feature, outro fluxo).

## Estilo TRAVADO (não mexer — vive em `src/EventFilm.tsx`)
- 1080×1920 · 30fps · **Poppins** · alvo ~45–50s.
- **Paleta SÓ:** mint `#E9F2F1` (cartela) · navy `#1D252D` (texto sobre claro) · **teal `#209194` = TODO destaque de TEXTO** · cinza `#C4C3C2` (sub) · branco (texto sobre footage). **`#80C6C7` (teal-claro) é só DECORATIVO (anel/glow/contour) — NUNCA texto** (o Saif reclamou disso 16/07).
- Cortes dinâmicos sincronizados com a música (transições fade 14f); fotos com Ken-Burns (`zoom`/`pan`); cartelas `title` no mint; beats de footage com **scrim escuro** + accent teal legível (peso 500).
- **Fechamento fixo:** o último beat `title` = **cartela de texto** (mensagem + `secretalign.com` no `sub`) → **depois** entra sozinha a **animação da logo** (outro `public/secret-outro.mp4`, sem áudio; a trilha faz fade por baixo).
- **Regras duras:** **nunca "President of ÖGAO"** (usar cargo eleito como venda é proibido) · **sem travessões (—)** nas copys · teal de texto sempre `#209194` · nº do evento (participantes/datas) confirmar com o Saif, nunca inventar.
- **⚠️ Regras do review Gustavo 21/07/26 (Athens W03) — valem pra TODO event-film:**
  1. **Patrocínio nunca vira claim de autoridade nem "sponsor" seco.** Proibido "SECRET sponsored the room" / "among the sponsors" como frase-fim. Enquadrar como APOIO à comunidade: *"SECRET supported this event"*, *"Supporting the orthodontic community"*. Nada de "Join our next courses" (SECRET não é a escola) nem crédito emprestado (prêmios/palestras são dos speakers).
  2. **Variedade de banner:** não repetir a MESMA foto/ângulo do roll-up em vários beats. Mapear TODOS os materiais de marca no local (⚠️ o banner "Show your smile, not your braces" É da SECRET — conta como SECRET-visível) e alternar: roll-up limpo, plateia de frente pro banner, banner SMILE + palestrante, etc.
  3. **Faculty:** UM nome por linha (3 nomes = 3 linhas), sem destaque teal nos nomes, `size` ~50; nomes SÓ no beat do grupo (nunca atribuir nome a rosto individual sem confirmação).
  4. **Pesquisar o evento antes de escrever** (organizador, local, formato, temas) e usar só fato verificável; sem nº de participantes se não confirmado.
  5. **Sem pitch de "SECRET Navigator" dentro de event-film** — evento em 1º plano; o software tem os feature-videos.
  6. **Não reciclar copy de event-film anterior** (ex.: o "commodity/planning" da W01) — cada evento ganha copy própria.
  7. **Cartela final = frase de impacto que DEFINE a marca** (não institucional morna tipo "SECRET supports the orthodontic community"). Buscar no material da própria marca: site, launch script (ex. real usado: *"Every smile is unique. Your aligner system should be too."* — do Video_guidelines do Saif). Registrar a fonte da frase.
  8. **Imagem casa com a frase.** Beat que fala da "comunidade/sala" = foto da sala inteira/plateia ampla; beat de ensino = doutor ensinando. Foto "nada a ver" com a linha é reprovada (review 21/07).
  9. **Mix de beats:** alternar plateia ampla, doutores ENSINANDO (palco/hands-on) e marca (banners variados) — não empilhar posed-shots.
  10. **HISTÓRIA, não legendas soltas (review 22/07).** Os beats formam UMA narrativa conectada — pergunta/tensão no início → desenvolvimento (o que foi ensinado, em sequência causal: "their answer began with… → then… → until…") → papel da marca → resolução. Teste: ler as linhas em sequência tem que soar como um parágrafo, não como captions independentes.
  11. **Fecho de 2 frases = DUAS CARTELAS `title` SEPARADAS** (preferência final do Gustavo 22/07): a 1ª frase surge sozinha e SOME (fade da transição), a 2ª aparece sozinha na cartela seguinte (com o `sub` = secretalign.com). Ex.: `{"type":"title","dur":96,"line":"Every smile is unique."}` → `{"type":"title","dur":150,"line":"Your aligner system\nshould be *too.*","sub":"secretalign.com"}`. (O `line2`/`l2at` do componente empilha na MESMA cartela — só usar se pedirem explicitamente.)
  12. **LINGUAGEM TREATMENT-FIRST (áudio Saif 23/07 + docx 24/07):** a SECRET vende TRATAMENTO com alinhadores. "Planning" só qualificado ("treatment planning"/"treatment plans"); Navigator = "the intelligence behind SECRET Aligners" (nunca "the aligner planning software"). Frases dele pro banco: "Until insights become treatment plans." · "Predictability starts with treatment planning."
  13. **CRÉDITO DE ORGANIZADOR/LOCAL É OPCIONAL:** o Saif cortou "hosted by Plano at Solid Loft" do filme de Athens (24/07) — manter cidade+data, citar organizador/venue só se o cliente pedir/mantiver.
    14. **PACING LEGÍVEL (review 22/07: "muito pouco tempo entre os textos"):** beat de 2 linhas ≥ ~100f, kicker+2 linhas ≥ ~112f, 3 nomes ≥ ~126f, frase curta 1 linha ≥ ~88f (@30fps, modo calmo). Na dúvida, mais longo — o filme pode passar de 50s se a leitura pedir.

## Props (o JSON)
```json
{
  "music": "event-story-music.mp3",   // trilha em public/ (…-story-music / …-manifesto-music / nova)
  "musicVol": 0.36,                    // opcional
  "dynamic": true,                     // opcional — versão dinâmica p/ IG (ver abaixo)
  "beats": [ { /* beat */ }, ... ]
}
```

**Modo dinâmico (`"dynamic": true`) — pro feed do Instagram (17/07):** deixa o filme MUITO mais ágil sem mudar o estilo/cor. O componente aplica: transições secas (fade 7f em vez de 14), texto com **pop** (spring rápido + scale-in), **Ken-Burns +50%** de movimento, e **outro mais curto (~6s)**. Você AINDA encurta as `dur` dos beats no JSON (conteúdo ~40–55f; multi-linha um pouco mais) — o resultado fica ~27–30s (vs ~45–51s da versão calma). Templates: `_props_event_story_dynamic.json` + `_props_event_manifesto_dynamic.json`. Sem `dynamic` (ou `false`) = versão calma/cinematográfica.
Cada **beat**:

| campo | o quê |
|---|---|
| `type` | `title` (cartela mint, sem imagem) · `photo` (foto de evento) · `clip` (trecho de vídeo) |
| `src` | arquivo em `public/` (ex.: `event/ev_192.jpg`, `event/clip_demo.mp4`) — só photo/clip |
| `from` | frame inicial do clip (só clip) |
| `dur` | duração em frames @30fps (~2 palavras/seg; beat multi-linha = mais) |
| `line` | texto na tela, com markup (abaixo) |
| `sub` | linha secundária menor (cinza) — ex.: url na cartela de fechamento |
| `kicker` | rótulo pequeno CAIXA ALTA acima da linha (ex.: `Guided by`) |
| `zoom`, `pan` | Ken-Burns da foto (ex.: `"zoom": 1.1, "pan": [0, 10]`) |
| `size` | override do tamanho da linha em px (ex.: `60` p/ dois nomes na MESMA hierarquia) |

**Markup do `line`:** `\n` = quebra de linha · `*palavra*` = destaque **teal `#209194`**.
Ex.: `"Stop guessing.\nStart *treating.*"` · `"Two days in *Timișoara*\nTo change everything."`

## Banco de mídia
Fotos/clipes do evento em `public/event/` (`ev_*.jpg`, `clip_*.mp4`). Liste com `ls public/event/`. Não gerar mídia por IA — usar o footage real do evento.

## Workflow
1. **Ler a copy** da semana (doc do Saif) + **escolher mídias** em `public/event/` (extrair frames com ffmpeg pra avaliar o que mostra o quê, se preciso).
2. **Copiar um template** (`_props_event_story.json` recap · `_props_event_manifesto.json` tese) → `_props_event_<nome>.json`.
3. **Escrever os beats:** 1 opener forte (`title`), ~10–13 beats de conteúdo com mídia, 1 **cartela de fechamento** (`title` = frase de impacto da marca — regra 7 acima — com `sub` = `secretalign.com`). Durações ~2 palavras/seg; multi-linha mais longo.
4. **Render:** `node_modules/.bin/remotion render src/index.ts event-film out/<nome>.mp4 --props=_props_event_<nome>.json --codec=h264 --log=error`.
5. **QA (obrigatório):** extrair frames (ffmpeg) e conferir: texto na tela = doc EXATO · teal = `#209194` · legibilidade sobre footage · ordem conteúdo→cartela→outro · sem "President of ÖGAO"/travessões.
6. **Entregar** no Drive (`Shared drives/Zahnspange Home/Content_Calendar/<Week>/SECRET_Align/` + `Week_..._FINAL`), **md5-verificar** (DriveFS cacheia — sempre conferir). Abrir no Finder pro Gustavo.

## Gotchas
- Beat multi-linha longo estoura a margem (108px/lado) → usar `size` menor.
- Foto retrato de 1 pessoa num beat que cita 2 → parece favorecer um; preferir shot dos dois/neutro + nomes na MESMA `size`.
- `title` = cartela mint (texto navy + accent teal); `photo`/`clip` = texto branco + accent teal sobre scrim.
- Cross-ref: carrossel = `content-machine-secret`; feature/demo do Navigator = template `feature-video`; padrão geral de design SECRET na memória `project_saif_carousel_design_standard`.
