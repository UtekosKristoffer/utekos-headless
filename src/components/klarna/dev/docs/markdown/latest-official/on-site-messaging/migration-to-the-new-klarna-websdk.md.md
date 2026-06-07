# Step 1: Update the Script Tag

Klarna's WebSDK enhances integration, offering faster, safer solutions. Update your website code, adjust some
styles, register your website with Klarna, and make sure Klarna's site is allowed on your site for a smooth
switch.

Klarna is introducing a new WebSDK that aims to streamline the integration process and offer a more robust,
fast and safe solution for partners. Although designed to be backward compatible, some changes might be
necessary depending on your setup. Below are the steps to ensure a smooth transition. Replace your existing
**`<script>`** tag as follows:

### Old Implementation

```html
<script async="" src="https://osm.klarnaservices.com/lib.js" data-client-id="<client_id>"></script>
```

**\[RELEASE]**

Please do not use lib.js for new integrations.

### New Implementation
 
```html
<script
  async
  data-environment="playground | production"
  src="https://js.klarna.com/web-sdk/v1/klarna.js"
  data-client-id="your_klarna_live_client_"
></script>
```

**\[INFO]**

The value of data-client-id would be different and would look like
\\\*\\\*klarna\\\_\\\{env}\*client\*\\\{longString} \\\*\\\*which you can copy from Merchant Portal

## Step 2: Modify Styling if Using ::parts API

If you're using the **::parts** API for styling, update the selectors. **Old:**

```html
#placementID *::part(osm-container) { /* Your CSS rules here */ }
```

**New:**

```html
#placementID::part(osm-container) { /* Your CSS rules here */ }
```

## Step 3: Register your origin domain

Login to Merchant Portal and navigate to **Conversion boosters** to allow your domain origin.

![null](/static/assets/411ad715-0d61-4ebc-96b8-273e720d01d4%20Screenshot%2B2024-02-28%2Bat%2B11.36.55.jpeg)

## Step 4: Modify CSP rules if you have set CSP

If you're using CSP (Content Security Policy), you will need to whitelist **js.klarna.com**.

**\[INFO]**

For for more details and examples please follow the steps from \[Integrate using Klarna Web
SDK]\(https\://docs.klarna.com/conversion-boosters/on-site-messaging/integrate-on-site-messaging/integrate-using-klarna-web-sdk/)
⚛️React Not Detected React is not detected on this page. Please ensure you're visiting a React application.
