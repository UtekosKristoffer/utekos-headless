# Set up a Classic Application Load Balancer with Serverless Backends

This document explains how to create an external Application Load Balancer to route requests to serverless backends, including:

- App Engine
- Cloud Functions
- Cloud Run

Serverless Network Endpoint Groups (NEGs) enable the use of Google Cloud serverless applications with external Application Load Balancers. When you configure a load balancer with a serverless NEG backend, incoming requests are routed to your serverless application.

To learn more about serverless NEGs, refer to the [Serverless NEGs overview](https://cloud.google.com/load-balancing/docs/negs/serverless-negs).

## Before You Begin

- Deploy an App Engine, Cloud Functions, or Cloud Run service.
- If you have not already done so, install the Google Cloud CLI.
- Configure the necessary permissions.
- Add an SSL certificate resource.

### Deploy a Serverless Service

The instructions on this page assume that you already have a running Cloud Run, Cloud Functions, or App Engine service.

For the example on this page, we have used the [Cloud Run Python quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/python) to deploy a Cloud Run service in the `us-central1` region. The remainder of this page will show you how to set up an external Application Load Balancer that uses a serverless NEG backend to route requests to this service.

If you have not yet deployed a serverless application, or if you would like to test a serverless NEG with a sample application, you can use one of the following quickstarts. You can create your serverless application in any region, but you must use the same region later to create the serverless NEG and the load balancer.

#### Cloud Run

To create a "Hello World" application, package it into a container image, and deploy it to Cloud Run, see [Quickstart: Build and Deploy](https://cloud.google.com/run/docs/quickstarts/build-and-deploy).

If you already have a sample container uploaded to Container Registry, see [Quickstart: Deploy a Prebuilt Sample Container](https://cloud.google.com/run/docs/quickstarts/deploy-container).

#### Cloud Functions

See [Cloud Functions: Python Quickstart](https://cloud.google.com/functions/docs/quickstart/python).

#### App Engine

Refer to the following App Engine quickstart guides for Python 3:

- [Standard Environment](https://cloud.google.com/appengine/docs/standard/python3/quickstart)
- [Flexible Environment](https://cloud.google.com/appengine/docs/flexible/python/quickstart)

### Install the Google Cloud CLI

Install the Google Cloud CLI. For conceptual and installation information, see the [gcloud Overview](https://cloud.google.com/sdk/gcloud).

If you have not run the gcloud CLI before, run `gcloud init` to initialize your `gcloud` directory.

### Configure Permissions

To follow this guide, you will need to create a serverless NEG and an external HTTP(S) load balancer in a project. You should be either a project owner or editor, or you should have the following Compute Engine IAM roles:

| Task                                           | Required Role          |
| ---------------------------------------------- | ---------------------- |
| Create load balancer and networking components | Network Admin          |
| Create and modify NEGs                         | Compute Instance Admin |
| Create and modify SSL certificates             | Security Admin         |

### Optional: Use BYOIP Addresses

With Bring Your Own IP (BYOIP), you can import your own public IP addresses to Google Cloud and use them with your Google Cloud resources. For example, if you import your own IPv4 addresses, you can assign one to the forwarding rule when you configure your load balancer. When following the instructions in this document, provide the BYOIP address as the IP address.

For more information on using BYOIP, see [Bring your own IP addresses](https://cloud.google.com/vpc/docs/using-bring-your-own-ip).

## Reserve an External IP Address

Now that your services are operational, set up a global static external IP address that your customers will use to reach your load balancer.

> **Note:** This step is required for this example and is generally recommended, as a static external IP address provides a single, stable address for your serverless application. Reserving an IP address is also essential if you are using a custom domain for your serverless application (which is also required for Google-managed SSL certificates). With a custom domain, you will need to update your DNS records to point your domain to this IP address.

### Using the Console or gcloud

1. In the Google Cloud console, go to the **External IP addresses** page.
   - [Go to External IP addresses](https://console.cloud.google.com/networking/addresses/list)
2. Click **Reserve external static IP address**.
3. For **Name**, enter `example-ip`.
4. For **Network service tier**, select **Premium**.
5. For **IP version**, select **IPv4**.
6. For **Type**, select **Global**.
7. Click **Reserve**.

## Create an SSL Certificate Resource

To create an HTTPS load balancer, you must add an SSL certificate resource to the load balancer's frontend. You can create an SSL certificate resource using either a Google-managed SSL certificate or a self-managed SSL certificate.

**Google-managed certificates** are recommended because Google Cloud obtains, manages, and renews them automatically. To create a Google-managed certificate, you must have a domain and the DNS records for that domain must be configured to allow for certificate provisioning.

Additionally, you need to update the domain's DNS A record to point to the load balancer's IP address created in the previous step. If you have multiple domains in a Google-managed certificate, you must update the DNS records for all domains and subdomains to point to your load balancer's IP address. For detailed instructions, see [Using Google-managed certificates](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs).

**Self-signed certificates.** If you do not wish to set up a domain at this time, you can use a self-signed SSL certificate for testing purposes.

> **Warning:** Do not use a self-signed certificate in a production environment.

This example assumes that you have already created an SSL certificate resource.

If you want to test this process without creating an SSL certificate resource (or a domain, as required by Google-managed certificates), you can still follow the instructions on this page to set up an HTTP load balancer instead.

## Create the Load Balancer

In the diagram below, the load balancer uses a serverless NEG backend to direct requests to a serverless Cloud Run service. For this example, we have used the [Cloud Run Python quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/python) to deploy a Cloud Run service.

![External Application Load Balancer architecture for a Cloud Run application](image-placeholder "External Application Load Balancer with a Cloud Run Backend")

_External Application Load Balancer architecture for a Cloud Run application (click to enlarge)._

Because health checks are not supported for backend services with serverless NEG backends, you do not need to create a firewall rule to allow health checks if the load balancer has only serverless NEG backends.

### Using the Console or gcloud

#### Select the Load Balancer Type

1. In the Google Cloud console, go to the **Load balancing** page.
   - [Go to Load balancing](https://console.cloud.google.com/net-services/loadbalancing/list)
2. Click **Create load balancer**.
3. For **Type of load balancer**, select **Application Load Balancer (HTTP/HTTPS)** and click **Next**.
4. For **Public facing or internal**, select **Public facing (external)** and click **Next**.
5. For **Global or single region deployment**, select **Best for global workloads** and click **Next**.
6. For **Load balancer generation**, select **Classic Application Load Balancer** and click **Next**.
7. Click **Configure**.

#### Basic Configuration

1. For the name of the load balancer, enter `serverless-lb`.
2. Keep the window open to continue.

#### Frontend Configuration

1. Click **Frontend configuration**.
2. For **Name**, enter a name.

> To create an HTTPS load balancer, you must have an SSL certificate (`gcloud compute ssl-certificates list`). We recommend using a Google-managed certificate as described previously.

**To configure an external Application Load Balancer**, fill in the fields as follows.

Verify that the following options are configured with these values:

| Property                                | Value (type a value or select an option as specified)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Protocol                                | HTTPS                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Network Service Tier                    | Premium                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| IP version                              | IPv4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| IP address                              | example-ip                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Port                                    | 443                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Certificate                             | Select an existing SSL certificate or create a new certificate.<br><br>To create an HTTPS load balancer, you must have an SSL certificate resource to use in the HTTPS proxy. You can create an SSL certificate resource using either a Google-managed SSL certificate or a self-managed SSL certificate.<br><br>To create a Google-managed certificate, you must have a domain. The domain's A record must resolve to the load balancer IP address that you created earlier in this procedure. Using Google-managed certificates is recommended because Google Cloud obtains, manages, and renews these certificates automatically. If you do not have a domain, you can use a self-signed SSL certificate for testing. |
| Optional: Enable HTTP to HTTPS Redirect | Use this checkbox to enable HTTP to HTTPS redirects.<br><br>Enabling this checkbox creates an additional partial HTTP load balancer that uses the same IP address as your HTTPS load balancer and redirects HTTP requests to your load balancer's HTTPS frontend.<br><br>This checkbox can only be selected when the HTTPS protocol is selected and a reserved IP address is used.                                                                                                                                                                                                                                                                                                                                       |

If you want to test this process without setting up an SSL certificate resource (or a domain, as required by Google-managed certificates), you can set up an HTTP load balancer.

**To create an HTTP load balancer**, verify that the following options are configured with these values:

| Property             | Value (type a value or select an option as specified) |
| -------------------- | ----------------------------------------------------- |
| Protocol             | HTTP                                                  |
| Network Service Tier | Premium                                               |
| IP version           | IPv4                                                  |
| IP address           | example-ip                                            |
| Port                 | 80                                                    |

3. Click **Done**.

#### Backend Configuration

1. Click **Backend configuration**.
2. In the **Backend services & backend buckets** list, click **Create a backend service**.
3. For **Name**, enter a name.
4. In **Backend type**, select **Serverless network endpoint group**.
5. Leave **Protocol** unchanged. This parameter is ignored.
6. In the **Backends** section, for **New backend**, select **Create Serverless network endpoint group**.
7. For **Name**, enter a name.
8. In **Region**, select `us-central1`, and then select **Cloud Run**.
9. Select **Select service name**.
10. In the **Service** list, select the Cloud Run service that you want to create a load balancer for.
11. Click **Create**.
12. In the **New backend** section, click **Done**.
13. Click **Create**.

#### Routing Rules

Routing rules determine how your traffic is directed. To configure routing, you will set up host rules and path matchers, which are configuration components of an external Application Load Balancer's URL map.

1. Click **Host and path rules**.
2. Retain the default hosts and paths. For this example, all requests go to the backend service created in the previous step.

#### Reviewing the Configuration

1. Click **Review and finalize**.
2. Review all the settings.
3. Optional: Click **Equivalent Code** to view the REST API request that will be used to create the load balancer.
4. Click **Create**.
5. Wait for the load balancer to be created.
6. Click the name of the load balancer (`serverless-lb`).
7. Note the IP address of the load balancer for the next task. It's referred to as `IP_ADDRESS`.

> When you use the Google Cloud console to create an HTTP(S) load balancer with a serverless NEG backend, logging is enabled by default. You can use the `gcloud compute backend-services update` command to disable logging if needed.

## Connect Your Domain to Your Load Balancer

After the load balancer is created, note the IP address associated with it—for example, `30.90.80.100`. To point your domain to your load balancer, create an A record using your domain registration service. If you added multiple domains to your SSL certificate, you must add an A record for each one, with all of them pointing to the load balancer's IP address. For example, to create A records for `www.example.com` and `example.com`, use the following:

```
NAME                  TYPE     DATA
www                   A        30.90.80.100
@                     A        30.90.80.100
```

If you use Cloud DNS as your DNS provider, see [Add, modify, and delete records](https://cloud.google.com/dns/docs/records).

## Test the Load Balancer

Now that you have configured your load balancer, you can start sending traffic to its IP address. If you configured a domain, you can also send traffic to the domain name. However, DNS propagation can take some time to complete, so it is best to start by using the IP address for testing.

1. In the Google Cloud console, go to the **Load balancing** page.
   - [Go to Load balancing](https://console.cloud.google.com/net-services/loadbalancing/list)
2. Click on the load balancer you just created.
3. Note the **IP Address** of the load balancer.
4. For an HTTP load balancer, you can test it using a web browser by going to `http://IP_ADDRESS`. Replace `IP_ADDRESS` with the load balancer's IP address. You should be directed to the `helloworld` service homepage.
5. For an HTTPS load balancer, you can test it using a web browser by going to `https://IP_ADDRESS`. Replace `IP_ADDRESS` with the load balancer's IP address. You should be directed to the `helloworld` service homepage.
   - If this does not work and you are using a Google-managed certificate, confirm that your certificate resource's status is ACTIVE. For more information, see [Google-managed SSL certificate resource status](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#resource-status).
   - If you used a self-signed certificate for testing, your browser will display a warning. You must explicitly instruct your browser to accept the self-signed certificate. Click through the warning to see the actual page.

## Restrict Ingress on the Default Endpoint

Without the proper ingress settings, users can use your serverless application's default URL to bypass the load balancer, Cloud Armor security policies, SSL certificates, and private keys that are passed through the load balancer.

Ensure that external traffic only reaches your serverless application from the load balancer by setting ingress to "Internal and Cloud Load Balancing".

- [Set network ingress to "Internal and Cloud Load Balancing" for App Engine](https://cloud.google.com/appengine/docs/standard/python3/application-security)
- [Set network ingress to "Internal and Cloud Load Balancing" for Cloud Functions](https://cloud.google.com/functions/docs/networking/ingress-settings)
- [Set network ingress to "Internal and Cloud Load Balancing" for Cloud Run](https://cloud.google.com/run/docs/securing/ingress)

Additionally, you can disable the default URL for Cloud Run.

## Additional Configuration Options

This section expands on the configuration example to provide alternative and additional configuration options. All of these tasks are optional, and you can perform them in any order.

### Set Up Multi-Region Load Balancing

> **Note:** For serverless NEGs, multi-region load balancing is supported only if the serverless NEG points to a Cloud Run or a Cloud Functions service. Multi-region load balancing with outlier detection is not supported with App Engine because you cannot deploy a project's App Engine in multiple regions.

In the example described earlier on this page, we have only one Cloud Run service serving as a backend in the `us-central1` region. Because the serverless NEG can point to only one endpoint at a time, load balancing is not performed across multiple regions. The external Application Load Balancer serves only as the frontend and proxies traffic to the specified `helloworld` app endpoint. However, you may want to serve your Cloud Run app from more than one region to improve end-user latency.

If a backend service has several serverless NEGs attached to it, the load balancer distributes traffic by forwarding requests to the serverless NEG in the closest available region. However, backend services can only contain one serverless NEG per region. To make your Cloud Run service available from multiple regions, you need to set up cross-region routing. You should be able to use a single URL scheme that works anywhere in the world, yet serves user requests from the region closest to the user.

To set up multi-region serving, you will need to use the Premium network tier to ensure that all regional Cloud Run deployments are compatible and ready to serve traffic from any region.

**To set up a multi-region load balancer:**

1. Set up two Cloud Run services in different regions. For example, deploy one Cloud Run service in a US region and another in a European region.
2. Create an external Application Load Balancer with the following setup:
   - A global backend service with two serverless NEGs:
     - The first NEG in the same region as the Cloud Run service deployed in the US.
     - The second NEG in the same region as the Cloud Run service deployed in Europe.
   - A frontend configuration with the Premium Network Service Tier.

The resulting setup is shown in the following diagram.

![Multi-region routing for serverless applications](image-placeholder "Multi-Region Routing")

_Multi-region routing for serverless applications_

This section builds on the load-balancer setup described earlier, where you created one serverless NEG in the `us-central1` region pointing to a Cloud Run service in the same region. It also assumes that you have created a second Cloud Run service in the `europe-west1` region. The second serverless NEG you create will point to this Cloud Run service in `europe-west1`.

In this example, you will complete the following steps:

1. Create a second serverless NEG in the `europe-west1` region.
2. Attach the second serverless NEG to the backend service.

To add a second serverless NEG to an existing backend service, follow these steps.

#### Using the Console or gcloud

1. In the Google Cloud console, go to the **Load balancing** page.
   - [Go to Load balancing](https://console.cloud.google.com/net-services/loadbalancing/list)
2. Click the name of the load balancer whose backend service you want to edit.
3. On the **Load balancer details** page, click **Edit**.
4. On the **Edit global external Application Load Balancer** page, click **Backend configuration**.
5. On the **Backend configuration** page, click **Edit** for the backend service you want to modify.
6. In the **Backends** section, click **Add a backend**.
7. In the **Serverless network endpoint groups** list, select **Create Serverless network endpoint group**.
8. Enter a name for the serverless NEG.
9. For **Region**, select `europe-west1`.
10. For **Serverless network endpoint group type**, select **Cloud Run**, and then do the following:
    - Select the **Select Service** option.
    - In the **Service** list, select the Cloud Run service you want to create a load balancer for.
11. Click **Create**.
12. On the **New backend** page, click **Done**.
13. Click **Save**.
14. To update the backend service, click **Update**.
15. To update the load balancer, on the **Edit global external Application Load Balancer** page, click **Update**.

### Use an Authenticated Pub/Sub Push Subscription with a Multi-Region Cloud Run Deployment

For authenticated push requests, Cloud Run expects a region-specific audience field by default. In the case of a multi-region Cloud Run deployment, if a push request is routed to a Cloud Run service in a different region, JWT token verification fails due to an audience mismatch.

To work around this region-specific restriction:

1. Configure a custom audience that is the same for service deployments in different regions.
2. Configure your Pub/Sub push messages to use this custom audience as the audience in the JWT token.

### Set Up Regional Routing

A common reason for serving applications from multiple regions is to meet data locality requirements. For example, you might want to ensure that requests from European users are always served from a region located in Europe. To set this up, you need a URL schema with separate URLs for EU and non-EU users, and you must direct your EU users to the EU URLs.

In such a scenario, you would use the URL map to route requests from specific URLs to their corresponding regions. With this setup, requests intended for one region are never delivered to another, providing isolation between regions. On the other hand, if a region fails, requests are not routed to a different region, so this setup does not increase your service's availability.

To set up regional routing, you will need to use the Premium network tier so that you can combine different regions in a single forwarding rule.

**To set up a load balancer with regional routing:**

1. Set up two Cloud Run services in different regions. For example, deploy `hello-world-eu` to a region in Europe and `hello-world-us` to a region in the US.
2. Create an external Application Load Balancer with the following configuration:
   - A backend service with a serverless NEG in Europe. The serverless NEG must be created in the same region as the Cloud Run service deployed in Europe.
   - A second backend service with another serverless NEG in the US. This serverless NEG must be created in the same region as the Cloud Run service deployed in the US.
   - A URL map with the appropriate host and path rules so that one set of URLs routes to the European backend service, while all other requests route to the US backend service.
   - A frontend configuration with the Premium network tier.

The rest of the setup can be the same as described previously. Your resulting setup should look like this:

![Regional routing for serverless applications without failover](image-placeholder "Regional Routing without Failover")

_Regional routing for serverless applications without failover_

### Use a URL Mask

When creating a serverless NEG, instead of selecting a specific Cloud Run service, you can use a URL mask to point to multiple services serving at the same domain. A URL mask is a template of your URL schema. The serverless NEG will use this template to extract the service name from the incoming request's URL and map the request to the appropriate service.

URL masks are particularly useful if your service is mapped to a custom domain rather than the default address provided by Google Cloud. A URL mask allows you to target multiple services and versions with a single rule, even when your application uses a custom URL pattern.

If you have not already done so, be sure to read [Serverless NEGs overview: URL Masks](https://cloud.google.com/load-balancing/docs/negs/serverless-negs#url_masks).

#### Construct a URL Mask

To construct a URL mask for your load balancer, start with the URL of your service. For this example, we will use a sample serverless app running at `https://example.com/login`. This is the URL where the app's login service will be served.

1. Remove `http://` or `https://` from the URL, which leaves you with `example.com/login`.
2. Replace the service name with a placeholder for the URL mask.
   - **Cloud Run**: Replace the Cloud Run service name with the placeholder `<service>`. If the Cloud Run service has a tag associated with it, replace the tag name with the placeholder `<tag>`. In this example, the URL mask becomes `example.com/<service>`.
   - **Cloud Functions**: Replace the function name with the placeholder `<function>`. In this example, the URL mask becomes `example.com/<function>`.
   - **App Engine**: Replace the service name with the placeholder `<service>`. If the service has a version associated with it, replace the version with `<version>`. In this example, the URL mask becomes `example.com/<service>`.
   - **API Gateway**: Replace the gateway name with the placeholder `<gateway>`. In this example, the URL mask becomes `example.com/<gateway>`.
3. **(Optional)** If the service name (or function, version, or tag) can be extracted from the path portion of the URL, the domain can be omitted. The path part of the URL mask is distinguished by the first `/` character. If a `/` is not present in the URL mask, it is understood to represent the host only. Therefore, for this example, the URL mask can be reduced to `/<service>`, `/<gateway>`, or `/<function>`.

Similarly, if the service name can be extracted from the host part of the URL, you can omit the path altogether.

You can also omit any host or subdomain components that come before the first placeholder, as well as any path components that come after the last placeholder. In such cases, the placeholder captures the required information for that component.

Here are a few more examples that demonstrate these rules:

##### Cloud Run | Cloud Functions | App Engine | API Gateway

This table assumes you have a custom domain named `example.com` and all your Cloud Run services are mapped to this domain using an external Application Load Balancer.

| Service, Tag name         | Custom domain URL                         | URL mask                                                      |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| service: login            | `https://login-home.example.com/web`      | `<service>-home.example.com`                                  |
| service: login            | `https://example.com/login/web`           | `example.com/<service>` or `/<service>`                       |
| service: login, tag: test | `https://test.login.example.com/web`      | `<tag>.<service>.example.com`                                 |
| service: login, tag: test | `https://example.com/home/login/test`     | `example.com/home/<service>/<tag>` or `/home/<service>/<tag>` |
| service: login, tag: test | `https://test.example.com/home/login/web` | `<tag>.example.com/home/<service>`                            |

#### Create a Serverless NEG with a URL Mask

##### Using the Console or gcloud

For a new load balancer, you can follow the same end-to-end process as described earlier in this topic. When configuring the backend service, instead of selecting a specific service, enter a URL mask.

If you have an existing load balancer, you can edit the backend configuration and have the serverless NEG point to a URL mask instead of a specific service.

**To add a URL mask-based serverless NEG to an existing backend service:**

1. Go to the **Load balancing** page in the Google Cloud console.
   - [Go to the Load balancing page](https://console.cloud.google.com/net-services/loadbalancing/list)
2. Click the name of the load balancer whose backend service you want to edit.
3. On the **Load balancer details** page, click **Edit**.
4. On the **Edit global external Application Load Balancer** page, click **Backend configuration**.
5. On the **Backend configuration** page, click **Edit** for the backend service you want to modify.
6. Click **Add backend**.
7. Select **Create Serverless network endpoint group**.
8. For the **Name**, enter `helloworld-serverless-neg`.
9. Under **Region**, select `us-central1`.
10. Under **Serverless network endpoint group type**, select the platform where your serverless apps (or services or functions) were created.
11. Select **Use URL Mask**.
12. Enter a URL mask. For instructions on how to create a URL mask, see [Constructing a URL mask](#construct-a-url-mask).
13. Click **Create**.
14. In the **New backend** section, click **Done**.
15. Click **Update**.

To learn how the load balancer handles issues with URL mask mismatches, see [Troubleshooting issues with serverless NEGs](https://cloud.google.com/load-balancing/docs/negs/serverless-negs-troubleshooting).

### Move Your Custom Domain to Be Served by the External Application Load Balancer

If your serverless compute apps are mapped to custom domains, you may want to update your DNS records so that traffic sent to the existing Cloud Run, Cloud Functions, API Gateway, or App Engine custom domain URLs is routed through the load balancer instead.

For example, if you have a custom domain called `example.com` and all your Cloud Run services are mapped to this domain, you should update the DNS record for `example.com` to point to the load balancer's IP address.

Before updating your DNS records, you can test your configuration locally by forcing local DNS resolution of the custom domain to the load balancer's IP address. To do this, either modify the `/etc/hosts` file on your local machine to point `example.com` to the load balancer's IP address, or use the `curl --resolve` flag to force curl to use the load balancer's IP address for the request.

When the DNS record for `example.com` resolves to the HTTP(S) load balancer's IP address, requests sent to `example.com` will begin to be routed through the load balancer. The load balancer will then dispatch them to the relevant backend service according to its URL map. Additionally, if the backend service is configured with a URL mask, the serverless NEG will use the mask to route the request to the appropriate Cloud Run, Cloud Functions, API Gateway, or App Engine service.

> **Note:** If you use Google-managed certificates, migrating an existing service to an external Application Load Balancer may incur some downtime, typically less than an hour. This is because the SSL certificate for your external Application Load Balancer will not be provisioned until you update your DNS records to point to the load balancer's IP address.

### Enable Cloud CDN

Enabling Cloud CDN for your Cloud Run service allows you to optimize content delivery by caching content closer to your users.

You can enable Cloud CDN on backend services used by global external Application Load Balancers by using the `gcloud compute backend-services update` command.

```bash
gcloud compute backend-services update helloworld-backend-service \
    --enable-cdn \
    --global
```

Cloud CDN is supported for backend services with Cloud Run, Cloud Functions, API Gateway, and App Engine backends.

### Enable IAP on the External Application Load Balancer

> **Note:** IAP is not compatible with Cloud CDN.

You can configure IAP to be enabled or disabled (default). If you enable it, you must provide values for `oauth2-client-id` and `oauth2-client-secret`.

To enable IAP, update the backend service to include the `--iap=enabled` flag with the `oauth2-client-id` and `oauth2-client-secret`.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --iap=enabled,oauth2-client-id=ID,oauth2-client-secret=SECRET \
    --global
```

Optionally, you can enable IAP for a Compute Engine resource by using the Google Cloud console, the gcloud CLI, or the API.

### Enable Google Cloud Armor

Cloud Armor is a security product that provides protection against distributed denial-of-service (DDoS) attacks for all GCLB proxy load balancers. Cloud Armor also provides configurable security policies for services accessed through an external Application Load Balancer. To learn about Cloud Armor security policies for external Application Load Balancers, see the [Cloud Armor security policy overview](https://cloud.google.com/armor/docs/security-policy-overview).

**Optional:** Configure a default backend security policy. The default security policy throttles traffic over a user-configured threshold. For more information about default security policies, see the [Rate limiting overview](https://cloud.google.com/armor/docs/rate-limiting-overview).

- To opt out of the Cloud Armor default security policy, select **None** in the **Cloud Armor backend security policy** list.
- To configure the Cloud Armor default security policy, select **Default security policy** in the **Cloud Armor backend security policy** list.
  - In the **Policy name** field, accept the automatically generated name or enter a new name for your security policy.
  - In the **Request count** field, accept the default request count or enter an integer between 1 and 10,000.
  - In the **Interval** field, select an interval.
  - In the **Enforce on key** field, choose one of the following values: All, IP address, or X-Forwarded-For IP address. For more information about these options, see [Identifying clients for rate limiting](https://cloud.google.com/armor/docs/rate-limiting-overview#identifying-clients).

### Enable Logging and Monitoring

You can enable, disable, and view logs for an external Application Load Balancer backend service. When using the Google Cloud console, logging is enabled by default for backend services with serverless NEG backends. You can use `gcloud` to disable logging for each backend service as needed. For instructions, see [Logging](https://cloud.google.com/load-balancing/docs/backend-service-logging).

The load balancer also exports monitoring data to Cloud Monitoring. Monitoring metrics can be used to evaluate a load balancer's configuration, usage, and performance. Metrics can also be used to troubleshoot problems and improve resource utilization and user experience. For instructions, see [Monitoring](https://cloud.google.com/load-balancing/docs/monitoring).

## Delete a Serverless NEG

A network endpoint group cannot be deleted if it is attached to a backend service. Before deleting a NEG, ensure that it is detached from the backend service.

### Using the Console or gcloud

1. To ensure that the serverless NEG you want to delete is not currently in use by any backend service, go to the **Backend services** tab in the **Load balancing advanced** menu.
   - [Go to the Backend services tab](https://console.cloud.google.com/net-services/loadbalancing/advanced/backendServices/list)
2. If the serverless NEG is currently in use:
   - Click the name of the backend service using the serverless NEG.
   - Click **Edit**.
   - From the list of **Backends**, click **delete** to remove the serverless NEG backend from the backend service.
   - Click **Save**.
3. Go to the **Network endpoint group** page in the Google Cloud console.
   - [Go to the Network Endpoint Group page](https://console.cloud.google.com/compute/networkendpointgroups/list)
4. Select the checkbox for the serverless NEG you want to delete.
5. Click **Delete**.
6. Click **Delete** again to confirm.

## What's next

- Using logging and monitoring
- Troubleshooting serverless NEGs issues
- Clean up the load balancer setup
- Using a Terraform module for an external HTTPS load balancer with a Cloud Run
  backend