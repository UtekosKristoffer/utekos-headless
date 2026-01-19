# Set up a Regional Internal Application Load Balancer with Cloud Run

This document shows you how to deploy a regional internal Application Load Balancer with a Cloud Run backend.

## Before you begin

*   Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install).
*   Deploy a [Cloud Run service](https://cloud.google.com/run/docs/deploying).
*   Configure [permissions](#permissions).

---

## Configure the Network and Subnets

Create a VPC network and subnets for your load balancer and Envoy proxies.

### Create the VPC Network and Subnet

```bash
gcloud compute networks create lb-network --subnet-mode=custom
gcloud compute networks subnets create lb-subnet --network=lb-network --range=10.1.2.0/24 --region=REGION
```

### Create a Proxy-Only Subnet

```bash
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=REGION --network=lb-network --range=10.129.0.0/23
```

---

## Create the Load Balancer

The load balancer uses a serverless NEG backend to direct requests to a serverless Cloud Run service.

### Create the Serverless NEG

```bash
gcloud compute network-endpoint-groups create SERVERLESS_NEG_NAME \
    --region=REGION \
    --network-endpoint-type=serverless \
    --cloud-run-service=CLOUD_RUN_SERVICE_NAME
```

### Configure the Frontend

Configure the frontend of your load balancer, including the protocol (HTTP or HTTPS), IP address, and port. For HTTPS, you will need an SSL certificate.

### Configure the Backend Services

Create a backend service and add your serverless NEG as a backend.

### Configure Routing Rules

Routing rules determine how your traffic is directed.

---

## Test the Load Balancer

Create a client VM and send requests to the load balancer to test connectivity.

### Create a Client VM

```bash
gcloud compute instances create vm-client --image-family=debian-12 --image-project=debian-cloud --tags=allow-ssh --network=lb-network --subnet=lb-subnet --zone=ZONE
```

### Configure the Firewall Rule

```bash
gcloud compute firewall-rules create fw-allow-ssh --network=lb-network --action=allow --direction=ingress --target-tags=allow-ssh --rules=tcp:22
```

### Send Traffic to the Load Balancer

Connect to the client VM and use `curl` to send requests to the load balancer's IP address.

---

## Additional Configuration Options

*   **Using a URL mask:** Point a serverless NEG to multiple services using a URL mask.
*   **Update client HTTP keepalive timeout:** Adjust the keepalive timeout for your load balancer's frontend.
*   **Deleting a serverless NEG:** Remove a serverless NEG from a backend service.