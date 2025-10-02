# Våre prinsipper (i utvikling)

## 1."Best Practice"-prinsippet

Den teknisk "reneste" metoden er den primitive varianten

```css
@utility btn-tab {
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background-color: var(--color-sidebar-foreground);
}
```

Dette er fordi den lager en ekte, ny byggekloss som Tailwind-motoren fullt ut
forstår, noe som gir best fleksibilitet og integrasjon.

## 2."Minimal Token"-prinsippet (Ditt scenario):

Du introduserte deretter et nytt, overordnet mål: å redusere antall tokens i
JSX-filene så mye som mulig for å optimalisere arbeidsflyten din med meg. Dette
endret strategien vår.

`@apply`-metoden er den suverent beste (og eneste praktiske) måten å pakke en
kompleks samling av utility-klasser – inkludert deres varianter (`hover`:,
`data-[selected=true]:`) – inn i ett enkelt, semantisk navn.

Ved å skrive:

```css
@utility btn-variant-swatch {
  @apply size-6 rounded-full ... hover:scale-110;
  @apply border-primary hover:border-primary/50;
  @apply data-[selected=true]:border-border data-[selected=true]:ring-2 ...;
}
```

...oppnår vi målsettingen perfekt. Vi tar en kompleks logikk som før krevde
if/else-lignende betingelser i `className`-strengen, og abstraherer den bort til
ett eneste ord.
