Target proxies overview

When you create an Application Load Balancer or a proxy Network Load Balancer, one of the resources that you configure is the target proxy. Target proxies terminate incoming connections from clients and create new connections from the load balancer to the backends.

At a high-level, traffic is handled according to the following process:

A target proxy is referenced by one or more forwarding rules. The target proxy listens on the IP address and port specified by the load balancer's forwarding rule.

A client makes a connection to the IP address and port of the load balancer's forwarding rule.

The target proxy receives the client request. It then compares the request's destination IP address and port to the IP address and port configured in each forwarding rule that references the target proxy. If a match is found, the target proxy terminates the client's network connection.

Depending on the type of load balancer, target proxies terminate connections by using either Google Front Ends (GFEs) or Envoy proxies.

The target proxy establishes a new connection to the appropriate backend VM instance or endpoint, as determined by the load balancer's URL map (applicable only to Application Load Balancers) and backend service configuration.

Note: Target proxies are also used by Cloud Service Mesh. This page only discusses target proxies in the context of Cloud Load Balancing.
Target proxy types
Cloud Load Balancing uses different target proxies depending on the type of load balancer that you configure.

Load balancer	Target proxy type	Target proxy scope
Global external Application Load Balancer	Target HTTP proxy
Target HTTPS proxy	Global
Classic Application Load Balancer	Target HTTP proxy
Target HTTPS proxy	Global
Regional external Application Load Balancer *	Target HTTP proxy
Target HTTPS proxy	Regional
Cross-region internal Application Load Balancer *	Target HTTP proxy
Target HTTPS proxy	Global
Regional internal Application Load Balancer *	Target HTTP proxy
Target HTTPS proxy	Regional
Global external proxy Network Load Balancer	Target SSL proxy
Target TCP proxy	Global
Classic proxy Network Load Balancer	Target SSL proxy
Target TCP proxy	Global
Regional external proxy Network Load Balancer *	Target TCP proxy	Regional
Regional internal proxy Network Load Balancer *	Target TCP proxy	Regional
Cross-region internal proxy Network Load Balancer *	Target TCP proxy	Global
* This load balancer requires a proxy-only subnet in each region of a VPC network in which you use an Envoy-based load balancer. Connections to the backend originate from this proxy-only subnet.

Cloud Load Balancing supports the following resource combinations:

Forwarding rule > target HTTPS proxy > URL map > one or more backend services
Forwarding rule > target HTTP proxy > URL map > one or more backend services
Forwarding rule > target TCP proxy > one backend service
Forwarding rule > target SSL proxy > one backend service
Health checks and backends are not shown in the preceding list.

SSL certificates
Google Cloud proxy load balancers whose forwarding rules reference a target HTTPS proxy or target SSL proxy require a private key and SSL certificate as part of the load balancer's target proxy configuration. Depending on the type of load balancer you configure, you use either a Compute Engine SSL certificate resource or Certificate Manager.

To learn about which SSL certificate is supported for your configuration, see SSL certificates overview.

Optional features available
The following optional features can be configured on target proxies associated with certain types of load balancers. See the topics for more details.

SSL policies
HTTP/3 support
Client HTTP keepalive timeout
Use target proxies
If you're using the Google Cloud console to set up a load balancer, the target proxy is set up implicitly as part of your frontend configuration. If you're using the Google Cloud CLI or the API, you need to configure the target proxy explicitly.

You can't use the Google Cloud console to modify individual target proxies. However, you can update certain settings for target proxies by editing the frontend configuration of the load balancer they are associated with. Use either the gcloud CLI or the API to make any other changes.

To delete a target proxy, make sure that you first delete any forwarding rules that reference it.

APIs
For descriptions of the properties and methods available to you when working with target proxies through the REST API, see the following topics:

Target HTTPS proxy: Global | Regional
Target HTTP proxy: Global | Regional
Target TCP proxy: Global | Regional
Target SSL proxy: Global
gcloud CLI
For the gcloud CLI reference documentation, see the following topics:

gcloud compute target-https-proxies
gcloud compute target-http-proxies
gcloud compute target-tcp-proxies
gcloud compute target-ssl-proxies
