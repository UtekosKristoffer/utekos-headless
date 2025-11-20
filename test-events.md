# TEST EVENTS

## Purchase Event

**URL:**
`https://kasse.utekos.no/63421546744/orders/8c5e7f36e4a451b16220889a891a3e50/authenticate?key=e40af4fa2742133b9a3d273a02eeaf1f`

**Event ID:** `shopify_order_gid://shopify/Order/6534844285176`

**Action Source:** `website`

### Parameters

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1763607186,
      "action_source": "website",
      "user_data": {
        "em": [
          "8452e1c2a66ad178cf7d0756a416461f5b3789870c93b5d428aed23d1a9f97c9"
        ],
        "ph": [
          "7fb60026b4afccc51b8c113a12526cf17fa8d89740e2e3b5645d31ed129cf2ad"
        ],
        "fn": [
          "3bcd02c7692b9c1e57e6ada657307bf332d0944117c9482915f93b2fe5165053"
        ],
        "ln": [
          "1a4d87516d791a77659d999aa2cc12bf45e8efdc42b213e43641e63f28848d31"
        ],
        "ct": [
          "9ce43ba474ccece6ea347b3650fb6fca584562f099b91002493007192e9e4bb9"
        ],
        "zp": [
          "8e6d48d590537629b874fa8c72f468e87bf53a44ed7a730281763dc8f4b6f249"
        ],
        "country": [
          "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59"
        ]
      },
      "custom_data": {
        "value": 0,
        "currency": "NOK",
        "contents": [
          {
            "id": "42903954292984",
            "quantity": 1,
            "item_price": 150
          }
        ],
        "content_ids": ["42903954292984"],
        "content_type": "product",
        "order_id": "gid://shopify/Order/6534844285176"
      },
      "event_id": "shopify_order_gid://shopify/Order/6534844285176",
      "event_source_url": "https://kasse.utekos.no/63421546744/orders/8c5e7f36e4a451b16220889a891a3e50/authenticate?key=e40af4fa2742133b9a3d273a02eeaf1f"
    }
  ],
  "test_event_code": "TEST63736"
}
```

[Webhook orders/paid] Meta CAPI Success Response:

```json
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": "Ag5IswLASJ7ncsKhurf4tTD"
}
```

---

## AddToCart Event

**URL:** `https://utekos.no/`

**Event ID:** `atc_gid://shopify/ProductVariant/46944403849464_1763606947238`

**Action Source:** `website`

### Parameters

```json
{
  "value": 1790,
  "currency": "NOK",
  "content_ids": [
    "gid://shopify/ProductVariant/46944403849464",
    "gid://shopify/ProductVariant/46889849618680"
  ],
  "content_type": "product",
  "contents": [
    {
      "id": "gid://shopify/ProductVariant/46944403849464",
      "quantity": 1,
      "item_price": 1790
    },
    {
      "id": "gid://shopify/ProductVariant/46889849618680",
      "quantity": 1
    }
  ],
  "num_items": 2
}
```

### User Data Keys

- Browser ID
- IP address
- User agent

---

## PageView Event

**URL:** `https://utekos.no/`

**Event ID:** `evt_1763606928224_rh356ska8`

**Action Source:** `website`

### Parameters

```json
{
  "content_type": "home",
  "content_name": "Utekos - Forleng de gode stundene ute",
  "content_category": "home"
}
```

### User Data Keys

- IP address
- User agent

---

## PageView Event - Deduplication

URL: https://www.utekos.no/ Event id: evt_1763607718050_25f5pck2n Parameters:
(3) content_type: home content_name: Utekos - Forleng de gode stundene ute
content_category: home Action source: website Advanced matching parameters: IP
address, User agent

## Vercel Log: Webhook orders/paid

### Log Messages

```
[Webhook orders/paid] HMAC verified
[Webhook orders/paid] Parsed order ID: 6534844285176, GID: gid://shopify/Order/6534844285176
[Webhook orders/paid] No attribution data found in Redis for key: checkout:e40af4fa2742133b9a3d273a02eeaf1f. (Fallback: order.token='8c5e7f36e4a451b16220889a891a3e50')
```

### CAPI Payload (Purchase - Production)

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1763607186,
      "action_source": "website",
      "user_data": {
        "em": [
          "8452e1c2a66ad178cf7d0756a416461f5b3789870c93b5d428aed23d1a9f97c9"
        ],
        "ph": [
          "7fb60026b4afccc51b8c113a12526cf17fa8d89740e2e3b5645d31ed129cf2ad"
        ],
        "fn": [
          "3bcd02c7692b9c1e57e6ada657307bf332d0944117c9482915f93b2fe5165053"
        ],
        "ln": [
          "1a4d87516d791a77659d999aa2cc12bf45e8efdc42b213e43641e63f28848d31"
        ],
        "ct": [
          "9ce43ba474ccece6ea347b3650fb6fca584562f099b91002493007192e9e4bb9"
        ],
        "zp": [
          "8e6d48d590537629b874fa8c72f468e87bf53a44ed7a730281763dc8f4b6f249"
        ],
        "country": [
          "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59"
        ]
      },
      "custom_data": {
        "value": 0,
        "currency": "NOK",
        "contents": [
          {
            "id": "42903954292984",
            "quantity": 1,
            "item_price": 150
          }
        ],
        "content_ids": ["42903954292984"],
        "content_type": "product",
        "order_id": "gid://shopify/Order/6534844285176"
      },
      "event_id": "shopify_order_gid://shopify/Order/6534844285176",
      "event_source_url": "https://kasse.utekos.no/63421546744/orders/8c5e7f36e4a451b16220889a891a3e50/authenticate?key=e40af4fa2742133b9a3d273a02eeaf1f"
    }
  ],
  "test_event_code": "TEST63736"
}
```

### Cleanup & Response

```
[Webhook orders/paid] Deleted Redis key: checkout:e40af4fa2742133b9a3d273a02eeaf1f
```

**Meta CAPI Success Response:**

```json
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": "Ag5IswLASJ7ncsKhurf4tTD"
}
```

---

## InitiateCheckout: Capture Identifiers

### Request Body (`/capture-identifiers`)

```json
{
  "cartId": "gid://shopify/Cart/hWN5UjWdyMZiSJPPFTmMw1i7?key=ff6b1b7930e1f82cfd49ac87928e7afd",
  "checkoutUrl": "https://kasse.utekos.no/cart/c/hWN5UjWdyMZiSJPPFTmMw1i7?key=ff6b1b7930e1f82cfd49ac87928e7afd",
  "eventId": "ic_1763606965149_o6dginf60",
  "userData": {
    "fbp": "fb.1.1763606928744.784447217334313347",
    "client_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15"
  }
}
```

### Result

```
Successfully saved data to Redis key: checkout:ff6b1b7930e1f82cfd49ac87928e7afd
```
