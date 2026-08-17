> **⚠️ 21/07-c (Gustavo): MAGNIFIC é a ÚNICA ferramenta de geração/edição de imagem deste projeto.** Higgsfield proibido p/ criar imagens daqui em diante (exceção pontual 21/07 com OAuth do Magnific expirado, material aproveitado com autorização). Magnific desconectado → pedir ao Gustavo p/ reconectar via /mcp e aguardar.

# Imagens via Magnific (Nano Banana Pro) — Zahnspange Home

> Fork de [image-direction.md](image-direction.md). O provedor de imagem é o **MCP Magnific** (Nano Banana Pro), **não** Higgsfield. As regras 1 (Werberecht) e 5 (perfil pessoal) do `CLAUDE.md` do projeto **vencem qualquer instrução estética**.
>
> **Assinaturas (conferidas no schema real do MCP, jun/2026):** `images_generate` é o ÚNICO que aceita `references[]` (`{type,identifier}`) e suporta `aspectRatio:"4:5"`. **Todas** as tools de edição — `images_relight`, `images_skin_enhancer`, `images_remove_background`, `images_crop`, `images_upscale`, `images_variations` — recebem um **`creationIdentifier`** (string, singular), nunca `references[]`. `images_crop` **não** tem `4:5` (portrait máx = `3:4`). `images_relight` é dirigido por `lights[]` (sem prompt).

---

## 0. TL;DR operacional (decore isto)

| | **Zahnspange Home** (B2C/pacientes) |
|---|---|
| Pode gerar com IA? | Fundos de IA **só** em educação/sazonal "seguros"; foto real é a estrela |
| Rosto / dente / pessoa de IA | **NUNCA** rosto/sorriso de IA — paciente real só vem do Saif |
| Foto real | **antes/depois e clínica vêm do Saif** (consentimento/DSGVO); Magnific só **poli** |
| Tratamento | duotone petrol (`rgba(0,58,92,…)`), logo em chip branco |

**Teto:** ~2–4 imagens por carrossel (custo + carga cognitiva). Capa quase sempre tem imagem/textura; **dados e CTA ficam limpos**. A imagem é gerada **uma vez** e reaproveitada nos 2 idiomas (DE/EN).

---

## 1. Heurística — qual slide leva imagem

Mantém a lógica do pro ("ou nada; não é todo slide que leva foto"):

```
1 Capa       foto real do Saif/clínica polida + duotone petrol ← polir (não IA)
2 Mito 1     LIMPO (✕ cinza / ✓ magenta)                       ← sem imagem
3 Educação   fundo de IA SEGURO (sem pessoa) OU limpo          ← imagem opcional
4 Antes/depois  foto real do Saif (ClinCheck 3D ou caso)       ← foto real, Magnific poli
5 Mito 2 / Tip  LIMPO                                          ← sem imagem
6 CTA        LIMPO ou foto polida + pílula magenta "Termin"    ← sem imagem (default)
```
Regra de ouro: **toda foto de pessoa/sorriso/boca é foto real do Saif** (regra 1 + DSGVO). Magnific entra como **polidor/relight/bg-remove**, nunca como gerador de paciente.

---

## 2. Polir a foto REAL do Saif

A foto **vem do Saif** (antes/depois, clínica, retrato). DSGVO/consentimento é pré-requisito: **antes/depois de paciente só com autorização**; quando em dúvida, prefira **ClinCheck 3D** como "antes/depois digital" (mais seguro e Werberecht-friendly, ver 09 + §4 do playbook). Magnific só **poli** o que já existe.

### 2.1 Subir a foto → `creationIdentifier`
- **Arquivo local** (o caso comum — Saif manda o arquivo): `creations_request_upload({ mimeType:"image/jpeg" })` → faça **PUT dos bytes** na URL presignada (fora do MCP) → `creations_finalize_upload(...)` → `creationIdentifier`.
- **URL pública** (foto já num link): `creations_upload_image({ url:"<url>" })` → `creationIdentifier` em **um passo**.

### 2.2 Polir — sempre `creationIdentifier` (singular), nunca `references[]`
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

### 2.3 Enquadrar em 4:5 (importante)
`images_crop` **não suporta 4:5** (portrait máx = `3:4`). Três caminhos pro 1080×1350:
1. **Padrão:** deixe o `scripts/fetch_image.py --crop smart` fazer o 4:5 (já é etapa do pipeline);
2. recompor sobre fundo novo em 4:5: `images_generate({ prompt:"replace the background with <cena petrol clínica>, keep the person", references:[{type:"image", identifier:<id>}], aspectRatio:"4:5" })` *(único jeito de usar a foto como referência img2img é via `images_generate.references`)*;
3. `images_crop({ creationIdentifier:<id>, aspectRatio:"3:4" })` só se um corte 3:4 já resolver e o `fetch_image` der o ajuste fino.

**O que o polimento PODE fazer:** corrigir luz (relight), neutralizar dominante de cor (skin_enhancer flexible/improve_lighting), suavizar pele com naturalidade, recortar fundo bagunçado (remove_background), recompor em 4:5 (generate+reference), upscale.
**O que NÃO pode (Werberecht + autenticidade):** "embelezar" dentes/sorriso a ponto de virar promessa de resultado; transformar antes/depois clínico em **glamour sensacionalista**; trocar o rosto; gerar um "paciente" novo. Poli, não inventa.

### 2.4 Tratamento visual Zahnspange (na mockup, já travado)
- Foto em duotone petrol via CSS, não via IA: `.zh.photo .img{filter:grayscale(.4)}` + `.zh.photo .scrim{background:linear-gradient(180deg,rgba(0,58,92,.15),rgba(0,58,92,.86))}`.
- Logo real num **chip branco** no canto: `https://zahnspangehome.at/wp-content/uploads/2025/12/ZahnspangeHome_NO-BG-1.png`.
- Selo discreto "[foto real · Magnific]" no canto (`.zh.photo .label`) pra deixar claro na revisão que é foto tratada, não IA.

---

## 3. Fundo de IA **seguro** (só quando não há foto)

Slides de **educação/sazonal** podem levar fundo de IA **desde que sem nenhuma pessoa, boca, dente ou sorriso** (regra 1 + autenticidade). Use `images_generate({ aspectRatio:"4:5" })`:

> `clean medical clinic interior, soft daylight, petrol blue and white palette, calm austrian dental practice mood, shallow depth of field, deep negative space in lower third for text, no people, no faces, no teeth, no mouths, no text, no letters, no logos, 4:5 vertical`

Bons assuntos seguros: interior de clínica, escaneamento/tecnologia (sem boca), motivo sazonal (Wachau, café — ângulo lifestyle), texturas petrol. **Assunto que envolve resultado de tratamento → use foto real do Saif, nunca IA.**

> Werberecht por slide: o fundo não pode sugerir promessa ("sorriso perfeito") nem before/after glamour. Rode o filtro do §4 do playbook **no visual**, não só na legenda.

---

## 4. Recuperação de creations (higiene do MCP)

O MCP Magnific é **assíncrono** e fala por **identificadores**, não por `webUrl`:
- Depois de qualquer `images_*` → **siga o campo `instruction`** da resposta.
- Para pré-visualizar inline (cliente com UI): `creations_show({ identifiers:[…] })`.
- Para obter a **URL final** que vai pro pipeline: `creations_wait({ identifiers:[<id>], timeoutSeconds })` → `creations_get({ creationIdentifier:<id> })` → `url`.
- **Ao encadear** (foto → relight → upscale): passe sempre o **`creationIdentifier`** (ou o `url` do `creations_get`), **nunca o `webUrl`**. `webUrl` é só pra mostrar a humano.
- Saldo antes do 1º lote da sessão: `mcp__magnific__account_balance`. Lote enxuto (~2–4); se baixo, avise e caia pra foto do Saif sem polimento pesado.

---

## 5. Normalizar e embutir (igual ao pro)

Toda imagem entra no HTML como **base64** (nunca `<link>`/URL remota no PNG final). Com a `url` em mãos:

```bash
python3 scripts/fetch_image.py --url "<url do creations_get>" \
  --out W07_C2_<slug>-de/img/slide1.jpg --crop smart --measure-luma --emit-base64
```
- `--crop smart` ajusta pra 4:5 se a geração/recorte não veio exato (é o caminho padrão de 4:5 — ver §2.3).
- `--measure-luma` imprime `LUMA_BAND=<0-255>` (luminância média do terço inferior) → dimensiona o scrim pra garantir **AA ≥ 4.5:1** sob o texto. Scrim **petrol** (a exceção de marca já travada na mockup), nunca um overlay de cor aleatória.
- `--emit-base64` devolve a string pra colar no `background:url(data:image/jpeg;base64,…)`.
- A mesma imagem serve as 2 pastas `-de/` e `-en/` (só o texto do slide muda).

Fontes idem — base64, nunca Google Fonts `<link>`:
```bash
python3 scripts/fonts_to_base64.py    # Lato, latin + latin-ext p/ acentos DE
```

---

## 6. Checklist de imagem pré-export (Zahnspange)

- [ ] Toda foto de pessoa/sorriso/boca é **foto real do Saif** (consentimento/DSGVO); IA só em fundo sem pessoa.
- [ ] Polimento não virou promessa de resultado nem before/after glamour (Werberecht §4).
- [ ] Chamadas de edição usaram `creationIdentifier` (singular); só `images_generate` usa `references[]`/4:5.
- [ ] Teto de imagens respeitado (~2–4); dados e CTA **limpos**; imagem reaproveitada nos 2 idiomas.
- [ ] Scrim dimensionado por `LUMA_BAND` → texto AA ≥ 4.5:1; scrim petrol.
- [ ] Tudo embutido em base64 (imagens + fontes); nada de URL remota no PNG.
- [ ] Originais Magnific + polidos salvos em `images/` da peça.
- [ ] Encadeamento usou `creationIdentifier`/`url`, nunca `webUrl`.
