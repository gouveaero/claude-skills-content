---
name: newsroom-design
description: Princípios de design visual para a capa única do Newsroom. Usar sempre que for renderizar HTML da capa, escolher tipografia, definir tamanho de headline, decidir gradiente da imagem, ou avaliar legibilidade. Versão enxuta do BrandsDecoded design system, focada exclusivamente em capa de notícia (1080×1350px, slide único, foto full-bleed + headline).
---

# Newsroom Design System — Capa Única

Consultar antes de renderizar qualquer capa do Newsroom. Define os princípios visuais que diferenciam uma capa profissional de uma capa amadora.

---

## 1. HIERARQUIA VISUAL — Regra dos 3 Níveis

A capa tem exatamente 3 níveis de leitura:

| Nível | Elemento | Peso | Posição |
|---|---|---|---|
| **1 — Âncora** | Headline em fonte condensada uppercase | Maior | Terço inferior |
| **2 — Identidade** | Badge com @ do cliente | Médio | Acima da headline |
| **3 — Metadata** | Brand bar (Powered by Newsroom · @ · 2026) | Menor | Topo |

**Regra:** Nenhum outro texto na capa. Sem subtítulo, sem data exposta, sem "leia mais", sem badge de tipo. A foto e a headline carregam tudo.

---

## 2. ESPAÇAMENTO — Regra do Terço Inferior

Headline + badge ocupam o **terço inferior** da capa. Os dois terços superiores são da foto.

**Por quê:**
- Sujeito da foto fica visível sem competir com o texto
- Gradiente escuro na base garante contraste sem cobrir a imagem
- O olho vai naturalmente da foto pra headline (de cima pra baixo)

**Posicionamento exato:**
- `.capa-headline-area`: `bottom: 120px; padding: 0 52px;`
- Margem horizontal mínima: 52px de cada lado (safe area)
- Margem inferior mínima: 80px (respiro visual no rodapé)

**Nunca:**
- Centralizar a headline verticalmente
- Posicionar texto sobre o terço superior da foto
- Encostar a headline na borda inferior

---

## 3. TIPOGRAFIA — Escala da Headline

A headline tem 3 tamanhos possíveis. O sistema decide automaticamente baseado no comprimento.

| Tamanho | Quando usar | Limite |
|---|---|---|
| **108px** | Headlines curtas (até 4 linhas) | Padrão |
| **96px** | Headlines médias (4-5 linhas) | Reduzir se 108 estourar |
| **88px** | Headlines longas (5-6 linhas) | **Mínimo absoluto** |

**Se a headline não couber em 88px com 6 linhas:** encurtar a headline mantendo o padrão original (não diminuir mais a fonte).

**Atributos fixos:**
- `font-weight: 900`
- `letter-spacing: -3px` (108px) / `-2.5px` (96px) / `-2px` (88px)
- `line-height: 0.93`
- `text-transform: uppercase`
- `color: #fff`

**Palavra-chave em accent:**
- 1 a 3 palavras-chave em `<em>` com cor `var(--P)`
- Nunca uma frase inteira em accent
- Escolher a palavra que carrega o conceito central da headline

**Exemplos:**
- "A MORTE DO <em>GOSTO PESSOAL</em>: COMO A DOPAMINA NOS TORNOU INDIFERENTES"
- "POR QUE A <em>GEN Z</em> TROCOU O BAR PELO ASFALTO"
- "INVESTIGANDO O <em>NOVO ALGORITMO</em> DO INSTAGRAM EM 2026"

---

## 4. GRADIENTE DA IMAGEM — Garantia de Legibilidade

O gradiente escuro na base da foto não é decorativo. É funcional. Sem ele, headline branca sobre foto clara é ilegível.

**Stops obrigatórios (do topo pra base):**

```css
background: linear-gradient(
  to bottom,
  rgba(0,0,0,0.35) 0%,    /* topo: leve escurecimento */
  rgba(0,0,0,0.08) 25%,   /* respiro: foto aparece */
  rgba(0,0,0,0.15) 40%,
  rgba(0,0,0,0.65) 55%,   /* transição: começa a escurecer */
  rgba(0,0,0,0.92) 75%,   /* texto: contraste forte */
  rgba(0,0,0,0.99) 100%   /* base: quase preto puro */
);
```

**Por que esses stops:**
- 0-25%: escurece levemente o topo (evita logo da marca da foto poluir o brand bar)
- 25-40%: zona limpa onde a foto aparece nítida
- 55-100%: zona do texto, contraste 4.5:1 garantido com texto branco

**Regra de teste:** Pegue a parte mais clara da imagem na zona de texto (75-100% da altura). Se não der pra ler texto branco em cima dela, aumentar o stop final pra `rgba(0,0,0,1)`.

---

## 5. COR — Geração de Paleta

A partir da cor primária do cliente:

```
BRAND_PRIMARY = cor informada (default: #F73600)
BRAND_LIGHT  = primary clareado ~20%
BRAND_DARK   = primary escurecido ~30%
GRADIENT     = linear-gradient(165deg, BRAND_DARK 0%, BRAND_PRIMARY 50%, BRAND_LIGHT 100%)
```

**Onde a cor primária aparece na capa:**
- Palavras-chave em `<em>` dentro da headline
- Accent bar do topo (gradiente)
- Badge dot (círculo com inicial do @)

**Onde a cor primária NUNCA aparece:**
- Como fundo de área de texto
- No brand bar
- Em mais de 3 palavras da headline

---

## 6. IMAGEM — Princípios de Uso

**Requisitos da foto:**
- Mínimo 1080px de largura (idealmente 1080×1350 ou maior)
- Sujeito principal preferencialmente no terço superior
- Sem texto sobreposto (o texto da capa é a headline)
- Boa qualidade fotográfica (evitar prints de tela embaçados)

**Tratamento técnico:**
1. Redimensionar com `convert input.[ext] -resize 1080x1350^ -gravity center -extent 1080x1350 -quality 85 output.jpg`
2. Converter pra base64: `base64 -w0 output.jpg > image.b64`
3. Embutir no HTML como `data:image/jpeg;base64,...`

**Background-position:**
- Default: `center` (centro da imagem)
- Se sujeito estiver no topo: `center top`
- Se sujeito estiver na base: `center 30%` (puxa pro alto pra deixar texto livre)

---

## 7. CHECKLIST VISUAL — Antes de Renderizar

Para cada capa:

1. ✅ Headline em terço inferior, nunca centralizada
2. ✅ Contraste texto/fundo ≥ 4.5:1 (testar zona de texto)
3. ✅ Accent color em 1-3 palavras-chave, nunca em frases
4. ✅ Safe area respeitada (52px horizontal, 80px bottom)
5. ✅ Headline não ultrapassa 6 linhas em 88px
6. ✅ Badge do @ acima da headline, dentro do mesmo bloco
7. ✅ Brand bar no topo, opacidade 0.50, sem competir com a foto
8. ✅ Sem progress bar (capa única, não carrossel)
9. ✅ Sem swipe arrow
10. ✅ Foto em qualidade adequada (sem pixelar em 1080px)

---

## 8. ANTI-PATTERNS VISUAIS — Nunca Fazer

- ❌ Headline centralizada verticalmente no slide
- ❌ Texto sobre área clara da foto sem gradiente forte
- ❌ Mais de uma fonte na headline
- ❌ Headline em sentence case (sempre uppercase)
- ❌ Badge do @ no canto superior direito (fica desconectado da headline)
- ❌ Logo do cliente sobreposto à headline
- ❌ Stickers, emojis, ícones decorativos na capa
- ❌ Borda colorida ao redor de toda a capa
- ❌ Overlay roxo/azul/colorido na foto (overlay é sempre preto)
- ❌ Headline que ocupa metade da capa em fonte gigante (limite: terço inferior)
