# Set up a Regional External Proxy Network Load Balancer with Zonal NEG Backends

This guide shows you how to set up a regional external proxy Network Load Balancer with a zonal network endpoint group (NEG) backend.

## Before you begin

- Review the [External proxy Network Load Balancer overview](https://cloud.google.com/load-balancing/docs/l4-external-proxy) and [Zonal NEGs overview](https://cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts).

---

## Permissions

To follow this guide, you need to be a project Owner or Editor, or have the `compute.networkAdmin`, `compute.securityAdmin`, and `compute.instanceAdmin` IAM roles.

---

## Configure the Network and Subnets

Create a VPC network, a subnet for the backends, and a proxy-only subnet.

### Create the Network and Backend Subnet

```bash
gcloud compute networks create lb-network --subnet-mode=custom
gcloud compute networks subnets create backend-subnet --network=lb-network --range=10.1.2.0/24 --region=REGION_A
```

### Create the Proxy-Only Subnet

```bash
gcloud compute networks subnets create proxy-only-subnet --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE --region=REGION_A --network=lb-network --range=10.129.0.0/23
```

### Create Firewall Rules

Create firewall rules to allow health checks, SSH traffic, and traffic from the proxy-only subnet.

---

## Reserve the Load Balancer's IP Address

```bash
gcloud compute addresses create ADDRESS_NAME --region=REGION_A --network-tier=STANDARD
```

---

## Set up the Zonal NEG

Create VMs and then create a zonal NEG, adding the VMs' network endpoints to the NEG.

### Create VMs

Create the backend VMs for your load balancer.

### Create the Zonal NEGs and Add Endpoints

```bash
gcloud compute network-endpoint-groups create zonal-neg-a --network-endpoint-type=GCE_VM_IP_PORT --zone=ZONE_A --network=lb-network --subnet=backend-subnet
gcloud compute network-endpoint-groups update zonal-neg-a --zone=ZONE_A --add-endpoint='instance=vm-a1,port=80' --add-endpoint='instance=vm-a2,port=80'
```

---

## Configure the Load Balancer

Create the health check, backend service, target proxy, and forwarding rule.

```bash
gcloud compute health-checks create tcp tcp-health-check --region=REGION_A --use-serving-port
gcloud compute backend-services create external-tcp-proxy-bs --load-balancing-scheme=EXTERNAL_MANAGED --protocol=TCP --region=REGION_A --health-checks=tcp-health-check --health-checks-region=REGION_A
gcloud compute backend-services add-backend external-tcp-proxy-bs --network-endpoint-group=zonal-neg-a --network-endpoint-group-zone=ZONE_A --balancing-mode=CONNECTION --max-connections-per-endpoint=50 --region=REGION_A
gcloud compute target-tcp-proxies create ext-tcp-target-proxy --backend-service=external-tcp-proxy-bs --region=REGION_A
gcloud compute forwarding-rules create ext-tcp-forwarding-rule --load-balancing-scheme=EXTERNAL_MANAGED --network=lb-network --network-tier=STANDARD --address=ext-tcp-ip-address --ports=9090 --region=REGION_A --target-tcp-proxy=ext-tcp-target-proxy --target-tcp-proxy-region=REGION_A
```

---

## Test Your Load Balancer

Send traffic to the load balancer's IP address to test the setup.

```bash
curl -m1 LB_IP_ADDRESS:9090
```
