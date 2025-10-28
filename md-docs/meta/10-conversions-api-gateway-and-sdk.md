# API Limits

**Conversions API Gateway and SDK**

### Marketing API Rate Limiting

The Marketing API has its own rate-limiting logic and is excluded from all the
Graph API rate limitations. So if you make a Marketing API call, it won't be
calculated into the Graph API throttling.

### Conversions API Specific Limits

There is **no specific rate limit** for the Conversions API. Conversions API
calls are counted as Marketing API calls. The only limitation is that you can
send us up to **1,000 events at a time**. See [Send Requests](#send-requests)
for more information.

**Additional Resources:**

- [Marketing API Rate Limiting](link)

---

## Business SDK API Usage in the Conversions API Gateway

This guide helps you navigate Meta Business SDK advanced features designed
especially for Conversions API Gateway users. For basic Conversions API Gateway
usage, refer to the Conversions API Gateway documentation.

### Send Events to Your Conversions API Gateway Instance

#### Requirements

Before using any of the features listed below, you need to have the Meta
Business SDK installed. See Get Started with the Meta Business SDK or follow the
README instructions listed here:

**SDK Links:**

- PHP: [facebook-php-business-sdk](link)
- Node.js: [facebook-nodejs-business-sdk](link)
- Java: [facebook-java-business-sdk](link)
- Python: [facebook-python-business-sdk](link)
- Ruby: [facebook-ruby-business-sdk](link)

> **Availability:** Currently, these features are only available on the PHP and
> Java business SDK. The other languages will be implemented by the end of 2023.

**Minimum language version requirements:**

- PHP >= 7.2
- Java >= 8

> **Deduplication Note:** To dedupe events to the Conversions API endpoint,
> please pass the `eventId` in your request. This will help prevent duplicate
> events from showing up if Conversions API publishing is enabled.

---

### Formatting the CAPIGatewayIngressRequest Parameters

| Parameter     | Type   | Description                                                                                                                                                                                           |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `endpointUrl` | string | The Conversions API Gateway endpoint that events get sent to. No prevalidation will be done on the parameter other than checking if it is a valid url.<br><br>**Example:** `https://test.example.com` |
| `accessKey`   | string | Conversions API Gateway access key that is needed to send events to the Conversions API Gateway events endpoint. These are the instructions for generating it.                                        |

---

### The CAPIGatewayIngressRequest Setters

| Parameter                  | Type                                      | Description                                                                                                                                                                                                                                                                        |
| -------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setSendToDestinationOnly` | Boolean                                   | Boolean flag on whether the events get sent to the selected endpoint only.<br><br>**Default:** `False`                                                                                                                                                                             |
| `setFilter`                | `CustomEndpointRequest.Filter()` function | Filter function that processes each event. If the filtering logic returns true, the event gets passed through. Otherwise, the event gets dropped. You have to implement the `shouldSendEvent` function in the interface that has the parameter `Event`.<br><br>**Default:** `Null` |

---

### Migration Example: PHP

For systems that already use the Business SDK, you just need to reference the
new `CAPIGatewayIngressRequest` and attach it to the eventRequest's
`customEndpoint` object.

```php
// this is the standard event request that we attach events to
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
// pass the events to this event Request object
$event_request->setEvents($events);
$event_request->execute()
```

---

### Migration Example: Java

For systems that already use the Business SDK, you just need to reference the
new `CAPIGatewayIngressRequest` and attach it to the eventRequest's
`customEndpoint` object.

```java
// this is the standard event request that we attach events to

EventRequest eventRequest = new EventRequest(PIXEL_ID, context);

CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
eventRequest.addDataItem(testEvent);
eventRequest.execute();
```

---

### Synchronous Option

#### PHP Code Example

```php
$api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequest($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$user_data = (new UserData())
     ->setEmails(array('joe@eg.com'))
     ->setPhones(array('12345678901', '14251234567'))
     ->setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890')
     ->setFbp('fb.1.1558571054389.1098115397');
$event1 = (new Event())
     ->setEventName('Purchase')
     ->setEventId('125')
     ->setEventTime(time())
     ->setEventSourceUrl('http://jaspers-market.com/product/123')
     ->setUserData($user_data);
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute();
print($response->__toString());
```

#### Java Code Example

```java
EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
             .email("abc@eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventId("125").eventName("Purchase")
             .eventTime(System.currentTimeMillis() / 1000L)
             .userData(userData)
             .dataProcessingOptions(new String[]{}).setEventId("134423232");
eventRequest.namespaceId("11")
             .uploadId("22222")
             .uploadTag("upload-tag-4")
             .uploadSource("upload-source-4")
             .testEventCode("test-event-code-5")
             .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.execute();
```

---

### Asynchronous Option

#### PHP Code Example

```php
$api = Api::init(null, null, $this->access_token);
$api->setLogger(new CurlLogger());
$event_request = new EventRequestAsync($this->pixel_id);
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$capiIngressRequest->setSendToDestinationOnly(true);
$event_request->setCustomEndpoint($capiIngressRequest);
$event1 = (new Event())
     ->setEventName('test Async Event')
     ->setEventId('134423232')
     ->setEventTime(time())
     ->setEventSourceUrl('http://jaspers-market.com/product/123');
$events = array($event1, $event2);
$event_request->setEvents($events);
$response = $event_request->execute()->wait();
```

#### Java Code Example

```java
EventRequest eventRequest = new EventRequest(PIXEL_ID, context);
UserData userData = new UserData()
             .email("abc@eg.com");
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
capiSyncRequest.setSendToDestinationOnly(true);
eventRequest.setCustomEndpoint(capiSyncRequest);
Event testEvent = new Event();
testEvent.eventName("test Async Event")
             .eventTime(System.currentTimeMillis() / 1000L)
             .userData(userData)
             .dataProcessingOptions(new String[]{}).setEventId("134423232");
eventRequest.namespaceId("11222")
             .uploadId("22222")
             .uploadTag("upload-tag-4")
             .uploadSource("upload-source-4")
             .testEventCode("test-event-code-5")
             .partnerAgent("partner-agent-6");
eventRequest.addDataItem(testEvent);
eventRequest.executeAsync();
```

---

### Filter Functionality

#### PHP Code Example

```php
class APIFilter implements Filter {
     public function shouldSendEvent(Event $event): bool
     {
             if ($event->getEventId() === '125') {
                     return false;
             }
             return true;
     }
}
$capiIngressRequest = new CAPIGatewayIngressRequest($this->cb_url, $this->access_key);
$event_request->setCustomEndpoint($capiIngressRequest);
$capiIngressRequest->setFilter(new APIFilter());
```

#### Java Code Example

```java
CAPIGatewayIngressRequest capiSyncRequest = new CAPIGatewayIngressRequest(CB_URL, CAPIG_ACCESS_KEY);
eventRequest.setCustomEndpoint(capiSyncRequest);

capiSyncRequest.setFilter(new CustomEndpointRequest.Filter() {
     @Override
     public boolean shouldSendEvent(Event event) {
     if (event.getEventId().equals("125")) {
             return true;
     }
     return false;
}
});
```
