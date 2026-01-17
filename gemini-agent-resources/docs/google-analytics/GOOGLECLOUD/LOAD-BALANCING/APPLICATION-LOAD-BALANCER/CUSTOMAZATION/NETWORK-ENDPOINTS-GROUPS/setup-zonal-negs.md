Set up zonal NEGs

This document contains instructions for configuring zonal network endpoint groups (NEGs). Before you configure zonal NEGs, read Network endpoint groups overview.

Note: This page describes how to configure a specific load balancer component or feature before or after you've already created a load balancer. Working with specific components is useful for advanced configurations and necessary for some configuration options. Before using the information on this page, know the type of Google Cloud load balancer that you need.
Zonal NEGs with GCE_VM_IP endpoints
These can be used as backends for backend services in internal passthrough Network Load Balancers and external passthrough Network Load Balancers. For details, see Zonal NEGs overview: Load balancing.

For end-to-end examples, see the following:

Set up an internal passthrough Network Load Balancer with zonal NEG backends
Set up an external passthrough Network Load Balancer with zonal NEG backends
Zonal NEGs with GCE_VM_IP_PORT endpoints
These can be used as backends for backend services in the following types of load balancers:

External Application Load Balancer
Internal Application Load Balancer
External proxy Network Load Balancer
Internal proxy Network Load Balancer
End-to-end example: Set up a regional internal proxy Network Load Balancer with zonal NEG backends.
The primary use case for GCE_VM_IP_PORT zonal NEGs is container-native load balancing so that you can distribute traffic among microservices running in containers on your VMs. Container-native load balancing enables load balancers to target Pods directly and to make load distribution decisions at the Pod-level instead of at the VM-level.

There are two ways to configure container-native load balancing: either use NEGs managed by GKE Ingress, or use standalone NEGs.

For instructions, see:

Container-native load balancing through Ingress
Container-native load balancing through standalone zonal NEGs
Configuring zonal NEGs
The rest of this page describes how to configure zonal NEGs before or after you've already created a load balancer. Note that some of these actions don't apply to zonal NEGs created and managed by Ingress.

Create a zonal network endpoint group
Console
gcloud
To create a zonal network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click Create network endpoint group.
For the Network endpoint group type, select Network endpoint type: Zonal.
Enter the Name of the network endpoint group.
For Network endpoint type, select Network endpoint group (Zonal).
Select the Endpoints type depending on the type of load balancer you're using.
Select the Network.
Select the Subnetwork.
Select the Zone.
For zonal negs with GCE_VM_IP_PORT endpoints only, enter a Default port.
Click Create.
Add endpoints to a network endpoint group
Console
gcloud
To add endpoints to a network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click the Name of the network endpoint group to which you want to add endpoints. You see the Network endpoint group details page.
In the Network endpoints in this group section, click Add network endpoint. You see the Add network endpoint page.
Select a VM instance to add its internal IP addresses as network endpoints and click Add. You see the Network interface, zone, subnet, and the internal IP address of the VM interface assigned to the endpoint.
For zonal negs with GCE_VM_IP_PORT endpoints only, perform the following steps:
Enter the IP address of the new network endpoint.
Select the Port type.
If you select Default, the endpoint uses the default port for all endpoints in the network endpoint group.
If you select Custom, enter the Port number for the endpoint to use.
To add more endpoints, click Add network endpoint and repeat steps 5 and 6.
After you add all the endpoints that you need, click Create.
Add a zonal NEG to a backend service
Console
gcloud
To add a network endpoint group to a backend service:

Go to the Load balancing page in the Google Cloud console.
Go to the Load balancing page
Click the name of the load balancer whose backend service you want to edit.
On the Load balancer details page, click Edit edit.
On the Edit load balancer page, click Backend configuration.
On the Backend configuration page, click Edit edit.
Click +Add backend.
Select a Zonal network endpoint group and click Done.
Click Update.
Remove a NEG from a backend service
Console
gcloud
Go to the Load balancing page in the Google Cloud console.
Go to the Load balancing page
Click the name of the load balancer whose backend service you want to edit.
On the Load balancer details page, click Edit edit.
On the Edit load balancer page, click Backend configuration.
On the Backend configuration page, click Edit edit for the backend service from which you are removing the NEG.
In the Backend section, locate the NEG you want to remove and click the trash can icon for that NEG.
Click Update.
Remove endpoints from a network endpoint group
When a network endpoint is removed from a load balancing NEG, it triggers connection draining based on the drain parameters specified in the backend service. If multiple backend services refer to the same NEG, the maximum drain interval across all backend services is applied.

Console
gcloud
To remove endpoints from a network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click the Name of the network endpoint group from which you want to delete endpoints. You see the Network endpoint group detail page.
Select the network endpoints you want to delete and click Remove endpoint.
List network endpoint groups
Console
gcloud
To view a list of network endpoint groups, go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page

Describe a specific network endpoint group
Console
gcloud
To get the details of a specific network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click the name of the network endpoint group whose details you want to see.
Remove network endpoint groups
A network endpoint group cannot be deleted if it is attached to a backend service. Before you delete a NEG, ensure that it is detached from the backend service.

Deleting a VM immediately causes all network endpoints on the VM to be removed from the NEG, closing all connections. Deleting a NEG after deleting a backend service also removes all endpoints in that NEG without connection draining.

Console
gcloud
To remove a network endpoint group from a backend service:

Go to the Load balancing page in the Google Cloud console.
Go to the Load balancing page
Click the name of the load balancer whose backend service you want to edit.
On the Load balancer details page, click Edit edit.
On the Edit load balancer page, click Backend configuration.
On the Backend configuration page, click Edit edit for the backend service from which you are removing the NEG.
In the Backend section, locate the NEG you want to remove and click the trash can icon for that NEG.
Click Update.
To delete a network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Locate the network endpoint group you want to delete.
Click the trash can icon in that row.
List endpoints in a network endpoint group
Console
gcloud
To view a list of endpoints in a network endpoint group:

Go to the Network Endpoint Groups page in the Google Cloud console.
Go to the Network Endpoint Groups page
Click the Name of the network endpoint group from which you want to delete endpoints. You see the Network endpoint group detail page, on which the endpoints for the endpoint group are listed.
To filter the endpoints, create key:value pairs in the text field under Network endpoints in this group.
Custom filtering when you list endpoints in a network endpoint group
You can use a custom filter to limit which endpoints in a network endpoint group are listed. Custom filtering is enabled only for the REST API. You cannot use custom filtering from the Google Cloud console or using the gcloud command-line interface.

For details, see the documentation for the method networkEndpointGroups.listNetworkEndpoints.

Health checking network endpoints
Backend services with zonal NEG backends must use a health check whose port specification is either:

a fixed (numbered) port (--port)
configured to use the serving port of the network endpoint (--use-serving-port)
The example that follows creates an HTTP health check that uses the serving port of the network endpoint with the --use-serving-port flag. Note that the --use-serving-port flag is implemented with gcloud compute health-checks create, but not with gcloud compute health-checks update.



gcloud compute health-checks create http HTTP_HEALTH_CHECK_NAME
    --use-serving-port
You cannot use a legacy health check with a zonal NEG backend. For more information, see Health Check Concepts.