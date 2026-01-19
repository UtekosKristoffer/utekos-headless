Of course. Here is the provided text formatted as structured markdown.

# Set up a global external Application Load Balancer with an external backend

This guide uses an example to teach the fundamentals of using an external
backend (custom origin) with a global external Application Load Balancer. When
you use an external backend with this load balancer, you can improve performance
by using Cloud CDN caching.

The guide shows how to configure a global external Application Load Balancer
with a Cloud CDN-enabled backend service that proxies requests to an external
backend server.

> Before following this guide, familiarize yourself with the
> [Internet NEG overview](https://cloud.google.com/load-balancing/docs/negs/internet-neg-concepts)
> documentation, including its limitations.

![A global external Application Load Balancer with an external backend.](https://cloud.google.com/static/load-balancing/docs/images/internet-neg-overview.svg 'Figure 1. A global external Application Load Balancer with an external backend (click to enlarge).')

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

To allow requests from Google Cloud to reach your external backend, you must
allowlist the IP address ranges that Google uses to send requests. Query the
`_cloud-eoips.googleusercontent.com` DNS TXT record to find these ranges.

**Example `nslookup` command:**

```bash
nslookup -q=TXT _cloud-eoips.googleusercontent.com 8.8.8.8
```

The output looks like this:
`Non-authoritative answer: _cloud-eoips.googleusercontent.com    text = "v=spf1 ip4:34.96.0.0/20 ip4:34.127.192.0/18 ~all"`
Note the CIDR ranges following `ip4:` and ensure they are allowed by your
firewall or ACLs.

---

## Set up your Google Cloud environment

### Reserve an external IP address

Reserve a global static external IP address that clients will use to reach your
load balancer.

1.  Go to the
    [External IP addresses](https://console.cloud.google.com/networking/addresses/list)
    page.
2.  Click **Reserve external static address**.
3.  Enter a name.
4.  For **Network Service Tier**, select **Premium**.
5.  For **IP version**, select **IPv4**.
6.  For **Type**, select **Global**.
7.  Click **Reserve**.

### Set up the internet NEG

1.  Go to the
    [Network endpoint groups](https://console.cloud.google.com/compute/networkendpointgroups)
    page.
2.  Click **Create network endpoint group**.
3.  Enter a name.
4.  For **Network endpoint group type**, select **Network endpoint group
    (Internet)**.
5.  For **Default port**, enter `443`.
6.  For **New network endpoint**, select **Fully qualified domain name and
    port**.
7.  Enter the **Fully qualified domain name**.
8.  For **Port type**, select **Default** and verify the port is `443`.
9.  Click **Create**.

### Create the load balancer

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page and click **Create load balancer**.
2.  Select **Application Load Balancer (HTTP/HTTPS)** and click **Next**.
3.  Select **Public facing (external)** and click **Next**.
4.  Select **Best for global workloads** and click **Next**.
5.  Select **Global external Application Load Balancer** and click **Next**.
6.  Click **Configure**.

#### Frontend configuration

1.  Click **Frontend configuration**.
2.  Enter a name.
3.  To create an HTTPS load balancer, configure the following:
    - **Protocol:** `HTTPS`
    - **Network Service Tier:** `Premium`
    - **IP version:** `IPv4`
    - **IP address:** Select the IP address you reserved.
    - **Port:** `443`
    - **Certificate:** Select or create an SSL certificate. We recommend using a
      Google-managed certificate.
4.  (Optional) Select **Enable HTTP to HTTPS Redirect**.
5.  Click **Done**.

#### Backend configuration

1.  Click **Backend configuration**.
2.  Click **Backend services and backend buckets** > **Create a backend
    service**.
3.  Enter a name.
4.  For **Backend type**, select **Internet network endpoint group**.
5.  For **Protocol**, select `HTTP/2`.
6.  For **Backends**, in the **New backend** window, select the internet NEG you
    created.
7.  Click **Create**.

#### Review and finalize

1.  Click **Review and finalize**.
2.  If everything looks correct, click **Create**.

---

## Connect your domain to your load balancer

After the load balancer is created, note its IP address. To point your domain to
the load balancer, create an `A` record using your domain registration service.

---

## Test the load balancer

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page and click the load balancer you created.
2.  Note the **IP address**.
3.  Send traffic to the load balancer by visiting `http://IP_ADDRESS` or
    `https://IP_ADDRESS`. You should be directed to the application running on
    the external backend.

---

## Additional configuration

### Enable Cloud CDN

1.  Edit your load balancer and go to **Backend configuration**.
2.  For the backend service with the internet NEG, click **Edit**.
3.  Select **Enable Cloud CDN**.
4.  (Optional) Modify cache mode and TTL settings.
5.  Click **Update**.

### Use a custom header to authenticate requests

You can configure the backend service to add a custom `Host` header to each
request.

1.  Edit the backend service and click **Advanced configurations**.
2.  For **Custom request headers**, click **Add header**.
3.  For **Header name**, enter `Host`.
4.  For **Header value**, enter the FQDN of your external backend endpoint.
5.  Click **Update**.

### Enable IAP on the external Application Load Balancer

To enable IAP, update the backend service to include the `--iap=enabled` flag
with your OAuth2 client ID and secret.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --iap=enabled,oauth2-client-id=ID,oauth2-client-secret=SECRET \
    --global
```

> **Note:** IAP is not compatible with Cloud CDN.

### Update client HTTP keepalive timeout

1.  Edit your load balancer and go to **Frontend configuration**.
2.  Expand **Advanced features**.
3.  For **HTTP keepalive timeout**, enter a timeout value (5-1200 seconds).
4.  Click **Update**.
