# Convert Application Load Balancer to IPv6

This document shows you how to convert Application Load Balancer resources and backends from IPv4 only (single-stack) to IPv4 and IPv6 (dual-stack). The main advantage of using IPv6 is that a much larger pool of IP addresses can be allocated. You can configure the load balancer to terminate ingress IPv6 traffic and send this traffic over an IPv4 or IPv6 connection to your backends, based on your preference. For more information, see [IPv6 for Application Load Balancers and proxy Network Load Balancers](https://cloud.google.com/load-balancing/docs/ipv6).

In this document, "IPv4 only" (single-stack) refers to resources that use only IPv4 addresses, and "IPv4 and IPv6" (dual-stack) refers to resources that use both IPv4 and IPv6 addresses.

## Before you begin

Note the following conditions before you begin the conversion process:

You must be using one of the following types of Application Load Balancers:

- Global external Application Load Balancer
- Regional external Application Load Balancer
- Cross-region internal Application Load Balancer
- Regional internal Application Load Balancer

> Classic Application Load Balancers don't support dual-stack backends or subnets. For more information about IPv6 support, see [IPv6 for Application Load Balancers and proxy Network Load Balancers](https://cloud.google.com/load-balancing/docs/ipv6).

Your load balancer must have either VM instance group backends or zonal network endpoint group (NEG) backends with `GCE_VM_IP_PORT` endpoints. Other backend types do not have dual-stack support.

Additionally, the conversion process differs based on the type of load balancer.

- For **global external Application Load Balancers**, you convert the backends to dual-stack and create an IPv6 forwarding rule that can handle incoming IPv6 traffic.
- For **cross-region internal Application Load Balancers, regional external Application Load Balancers, and regional internal Application Load Balancers**, you only convert the backends to dual-stack. IPv6 forwarding rules are not supported for these load balancers.

For information about how to set up Application Load Balancers, see the following documentation:

- Set up a global external Application Load Balancer: [VM instance group backends](https://cloud.google.com/load-balancing/docs/l7-external-setup-ig), [zonal NEG backends](https://cloud.google.com/load-balancing/docs/l7-external-setup-zonal-neg)
- Set up a regional external Application Load Balancer: [VM instance group backends](https://cloud.google.com/load-balancing/docs/l7-regional-external-setup-ig), [zonal NEG backends](https://cloud.google.com/load-balancing/docs/l7-regional-external-setup-zonal-neg)
- Set up a cross-region internal Application Load Balancer: [VM instance group backends](https://cloud.google.com/load-balancing/docs/l7-internal-cross-region-setup-ig), [zonal NEG backends](https://cloud.google.com/load-balancing/docs/l7-internal-cross-region-setup-zonal-neg)
- Set up a regional internal Application Load Balancer: [VM instance group backends](https://cloud.google.com/load-balancing/docs/l7-internal-setup-ig), [zonal NEG backends](https://cloud.google.com/load-balancing/docs/l7-internal-setup-zonal-neg)

## Identify the resources to convert

Note the names of the resources that your load balancer is associated with. You will need to provide these names later.

To list all the subnets, use the `gcloud compute networks subnets list` command:

```bash
gcloud compute networks subnets list
```

Note the name of the subnet with IPv4 only addresses to convert to dual-stack. This name is referred to later as `SUBNET`. The VPC network is referred to later as `NETWORK`.

To list all the backend services, use the `gcloud compute backend-services list` command:

```bash
gcloud compute backend-services list
```

Note the name of the backend service to convert to dual-stack. This name is referred to later as `BACKEND_SERVICE`.

To list all the URL maps, use the `gcloud compute url-maps list` command:

```bash
gcloud compute url-maps list
```

Note the name of the URL map associated with your load balancer. This name is referred to later as `URL_MAP`.

If you already have a load balancer, to view the IP stack type of your backends, use the `gcloud compute instances list` command:

```bash
gcloud compute instances list    --format="table(name, zone.basename(), networkInterfaces[].stackType.notnull().list(), networkInterfaces[].ipv6AccessConfigs[0].externalIpv6.notnull().list():label=EXTERNAL_IPV6, networkInterfaces[].ipv6Address.notnull().list():label=INTERNAL_IPV6)"
```

To list all the VM instances and instance templates, use the `gcloud compute instances list` and `gcloud compute instance-templates list` commands:

```bash
gcloud compute instances list
gcloud compute instance-templates list
```

Note the names of the instances and instance templates to convert to dual-stack. These names are referred to later as `VM_INSTANCE` and `INSTANCE_TEMPLATES`.

To list all the instance groups, use the `gcloud compute instance-groups list` command:

```bash
gcloud compute instance-groups list
```

Note the name of the network endpoint groups to convert to dual stack. This name is referred to later as `INSTANCE_GROUP`.

To list all the zonal network endpoint groups (NEGs), use the `gcloud compute network-endpoint-groups list` command:

```bash
gcloud compute network-endpoint-groups list
```

Note the names of the zonal NEG backends to convert to dual-stack. This name is referred to later as `ZONAL_NEG`.

To list all the target proxies, use the `gcloud compute target-http-proxies list` command:

```bash
gcloud compute target-http-proxies list
```

Note the name of the target proxy associated with your load balancer. This name is referred to later as `TARGET_PROXY`.

## Convert from single-stack to dual-stack backends

This section shows you how to convert your load balancer resources and backends using IPv4 only (single-stack) addresses to IPv4 and IPv6 (dual-stack) addresses.

### Update the subnet

Dual-stack subnets are supported on custom mode VPC networks only. Dual-stack subnets are not supported on auto mode VPC networks or legacy networks. Though auto mode networks can be useful for early exploration, custom mode VPCs are better suited for most production environments. We recommend that you use VPCs in custom mode.

To update the VPC to the dual-stack setting, follow these steps:

1.  If you are using an auto mode VPC network, you must first [convert the auto mode VPC network to custom mode](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#convert-auto-to-custom).
2.  If you are using the default network, you must convert it to a custom mode VPC network.
3.  To enable IPv6, see [Change a subnet's stack type to dual stack](https://cloud.google.com/vpc/docs/create-modify-vpc-networks#change_stack_type).
4.  Make sure that the IPv6 access type of the subnet is set to **External**.

> **Note:** Once you've updated a subnet's stack type to dual-stack, you cannot change it back to IPv4-only.

**Optional:** If you want to configure internal IPv6 address ranges on subnets in this network, complete these steps:

1.  For **VPC network ULA internal IPv6 range**, select **Enabled**.
2.  For **Allocate internal IPv6 range**, select **Automatically** or **Manually**.
    -   If you select **Manually**, enter a `/48` range from within the `fd20::/20` range. If the range is in use, you are prompted to provide a different range.

### Update the proxy-only subnet

If you are using an Envoy based load balancer, we recommend that you change the proxy-only subnet stack type to dual stack. For information about load balancers that support proxy-only subnets, see [Supported load balancers](https://cloud.google.com/load-balancing/docs/proxy-only-subnets#supported-load-balancers).

> **Note:** Before you update the stack type of a proxy-only subnet to dual-stack, you need to assign an internal IPv6 range on the VPC network.

You can't update the stack type of a proxy-only subnet (`purpose=REGIONAL_MANAGED_PROXY`) in the same way that you would for a regular subnet (with the `subnets update` command). Instead, you must create a backup proxy-only subnet with a dual-stack stack type and then promote it to the active role. This is because only one proxy-only subnet can be active per region, per VPC network.

After assigning an internal IPv6 range on the VPC network, do the following to change the proxy-only subnet's stack type to dual stack.

The following steps assume you already have an existing active proxy-only subnet.

1.  Create a backup proxy-only subnet in the same region, specifying a stack type of dual-stack (`--stack-type=IPV4_IPV6`), using the `gcloud compute networks subnets create` command. This subnet is assigned as a backup with the `--role=BACKUP` flag.

    ```bash
    gcloud compute networks subnets create BACKUP_PROXY_ONLY_SUBNET_NAME \
        --purpose=REGIONAL_MANAGED_PROXY \
        --role=BACKUP \
        --region=REGION \
        --network=VPC_NETWORK_NAME \
        --range=BACKUP_PROXY_ONLY_SUBNET_RANGE \
        --stack-type=IPV4_IPV6
    ```

    Replace the following:

    -   `BACKUP_PROXY_ONLY_SUBNET_NAME`: the name of the newly created backup proxy-only subnet
    -   `REGION`: the region of the newly created backup proxy-only subnet. This should be the same region as the current active proxy-only subnet.
    -   `VPC_NETWORK_NAME`: the network of the newly created backup proxy-only subnet. This should be the same network as the current active proxy-only subnet.
    -   `BACKUP_PROXY_ONLY_SUBNET_RANGE`: the CIDR range of the newly created backup proxy-only subnet

2.  Create or modify ingress allow firewall rules that apply to your backend VMs or endpoints so that they now include the primary IP address range of the backup proxy-only subnet. The firewall rule should already be accepting connections from the active subnet.

    ```bash
    gcloud compute firewall-rules update PROXY_ONLY_SUBNET_FIREWALL_RULE \
        --source-ranges ACTIVE_PROXY_ONLY_SUBNET_RANGE,BACKUP_PROXY_ONLY_SUBNET_RANGE
    ```

    Replace the following:

    -   `PROXY_ONLY_SUBNET_FIREWALL_RULE`: the name of the firewall rule that allows traffic from the proxy-only subnet to reach your backend instances or endpoints
    -   `ACTIVE_PROXY_ONLY_SUBNET_RANGE`: the CIDR range of the current active proxy-only subnet
    -   `BACKUP_PROXY_ONLY_SUBNET_RANGE`: the CIDR range of the backup proxy-only subnet

3.  Update the new subnet, setting it to be the **ACTIVE** proxy-only subnet in the region and wait for the old subnet to drain. This also demotes the previously active proxy-only subnet to the backup role.

    To drain an IP address range immediately, set the `--drain-timeout` to `0s`. This promptly ends all connections to proxies that have assigned addresses in the subnet that is being drained.

    ```bash
    gcloud compute networks subnets update BACKUP_PROXY_ONLY_SUBNET_NAME \
        --region=REGION \
        --role=ACTIVE \
        --drain-timeout=CONNECTION_DRAINING_TIMEOUT
    ```

    Replace the following:

    -   `BACKUP_PROXY_ONLY_SUBNET_NAME`: the name of the newly created backup proxy-only subnet
    -   `REGION`: the region of the newly created backup proxy-only subnet. This should be the same region as the current active proxy-only subnet.
    -   `CONNECTION_DRAINING_TIMEOUT`: the amount of time, in seconds, that Google Cloud uses to migrate existing connections away from proxies in the previously active proxy-only subnet.

4.  Monitor the status of the drain by using a `list` or `describe` command. The status of the subnet is `DRAINING` while it is being drained.

    ```bash
    gcloud compute networks subnets list
    ```

5.  Wait for draining to complete. When the old proxy-only subnet is drained, the status of the subnet is `READY`.

6.  Update your proxy only subnet firewall rule to only allow connections from the new subnet.

    ```bash
    gcloud compute firewall-rules PROXY_ONLY_SUBNET_FIREWALL_RULE \
        --source-ranges BACKUP_PROXY_ONLY_SUBNET_RANGE
    ```

7.  After you're confident that connections to your backend VMs or endpoints aren't coming from proxies in the previously active (now backup) proxy-only subnet, you can delete the old subnet.

    ```bash
    gcloud compute networks subnets delete ACTIVE_PROXY_ONLY_SUBNET_NAME \
        --region=REGION
    ```

### Update the VM instance or templates

You can configure IPv6 addresses on a VM instance if the subnet that the VM is connected to has an IPv6 range configured. Only the following backends can support IPv6 addresses:

-   **Instance group backends:** One or more managed, unmanaged, or a combination of managed and unmanaged instance group backends.
-   **Zonal NEGs:** One or more `GCE_VM_IP_PORT` type zonal NEGs.

#### Update VM instances

You cannot edit VM instances that are part of a managed or an unmanaged instance group. To update the VM instances to dual stack, follow these steps:

1.  [Delete specific instances from a group](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances#deleting_instances)
2.  [Create a dual-stack VM](https://cloud.google.com/compute/docs/ip-addresses/create-vm-dual-stack)
3.  [Create instances with specific names in MIGs](https://cloud.google.com/compute/docs/instance-groups/creating-groups-of-managed-instances#create_instances_with_specific_names_in_migs)

#### Update VM instance templates

You can't update an existing instance template. If you need to make changes, you can create another template with similar properties. To update the VM instance templates to dual stack, follow these steps:

1.  In the Google Cloud console, go to the **Instance templates** page.
2.  Click the instance template that you want to copy and update.
3.  Click **Create similar**.
4.  Expand the **Advanced options** section.
5.  For **Network tags**, enter `allow-health-check-ipv6`.
6.  In the **Network interfaces** section, click **Add a network interface**.
7.  In the **Network** list, select the custom mode VPC network.
8.  In the **Subnetwork** list, select `SUBNET`.
9.  For **IP stack type**, select **IPv4 and IPv6 (dual-stack)**.
10. Click **Create**.
11. Start a basic rolling update on the managed instance group MIG associated with the load balancer.

### Update the zonal NEG

Zonal NEG endpoints cannot be edited. You must delete the IPv4 endpoints and create a new dual-stack endpoint with both IPv4 and IPv6 addresses.

To set up a zonal NEG (with `GCE_VM_IP_PORT` type endpoints) in the `REGION_A` region, first create the VMs in the `GCP_NEG_ZONE` zone. Then add the VM network endpoints to the zonal NEG.

#### Create VMs

Create the VMs by running the following command two times, using these combinations for the name of the VM and its zone. The script contents are identical for both VMs.

-   `VM_NAME` of `vm-a1` and any `GCP_NEG_ZONE` zone of your choice.
-   `VM_NAME` of `vm-a2` and the same `GCP_NEG_ZONE` zone.

```bash
gcloud compute instances create VM_NAME \
    --zone=GCP_NEG_ZONE \
    --stack-type=IPV4_IPV6 \
    --image-family=debian-12 \
    --image-project=debian-cloud \
    --tags=allow-health-check \
    --subnet=SUBNET \
    --metadata=startup-script=\'#! /bin/bash
      apt-get update
      apt-get install apache2 -y
      a2ensite default-ssl
      a2enmod ssl
      vm_hostname=\"$(curl -H \"Metadata-Flavor:Google\" \
      http://metadata.google.internal/computeMetadata/v1/instance/name)\" 
      echo "Page served from: $vm_hostname" | \
      tee /var/www/html/index.html
      systemctl restart apache2\'
```

#### Add endpoints to the zonal NEG

Add endpoints (`GCE_VM_IP_PORT` endpoints) to `ZONAL_NEG`.

> **Note:** A backend service with multiple endpoints must have unique IPv6 addresses. The endpoints can be in different subnets, but the same IPv6 address cannot be used for multiple endpoints.

```bash
gcloud compute network-endpoint-groups update ZONAL_NEG \
    --zone=GCP_NEG_ZONE \
    --add-endpoint='instance=vm-a1,ip=IPv4_ADDRESS,ipv6=IPv6_ADDRESS,port=80' \
    --add-endpoint='instance=vm-a2,ip=IPv4_ADDRESS,ipv6=IPv6_ADDRESS,port=80'
```

Replace the following:

-   `IPv4_ADDRESS`: IPv4 address of the network endpoint. The IPv4 must belong to a VM in Compute Engine (either the primary IP or as part of an aliased IP range). If the IP address is not specified, then the primary IP address for the VM instance in the network that the network endpoint group belongs to is used.
-   `IPv6_ADDRESS`: IPv6 address of the network endpoint. The IPv6 address must belong to a VM instance in the network that the network endpoint group belongs (external IPv6 address).

### Create a firewall rule for IPv6 health check probes

You must create a firewall rule to allow health checks from the IP ranges of Google Cloud probe systems. For more information, see [probe IP ranges](https://cloud.google.com/load-balancing/docs/health-checks#probes-ip-ranges).

Ensure that the ingress rule is applicable to the instances being load balanced and that it allows traffic from the Google Cloud health checking systems. This example uses the target tag `allow-health-check-ipv6` to identify the VM instances to which it applies.

Without this firewall rule, the default deny ingress rule blocks incoming IPv6 traffic to the backend instances.

#### Using gcloud

Create the `fw-allow-lb-access-ipv6` firewall rule to allow communication with the subnet.

For **global external Application Load Balancer** and **global external proxy Network Load Balancer**, use the following command:

```bash
gcloud compute firewall-rules create fw-allow-lb-access-ipv6 \
    --network=NETWORK \
    --action=allow \
    --direction=ingress \
    --target-tags=allow-health-check-ipv6 \
    --source-ranges=2600:2d00:1:b029::/64,2600:2d00:1:1::/64 \
    --rules=all
```

For **cross-region internal Application Load Balancer**, **regional external Application Load Balancer**, **regional internal Application Load Balancer**, **cross-region internal proxy Network Load Balancer**, **regional external proxy Network Load Balancer**, and **regional internal proxy Network Load Balancer**, use the following command:

```bash
gcloud compute firewall-rules create fw-allow-lb-access-ipv6 \
    --network=NETWORK \
    --action=allow \
    --direction=ingress \
    --target-tags=allow-health-check-ipv6 \
    --source-ranges=2600:2d00:1:b029::/64 \
    --rules=all
```

### Create a firewall rule for the proxy-only subnet

If you are using a **regional external Application Load Balancer** or an **internal Application Load Balancer**, you must update the ingress firewall rule `fw-allow-lb-access-ipv6` to allow traffic from the proxy-only subnet to the backends.

To get the IPv6 address range of the proxy-only subnet, run the following command:

```bash
gcloud compute networks subnets describe PROXY_ONLY_SUBNET \
    --region=REGION \
    --format="value(internalIpv6Prefix)"
```

Note the internal IPv6 address range; this range is later referred to as `IPV6_PROXY_ONLY_SUBNET_RANGE`.

To update the firewall rule `fw-allow-lb-access-ipv6` for the proxy-only subnet, do the following:

#### Using gcloud

Update the `fw-allow-lb-access-ipv6` firewall rule to allow communication with the proxy-only subnet:

```bash
gcloud compute firewall-rules update fw-allow-lb-access-ipv6 \
    --source-ranges=2600:2d00:1:b029::/64,IPV6_PROXY_ONLY_SUBNET_RANGE
```

### Create a new backend service and forwarding rule for IPv6

This section describes the procedure to create a new backend service and a forwarding rule for IPv6. Note that the IPv6 forwarding rule can be created only for **global external Application Load Balancers**. IPv6 forwarding rules aren't supported for cross-region internal Application Load Balancers, regional external Application Load Balancers, and regional internal Application Load Balancers.

At this point in the process, both `BACKEND_SERVICE` and `BACKEND_SERVICE_IPV6` are capable of serving traffic. To avoid traffic disruption, create a new backend service with the IP address selection policy set to **Prefer IPv6**. After you create the new backend service, you can route traffic to the new IPv6 backend service.

#### Using gcloud

1.  Create a health check:

    ```bash
    gcloud compute health-checks create http HEALTH_CHECK \
        --port 80
    ```

2.  Create the backend service for HTTP traffic:

    For the **global external Application Load Balancer**, use the command:

    ```bash
    gcloud compute backend-services create BACKEND_SERVICE_IPV6 \
        --load-balancing-scheme=EXTERNAL_MANAGED \
        --protocol=HTTP \
        --ip-address-selection-policy=PREFER_IPV6 \
        --health-checks=HEALTH_CHECK \
        --global
    ```

3.  Add the dual-stack zonal NEGs as the backend to the backend service.

    For the **global external Application Load Balancer**, use the command:

    ```bash
     gcloud compute backend-services add-backend BACKEND_SERVICE_IPV6 \
         --network-endpoint-group=ZONAL_NEG \
         --network-endpoint-group-zone=ZONE \
         --max-rate-per-endpoint=10 \
         --global
    ```

4.  Add the dual-stack instance groups as the backend to the backend service.

    For the **global external Application Load Balancer**, use the command:

    ```bash
     gcloud compute backend-services add-backend BACKEND_SERVICE_IPV6 \
         --instance-group=INSTANCE_GROUP \
         --global
    ```

5.  For **global external Application Load Balancers only**. Create the IPv6 forwarding rule for the global external Application Load Balancer. Use the command:

    ```bash
     gcloud compute forwarding-rules create FORWARDING_RULE_IPV6 \
         --load-balancing-scheme=EXTERNAL_MANAGED \
         --network-tier=PREMIUM \
         --global \
         --target-http-proxy=TARGET_PROXY \
         --ports=443
    ```

### Route traffic to the new IPv6 backend service

Update the URL map to direct some fraction of client traffic to the new IPv6 backend service `BACKEND_SERVICE_IPV6`.

Use the following command to edit the URL maps:

For the **global external Application Load Balancer**, use the command:

```bash
gcloud compute url-maps edit URL_MAP \
    --global
```

In the text editor that appears, add a `routeRule` with a `weightedBackendServices` action that directs a percentage of IPv6 traffic to `BACKEND_SERVICE_IPV6`.

```yaml
defaultService: global/backendServices/BACKEND_SERVICE
hostRules:
- hosts:
  - '*'
  pathMatcher: matcher1
name: URL_MAP
pathMatchers:
- defaultService: global/backendServices/BACKEND_SERVICE
  name: matcher1
  routeRules:
  - matchRules:
    - prefixMatch: ''
    priority: 1
    routeAction:
      weightedBackendServices:
      - backendService: global/backendServices/BACKEND_SERVICE
        weight: 95
      - backendService: global/backendServices/BACKEND_SERVICE_IPV6
        weight: 5
```

To implement gradual migration to IPv6, increase the weight percentage for the new backend service `BACKEND_SERVICE_IPV6` incrementally to 100% by editing the URL map many times.

## Configure the IP address selection policy

After you have converted your resources and backends to dual-stack, you can use the IP address selection policy to specify the traffic type that is sent from the backend service to your backends.

Replace `IP_ADDRESS_SELECTION_POLICY` with any of the following values:

| IP Address Selection Policy | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Only IPv4**               | Only send IPv4 traffic to the backends of the backend service, regardless of traffic from the client to the GFE. Only IPv4 health checks are used to check the health of the backends.                                                                                                                                                                                                                                                                                                                 |
| **Prefer IPv6**             | Prioritize the backend's IPv6 connection over the IPv4 connection (provided there is a healthy backend with IPv6 addresses).<br><br>The health checks periodically monitor the backends' IPv6 and IPv4 connections. The GFE first attempts the IPv6 connection; if the IPv6 connection is broken or slow, the GFE uses happy eyeballs to fall back and connect to IPv4.<br><br>Even if one of the IPv6 or IPv4 connections is unhealthy, the backend is still treated as healthy, and both connections can be tried by the GFE, with happy eyeballs ultimately selecting which one to use. |
| **Only IPv6**               | Only send IPv6 traffic to the backends of the backend service, regardless of traffic from the client to the proxy. Only IPv6 health checks are used to check the health of the backends.                                                                                                                                                                                                                                                                                                                  |

> There is no validation to check if the backend traffic type matches the IP address selection policy. For example, if you have IPv4-only backends and select **Only IPv6** as the IP address selection policy, the configuration results in unhealthy backends because traffic fails to reach those backends and the HTTP 503 response code is returned to the clients.

#### Using gcloud

Update the IP address selection policy for the backend service:

For the **global external Application Load Balancer**, use the command:

```bash
gcloud compute backend-services update BACKEND_SERVICE_IPV6 \
    --load-balancing-scheme=EXTERNAL_MANAGED \
    --protocol=HTTP \
    --ip-address-selection-policy=IP_ADDRESS_SELECTION_POLICY \
    --global
```

## Test your load balancer

You must validate that all required resources are updated to dual stack. After you update all the resources, the traffic must automatically flow to the backends. You can check the logs and verify that the conversion is complete.

Test the load balancer to confirm that the migration is successful and the incoming traffic is reaching the backends as expected.

### Look up the load balancer IP addresses

In the Google Cloud console, go to the **Load balancing** page.

1.  Click the name of the load balancer.
2.  In the **Frontend** section, two load balancer IP addresses are displayed. In this procedure, the IPv4 address is referred to as `IP_ADDRESS_IPV4` and the IPv6 address is referred as `IP_ADDRESS_IPV6`.
3.  In the **Backends** section, when the IP address selection policy is **Prefer IPv6**, two health check statuses are displayed for the backends.

> **Note:** A backend service with multiple endpoints must have unique IPv6 addresses. The endpoints can be in different subnets, but the same IPv6 address cannot be used for multiple endpoints.

### Send traffic to the load balancer

> **Note:** It might take a few minutes for the load balancer configuration to propagate globally after you first deploy it.

In this example, requests from the `curl` command are distributed randomly to the backends.

#### For external load balancers

Repeat the following commands a few times until you see all the backend VMs responding:

```bash
curl -m1 IP_ADDRESS_IPV4:PORT
curl -m1 IP_ADDRESS_IPV6:PORT
```

For example, if the IPv6 address is `[fd20:1db0:b882:802:0:46:0:0]:80`, the command looks similar to this:

```bash
curl -m1 [fd20:1db0:b882:802:0:46:0:0]:80
```

#### For internal load balancers

1.  Create a test client VM in the same VPC network and region as the load balancer. It doesn't need to be in the same subnet or zone.

    ```bash
gcloud compute instances create client-vm \
        --zone=ZONE \
        --image-family=debian-12 \
        --image-project=debian-cloud \
        --tags=allow-ssh \
        --subnet=SUBNET
```

2.  Use SSH to connect to the client instance.

    ```bash
gcloud compute ssh client-vm \
        --zone=ZONE
```

3.  Repeat the following commands a few times until you see all the backend VMs responding:

    ```bash
curl -m1 IP_ADDRESS_IPV4:PORT
curl -m1 IP_ADDRESS_IPV6:PORT
```

    For example, if the IPv6 address is `[fd20:1db0:b882:802:0:46:0:0]:80`, the command looks similar to this:

    ```bash
curl -m1 [fd20:1db0:b882:802:0:46:0:0]:80
```

### Check the logs

Every log entry captures the destination IPv4 and IPv6 address for the backend. Because we support dual-stack, it is important to observe the IP address used by the backend.

You can check that traffic is going to IPv6 or failing back to IPv4 by viewing the logs.

The `HttpRequest` contains the `backend_ip` address associated with the backend. By examining the logs and comparing the destination IPv4 and IPv6 address of the `backend_ip`, you can confirm which IP address is used.
