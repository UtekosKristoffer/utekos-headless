# Before you start

In this step-by-step guide you will learn how to integrate Sign in with Klarna into your iOS app.

Before starting to add the Sign in with Klarna button or using the Sign in with Klarna SDK you will need to do
the following:

1. Implement ASWebAuthenticationPresentationContextProviding
2. Setting the return URL
3. Defining an event handler

### 1. Implement ASWebAuthenticationPresentationContextProviding

The iOS integration will render the sign in flow in a sandboxed in-app browser through Apple's own
`[ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession)`.

```swift
@available(iOS 13.0, *)
extension SignInButtonView: ASWebAuthenticationPresentationContextProviding {
    /// Needed so ASWebAuthenticationSession knows what window to put the view into.
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return window
    }
}

```

The SDK does all the work on your behalf with the parameters and keys that you supply, but you need to
implement support for
[ASWebAuthenticationContextProviding](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding)
in one of your classes and forward an instance of it to the SDK.

The UIWindow that your instance supplies will be used to present the in-app browser.

### 2. Setting the return URL

To ensure the Sign in flow initiated by the SDK can correctly redirect back to your application, you must
configure a unique return URL (deep link) for your app and provide this URL string to the SDK. This value is
required specifically for the Sign in flow initiated by the SDK. Follow our
[In app guide](https://docs.klarna.com/payments/mobile-payments/integrate-with-mobile-sdk/ios/get-started/#configure-your-app-return-url)
for setting up the return URL value in your app.

**Important:** This configuration is distinct from any other return URLs the SDK might require for handling
redirects from external third-party applications. Ensure you are configuring the URL for the SDK's Sign in
flow.

### 3. Defining an event handler

While the user is interacting with the Sign in with Klarna flow or when the flow is completed, you'll receive
events by setting an event handler. You can see a sample event handler on the right.

```swift
@available(iOS 13.0, *)
extension SignInViewController: KlarnaEventHandler {
    func klarnaComponent(_ klarnaComponent: KlarnaComponent, dispatchedEvent event: KlarnaProductEvent) {
         if event.action == .klarnaSignInToken {
            // Authorization went through
            let token = event.params["klarnaToken"]
        } else if event.action == .klarnaSignInUserTappedButton {
            // Button was tapped
        } else if event.action == .klarnaSignInUserCancelled {
            // User cancelled out of the flow
        }
    }

    func klarnaComponent(_ klarnaComponent: KlarnaComponent, encounteredError error: KlarnaError) {
        if error.name == .klarnaSignInAlreadyInProgress {
            // Button or sign in call was already in progress
        } else if error.name == .klarnaSignInAuthorizationFailed {
            // An internal error occurred
            if error.isFatal {
                // The auth flow will absolutely not work. Try again?
            }
        } else if error.name == .klarnaSignInMissingSchemeOrHost {
            // You did not set a valid auth return URL
        }
    }
}

```

## Sign in with Klarna Button

Please follow this section if you would like to use one of the button designs provided by Klarna.

### 1. Create the Button

You can create an instance of `KlarnaSignInButton` using its default initializer.

```swift
let signInButton = KlarnaSignInButton(clientId: clientID,
                                  scope: scope,
                                  market: market,
                                  locale: locale,
                                  presentationContext: self,
                                  theme: klarnaTheme,
                                  environment: env,
                                  region: reg,
                                  returnUrl: URL(string: "https://sneakers.com")!,
                                  eventHandler: self)

```

#### Parameters

When initializing the button, specify the following parameters:

| Parameter             | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clientId`            | Yes      | This is the UUID you get when creating your Klarna OAuth 2.0 app.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `scope`               | Yes      | Space-separated list of scopes you would like to request from the user. For example, request `billing_address` if you need the billing address in your account creation. The claims of the requested scopes will be returned as part of JWT token `id_token`. Note: `openid` is always requested by default even if you don't pass it. Available scopes: \* `offline_access` \* `profile:email` \* profile:phone \* profile:name \* profile:date_of_birth \* profile:billing_address \* profile:national_identification \* profile:country \* payment:request:create |
| `market`              | Yes      | The market or the country where this integration is available, for example, `SE` for Sweden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `locale`              | Yes      | The language in which the Sign in with Klarna button is displayed to the user.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `presentationContext` | Yes      | Read more about \[ context presentation].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `theme`               | No       | Defines the theming for the Sign in with Klarna UI, but not the button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `environment`         | No       | Configures the endpoints and other behaviors that the SDK will be operating with. When set to `production`, the SDK will make requests to production endpoints and perform real validation, whereas for other environments will not.                                                                                                                                                                                                                                                                                                                                 |
| `region`              | No       | Defines the regional API endpoints to which the SDK will send requests.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `resourceEndpoint`    | No       | Defines the cloud provider to which the SDK will send requests. This should not be changed or overridden.                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `returnUrl`           | Yes      | The return URL you defined during the preparation section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `eventHandler`        | Yes      | The event handler for errors and events as described in the \[ Preparation section].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### 2. Add the Button to Your App

You can add the button to your app's view hierarchy with `addSubview()`. The button's contents will self-size
according to the available space and the user's dynamic type accessibility settings.

### 3. Start of Sign in Flow

When the user taps the button, the sign in flow will be triggered without any additional work from your side.
When the flow completes, one of the two methods in your event handler will be called.

### 4. Send the Token to Your Backend

When the authentication flow is complete, the `klarnaComponent(_:dispatchedEvent:)` method of your event
handler will be called.

## Sign in with Klarna SDK

Please follow this section if you want to add a button with a custom design.

### 1. Create an Instance of the SDK

To integrate the Sign in with Klarna SDK in your iOS app, you need to create an instance of `KlarnaSignInSDK`,
call its `signIn()` function, and receive the results once the flow is completed.

```swift
let sdk = KlarnaSignInSDK(
            returnUrl: URL(string: "app-schema://"),
            eventHandler: self)

```

### Parameters

To create an instance of the SDK you need to specify the following parameters.

| Parameter          | Required | Description                                                                                                                                                                                                                          |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme`            | No       | Defines the theming for the Sign in with Klarna UI, but not the button.                                                                                                                                                              |
| `environment`      | No       | Configures the endpoints and other behaviors that the SDK will be operating with. When set to `production`, the SDK will make requests to production endpoints and perform real validation, whereas for other environments will not. |
| `region`           | No       | Defines the regional API endpoints to which the SDK will send requests.                                                                                                                                                              |
| `resourceEndpoint` | No       | Defines the cloud provider to which the SDK will send requests. This should not be changed or overridden.                                                                                                                            |
| `returnUrl`        | No       | The return URL you defined during the preparation section.                                                                                                                                                                           |
| `eventHandler`     | No       | The event handler for errors and events as described in the \[ Preparation section].                                                                                                                                                 |

### 2. Create a Button

Create and render your own button. The design and implementation are up to you.

### 3. Call the signIn() function

When the user chooses to sign in with Klarna, call the SDK's `signIn()` function. This will render the
authentication flow. When the flow completes, one of the two methods in your event handler will be called.

```swift
    @objc func myButtonTapped() {
        self.sdk.signIn(
            clientId: "clientID",
            scope: "scope",
            market: "market",
            locale: "locale",
            presentationContext: self)
    }

```

### Parameters

The parameters that you'll need to pass to `signIn()` function are the following:

| Parameter             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `clientId`            | The UUID you get when creating your Klarna OAuth 2.0 app.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `scope`               | A space-separated list of scopes you would like to request from the user. For example, request `billing_address` if you need the billing address in your account creation. The claims of the requested scopes will be returned as part of JWT token `id_token`. Note: `openid` is always requested by default even if you don't pass it. Available scopes: \* offline_access \* profile:email \* profile:phone \* profile:name \* profile:date_of_birth \* profile:billing_address \* profile:national_identification \* profile:country \* payment:request:create |
| `market`              | The market or the country where this integration is available, for example, SE for Sweden.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `locale`              | The language in which the Sign in with Klarna button is displayed to the user.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `presentationContext` | Read more about \[ context presentation].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

### 4. Send the Token to Your Backend

When the authentication flow is complete, the `klarnaComponent(_:dispatchedEvent:)` method of your event
handler will be called. ⚛️React Not Detected React is not detected on this page. Please ensure you're visiting
a React application.
