# Vercel Purchase Log

This log shows the sequence of events for a purchase transaction on Vercel.

### 1. Capture Identifiers

*Timestamp: 2026-01-15 14:03:30.040*

```json
{
  "id": "576a595c-7630-4a61-a94f-dfa539873601",
  "timestamp": "2026-01-15T14:03:30.039Z",
  "level": "INFO",
  "event": "Capture Identifiers",
  "data": {
    "cartId": "gid://shopify/Cart/hWN7bDJslbs9s5ChL4WhfHv9?key=6327f14107ba4a42288f41e1b5f88373",
    "fbp": "fb.1.1758136115497.519322507855675611",
    "fbc": "fb.1.1767754546220.IwY2xjawPKaBhleHRuA2FlbQIxMQBicmlkETFiV3ZqdjgxT0ROek1OUGdJc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtokykum35q7anCt5_LxQIfT8VVE_kTG_Q4AGivmiieeF4Mm5iuqCt7Z2qT2_aem_y42P_FhfMBqyAt-WtDeccw",
    "external_id": "ute_avw3z5lueami74q7j3",
    "hasEmailHash": false,
    "clientIp": "80.212.18.22",
    "ga_client_id": "Captured",
    "ga_session_id": "Captured"
  },
  "context": {
    "token": "hWN7bDJslbs9s5ChL4WhfHv9",
    "checkoutUrl": "https://kasse.utekos.no/cart/c/hWN7bDJslbs9s5ChL4WhfHv9?key=6327f14107ba4a42288f41e1b5f88373"
  }
}
```

### 2. CAPI Sent: InitiateCheckout

*Timestamp: 2026-01-15 14:03:30.080*

```json
{
  "id": "bf8360f5-6740-4dda-9033-a1a6b41626e6",
  "timestamp": "2026-01-15T14:03:30.079Z",
  "level": "INFO",
  "event": "CAPI Sent: InitiateCheckout",
  "data": {
    "eventId": "ic_1768485809597_bd87a76f-4d6e-41bf-b5a4-2e06c10e40c5",
    "events_received": 1,
    "fbtrace_id": "AQYEqjkq9uqtBwAZR0NKJRC"
  },
  "context": {
    "actionSource": "website",
    "hasFbp": true,
    "hasFbc": true,
    "hasExtId": true,
    "hasEmail": false,
    "clientIp": "80.212.18.22"
  }
}
```

### 3. sGTM Purchase Dispatch Success

*Timestamp: 2026-01-15 14:04:21.561*

```json
{
  "id": "78c4e157-09b9-4e31-9fca-88fbd74c8717",
  "timestamp": "2026-01-15T14:04:21.560Z",
  "level": "INFO",
  "event": "sGTM Purchase Dispatch Success",
  "data": { "orderId": 6629351391480, "value": "0.00" },
  "context": { "source": "orders-paid webhook" }
}
```

### 4. Meta CAPI Processing

*Timestamp: 2026-01-15 14:04:21.776*

```
[Meta CAPI] Processing Order: 6629351391480
```

### 5. Meta CAPI Attribution Found

*Timestamp: 2026-01-15 14:04:21.990*

```
[Meta CAPI] Attribution found in Redis for key: checkout:hWN7bDJslbs9s5ChL4WhfHv9
```

### 6. Webhook: Order Paid Processing

*Timestamp: 2026-01-15 14:04:21.991*

```json
{
  "id": "c8ab6906-eb5d-466a-bb3a-61418a4b8157",
  "timestamp": "2026-01-15T14:04:21.990Z",
  "level": "INFO",
  "event": "Webhook: Order Paid Processing",
  "data": {
    "orderId": 6629351391480,
    "total": "0.00",
    "currency": "NOK",
    "attributionFound": true,
    "redisKeyUsed": "***Found***"
  },
  "context": {
    "cartToken": "hWN7bDJslbs9s5ChL4WhfHv9",
    "checkoutToken": "d9154ffc1893bde1901251176566cf0f"
  }
}
```

### 7. CAPI Purchase Sent

*Timestamp: 2026-01-15 14:04:23.083*

```json
{
  "id": "82c63012-cbc6-4abc-a998-63378b19ee68",
  "timestamp": "2026-01-15T14:04:23.083Z",
  "level": "INFO",
  "event": "CAPI Purchase Sent",
  "data": {
    "fbtrace_id": "AzSLQ-1MY5ODc7qGU9Cfk8L",
    "events_received": 1,
    "orderId": 6629351391480
  },
  "context": {
    "fbp": "fb.1.1758136115497.519322507855675611",
    "fbc": "fb.1.1767754546220.IwY2xjawPKaBhleHRuA2FlbQIxMQBicmlkETFiV3ZqdjgxT0ROek1OUGdJc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtokykum35q7anCt5_LxQIfT8VVE_kTG_Q4AGivmiieeF4Mm5iuqCt7Z2qT2_aem_y42P_FhfMBqyAt-WtDeccw",
    "externalId": "ute_avw3z5lueami74q7j3",
    "clientIp": "80.212.18.22",
    "eventTime": 1768485862
  }
}
```
