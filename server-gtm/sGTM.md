# Configuring the Google Analytics 4 Data Stream

A server container can digest any type of HTTP request dispatched from an online
source. However, the recommended way of collecting data is through a Google tag
or a gtag.js event running in the web browser. In this part of the course,
you'll learn how to set up a Google tag on the web page, using Tag Manager.

## Parallel Measurement

If you already have a Google Analytics 4 tracking setup on the website, keep it
as it is for now. Don't change your current tracking setup to send data to the
server container yet.

Instead, set up a new Google Analytics 4 property for the server-side dispatch.
That way you can copy the existing tags one-by-one, until you have a dual-tagged
Google Analytics 4 setup on the website.

**Dual-tagging** means that you essentially duplicate your existing tagging to
collect data to a GA4 property for client-side hits and to a GA4 property for
server-side hits.

If your intent is to move all data collection to go through your server
container, you need to wait until your server-side measurement is at parity with
your client-side measurement. At that point you modify your tags to collect to
the server, removing your dual-tagging setup in the process.

You can, of course, choose to collect some data directly from the browser to
vendors and have some pass through the server container. This type of hybrid
collection is very common.

## About the Google Analytics Client

First, you need to set up a client in the server container. A **client** is a
Tag Manager resource type that intercepts certain types of incoming HTTP
requests and generates events that are passed to a destination, like Google
Analytics 4.

In this case, the HTTP request is a Google Analytics 4 event, so you need to
configure the built-in **Google Analytics: GA4** client. You only need one GA4
client.

> **Diagram showing how the GA4 client serves as a library and a proxy for GA4
> events.**

The GA4 client has a dual purpose:

1. It serves as a **proxy for Google Analytics 4 library** that loads in the
   browser. GA4, just like any other analytics service running in the browser,
   requires a JavaScript library to work. Instead of the browser loading this
   library directly from Google's content distribution network, you can
   configure the GA4 client to allow the library to be loaded through your
   server container instead.

2. The client also serves as a **proxy for the GA4 event requests** themselves.
   Instead of the browser sending the events directly to Google's analytics
   servers, they are first sent to the server container, where the GA4 client
   intercepts them and dispatches them onward to Google servers (and any other
   destinations you like).

## Setting Up the GA4 Client

To set up the GA4 client in the server, follow the next four steps.

### 1. Configure the Client

To configure the GA4 client:

1. In your server container, open **Clients**.
2. Click on the **GA4 client** to open its configuration.
3. Set up your GA4 client with the following parameters. Save when you are done.

#### Configuration Parameters

| #   | Parameter                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Priority**                          | Only one client can claim an incoming request, but there can be multiple clients trying to claim the same request. The Priority setting establishes the order in which clients get to evaluate the request. For example, if you have a client with the priority of 100, it will get a chance to claim the request before another client with a lower number (99 or less).<br><br>In this case, you only have one client that's interested in Google Analytics 4 requests, so you don't have to change the default value of **0**. |
| 2   | **Default GA4 paths**                 | **If the box is checked:** The GA4 client will activate when the incoming request matches a GA4 event request URL. These requests typically have path signatures like `/collect` and `/g/collect` and `/j/collect`.<br><br>**If the box is not checked:** The Client will not claim incoming GA4 events.<br><br>Leave this option **checked**, as parsing incoming event requests is one of the key purposes of this client.                                                                                                      |
| 3   | **Cookies and Client Identification** | Set the value to **JavaScript Managed**, as that's the only method that will work until you change the domain settings of your server container.<br><br>The GA4 client can utilize a server-managed cookie for GA4 client identification in first-party contexts, which you set up later in the course.                                                                                                                                                                                                                           |

### 2. Configure the Tag

Next, you'll need to create a **Google Analytics: GA4** tag in the server
container.

The client parses the incoming HTTP request into an event data object. The tag's
purpose is to take this event data object, map it to the correct format, and
then dispatch it to the Google Analytics 4 servers.

1. In your server container, navigate to **Tags** and create a **New Tag**.
2. Click on the **Tag Configuration** window to open the tag selector. Choose
   **Google Analytics: GA4** from the list.
3. Leave all the fields with their default values.

By default, the tag will inherit all the relevant fields and parameters from the
event data object created by the client. The incoming Google Analytics 4 request
passes through the Google Analytics: GA4 client, and the tag inherits the
Measurement ID and event parameters.

### 3. Add a Trigger to the Tag

Next, establish when this tag should fire. The Google Analytics 4 client parses
the incoming request into an event data object, and the tag will inherit its
values. Therefore, the tag needs to fire whenever the GA4 client generates an
event data object.

To set up the trigger:

1. In the tag settings, click the **Triggering** area to open the trigger
   selection overlay.
2. Because the only pre-built trigger (All Pages) isn't sufficient for our need
   to handle all events (and not just page views), we'll need to create a new
   trigger.
3. To create a new trigger, click the **+** icon in the top right corner.
4. In the overlay, click the **Trigger Configuration** area to choose the
   trigger type.
5. Choose **Custom** from the list. This trigger type, by default, fires the tag
   when any event is generated by a server-side client. You need to modify it a
   little to make sure that only events generated by our GA4 client will be able
   to fire the tag.

   > **Tip:** You could just let all events fire the tag because the assumption
   > at this time is that you'll only be collecting GA4 requests. However, since
   > a server container can accumulate costs for computation and network
   > traffic, it's better to set limits to what it can do as early as possible,
   > even during testing.

6. Select **Some Events** to enable the list of activation conditions for this
   trigger.
7. In the list of available Variables, you'll see **Event Name** pre-selected.
   Click that selector and select **Choose Built-In Variable** from the list.
8. To automatically return the name of the client that generated the event,
   select the **Client Name** variable.
9. The name of the client you configured earlier was **GA4**, so set the
   condition accordingly.

   > **Note:** The name of the client is **GA4**. The type of the client is
   > **Google Analytics: GA4**. The Client Name variable returns the name and
   > not the type of the client.

10. **Result:** Your trigger should look like this:
    - **Client Name** equals **GA4**

11. Save the trigger and name it descriptively, for example **"All GA4
    Events"**.
12. You should now be back in the tag settings, with the new trigger in its
    place. Save the tag and name it descriptively, for example **"GA4"**.

**Result:** Your tag is now configured with the "All GA4 Events" trigger.

### 4. Configure a Google Tag in the Web Container

You can configure Google Analytics 4 using Tag Manager or gtag.js.

To establish data flow from your web container to GA4, you need to set up a
Google tag:

1. In your **server container**, click the **Container ID (GTM-XXXXXX)** in the
   top navigation bar to open the container information overlay.
2. Note of the **Default Url** value of your server container. You will need
   this shortly. This is the URL to which your browser tag needs to send the
   requests.
3. In the website's **web container**, open the **Tags** menu.
4. Create a **New tag** of the type **Google tag**.
5. In **Tag ID**, supply the tag ID of your Google tag. [Where can I find my
   Google tag ID?]
6. In the section **Configuration settings**, add the following parameters:
   - **Name:** `server_container_url`
   - **Value:** Enter the URL you noted in step 2.
7. Add a trigger to this tag as you normally would in your Google Tag Manager
   process. For example, the **All Pages** trigger loads the tag on page load
   and then sends all your events to the server container.

## Summary

Great job! You've set up the Google Analytics 4 to work with your server-side
setup.

Next, you'll learn the tools verify your setup and debug when needed.
