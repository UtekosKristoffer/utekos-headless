# Purchase Event

This event signifies when one or more items is purchased by a user.

## Event Parameters

| Name             | Type                     | Required | Example Value | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------ | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | string                   | Yes\*    | USD           | Currency of the items associated with the event, in 3-letter ISO 4217 format.<br><br>**Note:** Value metrics on the view_item event to not contribute to revenue<br><br>\* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                                                                                              |
| `value`          | number                   | Yes\*    | 30.03         | The monetary value of the event.<br><br>_ Set `value` to the sum of (price _ quantity) for all items in `items`. Don't include shipping or tax.<br>_ `value` is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set `value`.<br>_ `currency` is required if you set `value`.                                                              |
| `customer_type`  | string (new / returning) | No       | new           | Is the conversion from a `new` or `returning` customer?<br><br>**new:** New customer who hasn't purchased within a given time period (540-day window recommended and set at default, but not required).<br>**returning:** A returning customer who has purchased during the given time period.<br><br>Don't specify a value if there's uncertainty (for example, if the user checked out as a guest). |
| `transaction_id` | string                   | Yes      | T_12345       | The unique identifier of a transaction.<br><br>The `transaction_id` parameter helps you avoid getting duplicate events for a purchase.                                                                                                                                                                                                                                                                |
| `coupon`         | string                   | No       | SUMMER_FUN    | The coupon name/code associated with the event.<br><br>Event-level and item-level coupon parameters are independent.                                                                                                                                                                                                                                                                                  |
| `shipping`       | number                   | No       | 3.33          | Shipping cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                          |
| `tax`            | number                   | No       | 1.11          | Tax cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                               |
| `items`          | Array<Item>              | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                                                              |

## Item Parameters

| Name             | Type   | Required | Example Value               | Description                                                                                                                                                                                                                                                                        |
| ---------------- | ------ | -------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | SKU_12345                   | The ID of the item.<br><br>\*One of `item_id` or `item_name` is required.                                                                                                                                                                                                          |
| `item_name`      | string | Yes\*    | Stan and Friends Tee        | The name of the item.<br><br>\*One of `item_id` or `item_name` is required.                                                                                                                                                                                                        |
| `affiliation`    | string | No       | Google Store                | A product affiliation to designate a supplying company or brick and mortar store location.<br><br>**Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | SUMMER_FUN                  | The coupon name/code associated with the item.<br><br>Event-level and item-level coupon parameters are independent.                                                                                                                                                                |
| `discount`       | number | No       | 2.22                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                         |
| `index`          | number | No       | 5                           | The index/position of the item in a list.                                                                                                                                                                                                                                          |
| `item_brand`     | string | No       | Google                      | The brand of the item.                                                                                                                                                                                                                                                             |
| `item_category`  | string | No       | Apparel                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                |
| `item_category2` | string | No       | Adult                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                 |
| `item_category3` | string | No       | Shirts                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                  |
| `item_category4` | string | No       | Crew                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                 |
| `item_category5` | string | No       | Short sleeve                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                  |
| `item_list_id`   | string | No       | related_products            | The ID of the list in which the item was presented to the user.<br><br>If set, event-level `item_list_id` is ignored.<br>If not set, event-level `item_list_id` is used, if present.                                                                                               |
| `item_list_name` | string | No       | Related products            | The name of the list in which the item was presented to the user.<br><br>If set, event-level `item_list_name` is ignored.<br>If not set, event-level `item_list_name` is used, if present.                                                                                         |
| `item_variant`   | string | No       | green                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                |
| `location_id`    | string | No       | ChIJIQBpAG2ahYAR_6128GcTUEo | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used.<br><br>**Note:** `location_id` is only available at the item-scope. |
| `price`          | number | No       | 10.01                       | The monetary unit price of the item, in units of the specified currency parameter.<br><br>If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter.                                             |
| `quantity`       | number | No       | 3                           | Item quantity.<br><br>If not set, `quantity` is set to 1.                                                                                                                                                                                                                          |

**Note:** In addition to the prescribed parameters, you can include up to 27
custom parameters in the items array.

## Send Event

### Code Example

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

## Prerequisites

Before we begin, let's walk through the setup to ensure we can run the code
without any issues.

### Step 1: Google Analytics 4 Setup

Before running this code, ensure you have a Google Analytics 4 property set up
and configured.

1. Obtain your `measurementId` (G-XXXXXXXXXX) from your Google Analytics 4
   property settings
2. Create an `apiSecret` for the Measurement Protocol in your Google Analytics 4
   property. Refer to the official Google Analytics documentation for steps on
   how to generate an API secret

### Step 2: Development Environment

This code snippet is a JavaScript fetch call, typically executed in a web
browser environment or a Node.js environment. Ensure you have a suitable
environment configured to run JavaScript.

## Code Walkthrough

Now, let's walk through the code. The following sections break down the
implementation, explaining the purpose of each logical chunk.

### Define Measurement ID and API Secret

```javascript
const measurementId = `G-XXXXXXXXXX`
const apiSecret = `<secret_value>`
```

This section initializes two constants: `measurementId` and `apiSecret`.

- The `measurementId` (e.g., G-XXXXXXXXXX) identifies your Google Analytics 4
  property. Replace the placeholder with your actual measurement ID obtained
  from your Google Analytics 4 settings.
- The `apiSecret` is a secret key used to authenticate requests to the Google
  Analytics Measurement Protocol. Replace `<secret_value>` with the API secret
  generated in your Google Analytics 4 property.

### Send Event Data to Google Analytics 4 Measurement Protocol

```javascript
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

This fetch call sends event data to Google Analytics 4 using the Measurement
Protocol.

**Request URL:** The URL `https://www.google-analytics.com/mp/collect` is the
endpoint for the Measurement Protocol. It includes the `measurement_id` and
`api_secret` as query parameters.

**Request Method:** The method is set to `POST` as required for sending data to
the Measurement Protocol.

**Request Body:** The body contains the event payload, which is a JSON string.

- **client_id:** A unique identifier for the user or device. This should
  typically be generated and persisted for each user.
- **events:** An array of event objects. Each event object defines an event to
  be recorded.
  - **name:** The name of the event, in this case, `purchase`.
  - **params:** An object containing parameters specific to the purchase event.

This example includes various e-commerce parameters like `currency`,
`transaction_id`, `value`, `shipping`, `tax`, and a detailed `items` array. Each
item has its own set of parameters describing the product, such as `item_id`,
`item_name`, `price`, `quantity`, etc.

This setup allows you to track specific user interactions, like purchases, on
your website or application directly through server-side or client-side HTTP
requests.
