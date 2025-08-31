# Funksjoner – Små, tydelige og intensjonsdrevne

## Fra uleselig til lesbar

Se på følgende eksempel fra FitNesse (Listing 3-1). Koden er lang, duplisert, og inneholder uklare strenger, uforståelige datatyper og API-er. Prøv å forstå funksjonens hensikt på tre minutter:

```java
// Listing 3-1 (original Java, for referanse)
// [Lang og kompleks funksjon – se oppgavetekst for detaljert kode]
```

### Hvorfor er dette vanskelig å lese?

- For mange forskjellige abstraksjonsnivåer blandet sammen
- Uklare, magiske strenger og funksjonskall
- Dobbelt-nestede if-setninger styrt av flagg
- Ingen tydelig fortelling eller intensjon

---

## Refaktorering: Kommuniser intensjon

Etter noen enkle metodeuttrekk og omdøping, kan man fange intensjonen slik:

```typescript
// Listing 3-2: Refaktorert og typesikret i TypeScript
export function renderPageWithSetupsAndTeardowns(pageData: PageData, isSuite: boolean): string {
  if (isTestPage(pageData)) {
    includeSetupAndTeardownPages(pageData, isSuite)
  }
  return pageData.getHtml()
}
```

> **Nøkkel:** Nå forstår du at funksjonen inkluderer oppsett og nedrigg for en testside før den rendres til HTML – uten å kjenne alle detaljene om FitNesse.

---

## Hva gjør funksjoner lesbare og forståelige?

### 1. Små funksjoner – og enda mindre!

- **Første regel:** En funksjon skal være liten.
- **Andre regel:** Den skal være enda mindre!
- Funksjoner bør sjelden være over 10–15 linjer, og ofte helst 2–5 linjer.
- Små funksjoner fremmer:
  - Lesbarhet
  - Gjenbrukbarhet
  - Testbarhet
  - Vedlikeholdbarhet

**Eksempel:**

```typescript
export function isTestPage(pageData: PageData): boolean {
  return pageData.hasAttribute('Test')
}
```

---

### 2. Blokker og innrykk

- Blokker inni `if`, `else`, `while` osv. bør være én linje – et funksjonskall.
- Innrykk bør aldri overstige 1–2 nivåer.
- Dette leder til at hver funksjon forteller en «historie» uten å drukne i detaljer.

**Eksempel:**

```typescript
if (isTestPage(pageData)) {
  includeSetupAndTeardownPages(pageData, isSuite)
}
```

---

### 3. Hver funksjon på ett nivå av abstraksjon

- Ikke bland lavnivå-operasjoner (f.eks. manipulere strenger) med høy-nivå operasjoner (f.eks. forretningslogikk) i samme funksjon.
- Hver funksjon bør kun operere på ett semantisk nivå.

---

### 4. Velg tydelige, selvforklarende navn

- Funksjonsnavn skal uttrykke hensikt, ikke implementasjon.
- Eksempel: `includeSetupAndTeardownPages` er mye tydeligere enn `processIncludes`.

---

### 5. Ingen duplisert kode

- Del utlogikk til egne funksjoner for å unngå duplisering.
- Det gir bedre vedlikehold og færre feil.

---

### 6. Ingen magiske strenger eller tall

- Bruk konstanter eller helper-funksjoner for spesialverdier.

---

## Oppsummert

- Funksjoner skal være små, med konsist og tydelig intensjon.
- Blokker og innrykk bør minimeres.
- Funksjoner bør være på ett nivå av abstraksjon.
- Tydelige navn og ingen duplisering.

> **Ditt mål:** Koden skal kunne «skumleses» og forstås intuitivt, uten dypdykk i detaljer.

---

**Kommentar om Java vs. TypeScript:**  
Alle eksempler er omskrevet og tilpasset idiomatisk TypeScript. Prinsippene er universelle, og konverteringen endrer ikke meningen eller læringsverdien.
