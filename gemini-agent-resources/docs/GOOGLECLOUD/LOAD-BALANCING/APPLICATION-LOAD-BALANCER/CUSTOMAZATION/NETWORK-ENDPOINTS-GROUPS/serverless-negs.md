# Serverless network endpoint groups overview

A network endpoint group (NEG) specifies a group of backend endpoints for a load
balancer. A **serverless NEG** is a backend that points to a Cloud Run, App
Engine, Cloud Functions, or API Gateway resource.

A serverless NEG can represent one of the following:

- A Cloud Run service or a group of services.
- A Cloud Run function or group of functions (formerly Cloud Functions 2nd gen).
- A Cloud Functions (1st gen) or group of functions.
- An App Engine standard or flexible environment app, a specific service, a
  specific version, or a group of services.
- An API Gateway that provides access to your services through a REST API. This
  capability is in **Preview**.

> **Important:** For a group of services to be in the same serverless NEG, they
> must have a common URL pattern.

---

## Supported load balancers

The following table lists the serverless products supported by each Application
Load Balancer. Serverless NEGs are not supported by proxy Network Load Balancers
and passthrough Network Load Balancers.

| Serverless NEG type | Regional<br>internal                                              | Cross-region<br>internal | Global<br>external                                  | Classic | Regional<br>external |
| :------------------ | :---------------------------------------------------------------- | :----------------------- | :-------------------------------------------------- | :------ | :------------------- |
| **Cloud Run**       | ✅<br><sub>Supports Cloud Run and Cloud Functions (2nd gen)</sub> | ✅                       | ✅                                                  | ✅      | ✅                   |
| **App Engine**      |                                                                   |                          | ✅                                                  | ✅      |                      |
| **Cloud Functions** |                                                                   |                          | ✅<br><sub>Supports Cloud Functions (1st gen)</sub> | ✅      |                      |

---

## Use cases

When your load balancer is enabled for serverless apps, you can do the
following:

- Configure your serverless app to serve from a dedicated IPv4 IP address.
- Map a single URL to multiple serverless functions or services that serve at
  the same domain using [URL masks](#url-masks).
- Share URL space with other Google Cloud compute platforms.
- Reuse the same SSL certificates and private keys that you use for Compute
  Engine, Google Kubernetes Engine, and Cloud Storage.

### Global external Application Load Balancer and classic Application Load Balancer

Setting up a global external Application Load Balancer or a classic Application
Load Balancer enables your serverless apps to integrate with existing cloud
services. You can do the following:

- Protect your service with Google Cloud Armor.
- Enable your service to optimize delivery using Cloud CDN.
- Use Google's Edge infrastructure to terminate user's HTTP(S) connections
  closer to the user, thus decreasing latency.

### Regional external Application Load Balancer

Using a regional external Application Load Balancer lets you run workloads with
regulatory or compliance requirements on Cloud Run or Cloud Functions (2nd gen)
backends.

### Regional internal Application Load Balancer and cross-region internal Application Load Balancer

When an internal Application Load Balancer is configured with Cloud Run or Cloud
Functions (2nd gen) backends, you can:

- Enable advanced traffic management features (fault injection, header rewrites,
  traffic splitting).
- Seamlessly migrate legacy services from Compute Engine, GKE, or on-premises to
  Cloud Run.
- Protect your Cloud Run and Cloud Functions services with VPC Service Controls.
- Establish a single, policy-enforcing internal ingress point for your services.

---

## Endpoint types

Serverless NEGs don't have any network endpoints such as ports or IP addresses.
They can only point to an existing Cloud Run, App Engine, API Gateway, or Cloud
Functions resource residing in the same region as the NEG.

When you create a serverless NEG, you specify the fully qualified domain name
(FQDN) of the resource. The endpoint is of type `SERVERLESS`. A serverless NEG
cannot have more than one endpoint.

---

## Load balancing components

A load balancer using a serverless NEG backend requires special configuration
only for the backend service. The frontend configuration is the same as any
other proxy-based Google Cloud load balancer.

The following diagrams show a sample serverless NEG deployment.

**Global external**
![Global external Application Load Balancer for serverless apps.](https://cloud.google.com/static/load-balancing/docs/images/serverless-neg-global-ext-components.svg 'Global external Application Load Balancer for serverless apps (click to enlarge).')

### Backend service

Backend services provide configuration information to the load balancer. The
following restrictions apply:

- A global backend service (for global external Application Load Balancers) can
  have several serverless NEGs, but only one per region.
- A regional backend service (for regional internal/external Application Load
  Balancers) can only have one serverless NEG.
- A global backend service (for cross-region internal Application Load
  Balancers) can only have Cloud Run and Cloud Functions (2nd gen) resources
  attached.

Each serverless NEG can point to either a single resource's FQDN or a **URL
mask** that points to multiple resources.

### Outlier detection for serverless NEGs

Outlier detection is an optional configuration that can be enabled on a global
backend service that has serverless NEGs attached to it (available for
cross-region internal and global external Application Load Balancers). It
identifies unhealthy serverless NEGs and reduces the error rate by routing new
requests to healthy resources.

You can use one of the following outlier detection methods:

- **Consecutive 5xx errors:** A 5xx series HTTP status code qualifies as an
  error.
- **Consecutive gateway errors:** Only 502, 503, and 504 HTTP status codes
  qualify as an error.

> **Note:** Even after enabling outlier detection, you'll likely see some
> requests being sent to the unhealthy resource. To reduce error rates further,
> you can configure more aggressive outlier detection parameters.

The following `outlierDetection` fields are not supported when the backend
service has a serverless NEG:

- `outlierDetection.enforcingSuccessRate`
- `outlierDetection.successRateMinimumHosts`
- `outlierDetection.successRateRequestVolume`
- `outlierDetection.successRateStdevFactor`

---

## URL masks

A serverless NEG backend can point to a URL mask, which is a template of your
URL schema. The serverless NEG uses this template to map the request to the
appropriate service. This is useful if you are using a custom domain and have
multiple services serving at the same domain.

![Using a URL mask to distribute traffic to different services.](https://cloud.google.com/static/load-balancing/docs/images/serverless-neg-url-mask.svg 'Using a URL mask to distribute traffic to different services (click to enlarge).')

---

## Limitations

- A serverless NEG cannot have any network endpoints like IP address or port.
- Serverless NEGs can only point to serverless resources in the same region
  where the NEG is created.
- The serverless NEG and the backing serverless resource must be in the same
  project.
- A load balancer cannot detect if the underlying serverless resource is
  working. Test new versions thoroughly.

### Limitations with backend services

- A global backend service (for global external ALBs) can have only one
  serverless NEG per region.
- A regional backend service can only have one serverless NEG.
- Cross-project service referencing is supported, but the backend service,
  serverless NEGs, and the backing serverless resource must be in the same
  project.
- The backend service timeout setting does not apply; the default is a
  non-configurable 60 minutes.
- All serverless NEGs in a backend service must be of the same type (e.g., all
  Cloud Run).
- You cannot mix serverless NEGs with other NEG types in the same backend
  service.
- Certain backend service fields are restricted (no balancing mode, no health
  checks).

### Other limitations

- **Regional ALBs:** Can only point to Cloud Run or Cloud Functions (2nd gen).
  There is a 5000 QPS limit per project for traffic sent to any serverless NEGs
  configured with these load balancers.
- **Cross-region internal ALBs:** Can only point to Cloud Run or Cloud Functions
  (2nd gen).
- **Global external ALBs:** Do not support Knative serving. Do not support
  authenticating end-user requests to Cloud Run (but IAP can be used for
  internal users).
- **App Engine:** Multi-region load balancing is not supported. Other
  limitations apply regarding IAP and cross-project referencing.
- **API Gateway:** See
  [Limitations on serverless NEGs and API Gateway](https://cloud.google.com/api-gateway/docs/limitations#serverless-negs-and-api-gateway).
- **Traffic management:** Features like load balancing locality policy and
  session affinity aren't supported.
