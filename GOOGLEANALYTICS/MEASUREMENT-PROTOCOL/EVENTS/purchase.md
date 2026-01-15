## `purchase`

This event signifies when one or more items is purchased by a user.

### Parameters

| Name             | Type                                                                                                                      | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------ | :------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `currency`       | `string`                                                                                                                  | Yes\*    | USD           | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. Value metrics on the `view_item` event to not contribute to revenue \* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                                                   |
| `value`          | `number`                                                                                                                  | Yes\*    | 30.03         | The monetary value of the event. \* Set `value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `customer_type`  | `string` (`new` / `returning`)                                                                                            | No       | new           | Is the conversion from a \`new\` or \`returning\` customer? `new`: New customer who hasn't purchased within a given time period (540-day window recommended and set at default, but not required). `returning`: A returning customer who has purchased during the given time period. Don't specify a value if there's uncertainty (for example, if the user checked out as a guest).        |
| `transaction_id` | `string`                                                                                                                  | Yes      | T_12345       | The unique identifier of a transaction. The `transaction_id` parameter helps you avoid getting duplicate events for a purchase.                                                                                                                                                                                                                                                             |
| `coupon`         | `string`                                                                                                                  | No       | SUMMER_FUN    | The coupon name/code associated with the event. Event-level and item-level `coupon` parameters are independent.                                                                                                                                                                                                                                                                             |
| `shipping`       | `number`                                                                                                                  | No       | 3.33          | Shipping cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                |
| `tax`            | `number`                                                                                                                  | No       | 1.11          | Tax cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                     |
| `items`          | [`Array<Item>`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#purchase_item) | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                                                    |

#### Item parameters

| Name             | Type     | Required | Example value                                                       | Description                                                                                                                                                                                                                                                                                                                                               |
| :--------------- | :------- | :------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | `string` | Yes\*    | SKU_12345                                                           | The ID of the item. \*One of `item_id` or `item_name` is required.                                                                                                                                                                                                                                                                                        |
| `item_name`      | `string` | Yes\*    | Stan and Friends Tee                                                | The name of the item. \*One of `item_id` or `item_name` is required.                                                                                                                                                                                                                                                                                      |
| `affiliation`    | `string` | No       | Google Store                                                        | A product affiliation to designate a supplying company or brick and mortar store location. Note: \`affiliation\` is only available at the item-scope.                                                                                                                                                                                                     |
| `coupon`         | `string` | No       | SUMMER_FUN                                                          | The coupon name/code associated with the item. Event-level and item-level `coupon` parameters are independent.                                                                                                                                                                                                                                            |
| `discount`       | `number` | No       | 2.22                                                                | The unit monetary discount value associated with the item.                                                                                                                                                                                                                                                                                                |
| `index`          | `number` | No       | 5                                                                   | The index/position of the item in a list.                                                                                                                                                                                                                                                                                                                 |
| `item_brand`     | `string` | No       | Google                                                              | The brand of the item.                                                                                                                                                                                                                                                                                                                                    |
| `item_category`  | `string` | No       | Apparel                                                             | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                                                                                       |
| `item_category2` | `string` | No       | Adult                                                               | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                        |
| `item_category3` | `string` | No       | Shirts                                                              | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                         |
| `item_category4` | `string` | No       | Crew                                                                | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                        |
| `item_category5` | `string` | No       | Short sleeve                                                        | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                                                                                         |
|                  |          |          |                                                                     |                                                                                                                                                                                                                                                                                                                                                           |
| `item_list_id`   | `string` | No       | related_products                                                    | The ID of the list in which the item was presented to the user. If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present.                                                                                                                                                                                |
| `item_list_name` | `string` | No       | Related products                                                    | The name of the list in which the item was presented to the user. If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present.                                                                                                                                                                          |
| `item_variant`   | `string` | No       | green                                                               | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                                                                                       |
| `location_id`    | `string` | No       | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: \`location id\` is only available at the item-scope. |
| `price`          | `number` | No       | 10.01                                                               | The monetary unit price of the item, in units of the specified currency parameter. If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter.                                                                                                                           |
| `quantity`       | `number` | No       | 3                                                                   | Item quantity.If not set, `quantity` is set to 1\.                                                                                                                                                                                                                                                                                                        |

In addition to the prescribed parameters, you can include up to 27
[custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce)
in the `items` array.

### Send Event

[Try this event in the Google Analytics Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/?c=purchase)

```
const measurementId = `G-XXXXXXXXXX`;
const apiSecret = `<secret_value>`;

fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "purchase",
      "params": {
        "currency": "USD",
        "transaction_id": "T_12345",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "shipping": 3.33,
        "tax": 1.11,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```
