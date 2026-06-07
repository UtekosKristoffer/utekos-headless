# Overview

Learn the recommended method for integrating Klarna’s Mobile SDK to enable a secure and seamless checkout with
full feature support. Understand how to use System Webviews as an alternative and why Embedded/Custom WebViews
are not allowed.

The Klarna Mobile SDK is the recommended way to integrate Klarna products in mobile apps. It ensures optimal
performance, security, and feature coverage across all supported platforms and regions.

To guarantee a seamless customer experience and maintain integration quality over time, consider the following
for all mobile applications:

- Klarna Mobile SDK is the **primary integration approach** for full feature and product coverage, click here
  to get started with your Mobile SDK integration on
  [iOS](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/ios/native-view/),
  [Android](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/android/native-view/)
  or
  [React Native](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/reactnative/native-view/).
- If Mobile SDK usage is not possible, the only acceptable secondary approach is to use System WebViews (e.g.
  ASWebAuthenticationSession, Chrome Custom Tabs), click here to
  [get started](https://docs.klarna.com/acquirer/klarna/mobile-payments/klarna-payments-in-native-apps-without-sdk/)
  with your System WebViews integration.
- Embedded/Custom WebViews (e.g. WKWebView, Android WebView) are **strictly prohibited.**

**\[ERROR]**

\*\*Why this matters:\*\* Custom WebViews break important payment features like 3D Secure, SSO, and bank
redirects, introduce severe security risks, and degrade the customer experience. SDK and System WebViews
ensure all features work reliably and securely.

## Klarna Mobile SDK (Recommended)

Klarna’s Mobile SDK is the official toolkit for integrating Klarna products into native iOS and Android apps.
It enables you to offer Klarna’s payment methods with a seamless in-app user experience. The SDK is designed
to provide the optimal integration and, under the hood, the SDK handles web-based flows in a mobile-friendly
way to reduce friction (e.g. handling cookies, opening bank apps, etc.) compared to a basic WebView
integration for a superior customer experience across all mobile platforms.

|                     |                   |                  |                 |
| ------------------- | ----------------- | ---------------- | --------------- |
| Sign in with Klarna | On-site messaging | Express Checkout | Klarna Payments |
| Sign in with Klarna | On-site Messaging | Express Checkout | Klarna Payments |

Klarna Mobile SDK provides a full suite of mobile-first integrations, including Klarna products like:

- **Klarna Payments**: Render Klarna’s payment methods with a native interface and a flexible UI, click here
  to get started with your integration on
  [iOS](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/ios/native-view/),
  [Android](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/android/native-view/)
  or
  [React Native](https://docs.klarna.com/acquirer/klarna/mobile-payments/integrate-with-mobile-sdk/reactnative/native-view/)
  and follow the
  [Mobile SDK Guidelines](https://docs.klarna.com/acquirer/klarna/mobile-payments/prerequisites/mobile-sdk-guidelines/)
  for the best performance.
- **On-site Messaging**: Show contextual messaging and let your customers know about the available payment
  options in pre-checkout. Click
  [here](https://docs.klarna.com/acquirer/klarna/on-site-messaging/integration-prerequisites/) to learn more.
- **Sign in with Klarna**: Seamlessly identify and let users login via their Klarna account. Click
  [here](https://docs.klarna.com/acquirer/klarna/sign-in-with-klarna/integration-prerequisites/) to learn
  more.
- **Express Checkout**: Accelerate your checkout process and boost conversion by offering a one-click
  checkout. Click [here](https://docs.klarna.com/acquirer/klarna/express-checkout/integration-prerequisites/)
  to learn more.

All functionality is wrapped in a single SDK package per platform (iOS, Android, React Native), designed to be
lightweight, secure, and developer-friendly.

**\[INFO]**

Once Klarna Mobile SDK is integrated into your app, you're covered. The SDK is continuously updated to support
new features, system changes, and Klarna platform updates — no additional workarounds required. Just keep the
SDK up to date to stay compatible.

Learn more in the \[Klarna Mobile SDK
Guidelines]\(https\://docs.klarna.com/payments/mobile-payments/before-you-start/mobile-sdk-guidelines/).

## System WebViews (Alternative to the SDK)

System WebViews are browser-like WebViews supported via actual mobile browsers (Safari on iOS, Chrome and
other browsers on Android). These WebViews provide a secure browser context inside mobile applications and
support various other browser features like app redirects, browser tabs etc. out of the box. Hence, with the
provided security and feature set, these are the preferred alternative to the Klarna Mobile SDK.

Integration of System WebViews are provided via
[CustomTabs](https://developer.chrome.com/docs/android/custom-tabs) on Android and
[ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession)
on iOS. Due to the support for device wide login experience, Klarna **requires** the usage
of`ASWebAuthenticationSession` on iOS. This means that the following approaches are also **prohibited**:

- Usage of
  [SFSafariViewController](https://developer.apple.com/documentation/safariservices/sfsafariviewcontroller)
- Usage of ephemeral web sessions
  - `prefersEphemeralWebBrowserSession = true` (iOS)
  - `setEphemeralBrowsingEnabled(true)` (Android)

## Embedded/Custom WebViews (**Prohibited**)

Embedded WebViews (such as WKWebView or Android WebView) offer customization but come with significant
trade-offs: limited functionality, poor compatibility with modern authentication flows, and inherent security
risks. These limitations often result in broken user experiences and increased integration complexity.

**\[WARNING]**

To ensure secure, reliable, and future-proof integrations, \*\*Klarna does not support Embedded WebViews for
purchase flows\*\*. Use the Klarna Mobile SDK or System WebViews as described instead.

**\[SUCCESS]**

Klarna Mobile SDK offers WebView Integrations to enhance your WebViews, allowing Klarna purchase flows to be
rendered securely, supporting all of the SDK features. You can learn more about SDK integrations
\[here]\(https\://docs.klarna.com/acquirer/klarna/mobile-payments/prerequisites/choose-your-integration/).

## Feature support with different Mobile Integration approaches

| **Feature**                        | **Klarna Mobile SDK (Recommended)** | **System WebViews**\*       | **Embedded WebViews (Prohibited)** |
| ---------------------------------- | ----------------------------------- | --------------------------- | ---------------------------------- |
| Remember Returning Customers       | Fully Supported                     | Fully Supported             | Requires Integration Effort        |
| Device Wide Login Experience       | Fully Supported                     | Fully Supported \*\*        | Not Supported                      |
| Application Redirects              | Fully Supported                     | Fully Supported             | Requires Integration Effort        |
| Redirect Back From Applications    | Fully Supported                     | Requires Integration Effort | Requires Integration Effort        |
| Camera Access for ID Verification  | Fully Supported                     | Fully Supported             | Requires Integration Effort        |
| Secure Browser Context             | Fully Supported                     | Fully Supported             | Not Supported                      |
| File Sharing and Download for T\&C | Fully Supported                     | Fully Supported             | Requires Integration Effort        |
| Passkeys                           | Fully Supported                     | Fully Supported             | Not Supported                      |

---

** ASWebAuthenticationSession (iOS) & Custom Tabs (Android)**

Setting `prefersEphemeralWebBrowserSession` (iOS) or `setEphemeralBrowsingEnabled` (Android) to `true` does
not support the “Unified Device Login Experience.”
