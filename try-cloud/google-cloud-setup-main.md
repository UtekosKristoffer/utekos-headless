# Set up server-side tagging with Cloud Run

This guide explains how to:

- Provision a preview server to enable the preview feature for the container.
- Provision a tagging server to handle live traffic.
- Increase or decrease the number of servers that are running your Google Tag
  Manager container.
- Keep your tagging server version updated after provisioning the server.

## Prerequisites

You need:

- A GCP account. If you don't have one,
  [create a new GCP account](https://cloud.google.com/).
- A GCP billing account. If you don't have one,
  [create a GCP billing account](https://cloud.google.com/billing/docs/how-to/manage-billing-account)
  (requires the Billing Account Creator role).
- The Project Creator and the Billing Account User role.
  [Learn more about adding roles](https://cloud.google.com/iam/docs/granting-changing-revoking-access).

## Provision a preview and tagging server

You can provision a Cloud Run service either automatically in Google Tag Manager
or manually in Google Cloud.

**Options:**

- Automatic Provisioning
- Manual Provisioning

## Edit the service configuration

To change your service configuration:

1. Open [Cloud Run](https://console.cloud.google.com/run).
2. Select the service you need to adjust.
3. Click **Edit & Deploy New Revision**.
4. Make changes and click **Deploy**.

## Cloud Run cost

In this Cloud Run configuration, each server costs approximately **$45/month
(USD)**. Each server is a Cloud Run instance with:

- 1 vCPU
- 0.5GB memory
- CPU always allocated pricing model

We recommend running a minimum of **2 instances** to reduce the risk of data
loss in case of a server outage. However, you may choose to run fewer (or more)
servers. We expect that autoscaling 2-10 servers will handle 35-350 requests per
second, though the performance will vary with the number of tags, and what those
tags do.

Cloud Run will dynamically scale with load. The `max-instances` setting is the
worst case scenario for how much you will need to pay for resources. Cloud Run
won't provision that many instances unless necessary.

> **Tip:** To avoid unexpected costs,
> [set up a billing alert](https://cloud.google.com/billing/docs/how-to/budgets).

[Cloud Run calculator](https://cloud.google.com/products/calculator)

## Optional: Migrating from App Engine

If you previously created an App Engine deployment and have verified that it is
no longer receiving any traffic,
[disable the App Engine application](https://cloud.google.com/appengine/docs/standard/managing-projects-apps-billing#disable_or_delete_your_application)
to prevent unexpected billing charges.

## Optional: Multi-region deployment

If your website has a global presence or you would like to build redundancy into
the service, deploy the tagging servers to multiple regions.

### Before you start

1. [Create a load balancer](https://cloud.google.com/load-balancing/docs/https/setting-up-https-serverless)
2. Note your chosen `BACKEND_NAME`.

### Add more regions to your deployment

Replace the following variables:

- `REGION` - The region where the preview server is deployed. This may already
  be filled out if you followed the command line options to provision the
  preview and tagging server.
- `CONTAINER_CONFIG` - Container config string from Tag Manager. This may
  already be filled out if you followed the command line options to provision
  the preview and tagging server.
- `NEW_REGION` - The new region where you would like the tagging server to be
  deployed.
- `BACKEND_NAME` - The name you chose while provisioning the load balancer.

> **Optional:** To add another region, substitute `NEW_REGION` variable and
> re-run the code snippet.

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

## Optional: Disable logging

### Request logging

By default, information about every single request (e.g. request path, query
parameters, etc) is logged. If your tagging server handles a lot of requests per
month (e.g. greater than 1 million), those log messages may incur significant
logging charges. To reduce or eliminate the logging charges, we recommend
disabling the request logging.

#### To disable request logging

1. In Google Cloud platform, open the
   [Logs Router](https://console.cloud.google.com/logs/router). Make sure you're
   in the project that matches your container ID:
   ![Screenshot of GCP project selector, showing a sample Tag Manager container ID](screenshot-placeholder.png)

2. For the **Type: Cloud Logging bucket, Name: \_Default** line, select the
   overflow menu, then click **Edit Sink**.

3. Under **Sink destination**, select logs bucket **\_Default**.

4. Under **Choose logs to include in sink**, add a new line. Enter the following
   rule to the existing inclusion filter:

   ```
   NOT LOG_ID("run.googleapis.com/requests")
   ```

5. To also disable logging from the load balancer, add a new line and enter the
   following rule to the existing inclusion filter:

   ```
   NOT LOG_ID("requests")
   ```

   > **Note:** This will disable all logging from the load balancer, including
   > requests that are not sent to the server container.

6. **Update Sink** to apply the changes. Now the requests will be excluded from
   logging.

7. Verify that no new requests are appearing in the
   [Logs Explorer](https://console.cloud.google.com/logs/query) logs.

### Console logging

(Content for console logging section would go here if provided)

## 2. Map the deployment to your custom domain

[Set up a custom domain](https://cloud.google.com/run/docs/mapping-custom-domains)
to use a domain other than the default address that Cloud Run provides.

## 3. Add the server URL to Google Tag Manager

Now that you have a server, you need to make sure that Google Tag Manager knows
it should use your server.

1. Open [Google Tag Manager](https://tagmanager.google.com/).
2. Click on the server container you want to point to your tagging server.
3. Open your server container settings in the **Admin** tab > **Container
   Settings**.
4. Click **Add URL** and paste your server URL.
5. **Save** and go back to your workspace.

## 4. Validation

Now that you've set up your tagging server, make sure that it works as intended.
In your Tag Manager workspace, click the **Preview** button. If the preview page
loads, then everything is set up correctly.

### Previewing multiple URLs

If you have mapped multiple domains to a single tagging server, make sure each
URL is added to the container settings.

If you provided multiple URLs, all paths (the string after the domain name) must
match.

| Works                                                 | Does not work                                         |
| ----------------------------------------------------- | ----------------------------------------------------- |
| URL 1: `example.com/abc`<br>URL 2: `example2.com/abc` | URL 1: `example.com/abc`<br>URL 2: `example2.com/def` |

If multiple URLs are added, you will see an icon next to the **Preview** button
that allows you to select the URL to preview.

## Update the tagging server version

> **Note:** If you provisioned your tagging servers using the App Engine setup
> guide or Manual setup guide, please follow the instructions listed there.

New tagging server updates contain security vulnerability fixes and new
features. We recommend at least updating your tagging server for each major
version release (e.g. upgrading from version 1.x.x to 2.x.x) when Tag Manager
notifies you to update.

### To update your tagging server

Deploy a new revision using the same settings you used previously:

1. Open [Cloud Run](https://console.cloud.google.com/run).
2. Select the service you want to update.
3. Click **Edit & Deploy New Revision**.
4. Make sure the **Container image URL** is set to
   `gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable` and click **Deploy**.

### To verify that the update was successful

1. In your server container, click the **Preview** button to start a new debug
   session and send a request on a separate tab.
2. In the **Summary**, select the **Console** tab and make sure there are no
   messages asking you to update the tagging server.

> **Note:** Tag Manager may show messages asking you to update your tagging
> server for up to a day after the server has been updated successfully.
> However, the preview page will show an up-to-date message about the tagging
> server version.
