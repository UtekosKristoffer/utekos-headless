# IPv6 for Application Load Balancers and proxy Network Load Balancers

This document shows you how IPv6 traffic is handled by Application Load
Balancers and proxy Network Load Balancers. These are proxy load balancers,
meaning incoming client connections are terminated at the load balancer, which
then initiates a new connection to the backend.

Enabling IPv6 for your load balancer has the following benefits:

- **Use a single anycast IPv6 address for multi-region deployments.** You only
  need one load balancer IPv6 address for application instances running across
  multiple regions.
- **Run dual-stack deployments.** To serve both IPv6 and IPv4 clients, create
  two load balancer forwarding rules and IP addresses—one for IPv6 and the other
  for IPv4.
- **Load balance HTTP, HTTPS, HTTP/2, TCP, and SSL/TLS IPv6 client traffic.**
- **Overflow across regions with a single IPv6 load balancer address.** If
  backends in one region are out of resources, the global load balancer
  automatically directs requests to the next closest region.

---

## Load balancer support

For proxy-based load balancers, the connection from the client to the load
balancer and the connection from the load balancer to the backend can be
configured independently.

To enable a load balancer to receive IPv6 connections, you must use an IPv6
address for its forwarding rule. The subsequent connection to the backend uses
IPv4 by default but can be configured to use IPv6 by setting the IP address
selection policy on the backend service.

| Load balancer                                                                                                                                                                              | Connection from clients to load balancer | Connection from load balancer to backends                                                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Global external Application LB**<br>**Global external proxy Network LB**                                                                                                                 | Both IPv4 and IPv6                       | **IPv4 connection:** supported with IPv4-only or dual-stack backends<br>**IPv6 connection:** supported with dual-stack backends\* only |
| **Classic Application LB**<br>**Classic proxy Network LB**                                                                                                                                 | Both IPv4 and IPv6                       | IPv4 connection only                                                                                                                   |
| **Regional external Application LB**<br>**Regional external proxy Network LB**<br>**Regional/Cross-region internal Application LB**<br>**Regional/Cross-region internal proxy Network LB** | Only IPv4                                | **IPv4 connection:** supported with IPv4-only or dual-stack backends<br>**IPv6 connection:** supported with dual-stack backends\* only |

\* Only instance groups and zonal NEGs (with `GCE_VM_IP_PORT` endpoints) can be
configured to be dual-stack.

---

## How IPv6 termination works

IPv6 termination is supported by the global and classic Application Load
Balancers and proxy Network Load Balancers. This lets your backends appear as
IPv6 applications to your IPv6 clients.

![IPv6 termination for load balancing.](https://cloud.google.com/static/load-balancing/docs/images/ipv6-termination-for-https.svg 'IPv6 termination for load balancing (click to enlarge).')

When a user connects to the load balancer through IPv6:

1.  Your load balancer waits for user connections on its IPv6 address.
2.  An IPv6 client connects to the load balancer using IPv6.
3.  The load balancer acts as a reverse proxy, terminates the IPv6 client
    connection, and places the request into an IPv4 or IPv6 connection to a
    backend.
4.  On the reverse path, the load balancer receives the response and places it
    into the IPv6 connection back to the original client.

---

## IPv6 address allocation for load balancer forwarding rules

When you configure an external load balancer, you provide it with one or more
forwarding rules, each with an external, publicly routed IPv4 or IPv6 IP
address. You can use a static IP address or an ephemeral IP address.

Google Cloud allocates a `/64` IPv6 address range to IPv6 forwarding rules. The
load balancer accepts traffic on the full range.

---

## Client IP header with IPv6 termination for external Application Load Balancers

When the load balancer proxies the IPv6 connection, the original source IP is
replaced. To preserve the original client IP for the backend, Google Cloud
provides an `X-Forwarded-For` HTTP header.

The format for requests is as follows:
`X-Forwarded-For: CLIENT_IP_ADDRESS, GLOBAL_FORWARDING_RULE_EXTERNAL_IP_ADDRESSES`

An example `X-Forwarded-For` header:
`X-Forwarded-For: 2001:db8:abcd:1::1234, 2607:f8b0:4005:801::200e`

---

## Convert from IPv4-only to dual-stack

You can convert load balancer resources that use IPv4-only to dual-stack. For
instructions, refer to:

- [Convert Application Load Balancer to IPv6](https://cloud.google.com/load-balancing/docs/ipv6/convert-ipv4-to-ipv6-application-lb)
- [Convert proxy Network Load Balancer to IPv6](https://cloud.google.com/load-balancing/docs/ipv6/convert-ipv4-to-ipv6-proxy-nlb)

---

## Pricing

Forwarding rules for IPv6 termination are provided at no additional cost. You
are not charged for ephemeral IPv6 addresses. Reserved IPv6 addresses are
charged at existing rates. Otherwise, pricing for IPv6 load balancing is the
same as for IPv4. For details, see
[Network pricing](https://cloud.google.com/vpc/network-pricing).

---

## Limitations

- Classic proxy Network Load Balancers and classic Application Load Balancers
  don't support dual-stack backends.
- Regional and cross-region Application and proxy Network Load Balancers don't
  support IPv6 frontends.
- Only VM instance group backends and zonal NEGs with `GCE_VM_IP_PORT` endpoints
  support dual-stack backends.
