# Target proxies overview

When you create an Application Load Balancer or a proxy Network Load Balancer,
one of the resources you configure is the **target proxy**. Target proxies
terminate incoming connections from clients and create new connections from the
load balancer to the backends.

At a high level, traffic is handled according to the following process:

1.  A target proxy is referenced by one or more forwarding rules and listens on
    the IP address and port specified by the forwarding rule.
2.  A client connects to the IP address and port of the load balancer's
    forwarding rule.
3.  The target proxy receives the client request, finds a matching forwarding
    rule, and terminates the client's network connection.
4.  The target proxy establishes a new connection to the appropriate backend VM
    instance or endpoint, as determined by the load balancer's URL map and
    backend service configuration.

> **Note:** This page discusses target proxies only in the context of Cloud Load
> Balancing. They are also used by Cloud Service Mesh.

---

## Target proxy types

Cloud Load Balancing uses different target proxies depending on the type of load
balancer.

| Load balancer                                            | Target proxy type                       | Target proxy scope |
| :------------------------------------------------------- | :-------------------------------------- | :----------------- |
| **Global external Application Load Balancer**            | Target HTTP proxy<br>Target HTTPS proxy | Global             |
| **Classic Application Load Balancer**                    | Target HTTP proxy<br>Target HTTPS proxy | Global             |
| **Regional external Application Load Balancer** \*       | Target HTTP proxy<br>Target HTTPS proxy | Regional           |
| **Cross-region internal Application Load Balancer** \*   | Target HTTP proxy<br>Target HTTPS proxy | Global             |
| **Regional internal Application Load Balancer** \*       | Target HTTP proxy<br>Target HTTPS proxy | Regional           |
| **Global external proxy Network Load Balancer**          | Target SSL proxy<br>Target TCP proxy    | Global             |
| **Classic proxy Network Load Balancer**                  | Target SSL proxy<br>Target TCP proxy    | Global             |
| **Regional external proxy Network Load Balancer** \*     | Target TCP proxy                        | Regional           |
| **Regional internal proxy Network Load Balancer** \*     | Target TCP proxy                        | Regional           |
| **Cross-region internal proxy Network Load Balancer** \* | Target TCP proxy                        | Global             |

\* _This load balancer requires a
[proxy-only subnet](https://cloud.google.com/load-balancing/docs/proxy-only-subnets)._

Cloud Load Balancing supports the following resource combinations:

- Forwarding rule > target HTTPS proxy > URL map > one or more backend services
- Forwarding rule > target HTTP proxy > URL map > one or more backend services
- Forwarding rule > target TCP proxy > one backend service
- Forwarding rule > target SSL proxy > one backend service

---

## SSL certificates

Google Cloud proxy load balancers that use a target HTTPS proxy or target SSL
proxy require a private key and SSL certificate as part of the target proxy
configuration. Depending on the load balancer, you use either a Compute Engine
SSL certificate resource or Certificate Manager.

For details, see
[SSL certificates overview](https://cloud.google.com/load-balancing/docs/ssl-certificates).

---

## Optional features available

The following optional features can be configured on target proxies:

- [SSL policies](https://cloud.google.com/load-balancing/docs/ssl-policies-concepts)
- [HTTP/3 support](https://cloud.google.com/load-balancing/docs/l7-external/http3)
- [Client HTTP keepalive timeout](https://cloud.google.com/load-balancing/docs/l7-external/client-keepalive-timeout)

---

## Use target proxies

If you use the Google Cloud console to set up a load balancer, the target proxy
is configured implicitly as part of the frontend configuration. If you use the
`gcloud` CLI or the API, you must configure the target proxy explicitly.

You can't modify individual target proxies in the Google Cloud console. To make
changes, edit the frontend configuration of the associated load balancer or use
the `gcloud` CLI or API.

To delete a target proxy, you must first delete any forwarding rules that
reference it.

### APIs

For REST API documentation, see:

- **Target HTTPS proxy:**
  [Global](https://cloud.google.com/compute/docs/reference/rest/v1/targetHttpsProxies)
  |
  [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/regionTargetHttpsProxies)
- **Target HTTP proxy:**
  [Global](https://cloud.google.com/compute/docs/reference/rest/v1/targetHttpProxies)
  |
  [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/regionTargetHttpProxies)
- **Target TCP proxy:**
  [Global](https://cloud.google.com/compute/docs/reference/rest/v1/targetTcpProxies)
  |
  [Regional](https://cloud.google.com/compute/docs/reference/rest/v1/regionTargetTcpProxies)
- **Target SSL proxy:**
  [Global](https://cloud.google.com/compute/docs/reference/rest/v1/targetSslProxies)

### gcloud CLI

For `gcloud` CLI documentation, see:

- `gcloud compute target-https-proxies`
- `gcloud compute target-http-proxies`
- `gcloud compute target-tcp-proxies`
- `gcloud compute target-ssl-proxies`
