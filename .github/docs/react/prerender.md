# prerender

`prerender` renderer et React-tre til en statisk HTML-streng ved hjelp av en Web
Stream.

```typescript
const { prelude } = await prerender(reactNode, options?)
```

## Referanse

### `prerender(reactNode, options?)`

Kall `prerender` for å rendre appen din til statisk HTML.

```typescript
import { prerender } from 'react-dom/static';

async function handler(request) {
    const { prelude } = await prerender(<App />, {
        bootstrapScripts: ['/main.js']
    });
    return new Response(prelude, {
        headers: { 'content-type': 'text/html' },
    });
}
```

På klienten kaller du `hydrateRoot` for å gjøre den server-genererte HTML-en
interaktiv.

## Parametre

- **reactNode**: Et React-node som skal rendres til HTML, f.eks. `<App />`. Bør
  representere hele dokumentet, så `App`-komponenten må rendre `<html>`-taggen.
- **options** _(valgfritt)_: Objekt med statiske genereringsvalg.
  - **bootstrapScriptContent**: String som plasseres i en inline `<script>`-tag.
  - **bootstrapScripts**: Array med URL-er til `<script>`-tagger som skal
    inkluderes på siden. Brukes for å inkludere scriptet som kaller
    `hydrateRoot`. Utelat hvis du ikke vil kjøre React på klienten.
  - **bootstrapModules**: Som `bootstrapScripts`, men emitterer
    `<script type="module">`.
  - **identifierPrefix**: String-prefiks React bruker for ID-er generert av
    `useId`. Må matche prefiks brukt med `hydrateRoot`.
  - **namespaceURI**: Rot-namespace URI for streamen. Standard er HTML. Bruk
    `'http://www.w3.org/2000/svg'` for SVG eller
    `'http://www.w3.org/1998/Math/MathML'` for MathML.
  - **onError**: Callback som trigges ved serverfeil. Standard kaller kun
    `console.error`. Hvis du logger krasjrapporter, må du fortsatt kalle
    `console.error`.
  - **progressiveChunkSize**: Antall bytes per chunk. Les mer om standard
    heuristikk.
  - **signal**: Abort-signal for å avbryte prerendering og rendre resten på
    klienten.

## Returnerer

`prerender` returnerer et Promise:

- Ved suksess: Promise løser til et objekt med:
  - **prelude**: En Web Stream med HTML. Kan brukes til å sende respons i
    chunks, eller leses til en streng.
- Ved feil: Promise blir avvist. Bruk dette til å vise fallback-shell.

## Viktige merknader

- **nonce** er ikke tilgjengelig som opsjon ved prerendering. Nonces må være
  unike per request og bør ikke inkluderes i prerender.

---

## Når bør du bruke `prerender`?

Den statiske `prerender`-API-en brukes for statisk server-side generering (SSG).
I motsetning til `renderToString` venter `prerender` på at all data skal lastes
før den løser. Dette gjør den egnet for å generere statisk HTML for en hel side,
inkludert data som må hentes med Suspense. For å streame innhold etter hvert som
det lastes, bruk en streaming server-side render (SSR)-API som
`renderToReadableStream`.

---

## Bruk

### Rendre et React-tre til en stream av statisk HTML

Kall `prerender` for å rendre React-treet til statisk HTML i en Readable Web
Stream:

```typescript
import { prerender } from 'react-dom/static';

async function handler(request) {
    const { prelude } = await prerender(<App />, {
        bootstrapScripts: ['/main.js']
    });
    return new Response(prelude, {
        headers: { 'content-type': 'text/html' },
    });
}
```

Root-komponenten må returnere hele dokumentet inkludert `<html>`-taggen:

```tsx
export default function App() {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='stylesheet' href='/styles.css' />
        <title>My app</title>
      </head>
      <body>
        <Router />
      </body>
    </html>
  )
}
```

React injiserer doctype og bootstrap `<script>`-tagger i den resulterende
HTML-streamen:

```html
<!DOCTYPE html>
<html>
  <!-- ... HTML fra komponentene dine ... -->
</html>
<script src="/main.js" async=""></script>
```

På klienten bør bootstrap-scriptet hydrere hele dokumentet med `hydrateRoot`:

```typescript
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App />);
```

---

### Lese CSS- og JS-asset paths fra build-output

Asset-URL-er (som JavaScript og CSS-filer) er ofte hashet etter build. For å
unngå hardkoding av filnavn, kan root-komponenten lese filnavn fra et map som
prop:

```tsx
export default function App({ assetMap }) {
  return (
    <html>
      <head>
        <title>My app</title>
        <link rel='stylesheet' href={assetMap['styles.css']} />
      </head>
      ...
    </html>
  )
}
```

På serveren rendrer du `<App assetMap={assetMap} />` og sender assetMap med
asset-URL-er:

```typescript
const assetMap = {
    'styles.css': '/styles.123456.css',
    'main.js': '/main.123456.js'
};

async function handler(request) {
    const { prelude } = await prerender(<App assetMap={assetMap} />, {
        bootstrapScripts: [assetMap['/main.js']]
    });
    return new Response(prelude, {
        headers: { 'content-type': 'text/html' },
    });
}
```

For å unngå hydrering-feil må klienten også rendre `App` med assetMap. Du kan
serialisere og sende assetMap til klienten slik:

```typescript
const assetMap = {
    'styles.css': '/styles.123456.css',
    'main.js': '/main.123456.js'
};

async function handler(request) {
    const { prelude } = await prerender(<App assetMap={assetMap} />, {
        bootstrapScriptContent: `window.assetMap = ${JSON.stringify(assetMap)};`,
        bootstrapScripts: [assetMap['/main.js']],
    });
    return new Response(prelude, {
        headers: { 'content-type': 'text/html' },
    });
}
```

På klienten:

```typescript
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App assetMap={window.assetMap} />);
```

---

### Rendre et React-tre til en streng av statisk HTML

Kall `prerender` for å rendre appen til en statisk HTML-streng:

```typescript
import { prerender } from 'react-dom/static';

async function renderToString() {
    const { prelude } = await prerender(<App />, {
        bootstrapScripts: ['/main.js']
    });

    const reader = prelude.getReader();
    let content = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            return content;
        }
        content += Buffer.from(value).toString('utf8');
    }
}
```

Dette gir den initiale ikke-interaktive HTML-en fra React-komponentene. På
klienten må du kalle `hydrateRoot` for å gjøre HTML-en interaktiv.

---

### Vente på at all data skal lastes

`prerender` venter på at all data skal lastes før den fullfører genereringen av
statisk HTML. Suspense brukes for å vente på data:

```tsx
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Sidebar>
        <Friends />
        <Photos />
      </Sidebar>
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  )
}
```

Hvis `<Posts />` trenger å laste data, vil `prerender` vente til innholdet er
klart før HTML-en genereres.

**Merk:** Kun Suspense-aktiverte datakilder aktiverer Suspense-komponenten,
f.eks. datahenting med Suspense-aktiverte rammeverk som Relay og Next.js,
lazy-loading av komponentkode med `lazy`, og lesing av en Promise med `use`.

---

### Avbryte prerendering

Du kan avbryte prerendering etter en timeout:

```typescript
async function renderToString() {
    const controller = new AbortController();
    setTimeout(() => {
        controller.abort()
    }, 10000);

    try {
        const { prelude } = await prerender(<App />, {
            signal: controller.signal,
        });
        //...
    } catch (error) {
        // fallback
    }
}
```

Suspense-grenser med ufullstendige barn vil inkluderes i prelude i
fallback-tilstand.

---

## Feilsøking

### Streamen starter ikke før hele appen er rendret

`prerender` venter på at hele appen skal være ferdig rendret, inkludert alle
Suspense-grenser, før den løser. Den er laget for statisk generering (SSG) og
støtter ikke streaming av innhold etter hvert som det lastes.

For streaming, bruk en SSR-API som `renderToReadableStream`.

---

**Merk:** Dette API-et er avhengig av Web Streams. For Node.js, bruk
`prerenderToNodeStream` i stedet.
