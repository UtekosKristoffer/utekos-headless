# Forwarding rules overview

A **forwarding rule** specifies how to route network traffic to the backend
services of a load balancer. It includes an IP address, an IP protocol, and one
or more ports on which the load balancer accepts traffic.

A forwarding rule and its corresponding IP address represent the frontend
configuration of a Google Cloud load balancer.

Depending on the load balancer type:

- Forwarding rules specify a backend service, target proxy, or target pool.
- Forwarding rules and their IP addresses are either internal or external.
- Forwarding rules are either global or regional.

---

## Internal forwarding rules

Internal forwarding rules forward traffic that originates inside a Google Cloud
network.

### Internal Application Load Balancer

- **Protocols:** HTTP, HTTPS, HTTP/2
- **Scope:**
  - **Regional:** Points to a regional target HTTP/HTTPS proxy and has a
    regional internal IP address.
  - **Cross-region:** Points to a global target HTTP/HTTPS proxy and is
    configured with a regional internal IP address.
- **Ports:** Any port number from 1 to 65535.

![Regional internal Application Load Balancer forwarding rule.](https://cloud.google.com/static/load-balancing/docs/images/regional-ilb-forwarding-rule.svg 'Regional internal Application Load Balancer forwarding rule (click to enlarge).')

### Internal proxy Network Load Balancer

- **Protocol:** TCP
- **Scope:**
  - **Regional:** Points to a regional target TCP proxy.
  - **Cross-region:** Points to a global target TCP proxy.
- **Ports:** Any port number from 1 to 65535.

![Regional internal proxy Network Load Balancer forwarding rule.](https://cloud.google.com/static/load-balancing/docs/images/regional-internal-proxy-nlb-forwarding-rule.svg 'Regional internal proxy Network Load Balancer forwarding rule (click to enlarge).')

### Internal passthrough Network Load Balancer

- **Protocols:** TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, GRE
- **Scope:** Regional, points to a regional internal backend service.

![Internal passthrough Network Load Balancer forwarding rule.](https://cloud.google.com/static/load-balancing/docs/images/internal-passthrough-nlb-forwarding-rule.svg 'Internal passthrough Network Load Balancer forwarding rule (click to enlarge).')

---

## External forwarding rules

External forwarding rules accept traffic from client systems that have internet
access.

### External Application Load Balancer

- A forwarding rule points to a target HTTP(S) proxy.
- The IP address and rule scope depend on the load balancer mode and Network
  Service Tiers.
  - **Premium Tier:** Global external Application Load Balancers use a global
    external IP address (IPv4 or IPv6) and a global external forwarding rule.
    Regional external Application Load Balancers use a regional external IPv4
    address and forwarding rule.
  - **Standard Tier:** Classic and regional external Application Load Balancers
    use a regional external IPv4 address and a regional external forwarding
    rule.
- **Ports:** Any port number from 1 to 65535.

![Global external Application Load Balancer forwarding rule.](https://cloud.google.com/static/load-balancing/docs/images/xlb-forwarding-rule.svg 'Global external Application Load Balancer forwarding rule (click to enlarge).')

### External proxy Network Load Balancer

- Offers TCP proxying with optional SSL offload.
- A forwarding rule points to a target TCP or SSL proxy.
- Supports both Premium and Standard Tiers, with IP address and rule scope
  varying accordingly.
- **Ports:** Any port number from 1 to 65535.

![Global external proxy Network Load Balancer forwarding rule.](https://cloud.google.com/static/load-balancing/docs/images/ext-proxy-nlb-forwarding-rule.svg 'Global external proxy Network Load Balancer forwarding rule (click to enlarge).')

### External passthrough Network Load Balancer

- A pass-through load balancer that distributes traffic in a single region.
- Uses a regional external forwarding rule and a regional external IP address.
- **Backend service-based:** The forwarding rule points to a backend service and
  supports TCP, UDP, ESP, GRE, ICMP, and ICMPv6.
- **Target pool-based:** The forwarding rule points to a target pool and
  supports only TCP or UDP.

![External passthrough Network Load Balancer example.](https://cloud.google.com/static/load-balancing/docs/images/network-lb.svg 'External passthrough Network Load Balancer example (click to enlarge).')

---

## IP protocol specifications

Each forwarding rule has an associated IP protocol (default is `TCP`).

| Product                                    | Load balancing scheme                              | IP protocol options           |
| :----------------------------------------- | :------------------------------------------------- | :---------------------------- |
| Application Load Balancer (all types)      | `EXTERNAL_MANAGED`, `EXTERNAL`, `INTERNAL_MANAGED` | `TCP`                         |
| Proxy Network Load Balancer (all types)    | `EXTERNAL_MANAGED`, `EXTERNAL`, `INTERNAL_MANAGED` | `TCP` or `SSL`                |
| External passthrough Network Load Balancer | `EXTERNAL`                                         | `TCP`, `UDP`, or `L3_DEFAULT` |
| Internal passthrough Network Load Balancer | `INTERNAL`                                         | `TCP`, `UDP`, or `L3_DEFAULT` |
| Cloud Service Mesh                         | `INTERNAL_SELF_MANAGED`                            | `TCP`                         |

---

## IP address specifications

A forwarding rule must have an IP address, which can be static or ephemeral.

- **Static:** A single reserved IP address.
- **Ephemeral:** An address that remains constant while the rule exists but may
  change if the rule is deleted and recreated.

---

## Multiple forwarding rules with a common IP address

Two or more forwarding rules can share the same IP address if their ports do not
overlap and, for external rules, their Network Service Tiers match the IP
address's tier.

---

## Port specifications

The valid port configurations depend on the load balancing scheme and the target
of the forwarding rule.

| Product                         | Target               | Port requirements                                         |
| :------------------------------ | :------------------- | :-------------------------------------------------------- |
| Application Load Balancers      | Target HTTP(S) proxy | Exactly one port from 1-65535                             |
| Proxy Network Load Balancers    | Target TCP/SSL proxy | Exactly one port from 1-65535                             |
| External passthrough Network LB | Backend service      | List of up to 5 ports, a single port range, or all ports. |
|                                 | Target pool          | A single contiguous port range.                           |
| Internal passthrough Network LB | Backend service      | Up to 5 ports or all ports.                               |

---

## Use forwarding rules

If you use the Google Cloud console to set up a load balancer, the forwarding
rule is set up implicitly. With the `gcloud` CLI or the API, you must configure
it explicitly. You cannot change the IP address, port number, or protocol of an
existing forwarding rule; you must delete and recreate it.

---

## What's next

- To learn more about protocol forwarding, see
  [Protocol forwarding overview](https://cloud.google.com/load-balancing/docs/protocol-forwarding).
