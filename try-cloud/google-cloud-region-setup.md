# Enable Region-Specific Behavior for Tags

This article is for developers who serve Google scripts from their own server.
We recommend enabling region-specific behavior for tags to unlock features such
as advanced consent mode, and to control tag behavior based on where your users
are.

If you serve a script from a first-party domain, you should provide the user's
geolocation information in the request header to be able to use the
`event_location.country` and `event_location.region` parameters. If available in
the request header, IP address takes precedence in determining geolocation.
Otherwise, the `event_location.country` and `event_location.region` parameters
are used to send country and region information respectively.

> **Note**: If `gtm.js` or `gtag.js` is served from `www.googletagmanager.com`,
> the user's IP address and geolocation information are included in the script
> request, but only the geolocation information is used. If the IP address is
> redacted within the server container, it will remain redacted but the region
> and country information will be used for modeling. To remove them, you can use
> the transformation feature.

## Before You Begin

This guide assumes that you have done the following:

- Set up a server container in Tag Manager
- Set up a tagging server
- Set up first-party script serving

## Step 1: Set Up the Request Header

You need to send specific request headers that contain the user's region
information, as described in the sections below.

You can directly start at Step 2 if:

- You use App Engine. App Engine sends geo headers automatically.
- You use a different infrastructure provider than the ones listed below. You
  need to set up custom headers.

**Supported infrastructure providers:**

- Cloud Run with GCP Load Balancer
- GCP Load Balancer
- Amazon Web Services (AWS) CloudFront
- Azure Front Door
- Cloudflare

## Step 2: Set Up the Visitor Region Variable

If you have set up geo headers as specified above, Tag Manager automatically
detects the region or country by reading the HTTP request header. Alternatively,
you can set up custom headers.

### Automatic Detection

1. Open Google Tag Manager
2. Open your server container
3. In the Variables menu, Configure the list of built-in variables
4. Select **Visitor Region**

The geo headers will now be available to use in the Visitor Region variable.

### Custom Headers

_(Follow alternative setup instructions for custom headers)_

## Step 3: Enable Region-Specific Settings in Your Client

In order to use the visitor region for processing incoming HTTP requests, you
have to add it to your client.

1. Select the **Google Tag Manager: Web container client**
2. Check **Enable region-specific settings**
3. Add the `{{Visitor Region}}` variable that you created in the previous step
   to the Region field
4. Save your client

## Step 4: Verify That Region Settings Apply

To test if your settings work:

1. Open Preview mode for your server container
2. Load your website while using first-party serving
3. In the preview window, click on the **Claimed Google Analytics GA4 client**
4. To see the actual region, change the **Display Variables** radio button to
   **values**

### Verification Results

- ✅ **Your implementation is correct** if the Region property displays a
  country code
- ❌ **If the Region property displays `undefined` or is missing**, your server
  isn't receiving any region data. Check if the server's HTTP headers are set up
  according to the predefined variables Google Tag Manager is looking for, see
  [Set up the request header](#step-1-set-up-the-request-header)
