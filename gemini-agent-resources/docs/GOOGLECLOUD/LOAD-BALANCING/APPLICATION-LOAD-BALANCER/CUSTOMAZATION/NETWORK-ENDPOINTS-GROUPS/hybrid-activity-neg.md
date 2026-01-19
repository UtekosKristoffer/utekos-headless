# Hybrid connectivity network endpoint groups overview

Cloud Load Balancing supports load-balancing traffic to endpoints that extend
beyond Google Cloud, such as on-premises data centers and other public clouds
that you can use hybrid connectivity to reach.

A hybrid strategy is a pragmatic solution for you to adapt to changing market
demands and incrementally modernize your applications. This could be a temporary
hybrid deployment to enable migration to a modern cloud-based solution or a
permanent fixture of your organization's IT infrastructure.

Setting up hybrid load balancing also lets you bring the benefits of Cloud Load
Balancing's networking capabilities to services running on your existing
infrastructure outside of Google Cloud.

Hybrid load balancing is supported on the following Google Cloud load balancers:

- **External Application Load Balancers:** global external Application Load
  Balancers, classic Application Load Balancers, and regional external
  Application Load Balancers
- **Internal Application Load Balancers:** cross-region internal Application
  Load Balancers and regional internal Application Load Balancers
- **External proxy Network Load Balancers:** global external proxy Network Load
  Balancers, classic proxy Network Load Balancers, and regional external proxy
  Network Load Balancers
- **Internal proxy Network Load Balancers:** regional internal proxy Network
  Load Balancers and cross-region internal proxy Network Load Balancers

On-premises and other cloud services are treated like any other Cloud Load
Balancing backend. The key difference is that you use a **hybrid connectivity
NEG** to configure the endpoints of these backends. The endpoints must be valid
`IP:port` combinations that your load balancer can reach by using hybrid
connectivity products such as Cloud VPN, Cloud Interconnect, or Router appliance
VMs.

---

## Use-case: Routing traffic to an on-premises location or another cloud

The simplest use case for using hybrid NEGs is routing traffic from a Google
Cloud load balancer to an on-premises location or to another cloud environment.
Clients can originate traffic either from the public internet, from within
Google Cloud, or from an on-premises client.

> **Note:** Hybrid connectivity NEGs are configured only within a specific zone.
> If you require regional availability, you can use a regional internet NEG as a
> workaround. By creating a regional internet NEG with an `INTERNET_FQDN_PORT`
> endpoint type, you can use a fully qualified domain name (FQDN) that resolves
> to a private IP address through a private Cloud DNS zone. This approach allows
> the load balancer to route traffic to your private on-premises or multi-cloud
> backends at a regional level, avoiding a single zonal dependency. For more
> details, see the documentation for Internet NEGs.

### Public clients

You can use an external Application Load Balancer with a hybrid NEG backend to
route traffic from external clients to a backend on-premises or in another cloud
network. You can also enable the following value-added networking capabilities
for your services:

With the **global external Application Load Balancer** and **classic Application
Load Balancer**, you can:

- Use Google's global edge infrastructure to terminate user connections closer
  to the user, thus decreasing latency.
- Protect your service with Google Cloud Armor, an edge DDoS defense/WAF
  security product.
- Enable your service to optimize delivery using Cloud CDN.
- Use Google-managed SSL certificates.

The following diagram demonstrates a hybrid deployment with an external
Application Load Balancer.

_Hybrid connectivity with a global external Application Load Balancer (click to
enlarge)._

With the **regional external Application Load Balancer**, you can route external
traffic to endpoints that are within the same Google Cloud region as the load
balancer's resources.

How the request is routed depends on how your URL map is configured. If the
selected backend service has been configured with a hybrid connectivity NEG, the
load balancer forwards the traffic across Cloud VPN, Cloud Interconnect, or
Router appliance VMs, to its intended external destination.

### Internal clients (within Google Cloud or on-premises)

You can also set up a hybrid deployment for clients internal to Google Cloud. In
this case, client traffic originates from the Google Cloud VPC network, your
on-premises network, or from another cloud, and is routed to endpoints
on-premises or in other cloud networks.

The following diagram demonstrates a hybrid deployment with a regional internal
Application Load Balancer.

_Hybrid connectivity with regional internal Application Load Balancers (click to
enlarge)._

---

## Use-case: Migrate to Cloud

Migrating an existing service to the cloud lets you free up on-premise capacity
and reduce the cost and burden of maintaining on-premise infrastructure. You can
temporarily set up a hybrid deployment that lets you route traffic to both your
current on-premises service and a corresponding Google Cloud service endpoint.

The following diagram demonstrates this setup with an internal Application Load
Balancer.

_Migrate to Google Cloud (click to enlarge)._

If you are using an internal Application Load Balancer, you can configure it to
use weight-based traffic splitting to split traffic across the two services.
This lets you gradually increase the proportion of traffic sent to the Google
Cloud service.

---

## Hybrid architecture

This section describes the load balancing architecture and resources required to
configure a hybrid load balancing deployment. The key difference is that you use
a **hybrid connectivity NEG** to configure the endpoints of these backends.

The following diagrams show the Google Cloud resources required.

**Global external HTTP(S)** _Global external Application Load Balancer resources
for hybrid connectivity (click to enlarge)._

**Regional external HTTP(S) / Regional internal HTTP(S) / Regional internal
proxy** _Regional external Application Load Balancer resources for hybrid
connectivity (click to enlarge)._

### Regional versus global

- **External Application Load Balancer and external proxy Network Load
  Balancer:** Can be configured for either global or regional routing.
- **Cross-region internal Application Load Balancer and cross-region internal
  proxy Network Load Balancer:** Multi-region load balancers for globally
  distributed backend services.
- **Regional internal Application Load Balancer and regional internal proxy
  Network Load Balancer:** Regional load balancers that route traffic to
  endpoints within the same region as the load balancer.

---

## Network connectivity requirements

Before you configure a hybrid load balancing deployment, you must have the
following resources set up:

- **Google Cloud VPC network:** On-premises, other cloud, and Google Cloud
  subnet IP addresses and IP address ranges must not overlap.
- **Hybrid connectivity:** Your Google Cloud and on-premises/other cloud
  environments must be connected via Cloud Interconnect, Cloud VPN tunnels with
  Cloud Router, or Router appliance VMs.
  - We recommend a high availability connection.
  - A Cloud Router with **global dynamic routing** must be enabled. Regional
    dynamic routing and static routes are not supported.
  - The Cloud Router must advertise specific routes to your on-premises
    environment (Google's health check ranges and the region's proxy-only subnet
    range).
- **Network endpoints (`IP:Port`) on-premises or in other clouds:** One or more
  routable `IP:Port` network endpoints.
- **Firewall rules on your on-premises or other cloud:**
  - Ingress allow rules for Google's health-checking probes (`35.191.0.0/16` and
    `130.211.0.0/22`).
  - Ingress allow rules for the load-balanced traffic to reach the endpoints.
  - For Envoy-based load balancers, an additional firewall rule to allow traffic
    from the region's proxy-only subnet.

---

## Load balancer components

A hybrid load balancer requires special configuration only for the backend
service. Envoy-based load balancers also require a proxy-only subnet.

### Frontend configuration

No special frontend configuration is required. Forwarding rules route traffic to
a target proxy, and URL maps (for HTTP(S) load balancers) route requests to
backend services.

### Backend service

To set up a hybrid deployment, you configure the load balancer with backends
both within and outside of Google Cloud.

#### Non-Google Cloud backends (on-premise or other cloud)

- Add each non-Google Cloud network endpoint's `IP:Port` combination to a
  **hybrid connectivity NEG** with an endpoint type of
  `NON_GCP_PRIVATE_IP_PORT`.
- While creating the NEG, specify a Google Cloud zone that minimizes the
  geographic distance to your external environment.
- Add this hybrid connectivity NEG as a backend for the backend service.

#### Google Cloud backends

- Create a separate backend service for the Google Cloud backends.
- Configure multiple backends (either `GCE_VM_IP_PORT` zonal NEGs or instance
  groups) within the same region where you have set up hybrid connectivity.

#### Additional points for consideration:

- You can use a single backend service to reference both Google Cloud-based
  backends (zonal NEGs) and on-premises/other cloud backends (hybrid
  connectivity NEGs). No other combination of mixed backend types is allowed.
- The backend service's `loadBalancingScheme` must be `EXTERNAL_MANAGED`,
  `EXTERNAL`, `INTERNAL_MANAGED`, or `INTERNAL_SELF_MANAGED` depending on the
  load balancer.
- The balancing mode for the hybrid NEG backend must be `RATE` for Application
  Load Balancers, and `CONNECTION` for proxy Network Load Balancers.

---

## Health Checks

### Centralized health checks

- Required for global external Application Load Balancers, classic Application
  Load Balancers, and global/classic external proxy Network Load Balancers.
- Requires firewall rules on your on-premises/other cloud networks to allow
  traffic from Google's health check probe ranges (`35.191.0.0/16` and
  `130.211.0.0/22`).

### Distributed Envoy health checks

- Used by regional external/internal Application Load Balancers, regional
  external/internal proxy Network Load Balancers, and cross-region internal
  proxy/Application Load Balancers.
- Probes originate from the Envoy proxies in the region's proxy-only subnet.
- You must create firewall rules in the external environment to allow traffic
  from the proxy-only subnet to your external backends.

**Points to note:**

- gRPC and PROXY protocol v1 health checks are not supported.
- If using mixed NEGs in one backend service, you need firewall rules for both
  centralized (for Google Cloud endpoints) and distributed (for hybrid
  endpoints) health checks.
- You cannot check the health status of external endpoints via the Google Cloud
  console, API, or gcloud CLI; the status will show as `N/A`.
- You might see an increase in network traffic due to health checking from each
  Envoy proxy.

---

## Limitations

- The Cloud Router must be enabled with **global dynamic routing**. Regional
  dynamic routing and static routes are not supported.
- For regional load balancers, hybrid connectivity must be configured in the
  same region as the load balancer.
- Review the security settings on your hybrid connectivity configuration (HA VPN
  is encrypted by default, Cloud Interconnect is not).

---

## Logging

Requests proxied to an endpoint in a hybrid NEG are logged to Cloud Logging in
the same way that requests for other backends are logged.

---

## Quota

You can configure as many hybrid NEGs with network endpoints as permitted by
your existing network endpoint group quota.
