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

### Cloud Run with GCP Load Balancer

You can send geolocation information either with all HTTP request headers, or
for specific requests. Since adding custom request headers will incur a fee on a
per 1 million request basis, we recommend to only include geo information for
requests to serve Google scripts. This option initially requires more setup but
helps you run your infrastructure as economically as possible.

#### Script Requests (Recommended)

To include the geo headers for only script requests, you need to set up a new
backend and create routing rules.

**To create a new backend:**

1. Open GCP load balancer
2. In your load balancer, open the **Backend configuration** section. Create a
   new backend service.
3. Configure your new backend service:
   - **Backend type**: choose the network endpoint group type that your
     application uses. If you use Cloud Run, choose **Serverless network
     endpoint group**.
   - In **New backend**, pick the network endpoint group of your server-side Tag
     Manager deployment.
4. Open the section **Advanced configurations**. Add the custom request headers:

   | Header Name      | Header Value                  |
   | ---------------- | ----------------------------- |
   | `X-Gclb-Country` | `{client_region}`             |
   | `X-Gclb-Region`  | `{client_region_subdivision}` |

5. Save the new backend service.

**To configure routing rules:**

1. In your load balancer, open the **Routing rules** section. Choose the mode
   **Advanced host path and rule**.
2. Update the `pathRules` parameter to map `gtm.js`, `/gtag/js`, and
   `/gtag/destination` to the new backend service:

   ```yaml
   pathRules:
     - paths:
           - /gtm.js
           - /gtag*
        service: projects/project_id/global/backendServices/new_backend_service
     - paths:
           - /*
        service: projects/project_id/global/backendServices/original_backend_service
   ```

3. Save your changes.

#### All Requests

Follow the same steps as above, but apply the custom headers to your original
backend service instead of creating a new one.

### GCP Load Balancer

Follow the same instructions as **Cloud Run with GCP Load Balancer** above.

### Amazon Web Services (AWS) CloudFront

Configuration details for AWS CloudFront would be documented here.

### Azure Front Door

Configuration details for Azure Front Door would be documented here.

### Cloudflare

Enable the **"Add visitor location headers"** in the managed transforms section:

This will automatically add the following header along with its value:

| Header Name    | Header Value       |
| -------------- | ------------------ |
| `CF-IPCountry` | The user's country |

## Step 2: Set Up the Visitor Region Variable

If you have set up geo headers as specified above, Tag Manager automatically
detects the region or country by reading the HTTP request header. Alternatively,
you can set up custom headers.

### Automatic Detection (Recommended)

1. Open Google Tag Manager
2. Open your server container
3. In the **Variables** menu, create a **New user-defined variable** of the type
   **Visitor Region**
4. In the **Variable Configuration**, choose **Custom Variable**
5. Name your variable and **Save** it

### Custom Headers

1. In the **Variables** menu, create two new **Request header** variables:
   - One for your country
   - One for subdivision code
2. Fill the values with the country codes in your HTTP request header(s)

   > **Note**: The format has to adhere to ISO-3166-2

3. Use your created variables in the **Visitor Region** variable
4. Name your variable and **Save** it

## Step 3: Enable Region-Specific Settings in Your Client

In order to use the visitor region for processing incoming HTTP requests, you
have to add it to your client.

1. Select the **Google Tag Manager: Web container client**
2. Check **Enable region-specific settings**
3. Add the `{{Visitor Region}}` variable that you created in the previous step
   to the **Region** field
4. **Save** your client

## Step 4: Verify That Region Settings Apply

To test if your settings work:

1. Open **Preview mode** for your server container
2. Load your website while using first-party serving
3. In the preview window, click on the **Claimed Google Analytics GA4 client**
4. To see the actual region, change the **Display Variables** radio button to
   **values**

**Results:**

- ✅ Your implementation is correct if the **Region** property displays a
  country code
- ❌ If the **Region** property displays `undefined` or is missing, your server
  isn't receiving any region data. Check if the server's HTTP headers are set up
  according to the predefined variables Google Tag Manager is looking for, see
  [Set up the request header](#step-1-set-up-the-request-header)

---

## Enable Google Signals for Server-Side Tag Manager

Server-side Tag Manager supports Google signals for Google Analytics 4 (GA4).

---

## Set Up Proxy Server Routing

This document is for developers who want to route all server-side tagging
traffic through a proxy server.

### Before You Begin

Before you can set up proxy server routing, make sure you have:

- A server container deployed on Cloud Run or via manual setup.
  > **Note**: App Engine deployments don't support proxying traffic.
- A proxy server deployed that supports HTTP CONNECT requests.
- The ability to allowlist specific outbound traffic from the proxy server, for
  example, using VPC, Firewall, or Proxy access control lists (ACLs).

### Configure Proxy Server Routing

#### Cloud Run

To forward traffic to a proxy for Cloud Run deployments:

1. Open Cloud Run
2. Choose your server-side tagging Cloud Run instance.
3. Click **EDIT & DEPLOY NEW REVISION**. The deploy revision screen opens.
4. Under **Container(s)**, choose your server container. A new screen with the
   container setting opens.
5. To expand the service configuration, select the **Variables & Secrets** tab.
   Click the **Add Variable** button and add the following environment variable:
   - **Name**: `HTTP_PROXY`
   - **Value**: URI of the proxy server (e.g. `https://proxy.example.com:3333`
     or `http://32.12.83.10`)

   > **Note**: The protocol must be either HTTP or HTTPS

6. Click **Done**.
7. Confirm your revisions and click **Deploy**.

**Result**: Your server-side tagging deployment sends all outbound traffic to
the proxy endpoint you specified in the environment variable.

#### Manual Deployment

Configuration details for manual deployment would be documented here.

### Verify the Proxy Server Setup

To verify your proxy requests setup, check both Google Tag Manager and your
proxy server configuration.

**To verify your server container proxies requests:**

1. Open Google Tag Manager
2. Open your server container.
3. Open **Preview mode**. In the **Requests** tab:
   - Ensure your client claims the incoming request.
   - Ensure that your tags and variables successfully send outgoing HTTP
     requests.
   - To check whether a request was sent through a proxy server, click a HTTP
     request to view the HTTP Request Details.

**To verify your proxy setup:**

1. Check your network and proxy server logs. At a minimum you should see
   successful requests to the following endpoints:
   - `https://www.googletagmanager.com`
   - `https://tagmanager.google.com`
2. Check if there are requests to other endpoints. Depending on the server-side
   tagging features you use, you may also see requests made to other endpoints,
   such as `www.google-analytics.com`, `bigquery.googleapis.com`, or third-party
   endpoints. Allow-list any other endpoints that are needed for your tagging
   setup.

### Optional: Allow-List Outbound Traffic from Your Proxy Server

If you block outbound traffic from your network or from your proxy server, you
must allowlist Google Tag Manager domains for your tagging server instance to
work. How you allowlist outbound traffic depends on your network environment and
proxy software. Before you begin allowlisting endpoints, make sure that you
understand your network topology.

The following domains are used to fetch, preview, and debug your Google Tag
Manager container:

- `https://www.googletagmanager.com`
- `https://tagmanager.google.com`
- `${Preview server URL}`

If you host your Preview server on a different network than your proxy server or
have restrictive network rules, allowlist outbound traffic from the proxy to the
Preview server. The Preview server URL is defined when you deploy your server
container.

### Optional: Use BASIC Authentication with Your Proxy Server

If your organization requires authentication, you can use BASIC authentication
with all server types.

To use BASIC authentication, include the credentials (username/password) as part
of the proxy server URL in the following format:

```
HTTP_PROXY=http(s)://USER_NAME:PASSWORD@PROXY_URL
```

Each request to the proxy sets the username and password in the
`Proxy-Authorization` header as Base64 values.

> **Caution**: Follow your cloud provider's best practices when storing and
> providing the `HTTP_PROXY` environment variable with BASIC authentication to
> the tagging server.

If you use Cloud Run, store the proxy endpoint credentials in Secret Manager.
Secret Manager gives Cloud Run access to the secret at startup time and resolves
the value. Learn how to configure secrets in Cloud Run.

### Optional: Disable the Proxy for Specific Hosts

The `NO_PROXY` environment variable lets you define a comma delimited list of
hostnames that can't be sent through the proxy server.

**Example**: Given
`NO_PROXY=example.com,169.254.169.254,diagnostics.example2.com:3131`

The sGTM container doesn't proxy any of the following requests:

- `http://example.com`, `https://sub.example.com`,
  `https://other.example.com:123`
- `http://169.254.169.254`, `https://169.254.169.254`,
  `http://169.254.169.254:123`
- `http://diagonstics.example2.com:3131`,
  `https://diagonstics.example2.com:3131`

> **Tip**: If you integrate with Bigquery or Firestore and deploy your tagging
> server to Google Cloud, you may need to define an exception for Google's
> metadata server with `NO_PROXY=169.254.169.254,metadata.google.internal`


