# Manage privacy settings

This page explains how to disable privacy-related features with the Google tag. For an overview of all privacy-related settings, read [User privacy overview](https://developers.google.com/tag-platform/tag-framework/guides/privacy).

## Privacy parameters

Use the following parameters to enable or disable privacy features such as personalization and signals.

### Implementation: Google Tag Manager

| Privacy control                      | Compatible tag templates         | Description                                                                                                                                                                                                                                                                | How to validate on the client side                                                                                                                                    |
| :------------------------------------ | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allow_google_signals`               | Google tag                       | Set in "Configuration settings". No effect when not set or set to `true`. When set to `false`, events sent from the tag will not be used for ads personalization and demographics and interests reporting                                                                       | No effect when not set or set to `true`. When set to `false`, all join beacons are suppressed.                                                                        |
| `allow_ad_personalization_signals`   | Google tag                       | Set in "Configuration settings". When set to `true`, events sent from the tag will be eligible for ads personalization. When set to `false`, events sent from the tag will not be used for ads personalization, but they can still be used for demographics and interests reporting. | **Note**: If your website uses the parameter `allow_ad_personalization_signals`, ad personalization only happens when `allow_ad_personalization_signals` is set to `true` and the end-user grants consent to `ad_personalization`. No effect when not set or set to `true`. When set to `false`, include an `&npa=1` parameter on all beacons. |
| `restricted_data_processing`         | Google Ads Conversion Tracking   | Set it in the control "Enable Restricted Data Processing" in Tag Manager's Google Ads Conversion Tracking tag. No effect when not set or set to `false`. When set to `true`, Google will limit how it uses the events sent from the tag. Certain features will be unavailable, including adding users to remarketing lists, adding users to similar audience remarketing seed lists, and related functionality. | No effect when not set or set to `false`. When set to `true`, an `&rdp=1` parameter is included in beacons. When set to `false`, an `&rdp=0` parameter is included in beacons. |

## Disable analytics and advertising features

Because advertising features can be enabled through your Google Analytics admin settings, there may be cases where you need to turn them off programmatically. If you've configured Connected Site Tags, you'll need to follow these instructions if you wish this signal to propagate to your Connected Site Tags.

### Turn off all advertising features

These configurations give you the ability to turn off advertising, reporting, and remarketing features, and overrides any property settings established in the Google Analytics user interface.

To turn off all advertising features with the Google tag for Google Analytics 4, set `allow_google_signals` to `false`:

#### Implementation: Google Tag Manager

To turn off all advertising features across all properties, use `gtag.js`.

To turn off advertising features with the Google tag on a specific Google Analytics 4 property, edit the `config` command for the given `TAG_ID` and set `allow_google_signals` to `false`:

1.  In your workspace, open the **Tags** menu.
2.  Edit the Google tag you want to turn off advertising features for.
3.  In **Configuration settings**, add the following parameter:
    -   **Name**: `allow_google_signals`
    -   **Value**: `false`
4.  Save the tag.

Repeat these steps for each Google tag that should not participate in advertising features.

> **Tip**: You can reuse configuration setting parameters with variables.

### Turn off advertising personalization

There are a few ways to programmatically control whether Analytics data should be used for personalized advertising:

-   **Recommended**: Dynamically enable or disable personalization based on the user's choice by integrating Google's consent mode API.
-   **Existing implementations**: Control ad personalization per website.
-   For an entire Google Analytics property: Disable ads personalization per geographical region in your Analytics property.

#### Control ad personalization per website

Google's consent mode API is the recommended way to enable and disable personalized advertising. If your website doesn't use consent mode yet, you can control personalization with the following parameter.

You can completely disable advertising personalization features. Setting the `allow_ad_personalization_signals` parameter applies the setting to all products configured through the Google tag, and an `npa=1` parameter is added to the tag URL to indicate that only non-personalized ads are allowed.

To turn off all advertising personalization with the Google tag, set `allow_ad_personalization_signals` to `false`:

#### Implementation: Google Tag Manager

To turn off all advertising features across all properties, use `gtag.js`.

To turn off advertising personalization with the Google tag on a specific Google Ads, Google Analytics, or Floodlight configuration, edit the `config` command for the given `TAG_ID` and set `allow_ad_personalization_signals` to `false`:

1.  Open your Google Analytics tag for editing.
2.  Click **Fields to Set**.
3.  Click **Add Row**.
4.  For **Field Name**, enter `allow_ad_personalization_signals`, and for **Value** enter `false`.

### Turn off Google Analytics

In some cases, it may be necessary to turn off Google Analytics. For example, you might do this if your site's privacy policy provides an option for the user to opt-out of Google Analytics.

The `gtag.js` library includes a `window['ga-disable-MEASUREMENT_ID']` property that, when set to `true`, turns off the Google tag from sending data. When a product attempts to set a cookie or send data back to the Google Analytics servers, it will first check if this property is set, and will take no action if the value is set to `true`.

#### Implementation: Google Tag Manager

To prevent the Google Analytics 4 tag from firing, use a trigger condition to check if a user has opted out, and fire the tag based on the value of the trigger condition. For example, here is a configuration that uses a first-party cookie to determine if it can fire a Google Analytics 4 tag. These instructions assume that you have already created a Google Analytics 4 tag.

> **Note**: This method does not use `window['ga-disable-MEASUREMENT_ID']`, but instead provides a straightforward solution tailored for Tag Manager implementations.

1.  In your page's JavaScript source, set a cookie called `"google-analytics-opt-out"`, give it a value of `true`, and set it to expire at some date far into the future. For example:

    ```javascript
    document.cookie = 'google-analytics-opt-out=true; expires=Mon, 1 Jan 2170 23:59:59 UTC; path=/';
    ```

2.  In Tag Manager, create a new variable that checks for the `google-analytics-opt-out` cookie:
    1.  Click **Variables** > **New**.
    2.  Set **Variable Type** to **1st-Party Cookie**.
    3.  Name the variable `"google-analytics-opt-out cookie"` and click **Save**.
3.  Create a new trigger for a Google Analytics tag:
    1.  Set **Trigger Type** to **Page View**.
    2.  Set **This trigger fires on** to **Some Page Views**.
    3.  Set **Fire this trigger when an Event occurs and all of these conditions are true** to read `"google-analytics-opt-out cookie" does not equal "true"`
4.  Click **Save**.
5.  Publish your container.

> **Note**: The `window` property must be set before any calls to `gtag()` are made, and it must be set on each page for which you want to turn off Analytics. If the property is not set or set to `false`, then Analytics will work as usual.

### Turn off default page view measurement in Google Analytics

The default behavior of the Google Analytics tag is to send a `page_view` event to Google Analytics. This is the desired behavior in most cases; `page_view` events are automatically recorded once you add the code to each page on your site. However, if you don’t want the tag to send a `page_view` event to Google Analytics, set the `send_page_view` parameter to `false`:

#### Implementation: Google Tag Manager

1.  In your workspace, open the **Tags** menu.
2.  Edit the relevant Google tag.
3.  In **Configuration settings**, set the following parameter:
    -   **Name**: `send_page_view`
    -   **Value**: `false`
4.  Save the tag.

### Restricted data processing

When you enable restricted data processing, Google will limit how it uses data. Certain features will be unavailable, including adding users to remarketing lists, adding users to similar audience remarketing seed lists, and related functionality. For App campaigns, enabling restricted data processing may mean that the users who install your app will continue to see ads for that app following installation. [Learn more](https://support.google.com/adspolicy/answer/9028179).

To enable restricted data processing:

#### Implementation: Google Tag Manager

1.  Sign in to **Google Tag Manager**.
2.  Click **Tags** in the left column to access your tags.
3.  Create or edit a tag that supports restricted data processing (Google Ads Remarketing, Google Ads Conversion, etc.)
4.  In the tag configuration section, select `True` for the field "**Enable Restricted Data Processing**."
    -   Alternatively, this field can be set dynamically using a data layer variable.
5.  Click **Save**.
