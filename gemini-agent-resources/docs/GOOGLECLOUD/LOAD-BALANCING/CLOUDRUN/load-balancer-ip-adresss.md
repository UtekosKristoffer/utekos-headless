# IP Addresses in Google Cloud

Google Cloud resources can have both internal and external IP addresses. These are used for communication between Google Cloud resources and external systems.

## IP Addresses per Network Interface

| Interface Stack Type       | IP Addresses                                                                                             |
| :------------------------- | :------------------------------------------------------------------------------------------------------- |
| **IPv4-only**              | - An internal IPv4 address (required)<br>- An alias IPv4 range (optional)<br>- An external IPv4 address (optional) |
| **Dual-stack (IPv4 and IPv6)** | - An internal IPv4 address (required)<br>- An alias IPv4 range (optional)<br>- An external IPv4 address (optional)<br>- A /96 IPv6 address range, either internal or external (required) |
| **IPv6-only**              | - A /96 IPv6 address range, either internal or external (required)                                         |

## Communication

### Within the same VPC network

Instances communicate using:

*   Internal IPv4 address
*   Internal IPv6 address
*   External IPv6 address

> **Best practice:** Use internal IPv6 addresses for internal communication.

### With the internet

*   Requires an external IP address on the instance.
*   Alternatively, Cloud NAT can be used for IPv4 traffic if no external IP is configured.

### Outside the same VPC network

*   Requires an external IP address.
*   **Exception:** With VPC Network Peering, an internal IP address can be used.

## Internal IP Addresses

### IPv4 Assignment

*   **Automatic:** Compute Engine assigns from the primary IPv4 subnet range.
*   **Manual:** When creating an instance, via a reserved static internal IPv4 address or a custom ephemeral internal IPv4 address.

### IPv6 Assignment

*   **Automatic:** Compute Engine assigns a /96 range from the subnet's internal /64 IPv6 range.
*   **Manual:** When creating an instance, via a reserved static internal IPv6 address or a custom ephemeral internal IPv6 address.

### Internal DNS Names

Google Cloud automatically resolves FQDN to internal IP addresses. This only works within the instance's VPC network.

### Alias IP Addresses

Multiple services on the same instance can each have their own unique IP address.

## External IP Addresses

### IPv4 Assignment

*   **Automatic:** Compute Engine assigns from Google's external IPv4 ranges.
*   **Manual:** When creating an instance, via a reserved static external IPv4 address.

### IPv6 Assignment

*   **Automatic:** Compute Engine assigns a /96 range from the subnet's external IPv6 range.
*   **Manual:** When creating an instance, via a reserved static external IPv6 address or a custom ephemeral internal IPv6 address.

> **Note:** Only resources with an external IP address can communicate directly outside the VPC network. This may incur additional costs.

## Alternatives to External IP Addresses

### Advantages of Internal IP Addresses

*   **Reduced attack surface:** Makes it harder for attackers to reach instances.
*   **Increased flexibility:** More reliable service delivery via an abstraction layer.

### Access Methods Without an External IP

| Access Method        | Solution                                    | Use Case                                  |
| :------------------- | :------------------------------------------ | :---------------------------------------- |
| **Interactive**      | TCP forwarding for Identity-Aware Proxy (IAP) | SSH/RDP access with authentication and authorization. |
| **Fetching (Outbound)** | Cloud NAT gateway or Secure Web Proxy       | OS updates, external APIs. Only outbound traffic. |
| **Serving (Inbound)**  | External load balancer                      | Client access with DDoS protection.       |

## Regional and Global IP Addresses

*   **Regional addresses:** Assigned to regional resources like instances (e.g., `us-east4`, `europe-west2`).
*   **Global addresses:** Used for global load balancers and accessing Google APIs.

## SLA for Compute Engine Networking

The SLO for monthly uptime for a standard single instance depends on the configuration:

| Configuration               | Single Instance | Multiple Instances Across Zones |
| :-------------------------- | :-------------- | :------------------------------ |
| **Internal IP only**        | 99.9%           | -                               |
| **External IP (Standard Tier)** | No SLA          | 99.9%                           |
| **External IP (Premium Tier)**  | 99.9%           | 99.99%                          |

**Example:** An instance with three NICs:

*   `nic0`: Internal IP subnet → 99.9% SLA
*   `nic1`: External IP (Standard tier) → No SLA for a single instance
*   `nic2`: External IP (Premium tier) → 9.9% SLA

The SLA varies based on which NIC experiences a loss of connectivity.