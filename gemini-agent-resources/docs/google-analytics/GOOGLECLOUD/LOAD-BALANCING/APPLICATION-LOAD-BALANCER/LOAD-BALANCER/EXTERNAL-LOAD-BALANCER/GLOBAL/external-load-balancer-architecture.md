# External Proxy Network Load Balancer Overview

This document provides comprehensive guidance on configuring Google Cloud external proxy Network Load Balancers, including architecture, components, and operational modes.

## Introduction

The external proxy Network Load Balancer is a reverse proxy load balancer that distributes TCP traffic from the internet to virtual machine (VM) instances in your Google Cloud Virtual Private Cloud (VPC) network.

**Key Characteristics:**

*   **Traffic Termination:** Incoming TCP or SSL traffic is terminated at the load balancer.
*   **Connection Forwarding:** A new connection forwards traffic to the closest available backend.
*   **Global IP Address:** Uses a single IP address for all users worldwide.
*   **Automatic Routing:** Automatically routes traffic to backends closest to the user.

> **Important Note:** For HTTPS traffic, use an external Application Load Balancer, which supports HTTP-specific features like routing by request path.

---

## Modes of Operation

You can configure an external proxy Network Load Balancer in three modes:

1.  **Classic Proxy Network Load Balancer:**
    *   **Traffic:** TCP or SSL.
    *   **Tiers:** Premium (global) or Standard (regional).
2.  **Global External Proxy Network Load Balancer:**
    *   **Traffic:** TCP or SSL with advanced traffic management.
    *   **Tier:** Premium only (global).
3.  **Regional External Proxy Network Load Balancer:**
    *   **Traffic:** TCP only.
    *   **Tiers:** Premium or Standard.

---

## Architecture

This section describes the components of external proxy Network Load Balancers.

### Proxy-Only Subnet

A proxy-only subnet is required for regional external proxy Network Load Balancers to provide a set of IP addresses for Envoy proxies.

### Forwarding Rules and IP Addresses

Forwarding rules route traffic by IP address, port, and protocol to a load balancing configuration.

| Load Balancer Mode | Network Service Tier | Forwarding Rule Details                                       |
| :----------------- | :------------------- | :------------------------------------------------------------ |
| **Classic**        | Premium              | Global external forwarding rule, global external IP address.  |
| **Classic**        | Standard             | Regional external forwarding rule, regional external IP address. |
| **Global external**  | Premium              | Global external forwarding rule, global external IP address.  |
| **Regional external**| Premium and Standard | Regional external forwarding rule, regional external IP address. |

### Target Proxies

Target proxies terminate connections from the client and create new connections to the backends.

*   **Target TCP Proxy:** For TCP traffic.
*   **Target SSL Proxy:** For encrypted non-HTTP(S) traffic.

### SSL Certificates

SSL certificates are required for load balancers using a target SSL proxy. You can use Google-managed or self-managed certificates.

### Backend Services

Backend services direct incoming traffic to one or more attached backends (instance groups or network endpoint groups).

### Firewall Rules

Firewall rules are required to allow traffic from the load balancer and health checkers to your backends.

**Required Source IP Address Ranges for Health Checks and Requests:**

*   `35.191.0.0/16`
*   `130.211.0.0/22`

> **Critical Warning:** Make sure you allow packets from the full health check ranges to avoid connection timeouts.

### Source IP Addresses

The source IP address for packets as seen by backends is not the external IP address of the load balancer. It is an IP address from Google's internal ranges.

---

## Shared VPC Architecture

Regional and classic proxy Network Load Balancers support deployments using Shared VPC networks, which allows for a separation of responsibilities between network administrators and service developers.

---

## Traffic Distribution

Traffic distribution is based on a balancing mode, which defines how backend load is measured.

*   **CONNECTION Mode:** Load is spread based on the total number of connections a backend can handle.
*   **UTILIZATION Mode:** Load is spread based on the utilization of instances in an instance group.

### Premium Tier (Global and Classic)

*   Backends can be in multiple regions.
*   Traffic is directed to the region closest to the user.

### Standard Tier (Classic)

*   Backends must be in the same region as the forwarding rule.

---

## Session Affinity

Session affinity sends all requests from the same client to the same backend.

*   **None (default):** Uses a 5-tuple hash (source/destination IP and port, protocol) to select a backend.
*   **Client IP Affinity:** Uses a 2-tuple hash (source and destination IP) to select a backend.

> **Security Warning:** Do not rely on session affinity for authentication or security purposes, as it can break when the number of healthy backends changes.