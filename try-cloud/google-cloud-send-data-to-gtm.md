# Send Data to Server-Side Tag Manager

This article describes the different ways to send events to a server-side
container. For background information, see how server-side tagging works.

## Topics Covered

- Send data from a website to your server-side container
- Send additional data to a server container
- Receive data in your server-side container
- Send data from sources other than websites

## Prerequisites

Before you begin, ensure you have:

- Set up a server container in Tag Manager
- Set up a tagging server

---

## 1. Send Data from a Website to Your Server-Side Container

You can route data through a server-side implementation via **Tag Manager** or
**gtag.js**. Choose your implementation option based on your needs.

### Implementation Options

- **Tag Manager**
- **gtag.js**

### Optional: Send Additional Parameters with Each Event

You can send two types of additional parameters:

1. **Configuration-level parameters**: Influence how your Google tag behaves
   (set at Google tag level only)
2. **Event-level parameters**: Specify additional information about an event
   (can be set for all events, select events, or `page_view` events)

### Setup Recommendations

We recommend using the **GA4 tag** on a web page to send data to the server
container. This tag supports multiple transport methods to ensure optimal event
delivery:

- Image pixel
- Fetch API
- XHR
- Service worker (runs in an iframe loaded from your server container domain)

#### Content Security Policy (CSP) Requirements

To ensure all methods are supported, configure the following CSP directives:

| Directive     | Content                  | Purpose                       |
| ------------- | ------------------------ | ----------------------------- |
| `img-src`     | `[SERVER_CONTAINER_URL]` | Measurement requests          |
| `connect-src` | `[SERVER_CONTAINER_URL]` | Measurement requests          |
| `frame-src`   | `[SERVER_CONTAINER_URL]` | Service worker implementation |

**Note**: `X-Frame-Options` must not restrict iframes from being loaded from the
server container URL.

For specific policies per product, consult the
[Tag Platform Security Guide](https://developers.google.com/tag-platform/security/guides/csp).

---

## 2. Receive Data in Your Server-Side Container

When you send an HTTP request to a server container, a **client** must claim
that request.

> **Key Term**: "Clients" are adapters between the software running on a user's
> device and your server-side Tag Manager container. They receive measurement
> data from a device, transform that data into one or more events, process the
> data in the container, and package the results to be sent back to the device.

### View Available Clients

1. Open **Google Tag Manager**
2. Open your server container
3. In the left navigation bar, click **Clients**
4. The **GA4 client** is pre-installed by default
5. Click the client name to view or edit details

### Optional Client Settings

In most cases, the client requires no modifications. However, you may need to
edit:

- **Priority**: Determines the order in which clients run. Higher numbers run
  first. The first client that matches the incoming request becomes the active
  client for that request.

- **Activation Criteria**: Defines when the client will respond to requests:
  - **Default gtag.js paths for specific IDs**: Enables gtag.js JavaScript
    serving through your server container URL. When enabled, the client
    activates in response to requests to default gtag.js request paths (e.g.,
    `/gtag/js?id=TAG_ID`). Click **Add Measurement ID** to add one or more
    destination IDs.

### Optional: Receive Additional Data in Server-Side Tag Manager

If you are sending additional parameters, set up the **Google Analytics 4
client** in your server container to parse the additional parameters and create
event data.

Some server tags include additional parameters in outbound requests with no
setup. To exclude those parameters, create a **Transformation** to remove the
value.

#### Use Additional Parameters in Other Tags

1. In your server container, click **Variables** in the left navigation
2. Create a **New User-defined Variable**
3. In **Variable Configuration**, select variable type **Event Data**
4. In **Key Path**, enter the parameter name
5. Give your variable a name and **Save**

Now you can use the event parameter in any other tag within your server
container.

---

## 3. Optional: Send Data from Sources Other Than Websites

The **Google Analytics Measurement Protocol** enables server-side tagging
support from sources such as mobile apps and server-to-server applications. This
option sends events to your container in the Measurement Protocol format. The
container sends those events to Google Analytics using the same mechanism as all
other SGTM events.

**Note**:

- This option does **not** send events to the Measurement Protocol endpoint
- This option does **not** support all features of the Measurement Protocol
  endpoint, such as deriving geographic and device information from tagging
  events

### Mobile Apps

To configure your Android or iOS app to send data to your server container:

1. In your mobile container (Android or iOS), click **Tags > New**
2. In **Tag Configuration**, select the **Custom Image** tag type
3. Set **Image URL** to a pixel image on the server container at the path in the
   Measurement Protocol client. Append desired Measurement Protocol parameters
   to the end of your pixel URL:
   ```
   https://custom.example.com/app?v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
   ```
4. Deselect **Enable Cache Busting**
5. **Save** the tag and publish the container
6. In your server-side container, click **Clients > New**
7. In **Client Configuration**, select the **Measurement Protocol** client type
8. Set **Activation Path** to the path of your app's collection endpoint
9. **Save** the client configuration and publish the server-side container

### Server-to-Server Apps

To send Measurement Protocol data to your server container, replace the
`www.google-analytics.com` hostname with the domain name of your server
container. For example:

```http
POST /batch HTTP/1.1
Host: collection.example.com

v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
```

#### Configure Measurement Protocol Client

1. In your server-side container, click **Clients > New**
2. In **Client Configuration**, select the **Measurement Protocol** client type
3. Set **Activation Path** to the path of your server's endpoint
4. **Save** the client configuration and publish the container

---

## Next Steps

To send data in a true first-party context, serve Google scripts (such as the
Google Analytics library) from your own servers.
