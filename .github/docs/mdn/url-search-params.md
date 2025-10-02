---
title: URLSearchParams
slug: Web/API/URLSearchParams
page-type: web-api-interface
browser-compat: api.URLSearchParams
---

{{ApiRef("URL API")}} {{AvailableInWorkers}}

**`URLSearchParams`**-grensesnittet definerer hjelpe-metoder for å jobbe med
spørringsstrengen til en URL.

`URLSearchParams`-objekter er
[itererbare](/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol),
så de kan brukes direkte i en {{jsxref("Statements/for...of", "for...of")}}
struktur for å iterere over nøkkel/verdi-par i samme rekkefølge som de vises i
spørringsstrengen. For eksempel er følgende to linjer ekvivalente:

```js
for (const [key, value] of mySearchParams) {
}
for (const [key, value] of mySearchParams.entries()) {
}
```

Selv om `URLSearchParams` fungerer likt som en {{jsxref("Map")}}, kan det ved
iterering oppstå noen
[fallgruver](/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#concurrent_modifications_when_iterating)
som `Map` ikke har, på grunn av implementasjonen.

## Konstruktør

- {{domxref("URLSearchParams.URLSearchParams", 'URLSearchParams()')}}
  - : Returnerer et `URLSearchParams`-objekt.

## Instans-egenskaper

- {{domxref("URLSearchParams.size", 'size')}} {{ReadOnlyInline}}
  - : Indikerer totalt antall søkeparameter-oppføringer.

## Instans-metoder

- `URLSearchParams[Symbol.iterator]()`
  - : Returnerer en {{jsxref("Iteration_protocols","iterator")}} som lar deg
    iterere gjennom alle nøkkel/verdi-par i objektet i samme rekkefølge som i
    spørringsstrengen.
- {{domxref("URLSearchParams.append()")}}
  - : Legger til et spesifisert nøkkel/verdi-par som en ny søkeparameter.
- {{domxref("URLSearchParams.delete()")}}
  - : Sletter søkeparametere som matcher et navn, og eventuelt verdi, fra listen
    over alle søkeparametere.
- {{domxref("URLSearchParams.entries()")}}
  - : Returnerer en {{jsxref("Iteration_protocols","iterator")}} for å iterere
    gjennom alle nøkkel/verdi-par i objektet.
- {{domxref("URLSearchParams.forEach()")}}
  - : Lar deg iterere gjennom alle verdier i objektet via en callback-funksjon.
- {{domxref("URLSearchParams.get()")}}
  - : Returnerer den første verdien assosiert med den gitte søkeparameteren.
- {{domxref("URLSearchParams.getAll()")}}
  - : Returnerer alle verdier assosiert med en gitt søkeparameter.
- {{domxref("URLSearchParams.has()")}}
  - : Returnerer en boolean som indikerer om en gitt parameter, eller parameter
    og verdi-par, finnes.
- {{domxref("URLSearchParams.keys()")}}
  - : Returnerer en {{jsxref("Iteration_protocols", "iterator")}} for å iterere
    gjennom alle nøkler i objektet.
- {{domxref("URLSearchParams.set()")}}
  - : Setter verdien for en gitt søkeparameter. Hvis det finnes flere verdier,
    slettes de andre.
- {{domxref("URLSearchParams.sort()")}}
  - : Sorterer alle nøkkel/verdi-par etter nøkkel.
- {{domxref("URLSearchParams.toString()")}}
  - : Returnerer en streng med spørringsstrengen, egnet for bruk i en URL.
- {{domxref("URLSearchParams.values()")}}
  - : Returnerer en {{jsxref("Iteration_protocols", "iterator")}} for å iterere
    gjennom alle verdier i objektet.

## Eksempler

### Bruk av URLSearchParams

```js
const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

// Iterere over søkeparametere
for (const p of searchParams) {
  console.log(p)
}

console.log(searchParams.has('topic')) // true
console.log(searchParams.has('topic', 'fish')) // false
console.log(searchParams.get('topic') === 'api') // true
console.log(searchParams.getAll('topic')) // ["api"]
console.log(searchParams.get('foo') === null) // true
console.log(searchParams.append('topic', 'webdev'))
console.log(searchParams.toString()) // "q=URLUtils.searchParams&topic=api&topic=webdev"
console.log(searchParams.set('topic', 'More webdev'))
console.log(searchParams.toString()) // "q=URLUtils.searchParams&topic=More+webdev"
console.log(searchParams.delete('topic'))
console.log(searchParams.toString()) // "q=URLUtils.searchParams"
```

Søkeparametere kan også være et objekt.

```js
const paramsObj = { foo: 'bar', baz: 'bar' }
const searchParams = new URLSearchParams(paramsObj)

console.log(searchParams.toString()) // "foo=bar&baz=bar"
console.log(searchParams.has('foo')) // true
console.log(searchParams.get('foo')) // "bar"
```

### Parsing av window.location

I motsetning til {{domxref("URL")}}, har ikke
{{domxref("Location")}}-grensesnittet en ferdig `searchParams`-egenskap. Vi kan
parse `location.search` med `URLSearchParams`.

```js
// Anta at siden har location:
// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams?foo=a
const paramsString = window.location.search
const searchParams = new URLSearchParams(paramsString)
console.log(searchParams.get('foo')) // a
```

### Dupliserte søkeparametere

```js
const paramStr = 'foo=bar&foo=baz'
const searchParams = new URLSearchParams(paramStr)

console.log(searchParams.toString()) // "foo=bar&foo=baz"
console.log(searchParams.has('foo')) // true
console.log(searchParams.get('foo')) // bar, returnerer kun første verdi
console.log(searchParams.getAll('foo')) // ["bar", "baz"]
```

### Ingen URL-parsing

`URLSearchParams`-konstruktøren parser _ikke_ hele URL-er. Den fjerner kun et
eventuelt innledende `?` fra en streng.

```js
const paramsString1 = 'http://example.com/search?query=%40'
const searchParams1 = new URLSearchParams(paramsString1)

console.log(searchParams1.has('query')) // false
console.log(searchParams1.has('http://example.com/search?query')) // true

console.log(searchParams1.get('query')) // null
console.log(searchParams1.get('http://example.com/search?query')) // "@" (tilsvarer decodeURIComponent('%40'))

const paramsString2 = '?query=value'
const searchParams2 = new URLSearchParams(paramsString2)
console.log(searchParams2.has('query')) // true

const url = new URL('http://example.com/search?query=%40')
const searchParams3 = new URLSearchParams(url.search)
console.log(searchParams3.has('query')) // true
```

### Prosentkoding

`URLSearchParams`-objekter [prosentkoder](/en-US/docs/Glossary/Percent-encoding)
alt i
[`application/x-www-form-urlencoded` percent-encode set](https://url.spec.whatwg.org/#application-x-www-form-urlencoded-percent-encode-set)
(som inneholder alle tegn unntatt ASCII alfanumerisk, `*`, `-`, `.`, og `_`), og
koder U+0020 SPACE som `+`. Men den håndterer kun prosentkoding ved
serialisering og deserialisering av full URL-søkestrengsyntaks. Når du jobber
med individuelle nøkler og verdier, bruker du alltid den ukodede versjonen.

```js
// Opprettelse fra parsing av streng: prosentkoding dekodes
const params = new URLSearchParams('%24%25%26=%28%29%2B')
// Henter alle nøkler/verdier: kun dekodede verdier returneres
console.log([...params]) // [["$%&", "()+"]]
// Henter individuell verdi: bruk dekodet nøkkel og få dekodet verdi
console.log(params.get('$%&')) // "()+"
console.log(params.get('%24%25%26')) // null
// Setter individuell verdi: bruk ukodet nøkkel og verdi
params.append('$%&$#@+', '$#&*@#()+')
// Serialisering: prosentkoding brukes
console.log(params.toString())
// "%24%25%26=%28%29%2B&%24%25%26%24%23%40%2B=%24%23%26*%40%23%28%29%2B"
```

Hvis du legger til et nøkkel/verdi-par med en prosentkodet nøkkel, behandles den
nøkkelen som ukodet og kodes igjen.

```js
const params = new URLSearchParams()

params.append('%24%26', 'value')
params.toString() // "%2524%2526=value"
```

### Bevaring av plusstegn

`URLSearchParams`-konstruktøren tolker plusstegn (`+`) som mellomrom, noe som
kan skape problemer. I eksemplet under bruker vi
[heksadesimale escape-sekvenser](/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#hexadecimal_escape_sequences)
for å simulere en streng med binære data (hvor hver byte har informasjon) som må
lagres i URL-søkestrengen. Merk at den kodede strengen fra `btoa()` inneholder
`+` og ikke bevares av `URLSearchParams`.

```js
const rawData = '\x13à\x17@\x1F\x80'
const base64Data = btoa(rawData) // 'E+AXQB+A'

const searchParams = new URLSearchParams(`bin=${base64Data}`) // 'bin=E+AXQB+A'
const binQuery = searchParams.get('bin') // 'E AXQB A', '+' blir til mellomrom

console.log(atob(binQuery) === rawData) // false
```

Konstruer aldri `URLSearchParams`-objekter med dynamisk interpolerte strenger.
Bruk heller `append()`-metoden, som tolker alle tegn som de er.

```js
const rawData = '\x13à\x17@\x1F\x80'
const base64Data = btoa(rawData) // 'E+AXQB+A'

const searchParams = new URLSearchParams()
searchParams.append('bin', base64Data) // 'bin=E%2BAXQB%2BA'
const binQuery = searchParams.get('bin') // 'E+AXQB+A'

console.log(atob(binQuery) === rawData) // true
```

### Interaksjon med URL.searchParams

{{domxref("URL.searchParams")}}-egenskapen eksponerer URL-ens
{{domxref("URL.search", "search")}}-streng som et `URLSearchParams`-objekt. Når
du oppdaterer denne `URLSearchParams`, oppdateres URL-ens `search` med
serialiseringen. Men `URL.search` koder et delsett av tegn som
`URLSearchParams`, og koder mellomrom som `%20` i stedet for `+`. Dette kan gi
noen overraskende interaksjoner—hvis du oppdaterer `searchParams`, selv med
samme verdier, kan URL-en serialiseres annerledes.

```js
const url = new URL('https://example.com/?a=b ~')
console.log(url.href) // "https://example.com/?a=b%20~"
console.log(url.searchParams.toString()) // "a=b+%7E"
// Dette burde vært en no-op, men endrer URL-ens query til
// serialiseringen av searchParams
url.searchParams.sort()
console.log(url.href) // "https://example.com/?a=b+%7E"

const url2 = new URL('https://example.com?search=1234&param=my%20param')
console.log(url2.search) // "?search=1234&param=my%20param"
url2.searchParams.delete('search')
console.log(url2.search) // "?param=my+param"
```

### Tom verdi vs. ingen verdi

`URLSearchParams` skiller ikke mellom en parameter med ingenting etter `=`, og
en parameter som ikke har `=` i det hele tatt.

```js
const emptyVal = new URLSearchParams('foo=&bar=baz')
console.log(emptyVal.get('foo')) // returnerer ''
const noEquals = new URLSearchParams('foo&bar=baz')
console.log(noEquals.get('foo')) // returnerer også ''
console.log(noEquals.toString()) // 'foo=&bar=baz'
```

## Spesifikasjoner

{{Specifications}}

## Nettleser-kompatibilitet

{{Compat}}

## Se også

- [Polyfill av `URLSearchParams` i `core-js`](https://github.com/zloirock/core-js#url-and-urlsearchparams)
- {{domxref("URL")}}-grensesnittet.
- [Google Developers: Enkel URL-manipulering med URLSearchParams](https://developer.chrome.com/blog/urlsearchparams/)

## Enkel URL-manipulering med URLSearchParams

URLSearchParams-API gir et konsistent grensesnitt til delene av en URL og gjør
det enkelt å manipulere spørringsstrengen (det som kommer etter ?).

Tradisjonelt har utviklere brukt regex og streng-splitting for å hente ut
spørringsparametere fra URL-en. Hvis vi er ærlige, er det lite gøy. Det kan være
kjedelig og feilutsatt å få det riktig. En av mine mørke hemmeligheter er at jeg
har gjenbrukt de samme get|set|removeURLParameter-hjelpemetodene i flere store
Google.com-apper, inkludert Google Santa Tracker og Google I/O 2015-web.

Det er på tide med et ordentlig API som gjør dette for oss!

## URLSearchParams-API

Chrome 49 implementerer URLSearchParams fra URL-spesifikasjonen, et API som er
nyttig for å jobbe med URL-spørringsparametere. Jeg tenker på URLSearchParams
som tilsvarende for URL-er som FormData er for skjemaer.

Så hva kan du gjøre med det? Gitt en URL-streng, kan du enkelt hente ut
parameterverdier:

```js
// Kan også konstrueres fra en annen URLSearchParams
const params = new URLSearchParams('q=search+string&version=1&person=Eric')

params.get('q') === 'search string'
params.get('version') === '1'
Array.from(params).length === 3
```

Merk: Hvis det er flere verdier for en parameter, returnerer get den første
verdien.

**Iterer over parametere**:

```js
for (let p of params) {
  console.log(p)
}
```

**Sett en parameterverdi**:

```js
params.set('version', 2)
```

**Merk**: Hvis det er flere verdier, fjerner set alle andre parametere med samme
navn.

**Legg til en verdi for en eksisterende parameter**:

```js
params.append('person', 'Tim')
params.getAll('person') === ['Eric', 'Tim']
```

**Slett en parameter(e)**:

```js
params.delete('person')
```

**Merk**: Dette eksemplet fjerner alle person-spørringsparametere fra URL-en,
ikke bare første forekomst.

**Jobbe med URL-er**

Som oftest jobber du med hele URL-er eller endrer appens URL. URL-konstruktøren
kan være spesielt nyttig i disse tilfellene:

```js
const url = new URL('https://example.com?foo=1&bar=2');
const params = new URLSearchParams(url.search);
params.set('baz', 3);

params.has('baz') === true
params.toString() === 'foo=1&bar=2&baz=3'
For å gjøre faktiske endringer i URL-en kan du hente parametere, oppdatere
verdiene, og bruke history.replaceState for å oppdatere URL-en.


// URL: https://example.com?version=1.0
const params = new URLSearchParams(location.search);
params.set('version', 2.0);

window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

Her har jeg brukt ES6 template-strenger for å rekonstruere en oppdatert URL fra
appens eksisterende URL-path og de modifiserte parametrene.

Integrasjon med andre steder URL-er brukes Som standard vil sending av FormData
i et fetch()-API-kall lage en multipart-body. Hvis du trenger det, gir
URLSearchParams et alternativ for å POST-e data som er urlencoded i stedet for
mime multipart.

```js
const params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
    method: 'POST',
    body: params
}).then(...)
```

Selv om det ennå ikke er implementert i Chrome, integreres URLSearchParams også
med URL-konstruktøren og a-tagger. Begge støtter vår nye venn ved å tilby en
read-only-egenskap, .searchParams for tilgang til spørringsparametere:

```js
const url = new URL(location)
const foo = url.searchParams.get('foo') || 'somedefault'
```

Lenker får også en .searchParams-egenskap:

```js
const a = document.createElement('a')
a.href = 'https://example.com?filter=api'

// a.searchParams.get('filter') === 'api';
```
