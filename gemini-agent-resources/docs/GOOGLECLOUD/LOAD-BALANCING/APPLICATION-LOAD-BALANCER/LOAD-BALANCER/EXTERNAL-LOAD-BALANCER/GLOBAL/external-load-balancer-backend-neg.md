# Set up a Global External Application Load Balancer with an External Backend

This guide shows you how to configure a global external Application Load Balancer with a Cloud CDN-enabled backend service that proxies requests to an external backend server (also called a custom origin).

## Permissions

To follow this guide, you need to be a project Owner or Editor, or have the following Compute Engine IAM roles:

*   `compute.networkAdmin`
*   `compute.instanceAdmin`

---

## Set up Your External Backend Environment

### Configure Network Endpoints

Configure a network endpoint (an IP:Port combination or a fully-qualified domain name and port) to expose your external backend to Google Cloud. Make sure the endpoint is reachable over the internet.

### Allow the External Backend to Receive Traffic from Google Cloud

To allow requests from Google Cloud to reach your external backend, you must allowlist the IP address ranges that Google uses to send requests. Query the `_cloud-eoips.googleusercontent.com` DNS TXT record to get the current IP ranges.

**Example using `nslookup`:**

```bash
nslookup -q=TXT _cloud-eoips.googleusercontent.com 8.8.8.8
```

**Example using `dig`:**

```bash
dig TXT _cloud-eoips.googleusercontent.com | grep -Eo 'ip4:[^ ]+' | cut -d':' -f2
```

> **Caution:** These IP address ranges are subject to change. Make sure that you always confirm the Google Cloud IP address ranges that send traffic to your external backends.

---

## Set up Your Google Cloud Environment

Create the global external Application Load Balancer with an internet NEG backend.

### Reserve an External IP Address

Reserve a global static external IP address for your load balancer.

```bash
gcloud compute addresses create LB_IP_ADDRESS_NAME \
    --network-tier=PREMIUM \
    --ip-version=IPV4 \
    --global
```

### Set up the Internet NEG

Create an internet network endpoint group (NEG).

### Create the Load Balancer

#### Frontend Configuration

Configure the frontend of your load balancer, including the protocol (HTTP or HTTPS), IP address, and port. For HTTPS, you will need an SSL certificate.

#### Backend Configuration

Create a backend service and add your internet NEG as a backend.

#### Review and Finalize

Review your configuration and create the load balancer.

---

## Connect Your Domain to Your Load Balancer

After the load balancer is created, create an `A` record in your DNS settings to point your domain to the load balancer's IP address.

---

## Test the Load Balancer

Once the load balancer is configured and DNS has propagated, you can send traffic to the load balancer's IP address or your domain to test the setup.

---

## Additional Configuration

### Enable Cloud CDN

Enable Cloud CDN on your backend service to cache content and improve performance.

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --enable-cdn \
    --cache-mode=CACHE_MODE
```

### Use a Custom Header to Authenticate Requests

Set a custom `Host` header to authenticate requests sent to your external backend.

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --custom-request-header "Host: HEADER_VALUE" \
    --global
```

### Enable IAP on the External Application Load Balancer

Enable Identity-Aware Proxy (IAP) to protect your application.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --iap=enabled,oauth2-client-id=ID,oauth2-client-secret=SECRET \
    --global
```
> **Note:** IAP is not compatible with Cloud CDN.

### Update Client HTTP Keepalive Timeout

Update the client HTTP keepalive timeout for your load balancer's frontend.

```
