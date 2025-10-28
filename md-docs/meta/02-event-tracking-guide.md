# Conversion Tracking

You can use the Meta Pixel to track your website visitors' actions also known as
**conversion tracking**. Tracked conversions appear in the Facebook Ads Manager
and the Facebook Events Manager, where they can be used to:

- Analyze the effectiveness of your conversion funnel
- Calculate your return on ad investment
- Define custom audiences for ad optimization and Advantage+ catalog ads
  campaigns

Once you have defined custom audiences, we can use them to identify other
Facebook users who are likely to convert and target them with your ads.

## Three Ways to Track Conversions

1. **Standard events** - Visitor actions that we have defined and that you
   report by calling a Pixel function
2. **Custom events** - Visitor actions that you have defined and that you report
   by calling a Pixel function
3. **Custom conversions** - Visitor actions that are tracked automatically by
   parsing your website's referrer URLs

### Important Update: Custom Conversions Restrictions (Effective September 2, 2025)

Beginning September 2, 2025, we will start to roll out more proactive
restrictions on custom conversions that may suggest information not permitted
under our terms. For example, any custom conversion suggesting specific health
conditions (e.g., "arthritis", "diabetes") or financial status (e.g., "credit
score", "high income") will be flagged and prevented from being used to run ad
campaigns.

#### What These Restrictions Mean for Your Campaigns

**For existing campaigns:**

- You won't be able to use flagged custom conversions when creating new
  campaigns
- If you have an active campaign using flagged custom conversions, you should
  either create a new campaign or duplicate your campaign and use a non-impacted
  custom conversion to avoid performance and optimization issues

**For API developers:**

- Beginning September 2, 2025, the field `is_unavailable` will return `true` to
  signal if your custom conversions have been flagged

More information on this update and how to resolve flagged custom conversions
can be found [here](https://www.facebook.com/business/help/2169003770019376).

## Requirements

The Pixel's base code must already be installed on every page where you want to
track conversions.

---

# Standard Events

Standard events are predefined visitor actions that correspond to common,
conversion-related activities, such as:

- Searching for a product
- Viewing a product
- Purchasing a product

Standard events support **parameters**, which allow you to include an object
containing additional information about an event, such as:

- Product IDs
- Categories
- The number of products purchased

For a full list of Standard events visit the
[Pixel Standard Events Reference](#reference-standard-events). Learn more about
conversion tracking and standard events with
[Blueprint](https://www.facebookblueprint.com).

## Tracking Standard Events

All standard events are tracked by calling the Pixel's `fbq('track')` function,
with:

- The event name
- (Optionally) A JSON object as its parameters

### Example: Tracking a Purchase Event

Here's a function call to track when a visitor has completed a purchase event,
with currency and value included as a parameter:

```javascript
fbq('track', 'Purchase', { currency: 'USD', value: 30.0 })
```

If you called that function, it would be tracked as a purchase event in the
Events Manager.

### Where to Call `fbq('track')`

You can call the `fbq('track')` function anywhere between your web page's
opening and closing `<body>` tags, either:

- When the page loads
- When a visitor completes an action, such as clicking a button

### Example 1: Track on Page Load

If you wanted to track a standard purchase event after a visitor has completed
the purchase, you could call the `fbq('track')` function on your purchase
confirmation page, like this:

```html
<body>
  ...
  <script>
    fbq('track', 'Purchase', { currency: 'USD', value: 30.0 })
  </script>
  ...
</body>
```

### Example 2: Track on Button Click

If instead you wanted to track a standard purchase event when the visitor clicks
a purchase button, you could tie the `fbq('track')` function call to the
purchase button on your checkout page, like this:

```html
<button id="addToCartButton">Purchase</button>
<script type="text/javascript">
  $('#addToCartButton').click(function () {
    fbq('track', 'Purchase', { currency: 'USD', value: 30.0 })
  })
</script>
```

**Note:** The example above uses jQuery to trigger the function call, but you
could trigger the function call using any method you wish.

---

# Track Offsite Conversions

Track offsite conversions with your Pixels by adding the `fb_pixel` field to the
`tracking_spec` parameter of your ad.
[Learn more](https://developers.facebook.com/docs/marketing-api/reference/ad-campaign).

---

# Parameters

Parameters are optional, JSON-formatted objects that you can include when
tracking standard and custom events. They allow you to provide additional
information about your website visitors' actions. Once tracked, parameters can
be used to further define any custom audiences you create.

Learn more about parameters with [Blueprint](https://www.facebookblueprint.com).

## How to Include Parameters

To include a parameter object with a standard or custom event:

1. Format your parameter data as an object using JSON
2. Include it as the third function parameter when calling the `fbq('track')` or
   `fbq('trackCustom')` functions

## Example: Purchase with Multiple Products

Let's say you wanted to track a visitor who purchased multiple products as a
result of your promotion. You could do this:

```javascript
fbq(
  'track',
  'Purchase',
  // begin parameter object data
  {
    value: 115.0,
    currency: 'USD',
    contents: [
      {
        id: '301',
        quantity: 1
      },
      {
        id: '401',
        quantity: 2
      }
    ],
    content_type: 'product'
  }
  // end parameter object data
)
```

**Important:** If you want to use data included in event parameters when
defining custom audiences, key values must not contain any spaces.

---

# Object Properties

You can include the following predefined object properties with any custom
events and any standard events that support them. Format your parameter object
data using JSON.

| Property Key        | Value Type                   | Parameter Description                                                                                                                                                                                                                                                                                                          |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content_category`  | string                       | Category of the page or product.                                                                                                                                                                                                                                                                                               |
| `content_ids`       | array of integers or strings | Product IDs associated with the event, such as SKUs. Example: `['ABC123', 'XYZ789']`.                                                                                                                                                                                                                                          |
| `content_name`      | string                       | Name of the page/product.                                                                                                                                                                                                                                                                                                      |
| `content_type`      | string                       | Can be `product` or `product_group` based on the `content_ids` or `contents` being passed. If the IDs being passed in the `content_ids` or `contents` parameter are IDs of products, then the value should be `product`. If product group IDs are being passed, then the value should be `product_group`.                      |
| `contents`          | array of objects             | Array of JSON objects that contains the International Article Number (EAN) when applicable or other product or content identifier(s) associated with the event, and quantities and prices of the products. Required: `id` and `quantity`.<br><br>Example: `[{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}]` |
| `currency`          | string                       | Currency for the value specified.                                                                                                                                                                                                                                                                                              |
| `delivery_category` | string                       | Category of the delivery. Supported values:<br>• `in_store` — Purchase requires customer to enter to the store.<br>• `curbside` — Purchase requires curbside pickup<br>• `home_delivery` — Purchase is delivered to the customer.                                                                                              |
| `num_items`         | integer                      | Number of items when checkout was initiated. Used with the InitiateCheckout event.                                                                                                                                                                                                                                             |
| `predicted_ltv`     | integer, float               | Predicted lifetime value of a subscriber as defined by the advertiser and expressed as an exact value.                                                                                                                                                                                                                         |
| `search_string`     | string                       | String entered by the user for the search. Used with the Search event.                                                                                                                                                                                                                                                         |
| `status`            | Boolean                      | Used with the CompleteRegistration event, to show the status of the registration.                                                                                                                                                                                                                                              |
| `value`             | integer or float             | Required for purchase events or any events that utilize value optimization. A numeric value associated with the event. This must represent a monetary amount.                                                                                                                                                                  |

---

# Custom Properties

If our predefined object properties don't suit your needs, you can include your
own, custom properties. Custom properties can be used with both standard and
custom events, and can help you further define custom audiences.

## Example: Purchase with Product Comparison

Let's say you wanted to track a visitor who purchased multiple products after
having first compared them to other products. You could do this:

```javascript
fbq(
  'track',
  'Purchase',
  // begin parameter object data
  {
    value: 115.0,
    currency: 'USD',
    contents: [
      {
        id: '301',
        quantity: 1
      },
      {
        id: '401',
        quantity: 2
      }
    ],
    content_type: 'product',
    compared_product: 'recommended-banner-shoes', // custom property
    delivery_category: 'in_store'
  }
  // end parameter object data
)
```

---
