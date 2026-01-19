# Send Data to Server-Side Tag Manager

This article describes the different ways to send events to a server-side container. If you need more background information, take a look at how server-side tagging works.

## Topics Covered

This article discusses how to:

-   Send data from a website to your server-side container
-   Send additional data to a server container
-   Receive data in your server-side container
-   Send data from sources other than websites

---

## Implementation: Google Tag Manager

### Optional: Send Additional Parameters with Each Event

You can send two types of additional parameters:

1.  **Configuration-level parameters:** Influence how your Google tag behaves and can only be set on the Google tag level
2.  **Event-level parameters:** Specify additional information about an event and can be set for all events, select events, or `page_view` events

### Setup Recommendations

We recommend using GA4 tag on a web page to send data to the server container. This tag can use different transport methods to ensure the best delivery rate of the events. Such methods include but are not limited to:

-   Image pixel
-   Fetch API
-   XHR
-   Service worker that runs in an iframe loaded from your server container domain

#### Content Security Policy (CSP) Requirements

To ensure that all methods are supported, check the following:

| Directive     | Content                | Purpose                       |
| ------------- | ---------------------- | ----------------------------- |
| `img-src`     | `[SERVER_CONTAINER_URL]` | Measurement requests          |
| `connect-src` | `[SERVER_CONTAINER_URL]` | Measurement requests          |
| `frame-src`   | `[SERVER_CONTAINER_URL]` | Service worker implementation |

**Additional Requirement:** `X-Frame-Options` must not restrict iframes from being loaded from the server container URL.

Consult with [https://developers.google.com/tag-platform/security/guides/csp](https://developers.google.com/tag-platform/security/guides/csp) for specific policies per product.

---

## 2. Receive Data in Your Server-Side Container

When you send HTTP request to a server container, a client has to claim that request.

**Key Term:** "Clients" are adapters between the software running on a user's device and your server-side Tag Manager container. They receive measurement data from a device, transform that data into one or more events, process the data in the container, and package the results to be sent back to the device.

### View Available Clients

1.  Open Google Tag Manager
2.  Open your server container
3.  In the navigation bar on the left, click **Clients**
    -   The GA4 client is pre-installed on your server-side container by default
4.  Click the name of the client to view or edit details

### Optional Client Settings

In most cases, the client will require no modifications. However, your use case might be different and you might want to edit one of the following settings:

#### Priority

Determines the order in which clients will run. Higher numbers run first, and the first client that matches the incoming request will become the active client for that request.

#### Activation Criteria

Activation criteria define when the client will respond to requests:

**Default gtag.js paths for specific IDs:** Use this setting to enable `gtag.js` JavaScript serving through your server container URL. When enabled, this client will activate in response to requests to the default `gtag.js` request paths, e.g. `/gtag/js?id=TAG_ID`. Click **Add Measurement ID** to add one or more destination IDs.

### Optional: Receive Additional Data in Server-Side Tag Manager

If you are sending additional parameters, you need to set up the Google Analytics 4 client in your server container to parse the additional parameters and create event data out of them.

Some server tags will include the additional parameters in their outbound requests with no setup. To exclude those parameters, create a Transformation to remove the value.

#### To Use Additional Parameters in Other Tags

1.  In your server container, click on **Variables** in the left navigation
2.  Create a **New User-defined Variable**
3.  In **Variable Configuration**, select the variable type **Event Data**
4.  In **Key Path**, enter the name of the parameter
5.  Give your variable a name and **Save**

Now you can use the event parameter in any other tag within your server container.

---

## 3. Optional: Send Data from Sources Other Than Websites

The Google Analytics Measurement Protocol can be used to enable server-side tagging support from sources such as mobile apps and server-to-server applications. This option lets you send events to your container in the Measurement Protocol format. The container sends those events to Google Analytics using the same mechanism as all other SGTM events.

**Note:**

-   This option doesn't send events to the Measurement Protocol endpoint
-   This option doesn't support all the features of the Measurement Protocol endpoint, like deriving geographic and device information from tagging events

### Mobile Apps

To get your Android or iOS app to send data to your server container, you will create a custom image tag and configure it to use the Measurement Protocol:

#### Setup Steps

1.  In your mobile container (Android or iOS), click **Tags > New**
2.  In **Tag Configuration** select the **Custom Image** tag type
3.  Set the value of **Image URL** to a pixel image on the server container at the path in the Measurement Protocol client that you specified earlier. Append any desired Measurement Protocol parameters to the end of your pixel URL:

```
https://custom.example.com/app?v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
```

4.  Deselect **Enable Cache Busting**
5.  Save the tag and publish the container
6.  In your server-side container, click **Clients > New**
7.  In **Client Configuration**, select the **Measurement Protocol** client type
8.  Set **Activation Path** to the path of your app's collection endpoint
9.  Save the client configuration and publish the server-side container

### Server-to-Server Apps

To send measurement protocol data to your server container, replace the `www.google-analytics.com` hostname with the domain name of your server container.

**Example:**

```http
POST /batch HTTP/1.1
Host: collection.example.com

v=1&tid=TAG_ID&cid=555&t=screenview&an=myApp&version=1.6.2&aid=com.foo.myapp&cd=home
```

#### Configure Measurement Protocol Client

To receive Measurement Protocol hits, configure your server-side Tag Manager installation with a Measurement Protocol client:

1.  In your server-side container, click **Clients > New**
2.  In **Client Configuration**, select the **Measurement Protocol** client type
3.  Set **Activation Path** to the path of your server's endpoint
4.  Save the client configuration and publish the container

---

## Next Steps

To send data in a true first-party context, you need to serve Google scripts, such as the Google Analytics library, from your own servers.