# Tailwind v4 med shadcn/ui

> **Oversikt**: Hvordan bruke shadcn/ui med Tailwind v4 og React 19.

## Table of Contents

1. [Innledning](#innledning)
2. [Hva er nytt](#hva-er-nytt)
3. [Prøv det ut](#prøv-det-ut)
4. [Oppgrader prosjektet ditt](#oppgrader-prosjektet-ditt)
5. [Endringslogg](#endringslogg)

---

## Innledning

Det er her! Tailwind v4 og React 19. Klar for deg å prøve ut. Du kan begynne å
bruke det i dag.

---

## Hva er nytt

### Hovedfunksjoner

- **CLI kan nå initialisere prosjekter** med Tailwind v4
- **Full støtte** for det nye `@theme`-direktivet og
  `@theme inline`-alternativet
- **Alle komponenter er oppdatert** for Tailwind v4 og React 19
- **Vi har fjernet `forwardRefs`** og justert typene
- **Hver primitive har nå** et `data-slot`-attributt for styling
- **Vi har fikset og ryddet opp** i stilen til komponentene
- **Vi avvikler toast-komponenten** til fordel for sonner
- **Buttons bruker nå** standard cursor
- **Vi avvikler default-stilen**. Nye prosjekter vil bruke new-york
- **HSL-farger er nå konvertert** til OKLCH

### Bakoverkompatibilitet

> **Merk**: Dette er ikke-brytende endringer. Dine eksisterende apper med
> Tailwind v3 og React 18 vil fortsatt fungere. Når du legger til nye
> komponenter, vil de fortsatt være i v3 og React 18 til du oppgraderer. Bare
> nye prosjekter starter med Tailwind v4 og React 19.

---

## Prøv det ut

Du kan teste Tailwind v4 + React 19 i dag ved å bruke canary-utgivelsen av CLI.
Se de rammeverk-spesifikke veiledningene nedenfor for hvordan du kommer i gang.

---

## Oppgrader prosjektet ditt

> **Viktig**: Før du oppgraderer, vennligst les
> [Tailwind v4 Compatibility Docs](https://tailwindcss.com/docs/compatibility)
> og sørg for at prosjektet ditt er klart for oppgraderingen. Tailwind v4 bruker
> blødende-kant nettleserfunksjoner og er designet for moderne nettlesere.

### Hovedfordelen med shadcn/ui

En av hovedfordelene ved å bruke shadcn/ui er at koden du ender opp med er
nøyaktig det du ville skrevet selv. Det er ingen skjulte abstraksjoner.

Dette betyr at når en avhengighet har en ny utgivelse, kan du bare følge de
offisielle oppgraderingsveiene.

### Trinnvis oppgraderingsguide

Her er hvordan du oppgraderer eksisterende prosjekter (full dokumentasjon er på
vei):

#### 1. Følg Tailwind v4 Upgrade Guide

- Oppgrader til Tailwind v4 ved å følge den
  [offisielle oppgraderingsguiden](https://tailwindcss.com/docs/upgrade-guide)
- Bruk `@tailwindcss/upgrade@next` codemod for å fjerne utdaterte
  utility-klasser og oppdatere tailwind config

#### 2. Oppdater CSS-variablene dine

Codemod vil migrere CSS-variablene dine som referanser under
`@theme`-direktivet.

**Før:**

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
}
```

**Etter forbedring:**

For å gjøre det enklere å jobbe med farger og andre variabler, må vi flytte
`hsl`-wrapperne og bruke `@theme inline`.

**Slik gjør du det:**

1. Flytt `:root` og `.dark` ut av `@layer base`
2. Pakk fargeverdiene inn i `hsl()`
3. Legg til `inline`-alternativet til `@theme` (dvs. `@theme inline`)
4. Fjern `hsl()`-wrapperne fra `@theme`

```css
:root {
  --background: hsl(0 0% 100%); /* <-- Pakk inn i hsl */
  --foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(0 0% 3.9%); /* <-- Pakk inn i hsl */
  --foreground: hsl(0 0% 98%);
}

@theme inline {
  --color-background: var(--background); /* <-- Fjern hsl */
  --color-foreground: var(--foreground);
}
```

**Fordelen**: Denne endringen gjør det mye enklere å få tilgang til
temavariablene dine både i utility-klasser og utenfor CSS, for eksempel ved å
bruke fargeverdier i JavaScript.

#### 3. Oppdater farger for charts

Nå som temafarger kommer med `hsl()`, kan du fjerne wrapper-en i din
`chartConfig`:

```typescript
const chartConfig = {
  desktop: {
    label: "Desktop",
-   color: "hsl(var(--chart-1))",
+   color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
-   color: "hsl(var(--chart-2))",
+   color: "var(--chart-2)",
  },
} satisfies ChartConfig
```

#### 4. Bruk ny size-\* utility

Den nye `size-*` utility (lagt til i Tailwind v3.4), støttes nå fullt ut av
tailwind-merge. Du kan erstatte `w-*` `h-*` med den nye `size-*` utility:

```css
- w-4 h-4
+ size-4
```

#### 5. Oppdater avhengighetene dine

```bash
pnpm up "@radix-ui/*" cmdk lucide-react recharts tailwind-merge clsx --latest
```

#### 6. Fjern forwardRef

Du kan bruke `remove-forward-ref` codemod for å migrere din `forwardRef` til
props eller manuelt oppdatere primitivene.

**For codemod**: Se
[react-codemod remove-forward-ref](https://github.com/reactjs/react-codemod#remove-forward-ref).

**For manuell oppdatering**, følg disse trinnene:

1. Erstatt `React.forwardRef<...>` med `React.ComponentProps<...>`
2. Fjern `ref={ref}` fra komponenten
3. Legg til et `data-slot`-attributt. Dette vil være nyttig for styling med
   Tailwind
4. Du kan valgfritt konvertere til en navngitt funksjon og fjerne `displayName`

**Før:**

```tsx
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b last:border-b-0', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'
```

**Etter:**

```tsx
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot='accordion-item'
      className={cn('border-b last:border-b-0', className)}
      {...props}
    />
  )
}
```

---

## Endringslogg

### 19. mars 2025 - Avvikle tailwindcss-animate

Vi har avviklet `tailwindcss-animate` til fordel for `tw-animate-css`.

**Nye prosjekter** vil ha `tw-animate-css` installert som standard.

**For eksisterende prosjekter**, følg trinnene nedenfor for å migrere:

#### Migrasjonstrinn

1. **Fjern** `tailwindcss-animate` fra avhengighetene dine
2. **Fjern** `@plugin 'tailwindcss-animate'` fra din `globals.css`-fil
3. **Installer** `tw-animate-css` som en dev-avhengighet
4. **Legg til** `@import "tw-animate-css"` i din `globals.css`-fil

```css
- @plugin 'tailwindcss-animate';
+ @import "tw-animate-css";
```

### 12. mars 2025 - Nye mørk modus-farger

Vi har revurdert mørk modus-fargene og oppdatert dem for å være mer
tilgjengelige.

**Hvis du kjører et eksisterende Tailwind v4-prosjekt** (ikke et oppgradert¹),
kan du oppdatere komponentene dine til å bruke de nye mørk modus-fargene ved å
legge til komponentene dine på nytt ved hjelp av CLI².

#### Oppdateringstrinn

1. **Commit alle endringer**

   CLI vil overskrive eksisterende komponenter. Vi anbefaler å committe
   eventuelle endringer du har gjort på komponentene dine før du kjører CLI.

   ```bash
   git add .
   git commit -m "Save changes before updating components"
   ```

2. **Oppdater komponenter**

   ```bash
   npx shadcn@latest add --all --overwrite
   ```

3. **Oppdater farger**

   Oppdater mørk modus-fargene i din `globals.css`-fil til nye OKLCH-farger. Se
   [Base Colors-referansen](https://ui.shadcn.com/colors) for en liste over
   farger.

4. **Gjennomgå endringer**

   Gjennomgå og gjenopprett eventuelle endringer du har gjort på komponentene
   dine.

#### Fotnoter

¹ **Oppgraderte prosjekter** påvirkes ikke av denne endringen. Du kan fortsette
å bruke de gamle mørk modus-fargene.

² **Oppdatering av komponenter** vil overskrive eksisterende komponenter.

---

## Sammendrag

Tailwind v4 og React 19 representerer en betydelig oppgradering som gir:

- **Forbedret ytelse** med moderne nettleserteknologi
- **Enklere konfigurasjon** med `@theme`-direktivet
- **Bedre utvikleropplevelse** med type-sikkerhet
- **Moderne komponentarkitektur** uten `forwardRef`
- **Forbedret tilgjengelighet** med nye mørk modus-farger

Ved å følge denne guiden kan du sømløst oppgradere eksisterende prosjekter eller
starte nye med de nyeste teknologiene.
