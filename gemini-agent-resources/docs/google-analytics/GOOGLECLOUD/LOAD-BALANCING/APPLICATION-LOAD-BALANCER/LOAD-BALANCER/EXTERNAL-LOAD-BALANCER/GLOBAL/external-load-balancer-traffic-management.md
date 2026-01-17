# Traffic Management Overview for Global External Application Load Balancers

This page provides an overview of the advanced traffic management capabilities available for global external Application Load Balancers.

## Use Case Examples

### Traffic Steering: Header-Based Routing
Direct traffic to different service instances based on HTTP parameters such as request headers. For example, you can route mobile traffic to a different backend than desktop traffic.

### Traffic Actions: Weight-Based Traffic Splitting
Deploy a new version of a service by splitting traffic between the old and new versions. For example, send 5% of traffic to the new version and 95% to the old version, and gradually increase the percentage for the new version.

### Traffic Policies: Request Mirroring
Mirror traffic to another service for testing or compliance purposes. For example, you can send a copy of all production traffic to a testing environment.

---

## Traffic Management Components

At a high level, load balancers provide traffic management by leveraging global URL maps and global backend services resources.

*   **URL Maps:** Used to set up traffic steering and traffic actions.
*   **Backend Services:** Used to set up traffic policies.

---

## Routing Requests to Backends

The load balancer selects a backend in two phases:

1.  It selects a backend service or backend bucket based on rules in a global URL map.
2.  The backend service selects a backend instance based on policies defined in the global backend service.

You can configure routing using one of two modes:

*   **Simple host and path rule:** Routes traffic based on the hostname and path of the request.
*   **Advanced host, path, and route rule:** Provides more advanced options, such as routing based on headers and query parameters.

### Route Rules

A route rule matches information in an incoming request and makes a routing decision based on the match.

| Route Rule Component | Description                                                                 |
| :------------------- | :-------------------------------------------------------------------------- |
| **Priority**         | A number from 0 to 2,147,483,647 that determines the order of rule evaluation. |
| **Match rules**      | One or more rules that are evaluated against the request's HTTP attributes.   |
| **Route action**     | The action to take when the match rule criteria are met.                      |

### Route Actions

Route actions are specific actions to take when a route rule matches the attributes of a request.

| Route Action           | Description                                                                    |
| :--------------------- | :----------------------------------------------------------------------------- |
| **Redirects**          | Returns a configurable 3xx response code.                                      |
| **URL rewrites**       | Rewrites the hostname, path, or both, before sending a request to the backend. |
| **Header transformations** | Adds or removes request and response headers.                                  |
| **Traffic mirroring**  | Sends an identical request to a mirror backend service.                        |
| **Weighted traffic splitting** | Distributes traffic to multiple backend services based on a user-defined weight. |
| **Retries**            | Configures the conditions under which the load balancer retries failed requests. |
| **Timeout**            | Specifies the timeout for the selected route.                                  |
| **Fault injection**    | Introduces errors when servicing requests to simulate failures.                |

---

## Traffic Policies

By using backend service resources, you can configure traffic policies to fine-tune load balancing within an instance group or network endpoint group (NEG).

| Traffic Policy              | Description                                                                    |
| :-------------------------- | :----------------------------------------------------------------------------- |
| **Load balancing locality policy** | Determines how backends within a zone or group are load balanced.              |
| **Session affinity**        | Provides a best-effort attempt to send requests from a particular client to the same backend. |
| **Outlier detection**       | Specifies the criteria for evicting unhealthy backend VMs or endpoints.     |