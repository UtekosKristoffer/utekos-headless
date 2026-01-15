# Debug Report: Google Analytics - Measurement Protocol

### Google Tag Manager - Tag Configuration

## GA4 Event | Contact Page Form

### Tag Details

**Properties:**

| Name                | Value                       |
| ------------------- | --------------------------- |
| Type                | Google Analytics: GA4 Event |
| Send Ecommerce data | `true`                      |
| Data source         | `"dataLayer"`               |
| Event Name          | `"form_submit"`             |
| Measurement ID      | `{{GA4 Measurement ID}}`    |

### Messages Where This Tag Fired

No messages

### Firing Triggers

**Contact Page Form**

| Filter Type   | Condition               | Value             |
| ------------- | ----------------------- | ----------------- | ---- | --- |
| equals        | gtm.formSubmit          |                   |
| contains      | utekos.no/kontaktskjema |                   |
| contains      | Snakk med Utekos        |                   |
| matches RegEx | (^$\|((^                | ,)220236256_105($ | ,))) |     |

### Blocking Triggers

No blocking triggers

---

## GA4 Event | Signup Newsletter

### Tag Details

**Properties:**

| Name                | Value                       |
| ------------------- | --------------------------- |
| Type                | Google Analytics: GA4 Event |
| Send Ecommerce data | `false`                     |
| Event Name          | `"signup_newsletter"`       |
| Measurement ID      | `{{GA4 Measurement ID}}`    |

### Messages Where This Tag Fired

- 39 Click
- 51 Click

### Firing Triggers

**Signup Newsletter**

| Filter Type | Condition   | Value |
| ----------- | ----------- | ----- |
| contains    | Meld meg på |       |
| equals      | gtm.click   |       |

### Blocking Triggers

No blocking triggers

### Hits Sent

- signup_newsletter (G-FCES3L0M9M)
- signup_newsletter (G-FCES3L0M9M)

---

## Signup Newsletter | Google Ads User-provided Data Event

### Tag Details

**Properties:**

| Name                      | Value                                |
| ------------------------- | ------------------------------------ |
| Type                      | Google Ads User-provided Data Event  |
| User-provided Data        | `"{{Signup Newsletter \| Email}}"`   |
| Enable Conversion Linking | `true`                               |
| Conversion ID             | `"{{Conversion ID \| 17819485818}}"` |

### Messages Where This Tag Fired

- 39 Click
- 51 Click

### Firing Triggers

**Signup Newsletter**

| Filter Type | Condition   | Value |
| ----------- | ----------- | ----- |
| contains    | Meld meg på |       |
| equals      | gtm.click   |       |

### Blocking Triggers

No blocking triggers

---

## Google Tag | G-FCES3L0M9M

### Tag Details

**Properties:**

| Name   | Value            |
| ------ | ---------------- |
| Type   | Google Tag       |
| Tag ID | `"G-FCES3L0M9M"` |

### Messages Where This Tag Fired

- 2 Initialization

### Firing Triggers

**Initialization - All Pages**

| Filter Type | Condition | Value |
| ----------- | --------- | ----- |
| equals      | gtm.init  |       |

### Blocking Triggers

No blocking triggers

### Hits Sent

- Page View (G-FCES3L0M9M)
- Page View (MC-LQKYXDZ9WQ)

---

## GA4 Event | Generate Lead

### Tag Details

**Properties:**

| Name                    | Value                                   |
| ----------------------- | --------------------------------------- |
| Type                    | Google Analytics: GA4 Event             |
| Send Ecommerce data     | `false`                                 |
| Event Name              | `"{{Constant \| generate_lead}}"`       |
| Measurement ID          | `"G-FCES3L0M9M"`                        |
| Event Settings Variable | `"{{Event Settings \| Generate Lead}}"` |

### Messages Where This Tag Fired

- 39 Click
- 51 Click

### Firing Triggers

**Popup Newsletter**

| Filter Type | Condition   | Value |
| ----------- | ----------- | ----- |
| contains    | Meld meg på |       |
| equals      | gtm.click   |       |

**Form Submission | Meld meg på**

| Filter Type   | Condition      | Value             |
| ------------- | -------------- | ----------------- | ---- | --- |
| contains      | Meld meg på    |                   |
| equals        | gtm.formSubmit |                   |
| matches RegEx | (^$\|((^       | ,)220236256_103($ | ,))) |     |

### Blocking Triggers

No blocking triggers

### Hits Sent

- generate_lead (G-FCES3L0M9M)
- generate_lead (G-FCES3L0M9M)

---

## Tag Summary

### Utekos | Google Analytics Tag

**Tag Details:**

- **Tag Name:** Utekos | Google Analytics Tag
- **Source:** Tag in container GTM-5TWMJQFP

**Tag IDs:**

- G-FCES3L0M9M
- GT-WBLCRHS3
- GT-WBL9CBXJ
- AW-17708188692
- GT-WBK5SG8D
- AW-17819485818
- GT-TNGPJVQR
- GT-5DG99K86

**Destination IDs:**

- G-FCES3L0M9M
- AW-17819485818
- MC-LQKYXDZ9WQ

### Output of G-FCES3L0M9M

**Hits Sent:**

- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- generate_lead (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- signup_newsletter (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- Page View (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- generate_lead (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- signup_newsletter (G-FCES3L0M9M)
- Add to Cart (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- Page View (G-FCES3L0M9M)
- Scroll (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- Page View (G-FCES3L0M9M)
- User provided data (AW-17819485818)
- User provided data (AW-17819485818)
- Page View (G-FCES3L0M9M)
- Page View (MC-LQKYXDZ9WQ)

## DataLayer

```javascript

{
  event: "gtm.click",
  gtm: {
    uniqueEventId: 47,
    start: 1768475369879,
    element: "HTMLInputElement: html > body.bg-background.text-foregr" +
             "ound.geist_7204aec8-module__Gx-NeW__className.antialias" +
             "ed > main > section.container.mx-auto.my-32.max-w-[76re" +
             "m].px-4 > div > div.relative.border.border-white/10.bg-" +
             "background > div.hidden.lg:grid.lg:grid-cols-2 > div.bo" +
             "rder-l.border-white/10.bg-[oklch(14.5%_0_0)].p-8.lg:p-1" +
             "2 > form.space-y-6 > div.gap-2.flex.flex-row.items-cent" +
             "er.justify-between.rounded-none.border.border-neutral-8" +
             "00.p-4 > div#_r_1j_-form-item > input",
    elementClasses: "",
    elementId: "",
    elementTarget: "",
    triggers: "4,5,6",
    elementUrl: "",
    historyChangeSource: "pushState",
    oldUrlFragment: "",
    newUrlFragment: "",
    oldHistoryState: {
      __NA: true,
      __PRIVATE_NEXTJS_INTERNALS_TREE: {
        tree: [
          "",
          {
            children: [
              "produkter",
              {
                children: [
                  ["handle", "utekos-mikrofiber", "d"],
                  {children: ...},
                  null,
                  null,
                  false
                ]
              },
              null,
              null,
              false
            ]
          },
          null,
          null,
          true
        ],
        renderedSearch: "?variant=gid%3A%2F%2Fshopify%2FProductVarian" +
                        "t%2F42903231004920"
      }
    },
    newHistoryState: {
      __NA: true,
      __PRIVATE_NEXTJS_INTERNALS_TREE: {
        tree: [
          "",
          {
            children: [
              "kontaktskjema",
              {
                children: [
                  "__PAGE__",
                  {children: ...},
                  null,
                  null,
                  false
                ]
              },
              null,
              null,
              false
            ]
          },
          null,
          null,
          true
        ],
        renderedSearch: ""
      }
    },
    oldUrl: "https://www.utekos.no/produkter/utekos-mikrofiber?varian" +
            "t=gid%3A%2F%2Fshopify%2FProductVariant%2F42903231004920",
    newUrl: "https://www.utekos.no/kontaktskjema",
    priorityId: 36,
    scrollThreshold: 90,
    scrollUnits: "percent",
    scrollDirection: "vertical",
    formCanceled: true
  },
  eventCallback: "Function",
  eventTimeout: 2000,
  ecommerce: {
    currency: "NOK",
    value: 1590,
    items: [
      {
        item_id: "42903231004920",
        item_name: "Utekos Mikrofiber™",
        item_variant: "Vargnatt / Medium / Unisex",
        price: 1590,
        quantity: 1
      }
    ]
  }
}
```

## DebugView Google Analytics

**Note**: Jeg gikk til kassen - begin_checkout - 2 ganger, men gjennomførte kjøp
bare én gang. Årsaken til at purchases tagges to ganger er nok pga både GA 4
Event - Purchase og Google Shopping App Purchase kjøres.

#### Registered Events Google Analytics Debug View

- page_view: 10
- form_start: 4
- generate_lead: 2
- scroll: 2
- signup_newsletter: 2
- begin_checkout: 2
- user_engagement: 2
- purchase: 2
- add_to_cart: 1
- add_payment_info: 1

## Missing Events

Jeg avsluttet og prøvde på nytt. Glemte begin_checkout.

#### Etter andre forsøk:

- GTM-Containeren registrerer ikke begin_checkout
- G-FCES3L0M9M registrerer alt

## Google Shopping App Begin Checkout

### Hit Details

### Destination

- **Destination ID:** AW-17819485818
- **URL:** https://www.googleadservices.com/pagead/conversion/17819485818/

#### Parameters

| Parameter Name                    | Parameter Key         | Value                                                                                                                   |
| --------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| \_tu                              | `_tu`                 | ABI                                                                                                                     |
| async                             | `async`               | 1                                                                                                                       |
| auid                              | `auid`                | 1122052520.1765997200                                                                                                   |
| bg                                | `bg`                  | ffffff                                                                                                                  |
| capi                              | `capi`                | 1                                                                                                                       |
| Conversion Label                  | `label`               | tvl4COWex9cbEPqM_7BC                                                                                                    |
| Conversion value                  | `value`               | 3180                                                                                                                    |
| Cookie Consent State              | `gcs`                 | (empty)                                                                                                                 |
| Currency code                     | `currency_code`       | NOK                                                                                                                     |
| cv                                | `cv`                  | 11                                                                                                                      |
| data                              | `data`                | event=begin_checkout;ecomm_prodid=shopify_ZZ_7710040752376_42903231004920;ecomm_totalvalue=3180;ecomm_pagetype=cart     |
| Debug View                        | `_dbg`                | 1                                                                                                                       |
| Developer IDs                     | `did`                 | dN2ZkMj,dNTU0Yz,dYmNjMT,dNzYwYj                                                                                         |
| dma                               | `dma`                 | 1                                                                                                                       |
| User-Provided Data Mode           | `ec_mode`             | (empty)                                                                                                                 |
| ecsid                             | `ecsid`               | 877828625.1768475416                                                                                                    |
| User-Provided Data                | `em`                  | (see below)                                                                                                             |
| Event Developer IDs               | `edid`                | dNzYwYj                                                                                                                 |
| Event name                        | `en`                  | begin_checkout                                                                                                          |
| fmt                               | `fmt`                 | 3                                                                                                                       |
| frm                               | `frm`                 | 0                                                                                                                       |
| fst                               | `fst`                 | 1768476425517                                                                                                           |
| gap.lineItemValue                 | `gap.lineItemValue`   | 3180                                                                                                                    |
| gap.totalPriceValue               | `gap.totalPriceValue` | 3180                                                                                                                    |
| gcd                               | `gcd`                 | 13t3t3Z2t5l1                                                                                                            |
| gcl_ctr                           | `gcl_ctr`             | 65~0                                                                                                                    |
| Global Developer IDs              | `gdid`                | dN2ZkMj.dNTU0Yz.dYmNjMT                                                                                                 |
| Google Services Consent State     | `dma_cps`             | syphamo                                                                                                                 |
| gtm                               | `gtm`                 | 45je61d1v9220235806za200zd9220235806xec                                                                                 |
| gtm_ee                            | `gtm_ee`              | 1                                                                                                                       |
| guid                              | `guid`                | ON                                                                                                                      |
| hn                                | `hn`                  | www.googleadservices.com                                                                                                |
| Non-personalized Ads              | `npa`                 | 0                                                                                                                       |
| oidsrc                            | `oidsrc`              | 3                                                                                                                       |
| Page location                     | `url`                 | https://kasse.utekos.no/checkouts/cn/hWN7bxhIYvT6a3FLIKiexm4Z/nb-no?_r=AQAB6l12sR_1fornnMJc-Pe6n48tBRQLd0vvz3AMoePQR4U  |
| pscdl                             | `pscdl`               | noapi                                                                                                                   |
| random                            | `random`              | 1768476425517                                                                                                           |
| rdp                               | `rdp`                 | 0                                                                                                                       |
| tag_exp                           | `tag_exp`             | 103116026~103200004~104527907~104528500~104684208~104684211~105391252~115495939~115938465~115938469~115985661~117041587 |
| tiba                              | `tiba`                | Utsjekking - Utekos                                                                                                     |
| Transaction ID                    | `oid`                 | 1223297125.1768476426                                                                                                   |
| u_h                               | `u_h`                 | 900                                                                                                                     |
| u_w                               | `u_w`                 | 1440                                                                                                                    |
| User-Agent Architecture           | `uaa`                 | x86                                                                                                                     |
| User-Agent Bitness                | `uab`                 | 64                                                                                                                      |
| User-Agent Full Version List      | `uafvl`               | Google%20Chrome;143.0.7499.193\|Chromium;143.0.7499.193\|Not%20A(Brand;24.0.0.0                                         |
| User-Agent Mobileness             | `uamb`                | 0                                                                                                                       |
| User-Agent Model                  | `uam`                 | (empty)                                                                                                                 |
| User-Agent Platform               | `uap`                 | macOS                                                                                                                   |
| User-Agent Platform Version       | `uapv`                | 12.7.6                                                                                                                  |
| User-Agent WoW64 (Win32 on Win64) | `uaw`                 | 0                                                                                                                       |

#### Storage Type Consent State

| Storage Type      | Consent State |
| ----------------- | ------------- |
| ad_storage        | Granted       |
| analytics_storage | Granted       |

#### User-Provided Data

| Field Type | Field Value                                 |
| ---------- | ------------------------------------------- |
| (hashed)   | 4x8WFpkYUiISoDaC9zQnW4M-xxMNPal-E3vq2kbfQCI |
| NO         | (empty)                                     |

### Messages Where This Hit Fired

- 51begin_checkout

## GA4 Event - Begin Checkout

# Hit Details

## Destination

- **Destination ID:** G-FCES3L0M9M
- **URL:** https://region1.analytics.google.com/g/collect

## Parameters

| Parameter Name                    | Parameter Key          | Value                                                                                                                       |
| --------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| are                               | `are`                  | 1                                                                                                                           |
| Client ID                         | `cid`                  | 315691213.1760240992                                                                                                        |
| Conversion Event                  | `_c`                   | 1                                                                                                                           |
| Cookie Consent State              | `gcs`                  | G111                                                                                                                        |
| Currency                          | `cu`                   | NOK                                                                                                                         |
| Debug View                        | `_dbg`                 | 1                                                                                                                           |
| dma                               | `dma`                  | 1                                                                                                                           |
| ec_mode                           | `ec_mode`              | c                                                                                                                           |
| Ecommerce Item                    | `pr1`                  | idshopify_ZZ_7710040752376_42903231004920~nmUtekos Mikrofiber™~brUtekos~caOriginal~pr1590~qt2~vaVargnatt / Medium / Unisex |
| em                                | `em`                   | tv.1~em.4x8WFpkYUiISoDaC9zQnW4M-xxMNPal-E3vq2kbfQCI~co0.NO                                                                  |
| Engagement Time                   | `_et`                  | 28                                                                                                                          |
| Enhanced Client Id                | `ecid`                 | 183687216                                                                                                                   |
| Event Developer Id                | `edid`                 | dNzYwYj                                                                                                                     |
| Event Name                        | `en`                   | begin_checkout                                                                                                              |
| Event Parameter                   | `ep.ecomm_prodid`      | shopify_ZZ_7710040752376_42903231004920                                                                                     |
| Event Parameter                   | `ep.ecomm_pagetype`    | cart                                                                                                                        |
| frm                               | `frm`                  | 0                                                                                                                           |
| gap.lineItemValue                 | `gap.lineItemValue`    | 3180                                                                                                                        |
| gap.totalPriceValue               | `gap.totalPriceValue`  | 3180                                                                                                                        |
| gcd                               | `gcd`                  | 13t3t3Z2t5l1                                                                                                                |
| Global Developer Id               | `gdid`                 | dN2ZkMj.dNTU0Yz.dYmNjMT                                                                                                     |
| Google Services Consent State     | `dma_cps`              | syphamo                                                                                                                     |
| gtm                               | `gtm`                  | 45je61d1v9220235806za200zd9220235806                                                                                        |
| ir                                | `ir`                   | true                                                                                                                        |
| Language                          | `ul`                   | nb-no                                                                                                                       |
| Measurement ID                    | `tid`                  | G-FCES3L0M9M                                                                                                                |
| Non-personalized Ads              | `npa`                  | 0                                                                                                                           |
| Numeric Event Parameter           | `epn.ecomm_totalvalue` | 3180                                                                                                                        |
| Numeric Event Parameter           | `epn.value`            | 3180                                                                                                                        |
| Page Location                     | `dl`                   | https://kasse.utekos.no/checkouts/cn/hWN7bxhIYvT6a3FLIKiexm4Z/nb-no?_r=AQAB6l12sR_1fornnMJc-Pe6n48tBRQLd0vvz3AMoePQR4U      |
| Page Title                        | `dt`                   | Utsjekking - Utekos                                                                                                         |
| Protocol Version                  | `v`                    | 2                                                                                                                           |
| pscdl                             | `pscdl`                | noapi                                                                                                                       |
| Random Page ID                    | `_p`                   | 1768476420055                                                                                                               |
| Request Number                    | `_s`                   | 2                                                                                                                           |
| Screen Resolution                 | `sr`                   | 1440x900                                                                                                                    |
| Session Count                     | `sct`                  | 230                                                                                                                         |
| Session Engagement                | `seg`                  | 1                                                                                                                           |
| Session ID                        | `sid`                  | 1768475378                                                                                                                  |
| System Property                   | `_prs`                 | wg                                                                                                                          |
| System Property                   | `_eu`                  | AAAAAAQ                                                                                                                     |
| System Property                   | `_tu`                  | AAI                                                                                                                         |
| System Property                   | `_ee`                  | 1                                                                                                                           |
| tag_exp                           | `tag_exp`              | 103116026~103200004~104527907~104528500~104684208~104684211~105391252~115495939~115938465~115938469~115985661~117041587     |
| User-Agent Architecture           | `uaa`                  | x86                                                                                                                         |
| User-Agent Bitness                | `uab`                  | 64                                                                                                                          |
| User-Agent Full Version List      | `uafvl`                | Google%20Chrome;143.0.7499.193\|Chromium;143.0.7499.193\|Not%20A(Brand;24.0.0.0                                             |
| User-Agent Mobileness             | `uamb`                 | 0                                                                                                                           |
| User-Agent Model                  | `uam`                  | (empty)                                                                                                                     |
| User-Agent Platform               | `uap`                  | macOS                                                                                                                       |
| User-Agent Platform Version       | `uapv`                 | 12.7.6                                                                                                                      |
| User-Agent WoW64 (Win32 on Win64) | `uaw`                  | 0                                                                                                                           |

## Messages Where This Hit Fired

- 51begin_checkout

## GA4 Event | Contact Page Form

### Tag Details

#### Properties

| Name                | Value                       |
| ------------------- | --------------------------- |
| Type                | Google Analytics: GA4 Event |
| Send Ecommerce data | `true`                      |
| Data source         | `"dataLayer"`               |
| Event Name          | `"form_submit"`             |
| Measurement ID      | `G-FCES3L0M9M`              |

### Messages Where This Tag Fired

No messages

### Firing Triggers

**Contact Page Form**

| Filter Type | Condition     | Value                   |
| ----------- | ------------- | ----------------------- | ----------------- | ---- |
| \_event     | equals        | gtm.formSubmit          |
| Form URL    | contains      | utekos.no/kontaktskjema |
| Click Text  | contains      | Snakk med Utekos        |
| \_triggers  | matches RegEx | (^$\|((^                | ,)220236256_105($ | ,))) |

### Blocking Triggers

No blocking triggers

## Annet

**signup_newsletter** er forøvrig et event jeg selv har satt opp i GTM. Tatt
rett ut av dokumentasjonen. TAG ID er {{GA4 Measurement ID}} og Event Name er
signup_newsletter
