Skjønner. Her er **samme innhold**, ryddet til gyldig markdown med korrekt
syntaks — uten ekstra vurderinger eller nye tiltak. Kilde:

````markdown
# Performance-notater for `/skreddersy-varmen/`

`/skreddersy-varmen/` scorer svært lavt på performance — markant svarer på mobil
enn desktop.

De største problemene er:

- Total Blocking Time
- Largest Contentful Paint
- Speed

## Ressurser

### CSS

- <https://utekos.no/_next/static/chunks/09imwiw4n5l1m.css?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>
- <https://utekos.no/_next/static/chunks/0q1opzpq-m35-.css?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>

---

## Forced reflow

A forced reflow occurs when JavaScript queries geometric properties, such as
`offsetWidth`, after styles have been invalidated by a change to the DOM state.

This can result in poor performance.

Learn more about forced reflows and possible mitigations.

**Status:** Unscored

### Berørt ressurs

<https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>

### Top function call

<https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>

### Source, blant andre

<https://utekos.no/_next/static/chunks/0pqmk4xl7-ky..js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>

### Total reflow time

| Metric            |    Value |
| ----------------- | -------: |
| Total reflow time | 2,481 ms |

---

## LCP breakdown

Each subpart has specific improvement strategies. Ideally, most of the LCP time
should be spent on loading the resources, not within delays.

**Status:** LCP / Unscored

| Subpart                | Duration |
| ---------------------- | -------: |
| Time to first byte     |    10 ms |
| Resource load delay    | 1,530 ms |
| Resource load duration |    60 ms |
| Element render delay   | 3,250 ms |

### LCP-element

**Alt-tekst:** `Utekos kveldsstemning`

```html
<img
  alt="Utekos kveldsstemning"
  loading="eager"
  decoding="async"
  data-nimg="fill"
  class="object-cover"
  sizes="(min-width: 768px) 0px, 100vw"
  srcset="
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fterrace-4-5.09njw5rjpp~2o.png…
  "
  src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fterrace-4-5.…"
  style="position: absolute; height: 100%; width: 100%; inset: 0px;"
/>
```

---

## LCP request discovery

Optimize LCP by making the LCP image discoverable from the HTML immediately, and
avoiding lazy-loading.

**Status:** LCP / Unscored

| Check                                       | Status  |
| ------------------------------------------- | ------- |
| Lazy load not applied                       | OK      |
| `fetchpriority="high"` should be applied    | Missing |
| Request is discoverable in initial document | OK      |

### LCP-element

**Alt-tekst:** `Utekos kveldsstemning`

```html
<img
  alt="Utekos kveldsstemning"
  loading="eager"
  decoding="async"
  data-nimg="fill"
  class="object-cover"
  sizes="(min-width: 768px) 0px, 100vw"
  srcset="
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fterrace-4-5.09njw5rjpp~2o.png…
  "
  src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fterrace-4-5.…"
  style="position: absolute; height: 100%; width: 100%; inset: 0px;"
/>
```

---

## Network dependency tree

Avoid chaining critical requests by reducing the length of chains, reducing the
download size of resources, or deferring the download of unnecessary resources
to improve page load.

**Status:** LCP / Unscored

| Metric                        |                Value |
| ----------------------------- | -------------------: |
| Maximum critical path latency |             4,468 ms |
| Initial Navigation            | `/skreddersy-varmen` |
| Domain                        |          `utekos.no` |
| Initial navigation time       |               363 ms |
| Initial navigation size       |            30.13 KiB |

### Kritiske ressurser

- <https://utekos.no/_next/static/chunks/09imwiw4n5l1m.css?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>
- <https://utekos.no/_next/static/chunks/0q1opzpq-m35-.css?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>
- <https://utekos.no/_next/static/media/google_sans_latin-s.06q4lwtlpy078.woff2?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ>

---

## Preconnected origins

Preconnect hints help the browser establish a connection earlier in the page
load, saving time when the first request for that origin is made.

The following are the origins that the page preconnected to.

| Origin | Source                                |
| ------ | ------------------------------------- |
| `/`    | `head > link`                         |
| `/`    | `</>; rel=preconnect; crossorigin=""` |

### Source

```html
<link rel="preconnect" crossorigin="" href="/" />
```

### Status

Unused preconnect.

Only use preconnect for origins that the page is likely to request.

---

## Preconnect candidates

Add preconnect hints to your most important origins, but try to use no more
than 4.

No additional origins are good candidates for preconnecting.

---

## Use efficient cache lifetimes

A long cache lifetime can speed up repeat visits to your page.

Learn more about caching.

**Status:** LCP / FCP / Unscored

| Finding                       | Estimated savings |
| ----------------------------- | ----------------: |
| Use efficient cache lifetimes |            10 KiB |

---

# Diagnostics

## Minimize main-thread work

**Total:** 8.1 s

Consider reducing the time spent parsing, compiling and executing JS. You may
find delivering smaller JS payloads helps with this.

[Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/?utm_source=lighthouse&utm_medium=lr)

**Status:** TBT / Unscored

| Category                     | Time Spent |
| ---------------------------- | ---------: |
| Style & Layout               |   3,331 ms |
| Script Evaluation            |   3,029 ms |
| Other                        |   1,183 ms |
| Rendering                    |     260 ms |
| Script Parsing & Compilation |     231 ms |
| Garbage Collection           |      57 ms |
| Parse HTML & CSS             |      38 ms |

---

## Reduce unused JavaScript

**Estimated savings:** 133 KiB

Reduce unused JavaScript and defer loading scripts until they are required to
decrease bytes consumed by network activity.

[Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/?utm_source=lighthouse&utm_medium=lr)

**Status:** LCP / FCP / Unscored

**Show 3rd-party resources:** 0

| URL                                                                                                                                       | Domain      | Transfer size | Estimated savings |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------: | ----------------: |
| `utekos.no`                                                                                                                               | First party |     198.5 KiB |         133.0 KiB |
| [`…/chunks/0scmncmdgfr0n.js?dpl=dpl_DHv1f…`](https://utekos.no/_next/static/chunks/0scmncmdgfr0n.js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ) | `utekos.no` |      45.0 KiB |          44.6 KiB |
| [`…/chunks/15shv65uut8v-.js?dpl=dpl_DHv1f…`](https://utekos.no/_next/static/chunks/15shv65uut8v-.js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ) | `utekos.no` |      52.4 KiB |          36.0 KiB |
| [`…/chunks/0pqmk4xl7-ky..js?dpl=dpl_DHv1f…`](https://utekos.no/_next/static/chunks/0pqmk4xl7-ky..js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ) | `utekos.no` |      30.9 KiB |          30.9 KiB |
| [`…/chunks/0956.uguclzfz.js?dpl=dpl_DHv1f…`](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_DHv1fqFwkRK2gZ2R8Zpbk9SJCjLZ) | `utekos.no` |      70.2 KiB |          21.5 KiB |
````
