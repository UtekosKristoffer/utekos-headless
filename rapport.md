# Insights

## Render-blocking requests

**Est savings:** 620 ms

Requests are blocking the page's initial render, which may delay LCP.
[Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking?utm_source=lighthouse&utm_medium=lr)
can move these network requests out of the critical path.

**Status:** LCPFCPUnscored

CSS

```
.lh-3p-filter {  color: var(--color-gray-600);  float: right;  padding: 6px var(--stackpack-padding-horizontal);}.lh-3p-filter-label,.lh-3p-filter-input {  vertical-align: middle;  user-select: none;}.lh-3p-filter-input:disabled + .lh-3p-ui-string {  text-decoration: line-through;}
```

**Show 3rd-party resources:** 0

| URL | Transfer size | Duration |
| --- | ------------- | -------- |

| utekos.no  
First party | 58.7 KiB | 2,100 ms | |
[…chunks/12vdvsqisx8vu.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR](https://utekos.no/_next/static/chunks/12vdvsqisx8vu.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 57.7 KiB | 1,620 ms | |
[…chunks/0fkhg7jwry7h1.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR](https://utekos.no/_next/static/chunks/0fkhg7jwry7h1.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 1.0 KiB | 490 ms |

## Legacy JavaScript

**Est savings:** 14 KiB

Polyfills and transforms enable older browsers to use new JavaScript features.
However, many aren't necessary for modern browsers. Consider modifying your
JavaScript build process to not transpile
[Baseline](https://web.dev/articles/baseline-and-polyfills?utm_source=lighthouse&utm_medium=lr)
features, unless you know that you must support older browsers.
[Learn why most sites can deploy ES6+ code without transpiling](https://developer.chrome.com/docs/performance/insights/legacy-javascript?utm_source=lighthouse&utm_medium=lr)

**Status:** LCPFCPUnscored

**Show 3rd-party resources:** 0

| URL | Feature | Wasted bytes |
| --- | ------- | ------------ |

| utekos.no  
First party | | 13.7 KiB | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| | 13.7 KiB | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:5491](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| Array.prototype.at | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:4879](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| Array.prototype.flat | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:4992](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| Array.prototype.flatMap | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:5368](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| Object.fromEntries | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:5626](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| Object.hasOwn | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:4621](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| String.prototype.trimEnd | | |
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:4536](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| String.prototype.trimStart | |

## Improve image delivery

**Est savings:** 115 KiB

Reducing the download time of images can improve the perceived load time of the
page and LCP.
[Learn more about optimising image size](https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=lr)

**Status:** LCPFCPUnscored

**Show 3rd-party resources:** 0

| Item | URL | Resource size | Est savings |
| ---- | --- | ------------- | ----------- |

| utekos.no  
First party | | 174.3 KiB | 114.9 KiB | | Selvformet eleganse |
[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkikkert-kate-2160.0ehl6yvlu2~3q.webp&w=750&q=80&dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 58.0 KiB | 40.4 KiB | | | This image file is larger than it needs to be
(750x746) for its displayed dimensions (412x412). Use responsive images to
reduce the image download size. | | 40.4 KiB | | Stemningsbilde av bålpanne og
varme føtter |
[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempathy-bonfire.060ix~fg13f_o.png&w=750&q=90&dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 51.8 KiB | 38.2 KiB | | | This image file is larger than it needs to be
(722x1125) for its displayed dimensions (378x567). Use responsive images to
reduce the image download size. | | 38.2 KiB | | Maksimal isolasjon |
[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclassic-couple-mobile-1080.003iij5jezl72.webp&w=750&q=80&dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 29.2 KiB | 20.3 KiB | | | This image file is larger than it needs to be
(750x746) for its displayed dimensions (412x412). Use responsive images to
reduce the image download size. | | 20.3 KiB | | Utekos kveldsstemning |
[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-varmen-hero-mobile.0ra8n-5anall5.webp&w=750&q=80&dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 35.2 KiB | 16.0 KiB | | | This image file is larger than it needs to be
(616x1125) for its displayed dimensions (502x753). Use responsive images to
reduce the image download size. | | 16.0 KiB |

### Selvformet eleganse

HTML

```
<img alt="Selvformet eleganse" fetchpriority="auto" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 1280px) 0px, 100vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkikkert-kate-2160.0ehl6yvlu2~…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkikkert-kate…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

### Stemningsbilde av bålpanne og varme føtter

HTML

```
<img alt="Stemningsbilde av bålpanne og varme føtter" loading="lazy" decoding="async" data-nimg="fill" class="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempathy-bonfire.060ix~fg13f_o…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempathy-bonf…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

### Maksimal isolasjon

HTML

```
<img alt="Maksimal isolasjon" fetchpriority="high" loading="eager" decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 1280px) 0px, 100vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclassic-couple-mobile-1080.00…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclassic-coup…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

### Utekos kveldsstemning

HTML

```
<img alt="Utekos kveldsstemning" fetchpriority="high" loading="eager" decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 768px) 0px, 100vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-varmen-hero-mobile…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-v…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

## Forced reflow

A forced reflow occurs when JavaScript queries geometric properties (such as
offsetWidth) after styles have been invalidated by a change to the DOM state.
This can result in poor performance. Learn more about
[forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow?utm_source=lighthouse&utm_medium=lr)
and possible mitigations.

**Status:** Unscored

**Show 3rd-party resources:** 0

| Top function call | Total reflow time |
| ----------------- | ----------------- |

|
[…chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:2:7484](https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 221 ms |

**Show 3rd-party resources:** 0

| Source | Total reflow time |
| ------ | ----------------- |

|
[…chunks/11gc42j9qx8wo.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:2180](https://utekos.no/_next/static/chunks/11gc42j9qx8wo.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 213 ms | |
[…chunks/054x6taxkxyo0.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:7:34295](https://utekos.no/_next/static/chunks/054x6taxkxyo0.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 1 ms | |
[…chunks/0xvysiys6s5o6.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:5744](https://utekos.no/_next/static/chunks/0xvysiys6s5o6.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 3 ms | |
[…chunks/0xvysiys6s5o6.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:17444](https://utekos.no/_next/static/chunks/0xvysiys6s5o6.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 3 ms | | \[unattributed\] | 2 ms | |
[…chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:34143](https://utekos.no/_next/static/chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 71 ms | |
[…chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:15015](https://utekos.no/_next/static/chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 1 ms | |
[…chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:13966](https://utekos.no/_next/static/chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 1 ms | |
[…chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:11247](https://utekos.no/_next/static/chunks/07dopi2zta51..js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 0 ms | |
[…chunks/0gtvujxczlfzb.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR:1:54873](https://utekos.no/_next/static/chunks/0gtvujxczlfzb.js?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)  
(utekos.no)
| 5 ms |

## LCP request discovery

[Optimise LCP](https://developer.chrome.com/docs/performance/insights/lcp-discovery?utm_source=lighthouse&utm_medium=lr)
by making the LCP image discoverable from the HTML immediately, and avoiding
lazy loading.

**Status:** LCPUnscored

- lazy load not applied
- fetchpriority=high applied
- Request is discoverable in initial document

### Utekos kveldsstemning

HTML

```
<img alt="Utekos kveldsstemning" fetchpriority="high" loading="eager" decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 768px) 0px, 100vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-varmen-hero-mobile…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-v…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

## Network dependency tree

[Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=lr)
by reducing the length of chains, reducing the download size of resources or
deferring the download of unnecessary resources to improve page load.

**Status:** LCPUnscored

CSS

```
.lh-crc .lh-tree-marker {  width: 12px;  height: 26px;  display: block;  float: left;  background-position: top left;}.lh-crc .lh-horiz-down {  background: url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><g fill="%23D8D8D8" fill-rule="evenodd"><path d="M16 12v2H-2v-2z"/><path d="M9 12v14H7V12z"/></g></svg>');}.lh-crc .lh-right {  background: url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v2H0v-2z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');}.lh-crc .lh-up-right {  background: url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v14H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');}.lh-crc .lh-vert-right {  background: url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v27H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');}.lh-crc .lh-vert {  background: url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v26H7z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');}.lh-crc .lh-crc-tree {  font-size: 14px;  width: 100%;  overflow-x: auto;}.lh-crc .lh-crc-node {  height: 26px;  line-height: 26px;  white-space: nowrap;}.lh-crc .lh-crc-node__longest {  color: var(--color-average-secondary);}.lh-crc .lh-crc-node__tree-value {  margin-left: 10px;}.lh-crc .lh-crc-node__tree-value div {  display: inline;}.lh-crc .lh-crc-node__chain-duration {  font-weight: 700;}.lh-crc .lh-crc-initial-nav {  color: #595959;  font-style: italic;}.lh-crc__summary-value {  margin-bottom: 10px;}
```

**Maximum critical path latency:** 1,427 ms

### Initial Navigation

- [/skreddersy-varmen](https://utekos.no/skreddersy-varmen)  
   (utekos.no)
  - 280 ms, 33.12 KiB
- […chunks/12vdvsqisx8vu.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR](https://utekos.no/_next/static/chunks/12vdvsqisx8vu.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)

  (utekos.no)
  - 388 ms, 57.71 KiB

- […chunks/0fkhg7jwry7h1.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR](https://utekos.no/_next/static/chunks/0fkhg7jwry7h1.css?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)

  (utekos.no)
  - 355 ms, 1.02 KiB

- […media/google_sa….06q4lwtlpy078.woff2?dpl=…](https://utekos.no/_next/static/media/google_sans_latin-s.06q4lwtlpy078.woff2?dpl=dpl_7diweQAXCoYfcFYzQLYMFcvAvBeR)

  (utekos.no)
  - 1,427 ms, 35.88 KiB

## Preconnected origins

[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr)
hints help the browser establish a connection earlier in the page load, saving
time when the first request for that origin is made. The following are the
origins that the page preconnected to.

| Origin                                                                                 | Source                                |
| -------------------------------------------------------------------------------------- | ------------------------------------- |
|                                                                                        | head > link                           |
| `<link rel="preconnect" crossorigin="" href="/">`                                      |
| Unused preconnect. Only use preconnect for origins that the page is likely to request. |                                       |
| /                                                                                      | `</>; rel=preconnect; crossorigin=""` |
| Unused preconnect. Only use preconnect for origins that the page is likely to request. |                                       |

## Preconnect candidates

Add
[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr)
hints to your most important origins, but try to use no more than 4.

| Origin                                            | Est LCP savings |
| ------------------------------------------------- | --------------- |
| [https://sgtm.utekos.no](https://sgtm.utekos.no/) | 300 ms          |

## Use efficient cache lifetimes

**Est savings:** 10 KiB

A long cache lifetime can speed up repeat visits to your page.
[Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache?utm_source=lighthouse&utm_medium=lr).

**Status:** LCPFCPUnscored

**Show 3rd-party resources:** 1

| Request | Cache TTL | Transfer size |
| ------- | --------- | ------------- |

| Clarity  
utility[](https://clarity.microsoft.com/ 'Open in a new tab') | | 25 KiB | |
[/0.8.64/clarity.js](https://scripts.clarity.ms/0.8.64/clarity.js)  
(scripts.clarity.ms) | 1d | 25 KiB |

## Optimise DOM size

A large DOM can increase the duration of style calculations and layout reflows,
impacting page responsiveness. A large DOM will also increase memory usage.
[Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/performance/insights/dom-size?utm_source=lighthouse&utm_medium=lr).

**Status:** Unscored

| Statistic                                                                             | Element                                            | Value |
| ------------------------------------------------------------------------------------- | -------------------------------------------------- | ----- |
| Total elements                                                                        |                                                    | 1,574 |
| DOM depth                                                                             | `h3.flex > button#radix-_r_9_ > svg.lucide > path` |
| `<path d="m6 9 6 6 6-6">`                                                             | 16                                                 |
| Most children                                                                         | `body.bg-background`                               |
| `<body class="bg-background text-cloud-dancer antialiased" style="overflow: unset;">` | 188                                                |

## LCP breakdown

Each
[sub-part has specific improvement strategies](https://developer.chrome.com/docs/performance/insights/lcp-breakdown?utm_source=lighthouse&utm_medium=lr).
Ideally, most of the LCP time should be spent on loading the resources, not
within delays.

**Status:** LCPUnscored

| Sub-part               | Duration |
| ---------------------- | -------- |
| Time to First Byte     | 0 ms     |
| Resource load delay    | 960 ms   |
| Resource load duration | 330 ms   |
| Element render delay   | 1,100 ms |

### Utekos kveldsstemning

HTML

```
<img alt="Utekos kveldsstemning" fetchpriority="high" loading="eager" decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 768px) 0px, 100vw" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-varmen-hero-mobile…" src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskreddersy-v…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">
```

## Third parties

Third-party code can significantly impact load performance.
[Reduce and defer loading of third-party code](https://developer.chrome.com/docs/performance/insights/third-parties?utm_source=lighthouse&utm_medium=lr)
to prioritise your page's content.

**Status:** Unscored

**Show 3rd-party resources:** 0

| Third party | Transfer size | Main thread time |
| ----------- | ------------- | ---------------- |

| Clarity  
utility[](https://clarity.microsoft.com/ 'Open in a new tab') | 27 KiB | 81 ms |
| [/0.8.64/clarity.js](https://scripts.clarity.ms/0.8.64/clarity.js)  
(scripts.clarity.ms) | 25 KiB | 79 ms | |
[…uet/97247724](https://www.clarity.ms/tag/uet/97247724)  
([www.clarity.ms](http://www.clarity.ms/)) | 1 KiB | 2 ms | |
[/collect](https://b.clarity.ms/collect)  
(b.clarity.ms) | 1 KiB | 0 ms | | bing.net | 16 KiB | 22 ms | |
[/bat.js?ti=97247724](https://bat.bing.net/bat.js?ti=97247724)  
(bat.bing.net) | 16 KiB | 22 ms | |
[/action/0?ti=…](https://bat.bing.net/action/0?ti=97247724&Ver=2&mid=885b675b-b19d-477a-8533-cebfacb8e354&bo=3&pi=0&lg=en-US&sw=412&sh=823&sc=24&tl=Skreddersy%20varmen%20ute%20%7C%20Utekos%203-i-1%20komfortplagg%20%7C%20Utekos%C2%AE&p=https%3A%2F%2Futekos.no%2Fskreddersy-varmen&r=&lt=829&mtp=1&evt=pageLoad&sv=2&asc=D&cdb=AQAQ&rn=715821)  
(bat.bing.net)
| 0 KiB | 0 ms | | Bing Ads  
ad[](https://bingads.microsoft.com/ 'Open in a new tab') | 2 KiB | 4 ms | |
[…action/97247724.js](https://bat.bing.com/p/action/97247724.js)  
(bat.bing.com) | 2 KiB | 4 ms |

These insights are also available in the Chrome DevTools performance panel –
[record a trace](https://developer.chrome.com/docs/devtools/performance/reference?utm_source=lighthouse&utm_medium=lr)
to view more detailed information.
