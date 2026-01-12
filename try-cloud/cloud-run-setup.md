Set up server-side tagging with Cloud Run

This guide explains how to:

Provision a preview server to enable the preview feature for the container.
Provision a tagging server to handle live traffic. Increase or decrease the
number of servers that are running your Google Tag Manager container. Keep your
tagging server version updated after provisioning the server. Prerequisites You
need a GCP account. If you don't have one, create a new GCP account. You need a
GCP billing account. If you don't have one, create a GCP billing account
(requires the Billing Account Creator role). You need the Project Creator and
the Billing Account User role. Learn more about adding roles. Provision a
preview and tagging server You can provision a Cloud Run service either
automatically in Google Tag Manager or manually in Google Cloud.

Automatic Provisioning Manual Provisioning Create a Google Tag Manager server
container Open Google Tag Manager.

In the account row, click on the overflow menu > Create Container.

Create a new server container.

Click the "Manually provision tagging server" radio button. Note the container
config. You'll need it to provision your server.

Create a new GCP project To create a new GCP project for your tagging server:

Open Google Cloud Console.

Create a new GCP project.

Name your project. We recommend using your container ID for convenience. This
name is used only within GCP.

Note the GCP project ID, because you will need it to create your tagging server.

Provision a new preview and tagging server You can provision a Cloud Run service
either via the command line (CLI) or in the user interface. Both steps involve
provisioning both a tagging and a preview server. The tagging server runs your
container and handles live traffic while the preview server enables you to
preview the server container.

You should never allocate more than one vCPU per instance. Server-side tagging
instances are not designed to use additional CPUs, and having more than one will
hinder the deployment's ability to autoscale properly.

To create your preview and tagging servers:

Command Line User Interface Open the Cloud Shell.

Set the GCP project in the Cloud Shell. Replace project ID with the GCP project
ID that you noted earlier:

gcloud config set project project ID Set up your tagging server and your preview
server by running the following commands. If there is an existing deployment,
the commands will let you change the configuration by creating a new revision
and shifting traffic to the new revision.

Replace REGION with a supported Cloud Run region closest to your customers.
Replace CONTAINER_CONFIG with the container config string from Tag Manager.

gcloud run deploy "server-side-tagging-preview" \
--region REGION \
--image gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable \
--min-instances 0 \
--max-instances 1 \
--timeout 60 \
--allow-unauthenticated \
--no-cpu-throttling \
--update-env-vars \
RUN_AS_PREVIEW_SERVER=true,CONTAINER_CONFIG="CONTAINER_CONFIG" &&

gcloud run deploy "server-side-tagging" \
--region REGION \
--image gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable \
--platform managed \
--ingress all \
--min-instances 2 \
--max-instances 10 \
--timeout 60 \
--allow-unauthenticated \
--no-cpu-throttling \
--update-env-vars PREVIEW_SERVER_URL="$( gcloud run services describe
server-side-tagging-preview --region "REGION" \
--format="value(status.url)")",CONTAINER_CONFIG="CONTAINER_CONFIG" Tip: For
additional options, refer to the gcloud run deploy reference Result: You've
created a preview and tagging server to manage your Google Tag Manager server
container.

Edit the service configuration To change your service configuration:

Open Cloud Run. Select the service you need to adjust. Click Edit & Deploy New
Revision. Make changes and click Deploy. Cloud Run cost In this Cloud Run
configuration, each server costs approximately $45 /month (USD). Each server is
a Cloud Run instance with 1 vCPU and 0.5GB memory using the CPU always allocated
pricing model.

We recommend running a minimum of 2 instances to reduce the risk of data loss in
case of a server outage. However, you may choose to run fewer (or more) servers.
We expect that autoscaling 2-10 servers will handle 35-350 requests per second,
though the performance will vary with the number of tags, and what those tags
do.

Cloud Run will dynamically scale with load. The max-instances setting is the
worst case scenario for how much you will need to pay for resources. Cloud Run
won't provision that many instances unless necessary.


2. Map the deployment to your custom domain
Set up a custom domain to use a domain other than the default address that Cloud Run provides.


3. Add the server URL to Google Tag Manager
Now that you have a server, you need to make sure that Google Tag Manager knows it should use your server.

Open Google Tag Manager.

Click on the server container you want to point to your tagging server.

Open your server container settings in the Admin tab > Container Settings.

Click Add URL and paste your server URL.

Save and go back to your workspace.

4. Validation
Now that you've set up your tagging server, make sure that it works as intended. In your Tag Manager workspace, click the Preview button. If the preview page loads, then everything is set up correctly.

Previewing multiple URLs
If you have mapped multiple domains to a single tagging server, make sure each URL is added to the container settings.

If you provided multiple URLs, all paths (the string after the domain name) must match.

Works	Does not work
URL 1: example.com/abc
URL 2: example2.com/abc	URL 1: example.com/abc
URL 2: example2.com/def
If multiple URLs are added, you will see an icon next to the Preview button that allows you to select the URL to preview.


Update the tagging server version
Note: If you provisioned your tagging servers using the App Engine setup guide or Manual setup guide, please follow the instructions listed there.
New tagging server updates contain security vulnerability fixes and new features. We recommend at least updating your tagging server for each major version release (e.g. upgrading from version 1.x.x to 2.x.x) when Tag Manager notifies you to update.

To update your tagging server, deploy a new revision using the same settings you used previously.

Open Cloud Run.
Select the service you want to update.
Click Edit & Deploy New Revision.
Make sure the Container image URL is set to gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable and click Deploy.
To verify that the update was successful:

In your server container, click the Preview button to start a new debug session and send a request on a separate tab.
In the Summary, select the Console tab and make sure there are no messages asking you to update the tagging server.
Tag Manager may show messages asking you to update your tagging server for up to a day after the server has been updated successfully. However, the preview page will show an up to date message about the tagging server version.

Custom domain configuration

This article is for developers who want to host server-side tagging in the same first-party context as their website. Same-origin serving is a best practice that lets you leverage the security and durability benefits of server-set cookies. The below instructions apply for setting up same-origin serving regardless of the Google tag deployed on your site (gtag.js or gtm.js).

When you first set up a tagging server, it is hosted on a domain provided by the cloud provider. When you use the default endpoint, it delivers data to the server container, but runs in a third-party context. To unlock the benefits of a first-party context, such as more durable cookies, your tagging server and your website have to run on the same domain.

The table below illustrates how you can host a tagging server when the parent website is hosted on www.example.com:

Same origin (best practice)	Subdomain	Default domain
Example URL	https://www.example.com/metrics	https://metrics.example.com	https://metrics.run.app
Server-set cookie access	Full access to security and durability benefits.	Full access to security and durability benefits.	None. Can only set Javascript cookies.
Setup complexity	Configure a CDN or load balancer to forward requests. May need to update DNS entries.	Update DNS entries.	Comes pre-configured.
Pick your implementation option to get started.

Subdomain Same origin

Prerequisites
This guide assumes that you have:

Set up a server container in Tag Manager
Set up a tagging server
A CDN or load balancer that can forward requests.
If you use App Engine: The tagging server must run version 2.2.0 or later. To future-proof your tagging server, migrate to Cloud Run.
Configure the custom domain
You can set up your server container to run on a path from the same domain as your website. For example, if your website serves web traffic at www.example.com, reserve a path such as www.example.com/metrics for your server container.

Diagram of server-side tagging set up on the same origin.

1. Choose a path of your domain to use for your tagging server
Caution: This setup method routes all traffic prefixed with the chosen path to the tagging server. Choose an unused path to avoid affecting your website's traffic. The path must not contain /gtm.
This path will be reserved for this first-party serving implementation. Make sure you pick a path you're not already using.

Examples of paths you might want to use include: /collect, /metrics, /data

Take note of this path string. You will use it throughout the subsequent steps in place of /metrics wherever you see: /metrics

Important: You should route all traffic on this path to server container.
If you have to use explicit sub-paths, you must route all paths claimed by clients. You must also explicitly route the sub-path /_/* to server container. Failure to route /_/* will break core functionality.

2. Route traffic to your tagging server
If your website is already set up with a CDN or load balancer that supports routing traffic by paths, skip to step #4.

Add an origin or backend that points to your website.
Override the Host header to be the website's hostname, such as example.com
Allow all cookies and query strings to be forwarded. If the platform does not have this option, it likely does this by default.
Add another origin or backend that points to your tagging server. This can be the domain provided by the cloud provider, such as metrics.run.app
Override the Host header to be equal to the previously specified domain. Allow all cookies and query strings to be forwarded.
Add a path rule, such as /metrics/*, to route traffic to the tagging server.
Configure the reserved server-side tagging path to have higher priority than the default rule.
Update your DNS to point to the CDN or load balancer if not already done. It may take some time for the DNS updates to propagate.
Visit the /healthy endpoint on the domain you just set up, such as https://example.com/metrics/healthy. You should see an ok.
3. Update the server URL in Google Tag Manager
You need to update your server container configuration so that it can identify the path prefix and process requests correctly.

To update to the new endpoint:

Open Google Tag Manager
Open the server container that is set up on the same origin as the website.
Under Admin tab > Container Settings, remove all previous URLs. This is necessary because all server container URLs must share the same path.
Click Add URL and input your the URL including the path prefix.
Save and go back to your workspace.
Click the Preview button to start a new debug session and send a request on a separate tab.
Click the request that was sent. Ensure your client claimed the incoming request.
Troubleshoot common issues
Preview does not show incoming requests
Navigate to your cloud project's log explorer. Verify that the server-side tagging deployment is receiving traffic. If it is not, follow the instructions in step 1.
Confirm that the CDN or load balancer is forwarding cookies.
Verify that you have a single preview server and that the tagging servers have the PREVIEW_SERVER_URL set.
Confirm that the preview server is running by going to the PREVIEW_SERVER_URL + /healthy. You should see an ok.
Clients are not claiming requests - Update the URL in the Container Settings to use the reserved path. If the URL does not contain the path or if they are different, clients won't work correctly.


Send data to server-side Tag Manager



This article describes the different ways to send events to a server-side container. If you need more background information, take a look at how server-side tagging works.

This article discusses how to:

Send data from a website to your server-side container
Send additional data to a server container
Receive data in your server-side container
Send data from sources other than websites
Before you begin
This guide assumes that you already have:

Set up a server container in Tag Manager
Set up a tagging server
1. Send data from a website to your server-side container 
You can route data through a server-side implementation via Tag Manager or gtag.js. Pick your implementation option.

Tag Manager gtag.js
Choose your implementation option.
Optional: Send additional parameters with each event 
You can send additional two types of additional parameters: Configuration-level parameters and event-level parameters. Configuration parameters influence how your Google tag behaves and can only be set on the Google tag level.

Event parameters specify additional information about an event and can be set for all events, select events, or page_view events.

Choose your implementation option.
Setup recommendations
We recommend using GA4 tag on a web page to send data to the server container. This tag can use different transport methods to ensure the best delivery rate of the events. Such methods include but not limited to

Image pixel
Fetch API
XHR
Service worker that runs in an iframe loaded from your server container domain.
To ensure that all methods are supported check the following:

Content-security policy (CSP)

Directive	Content	Purpose
img-src	[SERVER_CONTAINER_URL]	Measurement requests
connect-src	[SERVER_CONTAINER_URL]	Measurement requests
frame-src	[SERVER_CONTAINER_URL]	Service worker implementation
In addition, X-Frame-Options must not restrict iframes from being loaded from the server container URL.

Consult with https://developers.google.com/tag-platform/security/guides/csp for specific policies per product.

2. Receive data in your server-side container
When you send HTTP request to a server container, a client has to claim that request.

Key Term: "Clients" are adapters between the software running on a user's device and your server-side Tag Manager container. They receive measurement data from a device, transform that data into one or more events, process the data in the container, and package the results to be sent back to the device.
To view the list of available clients:

Open Google Tag Manager

Open your server container.

In the navigation bar on the left, click Clients. The GA4 client is pre-installed on your server-side container by default.

Click the name of the client to view or edit details.

Optional client settings
In most cases, the client will require no modifications. However, your use case might be different and you might want to edit one of the following settings:

Priority: Determines the order in which clients will run. Higher numbers run first, and the first client that matches the incoming request will become the active client for that request.

Activation Criteria: Activation criteria define when the client will respond to requests:

Default gtag.js paths for specific IDs: Use this setting to enable gtag.js JavaScript serving through your server container URL. When enabled, this client will activate in response to requests to the default gtag.js request paths, e.g. /gtag/js?id=TAG_ID. Click Add Measurement ID to add one or more destination IDs.
Optional: Receive additional data in server-side Tag Manager
If you are sending additional parameters, you need to set up the Google Analytics 4 client in your server container to parse the additional parameters and create event data out of them.

Some server tags will include the additional parameters in their outbound requests with no setup. To exclude those parameters, create a Transformation to remove the value.

To use additional parameters in other tags:

In your server container, click on Variables in the left navigation.
Create a New User-defined Variable.
In Variable Configuration, select the variable type Event Data.
In Key Path, enter the name of the parameter.
Give your variable a name and Save.
Now you can use the event parameter in any other tag within your server container.

3. Optional: Send data from sources other than websites
The Google Analytics Measurement Protocol can be used to enable server-side tagging support from sources such as mobile apps and server-to-server applications. This option lets you send events to your container in the Measurement Protocol format. The container sends those events to Google Analytics using the same mechanism as all other SGTM events.

Note: This option doesn't send events to the Measurement Protocol endpoint.
This option doesn't support all the features of the Measurement Protocol endpoint, like deriving geographic and device information from tagging events.

Mobile apps
To get your Android or iOS app to send data to your server container, you will create a custom image tag and configure it to use the Measurement Protocol:

In your mobile container (Android or iOS), click Tags > New.
In Tag Configuration select the Custom Image tag type.
Set the value of Image URL to a pixel image on the server container at the path in the Measurement Protocol client that you specified earlier. Append any desired Measurement Protocol parameters to the end of your pixel URL:
https://custom.example.com/app?v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
Deselect Enable Cache Busting.
Save the tag and publish the container.
In your server-side container, click Clients > New.
In Client Configuration, select the Measurement Protocol client type.
Set Activation Path to the path of your app's collection endpoint.
Save the client configuration and publish the server-side container.
Server-to-server apps
To send measurement protocol data to your server container, replace the www.google-analytics.com hostname with the domain name of your server container. For example:


POST /batch HTTP/1.1
Host: collection.example.com

v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
To receive Measurement Protocol hits, configure your server-side Tag Manager installation with a Measurement Protocol client:

In your server-side container, click Clients > New.
In Client Configuration, select the Measurement Protocol client type.
Set Activation Path to the path of your server's endpoint.
Save the client configuration and publish the container.
Next steps
To send data in a true first-party context, you need to serve Google scripts, such as the Google Analytics library, from your own servers.


Google tag gateway for advertisers: Load Google scripts first-party

This document is for developers who use server-side tagging and want to serve Google scripts in a first-party context.

Google tag gateway for advertisers lets you load Google scripts, such as gtm.js, directly from your first-party infrastructure instead of from Google's servers. This lets you serve data within a first-party context either through your tagging server or through a CDN.

Before you begin
This guide assumes that you have done the following:

Set up a server container in Tag Manager
Set up a tagging server
Configured a custom server domain
To get started, pick how you want to serve your Google scripts.

CDN (recommended) Tagging server

Pick an implementation option to see instructions.
Next steps
If you are using consent mode, you can set up region-specific tag behavior for even more control.