IPv6 for Application Load Balancers and proxy Network Load Balancers

This document shows you how IPv6 traffic is handled by Application Load Balancers and proxy Network Load Balancers. These load balancers are proxy load balancers, which means that incoming client connections are terminated at the load balancer. The load balancer then initiates a new connection to forward the client request to the backend. Depending on the type of load balancer, you can enable IPv6 for either or both of these connections.

Enabling IPv6 for your load balancer has the following benefits:

Use a single anycast IPv6 address for multi-region deployments. You only need one load balancer IPv6 address for application instances running across multiple regions. This means that your DNS server has a single AAAA record and that you don't need to load balance among multiple IPv6 addresses. Caching of AAAA records by clients is not an issue because there's only one address to cache. User requests to the IPv6 address are automatically load balanced to the closest healthy backend with available capacity.
Run dual-stack deployments. To serve both IPv6 and IPv4 clients, create two load balancer IP addresses—one for IPv6 and the other for IPv4. IPv4 clients connect to the IPv4 address while IPv6 clients connect to the IPv6 address. These clients are then automatically load balanced to the closest healthy IPv4 or IPv6 dual-stack backends with available capacity. To see which load balancers support dual-stack backends, see Table: Backend services and supported backend types.

Load balance HTTP, HTTPS, HTTP/2, TCP, and SSL/TLS IPv6 client traffic. Protocol support depends on the type of load balancer you are using and the forwarding rule protocol.

Overflow across regions with a single IPv6 load balancer address. If backends in one region are out of resources or unhealthy, the global load balancer automatically directs requests from users to the next closest region with available resources. When the closest region has available resources, global load balancing reverts back to serving by this region. Global load balancing requires that you use the Premium Tier of Network Service Tiers.
Load balancer support
For proxy-based load balancers such as Application Load Balancers and Proxy Network Load Balancers, the connection from the client to the load balancer and the second connection from the load balancer to the backend can be configured independently of each other. For example, the load balancer can accept IPv4 traffic from a client, terminate the connection, and then forward the request from the load balancer to the backend over a new IPv6 connection, as long as the backend is a dual-stack backend that is equipped to handle IPv6 connections.

To enable a load balancer to receive IPv6 connections from clients, you must use an IPv6 address for the load balancer's forwarding rule. The subsequent connection from the load balancer to the backend uses IPv4 by default. However, you can enable certain load balancers to use IPv6 by configuring the IP address selection policy option on the backend service.

The following table describes which connection types are supported by all the proxy-based load balancers:

Load balancer	Connection from clients to load balancer	Connection from load balancer to backends
Global external Application Load Balancer
Global external proxy Network Load Balancer	Both IPv4 and IPv6 connections can be terminated.	Either of the following:
IPv4 connection: supported with IPv4-only or dual-stack backends
IPv6 connection: supported with dual-stack backends* only
Classic Application Load Balancer
Classic proxy Network Load Balancer	Both IPv4 and IPv6 connections can be terminated.	IPv4 connection only
Regional external Application Load Balancer
Regional external proxy Network Load Balancer
Regional internal Application Load Balancer
Regional internal proxy Network Load Balancer
Cross-region internal Application Load Balancer
Cross-region internal proxy Network Load Balancer	Only IPv4. IPv6 traffic is not supported.	Either of the following:
IPv4 connection: supported with IPv4-only or dual-stack backends
IPv6 connection: supported with dual-stack backends* only
* Only instance groups and zonal NEGs (with GCE_VM_IP_PORT endpoints) can be configured to be dual-stack.
Note: Google Cloud also supports IPv6 traffic (both dual-stack and IPv6-only support) for internal and external passthrough Network Load Balancers. For information about these load balancers, see the Backend service-based external passthrough Network Load Balancer overview and the Internal passthrough Network Load Balancer overview.
How IPv6 termination works
IPv6 termination is supported by the global and classic Application Load Balancers and proxy Network Load Balancers. Configuring IPv6 termination for these load balancers lets your backends appear as IPv6 applications to your IPv6 clients, as shown in the following figure:

IPv6 termination for load balancing.
IPv6 termination for load balancing (click to enlarge).
When a user connects to the load balancer through IPv6, the following happens:

Your load balancer, with its IPv6 address and forwarding rule, waits for user connections.
An IPv6 client connects to the load balancer using IPv6.
The load balancer acts as a reverse proxy and terminates the IPv6 client connection. Based on the backend service IP address selection policy it places the request into an IPv4 or IPv6 connection to a backend.
On the reverse path, the load balancer receives the response from the backend, and then places it into the IPv6 connection back to the original client.
IPv6 address allocation for load balancer forwarding rules
When you configure an external load balancer, you provide it with one or more forwarding rules, each with an external, publicly routed IPv4 or IPv6 IP address (or both). You can use this IP address in the DNS records for your site.

When you create a forwarding rule, you can either use a static IP address reserved for your project or you can have the forwarding rule automatically acquire an ephemeral IP address when you create the rule. A static IP address is reserved to your project, and you can keep it until you deliberately release it. An ephemeral address belongs to the forwarding rule as long as the forwarding rule exists. If you delete the forwarding rule, the ephemeral address is released back into the Google Cloud pool.

If you need both an IPv4 and IPv6 address for your load balancer, you can create two forwarding rules, associating an IPv4 address with one and an IPv6 address with the other. You can then associate both rules with the same load balancer.

IPv6 address format
Google Cloud allocates a /64 IPv6 address range to IPv6 forwarding rules. The Google Cloud CLI lists IPv6 addresses with the least significant 64 bits set to 0, but the load balancer accepts traffic on the full range. Therefore, you might see other load balancer IPv6 addresses in the allocated range in X-Forwarded-For headers depending on which IPv6 server IP address the client connected to.

When formatting an IPv6 address, Google Cloud follows the recommendations in RFC 5952,section 4.

Client IP header with IPv6 termination for external Application Load Balancers
When the load balancer proxies the IPv6 connection from the client to an IPv4 connection to your backend, the original source IP address is replaced with the load balancer's IP address. However, backends often need to know the original source IP address for logging, for decision making, or for other purposes. Google Cloud provides an HTTP header that is propagated to the backends that includes the original IPv6 client IP address.

HTTP headers for IPv6 are similar to those for IPv4. The format for requests is as follows:

X-Forwarded-For: CLIENT_IP_ADDRESS, GLOBAL_FORWARDING_RULE_EXTERNAL_IP_ADDRESSES
The last element shows the load balancer IP address. The second to last element shows the client IP address as seen by the load balancer. There might be other elements in the X-Forwarded-For header when the client or intervening proxies add other X-Forwarded-For headers before sending the request to the load balancer.

An example X-Forwarded-For header may look like this:


X-Forwarded-For: 2001:db8:abcd:1::1234, 2607:f8b0:4005:801::200e
2001:db8:abcd:1::1234 is the client's IPv6 address. 2607:f8b0:4005:801::200e is the IPv6 address of the external Application Load Balancer.

Convert from IPv4-only to dual-stack
You can convert load balancer resources that use IPv4-only (single-stack) to IPv4 and IPv6 (dual-stack). By updating load balancer resources, you can automatically route IPv6 traffic to your backends.

For instructions to convert your load balancer resources and backends to dual stack, refer to the following documentation:

Load balancer	Documentation
Global external Application Load Balancer
Cross-region internal Application Load Balancer
Regional external Application Load Balancer
Regional internal Application Load Balancer	Convert Application Load Balancer to IPv6
Global external proxy Network Load Balancer
Cross-region internal proxy Network Load Balancer
Regional external proxy Network Load Balancer
Regional internal proxy Network Load Balancer	Convert proxy Network Load Balancer to IPv6
Pricing
Forwarding rules for IPv6 termination are provided at no additional cost. You are not charged for ephemeral IPv6 addresses. Reserved IPv6 addresses are charged at existing rates regardless of whether they are in use. Otherwise, pricing for IPv6 load balancing is the same as pricing for IPv4 load balancing. For load balancing pricing details, see Network pricing.

Limitations
Classic proxy Network Load Balancers and classic Application Load Balancers don't support dual-stack backends; the IPv6 traffic is terminated by the load balancer and then proxied over an IPv4 connection to the backends.
Regional external Application Load Balancers, regional internal Application Load Balancers, regional internal proxy Network Load Balancers, cross-region internal proxy Network Load Balancers, cross-region internal Application Load Balancers, and regional external proxy Network Load Balancers don't support IPv6 frontends. Ingress IPv4 traffic is proxied over an IPv4 or IPv6 connection to the IPv4 and IPv6 (dual-stack) backends.

Only VM instance group backends and zonal network endpoint group (NEG) with GCE_VM_IP_PORT endpoints support dual-stack (IPv4 and IPv6) backends.

