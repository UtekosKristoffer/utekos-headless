feedbackServer-side tagging



Server-side tagging allows you to move measurement tag instrumentation from your website or app to a server-side processing container on Google Cloud Platform (GCP), or any other platform of your choosing. Server-side tagging offers a few advantages over client-side tags:

Improved performance: Fewer measurement tags in your website or app means less code to run on the client side.
Better security: Visitor data is better protected and more secure when collected and distributed in a customer-managed server-side environment. Data is sent to a cloud instance where it is then processed and routed by other tags.
Note: Server containers run on Cloud Run. Cloud Run downtime doesn't affect the performance of your website.
To get started with server-side tagging:

Create a Tag Manager server container.
Set up a GCP tagging server.
For a high-level overview, read An introduction to server- side tagging
Create a Tag Manager server container
To use server-side tagging, create a new Tag Manager server container:

From your Tag Manager account, create a new container.
Click Accounts > more actions menu next to the relevant account name.
Choose Create Container.
Under Target platform, choose Server.
Click Create.
A dialog to set up your tagging server appears. This process is detailed in the next section.

Set up a tagging server
After you have created the server container, you need to deploy a tagging server. Note: To return to this point later on, click your container ID in the top bar or navigate to the Admin tab > Container Settings > Set up your tagging server.

You can choose one of the following deployment options:

Automatic provisioning (recommended): If you choose to Automatically provision tagging server, Google Tag Manager sets up a new GCP project and a Cloud Run tagging server for you. If you want to use an existing GCP project, follow the Cloud Run setup guide.
Manual provisioning on non-Google infrastructure: If you want to use your own server solution, follow the steps in the manual setup guide.
Configure the server domain
The new tagging server has a default URL on run.app. To improve cookie privacy and durability, point a subdomain of your website to the tagging server. That way, the tagging server can read and write cookies that are not visible to scripts in the page (HttpOnly cookies). Learn how to set up a custom domain to map to your tagging server.

Understand the default GCP deployment
When you create a tagging server using the automatic provisioning flow, the server has the default configuration.

What GCP resources are allocated when I automatically provision my tagging server?

When you automatically provision your tagging server, a GCP project is created with the server-side container deployed on Cloud Run. The deployment restricts the amount of resources available and is recommended for testing limited traffic volumes only.

When your server-side container begins to receive live traffic, allocate additional instances to your service to ensure redundancy and avoid data loss in case of outages or capacity limitations. We recommend a minimum of 3 instances per container for redundancy. Learn how to upgrade your deployment.

What is the domain of my tagging server?
The default deployment uses a Cloud Run subdomain. We strongly recommend that you point a subdomain of your website to the tagging server. Follow these instructions to map your website subdomain to your tagging server.

How much does the default deployment cost?
The default deployment of a GCP project with a single server is free in most cases. However a few factors can cause you to incur costs with a single-server deployment:

The billing account used for the GCP deployment is linked to other projects that push the server out of the GCP Free Tier.
The amount of traffic sent from the server exceeds the free-tier limits.
Once you upgrade your Cloud Run environment, you can expect to spend $30-$50 per server per month. Large amounts of network traffic may increase this cost.

How do I add additional instances to my deployment?
To learn how to add additional instances to your deployment, read the Cloud Run documentation.

