# SKILL: CSS `@starting-style` - Retningslinjer og sjekkliste

Dette er en konsekvent instruks og huskeliste for meg selv som AI-assistent for implementering av den nye CSS-regelen `@starting-style`.

## Hvorfor og når `@starting-style` er performant og optimalt

- [ ] **Slipper JavaScript for å trigge inn-animasjoner (Entry animations):** Tidligere var vi avhengige av JavaScript (som `requestAnimationFrame` eller forsinket tillegging av klasser) for å animere et element som nettopp ble lagt til i DOM-en eller gikk fra `display: none` til `block`. Med `@starting-style` håndterer og optimaliserer CSS-motoren hele livssyklusen sømløst.
- [ ] **Gjør `display: none` animerbart:** Sammen med egenskapen `transition-behavior: allow-discrete` kan nettleseren nå endelig fullføre overganger (transitions) før et element blir usynlig eller forsvinner ut av layouten.
- [ ] **Innebygd støtte for Top-layer elementer:** Dette er den absolutt mest optimale og robuste måten å gi myke "entry" og "exit"-animasjoner til native HTML-elementer som `<dialog>` og "popovers" som løftes opp i "the top layer" av nettleseren.

## Hvordan jeg skal bruke `@starting-style` i praksis

For å få dette til å fungere, er det viktig å skille mellom de tre tilstandene (states) for et element:

1. **Starting-style state:** Hvordan elementet ser ut i det nøyaktige millisekundet det lander i DOM-en.
2. **Transitioned state (Aktiv/Åpen):** Hvordan elementet ser ut mens det vises for brukeren (slutt-tilstand for inn-animasjon).
3. **Default state (Lukket/Grind):** Hvordan elementet ser ut idet det ikke lenger skal vises. CSS faller tilbake på denne under ut-animasjonen.

### 1. Vanlige inn-animasjoner (Elementer i DOM-treet)

Gjelder elementer som mottar en oppdatering (f.eks. ved klikk på "Vis mer").

```css
.boks {
  /* Default/Lukket - Slik ser den opprinnelig ut (og slik forsvinner den) */
  opacity: 0;
  display: none;
  /* allow-discrete MÅ med for å animere display/synlighet */
  transition:
    opacity 0.5s,
    display 0.5s allow-discrete;
}

.boks.aktiv {
  /* Transitioned/Vises - Slik ser den ut mens den er aktiv på skjermen */
  opacity: 1;
  display: block;
}

@starting-style {
  .boks.aktiv {
    /* Starting-style - Slik ser den ut AKKURAT idet den dukker opp i DOM */
    opacity: 0;
  }
}
```

### 2. Animere Popovers og Dialoger (<dialog> / popover)

Gjelder elementer lagt til i "Top-layer" som skal animeres inn og ut.

```css
[popover] {
  /* Ut-animasjon / Default skjult tilstand */
  opacity: 0;
  transform: scale(0.9);

  /* overlay MÅ inkluderes slik at det forblir i top-layer til animasjonen er over */
  transition:
    opacity 0.4s,
    transform 0.4s,
    overlay 0.4s allow-discrete,
    display 0.4s allow-discrete;
}

[popover]:popover-open {
  /* Åpen tilstand */
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  [popover]:popover-open {
    /* Inn-animasjon / Starting-style */
    opacity: 0;
    transform: scale(0.9);
  }
}
```

## Strenge regler jeg skal forholde meg til

- [ ] **Spesifisitet og Rekkefølge:** `@starting-style` har ifølge CSS-spesifikasjonen _nøyaktig samme prioritet_ som originalregelen (f.eks. `.boks` eller `[popover]`). Derfor _MÅ_ jeg alltid, fullt og konsekvent, plassere `@starting-style`-blokken _etter_ den vanlige regelen i koden.
- [ ] **Brukt utelukkende til "Inn"-animering:** `@starting-style` bryter kun inn når et element har vært skjult eller fraværende. Det aktiveres aldri når et element lukkes/fjernes - funksjonen bygger altså utelukkende broen _fra ingen tilstedeværelse_.
- [ ] **Krav om `allow-discrete` (Veldig viktig):** Skal jeg animere elementer til og fra `display: none` og native elementer som havner i skjermens øverste lag (`overlay`), _må_ `allow-discrete` flagges i selve `transition`-shorthanden min for nettopp `display` (og `overlay`). Uten dette avbrytes all ut-animasjon brutalt.
