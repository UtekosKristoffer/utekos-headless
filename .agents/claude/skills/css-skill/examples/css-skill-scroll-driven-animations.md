# SKILL: CSS Scroll-driven Animations - Retningslinjer og sjekkliste

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for implementering av "Scroll-driven animations" (animerte elementer drevet av skrolling, ikke tid).

## Hvorfor og når Scroll-driven animations er performant og optimalt

- [ ] **Ingen blokkering av hovedtråden (Main Thread):** Tradisjonelle skrolle-animasjoner via JavaScript (`scroll`-event listeners eller `IntersectionObserver`) trigges på hovedtråden. CSS Scroll-driven animations kjøres asynkront direkte i nettleserens komposisjonsmotor, noe som eliminerer hakking (jank) og gir en "smørmyk" opplevelse (60/120 fps).
- [ ] **Deklarativt fremfor Imperativt:** Jeg slipper å skrive logikk for å kalkulere posisjoner. Med én CSS-egenskap (`animation-timeline`) kan jeg koble en helt vanlig CSS- `@keyframes`-animasjon til progresjonen av en skrollbar container.
- [ ] **Optimalt bruksområde:** Perfekt for alt som skal reagere utelukkende på brukerens posisjon på skjermen, som for eksempel lesefremdrifts-indikatorer (progress bars), elementer som fader/sklir inn når de blir synlige i viewporten, eller bakgrunner med parallax-effekt.

## Hvordan jeg skal bruke `animation-timeline` i praksis

For å gjøre en standard tidsbasert animasjon om til en skrolle-basert animasjon, bruker jeg egenskapen `animation-timeline` i stedet for `animation-duration`.

_(Merk: For bredere nettleserstøtte (Firefox), skal `animation-duration` alltid settes til `1ms` for sikkerhets skyld, selv om tiden nå overstyres av skrollingen)._

### 1. `scroll()` funksjonen (Scroll Progress Timeline)

Kobler animasjonen fra 0% til 100% basert på skrolleposisjonen fra topp til bunn i den angitte beholderen.

- **Bruk:** Progresjonslinjer for lesing, globale bakgrunnsendringer o.l.
- **Syntaks:** `animation-timeline: scroll(<scroller> <axis>);`
  - _Standardverdi:_ `scroll(nearest block)` (Nærmeste parent med skrollebar (Y-akse)).
  - _Roten (Hele siden):_ `scroll(root block)`

```css
.progress-bar {
  animation: fill-bar 1ms linear;
  animation-timeline: scroll(root block);
}

@keyframes fill-bar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
```

### 2. `view()` funksjonen (View Progress Timeline)

Kobler animasjonen fra 0% til 100% basert på hvor mye av _selve elementet_ (subject) som er synlig inne i skrolle-porten.

- **Bruk:** Elementer som skal fade eller skli inn ("reveal on scroll") idet de dukker opp på skjermen.
- **Viktig:** Animasjonen starter (0%) når elementet så vidt treffer kanten, og slutter (100%) når elementet forlater skjermen helt. Ofte vil vi at animasjonen skal være ferdig _før_ elementet går ut av syne, så da justerer vi nøkkelbildene til f.eks. `20%` / `80%`.

```css
.card-item {
  animation: fade-in-up 1ms linear;
  animation-timeline: view(block); /* Evaluerer posisjon i Y-aksen */
}

@keyframes fade-in-up {
  0%,
  20% {
    opacity: 0;
    transform: translateY(50px);
  }
  50%,
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Strenge regler jeg skal forholde meg til

- [ ] **Alltid definer `animation-timeline` ETTER shorthanden `animation`**: Hvis ikke vil shorthanden skrive over timeline-egenskapen med standardverdien `auto` (tiden), og skrolle-effekten vil ikke fungere.
- [ ] **Bruk fallback for tilgjengelighet (`prefers-reduced-motion`)**:
      Jeg må alltid fjerne eller begrense slike animasjoner dersom brukeren har bedt om redusert bevegelse på enheten sin.
  ```css
  @media (prefers-reduced-motion: reduce) {
    .scrolly-element {
      animation-timeline: none; /* Kobler fra animasjonen */
    }
  }
  ```
- [ ] **Sett `animation-duration: 1ms`**: Funksjonaliteten avhenger fortsatt av at den underliggende animasjonen er syntaktisk gyldig, og noen lesere (Firefox) avviser nøkkelbilde-animasjoner uten oppgitt varighet. Ved å sette den til `1ms`, faller det sømløst på plass.
