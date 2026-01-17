Using target pools

A target pool is a group of backend instances that receive incoming traffic from external passthrough Network Load Balancers. All backend instances of a target pool must reside in the same Google Cloud region. External passthrough Network Load Balancers can use either a backend service or a target pool to define the group of backend instances. If you're creating new external passthrough Network Load Balancers, we recommend using backend services.

This page describes configuration options for target pool backends. When an external passthrough Network Load Balancer's forwarding rule directs traffic to a target pool, the load balancer chooses an instance from the target pool based on a hash of the source IP address, the source port, the destination IP address, and the destination port.

If you intend your target pool to contain a single virtual machine (VM), consider using the protocol forwarding feature instead of load balancing.

Note: This page describes how to configure a specific load balancer component or feature before or after you've already created a load balancer. Working with specific components is useful for advanced configurations and necessary for some configuration options. Before using the information on this page, know the type of Google Cloud load balancer that you need.
Target pool properties
Target pools work with forwarding rules that handle TCP and UDP traffic. You must create a target pool before you can use it with a forwarding rule.

Target pools use legacy HTTP health checks.

A target pool is made up of the following properties:

name
The name of this target pool. The name must be unique in this project, from 1-63 characters long and match the regular expression: [a-z]([-a-z0-9]*[a-z0-9])?, which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.
description
Optional. A user-defined description of this target pool.
region
The fully qualified URL of the target pool's region. The region should be the same region where your backend instances reside. For example:

"region" : "https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION"

healthChecks[ ]
Optional. An optional list of health checks for this target pool. Only one health check can be attached to a particular target pool. See Health checking for more information.

instances[ ]
A list of instance URLs that should handle traffic for this target pool. All instances must reside in the same region as the target pool, but instances can belong to different zones within a single region. For example:


"instances" : [
  "https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE",
  "https://www.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/INSTANCE-2"
]
sessionAffinity
Optional. Controls the method used to select a backend virtual machine instance. You can only set this value during the creation of the target pool. Once set, you cannot modify this value. The hash method selects a backend based on a subset of the following 5 values:

Source / Destination IP
Source / Destination Port
Layer 4 Protocol (TCP, UDP)
Possible hashes are:

NONE (i.e., no hash specified) (default)
5-tuple hashing, which uses the source and destination IPs, source and destination ports, and protocol. Each new connection can end up on any instance, but all traffic for a given connection will stay on the same instance, if the instance stays healthy.
CLIENT_IP_PROTO
3-tuple hashing, which uses the source and destination IPs and the protocol. All connections from a client will end up on the same instance as long as they use the same protocol and the instance stays healthy.
CLIENT_IP
2-tuple hashing, which uses the source and destination IPs. All connections from a client will end up on the same instance regardless of protocol as long as the instance stays healthy.
5-tuple hashing provides a good distribution of traffic across many virtual machines. However, a second session from the same client may arrive on a different instance because the source port may change. If you want all sessions from the same client to reach the same backend, as long as the backend stays healthy, you can specify CLIENT_IP_PROTO or CLIENT_IP options.

In general, if you select a 3-tuple or 2-tuple method, it will provide for better session affinity than the default 5-tuple method, but the overall traffic may not be as evenly distributed.

Fragmented UDP packets: If you are load balancing UDP traffic that is likely to be fragmented, set session affinity to CLIENT_IP_PROTO or CLIENT_IP. Don't use NONE (5-tuple hashing). This is because UDP fragments other than the first one don't carry the port number, and the load balancer may drop the fragments without the port. See Load balancing and fragmented UDP packets for more information.

Caution: If a large percentage of your clients are behind a proxy server, don't use CLIENT_IP_PROTO or CLIENT_IP. Using them sends all traffic from those clients to the same instance.
backupPool
Optional. A fully qualified URL to another target pool resource. A backup pool is a target pool that another target pool references. You must also define failoverRatio to use this feature. If the ratio of healthy virtual machines in your target pool falls below the failoverRatio, the external passthrough Network Load Balancer sends traffic to your backup pool. You can only provide one backup pool per target pool. The backup pool must be in the same region as the target pool. If the ratio of healthy instances in your target pool falls below your configured failover ratio, the external passthrough Network Load Balancer uses the following rules to route your traffic:

If the ratio of healthy instances to total instances in the target pool is less than the failover ratio, traffic is sent to healthy instances in the backup pool.
If the ratio of healthy instances to total instances in the target pool is less than the failover ratio but there are no remaining healthy instances in the backup pool, traffic is sent to the remaining healthy instances in the target pool.
If the target pool is not empty and if all instances in both the target pool and the backup pool fail their health checks, traffic is sent to all instances in the target pool, as a last resort.
If the target pool is empty and if all instances in the backup pool fail their health checks, traffic is sent to all instances in the backup pool, as a last resort.
Only one level of failover is supported. For example, if target pool A has backup pool B, and backup pool B has backup pool C, then traffic intended for target pool A can only be directed to backup pool B and not to backup pool C.

failoverRatio
Optional. A float between 0.0 and 1.0, which determines when this target pool is declared unhealthy. For example, if this value is set to 0.1, then this target pool is declared unhealthy if the number of healthy instances are less than 0.1 (10%). If the failover ratio is 0.0, then at least one backend must be healthy for the pool to be considered healthy. If the failover ratio is set to 1.0, then all instances must be healthy for the pool to be considered healthy. You must define this if you define the backupPool field.

Failover conditions
Conditions	New connections go to
Failover ratio !=0, healthy VMs in target pool >= FR	target pool
Failover ratio =0, healthy VMs in target pool > 0	target pool
Failover ratio !=0, healthy VMs in target pool < FR, and at least one VM in the backup pool is healthy	backup pool
Failover ratio =0, healthy VMs in target pool = 0, and at least one VM in the backup pool is healthy	backup pool
At least one VM is in the target pool, and all VMs in the target pool are unhealthy, and all VMs in the backup pool are unhealthy	target pool (last resort)
No VMs are in the target pool, and all VMs in the backup pool are unhealthy	backup pool (last resort)
No VMs are in the target pool, and no VMs are in the backup pool	Traffic is dropped
Create a target pool
Console
gcloud
API
Target pools can't be created in the Google Cloud console. You can create a target pool by using the Google Cloud CLI or the API.

To learn how to create a target pool-based external passthrough Network Load Balancer by using the Google Cloud CLI, see Set up an external passthrough Network Load Balancer with a target pool.

Add or remove an instance from a target pool
Console
gcloud
API
Target pools can't be edited in the Google Cloud console. You can edit a target pool by using the Google Cloud CLI or the API.

List target pools
Console
gcloud
API
To see a list of target pools, use the load balancing advanced menu.

On the Advanced load balancing page, go to the Target pools tab.
Go to Target pools

The page displays a list of target pools.

Describe a target pool
Console
gcloud
API
To get information about a target pool, use the load balancing advanced menu.

On the Advanced load balancing page, go to the Target pools tab.
Go to Target pools
To see detailed information, click the name of the target pool.
Get the health status of instances
Console
gcloud
API
To get the health status of instances in a target pool, use the load balancing advanced menu.

On the Advanced load balancing page, go to the Target pools tab.
Go to Target pools
Click the name of the target pool.
The Target pool details page lists all the instances and their health status.
Delete a target pool
To delete a target pool, you must first make sure that the target pool is not being referenced by any forwarding rules. If a forwarding rule is referencing a target pool, you must delete the forwarding rule to remove the reference.

Console
gcloud
API
To use the Google Cloud console to delete a target pool, use the Load balancing advanced menu.

On the Advanced load balancing page, go to the Target pools tab.
Go to Target pools
Click the name of the target pool.
Click Delete.
In the Delete a target pool window, click Delete.
Add or remove a health check from a target pool
Health check objects are standalone, global resources that can be associated or disassociated from any target pool.

If a target pool has no associated health check, the external passthrough Network Load Balancer will treat all instances as healthy and send traffic to all instances in the target pool. However, if you query for the health status of a target pool without a health check, the status will return as unhealthy to indicate that the target pool does not have a health check. We recommend that your target pools should have associated health checks to help you manage your instances.

External passthrough Network Load Balancers use legacy HTTP health checks to determine the health of instances in the target pool. An external passthrough Network Load Balancer can only use a legacy HTTP health check, not a legacy HTTPS health check.

Console
gcloud
API
When using the Google Cloud console, you can create a legacy HTTP health check while creating an external passthrough Network Load Balancer with a target pool backend.

You cannot use the Google Cloud console Health checks page to create a standalone legacy health check.

Add or remove a backup target pool
When you first create a target pool, you can choose to apply a backup target pool that receives traffic if your target pool becomes unhealthy.

If you have never set up a backup target pool before, you should also set up health checks for the feature to work correctly.

Note: If your target pool has the sessionAffinity field set, resizing the target pool could cause requests that come from the same IP to go to a different instance initially. Eventually, all connections from the IP will go to the same virtual machine, as the old connections close.
Console
gcloud
API
Target pools can't be edited in the Google Cloud console. You can edit a target proxy by using the Google Cloud CLI or the API.

What's next
For more information about target pools, see the API reference documentation for targetPools.setBackup.
For more information about forwarding rules, see Forwarding rules overview.