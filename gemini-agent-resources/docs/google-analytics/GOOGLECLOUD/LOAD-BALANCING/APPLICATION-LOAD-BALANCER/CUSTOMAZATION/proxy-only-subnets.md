Proxy-only subnets for Envoy-based load balancers

This page describes how to work with proxy-only subnets used by Envoy-based load balancers. A proxy-only subnet provides a pool of IP addresses that are reserved exclusively for Envoy proxies used by Google Cloud load balancers. It cannot be used for any other purposes.

The proxies terminate incoming connections and then evaluate where each request should go based on the URL map, the backend service's session affinity, the balancing mode of each backend instance group or NEG, and other factors.

A client makes a connection to the IP address and port of the load balancer's forwarding rule.

Each proxy listens on the IP address and port specified by the corresponding load balancer's forwarding rule. One of the proxies receives and terminates the client's network connection.

The proxy establishes a connection to the appropriate backend VM or endpoint in a NEG, as determined by the load balancer's URL map and backend services.

Each of the load balancer's proxies is assigned an internal IP address. Packets sent from a proxy to a backend VM or endpoint has a source IP address from the proxy-only subnet.

The proxy-only subnet cannot be used for any other purpose. The IP address for the load balancer's forwarding rule doesn't come from the proxy-only subnet. Also, the IP addresses of the backend VMs and endpoints don't come from the proxy-only subnet.

Supported load balancers and products
Envoy-based Cloud Load Balancing and Secure Web Proxy products require proxy-only subnets:

Proxy-only subnet with purpose GLOBAL_MANAGED_PROXY: In a given VPC network and region, only a single proxy-only subnet with purpose GLOBAL_MANAGED_PROXY can be active at any point in time. The active proxy-only subnet powers all of the following products:

Cross-region internal Application Load Balancer
Cross-region internal proxy Network Load Balancer
Proxy-only subnet with purpose REGIONAL_MANAGED_PROXY: In a given VPC network and region, only a single proxy-only subnet with purpose REGIONAL_MANAGED_PROXY can be active at any point in time. The active proxy-only subnet powers all of the following products:

Regional external Application Load Balancer
Regional internal Application Load Balancer
Regional external proxy Network Load Balancer
Regional internal proxy Network Load Balancer
Secure Web Proxy
Note:
If the client sends packets with the port explicitly specified, Envoy-based load balancers don't remove the port number by default. For example, traffic with example.net:443 are first forwarded to an Envoy-based load balancing service and then routed to the backend by the URL map.

If there is no matching routing rule in the URL map, the traffic is routed to the default backend. You can specify URL map routing rules to specify the port number by setting the hostname as example.net:443 and path /*. For more information, see URL Map components.

gRPC library for golang mandates addition of port at the end of the hostname, so if a request is initiated to the load balancer, ensure that we have a matching host rule in the load balancer configuration.

How proxy-only subnets fit into the load balancer's architecture
The following diagram shows the Google Cloud resources required for a regional internal Application Load Balancer.

Regional internal Application Load Balancer numbered components.
Regional internal Application Load Balancer numbered components (click to enlarge).
As shown in the diagrams, an Envoy-based load balancer deployment requires at least two subnets:

The load balancer's backend VMs and backend endpoints use a single subnet whose primary IP address range is 10.1.2.0/24 (in this example). This subnet isn't the proxy-only subnet. You can use multiple subnets for your backend VMs and endpoints if the subnets are in the same region as the load balancer. For internal Application Load Balancers, the load balancer's IP address associated with the forwarding rule can also be in this subnet (but does not need to be).
The proxy-only subnet is 10.129.0.0/23 (in this example).
Planning the size of your proxy-only subnet
A proxy-only subnet must provide 64 or more IP addresses. This corresponds to a prefix length of /26 or shorter. We recommend that you start with a proxy-only subnet with a /23 prefix (512 proxy-only addresses) and change the size as your traffic needs change.

Note: You can use the non-RFC 1918 address range for the proxy-only subnet. This can be helpful if you have insufficient available addresses in your RFC 1918 address range.
Proxies are allocated at the VPC level, not the load balancer level. You must create one proxy-only subnet in each region of a VPC network in which you use Envoy-based load balancers. If you deploy multiple load balancers in the same region and same VPC network, they share the same proxy-only subnet for load balancing. Envoy-based load balancers automatically scale the number of proxies available to handle your traffic based on your traffic needs.

The number of proxies allocated to your load balancer is calculated based on the measured capacity needed to handle your traffic over a 10-minute time period. During this time period, we look at the greater of:

The number of proxies needed to serve your traffic's bandwidth needs. Each proxy instance can handle up to 18 MB per second. We monitor the total bandwidth required and divide that total by the bandwidth that a proxy instance can support.

The number of proxies needed to handle connections and requests. We count the total of each of the following resources and divide each value by what a proxy instance can handle:

600 (HTTP) or 150 (HTTPS) new connections per second
3,000 active connections
1,400 requests per second

A proxy instance can handle 1,400 requests per second if Cloud Logging is disabled. If you enable Logging, your proxy instance can handle fewer requests per second. For example: logging 100% of requests decreases the proxy's request handling capacity to 700 requests per second. You can configure Logging to sample a smaller percentage of traffic. This lets you meet your observability needs while controlling your cost.

Each additional proxy incurs an additional hourly charge. To learn about how proxy-only subnets are billed, see the Proxy instance charge section in the Cloud Load Balancing pricing documentation.

Envoy-based load balancers and Secure Web Proxy Envoy proxies
When configuring both an Envoy-based load balancer and Secure Web Proxy in the same VPC, it is important to note the following:

Both the Envoy-based load balancer and Secure Web Proxy use IP addresses from the same proxy-only subnet.

To accommodate IP address requirements for both the services, consider using a larger proxy-only subnet, such as a /22 subnet. This helps ensure sufficient address space for both configurations.

We recommend that you monitor proxy capacity to track IP address consumption. This helps prevent exhaustion of the proxy-only subnet, which can disrupt services.

Note: Google Cloud doesn't warn you if your proxy-only subnet runs out of IP addresses. However, you can configure Monitoring to monitor the IP address usage of your proxy-only subnet. You can define alerting policies to set up an alert for the loadbalancing.googleapis.com/subnet/proxy_only/addresses metric.
Create a proxy-only subnet
You must create proxy-only subnets for Envoy-based load balancers regardless of whether your network is auto-mode or custom. Creating a proxy-only subnet is essentially the same procedure as creating any subnet, except with the addition of some flags.

For a proxy-only subnet, the --purpose must be set to either REGIONAL_MANAGED_PROXY or GLOBAL_MANAGED_PROXY, depending on your load balancer.

You can't reuse an existing subnet as the proxy-only subnet; you must create a new subnet in each region that has an Envoy-based load balancer. This is in part because the subnets update command doesn't allow modifying a subnet's --purpose field.

Note: For regional internal Application Load Balancers, set the purpose of the subnet to --purpose=REGIONAL_MANAGED_PROXY. If you previously created a proxy-only subnet with --purpose=INTERNAL_HTTPS_LOAD_BALANCER, you will need to migrate the subnet's purpose to REGIONAL_MANAGED_PROXY before you can create other Envoy-based load balancers in the same region of the VPC network.
You must create a proxy-only subnet for use by the load balancers' proxies, before creating forwarding rules for your regional load balancers. If you try to configure a load balancer without first creating a proxy-only subnet for the region, the load balancer creation process fails.

Console
gcloud
In the Google Cloud console, go to the VPC networks page.
Go to the VPC networks page
Click the name of the Shared VPC network that you want to add a proxy-only subnet to.
Click Add subnet.
Enter a Name.
Select a Region.
Set Purpose to one of the following:
For regional load balancers: Regional Managed Proxy
For cross-region load balancers: Cross-region Managed Proxy
Enter an IP address range.
Click Add.
For a complete configuration example, refer to Configuring the proxy-only subnet.

You must configure a firewall rule for your backends to accept connections from the proxy-only subnet. For a complete configuration example, including firewall rule setup, see the following:

Set up a regional external Application Load Balancer
Set up a regional internal Application Load Balancer
Set up a regional internal proxy Network Load Balancer
Set up a regional external proxy Network Load Balancer
Set up a cross-region internal Application Load Balancer
Set up a cross-region internal proxy Network Load Balancer
Proxy availability
Sometimes Google Cloud regions don't have enough proxy capacity for a new load balancer. If this happens, the Google Cloud console provides a proxy availability warning message when you are creating your load balancer. To resolve this issue, you can do one of the following:

Select a different region for your load balancer. This can be a practical option if you have backends in another region.
Select a VPC network that already has an allocated proxy-only subnet.
Wait for the capacity issue to be resolved.
Change the size or address range of a proxy-only subnet
When the amount of traffic handled by your load balancer increases, you might need to increase the size of your proxy-only subnet to allow a larger number of Envoy proxies to power your load balancers.

You can't expand the primary IPv4 address range of a proxy-only subnet in the same way that you would expand the primary IPv4 address range of a regular subnet (with the expand-ip-range command). Instead, you must replace the proxy-only subnet with a new one. The replacement process works like this:

Create a new proxy-only subnet, in the same region and VPC network as the existing (original) proxy-only subnet. When creating this new proxy-only subnet, set its role to BACKUP. (For each proxy-only subnet purpose, Google Cloud allows one ACTIVE and one BACKUP proxy-only subnet to exist in a given region and VPC network.)

Adjust ingress allow firewall rules, applicable to your backends, so that they allow connections from the primary IPv4 address ranges of both the original and new proxy-only subnets.

Set the role of the new proxy-only subnet to ACTIVE and specify a draining period to allow connections between your backends and the Envoy proxies in the original proxy-only subnet to terminate. (Google Cloud automatically sets the role of the original proxy-only subnet to BACKUP when you set the role of the new proxy-only subnet to ACTIVE.)

Monitor the status of the original proxy-only subnet (see the gcloud tab for more information on monitoring). Once its status is READY, the subnet is no longer used, provided that its role is BACKUP. At this point, you can adjust ingress allow firewall rules to permit connections from just the primary IPv4 address range of the new proxy-only subnet, and you can delete the original proxy-only subnet.

Console
gcloud
Create the new proxy-only subnet in the same region and VPC network, specifying a primary IPv4 address range that meets your needs. Set the role of the new proxy-only subnet to backup.

In the Google Cloud console, go to the VPC networks page.
Go to the VPC networks page
Click the name of the Shared VPC network that you want to add a proxy-only subnet to.
Click Add subnet.
Enter a Name.
Select a Region.
Set Purpose to one of the following:
For regional load balancers: Regional Managed Proxy
For cross-region load balancers: Cross-region Managed Proxy
For the Role, select Backup.
Enter an IP address range.
Click Add.
Update ingress allow firewall rules that apply to your backend VMs or endpoints so that they include the primary IPv4 address ranges of both the original and new proxy-only subnets.

Set the role of the new proxy-only subnet to active, and specify a draining timeout to allow connections between your backends and the original proxy-only subnet to terminate. Google Cloud automatically sets the role of the original proxy-only subnet to backup when you set the role of the new proxy-only subnet to active.

In the Google Cloud console, go to the VPC networks page.
Go to the VPC networks page
Click the name of the Shared VPC network that you want to modify.
Under Reserved proxy-only subnets for load balancing, locate the backup subnet created in the previous step.
Click Activate.
Specify an optional Drain timeout.
Click Activate the subnet.
After the connection draining timeout, or after you're confident that connections to your backend VMs or endpoints aren't coming from proxies in the original proxy-only subnet, you can do the following:

Update ingress allow firewall rules that apply to your backend VMs or endpoints so that they include the primary IPv4 address range of just the new proxy-only subnet.
Delete the original proxy-only subnet.
Note: The gcloud steps provide more information about how to monitor the draining status of the original proxy-only subnet.
Migrate the purpose of a proxy-only subnet
If you previously created a proxy-only subnet with --purpose=INTERNAL_HTTPS_LOAD_BALANCER, you will need to migrate the subnet's purpose to REGIONAL_MANAGED_PROXY before you can create other Envoy-based load balancers in the same region of the VPC network.

Console
gcloud
If you're using the Google Cloud console to create the load balancer, you will be prompted to migrate the purpose of a previously created proxy-only subnet from --purpose=INTERNAL_HTTPS_LOAD_BALANCER to REGIONAL_MANAGED_PROXY while creating the load balancer.

Migrating the purpose of a proxy-only subnet from --purpose=INTERNAL_HTTPS_LOAD_BALANCER to REGIONAL_MANAGED_PROXY does not cause any downtime. The change should take effect nearly instantly.

Delete a proxy-only subnet
Deleting a proxy-only subnet releases its primary IP address range so you can use the range for another purpose. Google Cloud enforces the following rules when it receives a request to delete a proxy-only subnet:

An active proxy-only subnet cannot be deleted if there is at least one regional load balancer in the same region and VPC network.

An active proxy-only subnet cannot be deleted if there is a backup proxy-only subnet in the same region and VPC network.

If you try to delete an active proxy-only subnet before deleting the backup, the following error message appears: "Invalid resource usage: Cannot delete ACTIVE subnetwork because a BACKUP subnetwork exists."

Practically, these rules have the following effect:

If no regional load balancer is defined in a given region and VPC network, you can delete the proxy-only subnets in that region. If a backup proxy-only subnet exists, you must first delete it before you can delete the active proxy-only subnet.

If you have at least one regional load balancer defined in a given region and VPC network, you cannot delete the active proxy-only subnet; however, you can promote a backup proxy-only subnet to the active role, which automatically demotes the previously active proxy-only subnet to the backup role. After connections are drained, you can delete the backup (previously active) proxy-only subnet.

Refer to deleting subnets in the VPC network documentation for more information.

Limitations
The following constraints apply to proxy-only subnets:

You can't have both an INTERNAL_HTTPS_LOAD_BALANCER and a REGIONAL_MANAGED_PROXY subnet in the same network and region, in the same way you can't have two REGIONAL_MANAGED_PROXY proxies or two INTERNAL_HTTPS_LOAD_BALANCER proxies.

You can create only one active and one backup proxy-only subnet in each region in each VPC network.

You cannot create a backup proxy-only subnet unless you have already created an active proxy-only subnet in that region and network.

You can change the role of a proxy-only subnet from backup to active by updating the subnet. When you do that, Google Cloud automatically changes the previously active proxy-only subnet to backup. You cannot explicitly set the role of a proxy-only subnet to backup by updating it.

During a proxy-only subnet's connection draining period (--drain-timeout), you cannot change the role of a proxy-only subnet from backup to active.

Proxy-only subnets don't support VPC Flow Logs.

What's next
Set up a regional external Application Load Balancer with VM instance group backends
Set up a regional external Application Load Balancer in a Shared VPC environment
Set up a regional internal Application Load Balancer with VM instance group backends
Set up a regional internal Application Load Balancer or cross-region internal Application Load Balancer in a Shared VPC environment
Set up a regional internal proxy Network Load Balancer with VM instance group backends
Set up a regional external proxy Network Load Balancer with VM instance group backends
Set up a cross-region internal proxy Network Load Balancer with VM instance group backends