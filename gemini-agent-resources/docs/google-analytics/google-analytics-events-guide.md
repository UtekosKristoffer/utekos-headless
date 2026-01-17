# Google Analytics Events Guide

This document provides a guide to various Google Analytics events, their parameters, and how to set them up.

## Form Interactions

The following events are related to form interactions.

### `form_start`

*   **Triggered:** The first time a user interacts with a form in a session.
*   **Use case:** To see how many users started to fill out a form.

### `form_submit`

*   **Triggered:** When the user submits a form.
*   **Use case:** To compare the number of users who started a form with those who submitted it.

> **Note:** You can only use the parameters in your reports if you create custom dimensions for them.

### Form Event Parameters

| Category | Event parameter    | Source                   | Type             | Description                                          | Dimension or metric |
| :------- | :----------------- | :----------------------- | :--------------- | :--------------------------------------------------- | :------------------ |
| General  | `form_destination` | Enhanced measurement event | Dimension: text  | The URL to which a form is being submitted.          | (None)              |
| General  | `form_id`          | Enhanced measurement event | Dimension: text  | The HTML id attribution of the `<form>` DOM element. | (None)              |
| General  | `form_name`        | Enhanced measurement event | Dimension: text  | The HTML name attribute of the `<form>` DOM element. | (None)              |
| General  | `form_submit_text` | Enhanced measurement event | Dimension: text  | The text of the submit button, if present.           | (None)              |

## Recommended Events

Here are some recommended events and their parameters.

### `qualify_lead`

This event measures when a user is marked as meeting the criteria to become a qualified lead.

**Parameters:**

*   `currency` (string, **required** if `value` is set): Currency of the value of the event, in 3-letter ISO 4217 format.
*   `value` (number, **required** for meaningful reporting): The monetary value of the event.

### `generate_lead`

This event measures when a lead has been generated (for example, through a form).

**Parameters:**

*   `currency` (string, **required** if `value` is set): Currency of the value of the event, in 3-letter ISO 4217 format.
*   `value` (number, **required** for meaningful reporting): The monetary value of the event.
*   `lead_source` (string, optional): The source of the lead.

### `sign_up`

This event indicates that a user has signed up for an account.

**Parameters:**

*   `method` (string, optional): The method used for sign up.

## Measurement Protocol

Here are examples of how to send events using the Measurement Protocol.

### `generate_lead`

```javascript
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "generate_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "lead_source": "Trade show"
      }
    }]
  })
});
```

### `working_lead`

This event measures when a user contacts or is contacted by a representative.

**Parameters:**

*   `currency` (string, **required** if `value` is set)
*   `value` (number, **required**)
*   `lead_status` (string, optional)

```javascript
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "working_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "lead_status": "Started conversations"
      }
    }]
  })
});
```

### `sign_up`

```javascript
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "sign_up",
      "params": {
        "method": "Google"
      }
    }]
  })
});
```

### `qualify_lead`

```javascript
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "qualify_lead",
      "params": {
        "currency": "USD",
        "value": 30.03
      }
    }]
  })
});
```

### `campaign_details`

Use this event to send campaign details.

> **Note:** The `campaign_details` event won't be visible in Google Analytics reports or DebugView.

**Parameters:**

*   `campaign_id` (string, optional)
*   `campaign` (string, optional)
*   `source` (string, optional)
*   `medium` (string, optional)
*   `term` (string, optional)
*   `content` (string, optional)

```javascript
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "campaign_details",
      "params": {
        "campaign_id": "google_1234",
        "campaign": "Summer_fun",
        "source": "google",
        "medium": "cpc",
        "term": "summer+travel",
        "content": "logolink"
      }
    }]
  })
});
```

## Set up event parameters

This guide shows you how to set up parameters for recommended events and custom events on your website.

### Step 1: Create variables for the event parameters

1.  In Google Tag Manager, go to **Tags**.
2.  Open your Google Analytics: GA4 Event tag.
3.  In **Tag Configuration**, expand **Event Parameters**.
4.  In **Parameter Name**, enter a name for the parameter (e.g., `button_label`).
5.  In **Value**, click the "Add variable" icon next to the field to add a variable.
6.  Choose a variable for the value of the event parameter (e.g., choose **Click Text** for the text of the button clicked).
7.  Save your changes and publish your container.

### Step 2: Preview your changes

Before you publish your new event in Tag Manager, click **Preview** to see the data that's recorded.

### Step 3: See your events in Analytics

You can see your events and their parameters using the **Realtime** and **DebugView** reports. Note that the DebugView report requires some additional configuration. Whenever you create a custom parameter, you need to create a corresponding custom dimension or metric so you can see that data.