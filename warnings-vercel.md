# Vercel Log ifm Purchase Event

## Hvordan loggen ser ut idag

[Webhook orders/paid] HMAC verified [Webhook orders/paid] Parsed order ID:
6532086726904, GID: gid://shopify/Order/6532086726904 [Webhook orders/paid] No
attribution data found in Redis for key:
checkout:4d81e9f0127949741cf17038ac38b7ec. (Fallback:
order.token='f3d945c2bf320f170077ecf1b7044517') [Webhook orders/paid] Sending
CAPI Payload (Purchase - Production):

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1763456346,
      "action_source": "website",
      "user_data": {
        "em": [
          "a75a4c2c34f5abc48d6dd40d19b6fba228a91531022090c59abf9b3582374e9b"
        ],
        "ph": [
          "286537f253c0562d9e7d29c84ce292620dca7c796b278cc04372b35358c8fe99"
        ],
        "fn": [
          "2339519e78249635e4a983e22d96c8bc9c5581bdbd4a2473ace762cda77dd8da"
        ],
        "ln": [
          "674c97b001e548d8e4c0a0bd626fe75a702d6bc8b892b816f9e35f3d1d9a1a60"
        ],
        "ct": [
          "6da8067ac2927f7cf63adeaf66141ee465219e6a3f1b3a98abfba798a966996c"
        ],
        "zp": [
          "5fb1f2daaedc5908a1f56b27332f693b0fa7431c35d640bd34ab5f0576db45d7"
        ],
        "country": [
          "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59"
        ]
      },
      "custom_data": {
        "value": 1590,
        "currency": "NOK",
        "contents": [
          {
            "id": "42903231004920",
            "quantity": 1,
            "item_price": 1590
          }
        ],
        "content_ids": ["42903231004920"],
        "content_type": "product",
        "order_id": "gid://shopify/Order/6532086726904"
      },
      "event_id": "shopify_order_gid://shopify/Order/6532086726904",
      "event_source_url": "https://kasse.utekos.no/63421546744/orders/f3d945c2bf320f170077ecf1b7044517/authenticate?key=4d81e9f0127949741cf17038ac38b7ec"
    }
  ]
}
```

[Webhook orders/paid] Deleted Redis key:
checkout:4d81e9f0127949741cf17038ac38b7ec [Webhook orders/paid] Meta CAPI
Success Response:

```json
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": "A_lVNCnk78uVNt3gxeSppON"
}
```

## Hvordan loggen så ut før forrige endring

[Webhook orders/paid] HMAC verified [Webhook orders/paid] Parsed order ID:
6531217621240, GID: gid://shopify/Order/6531217621240 [Webhook orders/paid] No
attribution data found in Redis for key:
cart:d05177455fb063048f7cdb2a00b47259:checkout_attribution [Webhook orders/paid]
Sending CAPI Payload (Purchase - Production):

```json
{
  "data": [
    {
      "event_name": "Purchase",
      "event_time": 1763405840,
      "action_source": "website",
      "user_data": {
        "em": [
          "754fb02354e72f66b9a6c8e85da54c160a5cb40ac83b27dacb9517d4d99fd31a"
        ],
        "ph": [
          "10d96fe3be0e8a40b564979f0fc47e977fab392edaeff45aa90c202f0aeac464"
        ],
        "fn": [
          "83a31851df49b03b450c8240b6a9155d6d0ec8609c4eb26883cfde72fcf1061b"
        ],
        "ln": [
          "885b8c8e76fa64521de6b672f7bb4892de4c34a42c335e0ee946fab716a74915"
        ],
        "ct": [
          "287f15fa34c8156a42c7504f15bcac0a541f1a9a1517e4be02912b8a542aa280"
        ],
        "zp": [
          "2ca9f63bb06128cdda3ab45ebc7033656c2495bbb82308afee8faad496048390"
        ],
        "country": [
          "9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59"
        ]
      },
      "custom_data": {
        "value": 1790,
        "currency": "NOK",
        "contents": [
          {
            "id": "46889849585912",
            "quantity": 1,
            "item_price": 249
          },
          {
            "id": "46944403882232",
            "quantity": 1,
            "item_price": 1790
          }
        ],
        "content_ids": ["46889849585912", "46944403882232"],
        "content_type": "product",
        "order_id": "gid://shopify/Order/6531217621240"
      },
      "event_id": "shopify_order_gid://shopify/Order/6531217621240",
      "event_source_url": "https://kasse.utekos.no/63421546744/orders/d05177455fb063048f7cdb2a00b47259/authenticate?key=52fda32d20b2e26de28953536ea9f082"
    }
  ]
}
```

[Webhook orders/paid] Deleted Redis key:
cart:d05177455fb063048f7cdb2a00b47259:checkout_attribution [Webhook orders/paid]
Meta CAPI Success Response:

```json
{
  "events_received": 1,
  "messages": [],
  "fbtrace_id": "A74tS4X63VMzgf5xl8oOpM7"
}
```
