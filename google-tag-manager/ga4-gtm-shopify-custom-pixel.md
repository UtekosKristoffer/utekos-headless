# Event: purchase

This event signifies when one or more items is purchased by a user.

## Parameters

| Name             | Type                         | Required | Example Value | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ---------------------------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`       | string                       | Yes\*    | `USD`         | Currency of the items associated with the event, in 3-letter ISO 4217 format.<br><br>**Note:** Value metrics on the `view_item` event do not contribute to revenue.<br><br>\*If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                                                                                            |
| `value`          | number                       | Yes\*    | `30.03`       | The monetary value of the event.<br><br>_Set `value` to the sum of `(price _ quantity)`for all items in`items`. Don't include shipping or tax.<br>*`value`is typically required for meaningful reporting. If you mark the event as a key event then it's recommended you set`value`.<br>*`currency`is required if you set`value`.                                                                     |
| `customer_type`  | string (`new` / `returning`) | No       | `new`         | Is the conversion from a `new` or `returning` customer?<br><br>- `new`: New customer who hasn't purchased within a given time period (540-day window recommended and set at default, but not required).<br>- `returning`: A returning customer who has purchased during the given time period.<br><br>Don't specify a value if there's uncertainty (for example, if the user checked out as a guest). |
| `transaction_id` | string                       | Yes      | `T_12345`     | The unique identifier of a transaction.<br><br>The `transaction_id` parameter helps you avoid getting duplicate events for a purchase.                                                                                                                                                                                                                                                                |
| `coupon`         | string                       | No       | `SUMMER_FUN`  | The coupon name/code associated with the event.<br><br>Event-level and item-level coupon parameters are independent.                                                                                                                                                                                                                                                                                  |
| `shipping`       | number                       | No       | `3.33`        | Shipping cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                          |
| `tax`            | number                       | No       | `1.11`        | Tax cost associated with a transaction.                                                                                                                                                                                                                                                                                                                                                               |
| `items`          | Array<Item>                  | Yes      |               | The items for the event.                                                                                                                                                                                                                                                                                                                                                                              |

## Item Parameters

| Name             | Type   | Required | Example Value                 | Description                                                                                                                                                                                                                                                                        |
| ---------------- | ------ | -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `item_id`        | string | Yes\*    | `SKU_12345`                   | The ID of the item.<br><br>\*One of `item_id` or `item_name` is required.                                                                                                                                                                                                          |
| `item_name`      | string | Yes\*    | `Stan and Friends Tee`        | The name of the item.<br><br>\*One of `item_id` or `item_name` is required.                                                                                                                                                                                                        |
| `affiliation`    | string | No       | `Google Store`                | A product affiliation to designate a supplying company or brick and mortar store location.<br><br>**Note:** `affiliation` is only available at the item-scope.                                                                                                                     |
| `coupon`         | string | No       | `SUMMER_FUN`                  | The coupon name/code associated with the item.<br><br>Event-level and item-level coupon parameters are independent.                                                                                                                                                                |
| `discount`       | number | No       | `2.22`                        | The unit monetary discount value associated with the item.                                                                                                                                                                                                                         |
| `index`          | number | No       | `5`                           | The index/position of the item in a list.                                                                                                                                                                                                                                          |
| `item_brand`     | string | No       | `Google`                      | The brand of the item.                                                                                                                                                                                                                                                             |
| `item_category`  | string | No       | `Apparel`                     | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category.                                                                                                                                                                |
| `item_category2` | string | No       | `Adult`                       | The second category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                 |
| `item_category3` | string | No       | `Shirts`                      | The third category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                  |
| `item_category4` | string | No       | `Crew`                        | The fourth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                 |
| `item_category5` | string | No       | `Short sleeve`                | The fifth category hierarchy or additional taxonomy for the item.                                                                                                                                                                                                                  |
| `item_list_id`   | string | No       | `related_products`            | The ID of the list in which the item was presented to the user.<br><br>If set, event-level `item_list_id` is ignored.<br>If not set, event-level `item_list_id` is used, if present.                                                                                               |
| `item_list_name` | string | No       | `Related products`            | The name of the list in which the item was presented to the user.<br><br>If set, event-level `item_list_name` is ignored.<br>If not set, event-level `item_list_name` is used, if present.                                                                                         |
| `item_variant`   | string | No       | `green`                       | The item variant or unique code or description for additional item details/options.                                                                                                                                                                                                |
| `location_id`    | string | No       | `ChIJIQBpAG2ahYAR_6128GcTUEo` | The physical location associated with the item (e.g. the physical store location). It's recommended to use the Google Place ID that corresponds to the associated item. A custom location ID can also be used.<br><br>**Note:** `location_id` is only available at the item-scope. |
| `price`          | number | No       | `10.01`                       | The monetary unit price of the item, in units of the specified currency parameter.<br><br>If a discount applies to the item, set `price` to the discounted unit price and specify the unit price discount in the `discount` parameter.                                             |
| `quantity`       | number | No       | `3`                           | Item quantity.<br><br>If not set, `quantity` is set to 1.                                                                                                                                                                                                                          |

**Additional Parameters:** In addition to the prescribed parameters, you can
include up to 27 custom parameters in the `items` array.

## Example Implementation

### Tag Manager Configuration

**Tag Configuration:**

- **Tag Type:** GA4 Event
- **Event Name:** `purchase`
- **Event Parameters:**
  - `items` - `{{Ecommerce Items}}`
  - `transaction_id` - `{{Ecommerce Transaction ID}}`
  - `value` - `{{Ecommerce Value}}`
  - `tax` - `{{Ecommerce Tax}}`
  - `shipping` - `{{Ecommerce Shipping}}`
  - `currency` - `{{Ecommerce Currency}}`
  - `coupon` - `{{Ecommerce Coupon}}`

**Trigger Configuration:**

- **Trigger Type:** Custom Event
- **Event Name:** `purchase`
- **This trigger fires on:** All Custom Events

### Code Example

```javascript
// Clear the previous ecommerce object
dataLayer.push({ ecommerce: null })

// Push the purchase event
dataLayer.push({
  event: 'purchase',
  ecommerce: {
    transaction_id: 'T_12345',
    value: 72.05, // Sum of (price * quantity) for all items
    tax: 3.6,
    shipping: 5.99,
    currency: 'USD',
    coupon: 'SUMMER_SALE',
    customer_type: 'new',
    items: [
      {
        item_id: 'SKU_12345',
        item_name: 'Stan and Friends Tee',
        affiliation: 'Google Merchandise Store',
        coupon: 'SUMMER_FUN',
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
        quantity: 3
      },
      {
        item_id: 'SKU_12346',
        item_name: "Google Grey Women's Tee",
        affiliation: 'Google Merchandise Store',
        coupon: 'SUMMER_FUN',
        discount: 3.33,
        index: 1,
        item_brand: 'Google',
        item_category: 'Apparel',
        item_category2: 'Adult',
        item_category3: 'Shirts',
        item_category4: 'Crew',
        item_category5: 'Short sleeve',
        item_list_id: 'related_products',
        item_list_name: 'Related Products',
        item_variant: 'gray',
        location_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
        price: 21.01,
        promotion_id: 'P_12345',
        promotion_name: 'Summer Sale',
        quantity: 2
      }
    ]
  }
})
```

## Prerequisites

Before implementing this code, ensure the following setup is complete:

### Step 1: Google Tag Manager (GTM) or Global Site Tag (gtag.js) Setup

- Ensure you have a Google Analytics 4 property configured
- Implement Google Tag Manager on your website or use the global site tag
  (gtag.js)
- This code relies on the `dataLayer` object, which is typically initialized by
  GTM or gtag.js
- Verify that your Google Tag Manager container or gtag.js snippet is correctly
  installed on all pages where you intend to track e-commerce events
- For more information on GTM, refer to the
  [official documentation](https://developers.google.com/tag-manager)

## Code Walkthrough

### Clear Previous E-commerce Data

```javascript
dataLayer.push({ ecommerce: null })
```

Before pushing a new e-commerce event like a purchase, it's good practice to
clear any previously existing `ecommerce` object in the `dataLayer`. This
prevents unintended data from being sent with the new event. Setting `ecommerce`
to `null` ensures a clean state for the subsequent event.

### Define the 'purchase' Event

```javascript
dataLayer.push({
  event: "purchase",
  ecommerce: {
```

This line initiates a `dataLayer.push` for a purchase event. The `event` key
specifies the type of interaction being tracked, which in this case is a
completed purchase. The `ecommerce` object will contain all the details related
to this transaction.

### Provide Transaction-Level Details

```javascript
transaction_id: "T_12345",
value: 72.05, // Sum of (price * quantity) for all items
tax: 3.60,
shipping: 5.99,
currency: "USD",
coupon: "SUMMER_SALE",
customer_type: "new",
```

Within the `ecommerce` object, these fields describe the overall transaction:

- **`transaction_id`**: A unique identifier for the purchase. This is crucial
  for de-duplication and joining data.
- **`value`**: The total revenue of the transaction, typically the sum of item
  prices multiplied by quantities, after discounts and before tax/shipping.
- **`tax`**: The total tax amount for the transaction.
- **`shipping`**: The total shipping cost for the transaction.
- **`currency`**: The currency used for the transaction (e.g., USD).
- **`coupon`**: Any coupon code applied to the entire transaction.
- **`customer_type`**: A custom dimension to categorize the customer (e.g., new
  or returning).

### Define First Item Details

The `items` array contains details for each product included in the purchase.
The first item in this example is a "Stan and Friends Tee":

- **`item_id`**: Unique identifier for the product
- **`item_name`**: The name of the product
- **`affiliation`**: The store or affiliation where the item was purchased
- **`coupon`**: A coupon specific to this item
- **`discount`**: Discount applied to this specific item
- **`index`**: The item's position in a list or collection
- **`item_brand`**: The brand of the item
- **`item_category` to `item_category5`**: Up to five levels of categorization
  for the item
- **`item_list_id` and `item_list_name`**: Identifiers for the list from which
  the item was selected
- **`item_variant`**: Specific variant of the item (e.g., color, size)
- **`location_id`**: A geographical ID relevant to the item's location
- **`price`**: The price of a single unit of the item
- **`quantity`**: The number of units purchased

### Define Second Item Details and Complete the Event

The second item in the purchase is a "Google Grey Women's Tee", following the
same structure as the first item. It also includes `promotion_id` and
`promotion_name` specific to this item, indicating that it might have been part
of a particular promotion. The closing braces complete the `items` array, the
`ecommerce` object, and finally, the `dataLayer.push` call for the purchase
event.

This comprehensive `dataLayer` structure allows for detailed reporting and
analysis of individual items within a purchase, along with overall transaction
metrics in Google Analytics 4.
