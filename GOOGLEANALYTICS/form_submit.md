# Google Analytics Events

Form interactions

form_start

form_submit

'form_start': the first time a user interacts with a form in a session

'form_submit': when the user submits a form

You can use these two events to see how many users started to fill out a form and compare the information to users who submitted the form.

Note: You can only use the parameters in your reports if you create custom dimensions for them.

form_start

form_id: HTML id attribute of the <form> DOM element
form_name: HTML name attribute of the <form> DOM element
form_destination: URL to which the form is being submitted
form_submit

form_id: HTML id attribute of the <form> DOM element
form_name: HTML name attribute of the <form> DOM element
form_destination: URL to which the form is being submitted
form_submit_text: text of the submit button, if present


Analytics event parameters
The following table lists most of the event parameters from automatically collected events, enhanced measurement events, and recommended events. Enhanced measurement events are collected automatically when enhanced measurement is enabled. The table includes a description of each event parameter and the dimension or metric you can use to see the event parameter in reports and explorations, if a dimension or metric is available.

Note: For more details on the specific data types for each parameter, see our developer reference documentation describing events and their parameters.
form_
Category	Event parameter	Source	Type	Description	Dimension or metric
General	form_destination	Enhanced measurement event	Dimension: text	The URL to which a form is being submitted.	(None)
General	form_id	Enhanced measurement event	Dimension: text	The HTML id attribution of the <form> DOM element.	(None)
General	form_name	Enhanced measurement event	Dimension: text	The HTML name attribute of the <form> DOM element.	(None)
General	form_submit_text	Enhanced measurement event	Dimension: text	The text of the submit button, if present.	(None)


qualify_lead
This event measures when a user is marked as meeting the criteria to become a qualified lead.

Parameters
Name	Type	Required	Example value	Description
currency	string	Yes*	USD	Currency of the value of the event, in 3-letter ISO 4217 format.

* If you set value then currency is required for revenue metrics to be computed accurately.
value	number	Yes*	30.03	The monetary value of the event.

* value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value.
* currency is required if you set value.


generate_lead
This event measures when a lead has been generated (for example, through a form). Log this to understand the effectiveness of your marketing campaigns and how many customers re-engage with your business after remarketing to the customers.

Parameters
Name	Type	Required	Example value	Description
currency	string	Yes*	USD	Currency of the value of the event, in 3-letter ISO 4217 format.

* If you set value then currency is required for revenue metrics to be computed accurately.
value	number	Yes*	30.03	The monetary value of the event.

* value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value.
* currency is required if you set value.
lead_source	string	No	Trade show	The source of the lead.

sign_up
This event indicates that a user has signed up for an account. Use this event to understand the different behaviors of logged in and logged out users.

Parameters
Name	Type	Required	Example value	Description
method	string	No	Google	The method used for sign up.


## Measurement Protocol

generate_lead
This event measures when a lead has been generated (for example, through a form). Log this to understand the effectiveness of your marketing campaigns and how many customers re-engage with your business after remarketing to the customers.

Parameters
Name	Type	Required	Example value	Description
currency	string	Yes*	USD	Currency of the value of the event, in 3-letter ISO 4217 format.

* If you set value then currency is required for revenue metrics to be computed accurately.
value	number	Yes*	30.03	The monetary value of the event.

* value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value.
* currency is required if you set value.
lead_source	string	No	Trade show	The source of the lead.
Send Event
Try this event in the Google Analytics Event Builder


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


working_lead
This event measures when a user contacts or is contacted by a representative.

Parameters
Name	Type	Required	Example value	Description
currency	string	Yes*	USD	Currency of the value of the event, in 3-letter ISO 4217 format.

* If you set value then currency is required for revenue metrics to be computed accurately.
value	number	Yes*	30.03	The monetary value of the event.

* value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value.
* currency is required if you set value.
lead_status	string	No	Started conversations	The status of the lead.
Send Event
Try this event in the Google Analytics Event Builder


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


sign_up
This event indicates that a user has signed up for an account. Use this event to understand the different behaviors of logged in and logged out users.

Parameters
Name	Type	Required	Example value	Description
method	string	No	Google	The method used for sign up.
Send Event
Try this event in the Google Analytics Event Builder


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


qualify_lead
This event measures when a user is marked as meeting the criteria to become a qualified lead.

Parameters
Name	Type	Required	Example value	Description
currency	string	Yes*	USD	Currency of the value of the event, in 3-letter ISO 4217 format.

* If you set value then currency is required for revenue metrics to be computed accurately.
value	number	Yes*	30.03	The monetary value of the event.

* value is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set value.
* currency is required if you set value.
Send Event
Try this event in the Google Analytics Event Builder


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


campaign_details
Use this event to send campaign details that will be applied to events with a timestamp greater than or equal to the timestamp of the campaign_details event.

Note: The campaign_details event won't be visible in Google Analytics reports or DebugView. If you have BigQuery export enabled, this event will be present in your BigQuery event export data.
Parameters
Name	Type	Required	Example value	Description
campaign_id	string	No	google_1234	The campaign id.
campaign	string	No	Summer_fun	The name used to identify a specific promotion or strategic campaign.
source	string	No	google	The campaign traffic source (e.g. google, email, etc.).
medium	string	No	cpc	The campaign medium (e.g. email, cost-per-click, etc.)
term	string	No	summer+travel	The campaign term used with paid search to supply the keywords for ads.
content	string	No	logolink	The campaign content used for A/B testing and content-targeted ads to differentiate ads or links that point to the same URL.
Send Event
Try this event in the Google Analytics Event Builder


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


## 
Set up event parameters

This guide shows you how to set up parameters for recommended events and custom events on your website so you can collect more information from your events. For information about how to add item-scoped parameters, see Measure ecommerce.

Audience
You want to collect more information about your users' activity through the events you've already set up.

You use either the Google tag (gtag.js) or Google Tag Manager on your website. 

gtag.js Tag Manager

This guide uses Google Tag Manager setup:

Understand event parameters
Parameters provide additional information about the ways users interact with your website. For example, when someone views a product you sell, you can include parameters that describe the product they viewed, such as the name, category, and price.

The automatically collected and enhanced measurement events include parameters by default. Google also provides a set of required and optional parameters to include with each recommended event. Additionally, you can add more event parameters when you need them.

Set up event parameters
The following steps show you how to add parameters to a custom event called "Signup newsletter" so that the event includes the label of the button that the user clicked. These steps assume that you've followed the steps in Set up events.

Step 1: Create variables for the event parameters
In Google Tag Manager, go to  Tags.
Open your Google Analytics: GA4 Event tag.
In Tag Configuration, expand Event Parameters.
In Parameter Name, enter a name for the parameter (e.g., button_label).
In Value, click An image of the Add variable icon next to the field to add a variable.
Choose a variable for the value of the event parameter (e.g., choose Click Text for the text of the button clicked).

If you use a data layer object, you can select + in the top right and choose Data Layer Variable.

Save your changes and publish your container.

Your configuration might look something like this:

The tag configuration in Step 1

Step 2: Preview your changes
Before you publish your new event in Tag Manager, click Preview to see the data that's recorded when you click the "Sign up for the newsletter" button.

You can use preview mode to test changes to your container before you publish those changes to your website. Learn more about preview mode

See your events in Analytics
When you are ready to publish your changes, click Submit.



You can see your events and their parameters using the Realtime and DebugView reports. Note that the DebugView report requires some additional configuration before you can use the report. These two reports show you the events users trigger on your website as the events are triggered.

Other parameters require you to create custom dimensions and metrics to see the parameter values in Google Analytics. Whenever you create a custom parameter, you need to create a corresponding custom dimension or metric so you can see that data.