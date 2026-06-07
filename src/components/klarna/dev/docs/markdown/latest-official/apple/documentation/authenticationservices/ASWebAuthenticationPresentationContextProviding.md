-- Protocol --

# ASWebAuthenticationPresentationContextProviding

An interface the session uses to ask a delegate for a presentation context.

iOS 13.0+iPadOS 13.0+Mac Catalyst 13.1+macOS 10.15+visionOS 1.0+

```ts
@MainActor
protocol ASWebAuthenticationPresentationContextProviding : NSObjectProtocol
```

## [Mentioned in](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#mentions)

[

Authenticating a User Through a Web
Service](https://developer.apple.com/documentation/authenticationservices/authenticating-a-user-through-a-web-service)

## [Topics](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#topics)

### [Specifying the Anchor](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#Specifying-the-Anchor)

[`func presentationAnchor(for: ASWebAuthenticationSession) -> ASPresentationAnchor`](<https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding/presentationanchor(for:)>)

Tells the delegate from which window it should present content to the user.

**Required**

[`typealias ASPresentationAnchor`](https://developer.apple.com/documentation/authenticationservices/aspresentationanchor)

A platform-specific type that indicates the kind of user interface element to use as a presentation anchor.

## [Relationships](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#relationships)

### [Inherits From](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#inherits-from)

- [`NSObjectProtocol`](https://developer.apple.com/documentation/ObjectiveC/NSObjectProtocol)

## [See Also](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#see-also)

### [Presenting a Session](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationpresentationcontextproviding#Presenting-a-Session)

[`var presentationContextProvider: (any ASWebAuthenticationPresentationContextProviding)?`](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession/presentationcontextprovider)

A delegate that provides a display context in which the system can present an authentication session to the
user.
