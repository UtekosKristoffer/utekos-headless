# Enable connection draining

> **Note:** This page describes how to configure a specific load balancer
> component. Before using this information, know the type of Google Cloud load
> balancer that you need.

Connection draining is a process that ensures that existing, in-progress
requests are given time to complete when a virtual machine (VM) instance is
removed from an instance group or when an endpoint is removed from a zonal
network endpoint group (NEG).

The information on this page applies only to instance groups and the following
types of zonal NEGs:

- Zonal NEG
- Hybrid connectivity NEG

Connection draining begins whenever you do the following:

- You manually remove a VM from an instance group.
- You remove an instance from a managed instance group by performing a
  `resize()`, `deleteInstances()`, `recreateInstances()`, or
  `abandonInstances()` call.
- You remove a Dynamic NIC from a VM that is part of an instance group backend.
- You remove an instance group or NEG from a backend service (not supported for
  passthrough Network Load Balancers).
- Google Cloud deletes an instance as part of autoscaling.
- You perform an update to the managed instance group using the Managed Instance
  Group Updater.
- You manually remove an endpoint from a zonal NEG.

> Connection draining doesn't apply when you disconnect a backend from a load
> balancer's backend service.

---

## How connection draining works

To enable connection draining, you set a **connection draining timeout** on the
backend service. The timeout duration must be from **0 to 3600 seconds**.

- It can take up to 60 seconds after your specified timeout duration has passed
  for the instance to be terminated.

### Specifications

- Connection draining is available for backend services that are part of the
  following load balancers:
  - External Application Load Balancer
  - Internal Application Load Balancer
  - External proxy Network Load Balancer
  - Internal proxy Network Load Balancer
  - Internal passthrough Network Load Balancer
  - Backend service-based External passthrough Network Load Balancer
- Passthrough Network Load Balancers support connection draining for TCP, UDP,
  and other non-TCP protocols.
- Connection draining is also available for Cloud Service Mesh deployments.

When a connection draining timeout is set and an instance or endpoint is
removed, the load balancers and Cloud Service Mesh behave as follows:

- **No new connections** are sent to the removed instance or endpoint.
- **Application Load Balancers:** For the specified timeout duration, existing
  requests are given time to complete. After the timeout, all traffic stops.
- **Proxy Network Load Balancers:** For the specified timeout duration, existing
  TCP connections continue to work. After the timeout, existing TCP connections
  remain active, and the proxy closes all existing TCP connections within 10
  minutes (the default idle timeout).
- **Passthrough Network Load Balancers:** For the specified timeout duration,
  packets belonging to existing connections are still routed to the removed
  VM/endpoint. After the timeout, the conntrack entry is removed.

If you enable connection draining on multiple backend services that share the
same backends, the **largest timeout value is used**.

If you don't set a timeout or set it to `0`, existing connections are ended as
quickly as possible.

> If you're using connection pooling, you might see new requests, using a
> previously established connection, still being received on draining VMs, which
> can cause connection errors when those VMs are eventually deleted.

---

## Enable connection draining

To enable connection draining, complete the following steps using the Google
Cloud console:

### Update a load balancer

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  For the load balancer you want to update, click **Edit**.
3.  Click **Backend configuration**.
4.  In the **Backend configuration** pane, click **edit**.
5.  At the bottom of the **Edit backend service** pane, click **Advanced
    configurations**.
6.  In the **Connection draining timeout** field, enter a value from **0** to
    **3600**. A setting of `0` disables connection draining.

### Update Cloud Service Mesh

1.  Go to the
    [Cloud Service Mesh](https://console.cloud.google.com/net-services/servicemesh)
    page.
2.  Click the **Name** of your service.
3.  On the **Service details** page, click **Edit**.
4.  At the bottom of your service, click **Advanced configurations**.
5.  In the **Connection draining timeout** field, enter a value from **0** to
    **3600**.
6.  Click **Save**.

---

## What's next

- For general information on backend services, see
  [Backend services overview](https://cloud.google.com/load-balancing/docs/backend-service).
