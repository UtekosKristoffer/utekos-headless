# Use URL maps

This guide shows you how to configure Google Cloud URL maps. A URL map is a set
of rules for routing incoming HTTP(S) requests to specific backend services or
backend buckets. Before following this guide, familiarize yourself with
[URL map concepts](https://cloud.google.com/load-balancing/docs/url-map-concepts).

> **Note:** This page describes how to configure a specific load balancer
> component. Before using this information, know the type of Google Cloud load
> balancer that you need.

URL maps are used with:

- External Application Load Balancer (global, classic, and regional)
- Internal Application Load Balancer
- Cloud Service Mesh

---

## URL map defaults

URL maps have two defaults:

| Default type             | Setting                                                                                         | Meaning                                                                                                                 |
| :----------------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **URL map default**      | `gcloud compute url-maps create`<br>`--default-service` \| `--default-backend-bucket`           | The specified default is used if no path matchers or host rules match the incoming URL.                                 |
| **Path matcher default** | `gcloud compute url-maps add-path-matcher`<br>`--default-service` \| `--default-backend-bucket` | The specified default is used if the URL's path matches a path matcher, but none of the specified `--path-rules` match. |

---

## Host rules

A host rule defines a set of hosts to match requests against. The hostname must
be a fully qualified domain name (FQDN). Examples:

- `example.com`
- `web.example.com`
- `*.example.com`

---

## Configure URL maps

> **Important:** If you originally set up your load balancer in the Google Cloud
> console, the URL map's name is the same as your load balancer's name.

To add a URL map using the Google Cloud console:

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer.
3.  Click **Edit**.
4.  Select **Host and path rules**.
5.  Click **Add host and path rule**.
6.  Fill in the **Host** field, **Paths** field, or both, and select a backend
    service or backend bucket.
7.  Click the **Update** button.

---

## Validate the URL map configuration

> **Note:** The `gcloud compute url-maps validate` command is not supported for
> the regional external Application Load Balancer and the internal Application
> Load Balancer.

Before deploying a URL map, you can validate the configuration to ensure it
routes requests as intended by adding tests. Use the
`gcloud compute url-maps validate` command to test the configuration without
saving changes.

---

## Add tests to a URL map

> **Note:** Adding tests to URL maps is not supported for the regional external
> Application Load Balancer and the internal Application Load Balancer.

You can add configuration tests to a URL map to ensure it routes requests as
intended. When you edit your URL map, the tests run, and an error message
appears if a test fails.

To run tests from the Google Cloud console:

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer and then **Edit**.
3.  Click **Routing rules** (or **Host and path rules** for classic Application
    Load Balancers).
4.  Click **Show configuration tests**.
5.  Click **Add configuration test** and add your test URLs and expected
    backends.
6.  Click the **Update** button.

---

## Management operations

### List URL maps

You cannot list all of your URL maps in the Google Cloud console. Use `gcloud`
or the API.

### Get information about a URL map

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer and then **Edit**.
3.  View the **Host and path rules**.

### Delete a URL map

> You can delete a URL map only after you've deleted all target proxies that
> reference it.

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer and then **Edit**.
3.  View the **Host and path rules**.
4.  Click the "X" to the right of a URL map to delete it.
5.  Click the **Update** button.

### Delete a path matcher

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer and then **Edit**.
3.  Select **Host and path rules**.
4.  In the **Paths** field for an existing URL map, click the "x" on the path
    matcher's name.
5.  Click the **Update** button.

### Delete a host rule

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the **Name** of a load balancer and then **Edit**.
3.  Select **Host and path rules**.
4.  In the **Hosts** field for an existing URL map, click the "x" on the host's
    name.
5.  Click the **Update** button.

---

## Traffic management guides

The following table links to guides for specific URL map features and traffic
management.

| Product                                         | URL map features and traffic management guides                                                                                                                                                                                                            |
| :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Global external Application Load Balancer**   | [Routing and traffic management](https://cloud.google.com/load-balancing/docs/features#routing-and-traffic-management), [Traffic management overview](https://cloud.google.com/load-balancing/docs/l7-external/traffic-management-overview), ...          |
| **Classic Application Load Balancer**           | [Routing and traffic management](https://cloud.google.com/load-balancing/docs/features#routing-and-traffic-management), [Traffic management overview](https://cloud.google.com/load-balancing/docs/l7-external-classic/traffic-management-overview), ...  |
| **Regional external Application Load Balancer** | [Routing and traffic management](https://cloud.google.com/load-balancing/docs/features#routing-and-traffic-management), [Traffic management overview](https://cloud.google.com/load-balancing/docs/l7-external-regional/traffic-management-overview), ... |
| **Internal Application Load Balancer**          | [Routing and traffic management](https://cloud.google.com/load-balancing/docs/features#routing-and-traffic-management), [Traffic management overview](https://cloud.google.com/load-balancing/docs/l7-internal/traffic-management-overview), ...          |
| **Cloud Service Mesh**                          | [Routing and traffic management](https://cloud.google.com/service-mesh/docs/traffic-management), [Advanced traffic management overview](https://cloud.google.com/service-mesh/docs/traffic-management-overview), ...                                      |

---

## API and gcloud CLI reference

### API

For descriptions of the properties and methods available when working with URL
maps through the REST API, see the API documentation for
[External Application Load Balancer](https://cloud.google.com/compute/docs/reference/rest/v1/urlMaps)
and
[Internal Application Load Balancer](https://cloud.google.com/compute/docs/reference/rest/v1/regionUrlMaps).

### gcloud CLI

For the Google Cloud CLI, see `gcloud compute url-maps`.

- Global: `--global`
- Regional: `--region=[REGION]`

For advanced traffic management, use YAML files and import them with the
`gcloud compute url-maps import` command.

---

## What's next

- See
  [URL maps overview](https://cloud.google.com/load-balancing/docs/url-map-concepts)
  for more information on how URL maps work.
- See the overviews for
  [External Application Load Balancer](https://cloud.google.com/load-balancing/docs/application/application-load-balancer-overview)
  and
  [Internal Application Load Balancer](https://cloud.google.com/load-balancing/docs/l7-internal/ilb-overview).
