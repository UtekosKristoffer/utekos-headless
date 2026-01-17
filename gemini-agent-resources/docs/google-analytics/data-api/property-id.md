# Property ID

The Google Analytics Data API v1 produces reports for Google Analytics
properties. API requests are required to specify a numeric Google Analytics
property identifier. The documentation and sample code of the Data API refer to
this ID as `GA_PROPERTY_ID`.

## Usage

All Data API methods require the Google Analytics property identifier to be
specified inside a URL request path in the form of `properties/GA_PROPERTY_ID`,
such as:

```
POST https://analyticsdata.googleapis.com/v1beta/properties/GA_PROPERTY_ID:runReport
```

If you are using one of the Data API client libraries, there is no need to
manipulate the request URL path manually. Most API clients provide a property
parameter that expects a string in the form of `properties/GA_PROPERTY_ID`. See
Quick start guide for examples of using the client libraries.

## What is my property ID?

You can use the Data API if you have configured analytics reports in either of
the following products:

- **Google Analytics**: Google Analytics has multiple types of properties. To
  use the Data API, a property must be a Google Analytics property, as opposed
  to Universal Analytics. Universal Analytics is an older version of Google
  Analytics and is not supported by the Data API.
- **Firebase**: If you have linked Google Analytics to Firebase, you will see
  analytics data for your project in Firebase. To learn more about linking, see
  Link Google Analytics to Firebase.
- **AdMob**: If you have enabled user metrics and linked your apps to Firebase
  in AdMob, you will see user metrics in AdMob for your app.

### Determine a Google Analytics property ID

1. Visit Google Analytics at <https://analytics.google.com/>.
2. Select **Admin**.
3. Select the **Property**.
4. Select **Property Settings**.
5. If the Property Settings shows a numeric **Property ID** such as `123...`,
   this is the numeric ID of your Google Analytics property.

> **Note:** If the Property Settings shows a **Tracking ID** such as
> `UA-123...-1`, this property is a Universal Analytics property, and the
> analytics data for that property cannot be reported on in the Data API. For
> that property, use the Google Analytics Reporting API v4 to produce analytics
> data reports.

### Determine the Google Analytics property for a Firebase project

1. Visit the Firebase console at <https://console.firebase.google.com/>.
2. Select your **project**.
3. Select **Project settings**.
4. Select **Integrations**.
5. Select your **Google Analytics Integration**.
6. The Google Analytics Integration page shows a numeric **Property ID** such as
   `123...`. This is the numeric ID of your Google Analytics property.

### Determine the Google Analytics property for an AdMob app

> **Note:** Linking your AdMob app to Firebase and adding the Google Analytics
> for Firebase SDK are currently optional. With upcoming changes to user metrics
> collection in late 2023, linking to Firebase and adding the Analytics SDK will
> be required to collect user metrics for AdMob.

1. Visit AdMob at <https://apps.admob.com/>.
2. Select your **app**.
3. Select **App Overview**.
4. Select **FIREBASE DASHBOARD**.
5. Follow the Firebase instructions above starting with **Project settings**.
