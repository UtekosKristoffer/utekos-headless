# Set up a regional external Application Load Balancer with an external backend

This guide shows you how to configure a regional external Application Load
Balancer that proxies requests to an external backend, which is an endpoint
external to Google Cloud.

> Before following this guide, familiarize yourself with the
> [Internet NEG overview](https://cloud.google.com/load-balancing/docs/negs/internet-neg-concepts)
> documentation, including its limitations.

![A regional external Application Load Balancer with an external backend.](https://cloud.google.com/static/load-balancing/docs/images/re-xlb-internet-neg.svg 'Figure 1. A regional external Application Load Balancer with an external backend (click to enlarge).')

> **Note:** This procedure demonstrates the setup with the Standard Network
> Service Tier.

---

## Permissions

To follow this guide, you need to be a project Owner or Editor, or have both of
the following Compute Engine IAM roles:

| Task                                       | Required role                                          |
| :----------------------------------------- | :----------------------------------------------------- |
| Create and modify load balancer components | Compute Network Admin (`roles/compute.networkAdmin`)   |
| Create and modify NEGs                     | Compute Instance Admin (`roles/compute.instanceAdmin`) |

---

## Set up your external backend environment outside Google Cloud

### Configure network endpoints

Configure a network endpoint to expose your external backend to Google Cloud.
Make sure the endpoint—either an `IP:Port` combination or a fully-qualified
domain name (FQDN) and port—is reachable over the internet.

### Allow the external backend to receive traffic from Google Cloud

This step can be completed after you've set up the Cloud NAT gateway.

1.  Configure a Cloud NAT gateway with IP addresses that are used for egress
    traffic from Google Cloud.
2.  Make sure your external backend environment is configured to allow traffic
    from these IP addresses. You will likely need to work with your network or
    security admin to set this up.

---

## Set up your Google Cloud environment

You'll need a VPC network with two subnets: one for the load balancer components
and one for the proxy-only subnet.

### Create the VPC network and subnet

1.  Go to the [VPC networks](https://console.cloud.google.com/vpc/networks) page
    and click **Create VPC network**.
2.  Enter a **Name**: `LB_NETWORK`.
3.  In the **Subnets** section, set **Subnet creation mode** to **Custom**.
4.  In the **New subnet** section, enter:
    - **Name:** `LB_SUBNET_NAME`
    - **Region:** `REGION`
    - **IP address range:** `LB_SUBNET_RANGE`
5.  Click **Done**, then **Create**.

### Configure the proxy-only subnet

1.  Go to the [VPC networks](https://console.cloud.google.com/vpc/networks) page
    and select your network.
2.  Click **Add subnet**.
3.  Enter a **Name**: `PROXY_ONLY_SUBNET_NAME`.
4.  Select a **Region**: `REGION`.
5.  Set **Purpose** to **Regional Managed Proxy**.
6.  Enter an **IP address range**: `PROXY_ONLY_SUBNET_RANGE`.
7.  Click **Add**.

### Set up a Cloud NAT gateway

The Cloud NAT gateway maps the proxy-only subnet range to external IP addresses.

#### Set up automatic NAT allocated IP addresses

1.  Go to the [Cloud NAT](https://console.cloud.google.com/net-services/nat)
    page and click **Create Cloud NAT gateway**.
2.  Enter a gateway name: `LB_NAT_CONFIG`.
3.  For **NAT type**, select **Public**.
4.  Select the **Network** (`LB_NETWORK`) and **Region**.
5.  Create or select a **Cloud Router**.
6.  For **Source endpoint type**, select **Managed proxy load balancers**.
7.  For **Source**, select **Custom**, and for **Subnets**, select
    `PROXY_ONLY_SUBNET_NAME`.
8.  For **Cloud NAT IP addresses**, select **Automatic (recommended)**.
9.  Choose a **Network service tier**.
10. Click **Create**.

#### Set up manually allocated IP addresses

Follow the steps for automatic allocation, but for **Cloud NAT IP addresses**,
select **Manual** and choose your reserved static external IP addresses.

> **Warning:** Provisioning fewer NAT IP addresses than the number of Envoy
> proxies might result in HTTP 5xx errors.

### Reserve the load balancer's IP address

1.  Go to the
    [Reserve a static address](https://console.cloud.google.com/networking/addresses/add)
    page.
2.  Choose a **Name**.
3.  For **Network Service Tier**, select **Standard**.
4.  For **Type**, select **Regional**.
5.  Select a **Region**.
6.  Click **Reserve**.

### Set up the internet NEG

You can create an internet NEG with either `INTERNET_FQDN_PORT` or
`INTERNET_IP_PORT` endpoints.

1.  Go to the
    [Network endpoint group](https://console.cloud.google.com/compute/networkendpointgroups)
    page and click **Create network endpoint group**.
2.  Specify a name.
3.  For **Network endpoint group type**, select **Network endpoint group
    (Internet)**.
4.  For **Scope**, select **Regional**.
5.  Select the **Network** (`LB_NETWORK`).
6.  Enter a **Default port**.
7.  Add endpoints by specifying either an FQDN or an IP address, along with a
    port number.
8.  Click **Create**.

---

## Create the load balancer

### Select the load balancer type

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page and click **Create load balancer**.
2.  Select **Application Load Balancer (HTTP/HTTPS)** > **Next**.
3.  Select **Public facing (external)** > **Next**.
4.  Select **Best for regional workloads** > **Next**.
5.  Click **Configure**.

### Basic configuration

- Enter a **Load balancer name**.
- For **Region**, select `REGION`.
- For **Network**, select `LB_NETWORK`.

### Frontend configuration

1.  Click **Frontend configuration** and enter a **Name**.
2.  To create an HTTPS load balancer, configure:
    - **Protocol:** `HTTPS`
    - **IP address:** Select the IP address you reserved.
    - **Port:** `443`
    - **Certificate:** Select or create an SSL certificate.
3.  Click **Done**.

### Backend configuration

1.  Click **Backend configuration** > **Create a backend service**.
2.  Enter a name.
3.  For **Backend type**, select **Internet network endpoint group**.
4.  For **Backends**, select the regional internet NEG you created.
5.  For **Health check**, select **Create a health check**, configure it, and
    click **Create**.
6.  Click **Create**.

### Review and finalize

1.  Click **Review and finalize**.
2.  If everything looks correct, click **Create**.

---

## Connect your domain to your load balancer

After the load balancer is created, note its IP address and create an `A` record
in your DNS settings to point your domain to it.

---

## Test the load balancer

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page and find your load balancer's IP address.
2.  Test the load balancer by visiting `http://IP_ADDRESS` or
    `https://IP_ADDRESS`. You should be directed to your external backend.

---

## Additional configuration

### Use a custom header to authenticate requests

Configure the backend service to add a custom header to indicate requests came
from the Google Cloud load balancer. See
[Set up advanced traffic management](https://cloud.google.com/load-balancing/docs/l7-external-regional/traffic-management-overview#custom-headers).

### Enable IAP on the external Application Load Balancer

Update the backend service to include the `--iap=enabled` flag with your OAuth2
client ID and secret.
