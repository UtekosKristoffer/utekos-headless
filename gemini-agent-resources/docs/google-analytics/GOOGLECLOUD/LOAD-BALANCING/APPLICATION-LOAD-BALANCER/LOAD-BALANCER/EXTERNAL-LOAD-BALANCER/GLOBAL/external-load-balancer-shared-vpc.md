# Set up a Global External Application Load Balancer with Shared VPC

This document shows you how to set up a global external Application Load Balancer with VM instance group backends in a Shared VPC environment.

## Before you begin

*   Read the [Shared VPC overview](https://cloud.google.com/vpc/docs/shared-vpc).
*   Read the [External Application Load Balancer overview](https://cloud.google.com/load-balancing/docs/l7-external), including the [Shared VPC architecture](https://cloud.google.com/load-balancing/docs/l7-external#shared_vpc_architecture) section.

---

## Permissions Required

Setting up a load balancer on a Shared VPC network requires initial setup by an administrator. After that, a service project owner can deploy load balancers.

---

## Prerequisites

This section describes how to configure the network and subnets in the host project and set up Shared VPC.

### Configure the Network and Subnets in the Host Project

Create a VPC network and a subnet for the load balancer's backends in the host project.

```bash
gcloud compute networks create lb-network --subnet-mode=custom
gcloud compute networks subnets create lb-backend-subnet \
    --network=lb-network \
    --range=10.1.2.0/24 \
    --region=us-west1
```

### Configure Firewall Rules in the Host Project

Create a firewall rule to allow health checks from Google Cloud.

```bash
gcloud compute firewall-rules create fw-allow-health-check \
   --network=lb-network \
   --action=allow \
   --direction=ingress \
   --source-ranges=130.211.0.0/22,35.191.0.0/16 \
   --target-tags=load-balanced-backend \
   --rules=tcp
```

### Set up Shared VPC in the Host Project

Enable a Shared VPC host project, share subnets, and attach service projects to the host project.

---

## Configure a Load Balancer in One Service Project

This section describes how to create all load balancing components and backends in a single service project.

### Create a Managed Instance Group Backend

Create an instance template and a managed instance group in the service project.

```bash
gcloud compute instance-templates create backend-template # ...
gcloud compute instance-groups managed create lb-backend # ...
```

### Create a Health Check

Create a health check for the load balancer's backends.

```bash
gcloud compute health-checks create http lb-health-check --use-serving-port
```

### Reserve the Load Balancer's IP Address

Reserve a global static external IP address.

```bash
gcloud compute addresses create lb-ipv4-1 --ip-version=IPV4 --network-tier=PREMIUM --global
```

### Set up an SSL Certificate Resource

For HTTPS load balancing, create a Google-managed or self-managed SSL certificate.

### Configure the Load Balancer

Create the backend service, URL map, target proxy, and forwarding rule.

---

## Configure a Load Balancer with a Cross-Project Backend Service

This section shows you how to configure a load balancer where the frontend components are in one service project and the backend service and backends are in another.

### Configure the Load Balancer's Backend Components in Service Project B

Create the managed instance group, health check, and global backend service in service project B.

### Configure the Load Balancer's Frontend Components in Service Project A

Create the IP address, SSL certificate, URL map, target proxy, and forwarding rule in service project A.

### Grant Permissions to Use the Backend Service

The Load Balancer Admin in service project A needs the `compute.backendServices.use` permission on the backend service in service project B.

---

## Test the Load Balancer

Once the load balancer is configured, you can send traffic to the load balancer's IP address to test the setup.