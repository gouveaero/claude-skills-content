# Imagens via Magnific (Nano Banana Pro) — SECRET Align

> Fork de [image-direction.md](image-direction.md). O provedor de imagem é o **MCP Magnific** (Nano Banana Pro), **não** Higgsfield. A regra 6 (higiene SECRET) do `CLAUDE.md` do projeto **vence qualquer instrução estética**.
>
> **Assinaturas (conferidas no schema real do MCP, jun/2026):** `images_generate` é o ÚNICO que aceita `references[]` (`{type,identifier}`) e suporta `aspectRatio:"4:5"`. **Todas** as tools de edição — `images_relight`, `images_skin_enhancer`, `images_remove_background`, `images_crop`, `images_upscale`, `images_variations` — recebem um **`creationIdentifier`** (string, singular), nunca `references[]`. `images_crop` **não** tem `4:5` (portrait máx = `3:4`). `images_relight` é dirigido por `lights[]` (sem prompt).

---

## 0. TL;DR operacional (decore isto)

| | **SECRET Align** (B2B/dentistas) |
|---|---|
| Pode gerar com IA? | **Só textura abstrata teal** + screenshot real do software num frame de PC |
| Rosto / dente / pessoa de IA | **NUNCA** (regra 6) |
| Foto real | sem foto de pessoa; só UI do software novo |
| Tratamento | dark premium-minimal, scrim neutro, hairline teal |
| Plataforma antiga (preta) | **JAMAIS** mostrar (regra 6) |

**Teto:** ~2–4 imagens por carrossel (custo + carga cognitiva). Capa quase sempre tem imagem/textura; **dados e CTA ficam limpos**.

---

## 1. Heurística — qual slide leva imagem

Mantém a lógica do pro ("ou nada; não é todo slide que leva foto"):

```
1 Capa       textura teal abstrata (images_generate, 4:5)        ← imagem
2 Hook       LIMPO (dark sólido + headline weight 300)           ← sem imagem
3 Contexto   LIMPO ou textura sutil
4 Software   screenshot real do app num frame de PC (.scr)       ← screenshot, não IA
5 Mecanismo  textura teal abstrata (images_generate, 4:5)        ← imagem
6 CTA        LIMPO + chip branco com a logo real                 ← sem imagem
```
SECRET é **premium-minimal**: a maioria dos slides é tipográfica pura sobre `#0A1412`. Imagem só onde reforça (capa, mecanismo) ou onde **prova** (o frame de software). Muito negative space é feature, não bug.

---

## 2. Gerar textura teal abstrata (`images_generate`)

A capa e o slide de mecanismo levam **textura abstrata** (nada de rosto/dente/pessoa). Casa com os feature videos já renderizados (engine teal `#00C8B4`, ink `#0A1412`).

```
mcp__magnific__images_generate({
  prompt: "<prompt-mãe abaixo>",
  aspectRatio: "4:5",            // 1080×1350 nativo — images_generate ACEITA 4:5 (sem crop depois)
  count: 2,                       // opcional: 2 candidatos pra escolher
})
→ retorna creation(s); guarde o creationIdentifier de cada uma
mcp__magnific__creations_wait({ identifiers:[creationIdentifier], timeoutSeconds:25 })
mcp__magnific__creations_get({ creationIdentifier })  → { url }   // URL final pro fetch_image
```

**Prompt-mãe SECRET (abstrato, sem pessoa):**
> `abstract dark teal engineered texture, near-black background with a deep teal glow in the upper right, subtle diagonal topographic contour lines, premium minimal, soft volumetric light, large dark negative space in the lower two thirds for text overlay, no text, no letters, no numbers, no characters, no symbols, no logos, no watermark, no people, no faces, no teeth, no medical imagery, 4:5 vertical`

> ⚠️ **NUNCA ponha código hex (`#00C8B4`, `#0A1412`) no prompt** — o modelo de imagem **renderiza o código como texto visível** na textura (bug observado: saiu "#00C8B4" escrito no slide). Descreva a cor em **palavras** ("deep teal", "near-black") e sempre inclua `no text, no letters, no numbers, no characters`. Confira o resultado: textura com qualquer glifo/letra → **descartar e regerar**.

Variações de prompt úteis: `fine teal mesh / wireframe lattice on black`, `soft teal bokeh particles`, `brushed dark metal with teal edge light`. **Sempre** terminar com o bloco `no text, no people, no faces, no teeth`.

> ⚠️ Guard regra 6: se o prompt escorregar pra qualquer coisa figurativa (boca, alinhador, modelo 3D realista, médico), **descarte e regere abstrato**. SECRET = textura + UI, ponto.

### Coesão entre os 2 slides com textura
Pra os dois slides lerem como uma marca só, prefira **re-gerar com o mesmo prompt-mãe** (mesma família visual). Se quiser derivar da capa, use `images_variations` em **modo `custom`** (o default `angles` é pra pessoas/objetos e não serve pra textura):
```
mcp__magnific__images_variations({
  creationIdentifier: <capa_creationIdentifier>,
  variationMode: "custom",
  prompt: "same abstract teal engineered texture, slight variation, no people no text",
  aspectRatio: "4:5",
}) → novas creations
```

---

## 3. Screenshot do software no frame de PC (regra 6)

O slide "In the software" **não é imagem de IA** — é screenshot real do **SECRET Navigator novo** (3D models novos), colocado dentro do componente `.scr` (moldura de computador) já no HTML. **Nunca** a plataforma preta antiga; uploads na tela parecem **rápidos** (regra 6); **esconder nome do paciente e do Saif**.

Pipeline:
1. Saif/acesso fornece o screenshot real (ver `Tool_Access.md` em `SECRET_Navigator_Material/`). **Não gerar UI de software com IA** — pode inventar a plataforma errada.
2. Subir a captura (`creations_upload_image`/`request_upload`) e limpar:
   - recortar a tela útil: `images_crop({ creationIdentifier:<id>, aspectRatio:"16:9" })` *(enums: 1:1,16:9,9:16,4:3,3:4,3:2,2:3,21:9 — **sem 4:5**; a screenshot vive dentro do frame `.scr`, então 16:9/3:2 serve)*;
   - nitidez se precisar: `images_upscale({ creationIdentifier:<id>, scale:"2x" })`.
3. Embutir como `background` do `.scr .ui` ou como `<img>` dentro da moldura; ou usar a moldura CSS placeholder da mockup quando não houver captura aprovada ainda.

Se faltar screenshot aprovado, use o **placeholder vetorial** da mockup (`.scr` com `.tooth`/`.lines`/`SAVE & SUBMIT`) — é seguro e on-brand. **Nunca** preencher o frame com um "app" gerado por IA.

---

## 4. Recuperação de creations (higiene do MCP)

O MCP Magnific é **assíncrono** e fala por **identificadores**, não por `webUrl`:
- Depois de qualquer `images_*` → **siga o campo `instruction`** da resposta.
- Para pré-visualizar inline (cliente com UI): `creations_show({ identifiers:[…] })`.
- Para obter a **URL final** que vai pro pipeline: `creations_wait({ identifiers:[<id>], timeoutSeconds })` → `creations_get({ creationIdentifier:<id> })` → `url`.
- **Ao encadear** (capa → variação): passe sempre o **`creationIdentifier`** (ou o `url` do `creations_get`), **nunca o `webUrl`**. `webUrl` é só pra mostrar a humano.
- Saldo antes do 1º lote da sessão: `mcp__magnific__account_balance`. Lote enxuto (~2–4); se baixo, avise e caia pra screenshot real.

---

## 5. Normalizar e embutir (igual ao pro)

Toda imagem entra no HTML como **base64** (nunca `<link>`/URL remota no PNG final). Com a `url` em mãos:

```bash
python3 scripts/fetch_image.py --url "<url do creations_get>" \
  --out W07_C2_<slug>/img/slide1.jpg --crop smart --measure-luma --emit-base64
```
- `--crop smart` ajusta pra 4:5 se a geração/recorte não veio exato.
- `--measure-luma` imprime `LUMA_BAND=<0-255>` (luminância média do terço inferior) → dimensiona o scrim pra garantir **AA ≥ 4.5:1** sob o texto. Scrim **sempre neutro/escuro**.
- `--emit-base64` devolve a string pra colar no `background:url(data:image/jpeg;base64,…)`.

Fontes idem — base64, nunca Google Fonts `<link>`:
```bash
python3 scripts/fonts_to_base64.py    # Poppins, latin + latin-ext
```

---

## 6. Checklist de imagem pré-export (SECRET)

- [ ] Zero rosto/dente/pessoa de IA; só textura abstrata + screenshot real do app novo (regra 6).
- [ ] Plataforma antiga (preta) **não aparece** em lugar nenhum; nomes (paciente + Saif) escondidos.
- [ ] Chamadas de edição usaram `creationIdentifier` (singular); só `images_generate` usa `references[]`/4:5.
- [ ] Teto de imagens respeitado (~2–4); dados e CTA **limpos**.
- [ ] Scrim dimensionado por `LUMA_BAND` → texto AA ≥ 4.5:1; scrim neutro/escuro.
- [ ] Tudo embutido em base64 (imagens + fontes); nada de URL remota no PNG.
- [ ] Originais Magnific + polidos salvos em `images/` da peça.
- [ ] Encadeamento usou `creationIdentifier`/`url`, nunca `webUrl`.
