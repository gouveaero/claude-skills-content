# Banco de recursos visuais + controle de uso (Zahnspange Home)

O projeto Saif tem um **banco catalogado** de todo o material da clínica em
`🚀_Projects/Saif/Brand_Sources/Zahnspange_Home/` — construído do dump do Saif (fotos + 88 vídeos + 638 imagens
publicadas do IG). Ele **É a fonte (1) foto real + (2) screenshot de vídeo** do override de sourcing de imagem
(topo do `design-system-clinic.md`): **procure aqui ANTES de recorrer a Three Shape/stock ou IA.**

- **`INDEX.md`** — catálogo legível (stills `cl_*`, vídeos, antes/depois publicados, tabela de performance).
- **`catalog.json`** / **`published_images.json`** — espelhos de máquina.
- **`Reference_Stills/`** — 71 stills `cl_*` (retrato Saif, aligner-na-mão, procedimento, scan 3D, sala…). 7 canônicos também em `Content_Production/_studio/assets/zh/`.
- **`Published_Highlights/`** — **250 antes/depois publicados** (a maioria intraoral **sem rosto = Werberecht-safe**) + procedimento/scan/Saif, com engajamento do post.
- **`_Intake_BeforeAfter/`** — clips de paciente GATED (consent DSGVO).
- **`Video_Montages/` + `Transcripts/`** — preview + fala de cada vídeo do Saif.

## A ferramenta: `scripts/catalog_lookup.py`

Enforce o "não repetir antes/depois" por **dados** (não por memória). Estado de uso = `used_log.json` (append-only) na raiz do banco.

```bash
CL="$HOME/.claude/skills/content-machine-clinic/scripts/catalog_lookup.py"
python3 "$CL" beforeafter --unused --no-face      # antes/depois livres, sem rosto, ranqueados por ❤
python3 "$CL" stills --subject saif-portrait --unused
python3 "$CL" video --topic aligner-education      # ou --query "attachment" — devolve montage+transcript+timestamps
python3 "$CL" use <asset> --where W30_C2 --note capa   # marca 1 asset como usado (OBRIGATÓRIO p/ antes/depois)
python3 "$CL" used                                 # o que já foi consumido
```
`<asset>` = caminho do highlight (`Published_Highlights/DIi33qFNelO_01.jpg`), ou uma chave `cl_*`, ou id de vídeo (`v035`). `--root` sobrescreve o caminho do banco.

## Fluxo ao montar um carrossel

1. **Slide precisa de antes/depois** → `beforeafter --unused --no-face` → escolha o topo (maior ❤, sem-rosto). O arquivo está em `Published_Highlights/`. Se **precisar de rosto** (raro, evitar), só de `_Intake_BeforeAfter/` **com consent DSGVO**.
2. **Slide precisa de retrato Saif / procedimento / scan / sala** → `stills --subject <s> --unused` → use a chave `cl_*` (arquivo em `Reference_Stills/`; se `render-ready`, já está em `_studio/assets/zh/` e o `render.py` resolve como `zh/<chave>.jpg`).
3. **Precisa saber o que um vídeo do Saif mostra/diz** (pra tirar um frame) → `video --query/--topic` → abra a `montage`/`transcript`; o still limpo sai do timestamp indicado (procedimento tem que ter luvas; rosto nunca cortado; **frame com cursor/UI de tela, qualidade webcam, borrão ou legenda queimada = REJEITADO** — 21/07/26).
4. **Depois do export**, para **CADA antes/depois usado**, rode `use <asset> --where W<NN>_C<n>`. **Isso é o que impede reusar o mesmo antes/depois** — o próximo `beforeafter --unused` já não o mostra.

## Regras

- **Notes/subjects do catálogo NÃO são confiáveis** (triagem automática em thumbnail 360px): 21/07 achamos "scan-3d" que era mãos-em-coração, "aligner" que era um cabo, still com legenda alemã queimada. Por isso o passo "Confirme visualmente" é obrigatório. Filtros novos: `stills --no-framegrab` (só foto composta), `--render-ready`, `--quality A`; `video --unused`.
- **Confirme visualmente (PASSO OBRIGATÓRIO do fluxo, não nota — 21/07/26):** `subject`/`note` vêm de triagem automática e **não são 100% confiáveis** (um "profile" pode ser frontal; um "before/after" pode ser um estado só). **Abra o arquivo** (`open "<path>"`) antes de commitar — ex.: mordida aberta pede vista **lateral** com before→after real.
- **Antes/depois:** prefira **sem-rosto** (intraoral/ClinCheck) — é o antes/depois compliant do Werberecht. Rosto = gated, só com consent.
- **`use` é obrigatório para antes/depois** (o controle de duplicado depende disso). Para stills `cl_*` o reuso é OK — não precisa marcar, mas pode.
- Nunca reusar a mesma imagem entre clínica e SECRET (regra do design-system).
- O banco é **fonte primária**; IA continua último recurso e sinalizada.
