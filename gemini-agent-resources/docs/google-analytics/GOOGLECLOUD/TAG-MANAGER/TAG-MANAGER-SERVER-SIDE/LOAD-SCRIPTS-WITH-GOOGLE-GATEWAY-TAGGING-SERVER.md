# Google Tag Gateway for Advertisers: Load Google Scripts First-Party

This document is for developers who use server-side tagging and want to serve Google scripts in a first-party context.

Google tag gateway for advertisers lets you load Google scripts, such as `gtm.js`, directly from your first-party infrastructure instead of from Google's servers. This lets you serve data within a first-party context either through your tagging server or through a CDN.

## Before you begin

This guide assumes that you have done the following:

-   Set up a server container in Tag Manager
-   Set up a tagging server
-   Configured a custom server domain

## Implementation: Serve scripts with a CDN

If you have a CDN, you can configure it to serve first-party scripts directly. This option requires that you set up same-origin serving with your tagging server. Learn more about Google tag gateway with CDNs.

To set up Google tag gateway with server-side tagging you must configure two paths:

-   **Collection path** (e.g., `/metrics`) --> Forwards events to your tagging server
-   **Script path** (e.g., `/scripts`) --> Forwards first-party script requests to Google servers

> **Caution**: Choose unused paths to avoid affecting your website's traffic. The paths must not contain `/gtm`.

## Next steps

If you are using consent mode, you can set up region-specific tag behavior for even more control.