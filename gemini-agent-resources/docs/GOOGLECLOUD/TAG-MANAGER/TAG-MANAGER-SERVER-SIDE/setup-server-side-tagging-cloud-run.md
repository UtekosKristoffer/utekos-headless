# Set Up Server-Side Tagging with Cloud Run

This guide explains how to:

-   Provision a preview server to enable the preview feature for the container
-   Provision a tagging server to handle live traffic
-   Increase or decrease the number of servers that are running your Google Tag Manager container
-   Keep your tagging server version updated after provisioning the server

---

## Prerequisites

You need:

-   A GCP account. If you don't have one, create a new GCP account
-   A GCP billing account. If you don't have one, create a GCP billing account (requires the Billing Account Creator role)
-   The Project Creator and the Billing Account User role. Learn more about adding roles

---

## Provision a Preview and Tagging Server

You can provision a Cloud Run service either automatically in Google Tag Manager or manually in Google Cloud.

**Options:**

-   [Automatic Provisioning](#)
-   [Manual Provisioning](#)

---

## Edit the Service Configuration

To change your service configuration:

1.  Open Cloud Run
2.  Select the service you need to adjust
3.  Click **Edit & Deploy New Revision**
4.  Make changes and click **Deploy**

---

## Cloud Run Cost

### Default Configuration Cost

In this Cloud Run configuration, each server costs approximately **$45/month (USD)**. Each server is a Cloud Run instance with:

-   1 vCPU
-   0.5GB memory
-   Using the CPU always allocated pricing model

### Recommendations

We recommend running a minimum of 2 instances to reduce the risk of data loss in case of a server outage. However, you may choose to run fewer (or more) servers. We expect that autoscaling 2-10 servers will handle 35-350 requests per second, though the performance will vary with the number of tags, and what those tags do.

Cloud Run will dynamically scale with load. The `max-instances` setting is the worst case scenario for how much you will need to pay for resources. Cloud Run won't provision that many instances unless necessary.

> **Tip:** To avoid unexpected costs, set up a billing alert.

### Cloud Run Cost Estimation

To estimate the monthly cost of running your tagging servers, use the Google Cloud Pricing Calculator. The calculator opens with a pre-configured estimate for a default server-side tagging deployment. You can adjust the settings to get a more accurate estimate based on your expected traffic.

---

## Optional: Migrating from App Engine

If you previously created an App Engine deployment and have verified that it is no longer receiving any traffic, disable the App Engine application to prevent unexpected billing charges.

---

## Optional: Multi-Region Deployment

If your website has a global presence or you would like to build redundancy into the service, deploy the tagging servers to multiple regions.

### Before You Start

1.  Create a load balancer
2.  Note your chosen `BACKEND_NAME`

### Add More Regions to Your Deployment

Replace the following variables:

-   `REGION` - The region where the preview server is deployed (may already be filled out if you followed the command line options)
-   `CONTAINER_CONFIG` - Container config string from Tag Manager (may already be filled out if you followed the command line options)
-   `NEW_REGION` - The new region where you would like the tagging server to be deployed
-   `BACKEND_NAME` - The name you chose while provisioning the load balancer

> **Optional:** To add another region, substitute the `NEW_REGION` variable and re-run the code snippet.

```bash
gcloud run deploy "server-side-tagging" \
  --region NEW_REGION \
  --image gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable \
  --platform managed \
  --ingress all \
  --min-instances 2 \
  --max-instances 10 \
  --timeout 60 \
  --allow-unauthenticated \
  --no-cpu-throttling \
  --update-env-vars PREVIEW_SERVER_URL="$(
    gcloud run services describe server-side-tagging-preview \
    --region "REGION" \
    --format="value(status.url)")",CONTAINER_CONFIG="CONTAINER_CONFIG" && \

gcloud compute network-endpoint-groups create server-side-tagging-neg \
  --region=NEW_REGION \
  --network-endpoint-type=SERVERLESS \
  --cloud-run-service="server-side-tagging" && \

gcloud compute backend-services add-backend --global "BACKEND_NAME" \
  --network-endpoint-group-region=NEW_REGION \
  --network-endpoint-group=server-side-tagging-neg
```

---

## Optional: Disable Logging

### Method 1: Request Logging

By default, information about every single request (e.g., request path, query parameters, etc.) is logged. If your tagging server handles a lot of requests per month (e.g., greater than 1 million), those log messages may incur significant logging charges. To reduce or eliminate the logging charges, we recommend disabling the request logging.

#### Steps to Disable Request Logging

1.  In Google Cloud platform, open the **Logs Router**
    -   Make sure you're in the project that matches your container ID
2.  For the **Type: Cloud Logging bucket, Name: \_Default** line, select the overflow menu, then click **Edit Sink**
3.  Under **Sink destination**, select logs bucket **\_Default**
4.  Under **Choose logs to include in sink**, add a new line. Enter the following rule to the existing inclusion filter:

```
NOT LOG_ID("run.googleapis.com/requests")
```

5.  To also disable logging from the load balancer, add a new line and enter the following rule to the existing inclusion filter:

```
NOT LOG_ID("requests")
```

> **Note:** This will disable all logging from the load balancer, including requests that are not sent to the server container.

6.  Click **Update Sink** to apply the changes. Now the requests will be excluded from logging
7.  Verify that no new requests are appearing in the Logs Explorer

---


### Method 2: Console Logging

The tagging server, clients, or tags in a container can log messages to console that may incur logging charges. To reduce or eliminate the logging charges, you can disable unwanted console log messages.

#### Identify Unwanted Console Logs

1.  In GCP, open the **Logs Explorer**
2.  Look for any unwanted log messages that originate from your tags

**Example:**

A tag might send the following logs:

```javascript
const logToConsole = require('logToConsole')

logToConsole('Custom message: ' + data.param1)
logToConsole('An important message to keep around!')
data.gtmOnSuccess()
```

Look for the corresponding log messages in the `textPayload` field.

#### Disable Console Log Messages

1.  In Google Cloud platform, open the **Logs Router**
    -   Make sure you're in the project that matches your container ID
2.  For the **Type: Cloud Logging bucket, Name: \_Default** line, select the overflow menu, then click **Edit Sink**
3.  Under **Sink destination**, select logs bucket **\_Default**
4.  Under **Choose logs to include in sink**, add a new line. Enter the following rule to the existing inclusion filter:

```
NOT textPayload:"Custom message:"
```

For your console logs, replace the `Custom message:` text with a substring from console log you wish to disable. For more elaborate filters, utilize the logging query language.

5.  Click **Update Sink** to apply the changes. The matching `logToConsole` message should be excluded from logging
6.  Verify that no new console log messages are appearing in the Logs Explorer

---


## 2. Map the Deployment to Your Custom Domain

Set up a custom domain to use a domain other than the default address that Cloud Run provides.

---

## 3. Add the Server URL to Google Tag Manager

Now that you have a server, you need to make sure that Google Tag Manager knows it should use your server.

### Steps

1.  Open Google Tag Manager
2.  Click on the server container you want to point to your tagging server
3.  Open your server container settings in the **Admin** tab > **Container Settings**
4.  Click **Add URL** and paste your server URL
5.  Save and go back to your workspace

---


## 4. Validation

Now that you've set up your tagging server, make sure that it works as intended.

1.  In your Tag Manager workspace, click the **Preview** button
2.  If the preview page loads, then everything is set up correctly

### Previewing Multiple URLs

If you have mapped multiple domains to a single tagging server, make sure each URL is added to the container settings.

> **Important:** If you provided multiple URLs, all paths (the string after the domain name) must match.

| Works                                                 | Does Not Work                                         |
| ----------------------------------------------------- | ----------------------------------------------------- |
| URL 1: `example.com/abc`<br>URL 2: `example2.com/abc` | URL 1: `example.com/abc`<br>URL 2: `example2.com/def` |

If multiple URLs are added, you will see an icon next to the Preview button that allows you to select the URL to preview.

---


## Update the Tagging Server Version

> **Note:** If you provisioned your tagging servers using the App Engine setup guide or Manual setup guide, please follow the instructions listed there.

### Why Update?

New tagging server updates contain security vulnerability fixes and new features. We recommend at least updating your tagging server for each major version release (e.g., upgrading from version 1.x.x to 2.x.x) when Tag Manager notifies you to update.

### Steps to Update

To update your tagging server, deploy a new revision using the same settings you used previously.

1.  Open Cloud Run
2.  Select the service you want to update
3.  Click **Edit & Deploy New Revision**
4.  Make sure the **Container image URL** is set to `gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable` and click **Deploy**

### Verify the Update

To verify that the update was successful:

1.  In your server container, click the **Preview** button to start a new debug session and send a request on a separate tab
2.  In the **Summary**, select the **Console** tab and make sure there are no messages asking you to update the tagging server

> **Note:** Tag Manager may show messages asking you to update your tagging server for up to a day after the server has been updated successfully. However, the preview page will show an up to date message about the tagging server version.
