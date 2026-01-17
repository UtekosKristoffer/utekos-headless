Backend services overview

A backend service defines how Cloud Load Balancing distributes traffic. The backend service configuration contains a set of values, such as the protocol used to connect to backends, various distribution and session settings, health checks, and timeouts. These settings provide fine-grained control over how your load balancer behaves. To get you started, most of the settings have default values that allow for fast configuration. A backend service is either global or regional in scope.

Load balancers, Envoy proxies, and proxyless gRPC clients use the configuration information in the backend service resource to do the following:

Direct traffic to the correct backends, which are instance groups or network endpoint groups (NEGs).
Distribute traffic according to a balancing mode, which is a setting for each backend.
Determine which health check is monitoring the health of the backends.
Specify session affinity.
Determine whether other services are enabled, including the following services that are only available for certain load balancers:
Cloud CDN
Google Cloud Armor security policies
Identity-Aware Proxy
Designate global and regional backend services as a service in App Hub applications.
You set these values when you create a backend service or add a backend to the backend service.

Note: If you're using either the global external Application Load Balancer or the classic Application Load Balancer, and your backends serve static content, consider using backend buckets instead of backend services. See backend buckets for global external Application Load Balancer or backend buckets for classic Application Load Balancer.
The following table summarizes which load balancers use backend services. The product that you are using also determines the maximum number of backend services, the scope of a backend service, the type of backends supported, and the backend service's load balancing scheme. The load balancing scheme is an identifier that Google uses to classify forwarding rules and backend services. Each load balancing product uses one load balancing scheme for its forwarding rules and backend services. Some schemes are shared among products.

Table: Backend services and supported backend types
Product	Maximum number of backend services	Scope of backend service	Supported backend types	Load balancing scheme
Global external Application Load Balancer	Multiple	Global	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs*
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
All serverless NEGs: One or more App Engine, Cloud Run, or Cloud Run functions resources
One global internet NEG for an external backend
Private Service Connect NEGs:
Google APIs: a single Private Service Connect NEG
Managed services: one or more Private Service Connect NEGs
EXTERNAL_MANAGED
Classic Application Load Balancer	Multiple	Global‡	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
All serverless NEGs: One or more App Engine, Cloud Run, or Cloud Run functions resources, or
One global internet NEG for an external backend
EXTERNAL#
Regional external Application Load Balancer	Multiple	Regional	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
A single serverless NEG (for Cloud Run or Cloud Run functions 2nd gen only)
A single Private Service Connect NEG
All regional internet NEGs for an external backend
EXTERNAL_MANAGED
Cross-region internal Application Load Balancer	Multiple	Global	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
A single serverless NEG (for Cloud Run or Cloud Run functions 2nd gen only)
Private Service Connect NEGs:
Google APIs: a single Private Service Connect NEG
Managed services: one or more Private Service Connect NEGs
INTERNAL_MANAGED
Regional internal Application Load Balancer	Multiple	Regional	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
A single serverless NEG (for Cloud Run or Cloud Run functions 2nd gen only)
A single Private Service Connect NEG
All regional internet NEGs for an external backend
INTERNAL_MANAGED
Global external proxy Network Load Balancer	1	Global‡	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs*
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
Private Service Connect NEGs:
Google APIs: a single Private Service Connect NEG
Managed services: one or more Private Service Connect NEGs
EXTERNAL_MANAGED
Classic proxy Network Load Balancer	1	Global‡	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs †
EXTERNAL
Regional external proxy Network Load Balancer	1	Regional	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs
All regional internet NEGs for an external backend
A single Private Service Connect NEG
EXTERNAL_MANAGED
Regional internal proxy Network Load Balancer	1	Regional	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs
All regional internet NEGs for an external backend
A single Private Service Connect NEG
INTERNAL_MANAGED
Cross-region internal proxy Network Load Balancer	Multiple	Global	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends *
All zonal NEGs: One or more GCE_VM_IP_PORT type zonal NEGs *
All hybrid connectivity NEGs: One or more NON_GCP_PRIVATE_IP_PORT type NEGs
A combination of zonal and hybrid NEGs: GCE_VM_IP_PORT and NON_GCP_PRIVATE_IP_PORT type NEGs
Private Service Connect NEGs:
Google APIs: a single Private Service Connect NEG
Managed services: one or more Private Service Connect NEGs
INTERNAL_MANAGED
External passthrough Network Load Balancer	1	Regional	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends
All zonal NEGs: One or more GCE_VM_IP type zonal NEGs
EXTERNAL
Internal passthrough Network Load Balancer	1	Regional, but configurable to be globally accessible	The backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends
All zonal NEGs: One or more GCE_VM_IP type zonal NEGs
One port mapping NEG
INTERNAL
Cloud Service Mesh	Multiple	Global	Each backend service supports one of the following backend combinations:
All instance group backends: One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends
All zonal NEGs: One or more GCE_VM_IP_PORT or NON_GCP_PRIVATE_IP_PORT type zonal NEGs
One internet NEG of type INTERNET_FQDN_PORT
One or more service bindings
INTERNAL_SELF_MANAGED
* Support IPv4 and IPv6 (dual-stack) instance groups and zonal NEG backends. Zonal NEGs support dual-stack on only GCE_VM_IP_PORT type endpoints.
† For GKE deployments, mixed NEG backends are only supported with standalone NEGs.
‡ Backend services used by classic Application Load Balancers and classic proxy Network Load Balancers are always global in scope, in either Standard or Premium Network Tier. However, in Standard Tier the following restrictions apply:
The forwarding rule and its external IP address are regional.
All backends connected to the backend service must be located in the same region as the forwarding rule.
# It is possible to attach EXTERNAL_MANAGED backend services to EXTERNAL forwarding rules. However, EXTERNAL backend services cannot be attached to EXTERNAL_MANAGED forwarding rules. To take advantage of new features available only with the global external Application Load Balancer, we recommend that you migrate your existing EXTERNAL resources to EXTERNAL_MANAGED by using the migration process described at Migrate resources from classic to global external Application Load Balancer.
Load balancer naming
For Proxy Network Load Balancers and Passthrough Network Load Balancers, the name of the load balancer is always the same as the name of the backend service. The behavior for each Google Cloud interface is as follows:

Google Cloud console. If you create either a proxy Network Load Balancer or a passthrough Network Load Balancer by using the Google Cloud console, the backend service is automatically assigned the same name that you entered for the load balancer name.
Google Cloud CLI or API. If you create either a proxy Network Load Balancer or a passthrough Network Load Balancer by using the gcloud CLI or the API, you enter a name of your choice while creating the backend service. This backend service name is then reflected in the Google Cloud console as the name of the load balancer.
To learn about how naming works for Application Load Balancers, see URL maps overview: Load balancer naming.

Backends
A backend is one or more endpoints that receive traffic from a Google Cloud load balancer, a Cloud Service Mesh-configured Envoy proxy, or a proxyless gRPC client. There are several types of backends:

Instance group containing virtual machine (VM) instances. An instance group can be a managed instance group (MIG), with or without autoscaling, or it can be an unmanaged instance group. More than one backend service can reference an instance group, but all backend services that reference the instance group must use the same balancing mode.
Zonal NEG
Serverless NEG
Private Service Connect NEG
Internet NEG
Hybrid connectivity NEG
Port mapping NEG
Service Directory service bindings
You cannot delete a backend instance group or NEG that is associated with a backend service. Before you delete an instance group or NEG, you must first remove it as a backend from all backend services that reference it.

Instance groups
This section discusses how instance groups work with the backend service.

Backend VMs and external IP addresses
Backend VMs in backend services don't need external IP addresses:

For global external Application Load Balancers and external proxy Network Load Balancers: Clients communicate with a Google Front End (GFE) which hosts your load balancer's external IP address. GFEs communicate with backend VMs or endpoints by sending packets to an internal address created by joining an identifier for the backend's VPC network with the internal IPv4 address of the backend. Communication between GFEs and backend VMs or endpoints is facilitated through special routes.
For instance group backends, the internal IPv4 address is always the primary internal IPv4 address that corresponds to the nic0 interface of the VM.
For GCE_VM_IP_PORT endpoints in a zonal NEG, you can specify the endpoint's IP address as either the primary IPv4 address associated with any network interface of a VM or any IPv4 address from an alias IP address range associated with any network interface of a VM.
For regional external Application Load Balancers: Clients communicate with an Envoy proxy which hosts your load balancer's external IP address. Envoy proxies communicate with backend VMs or endpoints by sending packets to an internal address created by joining an identifier for the backend's VPC network with the internal IPv4 address of the backend.

For instance group backends, the internal IPv4 address is always the primary internal IPv4 address that corresponds to the nic0 interface of the VM, and nic0 must be in the same network as the load balancer.
For GCE_VM_IP_PORT endpoints in a zonal NEG, you can specify the endpoint's IP address as either the primary IPv4 address associated with any network interface of a VM or any IPv4 address from an alias IP address range associated with any network interface of a VM, as long as the network interface is in the same network as the load balancer.
For external passthrough Network Load Balancers: Clients communicate directly with backends by way of Google's Maglev pass-through load balancing infrastructure. Packets are routed and delivered to backends with the original source and destination IP addresses preserved. Backends respond to clients using direct server return. The methods used to select a backend and to track connections are configurable.

For instance group backends, packets are always delivered to the nic0 interface of the VM.
For GCE_VM_IP endpoints in a zonal NEG, packets are delivered to the VM's network interface that is in the subnetwork associated with the NEG.
Named ports
The backend service's named port attribute is only applicable to proxy-based load balancers (Application Load Balancers and Proxy Network Load Balancers) using instance group backends. The named port defines the destination port used for the TCP connection between the proxy (GFE or Envoy) and the backend instance.

Named ports are configured as follows:

On each instance group backend, you must configure one or more named ports using key-value pairs. The key represents a meaningful port name that you choose, and the value represents the port number you assign to the name. The mapping of names to numbers is done individually for each instance group backend.

On the backend service, you specify a single named port using just the port name (--port-name).

On a per-instance group backend basis, the backend service translates the port name to a port number. When an instance group's named port matches the backend service's --port-name, the backend service uses this port number for communication with the instance group's VMs.

For example, you might set the named port on an instance group with the name my-service-name and the port 8888:



gcloud compute instance-groups unmanaged set-named-ports my-unmanaged-ig \
    --named-ports=my-service-name:8888
Then you refer to the named port in the backend service configuration with the --port-name on the backend service set to my-service-name:



gcloud compute backend-services update my-backend-service \
    --port-name=my-service-name
A backend service can use a different port number when communicating with VMs in different instance groups if each instance group specifies a different port number for the same port name.

The resolved port number used by the proxy load balancer's backend service doesn't need to match the port number used by the load balancer's forwarding rules. A proxy load balancer listens for TCP connections sent to the IP address and destination port of its forwarding rules. Because the proxy opens a second TCP connection to its backends, the second TCP connection's destination port can be different.

Named ports are only applicable to instance group backends. Zonal NEGs with GCE_VM_IP_PORT endpoints, hybrid NEGs with NON_GCP_PRIVATE_IP_PORT endpoints, and internet NEGs define ports using a different mechanism, namely, on the endpoints themselves. Serverless NEGs reference Google services and PSC NEGs reference service attachments using abstractions that don't involve specifying a destination port.

Internal passthrough Network Load Balancers and external passthrough Network Load Balancers don't use named ports. This is because they are pass-through load balancers that route connections directly to backends instead of creating new connections. Packets are delivered to the backends preserving the destination IP address and port of the load balancer's forwarding rule.

To learn how to create named ports, see the following instructions:

Unmanaged instance groups: Working with named ports
Managed instance groups: Assigning named ports to managed instance groups
Restrictions and guidance for instance groups
Keep the following restrictions and guidance in mind when you create instance groups for your load balancers:

Don't put a VM in more than one load-balanced instance group. If a VM is a member of two or more unmanaged instance groups, or a member of one managed instance group and one or more unmanaged instance groups, Google Cloud limits you to only using one of those instance groups at a time as a backend for a particular backend service.

If you need a VM to participate in multiple load balancers, you must use the same instance group as a backend on each of the backend services.

For proxy load balancers, when you want to balance traffic to different ports, specify the required named ports on one instance group and have each backend service subscribe to a unique named port.

You can use the same instance group as a backend for more than one backend service. In this situation, the backends must use compatible balancing modes. Compatible means that the balancing modes must be the same, or they must be a combination of compatible balancing modes—for example, CONNECTION and RATE.

Incompatible balancing mode combinations are as follows:

CONNECTION with UTILIZATION
RATE with UTILIZATION
CUSTOM_METRICS with UTILIZATION
CUSTOM_METRICS with RATE
CUSTOM_METRICS with CONNECTION
Consider the following example:

You have two backend services: external-https-backend-service for an external Application Load Balancer and internal-tcp-backend-service for an internal passthrough Network Load Balancer.
You're using an instance group called instance-group-a in internal-tcp-backend-service.
In internal-tcp-backend-service, you must apply the CONNECTION balancing mode because internal passthrough Network Load Balancers only support the CONNECTION balancing mode.
You can also use instance-group-a in external-https-backend-service if you apply the RATE balancing mode in external-https-backend-service.
You cannot also use instance-group-a in external-https-backend-service with the UTILIZATION balancing mode.
To change the balancing mode for an instance group serving as a backend for multiple backend services:

Remove the instance group from all backend services except for one.
Change the balancing mode for the backend on the one remaining backend service.
Re-add the instance group as a backend to the remaining backend services, if they support the new balancing mode.
If your instance group is associated with several backend services, each backend service can reference the same named port or a different named port on the instance group.

We recommend not adding an autoscaled managed instance group to more than one backend service. Doing so might cause unpredictable and unnecessary scaling of instances in the group, especially if you use the HTTP Load Balancing Utilization autoscaling metric.

While not recommended, this scenario might work if the autoscaling metric is either CPU Utilization or a Cloud Monitoring Metric that is unrelated to the load balancer's serving capacity. Using one of these autoscaling metrics might prevent erratic scaling.
Zonal network endpoint groups
Network endpoints represent services by their IP address or an IP address and port combination, rather than referring to a VM in an instance group. A network endpoint group (NEG) is a logical grouping of network endpoints.

Zonal network endpoint groups (NEGs) are zonal resources that represent collections of either IP addresses or IP address and port combinations for Google Cloud resources within a single subnet.

A backend service that uses zonal NEGs as its backends distributes traffic among applications or containers running within VMs.

There are two types of network endpoints available for zonal NEGs:

GCE_VM_IP endpoints (supported only with internal passthrough Network Load Balancers and backend service-based external passthrough Network Load Balancers).
GCE_VM_IP_PORT endpoints.
To see which products support zonal NEG backends, see Table: Backend services and supported backend types.

For details, see Zonal NEGs overview.

Internet network endpoint groups
Internet NEGs are resources that define external backends. An external backend is a backend that is hosted within on-premises infrastructure or on infrastructure provided by third parties.

An internet NEG is a combination of a hostname or an IP address, plus an optional port. There are two types of network endpoints available for internet NEGs: INTERNET_FQDN_PORTand INTERNET_IP_PORT.

Internet NEGs are available in two scopes: global and regional. To see which products support internet NEG backends in each scope, see Table: Backend services and supported backend types.
For details, see Internet network endpoint group overview.

Serverless network endpoint groups
A network endpoint group (NEG) specifies a group of backend endpoints for a load balancer. A serverless NEG is a backend that points to a Cloud Run, App Engine, Cloud Run functions, or API Gateway resource.

A serverless NEG can represent one of the following:

A Cloud Run resource or a group of resources.
A Cloud Run function or group of functions (formerly Cloud Run functions 2nd gen).
A Cloud Run function (1st gen) or group of functions
An App Engine standard environment or App Engine flexible environment app, a specific service within an app, a specific version of an app, or a group of services.
An API Gateway that provides access to your services through a REST API consistent across all services, regardless of service implementation. This capability is in Preview.
Important: For a group of resources to be in the same serverless NEG, they must have a common URL pattern.
To set up a serverless NEG for serverless applications that share a URL pattern, you use a URL mask. A URL mask is a template of your URL schema (for example, example.com/<service>). The serverless NEG will use this template to extract the <service> name from the incoming request's URL and route the request to the matching Cloud Run, Cloud Run functions, or App Engine service with the same name.

To see which load balancers support serverless NEG backends, see Table: Backend services and supported backend types.

For more information about serverless NEGs, see the Serverless network endpoint groups overview.

Service bindings
A service binding is a backend that establishes a connection between a backend service in Cloud Service Mesh and a service registered in Service Directory. A backend service can reference several service bindings. A backend service with a service binding cannot reference any other type of backend.

Mixed backends
The following usage considerations apply when you add different types of backends to a single backend service:

A single backend service cannot simultaneously use both instance groups and zonal NEGs.
You can use a combination of different types of instance groups on the same backend service. For example, a single backend service can reference a combination of both managed and unmanaged instance groups. For complete information about which backends are compatible with which backend services, see the table in the previous section.
With certain proxy load balancers, you can use a combination of zonal NEGs (with GCE_VM_IP_PORT endpoints) and hybrid connectivity NEGs (with NON_GCP_PRIVATE_IP_PORT endpoints) to configure hybrid load balancing. To see which load balancers have this capability, refer Table: Backend services and supported backend types.
Protocol to the backends
When you create a backend service, you must specify the protocol used to communicate with the backends. You can specify only one protocol per backend service — you cannot specify a secondary protocol to use as a fallback.

Which protocols are valid depends on the type of load balancer or whether you are using Cloud Service Mesh.

Table: Protocol to the backends
Product	Backend service protocol options
Application Load Balancer	HTTP, HTTPS, HTTP/2
Proxy Network Load Balancer	
TCP or SSL

The regional proxy Network Load Balancers support only TCP.

Passthrough Network Load Balancer	TCP, UDP, or UNSPECIFIED
Cloud Service Mesh	HTTP, HTTPS, HTTP/2, gRPC, TCP
Changing a backend service's protocol makes the backends inaccessible through load balancers for a few minutes.

IP address selection policy
This field is applicable to proxy load balancers. You must use the IP address selection policy to specify the traffic type that is sent from the backend service to your backends.

When you select the IP address selection policy, ensure that your backends support the selected traffic type. For more information, see Table: Backend services and supported backend types.

IP address selection policy is used when you want to convert your load balancer backend service to support a different traffic type. For more information, see Convert from single-stack to dual-stack.

You can specify the following values for the IP address selection policy:


IP address selection policy	Description
Only IPv4	Only send IPv4 traffic to the backends of the backend service, regardless of traffic from the client to the GFE. Only IPv4 health checks are used to check the health of the backends.
Prefer IPv6	
Prioritize the backend's IPv6 connection over the IPv4 connection (provided there is a healthy backend with IPv6 addresses).

The health checks periodically monitor the backends' IPv6 and IPv4 connections. The GFE first attempts the IPv6 connection; if the IPv6 connection is broken or slow, the GFE uses happy eyeballs to fall back and connect to IPv4.

Even if one of the IPv6 or IPv4 connections is unhealthy, the backend is still treated as healthy, and both connections can be tried by the GFE, with happy eyeballs ultimately selecting which one to use.

Only IPv6	
Only send IPv6 traffic to the backends of the backend service, regardless of traffic from the client to the proxy. Only IPv6 health checks are used to check the health of the backends.

There is no validation to check if the backend traffic type matches the IP address selection policy. For example, if you have IPv4-only backends and select Only IPv6 as the IP address selection policy, the configuration results in unhealthy backends because traffic fails to reach those backends and the HTTP 503 response code is returned to the clients.

Encryption between the load balancer and backends
For information about encryption between the load balancer and backends, see Encryption to the backends.

Traffic distribution
The values of the following fields in the backend services resource determine some aspects of the backend's behavior:

A balancing mode defines how the load balancer measures backend readiness for new requests or connections.
A target capacity defines a target maximum number of connections, a target maximum rate, or target maximum CPU utilization.
A capacity scaler adjusts overall available capacity without modifying the target capacity.
Balancing mode
The balancing mode determines whether the backends of a load balancer or Cloud Service Mesh can handle additional traffic or are fully loaded.

Google Cloud has four balancing modes:

CONNECTION: Determines how the load is spread based on the total number of connections that the backend can handle.
RATE: The target maximum number of requests (queries) per second (RPS, QPS). The target maximum RPS/QPS can be exceeded if all backends are at or above capacity.
UTILIZATION: Determines how the load is spread based on the utilization of instances in an instance group.
CUSTOM_METRICS: Determines how the load is spread based on user-defined custom metrics.
Balancing modes available for each load balancer
You set the balancing mode when you add a backend to the backend service. The balancing modes available to a load balancer depend on the type of load balancer and the type of backends.

Passthrough Network Load Balancers require the CONNECTION balancing mode but don't support setting any target capacity.

Application Load Balancers support either RATE, UTILIZATION, or CUSTOM_METRICS balancing modes for instance group backends, and RATE or CUSTOM_METRICS balancing modes for zonal NEGs (GCE_VM_IP_PORT endpoints) and hybrid NEGs (NON_GCP_PRIVATE_IP_PORT endpoints). For any other type of supported backend, balancing mode must be omitted.

For classic Application Load Balancers, a region is selected based on the location of the client and whether the region has available capacity, based on the load balancing mode's target capacity. Then, within a region, the balancing mode's target capacity is used to compute proportions for how many requests should go to each backend in the region. Requests or connections are then distributed in a round robin fashion among instances or endpoints within the backend.

For global external Application Load Balancers, a region is selected based on the location of the client and whether the region has available capacity, based on the load balancing mode's target capacity. Within a region, the balancing mode's target capacity is used to compute proportions for how many requests should go to each backend (instance group or NEG) in the region. You can use the service load balancing policy (serviceLbPolicy) and the preferred backend setting to influence the selection of any specific backends within a region. Furthermore, within each instance group or NEG, the load balancing policy (LocalityLbPolicy) determines how traffic is distributed to instances or endpoints within the group.

For cross-region internal Application Load Balancers, regional external Application Load Balancers, and regional internal Application Load Balancers, the balancing mode's target capacity is used to compute proportions for how many requests should go to each backend (instance group or NEG) in the region. Within each instance group or NEG, the load balancing policy (LocalityLbPolicy) determines how traffic is distributed to instances or endpoints within the group. Only the cross-region internal Application Load Balancer support the use of the service load balancing policy (serviceLbPolicy) and the preferred backend settings to influence the selection of any specific backends within a region.
Proxy Network Load Balancers support either CONNECTION or UTILIZATION balancing modes for VM instance group backends, CONNECTION balancing mode for zonal NEGs with GCE_VM_IP_PORT endpoints, and CONNECTION balancing mode for hybrid NEGs (NON_GCP_PRIVATE_IP_PORT endpoints). For any other type of supported backend, balancing mode must be omitted.

For global external proxy Network Load Balancers, a region is selected based on the location of the client and whether the region has available capacity, based on the load balancing mode's target capacity. Within a region, the balancing mode's target capacity is used to compute proportions for how many requests should go to each backend (instance group or NEG) in the region. You can use the service load balancing policy (serviceLbPolicy) and the preferred backend setting to influence the selection of any specific backends within a region. Furthermore, within each instance group or NEG, the load balancing policy (LocalityLbPolicy) determines how traffic is distributed to instances or endpoints within the group.

For cross-region internal proxy Network Load Balancers, the configured region is selected first. Within a region, the balancing mode's target capacity is used to compute proportions for how many requests should go to each backend (instance group or NEG) in the region. You can use the service load balancing policy (serviceLbPolicy) and the preferred backend setting to influence the selection of any specific backends within a region. Furthermore, within each instance group or NEG, the load balancing policy (LocalityLbPolicy) determines how traffic is distributed to instances or endpoints within the group.

For classic proxy Network Load Balancers, a region is selected based on the location of the client and whether the region has available capacity based on the load balancing mode's target capacity. Then, within a region, the load balancing mode's target capacity is used to compute proportions for how many requests or connections should go to each backend (instance group or NEG) in the region. After the load balancer has selected a backend, requests or connections are then distributed in a round robin fashion among VM instances or network endpoints within each individual backend.

For regional external proxy Network Load Balancers and regional internal proxy Network Load Balancers, the load balancing mode's target capacity is used to compute proportions for how many requests should go to each backend (instance group or NEG). Within each instance group or NEG, the load balancing policy (localityLbPolicy) determines how traffic is distributed to instances or endpoints within the group.
The following table summarizes the load balancing modes available for each load balancer and backend combination.

Table: Balancing modes available for each load balancer
Load balancer	Backends	Balancing modes available
Application Load Balancer	Instance groups	RATE, UTILIZATION, or CUSTOM_METRICS
Zonal NEGs (GCE_VM_IP_PORT endpoints)	RATE or CUSTOM_METRICS
Hybrid NEGs (NON_GCP_PRIVATE_IP_PORT endpoints)	RATE or CUSTOM_METRICS
Proxy Network Load Balancer

Global external proxy Network Load Balancer
Classic proxy Network Load Balancer
Regional external proxy Network Load Balancer
Regional internal proxy Network Load Balancer
Cross-region internal proxy Network Load Balancer
Instance groups	CONNECTION or UTILIZATION
Zonal NEGs (GCE_VM_IP_PORT endpoints)	CONNECTION
Hybrid NEGs (NON_GCP_PRIVATE_IP_PORT endpoints)

CONNECTION
Passthrough Network Load Balancer	Instance groups	CONNECTION
Zonal NEGs (GCE_VM_IP endpoints)	CONNECTION
Note:
If you observe poor distribution of traffic while using the UTILIZATION balancing mode, we recommend using RATE instead.

The UTILIZATION balancing mode depends on VM instance or CPU utilization along with other factors. When these factors fluctuate, the load balancer calculates capacities ineffectively, which frequently leads to poor distribution of traffic between backend groups. In contrast, for RATE balancing mode, the load balancer sends requests to the backend group with the lowest average latency over recent requests, or for HTTP/2 and HTTP/3, requests are sent to the backend group with the fewest outstanding requests.

If the average utilization of all VMs that are associated with a backend service is less than 10%, Google Cloud might prefer specific zones. This can happen when you use regional managed instance groups, zonal managed instance groups in different zones, and zonal unmanaged instance groups. This zonal imbalance automatically resolves as more traffic is sent to the load balancer.

For more information, see gcloud compute backend-services add-backend.

Target capacity
Each balancing mode has a corresponding target capacity, which defines one of the following target maximums:

Number of connections
Rate
CPU utilization
For every balancing mode, the target capacity is not a circuit breaker. A load balancer can exceed the maximum under certain conditions, for example, if all backend VMs or endpoints have reached the maximum.

Connection balancing mode
For CONNECTION balancing mode, the target capacity defines a target maximum number of open connections. Except for internal passthrough Network Load Balancers and external passthrough Network Load Balancers, you must use one of the following settings to specify a target maximum number of connections:

max-connections-per-instance (per VM): Target average number of connections for a single VM.
max-connections-per-endpoint (per endpoint in a zonal NEG): Target average number of connections for a single endpoint.
max-connections (per zonal NEGs and for zonal instance groups): Target average number of connections for the whole NEG or instance group. For regional managed instance groups, use max-connections-per-instance instead.
The following table shows how the target capacity parameter defines the following:

The target capacity for the whole backend
The expected target capacity for each instance or endpoint
Table: Target capacity for backends using the CONNECTION balancing mode
Backend type	Target capacity		
If you specify	Whole backend capacity	Expected per instance or per endpoint capacity
Instance group
N instances,
H healthy
max-connections-per-instance=X	X × N	(X × N)/H
Zonal NEG
N endpoints,
H healthy	max-connections-per-endpoint=X	X × N	(X × N)/H
Instance groups
(except regional managed instance groups)

H healthy instances	max-connections=Y	Y	Y/H
As illustrated, the max-connections-per-instance and max-connections-per-endpoint settings are proxies for calculating a target maximum number of connections for the whole VM instance group or whole zonal NEG:

In a VM instance group with N instances, setting max-connections-per-instance=X has the same meaning as setting max-connections=X × N.
In a zonal NEG with N endpoints, setting max-connections-per-endpoint=X has the same meaning as setting max-connections=X × N.
Rate balancing mode
For the RATE balancing mode, you must define the target capacity using one of the following parameters:

max-rate-per-instance (per VM): Provide a target average HTTP request rate for a single VM.
max-rate-per-endpoint (per endpoint in a zonal NEG): Provide a target average HTTP request rate for a single endpoint.
max-rate (per zonal NEGs and for zonal instance groups): Provide a target average HTTP request rate for the whole NEG or instance group. For regional managed instance groups, use max-rate-per-instance instead.
The following table shows how the target capacity parameter defines the following:

The target capacity for the whole backend
The expected target capacity for each instance or endpoint
Table: Target capacity for backends using the RATE balancing mode
Backend type	Target capacity		
If you specify	Whole backend capacity	Expected per instance or per endpoint capacity
Instance group
N instances,
H healthy
max-rate-per-instance=X	X × N	(X × N)/H
zonal NEG
N endpoints,
H healthy	max-rate-per-endpoint=X	X × N	(X × N)/H
Instance groups
(except regional managed instance groups)

H healthy instances	max-rate=Y	Y	Y/H
As illustrated, the max-rate-per-instance and max-rate-per-endpoint settings are proxies for calculating a target maximum rate of HTTP requests for the whole instance group or whole zonal NEG:

In an instance group with N instances, setting max-rate-per-instance=X has the same meaning as setting max-rate=X × N.
In a zonal NEG with N endpoints, setting max-rate-per-endpoint=X has the same meaning as setting max-rate=X × N.
Utilization balancing mode
The UTILIZATION balancing mode has no mandatory target capacity. You have a number of options that depend on the type of backend, as summarized in the table in the following section.

The max-utilization target capacity can only be specified per instance group and cannot be applied to a particular VM in the group.

The UTILIZATION balancing mode has no mandatory target capacity. When you use the Google Cloud console to add a backend instance group to a backend service, the Google Cloud console sets the value of max-utilization to 0.8 (80%) if the UTILIZATION balancing mode is selected. In addition to max-utilization, the UTILIZATION balancing mode supports more complex target capacities, as summarized in the table in the following section.

Custom metrics balancing mode
The CUSTOM_METRICS balancing mode lets you define your own custom metrics that can be used to determine how the load is spread. Custom metrics let you configure your load balancer's traffic distribution behavior to be based on metrics specific to your application or infrastructure requirements, rather than Google Cloud's standard utilization or rate-based metrics.

For more information, see Custom metrics for Application Load Balancers.

Changing the balancing mode of a load balancer
For some load balancers or load balancer configurations, you cannot change the balancing mode because the backend service has only one possible balancing mode. For others, depending on the backend used, you can change the balancing mode because more than one mode is available to those backend services.

To see which balancing modes are supported for each load balancer, refer the Table: Balancing modes available for each load balancer

Balancing modes and target capacity settings
For products that support a target capacity specification, the target capacity is not a circuit breaker. When the configured target capacity maximum is reached in a given zone, new requests or connections are distributed to other zones that aren't processing requests or connections at target capacity. If all zones have reached target capacity, new requests or connections are distributed by overfilling.

Application Load Balancers and Cloud Service Mesh
This table lists the available balancing mode and target capacity combinations for Application Load Balancers and Cloud Service Mesh.

Table: Balancing mode and target capacity combinations for Application Load Balancers and Cloud Service Mesh
Backend type	Balancing mode	Target capacity specification
Instance groups
zonal unmanaged
zonal managed
regional managed
RATE	You must specify one of the following:
max-rate
 (supported only by zonal instance groups)
max-rate-per-instance
 (supported by all instance groups)
UTILIZATION	You can optionally specify one of the following:
(1) max-utilization
(2) max-rate
 (supported only by zonal instance groups)
(3) max-rate-per-instance
 (supported by all instance groups)
(1) and (2) together
(1) and (3) together
CUSTOM_METRICS	You can optionally specify one of the following:
(1) The metric's max-utilization (that is, the metric's backends[].customMetrics[].maxUtilization field)
(2) max-rate
 (supported only by zonal instance groups)
(3) max-rate-per-instance
 (supported by all instance groups)
(1) and (2) together
(1) and (3) together
Per backend max-utilization isn't supported.
Zonal NEGs

GCP_VM_IP_PORT
Hybrid NEGS

NON_GCP_PRIVATE_IP_PORT
RATE	You must specify one of the following:
max-rate per zonal NEG
max-rate-per-endpoint
CUSTOM_METRICS	You can optionally specify one of the following:
(1) The metric's max-utilization (that is, the metric's backends[].customMetrics[].maxUtilization field)
(2) max-rate per zonal NEG
(3) max-rate-per-endpoint
(1) and (2) together
(1) and (3) together
Per backend max-utilization isn't supported.
Proxy Network Load Balancers
This table lists the available balancing mode and target capacity combinations for Proxy Network Load Balancers.

Table: Balancing mode and target capacity combinations for Proxy Network Load Balancers
Backend type	Balancing mode	Target capacity specification
Instance groups
zonal unmanaged
zonal managed
regional managed
CONNECTION	You must specify one of the following:
max-connections
 (supported only by zonal instance groups)
max-rate-per-instance
 (supported by all instance groups)
UTILIZATION	You can optionally specify one of the following:
(1) max-utilization
(2) max-connections
 (supported only by zonal instance groups)
(3) max-connections-per-instance
 (supported by all instance groups)
(1) and (2) together
(1) and (3) together
Zonal NEGs

GCP_VM_IP_PORT
Hybrid NEGS

NON_GCP_PRIVATE_IP_PORT
CONNECTION	You must specify one of the following:
max-connections per zonal NEG
max-connections-per-endpoint
Passthrough Network Load Balancers
This table lists the available balancing mode and target capacity combinations for Passthrough Network Load Balancers.

Table: Balancing mode and target capacity combinations for Passthrough Network Load Balancers
Backend type	Balancing mode	Target capacity specification
Instance groups
zonal unmanaged
zonal managed
regional managed
CONNECTION	You cannot specify a target maximum number of connections.
Zonal NEGs
GCP_VM_IP
CONNECTION	You cannot specify a target maximum number of connections.
Capacity scaler
Use capacity scaler to scale the target capacity (max utilization, max rate, or max connections) without changing the target capacity.

For the Google Cloud reference documentation, see the following:

Google Cloud CLI: capacity-scaler
API:
Regional
Global
You can adjust the capacity scaler to scale the effective target capacity without explicitly changing one of the --max-* parameters.

You can set the capacity scaler to either of these values:

The default value is 1, which means the group serves up to 100% of its configured capacity (depending on balancingMode).
A value of 0 means the group is completely drained, offering 0% of its available capacity. You cannot configure a setting of 0 when there is only one backend attached to the backend service.
A value from 0.1 (10%) to 1.0 (100%).
The following examples demonstrate how the capacity scaler works in conjunction with the target capacity setting:

If the balancing mode is RATE, the max-rate is set to 80 RPS, and the capacity scaler is 1.0, the available capacity is also 80 RPS.

If the balancing mode is RATE, the max-rate is set to 80 RPS, and the capacity scaler is 0.5, the available capacity is 40 RPS (0.5 times 80).

If the balancing mode is RATE, the max-rate is set to 80 RPS, and the capacity scaler is 0.0, the available capacity is zero (0).

Note: Capacity scaler is not supported for backends that don't support a balancing mode. This includes backends such as internet NEGs, serverless NEGs, and PSC NEGs.
Service load balancing policy
A service load balancing policy (serviceLbPolicy) is a resource associated with the load balancer's backend service. It lets you customize the parameters that influence how traffic is distributed within the backends associated with a backend service:

Customize the load balancing algorithm used to determine how traffic is distributed among regions or zones.
Enable auto-capacity draining so that the load balancer can quickly drain traffic from unhealthy backends.
Additionally, you can designate specific backends as preferred backends. These backends must be used to capacity (that is, the target capacity specified by the backend's balancing mode) before requests are sent to the remaining backends.

To learn more, see Advanced load balancing optimizations with a service load balancing policy.

Load balancing locality policy
For a backend service, traffic distribution is based on a balancing mode and a load balancing locality policy. The balancing mode determines the fraction of traffic that should be sent to each backend (instance group or NEG). The load balancing locality policy then (LocalityLbPolicy) determines how traffic is distributed across instances or endpoints within each zone. For regional managed instance groups, the locality policy applies to each constituent zone.

The load balancing locality policy is configured per-backend service. The following settings are available:

ROUND_ROBIN (default): This is the default load balancing locality policy setting in which the load balancer selects a healthy backend in round robin order.

WEIGHTED_ROUND_ROBIN: The load balancer uses user-defined custom metrics to select the optimal instance or endpoint within the backend to serve the request.

LEAST_REQUEST: An O(1) algorithm in which the load balancer selects two random healthy hosts and picks the host which has fewer active requests.

RING_HASH: This algorithm implements consistent hashing to backends. The algorithm has the property that the addition or removal of a host from a set of N hosts only affects 1/N of the requests.

RANDOM: The load balancer selects a random healthy host.

ORIGINAL_DESTINATION: The load balancer selects a backend based on the client connection metadata. Connections are opened to the original destination IP address specified in the incoming client request, before the request was redirected to the load balancer.

ORIGINAL_DESTINATION is not supported for global and regional external Application Load Balancers.

MAGLEV: Implements consistent hashing to backends and can be used as a replacement for the RING_HASH policy. Maglev is not as stable as RING_HASH but has faster table lookup build times and host selection times. For more information about Maglev, see the Maglev whitepaper.

WEIGHTED_MAGLEV: Implements per-instance weighted load balancing by using weights reported by health checks. If this policy is used, the backend service must configure a non legacy HTTP-based health check, and health check replies are expected to contain the non-standard HTTP response header field, X-Load-Balancing-Endpoint-Weight, to specify the per-instance weights. Load balancing decisions are made based on the per-instance weights reported in the last processed health check replies, as long as every instance reports a valid weight or reports UNAVAILABLE_WEIGHT. Otherwise, load balancing will remain equal-weight.

WEIGHTED_MAGLEV is supported only for External passthrough Network Load Balancers. For an example, see Set up weighted load balancing for external passthrough Network Load Balancers.

Configuring a load balancing locality policy is supported only on backend services used with the following load balancers:

Global external Application Load Balancer
Regional external Application Load Balancer
Cross-region internal Application Load Balancer
Regional internal Application Load Balancer
Global external proxy Network Load Balancer
Regional external proxy Network Load Balancer
Cross-region internal proxy Network Load Balancer
Regional internal proxy Network Load Balancer
External passthrough Network Load Balancer
Note that the effective default value of the load balancing locality policy (localityLbPolicy) changes according to your session affinity settings. If session affinity is not configured—that is, if session affinity remains at the default value of NONE—then the default value for localityLbPolicy is ROUND_ROBIN. If session affinity is set to a value other than NONE, then the default value for localityLbPolicy is MAGLEV.

To configure a load balancing locality policy, you can use the Google Cloud console, gcloud (--locality-lb-policy) or the API (localityLbPolicy).

Cloud Service Mesh and traffic distribution
Cloud Service Mesh also uses backend service resources. Specifically, Cloud Service Mesh uses backend services whose load balancing scheme is INTERNAL_SELF_MANAGED. For an internal self-managed backend service, traffic distribution is based on the combination of a load balancing mode and a load balancing policy. The backend service directs traffic to a backend according to the backend's balancing mode. Then Cloud Service Mesh distributes traffic according to a load balancing policy.

Internal self-managed backend services support the following balancing modes:

UTILIZATION, if all the backends are instance groups
RATE, if all the backends are either instance groups or zonal NEGs
If you choose RATE balancing mode, you must specify a maximum rate, maximum rate per instance, or maximum rate per endpoint.

For more information about Cloud Service Mesh, see Cloud Service Mesh concepts.

Backend subsetting
Backend subsetting is an optional feature that improves performance and scalability by assigning a subset of backends to each of the proxy instances.

Backend subsetting is supported for the following:

Regional internal Application Load Balancer
Internal passthrough Network Load Balancer
Backend subsetting for regional internal Application Load Balancers
Preview

This product or feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA products and features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

The cross-region internal Application Load Balancer doesn't support backend subsetting.
For regional internal Application Load Balancers, backend subsetting automatically assigns only a subset of the backends within the regional backend service to each proxy instance. By default, each proxy instance opens connections to all the backends within a backend service. When the number of proxy instances and the backends are both large, opening connections to all the backends can lead to performance issues.

By enabling subsetting, each proxy only opens connections to a subset of the backends, reducing the number of connections which are kept open to each backend. Reducing the number of simultaneously open connections to each backend can improve performance for both the backends and the proxies.

The following diagram shows a load balancer with two proxies. Without backend subsetting, traffic from both proxies is distributed to all the backends in the backend service 1. With backend subsetting enabled, traffic from each proxy is distributed to a subset of the backends. Traffic from proxy 1 is distributed to backends 1 and 2, and traffic from proxy 2 is distributed to backends 3 and 4.

Comparing internal Application Load Balancer without and with backend subsetting.
Comparing internal Application Load Balancer without and with backend subsetting (click to enlarge).
You can additionally refine the load balancing traffic to the backends by setting the localityLbPolicy policy. For more information, see Traffic policies.

To read about setting up backend subsetting for internal Application Load Balancers, see Configure backend subsetting.

Caveats related to backend subsetting for internal Application Load Balancer
Although backend subsetting is designed to ensure that all backend instances remain well utilized, it can introduce some bias in the amount of traffic that each backend receives. Setting the localityLbPolicy to LEAST_REQUEST is recommended for backend services that are sensitive to the balance of backend load.
Enabling or disabling subsetting breaks existing connections.
Backend subsetting requires that the session affinity is NONE (a 5-tuple hash). Other session affinity options can only be used if backend subsetting is disabled. The default values of the --subsetting-policy and --session-affinity flags are both NONE, and only one of them at a time can be set to a different value.
Backend subsetting for internal passthrough Network Load Balancer
Backend subsetting for internal passthrough Network Load Balancers lets you scale your internal passthrough Network Load Balancer to support a larger number of backend VM instances per internal backend service.

For information about how subsetting affects this limit, see the "Backend services" section of Load balancing resource quotas and limits.

By default, subsetting is disabled, which limits the backend service to distributing to up to 250 backend instances or endpoints. If your backend service needs to support more than 250 backends, you can enable subsetting. When subsetting is enabled, a subset of backend instances is selected for each client connection.

The following diagram shows a scaled-down model of the difference between these two modes of operation.

Comparing an internal passthrough Network Load Balancer without and with subsetting.
Comparing an internal passthrough Network Load Balancer without and with subsetting (click to enlarge).
Without subsetting, the complete set of healthy backends is better utilized, and new client connections are distributed among all healthy backends according to traffic distribution. Subsetting imposes load balancing restrictions but allows the load balancer to support more than 250 backends.

For configuration instructions, see Subsetting.

Caveats related to backend subsetting for internal passthrough Network Load Balancer
When subsetting is enabled, not all backends will receive traffic from a given sender even when the number of backends is small.
For the maximum number of backend instances when subsetting is enabled, see the quotas page .
Only 5-tuple session affinity is supported with subsetting.
Packet Mirroring is not supported with subsetting.
Enabling or disabling subsetting breaks existing connections.
If on-premises clients need for to access an internal passthrough Network Load Balancer, subsetting can substantially reduce the number of backends that receive connections from your on-premises clients. This is because the region of the Cloud VPN tunnel or Cloud Interconnect VLAN attachment determines the subset of the load balancer's backends. All Cloud VPN and Cloud Interconnect endpoints in a specific region use the same subset. Different subsets are used in different regions.
Backend subsetting pricing
There is no charge for using backend subsetting. For more information, see All networking pricing.

Session affinity
Session affinity lets you control how the load balancer selects backends for new connections in a predictable way as long as the number of healthy backends remains constant. This is useful for applications that need multiple requests from a given user to be directed to the same backend or endpoint. Such applications usually include stateful servers used by ads serving, games, or services with heavy internal caching.

Google Cloud load balancers provide session affinity on a best-effort basis. Factors such as changing backend health check states, adding or removing backends, changes in backend weights (including enabling or disabling weighted balancing), or changes to backend fullness, as measured by the balancing mode, can break session affinity.

Load balancing with session affinity works well when there is a reasonably large distribution of unique connections. Reasonably large means at least several times the number of backends. Testing a load balancer with a small number of connections won't result in an accurate representation of the distribution of client connections among backends.

By default, all Google Cloud load balancers select backends by using a five-tuple hash (--session-affinity=NONE), as follows:

Packet's source IP address
Packet's source port (if present in the packet's header)
Packet's destination IP address
Packet's destination port (if present in the packet's header)
Packet's protocol
To learn more about session affinity for passthrough Network Load Balancers, see the following documents:

Traffic distribution for external passthrough Network Load Balancers
Traffic distribution for internal passthrough Network Load Balancers
To learn more about session affinity for Application Load Balancers, see the following documents:

Session affinity for external Application Load Balancers
Session affinity for internal Application Load Balancers
To learn more about session affinity for proxy Network Load Balancers, see the following documents:

Session affinity for external proxy Network Load Balancers
Session affinity for internal proxy Network Load Balancers
Backend service timeout
Most Google Cloud load balancers have a backend service timeout. The default value is 30 seconds. The full range of timeout values allowed is 1 - 2,147,483,647 seconds.

For external Application Load Balancers and internal Application Load Balancers using the HTTP, HTTPS, or HTTP/2 protocol, the backend service timeout is a request and response timeout for HTTP(S) traffic.

For more details about the backend service timeout for each load balancer, see the following:

For global external Application Load Balancers and regional external Application Load Balancers, see Timeouts and retries.
For internal Application Load Balancers, see Timeouts and retries.
For external proxy Network Load Balancers and internal proxy Network Load Balancers, the configured backend service timeout is the length of time the load balancer keeps the TCP connection open in the absence of any data transmitted from either the client or the backend. After this time has passed without any data transmitted, the proxy closes the connection.

Default value: 30 seconds
Configurable range: 1 to 2,147,483,647 seconds
For internal passthrough Network Load Balancers and external passthrough Network Load Balancers, you can set the value of the backend service timeout using gcloud or the API, but the value is ignored. Backend service timeout has no meaning for these pass-through load balancers.

For Cloud Service Mesh, the backend service timeout field (specified using timeoutSec) is not supported with proxyless gRPC services. For such services, configure the backend service timeout using the maxStreamDuration field. This is because gRPC does not support the semantics of timeoutSec that specifies the amount of time to wait for a backend to return a full response after the request is sent. gRPC's timeout specifies the amount of time to wait from the beginning of the stream until the response has been completely processed, including all retries.
Health checks
Each backend service whose backends are instance groups or zonal NEGs must have an associated health check. Backend services using a serverless NEG or a global internet NEG as a backend must not reference a health check.

When you create a load balancer using the Google Cloud console, you can create the health check, if it is required, when you create the load balancer, or you can reference an existing health check.

When you create a backend service using either instance group or zonal NEG backends using the Google Cloud CLI or the API, you must reference an existing health check. Refer to the load balancer guide in the Health Checks Overview for details about the type and scope of health check required.

For more information, read the following documents:

Health checks overview
Creating health checks
gcloud health check page
REST API health check page
Additional features enabled on the backend service resource
The following optional features are supported by some backend services.

Cloud CDN
Cloud CDN uses Google's global edge network to serve content closer to users, which accelerates your websites and applications. Cloud CDN is enabled on backend services used by global external Application Load Balancers. The load balancer provides the frontend IP addresses and ports that receive requests, and the backends that respond to the requests.

For more details, see the Cloud CDN documentation.

Cloud CDN is incompatible with IAP. They can't be enabled on the same backend service.

Cloud Armor
If you use one of the following load balancers, you can add additional protection to your applications by enabling Cloud Armor on the backend service during load balancer creation:

Global external Application Load Balancer
Classic Application Load Balancer
Global external proxy Network Load Balancer
Classic proxy Network Load Balancer
If you use the Google Cloud console, you can do one of the following:

Select an existing Cloud Armor security policy.
Accept the configuration of a default Cloud Armor rate-limiting security policy with a customizable name, request count, interval, key, and rate limiting parameters. If you use Cloud Armor with an upstream proxy service, such as a CDN provider, Enforce_on_key should be set as an XFF IP address.
Choose to opt out of Cloud Armor protection by selecting None.
IAP
IAP lets you establish a central authorization layer for applications accessed by HTTPS, so you can use an application-level access control model instead of relying on network-level firewalls. IAP is supported by certain Application Load Balancers.

IAP is incompatible with Cloud CDN. They can't be enabled on the same backend service.

Advanced traffic management features
To learn about advanced traffic management features that are configured on the backend services and URL maps associated with load balancers, see the following:

Traffic management overview for internal Application Load Balancers
Traffic management overview for global external Application Load Balancers
Traffic management overview for regional external Application Load Balancers
API and gcloud reference
For more information about the properties of the backend service resource, see the following references:

Global backend service API resource
Regional backend service API resource

gcloud compute backend-services page, for both global and regional backend services