# werberecht-hygiene-gate.md — gate de conformidade por slide (pré-export)

> **O que é:** o **portão de conformidade** do `content-machine-saif`. Roda **depois** do HTML estar montado e **antes** de chamar `scripts/export_png.py`. Diferente do `impeccable-baked.md` (que checa estética/UI), este arquivo checa **legalidade e higiene de marca** — as duas coisas que, se vazarem num PNG publicado, criam risco regulatório (Áustria, **Werberecht**) ou queimam o sigilo do software (**SECRET, regra 6**).
>
> **Como rodar:** o operador (ou o agente) percorre **slide a slide** — capa, miolos, CTA. Cada slide passa pela checklist **da sua marca**. Notas do operador em PT-BR; os exemplos client-facing ficam na língua da peça (DE/EN). **Não é opcional e não é "só na legenda":** o texto **queimado na imagem** é o que a autoridade vê — a legenda some no scroll, o PNG fica.
>
> **Regra-mãe (vale para os dois lados):** **BLOQUEIE o export se qualquer caixa abaixo ficar desmarcada.** Reescreva o slide (usar os pares "diga-assim-não-assim"), regenere o asset, e só então rode o Playwright. Sem exceção "depois eu arrumo".

---

## Quando aplicar qual checklist

| Marca | Checklist obrigatória | Frame regulatório |
|---|---|---|
| **Zahnspange Home** (clínica, B2C/paciente) | **(A) Werberecht** + spot-check de (B) se aparecer 3D/ClinCheck | Werberecht austríaco — **não-negociável** (regra 1) |
| **SECRET Align** (software, B2B/dentistas) | **(B) Higiene regra-6** + (A) só se houver claim de resultado clínico | Mais leve, mas **discreto** + sigilo de software |

Em modo **render-default** (a copy vem pronta do orquestrador): rodar mesmo assim — o orquestrador erra, e o PNG é o artefato final. Em modo **standalone-editorial** (o cérebro editorial é o próprio skill): rodar com mais rigor, porque o texto foi gerado por IA e a IA **reincide** nos termos proibidos (o próprio histórico do Saif está cheio deles — ver 09).

---

## (A) ZAHNSPANGE WERBERECHT — checklist por slide

> Fonte: `09_BRAND_VOICE_BASELINE.md` (projeto Saif) (tabela "ele JÁ comete violações") + `04_TRAFFIC_PLAYBOOK.md` §4 (projeto Saif). O Saif **já cometeu** todas essas violações no histórico (~36 promessas, ~33 superlativos, ~9 antes/depois glamour, 3 comparações). **Não replicar** o que já está no perfil dele.

### Checklist literal (marcar por slide)

- [ ] **Sem promessa de resultado.** Nenhum "perfekt / perfektes Lächeln / perfekter Biss / dream smile / garantido / em X semanas você terá". O slide fala de **planejamento e educação**, não de outcome prometido.
- [ ] **Sem superlativo / marktschreierisch.** Nenhum "best / beste / magic / unschlagbar / Nr. 1 / o melhor / sensacional / incrível". Claim, se houver, é **concreto e verificável**.
- [ ] **Sem linguagem "saldão".** Nenhum "Melhor preço / Aktion / Rabatt louco / vagas limitadas / Jetzt zuschlagen / só hoje".
- [ ] **Sem comparação com concorrente.** Nenhum "unlike other brands / besser als DrSmile / melhor que [marca]". Defesa de categoria é **"Facharzt statt DIY-Kit"** (genérica), nunca nomeando rival.
- [ ] **Sem antes/depois sensacionalista de ROSTO.** Se há transformação, ela é **clínica/educacional** ou **ClinCheck/3D digital** ("antes/depois digital"). Nada de glamour-shot de sorriso de paciente real como prova de resultado.
- [ ] **Sem influencer leigo** endossando o dispositivo. Autoridade = o **próprio Saif** (Facharzt, MSc, Präsident der ÖGAO).
- [ ] **Enquadramento = educação.** O slide responde a uma pergunta do paciente ("Wann ist das beste Alter…?", "Warum…?") ou explica um processo — não vende um resultado.
- [ ] **Língua certa por camada (09):** copy de **paciente em alemão (AT)**; copy **clínica/autoridade em inglês**. Não forçar inglês em CTA de paciente nem alemão em caso clínico de peer.
- [ ] **USP de autoridade presente onde couber (regras 4–5):** "Präsident der ÖGAO" / "President of the ÖGAO" — é a USP e **hoje está invisível**; declarar, sem virar hard-sell.
- [ ] **CTA padrão correto:** `Termin buchen · Link in Bio` (ou CTA suave/ausente — 90% dos posts da conta não têm CTA; é conta de marca/educação).

### Pares diga-assim-não-assim (reescreva o slide com a coluna ✅)

| ❌ Proibido (não queimar no PNG) | ✅ Werberecht-safe (use isto) |
|---|---|
| "Perfektes Lächeln in 3 Monaten" / "Tenha dentes perfeitos em 3 meses" | "Mit der digitalen Planung lässt sich dein Ergebnis vorab simulieren." / "Entenda como o planejamento digital prevê seu resultado." |
| "Dream smile" / "perfekter Biss garantiert" | "Zähne schonend und nahezu unsichtbar korrigieren." |
| "Best / beste / magic / unschlagbar" | claim concreto: "durchsichtig · herausnehmbar · vom Facharzt geplant" |
| "Besser als DrSmile" / "unlike other brands" | "Facharzt statt DIY-Kit." (defesa de categoria, sem nomear rival) |
| Antes/depois glamour de rosto real | "ClinCheck 3D: das digitale Vorher-Nachher deiner Behandlung." (modelo 3D, não rosto) |
| "Dentes tortos? Resolvemos!" | "Crooked teeth? Understanding why they're harder to clean." (educação) |
| "Jetzt zuschlagen — begrenzte Plätze!" | "Jetzt Termin buchen und mehr erfahren." |

**Template seguro de voz de paciente (DE) — copiar o tom, não prometer:**
> *"Ein schönes Lächeln muss nicht auffällig beginnen. Mit durchsichtigen Zahnspangen lassen sich Zähne schonend und nahezu unsichtbar korrigieren. Jetzt Termin buchen und mehr erfahren."*
> *(intenção PT-BR: um sorriso bonito não precisa começar de forma chamativa; com alinhadores transparentes dá pra corrigir os dentes de forma suave e quase invisível; agende.)*

### Especificidades visuais do preset Zahnspange (não viram violação, mas o gate confere)
- [ ] Slide de **mito** renderizado como **`✕ cinza #9aa3b2`** vs **`✓ magenta #DF378B`** — o "errado" nunca é um claim contra concorrente, é um equívoco genérico do paciente.
- [ ] Foto real do Saif/clínica recebe o **scrim duotone petróleo** (`linear-gradient(rgba(0,58,92,…))`) — e a foto não vira "before/after" de resultado.
- [ ] **Logo** no topo em slide claro; em slide de foto, logo num **chip branco** pequeno (`https://zahnspangehome.at/wp-content/uploads/2025/12/ZahnspangeHome_NO-BG-1.png`).

> **BLOQUEIO:** se **qualquer** caixa da seção (A) estiver desmarcada neste slide → **não exporte**. Reescreva com a coluna ✅, regenere o asset se a violação for visual, rode o gate de novo.

---

## (B) SECRET — higiene regra-6 (por slide)

> Fonte: CLAUDE.md regra 6 + `09_BRAND_VOICE_BASELINE.md` §SECRET (projeto Saif) + `SECRET_Navigator_Material/Video_guidelines.md`. O objetivo: o software parece **rápido, novo e anônimo**; **ninguém** identifica paciente nem o Saif; **nunca** aparece a plataforma antiga (preta). Tudo isto vale **frame a frame / slide a slide**, inclusive em screenshot dentro do frame de PC.

### Checklist literal (marcar por slide)

- [ ] **Nome do paciente escondido.** Zero nome real, iniciais identificáveis, data de nascimento, nº de prontuário em qualquer screenshot. Borrar/cobrir antes de queimar o PNG.
- [ ] **Nome do Saif escondido.** O perfil/login/autor do plano **não** aparece. (A autoria-Saif vive no lado *clínica*, não no software SECRET.)
- [ ] **Só software/3D NOVOS.** Apenas o **novo** software + os **novos modelos 3D**. **Nunca** a plataforma **antiga (preta)** — nem de relance, nem no fundo, nem num print "histórico".
- [ ] **3D models = raízes à ESQUERDA, plano reto.** A vista 3D mostra as **raízes à esquerda** e o **plano oclusal/horizontal alinhado** (não torto). Se o screenshot está com a orientação errada, recapturar.
- [ ] **"Save & Submit" visível.** Quando o slide mostra a tela de trabalho, o botão **SAVE & SUBMIT** aparece (sinaliza fluxo real e finalizado).
- [ ] **Uploads acelerados / rápidos.** Qualquer barra/etapa de upload ou processamento está **acelerada** — o software **não** pode parecer lento. (Em carrossel estático: mostrar o **estado concluído**, não o spinner no meio.)
- [ ] **Screenshot em FRAME DE COMPUTADOR**, nunca mockup de celular para o software (exceção única: a feature "Send to Patient", onde o celular é proposital).
- [ ] **Discrição B2B.** Sem promessa B2C, sem typo (o histórico tem "BACAUSE!"/"orthodonticexcellece"), sem exclamação/emoji/hype, hashtags ≤5 (vivem na legenda, mas se algo entrar no PNG, vale a mesma régua).
- [ ] **🚫 NUNCA imagem de IA com rosto/dentes/pessoa para SECRET.** Imagem do Magnific neste slide é **abstrata (texturas teal)** ou **screenshot real em frame de PC** — **proibido** Nano Banana gerar face humana, boca, dente ou paciente. Se o asset tem qualquer anatomia humana gerada por IA → **descartar e regenerar** como textura abstrata.

### Especificidades visuais do preset SECRET (o gate confere)
- [ ] Fundo **dark premium-minimal** (ink `#0A1412`), headline **Poppins weight 300** com 1–2 palavras em **teal `#00C8B4`** ou branco (600); muito espaço negativo.
- [ ] **Kicker** uppercase, letter-spaced, teal + **hairline teal de 26px**.
- [ ] **Footer wordmark "SECRET="** (o `=` em teal) + número do slide (ex.: `04 / 06`).
- [ ] No **slide de CTA**: o logo real (`secret-align-remotion/public/secret-logo.png`, wordmark escuro com `=` teal) vai num **chip branco** (porque o slide é escuro). CTA url = **secretalign.com**.

> **BLOQUEIO:** se **qualquer** caixa da seção (B) estiver desmarcada neste slide → **não exporte**. Borre/recubra o identificador, troque o screenshot pela versão nova/rápida/orientada, ou regenere a imagem como textura abstrata. Só então rode o Playwright.

---

## Passe final (antes de chamar `scripts/export_png.py`)

- [ ] **Todos os slides** da peça passaram pela checklist da sua marca (capa, miolos, CTA — nenhum "pulado").
- [ ] Screenshots de software foram inspecionados **em zoom** — texto pequeno na UI também conta (nome de paciente costuma vazar em canto de tela).
- [ ] As imagens do Magnific usadas neste carrossel respeitam a regra híbrida da marca (SECRET = abstrato/screenshot; Zahnspange = foto real polida + scrim, IA só em fundo seguro).
- [ ] **Materiais editáveis salvos** junto (regra editável-materials do skill): HTML por slide + arquivos de imagem Magnific + script `.docx`, em
  `Content_Calendar/<Brand>/Week_<NN>/W<NN>_<V|C|P><n>_<slug>/` no Shared Drive **"Zahnspange Home"** — para que qualquer correção de conformidade futura seja refeita na fonte, não só no PNG.

**Regra única, repetida porque é a que importa:**
> **BLOQUEIE o export se QUALQUER caixa acima ficar desmarcada.** O PNG só sai quando (A) e/ou (B) — conforme a marca — estiverem **100% marcadas**.
