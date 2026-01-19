# Set up a regional external Application Load Balancer with Cloud Run

This page shows you how to deploy a regional external Application Load Balancer
with a Cloud Run backend. To set this up, you use a serverless NEG backend for
the load balancer.

Before you try this procedure, make sure you are familiar with the following
topics:

- [External Application Load Balancer overview](https://cloud.google.com/load-balancing/docs/l7-external/l7-xlb-overview)
- [Serverless NEGs overview](https://cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts)

This document shows you how to configure an Application Load Balancer that
proxies requests to a serverless NEG backend.

---

## Before you begin

### Install the Google Cloud CLI

Install the Google Cloud CLI tool. See
[gcloud CLI overview](https://cloud.google.com/sdk/gcloud) for information.

### Deploy a Cloud Run service

The instructions on this page assume you already have a Cloud Run service
running. You can use any of the
[Cloud Run quickstarts](https://cloud.google.com/run/docs/quickstarts) to deploy
a service.

The serverless NEG and the load balancer must be in the same region as the Cloud
Run service. You can block external requests sent directly to the service's
default URLs by restricting ingress:

```bash
gcloud run deploy CLOUD_RUN_SERVICE_NAME \
    --platform=managed \
    --allow-unauthenticated \
    --ingress=internal-and-cloud-load-balancing \
    --region=REGION \
    --image=IMAGE_URL
```

### Configure permissions

To follow this guide, you need to be a project owner or editor, or have the
following IAM roles:

| Task                                           | Required role                                                  |
| :--------------------------------------------- | :------------------------------------------------------------- |
| Create load balancer and networking components | Compute Network Admin (`roles/compute.networkAdmin`)           |
| Create and modify NEGs                         | Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) |
| Create and modify SSL certificates             | Security Admin (`iam.securityAdmin`)                           |

---

## Configure the VPC network and proxy-only subnet

### Create the VPC network

Create a custom mode VPC network.

1.  Go to the
    [VPC networks page](https://console.cloud.google.com/vpc/networks).
2.  Click **Create VPC network**.
3.  For **Name**, enter `lb-network`.
4.  Click **Create**.

### Create a proxy-only subnet

Create a proxy-only subnet for all regional Envoy-based load balancers in a
specific region.

1.  Go to the
    [VPC networks page](https://console.cloud.google.com/vpc/networks).
2.  Click the name of the VPC network (`lb-network`).
3.  Click **Add subnet**.
4.  In the **Name** field, enter `proxy-only-subnet`.
5.  Select a **Region**.
6.  Set **Purpose** to **Regional Managed Proxy**.
7.  Enter an **IP address range** as `10.129.0.0/23`.
8.  Click **Add**.

---

## Create the load balancer

The following diagram shows the architecture. Traffic from the load balancer to
the serverless NEG uses special routes and doesn't require firewall rules to
allow traffic from the proxy-only subnet.

![Regional external HTTP or HTTPS load balancing architecture for a Cloud Run application.](https://cloud.google.com/static/load-balancing/docs/images/serverless-neg-rexlb.svg 'Regional external HTTP or HTTPS load balancing architecture for a Cloud Run application (click to enlarge).')

### Console steps:

#### Select the load balancer type

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page and click **Create load balancer**.
2.  For **Type of load balancer**, select **Application Load Balancer
    (HTTP/HTTPS)** and click **Next**.
3.  For **Public facing or internal**, select **Public facing (external)** and
    click **Next**.
4.  For **Global or single region deployment**, select **Best for regional
    workloads** and click **Next**.
5.  Click **Configure**.

#### Basic configuration

- For the name, enter `serverless-lb`.
- Select the **Network** as `lb_network`.

#### Configure the frontend

1.  Click **Frontend configuration**.
2.  Enter a **Name**.
3.  To configure HTTPS, fill in the fields as follows:
    - **Protocol:** `HTTPS`
    - **Network service tier:** `Standard`
    - **IP version:** `IPv4`
    - **IP address:** `Ephemeral`
    - **Port:** `443`
    - **Choose certificate repository:** `Classic Certificates`
    - Click **Create a new certificate** or select an existing one.
4.  Click **Done**.

#### Configure the backend services

1.  Click **Backend configuration**.
2.  From the **Create or select backend services** menu, select **Create a
    backend service**.
3.  Enter a **Name**.
4.  For **Backend type**, select **Serverless network endpoint group**.
5.  Under **Backends > New backend**, select **Create serverless network
    endpoint group**.
6.  In the new window, enter a **Name**.
7.  From the **Serverless network endpoint group type** field, select **Cloud
    Run**.
8.  Select **Select service name** and choose the Cloud Run service you want to
    load balance.
9.  Click **Done**, then **Create**.
10. (Optional) Configure a default Cloud Armor security policy for rate
    limiting.
11. Click **Create** in the backend service window.

#### Configure routing rules

1.  Click **Simple host and path rule**.
2.  Select a backend service from the **Backend** list.

#### Review the configuration

1.  Click **Review and finalize**.
2.  Review the values for **Backend**, **Host and Path rules**, and
    **Frontend**.
3.  Click **Create**. Note the IP address of the load balancer for the next
    task.

---

## Test the load balancer

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the load balancer you just created (`serverless-lb`).
3.  Note the **IP Address** of the load balancer.
4.  Test the load balancer using a web browser by going to `http://IP_ADDRESS`
    or `https://IP_ADDRESS`. You should be directed to your Cloud Run service's
    homepage.

---

## Additional configuration options

### Using a URL mask

Instead of selecting a specific Cloud Run service, you can use a URL mask to
point to multiple services serving at the same domain. A URL mask is a template
of your URL schema (e.g., `example.com/<service>`).

**Constructing a URL mask:**

1.  Start with the URL of your service (e.g., `https://example.com/login`).
2.  Remove `http://` or `https://`.
3.  Replace the service name with a placeholder like `<service>`. The result is
    `example.com/<service>`.

| Service, Tag name             | Cloud Run custom domain URL          | URL mask                                |
| :---------------------------- | :----------------------------------- | :-------------------------------------- |
| `service: login`              | `https://login-home.example.com/web` | `<service>-home.example.com`            |
| `service: login`              | `https://example.com/login/web`      | `example.com/<service>` or `/<service>` |
| `service: login`, `tag: test` | `https://test.login.example.com/web` | `<tag>.<service>.example.com`           |

**Creating a serverless NEG with a URL mask:** When creating a serverless NEG
(either for a new load balancer or by editing an existing one), select **Use URL
Mask** and enter the mask you constructed.

---

## Deleting a serverless NEG

A NEG cannot be deleted if it is attached to a backend service.

1.  Go to the **Backend services** tab in the Load balancing components page to
    check if the NEG is in use.
2.  If it is, edit the backend service and remove the NEG from its list of
    **Backends**.
3.  Go to the **Network endpoint group** page.
4.  Select the checkbox for the NEG you want to delete and click **Delete**.
