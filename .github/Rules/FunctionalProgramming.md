# Practical Functional Programming with Javascript

# Introduksjon til funksjonell programmering

Funksjonell programmering kan høres skremmende, teoretisk eller unødvendig komplisert ut (og for noen er det kanskje alt dette).  
Jeg mener at de grunnleggende prinsippene faktisk er enkle å forklare – og samtidig utrolig kraftfulle for å skape ren kode.

## Hva er egentlig disse “mystiske” kjernekonseptene?

Hvis du lurer på det, har du kommet til rett sted!

La oss starte med et avsnitt fra kilden til all sannhet (aka Wikipedia):

> “Funksjonell programmering er et programmeringsparadigme — en stil for å bygge opp strukturen og elementene i dataprogrammer — som behandler beregning som evaluering av matematiske funksjoner og unngår endring av tilstand og muterbare data. Det er et deklarativt programmeringsparadigme, noe som betyr at programmering skjer med uttrykk eller deklarasjoner i stedet for instruksjoner. I funksjonell kode avhenger returverdien til en funksjon kun av argumentene som sendes inn til funksjonen, slik at det å kalle en funksjon f to ganger med samme verdi x alltid gir samme resultat f(x) hver gang …”

Dette leder oss til kjernen i funksjonell programmering:

- **Uforanderlige data** (immutable data)
- **Rene funksjoner** (pure functions)
- **Deklarativ stil** – gjerne ved hjelp av funksjonskomposisjon

---

Nå som vi har kjernekonseptene, kan vi se nærmere på hver av dem (med eksempler fra hverdags-JS), og til slutt forstå hvordan de henger sammen og hjelper oss å skrive betydelig bedre kode.

# Uforanderlig (Immutable) Data

En uforanderlig variabel er en som ikke kan endres etter initialisering, eller sagt på en annen måte: den kan bare tildeles en verdi én gang.

La oss se på noen eksempler:

```javascript
// Foranderlig (mutable)
let num = 8 // kan re-tildeles, num = 9
const arr = [1, 2] // kan mutere arrayet, arr.push(3)
const user = { id: 1, name: 'x' } // kan mutere objektet, user.id = 2

// Uforanderlig (immutable)
const num = 8
Immutable.List.of(1, 2) // ved bruk av ImmutableJS
const user = Object.freeze({ id: 1, name: 'x' })
```

---

## Hvorfor er dette en del av funksjonell programmering?

Fordi funksjonell programmering har et matematisk fundament!

I matematikk kan du ikke skrive følgende uttrykk: `x = x + 5`, fordi det er det samme som å skrive `0 = 5`. I motsetning til andre programmeringsparadigmer, er funksjonelle programmeringsmønstre matematisk bevist å være korrekte (du må bare tro meg, jeg skal ikke prøve å bevise det), og en av forutsetningene for at matematikken skal fungere, er enkelttildeling (single assignment).

---

## Men hva får jeg ut av det?

Vurder følgende kode:

```javascript
let object = {}
doSomethingToObject(object) // muterer sannsynligvis objektet
let data = await getData(object) // muterer muligens objektet
let extras = await getAdditionalData(data) // muterer muligens data
someCalculation(object, data, extras) // muterer alle? bare objektet?

console.log(object) // hvem vet hva som vil være her
```

Kan du raskt si hva verdien av `object` er på et gitt tidspunkt?

Kan du teste hver del av logikken for seg selv?

Mutasjon er veldig vanskelig å følge når man leser kode, spesielt hvis det muterte objektet har mange attributter og blir sendt mye rundt.

---

## Fordelene med å unngå datamutasjon

- **Lettere å lese**
- **Lettere å teste og feilsøke**

Her er et utmerket sitat om hvorfor lesbar og feilsøkbar kode er essensielt:

> “Forholdet mellom tid brukt på å lese versus å skrive er godt over 10 til 1. Vi leser konstant gammel kode som en del av arbeidet med å skrive ny kode. …[Derfor] gjør det å gjøre koden lett å lese, den lettere å skrive.”  
> – Uncle Bob

---

# Rene Funksjoner (Pure Functions)

En ren funksjon følger to regler:

1. Returverdien er den samme for de samme argumentene.
2. Den har ingen sideeffekter.

Her er noen eksempler:

```javascript
const add = (a, b) => a + b; // ren

array.forEach(...) // uren (ingen returverdi)
const incrementAge = prsn => prsn.setAge(prsn.getAge() + 1); // uren (muterer prsn)
const move = (cur) => cur.copy(x = cur.x + Math.random()); // uren (Math.random() er ikke deterministisk)
```

---

## Referensiell Transparens

En annen måte å forstå styrken til rene funksjoner på er med prinsippet om referensiell transparens:

Hvis en funksjon er ren, skal vi kunne erstatte den med returverdien.

```javascript
// Ren funksjon
const add = (a, b) => a + b

// Dette:
const calculation = add(3, 4)

// kan erstattes med dette:
const calculation = 7

// ...uten at noe i applikasjonen endrer seg.
```

Så, når du er usikker på om en funksjon er ren, spør deg selv: Kan jeg erstatte den med resultatet uten at det endrer oppførselen?

---

## Fordeler med rene funksjoner

- Lette å teste
- Lette å feilsøke
- Fører vanligvis til mindre funksjoner med ett enkelt ansvarsområde
- Lette å komponere (sette sammen, vil bli forklart senere)

---

# Urene funksjoner

La oss anta at du er overbevist om at rene funksjoner er kjempebra, og du vil skrive alt ved hjelp av dem. Men kan vi det?

La oss se på noen vanlige urene funksjoner:

- Hente data fra et API-kall
- Skrive til `console.log()`
- Mutere global tilstand
- Hente gjeldende systemtid (f.eks. ved hjelp av moment())

---

## Så kan vi kun bruke rene funksjoner?

Nei 😢

Urene funksjoner er dessverre nødvendige for å lage produksjonsklare applikasjoner. Når vi skriver funksjonell kode, vil vi prøve å begrense urenheten til spesifikke oppgaver på et bestemt sted, og de bør inneholde så lite logikk som mulig.

Et godt eksempel på å håndtere urenhet på en god måte er Redux – rammeverket håndterer alle sideeffektene som påvirker hoved-«store»-en, mens logikken består av rene funksjoner (f.eks. «reducers» som returnerer en ny tilstand).

---

# Deklarativ kode og funksjonell programmering

Deklarativ kode fokuserer på _hva_ vi prøver å gjøre, ikke _hvordan_ vi gjør det. Imperativ kode beskriver både hva og hvordan.

Funksjonell programmering er ikke den eneste måten å skrive deklarativ kode på. Se dette SQL-eksemplet:

```sql
SELECT *
FROM orders
JOIN products
ON orders.productId = products.productId
WHERE products.productName = 'Holy grail'
LIMIT 10;
```

Her forteller vi databasen _hva_ vi vil ha, ikke _hvordan_ den skal hente, samkjøre, og begrense resultatene.

> **Tips:** Du vet at du skriver deklarativ kode når det å lese den og å forklare hva den gjør, er nesten identisk.

---

## Et deklarativt, funksjonelt eksempel

La oss si vi skal skrive en funksjon som henter produkter fra et API og finner de 10 mestselgende produktene som er leker. For enkelhet antar vi at et leketøy er et produkt der navnet inneholder `toy` eller `play`.

---

### Imperativ tilnærming

```javascript
function getTopSellingToys(products) {
  const topToys = []
  const limit = 10

  if (products.length === 0) {
    return topToys
  }

  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    if (product.name) {
      const name = product.name.toLowerCase()
      if (name.includes('toy') || name.includes('play')) {
        // Her måtte man hatt en kompleks logikk for å holde listen sortert
        // og begrenset til 10 elementer, noe som gjør koden enda mer imperativ.
        // For enkelhets skyld legger vi bare til produktet.
        topToys.push(product)
      }
    }
  }
  // Her måtte man sortert og kuttet listen til 10 elementer.
  return topToys
}
```

---

### Deklarativ tilnærming

```javascript
function getTopSellingToys(products) {
  return products
    .filter(product => product.name !== null)
    .map(product => ({ ...product, lowerCaseName: product.name.toLowerCase() }))
    .filter(product => product.lowerCaseName.includes('toy') || product.lowerCaseName.includes('play'))
    .sort((a, b) => b.purchasesCount - a.purchasesCount) // Sorterer synkende
    .slice(0, 10)
}
```

---

### Enda mer deklarativt og funksjonelt

```javascript
// Hjelpefunksjoner for klarere intensjon
const isToy = product => product.name && (product.name.toLowerCase().includes('toy') || product.name.toLowerCase().includes('play'))
const compareByPurchaseCount = (a, b) => b.purchasesCount - a.purchasesCount

function getTopSellingToys(products) {
  return products.filter(isToy).sort(compareByPurchaseCount).slice(0, 10)
}
```

#### Hva ser vi her?

- Mye mindre kode
- Fokus på _hva_ vi gjør
- Klar separasjon av ansvar (filtrering, sortering, begrensning)
- Koden er mer robust og lettere å endre

---

## Separasjon av ansvar gir skalerbar kode

Separasjon av ansvar gjør det enkelt å endre forretningslogikk uten å måtte endre hele funksjonen. Du kan for eksempel bytte ut `isToy` med en annen filtreringsfunksjon, eller endre sorteringen, helt isolert.

---

## Hva om jeg ikke har et array?

Array-metoden her er valgt fordi den gir oss `.filter()`, `.map()`, `.sort()`, osv., og lar oss "chainer" funksjoner sammen. Men det finnes mange andre måter å komponere funksjoner på i JavaScript:

- **Promise-chaining:**
  ```js
  getPromise().then(...).then(...).catch(...)
  ```
- **Compose:**
  ```js
  const composed = _.compose(foo, bar, baz)
  ```
- **Pipeline-operator:**
  ```js
  5 |> double |> double |> increment |> double
  ```
- **Høyere-ordens funksjoner:**  
  Funksjoner som tar funksjoner som input eller returnerer funksjoner.

---

## Kjernen i funksjonell programmering

Ideen er den samme: Vi bruker _rene_ funksjoner som byggeklosser. Disse settes sammen for å uttrykke applikasjonslogikken, og gir deklarativ, testbar og robust kode.

---

> **Oppsummering:**
>
> - Deklarativ kode beskriver _hva_ som skal skje, ikke _hvordan_.
> - Funksjonell programmering lar oss bygge deklarativ, lettlest og robust kode ved å komponere små, rene funksjoner.
> - Separasjon av ansvar og komposisjon av funksjoner gir kode som er enkel å endre, teste og forstå.
