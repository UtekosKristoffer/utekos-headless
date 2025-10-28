# Advanced Matching

This document explains how to manually implement advanced matching for tracked
conversion events using the Meta Pixel.

> **Note:** Please visit the Privacy and Data Use Guide to learn what data is
> sent when using the Meta Pixel.

To automatically implement advanced matching use the Events Manager.

## Implementation

To use advanced matching, format the visitor's data as a JSON object and include
it in the pixel base code `fbq('init')` function call as a third parameter.

**Important:** Be sure to place advanced matching parameters in the pixel base
code or the values will not be treated as manual advanced matching values.

### Example

If your pixel ID was `283859598862258`, you could do this:

```javascript
fbq('init', '283859598862258', {
  em: 'email@email.com', // Values will be hashed automatically by the pixel using SHA-256
  fn: 'first_name',
  ln: 'last_name'
  // ...
})
```

> **Note:** We accept both lowercase unhashed and normalized SHA-256 hashed
> email addresses in your function calls.

### Sending More Hashed Values

You can use the `<img>` tag to pass your own visitor data if you format and hash
your user data using a SHA-256 hashing algorithm.

The following is an example of passing hashed user email, first name, and last
name:

```html
<img
  height="1"
  width="1"
  style="display:none"
  src="https://www.facebook.com/tr/?id=PIXEL_ID&ev=Purchase
    &ud[em]=f1904cf1a9d73a55fa5de0ac823c4403ded71afd4c3248d00bdcd0866552bb79
    &ud[fn]=4ca6f6d5a544bf57c323657ad33aae1a019c775518cf4414beedb86962aea7c1
    &ud[ln]=41f3e15ff8a4e4117da46465954304497ef29bdf35afaa9e36d527864d24c266
    &cd[value]=0.00
    &cd[currency]=USD"
/>
```

## Reference

### User Data Parameters

| User Data              | Parameter     | Format                                                                                            | Example                                                                                    |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Email**              | `em`          | Unhashed lowercase or hashed SHA-256                                                              | `jsmith@example.com` or `6e3913852f512d76acff15d1e402c7502a5bbe6101745a7120a2a4833ebd2350` |
| **First Name**         | `fn`          | Lowercase letters                                                                                 | `john`                                                                                     |
| **Last Name**          | `ln`          | Lowercase letters                                                                                 | `smith`                                                                                    |
| **Phone**              | `ph`          | Digits only including country code and area code                                                  | `16505554444`                                                                              |
| **External ID**        | `external_id` | Any unique ID from the advertiser, such as loyalty membership ID, user ID, and external cookie ID | `a@example.com`                                                                            |
| **Gender**             | `ge`          | Single lowercase letter, `f` or `m`, if unknown, leave blank                                      | `f`                                                                                        |
| **Birthdate**          | `db`          | Digits only with birth year, month, then day                                                      | `19910526` for May 26, 1991                                                                |
| **City**               | `ct`          | Lowercase with any spaces removed                                                                 | `menlopark`                                                                                |
| **State or Province**  | `st`          | Lowercase two-letter state or province code                                                       | `ca`                                                                                       |
| **Zip or Postal Code** | `zp`          | String                                                                                            | `94025`                                                                                    |
| **Country**            | `country`     | Lowercase two-letter country code                                                                 | `us`                                                                                       |

# Best Practices for Advanced Matching for Web

There are 2 types of advanced matching for web: **manual** and **automatic**.

## Deciding Which Option to Use

### Use Automatic Advanced Matching If:

- **You don't have access to developer help**: You can turn on the automatic
  version with a few clicks in Meta Events Manager.
  [Learn how to set up automatic advanced matching](https://www.facebook.com/business/help/611774685654668).

### Use Both Manual and Automatic Advanced Matching If Possible:

- Because manual and automatic advanced matching work in different ways, this
  helps you achieve maximum performance from advanced matching
- The manual version involves coding so you may need help from a developer
- [Learn how to set up advanced matching manually](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- If you don't have the resources to set up advanced matching manually, you may
  still benefit from using automatic advanced matching alone

### Use Manual Advanced Matching If:

#### Your Meta Pixel is in an iframe

- Automatic advanced matching won't work if your pixel is set up in an iframe,
  but manual advanced matching will

#### You use an IMG pixel

- Automatic advanced matching won't work if you use an IMG pixel, but manual
  advanced matching will
- If you use an IMG pixel, you must format and hash your visitor input on your
  own
- [Learn more on our Meta for Developers site](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)

#### Your business is in a restricted vertical

- Businesses (including event data sources they own, such as the Meta Pixel) may
  not have certain features available to them if they're categorized as being in
  a restricted vertical
- If you see a message in Meta Events Manager that says you're unable to use
  automatic advanced matching, this may be because your business is categorized
  as being in a restricted vertical
- Examples of restricted verticals include industries such as banking, lending,
  financial services, insurance, pharmaceuticals and health
- [Learn how to set up advanced matching manually](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)

#### Users often remain logged in for extended periods

- Automatic advanced matching doesn't know who a person is unless they take an
  action, such as filling out a form or logging into your website
- If you have a website where people remain logged in, instead of logging in
  each time they visit, set up advanced matching manually
- Manual setup allows us to receive hashed customer information, regardless of
  if someone recently logged into the website

## Additional Best Practices

### When Using Automatic Advanced Matching:

- Make sure your website contains form fields where visitors enter relevant
  information (e.g., email address, phone number, first name, last name, city,
  state, country, ZIP code or gender)
- Place the Meta Pixel on web pages where people are most likely to enter
  relevant information

## Feature Comparison

| Feature                                   | Automatic Advanced Matching | Manual Advanced Matching |
| ----------------------------------------- | --------------------------- | ------------------------ |
| Increase custom audience size             | ✔                          | ✔                       |
| Increase number of attributed conversions | ✔                          | ✔                       |
| Decrease cost per conversion              | ✔                          | ✔                       |
| No coding required                        | ✔                          |                          |
| Works when the pixel is in an iframe      |                             | ✔                       |
| Works with an IMG pixel                   |                             | ✔                       |
| Available for all business verticals      |                             | ✔                       |

# Get Started

The Meta Pixel is a snippet of JavaScript code that loads a small library of
functions you can use to track Facebook ad-driven visitor activity on your
website. It relies on Facebook cookies, which enable us to match your website
visitors to their respective Facebook User accounts. Once matched, we can tally
their actions in the Facebook Ads Manager so you can use the data to analyze
your website's conversion flows and optimize your ad campaigns.

By default, the Pixel will track URLs visited, domains visited, and the devices
your visitors use. In addition, you can use the Pixel's library of functions to:

- track conversions, so you can measure ad effectiveness
- define custom audiences, so you can target visitors who are more likely to
  convert
- set up Advantage+ catalog ads campaigns

## Requirements

In order to implement the Pixel, you will need:

- access to your website's code base
- your Pixel's base code or its ID
- access to the Facebook Ads Manager

In addition, depending on where you conduct business, you may have to comply
with General Data Protection Regulation.

Ready? Let's get started.

## Base Code

Before you can install the Pixel, you will need your Pixel's base code, which
you can find in the Ads Manager > Events Manager. If you have not created a
Pixel, follow these instructions to create one — all you will need is the
Pixel's base code (step 1).

The base Pixel code contains your Pixel's ID in two places and looks like this:

```html
<!-- Facebook Pixel Code -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  )
  fbq('init', '{your-pixel-id-goes-here}')
  fbq('track', 'PageView')
</script>
<noscript>
  <img
    height="1"
    width="1"
    style="display:none"
    src="https://www.facebook.com/tr?id={your-pixel-id-goes-here}&ev=PageView&noscript=1"
  />
</noscript>
<!-- End Facebook Pixel Code -->
```

When run, this code will download a library of functions which you can then use
for conversion tracking. It also automatically tracks a single PageView
conversion by calling the `fbq()` function each time it loads. We recommend that
you leave this function call intact.

## Installing The Pixel

To install the Pixel, we highly recommend that you add its base code between the
opening and closing `<head>` tags on every page where you will be tracking
website visitor actions. Most developers add it to their website's persistent
header, so it can be used on all pages.

Placing the code within your `<head>` tags reduces the chances of browsers or
third-party code blocking the Pixel's execution. It also executes the code
sooner, increasing the chance that your visitors are tracked before they leave
your page.

Once you have added it to your website, load a page that has the Pixel. This
should call `fbq('track', 'PageView')`, which will be tracked as a PageView
event in the Events Manager.

Verify that this event was tracked by going to your Events Manager. Locate your
Pixel and click its details — if you see a new PageView event, you have
successfully installed the Pixel. If you do not see it, wait a few minutes and
refresh the page. If your Pixel is still not working, use the Pixel Helper to
track down the problem.

### Installing Using a Tag Manager

Although we recommend adding the Pixel directly to your website's `<head>` tags,
the Pixel will work in most tag management and tag container solutions. For
specific advice on implementing the Pixel using your tag manager, please refer
to your tag manager's documentation.

### Installing Using an IMG Tag

Although not recommended, you can alternately install the Pixel using an `<img>`
tag.

### Mobile Websites

If your mobile website is separate from your desktop website, we recommend that
you add the Pixel to both. This will allow you to easily remarket to your mobile
visitors, exclude them, or create lookalikes audiences.

## Pixel Helper

We highly recommend that you install our Pixel Helper Chrome extension. The
Pixel Helper provides extremely valuable feedback that can help you verify that
your Pixel is working correctly, especially when you start tracking conversions,
where you can easily encounter formatting errors.

# Set up and install the Meta Pixel

You may be able to speak with a Meta Technical Pro for step-by-step guidance to
install the Meta Pixel. Learn how to schedule a call with a Meta Pro. This
article will cover how to set up a Meta Pixel on your website.

## Setting up a pixel involves 2 steps:

1. Create your pixel in Events Manager and set up the base code on your website.
   You can use a partner integration, if available, or add code manually to your
   website.
2. Set up events on your website to measure actions like making a purchase. You
   can use a partner integration, the point-and-click event setup tool, or add
   code manually to your website. There are several options for how to set up
   your pixel and events, and you’ll be guided through the available options
   during setup. If you set up your pixel or events manually, you may need a
   developer's help to add the code to your website.

If you share events with Meta using your pixel, we also recommend using the
Conversions API. The Conversions API helps improve the performance and
measurement of your Meta ad campaigns by working with your Meta Pixel. Learn
more about the Conversions API and how it works.

Requirements You need a business website or app. You or your developer must be
able to update your website's code or the tag manager you use, if applicable,
for manual pixel setup using code. Set up the Meta Pixel and events on your
website

1. Go to Meta Events Manager.
2. Click Connect data and select Web.
3. Click Connect.
4. Enter a name for your pixel, then click Create pixel. This creates a new ID,
   viewable in Events Manager.
5. Your next steps depend on if you have a website or not:

- If you have a website, enter your website URL to check for easy partner
  integration setup options, then click Check.
- If a partner integration is available to you, you’ll see it on the screen.
  Click Next and follow the onscreen instructions to set up your pixel and
  events through your partner’s website.
- If a partner integration is not available, click Next.
- If you don’t have a website, click to check the box next to I don't have a
  website and click Continue.

6. Select how you would like to connect your data with Meta: Get guidance or Do
   it yourself. Note: We recommend Get guidance.

- Select Get guidance if you would like setup recommendations. You can skip the
  rest of the instructions in this article if you select this option, and you
  can follow the onscreen instructions in Events Manager instead.
- Select Do it yourself if you already know how you’d like to connect your data
  and don’t want setup recommendations. If you select this option, follow the
  rest of the instructions in this article.

7. Select Conversions API and Meta Pixel or Meta Pixel only as your setup
   option, then click Next.
   - If you select Conversions API and Meta Pixel, choose how you want to set up
     the Conversions API and pixel. You can choose either Set up with partner
     integration, Set up with Conversions API Gateway or Set up manually. If
     you’re not sure which option to choose, you can compare Conversions API
     setup options by cost and complexity.
   - If you select Set up with partner integration, select your partner and
     follow the onscreen instructions to set up the pixel, Conversions API and
     events.
   - If you select Set up with Conversions API Gateway, follow the onscreen
     instructions to set up the pixel, Conversions API Gateway and events.
   - If you select Set up manually, follow the onscreen instructions to create
     personalized instructions to set up the pixel, Conversions API and events.
     On the last screen, you’ll have the option to set up the Conversions API
     yourself using the personalized instructions or send the instructions to a
     developer. If you need help creating the instructions, you can learn how to
     set up the Conversions API using personalized instructions.

- If you select Meta Pixel only, choose how you want to set up your pixel code:
  Install code manually or Check for partner. If you have a developer who will
  set up your pixel for you, you can click Email instructions instead.

## Install the Meta Pixel manually

1. Copy the pixel base code.

2. Find the header of your website or locate the header template in your CMS or
   web platform.
3. Paste the base code at the bottom of the header section, just above the
   closing head (</head>) tag, on every page of your website. Your ID will be
   included in your base code, and you can use one ID across your whole website.
   Code snippet showing where to place the Meta Pixel code in the website header

   **example of Meta Pixel base code**
   <!-- ExampleFacebook Pixel Code -->
   <!DOCTYPE html>
   <html lang ="en">
   <head>
     <script>...</script>
     insert_pixel_base_code_here
   </head>

4. Click Continue.
5. Optional: Toggle on Automatic advanced matching and verify the customer
   information you want to send. Click Continue.
6. Add events using the event setup tool or by manually adding code to your
   website.

- To use the event setup tool: Click Open event setup tool and follow the
  onscreen instructions to add events and parameters without the need for
  additional coding. If you need additional help, learn how to use the event
  setup tool.
- To use manual setup: Click Install events using code to learn how to set up
  the Meta Pixel using code.

# Best Practices for Meta Pixel Standard Event Setup

Standard events help you understand how people are interacting with your
website, optimize for conversions and build audiences. Here are best practices
for using standard events with the Meta Pixel:

## Key Guidelines

### 1. Copy Code Snippets Exactly

Copy the code snippet exactly as it appears. Standard event codes are **case
sensitive**.

**Example:**

- ✅ Correct: `fbq('track', 'ViewContent');`
- ❌ Incorrect: `fbq('track', 'viewcontent');`

If you accidentally use incorrect casing, the event will appear as a custom
event rather than a standard event in your ads reporting. Learn more about
[standard and custom events](https://www.facebook.com/business/help/402791146561655).

### 2. Set Value and Currency for Purchase Events

Set the value and currency for the purchase standard event. This will help
better reflect your conversion. Learn how to
[set the value and currency of your Meta Pixel standard events](https://www.facebook.com/business/help/392174274295227).

### 3. Add a Full Funnel of Events

Add a full funnel of events, such as:

- View content
- Add to cart
- Purchase

This will allow your pixel to receive all relevant purchase actions.

**Example:** If you sell toys on your website, you would place the corresponding
standard event code on your add to cart page and purchase page.

### 4. Use Conversions API with Meta Pixel

Use the Conversions API in addition to the Meta Pixel, and share the same events
using both tools. We call this a **redundant event setup**.

**Example:** If you share the purchase, initiate checkout and contact events
using the pixel, share those same web events from your server using the
Conversions API.

Redundant setups are useful because the Conversions API allows you to share
website events that the pixel may fail to capture due to network connectivity
issues or page loading errors. Learn how to
[check if you're sharing redundant web events](https://www.facebook.com/business/help/823677331451951).

---

**Note:** The page view event is included as part of your pixel base code. Page
view tells you when someone lands on a web page with the pixel base code
installed. This is different than a view content standard event, which is not
included as part of your pixel base code.

# ClickID and the fbp and fbc Parameters

## Overview

This guide explains Meta's ClickID and the \_fbc and \_fbp parameters. The \_fbc
and \_fbp parameters represent browser cookie values and can be sent with your
server events. See About Cookie Settings For Your Meta Pixel.

- We recommend that you always send \_fbc and \_fbp browser cookie values in the
  fbc and fbp event parameters, respectively, when available.
- These values are subject to change over multiple browser sessions, so we
  recommend refreshing a user’s profile with the latest value whenever possible.

## What Is Meta’s ClickID

ClickID is a Meta-generated parameter that is passed with the URL of an
advertiser's website when a user clicks an ad on Facebook and/or Instagram.
Sharing ClickID can help you attribute more conversions and reach more people,
which may drive better ad performance. ClickID auto-attachment does not impact
other custom tracking parameters you may have enabled.

**Example URL with ClickID**

```
https://example.com/?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk
```

## Benefits of ClickID

- Increase conversions volume
- Improve campaign attribution and optimisation
- Increase ad performance

## Implementation Steps

### 1. Retrieve Meta ClickID

#### Retrieve from fbclid URL query parameter

Whenever present in the URL query parameters, try to obtain the parameter
server-side by reading it from the HTTP request URL’s query string.

```
GET /?fbclid=IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk
HTTP/2.0
Host: www.example.org
```

> Note: ClickID value is case sensitive - do not apply any modifications before
> using, such as lower or upper case.

#### Retrieve from \_fbc cookie

ClickID value is available within \_fbc cookie in 2 cases:

1. Meta Pixel is installed on the website. In this case, Meta Pixel
   automatically stores ClickID value in the \_fbc browser cookie once
   available.
2. You already store it in the cookie from the server or in backend storage,
   following the best practices listed in the “Store ClickID” section.

In both these cases formatted ClickID can be obtained from the \_fbc cookie by
reading the Cookie headers of the HTTP request. See how to format ClickID
correctly in the “Format ClickID” section below.

### 2. Format ClickID

If the \_fbc cookie is not available because there is no Meta Pixel running on
the website, it is still possible to send the fbc event parameter with the
Conversion API event if an fbclid query parameter is in the URL of the current
page request.

The formatted ClickID value must be of the form
`version.subdomainIndex.creationTime.<fbclid>`, where:

- version is always this prefix: `fb`
- subdomainIndex is which domain the cookie is defined on (`'com' = 0`,
  `'example.com' = 1`, `'www.example.com' = 2`)
- creationTime is the UNIX time since epoch in milliseconds when the \_fbc was
  stored. If you don't save the \_fbc cookie, use the timestamp when you first
  observed or received this fbclid value
- `<fbclid>` is the value for the fbclid query parameter in the page URL.

Here’s an example of what the resulting fbc parameter value could look like
(note that the `<fbclid>` portion is invalid):

```
fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

### 3. Store ClickID

> Note: Before storing ClickID it is crucial to format it as described in the
> “Format ClickID” section above - it will ensure a valid value sent to Meta via
> the Conversions API.

#### Set formatted ClickID in the \_fbc cookie in the HTTP response

It is highly recommended to set \_fbc as:

- HTTP cookie in the HTTP response headers
- with the 90 days expiration time
- once retrieved from the fbclid URL query parameter or the \_fbc browser
  cookie.

Note, only set the cookie if:

- \_fbc cookie doesn’t exist and ClickID was retrieved from the fbclid URL query
  parameter
- fbclid in the URL query parameter isn’t equal to the corresponding value in
  the \_fbc cookie value. In the cookie, fbclid corresponds to the string after
  the last “.” in cookie value.

**Example**

```
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie:
_fbc=fb.1.1709136167115.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk; Expires=Thu, 21 Oct 2021 07:28:00 GMT;
```

#### Store formatted ClickID on the server

As an alternative to the cookie option above, you can store and manage the value
of the formatted ClickID in your backend storage. In this case, you will need to
ensure you store and send the most recent value obtained from the URL query
parameter, if present.

### 4. Send fbc Parameter with Conversions API Events

After the value of the ClickID is obtained, it needs to be correctly formatted
before sending it with an event via Conversions API - see instructions below. We
recommend sending the fbc parameter with every event you send to the Conversions
API.

- Parameter name: fbc
- Parameter value: must be of the form
  `version.subdomainIndex.creationTime.fbclid`, where:
  - version is always this prefix: `fb`
  - subdomainIndex is which domain the cookie is defined on (`'com' = 0`,
    `example.com' = 1`, `'www.example.com' = 2`). If you’re generating this
    field on a server, and not saving an \_fbc cookie, use the value `1`.
  - creationTime is the UNIX time since epoch in milliseconds when the \_fbc
    cookie was saved. If you don't save the \_fbc cookie, use the timestamp when
    you first observed or received this fbclid value.
  - fbclid is the value for the fbclid query parameter in the page URL.

**Value example**

```
fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk
```

**Conversions API payload example**

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1712248396,
      "action_source": "website",
      "user_data": {
        "fbc": "fb.1.1554763741205.IwAR2F4-dbP0l7Mn1IawQQGCINEz7PYXQvwjNwB_qa2ofrHyiLjcbCRxTDMgk",

        "em": [
          "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068"
        ],
        "ph": [
          "6069d14bf122fdfd931dc7beb58e5dfbba395b1faf05bdcd42d12358d63d8599"
        ]
      },
      "custom_data": {
        "currency": "USD",
        "value": "142.52"
      }
    }
  ]
}
```

## Integration Helpers

### Payload Helper

Payload Helper is a tool that allows you to construct the Conversions API
request payload to ensure correct format of the data sent to Meta. It also
features Business SDK in multiple programming languages you can use to integrate
with Conversions API. They are available upon clicking on the “Get Code” button
within the “Generate Code” section.

## fbp

When the Meta Pixel is installed on a website, and the Pixel uses first-party
cookies, the Pixel automatically saves a unique identifier to an \_fbp cookie
for the website domain if one does not already exist.

The fbp event parameter value must be of the form
`version.subdomainIndex.creationTime.randomnumber`, where:

- version is always this prefix: `fb`
- subdomainIndex is which domain the cookie is defined on (`'com' = 0`,
  `'example.com' = 1`, `'www.example.com' = 2`). If you’re generating this field
  on a server, and not saving an \_fbp cookie, use the value `1`.
- creationTime is the UNIX time since epoch in milliseconds when the \_fbp
  cookie was saved. If you don't save the \_fbp cookie, use the timestamp when
  you first observed or received this fbp value.
- Randomnumber is generated by the Meta Pixel SDK to ensure every \_fbp cookie
  is unique.

Here’s an example of what the fbp value could look like:

```
fb.1.1596403881668.1116446470
```
