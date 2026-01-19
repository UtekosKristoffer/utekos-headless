# Internal Application Load Balancer Overview

This document introduces the concepts you need to understand to configure internal Application Load Balancers.

An internal Application Load Balancer is a proxy-based Layer 7 load balancer that enables you to run and scale your services behind a single internal IP address. It distributes HTTP and HTTPS traffic to backends hosted on a variety of Google Cloud platforms, such as Compute Engine, Google Kubernetes Engine (GKE), and Cloud Run.

## Modes of Operation

You can configure an internal Application Load Balancer in the following modes:

*   **Cross-region internal Application Load Balancer:** A multi-region load balancer that enables you to load balance traffic to globally distributed backend services.
*   **Regional internal Application Load Balancer:** A regional load balancer that requires all backends to be in a single Google Cloud region.

The following table describes the important differences between the two modes:

| Feature                        | Cross-Region Internal Application Load Balancer                               | Regional Internal Application Load Balancer                                 |
| :----------------------------- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Virtual IP address (VIP)**   | Allocated from a subnet in a specific region. VIPs from multiple regions can share the same global backend service. | Allocated from a subnet in a specific region.                               |
| **Client access**              | Always globally accessible.                                                 | Not globally accessible by default, but global access can be enabled.       |
| **Load balanced backends**     | Global backends. Can send traffic to backends in any region.                | Regional backends. Can only send traffic to backends in the same region as the proxy. |
| **High availability and failover** | Automatic failover to healthy backends in the same or different regions.    | Automatic failover to healthy backends in the same region.                  |

### Identify the Mode

#### In the Google Cloud Console

In the Google Cloud console, go to the **Load balancing** page. On the **Load Balancers** tab, you can see the load balancer type, protocol, and region. If the region is blank, the load balancer is in cross-region mode.

| Load Balancer Mode | Load Balancer Type | Access Type | Region             |
| :----------------- | :----------------- | :---------- | :----------------- |
| Cross-region       | Application        | Internal    |                    |
| Regional           | Application        | Internal    | Specifies a region |

#### Using gcloud

Run the `gcloud compute forwarding-rules describe FORWARDING_RULE_NAME` command. In the command output, check the load balancing scheme, region, and network tier.

| Load Balancer Mode | Load Balancing Scheme | Forwarding Rule |
| :----------------- | :-------------------- | :-------------- |
| Cross-region       | `INTERNAL_MANAGED`      | Global          |
| Regional           | `INTERNAL_MANAGED`      | Regional        |

> **Important:** After you create a load balancer, you cannot edit its mode. Instead, you must delete the load balancer and create a new one.