# Google Ads User-provided Data Event

Server-side Tag Manager lets you move your Google Ads User-provided Data Event
tags from the web page to the server. Moving these tags to the server reduces
the amount of code you have to run in the page, and helps improve page load
speed. This document describes how to configure your Tag Manager web container
and server container to use the Google Ads User-provided Data Event tag.

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

## Step 2: Set up the Google Ads User-provided Data Event tag in the server container

To set up the **Google Ads User-provided Data Event** tag:

1.  In your server container workspace, open the **Tags** menu on the left side
    of the page.
2.  Click **New** to add a new tag.
3.  Select the **Google Ads User-provided Data Event** tag type.
4.  Enter the required conversion information (**Conversion ID**). You can find
    these values in your Google Ads account.
5.  In the **Triggering** menu, select an existing trigger or create a new
    custom trigger.

#### To trigger the tag on a custom event:

- Choose the **Custom Event** trigger.
- Enter the event name that matches the one used in the **Google Analytics: GA4
  Event** tag.

#### To trigger only on specific URLs:

- Select the option to trigger on **Some Custom Events**.
- Add the **Page URL** variable to equal the URL the tag should trigger on.

6.  Name the tag and click **Save**.

---

## Step 3: Configure User data

The tag relies on the user data available in the event, similar to Enhanced
Conversions.

### Set up a user-provided data variable

There are 3 ways in which you can implement enhanced conversions in Tag Manager.
You only need to choose one option to collect user-provided data.

|                       | **Automatic collection**                                                     | **Manual configuration**                                                                                                                        | **Code configuration**                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Collection method** | Automatically collects user-provided data based on the code of your website. | Specify select CSS properties or JavaScript variables to collect user-provided data. Use this if you need control over where to collect inputs. | Add a code snippet on your website that sends hashed customer data for matching. This method is best for maximizing accuracy. |
| **Complexity**        | Simple                                                                       | Medium                                                                                                                                          | Complex                                                                                                                       |
| **Skills**            | No special skills needed                                                     | HTML and CSS                                                                                                                                    | Web development                                                                                                               |

#### Automatic collection

1.  In your web container, open the **Variables** menu.
2.  Create a new **User-Defined Variable** of the type **User-Provided Data**.
3.  Set the **Type** to **Automatic collection**.
4.  Name the variable, for example, `My user-defined data`.
5.  Click **Save**.

#### Manual configuration

1.  In your web container, open the **Variables** menu.
2.  Create a new **User-Defined Variable** of the type **User-Provided Data**.
3.  Set the **Type** to **Manual configuration**.
4.  For the relevant user data field, add a new or existing variable.
    > **Note:** If you already have variables in your data layer (whether using
    > CSS selectors or other variable types), you can select those instead of
    > creating new variables.
5.  To specify an element from the DOM, create a **New Variable > Variable
    Configuration > DOM Element**.
6.  Under **Selection Method**, you can either use a **CSS Selector** or **ID**.
7.  Enter the CSS selector or ID name. You can leave the **Attribute name**
    field blank.
8.  Name and **Save** the DOM Element variable.
9.  Name the User-Provided Data variable, for example, `My user-defined data`.
10. Click **Save**.

#### Code configuration

##### Step 1: Identify and define your enhanced conversions variables

You can either send unhashed data (which Google will hash) or pre-hashed data
(encoded using hex-encoded SHA256). Provide at least an email or phone number.

**To push unhashed data to the data layer:** On your website, store
user-provided data as key-value pairs in a JavaScript variable.

```javascript
var leadsUserData = {
  email: 'name@example.com',
  phone_number: '+11234567890',
  address: {
    first_name: 'John',
    last_name: 'Doe',
    street: '123 Lemon',
    city: 'Some city',
    region: 'CA',
    country: 'US',
    postal_code: '12345'
  }
}
```

Send the user data together with an event using `dataLayer.push()`.

```javascript
<script>
dataLayer.push({
  'event': 'formSubmitted',
  'leadsUserData': {
    'email': 'name@example.com',
    'phone_number': '+11234567890',
    'address': {
      first_name: 'John',
      last_name: 'Doe',
      street: '123 Lemon',
      city: 'Some city',
      region: 'CA',
      country: 'US',
      postal_code: '12345',
    },
  },
});
<script>
```

**To push pre-hashed data to the data layer:** On your website, hash
user-provided data using hex-encoded SHA256. The key for encoded data needs to
start with `sha256_`.

```javascript
{'sha256_email_address':await hashEmail(email.trim()),
}
```

Send the user data together with an event using `dataLayer.push()`.

```javascript
<script>
  dataLayer.push({
    'event': 'formSubmitted',
    'leadsUserData': {
      'sha256_email_address': await hashEmail(email.trim()),
      'sha256_phone_number': await hashPhoneNumber(phoneNumber),
      'address': {
        sha256_first_name: await hashString(firstname),
        sha256_last_name: await hashString(lastname),
        sha256_street: await hashString(streetAddress),
        postal_code: '12345',
      },
    },
});
<script>
```

##### Step 2: Create the user-provided data variable

1.  In your web container, open the **Variables** menu.
2.  Create a new **User-Defined Variable** of the type **User-Provided Data**.
3.  Set the **Type** to **Code**.
4.  For the relevant user data field, click the drop-down menu and select **New
    Variable**.
5.  Under **Choose Variable Type**, select **Data Layer Variable**.
6.  In the **Data Layer Variable**, reference your stored user data (e.g.,
    `leadsUserData`).
7.  Name and **Save** the Data Layer variable.
8.  Name the User-Provided Data variable, for example, `My user-defined data`.
9.  Click **Save**.

### Assign the variable to the Google tag

1.  In your web container, open the **Tags** menu.
2.  Edit the **Google tag** you use to send data to the tagging server.
3.  Under **Configuration settings**, add a new Configuration parameter called
    `user_data`.
4.  Set the **Value** to the User-provided Data variable you created (e.g.,
    `{{My user-defined data}}`).
5.  **Save** your changes.

---

## Step 4: Validate your setup

Once you start sending data with the server container, you can check to see if
it’s working properly by following these steps:

1.  Open your website.
2.  In your Google Tag Manager server container, select **Preview**. Tag
    Assistant will start and load your server container.
3.  The **Tags** tab shows you all tags that have fired. Make sure to check if
    the tag you configured fired.
4.  The **Console** tab shows any errors that occurred during the data
    transmission to the server container. Check for errors and resolve them.

For more help with debugging Tag Manager containers see
[preview and debug help](https://support.google.com/tagmanager/answer/6107056).
