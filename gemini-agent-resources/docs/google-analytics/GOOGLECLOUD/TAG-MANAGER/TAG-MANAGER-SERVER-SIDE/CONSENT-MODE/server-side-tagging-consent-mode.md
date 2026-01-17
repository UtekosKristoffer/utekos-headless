Implement consent mode with server-side Tag Manager

This document is for developers who already have a consent solution implemented on their website and want to use consent mode in a server-side environment.

What is consent mode?
Consent mode lets you communicate your users' cookie or app identifier consent status to Google. Tags adjust their behavior and respect users' choices. Consent mode does not provide a consent banner or widget. Rather, it interacts with your Consent Management Platform (CMP).

For an in-depth introduction to consent mode, read Consent mode on websites and mobile apps

To implement consent mode you need:

Administrator access to the Google product(s) you want to configure
A consent solution or cookie banner on your website that is compatible with Google's consent mode API or gtag.js
A Google Tag Manager web container and a server container.
A Google Analytics: GA4 client in the server container to receive consent data
How consent mode works with server-side tagging
The consent banner sends the consent choices to the Google tag. The Google tag
transmits the data to the
server.

The consent banner on your website receives the user's consent choices and sends them to the Google tag.

The Google tag sends the user's preferences to the server container by adding consent parameters to the HTTP request.

Google product tags in the server are consent-aware and adjust the amount and kind of data they send based on the user's preferences.

Key Point: Because of this architecture, you only need to set up consent mode in the web container.
Advanced consent mode
Server containers support both the basic and advanced consent mode.

When you have implemented advanced consent mode in your web container and work with region-specific settings, set up your tagging server to support region-specific settings.

Set up consent mode →

Example
Your organization asks you to implement Google's consent mode API for Google Analytics 4 and Google Ads conversion tracking. You already have a cookie banner on the website, which you deployed by using a community template in the web container.

You need to make sure that your Google Ads and Google Analytics tags fire when the user accepts Ads (ad_storage) and Analytics (analytics_storage) cookies. When the user rejects Ads or Analytics cookies, the tags should always send cookie-less pings to their destinations.

To implement consent mode with server-side tagging, you need the following components:

Web container (client-side)
Server container (server-side)
Cookie banner - Asks for consent to store cookies for Google Ads and Google Analytics. Updates consent status if user decides otherwise.
Google tag - Initializes the Google Analytics 4 library in the browser and sends data to the server container.
How consent settings influence tag behavior
The following tabs explain how certain tags behave in the context of consent mode.

Google Analytics 4
Google Ads Conversions
Google Ads Remarketing
Floodlight Counter/Sales
Prerequisite
In order for these tags to work, you need to install the Conversion Linker tag in the server container.

Tag behavior
ad_storage: granted - Floodlight tags work normally.
ad_storage: denied - Blocks HTTP requests and cookie use.
Supported features
URL Passthrough: Works if enabled in client-side Google tag.
Ads Data Redaction: The tag doesn't send a request to store data when ad_storage is denied.
TCF v2.0 Integration: Works if enabled in the web container for the entire page.