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
