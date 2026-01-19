# Zonal network endpoint groups overview

A network endpoint group (NEG) is a configuration object that specifies a group
of backend endpoints or services. **Zonal NEGs** are zonal resources that
represent collections of either IP addresses or IP address and port combinations
for Google Cloud resources within a single subnet.

Every endpoint in a NEG must point to a unique IP address of a VM's network
interface. A single IP address can be referenced by endpoints in different NEGs.

![A network endpoint group is a collection of network endpoints.](https://cloud.google.com/static/load-balancing/docs/images/neg-overview.svg 'Network endpoint group (click to enlarge).')

Zonal NEGs let you do the following:

- Route packets to any network interface of a VM instance, including interfaces
  other than `nic0`.
- Create a flexible set of IP addresses where an IP address can be attached to
  multiple NEGs.

There are two types of zonal NEGs, depending on the type of network endpoints.

- **Zonal NEGs with `GCE_VM_IP` endpoints** are supported as backends for:
  - Internal passthrough Network Load Balancer
  - External passthrough Network Load Balancer
- **Zonal NEGs with `GCE_VM_IP_PORT` endpoints** are supported as backends for:
  - External Application Load Balancer
  - Internal Application Load Balancer
  - External proxy Network Load Balancer
  - Internal proxy Network Load Balancer

> **Important:** Zonal NEGs use an internal IPv4 address or any IPv6 address as
> an endpoint.

---

## NEGs with `GCE_VM_IP` endpoints

These zonal NEGs contain one or more `GCE_VM_IP` endpoints, with each endpoint
having a primary internal IPv4 address of a Compute Engine VM's network
interface.

- A `GCE_VM_IP` endpoint cannot point to an IP address from an alias IPv4 range.
- The network interface must be in the same subnet as the NEG.
- `GCE_VM_IP` endpoints can reference a VM's network interface whose stack type
  is either IPv4-only or dual-stack.
- You cannot add a dual-stack endpoint (simultaneously IPv4 and IPv6) to a
  `GCE_VM_IP` zonal NEG.
- Because a `GCE_VM_IP` endpoint identifies a network interface, you cannot
  specify a port.

---

## NEGs with `GCE_VM_IP_PORT` endpoints

These zonal NEGs contain one or more `GCE_VM_IP_PORT` endpoints, with each
endpoint having one of the following IP address combinations along with a
destination port:

- Primary IPv4 address + port
- Alias IPv4 address + port
- Primary IPv4 address + any IPv6 address + port
- Alias IPv4 address + any IPv6 address + port

`GCE_VM_IP_PORT` endpoints can reference a VM's network interface whose stack
type is either IPv4-only or dual-stack. When you omit a port number, Google
Cloud uses the NEG's default port number.

Because these backends let you specify IP addresses and ports, you can
distribute traffic in a granular fashion among applications or containers
running within VM instances—**container-native load balancing**.

---

## Endpoint specifications

When you create a NEG, you select a zone, a network, and a subnet.

### `GCE_VM_IP` zonal NEGs

- You must specify the VM name for each endpoint.
- Each endpoint VM must be in the same zone as the NEG.
- Every endpoint in a `GCE_VM_IP` NEG must be a unique IP address.
- Each NEG is associated with a network and a subnetwork.
- Each NEG supports up to the maximum number of endpoints per NEG.
- When adding an endpoint, specifying an IP address is redundant because there
  can only be a single network interface in the subnet associated with the NEG.

### `GCE_VM_IP_PORT` zonal NEGs

- You must specify the VM name for each endpoint.
- Each endpoint VM must be in the same zone as the NEG.
- Every endpoint in the NEG must be a unique IP address and port combination.
- Each NEG supports up to the maximum number of endpoints per NEG.
- When adding an endpoint, you can choose to specify an IP address and port,
  just an IP address, or neither. If omitted, defaults are used.

---

## Load balancing with zonal NEGs

Zonal NEGs can be used as backends for backend services. When you use a zonal
NEG as a backend, all other backends in that backend service must also be zonal
NEGs of the same type. You cannot mix instance groups and zonal NEGs in the same
backend service.

- `GCE_VM_IP_PORT` zonal NEGs can use either the `RATE` or `CONNECTION`
  balancing mode.
- `GCE_VM_IP` zonal NEGs must use the `CONNECTION` balancing mode.

### Passthrough Network Load Balancers

Zonal NEGs with `GCE_VM_IP` endpoints can be used as backends only for internal
and external passthrough Network Load Balancers.

#### Flexible endpoint grouping

Like instance groups, you can use the same NEG as a backend for multiple
passthrough Network Load Balancers. Unlike instance groups, a NEG endpoint can
be a member of multiple NEGs.

![Internal passthrough Network Load Balancers with overlapping zonal NEGs.](https://cloud.google.com/static/load-balancing/docs/images/zonal-neg-l4-ilb.svg 'Internal passthrough Network Load Balancers with overlapping zonal NEGs (click to enlarge).')

#### Non-nic0 interfaces as backend endpoints

Zonal NEGs with `GCE_VM_IP` endpoints allow load balancing to non-`nic0` network
interfaces of VMs, which is useful for integrating with third-party appliance
VMs.

#### GKE subsetting

GKE uses `GCE_VM_IP` zonal NEGs and subsetting to improve the scalability of
internal passthrough Network Load Balancers, distributing traffic more
efficiently in clusters with more than 250 nodes.

### Application Load Balancers and proxy Network Load Balancers

The primary use case for `GCE_VM_IP_PORT` zonal NEGs is **container-native load
balancing**, allowing traffic to be distributed directly to containers running
on VMs.

![Load balancing zonal network endpoint groups with containers.](https://cloud.google.com/static/load-balancing/docs/images/zonal-neg-l7-containers.svg 'Load balancing zonal network endpoint groups with containers (click to enlarge).')

There are two ways to configure container-native load balancing:

1.  **Kubernetes Ingress with NEGs (Recommended):** The Ingress controller
    facilitates the creation of all aspects of the load balancer. See
    [Container-native load balancing through Ingress](https://cloud.google.com/kubernetes-engine/docs/how-to/container-native-load-balancing).
2.  **Standalone NEGs:** Provides a way for your GKE cluster to create zonal
    NEGs representing Pods, while giving you the flexibility to configure the
    load balancer components outside of GKE. See examples for
    [external](https://cloud.google.com/kubernetes-engine/docs/how-to/standalone-negs#attaching_a_load_balancer_to_standalone_negs)
    and
    [internal](https://cloud.google.com/kubernetes-engine/docs/how-to/standalone-negs#attaching_an_internal_load_balancer_to_standalone_negs)
    Application Load Balancers.

---

## Limitations

- You cannot use zonal NEGs with legacy networks.
- A backend service that uses NEGs cannot also use instance groups.
- **For `GCE_VM_IP` zonal NEGs:**
  - Only supported with internal/external passthrough Network Load Balancers.
  - The `default-port` property is not supported.

---
