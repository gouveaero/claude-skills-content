# Direção de Imagem — capa do Newsroom Pro

A capa é UMA imagem full-bleed. Diferente do original (que exigia upload), o Pro **gera ou busca** o hero quando o usuário não tem foto. A skill decide deliberadamente a fonte.

## Heurística (1 imagem)
- **Usuário mandou foto** → usar (caminho de arquivo).
- **Sem foto + assunto real concreto** (pessoa, marca, produto, local da notícia) → **buscar** (Magnific `stock_search`→`stock_download`, ou Unsplash).
- **Sem foto + conceito/abstrato** → **gerar com Higgsfield** (padrão), imagem única e contextual.

## Fluxo Higgsfield (padrão p/ gerar)
```
balance                                   # ciente do saldo
generate_image({ params:{ model:"recraft-v4-1",
  prompt:"<assunto da notícia>, editorial photography, cinematic lighting, muted <cor da marca>, deep dark negative space in lower third for headline, no text, no logos, no watermark, 4:5 vertical",
  aspect_ratio:"4:5", model_type:"standard", colors:["<hex marca>","<accent>","<fundo>"], count:1 }})
  → results[0].id → job_status({jobId, sync:true}) → results.rawUrl
```
Depois: `python3 scripts/fetch_image.py --source url --url "<rawUrl>" --out capa.jpg --crop smart --measure-luma --emit-base64`.

## Fluxo web/stock
- Magnific: `stock_search({query, content_type:"photo", per_page:10})` → `stock_download({id})` → `{download_url}` → `fetch_image.py`.
- Unsplash (precisa `UNSPLASH_ACCESS_KEY`): `fetch_image.py --source unsplash --query "..."`.

## Notas
- Sujeito no terço superior, rodapé escuro pro headline (o prompt já pede negative space embaixo).
- Recraft faz 4:5 nativo (sem crop). Tratamento duotone opcional p/ coesão com a marca (design.md).
- `--measure-luma` → `SCRIM_SUGGEST` dimensiona o scrim pra garantir AA no headline.
