# Anbefalinger for @utility

1. Paradigmeskiftet fra `@layer` til `@utility:` Den tydelige
   diff-sammenligningen som viser overgangen fra @layer utilities i v3 til
   `@utility` i v4 er ekstremt verdifull. Den forklarer hvorfor endringen er
   gjort – at v4 nå bruker native "cascade layers" og ikke lenger overstyrer
   @layer-regelen. Dette er kritisk for alle med erfaring fra v3.

2. Ny "best practice" for komponentklasser: Anbefalingen om å definere
   komponent-lignende klasser (som `.btn`) med @utility i stedet for @layer
   components er en fundamental endring i tankesett. Dette er avgjørende for å
   sikre at komponentstiler kan overstyres av vanlige utility-klasser.

3. Automatisk sortering basert på antall egenskaper: Informasjonen om at
   utilities nå sorteres automatisk basert på hvor mange CSS-egenskaper de
   definerer er en "game-changer". Dette er en ikke-opplagt, men helt sentral
   mekanisme som gjør at en-linjes-utilities kan overstyre mer komplekse
   komponent-utilities. Dette er en kjerneårsak til hvorfor den nye "best
   practice"-en fungerer.

4. Funksjonelle og tema-baserte utilities `(--value()):` Evnen til å skape
   "funksjonelle utilities" som tar imot argumenter, er svært kraftig. Spesielt
   viktig er syntaksen `--value(--theme-key-*)` som binder `@utility` direkte
   til verdier definert i `@theme`. Dette viser hvordan v4-systemet er designet
   for å være helhetlig og er en kjernefunksjon som absolutt bør dokumenteres.
