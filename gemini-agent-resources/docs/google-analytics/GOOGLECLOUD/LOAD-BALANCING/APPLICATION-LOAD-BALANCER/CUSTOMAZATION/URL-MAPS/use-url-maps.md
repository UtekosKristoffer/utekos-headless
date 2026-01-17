Use URL maps

This guide shows you how to configure Google Cloud URL maps. A URL map is a set of rules for routing incoming HTTP(S) requests to specific backend services or backend buckets. A minimal URL map matches all incoming request paths (/*).

Before following this guide, familiarize yourself with URL map concepts.

Note: This page describes how to configure a specific load balancer component or feature before or after you've already created a load balancer. Working with specific components is useful for advanced configurations and necessary for some configuration options. Before using the information on this page, know the type of Google Cloud load balancer that you need.
URL maps are used with the following Google Cloud products:

External Application Load Balancer (global, classic, and regional modes)
Internal Application Load Balancer
Cloud Service Mesh
URL maps used with global external Application Load Balancers, regional external Application Load Balancers, internal Application Load Balancers, and Cloud Service Mesh also support several advanced traffic management features. For more information, see URL map concepts: Advanced traffic management.

URL map defaults
URL maps have two defaults, as described in the following table.

Default type	Setting	Meaning
URL map default	gcloud compute url-maps create
--default-service | --default-backend-bucket

The specified default backend service or backend bucket is used if none of the path matchers or host rules match the incoming URL.
Path matcher default	gcloud compute url-maps add-path-matcher
--default-service | --default-backend-bucket

The specified default backend service or backend bucket is used if the URL's path matches a path matcher, but none of the specified --path-rules match.
Host rules
A host rule defines a set of hosts to match requests against.

In a host rule, the hostname must be a fully qualified domain name (FQDN). The hostname can't be an IPv4 or IPv6 address. For example:

Works: example.com
Works: web.example.com
Works: *.example.com
Doesn't work: 35.244.221.250
Configure URL maps
A URL map can send traffic to backend services or backend buckets. Backend buckets are not supported with regional external Application Load Balancers and internal Application Load Balancers.

Important: If you originally set up your load balancer in the Google Cloud console, the URL map's name is the same as your load balancer's name.
Console
gcloud
Terraform
To add a URL map using the Google Cloud console, perform the following steps:

Go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
Select Host and path rules.
Click Add host and path rule.
Fill in the Host field, Paths field, or both, and select a backend service or backend bucket.

Enter a fully qualified Host name, for example web.example.com.
Enter the path—for example, /video.
On the Host and path rules page, in the Backends menu, select an available backend service or backend bucket.
Note: If a backend service or backend bucket is not added to the URL map's host and path rules, the backend service or backend bucket remains unused by the load balancer, so you won't see it on the load balancer's Details and Edit pages.
Look for the blue checkmark to the left of Host and Path Rules and click the Update button.

Validate the URL map configuration
Note: The gcloud compute url-maps validate command is not supported for the regional external Application Load Balancer and the internal Application Load Balancer.
Before deploying a URL map, make sure you validate the URL map configuration to ensure that the map is routing requests to the appropriate backends as intended. You can do this by adding tests to the URL map configuration. You can experiment with different URL map rules and run as many tests as needed to be confident that the map will route traffic appropriately when it is deployed. Additionally, if any rule changes are needed in the future, you can test those changes before actually going live with the new configuration.

Use the gcloud compute url-maps validate command to validate URL map configuration. This command only tests the configuration provided. Irrespective of whether the tests pass or fail, no changes are saved to the deployed URL map. This behavior is unlike other URL map commands (edit, import), which also run the same tests but will actually save the new configuration if tests pass. When you want to test a new routing configuration without making changes to the deployed URL map, use the validate command.

The validate command lets you test advanced route configurations such as routing based on headers and query parameters, HTTP to HTTPS redirects, and URL rewrites.

Console
gcloud
You cannot use the Google Cloud console to validate URL map configuration. Use gcloud or the REST API instead.

Add tests to a URL map
Note: Adding tests to URL maps is not supported for the regional external Application Load Balancer and the internal Application Load Balancer.
You can add configuration tests to a URL map to ensure that your URL map routes requests to the backend services or backend buckets as intended.

This section describes how to add tests to a URL map that has already been deployed. If you want to test new changes to a URL map without actually deploying the map, see Validate URL map configuration.

When you edit your URL map, the tests run, and an error message appears if a test fails:


Error: Invalid value for field 'urlMap.tests': ''.
Test failure: Expect URL 'HOST/PATH' to map to service 'EXPECTED_BACKEND_SERVICE', but actually mapped to 'ACTUAL_BACKEND_SERVICE'.
Adding tests to URL maps is optional.

Console
gcloud
To run tests from the Google Cloud console:

Go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
Click Routing rules. For a classic Application Load Balancer, this is Host and path rules.
Click Show configuration tests.
Click Add configuration test. Add the following test URLs and backends:
Test host and path 1 example.com and Backend www-service.
Test host and path 2 example.net and Backend www-service.
Test host and path 3 example.net/web and Backend www-service.
Test host and path 4 example.com/videos and Backend video-service.
Test host and path 5 example.com/videos/browse and Backend video-service.
Test host and path 6 example.net/static and Backend static-service.
Test host and path 7 example.net/static/images and Backend static-service.
Look for the blue checkmark to the left of Routing rules and click the Update button. For a classic Application Load Balancer, look for the blue check next to Host and path rules.
Note that if you don't specify a host in a host rule, then URLs from all hosts (both example.com and example.net) can match. If you do have host rules, then you must create rules that match both example.com and example.net.

List URL maps
Console
gcloud
You cannot list all of your URL maps in the Google Cloud console.

Get information about a URL map
Console
gcloud
To get information about a URL map, perform the following steps:

Go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
View the Host and path rules.
Delete a URL map
You can delete a URL map only after you've deleted all target proxies that reference it. For more information, see Deleting a target proxy.

Console
gcloud
To delete a URL map, perform the following steps:

Go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
On the Load Balancer Details page, view the Host and path rules.
Click the "X" to the right of a URL map to delete it. The URL map disappears.
Look for the blue checkmark to the left of Host and Path Rules and click the Update button.
Delete a path matcher
Console
gcloud
To delete a path matcher, perform the following steps:

Go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
Select Host and path rules.
In the Paths field for an existing URL map, click the "x" on the path matcher's name.
Look for the blue checkmark to the left of Host and Path Rules and click the Update button.
Delete a host rule
Console
gcloud
To delete a host rule, perform the following steps:

If you're not already on the Host and path rules page, go to the Load balancing page.
Go to Load balancing

Click the Name of a load balancer.
On the Load Balancer Details page, click editEdit for the selected load balancer.
Select Host and path rules.
In the Hosts field for an existing URL map, click the "x" on the host's name.
Look for the blue checkmark to the left of Host and Path Rules and click the Update button.
Traffic management guides
Not all URL map features are available for all products. URL maps are used with load balancers to support several advanced traffic management features, not all of which are supported on the classic Application Load Balancer.

Use the following table to learn about the URL map features for management works.

Product	URL map features and traffic management guides
Global external Application Load Balancer	Load balancer features: Routing and traffic management
Traffic management overview

Setting up traffic management

Setting up a URL redirect

Setting up an HTTP-to-HTTPS redirect

Hostname and path

Routing requests

Cookies

Classic Application Load Balancer	Load balancer features: Routing and traffic management
Traffic management overview

Setting up a URL redirect

Setting up an HTTP-to-HTTPS redirect

Hostname and path

Header and query parameter-based routing

Regional external Application Load Balancer	Load balancer features: Routing and traffic management
Traffic management overview

Setting up traffic management

Setting up a URL redirect

Setting up an HTTP-to-HTTPS redirect

Hostname and path

Routing requests

Cookies

Internal Application Load Balancer	Load balancer features: Routing and traffic management
Traffic management overview

Setting up traffic management

Setting up URL redirects

Setting up HTTP-to_HTTPS redirects

Cookies

Hostname and path

Cloud Service Mesh	Cloud Service Mesh features: Routing and traffic management
Advanced traffic management overview

Configuring advanced traffic management

API and gcloud CLI reference
In addition to the Google Cloud console, you can use the API and gcloud CLI to create URL maps.

API
For descriptions of the properties and methods available to you when working with URL maps through the REST API, see the following:

Product	API documentation
External Application Load Balancer	urlMaps
Internal Application Load Balancer	regionUrlMaps
Cloud Service Mesh	urlMaps
Note: In the URL map API, HttpRouteRuleMatch means an instance of pathMatchers[].routeRules[].matchRules[].
gcloud CLI
For the Google Cloud CLI in the Google Cloud CLI, see the following:

gcloud compute url-maps
Global: --global
Regional: --region=[REGION]
For advanced traffic management, use YAML files and import them with the gcloud compute url-maps import command.

What's next
See URL maps overview for information on how URL maps work.
See External Application Load Balancer overview for information on how URL maps work in external Application Load Balancers.
See Internal Application Load Balancer overview for information on how URL maps work in internal Application Load Balancers.
