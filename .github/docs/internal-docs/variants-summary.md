# Anbefalinger for Varianter

## 1. Den nye Komposisjonsmodellen 🧩 Dette er den største konseptuelle endringen.

I stedet for å ha forhåndsdefinerte kombinasjoner som group-has-\*, er varianter
i v4 nå dynamisk komponerbare. Dette betyr at du kan kjede sammen grunnleggende
varianter for å lage det du trenger, som i group-has-focus:opacity-100. Dette er
en fundamental forbedring som gir enorm fleksibilitet og gjør rammeverket mer
logisk.

## 2. Kritiske Migreringsendringer fra v3 til v4 ⚠️ 
Disse filene avslører tre subtile, men ekstremt viktige "breaking changes" som enhver utvikler må kjenne til for å unngå feil under oppgradering:

- Stabling av varianter (Stacking Order): Evalueringsrekkefølgen har snudd. Den
  er nå venstre-til-høyre, lik vanlig CSS, i motsetning til høyre-til-venstre i
  v3. En klasse som first:_:pt-0 i v3 må bli _:first:pt-0 i v4.

- Syntaks for CSS-variabler: For å unngå tvetydighet, må vilkårlige verdier som
  bruker CSS-variabler nå bruke parenteser () i stedet for hakeparenteser [].
  For eksempel er bg-[--brand-color] (v3) nå bg-(--brand-color) (v4).

- Oppførsel for Gradienter: Varianter på gradienter bevarer nå de andre
  fargestoppene, i motsetning til v3 hvor de ble tilbakestilt. Dette er mer
  forutsigbart, men kan kreve at man eksplisitt fjerner et fargestopp med f.eks.
  dark:via-none.

## 3.Superkrefter med Vilkårlige og Egendefinerte Varianter 🦸

Disse to verktøyene gir deg full kontroll til å lage hvilken som helst selektor:

- Vilkårlige Varianter med At-regler: Muligheten til å bygge inn @supports og
  @media-regler direkte i en vilkårlig variant i HTML-en er en "game-changer".
  Eksempler som `[@supports(display:grid)]:grid` for "progressive enhancement"
  eller `[@media(min-width:768px)_and_(hover:hover)]:hover:scale-105` for
  komplekse interaksjoner er ekstremt kraftige.

- `@custom-variant` for Gjenbruk: Dette direktivet er den perfekte måten å gjøre
  en smart, men kompleks vilkårlig variant om til en ren, semantisk og
  gjenbrukbar variant. Å lage reduced-motion:transition-none fra en
  media-spørring er et perfekt eksempel på dette.

## 4.Broen til Egendefinert CSS: @variant 🌉 F
or de gangene man må skrive egendefinert CSS (f.eks. for komplekse komponenter), er
@variant-direktivet essensielt. Det lar deg bruke Tailwinds kjente varianter som

`dark:`, `hover:`, `lg:` inne i dine egne CSS-regler, noe som skaper en sømløs og
konsistent arbeidsflyt mellom utility-klasser og egendefinert CSS.
