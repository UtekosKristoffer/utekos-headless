Certainly. Here is the provided text formatted as structured markdown.

# URL maps overview

Google Cloud Application Load Balancers and Cloud Service Mesh use a Google
Cloud configuration resource called a **URL map** to route HTTP(S) requests to
backend services or backend buckets.

For example, with an external Application Load Balancer, you can use a single
URL map to route requests to different destinations:

- Requests for `https://example.com/video` go to one backend service.
- Requests for `https://example.com/audio` go to a different backend service.
- Requests for `https://example.com/images` go to a Cloud Storage backend
  bucket.
- Requests for any other host and path combination go to a default backend
  service.

URL maps are used with:

- External Application Load Balancer (global, regional, and classic)
- Internal Application Load Balancer (cross-region and regional)
- Cloud Service Mesh

There are two types of URL map resources: **global** and **regional**. The type
of resource you use depends on the product's load balancing scheme.

| Product                                         | Load-balancing scheme   | URL map resource type | Supported destinations            |
| :---------------------------------------------- | :---------------------- | :-------------------- | :-------------------------------- |
| Global external Application Load Balancer       | `EXTERNAL_MANAGED`      | Global                | Backend services, backend buckets |
| Classic Application Load Balancer               | `EXTERNAL`              | Global                | Backend services, backend buckets |
| Regional external Application Load Balancer     | `EXTERNAL_MANAGED`      | Regional              | Backend services                  |
| Cross-region internal Application Load Balancer | `INTERNAL_MANAGED`      | Global                | Backend services                  |
| Regional internal Application Load Balancer     | `INTERNAL_MANAGED`      | Regional              | Backend services                  |
| Cloud Service Mesh                              | `INTERNAL_SELF_MANAGED` | Global                | Backend services                  |
| Cloud Service Mesh                              | `INTERNAL_SELF_MANAGED` | Regional              | Backend services                  |

---

## How URL maps work

When a request arrives at the load balancer, it routes the request to a
particular backend service or backend bucket based on the rules defined in the
URL map.

For example, assume you have the following setup:

- One IP address.
- Two domains: `example.net` (training videos) and `example.org` (organization
  website).
- Four sets of servers:
  - `org-site` (backend service)
  - `video-site` (backend service)
  - `video-hd` (backend service)
  - `video-sd` (backend service)

You want the following to happen:

- Requests to `example.org` go to the `org-site` backend service.
- Requests to `example.net` go to the `video-site` backend service.
- Requests to `example.net/video/hd/*` go to the `video-hd` backend service.
- Requests to `example.net/video/sd/*` go to the `video-sd` backend service.

![Example backend service setup.](https://cloud.google.com/static/load-balancing/docs/images/url-map-example.svg 'Example backend service setup (click to enlarge).')

The URL map lets you set up this type of host and path-based routing.

---

## URL map components

A URL map directs requests using the hostname and path portions of each URL.

![Load balancer configuration with basic URL map.](https://cloud.google.com/static/load-balancing/docs/images/url-map-components-2.svg 'Load balancer configuration with basic URL map (click to enlarge).')

You control which backend services or backend buckets receive incoming requests
by using the following URL map configuration parameters:

- **Default backend service or default backend bucket:** When you create a URL
  map, you must specify a default destination for requests that don't match any
  host rules.
- **Host rule (`hostRules`):** A host rule directs requests sent to one or more
  associated hostnames to a single path matcher. You can use wildcards (`*`) to
  match all or partial hostnames.
- **Path matcher (`pathMatchers`):** A path matcher defines the relationship
  between the path portion of a URL and the backend service or bucket that
  should serve the request. A path matcher consists of two elements:
  - **Path matcher default backend service or bucket:** A default destination
    for requests whose paths don't match any path rules in the path matcher.
  - **Path rules:** Key-value pairs mapping a URL path to a single backend
    service or bucket. Flexible pattern matching operators are available.
- **Route rules:** As an alternative to path rules, route rules offer advanced
  traffic routing based on URL path, HTTP headers, and query parameters. They
  support flexible pattern matching and regular expressions.

---

## Order of operations

For a given hostname and path, Google Cloud uses the following procedure to
direct the request:

1.  If the URL map does not contain a **host rule** for the URL's hostname, the
    request is directed to the URL map's **default backend service or bucket**.
2.  If the URL map contains a matching **host rule**, the referenced **path
    matcher** is consulted:
    - If the path matcher contains a **path rule** that exactly matches the
      URL's path, the request is directed to the backend for that path rule.
    - If there's no exact match, but a path rule ending in `/*` has a prefix
      that matches the longest section of the URL's path, the request is
      directed to that path rule's backend.
    - If neither of the above is true, the request is directed to the path
      matcher's **default backend service or bucket**.

---

## Regular expressions in host and route rules

_(This is a Preview feature)_

You can use RE2 syntax regular expressions to match the hostname, path, headers,
or query parameters of an incoming request. Regular expressions are supported
only for regional internal, cross-region internal, and regional external
Application Load Balancers.

### Example #1: Use a regular expression to match path

This URL map uses a `regexMatch` to route requests with a path like
`/videos/hd-abcd?key=245` to the `video-hd` backend service.

```yaml
defaultService: projects/example-project/global/backendServices/org-site
name: rule-match-url-map
hostRules:
  - hosts:
      - '*'
    pathMatcher: video-matcher
  - hosts:
      - example.net
    pathMatcher: video-matcher
pathMatchers:
  - name: video-matcher
    defaultService: projects/example-project/global/backendServices/video-site
    routeRules:
      - priority: 100000
        matchRules:
          - regexMatch: /videos/hd.*
        routeAction:
          weightedBackendServices:
            - backendService: projects/example-project/global/backendServices/video-hd
              weight: 100
```

### Example #2: Use a regular expression to match headers

This URL map routes requests with a `User-Agent` header containing "Android" and
"-hd" and a path starting with `/video/` to the `video-backend-service`.

```yaml
# ... (hostRules and default services)
routeRules:
  - priority: 1
    matchRules:
      - headerMatches:
          - headerName: User-Agent
            regexMatch: .*\*Android.\**-hd
      - prefixMatch: /video/
    service: projects/example-project/regions/us-central1/backendServices/video-backend-service
```

### Example #3: Use a regular expression to match query parameters

This URL map routes requests with a path matching `/im.*/.*.html` and a query
parameter `param1` whose value matches `param_value_.*-hd` to the
`sample-images-bs` backend service.

```yaml
# ... (hostRules and default services)
routeRules:
  - priority: 1
    matchRules:
      - queryParameterMatches:
          - name: param1
            regexMatch: param_value_.*-hd
      - regexMatch: /im.*/.*.html
    service: projects/example-project/regions/us-central1/backendServices/sample-images-bs
```

---

## Wildcards and pattern matching in path templates

Flexible pattern matching operators let you match multiple parts of a URL path
using wildcard syntax. You can also associate path components with named
variables and refer to them when rewriting the URL. This is supported for
global/regional external and regional/cross-region internal Application Load
Balancers, and Cloud Service Mesh.

The following table outlines the syntax for path template patterns.

| Operator               | Matches                                                                        |
| :--------------------- | :----------------------------------------------------------------------------- |
| `*`                    | A single path segment.                                                         |
| `**`                   | Zero or more characters, including path separators. Must be the last operator. |
| `{name}` or `{name=*}` | A named variable matching one path segment.                                    |
| `{name=news/*}`        | A named variable explicitly matching two path segments.                        |
| `{name=**}`            | A named variable matching zero or more characters. Must be the last operator.  |

---

## URL redirects

A URL redirect redirects your domain's visitors from one URL to another. You can
create a default URL redirect or one based on path or route rules.

The following table provides some examples of redirect configurations.

| You want                                                                                                                                       | Accomplished using a default URL redirect                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **HTTP-to-HTTPS redirect**<br>Redirect `http://host.name/path` to `https://host.name/path`                                                     | `defaultUrlRedirect: { httpsRedirect: True }`                                                                |
| **HTTP-to-HTTPS + Host redirect**<br>Redirect `http://any-host-name/path` to `https://www.example.com/path`                                    | `defaultUrlRedirect: { httpsRedirect: True, hostRedirect: "www.example.com" }`                               |
| **HTTP-to-HTTPS + Host + Full path redirect**<br>Redirect `http://any-host-name/path` to `https://www.example.com/newPath`                     | `defaultUrlRedirect: { httpsRedirect: True, hostRedirect: "www.example.com", pathRedirect: "/newPath" }`     |
| **HTTP-to-HTTPS + Host + Prefix redirect**<br>Redirect `http://any-host-name/originalPath` to `https://www.example.com/newPrefix/originalPath` | `defaultUrlRedirect: { httpsRedirect: True, hostRedirect: "www.example.com", prefixRedirect: "/newPrefix" }` |

---
