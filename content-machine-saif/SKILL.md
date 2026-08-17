---
name: content-machine-saif
description: >-
  DEPRECATED router — split (05/07/2026) into two single-brand skills. Use when a request mentions a
  "carrossel do Saif" without naming the brand and you must disambiguate: route to content-machine-secret
  for SECRET Align (@secret_aligners, B2B aligner-planning software, EN premium-minimal, rule-6) or to
  content-machine-clinic for Zahnspange Home (@zahnspange_home, B2C clinic, DE/EN, Werberecht). Do NOT
  produce content from this skill — always hand off to one of the two.
---

# content-machine-saif — DEPRECATED (split into two single-brand skills)

Em **05/07/2026** este fork de duas marcas foi **quebrado em duas skills mono-marca** para disparo mais limpo,
editorial por conta e menos risco de misturar tokens. **Não produza carrossel aqui.** Escolha a marca:

| Se a marca é… | Use a skill | Conta | Voz / regra |
|---|---|---|---|
| **SECRET Align** (software B2B, ortodontistas) | **`content-machine-secret`** | @secret_aligners | EN premium-minimal · **regra 6** · linha prova-primeiro |
| **Zahnspange Home** (clínica B2C, pacientes) | **`content-machine-clinic`** | @zahnspange_home | DE (paciente) / EN (autoridade) · **Werberecht** · par bilíngue |

Na dúvida entre as duas: **SECRET = software/features/casos de planejamento/eventos p/ dentistas**;
**clínica = paciente/agendamento/educação/antes-depois/kids/sazonal**. A linha editorial do SECRET está em
`🚀_Projects/Saif/10_SECRET_EDITORIAL_LINE.md`; a divisão bilíngue da clínica em `09_BRAND_VOICE_BASELINE.md`.

> Os arquivos de referência antigos deste diretório ficaram como histórico; as versões vivas (podadas por
> marca) estão em `content-machine-secret/references/` e `content-machine-clinic/references/`.
