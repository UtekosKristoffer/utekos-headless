# Set up a Cross-Region Internal Application Load Balancer with Cloud Storage Buckets

This document shows you how to create a cross-region internal Application Load Balancer to route requests for static content to Cloud Storage buckets.

## Before you begin

*   Install the Google Cloud CLI.
*   Ensure you have the required [permissions](#permissions).
*   Set up an [SSL certificate resource](#set-up-an-ssl-certificate-resource) for HTTPS.

---

## Setup Overview

This example creates a cross-region internal Application Load Balancer with two backend buckets, each referencing a Cloud Storage bucket in a different region.

---

## Configure the Network and Subnets

Create a VPC network and subnets for the load balancer's forwarding rules and Envoy proxies.

### Create the VPC Network and Subnets

```bash
gcloud compute networks create lb-network --subnet-mode=custom
gcloud compute networks subnets create subnet-us --network=lb-network --range=10.1.2.0/24 --region=us-east1
gcloud compute networks subnets create subnet-asia --network=lb-network --range=10.1.3.0/24 --region=asia-east1
```

### Create the Proxy-Only Subnets

```bash
gcloud compute networks subnets create proxy-only-subnet-us --purpose=GLOBAL_MANAGED_PROXY --role=ACTIVE --region=us-east1 --network=lb-network --range=10.129.0.0/23
gcloud compute networks subnets create proxy-only-subnet-asia --purpose=GLOBAL_MANAGED_PROXY --role=ACTIVE --region=asia-east1 --network=lb-network --range=10.130.0.0/23
```

---

## Configure Your Cloud Storage Buckets

Create two Cloud Storage buckets and make them publicly readable.

### Create the Buckets

```bash
gcloud storage buckets create gs://BUCKET1_NAME --location=us-east1
gcloud storage buckets create gs://BUCKET2_NAME --location=asia-east1
```

### Make the Buckets Publicly Readable

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET1_NAME --member=allUsers --role=roles/storage.objectViewer
gcloud storage buckets add-iam-policy-binding gs://BUCKET2_NAME --member=allUsers --role=roles/storage.objectViewer
```

---

## Configure the Load Balancer with Backend Buckets

Create the backend buckets, URL map, target proxy, and forwarding rules.

### Create the Backend Buckets

```bash
gcloud compute backend-buckets create backend-bucket-cats --gcs-bucket-name=BUCKET1_NAME --load-balancing-scheme=INTERNAL_MANAGED
gcloud compute backend-buckets create backend-bucket-dogs --gcs-bucket-name=BUCKET2_NAME --load-balancing-scheme=INTERNAL_MANAGED
```

### Create the URL Map

```bash
gcloud compute url-maps create lb-map --default-backend-bucket=backend-bucket-cats --global
gcloud compute url-maps add-path-matcher lb-map --path-matcher-name=path-matcher-pets --new-hosts='*' --backend-bucket-path-rules="/love-to-fetch/*=backend-bucket-dogs" --default-backend-bucket=backend-bucket-cats
```

### Create the Target Proxy

For HTTP:
```bash
gcloud compute target-http-proxies create http-proxy --url-map=lb-map --global
```

For HTTPS:
```bash
gcloud compute target-https-proxies create https-proxy --url-map=lb-map --certificate-manager-certificates=CERTIFICATE_NAME --global
```

### Create the Forwarding Rules

For HTTP:
```bash
gcloud compute forwarding-rules create http-fw-rule-1 --load-balancing-scheme=INTERNAL_MANAGED --network=lb-network --subnet=subnet-us --ports=80 --target-http-proxy=http-proxy --global
gcloud compute forwarding-rules create http-fw-rule-2 --load-balancing-scheme=INTERNAL_MANAGED --network=lb-network --subnet=subnet-asia --ports=80 --target-http-proxy=http-proxy --global
```

For HTTPS:
```bash
gcloud compute forwarding-rules create https-fw-rule-1 --load-balancing-scheme=INTERNAL_MANAGED --network=lb-network --subnet=subnet-us --address=RESERVED_IP_ADDRESS --ports=443 --target-https-proxy=https-proxy --global
gcloud compute forwarding-rules create https-fw-rule-2 --load-balancing-scheme=INTERNAL_MANAGED --network=lb-network --subnet=subnet-asia --address=RESERVED_IP_ADDRESS --ports=443 --target-https-proxy=https-proxy --global
```

---

## Send an HTTP Request to the Load Balancer

Create a client VM and send requests to the load balancer's forwarding rule IP addresses to test the setup.

---

## Test High Availability

Delete one of the forwarding rules to simulate a regional outage and verify that traffic is routed to the other region.
