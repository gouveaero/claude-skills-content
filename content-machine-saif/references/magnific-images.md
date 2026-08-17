# Imagens via Magnific (Nano Banana Pro) — sourcing por marca

> Fork de [image-direction.md](image-direction.md). Aqui o provedor de imagem é o **MCP Magnific** (Nano Banana Pro), **não** Higgsfield. As duas marcas têm regras de imagem **opostas** — leia a marca certa antes de gerar. As regras 6 (higiene SECRET), 1 (Werberecht) e 5 (perfil pessoal) do `CLAUDE.md` do projeto **vencem qualquer instrução estética**.
>
> **Assinaturas (conferidas no schema real do MCP, jun/2026):** `images_generate` é o ÚNICO que aceita `references[]` (`{type,identifier}`) e suporta `aspectRatio:"4:5"`. **Todas** as tools de edição — `images_relight`, `images_skin_enhancer`, `images_remove_background`, `images_crop`, `images_upscale`, `images_variations` — recebem um **`creationIdentifier`** (string, singular), nunca `references[]`. `images_crop` **não** tem `4:5` (portrait máx = `3:4`). `images_relight` é dirigido por `lights[]` (sem prompt).

---

## 0. TL;DR operacional (decore isto)

| | **SECRET Align** (B2B/dentistas) | **Zahnspange Home** (B2C/pacientes) |
|---|---|---|
| Pode gerar com IA? | **Só textura abstrata teal** + screenshot real do software num frame de PC | Fundos de IA **só** em educação/sazonal "seguros"; foto real é a estrela |
| Rosto / dente / pessoa de IA | **NUNCA** (regra 6) | **NUNCA** rosto/sorriso de IA — paciente real só vem do Saif |
| Foto real | sem foto de pessoa; só UI do software novo | **antes/depois e clínica vêm do Saif** (consentimento/DSGVO); Magnific só **poli** |
| Tratamento | dark premium-minimal, scrim neutro, hairline teal | duotone petrol (`rgba(0,58,92,…)`), logo em chip branco |
| Plataforma antiga (preta) | **JAMAIS** mostrar (regra 6) | n/a |

**Teto:** ~2–4 imagens por carrossel (custo + carga cognitiva). Capa quase sempre tem imagem/textura; **dados e CTA ficam limpos**.

---

## 1. Heurística adaptada — qual slide leva imagem (por marca)

Mantém a lógica do pro ("ou nada; não é todo slide que leva foto"), mas **por marca**:

### SECRET (carrossel de 6 — sequência da mockup travada)
```
1 Capa       textura teal abstrata (images_generate, 4:5)        ← imagem
2 Hook       LIMPO (dark sólido + headline weight 300)           ← sem imagem
3 Contexto   LIMPO ou textura sutil
4 Software   screenshot real do app num frame de PC (.scr)       ← screenshot, não IA
5 Mecanismo  textura teal abstrata (images_generate, 4:5)        ← imagem
6 CTA        LIMPO + chip branco com a logo real                 ← sem imagem
```
SECRET é **premium-minimal**: a maioria dos slides é tipográfica pura sobre `#0A1412`. Imagem só onde reforça (capa, mecanismo) ou onde **prova** (o frame de software). Muito negative space é feature, não bug.

### Zahnspange (carrossel de 6)
```
1 Capa       foto real do Saif/clínica polida + duotone petrol ← polir (não IA)
2 Mito 1     LIMPO (✕ cinza / ✓ magenta)                       ← sem imagem
3 Educação   fundo de IA SEGURO (sem pessoa) OU limpo          ← imagem opcional
4 Antes/depois  foto real do Saif (ClinCheck 3D ou caso)       ← foto real, Magnific poli
5 Mito 2 / Tip  LIMPO                                          ← sem imagem
6 CTA        LIMPO ou foto polida + pílula magenta "Termin"    ← sem imagem (default)
```
Regra de ouro Zahnspange: **toda foto de pessoa/sorriso/boca é foto real do Saif** (regra 1 + DSGVO). Magnific entra como **polidor/relight/bg-remove**, nunca como gerador de paciente.

---

## 2. SECRET — gerar textura teal abstrata (`images_generate`)

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

> ⚠️ **NUNCA ponha código hex (`#00C8B4`, `#0A1412`) no prompt** — o modelo de imagem **renderiza o código como texto visível** na textura (bug observado na 1ª geração: saiu "#00C8B4" escrito no slide). Descreva a cor em **palavras** ("deep teal", "near-black") e sempre inclua `no text, no letters, no numbers, no characters`. Confira o resultado: textura com qualquer glifo/letra → **descartar e regerar**.

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

## 3. SECRET — screenshot do software no frame de PC (regra 6)

O slide "In the software" **não é imagem de IA** — é screenshot real do **SECRET Navigator novo** (3D models novos), colocado dentro do componente `.scr` (moldura de computador) já no HTML. **Nunca** a plataforma preta antiga; uploads na tela parecem **rápidos** (regra 6); **esconder nome do paciente e do Saif**.

Pipeline:
1. Saif/acesso fornece o screenshot real (ver `Tool_Access.md` em `SECRET_Navigator_Material/`). **Não gerar UI de software com IA** — pode inventar a plataforma errada.
2. Subir a captura (§4.1 — `creations_upload_image`/`request_upload`) e limpar:
   - recortar a tela útil: `images_crop({ creationIdentifier:<id>, aspectRatio:"16:9" })` *(enums: 1:1,16:9,9:16,4:3,3:4,3:2,2:3,21:9 — **sem 4:5**; a screenshot vive dentro do frame `.scr`, então 16:9/3:2 serve)*;
   - nitidez se precisar: `images_upscale({ creationIdentifier:<id>, scale:"2x" })`.
3. Embutir como `background` do `.scr .ui` ou como `<img>` dentro da moldura; ou usar a moldura CSS placeholder da mockup quando não houver captura aprovada ainda.

Se faltar screenshot aprovado, use o **placeholder vetorial** da mockup (`.scr` com `.tooth`/`.lines`/`SAVE & SUBMIT`) — é seguro e on-brand. **Nunca** preencher o frame com um "app" gerado por IA.

---

## 4. Zahnspange — polir a foto REAL do Saif

A foto **vem do Saif** (antes/depois, clínica, retrato). DSGVO/consentimento é pré-requisito: **antes/depois de paciente só com autorização**; quando em dúvida, prefira **ClinCheck 3D** como "antes/depois digital" (mais seguro e Werberecht-friendly, ver 09 + §4 do playbook). Magnific só **poli** o que já existe.

### 4.1 Subir a foto → `creationIdentifier`
- **Arquivo local** (o caso comum — Saif manda o arquivo): `creations_request_upload({ mimeType:"image/jpeg" })` → faça **PUT dos bytes** na URL presignada (fora do MCP) → `creations_finalize_upload(...)` → `creationIdentifier`.
- **URL pública** (foto já num link): `creations_upload_image({ url:"<url>" })` → `creationIdentifier` em **um passo**.

### 4.2 Polir — sempre `creationIdentifier` (singular), nunca `references[]`
```
mcp__magnific__images_skin_enhancer({ creationIdentifier:<id>, version:"faithful" })
//   ↑ pele/retrato natural preservando identidade. p/ neutralizar luz/tom: version:"flexible", optimizedFor:"improve_lighting"

mcp__magnific__images_relight({ creationIdentifier:<id>, lights:[{ azimuth:45, elevation:45, intensity:5 }], resolution:"2k" })
//   ↑ luz clínica suave. relight é por lights[] (azimuth ∈ -135..180, elevation ∈ -90..90, intensity 1-10) — NÃO tem prompt

mcp__magnific__images_remove_background({ creationIdentifier:<id> })
//   ↑ recorte (PNG transparente) p/ compor sobre o fundo petrol

mcp__magnific__images_upscale({ creationIdentifier:<id>, scale:"2x" })   // nitidez final
```
Sempre `creations_wait({ identifiers:[<id>] })` → `creations_get({ creationIdentifier:<id> })` → `url` antes de mandar pro `fetch_image.py`.

### 4.3 Enquadrar em 4:5 (importante)
`images_crop` **não suporta 4:5** (portrait máx = `3:4`). Três caminhos pro 1080×1350:
1. **Padrão:** deixe o `scripts/fetch_image.py --crop smart` fazer o 4:5 (já é etapa do pipeline);
2. recompor sobre fundo novo em 4:5: `images_generate({ prompt:"replace the background with <cena petrol clínica>, keep the person", references:[{type:"image", identifier:<id>}], aspectRatio:"4:5" })` *(único jeito de usar a foto como referência img2img é via `images_generate.references`)*;
3. `images_crop({ creationIdentifier:<id>, aspectRatio:"3:4" })` só se um corte 3:4 já resolver e o `fetch_image` der o ajuste fino.

**O que o polimento PODE fazer:** corrigir luz (relight), neutralizar dominante de cor (skin_enhancer flexible/improve_lighting), suavizar pele com naturalidade, recortar fundo bagunçado (remove_background), recompor em 4:5 (generate+reference), upscale.
**O que NÃO pode (Werberecht + autenticidade):** "embelezar" dentes/sorriso a ponto de virar promessa de resultado; transformar antes/depois clínico em **glamour sensacionalista**; trocar o rosto; gerar um "paciente" novo. Poli, não inventa.

### 4.4 Tratamento visual Zahnspange (na mockup, já travado)
- Foto em duotone petrol via CSS, não via IA: `.zh.photo .img{filter:grayscale(.4)}` + `.zh.photo .scrim{background:linear-gradient(180deg,rgba(0,58,92,.15),rgba(0,58,92,.86))}`.
- Logo real num **chip branco** no canto: `https://zahnspangehome.at/wp-content/uploads/2025/12/ZahnspangeHome_NO-BG-1.png`.
- Selo discreto "[foto real · Magnific]" no canto (`.zh.photo .label`) pra deixar claro na revisão que é foto tratada, não IA.

---

## 5. Zahnspange — fundo de IA **seguro** (só quando não há foto)

Slides de **educação/sazonal** podem levar fundo de IA **desde que sem nenhuma pessoa, boca, dente ou sorriso** (regra 1 + autenticidade). Use `images_generate({ aspectRatio:"4:5" })`:

> `clean medical clinic interior, soft daylight, petrol blue and white palette, calm austrian dental practice mood, shallow depth of field, deep negative space in lower third for text, no people, no faces, no teeth, no mouths, no text, no letters, no logos, 4:5 vertical`

Bons assuntos seguros: interior de clínica, escaneamento/tecnologia (sem boca), motivo sazonal (Wachau, café — ângulo lifestyle), texturas petrol. **Assunto que envolve resultado de tratamento → use foto real do Saif, nunca IA.**

> Werberecht por slide: o fundo não pode sugerir promessa ("sorriso perfeito") nem before/after glamour. Rode o filtro do §4 do playbook **no visual**, não só na legenda.

---

## 6. Recuperação de creations (higiene do MCP)

O MCP Magnific é **assíncrono** e fala por **identificadores**, não por `webUrl`:
- Depois de qualquer `images_*` → **siga o campo `instruction`** da resposta.
- Para pré-visualizar inline (cliente com UI): `creations_show({ identifiers:[…] })`.
- Para obter a **URL final** que vai pro pipeline: `creations_wait({ identifiers:[<id>], timeoutSeconds })` → `creations_get({ creationIdentifier:<id> })` → `url`.
- **Ao encadear** (capa → variação, ou foto → relight → upscale): passe sempre o **`creationIdentifier`** (ou o `url` do `creations_get`), **nunca o `webUrl`**. `webUrl` é só pra mostrar a humano.
- Saldo antes do 1º lote da sessão: `mcp__magnific__account_balance`. Lote enxuto (~2–4); se baixo, avise e caia pra screenshot real (SECRET) / foto do Saif (Zahnspange).

---

## 7. Normalizar e embutir (igual ao pro)

Toda imagem entra no HTML como **base64** (nunca `<link>`/URL remota no PNG final). Com a `url` em mãos:

```bash
python3 scripts/fetch_image.py --url "<url do creations_get>" \
  --out W07_C2_<slug>/img/slide1.jpg --crop smart --measure-luma --emit-base64
```
- `--crop smart` ajusta pra 4:5 se a geração/recorte não veio exato (é o caminho padrão de 4:5 — ver §4.3).
- `--measure-luma` imprime `LUMA_BAND=<0-255>` (luminância média do terço inferior) → dimensiona o scrim pra garantir **AA ≥ 4.5:1** sob o texto. Scrim **sempre neutro/escuro** (SECRET) ou **petrol** (Zahnspange é a exceção de marca já travada na mockup), nunca um overlay de cor aleatória.
- `--emit-base64` devolve a string pra colar no `background:url(data:image/jpeg;base64,…)`.

Fontes idem — base64, nunca Google Fonts `<link>`:
```bash
python3 scripts/fonts_to_base64.py    # Poppins (SECRET) + Lato (Zahnspange), latin + latin-ext p/ acentos DE
```

---

## 8. Padrão de materiais editáveis (skill-wide)

Toda imagem gerada/polida é **fonte editável** e é salva junto da peça. Estrutura de saída (Shared Drive "Zahnspange Home"):
```
Content_Calendar/<Brand>/Week_<NN>/W<NN>_<V|C|P><n>_<slug>/
  ├─ <slug>.html               # HTML por slide (1080×1350)
  ├─ img/                       # arquivos Magnific (originais + polidos)
  ├─ <slug>_script.docx         # roteiro/legenda
  └─ <slug>_p<n>.png            # PNGs exportados (Playwright)
```
Guardar **o arquivo Magnific original E o polido** (img2img), não só o PNG final — o operador precisa reabrir e reajustar luz/crop sem regerar do zero.

---

## 9. Checklist de imagem pré-export

- [ ] **SECRET:** zero rosto/dente/pessoa de IA; só textura abstrata + screenshot real do app novo (regra 6).
- [ ] **SECRET:** plataforma antiga (preta) **não aparece** em lugar nenhum; nomes (paciente + Saif) escondidos.
- [ ] **Zahnspange:** toda foto de pessoa/sorriso/boca é **foto real do Saif** (consentimento/DSGVO); IA só em fundo sem pessoa.
- [ ] **Zahnspange:** polimento não virou promessa de resultado nem before/after glamour (Werberecht §4).
- [ ] Chamadas de edição usaram `creationIdentifier` (singular); só `images_generate` usa `references[]`/4:5.
- [ ] Teto de imagens respeitado (~2–4); dados e CTA **limpos**.
- [ ] Scrim dimensionado por `LUMA_BAND` → texto AA ≥ 4.5:1; scrim neutro (SECRET) / petrol (Zahnspange).
- [ ] Tudo embutido em base64 (imagens + fontes); nada de URL remota no PNG.
- [ ] Originais Magnific + polidos salvos em `img/` da peça.
- [ ] Encadeamento usou `creationIdentifier`/`url`, nunca `webUrl`.
