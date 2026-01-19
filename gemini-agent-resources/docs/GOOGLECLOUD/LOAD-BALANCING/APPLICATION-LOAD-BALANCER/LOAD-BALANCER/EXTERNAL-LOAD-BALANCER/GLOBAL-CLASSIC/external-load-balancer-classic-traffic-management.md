Traffic management overview for a classic Application Load Balancer

This page gives you an overview of the traffic management capabilities available for the classic Application Load Balancer. This page is for the classic Application Load Balancer only. If you use a load balancer in a different mode with support for the expanded set of traffic management features, see one of the following pages:

Traffic management overview for regional external Application Load Balancers

Traffic management overview for global external Application Load Balancers

Classic Application Load Balancer supports traffic management functionality that enables you to use the following features:

Traffic steering. Intelligently route traffic based on HTTP(S) parameters:
Host and path
Traffic actions. Perform request-based actions:
Rewrites
HTTP to HTTPS redirects
Header-based and parameter-based routing
Traffic policies. Fine-tune load balancing behavior:
Timeouts
Max rates and max connections
You configure these features using the load balancer's URL map. For background information, see the following topics:

URL map overview
Using URL maps
Backend services overview
Traffic management components
At a high level, external Application Load Balancers provide traffic management by using global URL maps.

The load balancer provides the following mutually exclusive primary actions:

Route requests to a backend service
Perform a redirect
When you set up a load balancer, you can configure a URL rewrite action before the load balancer sends requests to the backend service or backend bucket.

Rewrites or redirects can be applied at three levels in the URL map:

At the pathRule where the action takes effect when a path is matched
At the pathMatcher where the action takes effect when no paths are matched for this pathMatcher
At the urlMap where the action takes effect when none of the hosts specified in any of the host rules are matched
Using routeRules in a pathMatcher is an alternative to using pathRules. pathRules and routeRules cannot both appear in the same pathMatcher. Unlike pathRules, where order doesn't matter, routeRules are examined in order. A routeRule can test the URL path, HTTP headers, and URL query parameters.

Use case examples
Traffic management addresses many use cases. This section provides a few high-level examples.

Rewrites
URL rewrites allow you to present external users with URLs that are different from the URLs that your services use.

A URL rewrite separates a URL from a resource. You can translate from human-friendly URLs, which are easier for users to remember and use, transforming them into search-engine friendly URLs, which are easier for search engines to find, or into internal implementation-specific URLs.

The URL rewrite feature does the following:

Reads the incoming URL in the request.
Replaces the host, the path, or both the host and the path, transforming the URL before directing traffic to the backend service or backend bucket.
In the following diagram:

A user in Japan sends a request for the URL www.mydomain.com/static/images/someimage.jpg.
When the request reaches the external Application Load Balancer, the load balancer uses information in the URL map to rewrite the URL to www.myorigin.com/august_snapshot/images/someimage.jpg.
(Optional) In this example, the URL map sends the request to an external backend.
URL rewrite with the classic Application Load Balancer.
Figure 1. URL rewrite with the classic Application Load Balancer.
For a configuration example, see Rewrites.

Redirects
With URL redirects, you can redirect client requests from one URL to another URL.

This includes the capability to:

Redirect all HTTP requests to HTTPS requests.
Redirect to a different URL formed by modifying the host, path, or both the host and path portion of the URL, and either stripping out or retaining any query parameters.
Choose which redirect response codes to issue.
Use URL redirects for the following capabilities:

Provide URL shortening. Client-facing URLs can be made substantially shorter. This service issues a redirect to the web page with the long URL.
Prevent broken links when web pages are moved or become outdated.
Allow multiple domain names belonging to the same owner to refer to a single web site.
Avoid the toil and inefficiencies of configuring workarounds at the backend server to support the necessary redirect.
Reduce latency. Redirects created at the edge can result in lower latency compared to redirects created at the backend endpoints.
HTTP-to-HTTPS redirects further specifically help you to:

Meet compliance requirements (such as HIPAA) for encrypted traffic.
Redirect requests using HTTPS instead of rejecting requests sent with the HTTP protocol.
Improves the security profile of your application by redirecting the traffic at the layer-7 load balancer itself, as opposed to implementing the redirect at the backend server.
In the following diagram:

A user in Japan sends a GET http://example.com/img1 request.
Based on the redirect defined in the URL map, the load balancer sends back an HTTP/1.1 302 Found Location: https://example.com/img1 redirect, redirecting the HTTP request to an HTTPS request.
The user's browser sends a GET https://example.com/img1 request.
URL redirect with the classic Application Load Balancer.
Figure 2. URL redirect with the classic Application Load Balancer.
For a configuration example, see Redirects.

Supported response codes
The supported redirect response codes are listed in the table.

Response code	Number	Notes
MOVED_PERMANENTLY_DEFAULT	301	
FOUND	302	
PERMANENT_REDIRECT	308	In this case, the request method is retained.
TEMPORARY_REDIRECT	307	In this case, the request method is retained.
SEE_OTHER	303	
Header-based and parameter-based routing
Header-based and parameter-based routing allow a load balancer to make routing decisions that are based on HTTP headers and URL query parameters.

With this feature, you can simplify your cloud architecture, without deploying additional tiers of proxies (NGINX, for example) to do routing.

You can use the external Application Load Balancer to do the following:

A/B testing
Assigning customers to different sets of services running on backends
Delivering different pages and experiences based on different categories of devices from which the requests originate
After a pathMatcher is selected based on the host string, the routeRules in the pathMatcher select a URL path. For more information, see the URL maps overview.

Example: Configuring A/B testing with query parameter-based routing
The following example shows how to do A/B testing by matching on the query string to specify the experiment and input.

Suppose that you want to make sure that requests are handled as follows:

All requests with the query parameter value A go to the backend service called BackendServiceForProcessingOptionA.
All requests with the query parameter value B go to the backend service called BackendServiceForProcessingOptionB.
These requirements are summarized in the following table.

Request	Backend service
http://test.mydomain.com?ABTest=A	BackendServiceForProcessingOptionA
http://test.mydomain.com?ABTest=B	BackendServiceForProcessingOptionB
To configure this in your global URL map, you can create the following settings.

Match	Action
pathMatchers[].routeRules[].matchRules[].queryParameterMatches[].name = ABTest

pathMatchers[].routeRules[].matchRules[].queryParameterMatches[].exactMatch = A	pathMatchers[].routeRules[].service = BackendServiceForProcessingOptionA
pathMatchers[].routeRules[].matchRules[].queryParameterMatches[].name = ABTest

pathMatchers[].routeRules[].matchRules[].queryParameterMatches[].exactMatch = B	pathMatchers[].routeRules[].service = BackendServiceForProcessingOptionB
For a configuration example, see Header-based and parameter-based routing.

Routing requests to backends
The backend for your traffic is determined by using a two-phased approach:

The load balancer selects a backend service with backends. The backends can be the following:

Compute Engine virtual machine (VM) instances in an unmanaged instance group
Compute Engine VMs in a managed instance group (MIG)
Containers by means of a Google Kubernetes Engine (GKE) node in a zonal network endpoint group (NEG)
External backends outside of Google Cloud in an internet NEG
Cloud Storage in backend buckets
App Engine, Cloud Run functions, or Cloud Run services in a serverless NEG
The load balancer chooses a backend service based on rules defined in a global URL map.

The backend service selects a backend instance based on policies defined in a global backend service.

When you configure routing, you can choose between the following modes:

Simple host and path testing, by using pathRules
Advanced request testing, by using routeRules
For each URL map, you can choose to use simple host and path rules or advanced host, path, and route rules. The two modes are mutually exclusive. Each URL map can contain only one mode or the other mode.

Simple host and path rule
In a simple host and path rule, URL maps work as described in the URL map overview.

The following diagram shows the logical flow of a simple host and path rule.

URL map flow with a simple host and path rule.
Figure 3. URL map flow with a simple host and path rule.
A request is initially evaluated by using host rules. A host is the domain specified by the request. If the request host matches one of the entries in the hosts field, the associated path matcher is used.

Next, the path matcher is evaluated. Path rules are evaluated on the longest-path-matches-first basis, and you can specify path rules in any order. After the most specific match is found, the request is routed to the corresponding backend service. If the request does not match, the default backend service is used.

A typical simple host and path rule might look something like the following, where video traffic goes to video-backend-service, and all other traffic goes to web-backend-service.



$ gcloud compute url-maps describe ext-https-map


defaultService: global/backendServices/web-backend-service
hostRules:
- hosts:
  - '*'
  pathMatcher: pathmap
name: ext-https-map
pathMatchers:
- defaultService: global/backendServices/web-backend-service
  name: pathmap
  pathRules:
  - paths:
    - /video
    - /video/*
    service: global/backendServices/video-backend-service
For a configuration example, see Host and path.

Advanced host, path, and route rule
Advanced host, path, and route rules provide additional configuration options compared to simple host and path rules. These options enable more advanced traffic management patterns and also modify some of the semantics. For example, route rules are executed in order (rather than by using longest-path-matches-first semantics).

As in the earlier simple host and path rule example, you can configure advanced traffic management by using a global URL map, but instead of using pathMatchers[].pathRules[], you use pathMatchers[].routeRules[].

The following sections explain the advanced host, path, and route rule components.

Host rules
When a request reaches your load balancer, the request's host field is evaluated against the hostRules defined in the URL map. Each host rule consists of a list of one or more hosts and a single path matcher (pathMatcher). If no hostRules are defined, the request is routed to the defaultService.

For more information, see hostRules[] and defaultService in the global URL map API documentation.

Path matchers
After a request matches a host rule, the load balancer evaluates the path matcher corresponding to the host.

A path matcher is made up of the following components:

One or more path rules (pathRules) or route rules (routeRules).
A default rule that executes when no other backend services match. The rule has the following mutually exclusive options:

A default service specifies the default backend service to route to when no other backend services match.
A default redirect specifies the URL to redirect to when no other backend services match.
When the load balancer is configured for a default service, it can additionally be configured to rewrite the URL before sending the request to the default service.

For more information, see pathMatchers[], pathMatchers[].pathRules[], and pathMatchers[].routeRules[] in the global URL map API documentation.

Path rules
Path rules (pathRules) specify one or more URL paths, such as / or /video. Path rules are generally intended for the type of simple host and path-based routing described previously.

For more information, see pathRules[] in the global URL map API documentation.

Route rules
A route rule (routeRules) matches information in an incoming request and makes a routing decision based on the match.

Route rules can contain a variety of different match rules (matchRules) and a variety of different route actions (routeAction).

A match rule evaluates the incoming request based on the HTTP(S) request's path, headers, and query parameters. Match rules support various types of matches (for example, prefix match) as well as modifiers (for example, case insensitivity). This enables you to, for example, send HTTP(S) requests to a set of backends based on the presence of a custom-defined HTTP header.

For a detailed list of options supported by matchRules, see matchRules[] in the global URL map API documentation.

If you have multiple route rules, the load balancer executes them in order, which allows you to specify custom logic for matching, routing, and other actions.

Within a given route rule, when the first match is made, the load balancer stops evaluating the match rules, and any remaining match rules are ignored.

Google Cloud performs the following actions:

Looks for the first match rule that matches the request.
Stops looking at any other match rules.
Applies the actions in the corresponding route actions.
Route rules have several components, as described in the following table.

Route rule component (API field name)	Description
Priority (priority)	A number from 0 through 2,147,483,647 (that is, (2^31)-1) assigned to a route rule within a given path matcher to determine the order of route rule evaluation.

The highest priority is 0. The lowest priority is 2147483647. As an example, a rule with priority 4 is evaluated before a rule with priority 25. The first rule that matches the request is applied.

Priority numbers can have gaps; they don't need to be contiguous. You cannot create multiple rules with the same priority.
Description (description)	An optional description of up to 1,024 characters.
Service (service)	The full or partial URL of the backend service resource to which traffic is directed if this rule is matched.
Match rules (matchRules)	One or more rules that are evaluated against the request. These matchRules can match all or a subset of the request's HTTP attributes, such as the path, HTTP headers, and query (GET) parameters.

Within a matchRule, all matching criteria must be met for the routeRule's routeActions to take effect. If a routeRule has multiple matchRules, the routeActions of the routeRule take effect when a request matches any of the routeRule's matchRules.
Route action (routeAction)	Allows you to specify a URL rewrite action to take when the match rule criteria are met.
Redirect action (urlRedirect)	You can configure an action to respond with an HTTP redirect when the match rule criteria are met. This field cannot be used in conjunction with a route action.
For more information, see the following fields in the global URL map API documentation:

routeRules[]
routeRules[].priority
routeRules[].description
routeRules[].service
routeRules[].matchRules[]
routeRules[].routeAction
routeRules[].urlRedirect
Match rules
Match rules (matchRules) match one or more attributes of a request and take actions specified in the route rule. The following list provides some examples of request attributes that can be matched by using match rules:

Host: A host name is the domain name portion of a URL; for example, the host name portion of the URL http://example.net/video/hd is example.net. In the request, the host name comes from the Host header, as shown in this example curl command, where 10.1.2.9 is the load-balanced IP address:



curl -v http://10.1.2.9/video/hd --header 'Host: example.com'
Paths follow the host name; for example /images. The rule can specify whether the entire path or only the leading portion of the path needs to match.

Other HTTP request parameters, such as HTTP headers, which allow cookie matching, as well as matching based on query parameters (GET variables). Note that regular expression matching for header values isn't supported.

For a complete list of supported match rules, see pathMatchers[].routeRules[].matchRules[] in the global URL map API documentation.

Configuring traffic management
You can use the Google Cloud console, gcloud, or the Cloud Load Balancing API to configure traffic management. Within your chosen configuration environment, you set up traffic management by using YAML configurations.

For help writing these YAML files, you can use the following resources:

The global URL map API documentation

Provides a full list of fields, including semantics regarding relationships, restrictions, and cardinality.

Examples on the traffic management set up page:

Setting up HTTP-to-HTTPS redirect
Setting up URL rewrite
Setting up query parameter-based routing
Setting up HTTP header-based routing