# Set up a regional external Application Load Balancer with Cloud Storage buckets

**(Preview)**

> This product or feature is subject to the "Pre-GA Offerings Terms" in the
> General Service Terms section of the Service Specific Terms. Pre-GA products
> and features are available "as is" and might have limited support.

This document shows you how to create a regional external Application Load
Balancer to route requests for static content to Cloud Storage buckets.

---

## Before you begin

### Install the Google Cloud CLI

Install the `gcloud` CLI. See
[Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).

### Required roles

To follow this guide, you need the appropriate IAM roles on your project. If you
are not the project creator, ask your administrator to grant you the following
roles:

- **Create a VPC network and load balancing components:** Compute Network Admin
  (`roles/compute.networkAdmin`)
- **Create Cloud Storage buckets:** Storage Object Admin
  (`roles/storage.objectAdmin`)

### Set up an SSL certificate resource

For an HTTPS load balancer, you must create an SSL certificate resource using
either a Compute Engine SSL certificate or a Certificate Manager certificate. We
recommend using a Google-managed certificate. See one of the following
documents:

- [Deploy a regional Google-managed certificate with DNS authorization](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs-regional-dns)
- [Deploy a regional Google-managed certificate with Certificate Authority Service](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs-regional-ca-service)
- [Deploy a regional self-managed certificate](https://cloud.google.com/load-balancing/docs/ssl-certificates/self-managed-certs-regional)

---

## Limitations

- Private bucket access isn't supported; the bucket must be publicly accessible.
- Signed URLs aren't supported.
- Cloud CDN integration isn't available for backend buckets with a regional
  external Application Load Balancer.
- Only the `GET` method is supported. You can download content, but not upload.
- Cloud Storage buckets must be in the same region as the load balancer.
  Dual-region or multi-region buckets aren't supported.

---

## Setup overview

The following diagram shows a regional external Application Load Balancer with
backend buckets in the same region.

![A regional external Application Load Balancer sends traffic to a Cloud Storage backend.](https://cloud.google.com/static/load-balancing/docs/images/re-xlb-gcs.svg 'Distributing traffic to Cloud Storage (click to enlarge).')

### Configure the network and the proxy-only subnet

This example uses the following:

- **Network:** A custom mode VPC network named `lb-network`.
- **Subnet for Envoy proxies:** A subnet named `proxy-only-subnet-us` in the
  `us-east1` region with the IP range `10.129.0.0/23`.

#### Configure a custom mode VPC network

1.  Go to the [VPC networks](https://console.cloud.google.com/vpc/networks)
    page.
2.  Click **Create VPC network**.
3.  For **Name**, enter `lb-network` and click **Create**.

#### Configure the proxy-only subnet

1.  Go to the [VPC networks](https://console.cloud.google.com/vpc/networks) page
    and click the name of the VPC network you created.
2.  On the **Subnet** tab, click **Add subnet**.
3.  Enter the following:
    - **Name:** `proxy-only-subnet-us`
    - **Region:** `us-east1`
    - **Purpose:** `Regional Managed Proxy`
    - **IP address range:** `10.129.0.0/23`
4.  Click **Add**.

---

## Configure your Cloud Storage buckets

### Create Cloud Storage buckets

1.  Go to the
    [Cloud Storage Buckets](https://console.cloud.google.com/storage/browser)
    page.
2.  Click **Create**.
3.  Enter a globally unique name.
4.  For **Location type**, select **Region** and choose `us-east1`.
5.  Click **Create**. Repeat to create a second bucket.

### Copy graphic files to your Cloud Storage buckets

Run the following commands in Cloud Shell, replacing the variables with your
bucket names:

```bash
gcloud storage cp gs://gcp-external-http-lb-with-bucket/three-cats.jpg gs://BUCKET1_NAME/love-to-purr/
gcloud storage cp gs://gcp-external-http-lb-with-bucket/two-dogs.jpg gs://BUCKET2_NAME/love-to-fetch/
```

### Make your Cloud Storage buckets publicly readable

Grant the `allUsers` principal the `Storage Object Viewer` role for each bucket:

1.  Go to the
    [Cloud Storage Buckets](https://console.cloud.google.com/storage/browser)
    page and click a bucket name.
2.  Select the **Permissions** tab.
3.  Click **Grant access**.
4.  In the **New principals** field, enter `allUsers`.
5.  For **Select a role**, choose `Storage Object Viewer`.
6.  Click **Save**, then **Allow public access**.

---

## Reserve the load balancer's IP address

1.  Go to the
    [Reserve a static address](https://console.cloud.google.com/networking/addresses/add)
    page.
2.  Choose a **Name**.
3.  For **IP version**, select `IPv4`.
4.  For **Type**, select `Regional`.
5.  For **Region**, select `us-east1`.
6.  Click **Reserve**.

---

## Configure the load balancer with backend buckets

> **Note:** You can only use the `gcloud` CLI to configure a regional external
> Application Load Balancer with backend buckets.

1.  **Create two backend buckets:**

    ```bash
    gcloud beta compute backend-buckets create backend-bucket-cats \
        --gcs-bucket-name=BUCKET1_NAME \
        --load-balancing-scheme=EXTERNAL_MANAGED \
        --region=us-east1

    gcloud beta compute backend-buckets create backend-bucket-dogs \
        --gcs-bucket-name=BUCKET2_NAME \
        --load-balancing-scheme=EXTERNAL_MANAGED \
        --region=us-east1
    ```

2.  **Create a URL map:**

    ```bash
    gcloud beta compute url-maps create URL_MAP_NAME \
        --default-backend-bucket=backend-bucket-cats \
        --region=us-east1
    ```

3.  **Configure the host and path rules of the URL map:**

    ```bash
    gcloud beta compute url-maps add-path-matcher URL_MAP_NAME \
        --path-matcher-name=path-matcher-pets \
        --new-hosts='*' \
        --backend-bucket-path-rules="/love-to-fetch/*=backend-bucket-dogs" \
        --default-backend-bucket=backend-bucket-cats
    ```

4.  **Create a target proxy:**
    - For **HTTP** traffic:
      ```bash
      gcloud compute target-http-proxies create http-proxy \
          --url-map=URL_MAP_NAME \
          --region=us-east1
      ```
    - For **HTTPS** traffic:
      ```bash
      gcloud compute target-https-proxies create https-proxy \
          --url-map=URL_MAP_NAME \
          --certificate-manager-certificates=CERTIFICATE_NAME \
          --region=us-east1
      ```

5.  **Create a forwarding rule:**
    - For **HTTP** traffic:
      ```bash
      gcloud compute forwarding-rules create http-fw-rule \
          --load-balancing-scheme=EXTERNAL_MANAGED \
          --network=lb-network \
          --address=RESERVED_IP_ADDRESS \
          --ports=80 \
          --region=us-east1 \
          --target-http-proxy=http-proxy \
          --target-http-proxy-region=us-east1
      ```
    - For **HTTPS** traffic:
      ```bash
      gcloud compute forwarding-rules create https-fw-rule \
          --load-balancing-scheme=EXTERNAL_MANAGED \
          --network=lb-network \
          --address=RESERVED_IP_ADDRESS \
          --ports=443 \
          --region=us-east1 \
          --target-https-proxy=https-proxy \
          --target-https-proxy-region=us-east1
      ```

---

## Send an HTTP request to the load balancer

1.  **Get the IP address of the forwarding rule:**

    ```bash
    gcloud compute forwarding-rules describe http-fw-rule --region=us-east1
    ```

2.  **Make an HTTP request using `curl`:**
    ```bash
    curl http://FORWARDING_RULE_IP_ADDRESS/love-to-purr/three-cats.jpg --output three-cats.jpg
    curl http://FORWARDING_RULE_IP_ADDRESS/love-to-fetch/two-dogs.jpg --output two-dogs.jpg
    ```
