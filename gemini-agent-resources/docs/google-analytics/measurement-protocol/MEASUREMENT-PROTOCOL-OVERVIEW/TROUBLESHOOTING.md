# Troubleshooting

This guide outlines common troubleshooting steps to fix common implementation
errors.

## No events

If your events aren't showing up in Google Analytics, there are a few common
issues you should look for.

First choose your client:

- Are you using the correct
  [api_secret](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#api_secret)?  
  Check
  that you're using the `api_secret` for the right stream. If you set up the
  measurement protocol for multiple streams, each stream will have its own
  secret.
- Is your
  [api_secret](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#api_secret)
  still valid?  
  In order to help combat spam, you're able to revoke `api_secret`s. Make sure
  that the `api_secret` you are using is still valid. It's possible that another
  user with access to your stream may have revoked access to it by mistake.
- Is your
  [api_secret](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#api_secret)
  copied correctly?  
  `api_secret` is case-sensitive. Double check that the `api_secret` in the
  Google Analytics UI is _exactly_ the same as the one you're using in your
  code.
- Don't use `advertising_id`.  
  `advertising_id` is not supported as a valid device identifier. Use
  `app_instance_id` if you're using Firebase and `client_id` if you're using
  gtag.js.
- Are you using the correct
  [`client_id`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#client_id)?  
  Make
  sure you're using the `client_id` for the correct property. See
  [send event to the Measurement Protocol](https://developers.google.com/gtagjs/reference/api#get_mp_example).

## Invalid IDs

Since the Measurement Procotol supports IDs from the Google Analytics for
Firebase SDK and gtag.js, make sure you use the right ID. **The IDs you should
use changes depending on whether you are using the Google Analytics for Firebase
SDK or gtag.js.** The following outlines which IDs you should be using:

**Google Analytics for Firebase SDK**

If you're using the Google Analytics for Firebase SDK the IDs you _should_ use
are:

- [`firebase_app_id`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#firebase_app_id)
  \- Include this ID in the query parameters for the request. This ID uniquely
  identifies your Firebase App. All users of your app will have the same
  `firebase_app_id`. Found in the Firebase console under:  
  **Project Settings** \> **General** \> **Your Apps** \> **App ID**
- [`app_instance_id`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=firebase#app_instance_id)
  \- Include this ID in the POST body for the request. This ID uniquely
  identifies a given installation of a Firebase App. This value will be
  different for every installation of your app. The methods to request this
  value for each Firebase platform are as follows:
  - [Android \- getAppInstanceId()](https://firebase.google.com/docs/reference/android/com/google/firebase/analytics/FirebaseAnalytics#public-taskstring-getappinstanceid)
  - [Kotlin \- getAppInstanceId()](https://firebase.google.com/docs/reference/kotlin/com/google/firebase/analytics/FirebaseAnalytics#getappinstanceid)
  - [Swift \- appInstanceID()](https://firebase.google.com/docs/reference/swift/firebaseanalytics/api/reference/Classes/Analytics#appinstanceid)
  - [Objective-C \- appInstanceID](https://firebase.google.com/docs/reference/ios/firebaseanalytics/api/reference/Classes/FIRAnalytics#+appinstanceid)
  - [C++ \- GetAnalyticsInstanceId()](https://firebase.google.com/docs/reference/cpp/namespace/firebase/analytics#getanalyticsinstanceid)
  - [Unity \- GetAnalyticsInstanceIdAsync()](https://firebase.google.com/docs/reference/unity/class/firebase/analytics/firebase-analytics#getanalyticsinstanceidasync)

You should _not_ use the following:

- `firebase_instance_id` \- This ID _should not_ be included in your request.
  This ID is used for identifiying a given instance of the app, but is Firebase
  specific. It's used for tasks such as FCM messages.

**gtag.js**

If you're using gtag.js, the IDs you _should_ use are:

- [`measurement_id`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#measurement_id)
  \- Include this ID in the query parameters for the request. This ID uniquely
  identifies a Data Stream. All users of your website will have the same
  `measurement_id`. Found in the Google Analytics UI under:  
  **Admin** \> **Data Streams** \> **choose your stream** \> **Measurement ID**
- [`client_id`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag#client_id)
  \- Include this ID in the POST body for the request. This ID uniquely
  identifies a given user instance of a web client. This value will be different
  for every user of your app. See
  [these examples](https://developers.google.com/gtagjs/reference/api#get) for
  how to retrieve this value.

## Server-side tagging events missing

A
[Server-side Tag Manager installation with a Measurement Protocol client](https://developers.google.com/tag-platform/tag-manager/server-side/send-data#server-to-server_apps)
lets you send events in the Measurement Protocol _format_ to a container. The
container then sends those events to Google Analytics using the same mechanism
as all other SGTM events.

**Note:** It _doesn't_ send those events to the Measurement Protocol endpoint,
and therefore doesn't support all the features of the Measurement Protocol
endpoint, such as deriving
[geographic and device information](https://developers.google.com/analytics/devguides/collection/protocol/ga4#geo_device)
from tagging events.

If you want all the features of the Measurement Protocol, send events directly
to the Measurement Protocol instead of your container.
