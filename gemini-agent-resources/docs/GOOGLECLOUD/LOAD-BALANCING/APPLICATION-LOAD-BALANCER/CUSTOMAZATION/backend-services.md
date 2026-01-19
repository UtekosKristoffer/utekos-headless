# Backend services overview

A **backend service** defines how Cloud Load Balancing distributes traffic. It
contains a set of values, such as the protocol used to connect to backends,
various distribution and session settings, health checks, and timeouts. A
backend service is either global or regional in scope.

Load balancers, Envoy proxies, and proxyless gRPC clients use the configuration
information in the backend service resource to:

- Direct traffic to the correct backends (instance groups or NEGs).
- Distribute traffic according to a balancing mode.
- Determine which health check is monitoring the health of the backends.
- Specify session affinity.
- Determine whether other services are enabled (like Cloud CDN, Google Cloud
  Armor, IAP).

---

## Backend services and supported backend types

The product you are using determines the scope of a backend service, the type of
backends supported, and the backend service's `loadBalancingScheme`.

| Product                                               | Max # of backend services | Scope    | Supported backend types                                                                               | Load balancing scheme   |
| :---------------------------------------------------- | :------------------------ | :------- | :---------------------------------------------------------------------------------------------------- | :---------------------- |
| **Global external Application Load Balancer**         | Multiple                  | Global   | Instance groups, Zonal NEGs (`GCE_VM_IP_PORT`), Hybrid NEGs, Serverless NEGs, Internet NEGs, PSC NEGs | `EXTERNAL_MANAGED`      |
| **Classic Application Load Balancer**                 | Multiple                  | Global‡  | Instance groups, Zonal NEGs, Hybrid NEGs, Serverless NEGs, Internet NEGs                              | `EXTERNAL`#             |
| **Regional external Application Load Balancer**       | Multiple                  | Regional | Instance groups, Zonal NEGs, Hybrid NEGs, Serverless NEGs, Internet NEGs, PSC NEGs                    | `EXTERNAL_MANAGED`      |
| **Cross-region internal Application Load Balancer**   | Multiple                  | Global   | Instance groups, Zonal NEGs, Hybrid NEGs, Serverless NEGs, PSC NEGs                                   | `INTERNAL_MANAGED`      |
| **Regional internal Application Load Balancer**       | Multiple                  | Regional | Instance groups, Zonal NEGs, Hybrid NEGs, Serverless NEGs, Internet NEGs, PSC NEGs                    | `INTERNAL_MANAGED`      |
| **Global external proxy Network Load Balancer**       | 1                         | Global‡  | Instance groups, Zonal NEGs, Hybrid NEGs, PSC NEGs                                                    | `EXTERNAL_MANAGED`      |
| **Classic proxy Network Load Balancer**               | 1                         | Global‡  | Instance groups, Zonal NEGs, Hybrid NEGs                                                              | `EXTERNAL`              |
| **Regional external proxy Network Load Balancer**     | 1                         | Regional | Instance groups, Zonal NEGs, Hybrid NEGs, Internet NEGs, PSC NEGs                                     | `EXTERNAL_MANAGED`      |
| **Regional internal proxy Network Load Balancer**     | 1                         | Regional | Instance groups, Zonal NEGs, Hybrid NEGs, Internet NEGs, PSC NEGs                                     | `INTERNAL_MANAGED`      |
| **Cross-region internal proxy Network Load Balancer** | Multiple                  | Global   | Instance groups, Zonal NEGs, Hybrid NEGs, PSC NEGs                                                    | `INTERNAL_MANAGED`      |
| **External passthrough Network Load Balancer**        | 1                         | Regional | Instance groups, Zonal NEGs (`GCE_VM_IP`)                                                             | `EXTERNAL`              |
| **Internal passthrough Network Load Balancer**        | 1                         | Regional | Instance groups, Zonal NEGs (`GCE_VM_IP`), Port mapping NEGs                                          | `INTERNAL`              |
| **Cloud Service Mesh**                                | Multiple                  | Global   | Instance groups, Zonal NEGs, Internet NEGs, Service bindings                                          | `INTERNAL_SELF_MANAGED` |

---

## Backends

A backend is one or more endpoints that receive traffic. Types of backends
include:

- Instance group
- Zonal NEG
- Serverless NEG
- Private Service Connect NEG
- Internet NEG
- Hybrid connectivity NEG
- Port mapping NEG
- Service Directory service bindings

### Instance groups

- **Named ports:** Proxy-based load balancers use a named port on the backend
  service to determine the destination port for the connection between the proxy
  and the backend instance. This is configured per instance group.
- **Restrictions:**
  - Don't put a VM in more than one load-balanced instance group unless you use
    the same instance group for multiple load balancers.
  - A single instance group can be a backend for multiple backend services, but
    they must use compatible balancing modes.
  - It is not recommended to add an autoscaled managed instance group to more
    than one backend service.

### Network Endpoint Groups (NEGs)

- **Zonal NEGs:** A logical grouping of network endpoints (IP address or
  IP:Port) within a single subnet. See
  [Zonal NEGs overview](https://cloud.google.com/load-balancing/docs/negs/zonal-neg-concepts).
- **Internet NEGs:** Defines external backends hosted outside Google Cloud. See
  [Internet NEG overview](https://cloud.google.com/load-balancing/docs/negs/internet-neg-concepts).
- **Serverless NEGs:** A backend that points to a Cloud Run, App Engine, Cloud
  Functions, or API Gateway resource. See
  [Serverless NEG overview](https://cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts).
- **Service bindings:** Connects a backend service in Cloud Service Mesh to a
  service in Service Directory.

---

## Protocol to the backends

When you create a backend service, you must specify the protocol used to
communicate with the backends.

| Product                           | Backend service protocol options         |
| :-------------------------------- | :--------------------------------------- |
| Application Load Balancer         | `HTTP`, `HTTPS`, `HTTP/2`                |
| Proxy Network Load Balancer       | `TCP` or `SSL`                           |
| Passthrough Network Load Balancer | `TCP`, `UDP`, or `UNSPECIFIED`           |
| Cloud Service Mesh                | `HTTP`, `HTTPS`, `HTTP/2`, `gRPC`, `TCP` |

---

## Traffic distribution

### Balancing mode

The balancing mode determines how the load balancer measures backend readiness.

- **`CONNECTION`:** Based on the total number of connections the backend can
  handle.
- **`RATE`:** Based on the target maximum number of requests per second (RPS).
- **`UTILIZATION`:** Based on the utilization of instances in an instance group.
- **`CUSTOM_METRICS`:** Based on user-defined custom metrics.

The available balancing modes depend on the load balancer and backend type.

| Load balancer                     | Backends                   | Balancing modes available                  |
| :-------------------------------- | :------------------------- | :----------------------------------------- |
| Application Load Balancer         | Instance groups            | `RATE`, `UTILIZATION`, or `CUSTOM_METRICS` |
|                                   | Zonal/Hybrid NEGs          | `RATE` or `CUSTOM_METRICS`                 |
| Proxy Network Load Balancer       | Instance groups            | `CONNECTION` or `UTILIZATION`              |
|                                   | Zonal/Hybrid NEGs          | `CONNECTION`                               |
| Passthrough Network Load Balancer | Instance groups/Zonal NEGs | `CONNECTION`                               |

### Target capacity

Each balancing mode has a corresponding target capacity, which defines a target
maximum for connections, rate, or CPU utilization. This is not a hard limit; a
load balancer can exceed the target.

### Capacity scaler

Use the capacity scaler (a value from 0.0 to 1.0) to adjust the effective target
capacity without changing the target capacity setting itself. A value of 0
drains the backend, and 1.0 uses its full configured capacity.

---

## Other backend service features

### Service load balancing policy

A `serviceLbPolicy` resource lets you customize traffic distribution by:

- Choosing a load balancing algorithm (e.g., `WATERFALL_BY_REGION`,
  `SPRAY_TO_REGION`).
- Enabling auto-capacity draining.
- Setting a failover threshold.
- Designating preferred backends.

See
[Advanced load balancing optimizations](https://cloud.google.com/load-balancing/docs/advanced-load-balancing-optimizations)
for details.

### Load balancing locality policy (`localityLbPolicy`)

Determines how traffic is distributed across instances or endpoints _within_ a
backend group.

- `ROUND_ROBIN` (default)
- `WEIGHTED_ROUND_ROBIN`
- `LEAST_REQUEST`
- `RING_HASH` (consistent hashing)
- `RANDOM`
- `ORIGINAL_DESTINATION`
- `MAGLEV`
- `WEIGHTED_MAGLEV`

### Backend subsetting

An optional feature that improves performance by assigning a subset of backends
to each proxy instance. This is supported for Regional Internal Application Load
Balancers and Internal Passthrough Network Load Balancers. Enabling or disabling
subsetting breaks existing connections.

### Session affinity

Controls how the load balancer selects backends for new connections, which is
useful for stateful applications. By default, all load balancers use a
five-tuple hash (`--session-affinity=NONE`). Other options like `CLIENT_IP` are
available.

### Backend service timeout

Most load balancers have a backend service timeout (default: 30 seconds). For
Application Load Balancers, this is a request/response timeout. For Proxy
Network Load Balancers, it's an idle connection timeout. It is ignored for
passthrough Network Load Balancers.

### Health checks

Each backend service with instance group or zonal NEG backends must have an
associated health check. Serverless and global internet NEG backends do not use
health checks.

---

## Additional features enabled on the backend service

- **Cloud CDN:** Uses Google's global edge network to serve content closer to
  users. Enabled on backend services for global external Application Load
  Balancers.
- **Google Cloud Armor:** Provides WAF and DDoS protection for certain external
  load balancers.
- **Identity-Aware Proxy (IAP):** Establishes a central authorization layer for
  applications accessed by HTTPS. Supported by certain Application Load
  Balancers.
- **Advanced traffic management:** Includes features like URL rewrites, header
  transformations, and traffic splitting.
