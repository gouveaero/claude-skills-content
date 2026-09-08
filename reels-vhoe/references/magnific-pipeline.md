# Pipeline Magnific — imagens e vídeos dos Reels (MCP)

> Substitui a antiga automação por navegador (Freepik Pikaso/Kling via Playwright).
> Agora **quem gera é o agente**, chamando a MCP do Magnific direto. Os scripts em
> `runner/` só fazem a parte determinística (parse do roteiro e transferência de
> bytes). Toda chamada `images_*` / `video_*` é assíncrona e fala por
> **`creationIdentifier`**, nunca por `webUrl`. Siga sempre o campo `instruction`
> que volta nas respostas da MCP.

---

## 0. Modelos travados (não troque sem motivo)

| Etapa | Modelo | Slug (verbatim) | Por quê |
|---|---|---|---|
| Imagem (Fase 2) | Google **Nano Banana Pro** | `imagen-nano-banana-2` | tier `sota`; mesma família que a skill já usava (NanoBanana Pro). Aceita `9:16` e `resolution` 1k/2k/4k. |
| Vídeo (Fase 3) | **Kling 2.5** | `kling-25` | tier `recommended`; melhor custo/qualidade pra clip silencioso 5–10s; `supportsStartFrame: true` (image-to-video). |

- Param do modelo de **imagem** vai em `mode` (`images_generate({ mode: "imagen-nano-banana-2" })`).
- Param do modelo de **vídeo** vai em `slug`, **dentro do clip** (`video.clips[].slug`).
- Confira o catálogo quando quiser: `images_models_list({ search:"nano banana" })` / `video_models_list({ search:"kling" })`.

## Parâmetros canônicos do reel (formato vertical)

| | Imagem (Nano Banana Pro) | Vídeo (Kling 2.5) |
|---|---|---|
| `aspectRatio` | `9:16` | `9:16` |
| `resolution` | `2k` | `1080p` |
| `duration` | — | `10` (use `5` pra cortar custo) |
| versões/cena | `3` (em **1** chamada via `count`) | `2` (2 chamadas separadas) |

> Custo: **diferente** do fluxo antigo do Freepik, **toda geração no Magnific consome créditos** — não existe "modo normal grátis com pausa". Cheque `account_balance` antes de cada lote e avise o usuário do consumo estimado. Vídeo Kling 2.5 a 10s custa bem mais que a 5s.
>
> ⚠️ **Modo ilimitado NÃO vale via MCP.** Mesmo numa conta com plano ilimitado (Nano Banana Pro / Kling), a geração pela MCP **sempre cobra crédito**. Confirmado ao vivo: `account_balance` → `plan.unlimitedAppliesHere: false`, e `simulate_cost` por chamada → `isUnlimited: false` (ex.: 3 imagens Nano Banana Pro 2k = 225 créditos). O ilimitado só se aplica gerando **manualmente no app web** do Magnific — o que quebra a automação. Não há parâmetro pra forçar ilimitado nas tools `images_*`/`video_*`. Use `simulate_cost({ tool, arguments })` pra estimar antes de lotes grandes (read-only, não cobra). Ordem de grandeza de um reel inteiro (12 cenas × 3 imagens + 12 × 2 vídeos 10s): **~18k créditos**.

---

## 1. Antes de qualquer lote

```
mcp__magnific__account_balance      → { credits.available, ... }
```
Se o saldo estiver baixo pro lote inteiro (12 cenas × 3 imagens + 12 × 2 vídeos), avise o usuário antes de começar.

Extraia os prompts do roteiro (determinístico):
```bash
node .claude/skills/reels-vhoe/runner/extrair-prompts.mjs \
  --file "Reels_Feitos/em_producao/NN_codinome/roteiro.md"
```
Devolve JSON: `{ codinome, scene_count, cenas:[{ label, num, promptNanoBanana, promptKling:{positive,negative} }], faltando }`. Use `cenas` como a lista de trabalho; se `faltando.imagens`/`faltando.videos` não estiver vazio, alerte (o roteiro está incompleto).

---

## 2. FASE 2 — imagens (Nano Banana Pro, 3 versões/cena)

Para **cada cena** com `promptNanoBanana`:

```
# 1) gera as 3 versões numa chamada só
mcp__magnific__images_generate({
  prompt: <promptNanoBanana da cena>,
  mode: "imagen-nano-banana-2",
  aspectRatio: "9:16",
  resolution: "2k",
  count: 3
})
→ guarde os creationIdentifier das 3 creations (v1, v2, v3)

# 2) espera ficarem prontas (lotes de ATÉ 8 identifiers)
mcp__magnific__creations_wait({ identifiers:[id_v1, id_v2, id_v3], timeoutSeconds:25 })
#   repita enquanto houver item não-terminal (a resposta traz poll_after_seconds)

# 3) pega a URL final de cada uma
mcp__magnific__creations_get({ creationIdentifier: id_vN })  → { url }

# 4) baixa pro disco (bytes — fora da MCP)
node .claude/skills/reels-vhoe/runner/magnific-io.mjs download \
  --url "<url>" --out "Reels_Feitos/em_producao/NN_codinome/imagens/cena_NN_vN.png"
```

Nomenclatura: `imagens/cena_NN_vN.png` (ex.: `cena_01_v1.png`, `cena_01_v2.png`, `cena_01_v3.png`).

**Eficiência:** dá pra disparar `images_generate` de várias cenas em sequência antes de esperar, e então fazer `creations_wait` em lotes de 8. Nano Banana Pro renderiza em ~50s, então o gargalo é pequeno. Faça por cena se preferir simplicidade.

**Preview pro humano:** num cliente com UI, depois das creations ficarem prontas, chame `mcp__magnific__creations_show({ identifiers:[...] })` pra mostrar as 3 versões inline — ajuda o usuário a escolher mais rápido na pausa humana (ele ainda copia o arquivo escolhido pra `imagens_escolhidas/cena_NN.png`).

> Higiene do prompt (já vem do roteiro, mas confira): começa com "Cinematic photograph of", termina com "film grain"; **não** tem `negative_prompt` (Nano Banana Pro ignora). Não ponha código hex no prompt (o modelo renderiza o texto na imagem).

Depois das imagens baixadas → **pausa humana** (escolha 1 versão/cena → `imagens_escolhidas/cena_NN.png`).

---

## 3. FASE 3 — vídeos (Kling 2.5, image-to-video, 2 versões/cena)

Pré-condição: `imagens_escolhidas/cena_NN.png` existe pra cada cena. A imagem escolhida vira o **keyframe inicial** do clip.

### 3.1 Subir a imagem escolhida → keyframe (arquivo local, 3 passos)

A MCP não lê o disco local; suba via URL presignada:

```
# a) pede a URL de upload
mcp__magnific__creations_request_upload({ mimeType:"image/png" })
→ { proxyUploadUrl: <presigned PUT>, path: <temp path> }   (use proxyUploadUrl no PUT; path no finalize)

# b) PUT dos bytes (fora da MCP)
node .claude/skills/reels-vhoe/runner/magnific-io.mjs put \
  --url "<proxyUploadUrl>" \
  --file "Reels_Feitos/em_producao/NN_codinome/imagens_escolhidas/cena_NN.png" \
  --mime image/png

# c) converte o upload em creation
mcp__magnific__creations_finalize_upload({ path: <temp path> })
→ { creationIdentifier }   ← este é o keyframe.start.url do vídeo
```

### 3.2 Gerar as 2 versões (2 chamadas — clips[] num único call vira sequência, não versões)

Para `v` em [1, 2]:
```
mcp__magnific__video_generate({
  video: {
    clips: [{
      slug: "kling-25",
      duration: 10,
      aspectRatio: "9:16",
      resolution: "1080p",
      prompt: <promptKling.positive>,
      negativePrompt: <promptKling.negative>,   // omita se vier vazio
      keyframes: { start: { type: "image", url: <keyframe creationIdentifier> } }
    }]
  }
})
→ guarde o creationIdentifier do vídeo
```

### 3.3 Esperar + baixar

Vídeo Kling renderiza em ~10min (`expectedGenerationTime: 600`). Estratégia eficiente:
1. Dispare as 2 chamadas da cena (ou de várias cenas) primeiro, juntando os identifiers.
2. `creations_wait({ identifiers:[...até 8...], timeoutSeconds:25 })` em loop até terminar (use `poll_after_seconds`).
3. `creations_get({ creationIdentifier })` → `url`.
4. Baixe:
```bash
node .claude/skills/reels-vhoe/runner/magnific-io.mjs download \
  --url "<url>" --out "Reels_Feitos/em_producao/NN_codinome/videos_kling/cena_NN_vN.mp4"
```

Nomenclatura: `videos_kling/cena_NN_v1.mp4` e `cena_NN_v2.mp4`.

> Para não estourar custo/concorrência, gere em ondas (ex.: 3 cenas = 6 vídeos por onda) e espere cada onda antes da próxima. Avise o usuário do progresso.

---

## 4. Higiene da MCP Magnific (não erre isto)

- **Encadeamento sempre por `creationIdentifier`** (ou o `url` do `creations_get`), **nunca** `webUrl`. `webUrl` é só pra mostrar a humano.
- Depois de qualquer `images_*` / `video_*`, **siga o campo `instruction`** da resposta.
- `creations_wait` faz long-poll de ≤25s e aceita 1..8 identifiers — chame em lotes e repita até o item ficar terminal.
- Modelo de **imagem** → `mode`. Modelo de **vídeo** → `slug` (no clip). Não troque.
- Keyframe (start/end) vai em `video.clips[].keyframes`, **não** em `references[]`.

## 5. Troubleshooting MCP

| Problema | Solução |
|---|---|
| Saldo insuficiente | `account_balance` antes do lote; reduza versões (img 3→2, vídeo 10s→5s) ou avise o usuário. |
| `creations_wait` segue não-terminal | Normal pra vídeo (~10min). Continue o loop respeitando `poll_after_seconds`. |
| `negativePrompt` rejeitado pelo modelo | Reenvie a chamada **sem** `negativePrompt`. |
| Falha numa cena específica | Regenere só ela (repita a chamada `images_generate`/`video_generate` daquela cena). |
| `put` retornou HTTP ≠ 200/204 | A URL presignada expira rápido — peça `creations_request_upload` de novo e refaça o PUT na hora. |
| `download` HTTP 403/expirado | Pegue a `url` de novo via `creations_get` (URLs de asset podem expirar) e rebaixe. |
