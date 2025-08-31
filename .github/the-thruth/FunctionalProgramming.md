# Funksjonell programmering i JavaScript

Å praktisere funksjonell programmering i JavaScript innebærer å ta i bruk et paradigme som vektlegger bruken av **rene funksjoner**, **uforanderlighet (immutabilitet)** og **deklarativ programmering** – fremfor en imperativ tilnærming.

---

## Sentrale prinsipper og praksiser

### Rene funksjoner (Pure Functions)

- **Definisjon:** Funksjoner skal være deterministiske, altså alltid produsere samme resultat for samme input.
- **Ingen sideeffekter:** De skal ikke endre ekstern tilstand eller utføre I/O-operasjoner.
- **Eksempler:** Matematiske utregninger, datatransformasjoner som returnerer nye datastrukturer.

---

### Uforanderlighet (Immutability)

- **Ingen direkte endring:** Data skal ikke endres direkte etter at de er opprettet. Operasjoner på data returnerer nye, modifiserte kopier.
- **Bruk `const`:** For variabler der det er mulig, for å forhindre re-tildeling.
- **Arrays og objekter:** Bruk metoder som `map()`, `filter()`, `reduce()`, `slice()` eller spread-syntaks (`...`) for å skape nye instanser i stedet for å endre de eksisterende.

---

### Høyere-ordens funksjoner (Higher-Order Functions)

- **Definisjon:** Funksjoner som tar andre funksjoner som argumenter eller returnerer funksjoner som sitt resultat.
- **Eksempler:** `map()`, `filter()`, `reduce()`, `forEach()`, `sort()`.  
  Disse brukes ofte for å manipulere arrays i en funksjonell stil.

---

### Funksjonskomposisjon (Function Composition)

- **Kombiner funksjoner:** Å kombinere flere rene funksjoner for å skape mer komplekse operasjoner.
- **Kjede operasjoner:** Resultatet fra én funksjon blir input til den neste.

---

### Currying

- **Definisjon:** Transformere en funksjon som tar flere argumenter om til en sekvens av funksjoner, der hver tar ett enkelt argument.
- **Fordel:** Forbedrer gjenbrukbarhet og komposisjon av funksjoner.

---

### Unngå delt, foranderlig tilstand (Avoiding Shared Mutable State)

- **Unngå globale variabler:** Minimer bruken av globale variabler eller delte objekter som kan endres av ulike deler av applikasjonen.
- **Fordel:** Dette reduserer risikoen for feil og gjør koden lettere å resonnere rundt og teste.

---

## Praktiske eksempler

### Datatransformasjon

I stedet for å bruke en for-løkke for å endre et array direkte, bruk `map()` for å lage et nytt array med transformerte elementer.

```javascript
// Imperativ stil
let numbers = [1, 2, 3]
for (let i = 0; i < numbers.length; i++) {
  numbers[i] *= 2
}

// Funksjonell stil
const originalNumbers = [1, 2, 3]
const doubledNumbers = originalNumbers.map(num => num * 2)
```

---

### Filtrering av data

Bruk `filter()` for å lage et nytt array som kun inneholder elementer som oppfyller en bestemt betingelse.

```javascript
const products = [
  { name: 'A', price: 10 },
  { name: 'B', price: 25 }
]
const affordableProducts = products.filter(product => product.price < 20)
```

---

### Aggregering av data

Bruk `reduce()` for å kombinere elementene i et array til én enkelt verdi.

```javascript
const prices = [10, 20, 30]
const totalPrice = prices.reduce((sum, price) => sum + price, 0)
```

---

## Oppsummering

Ved å konsekvent anvende disse prinsippene og benytte seg av JavaScripts innebygde funksjonelle egenskaper, kan utviklere skrive kode som er mer forutsigbar, testbar og vedlikeholdbar.
