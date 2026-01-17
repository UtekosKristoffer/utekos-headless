# Enable Region-Specific Behavior for Tags

This article is for developers who serve Google scripts from their own server. We recommend enabling region-specific behavior for tags to unlock features such as advanced consent mode, and to control tag behavior based on where your users are.

If you serve a script from a first-party domain, you should provide the user's geolocation information in the request header to be able to use the `event_location.country` and `event_location.region` parameters. If available in the request header, IP address takes precedence in determining geolocation. Otherwise, the `event_location.country` and `event_location.region` parameters are used to send country and region information respectively.

> **Note**: If `gtm.js` or `gtag.js` is served from `www.googletagmanger.com`, the user's IP address and geolocation information are included in the script request, but only the geolocation information is used. If the IP address is redacted within the server container, it will remain redacted but the region and country information will be used for modeling. To remove them, you can use the transformation feature.

## Before you begin

This guide assumes that you have done the following:

*   Set up a server container in Tag Manager
*   Set up a tagging server
*   Set up first-party script serving

## Step 1: Set up the request header

You need to send specific request headers that contain the user's region information, as described in the sections below.

You can directly start at Step 2 if:

*   You use App Engine. App Engine sends geo headers automatically.
*   You use a different infrastructure provider than the ones listed below. You need to set up custom headers.

### Provider: Cloud Run With GCP Load Balancer

You can send geolocation information either with all HTTP request headers, or for specific requests. Since adding custom request headers will incur a fee on a per 1 million request basis, we recommend to only include geo information for requests to serve Google scripts. This option initially requires more setup but helps you run your infrastructure as economically as possible.

#### Method: Script request

To include the geo headers for only script requests, you need to set up a new backend and create routing rules.

To create a new backend:

1.  Open **GCP load balancer**
2.  In your load balancer, open the **Backend configuration** section. Create a new backend service.

Configure your new backend service:

*   **Backend type**: choose the network endpoint group type that your application uses. If you use Cloud Run, choose **Serverless network endpoint group**.
*   In **New backend**, pick the network endpoint group of your server-side Tag Manager deployment.

Open the section **Advanced configurations**. Add the custom request headers.

| Header Name      | Header Value                  |
| :--------------- | :---------------------------- |
| `X-Gclb-Country` | `{client_region}`             |
| `X-Gclb-Region`  | `{client_region_subdivision}` |

Save the new backend service.

To configure routing rules:

1.  In your load balancer, open the **Routing rules** section. Choose the mode **Advanced host path and rule**.
2.  Update the `pathRules` parameter to map `gtm.js`, `/gtag/js`, and `/gtag/destination` to the new backend service

```
pathRules:
- paths:
  - /gtm.js
  - /gtag*
  service: projects/project_id/global/backendServices/new backend service
- paths:
  - /*
  service: projects/project_id/global/backendServices/original backend service
```

Save your changes.

#### Method: All request

To send geolocation information with all HTTP requests, you need to add custom request headers to the existing backend service, see [Google Cloud documentation](https://cloud.google.com/load-balancing/docs/backend-service#custom-headers). Create one new custom request headers for each header below:

| Header name      | Header Value                  |
| :--------------- | :---------------------------- |
| `X-Gclb-Country` | `{client_region}`             |
| `X-Gclb-Region`  | `{client_region_subdivision}` |

### Provider: GCP Load Balancer

You can send geolocation information either with all HTTP request headers, or for specific requests. Since adding custom request headers will incur a fee on a per 1 million request basis, we recommend to only include geo information for requests to serve Google scripts. This option initially requires more setup but helps you run your infrastructure as economically as possible.

#### Method: Script request

To include the geo headers for only script requests, you need to set up a new backend and create routing rules.

To create a new backend:

1.  Open **GCP load balancer**
2.  In your load balancer, open the **Backend configuration** section. Create a new backend service.

Configure your new backend service:

*   **Backend type**: choose the network endpoint group type that your application uses. If you use Cloud Run, choose **Serverless network endpoint group**.
*   In **New backend**, pick the network endpoint group of your server-side Tag Manager deployment.

Open the section **Advanced configurations**. Add the custom request headers.

| Header Name      | Header Value                  |
| :--------------- | :---------------------------- |
| `X-Gclb-Country` | `{client_region}`             |
| `X-Gclb-Region`  | `{client_region_subdivision}` |

Save the new backend service.

To configure routing rules:

1.  In your load balancer, open the **Routing rules** section. Choose the mode **Advanced host path and rule**.
2.  Update the `pathRules` parameter to map `gtm.js`, `/gtag/js`, and `/gtag/destination` to the new backend service.

```
pathRules:
- paths:
  - /gtm.js
  - /gtag*
  service: projects/project_id/global/backendServices/new backend service
- paths:
  - /*
  service: projects/project_id/global/backendServices/original backend service
```

Save your changes.

## Step 2: Set up the Visitor Region variable

If you have set up geo headers as specified above, Tag Manager automatically detects the region or country by reading the HTTP request header. Alternatively, you can set up custom headers.

### Method 1: Automatic detection

1.  Open **Google Tag Manager**
2.  Open your server container.
3.  In the **Variables** menu, **Configure** the list of built-in variables.
4.  Select **Visitor Region**.
5.  The geo headers will now be available to use in the **Visitor Region** variable.

### Method 2: Custom headers

1.  Open **Google Tag Manager**
2.  Open your server container.
3.  In the **Variables** menu, create a **New** user-defined variable of the type **Visitor Region**.
4.  In the **Variable Configuration**, choose **Custom Variable**.
5.  In the **Variables** menu, create two new **Request header** variables: One for your country and one for subdivision code. Fill the values with the country codes in your HTTP request header(s).

> **Note**: The format has to adhere to ISO-3166-2.

Use the your created variables in the **Visitor Region** variable as shown in the screenshot.

Name your variable and **Save** it.

## Step 3: Enable region-specific settings in your client

In order to use the visitor region for processing incoming HTTP requests, you have to add it to your client.

1.  Select the **Google Tag Manager: Web container** client.
2.  Check **Enable region-specific settings**. Add the `{{Visitor Region}}` variable that you created in the previous step to the **Region** field.
3.  **Save** your client.

## Step 4: Verify that region settings apply

To test if your settings work:

1.  Open **Preview mode** for your server container.
2.  Load your website while using first-party serving.
3.  In the preview window, click on the **Claimed Google Analytics GA4** client.
4.  To see the actual region, change the **Display Variables** radio button to **values**.

✅ Your implementation is correct if the **Region** property displays a country code.

❌ If the **Region** property displays `undefined` or is missing, your server isn't receiving any region data. Check if the server's HTTP headers are set up according to the predefined variables Google Tag Manager is looking for, see [Set up the request header](#step-1-set-up-the-request-header).

## Next steps

Set up consent mode for a specific region in a web container
