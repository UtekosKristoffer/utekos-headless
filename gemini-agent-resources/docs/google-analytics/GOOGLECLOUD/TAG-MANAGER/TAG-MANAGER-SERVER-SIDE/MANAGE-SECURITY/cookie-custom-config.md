Configure and customize cookies

This page is for developers that want to customize cookie settings with the Google tag or Google Tag Manager. If you aren't sure if you need to configure cookies, read Cookies and user identification.

By default, Google tags use automatic cookie domain configuration. Cookies are set on the highest level of domain possible. For example, if your website address is blog.example.com, cookies are set on the example.com domain. If it is detected that you're running a server locally (for example, localhost), cookie_domain is automatically set to 'none', and cookies will use the full domain from the document location.

If you only want to modify cookie expiration or cookie update settings, you can change default cookie settings using the Analytics interface.

For most websites and apps, cookie storage should also be controlled by user consent. User privacy overview introduces the available options for managing user consent.

Note: If you use the Google tag and have multiple products on a page that share cookies, use gtag('set') commands instead of gtag('config') for your cookie configuration settings. Doing so gives you more consistent results.
Change cookie domain
Important: The cookie_domain value must be an ancestor of the current domain, otherwise the cookie will not be set. For example, if your domain is one.two.three.root.com, you may configure the cookie to be set on root.com, but not someotherdomain.com. Setting an incorrect cookie domain may result in no data being sent.
When you use automatic cookie domain configuration, activity is measured across subdomains without any extra configuration.

To make changes to the cookie domain configuration, follow these steps:

gtag.js
Tag Manager
For the Google tag:
In your workspace, open the Tags menu.
Edit an existing Google tag or create a new one.
In the Configuration settings, add a new parameter:

Name: cookie_domain
Value: my.example.com
Save the tag and publish the container.

For Google Ads and Floodlight tags:
Domain settings can be modified from the Conversion Linker tag:

In Tag Manager, open your existing Conversion Linker tag, or create one if the tag doesn't yet exist in your container.
Under Linker Options, click Override cookie settings (advanced)
In the Domain field, enter the highest level domain for which a cookie should be allowed to be set. You can also specify a specific path in the Path field. Only use these settings if you need to limit cookies to a lower-level subdomain or subdirectory.
Rename cookies
To avoid conflicts with other cookies, you may need to change the cookie name.

Important: If the cookie name settings change after users have first visited your site, those visitors will appear as new visitors because the context stored in the non-modified cookies will be lost.
gtag.js
Tag Manager
For the Google tag:
In your workspace, open the Tags menu.
Edit an existing Google tag or create a new one.
In the Configuration settings, add a new parameter:

Name: cookie_prefix
Value: example
Save the tag and publish the container.

For Google Ads and Floodlight tags:
Name prefix settings can be modified from the Conversion Linker tag:

In Tag Manager, open your existing Conversion Linker tag, or create one if the tag doesn't yet exist in your container.
Under Linker Options, click Override cookie settings (advanced)
In the Name prefix field, enter the desired name prefix. Any tags that use these cookies (for example, Google Ads conversion tags) must also be configured to use the same prefix.
Cookie expiration
On each page load, the cookie expiration time is updated to be the current time plus the cookie expiration value set by the Google tag. This means that if cookie expiration is set to one week (604800 seconds), and a user visits using the same browser within five days, the cookie will be available for an additional week, and they will appear as the same visitor in your reports. If that same user instead visited after the original cookie had expired, a new cookie will be created, and their first and second visits will appear as coming from distinct visitors in your reports.

If you set the cookie expiration value to 0 (zero) seconds, the cookie turns into a session based cookie and expires once the current browser session ends.

gtag.js
Tag Manager
For the Google tag:
In your workspace, open the Tags menu.
Edit an existing Google tag or create a new one.
In the Configuration settings, add a new parameter:

Name: cookie_expires
Value: 2419200
Note: A value of 2419200 equals 28 days but you can set any duration you need.
Save the tag and publish the container.

Note: Google Ads and Floodlight cookies set by the Conversion Linker tag don't support cookie_expires at this time. If support for cookie_expires is required, use gtag.js for this tag configuration.
Cookie update
When the cookie_update flag is set to true (the default value), Google tags may update cookies on each page load, and may update the cookie expiration to be set relative to the most recent visit to the site. For example, if cookie expiration is set to one week, and a user visits using the same browser every five days, the cookie expiration will be updated on each visit and so will effectively never expire.

When set to false, cookies are not updated on each page load. This has the effect of cookie expiration being relative to the first time a user visited the site.

gtag.js
Tag Manager
For the Google tag:
In your workspace, open the Tags menu.
Edit an existing Google tag or create a new one.
In the Configuration settings, add a new parameter:

Name: cookie_update
Value: false
Save the tag and publish the container.

Note: Google Ads and Floodlight cookies set by the Conversion Linker tag don't support cookie_update at this time. If support for cookie_update is required, use gtag.js for this tag configuration.