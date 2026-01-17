Enable connection draining

Note: This page describes how to configure a specific load balancer component or feature before or after you've already created a load balancer. Working with specific components is useful for advanced configurations and necessary for some configuration options. Before using the information on this page, know the type of Google Cloud load balancer that you need.
Connection draining is a process that ensures that existing, in-progress requests are given time to complete when a virtual machine (VM) instance is removed from an instance group or when an endpoint is removed from network endpoint groups (NEGs) that are zonal in scope.

The information on this page applies only to instance groups and the following types of NEGs that are zonal in scope:

Zonal NEG
Hybrid connectivity NEG
Connection draining begins whenever you do the following:

You manually remove a VM from an instance group.
You remove an instance from a managed instance group by performing a resize(), deleteInstances(), recreateInstances(), or abandonInstances() call.
You remove a Dynamic NIC from a VM that is part of an instance group backend.
You remove an instance group or NEG from a backend service. This isn't supported for internal passthrough Network Load Balancers and external passthrough Network Load Balancers.
Google Cloud deletes an instance as part of autoscaling.
You perform an update to the managed instance group using the Managed Instance Group Updater.
You manually remove an endpoint from a zonal NEG.
Connection draining doesn't apply when you disconnect a backend (instance group or zonal NEG) from a load balancer's backend service.

How connection draining works
To enable connection draining, you set a connection draining timeout on the backend service. The timeout duration must be from 0 to 3600 seconds, inclusive.

It can take up to 60 seconds after your specified timeout duration has passed for the instance to be terminated.

The following is a list of specifications about connection draining:

Connection draining is available for backend services that are part of the following load balancers:

External Application Load Balancer
Internal Application Load Balancer
External proxy Network Load Balancer
Internal proxy Network Load Balancer
Internal passthrough Network Load Balancer
Backend service-based External passthrough Network Load Balancer
Both internal passthrough Network Load Balancers and external passthrough Network Load Balancers support connection draining for TCP, UDP, and other non-TCP protocols.

Connection draining is also available for backend services that are part of Cloud Service Mesh deployments.

When a connection draining timeout is set, and an instance is removed from the instance group or an endpoint is removed from a zonal NEG, Google Cloud load balancers and Cloud Service Mesh behave in the following way:

No new connections are sent to the removed instance or endpoint.

Application Load Balancers: For the specified duration of the timeout, existing requests to the VM or endpoint marked for removal are given time to complete. The load balancer doesn't send new connections to this VM or endpoint. After the timeout duration is reached, the load balancer stops sending all traffic to the removed VM or endpoint.

Proxy Network Load Balancers: For the specified duration of the timeout, existing TCP connections to the VM or endpoint marked for removal continue to work during the configured connection draining period. The load balancer doesn't send new connections to this VM or endpoint. After the timeout duration is reached, existing TCP connections to the removed VM or endpoint remain active and the proxy closes all existing TCP connections within 10 minutes, the default idle timeout.

passthrough Network Load Balancers: For the specified duration of the connection draining timeout, packets belonging to existing connections are routed to the VM or endpoint marked for removal. After the timeout duration is reached, the conntrack entry for the removed VM or endpoint is removed. Any non-SYN packet from an existing connection leads to the creation of a new conntrack entry for the healthy backend. When the packet goes to a new healthy backend, the backend sends a RST to the client as it doesn't have any record of the packet it has just received. The internal and external passthrough Network Load Balancers themselves don't send a TCP-RST or TCP-FIN to end existing connections after the connection draining timeout expires.

If you enable connection draining on multiple backend services that share the same instance groups or NEGs, the largest timeout value is used. For example, suppose that the same instance group or zonal NEG is a backend for two backend services, where one backend service has a connection draining timeout of 100 seconds, and the other backend service has a connection draining timeout of 200 seconds. Google Cloud uses 200 seconds as the effective connection draining timeout before terminating them. If the backend is a managed instance group, operations that delete the instance are delayed by at least 200 seconds.

If you don't set a connection draining timeout, or if the connection draining timeout is set to zero (0), Google Cloud ends existing connections on the removed instance or endpoint as quickly as possible.

If you're using connection pooling, you might see that new requests, using a previously established connection, are still being received on VMs that are getting drained, causing connection errors when those VMs are eventually deleted.

Enable connection draining
To enable connection draining, complete the following steps.

Console
gcloud
API
Update a load balancer
Go to the Load balancing page in the Google Cloud console.
Go to Load balancing
On the Load Balancers tab, for the load balancer that you'd like to update, click more_vert, and then click Edit edit.
Click Backend configuration.
In the Backend configuration pane, click edit.
At the bottom of the Edit backend service pane, click Advanced configurations.
In the Connection draining timeout field, enter a value from 0 - 3600. A setting of 0 disables connection draining.
Update Cloud Service Mesh
Go to the Cloud Service Mesh page in the Google Cloud console.
Go to Cloud Service Mesh
Click the Name of your service.
On the Service details page, click Edit edit.
At the bottom of your service, click Advanced configurations.
In the Connection draining timeout field, enter a value from 0 - 3600. A setting of 0 disables connection draining.
Click Save.
What's next
For general information on backend services, see Backend services overview.