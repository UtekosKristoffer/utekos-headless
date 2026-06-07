# What is our On-site messaging JavaScript library?

The JavaScript library delivers the core functionality of On-site messaging.

The On-site messaging JavaScript library is responsible for:

- Communicating with On-site messaging to deliver messaging for placements.
- Optimising user experience with a cache layer.
- Handling interstitial operations to allow user interaction without affecting the website.

In the
[installation step](https://docs.klarna.com/conversion-boosters/on-site-messaging/additional-resources/on-site-messaging-javascript-library/)
of On-site messaging, you add the JavaScript library snippet to your website's source code.

```html
<script
  async
  data-environment="playground | production"
  src="https://js.klarna.com/web-sdk/v1/klarna.js"
  data-client-id="<your client id>"
></script>
```

_An example of the On-site messaging JavaScript library snippet for Europe._

| Attribute           | Description                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`               | The source URL of the On-site messaging installation script. The URL differs for playground and production environments and regions.                                     |
| `data-environment ` | Specify the environment, either `production` or `playground`. The value is optional and the default value is `production`.                                               |
| `async`             | Makes loading the script asynchronous and non-blocking.                                                                                                                  |
| `data-client-id`    | Your individual On-site messaging identifier, it can be found in the Merchant portal. If you don't have access to the Merchant portal, ask your delivery manager for it. |

## How the library works

The flow of the On-site messaging JavaScript library varies depending on the functions it's called on to
perform. Below is a high-level summary of the process:

### 1. Scan the DOM tree for placements

The library looks for placement tags in the DOM tree. An ad server matches the content to the placement tag ID
and returns the content that will be rendered in the tag.

### 2. Listen for interstitials

Many ads will contain interstitial events that are initiated when a user clicks a call-to-action. The library
listens for those events and renders the interstitial on-click.

## How can I migrate to the new On-site messaging integration?

We've simplified our integration, so you can install On-site messaging across different markets faster, manage
your placements more easily, and benefit from upcoming feature improvements.

**\[INFO]**

You can find the migration guide in the Merchant portal under \*\*On-site messaging\*\* > \*\*Updates\*\* >
\*\*Update On-site messaging\*\*.

If you're using one of our platforms, you can find further information in the related platform documentation:

- [BigCommerce](https://x.klarnacdn.net/plugins/Klarna%20On-Site%20Messaging%20on%20BigCommerce%20-%20Support%20Guide.pdf)
- [WooCommerce](https://docs.krokedil.com/article/259-klarna-on-site-messaging)
- [Shopify](https://apps.shopify.com/klarna-on-site-messaging)

Deprecation timeline:

As of **February 28, 2022**, we no longer provide feature updates and the old integration is in deprecation
mode. We'll only fix potential bugs.

Starting **March 31, 2023**, we'll stop displaying On-site messaging on your website.

## Iframe deprecation

Currently, OSM supports the use of iframe as a fallback for browsers that don't support shadowDOM.

The use of iframe has several drawbacks, including:

- Poor performance due to the need to create a separate document and rendering context for each iframe.
- Limited ability to style and interact with the content within the iframe.

For these reasons the OSM team had decided to switch to shadowDOM a few years ago and use iframe only as a
fallback for browsers that don't support shadowDOM.

ShadowDOM offers several benefits, including:

- Improved performance, as it allows us to attach an isolated DOM tree to an element without the overhead of
  creating a new document and rendering context.
- Greater control over styling and interacting with the embedded content.

Given that all the major browsers support shadowDOM we have decided to drop support of iframe, on March 31,
2023 we'll stop displaying ads in old browsers that don't support shadowDOM, for example, Internet Explorer 11
and older. ⚛️React Not Detected React is not detected on this page. Please ensure you're visiting a React
application.
