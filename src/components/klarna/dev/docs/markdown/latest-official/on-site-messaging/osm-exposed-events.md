# Supported events

Learn about the events exposed by On-site messaging.

The On-site messaging JavaScript SDK includes an event handler that allows you to listen for specific events
related to the informational modal and specify a callback function to be triggered when those events occur.
Use the event handler by calling the following function:

```javascript
window.Klarna.OnsiteMessaging.on(event: EventType, callback: function)

```

The event handler supports the following events:

- `informational-modal-opened` or `informationalModalOpened` are triggered when a customer clicks the call to
  action button and the interstitial opens
- `informational-modal-closed` or `informationalModalClosed` are triggered when a customer closes the
  interstitial
- `placement-rendered` or `placementRendered` are triggered when placement is rendered

We encourage to use kebab-case, but we also support camelcase eventTypes.

If either the `EventType` or `callback` parameter isn't provided, the function will log an error on the
console, but will not throw an error to avoid causing issues on the page. If a string is passed for
`EventType` that is not supported, the function will log an error as well.

### Example

Here's an example of how you can use the `window.Klarna.OnsiteMessaging.on` function to block the scrolling of
the background when the informational modal is opened.

In this example, the merchant is using the `informationalModalOpened` to block the scrolling of the background
when the interstitial is opened. The `informationalModalClosed` event restores the scrolling when the
interstitial is closed.

```javascript
window.Klarna.OnsiteMessaging.on('informationalModalOpened', function () {
  document.body.style.overflow = 'hidden'
})

window.Klarna.OnsiteMessaging.on('informationalModalClosed', function () {
  document.body.style.overflow = 'auto'
})
```
