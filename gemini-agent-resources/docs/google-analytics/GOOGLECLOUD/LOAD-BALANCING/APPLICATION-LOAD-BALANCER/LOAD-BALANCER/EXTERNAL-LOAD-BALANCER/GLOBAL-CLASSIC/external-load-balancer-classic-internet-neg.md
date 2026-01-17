Set up a classic Application Load Balancer with an external backend

This guide uses an example to teach the fundamentals of using an external backend (sometimes called a custom origin) with a global external Application Load Balancer. An external backend is an endpoint that is external to Google Cloud. When you use an external backend with a global external Application Load Balancer, you can improve performance by using Cloud CDN caching.

The guide shows you how to configure a global external Application Load Balancer with a Cloud CDN-enabled backend service that proxies requests to an external backend server.

Before following this guide, familiarize yourself with the Internet NEG overview documentation, including the limitations.
The following architecture diagram shows a global external Application Load Balancer frontend with an external backend.

A global external Application Load Balancer with an external backend.
Figure 1. A global external Application Load Balancer with an external backend (click to enlarge).
Permissions
To follow this guide, you need to create an internet NEG and create or modify an external Application Load Balancer in a project. You should be either a project Owner or Editor (roles/owner or roles/editor), or you should have both of the following Compute Engine IAM roles.

Task	Required role
Create and modify load balancer components	Compute Network Admin
(roles/compute.networkAdmin)
Create and modify NEGs	Compute Instance Admin
(roles/compute.instanceAdmin)
Optional: Use BYOIP addresses
With bring your own IP (BYOIP), you can import your own public addresses to Google Cloud to use the addresses with Google Cloud resources. For example, if you import your own IPv4 addresses, you can assign one to the forwarding rule when you configure your load balancer. When you follow the instructions in this document to create the load balancer, provide the BYOIP address as the IP address.

For more information about using BYOIP, see Bring your own IP addresses.

Set up your external backend environment outside Google Cloud
To set up your environment, see the following sections.

Configure network endpoints
Configure a network endpoint to expose your external backend to Google Cloud. Make sure that the endpoint—either an IP:Port combination or a fully-qualified domain name (FQDN) and port—is reachable over the internet. This endpoint is later referenced from the internet NEG.

For detailed configuration requirements for internet NEG endpoints, see the Internet NEGs overview.

Allow the external backend to receive traffic from Google Cloud
To allow requests from Google Cloud to reach your external backend, you must allowlist the IP address ranges that Google uses to send requests to external backends. To look up the IP addresses that need to be allowed to send traffic to your external backends, query the _cloud-eoips.googleusercontent.com DNS TXT record by using a tool such as dig or nslookup.

Examples:

Run the following nslookup command:



nslookup -q=TXT _cloud-eoips.googleusercontent.com 8.8.8.8
The output looks like the following:


Non-authoritative answer:
_cloud-eoips.googleusercontent.com    text = "v=spf1 ip4:34.96.0.0/20 ip4:34.127.192.0/18 ~all"
Note the CIDR ranges following ip4: and ensure that these ranges are allowed by the firewall rules or cloud access control lists (ACLs) configured on your external backend.

Run the following dig command:



dig TXT _cloud-eoips.googleusercontent.com | grep -Eo 'ip4:[^ ]+' | cut -d':' -f2
The output contains two IP address ranges, as follows:



34.96.0.0/20
34.127.192.0/18
Caution: These IP address ranges are subject to change. Make sure that you always confirm the Google Cloud IP address ranges that send traffic to your external backends.
Set up your Google Cloud environment
Create the global external Application Load Balancer with an internet NEG backend.

Reserve an external IP address
Reserve a global static external IP address that clients use to reach your application.

Note: This step is required for this example, and recommended in general. Reserving an IP address is also essential if you are using a custom domain for your external backend (also required for Google-managed SSL certificates). With a custom domain, you must update your DNS records to point your domain to this IP address.
Console
gcloud
In the Google Cloud console, go to the External IP addresses page.

Go to External IP addresses

Click Reserve external static address to reserve an IPv4 address.

Enter a name.

For Network Service Tier, select Premium.

For IP version, select IPv4.

For Type, select Global.

Click Reserve.

Set up the internet NEG
Console
gcloud
In the Google Cloud console, go to the Network endpoint groups page.

Go to Network endpoint groups

Click Create network endpoint group.

Enter a name.

For Network endpoint group type, select Network endpoint group (Internet).

For Default port, enter 443.

For New network endpoint, select Fully qualified domain name and port.

Enter the Fully qualified domain name.

For Port type, select Default, and verify that Port number is 443.

Click Create.

Create the load balancer
Console
gcloud
Select the load balancer type
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click Create load balancer.
For Type of load balancer, select Application Load Balancer (HTTP/HTTPS) and click Next.
For Public facing or internal, select Public facing (external) and click Next.
For Global or single region deployment, select Best for global workloads and click Next.
For Load balancer generation, select Classic Application Load Balancer and click Next.
Click Configure.
Frontend configuration
Click Frontend configuration.
Enter a name.
To create an HTTPS load balancer, you must have an SSL certificate. We recommend using a Google-managed certificate.

Verify that the following options are configured with these values.

Property	Value (type a value or select an option as specified)
Protocol	HTTPS
Network Service Tier	Premium
IP version	IPv4
IP address	Select the IP address created in the Reserve an external IP address step.
Port	443
Certificate	
Select an existing SSL certificate or create a new certificate.

To create an HTTPS load balancer, you must have an SSL certificate resource to use in the HTTPS proxy. You can create an SSL certificate resource by using either a Google-managed SSL certificate or a self-managed SSL certificate.

To create a Google-managed certificate, you must have a domain. The domain's A record must resolve to the IP address of the load balancer (in this example, example-ip). We recommend using Google-managed certificates because Google Cloud obtains, manages, and renews these certificates automatically. If you don't have a domain, you can use a self-signed SSL certificate for testing.

Optional: Enable HTTP to HTTPS Redirect	
Use this checkbox to enable HTTP to HTTPS redirects.

Enabling this checkbox creates an additional partial HTTP load balancer that uses the same IP address as your HTTPS load balancer and redirects HTTP requests to your load balancer's HTTPS frontend.

This checkbox can only be selected when the HTTPS protocol is selected and a reserved IP address is used.

If you want to test this process without setting up an SSL certificate resource (or a domain as required by Google-managed certificates), you can set up an HTTP load balancer.

To create an HTTP load balancer, verify that the following options are configured with these values:

Property	Value (type a value or select an option as specified)
Protocol	HTTP
Network Service Tier	Premium
IP version	IPv4
IP address	Select the IP address created in the Reserve an external IP address step.
Port	80
Click Done.

Backend configuration
Click Backend configuration.
Click Backend services and backend buckets.
Click Create a backend service.
Enter a name.
For Backend type, select Internet network endpoint group.
For Protocol, select the protocol that you intend to use from the load balancer to the internet NEG. For this example, select HTTP/2.
For Backends, in the New backend window, select the internet NEG created in the previous step.
Click Create.
Review and finalize
Click Review and finalize.
If everything looks correct, click Create.
Connect your domain to your load balancer
After the load balancer is created, note the IP address that is associated with the load balancer—for example, 30.90.80.100. To point your domain to your load balancer, create an A record by using your domain registration service. If you added multiple domains to your SSL certificate, you must add an A record for each one, all pointing to the load balancer's IP address. For example, to create A records for www.example.com and example.com, use the following:


NAME                  TYPE     DATA
www                   A        30.90.80.100
@                     A        30.90.80.100
If you use Cloud DNS as your DNS provider, see Add, modify, and delete records.

Test the load balancer
Note: It might take a few minutes for the load balancer configuration to propagate globally after you first deploy it.
Now that you have configured your load balancer, you can start sending traffic to the load balancer's IP address. If you configured a domain, you can send traffic to the domain name as well. However, DNS propagation can take time to complete, so you can start by using the IP address for testing.

Console
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing

Click the load balancer that you just created.

Note the IP address of the load balancer.

Send traffic to the load balancer.

If you created an HTTP load balancer, you can test your load balancer by going to http://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the application you're running on the external backend.

If you created an HTTPS load balancer, you can test your load balancer by going to https://IP_ADDRESS. Replace IP_ADDRESS with the load balancer's IP address. You should be directed to the you're application running on the external backend.

If that does not work and you are using a Google-managed certificate, confirm that your certificate resource's status is ACTIVE. For more information, see Google-managed SSL certificate resource status.

Alternatively, you can use curl from your local machine's command line. Replace IP_ADDRESS with the load balancer's IPv4 address. If you're using a Google-managed certificate, test the domain that points to the load balancer's IP address. For example:



curl -s 'https://www.example.com:443' --resolve www.example.com:443:IP_ADDRESS
Optional: If you are using a custom domain, you might need to wait for the updated DNS settings to propagate. Then, test your domain in the web browser.

For help with troubleshooting, see Troubleshooting external backend and internet NEG issues.

Additional configuration
This section expands on the configuration example to provide alternative and additional configuration options. All of the tasks are optional. You can perform them in any order.

Enable Cloud CDN
When Cloud CDN is enabled, the external Application Load Balancer sends requests to the internet NEG backend only when there is a Cloud CDN cache miss.

Console
gcloud
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing.

Click the name of the load balancer that you want to modify.

Click editEdit.

Click Backend configuration.

For the backend service with the internet NEG backend, click editEdit.

Select Enable Cloud CDN.

Optional: Modify the cache mode and TTL settings.

Click Update.

To review your changes, click Review and finalize, and then click Update.

Use a custom header to authenticate requests
To authenticate requests sent to your external backend, you can set a custom header to indicate that the request came from a Google Cloud load balancer. For example, you can configure the external backend to expect a particular value for the HTTP request's Host header, and you can configure the backend service to set the Host header to that expected value.

Use the following steps to configure the backend service to add a custom Host header to each request.

Console
gcloud
In the Google Cloud console, go to the Load balancing page.

Go to Load balancing.

Click the name of the load balancer that you want to modify.

Click editEdit.

Click Backend configuration.

For the backend service with the internet NEG backend, click editEdit.

Click Advanced configurations.

For Custom request headers, click Add header:

For Header name, enter Host.
For Header value, enter FQDN_NEG_ENDPOINT.
Click Update.

To review your changes, click Review and finalize, and then click Update.

Make sure that you also configured the external backend to expect a Host header so that it can authenticate incoming requests.

For general information about custom request headers, see Configure custom request headers. For other authentication methods, see Authenticate requests to the external backend.

Enable IAP on the external Application Load Balancer
Note: IAP isn't compatible with Cloud CDN.
You can configure IAP to be enabled or disabled (default). If enabled, you must provide values for oauth2-client-id and oauth2-client-secret.

To enable IAP, update the backend service to include the --iap=enabled flag with the oauth2-client-id and oauth2-client-secret.




gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --iap=enabled,oauth2-client-id=ID,oauth2-client-secret=SECRET \
    --global
Optionally, you can enable IAP for a Compute Engine resource by using the Google Cloud console, gcloud CLI, or API.

What's next
To check whether Cloud CDN is serving responses from cache, see Viewing logs.
To learn about which content is cacheable or non-cacheable, see Caching overview.
To find Cloud CDN's points of presence, see Cache locations.
Clean up the load balancer setup.