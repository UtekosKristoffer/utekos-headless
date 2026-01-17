# Set up a Global External Application Load Balancer with Serverless Backends

This page shows you how to create an external Application Load Balancer to route requests to serverless backends like App Engine, Cloud Run, and Cloud Functions.

## Before you begin

*   Deploy an App Engine, Cloud Run, or Cloud Functions service.
*   Install the Google Cloud CLI.
*   Configure permissions (project Owner or Editor, or `compute.networkAdmin`, `compute.instanceAdmin`, and `compute.securityAdmin` roles).

---

## Reserve an External IP Address

Reserve a global static external IP address for your load balancer.
```bash
gcloud compute addresses create EXAMPLE_IP \
    --network-tier=PREMIUM \
    --ip-version=IPV4 \
    --global
```

---

## Create an SSL Certificate Resource

To create an HTTPS load balancer, you must add an SSL certificate resource to the load balancer's frontend. We recommend using a Google-managed certificate.

---

## Create the Load Balancer

The following diagram shows the load balancer architecture.

### Frontend Configuration

Configure the frontend of your load balancer, including the protocol (HTTP or HTTPS), IP address, and port. For HTTPS, you will need an SSL certificate.

### Backend Configuration

Create a backend service and add your serverless NEG as a backend.

### Routing Rules

Configure routing rules to determine how your traffic is directed.

---

## Connect Your Domain to Your Load Balancer

After the load balancer is created, create an `A` record in your DNS settings to point your domain to the load balancer's IP address.

---

## Test the Load Balancer

Once the load balancer is configured and DNS has propagated, you can send traffic to the load balancer's IP address or your domain to test the setup.

---

## Restrict Ingress on Default Endpoint

To ensure that traffic is routed through the load balancer, set the ingress for your serverless app to "Internal and Cloud Load Balancing".

---

## Additional Configuration Options

### Set up Multi-Region Load Balancing

To improve end-user latency, you can serve your app from multiple regions. This requires using the Premium network tier.

### Use a URL Mask

A URL mask is a template of your URL schema that allows you to point a serverless NEG to multiple services.

### Move Your Custom Domain to Be Served by the External Application Load Balancer

Update your DNS records to route traffic for your custom domain through the load balancer.

### Enable Cloud CDN

Enable Cloud CDN on your backend service to cache content and improve performance.

```bash
gcloud compute backend-services update helloworld-backend-service --enable-cdn --global
```

### Enable IAP on the External Application Load Balancer

Enable Identity-Aware Proxy (IAP) to protect your application.

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --iap=enabled,oauth2-client-id=ID,oauth2-client-secret=SECRET \
    --global
```
> **Note:** IAP is not compatible with Cloud CDN.

### Enable Google Cloud Armor

Cloud Armor provides DDoS protection and configurable security policies.

### Enable Logging and Monitoring

The load balancer exports logs to Cloud Logging and monitoring data to Cloud Monitoring.

### Enable Outlier Detection

Enable outlier detection on your backend service to identify and route traffic away from unhealthy serverless NEGs.