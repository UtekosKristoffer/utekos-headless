# Feilhåndtering (Error Handling)

I denne artikkelen fortsetter vi med kapittel 7, som handler om feilhåndtering.

> **Merk:** Alle kodeeksempler er konvertert til JavaScript/TypeScript, slik at de følger beste praksis for moderne JavaScript-utvikling. Se egen merknad nederst om enkelte forskjeller mellom Swift og JavaScript.

---

## Hva er feilhåndtering?

Feilhåndtering er prosessen med å respondere på og hente seg inn fra feil i programmet ditt. I JavaScript (og TypeScript) støttes feilhåndtering gjennom `throw`, `try`, `catch`, og muligheten til å propagere og håndtere feil eksplisitt på ulike nivåer i koden.

### Hva er en feil?

En feil er en tilstand som hindrer programmet ditt i å kjøre som forventet. Feil kan skyldes mange faktorer:

- Feil i brukerinput
- Nettverksfeil
- Filsystemfeil
- Databasefeil
- Programmeringsfeil

---

## 1. Propagere feilen (Videresende feil)

Du kan propagere feilen til koden som kaller funksjonen din ved å `throw`e en feil. Koden som kaller funksjonen er da ansvarlig for å håndtere feilen.

```typescript
// Definer en egendefinert feiltype
class DivideByZeroError extends Error {
  constructor() {
    super('Divisoren kan ikke være null.')
    this.name = 'DivideByZeroError'
  }
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new DivideByZeroError()
  }
  return a / b
}

try {
  const result = divide(10, 5)
  console.log('Resultatet er', result)
} catch (error) {
  console.error('En feil oppstod:', error)
}
```

---

## 2. Håndtere feilen med try-catch-setning

Du kan bruke en `try-catch`-setning for å håndtere feilen og fortsette kjøringen av koden din.

```typescript
try {
  // Kode som kan kaste en feil
} catch (error) {
  // Håndter feilen her
}
```

Koden inne i `try`-blokken kjøres normalt. Hvis en feil oppstår, avbrytes kjøringen i `try`-blokken, og koden i `catch`-blokken utføres.

---

## 3. Håndtere feilen som en valgfri verdi (optional)

I JavaScript/TypeScript finnes ikke "optional" på samme måte som i Swift, men du kan bruke `try-catch` med funksjoner som returnerer `undefined` eller `null` ved feil.

```typescript
function safeDivide(a: number, b: number): number | undefined {
  try {
    return divide(a, b)
  } catch {
    return undefined
  }
}

const result = safeDivide(10, 5)

if (result !== undefined) {
  console.log('Resultatet er', result)
} else {
  console.log('En feil oppstod.')
}
```

---

## 4. Forsikre om at feilen ikke vil oppstå

Du kan bruke en eksplisitt sjekk (`if`) eller en `try { ... } catch { ... }`-blokk, og eventuelt `console.assert` for å abortere hvis en antagelse brytes. **Merk:** Bruk av `try!` fra Swift tilsvarer å _ikke_ håndtere feilen — i JavaScript vil det resultere i et krasj hvis feilen kastes.

```typescript
function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message)
}

const b = 5
assert(b !== 0, 'Divisoren kan ikke være null.')

// Vil kaste feil hvis b er 0
const result = divide(10, b)
```

---

## Feilhåndtering i boken

Uncle Bob sier at feilhåndtering er viktig, men at koden fortsatt må være lesbar og forståelig.

### Retningslinjer for feilhåndtering:

### 1. Bruk unntak (Exceptions) i stedet for returkoder

Unntak gir:

- **Forbedret lesbarhet:** Koden blir mindre "boilerplate" sammenlignet med returkoder.
- **Forbedret robusthet:** Man kan ikke "glemme" å sjekke returverdier.
- **Forbedret vedlikeholdbarhet:** Legg til nye feiltyper uten å endre alle kallere.

**Beste praksis for exceptions i JS/TS:**

- Kast kun for eksepsjonelle tilfeller, ikke normal kontrollflyt.
- Vær spesifikk når du kaster unntak (bruk egne feilklasser).
- Fang unntak på riktig nivå i kallstakken.

---

### 2. Skriv try-catch-logikken først

I JavaScript finnes også en `finally`-blokk som alltid kjøres, uansett om det oppstår feil eller ikke — tilsvarende `defer` i Swift.

```typescript
function processFile() {
  let file: { close: () => void; readData: () => string } | undefined
  try {
    file = openFile('file.txt')
    const data = file.readData()
    console.log('Filen ble behandlet.')
  } catch (error) {
    console.error('Feil under filbehandling:', error)
  } finally {
    if (file) {
      file.close()
      console.log('Filen ble lukket.')
    }
  }
}
```

---

### 3. Gi kontekst med unntak

Legg til informasjon i feilen, f.eks. meldinger eller verdier, gjerne med `Error`-subklasser.

```typescript
class DivideByZeroError extends Error {
  file: string
  line: number
  constructor(message: string, file: string, line: number) {
    super(message)
    this.name = 'DivideByZeroError'
    this.file = file
    this.line = line
  }
}

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new DivideByZeroError('Divisoren kan ikke være null.', 'myfile.ts', 42)
  }
  return a / b
}

try {
  divide(10, 0)
} catch (error) {
  if (error instanceof DivideByZeroError) {
    console.error(`Feil i filen ${error.file} på linje ${error.line}: ${error.message}`)
  } else {
    console.error('Ukjent feil:', error)
  }
}
```

---

### 4. Ikke returner null/undefined ved feil

Bruk `throw` for feiltilstander. Bruk `null`/`undefined` kun for "ikke funnet", ikke for feil.

```typescript
class UserError extends Error {}

function getUserBad(id: number): User | null {
  if (id < 0) return null // Dårlig praksis
  // ...
  return { id, name: 'test' }
}

function getUserGood(id: number): User {
  if (id < 0) throw new UserError('User not found')
  // ...
  return { id, name: 'test' }
}
```

---

### 5. Ikke send med null/undefined som argument

Bruk valgfrihet i parameterlisten (`?`) når det er gyldig at en verdi kan mangle.

```typescript
function findUsers(name?: string) {
  if (name) {
    console.log(`Søker etter brukere med navnet ${name}...`)
  } else {
    console.log('Henter alle brukere...')
  }
}

findUsers('Kristoffer') // Kjører den ene logikken
findUsers() // Kjører den andre
```

---

## Oppsummering

- Bruk exceptions for feil, ikke returkoder eller null/undefined.
- Skriv try-catch først, og bruk `finally` for opprydding.
- Gi kontekst i unntak (melding, verdier, evt. stack trace).
- Bruk throw for feil, aldri null/undefined.
- Bruk valgfrihet i parameterlisten i stedet for å sende inn null/undefined.

---

## Merknad om konvertering fra Swift til JavaScript/TypeScript

- Alle Swift-eksempler er oversatt til idiomatisk JavaScript/TypeScript og tilpasset språklige konvensjoner.
- Det er ingen "optional" eller "try?" i JavaScript/TypeScript, men tilsvarende effekt kan oppnås med funksjoner som returnerer `undefined` eller med eksplisitt try-catch.
- JavaScript har `finally` i try-catch, som tilsvarer Swifts `defer`.
- Exception-klassene (`Error`) kan utvides for å legge til ekstra kontekst, selv om det ikke er vanlig å legge inn fil/linje eksplisitt (men det kan gjøres).
- Hvis du ønsker eksempler på hvordan du håndterer asynkrone feil (med async/await), kan det også vises.

Alle eksempler er gyldige JavaScript/TypeScript og følger beste praksis for moderne utvikling.

```typescript
// Type-eksempel for User:
type User = { id: number; name: string }
```
