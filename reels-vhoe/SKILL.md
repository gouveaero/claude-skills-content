---
name: reels-vhoe
description: Pipeline completo de produção de Reels para o @vhoe.co — pesquisa tema trending em aviação militar (WebSearch/WebFetch), escreve o roteiro completo (10 blocos, formato em references/formato-roteiro.md), submete o roteiro à crítica multi-conselheiro da skill roteiro-council (melhoria antes da aprovação), gera imagens por cena (Nano Banana Pro) e vídeos 10s por cena (Kling 2.5) via MCP do Magnific, gera narração na voz da marca (ElevenLabs with-timestamps) e MONTA o reel final editado (legendas word-level sincronizadas + corte seco) orquestrando a skill video-editor-remotion → entrega final.mp4 pronto pra publicar. Pipeline em 7 fases com pausas humanas (escolha de imagens, aprovação de roteiro, gates de custo, gate do proxy). Inclui guard de deduplicação contra histórico. Invocar quando o usuário pedir reel, vídeo ou quiser iniciar produção de conteúdo em vídeo para o @vhoe.co.
---

# Reels Vhoe — Pipeline de Produção Completo

Pipeline de 7 fases (orquestrador) para produzir Reels de aviação militar para o @vhoe.co, **do tema ao `final.mp4` pronto pra publicar**. Cada rodada entrega:
- Roteiro completo (10 blocos)
- Imagens cinematográficas por cena (Magnific · Nano Banana Pro)
- Vídeos 10s por cena (Magnific · Kling 2.5, image-to-video)
- Narração na voz da marca (ElevenLabs `with-timestamps`)
- **Reel final editado** — legendas word-level sincronizadas + corte seco + narração (render 100% Remotion via skill `video-editor-remotion`)
- `legenda.txt` com CTA duplo e hashtags pro post

> **Esta skill é o ORQUESTRADOR.** Ela não reimplementa a edição: a montagem final é feita chamando a skill generalista **`video-editor-remotion`** (motor Remotion compartilhado por vários projetos). Assim, melhorias no editor (ex: estilo de legenda) beneficiam todos. Ver [`references/montagem-remotion.md`](references/montagem-remotion.md).

> **Geração via MCP do Magnific.** Imagens e vídeos são gerados pelo agente chamando a MCP do Magnific direto (sem navegador). Os scripts em `runner/` só fazem a parte determinística: extrair os prompts do roteiro e transferir bytes (download do asset / upload do keyframe). As receitas exatas de chamada estão em [`references/magnific-pipeline.md`](references/magnific-pipeline.md) — **leia antes das Fases 2 e 3**.

---

## Antes de começar — leia sempre

Leia os seguintes documentos de referência ANTES de qualquer output criativo:
- [`references/formula-canonica.md`](references/formula-canonica.md) — fórmula testada + anti-padrões
- [`references/formato-roteiro.md`](references/formato-roteiro.md) — formato de arquivo do roteiro (10 blocos; o que o runner lê)
- [`references/top-reels.md`](references/top-reels.md) — top 3 legendas (few-shot examples)
- [`references/aeronaves-validadas.md`](references/aeronaves-validadas.md) — pool de aeronaves
- [`references/licoes-aprendidas.md`](references/licoes-aprendidas.md) — melhorias acumuladas (legenda proporcional, 1.25×, morphing de aeronave rara → Ken-Burns, modo teste A/B de hooks)
- [`references/magnific-pipeline.md`](references/magnific-pipeline.md) — receitas MCP (imagens + vídeos) — **antes das Fases 2 e 3**
- [`../../01_BRAND.md`](../../01_BRAND.md) — lei da marca (nunca contradiga)
- [`../../04_CONTENT_PLAYBOOK.md`](../../04_CONTENT_PLAYBOOK.md) — 5 pilares, fórmulas

**Pré-requisito técnico**: MCP do Magnific conectada (tools `mcp__magnific__*`) e Node 18+ (o runner usa `fetch` global; aqui o ambiente é Node 22). Antes do 1º lote da sessão, cheque o saldo com `mcp__magnific__account_balance` — toda geração consome créditos. ⚠️ O **modo ilimitado da conta não vale via MCP** (`unlimitedAppliesHere: false`); o ilimitado só funciona gerando manualmente no app web. Use `mcp__magnific__simulate_cost` pra estimar lotes grandes.

**Instalação**: a skill é **project-scoped** — vive em `<Projeto>/.claude/skills/reels-vhoe/` porque lê `../../01_BRAND.md` e resolve `Reels_Feitos/` a partir da própria posição no disco (`runner/lib/projects.mjs`; override pela env `VHOE_DIR`). As skills `roteiro-council` e `video-editor-remotion` (globais, repo `claude-skills`) precisam estar em `~/.claude/skills/` (override da segunda pela env `VE_SKILL`). A narração exige `ELEVENLABS_API_KEY` no env; o catálogo de trilhas lê `VHOE_MUSICAS` ou `config.local.json`.

---

## Modos de invocação

```
/reels-vhoe                           → pesquisa tema trending + inicia pipeline completo
/reels-vhoe <tema/aeronave>           → usa tema fornecido + inicia pipeline completo
/reels-vhoe --fase imagens            → retoma a partir da Fase 2 (roteiro já existe)
/reels-vhoe --fase videos             → retoma a partir da Fase 3 (imagens já escolhidas)
/reels-vhoe --fase narracao           → retoma a partir da Fase 4 (vídeos prontos → narração + edit_plan)
/reels-vhoe --fase montagem           → retoma a partir da Fase 5 (edit_plan pronto → proxy/final)
/reels-vhoe --duracao curto|padrao|longo  → define perfil (default: padrao)
/reels-vhoe --versions N              → versões de imagem por cena (default: 3)
/reels-vhoe --skip-council            → pula o gate roteiro-council na Fase 1 (não recomendado)
```

---

## FASE 0 — Descoberta de tema

### Se o usuário forneceu um tema

1. Registre o tema e a(s) aeronave(s) mencionadas.
2. Pule para o **Guard de deduplicação** abaixo.

### Se o usuário pediu "tema trending" ou não especificou

Pesquise com `WebSearch` + `WebFetch` (ver [`references/perplexity-prompts.md`](references/perplexity-prompts.md) para ângulos de busca):
- Busca: `WebSearch "aviação militar notícias 2026 FAB Gripen KC-390 F-22"`
- Busca: `WebSearch "military aviation news combat drone stealth 2026"`
- Fetch: `https://www.defesanet.com.br/` e `https://www.aeromagazine.uol.com.br/` (titular dos últimos 5 posts)

Para cada sugestão, avalie e mostre ao usuário:
- Aeronave específica (nome e modelo)
- Ângulo/fato surpreendente
- Score de potencial (1-5 estrelas)

Apresente 3-5 sugestões com fonte e ângulo.

### Guard de deduplicação

Antes de confirmar o tema, verifique o histórico:

```bash
cd .claude/skills/reels-vhoe/runner && node -e "
  import('./lib/dedup.mjs').then(m => {
    const history = m.buildHistory();
    const warnings = m.checkDuplicate(history, '<TEMA>', ['<AERONAVE1>', '<AERONAVE2>']);
    console.log(JSON.stringify({ history: history.slice(-5), warnings }, null, 2));
  }).catch(e => console.error(e.message));
"
```

- Se houver warnings: avise o usuário e ofereça alternativa (não bloqueia — usuário pode forçar).
- Se não houver: confirme o tema e prossiga.

**Saída da Fase 0**: tema confirmado + codinome operacional (ex: `gripen_supremacia_cerrado`) + número sequencial NN (verifique `Reels_Feitos/backlog/` e `Reels_Feitos/_INDICE.md` para o próximo número).

---

## FASE 1 — Roteiro

### 1.1 Pergunte a duração se não especificada

Apresente os 3 perfis:
- `curto`: ~60s, 9-10 cenas, narração ~150 palavras
- `padrao`: ~90s, 12-13 cenas, narração ~225 palavras *(default)*
- `longo`: ~120s, 16-17 cenas, narração ~300 palavras

### 1.2 Escreva o roteiro (você é o gerador)

> Não existe skill separada de roteiro. O roteiro é escrito aqui, seguindo [`references/formula-canonica.md`](references/formula-canonica.md) (fórmula, pilares, hooks, CTAs, anti-padrões) e o formato de arquivo de [`references/formato-roteiro.md`](references/formato-roteiro.md) (10 blocos; é o que `runner/lib/parse.mjs` sabe ler).

Entradas:
- O tema/aeronave escolhido
- O codinome operacional
- O número NN
- O `duration_target` escolhido

Regras do roteiro:
- **PT-BR obrigatório** (não PT-PT — sem "tu", "a gente" por "nós")
- **Aeronave sempre nomeada** com modelo exato
- **Dados factuais**: use WebSearch se envolver operações recentes (2024+)
- **Output final**: salvar em `Reels_Feitos/backlog/NN_codinome.md`

### 1.3 Adicione o header YAML ao roteiro gerado

Após o roteiro ser gerado, insira/atualize o header YAML no arquivo:

```yaml
---
codinome: NN_codinome
tema: "descrição do tema"
aircraft: ["Aeronave1", "Aeronave2"]
duration_target: padrao
scene_count: 12
scene_duration_s: 7
created: YYYY-MM-DD
provider: magnific            # imagem: Nano Banana Pro · vídeo: Kling 2.5
---
```

> A geração das Fases 2 e 3 não é mais disparada por um script de navegador. O agente lê os prompts com `node runner/extrair-prompts.mjs --file <roteiro.md>` e chama a MCP do Magnific seguindo [`references/magnific-pipeline.md`](references/magnific-pipeline.md).

### 1.4 Conselho de roteiro — gate de qualidade (`roteiro-council`)

Com o roteiro rascunhado e o header YAML no lugar, **antes de mostrar ao humano e antes de qualquer geração paga**, submeta o roteiro à skill **`roteiro-council`**. Este é o ponto de maior alavancagem do pipeline: o roteiro é o artefato mais barato de consertar (texto puro, zero crédito), e Fases 2-4 (imagens, vídeos, narração) custam crédito e tempo — corrigir o roteiro depois delas desperdiça assets.

1. **Invoque `roteiro-council`** sobre `Reels_Feitos/backlog/NN_codinome.md`, em **modo reel**. No enquadramento informe:
   - FORMATO: reel · PLATAFORMA: Instagram · perfil de duração (curto/padrao/longo) e nº de cenas do header.
   - Marca = Vhoe. O conselho lê a lei da marca (`01_BRAND.md`) + pilares (`04_CONTENT_PLAYBOOK.md`) e **puxa os bancos desta própria skill** (`references/formula-canonica.md` = 6 hooks + fórmula + 5 pilares; `references/licoes-aprendidas.md`) no passo de Frame dele — `roteiro-council` já lista `reels-vhoe` como banco condicional de projeto.
   - Sem perfil voice-dna da Vhoe ainda → o conselheiro de Voz marcará "voice unverified"; tudo bem.
2. **O conselho devolve** um scorecard de 6 dimensões (Hook / Retenção / Clareza / Anti-slop / Voz-marca / Persuasão) + veredito generalista + lista priorizada de correções + um rewrite do elemento mais fraco (em geral o hook em 3 versões).
3. **Aplique as correções no roteiro** — *você é o gerador; `roteiro-council` só critica, então NÃO faça handoff de volta pra reels-vhoe*:
   - Aplique direto as correções claras e de alta alavancagem: trocar/afiar o hook (use a melhor das 3 versões, ou funda-as), matar opener banido, eliminar paralelismo negativo oco, afiar o last-dab, dar alavanca psicológica ao CTA, quebrar "and then" em BUT/THEREFORE.
   - **Autenticidade ganha de estilo:** se uma sugestão do conselho conflitar com um fato de aeronave verificado ou com uma invariante PT-BR / anti-padrão desta skill, a autenticidade vence (escada `Accurate > Clear > Specific > Voiced > Stylish`). Nunca troque uma designação/número real por uma frase mais "bonita".
   - Correções de **juízo** (ex.: mudar a lente/ângulo inteiro do roteiro) → não aplique sozinho; leve como sugestão pro checkpoint (1.5).
4. **Se mexeu no roteiro**, regrave o arquivo e marque `council_reviewed: true` no header YAML. (As extrações de `narracao.txt`/`legenda.txt` só acontecem em 1.5, após aprovação — então sempre saem da versão já melhorada.)
5. **Uma passada por padrão** — não entre em loop de conselho; uma rodada basta. O humano pode pedir outra no checkpoint. `--skip-council` pula este passo (não recomendado).

> **Custo:** `roteiro-council` é **texto puro — não consome créditos Magnific/ElevenLabs**. As ~19 sub-chamadas do conselho são baratas perto de um lote de imagens/vídeos refeito por causa de um roteiro fraco.

### 1.5 Checkpoint humano

Apresente ao usuário:
- Resumo: codinome, tema, N cenas, duração estimada
- **Parecer do `roteiro-council`**: o scorecard (6 dimensões) + as correções que você já aplicou + qualquer sugestão de juízo ainda pendente
- Bloco "3 Hooks de narração" (já na versão melhorada pelo conselho) para aprovação rápida

**Aguarde aprovação** antes de prosseguir (o usuário pode pedir "roda o conselho de novo" para outra passada). Quando aprovado:
1. Crie as pastas: `Reels_Feitos/em_producao/NN_codinome/{imagens,imagens_escolhidas,videos_kling}/`
2. Copie o roteiro (versão melhorada) para `Reels_Feitos/em_producao/NN_codinome/roteiro.md`
3. Extraia `narracao.txt` e `legenda.txt` do roteiro e salve na pasta

---

## FASE 2 — Imagens (Magnific · Nano Banana Pro)

> Leia [`references/magnific-pipeline.md`](references/magnific-pipeline.md) §1–§2 para as chamadas exatas.

1. **Saldo**: `mcp__magnific__account_balance` — avise se baixo pro lote.
2. **Extraia os prompts** (determinístico):
   ```bash
   node .claude/skills/reels-vhoe/runner/extrair-prompts.mjs \
     --file "Reels_Feitos/em_producao/NN_codinome/roteiro.md"
   ```
   Use o array `cenas[]` do JSON como lista de trabalho. Se `faltando.imagens` não estiver vazio, alerte.
3. **Para cada cena** com `promptNanoBanana`, gere as 3 versões numa chamada (`count: 3`):
   ```
   mcp__magnific__images_generate({
     prompt: <promptNanoBanana>, mode: "imagen-nano-banana-2",
     aspectRatio: "9:16", resolution: "2k", count: <versions, default 3>
   })
   ```
4. **Espere e baixe**: `creations_wait` (lotes ≤8) → `creations_get` → `url` → baixe:
   ```bash
   node .claude/skills/reels-vhoe/runner/magnific-io.mjs download \
     --url "<url>" --out "Reels_Feitos/em_producao/NN_codinome/imagens/cena_NN_vN.png"
   ```

### Pausa humana obrigatória ⏸

Após baixar todas as imagens, informe ao usuário:

```
✅ Fase 2 concluída: [N] imagens geradas em:
   Reels_Feitos/em_producao/NN_codinome/imagens/

⏸ PAUSA PARA ESCOLHA DAS IMAGENS

Para cada cena, escolha a melhor versão (v1, v2 ou v3) e copie para:
  Reels_Feitos/em_producao/NN_codinome/imagens_escolhidas/cena_NN.png

Nomenclatura obrigatória: cena_01.png, cena_02.png, ..., cena_NN.png

Quando terminar, responda "imagens escolhidas" para iniciar a Fase 3.
```

**Aguarde** a confirmação "imagens escolhidas" antes de prosseguir.

---

## FASE 3 — Vídeos (Magnific · Kling 2.5, image-to-video)

> Leia [`references/magnific-pipeline.md`](references/magnific-pipeline.md) §3 para as chamadas exatas.

### Validação das imagens escolhidas

```bash
ls "Reels_Feitos/em_producao/NN_codinome/imagens_escolhidas/"
```

Se faltar alguma cena, alerte o usuário antes de rodar.

### Execução (por cena)

A imagem escolhida vira o **keyframe inicial** do clip Kling. Para cada cena:

1. **Suba a imagem escolhida** (arquivo local → creation, 3 passos):
   `creations_request_upload({ mimeType:"image/png" })` → `magnific-io.mjs put` → `creations_finalize_upload({ path })` → `creationIdentifier`.
2. **Gere 2 versões** (2 chamadas `video_generate` separadas), cada uma:
   ```
   mcp__magnific__video_generate({ video: { clips: [{
     slug: "kling-25", duration: 10, aspectRatio: "9:16", resolution: "1080p",
     prompt: <promptKling.positive>, negativePrompt: <promptKling.negative ou omitir>,
     keyframes: { start: { type: "image", url: <keyframe creationIdentifier> } }
   }] } })
   ```
3. **Espere e baixe** (Kling ~10min/vídeo): `creations_wait` (lotes ≤8) → `creations_get` → `url`:
   ```bash
   node .claude/skills/reels-vhoe/runner/magnific-io.mjs download \
     --url "<url>" --out "Reels_Feitos/em_producao/NN_codinome/videos_kling/cena_NN_vN.mp4"
   ```

Gere em ondas (~3 cenas/onda) pra controlar custo e concorrência; informe o progresso.

> Após baixar todos os vídeos, faça **QA de morphing**: extraia frames (~2s/5s/8,5s) de cada clipe e olhe — Kling às vezes deforma a aeronave (profundor inexistente, motor duplicado). Regenere a cena com prompt corrigido se preciso. Ex. real: F-39E renderizou com profundor (só tem canard) → regenerado.

---

## FASE 4 — Narração + Plano de edição (ElevenLabs · voz da marca)

> Leia [`references/montagem-remotion.md`](references/montagem-remotion.md) §1–§2.

Gera a narração na voz da marca **e** o `edit_plan.json` num passo só, com sincronia word-level exata.

1. **Voz/config**: `voice_id` + `model_id` vêm de um `.eleven.json` (na pasta da missão ou raiz do projeto). O `voice_id` **não é segredo** e pode ser commitado; a **API key vem do env `ELEVENLABS_API_KEY`** (nunca commite a key — peça ao usuário ou leia de um arquivo gitignored). Default: `voice_id` da marca, `model_id: eleven_multilingual_v2` (bom p/ PT-BR).
2. **Gere narração + plano** (determinístico):
   ```bash
   ELEVENLABS_API_KEY=sk_... node .claude/skills/reels-vhoe/runner/montar-reel-plan.mjs \
     --dir "Reels_Feitos/em_producao/NN_codinome"
   ```
   Lê as cenas do `roteiro.md` (§4), chama o ElevenLabs **`with-timestamps`** (alinhamento exato do texto — melhor que Whisper p/ "F-39E"/"150"), e escreve:
   - `narracao.mp3` (voz da marca)
   - `edit_plan.json` (cortes secos cena→cena, legendas word-level, narração como faixa de áudio)
   - `timings.json` (fronteiras de cena, duração, nº de legendas)
3. **O que o script resolve sozinho** (não refaça à mão):
   - **Sync**: corte cena→cena no **meio da pausa** entre frases; legenda em segundos absolutos = tempo da narração.
   - **Slow-clip**: se uma cena narra mais que os ~10s do clipe (cenas longas), desacelera o clipe (`setpts`) imperceptivelmente p/ cobrir — mantém o timeline = áudio.
   - **Legendas**: chunks de ≤4 palavras, quebra em pontuação; números/modelos viram destaque laranja, palavras de marca (Brasil/FAB/Gripen…) viram dourado. Destaque é **proporcional** (não gigante) e tokens só-pontuação (travessão "—" isolado) são **descartados** da legenda — ver [`references/licoes-aprendidas.md`](references/licoes-aprendidas.md).
4. **Custo ElevenLabs**: ~1 crédito/caractere (≈900 chars p/ um reel curto). Avise se a conta for limitada.

Confira o resumo do script: `timeline ≈ áudio` (✅) e nenhuma cena `⚠️ DESALINHADO`.

---

## FASE 5 — Montagem + Render (reel final · orquestra `video-editor-remotion`)

> Leia [`references/montagem-remotion.md`](references/montagem-remotion.md) §3–§4. **Esta fase chama a skill generalista, não reimplementa edição.**

1. **Proxy** (revisão rápida 540×960):
   ```bash
   .claude/skills/reels-vhoe/runner/montar-reel.sh "Reels_Feitos/em_producao/NN_codinome" proxy
   ```
   O script faz: scaffold do Remotion **num tmp dir sem espaços** (Google Drive quebra o webpack), `build_remotion.py`, copia clipes+narração pra `public/`, renderiza o proxy → `proxy_PREVIEW.mp4`.
2. **Revisão visual obrigatória** (o que pegou erros reais aqui): extraia frames do proxy (1 por cena) e avalie criticamente — **sync legenda↔voz↔clipe**, **espaçamento das legendas**, clipe certo na cena, morphing. Ajuste o que precisar (estilo de legenda vive em `video-editor-remotion/templates/components/KineticCaption.tsx`) e re-renderize o proxy.
3. **Gate humano**: abra o `proxy_PREVIEW.mp4` (`open`) e aguarde aprovação do usuário antes do render final (HQ leva ~5-15 min).
4. **Render final** 1080×1920 H.264 CRF18:
   ```bash
   .claude/skills/reels-vhoe/runner/montar-reel.sh "Reels_Feitos/em_producao/NN_codinome" final
   ```
   Salva **as duas velocidades**: `final.mp4` (= **1.25×** por padrão — 1.2× ficou arrastado em teste real; é o que se publica), `final_1.0x.mp4` (normal) e `final_1.25x.mp4` (rótulo explícito). Mude com `SPEED=1.0` (desliga) ou `SPEED=1.3 ...`. A aceleração casa vídeo+narração (`setpts`+`atempo`, pitch preservado) e as legendas seguem sincronizadas. ⚠️ Não copie o `final.mp4` enquanto o render escreve (sem o moov atom = corrompido); espere terminar.

---

## FASE 6 — Empacotamento

### 6.1 Atualizar `_INDICE.md`

Adicione uma linha na tabela de `Reels_Feitos/_INDICE.md`:

```markdown
| NN_codinome | Aircraft1, Aircraft2 | Descrição do tema | em_producao | YYYY-MM-DD |
```

### 6.2 Sugestão de trilha sonora

> Leia [`references/trilhas-catalogo.md`](references/trilhas-catalogo.md).

Com o `final.mp4` pronto, sugira uma trilha de fundo que combine com o reel:

1. **Classifique a energia dominante** do reel num dos 4 baldes do catálogo (AGRESSIVO / ÉPICO / BRASIL-FAB / TÉCNICO) usando o tom da narração + tema (Fases 1 e 5) e o ritmo dos cortes; se estiver em dúvida, amostre 2–3 frames do `final.mp4` (`ffmpeg`) e olhe.
2. **Escolha do catálogo, no balde correspondente**, em **ordem de prioridade**:
   - **2 faixas COM copyright** (a #1 é a que mais combina) — para o Reel orgânico, aplicadas pela biblioteca de áudio do Instagram.
   - **2 faixas SEM copyright** (Pixabay) — seguras inclusive para anúncio pago.
3. Para cada faixa, escreva **uma frase** ligando ao vídeo (energia, momento de virada, tema). Inclua o bloco no relatório (§6.3).

### 6.3 Relatório final ao usuário

```
🎬 MISSÃO NN — [CODINOME] — REEL CONCLUÍDO

📁 Pasta: Reels_Feitos/em_producao/NN_codinome/

✅ Entregue:
  - final.mp4 — reel editado 1080×1920, narração + legendas word-level (PRONTO P/ PUBLICAR)
  - roteiro.md — 10 blocos completos
  - imagens/ + imagens_escolhidas/ — Nano Banana Pro
  - videos_kling/ — clipes Kling 2.5 (10s)
  - narracao.mp3 — voz da marca (ElevenLabs)
  - legenda.txt — caption do post (CTA duplo + hashtags)

🎵 Trilha sugerida (combina com a energia do reel: [BALDE — 1 linha]):
  Com copyright (Reel orgânico, via biblioteca de áudio do Instagram):
    1. [faixa] — [por que combina]
    2. [faixa] — [por que combina]
  Sem copyright (Pixabay — seguro inclusive p/ anúncio pago):
    1. [faixa] — [por que combina]
    2. [faixa] — [por que combina]

📋 Próximos passos (do usuário):
  1. Revisar o final.mp4
  2. Aplicar a trilha (a #1 com copyright pela biblioteca do Instagram; ou a #1 sem copyright se for impulsionar/ads)
  3. Publicar às 18h-20h BRT com a legenda.txt
  4. Mover pasta p/ Reels_Feitos/publicados/NN_codinome/ e preencher metricas.md em D+7
```

---

## Regras e anti-padrões

### Tom PT-BR invariante

| ✓ Correto | ✗ Errado |
|---|---|
| "pra", "tá", "cara" | "você" formal, "senhor" |
| "o avião que cega radares" | "o aeronave que desativa sistemas" |
| "stealth" (termo técnico) | "avião escondido" |
| "callsign" | "apelido de piloto" |
| PT-BR informal | PT-PT ("tu", "vês", "a gente") |

### Autenticidade técnica (Spotters detectam erros na hora)

- **Sempre verifique** specs de aeronaves recentes com WebSearch
- Numeração militar correta (ex: F-39E, não F-39 ou Gripen F-39)
- Datas de operações verificadas
- Se não conseguir confirmar: "estimado em" / "de acordo com relatórios"

### Qualidade visual (prompts Nano Banana Pro)

- Sempre começa com "Cinematic photograph of"
- Ângulo de câmera concreto (low angle, overhead, three-quarter)
- Iluminação específica (golden hour, cold steel blue, dark moody)
- Color grading (warm golden, desaturated military, etc)
- Termina com "film grain"
- O prompt é texto puro — Nano Banana Pro **não usa `negative_prompt`** e **não** deve conter código hex (o modelo renderiza o texto na imagem)

### Qualidade visual (prompts Kling)

- Verbo de movimento de câmera: dolly in, lateral tracking, orbit, tilt up, boom, pull back
- Ação contínua (sujeito não está estático)
- Termina com "ultra realistic military footage"
- `negativePrompt` (quando o roteiro fornecer): morphing, deformation, blurry, static, jittery. Se vier vazio, omita o campo. Se a MCP rejeitar `negativePrompt`, reenvie sem ele.

---

## Estrutura de output

```
Reels_Feitos/
├── _INDICE.md                       ← atualizar a cada missão
├── backlog/
│   └── NN_codinome.md               ← roteiro gerado (backup/rascunho)
├── em_producao/
│   └── NN_codinome/
│       ├── roteiro.md               ← fonte de verdade
│       ├── imagens/                 ← N cenas × versões (Nano Banana Pro)
│       ├── imagens_escolhidas/      ← 1 PNG por cena (escolha manual)
│       ├── videos_kling/            ← N clipes MP4 (Kling 2.5) + _slow se preciso
│       ├── narracao.mp3             ← voz da marca (Fase 4, ElevenLabs)
│       ├── edit_plan.json           ← plano de edição (Fase 4)
│       ├── .video-editor.json       ← paleta Vhoe p/ a montagem
│       ├── final.mp4                ← REEL EDITADO p/ publicar (Fase 5, =1.2×) ★
│       ├── final_1.0x.mp4           ← mesma edição em velocidade normal
│       ├── final_1.2x.mp4           ← rótulo explícito do 1.2×
│       └── legenda.txt
└── publicados/
    └── NN_codinome/
        ├── final.mp4
        └── metricas.md
```

---

## Runner (helpers determinísticos)

Fases 0-3: só Node 18+ (`fetch` global), sem `npm install`. Fases 4-5 também usam `ffmpeg`/`ffprobe`, `python3` e a skill `video-editor-remotion`.

| Script | O que faz |
|---|---|
| `runner/extrair-prompts.mjs --file <roteiro.md>` | Lê o roteiro → JSON `{ cenas:[{ promptNanoBanana, promptKling }], faltando }` |
| `runner/magnific-io.mjs download --url <url> --out <path>` | Baixa o asset final (PNG/MP4) da `url` do `creations_get` pro disco |
| `runner/magnific-io.mjs put --url <presigned> --file <local> --mime <m>` | PUT de um arquivo local pra URL presignada do `creations_request_upload` |
| `runner/lib/dedup.mjs` (via `node -e`) | Histórico + guard de deduplicação (Fase 0) |
| `runner/montar-reel-plan.mjs --dir <missão>` | **Fase 4** — narração ElevenLabs (`with-timestamps`) + `edit_plan.json` + `timings.json` (sync, slow-clip, legendas) |
| `runner/montar-reel.sh <missão> [proxy\|final]` | **Fase 5** — scaffold Remotion (tmp sem espaços) + `build_remotion` + assets + render → `proxy_PREVIEW.mp4` / `final.mp4` |

A geração de imagem/vídeo é **toda via MCP** (`mcp__magnific__*`) — ver [`references/magnific-pipeline.md`](references/magnific-pipeline.md). A montagem chama a skill `video-editor-remotion` — ver [`references/montagem-remotion.md`](references/montagem-remotion.md).

---

## Troubleshooting

| Problema | Solução |
|---|---|
| Saldo Magnific baixo | `account_balance` antes do lote; reduza versões (img 3→2, vídeo 10s→5s) ou avise o usuário |
| `creations_wait` segue não-terminal | Normal pra vídeo Kling (~10min). Continue o loop respeitando `poll_after_seconds` |
| `negativePrompt` rejeitado | Reenvie o `video_generate` sem o campo |
| `put` retornou HTTP ≠ 200/204 | URL presignada expira rápido — peça `creations_request_upload` de novo e refaça o PUT |
| `download` HTTP 403 / link expirado | Pegue a `url` de novo via `creations_get` e rebaixe |
| Uma cena específica falhou | Regenere só ela repetindo a chamada `images_generate`/`video_generate` daquela cena |
| Imagem escolhida não encontrada (Fase 3) | Nomeie como `cena_01.png`, `cena_02.png`, etc. Sem espaços |
| Roteiro sem prompts (`faltando` não-vazio) | Verifique se o roteiro tem as seções §6 (NanoBanana) e §7 (Kling) no formato de `references/formato-roteiro.md` |
| Montagem: webpack `snippets/... doesn't exist` ou `@remotion/lottie doesn't exist` | Use a `video-editor-remotion` já corrigida (copia snippets + stripa RichOverlays). Ver [`references/montagem-remotion.md`](references/montagem-remotion.md) §4 |
| Montagem: bundle quebra (path com espaços/acentos) | `montar-reel.sh` já scaffolda em tmp sem espaços — não rode `build_remotion` direto na pasta do Google Drive |
| `final.mp4` corrompido (`moov atom not found`) | Copiou enquanto o render escrevia. Espere o processo terminar antes de copiar |
| Legenda apertada/grande/grudada | Ajuste `KineticCaption.tsx` (`gap`, `fontSize`, `WebkitTextStroke`, `letterSpacing`, `lineHeight`) — ver [`references/montagem-remotion.md`](references/montagem-remotion.md) §4 |
