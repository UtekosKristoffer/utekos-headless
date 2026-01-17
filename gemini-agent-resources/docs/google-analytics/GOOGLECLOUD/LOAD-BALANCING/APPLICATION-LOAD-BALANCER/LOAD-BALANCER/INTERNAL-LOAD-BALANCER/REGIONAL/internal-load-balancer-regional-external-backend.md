# Set up a Regional Internal Application Load Balancer with an External Backend

This guide shows you how to configure a regional internal Application Load Balancer that proxies requests to an external backend.

## Before you begin

*   Familiarize yourself with the [Internet NEG overview](https://cloud.google.com/load-balancing/docs/negs/internet-neg-concepts), including the limitations.
*   Ensure you have the required [permissions](#permissions).

---

## Set up Your External Backend Environment

*   **Configure network endpoints:** Expose your external backend to Google Cloud with an IP:Port combination or a Fully Qualified Domain Name (FQDN) and port.
*   **Allow traffic from Google Cloud:** Allowlist the IP address ranges that Google uses to send requests to external backends.

---

## Set up Your Google Cloud Environment

Create a VPC network, subnets, and a Cloud NAT gateway.

### Create the VPC Network and Subnet

```bash
gcloud compute networks create LB_NETWORK --subnet-mode=custom
gcloud compute networks subnets create LB_SUBNET_NAME --network=LB_NETWORK --range=LB_SUBNET_RANGE --region=REGION
```

### Configure the Proxy-Only Subnet

```bash
gcloud compute networks subnets create PROXY_ONLY_SUBNET_NAME --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=REGION --network=LB_NETWORK --range=PROXY_ONLY_SUBNET_RANGE
```

### Set up a Cloud NAT Gateway

Configure a Cloud NAT gateway to allow your regional internal Application Load Balancer to reach the internet.

### Reserve the Load Balancer's IP Address

```bash
gcloud compute addresses create LB_IP_ADDRESS --region=REGION --subnet=LB_SUBNET_NAME
```

### Set up the Internet NEG

Create an internet NEG with `INTERNET_FQDN_PORT` or `INTERNET_IP_PORT` endpoints.

```bash
gcloud beta compute network-endpoint-groups create INTERNET_NEG_NAME \
    --network-endpoint-type=INTERNET_FQDN_PORT \
    --default-port=DEFAULT_PORT_NUMBER \
    --network=LB_NETWORK \
    --region=REGION
```

---

## Create the Load Balancer

Create the health check, backend service, URL map, target proxy, and forwarding rule.

### Create the Health Check, Backend Service, and URL Map

```bash
gcloud compute health-checks create http HTTP_HEALTH_CHECK_NAME --region=REGION --use-serving-port
gcloud compute backend-services create BACKEND_SERVICE --load-balancing-scheme=INTERNAL_MANAGED --protocol=HTTP --health-checks=HTTP_HEALTH_CHECK_NAME --health-checks-region=REGION --region=REGION
gcloud compute backend-services add-backend BACKEND_SERVICE --network-endpoint-group=INTERNET_NEG_NAME --network-endpoint-group-region=REGION --region=REGION
gcloud compute url-maps create URL_MAP_NAME --default-service=BACKEND_SERVICE --region=REGION
```

### Create the Target Proxy and Forwarding Rule

For HTTP:

```bash
gcloud compute target-http-proxies create TARGET_HTTP_PROXY_NAME --url-map=URL_MAP_NAME --region=REGION
gcloud compute forwarding-rules create HTTP_FORWARDING_RULE_NAME --load-balancing-scheme=INTERNAL_MANAGED --network=LB_NETWORK --subnet=LB_SUBNET_NAME --address=LB_IP_ADDRESS --target-http-proxy=TARGET_HTTP_PROXY_NAME --target-http-proxy-region=REGION --region=REGION --ports=80
```

For HTTPS, you will also need to create an SSL certificate.

---

## Connect Your Domain to Your Load Balancer

After the load balancer is created, create an `A` record in your DNS settings to point your domain to the load balancer's IP address.

---

## Test the Load Balancer

Create a client VM in the same region as the load balancer to test connectivity.

---

## Additional Configuration

*   **Use a custom header to authenticate requests.**
*   **Update client HTTP keepalive timeout.**