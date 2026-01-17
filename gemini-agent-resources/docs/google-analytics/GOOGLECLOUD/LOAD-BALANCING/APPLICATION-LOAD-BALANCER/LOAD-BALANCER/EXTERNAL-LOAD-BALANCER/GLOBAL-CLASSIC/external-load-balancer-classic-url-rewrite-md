Set up URL rewrite for a classic Application Load Balancer

This example demonstrates rewriting the path specified in a request for a classic Application Load Balancer.

To configure traffic management for global external Application Load Balancers and regional external Application Load Balancers, see the following pages:

Setting up traffic management for global external Application Load Balancer
Setting up traffic management for regional external Application Load Balancer
Before you begin
Read about URL rewrites.

Read about URL maps in general and path matchers in particular.

The URL rewrite example assumes that you've already created your external Application Load Balancer following the steps outlined in Setting up a load balancer with Cloud Storage buckets.

That example leads you through the creation of two resources:

http://IP_ADDRESS/never-fetch/three-cats.jpg
http://IP_ADDRESS/love-to-fetch/two-dogs.jpg
Where /never-fetch/three-cats.jpg is stored in /cats, which is the default service, and /love-to-fetch/two-dogs.jpg is stored in /dogs.

At this point, the URL map looks like this:



gcloud compute url-maps describe http-lb


creationTimestamp: '2020-10-13T11:18:10.561-07:00'
defaultService: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/cats
fingerprint: MKfYsObzqgw=
hostRules:
- hosts:
  - '*'
  pathMatcher: path-matcher-1
id: '1420501688756228493'
kind: compute#urlMap
name: test-bucket
pathMatchers:
- defaultService: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/cats
  name: path-matcher-1
  pathRules:
  - paths:
    - /love-to-fetch/*
    service: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/dogs
selfLink: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/global/urlMaps/http-lb
Modifying the URL map
Important: The rewrite is prepended to the path as is. Full path rewrites are not supported. External Application Load Balancers only implement path prefix rewrites. For example, you can rewrite: host.name/path1/resource1 to host.name/path2/resource1. You cannot rewrite host.name/path1/resource1 to host.name/path1/resource2.
In this example, you rewrite the /love-to-fetch/ URL so that users can reach the two-dogs.jpg image with this simplified URL:

http://IP_ADDRESS/two-dogs.jpg
To do this, modify the load balancer's URL map as follows:

Console
gcloud
Edit your load balancer
Go to the Load balancing page in the Google Cloud console.
Go to the Load balancing page
Click http-lb.
Click Edit edit.
Keep the window open to continue.
Change the host and path rules
In the left column of the screen, click Host and path rules.
Select Advanced host and path rule (URL redirect, URL rewrite).
Click the row that contains the non-default path rule, in this case, the row that has an asterisk (*) for all hosts.
Click the pencil icon edit for the /love-to-fetch/* Route traffic to a single backend: dogs row.
Under Paths, delete /love-to-fetch/* and add /*.
Under Action, select Route traffic to a single backend.
Click Add-on action (URL rewrite).
Leave Host rewrite blank.
Under Path prefix rewrite, enter /love-to-fetch/.
Under Backend, select dogs.
Click Save.
Click Done. The new host and path rule looks as follows:

Paths	Action	Backend
Any unmatched (default)	Route traffic to a single backend	cats
/*	Route traffic to a single backend	dogs
If everything looks correct, click Update to update your HTTP load balancer.

Testing
Note the IPv4 address that was reserved:



gcloud compute addresses describe example-ip \
    --format="get(address)" \
    --global
After waiting several minutes for the changes to propagate, you can test this setup.

On the command line, run the following curl command:



curl http://IP_ADDRESS/two-dogs.jpg
In a browser, open http://IP_ADDRESS/two-dogs.jpg.

