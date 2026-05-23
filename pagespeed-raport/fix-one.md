# PageSpeed performance findings: Desktop

This document restructures the Lighthouse/PageSpeed extract for
[https://utekos.no/](https://utekos.no/) into readable findings, measured
values, source elements, and reference links.

## Findings overview

| Finding                  |                     Estimate or measured value | Signals            | Primary source                        |
| ------------------------ | ---------------------------------------------: | ------------------ | ------------------------------------- |
| Render-blocking requests |                       420 ms estimated savings | LCP, FCP, unscored | First-party CSS chunks                |
| Forced reflow            |                       696 ms total reflow time | Unscored           | First-party JavaScript chunks         |
| LCP breakdown            |             2,590 ms across reported sub-parts | LCP, unscored      | LCP image render and load delay       |
| LCP request discovery    |         `fetchpriority=high` should be applied | LCP, unscored      | LCP image                             |
| Network dependency tree  |         2,481 ms maximum critical path latency | LCP, unscored      | CSS and font chain                    |
| Preconnected origins     | One candidate with 80 ms estimated LCP savings | LCP                | `https://sgtm.utekos.no`              |
| Cache lifetimes          |                      243 KiB estimated savings | LCP, FCP, unscored | Third-party scripts                   |
| Image delivery           |                      892 KiB estimated savings | LCP, FCP, unscored | `linn-kate-kikkert.webp`              |
| Legacy JavaScript        |                       56 KiB estimated savings | LCP, FCP, unscored | Facebook, first-party, TikTok scripts |
| Layout shift culprits    |                       0.006 layout shift score | CLS, unscored      | Header/search controls                |
| DOM size                 |                           1,780 total elements | Unscored           | Document body                         |
| Third parties            |    325 ms main-thread time from Facebook alone | Unscored           | Marketing and analytics scripts       |

## Render-blocking requests

Requests are blocking the page's initial render, which may delay LCP. [Deferring
or inlining render-blocking requests][render-blocking-docs] can move these
network requests out of the critical path.

| Resource                                         | Host        | Transfer size | Duration |
| ------------------------------------------------ | ----------- | ------------: | -------: |
| First-party total                                | `utekos.no` |      62.1 KiB |   270 ms |
| [CSS chunk `0.j2.9-_z~lzv.css`][css-chunk-large] | `utekos.no` |      60.5 KiB |   110 ms |
| [CSS chunk `0wfg_2~~9md-2.css`][css-chunk-small] | `utekos.no` |       1.6 KiB |   160 ms |

## Forced reflow

A forced reflow occurs when JavaScript queries geometric properties, such as
`offsetWidth`, after styles have been invalidated by a DOM state change. This
can result in poor performance. See the [forced reflow mitigation
guidance][forced-reflow-docs].

### Top function call

| Source                                                         | Total reflow time |
| -------------------------------------------------------------- | ----------------: |
| [First-party chunk `0956.uguclzfz.js:2:7484`][reflow-top-call] |            696 ms |

### Reflow sources

| Source                                                                 | Total reflow time |
| ---------------------------------------------------------------------- | ----------------: |
| [First-party chunk `052_rgenbp_yq.js:1:54017`][reflow-source-main]     |            678 ms |
| [First-party chunk `0c.j2g_b5rzch.js:1:1380`][reflow-source-secondary] |             26 ms |
| [First-party chunk `0xvysiys6s5o6.js:1:5744`][reflow-source-third]     |             20 ms |
| Unattributed                                                           |             11 ms |
| [First-party chunk `0xvysiys6s5o6.js:1:17444`][reflow-source-fourth]   |              9 ms |
| [First-party chunk `17y~dhaf5682m.js:7:34285`][reflow-source-fifth]    |              4 ms |

## LCP breakdown

Each [LCP sub-part has specific improvement strategies][lcp-breakdown-docs].
Ideally, most of the LCP time should be spent loading resources, not waiting
inside delays.

| LCP sub-part           | Duration |
| ---------------------- | -------: |
| Time to First Byte     |     0 ms |
| Resource load delay    | 1,140 ms |
| Resource load duration |    30 ms |
| Element render delay   | 1,450 ms |

### LCP element

Alt text: `To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.`

```html
<img
  alt="To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin."
  decoding="async"
  data-nimg="fill"
  class="object-cover"
  sizes="(min-width: 768px) 1152px, 100vw"
  srcset="
    /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.09-j5lcy-n8…
  "
  src="https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinn-kate-ki…"
  style="position: absolute; height: 100%; width: 100%; inset: 0px;"
/>
```

## LCP request discovery

[Optimize LCP discovery][lcp-discovery-docs] by making the LCP image
discoverable from the HTML immediately and avoiding lazy loading.

| Check                      | Result                                 |
| -------------------------- | -------------------------------------- |
| Lazy loading               | Not applied                            |
| Fetch priority             | `fetchpriority=high` should be applied |
| Initial document discovery | Request is discoverable                |

The LCP element is the same image captured in [LCP element](#lcp-element).

## Network dependency tree

[Avoid chaining critical requests][network-dependency-docs] by reducing the
length of chains, reducing resource size, or deferring unnecessary resources.

Maximum critical path latency: **2,481 ms**.

| Chain item                                                            | Duration | Transfer size |
| --------------------------------------------------------------------- | -------: | ------------: |
| [Initial navigation][site-root]                                       |   449 ms |     36.48 KiB |
| [CSS chunk `0.j2.9-_z~lzv.css`][css-chunk-large]                      |   534 ms |     60.50 KiB |
| [CSS chunk `0wfg_2~~9md-2.css`][css-chunk-small]                      |   452 ms |      1.62 KiB |
| [Font `797e433ab948586e-s.09zddjkbdep5a.woff2`][font-797e]            | 2,481 ms |     29.85 KiB |
| [Font `google_sans_latin-s.06q4lwtlpy078.woff2`][font-google-sans]    | 2,477 ms |     35.88 KiB |
| [Font `utekos_text_regular-s.0ard65b~9cw6v.otf`][font-utekos-regular] | 2,479 ms |     31.68 KiB |
| [Font `utekos_text_medium-s.06f5lr0dqpy7r.otf`][font-utekos-medium]   | 2,478 ms |     31.65 KiB |

## Preconnected origins

[Preconnect hints][preconnect-docs] help the browser establish a connection
earlier in the page load, saving time when the first request for that origin is
made.

### Existing preconnects

| Source              | Markup                                                   | Status            |
| ------------------- | -------------------------------------------------------- | ----------------- |
| `head > link`       | `<link rel="preconnect" crossorigin="" href="/">`        | Unused preconnect |
| `head > link`       | `<link rel="preconnect" href="https://www.chatbase.co">` | Unused preconnect |
| `/` response header | `</>; rel=preconnect; crossorigin=""`                    | Unused preconnect |

### Preconnect candidates

Add preconnect hints to the most important origins, but try to use no more than
four.

| Origin                   | Estimated LCP savings |
| ------------------------ | --------------------: |
| `https://sgtm.utekos.no` |                 80 ms |

## Cache lifetimes

A long cache lifetime can speed up repeat visits. See [the Lighthouse cache
lifetime guidance][cache-docs].

Estimated savings: **243 KiB**.

| Request                                          | Host                   | Cache TTL | Transfer size |
| ------------------------------------------------ | ---------------------- | --------: | ------------: |
| Facebook total                                   | Facebook               |         - |       237 KiB |
| [Facebook config script][facebook-config]        | `connect.facebook.net` |       20m |       136 KiB |
| [Facebook events script][facebook-events]        | `connect.facebook.net` |       20m |       101 KiB |
| [Facebook pixel request][facebook-pixel-request] | `www.facebook.com`     |      None |         0 KiB |
| Snapchat total                                   | Snapchat               |         - |        25 KiB |
| [Snapchat event script][snapchat-event-script]   | `sc-static.net`        |       10m |        25 KiB |
| [Snapchat config script][snapchat-config]        | `tr.snapchat.com`      |      None |         1 KiB |
| Clarity total                                    | Clarity                |         - |        25 KiB |
| [Clarity script][clarity-script]                 | `scripts.clarity.ms`   |        1d |        25 KiB |

## Image delivery

Reducing the download time of images can improve perceived load time and LCP.
See [the image delivery guidance][image-delivery-docs].

Estimated savings: **892 KiB**.

| Resource                                   | Host        | Resource size | Estimated savings |
| ------------------------------------------ | ----------- | ------------: | ----------------: |
| First-party total                          | `utekos.no` |     904.5 KiB |         891.6 KiB |
| [`linn-kate-kikkert.webp`][linn-kate-webp] | `utekos.no` |     904.5 KiB |         891.6 KiB |

### Captured element

```html
<video
  autoplay=""
  loop=""
  playsinline=""
  poster="https://utekos.no/linn-kate-kikkert.webp"
  preload="metadata"
></video>
```

The image file is larger than it needs to be. It is **3200x2133** but is
displayed at **382x255**. Use responsive images to reduce image download size.

## Legacy JavaScript

Polyfills and transforms enable older browsers to use new JavaScript features.
Many are unnecessary for modern browsers. Consider modifying the JavaScript
build process to avoid transpiling [Baseline features][baseline-polyfills-docs]
unless older browser support is required. See also [the legacy JavaScript
guidance][legacy-javascript-docs].

Estimated savings: **56 KiB**.

| Resource group                                           | Host                   | Wasted bytes |
| -------------------------------------------------------- | ---------------------- | -----------: |
| Facebook total                                           | Facebook               |     33.1 KiB |
| [Facebook config script][facebook-config]                | `connect.facebook.net` |     20.7 KiB |
| [Facebook events script][facebook-events]                | `connect.facebook.net` |     12.5 KiB |
| First-party total                                        | `utekos.no`            |     13.7 KiB |
| [First-party chunk `0956.uguclzfz.js`][first-party-0956] | `utekos.no`            |     13.7 KiB |
| TikTok total                                             | TikTok                 |      8.8 KiB |
| [TikTok main pixel script][tiktok-main]                  | `analytics.tiktok.com` |      8.8 KiB |

### Detected transforms and polyfills

| Resource                                                 | Detected transforms and polyfills                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Facebook config script][facebook-config]                | `@babel/plugin-transform-classes`, `@babel/plugin-transform-regenerator`, `@babel/plugin-transform-spread`, `Array.from`, `Array.isArray`, `Array.prototype.concat`, `Array.prototype.filter`, `Array.prototype.find`, `Array.prototype.forEach`, `Array.prototype.includes`, `Array.prototype.indexOf`, `Array.prototype.map`, `Array.prototype.slice`, `Array.prototype.some`, `Object.create`, `Object.entries`, `Object.getOwnPropertyDescriptor`, `Object.getOwnPropertyDescriptors`, `Object.getPrototypeOf`, `Object.keys`, `Object.setPrototypeOf`, `Object.values`, `Promise.allSettled`, `Promise.any`, `Reflect.construct`, `String.prototype.endsWith`, `String.prototype.includes`, `String.prototype.startsWith` |
| [Facebook events script][facebook-events]                | `@babel/plugin-transform-classes`, `@babel/plugin-transform-regenerator`, `@babel/plugin-transform-spread`, `Array.from`, `Array.prototype.filter`, `Array.prototype.find`, `Array.prototype.includes`, `Array.prototype.map`, `String.prototype.startsWith`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [First-party chunk `0956.uguclzfz.js`][first-party-0956] | `Array.prototype.at`, `Array.prototype.flat`, `Array.prototype.flatMap`, `Object.fromEntries`, `Object.hasOwn`, `String.prototype.trimEnd`, `String.prototype.trimStart`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [TikTok main pixel script][tiktok-main]                  | `@babel/plugin-transform-regenerator`, `Promise.allSettled`, `Promise.any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

## Layout shift culprits

Layout shifts occur when elements move without user interaction. [Investigate
layout shift causes][layout-shift-docs], such as elements being added or
removed, or fonts changing as the page loads.

| Element                | Layout shift score |
| ---------------------- | -----------------: |
| Total                  |              0.006 |
| Header/search controls |              0.006 |
| Search button          |              0.000 |

### Captured elements

```html
<div class="flex flex-1 basis-0 items-center justify-end gap-2"></div>
```

```html
<button
  type="button"
  aria-label="Åpne søk (⌘/Ctrl + K)"
  class="group relative hidden h-11 w-[22rem] items-center gap-3 rounded-md border …"
>
  Søk… ⌘ K
</button>
```

Captured text:
`Søk… ⌘ K Søk på nettsiden... Søk etter produkter eller sider.. 0 varer i hand…`.

## DOM size

A large DOM can increase style calculation and layout reflow duration, impact
responsiveness, and increase memory usage. See [the DOM size
guidance][dom-size-docs].

| Statistic      | Element                                                | Value |
| -------------- | ------------------------------------------------------ | ----: |
| Total elements | -                                                      | 1,780 |
| DOM depth      | `svg.w-full > defs > lineargradient#luxuryGold > stop` |    18 |
| Most children  | `body.bg-background`                                   |   252 |

### Captured elements

```html
<stop offset="0%" stop-color="#FEF3C7"></stop>
```

```html
<body
  class="bg-background text-foreground antialiased"
  style="overflow: unset;"
></body>
```

## Third parties

Third-party code can significantly impact load performance. [Reduce and defer
loading of third-party code][third-party-docs] to prioritize page content.

| Third party or request                               | Host                                   | Transfer size | Main-thread time |
| ---------------------------------------------------- | -------------------------------------- | ------------: | ---------------: |
| Facebook total                                       | Facebook                               |       237 KiB |           325 ms |
| [Facebook config script][facebook-config]            | `connect.facebook.net`                 |       136 KiB |           230 ms |
| [Facebook events script][facebook-events]            | `connect.facebook.net`                 |       101 KiB |            94 ms |
| [Facebook pixel request][facebook-pixel-request]     | `www.facebook.com`                     |         0 KiB |             0 ms |
| TikTok total                                         | TikTok                                 |       153 KiB |           196 ms |
| [TikTok main pixel script][tiktok-main]              | `analytics.tiktok.com`                 |       110 KiB |           170 ms |
| [TikTok identify script][tiktok-identify]            | `analytics.tiktok.com`                 |        40 KiB |            23 ms |
| [TikTok events script][tiktok-events]                | `analytics.tiktok.com`                 |         4 KiB |             4 ms |
| Clarity total                                        | Clarity                                |        27 KiB |           167 ms |
| [Clarity script][clarity-script]                     | `scripts.clarity.ms`                   |        25 KiB |           165 ms |
| [Clarity UET tag][clarity-uet]                       | `www.clarity.ms`                       |         1 KiB |             2 ms |
| [Clarity collect request][clarity-collect]           | `z.clarity.ms`                         |         1 KiB |             0 ms |
| Snapchat total                                       | Snapchat                               |        52 KiB |           139 ms |
| [Snapchat event script][snapchat-event-script]       | `sc-static.net`                        |        50 KiB |           134 ms |
| [Snapchat config script][snapchat-config]            | `tr.snapchat.com`                      |         1 KiB |             3 ms |
| [Snapchat match request][snapchat-match-i]           | `tr.snapchat.com`                      |         1 KiB |             2 ms |
| [Snapchat match pixel][snapchat-match-p]             | `tr.snapchat.com`                      |         1 KiB |             0 ms |
| chatbase.co total                                    | `chatbase.co`                          |        14 KiB |            26 ms |
| [Chatbase embed script][chatbase-embed]              | `www.chatbase.co`                      |        12 KiB |            26 ms |
| [Chatbase styles request][chatbase-styles]           | `www.chatbase.co`                      |         2 KiB |             0 ms |
| bing.net total                                       | `bing.net`                             |        16 KiB |            17 ms |
| [Bing UET script][bing-bat]                          | `bat.bing.net`                         |        16 KiB |            17 ms |
| [Bing action request][bing-action]                   | `bat.bing.net`                         |         0 KiB |             0 ms |
| Bing Ads total                                       | Bing Ads                               |         2 KiB |             3 ms |
| [Bing Ads action script][bing-ads-action]            | `bat.bing.com`                         |         2 KiB |             3 ms |
| brandarmor.ai total                                  | `brandarmor.ai`                        |         2 KiB |             1 ms |
| [Brand Armor pixel script][brandarmor-pixel]         | `brandarmor.ai`                        |         0 KiB |             1 ms |
| [Brand Armor pixel script www][brandarmor-pixel-www] | `www.brandarmor.ai`                    |         2 KiB |             0 ms |
| run.app total                                        | `run.app`                              |         0 KiB |             0 ms |
| [run.app events request][run-app-events]             | `mpc2-prod-25-is5qnl632q-wl.a.run.app` |         0 KiB |             0 ms |

## Trace reference

These insights are also available in the Chrome DevTools performance panel.
[Record a trace][devtools-trace-docs] to view more detailed information.

[baseline-polyfills-docs]:
  https://web.dev/articles/baseline-and-polyfills?utm_source=lighthouse&utm_medium=lr
[bing-action]:
  https://bat.bing.net/action/0?ti=97247724&Ver=2&mid=84a7ecc1-0469-4a53-b19c-d7cbc35e9752&bo=3&pi=0&lg=en-US&sw=800&sh=600&sc=24&tl=Utekos%C2%AE%20-%20Skreddersy%20varmen&p=https%3A%2F%2Futekos.no%2F&r=&lt=1028&evt=pageLoad&sv=2&asc=D&cdb=AQAQ&rn=697784
[bing-ads-action]: https://bat.bing.com/p/action/97247724.js
[bing-bat]: https://bat.bing.net/bat.js?ti=97247724
[brandarmor-pixel-www]: https://www.brandarmor.ai/brand-armor-ai-pixel.min.js
[brandarmor-pixel]: https://brandarmor.ai/brand-armor-ai-pixel.min.js
[cache-docs]:
  https://developer.chrome.com/docs/performance/insights/cache?utm_source=lighthouse&utm_medium=lr
[chatbase-embed]: https://www.chatbase.co/embed.min.js
[chatbase-styles]:
  https://www.chatbase.co/api/get-chatbot-styles/SO0afKtc9hg24ytkt83_9
[clarity-collect]: https://z.clarity.ms/collect
[clarity-script]: https://scripts.clarity.ms/0.8.64/clarity.js
[clarity-uet]: https://www.clarity.ms/tag/uet/97247724
[css-chunk-large]:
  https://utekos.no/_next/static/chunks/0.j2.9-_z~lzv.css?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[css-chunk-small]:
  https://utekos.no/_next/static/chunks/0wfg_2~~9md-2.css?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[devtools-trace-docs]:
  https://developer.chrome.com/docs/devtools/performance/reference?utm_source=lighthouse&utm_medium=lr
[dom-size-docs]:
  https://developer.chrome.com/docs/performance/insights/dom-size?utm_source=lighthouse&utm_medium=lr
[facebook-config]:
  https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170
[facebook-events]: https://connect.facebook.net/en_US/fbevents.js

[facebook-pixel-request]:
<https://www.facebook.com/tr/?id=1092362672918571&ev=PageView&dl=https%3A%2F%2Futekos.no%2F&rl=&if=false&ts=1779429433098&sw=800&sh=600&cud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_%23%23%23%23****-%23%23%23%23-%23%23%23%23-%23%23%23*-%23%23%23*%23***%23*%23%23&ncud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_%23%23%23%23****-%23%23%23%23-%23%23%23%23-%23%23%23*-%23%23%23*%23***%23*%23%23&ud[external_id]=cbdb79a7d72f932d8b058895220d27c5ae54a18384667ea83cd75e56cc596b7d&aud[external_id]=cbdb79a7d72f932d8b058895220d27c5ae54a18384667ea83cd75e56cc596b7d&v=2.9.324&r=stable&ec=0&o=12318&fbp=fb.1.1779429433051.527758701477316337&hmd=88efe4b47be55758775da707&pl=https%3A%2F%2Futekos.no&cs_est=true&ler=empty&pmd[title]=Utekos%C2%AE%20-%20Skreddersy%20varmen&pmd[locale]=no_NO&pmd[description]=Opplev%20kompromissl%C3%B8s%20komfort%20og%20overlegen%20allsidighet.%20Gj%C3%B8r%20som%20tusenvis%20av%20andre%20livsnytere%20og%20l%C3%B8ft%20utend%C3%B8rslivet%20til%20et%20nytt%20niv%C3%A5.%20Juster%2C%20form%20og%20nyt&plt=1027.5&imft=1&tz=-420&it=1779429432514&coo=false&eid=evt_1779429430848_1a9d6121-7c66-47db-8044-6eee7973fcd0&cf=1&expv2[0]=pl1&expv2[1]=el2&expv2[2]=bc1&expv2[3]=ra2&expv2[4]=rp2&expv2[5]=ct2&expv2[6]=hf1&rqm=GET>
[first-party-0956]:
https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[font-797e]:
https://utekos.no/_next/static/media/797e433ab948586e-s.09zddjkbdep5a.woff2?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[font-google-sans]:
https://utekos.no/_next/static/media/google_sans_latin-s.06q4lwtlpy078.woff2?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[font-utekos-medium]:
https://utekos.no/_next/static/media/utekos_text_medium-s.06f5lr0dqpy7r.otf?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[font-utekos-regular]:
https://utekos.no/_next/static/media/utekos_text_regular-s.0ard65b~9cw6v.otf?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[forced-reflow-docs]:
https://developer.chrome.com/docs/performance/insights/forced-reflow?utm_source=lighthouse&utm_medium=lr
[image-delivery-docs]:
https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=lr
[layout-shift-docs]:
https://developer.chrome.com/docs/performance/insights/cls-culprit?utm_source=lighthouse&utm_medium=lr
[lcp-breakdown-docs]:
https://developer.chrome.com/docs/performance/insights/lcp-breakdown?utm_source=lighthouse&utm_medium=lr
[lcp-discovery-docs]:
https://developer.chrome.com/docs/performance/insights/lcp-discovery?utm_source=lighthouse&utm_medium=lr
[legacy-javascript-docs]:
https://developer.chrome.com/docs/performance/insights/legacy-javascript?utm_source=lighthouse&utm_medium=lr
[linn-kate-webp]: https://utekos.no/linn-kate-kikkert.webp
[network-dependency-docs]:
https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=lr
[preconnect-docs]:
https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr
[reflow-source-fifth]:
https://utekos.no/_next/static/chunks/17y~dhaf5682m.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[reflow-source-fourth]:
https://utekos.no/_next/static/chunks/0xvysiys6s5o6.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[reflow-source-main]:
https://utekos.no/_next/static/chunks/052_rgenbp_yq.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[reflow-source-secondary]:
https://utekos.no/_next/static/chunks/0c.j2g_b5rzch.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[reflow-source-third]:
https://utekos.no/_next/static/chunks/0xvysiys6s5o6.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[reflow-top-call]:
https://utekos.no/_next/static/chunks/0956.uguclzfz.js?dpl=dpl_FDRFbWXNth4WfDHk6AUkURyqoUe9
[render-blocking-docs]:
https://developer.chrome.com/docs/performance/insights/render-blocking?utm_source=lighthouse&utm_medium=lr
[run-app-events]: https://mpc2-prod-25-is5qnl632q-wl.a.run.app/events?cee=no
[site-root]: https://utekos.no/ [snapchat-config]:
https://tr.snapchat.com/config/no/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a.js?v=3.56.1-2604231811
[snapchat-event-script]: https://sc-static.net/scevent.min.js
[snapchat-match-i]:
<https://tr.snapchat.com/cm/i?pid=3b3c8f0c-51f8-4b21-bf44-cc5e1121588a&u_scsid=21843828-79fc-48b0-96d2-542871d65687&u_sclid=9158f223-0ef5-40b3-b4de-553df938197d>
[snapchat-match-p]:
<https://tr.snapchat.com/cm/p?rand=1779233358652&pnid=140&pcid=f3bf47df-ce16-4b15-975e-24feb32914ec>
[third-party-docs]:
https://developer.chrome.com/docs/performance/insights/third-parties?utm_source=lighthouse&utm_medium=lr
[tiktok-events]:
https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D61089RC77UD675I25C0&lib=ttq
[tiktok-identify]:
https://analytics.tiktok.com/i18n/pixel/static/identify_5cff1caf.js
[tiktok-main]:
https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js
