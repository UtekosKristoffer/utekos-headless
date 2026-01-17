Set up header and query parameter-based routing for the classic Application Load Balancer

This page includes two examples for classic Application Load Balancer:

Set up query parameter-based routing
Set up HTTP header-based routing
To configure traffic management for the global external Application Load Balancer and the regional external Application Load Balancer, see the following pages:

Set up traffic management for global external Application Load Balancer
Set up traffic management for regional external Application Load Balancer
Before you begin
Read the Traffic management overview for external Application Load Balancers.
Be familiar with the URL map API.
Set up query parameter-based routing
This example demonstrates using query parameters to do A/B testing by matching on the query string.

Add two backend instance groups
For routing to be useful, you must have multiple backends.

To set up two backends, your VMs need to be in two instance groups. This guide describes how to create managed instance groups with Linux VMs that have Apache running and then set up load balancing.

The managed instance groups provide VMs running the backend servers of an external HTTP load balancer. For demonstration purposes, backends serve their own hostnames.

For simplicity, the backends reside in the same region. If you want a multi-region setup, you must have an instance template setup for the second region.

Console
gcloud
Create an instance template. In the Google Cloud console, go to the Instance templates page.

Go to Instance templates

Click Create instance template.
For Name, enter lb-backend-template.
Ensure that the Boot disk is set to a Debian image, such as Debian GNU/Linux 12 (bookworm). These instructions use commands that are only available on Debian, such as apt-get.
Click Advanced options.
Click Networking and configure the following field:
For Network tags, enter allow-health-check.
Click Management. Enter the following script into the Startup script field.



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

Create a managed instance group. Go to the Instance groups page in the Google Cloud console.

Go to Instance groups

Click Create instance group.
Select New managed instance group (stateless). For more information, see Stateless or stateful MIGs.
For Name, enter first-example-ig.
Under Location, select Single zone.
For Region, select your preferred region. This example uses us-east1.
For Zone, select us-east1-b.
Under Instance template, select the instance template lb-backend-template.
Under Maximum number of instances, enter 2.
Under Autoscaling mode, select Off:do not autoscale.
Click Create.
Create another managed instance group like this one. Name the second one second-example-ig, and base it on the lb-backend-template template.

Configuring a firewall rule
In this example, you create the fw-allow-health-check firewall rule. This is an ingress rule that allows traffic from the Google Cloud health checking systems (130.211.0.0/22 and 35.191.0.0/16). This example uses the target tag allow-health-check to identify the VMs.

Console
gcloud
In the Google Cloud console, go to the Firewall policies page.
Go to Firewall policies
Click Create firewall rule to create the second firewall rule:
Enter a Name of fw-allow-health-check.
Under Network, select Default.
Under Targets, select Specified target tags.
Populate the Target tags field with allow-health-check.
Set Source filter to IPv4 ranges.
Set Source IPv4 ranges to 130.211.0.0/22 and 35.191.0.0/16.
Under Protocols and ports, select Specified protocols and ports.
Select the TCP checkbox and enter 80 for the port numbers.
Click Create.
Reserving an external IP address
Now that your instances are up and running, set up a global static external IP address that your customers use to reach your load balancer.

Console
gcloud
Go to the External IP addresses page in the Google Cloud console.
Go to the External IP addresses page
Click Reserve static address to reserve an IPv4 address.
Assign a Name of lb-ipv4-1.
Set the Network tier to Standard.
Set the IP version to IPv4.
Set the Type to Global.
Click Reserve.
Ensure that the Type is set to Global.
Click Reserve.
Setting up the load balancer backends
Console
gcloud
The Google Cloud console is currently unsupported for setting up header-based and parameter-based routing. Use gcloud or the API instead.

Creating the URL map
Console
gcloud
The Google Cloud console is currently unsupported for setting up header-based and parameter-based routing. Use gcloud or the API instead.

Creating the target proxy and forwarding rule
Console
gcloud
The Google Cloud console is currently unsupported for setting up header-based and parameter-based routing. Use gcloud or the API instead.

Testing
Note the IPv4 address that was reserved:



gcloud compute addresses describe lb-ipv4-1 \
    --format="get(address)" \
    --global
Test this setup by running:



curl http://IP_ADDRESS?ABTest=A


curl http://IP_ADDRESS?ABTest=B
In a browser, open http://IP_ADDRESS?ABTest=A and http://IP_ADDRESS?ABTest=B.

Set up HTTP header-based routing
This example demonstrates adding and removing HTTP headers to do intelligent routing.

Before you begin
You can use an existing external Application Load Balancer or create a new one.

You can use this feature with any of the supported backend types. This example assumes that you're using VMs in an instance group.

To set up a simple load balancer, see the query parameter-based example above.

Updating the URL map
Console
gcloud
The Google Cloud console is currently unsupported for setting up header-based and parameter-based routing. Use gcloud or the API instead.

Testing
Using the IPv4 address of the associated load balancer, test this setup by running:



curl http://IP_ADDRESS -H "ABTest: A"


curl http://IP_ADDRESS -H "ABTest: B"
