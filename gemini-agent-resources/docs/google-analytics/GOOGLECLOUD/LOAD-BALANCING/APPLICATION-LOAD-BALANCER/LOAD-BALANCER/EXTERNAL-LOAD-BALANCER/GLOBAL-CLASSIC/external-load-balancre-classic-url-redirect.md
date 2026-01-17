Set up a URL redirect for a classic Application Load Balancer

This example demonstrates how to use URL redirects to redirect all incoming requests to a different host or path.

Related content
This page is for a classic Application Load Balancer only. If you are using a load balancer in a different mode, see one of the following pages:

Configure a URL redirect for global external Application Load Balancers

Configure a URL redirect for regional external Application Load Balancers

If you're trying to set up an HTTP-to-HTTPS redirect, see Set up an HTTP-to-HTTPS redirect for a classic Application Load Balancer.

Add a URL redirect
Console
gcloud
Go to your list of load balancers in the Google Cloud console.
Go to Load balancing
For a load balancer of type HTTP(S) (Classic), click the load balancer's name link.
Click Edit edit.
In Host and path rules, select Advanced host and path rule (URL redirect, URL rewrite).
Click Add host and path rule.
In the Hosts field, enter *.
Click edit.
For the Action, select Redirect the client to different host/path.
For the host redirect, enter a hostname to redirect to, or omit to keep the requested host.
For Path redirect, select Full path redirect.
For Path value, enter a path to redirect to, or omit to keep the requested path.
For Strip query, click Enable.
Click Save to finish configuring the host and path rule.
Click Done to finish editing the URL map.
Click Update to finish editing the load balancer.
