# Enhanced Measurement Events

Discover how to enable and disable enhanced measurement events and learn more about which parameters are collected for each event.

Enhanced measurement lets you measure interactions with your content by enabling options (events) in the Google Analytics interface. No code changes are required. When you enable these options for a web data stream, your Google Analytics tag starts sending events right away.

Before turning on the enhanced measurement feature, be sure you understand each option and what enhanced data will be collected. You can also turn off specific measurement options in settings.

> You're required to ensure that no [personally identifiable information](https://support.google.com/analytics/answer/7686480) is collected.

## Enable or disable enhanced measurement events

1.  In [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks), under **Data collection and modification**, click [Data streams](https://analytics.google.com/analytics/web/#/?pagename=admin-streams&utm_source=gahc&utm_medium=dlinks).
    > **Note:** The previous link opens to the last Analytics property you accessed. You must be signed in to a [Google Account](https://support.google.com/analytics/answer/27441) to open the property. You can [change the property](https://support.google.com/analytics/answer/12813202) using the property selector. You must be an [Editor or above](https://support.google.com/analytics/answer/9305587) at the property level to enable or disable enhanced measurement events.
2.  Click the name of your data stream.
3.  Under **Enhanced measurement**, slide the switch On to enable all options.
    Click **Settings** to edit individual options as needed.

![Enable enhanced measurement slider][image2]

If you use [the Google tag](https://support.google.com/analytics/answer/11994839) on your website, you also need to make sure that each event is enabled for automatic event detection for your Google tag. By default, all event types are enabled. [Learn more about your Google tag settings](httpss://support.google.com/analytics/answer/12131703#Event&zippy=%2Cmanage-automatic-event-detection)

## Events measurement and parameters

The following table explains when events are triggered, and which parameters are collected for each event. You can find enhanced data about each triggered event in the Events report within [the Engagement topic](https://support.google.com/analytics/answer/10999789). Click the event name in the report for more information on the event.

To understand each event parameter listed below and how each parameter updates a dimension or metric in Google Analytics, see [Google Analytics event parameters](https://support.google.com/analytics/table/13594742).

| Measurement option / event                  | Triggered...                                                                                                                                                                                            | Parameters                                                                                                                                                                                                                                                                                            |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form interactions** (`form_start`, `form_submit`) | **`form_start`**: the first time a user interacts with a form in a session.<br>**`form_submit`**: when the user submits a form.<br><br>You can use these two events to see how many users started to fill out a form and compare the information to users who submitted the form.<br><br>**Note**: You can only use the parameters in your reports if you [create custom dimensions](https://support.google.com/analytics/answer/10075209) for them. | **`form_start`**<br>- `form_id`: HTML id attribute of the `<form>` DOM element<br>- `form_name`: HTML name attribute of the `<form>` DOM element<br>- `form_destination`: URL to which the form is being submitted<br><br>**`form_submit`**<br>- `form_id`: HTML id attribute of the `<form>` DOM element<br>- `form_name`: HTML name attribute of the `<form>` DOM element<br>- `form_destination`: URL to which the form is being submitted<br>- `form_submit_text`: text of the submit button, if present |
