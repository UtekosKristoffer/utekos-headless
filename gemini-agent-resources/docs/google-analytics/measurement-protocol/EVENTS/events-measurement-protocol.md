# Google Analytics: Measurement Protocol - EVENTS

> **Important:** Use `app_instance_id` instead of `client_id` for App events.

## `ad_impression`

This event is available only for App streams.

Use this event when a user sees an ad impression.

> An `ad_impression` sent using the Measurement Protocol will not be included in
> exports to other advertising platforms such as Google Ads. Sending
> `ad_impression` events using the Measurement Protocol can cause duplicate
> impressions if you've configured tagging or the SDK for your linked Google
> advertising products. Only send an `ad_impression` event using the Measurement
> Protocol if the event wasn't captured by tagging or the SDK.

### Parameters

| Name           | Type   | Required | Example value | Description                                                                                                                                                                                |
| -------------- | ------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ad_platform`  | string | No       | `MoPub`       | The ad platform.                                                                                                                                                                           |
| `ad_source`    | string | No       | `AdColony`    | The ad source.                                                                                                                                                                             |
| `ad_format`    | string | No       | `Banner`      | The ad format.                                                                                                                                                                             |
| `ad_unit_name` | string | No       | `Banner_03`   | The ad unit name.                                                                                                                                                                          |
| `currency`     | string | No       | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._** |
| `value`        | number | No       | `3.99`        | The value of the ad impression. <br><br> \***\*`value` is typically required for meaningful reporting.** <br> \***_`currency` is required if you set `value`._**                           |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      app_instance_id: 'app_instance_id',
      events: [
        {
          name: 'ad_impression',
          params: {
            ad_platform: 'MoPub',
            ad_source: 'AdColony',
            ad_format: 'Banner',
            ad_unit_name: 'Banner_03',
            currency: 'USD',
            value: 3.99
          }
        }
      ]
    })
  }
)
```

## `add_payment_info`

This event signifies a user has submitted their payment information in an
ecommerce checkout process.

### Parameters

| Name           | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`     | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`        | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `coupon`       | string      | No       | `SUMMER_FUN`  | The coupon name/code associated with the event. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                                                                                            |
| `payment_type` | string      | No       | `Credit Card` | The chosen method of payment.                                                                                                                                                                                                                                                                                                                                       |
| `items`        | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'add_payment_info',
          params: {
            currency: 'USD',
            value: 30.03,
            coupon: 'SUMMER_FUN',
            payment_type: 'Credit Card',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `add_shipping_info`

This event signifies a user has submitted their shipping information in an
ecommerce checkout process.

### Parameters

| Name            | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`      | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`         | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `coupon`        | string      | No       | `SUMMER_FUN`  | The coupon name/code associated with the event. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                                                                                            |
| `shipping_tier` | string      | No       | `Ground`      | The shipping tier (e.g. Ground, Air, Next-day) selected for delivery of the purchased item.                                                                                                                                                                                                                                                                         |
| `items`         | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'add_shipping_info',
          params: {
            currency: 'USD',
            value: 30.03,
            coupon: 'SUMMER_FUN',
            shipping_tier: 'Ground',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `add_to_cart`

This event signifies that an item was added to a cart for purchase.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'add_to_cart',
          params: {
            currency: 'USD',
            value: 30.03,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `add_to_wishlist`

The event signifies that an item was added to a wishlist. Use this event to
identify popular gift items in your app.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'add_to_wishlist',
          params: {
            currency: 'USD',
            value: 30.03,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `begin_checkout`

This event signifies that a user has begun a checkout.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `coupon`   | string      | No       | `SUMMER_FUN`  | The coupon name/code associated with the event. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                                                                                            |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'begin_checkout',
          params: {
            currency: 'USD',
            value: 30.03,
            coupon: 'SUMMER_FUN',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `campaign_details`

Use this event to send campaign details that will be applied to events with a
timestamp greater than or equal to the timestamp of the `campaign_details`
event.

> **Note:** The `campaign_details` event won't be visible in Google Analytics
> reports or DebugView. If you have BigQuery export enabled, this event will be
> present in your BigQuery event export data.

### Parameters

| Name          | Type   | Required | Example value   | Description                                                                                                                  |
| ------------- | ------ | -------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `campaign_id` | string | No       | `google_1234`   | The campaign id.                                                                                                             |
| `campaign`    | string | No       | `Summer_fun`    | The name used to identify a specific promotion or strategic campaign.                                                        |
| `source`      | string | No       | `google`        | The campaign traffic source (e.g. google, email, etc.).                                                                      |
| `medium`      | string | No       | `cpc`           | The campaign medium (e.g. email, cost-per-click, etc.)                                                                       |
| `term`        | string | No       | `summer+travel` | The campaign term used with paid search to supply the keywords for ads.                                                      |
| `content`     | string | No       | `logolink`      | The campaign content used for A/B testing and content-targeted ads to differentiate ads or links that point to the same URL. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'campaign_details',
          params: {
            campaign_id: 'google_1234',
            campaign: 'Summer_fun',
            source: 'google',
            medium: 'cpc',
            term: 'summer+travel',
            content: 'logolink'
          }
        }
      ]
    })
  }
)
```

## `close_convert_lead`

This event measures when a lead has been converted and closed (for example,
through a purchase).

### Parameters

| Name       | Type   | Required | Example value | Description                                                                                                                                                                                                                                   |
| ---------- | ------ | -------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string | Yes\*    | `USD`         | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`    | number | Yes\*    | `30.03`       | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'close_convert_lead',
          params: {
            currency: 'USD',
            value: 30.03
          }
        }
      ]
    })
  }
)
```

## `close_unconvert_lead`

This event measures when a user is marked as not becoming a converted lead,
along with the reason.

### Parameters

| Name                    | Type   | Required | Example value     | Description                                                                                                                                                                                                                                   |
| ----------------------- | ------ | -------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`              | string | Yes\*    | `USD`             | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`                 | number | Yes\*    | `30.03`           | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `unconvert_lead_reason` | string | No       | `Never responded` | The reason the lead was unconverted.                                                                                                                                                                                                          |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'close_unconvert_lead',
          params: {
            currency: 'USD',
            value: 30.03,
            unconvert_lead_reason: 'Never responded'
          }
        }
      ]
    })
  }
)
```

## `disqualify_lead`

This event measures when a user is marked as disqualified to become a lead,
along with the reason for the disqualification.

### Parameters

| Name                       | Type   | Required | Example value        | Description                                                                                                                                                                                                                                   |
| -------------------------- | ------ | -------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`                 | string | Yes\*    | `USD`                | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`                    | number | Yes\*    | `30.03`              | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `disqualified_lead_reason` | string | No       | `Not looking to buy` | The reason a lead was marked as disqualified.                                                                                                                                                                                                 |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'disqualify_lead',
          params: {
            currency: 'USD',
            value: 30.03,
            disqualified_lead_reason: 'Not looking to buy'
          }
        }
      ]
    })
  }
)
```

## `earn_virtual_currency`

This event measures when a user is awarded virtual currency in a game. Log this
along with `spend_virtual_currency` to better understand your virtual economy.

### Parameters

| Name                    | Type   | Required | Example value | Description                        |
| ----------------------- | ------ | -------- | ------------- | ---------------------------------- |
| `virtual_currency_name` | string | No       | `Gems`        | The name of the virtual currency.  |
| `value`                 | number | No       | `5`           | The value of the virtual currency. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'earn_virtual_currency',
          params: {
            virtual_currency_name: 'Gems',
            value: 5
          }
        }
      ]
    })
  }
)
```

## `generate_lead`

This event measures when a lead has been generated (for example, through a
form). Log this to understand the effectiveness of your marketing campaigns and
how many customers re-engage with your business after remarketing to the
customers.

### Parameters

| Name          | Type   | Required | Example value | Description                                                                                                                                                                                                                                   |
| ------------- | ------ | -------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`    | string | Yes\*    | `USD`         | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`       | number | Yes\*    | `30.03`       | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `lead_source` | string | No       | `Trade show`  | The source of the lead.                                                                                                                                                                                                                       |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'generate_lead',
          params: {
            currency: 'USD',
            value: 30.03,
            lead_source: 'Trade show'
          }
        }
      ]
    })
  }
)
```

## `in_app_purchase`

This event is available only for App streams.

Use this event when a user makes an in app purchase.

> **Caution:** Don't send an `in_app_purchase` event using the Measurement
> Protocol if it duplicates an event sent by the Google Analytics for Firebase
> (GA4F) SDK. Google Analytics doesn't automatically detect or remove duplicate
> `in_app_purchase` events.

### Parameters

| Name                  | Type    | Required | Example value  | Description                                                                                                                                                                                                                                   |
| --------------------- | ------- | -------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`            | string  | Yes\*    | `USD`          | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`               | number  | Yes\*    | `30.03`        | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `quantity`            | number  | No       | `3`            | Item quantity. <br> _If not set, quantity is set to 1._                                                                                                                                                                                       |
| `product_id`          | string  | No       | `ABC123456789` | The ID of the product.                                                                                                                                                                                                                        |
| `subscription`        | boolean | No       | `true`         | Indicates if the purchase is a subscription. <br> _If not set, defaults to `false`._                                                                                                                                                          |
| `free_trial`          | boolean | No       | `true`         | Indicates if the event is for a free trial of a subscription. <br> _If not set, defaults to `false`._                                                                                                                                         |
| `price_is_discounted` | boolean | No       | `false`        | Indicates if the price is discounted. <br> _If not set, defaults to `false`._                                                                                                                                                                 |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      app_instance_id: 'app_instance_id',
      events: [
        {
          name: 'in_app_purchase',
          params: {
            currency: 'USD',
            value: 30.03,
            quantity: 3,
            product_id: 'ABC123456789',
            subscription: true,
            free_trial: false,
            price_is_discounted: false
          }
        }
      ]
    })
  }
)
```

## `join_group`

Log this event when a user joins a group such as a guild, team, or family. Use
this event to analyze how popular certain groups or social features are.

### Parameters

| Name       | Type   | Required | Example value | Description          |
| ---------- | ------ | -------- | ------------- | -------------------- |
| `group_id` | string | No       | `G_12345`     | The ID of the group. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'join_group',
          params: {
            group_id: 'G_12345'
          }
        }
      ]
    })
  }
)
```

## `level_up`

This event signifies that a player has leveled up in a game. Use it to gauge the
level distribution of your user base and identify levels that are difficult to
complete.

### Parameters

| Name        | Type   | Required | Example value | Description                    |
| ----------- | ------ | -------- | ------------- | ------------------------------ |
| `level`     | number | No       | `5`           | The level of the character.    |
| `character` | string | No       | `Player 1`    | The character that leveled up. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'level_up',
          params: {
            level: 5,
            character: 'Player 1'
          }
        }
      ]
    })
  }
)
```

## `login`

Send this event to signify that a user has logged in to your website or app.

### Parameters

| Name     | Type   | Required | Example value | Description               |
| -------- | ------ | -------- | ------------- | ------------------------- |
| `method` | string | No       | `Google`      | The method used to login. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'login',
          params: {
            method: 'Google'
          }
        }
      ]
    })
  }
)
```

## `post_score`

Send this event when the user posts a score. Use this event to understand how
users are performing in your game and correlate high scores with audiences or
behaviors.

### Parameters

| Name        | Type   | Required | Example value | Description                            |
| ----------- | ------ | -------- | ------------- | -------------------------------------- |
| `score`     | number | Yes      | `10000`       | The score to post.                     |
| `level`     | number | No       | `5`           | The level for the score.               |
| `character` | string | No       | `Player 1`    | The character that achieved the score. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'post_score',
          params: {
            score: 10000,
            level: 5,
            character: 'Player 1'
          }
        }
      ]
    })
  }
)
```

## `purchase`

This event signifies when one or more items is purchased by a user.

### Parameters

| Name             | Type                     | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------ | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | string                   | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                                                             |
| `value`          | number                   | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._**                                   |
| `customer_type`  | string (new / returning) | No       | `new`         | Is the conversion from a `new` or `returning` customer? <br> `new`: New customer who hasn't purchased within a given time period (540-day window recommended and set at default, but not required). <br> `returning`: A returning customer who has purchased during the given time period. <br><br> _Don't specify a value if there's uncertainty (for example, if the user checked out as a guest)._ |
| `transaction_id` | string                   | Yes      | `T_12345`     | The unique identifier of a transaction. <br><br> _The `transaction_id` parameter helps you avoid getting duplicate events for a purchase._                                                                                                                                                                                                                                                            |
| `coupon`         | string                   | No       | `SUMMER_FUN`  | The coupon name/code associated with the event. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                                                                                                                              |
| `shipping`       | number                   | No       | `3.33`        | Shipping cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                          |
| `tax`            | number                   | No       | `1.11`        | Tax cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                               |
| `items`          | Array<Item>              | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                                                              |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'purchase',
          params: {
            currency: 'USD',
            transaction_id: 'T_12345',
            value: 30.03,
            coupon: 'SUMMER_FUN',
            shipping: 3.33,
            tax: 1.11,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `qualify_lead`

This event measures when a user is marked as meeting the criteria to become a
qualified lead.

### Parameters

| Name       | Type   | Required | Example value | Description                                                                                                                                                                                                                                   |
| ---------- | ------ | -------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string | Yes\*    | `USD`         | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`    | number | Yes\*    | `30.03`       | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'qualify_lead',
          params: {
            currency: 'USD',
            value: 30.03
          }
        }
      ]
    })
  }
)
```

## `refund`

This event signifies when one or more items is refunded to a user.

> **Note:** We recommend that you include item information in your refund event
> to see item-level refund metrics in Analytics.

### Parameters

| Name             | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `transaction_id` | string      | Yes      | `T_12345`     | The unique identifier of a transaction.                                                                                                                                                                                                                                                                                                                             |
| `value`          | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `coupon`         | string      | No       | `SUMMER_FUN`  | The coupon name/code associated with the event. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                                                                                            |
| `shipping`       | number      | No       | `3.33`        | Shipping cost associated with a transaction.                                                                                                                                                                                                                                                                                                                        |
| `tax`            | number      | No       | `1.11`        | Tax cost associated with a transaction.                                                                                                                                                                                                                                                                                                                             |
| `items`          | Array<Item> | No\*     |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'refund',
          params: {
            currency: 'USD',
            transaction_id: 'T_12345',
            value: 30.03,
            coupon: 'SUMMER_FUN',
            shipping: 3.33,
            tax: 1.11,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `remove_from_cart`

This event signifies that an item was removed from a cart.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'remove_from_cart',
          params: {
            currency: 'USD',
            value: 30.03,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `screen_view`

This event is available only for App streams.

Use this event to signify a screen transition has occurred.

### Parameters

| Name           | Type   | Required | Example value  | Description              |
| -------------- | ------ | -------- | -------------- | ------------------------ |
| `screen_class` | string | No       | `MainActivity` | The class of the screen. |
| `screen_name`  | string | No       | `About`        | The name of the screen.  |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      app_instance_id: 'app_instance_id',
      events: [
        {
          name: 'screen_view',
          params: {
            screen_class: 'MainActivity',
            screen_name: 'About'
          }
        }
      ]
    })
  }
)
```

## `search`

Log this event to indicate when the user has performed a search. You can use
this event to identify what users are searching for on your website or app. For
example, you could send this event when a user views a search results page after
performing a search.

### Parameters

| Name          | Type   | Required | Example value | Description                     |
| ------------- | ------ | -------- | ------------- | ------------------------------- |
| `search_term` | string | Yes      | `t-shirts`    | The term that was searched for. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'search',
          params: {
            search_term: 't-shirts'
          }
        }
      ]
    })
  }
)
```

## `select_content`

This event signifies that a user has selected some content of a certain type.
This event can help you identify popular content and categories of content on
your website or app.

### Parameters

| Name           | Type   | Required | Example value | Description                                      |
| -------------- | ------ | -------- | ------------- | ------------------------------------------------ |
| `content_type` | string | No       | `product`     | The type of selected content.                    |
| `content_id`   | string | No       | `C_12345`     | An identifier for the content that was selected. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'select_content',
          params: {
            content_type: 'product',
            content_id: 'C_12345'
          }
        }
      ]
    })
  }
)
```

## `select_item`

This event signifies an item was selected from a list.

### Parameters

| Name             | Type        | Required | Example value      | Description                                                                                                                                                                                                        |
| ---------------- | ----------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `item_list_id`   | string      | No       | `related_products` | The ID of the list in which the item was presented to the user. <br><br> _Ignored if set at the item-level._                                                                                                       |
| `item_list_name` | string      | No       | `Related products` | The name of the list in which the item was presented to the user. <br><br> _Ignored if set at the item-level._                                                                                                     |
| `items`          | Array<Item> | Yes\*    |                    | The items for the event. <br><br> **_The `items` array is expected to have a single element, representing the selected item. If multiple elements are provided, only the first element in `items` will be used._** |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'select_item',
          params: {
            item_list_id: 'related_products',
            item_list_name: 'Related products',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `select_promotion`

This event signifies a promotion was selected from a list.

### Parameters

| Name             | Type        | Required | Example value    | Description                                                                                                       |
| ---------------- | ----------- | -------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| `creative_name`  | string      | No       | `summer_banner2` | The name of the promotional creative. <br><br> _Ignored if set at the item-level._                                |
| `creative_slot`  | string      | No       | `featured_app_1` | The name of the promotional creative slot associated with the event. <br><br> _Ignored if set at the item-level._ |
| `promotion_id`   | string      | No       | `P_12345`        | The ID of the promotion associated with the event. <br><br> _Ignored if set at the item-level._                   |
| `promotion_name` | string      | No       | `Summer Sale`    | The name of the promotion associated with the event. <br><br> _Ignored if set at the item-level._                 |
| `items`          | Array<Item> | No       |                  | The items for the event.                                                                                          |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `creative_name`  | string | No       | `summer_banner2`              | The name of the promotional creative. <br><br> _If set, event-level `creative_name` is ignored._ <br> _If not set, event-level `creative_name` is used, if present._                                                                                                                   |
| `creative_slot`  | string | No       | `featured_app_1`              | The name of the promotional creative slot associated with the item. <br><br> _If set, event-level `creative_slot` is ignored._ <br> _If not set, event-level `creative_slot` is used, if present._                                                                                     |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `promotion_id`   | string | No       | `P_12345`                     | The ID of the promotion associated with the item. <br><br> _If set, event-level `promotion_id` is ignored._ <br> _If not set, event-level `promotion_id` is used, if present._                                                                                                         |
| `promotion_name` | string | No       | `Summer Sale`                 | The name of the promotion associated with the item. <br><br> _If set, event-level `promotion_name` is ignored._ <br> _If not set, event-level `promotion_name` is used, if present._                                                                                                   |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'select_promotion',
          params: {
            creative_name: 'Summer Banner',
            creative_slot: 'featured_app_1',
            promotion_id: 'P_12345',
            promotion_name: 'Summer Sale',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                creative_name: 'summer_banner2',
                creative_slot: 'featured_app_1',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                promotion_id: 'P_12345',
                promotion_name: 'Summer Sale',
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `share`

Use this event when a user has shared content.

### Parameters

| Name           | Type   | Required | Example value | Description                                |
| -------------- | ------ | -------- | ------------- | ------------------------------------------ |
| `method`       | string | No       | `Twitter`     | The method in which the content is shared. |
| `content_type` | string | No       | `image`       | The type of shared content.                |
| `item_id`      | string | No       | `C_12345`     | The ID of the shared content.              |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'share',
          params: {
            method: 'Twitter',
            content_type: 'image',
            item_id: 'C_12345'
          }
        }
      ]
    })
  }
)
```

## `sign_up`

This event indicates that a user has signed up for an account. Use this event to
understand the different behaviors of logged in and logged out users.

### Parameters

| Name     | Type   | Required | Example value | Description                  |
| -------- | ------ | -------- | ------------- | ---------------------------- |
| `method` | string | No       | `Google`      | The method used for sign up. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'sign_up',
          params: {
            method: 'Google'
          }
        }
      ]
    })
  }
)
```

## `spend_virtual_currency`

This event measures the sale of virtual goods in your app and helps you identify
which virtual goods are the most popular.

### Parameters

| Name                    | Type   | Required | Example value   | Description                                                  |
| ----------------------- | ------ | -------- | --------------- | ------------------------------------------------------------ |
| `value`                 | number | Yes      | `5`             | The value of the virtual currency.                           |
| `virtual_currency_name` | string | Yes      | `Gems`          | The name of the virtual currency.                            |
| `item_name`             | string | No       | `Starter Boost` | The name of the item the virtual currency is being used for. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'spend_virtual_currency',
          params: {
            value: 5,
            virtual_currency_name: 'Gems',
            item_name: 'Starter Boost'
          }
        }
      ]
    })
  }
)
```

## `tutorial_begin`

This event signifies the start of the on-boarding process. Use this in a funnel
with `tutorial_complete` to understand how many users complete the tutorial.

### Parameters

No parameters are suggested for this event.

There are no parameters for this event.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'tutorial_begin'
        }
      ]
    })
  }
)
```

## `tutorial_complete`

This event signifies the user's completion of your on-boarding process. Use this
in a funnel with `tutorial_begin` to understand how many users complete the
tutorial.

### Parameters

No parameters are suggested for this event.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'tutorial_complete'
        }
      ]
    })
  }
)
```

## `unlock_achievement`

Log this event when the user has unlocked an achievement. This event can help
you understand how users are experiencing your game.

### Parameters

| Name             | Type   | Required | Example value | Description                                  |
| ---------------- | ------ | -------- | ------------- | -------------------------------------------- |
| `achievement_id` | string | Yes      | `A_12345`     | The id of the achievement that was unlocked. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'unlock_achievement',
          params: {
            achievement_id: 'A_12345'
          }
        }
      ]
    })
  }
)
```

## `view_cart`

This event signifies that a user viewed their cart.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'view_cart',
          params: {
            currency: 'USD',
            value: 7.77,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `view_item`

This event signifies that some content was shown to the user. Use this event to
discover the most popular items viewed.

### Parameters

| Name       | Type        | Required | Example value | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | string      | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                                           |
| `value`    | number      | Yes\*    | `30.03`       | The monetary value of the event. <br><br> **_Set `value` to the sum of (`price` _ `quantity`) for all items in `items`. Don't include shipping or tax.\*** <br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `items`    | Array<Item> | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                            |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'view_item',
          params: {
            currency: 'USD',
            value: 7.77,
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `view_item_list`

Log this event when the user has been presented with a list of items of a
certain category.

### Parameters

| Name             | Type        | Required | Example value      | Description                                                                                                                                                                                                                                                               |
| ---------------- | ----------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | string      | Yes\*    | `USD`              | Currency of the items associated with the event, in 3-letter ISO 4217 format. <br><br> _Value metrics on the `view_item` event to not contribute to revenue_ <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._** |
| `item_list_id`   | string      | No       | `related_products` | The ID of the list in which the item was presented to the user. <br><br> _Ignored if set at the item-level._                                                                                                                                                              |
| `item_list_name` | string      | No       | `Related products` | The name of the list in which the item was presented to the user. <br><br> _Ignored if set at the item-level._                                                                                                                                                            |
| `items`          | Array<Item> | Yes      |                    | The items for the event.                                                                                                                                                                                                                                                  |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'view_item_list',
          params: {
            item_list_id: 'related_products',
            item_list_name: 'Related products',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `view_promotion`

This event signifies a promotion was viewed from a list.

### Parameters

| Name             | Type        | Required | Example value    | Description                                                                                                                                                                                                                             |
| ---------------- | ----------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creative_name`  | string      | No       | `summer_banner2` | The name of the promotional creative. <br><br> _Ignored if set at the item-level._                                                                                                                                                      |
| `creative_slot`  | string      | No       | `featured_app_1` | The name of the promotional creative slot associated with the event. <br><br> _Ignored if set at the item-level._                                                                                                                       |
| `promotion_id`   | string      | No       | `P_12345`        | The ID of the promotion associated with the event. <br><br> _Ignored if set at the item-level._                                                                                                                                         |
| `promotion_name` | string      | No       | `Summer Sale`    | The name of the promotion associated with the event. <br><br> _Ignored if set at the item-level._                                                                                                                                       |
| `items`          | Array<Item> | Yes\*    |                  | The items for the event. <br><br> **_The `items` array is expected to have a single element, representing the item associated with the promotion. If multiple elements are provided, only the first element in `items` will be used._** |

### Item parameters

| Name             | Type   | Required | Example value                 | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                        |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item. <br><br> **_One of `item_id` or `item_name` is required._**                                                                                                                                                                                                      |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location. <br><br> > **Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item. <br><br> _Event-level and item-level coupon parameters are independent._                                                                                                                                                                |
| `creative_name`  | string | No       | `summer_banner2`              | The name of the promotional creative. <br><br> _If set, event-level `creative_name` is ignored._ <br> _If not set, event-level `creative_name` is used, if present._                                                                                                                   |
| `creative_slot`  | string | No       | `featured_app_1`              | The name of the promotional creative slot associated with the item. <br><br> _If set, event-level `creative_slot` is ignored._ <br> _If not set, event-level `creative_slot` is used, if present._                                                                                     |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                             |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                              |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                                 |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                    |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                     |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                      |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_id` is ignored._ <br> _If not set, event-level `item_list_id` is used, if present._                                                                                           |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user. <br><br> _If set, event-level `item_list_name` is ignored._ <br> _If not set, event-level `item_list_name` is used, if present._                                                                                     |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                    |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used. <br><br> > **Note:** `location id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified `currency` parameter. <br><br> _If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter._                                           |
| `promotion_id`   | string | No       | `P_12345`                     | The ID of the promotion associated with the item. <br><br> _If set, event-level `promotion_id` is ignored._ <br> _If not set, event-level `promotion_id` is used, if present._                                                                                                         |
| `promotion_name` | string | No       | `Summer Sale`                 | The name of the promotion associated with the item. <br><br> _If set, event-level `promotion_name` is ignored._ <br> _If not set, event-level `promotion_name` is used, if present._                                                                                                   |
| `quantity`       | number | No       | `3`                           | Item quantity. <br><br> _If not set, quantity is set to 1._                                                                                                                                                                                                                            |

> In addition to the prescribed parameters, you can include up to 27 custom
> parameters in the `items` array.

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'view_promotion',
          params: {
            creative_name: 'Summer Banner',
            creative_slot: 'featured_app_1',
            promotion_id: 'P_12345',
            promotion_name: 'Summer Sale',
            items: [
              {
                item_id: 'SKU_12345',
                item_name: 'Stan and Friends Tee',
                affiliation: 'Google Merchandise Store',
                coupon: 'SUMMER_FUN',
                creative_name: 'summer_banner2',
                creative_slot: 'featured_app_1',
                currency: 'USD',
                discount: 2.22,
                index: 0,
                item_brand: 'Google',
                item_category: 'Apparel',
                item_category2: 'Adult',
                item_category3: 'Shirts',
                item_category4: 'Crew',
                item_category5: 'Short sleeve',
                item_list_id: 'related_products',
                item_list_name: 'Related Products',
                item_variant: 'green',
                location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
                price: 10.01,
                promotion_id: 'P_12345',
                promotion_name: 'Summer Sale',
                google_business_vertical: 'retail',
                quantity: 3
              }
            ]
          }
        }
      ]
    })
  }
)
```

## `view_search_results`

Log this event when the user has been presented with the results of a search.
Note that you can enable the `view_search_results` event for automatic
collection through Enhanced event measurement in Google Analytics.

### Parameters

| Name          | Type   | Required | Example value | Description                                                                                                                                                                                                                                                                                            |
| ------------- | ------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `search_term` | string | No       | `Clothing`    | The term used for the search. <br><br> > **Note:** The `view_search_results` event sends the `unique_search_term` parameter with a value of `1` if the search term is unique in the current session. If the search term has already been submitted in the current session, the parameter value is `0`. |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'view_search_results',
          params: {
            search_term: 'Clothing'
          }
        }
      ]
    })
  }
)
```

## `working_lead`

This event measures when a user contacts or is contacted by a representative.

### Parameters

| Name          | Type   | Required | Example value           | Description                                                                                                                                                                                                                                   |
| ------------- | ------ | -------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`    | string | Yes\*    | `USD`                   | Currency of the value of the event, in 3-letter ISO 4217 format. <br><br> **_If you set `value` then `currency` is required for revenue metrics to be computed accurately._**                                                                 |
| `value`       | number | Yes\*    | `30.03`                 | The monetary value of the event. <br><br> \***\*`value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.** <br> \***_`currency` is required if you set `value`._** |
| `lead_status` | string | No       | `Started conversations` | The status of the lead.                                                                                                                                                                                                                       |

### Send Event

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'client_id',
      events: [
        {
          name: 'working_lead',
          params: {
            currency: 'USD',
            value: 30.03,
            lead_status: 'Started conversations'
          }
        }
      ]
    })
  }
)
```
