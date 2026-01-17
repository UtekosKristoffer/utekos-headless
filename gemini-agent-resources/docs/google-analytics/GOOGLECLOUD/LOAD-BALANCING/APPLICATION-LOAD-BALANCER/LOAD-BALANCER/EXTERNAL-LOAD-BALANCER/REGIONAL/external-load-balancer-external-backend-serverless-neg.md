Set up a regional external Application Load Balancer with an external backend

The guide shows you how to configure a regional external Application Load Balancer that proxies requests to an external backend. An external backend is an endpoint that is external to Google Cloud.
Before following this guide, familiarize yourself with the Internet NEG overview documentation, including the limitations.

The following architecture diagram shows a regional external Application Load Balancer frontend with an external backend.
A regional external Application Load Balancer with an external backend.
Figure 1. A regional external Application Load Balancer with an external backend (click to enlarge).

Note: Regional external Application Load Balancers support both the Premium and Standard Network Service Tiers. This procedure demonstrates the setup with Standard Tier.

Permissions
To follow this guide, you need to create an internet NEG and create or modify an Application Load Balancer in a project. You should be either a project Owner or Editor (roles/owner or roles/editor), or you should have both of the following Compute Engine IAM roles.

Task	Required role
Create and modify load balancer components	Compute Network Admin
(roles/compute.networkAdmin)
Create and modify NEGs	Compute Instance Admin
(roles/compute.instanceAdmin)
Optional: Use BYOIP addresses
With bring your own IP (BYOIP), you can import your own public addresses to Google Cloud to use the addresses with Google Cloud resources. For example, if you import your own IPv4 addresses, you can assign one to the forwarding rule when you configure your load balancer. When you follow the instructions in this document to create the load balancer, provide the BYOIP address as the IP address.

For more information about using BYOIP, see Bring your own IP addresses.

Set up your external backend environment outside Google Cloud
To set up your external backend environment, see the following sections.

Configure network endpoints
Configure a network endpoint to expose your external backend to Google Cloud. Make sure that the endpoint—either an IP:Port combination or a fully-qualified domain name (FQDN) and port—is reachable over the internet. This endpoint is later referenced from the internet NEG.

For detailed configuration requirements for internet NEG endpoints, see the Internet NEGs overview.

Allow the external backend to receive traffic from Google Cloud
This step can be completed after you've created the proxy-only subnet and set up the Cloud NAT gateway.

To allow requests from Google Cloud to reach your external backend, you'll need to perform the following steps:

Configure a Cloud NAT gateway with IP addresses that are used for egress traffic from Google Cloud. The gateway maps the proxy-only subnet range to the external IP addresses. For the steps, see Set up a Cloud NAT gateway.
Make sure that your external backend environment is configured to allow traffic from Google Cloud to reach the external backend. For example, if you used pre-reserved IP addresses for the NAT gateway, you'll allowlist those IP addresses on your external environment. You'll likely need to work with the network or security admin of your external environment to set this up.
Set up your Google Cloud environment
You'll need a VPC network with two subnets: one for the load balancer components and the other for the region's proxy-only subnet. Then you'll create the load balancer with an internet NEG backend.


Note: If you're planning a cross-cloud deployment with a regional internet NEG, you can use Cloud Location Finder to identify the optimal region or zone for your deployment based on factors like distance, network latency, carbon footprint (Google CFE%), or the territory code (in case you have regulatory requirements for your network traffic). For details, see the Cloud Location Finder documentation (Preview).
Create the VPC network and subnet
This subnet is used to create the load balancer's components.

Cloud console
gcloud
In the Google Cloud console, go to the VPC networks page.
Go to VPC networks
Click Create VPC network.
Enter a Name: LB_NETWORK.
In the Subnets section:
Set the Subnet creation mode to Custom.
In the New subnet section, enter the following information:
Name: LB_SUBNET_NAME
Region: REGION
IP address range: LB_SUBNET_RANGE
Click Done.
Click Create.
Configure the proxy-only subnet
This proxy-only subnet is used by all regional Envoy-based load balancers in the REGION region.

Console
gcloud
In the Google Cloud console, go to the VPC networks page.
Go to VPC networks
Select a Network from the list.
Click Add subnet.
Enter a Name: PROXY_ONLY_SUBNET_NAME.
Select a Region: REGION.
Set Purpose to Regional Managed Proxy.
Enter an IP address range: PROXY_ONLY_SUBNET_RANGE.
Click Add.
Set up a Cloud NAT gateway
Before you configure the Cloud NAT gateway, make sure you've reviewed the associated limitations and pricing considerations. For details, see Regional NEGs: Use a Cloud NAT gateway.
The following commands describe how to set up a Cloud NAT gateway. The Cloud NAT gateway can be configured to use either automatic NAT external IP addresses, in which allocation is based on demand, or to use a manually pre-reserved set of external IP addresses. The gateway maps the proxy-only subnet range to the external IP addresses.

Set up automatic NAT allocated IP addresses
When you create a Cloud NAT gateway with automatic NAT IP address allocation, you can specify the Network Service Tiers (Premium Tier or Standard Tier) from which the Cloud NAT gateway allocates the IP addresses.

Console
gcloud
In the Google Cloud console, go to the Cloud NAT page.

Go to Cloud NAT

Click Get started or Create Cloud NAT gateway.

Note: If this is the first Cloud NAT gateway that you're creating, click Get started. If you already have existing gateways, then instead of Get started, Google Cloud displays the Create Cloud NAT gateway button. To create another gateway, click Create Cloud NAT gateway.
Enter a gateway name LB_NAT_CONFIG.

For NAT type, select Public.

In the Network list, select LB_NETWORK.

In the Region list, select REGION.

Create a Cloud Router in the region.

For Source endpoint type, select Managed proxy load balancers.

In the Source list, select Custom.

For Subnets, select PROXY_ONLY_SUBNET_NAME.
In the Cloud NAT IP addresses list, select Automatic (recommended).

For Network service tier, choose either Premium or Standard.

Click Create.

Set up manually allocated IP addresses
Use manually allocated IP addresses only if your external backend environment requires you to use an allowlist for specific Google Cloud IP addresses. If the external backend environment doesn't need an allowlist, use dynamic allocation instead as shown previously.

When creating a Cloud NAT gateway, you can choose to manually assign NAT IP addresses from either Premium Tier or Standard Tier or both, subject to certain conditions.

Warning: If you provision fewer NAT IP addresses than the number of assigned Envoy proxies, requests sent to the internet NEG might result in HTTP 5xx errors. To ensure that you are informed when such an event occurs, set up an alert for the nat_allocation_failed metric. Contact support if you need help calculating the number of IP addresses that must be allocated for your load balancer in a specific region.
Console
gcloud
In the Google Cloud console, go to the Cloud NAT page.

Go to Cloud NAT

Click Get started or Create Cloud NAT gateway.

Note: If this is the first Cloud NAT gateway that you're creating, click Get started. If you already have existing gateways, then instead of Get started, Google Cloud displays the Create Cloud NAT gateway button. To create another gateway, click Create Cloud NAT gateway.
Enter a gateway name LB_NAT_CONFIG.

In the Network list, select LB_NETWORK.

In the Region list, select REGION.

Select or create a Cloud Router in the region.

For Source endpoint type, select Managed proxy load balancers.

In the Source list, select Custom.

In the Subnets, select PROXY_ONLY_SUBNET_NAME.
In the Cloud NAT IP addresses list, select Manual.

For Network service tier, choose either Premium or Standard.

Select or create a static reserved external IP address to use for NAT.

Note: You can only select or create IP addresses based on the tier that you have selected in the previous step.
If you want to specify additional IP addresses, click Add IP address, and then select or create an additional static reserved external IP address.

Click Create.

Set up dynamic port allocation
Update the Cloud NAT gateway to use dynamic port allocation mode to fully use the assigned IP addresses.

gcloud
Update the Cloud NAT gateway. We recommend that you set the minimum number of ports to 2048 and the maximum number of ports to 4096.



gcloud compute routers nats update LB_NAT_CONFIG \
    --router=ROUTER_NAME \
    --enable-dynamic-port-allocation \
    --min-ports-per-vm=MIN_PORTS_PER_VM \
    --max-ports-per-vm=MAX_PORTS_PER_VM \
    --region=REGION
Verify that dynamic port allocation is enabled and the minimum and maximum number of ports are set.



gcloud compute routers nats describe LB_NAT_CONFIG \
     --router=ROUTER_NAME \
     --region=REGION
The output is similar to the following:


enableDynamicPortAllocation: true
enableEndpointIndependentMapping: false
endpointTypes:
‐ ENDPOINT_TYPE_MANAGED_PROXY_LB
logConfig:
  enable: true
  filter: ALL
maxPortsPerVm: 4096
minPortsPerVm: 2048
name: LB_NAT_CONFIG
natIpAllocateOption: MANUAL_ONLY
natIps:
‐ https://www.googleapis.com/compute/projects/PROJECT_NAME/regions/REGION/addresses/ADDRESS
sourceSubnetworkIpRangesToNat: ALL_SUBNETWORKS_ALL_IP_RANGES
type: PUBLIC
For more information, see Specify subnet ranges for NAT in the Cloud NAT documentation.

Make sure that you use an allowlist for the NAT IP address ranges on your external backend environment, so that your external backend can receive traffic from Google Cloud.

Reserve the load balancer's IP address
Reserve a static IP address for the load balancer.

Console
gcloud
In the Google Cloud console, go to the Reserve a static address page.

Go to Reserve a static address

Choose a Name for the new address.

For Network Service Tier, select Standard.

For IP version, select IPv4. IPv6 addresses can only be global and can only be used with global load balancers.

For Type, select Regional.

Select a Region.

Leave the Attached to option set to None. After you create the load balancer, this IP address will be attached to the load balancer's forwarding rule.

Click Reserve to reserve the IP address.

Set up the internet NEG
You can create an internet NEG using either INTERNET_FQDN_PORT endpoints or INTERNET_IP_PORT endpoints.

Console
gcloud
Create a NEG with INTERNET_FQDN_PORT endpoints

In the Google Cloud console, go to the Network endpoint group page.

Go to Network endpoint group

Click Create network endpoint group.

Specify an INTERNET_NEG_NAME for your Internet NEG. For more information, see Resource naming convention.

In the Network endpoint group type list, select Network endpoint group (Internet) and then do the following:

In the Scope list, select Regional.
Optional: In the Region list, change the REGION for this NEG.
In the Network list, select LB_NETWORK.
In the Default port box, enter DEFAULT_PORT_NUMBER.
In the Add endpoints through list, select Fully qualified domain name and port.
Select Create.
Add INTERNET_FQDN_PORT endpoints to the NEG

In the Google Cloud console, go to the Network endpoint group page.

Go to Network endpoint group

Click INTERNET_NEG_NAME.
Enter the Fully qualified domain name such as myorg.example.com. You must specify the FQDN objects in standard FQDN syntax.

Optional: For Port type, select Custom. If the Port type is Default, the default port of the NEG is used.

In the Port number box, enter PORT_NUMBER_1.
Select Create.
Create a NEG with INTERNET_IP_PORT endpoints

In the Google Cloud console, go to the Network endpoint group page.

Go to Network endpoint group

Click Create network endpoint group.

Specify a name INTERNET_NEG_NAME for your Internet NEG. For more information, see Resource naming convention.

In the Network endpoint group type list, select Network endpoint group (Internet) and then do the following:

In the Scope list, select Regional.
Optional: In the Region list, change the REGION for this NEG.
In the Network list, select LB_NETWORK.
In the Default port box, enter DEFAULT_PORT_NUMBER.
In the Add endpoints through list, select IP and port.
Select Create.
Add INTERNET_IP_PORT endpoints to the NEG

In the Google Cloud console, go to the Network endpoint group page.

Go to Network endpoint group

Click INTERNET_NEG_NAME.
In the IP address field, enter IP_ADDRESS_1.
Optional: In the Port type list, select Custom. If the Port type is Default, the default port of the NEG is used.

In the Port number field, enter a PORT_NUMBER_1.
Select Create.
Create the load balancer
Console
gcloud
Select the load balancer type
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click Create load balancer.
For Type of load balancer, select Application Load Balancer (HTTP/HTTPS) and click Next.
For Public facing or internal, select Public facing (external) and click Next.
For Global or single region deployment, select Best for regional workloads and click Next.
Click Configure.
Basic configuration
Enter a Load balancer name.
For Region, select REGION.
For Network, select LB_NETWORK.
Reserve a proxy-only subnet
Note: If you already created the proxy-only subnet, the Reserve subnet button isn't displayed. You can skip this section and continue with the steps in the Frontend configuration section.
To reserve a proxy-only subnet:

Click Reserve subnet.
For Name, enter PROXY_ONLY_SUBNET_NAME.
For IP address range, enter PROXY_ONLY_SUBNET_RANGE.
Click Add.
Frontend configuration
Click Frontend configuration.
Enter a Name.
To create an HTTPS load balancer, you must have an SSL certificate. In this example, you create a Compute Engine SSL certificate.

Property	Value (type a value or select an option as specified)
Protocol	HTTPS
IP version	IPv4
IP address	Select the IP address reserved previously: LB_IP_ADDRESS.
Port	443
Certificate	
For Choose certificate repository, select Classic Certificates.

Select an existing SSL certificate or create a new certificate.

To create an HTTPS load balancer, you must have an SSL certificate resource to use in the HTTPS proxy.

If you want to test this process without setting up an SSL certificate resource (or a domain as required by Google-managed certificates), you can set up an HTTP load balancer.

To create an HTTP load balancer, verify that the following options are configured with these values:

Property	Value (type a value or select an option as specified)
Protocol	HTTP
IP version	IPv4
IP address	Select the IP address reserved previously: LB_IP_ADDRESS.
Port	80
Click Done.

Backend configuration
Click Backend configuration.
Click Backend services and backend buckets.
Click Create a backend service.
Enter a name.
For Backend type, select Internet network endpoint group.
For Protocol, select the protocol that you intend to use from the load balancer to the internet NEG.
For Backends, in the New backend window, select the Regional internet network endpoint group created in the previous step.
Click Done.
Configure the health check:
For Health check, select Create a health check.
Set the health check name to HTTP_HEALTH_CHECK_NAME.
For Protocol, select HTTP.
Set Port to 80.
Click Create.
Review and finalize
Click Review and finalize.
If everything looks correct, click Create.
Connect your domain to your load balancer
After the load balancer is created, note the IP address that is associated with the load balancer—for example, 30.90.80.100. To point your domain to your load balancer, create an A record by using your domain registration service. If you added multiple domains to your SSL certificate, you must add an A record for each one, all pointing to the load balancer's IP address. For example, to create A records for www.example.com and example.com, use the following:


NAME                  TYPE     DATA
www                   A        30.90.80.100
@                     A        30.90.80.100
If you use Cloud DNS as your DNS provider, see Add, modify, and delete records.

Test the load balancer
Note: It might take a few minutes for the load balancer configuration to propagate after you first deploy it.
Now that you have configured your load balancer, you can start sending traffic to the load balancer's IP address. If you configured a domain, you can send traffic to the domain name as well. However, DNS propagation can take time to complete, so you can start by using the IP address for testing.

Console
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click the load balancer that you just created.

Note the IP address of the load balancer.

Send traffic to the load balancer.

If you created an HTTP load balancer, you can test your load balancer by going to http://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the application you're running on the external backend.

If you created an HTTPS load balancer, you can test your load balancer by going to https://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the application you're running on the external backend.

If that does not work and you are using a Google-managed certificate, confirm that your certificate resource's status is ACTIVE. For more information, see Google-managed SSL certificate resource status.

Alternatively, you can use curl from your local machine's command line. Replace IP_ADDRESS with the load balancer's IPv4 address. If you're using a Google-managed certificate, test the domain that points to the load balancer's IP address. For example:



curl -s 'https://www.example.com:443' --resolve www.example.com:443:IP_ADDRESS
Optional: If you are using a custom domain, you might need to wait for the updated DNS settings to propagate. Then, test your domain in the web browser.

For help with troubleshooting, see Troubleshooting external backend and internet NEG issues.

Additional configuration
This section expands on the configuration example to provide alternative and additional configuration options. All of the tasks are optional. You can perform them in any order.

Use a custom header to authenticate requests
To authenticate requests sent to your external backend, you can set a custom header to indicate that the request came from a Google Cloud load balancer. You'll also need to configure the external backend to expect this custom header on traffic coming from Google Cloud.

To learn how to set up custom headers, see Set up advanced traffic management.
For other authentication methods, see Authenticate requests to the external backend.

Enable IAP on the external Application Load Balancer
You can configure IAP to be enabled or disabled (default). If enabled, you must provide values for oauth2-client-id and oauth2-client-secret.

To enable IAP, update the backend service to include the --iap=enabled flag with the oauth2-client-id and oauth2-client-secret.


Optionally, you can enable IAP for a Compute Engine resource by using the Google Cloud console, gcloud CLI, or API.

