Internal load balancing and DNS names

A DNS address record, known as an A record, is used to map a DNS name to an IP address. When you create the forwarding rule for an internal load balancer, you can optionally designate a service label so that Google Cloud creates a unique Compute Engine internal DNS name for the load balancer. This internal DNS name is constructed from your project ID, forwarding rule name, and a service label you specify.

Note: This page describes how to configure a specific load balancer component or feature before or after you've already created a load balancer. Working with specific components is useful for advanced configurations and necessary for some configuration options. Before using the information on this page, know the type of Google Cloud load balancer that you need.
Specifications
This feature is supported by forwarding rules for these load balancers:

Internal passthrough Network Load Balancer
Regional internal Application Load Balancer
Regional internal proxy Network Load Balancer
See DNS record format for details about the format of the DNS name that Google Cloud creates for your load balancer. Because the DNS name contains the forwarding rule's name, each DNS name is unique, even if you use the same service label for multiple forwarding rules.

Unless an alternative name server is configured, client VMs in any region in the same project and VPC network can perform DNS lookups for the load balancer's internal DNS name. To access the load balancer, client VMs must be located in the same region. If you enable global access, a client in any region can access the load balancer.

You can only specify a service label when you create a forwarding rule. You cannot add a service label to an existing forwarding rule. However, you can replace an existing forwarding rule with a new forwarding rule that has a service label. The replacement can use the same internal IP address as the original if you delete the original forwarding rule first.

The internal DNS names created from service labels have the following restrictions:

No corresponding reverse (PTR) records are created.
Each forwarding rule can have only one service label.
Other than the service label and forwarding rule's name, you cannot change any other part of the internal DNS name. This includes its format and its domain name (.internal).
If you need more flexible DNS names for your internal load balancer, you can create custom records in a Cloud DNS managed private zone.

DNS record format
When you add a service label to a forwarding rule, Google Cloud creates a Compute Engine internal DNS A record using one of these formats:

For internal passthrough Network Load Balancers:

SERVICE_LABEL.FORWARDING_RULE_NAME.il4.REGION.lb.PROJECT_ID.internal

For regional internal Application Load Balancers and regional internal proxy Network Load Balancers:

SERVICE_LABEL.FORWARDING_RULE_NAME.il7.REGION.lb.PROJECT_ID.internal

SERVICE_LABEL is the forwarding rule's service label that you specify. It must follow this format:

You can use up to 63 lower case letters (a to z), numbers (0 to 9), or dashes (-).
The service label must start with a lowercase letter.
The service label must end with a lowercase letter or number.
FORWARDING_RULE_NAME is the name of the forwarding rule you're creating.

REGION is the load balancer's region.

PROJECT_ID is your project ID. Project IDs that have the form organization:project-id are converted to project-id.organization. For example, if your project ID is example.com:example-marketing-prod, Google Cloud uses example-marketing-prod.example.com.

Creating a forwarding rule with a service label
This procedure shows how to create a forwarding rule with a service label.

This procedure only focuses on how to create a forwarding rule with a service label. Properties of the load balancer's backend configuration and other properties of its frontend configuration are omitted. If you're new to internal passthrough Network Load Balancers, regional internal Application Load Balancers, or regional internal proxy Network Load Balancers, see these pages for complete examples:

Set up an internal passthrough Network Load Balancer
Set up a regional internal Application Load Balancer
Set up a regional internal proxy Network Load Balancer

Console
gcloud
api
Note: For regional internal proxy Network Load Balancers, creating a forwarding rule with a service label is not supported in the Google Cloud console. Use gcloud or the API instead.
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click Create load balancer.
Complete the steps of the wizard to create either an internal passthrough Network Load Balancer or a regional internal Application Load Balancer, and click Configure.
Specify a name for the load balancer.
Click Continue.
Complete the Backend configuration.
Click Frontend configuration. Complete the frontend configuration, specifying a Service label at the bottom of that section.

Click Done, and then Review and finalize.
Viewing service labels
Console
gcloud
api
You can view the Compute Engine internal DNS name (created from the service label) for each internal forwarding rule of an internal load balancer:

In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click the name of the internal load balancer to view its details page.

The internal forwarding rules assigned to the load balancer are listed in the Frontend section. The DNS name column shows you the Compute Engine internal DNS name that's assigned to each forwarding rule. The service label is the first part of that name (before the first dot). If no name is shown, the forwarding rule has no service label defined.

Example
The following procedure demonstrates how to replace a forwarding rule with one that has a service label. This procedure works for all supported load balancers.

If you haven't created a forwarding rule for your internal load balancer yet, skip this example and refer to Creating a forwarding rule with a service label instead.

Describe your load balancer's existing forwarding rule, noting the forwarding rule's internal IP address:



gcloud compute forwarding-rules describe FORWARDING_RULE_NAME \
    --region=REGION \
    --format="get(IPAddress)"
Delete the forwarding rule:



gcloud compute forwarding-rules delete FORWARDING_RULE_NAME \
    --region=REGION
Create a replacement forwarding rule with the same name and internal IP address with a service label. Refer to Creating a forwarding rule with a service label for directions.

What's next
For information on configuring Logging and Monitoring for internal passthrough Network Load Balancers, see Internal passthrough Network Load Balancer logging and monitoring
For information about how to troubleshoot issues with your internal passthrough Network Load Balancer, see Troubleshoot internal passthrough Network Load Balancers.