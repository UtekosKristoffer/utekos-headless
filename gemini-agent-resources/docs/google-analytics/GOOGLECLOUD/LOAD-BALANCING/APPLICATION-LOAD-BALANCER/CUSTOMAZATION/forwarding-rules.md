Forwarding rules overview

A forwarding rule specifies how to route network traffic to the backend services of a load balancer. A forwarding rule includes an IP address, an IP protocol, and one or more ports on which the load balancer accepts traffic. Some Google Cloud load balancers limit you to a predefined set of ports, and others let you specify arbitrary ports.

A forwarding rule and its corresponding IP address represent the frontend configuration of a Google Cloud load balancer.

Depending on the load balancer type, the following is true:

Forwarding rules specify either a backend service, target proxy, or target pool.
Forwarding rules and their IP addresses are either internal or external.
Forwarding rules are either global or regional, depending on the load balancer and its network tier.
In addition, global and regional forwarding rules can be designated as services in App Hub applications.

Note: Forwarding rules are also used for protocol forwarding, Classic VPN gateways, and Cloud Service Mesh to provide forwarding information in the control plane. This page only discusses forwarding rules in the context of Google Cloud load balancers.
Internal forwarding rules
Internal forwarding rules forward traffic that originates inside a Google Cloud network. The clients can be in the same Virtual Private Cloud (VPC) network as the backends, or the clients can be in a connected network.

Internal forwarding rules are used by the following Google Cloud load balancers:

Internal Application Load Balancer
Internal proxy Network Load Balancer
Internal passthrough Network Load Balancer
Internal Application Load Balancer
The internal Application Load Balancer supports IPv4 traffic using either the HTTP, HTTPS, or HTTP/2 protocols.

The scope of the forwarding rule depends on the type of load balancer:

Each regional internal Application Load Balancer has at least one regional internal forwarding rule. The regional internal forwarding rule points to the load balancer's regional target HTTP or HTTPS proxy. The forwarding rule is associated with a regional internal IP address.
Each cross-region internal Application Load Balancer has at least one global internal forwarding rule. The global internal forwarding rule points to the load balancer's global target HTTP or HTTPS proxy. The global forwarding rule is configured with a regional internal IP address and associated with a regional subnet; whereas, a global external Application Load Balancer has a global forwarding rule that has a global anycast IP address.
Internal managed forwarding rules connected to a target HTTP(S) proxy support any port number between 1 and 65535 inclusive.

As an example, the following diagram shows how a forwarding rule fits into the regional internal Application Load Balancer architecture.

Regional internal Application Load Balancer forwarding rule.
Regional internal Application Load Balancer forwarding rule (click to enlarge).
For more information about internal Application Load Balancers, see the following pages:

Internal Application Load Balancer overview
Set up an internal Application Load Balancer
Internal Application Load Balancers and connected networks
Internal proxy Network Load Balancer
With an internal proxy Network Load Balancer, the supported traffic type is IPv4, and the supported protocol is TCP.

The scope of the forwarding rule depends on the type of load balancer:

Each regional internal proxy Network Load Balancer has at least one regional internal forwarding rule. The forwarding rule specifies an internal IP address, port, and regional target TCP proxy. Clients use the IP address and port to connect to the load balancer's Envoy proxies—the forwarding rule's IP address is the IP address of the load balancer (sometimes called a virtual IP address or VIP).
Each cross-region internal proxy Network Load Balancer has at least one global internal forwarding rule. The global internal forwarding rule points to the load balancer's global target TCP proxy. The global forwarding rule is configured with a regional internal IP address and associated with a regional subnet.
Internal managed forwarding rules connected to a target TCP proxy support any port number between 1 and 65535 inclusive.

The following diagram shows how a forwarding rule fits into the regional internal proxy Network Load Balancer architecture.

Regional internal proxy Network Load Balancer forwarding rule.
Regional internal proxy Network Load Balancer forwarding rule (click to enlarge).
For more details about internal proxy Network Load Balancers, see the following pages:

Internal proxy Network Load Balancer overview
Internal proxy Network Load Balancer and connected networks
Internal passthrough Network Load Balancer
With an internal passthrough Network Load Balancer, the supported traffic types are either IPv4 or IPv6. For information about the supported protocols, see Forwarding rule protocols.

Each internal passthrough Network Load Balancer has at least one regional internal forwarding rule. The regional internal forwarding rules point to the load balancer's regional internal backend service. The following diagram shows how a forwarding rule fits into the internal passthrough Network Load Balancer architecture.

Internal passthrough Network Load Balancer forwarding rule.
Internal passthrough Network Load Balancer forwarding rule (click to enlarge).
The following diagram shows how the load balancer components fit within a subnet and region.

The internal forwarding rule must be defined in a region and a subnet. The backend service only needs to correspond to that region.

High-level internal passthrough Network Load Balancer example.
High-level internal passthrough Network Load Balancer example (click to enlarge).
For more information about internal passthrough Network Load Balancers, see the following pages:

Internal passthrough Network Load Balancer overview
Set up an internal passthrough Network Load Balancer
Internal passthrough Network Load Balancers and connected networks
External forwarding rules
External forwarding rules accept traffic from client systems that have internet access, including:

A client outside of Google Cloud
A Google Cloud VM with an external IP address
A Google Cloud VM without an external IP address using Cloud NAT or an instance-based NAT system
Note: For an on-premises network connected through Cloud VPN or Cloud Interconnect, use an internal forwarding rule with an internal passthrough Network Load Balancer or internal Application Load Balancer.
External forwarding rules are used by the following Google Cloud load balancer types:

External Application Load Balancer
External proxy Network Load Balancer
External passthrough Network Load Balancer
External Application Load Balancer
For external Application Load Balancers, the forwarding rule and IP address depend on the load balancer mode, and the Network Service Tiers that you select for the load balancer.

In an external Application Load Balancer, a forwarding rule points to a target HTTP(S) proxy. External forwarding rules connected to a target HTTP(S) proxy support any port number between 1 and 65535 inclusive.

The global external Application Load Balancer supports only Premium Tier.
Each classic Application Load Balancer can be Premium Tier or Standard Tier.
The regional external Application Load Balancer supports both Premium and Standard Tier.
IP address and forwarding rule requirements change depending on the Network Service Tier:

In Premium Tier, global external Application Load Balancers and classic Application Load Balancers use a global external IP address, which can be either IPv4 or IPv6, and a global external forwarding rule. You can provide a globally accessible application that directs end users to backends in the closest region and distributes traffic among multiple regions. Because a global external forwarding rule uses a single external IP address, you don't need to maintain separate DNS records in different regions or wait for DNS changes to propagate.

You can have two different global external IP addresses pointing to the same global external Application Load Balancer. For example, in Premium Tier, the global external IP address for one forwarding rule can be IPv4, and the global external IP address for a second forwarding rule can be IPv6. Both forwarding rules can point to the same target proxy. As a result, you can provide both an IPv4 and an IPv6 address for the same external Application Load Balancer. For more information, see the IPv6 termination documentation.

In Premium Tier, regional external Application Load Balancers use a regional external IPv4 address and a regional external forwarding rule.

In Standard Tier, regional external Application Load Balancers and classic Application Load Balancers use a regional external IPv4 address and a regional external forwarding rule. A load balancer in Standard Tier can only distribute traffic to backends within a single region.

The following diagram shows how a global forwarding rule fits into the architecture for a global external Application Load Balancer. The same architecture also applies to the classic Application Load Balancer in Premium Tier.

Global external Application Load Balancer forwarding rule.
Global external Application Load Balancer forwarding rule (click to enlarge).
Note: It is possible to attach EXTERNAL_MANAGED backend services to EXTERNAL forwarding rules. However, EXTERNAL backend services cannot be attached to EXTERNAL_MANAGED forwarding rules. To take advantage of new features available only with the global external Application Load Balancer, we recommend that you migrate your existing EXTERNAL resources to EXTERNAL_MANAGED by using the migration process described at Migrate resources from classic to global external Application Load Balancer.
For more information about external Application Load Balancers, see the External Application Load Balancer overview.

External proxy Network Load Balancer
An external proxy Network Load Balancer offers TCP proxying capability, with optional SSL offload. An external proxy Network Load Balancer is similar to an external Application Load Balancer because it can terminate SSL (TLS) sessions. However, these load balancers don't support path-based redirection like external Application Load Balancers, so they're better suited for handling SSL for protocols other than HTTPS, such as IMAP or WebSockets over SSL. In an external proxy Network Load Balancer, a forwarding rule points to either a TCP or an SSL target proxy.

External proxy Network Load Balancers support both Premium Tier and Standard Tier. The forwarding rule and IP address depend on the type of load balancer mode and the Network Service Tiers that you select for the load balancer:

The classic proxy Network Load Balancer can be Premium Tier or Standard Tier.
The global external proxy Network Load Balancer supports only Premium Tier.
The regional external proxy Network Load Balancer supports both Premium and Standard Tier.
IP address and forwarding rule requirements change depending on the Network Service Tier:

In Premium Tier, global external proxy Network Load Balancers and classic proxy Network Load Balancers use a global external IP address, which can be either IPv4 or IPv6, and a global external forwarding rule. You can provide a globally accessible application that directs end users to backends in the closest region and distributes traffic among multiple regions. Because a global external forwarding rule uses a single external IP address, you don't have to maintain separate DNS records in different regions or wait for DNS changes to propagate.

It is possible to have two different global external IP addresses pointing to the same external proxy Network Load Balancer. For example, in Premium Tier, the global external IP address for one forwarding rule can be IPv4, and the global external IP address for a second forwarding rule can be IPv6. Both forwarding rules can point to the same target proxy. As a result, you can provide both an IPv4 and an IPv6 address for the same external proxy Network Load Balancer. For more information, see the IPv6 termination documentation.

In Premium Tier, regional external proxy Network Load Balancers use a regional external IPv4 address and a regional external forwarding rule.

In Standard Tier, regional external proxy Network Load Balancers and classic proxy Network Load Balancers use a regional external IPv4 address and a regional external forwarding rule. A load balancer in Standard Tier can only distribute traffic to backends within a single region.

External forwarding rules connected to a target TCP or SSL proxy support any port number between 1 and 65535 inclusive.

The following diagram shows how a forwarding rule fits into the global external proxy Network Load Balancer architecture.

Global external proxy Network Load Balancer forwarding rule.
Global external proxy Network Load Balancer forwarding rule (click to enlarge).
For more information about external proxy Network Load Balancers, see the External proxy Network Load Balancer overview. For information about configuring external proxy Network Load Balancers, see Set up an external proxy Network Load Balancer.

External passthrough Network Load Balancer
External passthrough Network Load Balancers is a pass-through load balancer that distributes traffic among backend instances in a single region. An external passthrough Network Load Balancer uses a regional external forwarding rule and a regional external IP address. The regional external IP address can be accessed from anywhere on the internet and by Google Cloud VMs with internet access.

For backend service-based external passthrough Network Load Balancers, the regional external forwarding rule points to a backend service. Backend service-based external passthrough Network Load Balancers support TCP, UDP, ESP, GRE, ICMP, and ICMPv6 traffic. For details, see Forwarding rule protocols for backend service-based external passthrough Network Load Balancers. Forwarding rules for backend service-based load balancers can be configured with either IPv4 or IPv6 addresses. Forwarding rules for backend service-based external passthrough Network Load Balancers support the following advanced features:

Direct traffic coming from a specific range of source IP addresses to a specific backend service. For more information, see Traffic steering.
Distribute traffic across the load balancer's backend instances based on the weights reported by an HTTP health check using Weighted load balancing.
For target pool-based external passthrough Network Load Balancers, the forwarding rule points to a target pool. A target pool-based external passthrough Network Load Balancer supports only TCP or UDP traffic. Forwarding rules for target pool-based external passthrough Network Load Balancer support only IPv4 addresses.

For regional external IPv4 addresses, the external passthrough Network Load Balancer supports both Standard Tier and Premium Tier. Regional external IPv6 addresses are only available in the Premium Tier.
To support backend instances in more than one region, you must create a external passthrough Network Load Balancer in each region. This is the case regardless of whether the IP address of the load balancer is in the Premium Tier or the Standard Tier.

The following figure shows an external passthrough Network Load Balancer which has a regional external forwarding rule with the IP address, 120.1.1.1. The load balancer is serving requests from backends in the us-central1 region.

External passthrough Network Load Balancer example.
External passthrough Network Load Balancer example (click to enlarge).
For more information about external passthrough Network Load Balancers, see the External passthrough Network Load Balancer overview. For information about configuring external passthrough Network Load Balancers, see one of the following:

Setting up an external passthrough Network Load Balancer with a backend service (TCP or UDP traffic only)
Setting up an external passthrough Network Load Balancer with a backend service (multiple protocols)
Setting up an external passthrough Network Load Balancer with a target pool
How Network Service Tiers affect load balancers
In Network Service Tiers, the distinction between Standard Tier and Premium Tier depends on how far traffic is routed over the public internet:

Standard Tier: Offloads traffic as close as possible to the data center. This means that traffic is typically routed over the public internet for a longer distance, compared with Premium Tier.

Premium Tier: Routes traffic through Google's production network as far as possible before leaving Google Cloud to get to the end user.

Load balancer	Supported Network Service Tiers
Global external Application Load Balancer
Global external proxy Network Load Balancer
These load balancers are always Premium Tier. Their backend services, forwarding rules, and IP addresses are global.
Classic Application Load Balancer
Classic proxy Network Load Balancer
These load balancers can be Premium Tier or Standard Tier.

With Premium Tier, they are global. Their forwarding rules, IP addresses, and backend services are global.

In Standard Tier, these load balancers are effectively regional. Their backend services are global, but their forwarding rules and IP addresses are regional.

Regional external Application Load Balancer
Regional external proxy Network Load Balancer
These load balancers can be Premium or Standard Tier. Their backend services, forwarding rules, and IP addresses are always regional.
Cross-region internal Application Load Balancer
Regional internal Application Load Balancer
Regional internal proxy Network Load Balancer
Cross-region internal proxy Network Load Balancer
Internal passthrough Network Load Balancer
These load balancers support traffic within a VPC network (including networks connected to it). Traffic is Premium Tier because it is within a VPC network.
External passthrough Network Load Balancer	
These load balancers must use regional external IPv4 or IPv6 addresses.

These load balancers can be either Premium or Standard Tier. IPv6 addresses require Premium Tier.

Only the backend service-based external passthrough Network Load Balancers can handle IPv6 traffic.

IP protocol specifications
Each forwarding rule has an associated IP protocol that the rule will serve. The default protocol value is TCP.

Note:
For external passthrough Network Load Balancers, the L3_DEFAULT forwarding rule protocol can be used to load balance TCP, UDP, ESP, GRE, ICMP, and ICMPv6 traffic.
For internal passthrough Network Load Balancer forwarding rules that use IPv4 or IPv6 addresses, the L3_DEFAULT forwarding rule protocol can be used to load balance the TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, and GRE traffic.
Product	Load balancing scheme	IP protocol options
Global external Application Load Balancer	EXTERNAL_MANAGED	TCP
Classic Application Load Balancer	EXTERNAL	TCP
Regional external Application Load Balancer	EXTERNAL_MANAGED	TCP
Cross-region internal Application Load Balancer	INTERNAL_MANAGED	TCP
Regional internal Application Load Balancer	INTERNAL_MANAGED	TCP
Global external proxy Network Load Balancer	EXTERNAL_MANAGED	TCP or SSL
Classic proxy Network Load Balancer	EXTERNAL	TCP or SSL
Regional external proxy Network Load Balancer	EXTERNAL_MANAGED	TCP
Regional internal proxy Network Load Balancer	INTERNAL_MANAGED	TCP
Cross-region internal proxy Network Load Balancer	INTERNAL_MANAGED	TCP
External passthrough Network Load Balancer	EXTERNAL	TCP, UDP, or L3_DEFAULT
Internal passthrough Network Load Balancer	INTERNAL	TCP, UDP, or L3_DEFAULT
Cloud Service Mesh	INTERNAL_SELF_MANAGED	TCP
IP address specifications
The forwarding rule must have an IP address that your customers use to reach your load balancer. The IP address can be static or ephemeral.

A static IP address provides a single reserved IP address that you can point your domain to. If you ever need to delete your forwarding rule and re-add it, you can continue using the same reserved IP address.

An ephemeral IP address remains constant while the forwarding rule exists. When you choose an ephemeral IP address, Google Cloud associates an IP address with your load balancer's forwarding rule. If you need to delete the forwarding rule and re-add it, the forwarding rule might receive a new IP address.

Depending on the load balancer type, the IP address can have various attributes. The following table summarizes the valid IP address configurations, based on the load balancing scheme and the target of the forwarding rule.

Product and scheme	Target	IP address type	IP address scope	IP address tier	Reservable IP address	Notes
Global external Application Load Balancer

EXTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	External	Global	Premium Tier: Global external IP address and forwarding rule	Yes, optional	IPv6 available
Classic Application Load Balancer

EXTERNAL*	Target HTTP proxy
Target HTTPS proxy	External	Regional or global, matching the forwarding rule	Premium Tier: Global external IPv4 or IPv6 address and forwarding rule

Standard Tier: Regional external IPv4 address and forwarding rule	Yes, optional	IPv6 available with a global external address (Premium Tier)
Regional external Application Load Balancer

EXTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	External	Regional	Premium Tier or Standard Tier	Yes, optional	IPv6 not available
Cross-region internal Application Load Balancer

INTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	Internal	Regional	Premium Tier	Yes, optional	Global forwarding rule is configured with a regional IP address within the primary IPv4 address range of the associated regional subnet. This is different from the global external Application Load Balancer where the global forwarding rule has a global anycast IP address.
Regional internal Application Load Balancer

INTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	Internal	Regional	Premium Tier	Yes, optional	Forwarding rule address must be within the primary IPv4 address range of the associated subnet.
Global external proxy Network Load Balancer

EXTERNAL_MANAGED	Target SSL proxy
Target TCP proxy	External	Global	Premium Tier	Yes, optional	IPv6 available
Classic proxy Network Load Balancer

EXTERNAL	Target SSL proxy
Target TCP proxy	External	Regional or global, matching the forwarding rule	Premium Tier: Global external IPv4 or IPv6 address and forwarding rule

Standard Tier: Regional external IPv4 address and forwarding rule	Yes, optional	IPv6 available with a global external address (Premium Tier)
Regional external proxy Network Load Balancer

EXTERNAL_MANAGED	Target TCP proxy	External	Regional	Premium Tier or Standard Tier	Yes, optional	IPv6 not available
Regional internal proxy Network Load Balancer

INTERNAL_MANAGED	Target TCP proxy	Internal	Regional	Premium Tier	Yes, optional	Forwarding rule address must be within the primary IPv4 address range of the associated subnet
Cross-region internal proxy Network Load Balancer

INTERNAL_MANAGED	Target TCP proxy	Internal	Regional	Premium Tier	Yes, optional	Forwarding rule address must be within the primary IPv4 address range of the associated subnet
External passthrough Network Load Balancer

EXTERNAL	Backend service
Target pool	External	Regional	Standard (IPv4 addresses)
Premium (IPv4 or IPv6 addresses)	Yes, optional	IPv6 support requires a backend service-based external passthrough Network Load Balancer. Forwarding rule IPv6 address must be within a subnet's external IPv6 address range. The external IPv6 address is sourced from the subnet's external IPv6 address range and is therefore in Premium Tier.
Internal passthrough Network Load Balancer

INTERNAL	Backend service	Internal	Regional	Premium Tier	Yes, optional	
For IPv4 traffic, the forwarding rule must reference an IPv4 address from the primary IPv4 subnet range.

For IPv6 traffic, the forwarding rule must reference a /96 range of internal IPv6 addresses from a dual-stack or single-stack (IPv6-only) subnet's /64 internal IPv6 address range.

Cloud Service Mesh

INTERNAL_SELF_MANAGED	Target HTTP proxy
Target gRPC proxy	Internal	Global	Not applicable	No	0.0.0.0, 127.0.0.1, or any RFC 1918 address is allowed
Classic VPN

EXTERNAL	See the Classic VPN documentation	External	Regional	Cloud VPN doesn't have Network Service Tiers	Yes, required	IPv6 not supported
* It is possible to attach EXTERNAL_MANAGED backend services to EXTERNAL forwarding rules. However, EXTERNAL backend services cannot be attached to EXTERNAL_MANAGED forwarding rules. To take advantage of new features available only with the global external Application Load Balancer, we recommend that you migrate your existing EXTERNAL resources to EXTERNAL_MANAGED by using the migration process described at Migrate resources from classic to global external Application Load Balancer.
Multiple forwarding rules with a common IP address
Two or more forwarding rules with the EXTERNAL or EXTERNAL_MANAGED load balancing scheme (or a combination of both) can share the same IP address if the following are true:

The ports used by each forwarding rule don't overlap. This is because each combination of IP address + protocol + port must be unique.
The Network Service Tiers of each forwarding rule matches the Network Service Tiers of the external IP address.
Examples:

An external passthrough Network Load Balancer that accepts traffic on TCP port 79 and another external passthrough Network Load Balancer that accepts traffic on TCP port 80 can share the same regional external IP address.
You can use the same global external IP address for an external Application Load Balancer (HTTP and HTTPS).
Two or more forwarding rules with the INTERNAL or INTERNAL_MANAGED load balancing scheme (or a combination of both) can share the same IP address if the following is true:

The ports used by each forwarding rule don't overlap. This is because each combination of IP address + protocol + port must be unique.
For more information, see the following:

For internal passthrough Network Load Balancers, see Internal passthrough Network Load Balancer forwarding rules that use a common IP address
For internal Application Load Balancers, see Use a common IP address between multiple internal forwarding rules
For internal proxy Network Load Balancers, see Forwarding rules and IP addresses
If the forwarding rule's load balancing scheme is INTERNAL_SELF_MANAGED for Cloud Service Mesh, it must have a unique IP address.
Port specifications
The following table summarizes the valid port configurations, based on the load balancing scheme and the target of the forwarding rule.

Product	Load balancing scheme	Target	Port requirements
Global external Application Load Balancer

Regional external Application Load Balancer	EXTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	Can reference exactly one port from 1-65535
Classic Application Load Balancer	EXTERNAL	Target HTTP proxy
Target HTTPS proxy	Can reference exactly one port from 1-65535
Cross-region internal Application Load Balancer

Regional internal Application Load Balancer	INTERNAL_MANAGED	Target HTTP proxy
Target HTTPS proxy	Can reference exactly one port from 1-65535
Global external proxy Network Load Balancer	EXTERNAL_MANAGED	Target TCP proxy
Target SSL proxy	Can reference exactly one port from 1-65535
Classic proxy Network Load Balancer	EXTERNAL	Target TCP proxy
Target SSL proxy	Can reference exactly one port from 1-65535
Regional external proxy Network Load Balancer	EXTERNAL_MANAGED	Target TCP proxy	Can reference exactly one port from 1-65535
Regional internal proxy Network Load Balancer	INTERNAL_MANAGED	Target TCP proxy	Can reference exactly one port from 1-65535
Cross-region internal proxy Network Load Balancer	INTERNAL_MANAGED	Target TCP proxy	Can reference exactly one port from 1-65535
External passthrough Network Load Balancer	EXTERNAL	Backend service	If the forwarding rule protocol is TCP or UDP, you can configure:
A list of up to five (contiguous or non-contiguous) ports, or,
A single port range (contiguous), or,
All ports. To configure all ports, either set --ports=ALL using the gcloud command line tool, or set allPorts to True using the API.

If the forwarding rule protocol is L3_DEFAULT, you must configure all ports.
To configure all ports, either set --ports=ALL using the gcloud command line tool, or set allPorts to True using the API.
Target pool	
Must be a single port range (contiguous)

Specifying a port is optional for forwarding rules used with target pool-based external passthrough Network Load Balancers. If no port is specified, traffic from all ports (1-65535) is forwarded.

Internal passthrough Network Load Balancer	INTERNAL	Backend service	Up to five (contiguous or non-contiguous) ports or you can configure all ports using one of these methods:
set --ports=ALL using the gcloud command line tool, or
set allPorts to True using the API.
Cloud Service Mesh	INTERNAL_SELF_MANAGED	Target HTTP proxy
Target HTTPS proxy	Must be a single value.

Within a VPC network, no two forwarding rules for Cloud Service Mesh can have the same IP address and port specification.
Classic VPN	EXTERNAL	Target VPN gateway	Can reference exactly one of the following ports: 500, 4500
IAM conditions
With Identity and Access Management (IAM) conditions, you can set conditions to control which roles are granted to principals. This feature lets you grant permissions to principals if configured conditions are met.

An IAM condition checks the load balancing scheme (for example, INTERNAL or EXTERNAL) in the forwarding rule and allows (or disallows) creation of the forwarding rule. If a principal tries to create a forwarding rule without permission, an error message appears.

For more information, see IAM Conditions.

Use forwarding rules
If you're using the Google Cloud console to set up a load balancer, the forwarding rule is set up implicitly as part of your frontend configuration. If you're using the Google Cloud CLI or the API, you need to configure the forwarding rule explicitly.

After creating a forwarding rule, you can make limited changes to it. For example, after a forwarding rule is defined, you can't change its IP address, port number, or protocol. However, you can update certain settings for forwarding rules by editing the frontend configuration of the load balancer they are associated with. Use either the gcloud CLI or the API to make any other changes.

Change the IP address of a forwarding rule
You cannot change the IP address of an existing forwarding rule. To update the IP address of a forwarding rule, you must delete and recreate the rule as follows:

Delete the forwarding rule using the gcloud compute forwarding-rules delete command or the forwardingRules.delete method.

Recreate the forwarding rule using the gcloud compute forwarding-rules create command or the forwardingRules.insert method.

APIs
For descriptions of the properties and methods available to you when working with forwarding rules through the REST API, see the following:

Global: globalForwardingRules
Regional: forwardingRules
Google Cloud CLI
For the gcloud CLI reference documentation, see the following:

gcloud compute forwarding-rules

Global: --global
Regional: --region=[REGION]
What's next
To learn more about protocol forwarding, see Protocol forwarding overview.
