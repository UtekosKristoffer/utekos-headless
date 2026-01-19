# Set up a Classic Application Load Balancer with Cloud Storage Buckets

This guide demonstrates how to configure a classic Application Load Balancer to route requests for static content to Cloud Storage buckets. By setting up a load balancer with backend buckets, you can direct requests to specific URL paths to different Cloud Storage buckets. For example, requests to paths starting with `/love-to-fetch` can be routed to a `us-east1` Cloud Storage bucket, while all other requests are sent to a `europe-north1` bucket, irrespective of the user's geographical location.

For serving dynamic content over HTTP(S), it is recommended to use backend services instead of backend buckets.

To get a step-by-step walkthrough of this task directly within the Google Cloud console, click **Guide me**:

[Guide me]

## Cloud Storage Buckets as Load Balancer Backends

An external Application Load Balancer utilizes a URL map to direct incoming traffic from designated URL paths to your backend infrastructure.

The diagram below illustrates how the load balancer routes traffic. Requests for paths that include `/love-to-fetch/` are directed to a Cloud Storage bucket located in the `us-east1` region. All other requests are forwarded to a Cloud Storage bucket in the `europe-north1` region.

![Traffic distribution to Cloud Storage buckets by the load balancer](image-placeholder "Distributing traffic to Cloud Storage")

By default, Cloud Storage leverages the same caching infrastructure as Cloud CDN. If you enable Cloud CDN on your backend bucket, you gain access to Cloud CDN's content controls. These controls include features like cache modes, signed URLs, and cache invalidation. Cloud CDN also allows for the caching of large files (over 10 MB). If Cloud CDN is not enabled on your backend bucket, caching is controlled by the `Cache-Control` headers set in the Cloud Storage metadata, and it is limited to smaller content.

## Before You Begin

Ensure that your environment meets the following prerequisites. If you plan to use the `gcloud storage` utility, you can install it by following the instructions in the [Discover object storage with the gcloud tool](https://cloud.google.com/storage/docs/discover-object-storage-gcloud) guide.

### Set a Default Project

#### Using the Console, gcloud, or Terraform

1.  In the Google Cloud console, go to the project selector page and either select an existing Google Cloud project or create a new one.

**Required Roles for Project Selection or Creation**

> **Note:** If you do not intend to keep the resources created during this procedure, it is advisable to create a new project rather than using an existing one. Once you have completed the steps, you can delete the project, which will also remove all associated resources.

[Go to project selector](https://console.cloud.google.com/projectselector2/home/dashboard)

2.  Confirm that billing is enabled for your Google Cloud project.

### Required Permissions

To complete this guide, you will need to create Cloud Storage buckets and a load balancer within a project. You must have either a project owner or editor role, or you should be assigned the following Compute Engine IAM roles:

| Task                            | Required IAM Role    |
| ------------------------------- | -------------------- |
| Create load balancer components | Network Admin        |
| Create Cloud Storage buckets    | Storage Object Admin |

For additional information, please refer to the following documentation:

-   [Access control](https://cloud.google.com/storage/docs/access-control)
-   [IAM Conditions](https://cloud.google.com/iam/docs/conditions-overview)

### Set Up an SSL Certificate Resource

For an HTTPS load balancer, you must create an SSL certificate resource. You can do this by following the instructions in one of these guides:

-   [Using self-managed SSL certificates](https://cloud.google.com/load-balancing/docs/ssl-certificates/self-managed-certs)
-   [Using Google-managed SSL certificates](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs)

It is recommended to use a Google-managed certificate.

This guide assumes that you have an existing SSL certificate resource named `www-ssl-cert`.

> **Warning:** Do not use a self-signed certificate in a production environment.

### Optional: Use Bring Your Own IP (BYOIP) Addresses

With Bring Your Own IP (BYOIP), you can import your own public IP addresses to Google Cloud and use them with your Google Cloud resources. For instance, if you import your own IPv4 addresses, you can assign one to the forwarding rule when you set up your load balancer. When following the instructions in this guide to create the load balancer, provide your BYOIP address as the IP address.

For more information on using BYOIP, see [Bring your own IP addresses](https://cloud.google.com/vpc/docs/using-bring-your-own-ip).

## Prepare Your Cloud Storage Buckets and Content

The process of preparing your Cloud Storage buckets involves the following steps:

1.  Create the necessary buckets.
2.  Copy your content into the buckets.
3.  Configure public access for the buckets.

### Create Cloud Storage Buckets

In this example, you will create two Cloud Storage buckets for the load balancer to access. For production environments, it is recommended to use a multi-region bucket, which automatically replicates objects across multiple Google Cloud regions. This enhances the availability of your content and improves the fault tolerance of your application.

Make a note of the names of the Cloud Storage buckets you create, as they will be needed later. In this guide, they are referred to as `BUCKET_1_NAME` and `BUCKET_2_NAME`.

#### Using the Console, gcloud, or Terraform

1.  In the Google Cloud console, navigate to the **Cloud Storage Buckets** page.
    -   [Go to Cloud Storage Buckets](https://console.cloud.google.com/storage/browser)
2.  Click on **Create bucket**.
3.  In the **Name your bucket** field, enter a globally unique name that adheres to the naming guidelines.
4.  Click on **Choose where to store your data**.
5.  Set the **Location type** to **Region**.
6.  Set the **Location** to `europe-north1`. This bucket will be referred to as `BUCKET_1_NAME` in this guide.
7.  Click **Create**.
8.  Click on **Buckets** to return to the Cloud Storage Buckets page. Follow the same steps to create a second bucket, but set the **Location** to `us-east1`. This bucket will be referred to as `BUCKET_2_NAME`.

### Transfer Content to Your Cloud Storage Buckets

To test your setup later, you will need to copy the following images from a public Cloud Storage bucket to your own Cloud Storage buckets.

#### Using gcloud or Terraform

1.  Click **Activate Cloud Shell**.
2.  Execute the following commands in Cloud Shell, replacing the placeholder bucket name variables with your actual Cloud Storage bucket names:

```bash
gcloud storage cp gs://gcp-external-http-lb-with-bucket/three-cats.jpg gs://BUCKET_1_NAME/never-fetch/
```

```bash
gcloud storage cp gs://gcp-external-http-lb-with-bucket/two-dogs.jpg gs://BUCKET_2_NAME/love-to-fetch/
```

3.  In the Google Cloud console, click the **Refresh** button on each bucket's details page to confirm that the files have been copied successfully.

### Make Your Cloud Storage Buckets Publicly Readable

When you make your Cloud Storage buckets publicly readable, anyone on the internet will be able to list and view their objects, as well as view their metadata (excluding ACLs). **Do not include sensitive information in public buckets.**

To minimize the risk of accidentally exposing sensitive data, avoid storing public objects and sensitive information in the same bucket.

#### Using the Console, gcloud, or Terraform

To grant all users permission to view objects in your buckets, repeat the following steps for each bucket:

1.  In the Google Cloud console, go to the **Cloud Storage Buckets** page.
    -   [Go to Cloud Storage Buckets](https://console.cloud.google.com/storage/browser)
2.  Click on the name of the bucket, then select the **Permissions** tab.
3.  Click **Add**.
4.  In the **New principals** field, enter `allUsers`.
5.  In the **Select a role** dropdown, choose **Cloud Storage > Storage Object Viewer**.
6.  Click **Save**.
7.  Click **Allow public access**.

## Reserve an External IP Address

Once your Cloud Storage buckets are set up, you can reserve a global static external IP address. This is the IP address that your audience will use to access your load balancer.

This step is optional but highly recommended, as a static external IP address provides a single, stable address to which you can point your domain.

> **Note:** You can skip this step and allow Google Cloud to assign an ephemeral IP address to your load balancer's forwarding rule. An ephemeral IP address will remain constant as long as the forwarding rule exists. However, if you delete and then re-create the forwarding rule, it may be assigned a new IP address. If needed, you can promote an ephemeral IP address to a static one.

### Using the Console, gcloud, or Terraform

1.  In the Google Cloud console, go to the **External IP addresses** page.
    -   [Go to External IP addresses](https://console.cloud.google.com/networking/addresses/list)
2.  Click **Reserve static address**.
3.  In the **Name** field, enter `example-ip`.
4.  Set the **Network Service Tier** to **Premium**.
5.  Set the **IP version** to **IPv4**.
6.  Set the **Type** to **Global**.
7.  Click **Reserve**.

## Create an External Application Load Balancer with Backend Buckets

These instructions explain how to create either an HTTP or an HTTPS load balancer. To create an HTTPS load balancer, you must add an SSL certificate resource to the load balancer's frontend. For more details, see the [SSL certificates overview](https://cloud.google.com/load-balancing/docs/ssl-certificates).

### Using the Console, gcloud, or Terraform

#### Select the Load Balancer Type

1.  In the Google Cloud console, go to the **Load balancing** page.
    -   [Go to Load balancing](https://console.cloud.google.com/net-services/loadbalancing/list)
2.  Click **Create load balancer**.
3.  For **Type of load balancer**, select **Application Load Balancer (HTTP/HTTPS)** and click **Next**.
4.  For **Public facing or internal**, select **Public facing (external)** and click **Next**.
5.  For **Global or single region deployment**, select **Best for global workloads** and click **Next**.
6.  For **Load balancer generation**, select **Classic Application Load Balancer** and click **Next**.
7.  Click **Configure**.

#### Basic Configuration

1.  In the **Name** field, enter `http-lb`.

#### Configure the Backend

1.  Click **Backend configuration**.
2.  Click the **Backend services and backend buckets** dropdown, and then click **Create a backend bucket**.
3.  In the **Backend bucket name** field, enter `cats`.
4.  In the **Cloud Storage bucket** field, click **Browse**.
5.  Select `BUCKET_1_NAME`, and then click **Select**. Creating the `cats` backend bucket first makes it the default backend, to which all unmatched traffic requests will be directed. The redirect rules for a default backend bucket cannot be changed in the load balancer.
6.  Click **Create**.
7.  Follow the same process to create a backend bucket named `dogs`, and select `BUCKET_2_NAME`.
8.  Click **OK**.

#### Configure Routing Rules

Routing rules define how your traffic is directed. To configure routing, you will set up host rules and path matchers, which are components of an external Application Load Balancer's URL map. To set up the rules for this example:

1.  Click **Host and path rules**.
2.  For the `dogs` backend, enter `*` in the **Hosts** field and `/love-to-fetch/*` in the **Paths** field.

#### Configure the Frontend

1.  Click **Frontend configuration**.
2.  Verify that the following options are configured with the specified values:

| Property             | Value (type a value or select an option as specified) |
| -------------------- | ----------------------------------------------------- |
| Protocol             | HTTP                                                  |
| Network Service Tier | Premium                                               |
| IP version           | IPv4                                                  |
| IP address           | example-ip                                            |
| Port                 | 80                                                    |

If you wish to create an HTTPS load balancer instead of an HTTP one, you must have an SSL certificate (`gcloud compute ssl-certificates list`), and you must configure the fields as follows:

| Property                                | Value (type a value or select an option as specified)                                                                                                                                                                                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Protocol                                | HTTP(S)                                                                                                                                                                                                                                                                                                                                                              |
| Network Service Tier                    | Premium                                                                                                                                                                                                                                                                                                                                                              |
| IP version                              | IPv4                                                                                                                                                                                                                                                                                                                                                                 |
| IP address                              | example-ip                                                                                                                                                                                                                                                                                                                                                           |
| Port                                    | 443                                                                                                                                                                                                                                                                                                                                                                  |
| Certificate                             | Select the `www-ssl-cert` certificate you created in the [Set up an SSL certificate resource](#set-up-an-ssl-certificate-resource) section, or create a new one.                                                                                                                                                                                                   |
| Optional: Enable HTTP to HTTPS Redirect | Use this checkbox to enable redirects.<br><br>Enabling this checkbox creates an additional partial HTTP load balancer that uses the same IP address as your HTTPS load balancer and redirects HTTP requests to your load balancer's HTTPS frontend.<br><br>This checkbox can only be selected when the HTTPS protocol is selected and a reserved IP address is used. |

3.  Click **Done**.

#### Review the Configuration

1.  Click **Review and finalize**.
2.  Review the **Frontend**, **Host and path rules**, and **Backend buckets**.
3.  Click **Create** and wait for the load balancer to be created.
4.  Click the name of the load balancer (`http-lb`).
5.  Make a note of the IP address of the load balancer for the next task. In this guide, it is referred to as `IP_ADDRESS`.

## Send Traffic to Your Load Balancer

A few minutes after you have configured your load balancer, you can begin sending traffic to the load balancer's IP address.

### Using the Console or gcloud

In a web browser, go to the following URLs to test your load balancer, replacing `IP_ADDRESS` with the load balancer's IP address:

-   `http://IP_ADDRESS/love-to-fetch/two-dogs.jpg`
-   `http://IP_ADDRESS/never-fetch/three-cats.jpg`

If you have set up an HTTP load balancer, ensure that your browser does not automatically redirect to HTTPS.

## Query String Parameters for the Cloud Storage XML API

When certain query string parameters are included in requests sent to a backend bucket through an Application Load Balancer, the client may receive an HTTP 404 response with an "Unsupported query parameter" error. This occurs because the Cloud Storage XML API does not support these parameters when the request originates from an Application Load Balancer.

The following table summarizes how the Cloud Storage XML API responds to various query parameters when requests are routed through an Application Load Balancer. The parameters are grouped by their observed behavior to help you identify which are supported, ignored, or rejected in this context.

| Parameter Type       | Parameters                                                                                                                                                                  | Observed Behavior                                                                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supported parameters | `generation`, `prefix`, `marker`, `max-keys`                                                                                                                                | Adding these parameters (with appropriate values) works as described in the Cloud Storage XML API documentation. The API returns a standard HTTP response.                                              |
| Ignored parameters   | `acl`, `billing`, `compose`, `delimiter`, `encryption`, `encryptionConfig`, `response-content-disposition`, `response-content-type`, `tagging`, `versions`, `websiteConfig` | Adding these parameters has no effect.<br><br>If the load balancer passes these parameters to Cloud Storage, the Cloud Storage XML API ignores them and responds as though the parameters do not exist. |
| Rejected parameters  | `cors`, `lifecycle`, `location`, `logging`, `storageClass`, `versioning`                                                                                                    | The Cloud Storage XML API returns an "Unsupported query parameter" error.                                                                                                                               |

## Limitations

-   Backend buckets are only supported with global external Application Load Balancers and classic Application Load Balancers. They are not supported by the regional external Application Load Balancer or any other type of load balancer.
-   Backend buckets are not supported with Identity-Aware Proxy.
-   The classic Application Load Balancer does not fully support uploads to Cloud Storage buckets. Specifically, all query parameters on the request are dropped during an upload to Cloud Storage.
-   The load balancer does not support the use of signed URLs unless Cloud CDN is enabled.

> **Note:** Signed URLs used in Cloud Storage are different from the signed URLs used with Cloud CDN. The global external Application Load Balancer only supports Cloud CDN signed URLs. Cloud Storage signed URLs are not supported through the load balancer, regardless of whether Cloud CDN is enabled.