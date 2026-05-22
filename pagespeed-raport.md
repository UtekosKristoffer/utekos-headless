# Diagnose performance issues

PERFORMANCE: 39 / 100[Performance](https://pagespeed.web.dev/#performance)[

89 / 100: [Accessibility](https://pagespeed.web.dev/#accessibility)[

[Best Practices](https://pagespeed.web.dev/#best-practices)[

SEO: 100

](https://pagespeed.web.dev/#seo)

[

38

Performance

](https://pagespeed.web.dev/#performance)[

89

Accessibility

](https://pagespeed.web.dev/#accessibility)[

73

Best Practices

](https://pagespeed.web.dev/#best-practices)[

100

SEO

](https://pagespeed.web.dev/#seo)

38 FCP+10LCP+0TBT+2CLS+25SI+1 Performance

Values are estimated and may vary. The
[performance score is calculated](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/?utm_source=lighthouse&utm_medium=lr)
directly from these
metrics.[See calculator.](https://googlechrome.github.io/lighthouse/scorecalc/#FCP=1351&LCP=9659&TBT=1930&CLS=0.05&SI=10728&TTI=12431&device=mobile&version=13.0.1)

First Contentful Paint

1.4 s

First Contentful Paint marks the time at which the first text or image is
painted.
[Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/?utm_source=lighthouse&utm_medium=lr).

Largest Contentful Paint

9.7 s

Largest Contentful Paint marks the time at which the largest text or image is
painted.
[Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=lr)

Total Blocking Time

1,930 ms

Sum of all time periods between FCP and Time to Interactive, when task length
exceeded 50ms, expressed in milliseconds.
[Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=lr).

Cumulative Layout Shift

0.048

Cumulative layout shift measures the movement of visible elements within the
viewport.
[Learn more about the cumulative layout shift metric](https://web.dev/articles/cls?utm_source=lighthouse&utm_medium=lr).

Speed Index

10.7 s

Speed Index shows how quickly the contents of a page are visibly populated.
[Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/?utm_source=lighthouse&utm_medium=lr).

- Captured at 22 May 2026, 00:15 CEST
- Emulated Moto G Power with Lighthouse 13.0.1 Unthrottled CPU/memory power: 404
  CPU throttling: 1.2x slowdown (Simulated) Screen emulation: 412x823, DPR 1.75
  Axe version: 4.11.0
- Single-page session This data is taken from a single-page session, as opposed
  to field data summarising many sessions.
- Initial page load
- Slow 4G throttling Network throttling: 150 ms TCP RTT, 1,638.4 kb/s throughput
  (Simulated) Browser location: Europe
- Using HeadlessChromium 146.0.7680.177 with lr User agent (network):
  "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36
  (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36"

Show audits relevant to:AllFCPLCPTBTCLS

Insights

Render-blocking requests Est savings of 730 ms

Requests are blocking the page's initial render, which may delay LCP.
[Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking?utm_source=lighthouse&utm_medium=lr)
can move these network requests out of the critical path.LCPFCPUnscored

.lh-3p-filter { color: var(--color-gray-600); float: right; padding: 6px
var(--stackpack-padding-horizontal); } .lh-3p-filter-label, .lh-3p-filter-input
{ vertical-align: middle; user-select: none; } .lh-3p-filter-input:disabled +
.lh-3p-ui-string { text-decoration: line-through; }

Show 3rd-party resources (0)

| URL

|

Transfer size

|

Duration

| | | |

|

utekos.no

First party |

50.2 KiB

|

1,050 ms

| |

[…chunks/fed6323dff4c0ef8.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/fed6323dff4c0ef8.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

3.0 KiB

|

450 ms

| |

[…chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

47.2 KiB

|

600 ms

|

Forced reflow

A forced reflow occurs when JavaScript queries geometric properties (such as
offsetWidth) after styles have been invalidated by a change to the DOM state.
This can result in poor performance. Learn more about
[forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow?utm_source=lighthouse&utm_medium=lr)
and possible mitigations.Unscored

Show 3rd-party resources (0)

| Top function call

|

Total reflow time

| | | |

|

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:2:7117](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

1,248 ms

|

Show 3rd-party resources (0)

| Source

|

Total reflow time

| | | |

|

[…chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2…:1:53870](https://utekos.no/_next/static/chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

1,243 ms

| |

[…chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2…:1:59172](https://utekos.no/_next/static/chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

4 ms

| |

[…chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2…:1:1380](https://utekos.no/_next/static/chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

36 ms

| |

[…chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2…:1:59156](https://utekos.no/_next/static/chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

1 ms

| |

[…chunks/d5354ad731….js?dpl=dpl_FRTG2…:1:5269](https://utekos.no/_next/static/chunks/d5354ad731872970.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

17 ms

| |

[…chunks/d5354ad731….js?dpl=dpl_FRTG2…:1:16985](https://utekos.no/_next/static/chunks/d5354ad731872970.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

9 ms

| |

\[unattributed\]

|

35 ms

| |

[/embed.min.js:1:23529](https://www.chatbase.co/embed.min.js)

(www.chatbase.co)

|

0 ms

|

LCP breakdown

Each
[sub-part has specific improvement strategies](https://developer.chrome.com/docs/performance/insights/lcp-breakdown?utm_source=lighthouse&utm_medium=lr).
Ideally, most of the LCP time should be spent on loading the resources, not
within delays.LCPUnscored

| Sub-part

|

Duration

| | | |

|

Time to First Byte

|

10 ms

| |

Resource load delay

|

1,880 ms

| |

Resource load duration

|

260 ms

| |

Element render delay

|

2,530 ms

|

To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.

<img alt="To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin." decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 1280px) 1280px, 100vw" srcset="/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.153f9026.we…" src="https://utekos.no/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-ki…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">

LCP request discovery

[Optimise LCP](https://developer.chrome.com/docs/performance/insights/lcp-discovery?utm_source=lighthouse&utm_medium=lr)
by making the LCP image discoverable from the HTML immediately, and avoiding
lazy loadingLCPUnscored

- lazy load not applied
- fetchpriority=high should be applied
- Request is discoverable in initial document

To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.

<img alt="To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin." decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 1280px) 1280px, 100vw" srcset="/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.153f9026.we…" src="https://utekos.no/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-ki…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">

Network dependency tree

[Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=lr)
by reducing the length of chains, reducing the download size of resources or
deferring the download of unnecessary resources to improve page load.LCPUnscored

.lh-crc .lh-tree-marker { width: 12px; height: 26px; display: block; float:
left; background-position: top left; } .lh-crc .lh-horiz-down { background:
url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><g fill="%23D8D8D8" fill-rule="evenodd"><path d="M16 12v2H-2v-2z"/><path d="M9 12v14H7V12z"/></g></svg>');
} .lh-crc .lh-right { background:
url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v2H0v-2z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');
} .lh-crc .lh-up-right { background:
url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v14H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');
} .lh-crc .lh-vert-right { background:
url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v27H7zm2 12h7v2H9z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');
} .lh-crc .lh-vert { background:
url('data:image/svg+xml;utf8,<svg width="16" height="26" viewBox="0 0 16 26" xmlns="http://www.w3.org/2000/svg"><path d="M7 0h2v26H7z" fill="%23D8D8D8" fill-rule="evenodd"/></svg>');
} .lh-crc .lh-crc-tree { font-size: 14px; width: 100%; overflow-x: auto; }
.lh-crc .lh-crc-node { height: 26px; line-height: 26px; white-space: nowrap; }
.lh-crc .lh-crc-node\_\_longest { color: var(--color-average-secondary); }
.lh-crc .lh-crc-node\_\_tree-value { margin-left: 10px; } .lh-crc
.lh-crc-node\_\_tree-value div { display: inline; } .lh-crc
.lh-crc-node\_\_chain-duration { font-weight: 700; } .lh-crc .lh-crc-initial-nav
{ color: #595959; font-style: italic; } .lh-crc\_\_summary-value {
margin-bottom: 10px; }

Maximum critical path latency: **4,566 ms**

Initial Navigation

[https://utekos.no](https://utekos.no/)

\- 556 ms, 37.69 KiB

[…chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

\- 624 ms, 47.24 KiB

[…chunks/fed6323dff4c0ef8.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/fed6323dff4c0ef8.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

\- 627 ms, 2.98 KiB

[…media/95ab80c2b18b3804.74743d1a.woff2](https://utekos.no/_next/static/media/95ab80c2b18b3804.74743d1a.woff2)

(utekos.no)

\- 4,566 ms, 20.38 KiB

Preconnected origins

[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr)
hints help the browser establish a connection earlier in the page load, saving
time when the first request for that origin is made. The following are the
origins that the page preconnected to.

| Origin

|

Source

|     |
| --- |
|     |

head > link

<link rel="preconnect" href="https://www.chatbase.co">

| |

Unused preconnect. Only use preconnect for origins that the page is likely to
request.

| |

Preconnect candidates

Add
[preconnect](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr)
hints to your most important origins, but try to use no more than 4.

| Origin

|

Est LCP savings

| | | |

|

https://sgtm.utekos.no

|

300 ms

|

Use efficient cache lifetimes Est savings of 233 KiB

A long cache lifetime can speed up repeat visits to your page.
[Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache?utm_source=lighthouse&utm_medium=lr).LCPFCPUnscored

Show 3rd-party resources (5)

| Request

|

Cache TTL

|

Transfer size

| | | |

|

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') | |

237 KiB

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

20m

|

136 KiB

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

20m

|

101 KiB

| |

[/tr/?id=…](https://www.facebook.com/tr/?id=1092362672918571&ev=PageView&dl=https%3A%2F%2Futekos.no%2F&rl=&if=false&ts=1779401708945&sw=412&sh=823&cud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_*%23%23%23%23%23%23*-**%23%23-%23*%23%23-%23**%23-**%23**%23%23*%23%23%23*&ncud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_*%23%23%23%23%23%23*-**%23%23-%23*%23%23-%23**%23-**%23**%23%23*%23%23%23*&ud[external_id]=709002bdfce2fe25bbb0c1dfc615cf46526e7579c2e6c0f917603c7a6098b06e&aud[external_id]=709002bdfce2fe25bbb0c1dfc615cf46526e7579c2e6c0f917603c7a6098b06e&v=2.9.324&r=stable&ec=0&o=12318&fbp=fb.1.1779401708896.431813608316018014&hmd=9317240206d6c2a2558f0c2e&pl=https%3A%2F%2Futekos.no&cs_est=true&ler=empty&pmd[title]=Utekos%C2%AE%20-%20Skreddersy%20varmen&pmd[locale]=no_NO&pmd[description]=Opplev%20kompromissl%C3%B8s%20komfort%20og%20overlegen%20allsidighet.%20Gj%C3%B8r%20som%20tusenvis%20av%20andre%20livsnytere%20og%20l%C3%B8ft%20utend%C3%B8rslivet%20til%20et%20nytt%20niv%C3%A5.%20Juster%2C%20form%20og%20nyt&plt=1648.4000000022352&imft=1&tz=-420&it=1779401708341&coo=false&eid=evt_1779401705295_3ed39314-d11d-4e87-bc08-32f653e9b83e&cf=1&expv2[0]=pl0&expv2[1]=el3&expv2[2]=bc1&expv2[3]=ra2&expv2[4]=rp2&expv2[5]=im0&expv2[6]=hf0&rqm=GET)

(www.facebook.com)

|

None

|

0 KiB

| |

Snapchat

analytics[](https://www.snapchat.com/ 'Open in a new tab') | |

26 KiB

| |

[/scevent.min.js](https://sc-static.net/scevent.min.js)

(sc-static.net)

|

10m

|

25 KiB

| |

[…no/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a.js?v=3.56.1-260…](https://tr.snapchat.com/config/no/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a.js?v=3.56.1-2604231811)

(tr.snapchat.com)

|

None

|

1 KiB

|

Improve image delivery Est savings of 136 KiB

Reducing the download time of images can improve the perceived load time of the
page and LCP.
[Learn more about optimising image size](https://developer.chrome.com/docs/performance/insights/image-delivery?utm_source=lighthouse&utm_medium=lr)LCPFCPUnscored

Show 3rd-party resources (0)

| |

URL

|

Resource size

|

Est savings

| | | |

|

utekos.no

First party | |

183.8 KiB

|

136.3 KiB

| |

To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin.

<img alt="To kvinner i Utekos-plagg sitter på en terassen og nyter ost og vin." decoding="async" data-nimg="fill" class="object-cover" sizes="(min-width: 1280px) 1280px, 100vw" srcset="/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.153f9026.we…" src="https://utekos.no/\_next/image?url=%2F\_next%2Fstatic%2Fmedia%2Flinn-kate-ki…" style="position: absolute; height: 100%; width: 100%; inset: 0px;">

|

[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.153f9026.webp&w=750&q=100&dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

183.8 KiB

|

136.3 KiB

| | |

Increasing the image compression factor could improve this image's download
size.

| |

122.7 KiB

| | |

This image file is larger than it needs to be (750x500) for its displayed
dimensions (662x441). Use responsive images to reduce the image download size.

| |

40.8 KiB

|

Legacy JavaScript Est savings of 56 KiB

Polyfills and transforms enable older browsers to use new JavaScript features.
However, many aren't necessary for modern browsers. Consider modifying your
JavaScript build process to not transpile
[Baseline](https://web.dev/articles/baseline-and-polyfills?utm_source=lighthouse&utm_medium=lr)
features, unless you know that you must support older browsers.
[Learn why most sites can deploy ES6+ code without transpiling](https://developer.chrome.com/docs/performance/insights/legacy-javascript?utm_source=lighthouse&utm_medium=lr)LCPFCPUnscored

Show 3rd-party resources (3)

| URL

|

|

Wasted bytes

| | | |

|

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') | |

33.1 KiB

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

| |

20.7 KiB

| |

[…config/109…?v=…:20:1829](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

@babel/plugin-transform-classes

| | |

[…config/109…?v=…:101:82472](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

@babel/plugin-transform-regenerator

| | |

[…config/109…?v=…:57:3382](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

@babel/plugin-transform-spread

| | |

[…config/109…?v=…:101:45115](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.from

| | |

[…config/109…?v=…:101:45793](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.isArray

| | |

[…config/109…?v=…:101:44094](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.concat

| | |

[…config/109…?v=…:101:44519](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.filter

| | |

[…config/109…?v=…:101:44782](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.find

| | |

[…config/109…?v=…:101:44964](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.forEach

| | |

[…config/109…?v=…:101:45282](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.includes

| | |

[…config/109…?v=…:101:45593](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.indexOf

| | |

[…config/109…?v=…:101:46428](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.map

| | |

[…config/109…?v=…:101:47066](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.slice

| | |

[…config/109…?v=…:101:47565](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Array.prototype.some

| | |

[…config/109…?v=…:101:48890](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.create

| | |

[…config/109…?v=…:101:49240](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.entries

| | |

[…config/109…?v=…:101:49410](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.getOwnPropertyDescriptor

| | |

[…config/109…?v=…:101:49601](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.getOwnPropertyDescriptors

| | |

[…config/109…?v=…:101:49873](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.getPrototypeOf

| | |

[…config/109…?v=…:101:50050](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.keys

| | |

[…config/109…?v=…:101:50169](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.setPrototypeOf

| | |

[…config/109…?v=…:101:50288](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Object.values

| | |

[…config/109…?v=…:101:50440](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Promise.allSettled

| | |

[…config/109…?v=…:101:50966](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Promise.any

| | |

[…config/109…?v=…:101:56219](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

Reflect.construct

| | |

[…config/109…?v=…:101:56954](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

String.prototype.endsWith

| | |

[…config/109…?v=…:101:57272](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

String.prototype.includes

| | |

[…config/109…?v=…:101:58003](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

String.prototype.startsWith

| | |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

| |

12.5 KiB

| |

[/en_US/fbevents.js:24:6382](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

@babel/plugin-transform-classes

| | |

[/en_US/fbevents.js:24:2819](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

@babel/plugin-transform-regenerator

| | |

[/en_US/fbevents.js:24:5990](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

@babel/plugin-transform-spread

| | |

[/en_US/fbevents.js:294:15837](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

Array.from

| | |

[/en_US/fbevents.js:294:2722](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

Array.prototype.filter

| | |

[/en_US/fbevents.js:294:21490](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

Array.prototype.find

| | |

[/en_US/fbevents.js:294:19706](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

Array.prototype.includes

| | |

[/en_US/fbevents.js:294:2905](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

Array.prototype.map

| | |

[/en_US/fbevents.js:294:6104](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

String.prototype.startsWith

| | |

utekos.no

First party | |

13.7 KiB

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

| |

13.7 KiB

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:5124](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

Array.prototype.at

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:4512](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

Array.prototype.flat

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:4625](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

Array.prototype.flatMap

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:5001](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

Object.fromEntries

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:5259](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

Object.hasOwn

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:4254](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

String.prototype.trimEnd

| | |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…:1:4169](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

String.prototype.trimStart

| | |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') | |

8.8 KiB

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

| |

8.8 KiB

| |

[…static/main.MWJkOTJmOWRkMQ.js:1:1789](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

@babel/plugin-transform-regenerator

| | |

[…static/main.MWJkOTJmOWRkMQ.js:1:479818](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

Promise.allSettled

| | |

[…static/main.MWJkOTJmOWRkMQ.js:1:479861](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

Promise.any

| |

Layout shift culprits

Layout shifts occur when elements move absent any user interaction.
[Investigate the causes of layout shifts](https://developer.chrome.com/docs/performance/insights/cls-culprit?utm_source=lighthouse&utm_medium=lr),
such as elements being added, removed or their fonts changing as the page
loads.CLSUnscored

| Element

|

Layout shift score

| | | |

|

Total

|

0.048

| |

Funksjonell varme - siden 2020 Utekos® Skreddersy varmen Kompromissløs komfort…

<section class="relative container mx-auto px-4 pt-12 pb-2 overflow-hidden">

|

0.048

|

Optimise DOM size

A large DOM can increase the duration of style calculations and layout reflows,
impacting page responsiveness. A large DOM will also increase memory usage.
[Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/performance/insights/dom-size?utm_source=lighthouse&utm_medium=lr).Unscored

| Statistic

|

Element

|

Value

| | | |

|

Total elements

| |

2,027

| |

DOM depth

|

svg.w-full > defs > lineargradient#luxuryGold > stop

<stop offset="0%" stop-color="#FEF3C7">

|

18

| |

Most children

|

body.bg-background

<body class="bg-background text-foreground geist\_7204aec8-module\_\_Gx-NeW\_\_className goo…" style="overflow: unset;">

|

291

|

Third parties

Third-party code can significantly impact load performance.
[Reduce and defer loading of third-party code](https://developer.chrome.com/docs/performance/insights/third-parties?utm_source=lighthouse&utm_medium=lr)
to prioritise your page's content.Unscored

Show 3rd-party resources (0)

| Third party

|

Transfer size

|

Main thread time

| | | |

|

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') |

237 KiB

|

367 ms

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

136 KiB

|

255 ms

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

101 KiB

|

112 ms

| |

[/tr/?id=…](https://www.facebook.com/tr/?id=1092362672918571&ev=PageView&dl=https%3A%2F%2Futekos.no%2F&rl=&if=false&ts=1779401708945&sw=412&sh=823&cud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_*%23%23%23%23%23%23*-**%23%23-%23*%23%23-%23**%23-**%23**%23%23*%23%23%23*&ncud[external_id]=****_%23%23%23%23%23%23%23%23%23%23%23%23%23_*%23%23%23%23%23%23*-**%23%23-%23*%23%23-%23**%23-**%23**%23%23*%23%23%23*&ud[external_id]=709002bdfce2fe25bbb0c1dfc615cf46526e7579c2e6c0f917603c7a6098b06e&aud[external_id]=709002bdfce2fe25bbb0c1dfc615cf46526e7579c2e6c0f917603c7a6098b06e&v=2.9.324&r=stable&ec=0&o=12318&fbp=fb.1.1779401708896.431813608316018014&hmd=9317240206d6c2a2558f0c2e&pl=https%3A%2F%2Futekos.no&cs_est=true&ler=empty&pmd[title]=Utekos%C2%AE%20-%20Skreddersy%20varmen&pmd[locale]=no_NO&pmd[description]=Opplev%20kompromissl%C3%B8s%20komfort%20og%20overlegen%20allsidighet.%20Gj%C3%B8r%20som%20tusenvis%20av%20andre%20livsnytere%20og%20l%C3%B8ft%20utend%C3%B8rslivet%20til%20et%20nytt%20niv%C3%A5.%20Juster%2C%20form%20og%20nyt&plt=1648.4000000022352&imft=1&tz=-420&it=1779401708341&coo=false&eid=evt_1779401705295_3ed39314-d11d-4e87-bc08-32f653e9b83e&cf=1&expv2[0]=pl0&expv2[1]=el3&expv2[2]=bc1&expv2[3]=ra2&expv2[4]=rp2&expv2[5]=im0&expv2[6]=hf0&rqm=GET)

(www.facebook.com)

|

0 KiB

|

0 ms

| |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') |

153 KiB

|

213 ms

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

110 KiB

|

181 ms

| |

[…static/identify_5cff1caf.js](https://analytics.tiktok.com/i18n/pixel/static/identify_5cff1caf.js)

(analytics.tiktok.com)

|

40 KiB

|

27 ms

| |

[…pixel/events.js?sdkid=D61089RC7…&lib=ttq](https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D61089RC77UD675I25C0&lib=ttq)

(analytics.tiktok.com)

|

4 KiB

|

4 ms

| |

Snapchat

analytics[](https://www.snapchat.com/ 'Open in a new tab') |

52 KiB

|

165 ms

| |

[/scevent.min.js](https://sc-static.net/scevent.min.js)

(sc-static.net)

|

50 KiB

|

160 ms

| |

[…no/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a.js?v=3.56.1-260…](https://tr.snapchat.com/config/no/3b3c8f0c-51f8-4b21-bf44-cc5e1121588a.js?v=3.56.1-2604231811)

(tr.snapchat.com)

|

1 KiB

|

3 ms

| |

[/cm/i?pid=…](https://tr.snapchat.com/cm/i?pid=3b3c8f0c-51f8-4b21-bf44-cc5e1121588a&u_scsid=f604d2b9-83aa-4bac-a8e1-90434fc9407d&u_sclid=9d48888c-281c-4333-b6e9-03bedcf47509)

(tr.snapchat.com)

|

1 KiB

|

2 ms

| |

[/cm/p?rand=…](https://tr.snapchat.com/cm/p?rand=1779233363713&pnid=140&pcid=195b1a2d-ad53-4f48-b99b-5bad6a4f547a)

(tr.snapchat.com)

|

1 KiB

|

0 ms

| |

chatbase.co

|

14 KiB

|

34 ms

| |

[/embed.min.js](https://www.chatbase.co/embed.min.js)

(www.chatbase.co)

|

12 KiB

|

34 ms

| |

[…get-chatbot-styles/SO0afKtc9hg24ytkt83_9](https://www.chatbase.co/api/get-chatbot-styles/SO0afKtc9hg24ytkt83_9)

(www.chatbase.co)

|

2 KiB

|

0 ms

| |

brandarmor.ai

|

2 KiB

|

1 ms

| |

[/brand-armor-ai-pixel.min.js](https://brandarmor.ai/brand-armor-ai-pixel.min.js)

(brandarmor.ai)

|

0 KiB

|

1 ms

| |

[/brand-armor-ai-pixel.min.js](https://www.brandarmor.ai/brand-armor-ai-pixel.min.js)

(www.brandarmor.ai)

|

2 KiB

|

0 ms

| |

run.app

|

0 KiB

|

0 ms

| |

[/events?cee=no](https://mpc2-prod-25-is5qnl632q-wl.a.run.app/events?cee=no)

(mpc2-prod-25-is5qnl632q-wl.a.run.app)

|

0 KiB

|

0 ms

|

These insights are also available in the Chrome DevTools performance panel –
[record a trace](https://developer.chrome.com/docs/devtools/performance/reference?utm_source=lighthouse&utm_medium=lr)
to view more detailed information.

Diagnostics

Minimise main-thread work 8.7 s

Consider reducing the time spent parsing, compiling and executing JS. You may
find delivering smaller JS payloads helps with this.
[Learn how to minimise main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/?utm_source=lighthouse&utm_medium=lr)TBTUnscored

| Category

|

Time Spent

| | | |

|

Script Evaluation

|

3,592 ms

| |

Style & Layout

|

2,289 ms

| |

Other

|

1,452 ms

| |

Script Parsing & Compilation

|

630 ms

| |

Rendering

|

438 ms

| |

Garbage Collection

|

170 ms

| |

Parse HTML & CSS

|

115 ms

|

Reduce JavaScript execution time 3.8 s

Consider reducing the time spent parsing, compiling and executing JS. You may
find delivering smaller JS payloads helps with this.
[Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/?utm_source=lighthouse&utm_medium=lr).TBTUnscored

Show 3rd-party resources (4)

| URL

|

Total CPU Time

|

Script Evaluation

|

Script Parse

| | | |

|

utekos.no

First party |

6,988 ms

|

2,726 ms

|

206 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

4,623 ms

|

2,384 ms

|

35 ms

| |

[https://utekos.no](https://utekos.no/)

|

1,136 ms

|

95 ms

|

142 ms

| |

[…chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

829 ms

|

71 ms

|

7 ms

| |

[…chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/09a6a33054a04a99.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

251 ms

|

113 ms

|

11 ms

| |

[…chunks/947fcf45754db3af.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/947fcf45754db3af.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

98 ms

|

63 ms

|

12 ms

| |

[…chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

51 ms

|

0 ms

|

0 ms

| |

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') |

447 ms

|

332 ms

|

110 ms

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

312 ms

|

252 ms

|

56 ms

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

135 ms

|

81 ms

|

54 ms

| |

Unattributable

|

410 ms

|

48 ms

|

0 ms

| |

Unattributable

|

410 ms

|

48 ms

|

0 ms

| |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') |

234 ms

|

156 ms

|

70 ms

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

234 ms

|

156 ms

|

70 ms

| |

Snapchat

analytics[](https://www.snapchat.com/ 'Open in a new tab') |

198 ms

|

158 ms

|

28 ms

| |

[/scevent.min.js](https://sc-static.net/scevent.min.js)

(sc-static.net)

|

198 ms

|

158 ms

|

28 ms

|

Reduce unused JavaScript Est savings of 306 KiB

Reduce unused JavaScript and defer loading scripts until they are required to
decrease bytes consumed by network activity.
[Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/?utm_source=lighthouse&utm_medium=lr).LCPFCPUnscored

Show 3rd-party resources (3)

| URL

|

Transfer size

|

Est savings

| | | |

|

utekos.no

First party |

255.7 KiB

|

179.0 KiB

| |

[…chunks/38d07e59cd9854b3.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/38d07e59cd9854b3.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

57.0 KiB

|

48.4 KiB

| |

[…chunks/8372db77fc868042.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/8372db77fc868042.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

43.5 KiB

|

43.2 KiB

| |

[…chunks/e3382f66196f87d1.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/e3382f66196f87d1.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

53.1 KiB

|

33.8 KiB

| |

[…chunks/5e6289cd3591040e.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/5e6289cd3591040e.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

32.6 KiB

|

32.5 KiB

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

69.5 KiB

|

21.1 KiB

| |

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') |

229.1 KiB

|

70.5 KiB

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

131.8 KiB

|

38.8 KiB

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

97.3 KiB

|

31.7 KiB

| |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') |

109.0 KiB

|

56.0 KiB

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

109.0 KiB

|

56.0 KiB

|

Avoid enormous network payloads Total size was 2,865 KiB

Large network payloads cost users real money and are highly correlated with long
load times.
[Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/?utm_source=lighthouse&utm_medium=lr).Unscored

Show 3rd-party resources (3)

| URL

|

Transfer size

| | | |

|

utekos.no

First party |

1,595.4 KiB

| |

[/linn-kate-kikkert.webp](https://utekos.no/linn-kate-kikkert.webp)

(utekos.no)

|

905.0 KiB

| |

[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flinn-kate-kikkert.153f9026.webp&w=750&q=100&dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

184.4 KiB

| |

[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F1080%2Futekos-techdown.png&w=750&q=95&dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

156.2 KiB

| |

[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmonica-arne-comfy.d567f888.png&w=640&q=95&dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

114.0 KiB

| |

[/\_next/image?url=…](https://utekos.no/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclassic-couple-1080.60974123.webp&w=750&q=95&dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

104.9 KiB

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

70.1 KiB

| |

[…chunks/38d07e59cd9854b3.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/38d07e59cd9854b3.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

60.9 KiB

| |

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') |

237.0 KiB

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

135.8 KiB

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

101.2 KiB

| |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') |

110.0 KiB

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

110.0 KiB

|

Avoid long main-thread tasks 12 long tasks found

Lists the longest tasks on the main thread – useful for identifying worst
contributors to input delay.
[Learn how to avoid long main-thread tasks](https://web.dev/articles/optimize-long-tasks?utm_source=lighthouse&utm_medium=lr)TBTUnscored

Show 3rd-party resources (4)

| URL

|

Start Time

|

Duration

| | | |

|

utekos.no

First party | |

1,849 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

9,190 ms

|

1,151 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

4,244 ms

|

324 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

8,950 ms

|

126 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

9,105 ms

|

85 ms

| |

[…chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/961311cbebbffb6d.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

3,930 ms

|

61 ms

| |

[…chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ad597317f5fd8eab.css?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

1,651 ms

|

51 ms

| |

[…chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2…](https://utekos.no/_next/static/chunks/ab996fd25a584be7.js?dpl=dpl_FRTG2PZgjzSNe6YWRvQCMt5jdtZN)

(utekos.no)

|

8,899 ms

|

51 ms

| |

Facebook

social[](https://www.facebook.com/ 'Open in a new tab') | |

444 ms

| |

[…config/109…?v=…](https://connect.facebook.net/signals/config/1092362672918571?v=2.9.324&r=stable&domain=utekos.no&hme=af8aa31887db259becaf70277daef60bd8bc35c2df82c2acd4258de27ecac4b5&ex_m=104%2C207%2C155%2C22%2C72%2C73%2C146%2C68%2C67%2C11%2C164%2C90%2C16%2C138%2C127%2C39%2C75%2C78%2C134%2C160%2C166%2C8%2C4%2C5%2C7%2C6%2C3%2C91%2C101%2C167%2C172%2C221%2C62%2C188%2C189%2C55%2C279%2C30%2C74%2C233%2C232%2C231%2C23%2C33%2C103%2C61%2C10%2C63%2C97%2C98%2C99%2C105%2C130%2C31%2C29%2C132%2C133%2C129%2C128%2C156%2C76%2C159%2C157%2C158%2C50%2C60%2C123%2C15%2C163%2C45%2C266%2C267%2C265%2C26%2C27%2C28%2C48%2C147%2C77%2C112%2C18%2C20%2C44%2C40%2C42%2C41%2C83%2C92%2C96%2C110%2C145%2C148%2C46%2C111%2C24%2C21%2C119%2C69%2C36%2C150%2C149%2C151%2C142%2C140%2C25%2C35%2C59%2C109%2C162%2C70%2C17%2C153%2C114%2C81%2C66%2C19%2C85%2C86%2C116%2C84%2C136%2C135%2C139%2C161%2C34%2C281%2C297%2C214%2C203%2C204%2C202%2C300%2C291%2C52%2C215%2C107%2C131%2C80%2C121%2C54%2C47%2C49%2C113%2C120%2C126%2C125%2C58%2C64%2C152%2C115%2C37%2C32%2C53%2C56%2C100%2C165%2C1%2C124%2C14%2C122%2C12%2C2%2C57%2C93%2C65%2C118%2C89%2C88%2C168%2C169%2C94%2C95%2C9%2C102%2C51%2C143%2C87%2C79%2C71%2C117%2C106%2C43%2C144%2C0%2C82%2C137%2C141%2C154%2C38%2C108%2C13%2C170)

(connect.facebook.net)

|

8,590 ms

|

309 ms

| |

[/en_US/fbevents.js](https://connect.facebook.net/en_US/fbevents.js)

(connect.facebook.net)

|

6,955 ms

|

135 ms

| |

TikTok

social[](https://www.tiktok.com/en/ 'Open in a new tab') | |

194 ms

| |

[…static/main.MWJkOTJmOWRkMQ.js](https://analytics.tiktok.com/i18n/pixel/static/main.MWJkOTJmOWRkMQ.js)

(analytics.tiktok.com)

|

12,803 ms

|

194 ms

| |

Snapchat

analytics[](https://www.snapchat.com/ 'Open in a new tab') | |

65 ms

| |

[/scevent.min.js](https://sc-static.net/scevent.min.js)

(sc-static.net)

|

4,612 ms

|

65 ms

| |

Unattributable

| |

53 ms

| |

Unattributable

|

901 ms

|

53 ms

|

User Timing marks and measures 2 user timings

Consider instrumenting your app with the User Timing API to measure your app's
real-world performance during key user experiences.
[Learn more about User Timing marks](https://developer.chrome.com/docs/lighthouse/performance/user-timings/?utm_source=lighthouse&utm_medium=lr).Unscored

| Name

|

Type

|

Start Time

|

Duration

| | | |

|

snaptr

|

Mark

|

4,840.42 ms

| | |

snaptr

|

Mark

|

5,899.97 ms

| |

Avoid non-composited animations 13 animated elements found

Animations that are not composited can be poor, slow and increase CLS.
[Learn how to avoid non-composited animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/?utm_source=lighthouse&utm_medium=lr)CLSUnscored

| Element

|

Name

| | | |

|

div.rounded-xl > div.relative > svg.absolute > line

<line x1="0" y1="0" x2="0" y2="100%" stroke="url(#story-gradient)" stroke-width="3" stroke-dasharray="5 5" style="animation: 1s linear 0s infinite normal none running stroke-draw;">

| | |

Unsupported CSS property: stroke-dashoffset

|

stroke-draw

| |

øyeblikk

<span class="relative z-10 animate-shimmer-gold bg-gradient-to-br from-amber-100 via-am…">

| | |

Unsupported CSS property: background-position-x

|

shimmer-gold

| |

Vi bryr oss om ditt personvern Vi bruker informasjonskapsler (cookies) for å g…

<div class="absolute bottom-0 left-0 right-0 z-\[100\] border-t border-neutral-800 bg-ne…">

| | |

Filter-related property may move pixels

|

enter

| |

div.will-change-transform > div.relative > div.relative > button.inline-flex

<button data-slot="carousel-next" class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm fo…">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.gsap-content-col > div.mb-8 > div.gsap-feature > div.group

<div class="group relative overflow-hidden rounded-xl border border-white/10 bg-neutra…">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.gsap-content-col > div.mb-8 > div.gsap-feature > div.group

<div class="group relative overflow-hidden rounded-xl border border-white/10 bg-neutra…">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.gsap-content-col > div.mb-8 > div.gsap-feature > div.group

<div class="group relative overflow-hidden rounded-xl border border-white/10 bg-neutra…">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.text-center > div.mt-10 > div.gsap-content

<div class="gsap-content opacity-0 group flex items-center gap-4 rounded-xl border bor…" style="translate: none; rotate: none; scale: none; opacity: 0;">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.text-center > div.mt-10 > div.gsap-content

<div class="gsap-content opacity-0 group flex items-center gap-4 rounded-xl border bor…" style="translate: none; rotate: none; scale: none; opacity: 0;">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.flex > div.gsap-content > a.inline-flex

<a data-track="FrontpageIceBathingSectionShopNowClick" data-slot="button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:p…" href="/kampanje/comfyrobe">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.flex > div.grid > div.gsap-feature-card

<div class="gsap-feature-card opacity-0 group flex items-center gap-5 p-4 rounded-xl b…" style="translate: none; rotate: none; scale: none; opacity: 0;">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.flex > div.grid > div.gsap-feature-card

<div class="gsap-feature-card opacity-0 group flex items-center gap-5 p-4 rounded-xl b…" style="translate: none; rotate: none; scale: none; opacity: 0;">

| | |

Unsupported CSS property: visibility

|

visibility

| |

div.grid > div.flex > div.grid > div.gsap-feature-card

<div class="gsap-feature-card opacity-0 group flex items-center gap-5 p-4 rounded-xl b…" style="translate: none; rotate: none; scale: none; opacity: 0;">

| | |

Unsupported CSS property: visibility

|

visibility

|

More information about the performance of your application. These numbers don't
[directly affect](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/?utm_source=lighthouse&utm_medium=lr)
the performance score.
