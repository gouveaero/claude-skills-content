# semana-saif — processo detalhado

Passo a passo da skill. O **gate de aprovação no chat** (§5) é não-negociável: nada é gravado antes do "aprovado".

---

## 1. Montar o BRIEF (a skill é dirigível)

Combine, nesta ordem de prioridade:

1. **Direção do usuário** (manda). Ex.: "essa semana foca em antes/depois", "temos footage novo pra editar",
   "menos carrossel, mais reel". Sem direção → rumo travado "continuar + afiar". (Pedido SECRET → workspace
   `Secret_Align/`, fora desta skill.)
2. **Material bruto disponível.** Pergunte: *"O que você já tem pra editar esta semana (footage, antes/depois,
   evento)?"* Se houver uma pasta, **escaneie** (`ls`/`find` por nomes+contagem) e **planeje peças em cima
   dela** — ex.: pasta de evento → `V_event-recap` (reel) + `C_event-highlights` (photo-dump). Cite os
   arquivos reais no plano.
3. **Estado + pesquisa.**
   - **Content_Calendar:** liste as semanas/peças já produzidas (ângulos usados) pra **não repetir**.
   - **Tendências:** rode a skill `last30days` (vídeo dentista/ortho/aligner) pra semear a clínica.
   - **Performance:** ver `performance-source.md`.

## 2. Ler o estado (Content_Calendar)

```bash
CC="${CONTENT_CALENDAR:-$HOME/Library/CloudStorage/GoogleDrive-gvsg.gouvea@gmail.com/Shared drives/Zahnspange Home/Content_Calendar}"
find "$CC" -maxdepth 3 -name "_WEEK_PLAN.md"      # semanas existentes
find "$CC" -maxdepth 3 -type d -name "W*"          # peças já produzidas (ângulos usados)
```
Guarda-chuva = `Content_Calendar/` (sem nível `Saif_Content`). Marca desta skill: `Zahnspange_Home`
(a pasta `SECRET_Align/` do Drive é gerida pelo workspace `Secret_Align/`).

## 3. Planejar a Week

- **Cadência:** 2 vídeos + 3 carrosséis (DURA — template §9 do `08_CONTENT_OPS.md`).
- **⚠️ Diversidade de tema por peça (Gustavo 11/07):** as 5 peças da semana **não podem repetir tema** entre si — em especial **o vídeo/reel não pode cobrir o mesmo assunto de um carrossel** (ex.: carrossel "idade certa" + reel "am I too old" = redundante, Saif/Gustavo reclamam). Cada peça = ângulo distinto. **Reels da clínica devem mirar VIRAL** (curiosity-gap / medo relatável / "o erro que…" / mito / reframe contrarian), não só reforçar o carrossel. Mapear os temas dos 3 carrosséis primeiro, depois escolher 2 temas de vídeo que preencham lacunas.
- **Voz e regras (English-only):**
  - Educação de paciente acessível (alcance) + autoridade clínica; inglês SIMPLES, sem idiom. **Werberecht
    por peça** (tabela do 09/§4 do playbook: sem `perfekt/dream/best/magic/unschlagbar`, sem comparação — nem
    implícita —, antes/depois só ClinCheck/educacional). **Autoridade = Fachzahnarzt für KFO, nunca o cargo ÖGAO**
    (regra 4). CTA em inglês `Book a consultation · Link in bio`.
  - **Perfil pessoal > clínica** no ângulo de autoridade (regra 5).
- **Cada peça no plano:** hook (linha 1) · arquétipo/ângulo · **legenda final em inglês (só o texto — regra 7)**
  · **footage a pedir ao Saif**. Sem em-dash; sem linha de intenção PT-BR.
- **Naming:** `W<NN>_<V|C|P><n>_<slug>` (V vídeo · C carrossel · P foto; numeração por tipo).
- **Gap-fill:** repost de vencedor do `_Reposts/` pros dias vazios.

## 4. (Reaproveitar o que já existe)

Se o brief trouxe material (evento etc.), **case as peças com os arquivos**: ex. "V1 = reel do evento (editar
de `<pasta>/clip_03.mp4`)". Peças que dependem de footage que **ainda não chegou** entram como **pendentes**
com o pedido explícito ao Saif.

## 5. GATE — apresentar no chat (OBRIGATÓRIO)

Mande **o texto do plano inteiro no chat** (não em arquivo): por conta, as 5 peças (hook/ângulo/legenda em
inglês/footage), o gap-fill, os pedidos de footage e os open items. Termine com:
> *"Aprova assim, ou quer editar alguma peça? Só gravo os arquivos (MD + .docx) depois do teu OK."*

**NÃO gravar nada ainda.** Se o usuário pedir edições, ajuste e **reapresente** no chat. Repita até "aprovado".

## 6. Pós-aprovação — LOCAL (editável) + Drive (só FINAIS)

**Editável no LOCAL** `🚀_Projects/Saif/Content_Production/Week_<NN>_<MonDD>/`:
1. `_plan/Zahnspange_Home___WEEK_PLAN.md` (template §9 preenchido, **em inglês**) + `_plan/Zahnspange_Home___FOOTAGE_REQUEST.md`
   (footage por peça + **cota de antes/depois**, default 2 — ver SKILL §4).
2. **1 pasta por peça** `Zahnspange_Home/W<NN>_.../` com `SCRIPT.md` (**em inglês**; só o texto, regra 7; sem DE, sem
   linha PT) **e** `<slug>.docx` (`pandoc SCRIPT.md -f markdown-smart -o <slug>.docx`).
   - Carrossel = **1 pasta** `W<NN>_C<n>_<slug>/` (sem par `-de`/`-en`); vídeo = 1 pasta com a legenda em inglês.

**Finais no DRIVE** `Content_Calendar/Zahnspange_Home/Week_<NN>_<MonDD>/`:
3. **`_WEEK_PLAN.docx`** = `pandoc _WEEK_PLAN.md -f markdown-smart -o _WEEK_PLAN.docx` (ver §DOCX).
4. **`_SCRIPTS.docx`** = consolidando os `SCRIPT.md` das peças, **gerado a partir do build** (um slide por
   bloco, tudo rotulado — `make_scripts_doc.py`). É o "documento de roteiros".
5. `Carousels/<piece>/NN.png` + `Videos/<piece>.mp4` entram na produção (passo separado).

A produção dos PNGs (→ Drive) é separada (`content-machine-clinic`). Mapa local: `Content_Production/_README.md`.

## §DOCX — gerar o planejamento e os roteiros (MD → DOCX)

Entrega em **DOCX** (mudança jul/2026 — antes era PDF via Chrome `--print-to-pdf`). `pandoc` direto: sem HTML
intermediário, sem Chrome, sem o hang do GCM. Docs do Saif em **inglês**; use `-f markdown-smart` (sem
auto-converter `--`→em-dash) e **não escreva em-dash** no texto-fonte. Escreva o `.docx` local e `cp` pro Drive.

```bash
L="<.../Content_Production/Week_NN_MonDD>"                 # local editável (My Drive)
D="<.../Content_Calendar/<Brand>/Week_NN_MonDD>"          # Drive final (Shared drive)
pandoc "$L/_plan/<Brand>___WEEK_PLAN.md" -f markdown-smart -o "$L/_plan/_WEEK_PLAN.docx" && cp "$L/_plan/_WEEK_PLAN.docx" "$D/_WEEK_PLAN.docx"
pandoc "$L/_drafts/<Brand>___SCRIPTS.md"  -f markdown-smart -o "$L/_drafts/_SCRIPTS.docx"  && cp "$L/_drafts/_SCRIPTS.docx"  "$D/_SCRIPTS.docx"
# caption por peça (só o texto publicável, regra 7): extrair a seção "Publish copy (EN)" do SCRIPT.md → pandoc -o <slug>.docx
```
*(Sem estilo/CSS/Chrome. O DOCX herda o template Word padrão do pandoc, que o Saif abre direto. Se quiser um
tema, gere um `reference.docx` uma vez e passe `--reference-doc`.)*
