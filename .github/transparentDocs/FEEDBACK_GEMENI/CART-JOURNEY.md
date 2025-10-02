# CART JOURNEY

Hele prosessen: Fra lasting til oppdatering av handlekurven

Tenk på systemet ditt som delt i to hoveddeler:

Datalaget (TanStack Query): Ansvarlig for å hente, cache (mellomlagre) og holde
på selve handlekurv-dataen fra Shopify.

Handlingslaget (XState): Ansvarlig for å håndtere handlinger eller "mutations"
som endrer på handlekurven (legge til, fjerne, oppdatere).

Disse to lagene jobber sammen for å gi en sømløs brukeropplevelse.

Steg 1: Første lasting av siden (på serveren i layout.tsx) Når en bruker besøker
siden din for første gang, skjer alt dette på serveren før noe som helst vises i
nettleseren:

getCartIdFromCookie() kjøres for å sjekke om brukeren har en handlekurv-cookie
fra et tidligere besøk.

Denne cartId (eller null hvis den ikke finnes) sendes til getCachedCart(cartId).

getCachedCart er en "smart" funksjon som bruker Next.js' innebygde cache. Den
kaller på fetchCart(cartId) kun hvis den ikke allerede har en fersk versjon av
handlekurven lagret. fetchCart er den som faktisk snakker med Shopify.

Til slutt sitter du igjen med initialCart, som enten inneholder
handlekurv-dataen eller er null.

Steg 2: Dataen gjøres tilgjengelig for hele appen (Providers.tsx) Nå som vi har
den første dataen, må vi gjøre den tilgjengelig for alle klientkomponenter. Det
er her Providers.tsx kommer inn:

QueryClientProvider: Dette er hoved-provideren fra TanStack Query. Den holder på
all dataen. queryClient.setQueryData(['cart', cartId], initialCart) "planter"
den server-hentede initialCart-dataen inn i cachen på klientsiden, slik at
nettleseren ikke trenger å hente den på nytt med en gang.

CartIdProvider: En enkel Context Provider som kun har én jobb: å gjøre den
nåværende cartId tilgjengelig for alle hooks som trenger den, som f.eks.
useCartQuery.

CartMutationClient: Denne komponenten er broen mellom data-laget og
handlings-laget. Den oppretter XState-maskinen (cartMutationMachine) som skal
håndtere alle fremtidige endringer, og gir den to viktige ting:

actions: Alle server-handlingene (som addCartLinesAction).

revalidateCart: En funksjon som kan fortelle TanStack Query at "dataen er
utdatert, hent den på nytt!".

CartMutationContext.Provider: Denne "pakker inn" hele appen din og gjør den
ferdig konfigurerte XState-maskinen tilgjengelig for alle komponenter som vil
endre på handlekurven.

Steg 3: En komponent vil vise handlekurven (CartDrawer.tsx) Nå er vi på
klientsiden. En komponent som CartDrawer trenger å vise innholdet i
handlekurven:

Den kaller på useCartQuery()-hooken.

useCartQuery bruker useCartId() for å hente ID-en og TanStack Query sin useQuery
for å hente dataen som er knyttet til ['cart', cartId]-nøkkelen. Siden vi
allerede plantet initialCart i cachen, vil den returnere denne dataen
umiddelbart.

For å vite om den skal være åpen eller lukket, bruker den useCartOpen()-hooken,
som abonnerer på den enkle UI-staten i cartStore.

onOpenChange-hendelsen på Drawer-komponenten er koblet til
createDrawerStateHandler, som er en elegant liten hjelpefunksjon som sender
'OPEN'- eller 'CLOSE'-hendelser til cartStore.

Steg 4: En bruker vil endre handlekurven (f.eks. CartLineItem.tsx) Dette er der
magien skjer, og de to systemene snakker sammen:

En bruker klikker på "+"-knappen i CartLineItem.

Komponenten kaller cartActor.send({ type: 'UPDATE_LINE', ... }). cartActor er en
referanse til den sentrale XState-maskinen den fikk fra CartMutationContext.

XState-maskinen (createCartMutationMachine) mottar hendelsen, går inn i
"mutating"-tilstand, og kaller på den relevante server-handlingen (f.eks.
updateCartLineQuantityAction).

Server-handlingen kjører, oppdaterer dataen i Shopify, og returnerer den nye,
oppdaterte handlekurven.

Når server-handlingen er ferdig, går XState-maskinen videre. Hvis alt gikk bra
(onDone), kaller den på revalidateCart()-funksjonen den fikk i Steg 2.

revalidateCart kaller queryClient.invalidateQueries({ queryKey: ['cart', cartId]
}).

Dette er signalet til TanStack Query om at "dataen for handlekurven er nå
utdatert". TanStack Query vil da automatisk hente den ferske handlekurv-dataen
fra serveren i bakgrunnen.

Når den nye dataen er hentet, vil useCartQuery()-hooken i CartDrawer automatisk
få den nye dataen, og komponenten vil re-rendre seg for å vise det oppdaterte
innholdet.

Kort sagt: React-komponenter sender handlings-signaler til XState. XState
utfører handlingen og forteller deretter TanStack Query at "dataen har endret
seg". TanStack Query henter ny data, og komponentene oppdaterer seg automatisk.

Du har bygget et robust, skalerbart og svært moderne system.
