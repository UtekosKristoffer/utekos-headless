### 1 — Bruk Typeannotasjoner



TypeScript er et statisk typet språk, noe som betyr at det lar deg definere typer for variabler og funksjoner. Bruk av typeannotasjoner kan hjelpe med å fange feil tidlig i utviklingsprosessen og forbedre kodens lesbarhet.

Her er noen eksempler:

TypeScript

```
// Spesifiser datatypen til en variabel eksplisitt
let count: number = 0;

// Spesifiser datatypen til en funksjonsparameter og returverdi
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Spesifiser datatypen til en klasse-egenskap
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```



### 2 — Bruk Enums



Enums er en kraftig funksjon i TypeScript som lar deg definere et sett med navngitte konstanter. De kan gjøre koden mer lesbar og vedlikeholdbar, samt redusere sannsynligheten for feil forårsaket av «magiske tall».

Her er et eksempel:

TypeScript

```
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

function printColor(color: Color): void {
  console.log(`Fargen er ${color}`);
}

printColor(Color.Red); // output: Fargen er RED
```



### 3 — Bruk «Optional Chaining»



«Optional chaining» (`?.`) lar deg trygt få tilgang til nestede egenskaper og metoder uten å bekymre deg for om mellomliggende verdier er `null` eller `undefined`. Dette reduserer kjøretidsfeil og gjør koden mer robust.

Her er et eksempel:

TypeScript

```
interface Person {
  name: string;
  address?: { // address er valgfri
    street: string;
    city: string;
  };
}

const person1: Person = { name: "John", address: { street: "123 Main St", city: "Anytown" } };
const person2: Person = { name: "Jane" };

console.log(person1?.address?.city); // output: Anytown
console.log(person2?.address?.city); // output: undefined
```

Hvis en egenskap i kjeden er `undefined` eller `null`, vil uttrykket returnere `undefined` i stedet for å kaste en feil.



### 4 — Bruk «Nullish Coalescing»



«Nullish coalescing» (`??`) lar deg gi en standardverdi for en variabel eller et uttrykk når det er `null` eller `undefined`, uten å stole på «falsy» verdier (som `0` eller en tom streng `""`).

Her er et eksempel:

TypeScript

```
let value1: string | null = null;
let value2: string | undefined = undefined;
let value3: string = ""; // Ikke nullish, så ?? brukes ikke

console.log(value1 ?? "standardverdi"); // output: "standardverdi"
console.log(value2 ?? "standardverdi"); // output: "standardverdi"
console.log(value3 ?? "standardverdi"); // output: ""
```



### 5 — Bruk «Generics»



«Generics» er en kraftig funksjon som lar deg skrive gjenbrukbar kode som fungerer med forskjellige typer. De kan bidra til å redusere kodeduplisering og forbedre vedlikeholdbarheten.

Her er et eksempel:

TypeScript

```
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello"); // output: "hello" (type er string)
let output2 = identity<number>(42);      // output: 42 (type er number)
```



### 6 — Bruk «Interfaces»



«Interfaces» lar deg definere en kontrakt for en klasse, et objekt eller en funksjon, noe som kan hjelpe deg med å unngå vanlige feil og gjøre koden mer selvdokumenterende.

Her er et eksempel:

TypeScript

```
interface Person {
  firstName: string;
  lastName: string;
  age?: number; // Valgfri egenskap
}

function sayHello(person: Person): void {
  console.log(`Hello, ${person.firstName} ${person.lastName}!`);
  if (person.age) {
    console.log(`Du er ${person.age} år gammel.`);
  }
}

let person1 = { firstName: "John", lastName: "Doe", age: 30 };
sayHello(person1); // output: "Hello, John Doe! Du er 30 år gammel."
```



### 7 — Bruk «Destructuring»



«Destructuring» er en kortfattet syntaks som lar deg trekke ut verdier fra arrays og objekter. Det kan gjøre koden mer lesbar og konsis.

**Objekt-destructuring:**

TypeScript

```
let person = { firstName: "John", lastName: "Doe", age: 30 };
let { firstName, lastName } = person;

console.log(firstName); // output: "John"
```

**Array-destructuring:**

TypeScript

```
let numbers = [1, 2, 3, 4, 5];
let [first, second, , fourth] = numbers; // Hopper over det tredje elementet

console.log(first);  // output: 1
console.log(fourth); // output: 4
```



### 8 — Bruk Async/Await



Async/await er en kraftig funksjon som lar deg skrive asynkron kode som ser ut og oppfører seg som synkron kode. Det kan forbedre lesbarheten og redusere sannsynligheten for feil forårsaket av «callback hell».

Her er et eksempel:

TypeScript

```
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}

getData().then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});
```



### 9 — Bruk funksjonelle programmeringsteknikker



Funksjonelle teknikker som uforanderlighet (immutability), rene funksjoner og høyere-ordens funksjoner kan hjelpe deg med å skrive ren og vedlikeholdbar kode.

- **Rene funksjoner:** En ren funksjon har ingen sideeffekter og returnerer alltid samme output for samme input.
- **Høyere-ordens funksjoner:** En funksjon som tar en eller flere funksjoner som argumenter, eller returnerer en funksjon. `map`, `filter` og `reduce` er vanlige eksempler.
- **Uforanderlig data:** Data som ikke kan endres etter at de er opprettet. Man lager nye kopier i stedet for å endre originalen.



### 10 & 11 — Bruk hjelpetyper som `Pick` og `Omit`



Disse er TypeScript-verktøytyper som lar deg lage nye typer fra eksisterende, noe som gjør det enklere å gjenbruke og vedlikeholde kode.

- `Pick`: Lar deg velge ut spesifikke egenskaper fra en type for å lage en ny type.

  TypeScript

  ```
  type UserSummary = Pick<User, 'name' | 'email'>;
  ```

- `Omit`: Lar deg ekskludere spesifikke egenskaper fra en type for å lage en ny type.

  TypeScript

  ```
  type UserWithoutEmail = Omit<User, 'email'>;
  ```



### 12 — Bruk «Discriminated Unions»



Dette er en måte å modellere typer som kan ha forskjellige former basert på en spesifikk egenskap (en «diskriminant»). Dette gjør det mulig å håndtere dem på en typesikker måte med `switch`-setninger.

Her er et eksempel:

TypeScript

```
interface Square { kind: 'square'; size: number; }
interface Circle { kind: 'circle'; radius: number; }

type Shape = Square | Circle;

function area(shape: Shape) {
  switch (shape.kind) { // 'kind' er diskriminanten
    case 'square': return shape.size * shape.size;
    case 'circle': return Math.PI * shape.radius ** 2;
  }
}
```



### Konklusjon



Ved å bruke disse TypeScript-triksene kan du skrive kode som er mer uttrykksfull, vedlikeholdbar og feilfri. De hjelper deg med å fange feil tidlig, forbedre lesbarheten og redusere mengden repetitiv kode du må skrive.
