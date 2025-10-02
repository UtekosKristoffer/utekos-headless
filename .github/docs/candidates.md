# Funksjonalitetspresentasjon og -vurdering

> **Oversikt**: Fremleggelse av dokumentasjon knyttet til utpekte vurderinger.

## Relevant tilleggsinfo for vurdering av `--alpha()`

**`color-mix()`** — Tailwind utnytter moderne CSS-funksjoner og nevner
eksplisitt denne som en av dem som bidrar til økt ytelse. Beskriver den i sin
dokumentasjon slik: "for opasitetsmodifikatorer – enklere å bruke
opasitetssyntaks med CSS-variabler eller justere opasiteten til currentColor".
Grunnleggende funksjonalitet handlerom evnen til å justere opasiteten til enhver
fargeverdi, inkludert CSS-variabler og currentColor. Forsår flyten som at
`--alpha()` funkerer i hovedsak som syntaktisk sukker for `color-mix()`.

### Funksjonsinformasjon

- kopiert inn for å ta informasjonen med i totalvurderingen

Tailwind tilbyr følgende "byggetidsfunksjoner" for å gjøre det enklere å jobbe
med farger og avstandsskalaen.

#### `--alpha()`

Bruk `--alpha()`-funksjonen for å justere opasiteten til en farge:

```css
/* Input CSS */
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

#### `--spacing()`

Bruk `--spacing()`-funksjonen for å generere en avstandsverdi basert på temaet
ditt:

```css
/* Input CSS */
.my-element {
  margin: --spacing(4);
}
```

```css
/* Kompilert CSS */
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

Dette kan også være nyttig i vilkårlige verdier, spesielt i kombinasjon med
`calc()`:

<div class="py-[calc(--spacing(4)-1px)]">
  </div>

Men, la oss fortsette.

## Kandidater

---

### `--alpha()`-funksjonen

Tailwind tilbyr følgende build-time-funksjoner for å gjøre arbeid med farger og
avstandsskalaen enklere.

Bruk `--alpha()`-funksjonen for å justere gjennomsiktigheten til en farge:

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

**Kompilert utdata:**

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

---

### `--spacing()`-funksjonen

Tailwind tilbyr følgende build-time-funksjoner for å gjøre arbeid med farger og
avstandsskalaen enklere.

Bruk `--spacing()`-funksjonen for å generere en avstandsverdi basert på temaet
ditt:

```css
.my-element {
  margin: --spacing(4);
}
```

Dette kan også være nyttig i vilkårlige verdier, spesielt i kombinasjon med
`calc()`:

```css
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

**Eksempel i HTML:**

```html
<div class="py-[calc(--spacing(4)-1px)]">
  <!-- ... -->
</div>
```

## Eksempler

### Detaljert bruk av `--spacing()`-funksjonen

`--spacing()`-funksjonen er en mekanisme for å definere og bruke tilpassede
avstandsverdier innenfor temaet ditt, som gir mer presis kontroll over
elementers dimensjoner og posisjonering. Den er spesielt nyttig når du trenger å
avvike fra standard avstandsskala eller lage dynamisk avstand basert på
CSS-variabler.

#### Eksempel på bruk av `--spacing()` fra Tailwind CSS:

**Definere tilpasset avstand i en demoutgave av `next.config.js`:**

```javascript
/** @type {import('next').NextConfig} */
module.exports = {
  theme: {
    extend: {
      // Definer en tilpasset avstandsvariabel
      '--my-custom-spacing': '2.5rem'
    }
  }
}
```

I dette eksemplet er en `tilpasset avstandsvariabel` `--my-custom-spacing`
definert innenfor `extend`-seksjonen av temakonfigurasjonen, med verdien satt
til `2.5rem`.

**Bruk av tilpasset avstand i en utility-klasse:**

```html
<div class="p-[var(--my-custom-spacing)] bg-blue-200">
  Denne div-en har tilpasset padding definert av --my-custom-spacing.
</div>
```

Her bruker `p-[var(--my-custom-spacing)]` utility-klassen padding på
div-elementet, og refererer direkte til den tilpassede avstandsvariabelen
definert i konfigurasjonen. Dette resulterer i en `padding` på `2.5rem` på alle
sider av elementet.

### Detaljert bruk av `--alpha()`-funksjonen

Tailwind CSS sin `--alpha()`-funksjon er en build-time-funksjon som brukes for å
justere `gjennomsiktigheten` til en `farge`. Den gir en praktisk måte å anvende
transparens på farger, spesielt når du arbeider med tilpassede CSS-variabler
eller når du trenger mer finkornet kontroll enn standard
gjennomsiktighet-utilities som `opacity-50`.

#### Hvordan det fungerer:

`--alpha()`-funksjonen er i hovedsak syntaktisk sukker for CSS
`color-mix()`-funksjonen. Den lar deg spesifisere en `farge` og en alfaverdi
(enten som et tall eller en prosentandel) for å lage en transparent versjon av
den `fargen`.

#### Eksempel på bruk:

**Vurder en tilpasset CSS-variabel for en farge:**

```css
:root {
  --color-primary: 27 80 13; /* RGB-verdier */
}
```

Du kan deretter bruke `--alpha()` i CSS-en din for å anvende gjennomsiktighet på
denne fargen:

```css
.my-element {
  color: --alpha(rgb(var(--color-primary)) / 50%);
}
```

I dette eksemplet henter `rgb(var(--color-primary))` grunnfargen, og `/ 50%`
anvender 50% `gjennomsiktighet`, noe som resulterer i en semi-transparent
versjon av primærfargen.

## Viktige punkter:

### For `--alpha()`:

- **Build-time-funksjon**: `--alpha()` behandles av Tailwind under
  byggeprosessen, ikke en runtime CSS-funksjon.
- **Fleksibilitet**: Den tilbyr mer fleksibilitet for å håndtere
  fargegjennomsiktighet, spesielt med tilpassede farger og variabler.
- **Syntaktisk sukker for `color-mix()`**: Under panseret bruker den
  `color-mix()`-funksjonen for å oppnå ønsket effekt.

### For `--spacing()`:

- **Temaintegrering**: Fungerer sømløst med Tailwinds temakonfigurasjonsystem
- **Dynamisk beregning**: Kan kombineres med `calc()` for komplekse
  avstandsberegninger
- **Arbitrary values**: Støtter bruk i firkantede parenteser for engangsverdier
- **Konsistens**: Sikrer at avstandsverdier følger designsystemets skala

---

### `--value()` -funksjonen

I Tailwind CSS v4, med «funksjonelle utilities», brukes `--value()` som et
plassholder-uttrykk for å lese inn verdien du skriver i klassenavnet når du
definerer egne utilities med `@utility`.

**Kort sagt**: Når du lager en egendefinert `utility` med mønster som
typography-_, representerer `--value()` den delen som matcher `_ i`
klassenavnet.

Eksempel (idé):

`@utility` `typography-_` `{ font-size:` `--value(integer)rem;` `/_ `krever at
verdien er et heltall `\*/ }`

Med dette mønsteret vil en klasse som typography-2 gi font-size: 2rem;.

### Viktige punkter

Arbitrary values:
 `--value()` brukes sammen med verdier du skriver direkte i
klassenavnet, typisk der `\*` fanger opp innmaten. (Adskilt fra klassisk
«arbitrary value» i hakeparenteser som `text-[22px]`.)

### Funksjonelle utilities

Kjerneidéen er at du kan lage gjenbrukbare mønstre som omsetter deler av
klassenavnet til faktiske CSS-egenskaper ved kompilering.

**Type-hinting**: Du kan skrive `--value(integer)` for å uttrykkelig kreve
heltall, eller andre hint avhengig av kontekst/eksempler i økosystemet.

### `--modifier()` vs `--value()`:

I mer avanserte oppsett kan `--modifier()` fange en sekundær del (ofte etter /,
som i text-red/80). `--value()` er primærverdien.

Konseptet (at `--value()` brukes i `@utility` for å fange opp den primære
verdien fra klassenavnet) er riktig i v4-økosystemet.

#### Eksemplet har en inkonsistens:

`@utility` `typography-\*` { `font-size`: `--value(integer)rem;` } krever en
heltallsverdi (pga. `integer`), men teksten bruker `typography-2xl` som eksempel
på `input`. `2xl` er ikke et heltall og vil ikke matche `--value(integer)`.

#### Korriger enten input til typography-2 (som blir font-size: 2rem;),

eller endre utility-en til å mappe tokens som 2xl til størrelser (da trenger du
en annen strategi — f.eks. temavariabler/egne regler — ikke integer).

Kontrasten mellom `--value()` (primærverdi) og `--modifier()` (sekundær verdi
etter /) er presist beskrevet.

---

## Konklusjon

Både `--alpha()` og `--spacing()`-funksjonene representerer Tailwinds tilnærming
til å gi utviklere kraftige verktøy for finkornet kontroll over styling,
samtidig som de opprettholder konsistens med rammeverkets design-token-system.
Disse funksjonene lar deg bevege deg utover standardutilities når prosjektet
krever det, uten å miste fordelene med Tailwinds systematiske tilnærming til
styling.

---

## Slutt på strategidokument
