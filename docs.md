# Integrate an Ecommerce Platform Without a Pre-Built Klaviyo Integration

Learn how to integrate a platform without a pre-built Klaviyo integration.

## Overview

If you're using an ecommerce platform not currently supported by one of
Klaviyo's pre-built integrations or partner integrations, or you've built your
own custom solution, you can integrate with Klaviyo using our APIs, which
enable, for example:

- Onsite activity tracking with the JavaScript API
- Managing lists and segments with the server-side API
- Creating and managing custom catalogs

> **📘 Note** Check out our video on how to use Klaviyo's JavaScript for onsite
> tracking.

## Key Integration Components

The key components of integrating this type of ecommerce solution are:

### Customer Data

Tracking information such as name, email, phone number, or other profile
attributes.

### Website Activity

Tracking who is active on your site, what products they view, etc.

### Order Activity

Tracking when a customer places an order, what products are ordered, etc.

### Products

The items in your catalog.

## About JavaScript and Server-Side Event APIs

This guide focuses on how to sync important metrics, or key customer activities,
to Klaviyo. These events can be created in the browser with the JavaScript API
and on the backend with the server-side API.

> **🚧 Important** It's important that you map your metrics for event tracking
> in the account-level mapping section. Klaviyo's predictive analytics for
> measuring customer lifetime value (CLV) and Benchmarks tool rely on this
> mapping to calculate predictive analytics and revenue-based performance.

### JavaScript API Events

Use our JavaScript API to track customer actions during a browsing session:

- **Active on Site** - When someone visits your website
- **Viewed Product** - When someone views a product
- **Added to Cart** - When someone adds an item to their cart
- **Started Checkout** - When someone lands on the checkout page

### Server-Side API Events

Use our server-side API for events that happen on the backend, starting with
when a customer places an order:

- **Placed Order** - When an order successfully processes on your system
- **Ordered Product** - An event for each item in a processed order
- **Fulfilled Order** - When an order is sent to the customer
- **Canceled Order** - When an order is canceled
- **Refunded Order** - When a customer's order is refunded

### Custom Catalog Feed

Use our custom catalog feed for the following:

- **Catalog Feed** - An XML or JSON feed of your product catalog

> **🚧 Important** For populating your Klaviyo product catalog, you can use
> either a custom catalog feed or the new catalog API. You can only populate
> products using one option. To shift from a custom catalog feed to the new
> catalog API you must first disable the existing custom catalog feed before
> using the API.

### Data Structure Considerations

The level of detail in the data you send within these events will determine how
you can filter and segment based on these events in Klaviyo. To understand how
data must be structured so that key event details are available for
segmentation, check out our articles on segment conditions and how to structure
your data for segment and flow filters.

> **🚧 Note** Note that the code snippets in this guide use example data. You
> will need to update the values of the JSON properties in these snippets so
> that they dynamically pull from the relevant information needed for that
> property.

Check out our Custom integration FAQ for questions about custom integrations.

---

## JavaScript Track API for Onsite Metrics

### Active on Site Tracking Snippet

To be able to publish forms directly from Klaviyo to your site, add the
following JavaScript snippet so it appears on every page on your website (the
end of the footer is often a good place to add it). Make sure to replace
`PUBLIC_API_KEY` with your Klaviyo account's six character public API key:

```javascript
<script
  type='text/javascript'
  async=''
  src='https://static.klaviyo.com/onsite/js/PUBLIC_API_KEY/klaviyo.js'
></script>
```

Once you've added the snippet above, an Active on Site metric will trigger for
any person who is cookied. A browser can be cookied in any of the ways listed in
our article on Klaviyo onsite tracking.

### Initialize the klaviyo Object

Ensure that you have initialized the klaviyo object on your page before
executing any of the following code snippets.

### Viewed Product Tracking Snippet

If you'd like to set up a browse abandonment flow or build segments based on
product browsing activity, you'll need to add JavaScript event tracking for the
Viewed Product metric. All Viewed Product metrics are tied to user profiles. Add
the following snippet to your product page template or associated JavaScript:

> **📘 Note** Make sure to replace `item.___` in the below code snippet with
> whatever item object your platform uses for product properties.

```javascript
<script type="text/javascript">
    var item = {
      "ProductName": item.ProductName,
      "ProductID": item.ProductID,
      "SKU": item.SKU,
      "Categories": item.Categories,
      "ImageURL": item.ImageURL,
      "URL": item.URL,
      "Brand": item.Brand,
      "Price": item.Price,
      "CompareAtPrice": item.CompareAtPrice
    };
    klaviyo.track("Viewed Product", item);
</script>
```

Make sure to update the values of the JSON properties in the snippet so that
they dynamically pull from the relevant information needed for that property.

Additionally, there is another snippet that allows entries to be added to a
"Recently Viewed Items" table for a profile. Calling the Klaviyo object's
trackViewedItem function below will populate a product feed of recently viewed
products that can be included in emails. For more information on how to use the
"Recently Viewed Items" feature in a template, check out our article on
inserting recently viewed items into an email.

The following snippet can be added directly below the Viewed Product snippet:

```javascript
<script type="text/javascript">
    klaviyo.trackViewedItem({
      "Title": item.ProductName,
      "ItemId": item.ProductID,
      "Categories": item.Categories,
      "ImageUrl": item.ImageURL,
      "Url": item.URL,
      "Metadata": {
         "Brand": item.Brand,
         "Price": item.Price,
         "CompareAtPrice": item.CompareAtPrice
      }
    });
</script>
```

### Added to Cart Tracking Snippet

If you'd like to send abandoned cart emails to visitors who add items to their
cart, but don't make it to the checkout page, you'll need to track an Added to
Cart metric. A customer must be identified, (i.e., cookied), to track this
event. For the payload, you should include all of the cart information (like
Started Checkout below) and information about the item that was just added (like
Viewed Product above).

You can add as many key/value pairs as you'd like to the JSON payload, with one
restriction: you can only use top-level properties in the JSON when adding
filters to segments based on this event (Added to Cart in this case). That is
why there is a top-level property `AddedItemCategories` in the below example
that is the union of unique `ProductCategories` values of each of the products
in the Items array. With this top-level property, you can create a segment of
profiles who have viewed products in specific categories.

Here's an example Track request where the cart already contained one item
(Winnie the Pooh) and another item was just added to the cart (A Tale of Two
Cities):

```javascript
<script type="text/javascript">
    klaviyo.track("Added to Cart", {
      "$value": 29.98,
      "AddedItemProductName": "A Tale of Two Cities",
      "AddedItemProductID": "1112",
      "AddedItemSKU": "TALEOFTWO",
      "AddedItemCategories": ["Fiction", "Classics", "Children"],
      "AddedItemImageURL": "http://www.example.com/path/to/product/image2.png",
      "AddedItemURL": "http://www.example.com/path/to/product2",
      "AddedItemPrice": 19.99,
      "AddedItemQuantity": 1,
      "ItemNames": ["Winnie the Pooh", "A Tale of Two Cities"],
      "CheckoutURL": "http://www.example.com/path/to/checkout",
      "Items": [{
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "ProductCategories": ["Fiction", "Children"]
         },
         {
            "ProductID": "1112",
            "SKU": "TALEOFTWO",
            "ProductName": "A Tale of Two Cities",
            "Quantity": 1,
            "ItemPrice": 19.99,
            "RowTotal": 19.99,
            "ProductURL": "http://www.example.com/path/to/product2",
            "ImageURL": "http://www.example.com/path/to/product/image2.png",
            "ProductCategories": ["Fiction", "Classics"]
         }
      ]
    });
 </script>
```

### Started Checkout

Checkout data is important if you'd like to send abandoned cart emails once a
person makes it to the checkout page. Abandoned cart emails based on Started
Checkout, as opposed to Added to Cart, will target shoppers who are potentially
more serious about completing their purchase. When someone starts the checkout
process, you'll send Klaviyo a metric indicating they've started checking out.
The best place to trigger this event is either:

- When someone visits the checkout page after they've been identified
- When they enter their email address on the checkout page if they have not
  already been identified

Include all line item details so your abandoned checkout emails can be
customized to include pictures, links, and other information about the products
in someone's cart. Here's an example call to track a the Started Checkout event:

```javascript
<script type="text/javascript">
    klaviyo.track("Started Checkout", {
      "$event_id": "1000123_1387299423",
      "$value": 29.98,
      "ItemNames": ["Winnie the Pooh", "A Tale of Two Cities"],
      "CheckoutURL": "http://www.example.com/path/to/checkout",
      "Categories": ["Fiction", "Children", "Classics"],
      "Items": [{
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "ProductCategories": ["Fiction", "Children"]
         },
         {
            "ProductID": "1112",
            "SKU": "TALEOFTWO",
            "ProductName": "A Tale of Two Cities",
            "Quantity": 1,
            "ItemPrice": 19.99,
            "RowTotal": 19.99,
            "ProductURL": "http://www.example.com/path/to/product2",
            "ImageURL": "http://www.example.com/path/to/product/image2.png",
            "ProductCategories": ["Fiction", "Classics"]
         }
      ]
    });
 </script>
```

The `$event_id` should be a unique identifier for the cart combined with the
UNIX formatted time when the event was triggered. This allows someone to trigger
Started Checkout more than once when they return after adding additional items.

---

## Server-Side Metrics

We recommend tracking certain metrics on the server-side due to potential
limitations of frontend code, security concerns, and general availability of
data on the server-side versus the front-end. For example, if someone has a slow
connection or a ad-blocking extension on their browser, the JavaScript API
requests might not fire. In the case of more crucial metrics (e.g.,
transactional events and properties) or ones that may contain sensitive data,
use our server-side POST create event API. For more information on this
question, check out our custom integration FAQ on the topic.

Klaviyo also has SDKs in several languages.

### Syncing Historical Data

Along with your ongoing data, it is best practice to send your historical order
data, which will enhance your ability to segment off past data and improve
historical accuracy in revenue tracking and predictive analytics. Historical
data can be sent to Klaviyo by iterating through your historical orders and
generating POST create event API requests for each server-side event as needed.
The special time property for these events should be in ISO 8601 datetime (i.e.
2023-10-15T00:00:00) of when that order occurred.

### Placed Order

After an order is placed, make a call to to our server-side POST create event
API to create a Placed Order event. Tracking Placed Order events is useful for
calculating predictive analytics such as average order value and predicted CLV.

Send order data to Klaviyo in one of two ways: real-time or batch.

#### Real-time

Make requests as soon as an order is placed.

#### Batch

Write some code that will run (for example) at least every 30 minutes (e.g., on
a cron) to send all order events that occurred in that past 30 minutes.

If you plan to send abandoned cart messages, you'll need to send order data at a
frequency that falls within your flow time delay (at least) in order to stop the
flow email from going to people who have completed their order. For example, if
you have a one hour time delay between when someone triggers the abandoned cart
flow and when they receive the first email, make sure that you send data over at
least once every hour to fall within that window and filter them out of the flow
before the email sends.

#### Event Structure

For each order, we recommend you send two types of events:

1. **One event named Placed Order for the entire order**
   - Useful for triggering post-purchase flows and managing conversion revenue
   - Includes a value property that represents the total value of the entire
     order

2. **One event for each line item named Ordered Product** (see below)
   - Allows for deeper segmentation and filtering based on product-specific data
   - Includes a value property that represents the total cost of an item in the
     order before any adjustments as well as more SKU-level detailed information
     about the item

Here's an example POST create event request for Placed Order:

```bash
curl --request POST \
      --url https://a.klaviyo.com/api/events/ \
      --header 'Authorization: Klaviyo-API-Key your-private-api-key' \
      --header 'accept: application/json' \
      --header 'content-type: application/json' \
      --header 'revision: 2024-02-15' \
      --data '
{
     "data": {
          "type": "event",
          "attributes": {
                "properties": {
                     "OrderId": "1234",
                     "Categories": [
                          "Fiction",
                          "Classics",
                          "Children"
                     ],
                     "ItemNames": [
                          "Winnie the Pooh",
                          "A Tale of Two Cities"
                     ],
                     "DiscountCode": "Free Shipping",
                     "DiscountValue": 5,
                     "Brands": [
                          "Kids Books",
                          "Harcourt Classics"
                     ],
                     "Items": [
                          {
                                "ProductID": "1111",
                                "SKU": "WINNIEPOOH",
                                "ProductName": "Winnie the Pooh",
                                "Quantity": 1,
                                "ItemPrice": 9.99,
                                "RowTotal": 9.99,
                                "ProductURL": "http://www.example.com/path/to/product",
                                "ImageURL": "http://www.example.com/path/to/product/image.png",
                                "Categories": [
                                     "Fiction",
                                     "Children"
                                ],
                                "Brand": "Kids Books"
                          },
                          {
                                "ProductID": "1112",
                                "SKU": "TALEOFTWO",
                                "ProductName": "A Tale of Two Cities",
                                "Quantity": 1,
                                "ItemPrice": 19.99,
                                "RowTotal": 19.99,
                                "ProductURL": "http://www.example.com/path/to/product2",
                                "ImageURL": "http://www.example.com/path/to/product/image2.png",
                                "Categories": [
                                     "Fiction",
                                     "Classics"
                                ],
                                "Brand": "Harcourt Classics"
                          }
                     ],
                     "BillingAddress": {
                          "FirstName": "John",
                          "LastName": "Smith",
                          "Address1": "123 Abc St",
                          "City": "Boston",
                          "RegionCode": "MA",
                          "CountryCode": "US",
                          "Zip": "02110",
                          "Phone": "+15551234567"
                     },
                     "ShippingAddress": {
                          "Address1": "123 Abc St"
                     }
                },
                "time": "2022-11-08T00:00:00",
                "value": 29.98,
                "value_currency": "USD",
                "unique_id": "d47aeda5-1751-4483-a81e-6fcc8ad48711",
                "metric": {
                     "data": {
                          "type": "metric",
                          "attributes": {
                                "name": "Placed Order"
                          }
                     }
                },
                "profile": {
                     "data": {
                          "type": "profile",
                          "attributes": {
                                "email": "sarah.mason@klaviyo-demo.com",
                                "phone_number": "+15005550006"
                          }
                     }
                }
          }
     }
}
'
```

> **📘 Note** Creating an event requires at least one profile identifier. For
> example, the Placed Order event from the POST Create Event call above uses
> email as a profile identifier. Providing every identifier is unnecessary. You
> should limit your provided identifiers to known values.

#### Key Considerations for Server-Side Events

- Make sure to replace `PRIVATE_API_KEY` with a private key from your Klaviyo
  account; this key must have write permissions to create events
- The `unique_id` should be a unique identifier for the order (e.g., Order ID)
- If the `unique_id` is repeated for the same profile and metric, only the first
  processed event will be recorded. If the `unique_id` is not present, it will
  default to the event's datetime value
- `value` is a special property that allows Klaviyo to track revenue; this
  should be the total numeric (not a string), monetary value of the event it's
  associated with
- The Items array should contain one JSON block/dictionary for each line item
- `time` is a special property that should be an ISO 8601 datetime (i.e.
  2023-10-15T00:00:00Z) for the order date and time
- Note that the billing address is not used to determine a profile's location.
  You'll need to set profiles' locations with the location object (Profiles API)

### Ordered Product

For each line item, you should also generate an Ordered Product event. This
metric is useful if you plan to create any filters or triggers based on
product-specific information (as opposed to the order as a whole) that isn't
"top-level" for the Placed Order metric. This metric is also used in conjunction
with your Catalog Feed in order to enable personalized recommendations and in
the benchmarks feature to calculate average item value and average cart size.

The remainder of the POST create event calls in this guide will use the same
headers as the Placed Order call.

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "ProductID": "1111",
        "SKU": "WINNIEPOOH",
        "ProductName": "Winnie the Pooh",
        "Quantity": 1,
        "ProductURL": "http://www.example.com/path/to/product",
        "ImageURL": "http://www.example.com/path/to/product/image.png",
        "Categories": ["Fiction", "Children"],
        "ProductBrand": "Kids Books"
      },
      "time": "2022-11-08T00:00:00",
      "value": 9.99,
      "value_currency": "USD",
      "unique_id": "d47aeda5-1751-4483-a81e-6fcc8ad48711",
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Ordered Product"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "attributes": {
            "email": "sarah.mason@klaviyo-demo.com",
            "phone_number": "+15005550006"
          }
        }
      }
    }
  }
}
```

### Fulfilled Order, Canceled Order, and Refunded Order

Depending on how your products are sent to the customer, and whether they are
able to be canceled or refunded, you may want to send additional metrics that
reflect these actions. Each of these order-related metrics will have a similar
payload to a Placed Order event.

> **📘 Note** For Canceled Order and Refunded Order to be included in CLV
> calculations, they must have `unique_id`s that correspond to a previously
> tracked Placed Order event.

#### Fulfilled Order Example

For Fulfilled Order, the only update needed is the metric name and the time at
which the fulfillment took place. You can also track additional details about
the fulfillment itself (e.g., tracking number, shipping method):

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "Categories": ["Fiction", "Classics", "Children"],
        "ItemNames": ["Winnie the Pooh", "A Tale of Two Cities"],
        "Brands": ["Kids Books", "Harcourt Classics"],
        "DiscountCode": "Free Shipping",
        "DiscountValue": 5,
        "Items": [
          {
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "Categories": ["Fiction", "Children"],
            "Brand": "Kids Books"
          },
          {
            "ProductID": "1112",
            "SKU": "TALEOFTWO",
            "ProductName": "A Tale of Two Cities",
            "Quantity": 1,
            "ItemPrice": 19.99,
            "RowTotal": 19.99,
            "ProductURL": "http://www.example.com/path/to/product2",
            "ImageURL": "http://www.example.com/path/to/product/image2.png",
            "Categories": ["Fiction", "Classics"],
            "Brand": "Harcourt Classics"
          }
        ],
        "BillingAddress": {
          "FirstName": "John",
          "LastName": "Smith",
          "Address1": "123 Abc St",
          "City": "Boston",
          "RegionCode": "MA",
          "CountryCode": "US",
          "Zip": "02110",
          "Phone": "+15551234567"
        },
        "ShippingAddress": {
          "Address1": "123 Abc St"
        }
      },
      "time": "2022-11-10T00:00:00",
      "value": 29.98,
      "value_currency": "USD",
      "unique_id": "d47aeda5-1751-4483-a81e-6fcc8ad48711",
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Fulfilled Order"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "attributes": {
            "email": "sarah.mason@klaviyo-demo.com",
            "phone_number": "+15005550006"
          }
        }
      }
    }
  }
}
```

#### Canceled Order Example

For Canceled Order, update the metric name and timestamp, and add an additional
property for the cancellation reason. You can also include which items were and
weren't canceled in the event payload, in case the order is only partially
canceled.

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "Reason": "No longer needed",
        "Categories": ["Fiction", "Classics", "Children"],
        "ItemNames": ["Winnie the Pooh", "A Tale of Two Cities"],
        "Brands": ["Kids Books", "Harcourt Classics"],
        "Discount Code": "Free Shipping",
        "Discount Value": 5,
        "Items": [
          {
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "Categories": ["Fiction", "Children"],
            "Brand": "Kids Books"
          },
          {
            "ProductID": "1112",
            "SKU": "TALEOFTWO",
            "ProductName": "A Tale of Two Cities",
            "Quantity": 1,
            "ItemPrice": 19.99,
            "RowTotal": 19.99,
            "ProductURL": "http://www.example.com/path/to/product2",
            "ImageURL": "http://www.example.com/path/to/product/image2.png",
            "Categories": ["Fiction", "Classics"],
            "Brand": "Harcourt Classics"
          }
        ],
        "BillingAddress": {
          "FirstName": "John",
          "LastName": "Smith",
          "Address1": "123 Abc St",
          "City": "Boston",
          "RegionCode": "MA",
          "CountryCode": "US",
          "Zip": "02110",
          "Phone": "+15551234567"
        },
        "ShippingAddress": {
          "Address1": "123 Abc St"
        }
      },
      "time": "2022-11-09T00:00:00",
      "value": 29.98,
      "value_currency": "USD",
      "unique_id": "d47aeda5-1751-4483-a81e-6fcc8ad48711",
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Canceled Order"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "attributes": {
            "email": "sarah.mason@klaviyo-demo.com",
            "phone_number": "+15005550006"
          }
        }
      }
    }
  }
}
```

#### Refunded Order Example

For Refunded Order, update the metric name and timestamp, and add an additional
property for the refund reason. You can also include which items were and
weren't refunded in the event payload, in case the order is only partially
refunded.

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "Reason": "No longer needed",
        "Categories": ["Fiction", "Classics", "Children"],
        "ItemNames": ["Winnie the Pooh", "A Tale of Two Cities"],
        "Brands": ["Kids Books", "Harcourt Classics"],
        "Discount Code": "Free Shipping",
        "Discount Value": 5,
        "Items": [
          {
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "Categories": ["Fiction", "Children"],
            "Brand": "Kids Books"
          },
          {
            "ProductID": "1112",
            "SKU": "TALEOFTWO",
            "ProductName": "A Tale of Two Cities",
            "Quantity": 1,
            "ItemPrice": 19.99,
            "RowTotal": 19.99,
            "ProductURL": "http://www.example.com/path/to/product2",
            "ImageURL": "http://www.example.com/path/to/product/image2.png",
            "Categories": ["Fiction", "Classics"],
            "Brand": "Harcourt Classics"
          }
        ],
        "BillingAddress": {
          "FirstName": "John",
          "LastName": "Smith",
          "Address1": "123 Abc St",
          "City": "Boston",
          "RegionCode": "MA",
          "CountryCode": "US",
          "Zip": "02110",
          "Phone": "+15551234567"
        },
        "ShippingAddress": {
          "Address1": "123 Abc St"
        }
      },
      "time": "2022-11-10T00:00:00",
      "value": 29.98,
      "value_currency": "USD",
      "unique_id": "d47aeda5-1751-4483-a81e-6fcc8ad48711",
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Refunded Order"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "attributes": {
            "email": "sarah.mason@klaviyo-demo.com",
            "phone_number": "+15005550006"
          }
        }
      }
    }
  }
}
```

---

## Catalog Feed Integration

Integrating your catalog will allow you to utilize product blocks in emails. In
order to set up a custom catalog integration, please follow the process outlined
in Sync a custom catalog feed to Klaviyo.

---

## Additional Resources

- [API Overview](https://developers.klaviyo.com/en/docs/api_overview)
- [Custom event tracking with JavaScript](https://developers.klaviyo.com/en/docs/javascript-api)
- [Getting started with Klaviyo onsite tracking](https://developers.klaviyo.com/en/docs/getting-started-with-klaviyo-onsite-tracking)

---

# Introduction to the klaviyo Object

Learn more about the new klaviyo JavaScript object, which offers full support
for callbacks and promises.

> **📘 Note** Check out our video on how to use Klaviyo's JavaScript for onsite
> tracking.

## What is the klaviyo Object?

The new klaviyo object replaces the legacy `_learnq` and `klOnsite` objects.
These JavaScript objects offer a shorthand way to interact with our APIs and
send events into Klaviyo with event tracking. The klaviyo object offers robust
support for asynchronous JavaScript implementations with callbacks and promises.
It also supports existing `klOnsite` functionality, such as opening sign up
forms with custom triggers and executing end-user provided callbacks, which
provide better control over when forms are displayed.

`klaviyo.js`, also known as Klaviyo's "Active on Site" JavaScript, automatically
supports the klaviyo object. If you have enabled an integration with your
Klaviyo account or installed `klaviyo.js` manually, you will be able to initiate
klaviyo to listen for relevant calls.

## How to Load the klaviyo Object

To use the klaviyo object immediately on page load, we recommend manually
installing the snippet on your site. This snippet would exist in addition to
Klaviyo's onsite script. The klaviyo object only needs to be loaded once per
page.

To load the klaviyo object:

```javascript
!(function () {
  if (!window.klaviyo) {
    window._klOnsite = window._klOnsite || []
    try {
      window.klaviyo = new Proxy(
        {},
        {
          get: function (n, i) {
            return 'push' === i ?
                function () {
                  var n
                  ;(n = window._klOnsite).push.apply(n, arguments)
                }
              : function () {
                  for (
                    var n = arguments.length, o = new Array(n), w = 0;
                    w < n;
                    w++
                  )
                    o[w] = arguments[w]
                  var t =
                      'function' == typeof o[o.length - 1] ? o.pop() : void 0,
                    e = new Promise(function (n) {
                      window._klOnsite.push(
                        [i].concat(o, [
                          function (i) {
                            ;(t && t(i), n(i))
                          }
                        ])
                      )
                    })
                  return e
                }
          }
        }
      )
    } catch (n) {
      ;((window.klaviyo = window.klaviyo || []),
        (window.klaviyo.push = function () {
          var n
          ;(n = window._klOnsite).push.apply(n, arguments)
        }))
    }
  }
})()
```

## Callback Support

Klaviyo offers full support for callbacks, giving you more control over the
order in which your functions are invoked. Callbacks will be called with a
return value.

For example, to identify a cookied user without a callback using klaviyo:

```javascript
klaviyo.identify({})
```

With the klaviyo object, you can now pass in a callback to the identify call.
This allows the customer to be identified as well as track any onsite event
without having to reload the page (ex: viewed product):

```javascript
function myCallback() {
  var item = {
    ProductName: item.ProductName,
    ProductID: item.ProductID,
    SKU: item.SKU,
    Categories: item.Categories,
    ImageURL: item.ImageURL,
    URL: item.URL,
    Brand: item.Brand,
    Price: item.Price,
    CompareAtPrice: item.CompareAtPrice
  }
  klaviyo.track('Viewed Product', item)
}

klaviyo.identify(
  {
    email: 'thomas.jefferson@example.com',
    first_name: 'Thomas',
    last_name: 'Jefferson'
  },
  myCallback
)
```

## Promise Support

The klaviyo object also supports promises, which offer a cleaner approach to
resolving asynchronous requests. This option eliminates the potential complexity
of nested callbacks and can simplify your code. Promises will be resolved with a
return value.

For example, to return a promise when an identify call has been completed:

```javascript
klaviyo.identify({}).then(() => console.log('Identify has been completed'))
```

## Supported Methods

The klaviyo object supports the following methods. Optional parameters are
represented by a `?`.

### openForm

- **Parameters**: `formId: string, callback?: Function`
- **Return type**: none

### identify

- **Parameters**: `properties: Object, callback?: Function`
- **Return type**: object

### track

- **Parameters**: `event: string, properties?: Object, callback?: Function`
- **Return type**: boolean

### trackViewedItem

- **Parameters**: `item: Object, callback?: Function`
- **Return type**: none

### account

- **Parameters**: `account_id?: string, callback?: Function`
- If an `account_id` string is provided, it will set the account id
- **Return type**: string

### cookieDomain

- **Parameters**: `cookieDomain?: string, callback?: Function`
- If a `cookieDomain` string is provided, it will set the cookie domain
- **Return type**: string

### isIdentified

- **Parameters**: `callback?: Function`
- **Return type**: boolean

### Return Values

- `klaviyo.push(['method', ...params, callback])` returns None, and instead
  executes a callback with a return type
- `klaviyo.method(...params, callback)` returns a Promise that resolves to a
  return type

**Examples:**

- `klaviyo.push(['identify', {}, (result) => console.log("Identify result " + result))`
  returns None
- `klaviyo.identify({})` returns `Promise<Object>`
- `klaviyo.identify({}, (result) => console.log("Identify result " + result))`
  returns `Promise<Object>`

## Update \_learnq Code to Use klaviyo

If you have implemented custom code using the `_learnq` object, we recommend
that you update your code to use `klaviyo`.

You can quickly update instances of the legacy `learnq.push` to use the new
`klaviyo.push`.

**For example:**

```javascript
_learnq.push(['identify', {}])
```

becomes

```javascript
klaviyo.push(['identify', {}])
```

## Can I Still Use \_learnq and klOnsite?

We will continue to support the functionality of legacy objects such as
`_learnq` and `klOnsite`, so that sites using them will not break and you will
have time to adopt the new klaviyo object.

However, we highly recommend moving to `klaviyo` as soon as possible to utilize
its additional features and broad support for callbacks, promises, and
functions.

---

# JavaScript API for Identification and Tracking

Learn how to use Klaviyo's JavaScript API to track people on your website.

> **📘 Note** Check out our video on how to use Klaviyo's JavaScript for onsite
> tracking.

## Add the Klaviyo Snippet

To start tracking people, add the snippet below to your website's main template
so it will automatically be added to every page on your website. If you have a
developer that will add this script to your website, you can send them a link to
this guide.

Adjust the code snippet based on your business needs as outlined:

- **Ecommerce businesses**: remove the four lines with the identify call. The
  identify call is useful for pages where your users' emails have already been
  collected and can be pushed to a cookie for tracking. Your storefront pages,
  which likely collect user signups, do not require this call
- **Websites or web apps that require logins**: replace the `{{ email }}`
  placeholder email with the appropriate template variable that has the logged
  in user's email address

We suggest putting the Klaviyo code at or near the bottom of your site template.
If you use Google Analytics or other third party services, you can place the
Klaviyo code directly above or below that.

```javascript
// Replace PUBLIC_API_KEY with your real public API key.
<script
  async type="text/javascript"
  src="//static.klaviyo.com/onsite/js/PUBLIC_API_KEY/klaviyo.js"
></script>

<script>
  klaviyo.identify({
     // Change the line below to dynamically print the user's email.
     'email' : '{{ email }}'
  });
</script>
```

You might be wondering, "How does using Klaviyo affect my site's performance?"
The answer is Klaviyo doesn't affect your website's performance at all. Our code
only loads once the rest of your website has finished loading. In addition,
Klaviyo tells browsers to cache our JavaScript so your visitors often don't even
need to download our JavaScript every time switch pages.

## API Basics

To make calls to the Klaviyo API and store information about people, you'll use
the klaviyo object that's automatically added by the Klaviyo script.

To make an API call, Klaviyo uses a special syntax that allows your API calls to
work even when our script hasn't loaded on the page yet. You'll create an array
where the first value is the name of the method you want to call and any
subsequent values are arguments to pass to that method.

```javascript
<script>
//Identify a user
  klaviyo.identify({
     'email' : 'george.washington@example.com',
     'first_name' : 'George',
     'last_name' : 'Washington',
     'Birth Year' : 1732
  });

//Track events for an identified user
  klaviyo.track('Elected President', {
     'Country' : 'United States'
  });

//Optionally include a callback function
  function onIdentifyCompleteCallback () {
        klaviyo.track("Custom Event");
  }

  const identityProperties = {
    'email' : 'george.washington@example.com'
  }
// Identify user then send custom event for the identified user
  klaviyo.identify(identityProperties, onIdentifyCompleteCallback);
</script>
```

## Identify People

The identify method allows you to identify and set properties on an individual.
This method accepts a dictionary or hash of properties. When you identify
someone, you must include either their email address with the `email` key, or,
if you have SMS-only contacts, their phone number with the `phone_number` key.

Once you've included at least one of those identifiers, you're free to add any
custom properties you want. Custom properties are useful for tracking facts
about individuals. In Klaviyo, you can then create segments of people based on
those properties. For instance, you might want to track an individual's plan
type or sign up date. Klaviyo will also understand different data types you use,
so feel free to use numbers, booleans and dates.

Klaviyo has a few special properties that are used to display information about
people. These are: `first_name`, `last_name`, `phone_number`, `title` and
`organization`.

In addition to properties you track, Klaviyo will automatically determine what
website each person was first referred from for attribution tracking and a
person's location based on where they access your website.

```javascript
<script>
  // Identifying a person and tracking special Klaviyo properties.
  klaviyo.identify({
     'email' : 'thomas.jefferson@example.com',
     'first_name' : 'Thomas',
     'last_name' : 'Jefferson'
  });

  // Adding custom properties. Note that Klaviyo understands different data types.
  klaviyo.identify({
     'Plan' : 'Free Trial',
     'SignUpDate' : '2016-01-27 12:10:05',
     'HasFilledOutProfile' : false
  });
</script>
```

## Track Events and Actions

The track method allows you to record events and actions people take on your
website. This method accepts a string which is the name you give to that event.
This method also accepts an optional dictionary or hash of properties associated
with that event.

For example, you could track when someone purchases an item and include
information on the purchase price and what items they bought. If you have an
application where people have profiles you could track when someone fills out
their profile. If you are planning on a full ecommerce integration for your
platform, check out our guide Integrate a platform without a pre-built Klaviyo
integration.

> **📘 Note** With Klaviyo's anonymous visitor activity backfill, you can
> capture onsite engagement for a shopper before identification. You can enable
> this feature in your account settings.

Klaviyo's event tracking and analytics are very flexible, so you can customize
them to keep track of what's important to your business. Our track method also
understands different data types, so you can use numbers, booleans and dates and
we'll create intelligent charts and graphs based on the data you send.

```javascript
<script>
  // Track presidential elections
  klaviyo.track('Elected President', {
     'PreviouslyVicePresident' : true,
     'YearElected' : 1801,
     'VicePresidents' : ['Aaron Burr', 'George Clinton']
  });

  // Track a simpler version.
  klaviyo.track('Elected President');
</script>
```

---

# Set Up API-Based Transactional Emails

Learn how to set up tracking for transactional emails on your website using
Klaviyo's server-side Events API to enhance your marketing goals.

In Klaviyo, you can trigger marketing content and transactional content off of
the same metrics; the only difference is that we define a transactional email as
an essential, non-marketing email. Transactional emails are typically sent in
response to a direct interaction with your brand in which it is imperative that
the customer receives a response. For more information on the difference between
transactional and marketing emails, read How to use flows to send transactional
emails.

If you'd like to send transactional events to Klaviyo beyond those laid out here
or mentioned in other integration guides, use our server-side Create Event
endpoint.

> **📘 Note** Sending transactional events via a Client endpoint can be blocked
> by someone's browser or device, so we don't recommend using this method.
> Instead, use the server-side Create Event endpoint to send transactional
> events, since it's a safer, more reliable method of transmission.

> **🚧 Using or Migrating to OAuth?** When migrating from private key to OAuth,
> metric names should remain unchanged so that Klaviyo can brand these metrics
> with your icon. You should stop sending any data via private key once your
> users have installed your OAuth version. To learn more about branding your
> app's metrics and what to avoid, read our branded app metrics guide.

This guide will provide examples of how to implement the following common
transactional emails:

## Account Notifications

- Created account
- Updated account
- Updated email
- Reset password

## Order Notifications

- Invoice created
- Order confirmation
- Failed payment

## Shipping Notifications

## Lead Tracking

- Became lead
- New lead

To send server-side events and profile properties, make a Create Event call to
our server-side endpoint. Generally speaking, these APIs require you to make an
HTTP request (either GET OR POST) to the server.

We also have the following SDKs available to assist you with server-side
requests:

- Python
- Ruby
- PHP
- Node.js

The examples in this article review the common scenarios and types of payloads
in which you may want to track these events.

> **📘 Note** The snippets in this guide use example data. You will need to
> update the values of the JSON properties in these snippets such that they
> dynamically pull from the relevant information needed for that property.

- The level of detailed data you send to Klaviyo within these website, purchase,
  and shipment events will determine how you can filter and segment based on
  these events in Klaviyo. To understand how data must be structured so that key
  event details are available for segmentation, check out our guide on
  understanding segment conditions
- If you have questions about custom integrations, check out our Custom
  integration FAQs

## Server-Side Requests

This guide will provide examples of how to implement the following common
transactional emails:

You'll want to send server-side data to Klaviyo in one of two ways: real-time or
batch.

### Real-time

Requests are made as soon as an action is taken.

### Batch

Script runs at least once an hour, sending all events from the past hour to your
Klaviyo account.

### Key Considerations

Key things to be aware of when sending server-side events to Klaviyo:

- The `unique_id` should be a unique identifier for the event (e.g., Order ID)
- If the same combination of metric name and `unique_id` are sent more than
  once, all subsequent events with the same combination will be skipped
- `time` is a special property. You can review our guide to acceptable date and
  timestamp formats to learn more
- Server-side events should include any information about the person who took
  the action (e.g. first name) as profile properties in the profile dictionary
  and any information specific to the event itself (e.g., a list of ordered
  items) in the properties dictionary

---

## Account Notifications

If people are able to create accounts on your website and you want to send them
messaging around this, it is important to track events specific to the messaging
you want to send.

### Created Account

You can use a created account event to send confirmation and welcome emails
thanking a new subscriber and/or reviewing what they're able to do now that
they've made an account. The payload should look something like this:

```json
{
  "data": {
     "type": "event",
     "attributes": {
        "properties": {...},
        "metric": {
          "data": {
             "type": "metric",
             "attributes": {
                "name": "Created Account"
             }
          }
        },
        "profile": {
          "data": {
             "type": "profile",
             "id": "01H81WC034AKRMQJQARPEEBHJE",
             "attributes": {
                "email": "john.smith@test.com",
                "phone_number": "+15551234567",
                "first_name": "John",
                "last_name": "Smith",
                "location": {
                  "address1": "123 Abc St",
                  "city": "Boston",
                  "country": "United States",
                  "region": "MA",
                  ...
                }
             }
          }
        },
     "time": "2023-10-15T00:00:00",
     "unique_id": "1234"
     }
  }
}
```

### Updated Account

You can trigger an updated account event when someone updates information in
their account, such as their email address, name, or password. Use this event to
send emails confirming updated account information, next steps for account
setup, or any other information related to the customer journey.

The table below contains new properties you could include in the properties
dictionary:

| Property          | Type       | Description                                 |
| ----------------- | ---------- | ------------------------------------------- |
| UpdateType        | string     | Description of the properties being updated |
| UpdatedProperties | array      | Properties being updated                    |
| OldValues         | dictionary | Current values of the properties in Klaviyo |
| NewValues         | dictionary | New values for the properties               |

Here's an example of what an updated account payload looks like:

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "UpdateType": "Property Update",
        "UpdatedProperties": ["Favorite colors", "Birthday"],
        "OldValues": {
          "Birthday": "",
          "FavoriteColors": ["green", "yellow"]
        },
        "NewValues": {
          "Birthday": "1989-01-18 00:00:00",
          "FavoriteColors": ["green", "yellow", "black"]
        }
      },
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Updated Account"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "id": "01H81WC034AKRMQJQARPEEBHJE",
          "attributes": {
            "email": "john.smith@test.com",
            "phone_number": "+15551234567",
            "first_name": "John",
            "last_name": "Smith",
            "location": {
              "address1": "123 Abc St",
              "city": "Boston",
              "country": "USA",
              "region": "MA",
              "zip": "02110"
            }
          },
          "properties": {
            "FavoriteColors": ["green", "yellow"],
            "Birthday": "1989-01-18 00:00:00"
          }
        }
      },
      "time": "2023-10-15T00:00:00",
      "unique_id": "1234"
    }
  }
}
```

### Updated Email

To update a profile's email address, you will need to make an additional set of
requests, since Klaviyo uses email address as the primary identifier for a
profile. The same process applies if you want to update the phone number for an
SMS-only profile. When a profile is created in your Klaviyo account, Klaviyo
will assign an uneditable 26-character identifier to the profile. This
identifier, also known as the Profile ID, is present in the URL of the profile
in the dashboard.

You can update a profile by making a request to our Update Profile endpoint
using the Profile ID. You can also refer to our article on updating profile
identifiers via API for more information.

### Reset Password

You can set up a reset password event for when a person requests to reset their
password. When a person requests to reset their password, send a reset password
payload with the URL of the reset password link included in the properties
dictionary as shown in the example below. This event can then be used to trigger
a flow email for the person to reset their password using the reset password
URL.

```json
{
  "data": {
     "type": "event",
     "attributes": {
        "properties": {...},
        "metric": {
          "data": {
             "type": "metric",
             "attributes": {
                "name": "Reset Password",
                "PasswordResetLink": "https://www.website.com/reset/1234567890987654321"
             }
          }
        },
        "profile": {
          "data": {
             "type": "profile",
             "id": "01H81WC034AKRMQJQARPEEBHJE",
             "attributes": {
                "email": "john.smith@test.com"
             }
          }
        },
     "time": "2023-10-15T00:00:00",
     "unique_id": "1234"
     }
  }
}
```

---

## Order Notifications

Use the following events to send order notifications to your customers.

### Created Invoice or Created Order Notifications

Set up created invoice and created order events when there's an incomplete order
that needs customer action (e.g., a signature, size selection, setting up
billing frequency, etc.) before it can be processed on your end.

> **📘 Note** A created invoice event is similar to a started checkout event, an
> event commonly used for setting up abandoned cart flows. The type of
> notification you want to send depends on your business and the data you send.
> Note the difference between abandoned cart and invoice notifications to
> determine which event you can track:
>
> **Abandoned cart notification** Encourages a person to complete a purchase
> they left behind.
>
> **Invoice notification** Notifies a customer they need to provide more
> information before their order can be completed.

Include the following in the properties dictionary:

- All of the invoice information entered by the customer
- Any missing information (under `MissingInformation`, formatted as an array)

Here's an example of what a created invoice payload should look like:

```json
{
  "data": {
     "type": "event",
     "attributes": {
        "properties": {
          "OrderId": "1234",
          "Categories": [
             "Fiction",
             "Children"
          ],
          "ItemNames": [
             "Winnie the Pooh"
          ],
          "DiscountCode": "Free Shipping",
          "DiscountValue": 5,
          "Items": [
             {
                "ProductID": "1111",
                "SKU": "WINNIEPOOH",
                "ProductName": "Winnie the Pooh",
                "Quantity": 1,
                "ItemPrice": 9.99,
                "RowTotal": 9.99,
                "ProductURL": "http://www.example.com/path/to/product",
                "ImageURL": "http://www.example.com/path/to/product/image.png",
                "Categories": [
                  "Fiction",
                  "Children"
                ]
             }
          ],
          "BillingAddress": {
             "FirstName": "John",
             "LastName": "Smith",
             "Address1": "123 Abc St",
             "City": "Boston",
             "RegionCode": "MA",
             "CountryCode": "US",
             "Zip": "02110",
             "Phone": "+15551234567"
          },
          "ShippingAddress": {
             ...
          }
        },
        "time": "2023-10-31T00:00:00",
        "value": 9.99,
        "metric": {
          "data": {
             "type": "metric",
             "attributes": {
                "name": "Created Invoice"
             }
          }
        },
        "profile": {
          "data": {
             "type": "profile",
             "id": "01GDDKASAP8TKDDA2GRZDSVP4H",
             "attributes": {
                "email": "john.smith@test.com",
                "phone_number": "+15551234567",
                  ...
                }
             }
          }
        },
     "time": "2023-10-15T00:00:00",
     "unique_id": "1234"
     }
  }
}
```

### Placed Order Notifications

You can trigger an order confirmation off of a Placed Order event as long as the
event contains all of the information required for an order confirmation email.
The format of the order confirmation email will depend on your business, but
typically, they include:

- Customer's name
- Billing information
- Items purchased
- Payment method

See our other integration guides for examples of Placed Order events:

- Placed Order event for a custom platform without a pre-built Klaviyo
  integration
- Placed Order event for a subscription-based business (without a pre-built
  Klaviyo integration)

### Failed Payment Notifications

Use a failed payment event to notify a customer of a failed payment and,
optionally, the steps they'll need to take to complete the payment. This event
has a similar structure to the created invoice event and should include the
following in the properties dictionary:

- The reason payment failed (string)
- Next steps to complete payment (string)
- All order information

See the code below for an example of what a failed payment payload should look
like:

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "PaymentFailure": "Credit card not accepted",
        "PaymentNextSteps": "Please use a different payment method or contact your credit card provider.",
        "Categories": ["Fiction", "Children"],
        "ItemNames": ["Winnie the Pooh"],
        "DiscountCode": "Free Shipping",
        "DiscountValue": 5,
        "Items": [
          {
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "Categories": ["Fiction", "Children"]
          }
        ]
      },
      "time": "2023-10-31T00:00:00",
      "value": 9.99,
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Failed Payment"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "id": "01GDDKASAP8TKDDA2GRZDSVP4H",
          "attributes": {
            "email": "john.smith@test.com"
          }
        }
      }
    },
    "time": "2023-10-15T00:00:00",
    "unique_id": "1234"
  }
}
```

---

## Shipping Notifications

If you have access to the relevant information, you can send shipping
notifications to your customers. To create a trigger for shipping notifications,
add an `UpdateType` to the properties dictionary, and track the following
shipping statuses:

- Delivered
- Out for delivery
- Shipped

See the code below for an example of what a shipping notification payload should
look like:

```json
{
  "data": {
    "type": "event",
    "attributes": {
      "properties": {
        "OrderId": "1234",
        "UpdateType": "Out for delivery",
        "Categories": ["Fiction", "Children"],
        "ItemNames": ["Winnie the Pooh"],
        "DiscountCode": "Free Shipping",
        "DiscountValue": 5,
        "Items": [
          {
            "ProductID": "1111",
            "SKU": "WINNIEPOOH",
            "ProductName": "Winnie the Pooh",
            "Quantity": 1,
            "ItemPrice": 9.99,
            "RowTotal": 9.99,
            "ProductURL": "http://www.example.com/path/to/product",
            "ImageURL": "http://www.example.com/path/to/product/image.png",
            "Categories": ["Fiction", "Children"]
          }
        ],
        "ShippingAddress": {
          "FirstName": "John",
          "LastName": "Smith",
          "Address1": "123 Abc St",
          "City": "Boston",
          "RegionCode": "MA",
          "CountryCode": "US",
          "Zip": "02110",
          "Phone": "+15551234567"
        }
      },
      "time": "2023-10-31T00:00:00",
      "value": 9.99,
      "metric": {
        "data": {
          "type": "metric",
          "attributes": {
            "name": "Shipping Update"
          }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "id": "01GDDKASAP8TKDDA2GRZDSVP4H",
          "attributes": {
            "email": "john.smith@test.com"
          }
        }
      }
    },
    "time": "2023-10-15T00:00:00",
    "unique_id": "1234"
  }
}
```

---

## Lead Tracking

Transactional emails are sometimes used for internal lead tracking purposes,
which can occur on a prospective customer's profile or a customer
representative's profile. In these instances, Klaviyo has the following lead
tracking events:

| Event       | Location                          | Description                                                                                          |
| ----------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Became Lead | Prospective customer's profile    | When someone becomes a lead or takes a specific action which qualifies them for a personal reach-out |
| New Lead    | Customer representative's profile | Notify the customer representative who will take ownership of the new lead                           |

Like other events, add customer information to the profile dictionary and any
lead status triggering actions (e.g., filling out a request form) to the
properties dictionary.

### Became
