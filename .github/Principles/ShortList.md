# Principles of Clean Code

## Meningsfulle navn

Variabler, funksjoner og klasser skal ha beskrivende navn som tydelig kommuniserer deres hensikt. Unngå generiske navn som `temp` eller `data` med mindre det er absolutt nødvendig.

## Små funksjoner

Del opp funksjoner i små, gjenbrukbare komponenter. Hver funksjon skal utføre én oppgave, noe som gjør dem enkle å teste og feilsøke.

## Konsistent formatering

Følg en konsekvent kodestil. Bruk linters og formateringsverktøy som ESLint eller Prettier for å sikre standarder.

## Kommenter når nødvendig

Skriv kun kommentarer når koden ikke tydelig forklarer hensikten selv. For mye kommentering kan rote til kodebasen.

## Unngå duplisering

Følg DRY-prinsippet ("Don’t Repeat Yourself"). Gjenbruk kode der det er mulig for å unngå redundans og redusere vedlikehold.

## Feilhåndtering

Implementer robust feilhåndtering slik at koden din tåler kanttilfeller og feil. Forutse alltid mulige feil og unntak.

---

## Eksempler fra virkeligheten

### Eksempel 1: Rotete vs. ren kode

**Rotete kode**

```js
function d(x, y) {
  if (x > y) {
    return x - y
  } else {
    return y - x
  }
}
```

**Ren kode**

```js
function calculateDifference(a, b) {
  return Math.abs(a - b)
}
```

Den rene versjonen er kortere, selvforklarende, og benytter innebygde funksjoner.

---

### Eksempel 2: API-forespørsel

**Rotete kode**

```js
function fetchData() {
  fetch('https://api.example.com/data')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error fetching data')
      }
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
}
```

**Ren kode**

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    if (!response.ok) throw new Error('Error fetching data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Den rene versjonen bruker async/await for bedre lesbarhet og håndterer feil på en elegant måte.

---

### Eksempel 3: Komponentstruktur i React

**Rotete kode**

```jsx
function UserProfile(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.email}</p>
    </div>
  )
}
```

**Ren kode**

```jsx
function UserProfile({ name, email }) {
  return (
    <div className='user-profile'>
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  )
}
```

Den rene versjonen destrukturerer props, bruker semantisk klassenavn, og øker klarheten.

---

## Verktøy for å skrive ren kode

- **Linters:** ESLint, Pylint, RuboCop
- **Kodeformatering:** Prettier, Black
- **Versjonskontroll:** Git for å spore endringer og sikre samarbeid
- **Statisk analyse:** SonarQube, Codacy

---

## Hvordan opprettholde kodehygiene

- **Kodegjennomganger:** Regelmessige reviews fanger opp problemer tidlig og fremmer ansvarlighet.
- **Refaktorering:** Forbedre kontinuerlig strukturen på eksisterende kode uten å endre funksjonalitet.
- **Automatisert testing:** Skriv enhetstester for å sikre pålitelighet og fange opp feil raskt.
- **Dokumentasjon:** Vedlikehold oppdatert dokumentasjon for onboarding og kunnskapsdeling.

---

## Konklusjon

Ren kode er ikke bare en beste praksis – det er en tankegang. Det speiler profesjonalitet, evne til å se fremover, og et ønske om kvalitet. Uansett om du jobber alene eller i team, legger ren kode grunnlaget for suksess. Ved å prioritere lesbarhet, enkelhet og vedlikeholdbarhet lager du programvare som varer – og bevarer din egen (og teamets) fornuft.

> Hvilke clean code-prinsipper setter du høyest? Del gjerne i kommentarfeltet!
