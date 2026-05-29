# Bruk av CSS `color-mix()` - Sjekkliste

En kort huskeliste for hvordan du bruker `color-mix()` i CSS, hvorfor funksjonen er svært ytelsesvennlig (performant), og når det er optimalt å bruke den (spesielt i kombinasjon med f.eks. CSS-variabler/`@property`).

## Hvorfor er `color-mix()` performant og optimalt?

- [ ] **Kjører nativt i nettleseren:** Du trenger ikke tyngre JavaScript-biblioteker eller CSS-preprosessorer (som Sass eller Less) for å regne ut fargetoner og transparens.
- [ ] **Dynamisk for CSS-variabler:** Når du blander inn en CSS-variabel (`var(--min-farge)`), vil resultatet umiddelbart oppdatere seg dersom variabelen endres (f.eks. ved bytte til Dark Mode). Nettleseren håndterer dette lynraskt.
- [ ] **Mindre CSS-kode:** I stedet for å hardkode hundrevis av fargenyanser (primary-100 til primary-900), kan du definere én basefarge og bruke `color-mix()` for å generere lysere, mørkere eller mer gjennomsiktige varianter "on the fly".

## Hvordan bruke `color-mix()`?

### 1. Grunnleggende syntaks

Bestem hvilket **fargerom** (`in srgb`, `in oklab` etc.) du vil blande i, og angi deretter to farger med ønsket prosentandel (totalen vil automatisk normaliseres til 100%):

```css
background-color: color-mix(in oklab, red 70%, blue 30%);
```

### 2. Tilsette gjennomsiktighet (Opacity/Alpha)

Dette er en av de beste bruksområdene! Bland basefargen din med `transparent` for å skape en gjennomsiktig versjon av en eksisterende variabel, uten å måtte dekonstruere den til RGB/HSL.

```css
/* Gir 50% gjennomsiktighet til base-fargen */
background-color: color-mix(in srgb, var(--base-farge) 50%, transparent);
```

### 3. Toning og skyggelegging (Hover & Active states)

Perfekt for knapper. Bland basefargen din med hvitt for å gjøre den lysere (tint), eller svart for å gjøre den mørkere (shade).

```css
.min-knapp:hover {
  background-color: color-mix(in oklab, var(--brand-color) 85%, black);
}
```

## Velg riktig fargerom (Color Space)

Resultatet av blandingen ser helt forskjellig ut avhengig av hvilket fargerom du ber nettleseren bruke:

- [ ] `oklab` **(Anbefalt for UI & Gradients):** Designet for å være "perseptuelt uniformt" for det menneskelige øye. Gir veldig jevne, forutsigbare og vakre overganger.
- [ ] `oklch` **(Bevarer fargemetning):** Veldig bra hvis du vil unngå at blandingen blir blass og grå (bevarer "chroma").
- [ ] `srgb` **(Standard, men ha i bakhodet):** Klassisk, men kan ofte gi "skitne" og altfor mørke overganger i midten av en blanding. Bruk det stort sett bare hvis du må matche spesifikk eldre grafikk.
