# Performance da semana anterior — fonte + fallback

Objetivo: descobrir **o que funcionou na PRÓPRIA conta** na última semana, pra "afiar" (repostar/iterar o que
performou) — sem nunca inventar número (regra 3).

## Opção A (default): Meta MCP — Instagram Insights

Ferramentas (carregar via ToolSearch quando precisar; o schema exato é resolvido em runtime):
`get_instagram_accounts` · `get_instagram_posts` · `get_instagram_account_insights`.

Fluxo:
1. **Resolver a conta:** `get_instagram_accounts` → achar `@zahnspange_home` entre as contas IG business
   acessíveis pelo token conectado.
2. **Puxar a última semana:** `get_instagram_posts` (mídias recentes, ~7 dias) + métricas por post
   (`reach`, `likes`, `saved`, `shares`, `comments`) via `get_instagram_account_insights` / o campo de
   insights do post.
3. **Rankear:** top 2–3 posts por **reach** (alcance) e por **saves+shares** (sinal de valor). Resuma:
   *"top da semana: [formato/ângulo/língua] com X alcance"* — e use no planejamento (repostar o vencedor no
   gap-fill; fazer mais do ângulo/formato que performou).

> Mapa de leitura: **alcance alto** = bom hook/tema (educação de paciente); **saves/shares altos** =
> conteúdo de valor/autoridade (clínico). Bate com a baseline do `09`.

## Fallback gracioso (cold-start / conta nova / sem dado)

Degrade **automaticamente** (sem travar o planejamento) quando:
- a conta **não aparece** em `get_instagram_accounts` (não conectada); OU
- a conta é **nova / tem < 1 semana** de posts; OU
- o MCP da Meta está indisponível na sessão.

Nesses casos: **planeje só com `last30days` (tendências) + a baseline do `09`/`03`** e **declare** na seção de
performance do plano: *"sem dados próprios ainda (cold-start) — semeado por tendências + baseline."* Religue o
"top performers" sozinho assim que houver dado real.

⚠️ **Regra 3:** nunca chute alcance/likes/seguidores. Sem número real → diga que veio da baseline/tendências,
ou consulte `05_CAMPAIGN_LOG.md` / dashboards / `.meta-ads.json` se for mídia paga.

## Opção B/C (se o usuário pedir)

- **B (manual):** o Gustavo cola o print/números dos insights → use direto.
- **C (só tendências):** ignora performance própria; planeja só com `last30days` + baseline. (É o mesmo
  comportamento do fallback, mas escolhido de propósito.)
