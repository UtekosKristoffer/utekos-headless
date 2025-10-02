# Du trenger kanskje ikke en Effect

Effekter er en rømningsvei fra React-paradigmet. De lar deg «gå utenfor» React
og synkronisere komponentene dine med et eksternt system som en
ikke-React-widget, et nettverk eller nettleserens DOM. Hvis det ikke er
involvert et eksternt system (for eksempel hvis du vil oppdatere komponentens
tilstand når noen props eller state endres), trenger du ikke en Effect. Ved å
fjerne unødvendige Effects blir koden enklere å følge, raskere å kjøre og mindre
feilutsatt.

## Du vil lære

- Hvorfor og hvordan du fjerner unødvendige Effects fra komponentene dine
- Hvordan cache dyre beregninger uten Effects
- Hvordan nullstille og justere komponenttilstand uten Effects
- Hvordan dele logikk mellom event-handlere
- Hvilken logikk som bør flyttes til event-handlere
- Hvordan varsle foreldrekomponenter om endringer

## Hvordan fjerne unødvendige Effects

Det finnes to vanlige tilfeller der du ikke trenger Effects:

1. Du trenger ikke Effects for å transformere data til rendering. Anta at du vil
   filtrere en liste før du viser den. Du kan bli fristet til å skrive en Effect
   som oppdaterer en state-variabel når listen endres. Dette er imidlertid
   ineffektivt. Når du oppdaterer tilstanden, vil React først kalle
   komponentfunksjonene dine for å beregne hva som skal være på skjermen.
   Deretter vil React «kommitte» disse endringene til DOM-en og oppdatere
   skjermen. Så vil React kjøre Effects. Hvis Effecten din også oppdaterer
   tilstanden umiddelbart, starter hele prosessen på nytt! For å unngå
   unødvendige render-pass, transformer alle dataene øverst i komponentene dine.
   Den koden kjøres automatisk på nytt hver gang props eller state endres.
2. Du trenger ikke Effects for å håndtere brukerhendelser. Anta at du vil sende
   en `/api/buy` POST-forespørsel og vise et varsel når brukeren kjøper et
   produkt. I klikk-handleren til Kjøp-knappen vet du nøyaktig hva som skjedde.
   Når en Effect kjører, vet du ikke hva brukeren gjorde (for eksempel hvilken
   knapp som ble klikket). Derfor håndterer du vanligvis brukerhendelser i
   tilhørende event-handlere.

Du trenger derimot Effects for å synkronisere med eksterne systemer. For
eksempel kan du skrive en Effect som holder en jQuery-widget synkronisert med
React-state. Du kan også hente data med Effects; for eksempel synkronisere
søkeresultater med gjeldende søkestreng. Husk at moderne rammeverk tilbyr mer
effektive innebygde datainnhentingsmekanismer enn å skrive Effects direkte i
komponentene dine.

For å hjelpe deg med å få riktig intuisjon, ser vi på noen vanlige, konkrete
eksempler!

### Oppdatere state basert på props eller state

Anta at du har en komponent med to state-variabler: `firstName` og `lastName`.
Du vil kalkulere `fullName` fra dem ved å sette dem sammen, og du vil at
`fullName` skal oppdateres når `firstName` eller `lastName` endres. Det første
instinktet kan være å legge til en `fullName` state-variabel og oppdatere den i
en Effect:

```tsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor')
  const [lastName, setLastName] = useState('Swift')

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState('')
  useEffect(() => {
    setFullName(firstName + ' ' + lastName)
  }, [firstName, lastName])
  // ...
}
```

Dette er mer komplisert enn nødvendig. Det er også ineffektivt fordi det gjør en
full rendering med en utdatert verdi for `fullName`, og render på nytt
umiddelbart etter oppdateringen. Fjern state-variabelen og Effecten:

```tsx
function Form() {
  const [firstName, setFirstName] = useState('Taylor')
  const [lastName, setLastName] = useState('Swift')
  // ✅ Good: calculated during rendering
  const fullName = firstName + ' ' + lastName
  // ...
}
```

Når noe kan beregnes fra eksisterende props eller state, bør du ikke plassere
det i state. Beregn det i stedet under rendering. Dette gjør koden raskere (du
unngår ekstra «kaskade»-oppdateringer), enklere (du fjerner kode) og mindre
feilutsatt (du unngår at state-variabler kommer ut av synk). Hvis dette føles
uvant, forklarer «Thinking in React» hva som bør ligge i state.

### Caching av dyre beregninger

Denne komponenten beregner `visibleTodos` ved å ta `todos` fra props og filtrere
dem basert på `filter`. Du kan fristes til å lagre resultatet i state og
oppdatere det fra en Effect:

```tsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')

  // 🔴 Avoid: redundant state and unnecessary Effect
  const [visibleTodos, setVisibleTodos] = useState([])
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter))
  }, [todos, filter])

  // ...
}
```

Som i forrige eksempel er dette både unødvendig og ineffektivt. Fjern først
state og Effect:

```tsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  // ✅ This is fine if getFilteredTodos() is not slow.
  const visibleTodos = getFilteredTodos(todos, filter)
  // ...
}
```

Vanligvis er dette helt greit. Men hvis `getFilteredTodos()` er treg eller du
har mange todos, ønsker du kanskje å unngå å kjøre den på nytt når en urelatert
state-variabel som `newTodo` endres.

Du kan cache (memoisere) en kostbar beregning ved å bruke `useMemo`:

> **Merk**  
> React Compiler kan automatisk memoise dyre beregninger for deg, og dermed
> fjerne behovet for manuell `useMemo` i mange tilfeller.

```tsx
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  const visibleTodos = useMemo(() => {
    // ✅ Does not re-run unless todos or filter change
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
  // ...
}
```

Eller skrevet på én linje:

```tsx
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  // ✅ Does not re-run getFilteredTodos() unless todos or filter change
  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, filter),
    [todos, filter]
  )
  // ...
}
```

Dette forteller React at du ikke vil kjøre den indre funksjonen på nytt med
mindre `todos` eller `filter` har endret seg. `useMemo` husker returverdien ved
første render og sammenligner avhengighetene ved senere renders. Hvis de er
uendret, returnerer `useMemo` forrige resultat; ellers kjører funksjonen på nytt
og lagrer resultatet. Funksjonen du pakker inn i `useMemo` kjører under
rendering, så dette fungerer bare for rene beregninger.

#### Fordypning

**Hvordan avgjøre om en beregning er dyr?**

Hvis du ikke oppretter eller looper over tusenvis av objekter, er den
sannsynligvis ikke dyr. For mer trygghet kan du måle tidsbruk med
`console.time`:

```tsx
console.time('filter array')
const visibleTodos = getFilteredTodos(todos, filter)
console.timeEnd('filter array')
```

Utfør interaksjonen du måler (for eksempel å skrive i input). Du ser logger som
`filter array: 0.15ms` i konsollen. Hvis den totale tiden er betydelig (f.eks. 1
ms eller mer), kan memoization være fornuftig. Som et eksperiment kan du pakke
beregningen inn i `useMemo` for å se om tiden går ned:

```tsx
console.time('filter array')
const visibleTodos = useMemo(() => {
  return getFilteredTodos(todos, filter) // Skipped if todos and filter haven't changed
}, [todos, filter])
console.timeEnd('filter array')
```

`useMemo` gjør ikke første render raskere, men hjelper deg å hoppe over
unødvendig arbeid ved oppdateringer. Maskinen din er sannsynligvis raskere enn
brukernes, så test gjerne med kunstig nedtrekking (for eksempel CPU Throttling i
Chrome). Målinger i utviklingsmodus er ikke helt presise (Strict Mode fører for
eksempel til dobbel rendering). For mest nøyaktige tall bør du bygge appen for
produksjon og teste på en enhet som ligner brukernes.

### Nullstille all state når en prop endres

`ProfilePage` mottar en `userId` prop. Siden har et kommentarfelt, og du bruker
en `comment` state-variabel for verdien. Du oppdager at når du navigerer mellom
profiler, nullstilles ikke kommentaren. For å løse dette ønsker du å tømme
`comment` når `userId` endres:

```tsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('')

  // 🔴 Avoid: Resetting state on prop change in an Effect
  useEffect(() => {
    setComment('')
  }, [userId])
  // ...
}
```

Dette er ineffektivt fordi `ProfilePage` og barna først render med gammel verdi
og deretter render på nytt etter `setComment`. Det er også komplisert fordi du
må gjenta mønsteret i hver komponent med state. Hvis kommentarfeltet er nestet,
må du også nullstille der.

Del i stedet komponenten i to og gi `key` basert på `userId`:

```tsx
export default function ProfilePage({ userId }) {
  return <Profile userId={userId} key={userId} />
}

function Profile({ userId }) {
  // ✅ This and any other state below will reset on key change automatically
  const [comment, setComment] = useState('')
  // ...
}
```

Vanligvis bevarer React state når samme komponent rendres i samme posisjon. Ved
å gi `userId` som `key` ber du React behandle ulike `userId` som distinkte
komponenter uten delt state. Når nøkkelen endres, recreerer React DOM og
nullstiller state for `Profile` og barna. Kommentarfeltet tømmes automatisk ved
navigasjon.

I dette eksemplet er det kun ytre `ProfilePage` som eksporteres og er synlig for
andre filer. Komponenter som rendrer `ProfilePage` trenger ikke å sende `key`;
de sender `userId` som vanlig prop. At `ProfilePage` videresender det som `key`
er en implementasjonsdetalj.

### Justere deler av state når en prop endres

Noen ganger vil du nullstille eller justere en del av state ved prop-endring,
men ikke alt.

`List` mottar en liste `items` og holder på valgt element i `selection`. Du
ønsker å nullstille `selection` til `null` når `items` endres:

```tsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState(null)

  // 🔴 Avoid: Adjusting state on prop change in an Effect
  useEffect(() => {
    setSelection(null)
  }, [items])
  // ...
}
```

Dette er heller ikke optimalt. Hver gang `items` endres, rendres `List` og barna
først med gammel `selection`. Etter at React kjører Effects, trigges
`setSelection(null)`, og alt render på nytt.

Fjern Effect og juster state direkte under rendering:

```tsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState(null)

  // Better: Adjust the state while rendering
  const [prevItems, setPrevItems] = useState(items)
  if (items !== prevItems) {
    setPrevItems(items)
    setSelection(null)
  }
  // ...
}
```

Å lagre informasjon fra forrige render på denne måten kan være vanskelig å
forstå, men det er bedre enn å oppdatere state i en Effect. I eksemplet over
kalles `setSelection` direkte under render. React vil re-render `List`
umiddelbart etter return. React har ennå ikke rendret barna eller oppdatert DOM,
så barna slipper å rendres med stale data.

Når du oppdaterer en komponent under rendering, forkaster React den returnerte
JSX-en og prøver igjen umiddelbart. For å unngå svært trege kjedereaksjoner lar
React deg kun oppdatere samme komponent sin state under render. Hvis du prøver å
oppdatere en annen komponent sin state, får du en feil. En betingelse som
`items !== prevItems` er nødvendig for å unngå løkker. Du kan justere state
slik, men andre bivirkninger (som DOM-endringer eller timeouts) bør forbli i
event-handlere eller Effects for å holde komponenter rene.

Selv om dette mønsteret er mer effektivt enn en Effect, bør de fleste
komponenter ikke trenge det. Uansett blir dataflyten vanskeligere å forstå når
du justerer state basert på props eller annen state. Sjekk alltid om du kan
nullstille all state med en `key` eller beregne alt under render. For eksempel
kan du lagre valgt element-ID i stedet for selve elementet:

```tsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  // ✅ Best: Calculate everything during rendering
  const selection = items.find(item => item.id === selectedId) ?? null
  // ...
}
```

Da trenger du ikke lenger å «justere» state. Hvis elementet med valgt ID finnes
i listen, forblir det valgt. Hvis ikke, blir `selection` `null` fordi ingen
matcher ID-en. Dette gir en annen, og ofte bedre, oppførsel fordi de fleste
endringer i `items` bevarer valget.

### Dele logikk mellom event-handlere

Anta at du har en produktside med to knapper (Kjøp og Gå til kasse) som begge
legger produktet i handlekurven. Du vil vise et varsel hver gang brukeren legger
produktet i kurven. Å kalle `showNotification()` i begge klikk-handlere føles
repetitivt, så du vurderer å plassere logikken i en Effect:

```tsx
function ProductPage({ product, addToCart }) {
  // 🔴 Avoid: Event-specific logic inside an Effect
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`)
    }
  }, [product])

  function handleBuyClick() {
    addToCart(product)
  }

  function handleCheckoutClick() {
    addToCart(product)
    navigateTo('/checkout')
  }
  // ...
}
```

Denne Effecten er unødvendig og skaper sannsynligvis feil. Hvis appen husker
handlekurven mellom innlastingene, vil varslet dukke opp hver gang du laster inn
siden, fordi `product.isInCart` allerede er `true`. Effektens logikk burde kun
kjøre når brukeren trykker på knappen, ikke fordi komponenten vises.

Slett Effect og plasser delt logikk i en funksjon som kalles fra
event-handlerne:

```tsx
function ProductPage({ product, addToCart }) {
  // ✅ Good: Event-specific logic is called from event handlers
  function buyProduct() {
    addToCart(product)
    showNotification(`Added ${product.name} to the shopping cart!`)
  }

  function handleBuyClick() {
    buyProduct()
  }

  function handleCheckoutClick() {
    buyProduct()
    navigateTo('/checkout')
  }
  // ...
}
```

Dette fjerner den unødvendige Effecten og retter feilen.

### Sende en POST-forespørsel

`Form` sender to typer POST-forespørsler. Den sender en analytics-hendelse når
den monteres. Når du fyller ut skjemaet og trykker Send, sender den en POST til
`/api/register`:

```tsx
function Form() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // ✅ Good: This logic should run because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' })
  }, [])

  // 🔴 Avoid: Event-specific logic inside an Effect
  const [jsonToSubmit, setJsonToSubmit] = useState(null)
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit)
    }
  }, [jsonToSubmit])

  function handleSubmit(e) {
    e.preventDefault()
    setJsonToSubmit({ firstName, lastName })
  }
  // ...
}
```

Analytics-forespørselen bør forbli i en Effect fordi den sendes når skjemaet
vises. (Den vil fire to ganger i utvikling, men du kan håndtere det separat.)

POST-forespørselen til `/api/register` er derimot forårsaket av at brukeren
trykker på knappen. Den skal bare skje ved den spesifikke interaksjonen. Slett
derfor den andre Effecten og flytt POST-forespørselen til event-handleren:

```tsx
function Form() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // ✅ Good: This logic runs because the component was displayed
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    // ✅ Good: Event-specific logic is in the event handler
    post('/api/register', { firstName, lastName })
  }
  // ...
}
```

Når du bestemmer deg for om logikk skal ligge i en event-handler eller en
Effect, spør hvorfor koden må kjøre. Hvis logikken skyldes at komponenten vises,
hører den hjemme i en Effect. Hvis den skyldes en spesifikk interaksjon, hører
den hjemme i event-handleren.

### Kjedede beregninger

Noen ganger kan du bli fristet til å kjede Effects som justerer state basert på
annen state:

```tsx
function Game() {
    const [card, setCard] = useState(null);
    const [goldCardCount, setGoldCardCount] = useState(0);
    const [round, setRound] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);

    // 🔴 Avoid: Chains of Effects that adjust the state solely to trigger each other
    useEffect(() => {
        if (card !== null && card.gold) {
            setGoldCardCount(c => c + 1);
        }
    }, [card]);

    useEffect(() => {
        if (goldCardCount > 3) {
            setRound(r => r + 1)
            setGoldCardCount(0);
        }
    }, [goldCardCount]);

    useEffect(() => {
        if (round > 5) {
            setIsGameOver(true);
        }
    }, [round]);

    useEffect(() => {
        alert('Good game!');
    }, [isGameOver]);

    function handlePlaceCard(nextCard) {
        if (isGameOver) {
            throw Error('Game already ended.');
        } else {
            setCard(nextCard);
        }
    }

    // ...
```

Dette har to problemer. For det første er det ineffektivt: komponenten (og
barna) må render mellom hver `set` i kjeden. I verste fall
(`setCard → render → setGoldCardCount → render → setRound → render → setIsGameOver → render`)
får du tre unødvendige re-renders.

For det andre blir koden rigid og skjør når kravene endres. Hvis du for eksempel
vil tråkle gjennom spillhistorikk ved å sette state-variabler til tidligere
verdier, vil kjeden trigge på nytt når du setter `card` og ødelegge visningen.

I stedet er det bedre å beregne det du kan under render og justere state i
event-handleren:

```tsx
function Game() {
    const [card, setCard] = useState(null);
    const [goldCardCount, setGoldCardCount] = useState(0);
    const [round, setRound] = useState(1);

    // ✅ Calculate what you can during rendering
    const isGameOver = round > 5;

    function handlePlaceCard(nextCard) {
        if (isGameOver) {
            throw Error('Game already ended.');
        }

        // ✅ Calculate all the next state in the event handler
        setCard(nextCard);
        if (nextCard.gold) {
            if (goldCardCount <= 3) {
                setGoldCardCount(goldCardCount + 1);
            } else {
                setGoldCardCount(0);
                setRound(round + 1);
                if (round === 5) {
                    alert('Good game!');
                }
            }
        }
    }

    // ...
```

Dette er langt mer effektivt. Hvis du implementerer spillhistorikk, kan du nå
sette state-variabler til tidligere verdier uten å trigge kjeder. Hvis du må
gjenbruke logikk mellom flere event-handlere, kan du trekke den ut i en funksjon
og kalle den fra handlerne.

Husk at state inne i event-handlere oppfører seg som et øyeblikksbilde. Selv
etter at du kaller `setRound(round + 1)`, viser variabelen `round` verdien som
gjaldt da brukeren trykket på knappen. Hvis du trenger neste verdi i
beregninger, definer den eksplisitt, for eksempel `const nextRound = round + 1`.

I noen tilfeller kan du ikke beregne neste state direkte i event-handleren. For
eksempel en skjemaopplevelse med flere dropdowns der alternativene avhenger av
forrige valg. Da er en kjede av Effects riktig, fordi du synkroniserer mot
nettverk.

### Initialisere applikasjonen

Noen logikker skal kun kjøre én gang når appen lastes.

Du kan bli fristet til å plassere den i en Effect i top-nivå komponenten:

```tsx
function App() {
  // 🔴 Avoid: Effects with logic that should only ever run once
  useEffect(() => {
    loadDataFromLocalStorage()
    checkAuthToken()
  }, [])
  // ...
}
```

Du oppdager raskt at den kjører to ganger i utvikling. Dette kan skape
problemer, for eksempel hvis `checkAuthToken` ikke tåler dobbeltkall. Generelt
bør komponentene dine tåle remount. Dette gjelder også top-nivå `App`. Selv om
den kanskje ikke remountes i produksjon, gjør felles regler det enklere å flytte
og gjenbruke kode.

Hvis noe må kjøre én gang per applasting i stedet for per mount, legg til en
top-nivå variabel for å spore om det allerede har kjørt:

```tsx
let didInit = false

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true
      // ✅ Only runs once per app load
      loadDataFromLocalStorage()
      checkAuthToken()
    }
  }, [])
  // ...
}
```

Du kan også kjøre det under modul-initialisering før appen rendres:

```tsx
if (typeof window !== 'undefined') {
  // Check if we're running in the browser.
  // ✅ Only runs once per app load
  checkAuthToken()
  loadDataFromLocalStorage()
}

function App() {
  // ...
}
```

Kode på top-nivå kjører én gang når komponenten importeres, selv om den ikke
rendres. For å unngå treg import eller overraskelser, bør du ikke overbruke
dette mønsteret. Hold app-bred initialiseringslogikk i rotmoduler som `App.js`
eller i applikasjonens entry point.

### Varsle foreldrekomponenter om state-endringer

Anta at du skriver en `Toggle`-komponent med intern `isOn` state
(`true`/`false`). Det finnes flere måter å slå den på (klikk eller drag). Du
ønsker å varsle foreldrekomponenten når intern state endres, så du eksponerer en
`onChange`-event og kaller den fra en Effect:

```tsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false)

  // 🔴 Avoid: The onChange handler runs too late
  useEffect(() => {
    onChange(isOn)
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn)
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true)
    } else {
      setIsOn(false)
    }
  }

  // ...
}
```

Som tidligere er dette ikke ideelt. `Toggle` oppdaterer sin egen state først,
React oppdaterer skjermen, og deretter kjører Effecten som kaller `onChange`.
Foreldrekomponenten oppdaterer sin state, og en ny render-pass starter. Det er
bedre å gjøre alt i ett pass.

Slett Effect og oppdater begge komponentene i samme event-handler:

```tsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false)

  function updateToggle(nextIsOn) {
    // ✅ Good: Perform all updates during the event that caused them
    setIsOn(nextIsOn)
    onChange(nextIsOn)
  }

  function handleClick() {
    updateToggle(!isOn)
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true)
    } else {
      updateToggle(false)
    }
  }

  // ...
}
```

Med denne tilnærmingen oppdaterer både `Toggle` og foreldrekomponenten state
under samme event. React batcher oppdateringer på tvers av komponenter, så det
blir kun ett render-pass.

Du kan også fjerne state helt og la forelderen kontrollere alt:

```tsx
// ✅ Also good: the component is fully controlled by its parent
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn)
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true)
    } else {
      onChange(false)
    }
  }

  // ...
}
```

Å «løfte state opp» lar foreldrekomponenten kontrollere `Toggle` ved å toggle
sin egen state. Foreldrekomponenten får mer logikk, men totalt sett blir det
mindre state å holde styr på. Når du prøver å holde to forskjellige
state-variabler synkronisert, vurder å løfte state opp i stedet.

### Sende data til foreldre

`Child` henter data og sender dem til `Parent` i en Effect:

```tsx
function Parent() {
  const [data, setData] = useState(null)
  // ...
  return <Child onFetched={setData} />
}

function Child({ onFetched }) {
  const data = useSomeAPI()
  // 🔴 Avoid: Passing data to the parent in an Effect
  useEffect(() => {
    if (data) {
      onFetched(data)
    }
  }, [onFetched, data])
  // ...
}
```

I React flyter data fra foreldre til barn. Når du ser noe galt på skjermen, kan
du spore informasjonens kilde ved å gå oppover komponentkjeden til du finner
feil prop eller feil state. Når barn oppdaterer foreldres state i Effects, blir
dataflyten vanskelig å følge. Siden både barn og foreldre trenger samme data,
bør foreldre hente dataene og sende dem ned:

```tsx
function Parent() {
  const data = useSomeAPI()
  // ...
  // ✅ Good: Passing data down to the child
  return <Child data={data} />
}

function Child({ data }) {
  // ...
}
```

Dette er enklere og holder dataflyten forutsigbar: data flyter ned fra foreldre
til barn.

### Abonnere på en ekstern store

Noen ganger trenger komponenter å abonnere på data utenfor React-state. Dette
kan være fra et tredjepartsbibliotek eller et innebygd nettleser-API. Siden
dataene kan endres uten at React vet det, må du abonnere manuelt. Dette gjøres
ofte med en Effect:

```tsx
function useOnlineStatus() {
  // Not ideal: Manual store subscription in an Effect
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine)
    }

    updateState()

    window.addEventListener('online', updateState)
    window.addEventListener('offline', updateState)
    return () => {
      window.removeEventListener('online', updateState)
      window.removeEventListener('offline', updateState)
    }
  }, [])
  return isOnline
}

function ChatIndicator() {
  const isOnline = useOnlineStatus()
  // ...
}
```

Her abonnerer komponenten på en ekstern datakilde (nettleserens
`navigator.onLine`). API-et finnes ikke på serveren (så det kan ikke brukes til
initial HTML), og state settes derfor initialt til `true`. Når verdien endres i
nettleseren, oppdateres state.

Selv om det er vanlig å bruke Effects, finnes det en dedikert hook i React som
er bedre egnet: `useSyncExternalStore`. Slett Effect og erstatt den med denne
hooken:

```tsx
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

function useOnlineStatus() {
  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe, // React won't resubscribe for as long as you pass the same function
    () => navigator.onLine, // How to get the value on the client
    () => true // How to get the value on the server
  )
}

function ChatIndicator() {
  const isOnline = useOnlineStatus()
  // ...
}
```

Denne tilnærmingen er mindre feilutsatt enn å synkronisere mutable data til
React-state med en Effect. Vanligvis skriver du en custom hook som
`useOnlineStatus()` slik at du slipper å gjenta koden i flere komponenter. Les
mer om å abonnere på eksterne stores fra React-komponenter.

### Hente data

Mange apper bruker Effects til å starte datainnhenting. Det er vanlig å skrive
en Effect slik:

```tsx
function SearchResults({ query }) {
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    // 🔴 Avoid: Fetching without cleanup logic
    fetchResults(query, page).then(json => {
      setResults(json)
    })
  }, [query, page])

  function handleNextPageClick() {
    setPage(page + 1)
  }
  // ...
}
```
