# Ren Kode-01: Funksjoner bør gjøre nøyaktig én ting!

Ved å følge dette ene prinsippet for ren kode, vil du skrive kode som er mer vedlikeholdbar, lesbar, testbar og konsis.

I programvareutviklingens verden er ren kode ikke bare "kjekt å ha" – det er essensielt for å bygge skalerbare og vedlikeholdbare applikasjoner. Et grunnleggende prinsipp som skiller seg ut er dette:

**Funksjoner bør gjøre nøyaktig én ting.**

Denne ideen er vår hjørnestein hva gjelder programvareutvikling. I denne filen skal vi utforske Single Responsibility-prinsippet (SRP), fordelene med det, og hvordan du kan anvende det effektivt i vår kodebase, med et JavaScript-eksempel som knytter det hele sammen.

---

## Innholdsfortegnelse

1. [Introduksjon](#introduksjon)
2. [Forstå SRP](#forstå-srp)
3. [SRP i praksis: Et JavaScript-eksempel](#srp-i-praksis-et-javascript-eksempel)
4. [Fordeler med Single Responsibility-prinsippet](#fordeler-med-single-responsibility-prinsippet)
5. [Konklusjon](#konklusjon)

---

## Introduksjon

Å skrive ren kode handler ikke bare om estetikk – det påvirker direkte teamets fremdrift, hvor enkelt det er å drive feilsøking, og den langsiktige vedlikeholdbarheten. I hjertet av denne filosofien ligger Single Responsibility-prinsippet, som sier at:

> **En funksjon bør kun ha én grunn til å endres.**

La oss bryte ned hva dette betyr og hvordan du kan anvende det.

---

## Forstå SRP

Single Responsibility-prinsippet (SRP) betyr at en funksjon skal fokusere på å gjøre én ting, og gjøre den bra. Når en funksjon påtar seg flere ansvarsområder, blir den vanskeligere å lese, teste, gjenbruke og vedlikeholde. På den annen side er små, fokuserte funksjoner enklere å forstå og feilsøke.

La oss se på et kodeeksempel for å se dette i praksis.

---

## SRP i praksis: Et JavaScript-eksempel

### Før refaktorering — Brudd på SRP

```javascript
function calculateOrderTotal(order) {
  // 1. Kalkulerer totalsum
  let total = 0
  for (const item of order.items) {
    total += item.price * item.quantity
  }

  // 2. Legger til rabatter
  if (order.customer.hasDiscount) {
    total -= total * 0.1
  }

  // 3. Oppdaterer varelager
  for (const item of order.items) {
    updateInventory(item, item.quantity)
  }

  return total
}
```

I funksjonen over gjør vi tre ting:

1. Kalkulerer den totale ordresummen
2. Legger til rabatter
3. Oppdaterer varelageret

Dette er et tydelig brudd på SRP.

---

### Etter refaktorering — SRP anvendt

```javascript
function calculateOrderTotal(order) {
  const total = calculateTotalCost(order)
  const discountedTotal = applyDiscounts(order, total)
  updateInventory(order.items)
  return discountedTotal
}

function calculateTotalCost(order) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function applyDiscounts(order, total) {
  return order.customer.hasDiscount ? total * 0.9 : total
}

function updateInventory(items) {
  for (const item of items) {
    updateItemQuantity(item, item.quantity)
  }
}

function updateItemQuantity(item, quantity) {
  // Logikk for å oppdatere vare i varelageret
}
```

Nå har hver funksjon et tydelig og enkelt ansvarsområde. Dette gjør koden din mer lesbar, testbar og vedlikeholdbar.

---

## Fordeler med Single Responsibility-prinsippet

- **Forbedret lesbarhet:**  
  Funksjoner som utfører én enkelt oppgave, er lettere å forstå. Når en funksjon gjør for mange ting, blir det vanskelig å forstå dens formål og logikk. Ved å følge SRP blir koden selvforklarende, noe som reduserer tiden og innsatsen utviklere trenger for å forstå funksjonaliteten.

- **Forbedret testbarhet:**  
  Funksjoner med ett enkelt ansvarsområde er enklere å teste. Ved å isolere en spesifikk atferd i en funksjon, kan du skrive fokuserte og målrettede tester. Dette reduserer kompleksiteten i testene og gjør det enklere å identifisere og fikse problemer når de oppstår.

- **Enklere vedlikehold:**  
  Kodebaser med funksjoner som gjør én ting, er mer vedlikeholdbare. Når en feil oppdages eller en ny funksjon skal legges til, er det mye lettere å finne den relevante funksjonen og gjøre de nødvendige endringene. I tillegg er det mindre sannsynlig at endringer i en funksjon med ett ansvarsområde introduserer utilsiktede sideeffekter eller ødelegger andre deler av kodebasen.

- **Gjenbrukbarhet:**  
  Funksjoner designet med ett enkelt ansvarsområde kan enkelt gjenbrukes i ulike deler av kodebasen. Dette fremmer kodemodularitet og eliminerer behovet for å duplisere kode. Ved å gjenbruke eksisterende funksjoner reduseres utviklingstiden, og den totale kodebasen blir mer effektiv.

---

## Konklusjon

Single Responsibility-prinsippet minner oss på at "less is more" (mindre er mer) når det gjelder funksjonsdesign. Ved å holde hver funksjon laserfokusert på én enkelt oppgave, baner du vei for renere, mer robust og vedlikeholdbar kode.

Ren kode handler ikke bare om å følge regler – det handler om å skrive programvare som fungerer i dag og som fortsatt er enkel å jobbe med i morgen.
