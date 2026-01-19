# Advanced load balancing optimizations

This page describes how to configure advanced cost, latency, and resiliency
optimizations for Application Load Balancers and Proxy Network Load Balancers.
Cloud Service Mesh also supports these optimizations.

Cloud Load Balancing offers the following advanced features:

- **Service load balancing policy (`serviceLbPolicy`):** A resource associated
  with the load balancer's backend service that lets you customize:
  - **Load balancing algorithms:** Customize how traffic is distributed within a
    region or zone.
  - **Auto-capacity draining:** Quickly drain traffic from unhealthy backends.
  - **Failover threshold:** Determine when a backend is considered unhealthy to
    failover traffic.
  - **Traffic isolation:** Prevent cascading failures by limiting cross-region
    traffic overflow.
- **Preferred backends:** Designate specific backends to be used to capacity
  before requests are sent to remaining backends.

![How Cloud Load Balancing makes routing and traffic distribution decisions.](https://cloud.google.com/static/load-balancing/docs/images/l7-lb-arch-advanced.svg 'How Cloud Load Balancing makes routing and traffic distribution decisions.')

---

## Supported load balancers and backends

### Supported load balancers

- Global external Application Load Balancer
- Cross-region internal Application Load Balancer
- Global external proxy Network Load Balancer
- Cross-region internal proxy Network Load Balancer

### Supported backends

The features described require compatible backends that support a balancing
mode.

| Backend                                           | Supported?                                                           |
| :------------------------------------------------ | :------------------------------------------------------------------- |
| Instance groups                                   | ✅ (Zonal unmanaged and managed; regional managed are not supported) |
| Zonal NEGs (`GCE_VM_IP_PORT` endpoints)           | ✅                                                                   |
| Zonal NEGs (`GCE_VM_IP` endpoints)                | ❌                                                                   |
| Hybrid NEGs (`NON_GCP_PRIVATE_IP_PORT` endpoints) | ✅                                                                   |
| Serverless NEGs                                   | ❌                                                                   |
| Internet NEGs                                     | ❌                                                                   |
| Private Service Connect NEGs                      | ❌                                                                   |

---

## Load balancing algorithms

This section describes the load balancing algorithms you can configure. If you
don't configure one, the default is `WATERFALL_BY_REGION`.

### Waterfall by region (default)

Google Front Ends (GFEs) in the closest region to the user attempt to fill
backends in proportion to their target capacities. Each individual GFE prefers
to select backends in the closest possible zone to minimize latency. If backends
in the closest region are at capacity, traffic overflows to the next closest
region.

### Spray to region

Each GFE sends requests to all backends in all zones of the region without a
preference for a shorter round-trip time. This provides more uniform
distribution but may increase cross-zone traffic and TCP connections.

### Waterfall by zone

Each GFE has a very strong preference to select backends in the closest possible
zone. It only sends requests to other zones when its most favored zone is full.
This minimizes latency but can result in less uniform traffic distribution
across the region.

### Compare load balancing algorithms

| Behavior                                           | Waterfall by region         | Spray to region | Waterfall by zone              |
| :------------------------------------------------- | :-------------------------- | :-------------- | :----------------------------- |
| **Uniform capacity usage within a single region**  | Yes                         | Yes             | No                             |
| **Uniform capacity usage across multiple regions** | No                          | No              | No                             |
| **Uniform traffic split from load balancer**       | No                          | Yes             | No                             |
| **Cross-zone traffic distribution**                | Yes, optimizes for latency. | Yes             | Yes, fills nearest zone first. |
| **Sensitivity to traffic spikes in a local zone**  | Average                     | Lower           | Higher                         |

---

## Auto-capacity draining and undraining

Health checks are used as a signal to adjust a backend's capacity.

- **Auto-capacity draining:** Sets the capacity of a backend to zero if fewer
  than 25% of its instances/endpoints are passing health checks (and the overall
  ratio of such backends is less than 50%).
- **Auto-capacity undraining:** Restores a backend's capacity when 35% or more
  of its instances/endpoints pass health checks for at least 60 seconds.

---

## Failover threshold

The load balancer sends traffic to **primary backends** (optimal in latency and
capacity). If primary backends become unhealthy, it can shift traffic to
**failover backends**.

The **failover threshold** is a percentage (1-99, default 70) of endpoints in a
backend that must be healthy. If the percentage of healthy endpoints falls below
this threshold, the load balancer tries to send traffic to a failover backend.

- A **high threshold** can cause unnecessary failovers due to transient health
  changes.
- A **low threshold** may cause the load balancer to continue sending traffic to
  an unhealthy backend for too long.

---

## Traffic isolation (Preview)

By default, traffic overflows to other regions when the closest region's
backends are full or unhealthy. Traffic isolation prevents this.

- **`NEAREST` (default):** Traffic overflows to the next closest region if the
  closest is full/unhealthy.
- **`STRICT`:** Traffic is sent **only** to backends in the closest region. If
  they are unable to serve, requests are dropped.

---

## Preferred backends

You can designate specific backends as "preferred." These backends must be used
to capacity before any requests are sent to the remaining, non-preferred
backends.

**Limitations:**

- May result in higher average latency if preferred backends are further away.
- Load balancing algorithms (`WATERFALL_BY_REGION`, `SPRAY_TO_REGION`,
  `WATERFALL_BY_ZONE`) do not apply to preferred backends.

---

## Configure a service load balancing policy

To create and configure a service load balancing policy:

1.  Go to the **Load balancing** page in the Google Cloud console.
2.  Click **Create service load balancing policy**.
3.  Enter a **Name**.
4.  To enable auto-capacity draining, select **Drain traffic from unhealthy
    backends**.
5.  For **Failover Health Threshold**, enter a number between 1 and 99.
6.  For **Traffic distribution**, select the desired load balancing algorithm.
7.  Click **Create**.

> **Note:** Traffic isolation can't be configured using the Google Cloud
> console. Use the `gcloud` CLI or the API instead.

### Disable features configured on the policy

Use `gcloud network-services service-lb-policies update` with the appropriate
flags to reset or disable features. For example:

- `--load-balancing-algorithm=WATERFALL_BY_REGION`
- `--failover-health-threshold=70`
- `--no-auto-capacity-drain`
- `--isolation-config-granularity=UNSPECIFIED` and
  `--isolation-config-mode=UNSPECIFIED` to disable traffic isolation.

### Remove a policy

To remove a policy from a backend service, use
`gcloud compute backend-services update BACKEND_SERVICE_NAME --no-service-lb-policy --global`.

---

## Set preferred backends

You can designate a backend as preferred in the Google Cloud console when
creating a load balancer by setting the **Backend preference level** field to
**Preferred**.

---

## Troubleshooting

| Scenario                                                                  | Possible Cause & Explanation                                                                                                                                               |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Traffic from a single source goes to too many backends**                | Intended behavior of `SPRAY_TO_REGION`. Consider `WATERFALL_BY_REGION` if cache hit rates decrease.                                                                        |
| **Traffic isn't sent to backends with unhealthy endpoints**               | Intended behavior when `autoCapacityDrain` is enabled. Unhealthy backends are drained and removed from the pool.                                                           |
| **Traffic fails over to remote backends during transient health changes** | Intended behavior with a high `failoverThreshold`. Lower the value if you want traffic to remain on primary backends.                                                      |
| **Healthy endpoints are overloaded when others are unhealthy**            | Intended behavior with a low `failoverThreshold`. Traffic is spread among remaining healthy endpoints in the same backend. Raise the threshold to trigger failover sooner. |
| **Traffic goes to distant backends before closer ones**                   | Intended behavior if preferred backends are further away. Adjust preference settings if needed.                                                                            |
| **Requests fail after enabling `STRICT` traffic isolation**               | Expected if no backends are configured in the closest region, or if they are unhealthy. Set the mode to `NEAREST` or ensure healthy backends are available in the region.  |

---

## Limitations

- Each backend service can only be associated with a single service load
  balancing policy resource.
