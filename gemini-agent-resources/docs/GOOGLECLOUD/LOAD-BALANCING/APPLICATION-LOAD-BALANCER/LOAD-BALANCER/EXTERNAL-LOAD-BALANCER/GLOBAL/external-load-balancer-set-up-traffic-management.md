# Set up Traffic Management for Global External Application Load Balancers

This document shows examples of using traffic management for global external Application Load Balancers.

## Before you begin

Make sure that you understand how traffic management works. For more information, read [Traffic management overview for global external Application Load Balancers](https://cloud.google.com/load-balancing/docs/traffic-management).

---

## Configure and Test Traffic Management

You set up traffic management by using YAML configurations for a URL map and a backend service.

---

## Map Traffic to a Single Service

Send all traffic to a single service.

```yaml
defaultService: projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_1
hostRules:
- hosts:
  - '*'
  pathMatcher: matcher1
name: URL_MAP_NAME
pathMatchers:
- defaultService: projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_1
  name: matcher1
```

---

## Split Traffic Between Two Services

Split traffic between two or more services.

```yaml
#...
routeAction:
  weightedBackendServices:
  - backendService: projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_1
    weight: 95
  - backendService: projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_2
    weight: 5
```

---

## Configure a URL Redirect

The following example returns a `301 MOVED_PERMANENTLY_DEFAULT` response code.

```yaml
#...
defaultUrlRedirect:
  hostRedirect: "HOST TO REDIRECT TO"
  pathRedirect: "PATH TO REDIRECT TO"
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  stripQuery: True
```

---

## Mirror Traffic

Send a copy of the request to a mirror backend service on a fire-and-forget basis.

```yaml
#...
requestMirrorPolicy:
  backendService: projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE_2
```

---

## Rewrite the Requested URL

Rewrite the hostname, path, or both, before sending a request to the backend.

```yaml
#...
urlRewrite:
  hostRewrite: "new-host-name.com"
  pathPrefixRewrite: "/new-path/"
```

---

## Retry a Request

Configure the conditions under which the load balancer retries failed requests.

```yaml
#...
retryPolicy:
  retryConditions: 502, 504
  numRetries: 3
  perTryTimeout:
    seconds: 1
```

---

## Specify the Route Timeout

Specify the timeout for the selected route, including all retries.

```yaml
#...
timeout:
  seconds: 30
```

---

## Configure Fault Injection

Introduce errors when servicing requests to simulate failures.

```yaml
#...
faultInjectionPolicy:
  delay:
    fixedDelay:
      seconds: 10
    percentage: 25
  abort:
    httpStatus: 503
    percentage: 50
```

---

## Configure CORS

Configure cross-origin resource sharing (CORS) policies.

```yaml
#...
corsPolicy:
  allowOrigins: [ "http://example.com" ]
  allowMethods: [ "GET", "POST" ]
  allowHeaders: [ "Authorization", "Content-Type" ]
  maxAge: 1200
  allowCredentials: true
```

---

## Add and Remove Request and Response Headers

Add and remove headers before sending a request to the backend or after receiving a response.

```yaml
#...
headerAction:
  requestHeadersToAdd:
  - headerName: header-1-name
    headerValue: header-1-value
    replace: True
  requestHeadersToRemove:
  - header-2-name
```

---

## Configure Outlier Detection

Specify the criteria for evicting unhealthy backends.

```yaml
#...
outlierDetection:
  baseEjectionTime:
    seconds: 30
  consecutiveErrors: 5
  maxEjectionPercent: 50
```

---

## Set up Traffic Splitting: Detailed Steps

This example demonstrates how to create a 95% / 5% traffic split between two services.

---

## Set up Session Affinity Based on HTTP_COOKIE

Configure session affinity based on a provided cookie.

---

## Troubleshooting

If traffic is not being routed as expected, check the order of your route rules. Rules are interpreted in the order they are specified.