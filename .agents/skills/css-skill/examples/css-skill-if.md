# SKILL: CSS `if()` funksjonen - Retningslinjer og sjekkliste

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent. Den gjelder for bruk av den native CSS-funksjonen `if()`, som lar oss anvende betinget (conditional) logikk direkte i CSS-verdier.

## Hvorfor og når `if()` er performant og optimalt

- [ ] **Fjerner bloat fra Media/Container Queries:** Når kun én eller to egenskaper (f.eks. margin eller font-size) skal endres ved et knekkpunkt, er det mer optimalt å bruke `if()` direkte på egenskapen fremfor å skrive en helt ny `@media` eller `@container` blokk. Dette reduserer filstørrelsen betraktelig.
- [ ] **Direkte tilstandsstyring (State Management):** Ved hjelp av Style Queries (`style(--variabel)`) kan jeg endre stil på et element basert på dets egne CSS-variabler, uten å måtte sjekke foreldre-elementene. Nettleseren løser dette lokalt og lynraskt.
- [ ] **Kalkulering i sanntid:** Funksjonen kan nøstes inn i andre funksjoner som `calc()`. Dette flytter logikk fra JavaScript over til CSS-motoren (som er raskere).

## Hvordan jeg skal bruke `if()` i praksis

### 1. Style Queries (Sjekk av CSS-variabler)

Optimalt for å bytte utseende basert på et aktivt tema/tilstand.

```css
background-image: if(
  style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8) ;
    style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971) ;
    else: none; /* Alltid en fallback! */
);
```

### 2. Media Queries (Responsivt på egenskap-nivå)

Optimalt for rask justering av avstander/størrelser basert på skjermbredde.

```css
padding: if(media(width < 700px): 10px; else: 20px;);
```

### 3. Feature Queries (Browser-support / Fallback)

Optimalt for å blande state-of-the-art CSS med trygge fallbacks på én enkelt linje.

```css
color: if(supports(color: lch(75% 0 0)): lch(75% 0 0) ; else: silver;);
```

## Strenge syntaks-regler jeg skal forholde meg til

- [ ] **Ingen mellomrom før start-parentes:** Koden MÅ skrives som `if(` og "aldri" `if (`. Typografiske mellomrom knuser hele deklarasjonen.
- [ ] **Bruk ALLTID `else: <verdi>;`:** Funksjonen mangler elegant nedgradering automatisk. For å unngå at en CSS-egenskap verdsettes til `invalid` eller faller tilbake til uønskede standarder, SKAL det alltid legges til en `else:`-klausul.
- [ ] **Kolon og Semikolon:** Bruk kolon `:` mellom sjekken og verdien, og separer flere sjekker med semikolon `;`.
- [ ] **Nøstede queries støttes logisk:** Jeg kan bruke logikk som `and`, `or` og `not` inne i en if-query: `if(media((width > 700px) and (width < 1000px)): blue; else: red;)`
- [ ] **Kan utgjøre deler av en verdi:** Jeg kan bruke `if()` for kun deler av en shorthand-property, som for eksempel: `border: 3px solid if(style(--aktiv: sant): blue; else: gray;);`.
