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
