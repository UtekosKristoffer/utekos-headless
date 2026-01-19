# External Application Load Balancer Performance Best Practices

This page describes some best practices to ensure that the load balancer is optimized for your application.

## Place Backends Close to Clients

The closer your users are to your backends, the lower the network latency. Create your load balancer backends in the region closest to your users. In many cases, running your backends in multiple regions is necessary to minimize latency for clients in different parts of the world.

## Enable Caching with Cloud CDN

Turn on Cloud CDN and caching as part of your default, global external Application Load Balancer configuration. For more information, see [Cloud CDN](https://cloud.google.com/cdn).

## Forwarding Rule Protocol Selection

For the global external Application Load Balancer and the classic Application Load Balancer, we recommend HTTP/3, which is enabled by default in all major browsers. For the regional external Application Load Balancer, we support HTTP/1.1, HTTPS, and HTTP/2.

## Backend Service Protocol Selection

Your choice of backend protocol (HTTP, HTTPS, or HTTP/2) impacts application latency and network bandwidth. For example, using HTTP/2 between the load balancer and the backend instance can require more TCP connections than HTTP(S). Connection pooling, an optimization that reduces the number of these connections with HTTP(S), is not available with HTTP/2.

## Recommended Connection Duration

Instead of using a single connection to the backend indefinitely, we recommend that you choose a maximum connection lifetime (for example, between 10 and 20 minutes) and/or a maximum number of requests (for example, between 1000 and 2000 requests), after which a new connection is used for new requests.

## Balancing Mode Selection Criteria

For better performance, consider choosing the backend group for each new request based on which backend is the most responsive. This can be achieved by using the `RATE` balancing mode. The `UTILIZATION` balancing mode applies only to instance group backends and distributes traffic based on the utilization of VM instances in an instance group.

## Configure Session Affinity

Session affinity controls the distribution of new connections from clients to the load balancer's backends. You can use session affinity to ensure that the same backend handles requests from the same resource, for example, related to the same user account or from the same document. For more information, see [session affinity](https://cloud.google.com/load-balancing/docs/backend-service#session-affinity).