Set up a global external Application Load Balancer with hybrid connectivity

This page illustrates how to deploy a global external Application Load Balancer to load balance traffic to network endpoints that are on-premises or in other public clouds and are reachable via hybrid connectivity.

Note: For regional external Application Load Balancer instructions, see Set up a regional external Application Load Balancer with hybrid connectivity. For classic Application Load Balancer instructions, see Set up a classic Application Load Balancer with hybrid connectivity.
After you complete these tasks, you can optionally explore enabling additional services (such as Cloud CDN and Google Cloud Armor) and advanced traffic management features.

If you haven't already done so, review the Hybrid connectivity NEGs overview to understand the network requirements to set up hybrid load balancing.

Setup overview
The example on this page sets up the following sample deployment:

External Application Load Balancer example for hybrid connectivity.
External Application Load Balancer example for hybrid connectivity (click to enlarge).
You must configure hybrid connectivity before you attempt to set up a hybrid load balancing deployment. This document does not include the hybrid connectivity setup.

Depending on your choice of hybrid connectivity product (either Cloud VPN or Cloud Interconnect (Dedicated or Partner)), use the relevant product documentation to configure this.

Permissions
To set up hybrid load balancing, you must have the following permissions:

On Google Cloud

Permissions to establish hybrid connectivity between Google Cloud and your on-premises environment or other cloud environments. For the list of permissions needed, see the relevant Network Connectivity product documentation.
Permissions to create a hybrid connectivity NEG and the load balancer. The Compute Load Balancer Admin role (roles/compute.loadBalancerAdmin) contains the permissions required to perform the tasks described in this guide.
On your on-premises environment or other non-Google Cloud cloud environment

Permissions to configure network endpoints that allow services on your on-premises environment or other cloud environments to be reachable from Google Cloud by using an IP:Port combination. For more information, contact your environment's network administrator.
Permissions to create firewall rules on your on-premises environment or other cloud environments to allow Google's health check probes to reach the endpoints.
Additionally, to complete the instructions on this page, you need to create a hybrid connectivity NEG, a load balancer, and zonal NEGs (and their endpoints) to serve as Google Cloud-based backends for the load balancer.

You should be either a project Owner or Editor, or you should have the following Compute Engine IAM roles.

Task	Required role
Create networks, subnets, and load balancer components	Compute Network Admin (roles/compute.networkAdmin)
Add and remove firewall rules	Compute Security Admin (roles/compute.securityAdmin)
Create instances	Compute Instance Admin (roles/compute.instanceAdmin)
Establish hybrid connectivity
Your Google Cloud and on-premises environment or other cloud environments must be connected through hybrid connectivity by using either Cloud Interconnect VLAN attachments or Cloud VPN tunnels with Cloud Router or Router appliance VMs. We recommend that you use a high availability connection.

A Cloud Router enabled with global dynamic routing learns about the specific endpoint through Border Gateway Protocol (BGP) and programs it into your Google Cloud VPC network. Regional dynamic routing is not supported. Static routes are also not supported.

You can use either the same network or a different VPC network within the same project to configure both hybrid networking (Cloud Interconnect or Cloud VPN or a Router appliance VM) and the load balancer. Note the following:

If you use different VPC networks, the two networks must be connected using either VPC Network Peering or they must be VPC spokes on the same Network Connectivity Center hub.

If you use the same VPC network, ensure that your VPC network's subnet CIDR ranges don't conflict with your remote CIDR ranges. When IP addresses overlap, subnet routes are prioritized over remote connectivity.

For instructions, see the following documentation:

Cloud VPN
Cloud Interconnect
Important: Don't proceed with the instructions on this page until you set up hybrid connectivity between your environments.
Set up your environment that is outside Google Cloud
Perform the following steps to set up your on-premises environment or other cloud environment for hybrid load balancing:

Configure network endpoints to expose on-premises services to Google Cloud (IP:Port).
Configure firewall rules on your on-premises environment or other cloud environment.
Configure Cloud Router to advertise certain required routes to your private environment.
Set up network endpoints
After you set up hybrid connectivity, you configure one or more network endpoints within your on-premises environment or other cloud environments that are reachable through Cloud Interconnect or Cloud VPN or Router appliance by using an IP:port combination. This IP:port combination is configured as one or more endpoints for the hybrid connectivity NEG that is created in Google Cloud later on in this process.

If there are multiple paths to the IP endpoint, routing follows the behavior described in the Cloud Router overview.

Set up firewall rules
The following firewall rules must be created on your on-premises environment or other cloud environment:

Create an ingress allow firewall rule to allow traffic from Google's health-checking probes to your endpoints. The source IP address ranges to be allowed are 35.191.0.0/16 and 130.211.0.0/22. For more information, see Probe IP ranges and firewall rules.

Advertise routes
Configure Cloud Router to advertise the following custom IP ranges to your on-premises environment or other cloud environment:

The ranges used by Google's health check probes: 35.191.0.0/16 and 130.211.0.0/22.
Set up the Google Cloud environment
For the following steps, make sure you use the same VPC network (called NETWORK in this procedure) that was used to configure hybrid connectivity between the environments.

Create the subnet for the backends
This subnet is used to create the load balancer's zonal NEG backends, the frontend, and the internal IP address.

Create this subnet in the NETWORK network that was used to configure hybrid connectivity between the environments.

Console
gcloud
To support both IPv4 and IPv6 traffic, use the following steps:

In the Google Cloud console, go to the VPC networks page.

Go to VPC networks

Go to the network that was used to configure hybrid connectivity between the environments.

Click Edit.
For the Subnet creation mode, choose Custom.
Click Save.
Optional: If you want to configure internal IPv6 address ranges on subnets in this network, complete these steps:

For VPC network ULA internal IPv6 range, select Enabled.
For Allocate internal IPv6 range, select Automatically or Manually.

If you select Manually, enter a /48 range from within the fd20::/20 range. If the range is in use, you are prompted to provide a different range.

In the Subnets tab, click Add subnet.

In the Add a subnet panel, configure the following fields:

In the Name field, provide a name for the subnet.
In the Region field, select a region.
In the IP address range field, enter an IP address range.
For IP stack type, select IPv4 and IPv6 (dual-stack).
For the IPv6 access type field, select External.
Click Add.
To support IPv4 traffic, use the following steps:

In the Google Cloud console, go to the VPC networks page.

Go to VPC networks

Go to the network that was used to configure hybrid connectivity between the environments.

Click Edit.
For the Subnet creation mode, choose Custom.
Click Save.
In the Subnets tab, click Add subnet.

In the Add a subnet panel, enter the following information:

In the Name field, provide a name for the subnet.
In the Region field, select a region.
In the IP address range field, enter an IP address range.
For the IP stack type field, select IPv4 (single-stack).
Click Add.
Create firewall rule
In this example, you create the following firewall rule:

fw-allow-health-check: An ingress rule, applicable to the Google Cloud instances being load balanced, that allows traffic from the load balancer and Google Cloud health checking systems (130.211.0.0/22 and 35.191.0.0/16). This example uses the target tag allow-health-check to identify the backend VMs to which it should apply.

Console
gcloud
In the Google Cloud console, go to the Firewall policies page.

Go to Firewall policies

Click Create firewall rule:

Enter a Name of fw-allow-health-check.
In the Network section, select NETWORK.
Under Targets, select Specified target tags.
Populate the Target tags field with allow-health-check.
Set Source filter to IPv4 ranges.
Set Source IPv4 ranges to 130.211.0.0/22 and 35.191.0.0/16.
Under Protocols and ports, select Specified protocols and ports.
Select the checkbox next to TCP and type 80 for the port numbers.
Click Create.

To allow IPv6 subnet traffic, click Create firewall rule again and enter the following information:

Name: fw-allow-lb-access-ipv6
Network: NETWORK
Priority: 1000
Direction of traffic: ingress
Targets: Specified target tags
Target tags field, enter allow-health-check-ipv6
Source filter: IPv6 ranges
Source IPv6 ranges: 2600:2d00:1:b029::/64,2600:2d00:1:1::/64
Protocols and ports: Allow all
Click Create.

Set up the zonal NEG
For Google Cloud-based backends, we recommend you configure multiple zonal NEGs in the same region where you configured hybrid connectivity.

Zonal NEGs with one or more GCE_VM_IP_PORT type endpoints support dual-stack.
For this example, we set up a zonal NEG (with GCE_VM_IP_PORT type endpoints) in the REGION region. First create the VMs in the GCP_NEG_ZONE zone. Then create a zonal NEG in the same GCP_NEG_ZONE and add the VMs' network endpoints to the NEG.

Create VMs
Console
gcloud
Go to the VM instances page in the Google Cloud console.
Go to VM instances

Click Create instance.

Set the Name to vm-a1.

For the Region, choose REGION.

For the Zone, choose GCP_NEG_ZONE.

In the Boot disk section, ensure that Debian GNU/Linux 12 (bookworm) is selected for the boot disk options. Click Choose to change the image if necessary.

Click Advanced options and make the following changes:

Click Networking and add the following Network tags: allow-health-check.
Click Edit edit under Network interfaces and make the following changes then click Done:
Network: NETWORK
Subnet: LB_SUBNET_NAME
IP stack type: IPv4 and IPv6 (dual-stack)
Click Management. In the Startup script field, copy and paste the following script contents. The script contents are identical for all four VMs:



#! /bin/bash
apt-get update
apt-get install apache2 -y
a2ensite default-ssl
a2enmod ssl
vm_hostname="$(curl -H "Metadata-Flavor:Google" \
http://metadata.google.internal/computeMetadata/v1/instance/name)"
echo "Page served from: $vm_hostname" | \
tee /var/www/html/index.html
systemctl restart apache2
Click Create.

Repeat the following steps to create a second VM, using the following name and zone combination:

Name: vm-a2, zone: GCP_NEG_ZONE
Create the zonal NEG
Console
gcloud
To create a zonal network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click Create network endpoint group.
Enter a Name for the zonal NEG. Referred to as GCP_NEG_NAME in this procedure.
Select the Network endpoint group type: Network endpoint group (Zonal).
Select the Network: NETWORK
Select the Subnet: LB_SUBNET_NAME
Select the Zone: GCP_NEG_ZONE
Enter the Default port: 80.
Click Create.
Add endpoints to the zonal NEG:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network endpoint groups
Click the Name of the network endpoint group created in the previous step (GCP_NEG_NAME). You see the Network endpoint group details page.
In the Network endpoints in this group section, click Add network endpoint. You see the Add network endpoint page.
Select a VM instance to add its internal IP addresses as network endpoints. In the Network interface section, the name, zone, and subnet of the VM is displayed.
In the IPv4 address field, enter the IPv4 address of the new network endpoint.
In the IPv6 address field, enter the IPv6 address of the new network endpoint.
Note: A backend service with multiple endpoints must have unique IPv6 addresses. The endpoints can be in different subnets, but the same IPv6 address cannot be used for multiple endpoints.
Select the Port type.
If you select Default, the endpoint uses the default port 80 for all endpoints in the network endpoint group. This is sufficient for our example because the Apache server is serving requests at port 80.
If you select Custom, enter the Port number for the endpoint to use.
To add more endpoints, click Add network endpoint and repeat the previous steps.
After you add all the endpoints, click Create.
Set up the hybrid connectivity NEG
When creating the NEG, use a ZONE that minimizes the geographic distance between Google Cloud and your on-premises or other cloud environment. For example, if you are hosting a service in an on-premises environment in Frankfurt, Germany, you can specify the europe-west3-a Google Cloud zone when you create the NEG.

Moreover, if you're using Cloud Interconnect, the ZONE used to create the NEG should be in the same region where the hybrid connectivity Cloud Interconnect VLAN attachment was configured.

For the available regions and zones, see the Compute Engine documentation: Available regions and zones.

Console
gcloud
To create a hybrid connectivity network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to Network endpoint groups
Click Create network endpoint group.
Enter a Name for the hybrid NEG. Referred to as ON_PREM_NEG_NAME in this procedure.
Select the Network endpoint group type: Hybrid connectivity network endpoint group (Zonal).
Select the Network: NETWORK
Select the Subnet: LB_SUBNET_NAME
Select the Zone: ON_PREM_NEG_ZONE
Enter the Default port.
Click Create
Add endpoints to the hybrid connectivity NEG:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click the Name of the network endpoint group created in the previous step (ON_PREM_NEG_NAME). You see the Network endpoint group detail page.
In the Network endpoints in this group section, click Add network endpoint. You see the Add network endpoint page.
Enter the IP address of the new network endpoint.
Select the Port type.
If you select Default, the endpoint uses the default port for all endpoints in the network endpoint group.
If you select Custom, you can enter a different Port number for the endpoint to use.
To add more endpoints, click Add network endpoint and repeat the previous steps.
After you add all the non-Google Cloud endpoints, click Create.
Configure the load balancer
Console
gcloud
Note: You cannot use the Google Cloud console to create a load balancer that has mixed zonal and hybrid connectivity NEGs backends in a single backend service. Use either gcloud or the REST API instead.
Connect your domain to your load balancer
After the load balancer is created, note the IP address that is associated with the load balancer—for example, 30.90.80.100. To point your domain to your load balancer, create an A record by using your domain registration service. If you added multiple domains to your SSL certificate, you must add an A record for each one, all pointing to the load balancer's IP address. For example, to create A records for www.example.com and example.com, use the following:


NAME                  TYPE     DATA
www                   A        30.90.80.100
@                     A        30.90.80.100
If you use Cloud DNS as your DNS provider, see Add, modify, and delete records.

Testing the load balancer
Note: It might take a few minutes for the load balancer configuration to propagate globally after you first deploy it.
Now that you have configured your load balancer, you can start sending traffic to the load balancer's IP address.

Go to the Load balancing page in the Google Cloud console.
Go to the Load balancing page

Click on the load balancer you just created.

Note the IP Address of the load balancer.

Send traffic to the load balancer.

If you created an HTTP load balancer, you can test your load balancer using a web browser by going to http://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the service you have exposed through the endpoint.

If you created an HTTPS load balancer, you can test your load balancer by using curl as follows. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the service you have exposed through the endpoint.



curl -k https://IP_ADDRESS
If that does not work and you are using a Google-managed certificate, confirm that your certificate resource's status is ACTIVE. For more information, see Google-managed SSL certificate resource status. Then test the domain pointing to the load balancer's IP address. For example:



curl -s https://DOMAIN_NAME
Replace DOMAIN_NAME with your application domain name, for example, test.example.com.

Testing the non-Google Cloud endpoints depends on the service you have exposed through the hybrid NEG endpoint.

Additional configuration
This section expands on the configuration example to provide alternative and additional configuration options. All of the tasks are optional. You can perform them in any order.

Update client HTTP keepalive timeout
The load balancer created in the previous steps has been configured with a default value for the client HTTP keepalive timeout.
To update the client HTTP keepalive timeout, use the following instructions.

Console
gcloud
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing.

Click the name of the load balancer that you want to modify.
Click editEdit.
Click Frontend configuration.
Expand Advanced features. For HTTP keepalive timeout, enter a timeout value.
Click Update.
To review your changes, click Review and finalize, and then click Update.