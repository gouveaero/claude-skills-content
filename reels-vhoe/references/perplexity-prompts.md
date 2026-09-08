# Prompts de Pesquisa — WebSearch / WebFetch

Templates de ângulo de busca para a Fase 0 (descoberta de tema). Use com `WebSearch` + `WebFetch` (a antiga rota Perplexity via navegador foi removida na migração pra MCP). Adapte cada template numa query enxuta de WebSearch.

## Prompt principal — Trending geral

```
Quais são os 5 eventos mais relevantes e recentes sobre aviação militar nas últimas 2 semanas, 
globalmente e no Brasil? Foque em:
- Aeronaves específicas (nome e modelo exato)
- Operações militares reais
- Testes de novas tecnologias
- Conflitos ativos com uso de aviação
- Notícias sobre a FAB (Força Aérea Brasileira)

Para cada evento, indique:
1. O evento/fato principal
2. A aeronave envolvida (com modelo exato)
3. Por que isso seria interessante para um público leigo apaixonado por aviação
4. Grau de novidade (é algo que a maioria das pessoas não sabe?)

Responda em português do Brasil.
```

## Prompt variante — FAB / Brasil Soberano

```
Quais são as últimas novidades sobre a Força Aérea Brasileira (FAB)?
Foque em: Gripen F-39E, KC-390, Super Tucano, novas aquisições, exercícios, missões reais.
Quais desses temas têm fatos técnicos surpreendentes que o público geral não conhece?
Responda em português do Brasil com números e especificações verificáveis.
```

## Prompt variante — Tecnologia disruptiva

```
Quais são as aeronaves militares ou sistemas de armas mais tecnologicamente impressionantes 
que entraram em serviço ou foram revelados nos últimos 6 meses?
Inclua drones de combate, sistemas de guerra eletrônica e stealth.
Qual o dado mais absurdo/impressionante de cada um?
Responda em português do Brasil.
```

## Sites-âncora para WebSearch fallback

Usar se Perplexity falhar. Consultar via WebSearch + WebFetch:

| Site | Especialidade | URL |
|---|---|---|
| Aero Magazine | FAB, aviação militar BR | aeromagazine.uol.com.br |
| Defesa Net | Defesa BR e América Latina | defesanet.com.br |
| Aereo.jor.br | Aviação civil e militar BR | aereo.jor.br |
| Flight Global | Internacional, specs técnicas | flightglobal.com |
| The War Zone | EUA, operações recentes, análises | thedrive.com/the-war-zone |
| Breaking Defense | Contratos, novidades DoD | breakingdefense.com |
| Aviation Week | Specs, primeiros voos | aviationweek.com |

## Consulta WebSearch — Termos sugeridos

```
site:defesanet.com.br OR site:aeromagazine.uol.com.br "aviação militar" após:2026-01-01

"FAB" OR "Força Aérea Brasileira" Gripen KC-390 2026

military aviation news [mês atual] new aircraft combat

"first flight" OR "combat debut" military aircraft 2026
```

## Critérios de seleção do tema

Após obter sugestões, evaluate cada uma por:

1. **Fator surpresa** (0-3): o público geral ficaria surpreso?
2. **Autenticidade técnica** (0-3): tem specs verificáveis e reais?
3. **Engajamento potencial** (0-3): tem ângulo emocional ou absurdo técnico?
4. **Novidade** (0-3): não está saturado no perfil?

Score 9-12 = publicar. Score 6-8 = reformular. Score <6 = descartar.
