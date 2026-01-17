Set up a regional external Application Load Balancer with Cloud Run

This page shows you how to deploy a regional external Application Load Balancer with a Cloud Run backend. To set this up, you use a serverless NEG backend for the load balancer.

Before you try this procedure, make sure you are familiar with the following topics:

External Application Load Balancer overview
Serverless NEGs overview
This document shows you how to configure an Application Load Balancer that proxies requests to a serverless NEG backend.

Serverless NEGs let you use Cloud Run services with your load balancer. After you configure a load balancer with the serverless NEG backend, requests to the load balancer are routed to the Cloud Run backend.

Before you begin
Install the Google Cloud CLI
Deploy a Cloud Run service
Configure permissions
Install Google Cloud SDK
Install the Google Cloud CLI tool. For conceptual and installation information about the gcloud CLI, see gcloud CLI overview.

If you haven't run the gcloud CLI previously, first run gcloud init to initialize your gcloud CLI directory.

Deploy a Cloud Run service
The instructions on this page assume you already have a Cloud Run service running.

For the example on this page, you can use any of the Cloud Run quickstarts to deploy a Cloud Run service.

The serverless NEG and the load balancer must be in the same region as the Cloud Run service. You can block external requests that are sent directly to the Cloud Run service's default URLs by restricting ingress to internal and cloud load balancing. For example:


gcloud run deploy CLOUD_RUN_SERVICE_NAME \
    --platform=managed \
    --allow-unauthenticated \
    --ingress=internal-and-cloud-load-balancing \
    --region=REGION \
    --image=IMAGE_URL
Note the name of the service that you create. The rest of this page shows you how to set up a load balancer that routes requests to this service.

Configure permissions
To follow this guide, you need to create a serverless NEG and create a load balancer in a project. You must be either a project owner or editor, or you have the following Compute Engine IAM roles and permissions:

Task	Required role
Create load balancer and networking components	Compute Network Admin (roles/compute.networkAdmin)
Create and modify NEGs	Compute Instance Admin (v1) (roles/compute.instanceAdmin.v1)
Create and modify SSL certificates	Security Admin (roles/iam.securityAdmin)
Configure the VPC network and proxy-only subnet
To configure the network, perform the following tasks:

Create a VPC network.
Create a proxy-only subnet.
Create the VPC network
Create a custom mode VPC network.

Note: For this setup, you don't need a subnet for the forwarding rule or the serverless NEG.
Regional external IPv4 addresses always exist outside of VPC networks. For more information, see Forwarding rules and VPC networks
A serverless NEG isn't associated with any VPC network.
Console
gcloud
In the Google Cloud console, go to the VPC networks page.

Go to VPC networks

Click Create VPC network.

For Name, enter lb-network.

Click Create.

Create a proxy-only subnet
Create a proxy-only subnet for all regional Envoy-based load balancers in a specific region of the lb-network network.

Console
gcloud
In the Google Cloud console, go to the VPC networks page.

Go to VPC networks

Click the name of the Shared VPC network that you want to add the proxy-only subnet to.

Click Add subnet.

In the Name field, enter proxy-only-subnet.

Select a Region.

Set Purpose to Regional Managed Proxy.

Enter an IP address range as 10.129.0.0/23.

Click Add.

Create the load balancer
In the following diagram, the load balancer uses a serverless NEG backend to direct requests to a serverless Cloud Run service.

Traffic going from the load balancer to the serverless NEG backends uses special routes defined outside your VPC that aren't subject to firewall rules. Therefore, if your load balancer only has serverless NEG backends, you don't need to create firewall rules to allow traffic from the proxy-only subnet to the serverless backend.

Regional external HTTP or HTTPS load balancing architecture for a Cloud Run application.
Regional external HTTP or HTTPS load balancing architecture for a Cloud Run application (click to enlarge).

Note: Regional external Application Load Balancers support both the Premium and Standard Network Service Tiers. This procedure demonstrates the setup with Standard Tier.

Console
gcloud
Select the load balancer type
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click Create load balancer.
For Type of load balancer, select Application Load Balancer (HTTP/HTTPS) and click Next.
For Public facing or internal, select Public facing (external) and click Next.
For Global or single region deployment, select Best for regional workloads and click Next.
Click Configure.
Basic configuration
For the name of the load balancer, enter serverless-lb.
Select the Network as lb_network.
Keep the window open to continue.
Configure the frontend
Before you proceed, make sure you have an SSL certificate.
Click Frontend configuration.
Enter a Name.
To configure a regional external Application Load Balancer, fill in the fields as follows.
For Protocol, select HTTPS.
For Network service tier, select Standard.
For IP version, select IPv4.
For IP address, select Ephemeral.
For Port, select 443.
For Choose certificate repository, select Classic Certificates.

The following example shows you how to create Compute Engine SSL certificates:

Click Create a new certificate.
In the Name field, enter a name.
In the appropriate fields, upload your PEM-formatted files:
Certificate
Private key
Click Create.
If you want to test this process without setting up an SSL certificate resource, you can set up an HTTP load balancer.

Optional: To create an HTTP load balancer, do the following:
For Protocol, select HTTP.
For Network service tier, select Standard.
For IP version, select IPv4.
For IP address, select Ephemeral.
For Port, select 80.
Click Done.
Configure the backend services
Click Backend configuration.
In the Create or select backend services menu, hold the pointer over Backend services, and then select Create a backend service.
In the Create a backend service window, enter a Name.
For Backend type, select Serverless network endpoint group.
Leave Protocol unchanged. This parameter is ignored.
For Backends > New backend, select Create serverless network endpoint group.
In the Create serverless network endpoint group window, enter a Name.
For Region, the region of the load balancer is displayed.
From the Serverless network endpoint group type field, select Cloud Run. Cloud Run is the only supported type.
Select Select service name.
From the Service list, select the Cloud Run service that you want to create a load balancer for.
Click Done.
Click Create.
Optional: Configure a default backend security policy. The default security policy throttles traffic over a user-configured threshold. For more information about default security policies, see the Rate limiting overview.

To opt out of the Cloud Armor default security policy, select None in the Cloud Armor backend security policy list.
To configure the Cloud Armor default security policy, select Default security policy in the Cloud Armor backend security policy list.
In the Policy name field, accept the automatically generated name or enter a name for your security policy.
In the Request count field, accept the default request count or enter an integer between 1 and 10,000.
In the Interval field, select an interval.
In the Enforce on key field, choose one of the following values: All, IP address, or X-Forwarded-For IP address. For more information about these options, see Identifying clients for rate limiting.
In the Create backend service window, click Create.
Configure routing rules
Routing rules determine how your traffic is directed. You can direct traffic to a backend service or a Kubernetes service. Any traffic not explicitly matched with a host and path matcher is sent to the default service.

Click Simple host and path rule.
Select a backend service from the Backend list.
Review the configuration
Click Review and finalize.
Review the values for Backend, Host and Path rules and Frontend.
Optional: Click Equivalent Code to view the REST API request that will be used to create the load balancer.
Click Create. Wait for the load balancer to be created.
Click the name of the load balancer (serverless-lb).
Note the IP address of the load balancer for the next task.
When you use the Google Cloud console to create an HTTP(S) load balancer with a serverless NEG backend, logging is enabled by default. You can use the gcloud compute backend-services update command to disable logging if needed.
Test the load balancer
Now that you have configured your load balancer, you can start sending traffic to the load balancer's IP address.

In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click the load balancer you just created.

Note the IP Address of the load balancer.

For an HTTP load balancer, you can test your load balancer using a web browser by going to http://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the Cloud Run service homepage.

For an HTTPS load balancer, you can test your load balancer using a web browser by going to https://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You are directed to the Cloud Run service homepage.
If you used a self-signed certificate for testing, your browser displays a warning. You must explicitly instruct your browser to accept a self-signed certificate. Click through the warning to see the actual page.

Additional configuration options
This section expands on the configuration example to provide alternative and additional configuration options. All of the tasks are optional. You can perform them in any order.

Using a URL mask
When creating a serverless NEG, instead of selecting a specific Cloud Run service, you can use a URL mask to point to multiple services serving at the same domain. A URL mask is a template of your URL schema. The serverless NEG uses this template to extract the service name from the incoming request's URL and map the request to the appropriate service.

URL masks are particularly useful if your service is mapped to a custom domain rather than to the default address that Google Cloud provides for the deployed service. A URL mask lets you target multiple services and versions with a single rule even when your application is using a custom URL pattern.

If you haven't already done so, make sure you read the Serverless NEGS overview: URL Masks.

Construct a URL mask
To construct a URL mask for your load balancer, start with the URL of your service. This example uses a sample serverless app running at https://example.com/login. This is the URL where the app's login service is served.

Remove the http or https from the URL. You are left with example.com/login.
Replace the service name with a placeholder for the URL mask.
Cloud Run: Replace the Cloud Run service name with the placeholder <service>. If the Cloud Run service has a tag associated with it, replace the tag name with the placeholder <tag>. In this example, the URL mask you are left with is example.com/<service>.
Optional: If the service name can be extracted from the path portion of the URL, the domain can be omitted. The path part of the URL mask is distinguished by the first slash (/) character. If a slash (/) is not present in the URL mask, the mask is understood to represent the host only. Therefore, for this example, the URL mask can be reduced to /<service>.

Similarly, if <service> can be extracted from the host part of the URL, you can omit the path altogether from the URL mask.

You can also omit any host or subdomain components that come before the first placeholder as well as any path components that come after the last placeholder. In such cases, the placeholder captures the required information for the component.

Here are a few more examples that demonstrate these rules:

This table assumes that you have a custom domain called example.com and all your Cloud Run services are being mapped to this domain.

Service, Tag name	Cloud Run custom domain URL	URL mask
service: login	https://login-home.example.com/web	<service>-home.example.com
service: login	https://example.com/login/web	example.com/<service> or /<service>
service: login, tag: test	https://test.login.example.com/web	<tag>.<service>.example.com
service: login, tag: test	https://example.com/home/login/test	example.com/home/<service>/<tag> or /home/<service>/<tag>
service: login, tag: test	https://test.example.com/home/login/web	<tag>.example.com/home/<service>
Creating a serverless NEG with a URL mask
Console
gcloud
For a new load balancer, you can use the same end-to-end process as described previously in this document. When configuring the backend service, instead of selecting a specific service, enter a URL mask.

If you have an existing load balancer, you can edit the backend configuration and have the serverless NEG point to a URL mask instead of a specific service.

To add a URL mask-based serverless NEG to an existing backend service, do the following:

In the Google Cloud console, go to the Load balancing page.
Go to Load balancing
Click the name of the load balancer that has the backend service you want to edit.
On the Load balancer details page, click editEdit.
On the Edit global external Application Load Balancer page, click Backend configuration.
On the Backend configuration page, click editEdit for the backend service you want to modify.
Click Add backend.
Select Create Serverless network endpoint group.
For the Name, enter helloworld-serverless-neg.
Under Region, the region of the load balancer is displayed.
Under Serverless network endpoint group type, Cloud Run is the only supported network endpoint group type.
Select Use URL Mask.
Enter a URL mask. For information about how to create a URL mask, see Constructing a URL mask.
Click Create.
In the New backend, click Done.
Click Update.
Deleting a serverless NEG
A network endpoint group cannot be deleted if it is attached to a backend service. Before you delete a NEG, ensure that it is detached from the backend service.

Console
gcloud
To make sure the serverless NEG you want to delete is not in use by any backend service, go to the Backend services tab on the Load balancing components page.
Go to Backend services
If the serverless NEG is in use, do the following:
Click the name of the backend service that is using the serverless NEG.
Click editEdit.
From the list of Backends, click delete to remove the serverless NEG backend from the backend service.
Click Save.
Go to the Network endpoint group page in the Google Cloud console.
Go to Network endpoint group
Select the checkbox for the serverless NEG you want to delete.
Click Delete.
Click Delete again to confirm.