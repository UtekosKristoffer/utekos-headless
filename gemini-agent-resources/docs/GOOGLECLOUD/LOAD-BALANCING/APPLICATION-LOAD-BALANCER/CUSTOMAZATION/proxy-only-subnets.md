# Proxy-only subnets for Envoy-based load balancers

This page describes how to work with proxy-only subnets used by Envoy-based load
balancers. A **proxy-only subnet** provides a pool of IP addresses that are
reserved exclusively for Envoy proxies used by Google Cloud load balancers.

The proxies terminate incoming connections, evaluate where each request should
go, and then establish a new connection to the appropriate backend. Packets sent
from a proxy to a backend have a source IP address from the proxy-only subnet.

The proxy-only subnet cannot be used for any other purpose. The IP addresses for
the load balancer's forwarding rule and its backends do not come from the
proxy-only subnet.

---

## Supported load balancers and products

Envoy-based Cloud Load Balancing and Secure Web Proxy products require
proxy-only subnets.

- **`purpose=GLOBAL_MANAGED_PROXY`:** In a given VPC network and region, only
  one such subnet can be active. It powers:
  - Cross-region internal Application Load Balancer
  - Cross-region internal proxy Network Load Balancer
- **`purpose=REGIONAL_MANAGED_PROXY`:** In a given VPC network and region, only
  one such subnet can be active. It powers:
  - Regional external Application Load Balancer
  - Regional internal Application Load Balancer
  - Regional external proxy Network Load Balancer
  - Regional internal proxy Network Load Balancer
  - Secure Web Proxy

---

## How proxy-only subnets fit into the load balancer's architecture

The following diagram shows the resources for a regional internal Application
Load Balancer. An Envoy-based deployment requires at least two subnets:

1.  One or more subnets for the load balancer's backend VMs and endpoints.
2.  The proxy-only subnet.

![Regional internal Application Load Balancer numbered components.](https://cloud.google.com/static/load-balancing/docs/images/regional-ilb-components-numbered.svg 'Regional internal Application Load Balancer numbered components (click to enlarge).')

---

## Planning the size of your proxy-only subnet

A proxy-only subnet must provide 64 or more IP addresses (a prefix length of
`/26` or shorter). We recommend starting with a `/23` prefix (512 addresses).

Proxies are allocated at the VPC level. You must create one proxy-only subnet in
each region of a VPC network where you use Envoy-based load balancers. Multiple
load balancers in the same region and VPC share the same proxy-only subnet.

The number of proxies allocated is calculated based on your traffic needs over a
10-minute period, considering bandwidth, new connections, active connections,
and requests per second.

> **Note:** Google Cloud doesn't warn you if your proxy-only subnet runs out of
> IP addresses. You can configure Monitoring to monitor IP address usage.

---

## Create a proxy-only subnet

You must create a new subnet with the appropriate `--purpose`. You cannot reuse
an existing subnet.

To create a proxy-only subnet in the Google Cloud console:

1.  Go to the [VPC networks](https://console.cloud.google.com/vpc/networks)
    page.
2.  Click the name of the VPC network.
3.  Click **Add subnet**.
4.  Enter a **Name**.
5.  Select a **Region**.
6.  Set **Purpose** to either **Regional Managed Proxy** or **Cross-region
    Managed Proxy**.
7.  Enter an **IP address range**.
8.  Click **Add**.

You must also configure a firewall rule for your backends to accept connections
from this subnet.

---

## Change the size or address range of a proxy-only subnet

You cannot expand a proxy-only subnet's IP range directly. Instead, you must
replace it with a new, larger one.

1.  Create a new proxy-only subnet in the same region and VPC, setting its role
    to `BACKUP`.
2.  Adjust ingress firewall rules on your backends to allow connections from
    both the original (`ACTIVE`) and new (`BACKUP`) proxy-only subnets.
3.  Promote the new subnet's role to `ACTIVE`. This automatically demotes the
    original subnet to `BACKUP`. You can specify a draining period to allow
    existing connections to terminate gracefully.
4.  Once the original subnet is drained and no longer used, you can update
    firewall rules to only allow traffic from the new `ACTIVE` subnet and then
    delete the original subnet.

---

## Migrate the purpose of a proxy-only subnet

If you previously created a proxy-only subnet with
`--purpose=INTERNAL_HTTPS_LOAD_BALANCER`, you must migrate its purpose to
`REGIONAL_MANAGED_PROXY` before you can create other Envoy-based load balancers
in the same region. The Google Cloud console prompts you to do this during load
balancer creation. This migration does not cause downtime.

---

## Delete a proxy-only subnet

An `ACTIVE` proxy-only subnet cannot be deleted if there is at least one
regional load balancer in the same region and VPC, or if a `BACKUP` proxy-only
subnet exists.

To delete an active proxy-only subnet:

1.  If a `BACKUP` subnet exists, you must delete it first.
2.  If load balancers exist in the region, you cannot delete the `ACTIVE`
    subnet. You must first promote a `BACKUP` subnet to `ACTIVE` (which demotes
    the current `ACTIVE` to `BACKUP`), wait for connections to drain, and then
    delete the `BACKUP` subnet.

---

## Limitations

- You can't have both an `INTERNAL_HTTPS_LOAD_BALANCER` and a
  `REGIONAL_MANAGED_PROXY` subnet in the same network and region.
- You can create only one `ACTIVE` and one `BACKUP` proxy-only subnet in each
  region per VPC network.
- You cannot create a `BACKUP` subnet unless an `ACTIVE` one already exists.
- During a subnet's connection draining period, you cannot promote a `BACKUP`
  subnet to `ACTIVE`.
- Proxy-only subnets don't support VPC Flow Logs.

---
