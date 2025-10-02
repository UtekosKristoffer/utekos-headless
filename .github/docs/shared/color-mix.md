# color-mix()

### Baseline 2023

`color-mix()`-funksjonsnotasjonen tar to `<color>`-verdier og returnerer
resultatet av å blande dem i et gitt fargerom med en gitt mengde.

Å velge riktig fargerom er viktig for å oppnå ønskede resultater. Gitt de samme
fargene å blande, kan ulike fargerom være mer passende avhengig av
interpolasjonsbruksområdet.

Hvis resultatet av fysisk blanding av to fargede lys er ønsket, er CIE XYZ-
eller srgb-linear-fargerommet passende, fordi de er lineære i lysintensitet.
Hvis farger må være jevnt fordelt perceptuelt (som i en gradient), er
Oklab-fargerommet (og det eldre Lab) passende, fordi de er designet for å være
perceptuelt ensartede. Hvis man ønsker å unngå gråing i fargeblanding, dvs.
maksimere kroma gjennom overgangen, fungerer OkLCh (og det eldre LCH) godt. Bruk
kun sRGB hvis du trenger å matche oppførselen til en spesifikk enhet eller
programvare som bruker sRGB. sRGB-fargerommet er verken lineært lys eller
perceptuelt ensartet, og produserer dårligere resultater som altfor mørke eller
gråaktige blandinger.

```css
/* Polært fargerom */
color-mix(in hsl, hsl(200 50 80), coral 80%)

/* Rektangulært fargerom */
color-mix(in srgb, plum, #123456)
color-mix(in lab, plum 60%, #123456 50%)

/* Tilpasset fargerom */
color-mix(in --swop5c, red, blue)

/* Med hue-interpolasjonsmetode */
color-mix(in lch longer hue, hsl(200deg 50% 80%), coral)
```

**Verdier**

Funksjonsnotasjon:
`color-mix(<color-interpolation-method>, <color>[<percentage>], <color>[<percentage>])`

**`<color-interpolation-method>`** Spesifiserer hvilken interpolasjonsmetode som
skal brukes for å blande fargene. Den består av `in`-nøkkelordet etterfulgt av
et fargeromnavn. Følgende tre typer er tilgjengelige:

**`<rectangular-color-space>`**: `srgb`, `srgb-linear`, `display-p3`, `a98-rgb`,
`prophoto-rgb`, `rec2020`, `lab`, `oklab`, `xyz`, `xyz-d50`, og `xyz-d65`.

**`<polar-color-space>`**: `hsl`, `hwb`, `lch`, og `oklch`.

**`custom-color-space`**: `<dashed-ident>` som refererer til en tilpasset
`@color`-profil

**`<color>`** En `<color>`-verdi å blande.

**`<percentage>`** Valgfri - En `<percentage>`-verdi mellom 0% og 100%, som
spesifiserer mengden av tilsvarende farge å blande.

De to fargeprosentene (vi refererer til dem som p1 og p2) normaliseres som
følger:

Hvis både p1 og p2 utelates, da p1 = p2 = 50%. Hvis p1 utelates, da p1 = 100% -
p2. Hvis p2 utelates, da p2 = 100% - p1. Hvis p1 = p2 = 0%, er funksjonen
ugyldig. Hvis p1 + p2 ≠ 100%, da p1' = p1 / (p1 + p2) og p2' = p2 / (p1 + p2),
hvor p1' og p2' er normaliseringsresultatene. Hvis p1 + p2 < 100%, anvendes en
alfamultiplikator på p1 + p2 på den resulterende fargen. Dette ligner på å
blande inn transparent, med prosent pt = 100% - p1 - p2.

### Formell syntaks

```css
<color-mix()> =
  color-mix( [ <color-interpolation-method> , ]? [ <color> && <percentage [0,100]>? ]# )

<color-interpolation-method> =
  in [ <rectangular-color-space> | <polar-color-space> <hue-interpolation-method>? ]

<rectangular-color-space> =
  srgb               |
  srgb-linear        |
  display-p3         |
  display-p3-linear  |
  a98-rgb            |
  prophoto-rgb       |
  rec2020            |
  lab                |
  oklab              |
  <xyz-space>

<polar-color-space> =
  hsl    |
  hwb    |
  lch    |
  oklch

<hue-interpolation-method> =
  [ shorter | longer | increasing | decreasing ] hue

<xyz-space> =
  xyz      |
  xyz-d50  |
  xyz-d65
```

## Eksempler

**Fargeblander** Følgende live-demo blander to farger, `color-one` og
`color-two`, ved hjelp av `color-mix()`-funksjonen. Kildefargene vises på
utsiden, og den blandede fargen vises i midten. Du kan endre farger ved å klikke
på dem og velge en ny farge ved hjelp av fargevalgeren som vises. Du kan også
endre prosentandelen av hver farge som er inkludert i blandingen ved hjelp av
gliderne, og fargerommet ved hjelp av rullegardinmenyen.

**Blande to farger** Dette eksemplet demonstrerer blanding av to farger, rød
`#a71e14` ved forskjellige prosenter og hvit uten oppgitt prosent. Jo høyere
prosent av `#a71e14` som blandes, desto mer rød og mindre hvit blir
utgangsfargen.

```css
<ul>
  <li>0%</li>
  <li>25%</li>
  <li>50%</li>
  <li>75%</li>
  <li>100%</li>
  <li></li>
</ul>
```

`color-mix()`-funksjonen brukes for å legge til økende prosenter av rød, opp til
100%. Den 6. `<li>` inkluderer ikke en prosent for noen av fargene.

```css
li:nth-child(1) {
  background-color: color-mix(in oklab, #a71e14 0%, white);
}

li:nth-child(2) {
  background-color: color-mix(in oklab, #a71e14 25%, white);
}

li:nth-child(3) {
  background-color: color-mix(in oklab, #a71e14 50%, white);
}

li:nth-child(4) {
  background-color: color-mix(in oklab, #a71e14 75%, white);
}

li:nth-child(5) {
  background-color: color-mix(in oklab, #a71e14 100%, white);
}

li:nth-child(6) {
  background-color: color-mix(in oklab, #a71e14, white);
}
```

Den totale verdien av begge fargene i en `color-mix()`-funksjon er 100%, selv om
verdiene satt av utvikleren ikke totalt sett utgjør 100%. I dette eksemplet,
ettersom kun én farge har en prosent tildelt, får den andre fargen implisitt
tildelt en prosentverdi slik at den kombinerte totalen utgjør 100%. I den siste
`<li>`, hvor ingen av fargene er tildelt en prosent, er begge standard 50%.

## Legge til transparens

Dette eksemplet demonstrerer bruk av `color-mix()`-funksjonen for å legge til
transparens til en farge ved å blande hvilken som helst farge med transparent.

```css
<ul>
  <li>0%</li>
  <li>25%</li>
  <li>50%</li>
  <li>75%</li>
  <li>100%</li>
  <li></li>
</ul>
```

`color-mix()`-funksjonen brukes for å legge til økende prosenter av rød, som er
deklarert ved hjelp av en tilpasset egenskap kalt `--base`, definert på `:root`.
Den 6. `<li>` inkluderer ikke en prosent, som skaper en utgangsfarge som er
halvt så ugjennomsiktig som `--base`-fargen. Vi inkluderer en stripet bakgrunn
på `<ul>` for å gjøre transparensen synlig.

```css
:root {
  --base: red;
}

ul {
  background: repeating-linear-gradient(
    45deg,
    chocolate 0px 2px,
    white 2px 12px
  );
}

li:nth-child(1) {
  background-color: color-mix(in srgb, var(--base) 0%, transparent);
}

li:nth-child(2) {
  background-color: color-mix(in srgb, var(--base) 25%, transparent);
}

li:nth-child(3) {
  background-color: color-mix(in srgb, var(--base) 50%, transparent);
}

li:nth-child(4) {
  background-color: color-mix(in srgb, var(--base) 75%, transparent);
}

li:nth-child(5) {
  background-color: color-mix(in srgb, var(--base) 100%, transparent);
}

li:nth-child(6) {
  background-color: color-mix(in srgb, var(--base), transparent);
}
```

På denne måten kan `color-mix()`-funksjonen brukes for å legge til transparens
til hvilken som helst farge, selv om fargen allerede er ikke-ugjennomsiktig (med
en alfakanalverdi < 1). Imidlertid kan ikke `color-mix()` brukes for å gjøre en
semi-transparent farge helt ugjennomsiktig. For dette, bruk en relativ farge med
en CSS-fargefunksjon. Relative farger kan endre verdien til hvilken som helst
fargekanal, inkludert å øke en farges alfakanal for å gjøre fargen helt
ugjennomsiktig.

## Bruke hue-interpolasjon i `color-mix()`

Dette eksemplet demonstrerer hue-interpolasjonsmetodene som er tilgjengelige for
`color-mix()`-funksjonen. Når man bruker hue-interpolasjon, vil den resulterende
hue være mellom hue-verdiene til de to fargene som blandes. Verdien vil være
forskjellig basert på hvilken rute som tas rundt fargehjulet.

For mer informasjon, se `<hue-interpolation-method>`.

**CSS** `shorter hue`-interpolasjonsmetoden tar den korteste ruten rundt
fargehjulet, mens `longer hue`-interpolasjonsmetoden tar den lengre ruten. Med
`increasing hue` starter ruten med økende verdier. Med `decreasing hue`
reduseres verdien. Vi blander to `<named-color>`-verdier for å skape en serie
med `lch()`-mellomfarger som er forskjellige basert på hvilken rute som tas
rundt fargehjulet. De blandede fargene inkluderer rød, blå og gul med LCH
hue-verdier på omtrent 41deg, 301deg og 100deg, henholdsvis.

For å redusere koderedundans, brukte vi CSS tilpassede egenskaper for både
farger og for interpolasjonsmetoden, og satte forskjellige verdier på hver
`<ul>`.

```css
ul:nth-of-type(1) {
  --distance: longer; /* 52 graders hue-trinn */
  --base: red;
  --mixin: blue;
}
ul:nth-of-type(2) {
  /* 20 graders hue-reduksjon */
  --distance: shorter;
  --base: red;
  --mixin: blue;
}
ul:nth-of-type(3) {
  /* 40 graders hue-økning */
  --distance: increasing;
  --base: yellow;
  --mixin: blue;
}
ul:nth-of-type(4) {
  /* 32 graders hue-reduksjon */
  --distance: decreasing;
  --base: yellow;
  --mixin: blue;
}

li:nth-child(1) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 100%,
    var(--mixin)
  );
}

li:nth-child(2) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 80%,
    var(--mixin)
  );
}

li:nth-child(3) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 60%,
    var(--mixin)
  );
}

li:nth-child(4) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 40%,
    var(--mixin)
  );
}

li:nth-child(5) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 20%,
    var(--mixin)
  );
}

li:nth-child(6) {
  background-color: color-mix(
    in lch var(--distance) hue,
    var(--base) 0%,
    var(--mixin)
  );
}
```

## Resultat - Generert bilde fra MDN som vi ikke har tilgang på

Med `longer hue` vil trinnene eller reduksjonene mellom farger alltid være de
samme eller større enn når man bruker `shorter hue`. Bruk `increasing hue` eller
`decreasing hue` når retningen til hue-verdieendringen er viktigere enn lengden
mellom verdiene.
