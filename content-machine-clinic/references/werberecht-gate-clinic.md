# werberecht-gate-clinic.md — gate Werberecht por slide (pré-export)

> **O que é:** o **portão de conformidade** do `content-machine-clinic`. Roda **depois** do HTML estar montado e **antes** de chamar `scripts/export_png.py`. Diferente do `impeccable-baked.md` (que checa estética/UI), este arquivo checa **legalidade** — o que, se vazar num PNG publicado, cria risco regulatório na Áustria (**Werberecht**).
>
> **Como rodar:** percorra **slide a slide** — capa, miolos, CTA — e **por idioma** (DE e EN têm copy nativa, cada versão passa pelo gate por conta própria). Notas do operador em PT-BR; exemplos client-facing em DE/EN. **Não é opcional e não é "só na legenda":** o texto **queimado na imagem** é o que a autoridade vê — a legenda some no scroll, o PNG fica.
>
> **Regra-mãe:** **BLOQUEIE o export se qualquer caixa abaixo ficar desmarcada.** Reescreva o slide (usar os pares "diga-assim-não-assim"), regenere o asset, e só então rode o Playwright. Sem exceção "depois eu arrumo".

Em modo **render-default** (a copy vem pronta do orquestrador): rodar mesmo assim — o orquestrador erra, e o PNG é o artefato final. Em modo **standalone-editorial** (o cérebro editorial é o próprio skill): rodar com mais rigor, porque o texto foi gerado por IA e a IA **reincide** nos termos proibidos (o próprio histórico do Saif está cheio deles — ver 09).

---

## Werberecht — checklist por slide

> Fonte: `09_BRAND_VOICE_BASELINE.md` (projeto Saif) (tabela "ele JÁ comete violações") + `04_TRAFFIC_PLAYBOOK.md` §4 (projeto Saif). O Saif **já cometeu** todas essas violações no histórico (~36 promessas, ~33 superlativos, ~9 antes/depois glamour, 3 comparações). **Não replicar** o que já está no perfil dele.

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

> **BLOQUEIO:** se **qualquer** caixa estiver desmarcada neste slide → **não exporte**. Reescreva com a coluna ✅, regenere o asset se a violação for visual, rode o gate de novo.

---

## Passe final (antes de chamar `scripts/export_png.py`)

- [ ] **Todos os slides** da peça passaram pela checklist — **nas 2 versões** (DE e EN), nenhum "pulado".
- [ ] As imagens do Magnific são **foto real do Saif polida + scrim** (IA só em fundo seguro, sem pessoa/dente).
- [ ] **Materiais editáveis salvos** junto (regra editável-materials): `index.html` + imagens Magnific + `.docx`, nas 2 pastas irmãs `..._de/` e `..._en/`.

**Regra única, repetida porque é a que importa:**
> **BLOQUEIE o export se QUALQUER caixa acima ficar desmarcada.** O PNG só sai quando o Werberecht estiver **100% marcado** — em cada idioma.
