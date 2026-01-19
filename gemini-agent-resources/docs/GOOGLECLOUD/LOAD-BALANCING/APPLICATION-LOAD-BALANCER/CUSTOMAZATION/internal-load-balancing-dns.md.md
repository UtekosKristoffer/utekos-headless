# Internal load balancing and DNS names

A DNS address record, known as an A record, is used to map a DNS name to an IP
address. When you create the forwarding rule for an internal load balancer, you
can optionally designate a **service label** so that Google Cloud creates a
unique Compute Engine internal DNS name for the load balancer. This internal DNS
name is constructed from your project ID, forwarding rule name, and the service
label you specify.

> **Note:** This page describes how to configure a specific load balancer
> component. Before using this information, know the type of Google Cloud load
> balancer that you need.

---

## Specifications

This feature is supported by forwarding rules for these load balancers:

- Internal passthrough Network Load Balancer
- Regional internal Application Load Balancer
- Regional internal proxy Network Load Balancer

Client VMs in any region in the same project and VPC network can perform DNS
lookups for the load balancer's internal DNS name. To access the load balancer,
client VMs must be located in the same region, unless
[global access](https://cloud.google.com/load-balancing/docs/l4-internal/global-access)
is enabled.

You can only specify a service label when you create a forwarding rule. You
cannot add a service label to an existing forwarding rule, but you can replace
an existing rule with a new one that has a service label.

The internal DNS names created from service labels have the following
restrictions:

- No corresponding reverse (PTR) records are created.
- Each forwarding rule can have only one service label.
- Other than the service label and forwarding rule's name, you cannot change any
  other part of the internal DNS name.

If you need more flexible DNS names, you can create custom records in a
[Cloud DNS managed private zone](https://cloud.google.com/dns/zones).

---

## DNS record format

When you add a service label to a forwarding rule, Google Cloud creates a
Compute Engine internal DNS `A` record using one of these formats:

- **For internal passthrough Network Load Balancers:**
  `SERVICE_LABEL.FORWARDING_RULE_NAME.il4.REGION.lb.PROJECT_ID.internal`

- **For regional internal Application Load Balancers and regional internal proxy
  Network Load Balancers:**
  `SERVICE_LABEL.FORWARDING_RULE_NAME.il7.REGION.lb.PROJECT_ID.internal`

Where:

- `SERVICE_LABEL` is the forwarding rule's service label you specify. It must:
  - Use up to 63 lowercase letters (`a-z`), numbers (`0-9`), or dashes (`-`).
  - Start with a lowercase letter.
  - End with a lowercase letter or number.
- `FORWARDING_RULE_NAME` is the name of the forwarding rule you're creating.
- `REGION` is the load balancer's region.
- `PROJECT_ID` is your project ID. Project IDs with a domain (e.g.,
  `example.com:my-project`) are converted (e.g., `my-project.example.com`).

---

## Creating a forwarding rule with a service label

This procedure focuses only on creating a forwarding rule with a service label.
For complete examples, see:

- [Set up an internal passthrough Network Load Balancer](https://cloud.google.com/load-balancing/docs/l4-internal/setting-up-l4-internal)
- [Set up a regional internal Application Load Balancer](https://cloud.google.com/load-balancing/docs/l7-internal/setting-up-l7-internal)
- [Set up a regional internal proxy Network Load Balancer](https://cloud.google.com/load-balancing/docs/l7-internal/setting-up-regional-internal-proxy-network-load-balancer)

> **Note:** For regional internal proxy Network Load Balancers, creating a
> forwarding rule with a service label is not supported in the Google Cloud
> console. Use `gcloud` or the API instead.

To create a forwarding rule with a service label in the Google Cloud console:

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click **Create load balancer**.
3.  Complete the wizard steps for either an internal passthrough Network Load
    Balancer or a regional internal Application Load Balancer, and click
    **Configure**.
4.  Specify a name for the load balancer and click **Continue**.
5.  Complete the **Backend configuration**.
6.  Click **Frontend configuration**. Complete the frontend configuration,
    specifying a **Service label** at the bottom of that section.
7.  Click **Done**, and then **Review and finalize**.

---

## Viewing service labels

To view the Compute Engine internal DNS name for each internal forwarding rule:

1.  Go to the
    [Load balancing](https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list)
    page.
2.  Click the name of the internal load balancer to view its details page.
3.  The internal forwarding rules assigned to the load balancer are listed in
    the **Frontend** section. The **DNS name** column shows the internal DNS
    name. The service label is the first part of that name (before the first
    dot).

---

## Example: Replace a forwarding rule

The following procedure demonstrates how to replace a forwarding rule with one
that has a service label.

1.  Describe your load balancer's existing forwarding rule, noting its internal
    IP address:

    ```bash
    gcloud compute forwarding-rules describe FORWARDING_RULE_NAME \
        --region=REGION \
        --format="get(IPAddress)"
    ```

2.  Delete the forwarding rule:

    ```bash
    gcloud compute forwarding-rules delete FORWARDING_RULE_NAME \
        --region=REGION
    ```

3.  Create a replacement forwarding rule with the same name, internal IP
    address, and a new service label. Refer to the
    [creation instructions](#creating-a-forwarding-rule-with-a-service-label).

---

## What's next

- For information on configuring Logging and Monitoring, see
  [Internal passthrough Network Load Balancer logging and monitoring](https://cloud.google.com/load-balancing/docs/l4-internal/l4-ilb-logging-monitoring).
- For troubleshooting information, see
  [Troubleshoot internal passthrough Network Load Balancers](https://cloud.google.com/load-balancing/docs/l4-internal/l4-ilb-troubleshooting).
