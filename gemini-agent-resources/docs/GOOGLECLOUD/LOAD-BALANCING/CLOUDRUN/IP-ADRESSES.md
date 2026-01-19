# IP Addresses in Google Cloud

Many Google Cloud resources can have internal and external IP addresses. For example, you can assign an internal and external IP address to Compute Engine instances. The instances use these addresses to communicate with other Google Cloud resources and external systems.

## IP Addresses per Interface Stack Type

Each network interface of an instance can have the following IP addresses assigned according to its stack type:

| Interface Stack Type       | IP Addresses                                                                                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------- |
| **IPv4-only**              | - An internal IPv4 address (required)<br>- An alias IPv4 range (optional)<br>- An external IPv4 address (optional) |
| **Dual-stack (IPv4 and IPv6)** | - An internal IPv4 address (required)<br>- An alias IPv4 range (optional)<br>- An external IPv4 address (optional)<br>- A /96 IPv6 address range, either internal or external, but not both (required) |
| **IPv6-only**              | - A /96 IPv6 address range, either internal or external, but not both (required)                                         |

An instance can communicate with instances on the same Virtual Private Cloud (VPC) network by using the instance's internal IPv4 address, internal IPv6 address, or external IPv6 address. As a best practice, use internal IPv6 addresses for internal communication.

To communicate with the internet, you can use an external IP address configured on the instance. If no external IP address is configured on the instance, Cloud NAT can be used for IPv4 traffic.

Similarly, you must use the instance's external IP address to connect to instances outside of the same VPC network. However, if the networks are connected in some way, such as by using VPC Network Peering, you can use the instance's internal IP address.

For information about identifying the internal and external IP address for your instances, see [View the network configuration for an instance](https://cloud.google.com/compute/docs/ip-addresses/view-ip-addresses).

## Internal IP Addresses

The network interfaces for an instance are assigned IP addresses from the subnet that they are connected to.

### Internal IPv4 Addresses

-   Assigned automatically from the primary IPv4 subnet range.
-   You can assign a specific internal IPv4 address when you create an instance.

### Internal IPv6 Addresses

-   Assigned automatically from the subnet's internal IPv6 range.
-   You can assign a specific internal IPv6 address when you create an instance.

You can also reserve a static internal address from the subnet's IPv4 or IPv6 range and later assign it to an instance.

Compute instances can also have alias IP addresses and ranges. If you have more than one service running on an instance, you can assign each service its own unique IP address.

### Internal DNS Names

Google Cloud automatically resolves the fully qualified DNS name (FQDN) of an instance to the internal IP addresses of the instance. Internal DNS names work only within the instance's VPC network. For more information, see [Internal DNS](https://cloud.google.com/compute/docs/internal-dns).

## External IP Addresses

If you need to communicate with the internet or with resources in another VPC network, you can assign an external IPv4 or IPv6 address to an instance.

### External IPv4 Addresses

-   Assigned automatically from Google's ranges of external IPv4 addresses.
-   You can assign a specific external IPv4 address when you create an instance.

### External IPv6 Addresses

-   Assigned automatically from the subnet's external IPv6 range.
-   You can assign a specific external IPv6 address when you create an instance.

### Alternatives to Using an External IP Address

| Access Method        | Solution                                    | Best used when                                                              |
| :------------------- | :------------------------------------------ | :-------------------------------------------------------------------------- |
| **Interactive**      | Configure TCP forwarding for Identity-Aware Proxy (IAP) | You want to use administrative services like SSH and RDP to connect to your backend instances. |
| **Fetching**         | Cloud NAT gateway or Secure Web Proxy       | You want your Compute Engine instances to connect to the internet (outbound), but hosts outside of your VPC network can't initiate their own connections. |
| **Serving**          | Create an external load balancer              | You want clients to connect to resources without external IP addresses anywhere in Google Cloud. |

## Regional and Global IP Addresses

When you list or describe IP addresses in your project, Google Cloud labels addresses as **global** or **regional**.

-   **Global IP addresses** are used for global load balancers and for accessing Google APIs.
-   **Regional IP addresses** are used for resources within a specific region.

## Service Level Agreement (SLA) for Compute Engine Networking

Compute Engine has a Service Level Agreement (SLA) that defines service level objectives (SLOs) for the monthly uptime percentage for network service tiers.

When you create a Compute Engine instance, you can choose between **Premium Tier** (default) and **Standard Tier** networking. Each tier has a different SLO.

**Example:** An instance with three NICs, each with a different network configuration:

-   `nic0`: Internal IP subnet (99.9% uptime).
-   `nic1`: External IP subnet, Standard networking tier (no SLA for a single instance).
-   `nic2`: External IP subnet, Premium networking tier (99.9% uptime for a single instance).
