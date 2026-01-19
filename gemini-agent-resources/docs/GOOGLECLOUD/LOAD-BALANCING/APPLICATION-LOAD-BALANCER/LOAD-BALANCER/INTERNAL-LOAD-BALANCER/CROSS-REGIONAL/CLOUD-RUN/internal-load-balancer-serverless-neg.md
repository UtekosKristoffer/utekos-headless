# Set up a Cross-Region Internal Application Load Balancer with Cloud Run

This document shows you how to deploy a cross-region internal Application Load Balancer with a Cloud Run backend.

## Before you begin

*   Familiarize yourself with the [Internal Application Load Balancer overview](https://cloud.google.com/load-balancing/docs/l7-internal), [VPC firewall rules](https://cloud.google.com/vpc/docs/firewalls), and the [Serverless network endpoint groups overview](https://cloud.google.com/load-balancing/docs/negs/serverless-negs).
*   Deploy a Cloud Run service and restrict its ingress to internal traffic.
*   Create a [Certificate Manager SSL certificate resource](https://cloud.google.com/certificate-manager/docs/overview).
*   Ensure you have the required [permissions](#permissions).

---

## Setup Overview

This example creates a cross-region internal Application Load Balancer in a VPC network, with one backend service and two Cloud Run deployments in different regions.

---

## Configure the Network and Subnets

Create a VPC network and subnets for your backends and Envoy proxies.

### Create the VPC Network and Backend Subnets

```bash
gcloud compute networks create NETWORK --subnet-mode=custom
gcloud compute networks subnets create SUBNET_A --network=NETWORK --range=10.1.2.0/24 --region=REGION_A
gcloud compute networks subnets create SUBNET_B --network=NETWORK --range=10.1.3.0/24 --region=REGION_B
```

### Create the Proxy-Only Subnets

```bash
gcloud compute networks subnets create PROXY_SN_A --purpose=GLOBAL_MANAGED_PROXY --role=ACTIVE --region=REGION_A --network=NETWORK --range=10.129.0.0/23
gcloud compute networks subnets create PROXY_SN_B --purpose=GLOBAL_MANAGED_PROXY --role=ACTIVE --region=REGION_B --network=NETWORK --range=10.130.0.0/23
```

---

## Create the Serverless NEGs

Create a serverless NEG for each Cloud Run service.

```bash
gcloud compute network-endpoint-groups create gl7ilb-serverless-neg-a --region=REGION_A --network-endpoint-type=serverless --cloud-run-service=CLOUD_RUN_SERVICE_NAMEA
gcloud compute network-endpoint-groups create gl7ilb-serverless-neg-b --region=REGION_B --network-endpoint-type=serverless --cloud-run-service=CLOUD_RUN_SERVICE_NAMEB
```

---

## Configure the Load Balancer

Create the backend service, URL map, target proxy, and forwarding rules.

### Create the Backend Service

```bash
gcloud compute backend-services create gil7-backend-service --load-balancing-scheme=INTERNAL_MANAGED --protocol=HTTP --global
gcloud compute backend-services add-backend gil7-backend-service --network-endpoint-group=gl7ilb-serverless-neg-a --network-endpoint-group-region=REGION_A --global
gcloud compute backend-services add-backend gil7-backend-service --network-endpoint-group=gl7ilb-serverless-neg-b --network-endpoint-group-region=REGION_B --global
```

### Create the URL Map

```bash
gcloud compute url-maps create gil7-map --default-service=gil7-backend-service --global
```

### Create the Target Proxy

For HTTP:
```bash
gcloud compute target-http-proxies create gil7-http-proxy --url-map=gil7-map --global
```

For HTTPS:
```bash
gcloud compute target-https-proxies create gil7-https-proxy --url-map=gil7-map --certificate-manager-certificates=gilb-certificate
```

### Create the Forwarding Rules

Create two forwarding rules, one in each region.

For HTTP:
```bash
gcloud compute forwarding-rules create gil7-forwarding-rule-a --load-balancing-scheme=INTERNAL_MANAGED --network=NETWORK --subnet=SUBNET_B --address=10.1.3.99 --ports=80 --target-http-proxy=gil7-http-proxy --global
gcloud compute forwarding-rules create gil7-forwarding-rule-b --load-balancing-scheme=INTERNAL_MANAGED --network=NETWORK --subnet=SUBNET_A --address=10.1.2.99 --ports=80 --target-http-proxy=gil7-http-proxy --global
```

For HTTPS:
```bash
gcloud compute forwarding-rules create gil7-forwarding-rule-a --load-balancing-scheme=INTERNAL_MANAGED --network=NETWORK --subnet=SUBNET_B --address=10.1.3.99 --ports=443 --target-https-proxy=gil7-https-proxy --global
gcloud compute forwarding-rules create gil7-forwarding-rule-b --load-balancing-scheme=INTERNAL_MANAGED --network=NETWORK --subnet=SUBNET_A --address=10.1.2.99 --ports=443 --target-https-proxy=gil7-https-proxy --global
```

---

## Test the Load Balancer

Create a client VM and send requests to the load balancer to test connectivity and failover.

---

## Additional Configuration Options

*   **URL Mask:** Use a URL mask to point a serverless NEG to multiple services.
*   **DNS Routing Policies:** Use DNS routing policies to route client traffic to the closest load balancer VIP.
*   **Outlier Detection:** Enable outlier detection to identify and avoid unhealthy serverless NEGs.
