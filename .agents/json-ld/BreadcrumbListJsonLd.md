# BreadcrumbListJsonLd

BreadcrumbList er en `schema.org`-type for brødsmulesti. Den beskriver en kjede av lenkede sider, der hvert
element har navn, posisjon og en peker til siden.

## Struktur

- `@type`: `BreadcrumbList`
- `itemListElement`
  - `@type`: `ListItem`
  - `name`: `Home`
  - `position`: `1`
  - `item`
    - `@type`: `Thing`
    - `@id`: `https://www.bergans.com/no`
- `itemListElement`
  - `@type`: `ListItem`
  - `name`: `Info`
  - `position`: `2`
  - `item`
    - `@type`: `Thing`
    - `@id`: `https://www.bergans.com/no/info`
- `itemListElement`
  - `@type`: `ListItem`
  - `name`: `Bergans Stories`
  - `position`: `3`
  - `item`
    - `@type`: `Thing`
    - `@id`: `https://www.bergans.com/no/info/inspo`
- `itemListElement`
  - `@type`: `ListItem`
  - `name`: `Produktguide`
  - `position`: `4`
  - `item`
    - `@type`: `Thing`
    - `@id`: `https://www.bergans.com/no/info/inspo/produktguide`
- `itemListElement`
  - `@type`: `ListItem`
  - `name`: `Kjøpe dunjakke? Husk dette!`
  - `position`: `5`

## JSON-LD eksempel

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "name": "Hjem",
      "position": 1,
      "item": {
        "@type": "Thing",
        "@id": "https://www.utekos.no"
      }
    },
    {
      "@type": "ListItem",
      "name": "Om Utekos",
      "position": 2,
      "item": {
        "@type": "Thing",
        "@id": "https://www.utekos.no/om-oss"
      }
    },
    {
      "@type": "ListItem",
      "name": "Hva er riktig Utekos for deg?",
      "position": 3,
      "item": {
        "@type": "Thing",
        "@id": "https://www.utekos.no/handlehjelp/sammenlign-modeller"
      }
    },
    {
      "@type": "ListItem",
      "name": "Handlehjelp",
      "position": 4,
      "item": {
        "@type": "Thing",
        "@id": "https://www.bergans.com/no/info/inspo/produktguide"
      }
    },
    {
      "@type": "ListItem",
      "name": "Kjøpe dunjakke? Husk dette!",
      "position": 5
    }
  ]
}
```

## Notes

- `position` skal være heltall og følge rekkefølgen i stien.
- `item` peker normalt til den aktuelle siden via `@id`.
- `BreadcrumbList` bør brukes når du vil markere hierarkisk navigasjon, ikke bare en vanlig liste.
