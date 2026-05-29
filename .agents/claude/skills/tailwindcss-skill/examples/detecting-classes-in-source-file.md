# SKILL: Tailwind CSS Source Detection (Just-In-Time)

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for håndtering av hvordan Tailwind CSS v4 oppdager og bygger CSS-klasser fra kildekoden.

## Hvorfor dette er performant og optimalt

- [ ] **Minimal CSS-Bundle:** Tailwind skanner kildekoden og bygger utelukkende CSS for de klassene som faktisk "oppdages" som brukt. Utdata-CSSen inneholder derfor ingen overflødige stiler, noe som gir ekstremt rask lastetid.
- [ ] **Ingen tung parsing:** Tailwind analyserer ikke filene som "kode" (f.eks. ved å kjøre et AST for React eller Vue). Den skanner alt som ren "Plain text" og leter etter tekstsekvenser (tokens) som matcher klassenavn. Det gjør byggeprosessen lynrask.

## Hvordan jeg skal skrive kode for vellykket deteksjon

Siden Tailwind skanner etter hele, komplette strenger med ren tekst, er det _kristisk_ at jeg alltid skriver ut hele klassenavn i DOM/Komponenter.

- [ ] **ALDRI bygg klassenavn dynamisk (String Interpolation/Concatenation):**
  - **Feil:** `<div class="bg-${farge}-500">` (Tailwind finner bare strengen `bg-${farge}-500`, gjenkjenner den ikke som en klasse, og genererer _ingenting_).
  - **Feil:** `<div class="text-{{ isError ? 'red' : 'green' }}-600">`
- [ ] **ALLTID bruk statiske "Maps" eller fullstendige strenger:**
  - **Riktig (Ternary / If-else):** `<button class="{{ isError ? 'bg-red-500' : 'bg-green-500' }}">`
  - **Riktig (For React/Vue props):** Bruk objekter til å mappe verdier til ferdige, ukuttede klassestrenger.
    ```javascript
    const colorVariants = {
      blue: "bg-blue-600 hover:bg-blue-500",
      red: "bg-red-600 hover:bg-red-500",
    };
    return <button className={colorVariants[props.color]}>Knapp</button>;
    ```

## Konfigurering av hvilke filer som skannes

Som standard skanner Tailwind alt _utenom_ `.gitignore`, `node_modules`, `css`-filer og binærfiler. Dersom oppsettet krever justering, styles det direkte i CSS med `@source`-direktivet.

- **Tvinge skanning av spesifikke skjulte pakker:**
  ```css
  @source "../node_modules/@my-company/ui-lib";
  ```
- **Sette manuelt startpunkt (monorepos):**
  ```css
  @import "tailwindcss" source("../src");
  ```
- **Ignorere enorme "Legacy"-mapper for raskere build:**
  ```css
  @source not "../src/components/legacy";
  ```

## Tvinge generering (Safelist / Blacklist)

Hvis designet krever klasser som ikke finnes rent tekstlig i kildekoden (f.eks hvis de sprøytes inn fra en database i backend), må de safelistes via _inline_ i CSS-filen. V4 benytter ikke lenger JavaScript til dette.

- **Safeliste enkeltklasser og varianter:**
  ```css
  @source inline("underline");
  @source inline("{hover:,focus:,}underline");
  ```
- **Safeliste i bulk (Ranges / Brace expansion):**
  Her tvinger jeg frem farge-skalaen 100-900 (pluss 50 og 950) for rød bakgrunn, inkludert hover-variant.
  ```css
  @source inline("{hover:,}bg-red-{50,{100..900..100},950}");
  ```
- **Eksplisitt hindre en klasse fra å bygges (Blacklisting):**
  ```css
  @source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
  ```
