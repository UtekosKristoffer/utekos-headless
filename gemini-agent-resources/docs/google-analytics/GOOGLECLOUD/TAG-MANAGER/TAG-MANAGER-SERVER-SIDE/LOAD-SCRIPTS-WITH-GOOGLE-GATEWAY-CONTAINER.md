# Serve Scripts with a Tagging Server

> **Note**: You can now serve all Google scripts (e.g., `gtag.js`, `gtm.js`) with the Web Container client.

You can set up your Tagging server to serve Google scripts either from a path on the same domain as your website (depicted below) or as a subdomain on your site. This setup adds more load on your Tagging server and may incur a higher cost due to additional egress script requests from your server-side instance.

## Step 1: Configure the client

To establish a first-party context between your web container and your tagging server, Google scripts need to be loaded through your server.

> **Note**: If you have a `noscript` installation, it will only load the web container in through first party serving. Any dependencies will still be loaded through first-party endpoints.

To load Google scripts through your server container:

1.  Open **Google Tag Manager**.
2.  In your server container, click **Clients**.
3.  Click **New**.
4.  Select the **Google Tag Manager: Web Container** client type.

In **Client Configuration**:

*   **Add Container ID**: Enter the container ID of the Tag Manager web container that you will use on your website.
*   **Automatically serve all dependent Google scripts**: When enabled (default setting), the tagging server will automatically serve scripts that are needed by the root Google script. This removes the need to allowlist each container that the Google script requires. If you only want to serve the initial container from the tagging server, deselect this option.
*   **Enable region-specific settings**: Use this option to trigger certain tags based on the user's location.

Name the client and **Save**.

**Publish** the workspace.

### Allow first-party serving and collection for Google Ads and Floodlight tags

To strengthen your data and ensure future compatibility, use either of the following implementation options to ensure your Google Ads and Floodlight tags are served and measured as first-party requests:

#### Option 1: Move Google Ads and Floodlight tags into a server-side container

Use this implementation to gain better control over your data in a centralized place by making server-side Google Tag Manager a data staging area. This implementation option supports value-based bidding, and allows server-side Google Tag Manager to have server-set cookies.

1.  Implement Google tag gateway through CDN or load balancer, or through the tagging server.
2.  Move the Google Ads and Floodlight tags into the server-side container, instead of leaving them in the client-side container.

#### Option 2: Keep Google Ads and Floodlight tags in the client-side container

If you have an existing CDN, use the following implementation:

1.  Implement Google tag gateway through CDN or load balancer, so that the client-side container can be loaded from a first-party context.
2.  Keep the Google Ads and Floodlight tags in the client-side container.

> **Note**: Google tag gateway implementation is required for both implementation options. Due to the dependency on third-party cookies, it's expected that some requests are still sent as third-party requests for both implementation options. Additional cost due to egress requests will apply to both options only if you choose to load your script using your tagging server.

## Step 2: Update the script source domain

By default, Tag Manager loads their dependencies from Google-owned servers, such as `https://googletagmanager.com`. You need to update the script URL on your website to load dependencies through your own server.

### Google Tag Manager Implementation

To load the Tag Manager code using your server container:

1.  Locate the existing Tag Manager code on the page.
2.  Replace the string `https://example.com/metrics` with the domain name of your tagging server in the `<head>` and `<body>` of the Google Tag Manager installation code.

#### Head

> **Note**: This setup is not designed for next.js and must therefore be modified to be implemented with the relevant framework's updated documentation.

```html
<!-- Google Tag Manager -->
<script>
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), 'event': 'gtm.js' })
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://example.com/metrics/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', 'TAG_ID')
</script>
<!-- End Google Tag Manager -->
```

#### Body

```html
<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://example.com/metrics/ns.html?id=TAG_ID"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
  ></iframe
></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## Step 3: Verify the source of your scripts

The following instructions show how to test using Google Chrome. You can use any browser of your choice, but the steps might differ.

To test if your server container is loading the dependencies:

1.  Open your website in a new browser tab.
2.  Open the browser's developer tools. In Google Chrome, you can right-click anywhere on the page and select **Inspect**.
3.  In the developer tools, open the **Sources** tab. This window displays all dependencies that were loaded when you opened the website.

✅ Your implementation is correct if `gtm.js` or `gtag` is loaded from the source you specified.

❌ If the **Sources** tab displays `www.googletagmanager.com` as the source for `gtm.js` or `gtag`, the dependencies are still loaded from Google servers.

*   Check if you've modified the source URL in your code, see step 2.
*   Check if the code is live.

## Next steps

If you are using consent mode, you can set up region-specific tag behavior for even more control.
