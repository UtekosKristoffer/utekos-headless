# SKILL: Tailwind CSS Theme Variables (Design Tokens)

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for oppretting og organisering av "Theme variables" og Design Tokens i Tailwind CSS v4.

## Hvorfor det er performant og optimalt

- [ ] **CSS er API-et:** I motsetning til eldre versjoner hvor tokens var låst i `tailwind.config.js`, er _alt_ nå CSS. Å bruke `@theme`-direktivet gjøres lynraskt under byggeprosessen og sørger for single-source-of-truth for både variabler (`var(--var-navn)`) og Tailwind-klasser (`bg-var-navn`).
- [ ] **Zero-runtime:** Siden variablene oversettes til hardkodede utility-klasser via spesifikke navnerom, oppstår ingen overhead i klienten.

## Hvordan jeg skal strukturere Theme Variabler

### 1. Opprette og binde Tokens

Ikke sett design tokens i `:root {}` med mindre du bare vil ha en dum CSS-variabel. Vil du at fargen skal kunne brukes som klassen `text-mint-500`, _må_ du legge den i `@theme`:

```css
@theme {
  --color-mint-500: oklch(
    0.72 0.11 178
  ); /* Fører til bg-mint-500, text-mint-500 osv */
}
```

### 2. Jobb med Navnerom (Namespaces)

Tailwind genererer klasser basert på forhåndsdefinerte prefikser:

- `--color-*` -> Alle farger (`bg-`, `text-`, `border-`).
- `--font-*` -> Typografi (`font-sans`).
- `--spacing-*` -> Padding, margin, height, width (`p-4`, `max-w-md`).
- `--breakpoint-*` -> Responsivitet (`sm:`, `lg:`).

### 3. Modifisere standard-themen

- **Overskrive en verdi:** Skriv den bare inn.
  ```css
  @theme {
    --breakpoint-sm: 30rem;
  }
  ```
- **Slette et helt navnerom (Opt-out):** Om jeg har min helt egen fargepalett og vil unngå bundle-bloat, dreper jeg standard-fargene ved å sette navnetrommet til `initial`.
  ```css
  @theme {
    --color-*: initial;
    --color-brand-red: #ff0000;
  }
  ```
- **Slette _alt_ (Custom Theme):** For total kontroll og mikroskopisk CSS-output: `--*: initial;`

### 4. Nøste referanser med `@theme inline`

Når jeg peker en theme-variabel mot en _annen_ konvensjonell variabel (f.eks til dark-mode), _SKAL_ jeg bruke `inline` for å unngå scoping-bugs i standard CSS. Da bygges outputen direkte mot verdien, fremfor å peke ut i løse luften:

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

### 5. Animasjoner (@keyframes)

Når jeg lager animasjoner knyttet til `--animate-*` under `@theme`, pakker jeg `@keyframes`-deklarasjonen rett inn i `@theme`-blokken for at Tailwind skal autobyggeliggjøre den.

## Strenge regler jeg skal forholde meg til

- [ ] **Aldri bruk :root for Design Tokens:** Om en variabel skal opptre som stil-klasse i HTML (`px-min-variabel`), hører den hjemme i `@theme`. Punktum.
- [ ] **Enhet for breakpoints er REM:** Jeg skal alltid oppgi custom skjermbredder og breakpoints i `rem`, aldri i `px`, for å garantere at CSS-sorteringen til motoren fungerer knirkefritt uten race-conditions.
