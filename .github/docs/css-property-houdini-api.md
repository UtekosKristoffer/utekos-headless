# CSS Properties and Values API Level 1

> **Oversikt**: Definerer et API for å registrere nye CSS-egenskaper med
> typesikkerhet, arvelighet og innledende verdier.

## Dokumentstatus

Dette er en offentlig kopi av redaktørenes utkast. Det er kun til diskusjon og
kan endres når som helst. Publiseringen her innebærer ikke godkjennelse av
innholdet fra W3C. Ikke siter dette dokumentet annet enn som pågående arbeid.

Vennligst send tilbakemelding ved å arkivere issues i GitHub (foretrukket),
inkluder spec-koden "css-properties-values-api" i tittelen.

## Table of Contents

1. [Introduksjon](#1-introduksjon)
2. [Registrerte custom properties](#2-registrerte-custom-properties)
   - 2.1 [Bestemmelse av registreringen](#21-bestemmelse-av-registreringen)
   - 2.2 [Parse-time oppførsel](#22-parse-time-oppførsel)
   - 2.3 [Specified Value-Time oppførsel](#23-specified-value-time-oppførsel)
   - 2.4 [Computed Value-Time oppførsel](#24-computed-value-time-oppførsel)
   - 2.5 [Animasjonsoppførsel](#25-animasjonsoppførsel)
   - 2.6 [Betingede regler (@supports)](#26-betingede-regler-supports)
   - 2.7 [Substitusjon via var()](#27-substitusjon-via-var)
   - 2.8 [Shadow DOM](#28-shadow-dom)
3. [@property-regelen](#3-property-regelen)
   - 3.1 [syntax Descriptor](#31-syntax-descriptor)
   - 3.2 [inherits Descriptor](#32-inherits-descriptor)
   - 3.3 [initial-value Descriptor](#33-initial-value-descriptor)
4. [Registrere custom properties i JS](#4-registrere-custom-properties-i-js)
   - 4.1 [registerProperty()-funksjonen](#41-registerproperty-funksjonen)
   - 4.2 [PropertyDefinition-ordboken](#42-propertydefinition-ordboken)
5. [Syntaks-strenger](#5-syntaks-strenger)
   - 5.1 [Støttede navn](#51-støttede-navn)
   - 5.2 [ '+' og '#' multiplikatorer](#52--og--multiplikatorer)
   - 5.3 [ '|' Combinator](#53--combinator)
   - 5.4 [Parsing av syntaks-strengen](#54-parsing-av-syntaks-strengen)
6. [CSSOM](#6-cssom)
   - 6.1 [CSSPropertyRule-interface](#61-csspropertyrule-interface)
   - 6.2 [CSSStyleValue-reifikasjon](#62-cssstylevalue-reifikasjon)
7. [Eksempler](#7-eksempler)
   - 7.1
     [Eksempel 1: Bruke custom properties for animasjonsoppførsel](#71-eksempel-1-bruke-custom-properties-for-animasjonsoppførsel)
   - 7.2
     [Eksempel 2: Bruke @property for å registrere en egenskap](#72-eksempel-2-bruke-property-for-a-registrere-en-egenskap)
8. [Sikkerhetshensyn](#8-sikkerhetshensyn)
9. [Personvernhensyn](#9-personvernhensyn)
10. [Endringer](#10-endringer)

---

## 1. Introduksjon

CSS definerer et omfattende sett med egenskaper som kan manipuleres for å endre
layout, maling eller oppførselen til et webdokument. Likevel ønsker webutviklere
ofte å utvide dette settet med tilleggsegenskaper.

[css-variables] gir primitive midler for å definere brukerkontrollerte
egenskaper, men disse egenskapene tar alltid token-lister som verdier, må alltid
arves, og kan bare påvirke dokumentlayout eller maling ved å bli re-inkorporert
i verdien til andre egenskaper via en `var()`-referanse.

### Utvidelse av css-variables

Denne spesifikasjonen utvider [css-variables], og tillater registrering av
egenskaper som har:

- **Verdityper** - Strukturert parsing i stedet for token-lister
- **Innledende verdi** - Forhåndsdefinert standardverdi
- **Definert arveoppførsel** - Kontroll over hvordan egenskapen arves

### To registreringsmetoder

**CSS at-regel**: `@property`-regelen

```css
@property --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: blue;
}
```

**JavaScript API**: `registerProperty()`-metoden

```javascript
CSS.registerProperty({
  name: '--my-color',
  syntax: '<color>',
  inherits: false,
  initialValue: 'blue'
})
```

### Komplementaritet

Denne spesifikasjonen er komplementær til [css-paint-api-1] og
[css-layout-api-1], som tillater custom properties å direkte påvirke henholdsvis
maling og layout-oppførsel.

---

## 2. Registrerte custom properties

En custom property kan bli en **registrert custom property**, som får den til å
oppføre seg mer som en UA-definert egenskap: gi den en syntaks som sjekkes av
UA, en innledende verdi, og en spesifikk arveoppførsel.

### Når en property er registrert

En custom property anses som registrert for et Document hvis:

1. Det finnes en gyldig `@property`-regel definert for navnet i et av
   dokumentets stylesheets, ELLER
2. Navnet er inneholdt i dokumentets `[[registeredPropertySet]]`-slot (dvs.
   `registerProperty()` ble kalt for å registrere den)

### 2.1. Bestemmelse av registreringen

En registrert custom property har en **custom property registration** som
inneholder all data nødvendig for å behandle den som en ekte egenskap.

**Registreringsstruktur:**

- **property name** (en custom property name-streng)
- **syntax** (en syntaks-streng)
- **inherit flag** (en boolean)
- **initial value** (valgfritt - en streng som parses vellykket i henhold til
  syntaksen)

**Oppløsningsprioritet:**

1. **JavaScript først**: Hvis dokumentets `[[registeredPropertySet]]` inneholder
   en post med custom property-navnet, er registreringen den posten
2. **CSS deretter**: Ellers, hvis dokumentets aktive stylesheets inneholder
   minst én gyldig `@property`-regel som representerer en registrering med
   custom property-navnet, er den siste i dokumentrekkefølge registreringen
3. **Ingen registrering**: Ellers er det ingen registrering, og custom property
   er ikke en registrert custom property

### 2.2. Parse-time oppførsel

Registrerte custom properties parses nøyaktig som uregistrerte custom
properties - nesten alt er tillatt. Den registrerte syntaksen til egenskapen
sjekkes ikke ved parse-tid.

> **Merk**: Syntaksen sjekkes ved computed-value-tid, før substitusjon via
> `var()`.

**Hvorfor sjekkes ikke custom properties syntaktisk?**

Dette tillater større fleksibilitet og bakoverkompatibilitet med eksisterende
CSS.

### 2.3. Specified Value-Time oppførsel

Akkurat som uregistrerte custom properties, aksepterer alle registrerte custom
properties, uavhengig av registrert syntaks, CSS-wide keywords som `inherit`
eller `revert`. Deres oppførsel er definert i CSS Cascading 4 § 7.3 Explicit
Defaulting.

### 2.4. Computed Value-Time oppførsel

Den beregnede verdien til en registrert custom property bestemmes av syntaksen
til dens registrering.

#### Universal syntaks

Hvis registreringens syntaks er universal syntaks-definisjon, er den beregnede
verdien den samme som for uregistrerte custom properties.

#### Spesifikk syntaks

Ellers, forsøk å parse egenskapens verdi i henhold til dens registrerte syntaks:

**Hvis parsing feiler**: Deklarasjonen er ugyldig ved computed-value-tid **Hvis
parsing lykkes**: Den beregnede verdien avhenger av syntaksdetaljer

#### Numeriske verdier

**For `<length>`, `<length-percentage>`, `<angle>`, `<time>`, `<resolution>`,
`<integer>`, `<number>`, og `<percentage>`:**

- **Dimensjonsliteraler** (som `50em` eller `.2s`): Computed value er samme
  verdi, men med enheten konvertert til tilsvarende kanoniske enhet
- **Andre numeriske literaler** (som `5` eller `20%`): Computed value er som
  spesifisert
- **Funksjoner** (som matematiske funksjoner): Computed value defineres av den
  funksjonen

#### Andre verdityper

| Type                                       | Computed Value Oppførsel                                                |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| `<string>`                                 | Som spesifisert                                                         |
| `<color>`                                  | Beregnet ved å løse fargeverdier                                        |
| `<custom-ident>`, ident, "\*"              | Som spesifisert                                                         |
| `<url>`                                    | Relativ URL → absolutt URL; ellers som spesifisert                      |
| `<image>`                                  | Den beregnede `<image>`                                                 |
| `<transform-function>`, `<transform-list>` | Som spesifisert, men med alle lengder løst                              |
| **Verdier med multiplikatorer**            | Liste av beregnede verdier av base-typen                                |
| **Syntakser med `\|` combinator**          | Gitt ved å anvende computed-value regler for første klausul som matcher |

### 2.5. Animasjonsoppførsel

Som definert av [css3-animations] og [css3-transitions], er det mulig å
spesifisere animasjoner og overganger som refererer til custom properties.

**Interpolering**: Custom property-verdier interpolerer ved computed value, i
samsvar med typen de ble parset som.

#### Transform-unntak

**Unntak**: En verdi som ble parset som `<transform-list>`,
`<transform-function>`, eller `<transform-function>+` interpolerer i stedet som
per transform-egenskapen.

#### Praktisk eksempel

```css
/* Animerbar farge-property */
@property --brand-color {
  syntax: '<color>';
  inherits: false;
  initial-value: blue;
}

.element {
  background: var(--brand-color);
  transition: --brand-color 0.3s ease;
}

.element:hover {
  --brand-color: red; /* Smooth color transition */
}
```

### 2.6. Betingede regler (@supports)

Som angitt i parse-time oppførsel, aksepterer både uregistrerte og registrerte
custom properties (nesten) alle mulige verdier ved parse-tid. Registrerte custom
properties anvender kun sin syntaks ved computed value-tid.

**Konsekvens**: Alle custom properties, uavhengig av om de er registrerte eller
uregistrerte, vil teste som "true" i en `@supports`-regel, så lenge du ikke
bryter den (svært liberale) generiske syntaksen for custom properties.

```css
/* Dette vil alltid evaluere som true, selv om --foo er registrert med <color> syntax */
@supports (--foo: 1em) {
  /* Disse stilene anvendes */
}
```

### 2.7. Substitusjon via var()

Registrerte custom properties substituerer som sin **computed value**, ikke den
opprinnelige token-sekvensen.

**Eksempel:**

```css
/* --x registrert med <length> syntaks */
div {
  font-size: 10px;
  --x: 8em; /* Computed value: 80px */
  --y: var(--x); /* --y får verdien "80px" */
}
```

#### 2.7.1. Avhengighetssykler via relative enheter

Registrerte custom properties følger samme regler for
avhengighetssykkel-oppløsning som uregistrerte, med tilleggsbegrensninger for
relative enheter.

**For egenskaper med `<length>` eller `<length-percentage>` syntaks:**

| Enheter                             | Skaper avhengighet til             |
| ----------------------------------- | ---------------------------------- |
| `em`, `ex`, `cap`, `ch`, `ic`, `lh` | `font-size` på gjeldende element   |
| `lh`                                | `line-height` på gjeldende element |
| `rem`, `rlh`                        | `font-size` på rot-element         |
| `rlh`                               | `line-height` på rot-element       |

**Eksempel på avhengighetssykkel:**

```javascript
CSS.registerProperty({
  name: '--my-font-size',
  syntax: '<length>',
  initialValue: '0px',
  inherits: false
})

// Dette skaper en sykkel:
div {
  --my-font-size: 10em;  /* Avhenger av font-size */
  font-size: var(--my-font-size);  /* Avhenger av --my-font-size */
}
```

Resultat: `font-size` oppfører seg som om verdien `unset` ble spesifisert.

### 2.8. Shadow DOM

I motsetning til mange konsepter i CSS (se CSS Scoping 1 § 2.5 Name-Defining
Constructs og Inheritance), er ikke property-registreringer avgrenset til en
tre-scope. Alle registreringer, enten de vises i det ytterste dokumentet eller
innenfor et shadow tree, interagerer i et enkelt globalt registreringskart for
dokumentet.

#### Hvorfor kan ikke registreringer være avgrenset?

Når custom properties eksponeres som en del av et Shadow DOM-komponents
offentlige API, fungerer denne globale registreringsoppførselen som tiltenkt.
Hvis den ytre siden bruker en custom property med samme navn til forskjellige
formål, er det allerede en konflikt som må løses, og registreringsoppførselen
gjør det ikke verre.

Hvis en custom property er ment for privat intern bruk for en komponent,
anbefales det imidlertid at egenskapen får et sannsynlig unikt navn, for å
minimere muligheten for en konflikt med en annen kontekst. Dette kan gjøres, for
eksempel, ved å inkludere prosjektnavnet, eller en kort tilfeldig tekststreng, i
navnet på egenskapen.

---

## 3. @property-regelen

`@property`-regelen representerer en custom property-registrering direkte i et
stylesheet uten å måtte kjøre JS.

### Syntaks

```css
@property <custom-property-name> {
  <declaration-list>
}
```

### Påkrevde descriptors

**Obligatoriske descriptors:**

- `syntax` - Definerer hvilke verdityper som aksepteres
- `inherits` - Styrer arveoppførsel

**Betinget obligatorisk:**

- `initial-value` - Påkrevd med mindre syntaks er universal (`*`)

### Eksempel

```css
@property --brand-spacing {
  syntax: '<length>';
  inherits: false;
  initial-value: 1rem;
}

@property --theme-colors {
  syntax: '<color>#'; /* Komma-separert liste med farger */
  inherits: true;
  initial-value: blue, red, green;
}
```

### 3.1. syntax Descriptor

| Egenskap         | Verdi       |
| ---------------- | ----------- |
| **Navn**         | `syntax`    |
| **For**          | `@property` |
| **Verdi**        | `<string>`  |
| **Obligatorisk** | Ja          |

Spesifiserer syntaksen til custom property-registreringen, kontrollerer hvordan
egenskapens verdi parses ved computed value-tid.

**Validering**: Hvis den oppgitte strengen ikke er en gyldig syntaks-streng, er
descriptoren ugyldig.

### 3.2. inherits Descriptor

| Egenskap         | Verdi           |
| ---------------- | --------------- |
| **Navn**         | `inherits`      |
| **For**          | `@property`     |
| **Verdi**        | `true \| false` |
| **Obligatorisk** | Ja              |

Spesifiserer arve-flagget til custom property-registreringen, kontrollerer om
egenskapen arves som standard eller ikke.

### 3.3. initial-value Descriptor

| Egenskap         | Verdi                  |
| ---------------- | ---------------------- |
| **Navn**         | `initial-value`        |
| **For**          | `@property`            |
| **Verdi**        | `<declaration-value>?` |
| **Obligatorisk** | Betinget               |

Spesifiserer innledende verdi for custom property-registreringen.

**Regler for initial-value:**

| Syntaks           | initial-value påkrevd? | Konsekvens ved utelatelse |
| ----------------- | ---------------------- | ------------------------- |
| `"*"` (universal) | Nei                    | Guaranteed-invalid value  |
| Alle andre        | Ja                     | `@property`-regel ugyldig |

**Tilleggskrav når initial-value er påkrevd:**

1. Verdien må parse vellykket i henhold til spesifisert syntaks
2. Verdien må være computationally independent (ikke avhenge av andre
   CSS-egenskaper)

---

## 4. Registrere custom properties i JS

For å registrere en custom property via JS, utvides CSS-objektet med en
`registerProperty()`-metode.

### 4.1. registerProperty()-funksjonen

```javascript
dictionary PropertyDefinition {
  required DOMString name;
           DOMString syntax       = "*";
  required boolean   inherits;
           DOMString initialValue;
};

partial namespace CSS {
  undefined registerProperty(PropertyDefinition definition);
};
```

### Registreringsalgoritme

**For å registrere en custom property** med navn, syntaks, arver, og
initialValue:

1. **Navnvalidering**: Hvis navn ikke er en custom property name-streng, kast
   `SyntaxError`
2. **Duplikatsjekk**: Hvis property set allerede inneholder en oppføring med
   samme navn, kast `InvalidModificationError`
3. **Syntaksvalidering**: Forsøk å konsumere syntaks-definisjon fra
   syntaks-streng
4. **Initial value-behandling**: Varierer basert på syntaks-type
5. **Arve-flagg**: Sett inherit flag til verdien av inherits
6. **Registrering**: Opprett registrert property struct og legg til property set

### Computationally Independent Values

En egenskapsverdi er **computationally independent** hvis den kan konverteres
til en computed value ved å bruke kun:

- Verdien til egenskapen på elementet
- "Global" informasjon som ikke kan endres av CSS

**Eksempler:**

| Verdi          | Computationally Independent? | Forklaring                           |
| -------------- | ---------------------------- | ------------------------------------ |
| `5px`          | ✅ Ja                        | Endres ikke ved konvertering         |
| `1in`          | ✅ Ja                        | Bruker global kunnskap: `1in = 96px` |
| `3em`          | ❌ Nei                       | Avhenger av `font-size` på element   |
| `var(--color)` | ❌ Nei                       | Avhenger av custom property-verdi    |

---

## 5. Syntaks-strenger

En **syntaks-streng** beskriver verditypene akseptert av en registrert custom
property. Syntaks-strenger består av syntaks-komponentnavn som valgfritt kan
multipliseres og kombineres.

### Parsing til syntaks-definisjon

En syntaks-streng kan parses til en **syntaks-definisjon**, som enten er:

- **En liste med syntaks-komponenter** - Aksepterer spesifikke verdityper
- **Universal syntaks-definisjon** (`*`) - Aksepterer enhver gyldig token-strøm

### 5.1. Støttede navn

| Syntaks-komponent        | Aksepterte verdier                                            |
| ------------------------ | ------------------------------------------------------------- |
| `"<length>"`             | Enhver gyldig `<length>`-verdi                                |
| `"<number>"`             | `<number>`-verdier                                            |
| `"<percentage>"`         | Enhver gyldig `<percentage>`-verdi                            |
| `"<length-percentage>"`  | Enhver gyldig `<length>` eller `<percentage>`, calc()-uttrykk |
| `"<string>"`             | Enhver gyldig `<string>`-verdi                                |
| `"<color>"`              | Enhver gyldig `<color>`-verdi                                 |
| `"<image>"`              | Enhver gyldig `<image>`-verdi                                 |
| `"<url>"`                | Enhver gyldig `<url>`-verdi                                   |
| `"<integer>"`            | Enhver gyldig `<integer>`-verdi                               |
| `"<angle>"`              | Enhver gyldig `<angle>`-verdi                                 |
| `"<time>"`               | Enhver gyldig `<time>`-verdi                                  |
| `"<resolution>"`         | Enhver gyldig `<resolution>`-verdi                            |
| `"<transform-function>"` | Enhver gyldig `<transform-function>`-verdi                    |
| `"<custom-ident>"`       | Enhver gyldig `<custom-ident>`-verdi                          |
| `"<transform-list>"`     | Liste med gyldige `<transform-function>`-verdier              |

### 5.2. '+' og '#' multiplikatorer

Enhver syntaks-komponentnavn kan følges umiddelbart av en multiplikator:

| Multiplikator | Symbol | Beskrivelse              |
| ------------- | ------ | ------------------------ |
| **Plus**      | `+`    | Mellomromsseparert liste |
| **Hash**      | `#`    | Kommaseparert liste      |

**Eksempler:**

- `"<length>+"` - Mellomromsseparert liste med lengde-verdier
- `"<color>#"` - Kommaseparert liste med fargeverdier

### 5.3. '|' Combinator

Syntaks-strenger kan bruke `|` for å tilby flere syntaks-komponentnavn.
Komponenter matches i spesifisert rekkefølge.

**Eksempler:**

- `"<length> | auto"` - Aksepterer en lengde eller auto
- `"red | <color>"` - `red` parses som identifier, `blue` som `<color>`
- `"foo | <color># | <integer>"` - Aksepterer foo, kommaseparert fargeliste,
  eller enkelt heltall

---

## 6. CSSOM

### 6.1. CSSPropertyRule Interface

`CSSPropertyRule`-interface representerer en `@property`-regel:

```javascript
[Exposed=Window]
interface CSSPropertyRule : CSSRule {
  readonly attribute CSSOMString name;
  readonly attribute CSSOMString syntax;
  readonly attribute boolean inherits;
  readonly attribute CSSOMString? initialValue;
};
```

**Interface-medlemmer:**

- **name**: Custom property-navnet assosiert med `@property`-regelen
- **syntax**: Syntaksen assosiert med `@property`, nøyaktig som spesifisert
- **inherits**: Inherits descriptor assosiert med `@property`-regelen
- **initialValue**: Initial value assosiert med `@property`-regelen (kan være
  null)

---

## 7. Eksempler

### 7.1. Eksempel 1: Bruke custom properties for animasjonsoppførsel

```html
<script>
  CSS.registerProperty({
    name: '--stop-color',
    syntax: '<color>',
    inherits: false,
    initialValue: 'rgba(0,0,0,0)'
  })
</script>

<style>
  .button {
    --stop-color: red;
    background: linear-gradient(var(--stop-color), black);
    transition: --stop-color 1s;
  }

  .button:hover {
    --stop-color: green;
  }
</style>
```

**Resultat**: Smooth fargeovergang i gradienten ved hover.

### 7.2. Eksempel 2: Bruke @property for å registrere en egenskap

```html
<script>
  CSS.paintWorklet.addModule('circle.js')
</script>

<style>
  @property --radius {
    syntax: '<length>';
    inherits: false;
    initial-value: 0px;
  }

  div {
    width: 100px;
    height: 100px;
    --radius: 10px;
    background: paint(circle);
    transition: --radius 1s;
  }

  div:hover {
    --radius: 50px;
  }
</style>

<div></div>
```

**Paint Worklet (circle.js):**

```javascript
registerPaint(
  'circle',
  class {
    static get inputProperties() {
      return ['--radius']
    }

    paint(ctx, geom, properties) {
      let radius = properties.get('--radius').value
      ctx.fillStyle = 'black'
      ctx.beginPath()
      ctx.arc(geom.width / 2, geom.height / 2, radius, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
)
```

**Resultat**: Animert sirkel som vokser/krymper ved hover.

---

## 8. Sikkerhetshensyn

Det er ingen kjente sikkerhetsproblemer introdusert av disse funksjonene.

---

## 9. Personvernhensyn

Det er ingen kjente personvernproblemer introdusert av disse funksjonene.

---

## 10. Endringer

### 10.1. Endringer siden Working Draft av 13. oktober 2020

_til 20. mars 2024_

- Gjorde "initial-value" til å ha `<declaration-value>?`, samme som custom
  properties (#9078)
- Tillot @Property i shadow trees (#1085)
- Lagt til seksjon som forklarer hvorfor property-registrering er global, heller
  enn shadow-scoped
- Eksporterte termene "registered custom property" og "universal syntax
  definition" for bruk i andre spesifikasjoner (#1020)
- Brukte termen "invalid at computed-value time" heller enn "guaranteed-invalid
  value"

---

## Samsvar (Conformance)

### Dokumentkonvensjoner

Samsvarskrav uttrykkes med en kombinasjon av beskrivende påstander og RFC
2119-terminologi. Nøkkelordene "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL
NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY" og "OPTIONAL" i de normative
delene av dette dokumentet skal tolkes som beskrevet i RFC 2119.

### Samsvarklasser

Samsvar med denne spesifikasjonen er definert for tre samsvarklasser:

1. **stylesheet**: Et CSS-stylesheet
2. **renderer**: En UA som tolker semantikken til et stylesheet og renderer
   dokumenter som bruker dem
3. **authoring tool**: En UA som skriver et stylesheet

---

## Sammendrag

CSS Properties and Values API Level 1 gir webutviklere kraftige verktøy for å:

### Hovedfunksjoner

- **Typesikre custom properties** med strukturert parsing
- **Kontrollert arveoppførsel** for bedre forutsigbarhet
- **Animerbare custom properties** med smooth overganger
- **Fleksibel registrering** via både CSS og JavaScript

### Praktiske fordeler

- **Bedre utvikleropplevelse** med tyvevalidering
- **Robuste animasjoner** av custom property-verdier
- **Konsistent oppførsel** på tvers av forskjellige kontekster
- **Progressive enhancement** med fallback til standard custom properties

Ved å mestre denne API-en kan du lage mer sofistikerte og vedlikeholdbare
CSS-arkitekturer som utnytter kraften i typede custom properties.
