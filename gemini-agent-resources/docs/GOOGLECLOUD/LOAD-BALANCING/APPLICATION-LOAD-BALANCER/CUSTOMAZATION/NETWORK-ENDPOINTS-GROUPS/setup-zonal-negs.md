# Set up zonal NEGs

This document contains instructions for configuring zonal network endpoint
groups (NEGs). Before you configure zonal NEGs, read
[Network endpoint groups overview](https://cloud.google.com/load-balancing/docs/negs/).

> **Note:** This page describes how to configure a specific load balancer
> component or feature. Before using the information on this page, know the type
> of Google Cloud load balancer that you need.

---

## Zonal NEGs with `GCE_VM_IP` endpoints

These can be used as backends for backend services in internal passthrough
Network Load Balancers and external passthrough Network Load Balancers. For
end-to-end examples, see the following:

- [Set up an internal passthrough Network Load Balancer with zonal NEG backends](https://cloud.google.com/load-balancing/docs/l4-internal/setting-up-zonal-negs)
- [Set up an external passthrough Network Load Balancer with zonal NEG backends](https://cloud.google.com/load-balancing/docs/l4-external/setting-up-zonal-negs)

---

## Zonal NEGs with `GCE_VM_IP_PORT` endpoints

These can be used as backends for backend services in the following types of
load balancers:

- External Application Load Balancer
- Internal Application Load Balancer
- External proxy Network Load Balancer
- Internal proxy Network Load Balancer

End-to-end example:
[Set up a regional internal proxy Network Load Balancer with zonal NEG backends](https://cloud.google.com/load-balancing/docs/l7-internal/setting-up-zonal-negs).

The primary use case for `GCE_VM_IP_PORT` zonal NEGs is container-native load
balancing. There are two ways to configure this: either use NEGs managed by GKE
Ingress, or use standalone NEGs.

For instructions, see:

- [Container-native load balancing through Ingress](https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing)
- [Container-native load balancing through standalone zonal NEGs](https://cloud.google.com/kubernetes-engine/docs/how-to/standalone-negs)

---

## Configuring zonal NEGs

The rest of this page describes how to configure zonal NEGs.

### Create a zonal network endpoint group

1.  Go to the
    [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups)
    in the Google Cloud console.
2.  Click **Create network endpoint group**.
3.  For the **Network endpoint group type**, select **Network endpoint group
    (Zonal)**.
4.  Enter the **Name** of the network endpoint group.
5.  Select the **Endpoints type** depending on the type of load balancer you're
    using.
6.  Select the **Network** and **Subnetwork**.
7.  Select the **Zone**.
8.  For zonal NEGs with `GCE_VM_IP_PORT` endpoints only, enter a **Default
    port**.
9.  Click **Create**.

---

### Add endpoints to a network endpoint group

1.  Go to the
    [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups).
2.  Click the **Name** of the NEG to which you want to add endpoints.
3.  In the **Network endpoints in this group** section, click **Add network
    endpoint**.
4.  Select a **VM instance** to add its internal IP addresses as network
    endpoints.
5.  For zonal NEGs with `GCE_VM_IP_PORT` endpoints only, perform the following
    steps:
    - Enter the **IP address** of the new network endpoint.
    - Select the **Port type**.
    - If you select **Custom**, enter the **Port number**.
6.  To add more endpoints, click **Add network endpoint** and repeat the steps.
7.  After you add all the endpoints, click **Create**.

---

### Add a zonal NEG to a backend service

1.  Go to the
    [Load balancing page](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    in the Google Cloud console.
2.  Click the name of the load balancer whose backend service you want to edit.
3.  Click **Edit**.
4.  Click **Backend configuration**.
5.  Click **Edit** for the backend service.
6.  Click **+Add backend**.
7.  Select a **Zonal network endpoint group** and click **Done**.
8.  Click **Update**.

---

### Remove a NEG from a backend service

1.  Go to the
    [Load balancing page](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list).
2.  Click the name of the load balancer.
3.  Click **Edit**.
4.  Click **Backend configuration**.
5.  Click **Edit** for the backend service from which you are removing the NEG.
6.  In the **Backend** section, locate the NEG you want to remove and click the
    **trash can icon**.
7.  Click **Update**.

---

### Remove endpoints from a network endpoint group

> When a network endpoint is removed, it triggers connection draining based on
> the drain parameters specified in the backend service.

1.  Go to the
    [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups).
2.  Click the **Name** of the NEG.
3.  Select the network endpoints you want to delete and click **Remove
    endpoint**.

---

### Other operations

- **List network endpoint groups:** Go to the
  [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups).
- **Describe a specific network endpoint group:** Go to the
  [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups)
  and click the name of the NEG.
- **Remove network endpoint groups:**
  > A NEG cannot be deleted if it is attached to a backend service. Ensure it is
  > detached first.
  1.  First, remove the NEG from the backend service (see previous section).
  2.  Go to the
      [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups).
  3.  Locate the NEG you want to delete and click the **trash can icon**.
- **List endpoints in a network endpoint group:** Go to the
  [Network Endpoint Groups page](https://console.cloud.google.com/compute/networkendpointgroups)
  and click the name of the NEG.

---

### Health checking network endpoints

Backend services with zonal NEG backends must use a health check whose port
specification is either:

- a fixed (numbered) port (`--port`)
- configured to use the serving port of the network endpoint
  (`--use-serving-port`)

The following `gcloud` example creates an HTTP health check that uses the
serving port:

```bash
gcloud compute health-checks create http HTTP_HEALTH_CHECK_NAME \
    --use-serving-port
```

> You cannot use a legacy health check with a zonal NEG backend. For more
> information, see
> [Health Check Concepts](https://cloud.google.com/load-balancing/docs/health-check-concepts).
