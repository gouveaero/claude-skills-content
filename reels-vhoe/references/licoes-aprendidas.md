# Lições aprendidas (atualizado a cada missão)

Melhorias acumuladas de produções reais. Aplique sempre.

## Legendas (KineticCaption)
- **Destaque proporcional, não gigante.** `templates/components/KineticCaption.tsx` (na skill `video-editor-remotion`): fontSize keyword/emphasis/normal = `60/58/54`, `targetScale` gentil (`1.10/1.07/1.03`), `gap` `0.7em`, box `padding 0.05em 0.15em` / `borderRadius 10`. Destaque enorme "fica distante" e distrai (feedback real). Mude lá — beneficia todos os projetos.
- **Sem token só-pontuação.** O `montar-reel-plan.mjs` descarta tokens que são só pontuação (ex.: travessão "—" isolado virava uma legenda sem sentido tipo "RAPTOR —"). O "—" continua no texto do TTS (pra pausa), só não vira legenda.

## Velocidade
- **Default 1.25×** (`montar-reel.sh` `SPEED`). 1.2× ficou arrastado em teste real; 1.3× é punch máximo mas aperta números técnicos. Ofereça 1.2/1.25/1.3 ao usuário quando em dúvida (gere comparativo curto e deixe escolher).

## Aeronave rara → morphing pra lookalike comum
- Modelos (Nano Banana / Kling) **derivam aeronave rara pro parente viral comum** — ex.: o YF-23 vira F-22 constantemente. Mitigações em camadas:
  1. **Negativo forte nos clipes Kling**: `F-22 shape, F-117 shape, vertical stabilizers, conventional twin tail, canards, thrust vectoring nozzles, wrong aircraft, ...` (a forma do keyframe ancora, mas o movimento ainda morfa).
  2. **QA visual por workflow de agentes** (imagens E vídeos): 1 agente por cena lê os frames e escolhe a versão fiel / sinaliza regen. Pega o que passa batido a olho.
  3. **Fallback Ken-Burns** pras cenas dinâmicas aéreas que insistem em morfar (top-down, banking forte): anima o **still correto** com zoom sutil (`ffmpeg zoompan`, 10–11s, 1080×1920). Garante a forma; o usuário gosta do mix vídeo+still. Nomeie `cena_NN_kb.mp4`.

## Conteúdo / alcance
- **Cite e mostre o rival viral.** Mencionar/mostrar a aeronave irmã que já é viral no perfil puxa alcance (ex.: "o YF-22 virou o F-22 Raptor" + imagem do F-22, inclusive lado a lado com o YF-23). F-22/B-2 performam alto na Vhoe.

## Modo teste A/B de hooks (9 variantes do mesmo corpo)
Quando o objetivo é testar qual abertura retém melhor e só publicar a vencedora:
- **3 hooks de narração × 3 hooks visuais = 9 variantes**, com o **corpo (cenas pós-hook) idêntico**.
- **Montagem modular** (economiza ElevenLabs e render): pasta `_body/` (corpo, renderizado 1×) + `_hook1/2/3/` (1 cena cada, 1 narração curta cada). Render do corpo a `SPEED=1.0`; pra cada (NH-i, VH-j) troca o clipe visual no `_hookI` e renderiza o segmento curto; `concat(hook_seg, body)` + acelera no fim → 9 finais.
- Custo ElevenLabs = 1 narração de corpo + 3 hooks curtos ≈ **uma narração inteira** (vs 9). Visuais/clipes do corpo gerados 1×; só os 3 hooks multiplicam.
