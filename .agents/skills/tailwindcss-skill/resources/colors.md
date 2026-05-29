# SKILL: Tailwind CSS Farger (Colors) - Retningslinjer og sjekkliste

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for håndtering av farger i Tailwind CSS v4.0.

## Hvorfor Tailwind-farger er performant og optimalt

- [ ] **Ett felles fargespråk:** Standardpaletten tilbyr 11 steg (50 - 950) som gir et konsistent og riktig fargeforløp.
- [ ] **Dynamisk Opacity (Alpha):** I stedet for å definere nye fargekoder for alt (`rgba()`), tillater Tailwind justering av gjennomsiktighet direkte på utilities (`bg-sky-500/50`) eller gjennom funksjoner i CSS (`--alpha()`).
- [ ] **Eksponert som CSS-variabler:** Alle farger gjøres autmatisk tilgjengelig som globale CSS-variabler under navnerommet `--color-*` (f.eks. `--color-blue-500`), noe som gjør de eksepsjonelt lette å integrere med standard CSS.

## Hvordan jeg skal bruke farger i praksis

### 1. Arbeide med standard Utilities

Bruk utility-klassene konsekvent for å sette farger. Legg merke til `/` syntaksen for opacity.

- Tekst, bakgrunn og rammeverktøy: `bg-white`, `border-pink-300`, `text-gray-950`.
- Dark Mode: Prefix med `dark:` (f.eks. `dark:bg-gray-800`).
- Dynamisk opacity: `bg-black/75` eller vilkårlige (arbitrary) modifikatorer `bg-pink-500/[71.37%]`.

### 2. Tilpasse fargepaletten (`@theme`)

Nye farger eller overstyring skjer i CSS-filen med hove-direktivet `@theme`.

- **Legge til nye farger:** Definer dem under `--color-*`. Det genererer direkte utilities som `bg-midnight`.
  ```css
  @theme {
    --color-midnight: #121063;
  }
  ```
- **Fjerne standardfarger:** Sett til `initial` for å minimere bundle-størrelsen eller lage et helt skreddersydd system.
  ```css
  @theme {
    --color-*: initial; /* Fjerner ALLE standard Tailwind-farger */
    --color-brand-primary: #123456;
  }
  ```
- **Avhengige fargevariabler:** Bruk `@theme inline` for å koble eksisterende (f.eks. Dark Mode) CSS-variabler til Tailwind sine utilities.
  ```css
  @theme inline {
    --color-canvas: var(--app-bkg-color);
  }
  ```

### 3. Bruk Farger direkte i ren CSS

I stedet for `@apply` eller hardkode hex-koder, skal jeg hente Tailwind-fargene inn i mine egne `style`-regler ved hjelp av `var()`.

```css
.min-klasse {
  /* Henter standard color: */
  color: var(--color-blue-500);

  /* Justerer opacity (alpha) med innebygd funksjon: */
  background-color: --alpha(var(--color-gray-950) / 10%);
}
```

## Strenge regler for farger

- [ ] **Bruk felles Theme Variabler (CSS):** Aldri opprett egne `var(--primary)` variabler hvis det burde være en del av `@theme` `(--color-primary)`. Plugg det alltid direkte inn i Tailwinds `@theme`-område.
- [ ] **Foretrekk --alpha() funksjonen i CSS:** Når jeg skriver ren CSS og skal ha gjennomsiktig farge, _skal_ `--alpha()` funksjonen typisk benyttes fremfor tungvinte RGB konverteringer. (Den oversettes til performant native `color-mix()` i build).
