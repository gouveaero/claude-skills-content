# claude-skills-content

Skills de **produção de conteúdo** para Claude Code: carrosséis de Instagram, vídeos e Reels, planejamento semanal e pesquisa de tendências.

Complementa o [`claude-skills`](https://github.com/gouveaero/claude-skills), que reúne as skills de marketing, CRO, SEO, ads e ops. Os dois repositórios convivem no mesmo diretório e não se sobrepõem.

## Instalação

```bash
git clone https://github.com/gouveaero/claude-skills.git ~/.claude/skills
git clone https://github.com/gouveaero/claude-skills-content.git /tmp/csc
rsync -a --exclude='.git' /tmp/csc/ ~/.claude/skills/ && rm -rf /tmp/csc
```

Cada skill é uma pasta com um `SKILL.md`. O Claude Code carrega sozinho o que estiver em `~/.claude/skills/`.

## As skills

### Carrosséis de Instagram

| Skill | Para que serve |
|---|---|
| `content-machine` | Máquina original de carrosséis. Fundo sólido, alternância claro/escuro, banco de 56 hooks, filtro anti-texto-genérico. 1080×1350. |
| `content-machine-pro` | Versão premium. Imagem de fundo gerada por IA ou buscada na web, paleta derivada da marca, estilos Editorial, Clean, Bold e Minimal, sem marca d'água. Use esta como padrão. |
| `content-machine-clinic` | Fork mono-marca para clínica odontológica B2C na Áustria. Roda um filtro de **Werberecht** (lei de publicidade médica austríaca) slide a slide. Inglês. |
| `content-machine-secret` | Fork mono-marca para software de alinhadores B2B. Interlocutor é o ortodontista, não o paciente. Inglês, premium-minimal. |
| `content-machine-saif` | Roteador **descontinuado**. Mantido só como histórico de como as duas marcas foram separadas em julho de 2026. Não produz nada. |

Os três forks descendem de `content-machine-pro` e herdam o pipeline editorial: briefing, 10 headlines, espinha, validação, texto, imagens, HTML, PNG.

### Vídeo

| Skill | Para que serve |
|---|---|
| `secret-event-video` | Vídeos verticais de 45 a 50 segundos a partir de filmagem de evento, em Remotion. Dois formatos: recap e manifesto. Estilo travado no componente; o conteúdo entra por JSON. |
| `remotion` | Conhecimento de domínio do Remotion: `useCurrentFrame()`, `interpolate()`, easing, estrutura de composição. Base para as demais skills de vídeo. |
| `reels-vhoe` | Pipeline completo de Reels para a Vhoe, marca de roupa que usa aviação como linguagem. Sete fases com pausas humanas: tema, roteiro em 10 blocos, gate de crítica com `roteiro-council`, imagens e clipes pelo MCP do Magnific (Nano Banana Pro e Kling 2.5), narração no ElevenLabs com timestamps e render final em Remotion via `video-editor-remotion`. Entrega `final.mp4` com legendas word-level. Project-scoped: instale em `<Projeto>/.claude/skills/`, não na pasta global. |

### Planejamento e pesquisa

| Skill | Para que serve |
|---|---|
| `semana-saif` | Orquestrador semanal de conteúdo de clínica. Lê calendário, tendências e performance da semana anterior, propõe a semana, apresenta para aprovação humana e só então escreve os documentos. Nunca renderiza. |
| `last30days` | Pesquisa multi-fonte dos últimos 30 dias. Semeia pauta com o que está em alta. Requer Python 3.12+ e chaves de API próprias. |
| `newsroom` | News-jacking visual: transforma notícia em capa de post. |
| `newsroom-pro` | Mesmo fluxo, com geração de imagem de fundo. |
| `instagram-download` | Baixa posts, carrosséis, reels e perfis do Instagram via `gallery-dl`, inclusive em lote a partir de uma lista de URLs. |

## Antes de usar

Algumas skills dependem de contas e caminhos que **você precisa configurar**:

| Variável | Usada por | O que é |
|---|---|---|
| `ZH_BRAND_SOURCES` | `content-machine-clinic` | Pasta do banco de imagens da marca. Sem ela, o script cai no caminho padrão do autor e não encontra nada. |
| `CONTENT_CALENDAR` | `semana-saif` | Pasta do calendário editorial no Drive compartilhado. |
| `ELEVENLABS_API_KEY` | `reels-vhoe` | Chave do ElevenLabs para a narração. Só no ambiente, nunca em arquivo do repositório. |
| `VHOE_MUSICAS` | `reels-vhoe` | Pasta das trilhas de fundo usada na sugestão de música. Alternativa: campo `musicas_dir` em `reels-vhoe/config.local.json` (ignorado pelo git). |
| `VHOE_DIR` | `reels-vhoe` | Raiz do projeto Vhoe, onde ficam `Reels_Feitos/` e `01_BRAND.md`. Só é preciso se a skill não estiver em `<Projeto>/.claude/skills/reels-vhoe/`. |

Defina no seu shell:

```bash
export ZH_BRAND_SOURCES="/caminho/para/Brand_Sources/Zahnspange_Home"
export CONTENT_CALENDAR="/caminho/para/Content_Calendar"
export ELEVENLABS_API_KEY="sk_..."
export VHOE_MUSICAS="/caminho/para/Musicas"
```

`last30days` pede chaves de API próprias e as configura por assistente na primeira execução. `instagram-download` usa os cookies do seu Chrome já logado.

As skills de geração de imagem esperam um MCP de imagem conectado (Magnific, Freepik ou Higgsfield, conforme a skill). Sem ele, o pipeline vai até o HTML e para antes de gerar as imagens.

`reels-vhoe` depende ainda de duas skills do repositório `claude-skills` instaladas em `~/.claude/skills/` (`roteiro-council` e `video-editor-remotion`), do MCP do Magnific, de Node 18+, `ffmpeg` e `python3`. Ela é feita para viver dentro do projeto da marca, porque lê `01_BRAND.md` e `04_CONTENT_PLAYBOOK.md` dois níveis acima e grava tudo em `Reels_Feitos/`.

## Licença e crédito

Código sob MIT, veja [LICENSE](LICENSE). Nem tudo aqui é de minha autoria: leia [ATTRIBUTION.md](ATTRIBUTION.md) antes de redistribuir.

Gustavo Gouvea, consultor de marketing digital.
