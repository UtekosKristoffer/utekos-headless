# Markdown - En guide for korrekt syntaks og beste praksis

## Når skal du bruke backticks i Markdown for HTML?

- **Inline-kode (én linje)**: Bruk én backtick på hver side for små biter du vil
  vise som tekst, ikke kjøre: Skriv "<div class='card'></div>". Tips: Har du
  backtick inni teksten, omslutt med doble backticks: `<div>`.
- **Kodeblokker (flere linjer)**: Bruk triple backticks. Legg til språket for
  highlight:

```html
<section class="prose">
  <h1>Tittel</h1>
</section>
```

(Du kan også bruke ~~~ i stedet for ``` … men backticks er mest vanlig.)

- **Når du vil at HTML skal rendres som faktisk HTML**: Ikke bruk
  backticks/fence. Bare lim inn HTML-en rått. **Merk**: Mange plattformer
  (f.eks. docs-systemer, CMS, GitHub i visse felt) sanitiserer eller deaktiverer
  rå HTML av sikkerhetsgrunner, så det kan ikke rendres.

## Bruke dobbelt stjernetegn ( \*\* ) på venstre eller høyre side av kolon på enden av setningen?

**CHAT GPT SVAR**: Anbefalt for ledetekster i lister/dokumentasjon: sett kolon
utenfor den fete markeringen. Da uthever du selve begrepet, ikke skilletegnet.

Skriv: - **Inline-kode (én linje):** …

Hvis du vil at kolon også skal være uthevet (del av tittelen): sett kolon inni
markeringen.

Skriv: - **Inline-kode (én linje):** …

Typografi-regel (norsk): Ingen mellomrom før kolon, ett mellomrom etter. Så
enten **…**: eller **…:**, etter intensjon — men vær konsekvent i hele
dokumentet.

### CHAT GPT 5 (Thinking)

#### Respons på forespørsel om optimaliseringtips ved bruk  av Markdown-filer som LLMs skulle prosessere mest mulig effektivt

* ---
* task: "Refactor ProductCard"
* goals: ["Reduce TTFB", "Eliminate waterfalls"]
* tech: { next: "15.5", react: "19", ts: "5.9.2" }
* constraints: ["no any", "exactOptionalPropertyTypes", "noUncheckedIndexedAccess"]
* ---
* Segmenter hardt med overskrifter (H1–H3) og presise titler: 
# Problem, 
## Constraints, 
## Output format, 
## Test cases.
* Skill roller og krav eksplisitt:
    * Input (kilde), Requirement (må oppfylles), Non-goals (skal IKKE gjøres), Acceptance Criteria (tverrprøvbar liste).
* Output-format som kontrakt: hvis du vil ha kode/JSON som eneste svar:    Svar KUN med én kodeblokk:
* ```ts
* // kode her
*    Ingen forklaringstekst.      


