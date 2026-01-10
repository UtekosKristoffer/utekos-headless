# Custom Domain Configuration

This article is for developers who want to host server-side tagging in the same
first-party context as their website. Same-origin serving is a best practice
that lets you leverage the security and durability benefits of server-set
cookies. The below instructions apply for setting up same-origin serving
regardless of the Google tag deployed on your site (gtag.js or gtm.js).

## Overview

When you first set up a tagging server, it is hosted on a domain provided by the
cloud provider. When you use the default endpoint, it delivers data to the
server container, but runs in a third-party context. To unlock the benefits of a
first-party context, such as more durable cookies, your tagging server and your
website have to run on the same domain.

## Hosting Options

The table below illustrates how you can host a tagging server when the parent
website is hosted on `www.example.com`:

| Configuration                | Same Origin (Best Practice)                                                          | Subdomain                                       | Default Domain                        |
| ---------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------- |
| **Example URL**              | `https://www.example.com/metrics`                                                    | `https://metrics.example.com`                   | `https://metrics.run.app`             |
| **Server-set Cookie Access** | Full access to security and durability benefits                                      | Full access to security and durability benefits | None. Can only set JavaScript cookies |
| **Setup Complexity**         | Configure a CDN or load balancer to forward requests. May need to update DNS entries | Update DNS entries                              | Comes pre-configured                  |

Pick your implementation option to get started:

- [Subdomain](#subdomain)
- [Same Origin](#same-origin)

## Prerequisites

This guide assumes that you have:

- Set up a server container in Tag Manager
- Set up a tagging server

## Configure the Custom Domain

Pick an implementation option.
