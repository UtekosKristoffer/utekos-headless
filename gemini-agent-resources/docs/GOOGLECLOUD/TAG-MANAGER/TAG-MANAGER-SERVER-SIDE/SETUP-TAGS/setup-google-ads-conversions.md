# Google Ads conversions

Server-side Tag Manager lets you move your Google Ads conversion tracking tags
from the web page to the server. Moving these tags to the server reduces the
amount of code you have to run in the page and helps improve page load speed.
This document describes how to configure your Tag Manager web container and
server container to use Ads conversion tracking.

---

## Before you begin

This document assumes that you have:

- Admin rights in Google Ads and Google Tag Manager
- Set up Google Tag Manager
- Created a server container
- Set up the Google Analytics: GA4 client

---

## Step 1: Set up the Conversion Linker tag

To allow Google Ads to send data to Tag Manager, you need to set up the
**Conversion Linker** tag.

> If you already have a **Conversion Linker** tag configured in your server
> container, you can skip this step.

To set up the **Conversion Linker** tag:

1.  From your server container workspace, open the **Tags** menu on the left
    side of the page.
2.  Click **New** to add a new tag.
3.  Select the **Conversion Linker** tag type.
4.  Set up the trigger that will cause the **Conversion Linker** server-side tag
    to fire. In most cases, the **All pages** trigger is the best option.
5.  Name the tag and click **Save**.

---

## Step 2: Set up a key event

To set up a key event, you need to do two things:

1.  Set up Google Analytics so it recognizes an event as a key event.
2.  Set up a **Google Analytics: GA4 Event** tag in the Tag Manager web
    container to send key events.

> If you already have set up key events, and only need to implement the server
> tag, skip ahead to step 3.

### Set up Google Analytics to recognize custom key events

1.  Open **Google Analytics 4**.
2.  Open the **Admin** menu on the bottom left.
3.  In the property settings list, select **Key Events**.
4.  Click the **New key event** button and add the key event name. This can be a
    recommended event name or a custom event.
5.  Save the event name.

### Set up a key event in Google Tag Manager

> If your key event triggers on a **Page View** event, skip ahead to step 3.

To set up a key event:

1.  Open **Google Tag Manager**.
2.  In your web container workspace, add a **Google Analytics: GA4 Event** tag.
3.  In **Configuration tag**, select the **Google tag** for your website.
4.  Enter the event name that corresponds to the key event.

> **Note:** When passing user-provided data to an event tag, the variable's
> event parameter name must be set to `user_data`. This allows the data to be
> passed to the configuration tag and server-side container when the event tag
> fires, and ensures that the hashed user data and enhanced conversions function
> correctly.

---

## Step 3: Set up the Ads Conversion Tracking tag in the server container

To set up the **Ads Conversion Tracking** tag:

1.  In your server container workspace, open the **Tags** menu on the left side
    of the page.
2.  Click **New** to add a new tag.
3.  Select the **Google Ads Conversion Tracking** tag type.
    > The tag automatically reads the following values from the corresponding
    > ecommerce field: Transaction ID, conversion value, and currency code.
4.  Enter the required conversion information (**Conversion ID** and **label**).
    You can find these values in your Google Ads account.
5.  In the **Triggering** menu, select an existing trigger or create a new
    custom trigger.

#### To trigger the tag on a custom event:

1.  Choose the **Custom Event** trigger.
2.  Enter the event name that matches the one used in the **Google Analytics:
    GA4 Event** tag.

#### To trigger only on specific URLs:

1.  Select the option to trigger on **Some Custom Events**.
2.  Add the **Page URL** variable to equal the URL the tag should trigger on.
3.  Name the tag and click **Save**.

### Optional: Set a conversion value

You can specify a different conversion value. To do this, you need to set up a
variable to pull the data and assign it to your **Ads Conversion Tracking** tag.

> **Note:** The server container encrypts the revenue value to ensure conversion
> data doesn't get exposed when the server transmits data back to the browser.

#### To create a new variable:

1.  In your server container, open the **Variables** menu.
2.  Create a new user-defined variable for the data input (e.g., if you want to
    use a value from a Firestore database, create a `{{Firestore Lookup}}`
    variable).
3.  Specify the data sources for the variable.
4.  Name the variable (e.g., "Profit lookup") and **Save** it.

#### Set up custom conversion values in the Ads Conversion Tracking tag:

1.  In your server container, open the **Tags** menu.
2.  Edit an existing **Google Ads Conversion Tracking** tag or create a new one.
3.  To configure a custom conversion value, specify these two fields:
    - **Conversion Value:** Either enter a fixed amount or specify the variable
      you created before.
    - **Currency Code**
4.  **Save** the tag.

---

## Step 4: Enhanced Conversions

> If you don't use Enhanced Conversions, skip ahead to **Validate your setup**.

### Set up a user-provided data variable

There are 3 ways to implement enhanced conversions in Tag Manager. You only need
to choose one.

| Collection method        | Complexity | Skills                   | Description                                                                                                                                          |
| :----------------------- | :--------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatic collection** | Simple     | No special skills needed | Automatically collects user-provided data based on the code of your website.                                                                         |
| **Manual configuration** | Medium     | HTML and CSS             | Specify select CSS properties or JavaScript variables to collect user-provided data. Use this if you need more control over where to collect inputs. |
| **Code configuration**   | Complex    | Web development          | Add a code snippet on your website that sends hashed customer data for matching. This method is best for maximizing accuracy.                        |

#### Using Automatic Collection:

1.  In your web container, open the **Variables** menu.
2.  Create a new **User-Defined Variable** of the type **User-Provided Data**.
3.  Set the **Type** to **Automatic collection**.
4.  Name the variable (e.g., `My user-defined data`).
5.  Click **Save**.

### Assign the variable to the Google tag

1.  In your web container, open the **Tags** menu.
2.  Edit the **Google tag** you use to send data to the tagging server.
3.  Under **Configuration settings**, add a new Configuration parameter called
    `user_data`.
4.  Set the **Value** to the User-provided Data variable you created (e.g.,
    `{{My user-defined data}}`).
5.  **Save** your changes.
    - _Screenshot of the final Google tag configuration referencing the
      user-provided data variable._

### Configure Server-side Ads Conversion Tracking tag

1.  In your server workspace, open the **Tags** menu.
2.  Edit the **Google Ads Conversion Tracking** tag.
3.  Press **Save** to save your changes.

> **Note:** The Google Ads Conversion Tracking tag, when fired, will send all
> the available conversion data to Google (including any user-provided data). If
> you want to modify or exclude any event parameters before the tag fires,
> configure and use the proper transformations and attach them to your tag.

---

## Step 5: Validate your setup

Once you start sending data with the server container, you can check if it’s
working properly:

1.  Open your website.
2.  In your Google Tag Manager server container, select **Preview**. Tag
    Assistant will start and load your server container.
3.  The **Tags** tab shows you all tags that have fired. Check if the tag you
    configured fired.
4.  The **Console** tab shows any errors that occurred during data transmission.
    Check for errors and resolve them.

For more help with debugging Tag Manager containers see
[preview and debug help](https://support.google.com/tagmanager/answer/6107056).

---
