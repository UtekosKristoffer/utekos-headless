# Escalation and retry policy

Secure your Klarna Payments API integration with API keys and TLS encryption. Obtain keys via the Merchant
Portal and ensure HTTPS and SNI are used.

### **WARNING:** ⚠️

**This applies only to Order Management API (!)**

In a distributed systems architecture, communication between single systems can always come across situations
where one system does not answer immediately or with a certain error statement. The escalation and retry
policy is a concept to **implement all backend calls**, following the actual purchase in the frontend, in a
way that makes a system as robust and fail-safe as possible.

There are multiple reasons for a call to fail:

- The initial connection fails
- The call fails midway while the server is fulfilling the operation
- The call succeeds, but the connection breaks before the server can reply

In all cases, the current state of the order is uncertain. In some cases a retry is safe (when no change to an
order is made), in others, it is not, as the actual state of the order in Klarna is unknown to the merchant.

## The Idempotency key

To prevent inconsistencies in a distributed system environment, Klarna recommends the use of idempotency keys
for all POST / PATCH calls. This will ensure that a retry is safe as it will only be executed once per unique
key (as long as it’s performed within 24 hours after the first attempt).

The idempotency key should be included in the header of the call, following the structure below:

```json
{
  "Klarna-Idempotency-Key": "c6010e41-5eb0-46a9-8cc0-decb265419b1"
}
```

It is advised to generate the key according to the specifications of the `UUIDv5 standard`.

**Example:** If two capture requests with different (or no) idempotency keys, with capture amount 1000 kr are
sent, then two captures will be registered and the total captured amount would be 2000 kr.

**However**, if the two requests share the same idempotency key, the capture will be registered only once.
Hence, the total captured amount would be 1000.

**NOTE:**

- Both requests will generate the **same response**.

## 1. HTTP status 5xx (e.g. 503)

### 1.1 GET functions

In case a call shall be retried as described in the below use case scenarios, the retry shall be done with the
following waiting times:

- **1st retry**: 5 seconds
- **2nd retry**: 5 minutes
- **3rd retry**: 5 hours

Once three retries are reached an escalation at the merchant's side should be triggered. These API calls are
used to read an order, a capture or a refund from Klarna.

- [Get Order](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/getOrder) GET
  /ordermanagement/v1/orders/\{order_id}
- [Get all captures for one order](https://docs.klarna.com/api/ordermanagement/#tag/Captures/operation/getCaptures)
  GET /ordermanagement/v1/orders/\{order_id}/captures
- [Get one capture](https://docs.klarna.com/api/ordermanagement/#tag/Captures/operation/getCapture) GET
  /ordermanagement/v1/orders/\{order_id}
- [Get refund](https://docs.klarna.com/api/ordermanagement/#tag/Refunds/operation/get) POST
  /ordermanagement/v1/orders/\{order_id}/refunds

Escalation and retry logic:

![](/static/assets/escalation%20retry%20swimlanes.png)

### 1.2 POST/PATCH functions with idempotency key

By using idempotency keys in the initial request, the retry mechanism described previously in Section 1.1 can
be used for all post POST/PATCH functions

### 1.3 POST/PATCH functions without idempotency key

If the merchant does not use idempotency keys in the initial request, it is not safe to retry an API call.
Failing calls should be escalated immediately as described in the following Section 2.

## 2. HTTP status 3xx or 4xx (e.g. 403)

In the case a call is not answered with a positive response or an explicit error code, an escalation as
described in the below section, should be triggered. The escalation should in all cases come from a technical
support team inside the merchant’s organisation. Based on the case, the escalation might include an option to
fix the error at hand and afterwards eventually retry the call. In some cases, Klarna’s merchant support team
might be needed to help resolve the issue.

These API calls are used to change and/or update information in the order:

- [Acknowledge an order](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/acknowledgeOrder)
  POST /ordermanagement/v1/orders/\{order_id}/acknowledge
- [Set new order amount / order lines](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/updateAuthorization)
  PATCH /ordermanagement/v1/orders/\{order_id}/authorization
- [Cancel Order](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/cancelOrder) POST
  /ordermanagement/v1/orders/\{order_id}/cancel
- [Update Customer address](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/updateConsumerDetails)
  PATCH /ordermanagement/v1/orders/\{order_id}/customer-details
- [Update Merchant reference](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/updateMerchantReferences)
  PATCH /ordermanagement/v1/orders/\{order_id}/merchant-references
- [Release remaining authorization](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/releaseRemainingAuthorization)
  POST /ordermanagement/v1/orders/\{order_id}/release-remaining-authorization
- [Extend authorisation time](https://docs.klarna.com/api/ordermanagement/#tag/Orders/operation/extendAuthorizationTime)
  POST /ordermanagement/v1/orders/\{order_id}/extend-authorization-time
- [Create capture](https://docs.klarna.com/api/ordermanagement/#tag/Captures/operation/captureOrder) POST
  /ordermanagement/v1/orders/\{order_id}/captures
- [Add Shipping info](https://docs.klarna.com/api/ordermanagement/#tag/Captures/operation/appendShippingInfo)
  POST /ordermanagement/v1/orders/\{order_id}/captures/\{capture_id}/shipping-info
- [Resend End Customer communication](https://docs.klarna.com/api/ordermanagement/#tag/Captures/operation/triggerSendOut)
  /ordermanagement/v1/orders/\{order_id}/captures/\{capture_id}/trigger-send-out
- [Create a refund](https://docs.klarna.com/api/ordermanagement/#tag/Refunds/operation/refundOrder) POST
  /ordermanagement/v1/orders/\{order_id}/refunds

In the case of an error message, no end customer communication is triggered by Klarna.

Should an API call go wrong, end customer communication needs to be handled by the merchant.

Escalation and retry logic:

![](/static/assets/escalation%20and%20retry%20policy%20II%20swimlanes.png) ⚛️React Not Detected React is not
detected on this page. Please ensure you're visiting a React application.
