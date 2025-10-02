# React Compiler: Automatisk optimalisering

> **Oversikt**: React Compiler optimaliserer automatisk React-applikasjoner ved
> byggetid og eliminerer behovet for manuell memoization.

## Table of Contents

1. [Hva gjør React Compiler](#hva-gjør-react-compiler)
2. [Før og etter sammenligning](#før-og-etter-sammenligning)
3. [Dype dykk: Optimaliserings-typer](#dype-dykk-optimaliserings-typer)
4. [Inkrementell innføring](#inkrementell-innføring)
5. [Feilsøking og beste praksis](#feilsøking-og-beste-praksis)

---

## Hva gjør React Compiler

React Compiler optimaliserer automatisk React-applikasjonen din ved byggetid.

React er ofte raskt nok uten optimalisering, men noen ganger må du manuelt
memoize komponenter og verdier for å holde appen din responsiv. Denne manuelle
memoization er kjedelig, lett å gjøre feil, og legger til ekstra kode å
vedlikeholde.

React Compiler gjør denne optimaliseringen automatisk for deg, frigjør deg fra
denne mentale belastningen slik at du kan fokusere på å bygge funksjoner.

---

## Før og etter sammenligning

### Før React Compiler

Uten kompilatoren må du manuelt memoize komponenter og verdier for å
optimalisere re-renders:

```tsx
import { useMemo, useCallback, memo } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ data, onClick }) {
  const processedData = useMemo(() => {
    return expensiveProcessing(data)
  }, [data])

  const handleClick = useCallback(
    item => {
      onClick(item.id)
    },
    [onClick]
  )

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  )
})
```

> **Merk**: Denne manuelle memoization har en subtil bug som bryter memoization:
>
> ```tsx
> <Item key={item.id} onClick={() => handleClick(item)} />
> ```
>
> Selv om `handleClick` er pakket inn i `useCallback`, lager arrow function
> `() => handleClick(item)` en ny funksjon hver gang komponenten renderer. Dette
> betyr at `Item` alltid vil motta en ny `onClick` prop, noe som bryter
> memoization.

### Etter React Compiler

Med React Compiler skriver du samme kode uten manuell memoization:

```tsx
function ExpensiveComponent({ data, onClick }) {
  const processedData = expensiveProcessing(data)

  const handleClick = item => {
    onClick(item.id)
  }

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} onClick={() => handleClick(item)} />
      ))}
    </div>
  )
}
```

React Compiler bruker automatisk optimal memoization, og sikrer at appen din kun
re-renderer når det er nødvendig.

---

## Dype dykk: Optimaliserings-typer

### Hvilken type memoization legger React Compiler til?

React Compilers automatiske memoization er primært fokusert på å forbedre
oppdateringsytelse (re-rendering av eksisterende komponenter), så den fokuserer
på disse to bruksområdene:

#### 1. Hoppe over kaskaderende re-rendering av komponenter

Re-rendering `<Parent />` forårsaker at mange komponenter i komponenttreet
re-renderer, selv om bare `<Parent />` har endret seg.

**Eksempel:**

```tsx
function FriendList({ friends }) {
  const onlineCount = useFriendOnlineCount()

  if (friends.length === 0) {
    return <NoFriends />
  }

  return (
    <div>
      <span>{onlineCount} online</span>
      {friends.map(friend => (
        <FriendListCard key={friend.id} friend={friend} />
      ))}
      <MessageButton />
    </div>
  )
}
```

React Compiler bestemmer automatisk at returverdien til `<FriendListCard />` kan
gjenbrukes selv når `friends` endres, og kan unngå å gjenskape denne JSX-en og
unngå å re-rendere `<MessageButton>` når tellingen endres.

#### 2. Hoppe over dyre beregninger utenfor React

For eksempel å kalle `expensivelyProcessAReallyLargeArrayOfObjects()` inne i
komponenten eller hook-en din som trenger disse dataene.

**Eksempel:**

```tsx
// IKKE memoized av React Compiler, siden dette ikke er en komponent eller hook
function expensivelyProcessAReallyLargeArrayOfObjects() {
  /* ... */
}

// Memoized av React Compiler siden dette er en komponent
function TableContainer({ items }) {
  // Dette funksjonskallet ville bli memoized:
  const data = expensivelyProcessAReallyLargeArrayOfObjects(items)
  // ...
}
```

### Viktige begrensninger

Hvis `expensivelyProcessAReallyLargeArrayOfObjects` virkelig er en dyr funksjon,
kan det være lurt å vurdere å implementere sin egen memoization utenfor React,
fordi:

- **React Compiler memoizer kun React-komponenter og hooks**, ikke alle
  funksjoner
- **React Compilers memoization er ikke delt** på tvers av flere komponenter
  eller hooks

Så hvis `expensivelyProcessAReallyLargeArrayOfObjects` ble brukt i mange
forskjellige komponenter, selv om de samme eksakte items ble sendt ned, ville
den dyre beregningen bli kjørt gjentatte ganger.

---

## Inkrementell innføring

React Compiler kan innføres inkrementelt, slik at du kan prøve den på spesifikke
deler av kodebasen din først.

### Hvorfor inkrementell innføring?

**Fordeler:**

- **Bygg tillit**: Test kompilatoren på små deler før utvidelse
- **Håndter Rules of React-brudd**: Løs problemer systematisk
- **A/B testing**: Mål real-world impact av optimalisering
- **Reduser risiko**: Hold migreringen håndterbar

### Tilnærminger til inkrementell innføring

| Tilnærming          | Beskrivelse                               | Beste for                                        |
| ------------------- | ----------------------------------------- | ------------------------------------------------ |
| **Babel overrides** | Bruk kompilatoren på spesifikke kataloger | Team som vil teste katalog for katalog           |
| **Opt-in modus**    | Kun kompiler komponenter med `"use memo"` | Finkornet kontroll over individuelle komponenter |
| **Runtime gating**  | Kontroller kompilering med feature flags  | A/B testing og gradvis utrulling                 |

### 1. Katalog-basert innføring med Babel Overrides

#### Grunnleggende konfigurasjon

Start ved å bruke kompilatoren på en spesifikk katalog:

```javascript
// babel.config.js
module.exports = {
  plugins: [
    // Globale plugins som gjelder alle filer
  ],
  overrides: [
    {
      test: './src/modern/**/*.{js,jsx,ts,tsx}',
      plugins: ['babel-plugin-react-compiler']
    }
  ]
}
```

#### Utvide dekning

Når du får tillit, legg til flere kataloger:

```javascript
// babel.config.js
module.exports = {
  plugins: [
    // Globale plugins
  ],
  overrides: [
    {
      test: [
        './src/modern/**/*.{js,jsx,ts,tsx}',
        './src/features/**/*.{js,jsx,ts,tsx}'
      ],
      plugins: ['babel-plugin-react-compiler']
    },
    {
      test: './src/legacy/**/*.{js,jsx,ts,tsx}',
      plugins: [
        // Forskjellige plugins for legacy kode
      ]
    }
  ]
}
```

#### Med kompilator-alternativer

Du kan også konfigurere kompilator-alternativer per override:

```javascript
// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: './src/experimental/**/*.{js,jsx,ts,tsx}',
      plugins: [
        [
          'babel-plugin-react-compiler',
          {
            // alternativer for eksperimentell kode
          }
        ]
      ]
    },
    {
      test: './src/production/**/*.{js,jsx,ts,tsx}',
      plugins: [
        [
          'babel-plugin-react-compiler',
          {
            // alternativer for produksjonskode
          }
        ]
      ]
    }
  ]
}
```

### 2. Opt-in modus med "use memo"

For maksimal kontroll kan du bruke `compilationMode: 'annotation'` for kun å
kompilere komponenter og hooks som eksplisitt opt-er inn med
`"use memo"`-direktivet.

#### Annotation Mode-konfigurasjon

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        compilationMode: 'annotation'
      }
    ]
  ]
}
```

#### Bruke direktivet

Legg til `"use memo"` i begynnelsen av funksjoner du vil kompilere:

```tsx
function TodoList({ todos }) {
  'use memo' // Opt denne komponenten inn i kompilering

  const sortedTodos = todos.slice().sort()

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

function useSortedData(data) {
  'use memo' // Opt denne hook-en inn i kompilering

  return data.slice().sort()
}
```

#### Krav for annotation mode

Med `compilationMode: 'annotation'` må du:

- Legge til `"use memo"` til hver komponent du vil optimalisere
- Legge til `"use memo"` til hver custom hook
- Huske å legge det til nye komponenter

### 3. Runtime Feature Flags med Gating

`gating`-alternativet lar deg kontrollere kompilering ved runtime ved å bruke
feature flags.

#### Hvordan gating fungerer

Kompilatoren pakker optimalisert kode i en runtime-sjekk. Hvis gate returnerer
`true`, kjører den optimaliserte versjonen. Ellers kjører den originale koden.

#### Gating-konfigurasjon

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'babel-plugin-react-compiler',
      {
        gating: {
          source: 'ReactCompilerFeatureFlags',
          importSpecifierName: 'isCompilerEnabled'
        }
      }
    ]
  ]
}
```

#### Implementere feature flag

Lag en modul som eksporterer gating-funksjonen din:

```typescript
// ReactCompilerFeatureFlags.ts
export function isCompilerEnabled(): boolean {
  // Bruk feature flag-systemet ditt
  return getFeatureFlag('react-compiler-enabled')
}

// Eksempel med miljøvariabler
export function isCompilerEnabled(): boolean {
  return (
    process.env.NODE_ENV === 'development'
    || process.env.REACT_COMPILER_ENABLED === 'true'
  )
}

// Eksempel med A/B testing
export function isCompilerEnabled(): boolean {
  return experimentService.isInVariant('react-compiler-experiment')
}
```

---

## Feilsøking og beste praksis

### Vanlige problemer og løsninger

#### 1. Rules of React-brudd

Hvis du støter på problemer under innføring:

```tsx
// Bruk "use no memo" for å midlertidig ekskludere problematiske komponenter
function ProblematicComponent() {
  'use no memo' // Ekskluder fra kompilering

  // Kode som bryter Rules of React
  // ...existing code...
}
```

#### 2. useMemo, useCallback, og React.memo

**Spørsmål**: Hva skal jeg gjøre med eksisterende manuell memoization?

**Svar**: React Compiler legger til automatisk memoization mer presist og
granulært enn det som er mulig med `useMemo`, `useCallback`, og `React.memo`.

**Kompilatorens oppførsel:**

- Analyserer eksisterende manuell memoization
- Sammenligner med automatisk utledet memoization
- Hvis det ikke er samsvar, velger kompilatoren å **bail out** av optimalisering
  av den komponenten

**Hvorfor bail out?** Dette gjøres av forsiktighet siden et vanlig anti-mønster
med manuell memoization er å bruke den for korrekthet. Dette betyr at appen din
er avhengig av at spesifikke verdier blir memoized for å fungere ordentlig.

**Eksempel på problematisk mønster:**

```tsx
function Component() {
  const memoizedValue = useMemo(() => ({ id: Math.random() }), [])

  useEffect(() => {
    // Infinite loop uten memoization
    doSomething(memoizedValue)
  }, [memoizedValue])
}
```

### Anbefalte handlinger

1. **Fjern manuell memoization gradvis** og verifiser at appen fortsatt fungerer
   som forventet
2. **Sjekk debugging-guiden** for vanlige problemer
3. **Fiks Rules of React-brudd** identifisert av ESLint-plugin
4. **Vurder `compilationMode: 'annotation'`** for mer gradvis innføring

### Kompatibilitet og støtte

#### React-versjonskompatibilitet

- **React 17**: ✅ Støttet
- **React 18**: ✅ Støttet
- **React 19**: ✅ Støttet

#### Byggeverkøy-støtte

| Verktøy     | Status         | Merknader             |
| ----------- | -------------- | --------------------- |
| **Babel**   | ✅ Full støtte | Primær implementasjon |
| **Vite**    | ✅ Full støtte | Via Babel-plugin      |
| **Metro**   | ✅ Full støtte | React Native          |
| **Rsbuild** | ✅ Full støtte | Modern bundler        |
| **Next.js** | ✅ Full støtte | v15.3.1+ med swc      |

#### Fremtidige planer

React Compiler er primært en lett Babel-plugin-wrapper rundt
kjerne-kompilatoren. Mens den innledende stabile versjonen vil forbli primært en
Babel-plugin, arbeider teamet med swc og oxc-teamene for å bygge førsteklasses
støtte, slik at du ikke trenger å legge Babel tilbake til bygge-pipeline-ene
dine i fremtiden.

### Anbefaling for bruk

#### Bør jeg prøve kompilatoren?

**Ja!** Vi oppfordrer alle til å begynne å bruke React Compiler. Mens
kompilatoren fortsatt er et valgfritt tillegg til React i dag, kan noen
funksjoner i fremtiden kreve kompilatoren for å fungere fullt ut.

#### Er det trygt å bruke?

React Compiler er nå i RC og har blitt testet omfattende i produksjon. Mens den
har blitt brukt i produksjon hos selskaper som Meta, vil utrulling av
kompilatoren til produksjon for appen din avhenge av helsen til kodebasen din og
hvor godt du har fulgt Rules of React.

---

## Sammendrag

React Compiler representerer et paradigmeskifte i React-optimalisering:

### Hovedfordeler

- **Automatisk optimalisering**: Eliminerer manuell memoization
- **Redusert kompleksitet**: Mindre boilerplate-kode å vedlikeholde
- **Fewer bugs**: Unngår vanlige fallgruver med manuell memoization
- **Bedre ytelse**: Mer presis og granulær optimalisering

### Innføringsstrategier

1. **Start små**: Bruk Babel overrides for spesifikke kataloger
2. **Opt-in tilnærming**: Bruk `"use memo"` for finkornet kontroll
3. **Feature flags**: Bruk runtime gating for A/B testing
4. **Gradvis utvidelse**: Bygg tillit gjennom inkrementell innføring

### Fremtidsretning

React Compiler er designet for å bli en integrert del av
React-utviklingsopplevelsen, med mål om å gjøre manuell optimalisering til en
ting av fortiden. Ved å følge denne guiden kan du trygt innføre kompilatoren og
høste fordelene av automatisk optimalisering.
