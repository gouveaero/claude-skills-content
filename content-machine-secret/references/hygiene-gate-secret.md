# hygiene-gate-secret.md — gate de higiene regra-6 por slide (pré-export)

> **O que é:** o **portão de conformidade** do `content-machine-secret`. Roda **depois** do HTML estar montado e **antes** de chamar `scripts/export_png.py`. Diferente do `impeccable-baked.md` (que checa estética/UI), este arquivo checa **higiene de marca / sigilo do software** — o que, se vazar num PNG publicado, queima o sigilo do SECRET (**regra 6**).
>
> **Como rodar:** percorra **slide a slide** — capa, miolos, CTA. Cada slide passa pela checklist. Notas do operador em PT-BR; exemplos client-facing em EN. **Não é opcional e não é "só na legenda":** o texto/print **queimado na imagem** é o que fica — a legenda some no scroll, o PNG fica.
>
> **Regra-mãe:** **BLOQUEIE o export se qualquer caixa abaixo ficar desmarcada.** Recapture o print, borre o identificador, ou regenere o asset como textura abstrata, e só então rode o Playwright. Sem exceção "depois eu arrumo".

Em modo **render-default** (copy pronta do orquestrador): rodar mesmo assim — o PNG é o artefato final. Em modo **standalone-editorial**: rodar com mais rigor, porque o texto foi gerado por IA e a IA **reincide** nos termos/hype proibidos (o histórico do Saif está cheio deles — ver `Secret_Align/01_BRAND/VOICE.md`).

---

## Higiene regra-6 — checklist por slide

> Fonte: `Secret_Align/CLAUDE.md` regra 6 + `Secret_Align/01_BRAND/VOICE.md` + `SECRET_Navigator_Material/Video_guidelines.md`. Objetivo: o software parece **rápido, novo e anônimo**; **ninguém** identifica paciente nem o Saif; **nunca** aparece a plataforma antiga (preta). Vale **frame a frame / slide a slide**, inclusive em screenshot dentro do frame de PC.

- [ ] **Nome do paciente escondido.** Zero nome real, iniciais identificáveis, data de nascimento, nº de prontuário em qualquer screenshot. Borrar/cobrir antes de queimar o PNG.
- [ ] **Nome do Saif escondido.** O perfil/login/autor do plano **não** aparece. (A autoria-Saif vive no lado *clínica*, não no software SECRET.)
- [ ] **Só software/3D NOVOS.** Apenas o **novo** software + os **novos modelos 3D**. **Nunca** a plataforma **antiga (preta)** — nem de relance, nem no fundo, nem num print "histórico".
- [ ] **3D models = raízes à ESQUERDA, plano reto.** A vista 3D mostra as **raízes à esquerda** e o **plano oclusal/horizontal alinhado** (não torto). Se o screenshot está com a orientação errada, recapturar.
- [ ] **"Save & Submit" visível.** Quando o slide mostra a tela de trabalho, o botão **SAVE & SUBMIT** aparece (sinaliza fluxo real e finalizado).
- [ ] **Uploads acelerados / rápidos.** Qualquer barra/etapa de upload ou processamento está **acelerada** — o software **não** pode parecer lento. (Em carrossel estático: mostrar o **estado concluído**, não o spinner no meio.)
- [ ] **Screenshot em FRAME DE COMPUTADOR**, nunca mockup de celular para o software (exceção única: a feature "Send to Patient", onde o celular é proposital).
- [ ] **Discrição B2B.** Sem promessa B2C, sem typo (o histórico tem "BACAUSE!"/"orthodonticexcellece"), sem exclamação/emoji/hype, **sem travessão**, hashtags ≤5 (vivem na legenda, mas se algo entrar no PNG, vale a mesma régua).
- [ ] **🚫 NUNCA imagem de IA com rosto/dentes/pessoa.** Imagem do Magnific neste slide é **abstrata (texturas teal)** ou **screenshot real em frame de PC** — **proibido** Nano Banana gerar face humana, boca, dente ou paciente. Se o asset tem qualquer anatomia humana gerada por IA → **descartar e regenerar** como textura abstrata.

### Especificidades visuais do preset SECRET (o gate confere)
- [ ] Fundo **dark premium-minimal** (ink `#0A1412`), headline **Poppins weight 300** com 1–2 palavras em **teal `#00C8B4`** ou branco (600); muito espaço negativo.
- [ ] **Kicker** uppercase, letter-spaced, teal + **hairline teal**.
- [ ] **Footer** = logo real branca (sem contador de slide `04/06`).
- [ ] No **slide de CTA**: o logo real (`secret-align-remotion/public/secret-logo.png`, wordmark escuro com `=` teal) vai num **chip branco** (slide escuro) OU a versão branca direto. CTA url = **secretalign.com**.

> **BLOQUEIO:** se **qualquer** caixa estiver desmarcada neste slide → **não exporte**. Borre/recubra o identificador, troque o screenshot pela versão nova/rápida/orientada, ou regenere a imagem como textura abstrata. Só então rode o Playwright.

---

## Passe final (antes de chamar `scripts/export_png.py`)

- [ ] **Todos os slides** da peça passaram pela checklist (capa, miolos, CTA — nenhum "pulado").
- [ ] Screenshots de software foram inspecionados **em zoom** — texto pequeno na UI também conta (nome de paciente costuma vazar em canto de tela).
- [ ] As imagens do Magnific respeitam a regra: **abstrato (textura teal) ou screenshot real** — nunca rosto/dente/pessoa IA.
- [ ] **Materiais editáveis salvos** junto (regra editável-materials): `index.html` + arquivos de imagem Magnific + `.docx`, na pasta local da peça.

**Regra única, repetida porque é a que importa:**
> **BLOQUEIE o export se QUALQUER caixa acima ficar desmarcada.** O PNG só sai quando a higiene regra-6 estiver **100% marcada**.
