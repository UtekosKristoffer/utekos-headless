# Incremental Adoption av React Compiler

React Compiler kan tas i bruk gradvis, slik at du kan teste den på utvalgte deler av kodebasen først. Denne guiden viser hvordan du ruller ut kompilatoren stegvis i eksisterende prosjekter.

## Du vil lære

- Hvorfor inkrementell adopsjon anbefales
- Hvordan bruke Babel overrides for katalogbasert adopsjon
- Hvordan bruke `use memo`-direktivet for opt-in kompilering
- Hvordan bruke `use no memo`-direktivet for å ekskludere komponenter
- Runtime feature flags med gating
- Hvordan overvåke adopsjonsprogresjon

---

## Hvorfor inkrementell adopsjon?

React Compiler er laget for å optimalisere hele kodebasen automatisk, men du trenger ikke ta den i bruk overalt med én gang. Inkrementell adopsjon gir deg kontroll over utrullingen, slik at du kan teste kompilatoren på små deler av appen før du utvider til resten.

Ved å starte i det små bygger du tillit til kompilatorens optimaliseringer. Du kan verifisere at appen oppfører seg korrekt med kompilert kode, måle ytelsesforbedringer og identifisere eventuelle edge cases i din kodebase. Dette er spesielt verdifullt for produksjonsapplikasjoner hvor stabilitet er kritisk.

Inkrementell adopsjon gjør det også enklere å håndtere eventuelle "Rules of React"-brudd kompilatoren finner. I stedet for å fikse brudd over hele kodebasen samtidig, kan du ta dem systematisk etter hvert som du utvider kompilatordekningen. Dette gjør migreringen håndterbar og reduserer risikoen for feil.

Ved å kontrollere hvilke deler av koden som kompileres, kan du også kjøre A/B-tester for å måle den faktiske effekten av kompilatorens optimaliseringer. Disse dataene hjelper deg å ta informerte valg om full adopsjon og demonstrere verdien for teamet.

---

## Tilnærminger til inkrementell adopsjon

Det finnes tre hovedmetoder for å ta i bruk React Compiler gradvis:

1. **Babel overrides** – Aktiver kompilatoren for utvalgte kataloger
2. **Opt-in med `use memo`** – Kompiler kun komponenter som eksplisitt velger det
3. **Runtime gating** – Kontroller kompilering med feature flags

Alle metodene lar deg teste kompilatoren på spesifikke deler av applikasjonen før full utrulling.

---

## Katalogbasert adopsjon med Babel overrides

Babels `overrides`-opsjon lar deg bruke ulike plugins på ulike deler av kodebasen. Dette er ideelt for gradvis adopsjon av React Compiler, katalog for katalog.

### Grunnleggende konfigurasjon

Start med å aktivere kompilatoren for én katalog:

```js
// babel.config.js
module.exports = {
  plugins: [
    // Globale plugins som gjelder for alle filer
  ],
  overrides: [
    {
      test: './src/modern/**/*.{js,jsx,ts,tsx}',
      plugins: [
        'babel-plugin-react-compiler'
      ]
    }
  ]
};
```

### Utvid dekningen

Når du blir trygg, legg til flere kataloger:

```js
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
      plugins: [
        'babel-plugin-react-compiler'
      ]
    },
    {
      test: './src/legacy/**/*.{js,jsx,ts,tsx}',
      plugins: [
        // Andre plugins for legacy-kode
      ]
    }
  ]
};
```

### Med kompilator-opsjoner

Du kan også konfigurere kompilatoropsjoner per override:

```js
// babel.config.js
module.exports = {
  plugins: [],
  overrides: [
    {
      test: './src/experimental/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    },
    {
      test: './src/production/**/*.{js,jsx,ts,tsx}',
      plugins: [
        ['babel-plugin-react-compiler', {
          // options ...
        }]
      ]
    }
  ]
};
```

---

## Opt-in-modus med `use memo`

For maksimal kontroll kan du bruke `compilationMode: 'annotation'` slik at kun komponenter og hooks som eksplisitt velger det med `use memo`-direktivet kompileres.

> **Merk:** Denne tilnærmingen gir deg detaljert kontroll over individuelle komponenter og hooks. Den er nyttig når du vil teste kompilatoren på utvalgte komponenter uten å påvirke hele kataloger.

### Annotation-modus konfigurasjon

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      compilationMode: 'annotation',
    }],
  ],
};
```

### Bruk av direktivet

Legg til `"use memo"` øverst i funksjoner du vil kompilere:

```js
function TodoList({ todos }) {
  "use memo"; // Opt denne komponenten inn i kompilering

  const sortedTodos = todos.slice().sort();

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function useSortedData(data) {
  "use memo"; // Opt denne hooken inn i kompilering

  return data.slice().sort();
}
```

Med `compilationMode: 'annotation'` må du:

- Legge til `"use memo"` i hver komponent du vil optimalisere
- Legge til `"use memo"` i hver custom hook
- Huske å legge det til i nye komponenter

Dette gir deg presis kontroll over hvilke komponenter som kompileres mens du evaluerer kompilatorens effekt.

---

## Runtime feature flags med gating

`gating`-opsjonen lar deg kontrollere kompilering ved runtime med feature flags. Dette er nyttig for A/B-testing eller gradvis utrulling basert på brukersegmenter.

### Hvordan gating fungerer

Kompilatoren wrapper optimalisert kode i en runtime-sjekk. Hvis gate-funksjonen returnerer `true`, kjøres den optimaliserte versjonen. Ellers kjøres original kode.

### Gating-konfigurasjon

```js
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      gating: {
        source: 'ReactCompilerFeatureFlags',
        importSpecifierName: 'isCompilerEnabled',
      },
    }],
  ],
};
```

### Implementering av feature flag

Lag et modul som eksporterer gating-funksjonen:

```js
// ReactCompilerFeatureFlags.js
export function isCompilerEnabled() {
  // Bruk ditt feature flag-system
  return getFeatureFlag('react-compiler-enabled');
}
```

---

## Feilsøking ved adopsjon

Hvis du støter på problemer under adopsjon:

- Bruk `"use no memo"` for midlertidig å ekskludere problematiske komponenter
- Sjekk debugging-guiden for vanlige problemer
- Fiks "Rules of React"-brudd identifisert av ESLint-plugin
- Vurder å bruke `compilationMode: 'annotation'` for mer gradvis adopsjon

