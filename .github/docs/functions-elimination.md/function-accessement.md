> **Merk**: Kontekst: Løssluppen - En personlig tilnærming

# Funksjonsonalitetsvurdering av `@property`

`@property` beskrives som den mest transformative CSS-funksjonene som nylig har
blitt en del av Baseline. Beskrivelser som «Den gir "superkrefter" til
CSS-variabler (custom properties)», er blitt benyttet.

---

## Kjernefordeler

### 1. Typesikkerhet

Kan tvinge en variabel til å være en bestemt type:

- `<color>` - Kun fargeverdier
- `<length>` - Kun lengdemålinger
- `<integer>` - Kun heltallsverdier

Nettleseren vil ignorere ugyldige verdier.

### 2. Animerbarhet

Ved å kjenne datatypen, kan nettleseren interpolere (beregne mellomverdiene) for
variabelen. Dette gjør det mulig å lage jevne overganger (transition) for
egenskaper som tidligere ikke var animerbare.

### 3. Forutsigbarhet

Du kan definere en standardverdi (`initial-value`) og eksplisitt styre om
variabelen skal arves (`inherits`) av barneelementer.

---

## Hvordan fungerer @property egentlig?

### Problemet med standard CSS-variabler

Uten @property er en standard CSS-variabel (`--min-farge: blue;`) for
nettleseren bare en **typeless streng**. Nettleseren vet ikke at "blue" er en
farge, eller at "100px" er en lengde. Den utfører en enkel "søk og erstatt"
operasjon i siste liten når den kalkulerer stiler. Fordi den ikke forstår
meningen med verdien, kan den ikke gjøre smarte ting med den, som å validere den
eller animere den.

### Transformasjonen med @property

@property endrer dette fundamentalt. Ved å registrere en variabel, inngår du en
**"kontrakt"** med nettleseren:

```css
@property --progress {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
```

#### Vi forteller nettleseren:

1. **syntax**: "Variabelen --progress vil alltid inneholde en prosentverdi. Ikke
   noe annet."
2. **inherits**: "Denne variabelen skal ikke arves av barneelementer."
3. **initial-value**: "Hvis --progress ikke er definert noe sted, er
   standardverdien 0%."

Nå er ikke --progress lenger en dum streng. Nettleseren har parset denne regelen
og behandler --progress som en ekte, typet verdi, akkurat som `width` eller
`opacity`.

---

## Hvorfor er dette en "Superkraft"?

La oss se på hvordan denne "kontrakten" låser opp fordelene som ble presentert
innledningsvis:

### 1. Animerbarhet: Den største gevinsten

Dette er den mest iøynefallende fordelen. For å animere noe, må nettleseren
kunne interpolere – det vil si å regne ut alle mellomverdiene mellom en start-
og sluttverdi.

#### Uten @property

Kan du animere fra `linear-gradient(red 0%, ...)` til
`linear-gradient(red 50%, ...)`? **Nei**. For nettleseren er dette to helt
forskjellige, urelaterte strenger. Den aner ikke hvordan den skal finne en
mellomting.

#### Med @property

Du isolerer den delen du vil animere:

```css
@property --gradient-stop {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.element {
  --gradient-stop: 50%;
  background: linear-gradient(red var(--gradient-stop), blue 100%);
  transition: --gradient-stop 1s;
}

.element:hover {
  --gradient-stop: 100%;
}
```

Dette gjelder alle egenskaper som aksepterer en variabel, for eksempel:

- `mask`
- `clip-path`
- fargestopp i gradienter
- deler av en `transform`-funksjon

### 2. Typesikkerhet og forutsigbarhet: Robust kode

Disse to fordelene henger tett sammen og handler om å skrive mer robust og
vedlikeholdbar CSS.

#### Fallback-mekanisme

**Scenario**: Hva skjer hvis noen ved et uhell skriver `width: var(--item-size)`
hvor `--item-size` er satt til en ugyldig verdi som `auto` (når syntax er
`<length>`)?

**Uten @property**:

- Hele `width`-deklarasjonen blir ugyldig og ignorert
- Elementet faller tilbake til nettleserens standardverdi for width (ofte
  `auto`)
- Dette kan ødelegge layouten din totalt

**Med @property**:

- Nettleseren ser at `auto` ikke matcher `syntax: '<length>'`
- I stedet for å forkaste hele regelen, bruker den verdien du definerte i
  `initial-value`
- Komponentene dine blir mer selvreparerende og motstandsdyktige mot feil

#### Kontrollert arv (inherits)

Standard CSS-variabler arves alltid. Dette er ofte det du vil, men ikke alltid:

- **`--theme-color`**: Det er nyttig at den arves
- **`--animation-delay`** som er spesifikk for én enkelt komponent: Med
  `inherits: false;` forhindrer du at denne "lekker" nedover i DOM-treet og
  forårsaker uventede effekter på barnekomponenter

---

## Hvorfor jeg/vi er avhengig av en LLM-assistent som mestrer @property

### 1. Flytter logikk fra JavaScript til CSS

Mange animasjoner og effekter som tidligere krevde `requestAnimationFrame` eller
et animasjonsbibliotek i JavaScript, kan nå gjøres rent i CSS. Dette er nesten
alltid mer performant, da animasjonene kan kjøres på nettleserens "compositor
thread", noe som gir:

- Jevnere animasjoner (høyere FPS)
- Ikke blokkerer hovedtråden

### 2. Åpner en ny verden av kreativitet

Animasjon av følgende blir nå enkelt:

- Gradienter
- `clip-path`
- `mask`
- SVG-attributter
- Farger på en måte som tidligere var umulig

Dette gir enorme muligheter for kreativ UI/UX-design.

### 3. Bygger mer robuste designsystemer

Ved å definere et strengt API for design-tokens (f.eks.
`--spacing-sm: <length>`), sikrer vi at de alltid brukes korrekt. Det gjør
CSS-koden:

- Mer forutsigbar
- Enklere å feilsøke
- Lettere for nye utviklere å forstå

---

`@property` er ikke bare en "nice-to-have". Det er et **fundamentalt skifte**
som gir CSS-variabler den strukturen og kraften de alltid burde hatt. Det gjør
CSS til et mer robust, kapabelt og performant språk.

Å mestre det er å investere i fremtidens måte å bygge dynamiske og avanserte
brukergrensesnitt på.

## Kontekst

Produktbeskrivelsen er skrevet med aksept for å vurdere den opp mot sitt eget
scenario, erfaringer og meninger. Normen er alikevel å gjennomføre en
profesjonell vurdering, som er nyttig for andre.
