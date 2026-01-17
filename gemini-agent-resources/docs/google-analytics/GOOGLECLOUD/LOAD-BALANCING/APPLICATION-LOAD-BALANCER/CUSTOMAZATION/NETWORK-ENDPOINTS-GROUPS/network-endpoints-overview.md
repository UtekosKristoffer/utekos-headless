Network endpoint groups overview

A network endpoint group (NEG) is a configuration object that specifies a group of backend endpoints or services. With NEGs, Google Cloud load balancers can serve virtual machine (VM) instance group-based workloads, serverless workloads, and containerized workloads. NEGs let you distribute traffic to your load balancer's backends at a more granular level (for example, load balancing traffic at the Pod level instead of at the VM-level for GKE workloads).

You can configure NEGs as backends for your load balancers. Certain NEG types can also be used with Cloud Service Mesh. Use the following tables to decide which type of NEG you need for your deployment.

Zonal NEG
Internet NEG
Serverless NEG
Hybrid connectivity NEG
Private Service Connect NEG
Port mapping NEG
Zonal NEG
Features	Details
Purpose	
One or more internal IP address endpoints that resolve to either Compute Engine VM instances or GKE Pods.

For detailed information about this NEG and its use cases, see Zonal NEGs overview.

NetworkEndpointType API name	
GCE_VM_IP
IP only: resolves to the primary internal IPv4 address of a VM's network interface
OR

GCE_VM_IP_PORT
IP:Port: resolves to either the primary internal IPv4 address of a VM's network interface or an internal IPv4 address from an alias IP address range associated with a VM's network interface; for example, Pod IPv4 addresses in VPC-native clusters.
Only GCE_VM_IP_PORT type endpoints support IPv4 and IPv6 (dual stack) zonal NEGs.

Number of endpoints	1 or more
Health checks for NEGs attached to backend services	Centralized health checks for NEGs with GCE_VM_IP_PORT and GCE_VM_IP endpoints.
Scope	Zonal
Routing	VPC network
Google Cloud products that use this NEG	
Internal passthrough Network Load Balancer (GCE_VM_IP endpoints):
Set up zonal NEGs for internal passthrough Network Load Balancers
External passthrough Network Load Balancer (GCE_VM_IP endpoints):
Set up zonal NEGs for external passthrough Network Load Balancers
Regional internal proxy Network Load Balancer (GCE_VM_IP_PORT endpoints)
Set up zonal NEGs for regional internal proxy Network Load Balancers
Cross-region internal proxy Network Load Balancer (GCE_VM_IP_PORT endpoints)
Set up zonal and hybrid NEGs for cross-region internal proxy Network Load Balancers
Regional external proxy Network Load Balancer (GCE_VM_IP_PORT endpoints)
Set up zonal NEGs for regional external proxy Network Load Balancers
Internal Application Load Balancer (GCE_VM_IP_PORT endpoints)
Set up a regional internal Application Load Balancer with zonal and hybrid NEGs
Set up a cross-region internal Application Load Balancer with zonal and hybrid NEGs
Global external Application Load Balancer (GCE_VM_IP_PORT endpoints)
Classic Application Load Balancer (GCE_VM_IP_PORT endpoints)
Regional external Application Load Balancer (GCE_VM_IP_PORT endpoints)
Global external proxy Network Load Balancer (GCE_VM_IP_PORT endpoints)
Classic proxy Network Load Balancer (GCE_VM_IP_PORT endpoints)
Cloud Service Mesh (GCE_VM_IP_PORT endpoints)
Related documentation:

Zonal NEGs overview
Set up Zonal NEGs
Internet NEG
Features	Details
Purpose	
A single internet-routable endpoint that is hosted outside of Google Cloud.

For detailed information about this NEG and its use cases, see Internet NEGs overview.

NetworkEndpointType API name	
INTERNET_IP_PORT
IP:Port, where IP must not be a RFC 1918 address.
OR

INTERNET_FQDN_PORT
FQDN:Port
Number of endpoints	
Global NEGs: 1

Regional NEGs: 256

Health checks for NEGs attached to backend services	
Global NEGs: not supported

Regional NEGs: distributed Envoy health checks

Scope	Global or regional
Routing	Internet
Google Cloud products that use this NEG	Global internet NEGs
Cloud CDN (INTERNET_IP_PORT or INTERNET_FQDN_PORT endpoint):
Set up Cloud CDN with an external backend
External Application Load Balancer (INTERNET_IP_PORT or INTERNET_FQDN_PORT endpoint):
Set up a global external Application Load Balancer with an external backend
Set up a classic Application Load Balancer with an external backend
Cloud Service Mesh (INTERNET_FQDN_PORT endpoint):
Cloud Service Mesh with internet NEGs overview
Set up Cloud Service Mesh with an external backend
Regional internet NEGs (INTERNET_IP_PORT or INTERNET_FQDN_PORT endpoint)

Set up a regional external Application Load Balancer with an external backend
Set up a regional internal Application Load Balancer with an external backend
Set up a regional external proxy Network Load Balancer with an external backend
Set up a regional internal proxy Network Load Balancer with an external backend
Serverless NEG
Features	Details
Purpose	
A single endpoint within Google's network that resolves to an App Engine, Cloud Run functions, API Gateway, or Cloud Run resource.

For detailed information about this NEG and its use cases, see Serverless NEGs overview.

NetworkEndpointType API name	SERVERLESS
FQDN belonging to an App Engine, Cloud Run functions, API Gateway, or Cloud Run resource.

Number of endpoints	1
Health checks for NEGs attached to backend services	Not applicable
Scope	Regional
Routing	To Google APIs and Services
Google Cloud products that use this NEG	
External Application Load Balancer:
Set up a global external Application Load Balancer with an App Engine, Cloud Run functions, or Cloud Run backend
Set up a classic Application Load Balancer with an App Engine, Cloud Run functions, or Cloud Run backend
Set up a regional external Application Load Balancer with a Cloud Run backend
Get started with an external Application Load Balancer for API Gateway
Regional internal Application Load Balancer (Cloud Run and Cloud Run functions 2nd gen only):
Set up a regional internal Application Load Balancer with a Cloud Run backend
Cross-region internal Application Load Balancer (Cloud Run and Cloud Run functions 2nd gen only):
Set up a cross-region internal Application Load Balancer with a Cloud Run backend
Hybrid connectivity NEG
Features	Details
Purpose	One or more endpoints that resolve to on-premises services, server applications in another cloud, and other internet-reachable services outside Google Cloud.
NetworkEndpointType API name	NON_GCP_PRIVATE_IP_PORT
IP:Port belonging to a VM that is not in Compute Engine and that must be routable using hybrid connectivity.

Number of endpoints	1 or more
Health checks for NEGs attached to backend services	
Centralized health checks when you use this NEG with the following load balancers:

Global external Application Load Balancer
Classic Application Load Balancer
Global external proxy Network Load Balancer
Classic proxy Network Load Balancer
Distributed Envoy health checks when you use this NEG with the following load balancers:

Regional external Application Load Balancer
Regional internal Application Load Balancer
Regional external proxy Network Load Balancer
Regional internal proxy Network Load Balancer
Cross-region internal Application Load Balancer
Cross-region internal proxy Network Load Balancer
Scope	Zonal
Routing	To an on-premises network or another Cloud provider network by way of Cloud Interconnect VLAN attachment, Cloud VPN tunnel, or Router appliance VM in a VPC network
Google Cloud products that use this NEG	
External Application Load Balancer
Set up a global external Application Load Balancer with hybrid connectivity
Set up a classic Application Load Balancer with hybrid connectivity
Set up a regional external Application Load Balancer with hybrid connectivity
Internal Application Load Balancer
Set up a regional internal Application Load Balancer with hybrid connectivity
Set up a cross-region internal Application Load Balancer with hybrid connectivity
External proxy Network Load Balancer
Global external proxy Network Load Balancer
Classic proxy Network Load Balancer
Set up a regional external proxy Network Load Balancer with hybrid connectivity
Internal proxy Network Load Balancer
Set up a regional internal proxy Network Load Balancer with hybrid connectivity
Set up a cross-region internal proxy Network Load Balancer with zonal and hybrid connectivity
Cloud Service Mesh:
Cloud Service Mesh with hybrid connectivity network endpoint groups
Set up network edge services for multi‑environment deployments
Private Service Connect NEG
Features	Details
Purpose	A single endpoint that resolves to one of the following:
A Google-managed regional API endpoint
A Google-managed global API endpoint
A managed service published using Private Service Connect
NetworkEndpointType API name	PRIVATE_SERVICE_CONNECT
Number of endpoints	1
Health checks for NEGs attached to backend services	Not applicable
Scope	Regional
Routing	Private Service Connect: Supported load balancers and targets
Google Cloud products that use this NEG	
Cross-region internal Application Load Balancer
Regional internal Application Load Balancer
Global external Application Load Balancer

Private Service Connect NEGs are not supported by the classic Application Load Balancer.

Regional external Application Load Balancer
Global external proxy Network Load Balancer

To associate this load balancer with a Private Service Connect NEG, use the Google Cloud CLI or send an API request.

Private Service Connect NEGs are not supported by the classic proxy Network Load Balancer.

Regional internal proxy Network Load Balancer
Cross-region internal proxy Network Load Balancer
Regional external proxy Network Load Balancer
For more information about Private Service Connect NEGs, see About Private Service Connect backends.

Port mapping NEG
Features	Details
Purpose	
One or more endpoints, each of which provides a mapping from a client port of a Private Service Connect endpoint to a combination of service port and service producer VM.

For detailed information about this NEG and its use cases, see About Private Service Connect port mapping.

NetworkEndpointType API name	GCE_VM_IP_PORTMAP
Number of endpoints	1 or more
Health checks for NEGs attached to backend services	Not applicable
Scope	Regional
Routing	To a service producer VPC network through a connection between a Private Service Connect endpoint and a service attachment.
Google Cloud products that use this NEG	Private Service Connect port mapping