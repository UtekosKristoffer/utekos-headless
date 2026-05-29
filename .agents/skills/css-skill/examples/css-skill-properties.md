# Bruk av CSS `@property` - Sjekkliste

Dette er en kort oppsummering av hvordan kontrollere CSS-variabler med `@property` og hvorfor det forbedrer ytelse og forutsigbarhet.

## Hvorfor bruke `@property`?

Tradisjonelle CSS-variabler (`--variabel`) godtar enhver verdi fordi nettleseren ikke vet hva de skal brukes til før de hentes ut med `var()`. Dette kan føre til brutt design hvis variablene får feil format (f.eks. `16px` som farge). `@property` løser dette ved å gi CSS-variabler **typer og regler**.

- [ ] **Bedre ytelse og type-sikkerhet:** Nettleseren vet på forhånd hva slags verdi variabelen har (f.eks. en farge eller lengde). Dette optimaliserer utregningen og gjør at feilaktige verdier umiddelbart avvises.
- [ ] **Smartere Fallback:** Ved bruk av `@property` og en ugyldig verdi forsøkes brukt (f.eks. en skrivefeil i en fargekode), vil nettleseren umiddelbart falle tilbake på `initial-value` uten å knekke layouten.
- [ ] **Kontrollert nedarving (Inheritance):** Tradisjonelle CSS-variabler nedarves ("arves" av under-elementer) til hele DOM-treet automatisk, noe som kan være tungt. Med `@property` kan du skru dette av.

## Hvordan bruke `@property`?

- [ ] **Definer variabelen og sett type (`syntax`):**
      Bestem hva slags verdi variabelen kan ha. For eksempel `<color>`, `<length>`, `<number>` eller `<percentage>`.

  ```css
  @property --min-farge {
    syntax: "<color>";
  }
  ```

- [ ] **Skru av eller på nedarving (`inherits`):**
      Dersom variabelen kun skal brukes lokalt der den settes, bør nedarving skrus av for bedre ytelse.

  ```css
  @property --min-farge {
    syntax: "<color>";
    inherits: false; /* Skrur av at barn arver denne verdien */
  }
  ```

- [ ] **Sett en forutsigbar standardverdi (`initial-value`):**
      Bestem hva verdien automatisk skal være dersom den er udefinert, eller dersom noen prøver å gi den en ugyldig verdi.
  ```css
  @property --min-farge {
    syntax: "<color>";
    inherits: false;
    initial-value: teal; /* Fallback farge */
  }
  ```

## I praksis

```css
@property --boks-farge {
  syntax: "<color>";
  inherits: false;
  initial-value: teal;
}

.min-boks {
  /* Hvis vi staver fargen feil, vil den ignoreres *trygt*
     og boksen får fargen 'teal' (initial-value), i stedet for å knekke. */
  --boks-farge: rgbb(255, 0, 0);

  background-color: var(--boks-farge);
}
```
