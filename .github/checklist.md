# TAILWIND CSS v4

## En sjekkliste for å følge best practise og utfasede metoder

### Fjernede, deprecated utilities

Vi har fjernet utilities som var deprekerte i v3 og ikke dokumentert på flere år. Nedenfor følger hva som er fjernet og moderne erstatninger:

| Deprecated                | Erstatning                                     |
|---------------------------|------------------------------------------------|
| `bg-opacity-*`            | bruk opasitetsmodifikatorer, f.eks. `bg-black/50` |
| `text-opacity-*`          | bruk opasitetsmodifikatorer, f.eks. `text-black/50` |
| `border-opacity-*`        | bruk opasitetsmodifikatorer, f.eks. `border-black/50` |
| `divide-opacity-*`        | bruk opasitetsmodifikatorer, f.eks. `divide-black/50` |
| `ring-opacity-*`          | bruk opasitetsmodifikatorer, f.eks. `ring-black/50` |
| `placeholder-opacity-*`   | bruk opasitetsmodifikatorer, f.eks. `placeholder-black/50` |
| `flex-shrink-*`           | `shrink-*`                                     |
| `flex-grow-*`             | `grow-*`                                       |
| `overflow-ellipsis`       | `text-ellipsis`                                |
| `decoration-slice`        | `box-decoration-slice`                         |
| `decoration-clone`        | `box-decoration-clone`                         |

### Renamed utilities

Vi har omdøpt følgende utilities i v4 for å gjøre dem mer konsistente og forutsigbare:

| v3                  | v4                      |
|---------------------|------------------------|
| `shadow-sm`         | `shadow-xs`            |
| `shadow`            | `shadow-sm`            |
| `drop-shadow-sm`    | `drop-shadow-xs`       |
| `drop-shadow`       | `drop-shadow-sm`       |
| `blur-sm`           | `blur-xs`              |
| `blur`              | `blur-sm`              |
| `backdrop-blur-sm`  | `backdrop-blur-xs`     |
| `backdrop-blur`     | `backdrop-blur-sm`     |
| `rounded-sm`        | `rounded-xs`           |
| `rounded`           | `rounded-sm`           |
| `outline-none`      | `outline-hidden`       |
| `ring`              | `ring-3`               |

### Renamed outline utility

Outline utility setter nå `outline-width: 1px` som standard for å være mer konsistent med border og ring utilities. Alle `outline-<number>` utilities setter nå `outline-style: solid` automatisk.

```html
<input class="outline outline-2" />
<input class="outline-2" />
```

`outline-none` satte tidligere ikke faktisk `outline-style: none`, men en usynlig outline som fortsatt kunne vises i forced colors mode for tilgjengelighet. Dette er nå omdøpt til `outline-hidden`, og en ny `outline-none` setter faktisk `outline-style: none`.

For å oppdatere prosjektet, erstatt bruk av `outline-none` med `outline-hidden`:

```html
<input class="focus:outline-none" />
<input class="focus:outline-hidden" />
```

### Default ring width change

I v3 la `ring` til en 3px ring. I v4 er dette endret til 1px for konsistens med borders og outlines.

For å oppdatere, erstatt bruk av `ring` med `ring-3`:

```html
<input class="ring ring-blue-500" />
<input class="ring-3 ring-blue-500" />
```

### Space-between selector

Selectoren for `space-x-*` og `space-y-*` utilities er endret for å løse ytelsesproblemer på store sider:

```css
/* Før */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 1rem;
}
/* Nå */
.space-y-4 > :not(:last-child) {
    margin-bottom: 1rem;
}
```

Hvis dette gir problemer, anbefales det å migrere til flex eller grid layout og bruke `gap`:

```diff
-<div class="space-y-4 p-4">
+<div class="flex flex-col gap-4 p-4">
    <label for="name">Name</label>
    <input type="text" name="name" />
</div>
```

### Bruk av varianter med gradienter

I v3 ville en variant som overstyrte deler av en gradient "resette" hele gradienten, slik at `to-*` fargen ble transparent i dark mode:

```html
<div class="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500">
    <!-- ... -->
</div>
```

For å "unsette" en tre-stop gradient til to-stop i en bestemt state, bruk `via-none`:

```html
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
    <!-- ... -->
</div>
```

### Custom utilities sortering

Custom utilities sorteres nå basert på antall egenskaper de definerer. Komponent utilities som `.btn` kan overskrives av andre Tailwind utilities uten ekstra konfigurasjon:

```diff
-@layer components {
-  .btn {
-    border-radius: 0.5rem;
-    padding: 0.5rem 1rem;
-    background-color: ButtonFace;
-  }
-}
+@utility btn {
+  border-radius: 0.5rem;
+  padding: 0.5rem 1rem;
+  background-color: ButtonFace;
+}
```

### Alltid map props til statiske klassenavn

```jsx
function Button({ color, children }) {
    const colorVariants = {
        blue: "bg-blue-600 hover:bg-blue-500",
        red: "bg-red-600 hover:bg-red-500",
    };
    return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

Dette lar deg mappe ulike prop-verdier til ulike fargenyanser:

```jsx
function Button({ color, children }) {
    const colorVariants = {
        blue: "bg-blue-600 hover:bg-blue-500 text-white",
        red: "bg-red-500 hover:bg-red-400 text-white",
        yellow: "bg-yellow-300 hover:bg-yellow-400 text-black",
    };
    return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

Så lenge du alltid bruker komplette klassenavn, vil Tailwind generere all CSS korrekt.

## Stable varianter

Du kan kombinere flere betingelser for å lage ekstremt presise stilregler, som `dark:md:hover:bg-fuchsia-600`. Vurder om det er hensiktsmessig å utnytte.

### Vilkårlige egenskaper (Arbitrary Properties)

Du kan skrive en hvilken som helst CSS-egenskap direkte i HTML, som `[mask-type:luminance]`. Vurder om dette er utnyttet og fiks det ved behov. Å sette responsive CSS-variabler, som `[--scroll-offset:56px] lg:[--scroll-offset:44px]`, kan eliminere behovet for mange små, separate CSS-klasser.

### Vilkårlige varianter (Arbitrary Variants)

Du kan lage komplekse, engangs-selektorer direkte i klassestrengen, som `[&:nth-child(-n+3)]:hover:underline`, og dette er en "game-changer". Vurder om det er utnyttet og juster ved behov.

## Type-hinting

Legg til en datatype, som `text-[length:--my-var]` eller `text-[color:--my-var]` for vilkårlige verdier, for å skrive robust og forutsigbar kode.

Vurder den nyttige stenografien for å bruke en CSS-variabel som en vilkårlig verdi, f.eks. `fill-[--my-brand-color]`, som automatisk legger til `var()`, for å øke lesbarhet og utvikleropplevelse.

## Stabling (Composition via Stacking)

Prinsippet er at all styling for et element – inkludert ulike tilstander (`hover`, `focus`, `active`), responsive varianter og andre betingelser – skal ligge på selve HTML-elementet. Dette er kjernen i å bygge "sofistikerte" grensesnitt.

## Komposisjon gjennom stabling (Composition via Stacking)

Bruk muligheten til å kjede sammen flere varianter for å bygge en kompleks og spesifikk stilregel, som `dark:md:hover:bg-fuchsia-600`.

