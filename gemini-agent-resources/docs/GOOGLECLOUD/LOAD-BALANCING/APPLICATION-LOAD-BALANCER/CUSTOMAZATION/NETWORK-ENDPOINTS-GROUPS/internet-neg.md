# Internet network endpoint groups overview

Cloud Load Balancing supports proxying traffic to external backends outside
Google Cloud. To define an external backend for a load balancer, you use a
resource called an **internet network endpoint group (NEG)**.

You can use this type of deployment when you want to serve content from an
external backend, but you want your Google Cloud load balancer to be the
frontend. This lets you do the following:

- Use Google Edge infrastructure for terminating your user connections.
- Direct the connections to your external backend.
- Deliver traffic to your public endpoint across Google's private backbone,
  which improves reliability and can decrease latency between client and server.
- With global load balancers, you can use Cloud CDN (Content Delivery Network)
  to cache content for your external backend.

_Figure 1 shows an external Application Load Balancer with multiple backend
types, one of which is an external backend configured with an internet NEG._

![Internet network endpoint groups in load balancing.](https://cloud.google.com/static/load-balancing/docs/images/internet-neg-overview.svg 'Internet network endpoint groups in load balancing (click to enlarge).')

Internet NEG backends are supported with various global and regional load
balancers. Depending on your load balancer (global or regional), internet NEG
support differs with respect to DNS, health checking, available number of
endpoints, and traffic routing behaviors.

> **Note:** Cloud Load Balancing also supports connecting to backends
> on-premises or in other cloud environments outside Google Cloud by using
> [hybrid NEGs](https://cloud.google.com/load-balancing/docs/negs/hybrid-neg-concepts).
> However, connections to hybrid NEG endpoints make use of hybrid connectivity.
> In contrast, connections to internet NEG endpoints use the internet while
> keeping your traffic on Google's high performance backbone for the longest
> possible distance, for reduced latency and improved throughput.

---

## Terminology

The following terms are sometimes used interchangeably because they have the
same or similar meanings:

- **external backend:** A backend that resides outside of Google Cloud and is
  reachable across the internet. The endpoint in an internet NEG.
- **custom origin:** Same as an external backend. In CDN, _origin_ is the
  industry-standard term for a backend instance that serves web content.
- **internet network endpoint group (NEG):** The Google Cloud API resource that
  you use to specify an external backend.
- **external endpoint:** Same as an external backend.

This document uses the term **external backend** except when referring to the
internet NEG API resource.

---

## Load balancer components

This section describes the load balancing architecture and resources required to
configure a load balancer with an external backend. The load balancer requires
special configuration only for the backend service. The frontend configuration
is the same as any other load balancer.

The following figures show the Google Cloud resources required to set up a load
balancer with an external backend.

![Global external Application Load Balancer with external backend.](https://cloud.google.com/static/load-balancing/docs/images/internet-neg-global-ext-components.svg 'Global external Application Load Balancer with external backend (click to enlarge).')

> You can only use internet NEGs on the **Premium network service tier**.

### Frontend configuration

No special frontend configuration is required for creating a load balancer with
an internet NEG backend. Forwarding rules are used to route traffic by IP
address, port, and protocol to a target proxy. The target proxy then terminates
connections from clients. Additionally, Envoy-based load balancers require a
proxy-only subnet.

Application Load Balancers also use URL maps to set up URL-based routing of
requests to the appropriate backend services.

For more details about each of these components, refer to the architecture
sections of the respective load balancer:

- [External Application Load Balancer overview](https://cloud.google.com/load-balancing/docs/application/application-load-balancer-overview)
- [Internal Application Load Balancer overview](https://cloud.google.com/load-balancing/docs/l7-internal/ilb-overview)
- [External proxy Network Load Balancer overview](https://cloud.google.com/load-balancing/docs/proxy/network-load-balancer-overview)
- [Internal proxy Network Load Balancer overview](https://cloud.google.com/load-balancing/docs/proxy/internal-proxy-network-load-balancer-overview)

### Internet NEG

An internet NEG is a resource used to define an external backend for the load
balancer. There are two types: **global internet NEG** and **regional internet
NEG**. They differ in scope and behavior. The external backend referenced by a
global internet NEG must be reachable exclusively over the internet.

There are two ways to configure the external endpoint: `INTERNET_FQDN_PORT` or
`INTERNET_IP_PORT`.

#### Global internet NEGs

Global internet NEGs are powered by Google Front End (GFE) technologies. They
use a fixed set of IP addresses for egress traffic, support only one endpoint
per NEG, and one internet NEG per backend service.

| Load balancers                                                                 | Endpoint type        | Endpoint definition                                                                                                                                 | Scope  | Health checks |
| :----------------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :------------ |
| Global external Application Load Balancer<br>Classic Application Load Balancer | `INTERNET_FQDN_PORT` | A publicly resolvable FQDN and optional port.<br>Example: `backend.example.com:443`†.<br>The domain name must be resolvable by Google's public DNS. | Global | Not supported |
|                                                                                | `INTERNET_IP_PORT`   | A publicly routable IP address and optional port.<br>Example: `8.8.8.8:443`.<br>The IP address cannot be an RFC 1918 address.                       |        |               |

† If you don't specify a port, the default is used (80 for HTTP, 443 for
HTTPS/HTTP/2).

#### Regional internet NEGs

Regional internet NEGs are powered by managed Envoy proxies. Each NEG can have
multiple endpoints, and a backend service can include multiple internet NEGs.
For egress traffic, you can configure Cloud NAT gateways.

| Load balancers                                                                                                                                                                               | Endpoint type        | Endpoint definition                                                                                 | Scope    | Health checks                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------- | :------- | :------------------------------ |
| Regional external Application Load Balancer<br>Regional internal Application Load Balancer<br>Regional external proxy Network Load Balancer<br>Regional internal proxy Network Load Balancer | `INTERNET_FQDN_PORT` | A publicly or privately resolvable FQDN and optional port.<br>Example: `backend.example.com:443`\*. | Regional | Envoy distributed health checks |
|                                                                                                                                                                                              | `INTERNET_IP_PORT`   | Only a publicly routable IP address and optional port.<br>Example: `8.8.8.8:443`.                   |          |                                 |

- With regional internet NEGs, you are required to specify a port.

> **Note:** If you're planning a cross-cloud deployment with a regional internet
> NEG, you can use
> [Cloud Location Finder](https://cloud.google.com/location-finder) to identify
> the optimal region or zone for your deployment.

#### DNS resolution for regional INTERNET_FQDN_PORT endpoints

If your domain is resolvable over the internet, no other configuration is
needed. If you're resolving private FQDNs, you'll need to configure Cloud DNS.
The name must be hosted on Cloud DNS or be resolvable using DNS forwarding from
Cloud DNS to an on-premises DNS or DNS peering.

#### IP address resolution for global INTERNET_FQDN_PORT endpoints

When a `INTERNET_FQDN_PORT` endpoint points to a DNS record that returns
multiple IP addresses:

- The load balancer uses a DNS resolver in a Google Cloud region closest to its
  client.
- The load balancer attempts to connect to the first IP address in the DNS
  response. If that IP isn't reachable, it returns an HTTP 502 (Bad Gateway),
  even if other IP addresses are available.

#### IP address resolution for regional INTERNET_FQDN_PORT endpoints

Regional internet NEGs support domain name resolution using both Cloud DNS and
Google's public DNS. If the DNS server returns multiple IP addresses, Envoy load
balances traffic among them based on the configured algorithm.

---

### Backend service

To set up a load balancer with an external backend, you configure the backend
service with an internet NEG backend.

**Considerations:**

- The backend service can't also use other backend types (like zonal NEGs or
  instance groups).
- **Number of NEGs per backend service:**
  - **Global NEGs:** Only one internet NEG backend.
  - **Regional NEGs:** Up to 50 internet NEGs.
- **Number of endpoints per NEG:**
  - **Global NEGs:** Only one endpoint. The load balancer acts as a frontend
    proxy only.
  - **Regional NEGs:** Up to 256 endpoints per NEG. Traffic is pooled and
    balanced using Envoy algorithms.
- The backend service's `loadBalancingScheme` must match the load balancer's
  scheme.
- The backend service protocol must be one of `HTTP`, `HTTPS`, or `HTTP2`.

> We strongly recommend using `HTTPS` or `HTTP/2` as the protocol when
> configuring a backend service with an internet NEG. This allows the load
> balancer to validate the SSL certificate and use the SNI extension during the
> handshake.

---

### Health checks

Your health check configuration varies depending on the type of load balancer:

- **Global external Application Load Balancer and classic Application Load
  Balancer:** Does not support health checks. If the backend is unreachable, the
  load balancer returns an HTTP 502 error.
- **Regional external/internal Application/proxy Network Load Balancers:**
  Health checks are optional. Probes originate from the proxy-only subnet and
  are NAT-translated.
  - These load balancers use **distributed Envoy health checks**.
  - gRPC and PROXY protocol v1 health checks are not supported.
  - You cannot check the health status via the Google Cloud console, API, or
    gcloud CLI; the status will show as `N/A`.
  - You might see an increase in network traffic due to health checking from
    each Envoy proxy.

---

## Enable the external backend to receive requests

### Global NEGs: Allowlist default Google egress IP addresses

You must add the IP address ranges that Google uses to send requests to external
backends to an allowlist. To look up the IP addresses, query the
`_cloud-eoips.googleusercontent.com` DNS TXT record.

### Regional NEGs: Use a Cloud NAT gateway

You must set up a Cloud NAT gateway to allocate a set of IP address ranges from
where Google Cloud traffic should originate. The gateway endpoint type should be
`ENDPOINT_TYPE_MANAGED_PROXY_LB`.

- **Automatically allocated IP addresses:** Use if your backend doesn't require
  specific IP allowlisting.
- **Manually allocated IP addresses:** Use if your backend requires specific IP
  allowlisting.
  > **Warning:** Provisioning fewer NAT IP addresses than the number of assigned
  > Envoy proxies might result in HTTP 5xx errors.

---

## Authenticate requests to the external backend

_(This section applies only to Application Load Balancers.)_

To authenticate requests sent to your external backend, you can do one of the
following:

- **Set a custom header:** Use a custom request header to indicate the request
  came from a Google Cloud load balancer. The implementation varies by load
  balancer type.
- **Enable IAP:** Verify the signed JWT in the request header. IAP is not
  compatible with Cloud CDN and is not supported with proxy Network Load
  Balancers.
- **Enable private origin authentication:** Gives an external Application Load
  Balancer long-term access to a private Amazon S3 bucket or other compatible
  object stores.

---

## Logs

Requests proxied to an external backend are logged to Cloud Logging. If you
enable Cloud CDN for an external Application Load Balancer, cache hits are also
logged.

---

## Header processing with external backends

- **Global external Application Load Balancers and classic Application Load
  Balancers:** Adjusts HTTP headers (coalesces, proper-cases, adds/modifies
  `Via` and `X-Forwarded-For`).
- **Regional external Application Load Balancers and regional internal
  Application Load Balancers:** There is no special header processing.

---

## Limitations

- When you modify a load balancer to change the backend to/from an internet NEG,
  your application experiences a temporary downtime of about 30-90 seconds.
- Certain advanced traffic management features aren't supported with global
  internet NEG backends (request mirroring, retry policies, traffic policies).
- Review the Cloud NAT gateway limitations.

---

## Quotas and limits

For information, see the
[NEG backends quota table](https://cloud.google.com/load-balancing/docs/quotas#neg-backends)
and the
[Endpoints per NEG quota table](https://cloud.google.com/load-balancing/docs/quotas#endpoints-per-neg).

---

## Pricing

- Egress traffic to external internet NEG endpoints is charged at internet
  egress rates for Premium Tier networking.
- If you configured a Cloud NAT gateway, you'll incur Cloud NAT charges.
- For more information, see
  [Cloud Load Balancing pricing](https://cloud.google.com/load-balancing/pricing).
