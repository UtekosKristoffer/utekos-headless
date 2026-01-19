# Using target pools

A **target pool** is a group of backend instances that receive incoming traffic
from external passthrough Network Load Balancers. All backend instances in a
target pool must reside in the same Google Cloud region. External passthrough
Network Load Balancers can use either a backend service or a target pool to
define the group of backend instances.

> **Note:** If you're creating new external passthrough Network Load Balancers,
> we recommend using backend services. This page describes configuration options
> for target pool backends.

When an external passthrough Network Load Balancer's forwarding rule directs
traffic to a target pool, the load balancer chooses an instance from the target
pool based on a hash of the source IP, source port, destination IP, and
destination port.

---

## Target pool properties

Target pools work with forwarding rules that handle TCP and UDP traffic and use
legacy HTTP health checks.

A target pool is made up of the following properties:

- **`name`**: The unique name of this target pool (1-63 characters).
- **`description`**: An optional user-defined description.
- **`region`**: The fully qualified URL of the target pool's region.
- **`healthChecks[]`**: An optional list of health checks. Only one health check
  can be attached.
- **`instances[]`**: A list of instance URLs that should handle traffic. All
  instances must be in the same region as the target pool.
- **`sessionAffinity`**: Optional. Controls the method used to select a backend
  instance. This can only be set during creation.
  - **`NONE` (default):** 5-tuple hashing (source/destination IP,
    source/destination port, protocol). Each new connection can end up on any
    instance.
  - **`CLIENT_IP_PROTO`:** 3-tuple hashing (source/destination IP, protocol).
    All connections from a client using the same protocol will go to the same
    instance.
  - **`CLIENT_IP`:** 2-tuple hashing (source/destination IP). All connections
    from a client will go to the same instance, regardless of protocol.
    > **Note:** If you are load balancing fragmented UDP packets, set session
    > affinity to `CLIENT_IP_PROTO` or `CLIENT_IP`.
- **`backupPool`**: Optional. A fully qualified URL to another target pool. If
  the ratio of healthy VMs in the primary target pool falls below the
  `failoverRatio`, traffic is sent to the backup pool. Only one level of
  failover is supported.
- **`failoverRatio`**: Optional. A float between `0.0` and `1.0` that determines
  when the target pool is declared unhealthy. For example, if set to `0.1`, the
  pool is unhealthy if fewer than 10% of its instances are healthy.

### Failover conditions

| Conditions                                                                                              | New connections go to     |
| :------------------------------------------------------------------------------------------------------ | :------------------------ |
| Failover ratio != 0, healthy VMs in target pool >= FR                                                   | target pool               |
| Failover ratio = 0, healthy VMs in target pool > 0                                                      | target pool               |
| Failover ratio != 0, healthy VMs in target pool < FR, and at least one VM in the backup pool is healthy | backup pool               |
| At least one VM is in the target pool, and all VMs in both pools are unhealthy                          | target pool (last resort) |
| No VMs are in the target pool, and all VMs in the backup pool are unhealthy                             | backup pool (last resort) |
| No VMs are in either pool                                                                               | Traffic is dropped        |

---

## Management tasks

### Create a target pool

Target pools can't be created in the Google Cloud console. You can create a
target pool by using the `gcloud` CLI or the API. For an example, see
[Set up an external passthrough Network Load Balancer with a target pool](https://cloud.google.com/load-balancing/docs/l4-external/setting-up-network#create-lb).

### Add or remove an instance from a target pool

Target pools can't be edited in the Google Cloud console. You can edit a target
pool by using the `gcloud` CLI or the API.

### List target pools

To see a list of target pools, go to the **Load balancing** > **Advanced** >
**Target pools** tab in the Google Cloud console.

### Describe a target pool

To get information about a target pool, go to the **Load balancing** >
**Advanced** > **Target pools** tab and click the name of the target pool.

### Get the health status of instances

To get the health status of instances in a target pool, go to the **Load
balancing** > **Advanced** > **Target pools** tab and click the name of the
target pool. The details page lists all the instances and their health status.

### Delete a target pool

To delete a target pool, you must first make sure it is not referenced by any
forwarding rules.

1.  Go to the **Load balancing** > **Advanced** > **Target pools** tab.
2.  Click the name of the target pool.
3.  Click **Delete**.

### Add or remove a health check from a target pool

- If a target pool has no associated health check, all instances are treated as
  healthy.
- External passthrough Network Load Balancers use legacy HTTP health checks.
- You can create a legacy HTTP health check in the Google Cloud console while
  creating an external passthrough Network Load Balancer with a target pool
  backend. You cannot create a standalone legacy health check from the Health
  checks page.

### Add or remove a backup target pool

When you first create a target pool, you can apply a backup target pool. This
cannot be done in the Google Cloud console; use the `gcloud` CLI or the API.

> **Note:** If your target pool has `sessionAffinity` set, resizing the target
> pool could cause requests from the same IP to go to a different instance
> initially.

---

## What's next

- For more information about target pools, see the
  [API reference documentation for `targetPools.setBackup`](https://cloud.google.com/compute/docs/reference/rest/v1/targetPools/setBackup).
- For more information about forwarding rules, see
  [Forwarding rules overview](https://cloud.google.com/load-balancing/docs/forwarding-rule-concepts).
