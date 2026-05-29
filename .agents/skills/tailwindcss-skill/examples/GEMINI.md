# SKILL: Tailwind CSS Egendefinerte Stiler (Custom Styles & Arbitrary values)

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for håndtering av "custom styles", "arbitrary values" og utvidelser i Tailwind CSS v4.0.

## Hvorfor dette er performant og optimalt

- [ ] **Just-In-Time (JIT) on-the-fly:** Muligheten for "Arbitrary values" (klammer `[]`) genererer spesifikk CSS akkurat når det trengs, slik at man slipper å legge inn engangsstiler (som `top: 117px`) i `@theme` eller som inline style-attributter i HTML. Alt blir med i den optimaliserte CSS-bundlen.
- [ ] **Opprettholder modifiers:** I motsetning til inline styles (`style="..."`), kan arbitrary values kombineres med responsivitet og pseudo-klasser (f.eks `lg:hover:top-[117px]`).
- [ ] **Full integrasjon i native CSS:** Moderne `v4` lar meg skrive rene CSS custom utilities i stylesheetet med `@utility` som _automatisk_ blir utstyrt med all Tailwind-magi (som `hover:`, `md:` os.v.) uten behov for JavaScript-plugins.

## Hvordan jeg skal utvide og skreddersy Tailwind

### 1. Arbitrary Values (Klammeparenteser `[]`)

Bruk dette for piksel-perfekte engangstilfeller.

- Standardverdier: `top-[117px]`, `bg-[#bada55]`, `text-[22px]`.
- Referere CSS-variabler: `fill-(--my-brand-color)` (Kortform for `fill-[var(--my-brand-color)]`).
- Mellomrom håndteres med underscore (`_`): `grid-cols-[1fr_500px_2fr]`. Hvis du _faktisk_ trenger en underscore i verdien (sjelden), bruk escape `\_`.
- Ved tvetydighet (f.eks. om `text-(--min-variabel)` er fontstørrelse eller farge), bruk datatyper for å tvinge riktig adferd: `text-(length:--my-var)` vs `text-(color:--my-var)`.

### 2. Arbitrary Properties og Variants

- Kan styles direkte på usupporterte CSS-egenskaper: `[mask-type:luminance]`. Støtter også modifiers: `hover:[mask-type:alpha]`.
- Komplekse on-the-fly selektorer: Egendefinerte varianter kan skrives som `[&:nth-child(-n+3)]:hover:underline`.

### 3. Skrive strukturert CSS (Base & Components Layers)

Tradisjonell CSS skrives direkte. Om jeg setter standarder for HTML-elementer eller tredjeparts-klasser, bruker jeg `@layer`.

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
}

@layer components {
  /* Skreddersydde klasser, card/button osv, som fortsatt kan overstyres av vanlige utility-klasser. */
  .card {
    background-color: var(--color-white);
    padding: --spacing(6);
  }
}
```

### 4. Lage nye Utility-klasser (`@utility`)

For ny CSS-funksjonalitet du vil bruke om og om igjen i HTML med modifikatorer (`hover:min-klasse`).

- **Enkel utility:**
  ```css
  @utility scrollbar-hidden {
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ```
- **Funksjonelle (dynamiske) utility:** Bruk `--value()` eller `--modifier()`.
  ```css
  @utility tab-* {
    /* Aksepterer alt fra tab-2 (fra theme) til tab-[76] (arbitrary) via value-funksjonen */
    tab-size: --value(--tab-size-*, integer, [integer]);
  }
  ```

### 5. Definere egne Varianter (`@custom-variant`)

Hvis jeg trenger en ny pre-fiks (f.eks `theme-midnight:`).

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
/* Gjør at <html data-theme="midnight"> kan bruke "theme-midnight:bg-black" */
```

## Strenge regler jeg skal forholde meg til

- [ ] **Bruk utilities i HTML først:** Aldri lag Component-klasser (som `.btn` eller `.card`) med mindre det er ekte og omfattende gjentakelse av styling-grupper. (Ref: Duplication principles). Tailwind oppfordrer til å kommersialisere via reaktive komponenter i f.eks Vue/React i stedet for CSS class-groups når mulig.
- [ ] **Arbitrary values til unntak:** Ikke bruk `w-[13px]`, `w-[14px]` i hytt og vær. Prøv alltid å holde deg til Space og Sizing skalaen. Om du _må_ bryte med skalaen, gir JIT klammene en optimal fluktrute.
