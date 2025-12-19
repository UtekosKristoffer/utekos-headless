# Klaviyo Integration Guide

## Overview

Learn how to integrate an ecommerce platform without a pre-built Klaviyo
integration using Klaviyo's APIs.

If you're using an ecommerce platform not currently supported by one of
Klaviyo's pre-built integrations or partner integrations, or you've built your
own custom solution, you can integrate with Klaviyo using our APIs, which
enable:

- Onsite activity tracking with the JavaScript API
- Managing lists and segments with the server-side API
- Creating and managing custom catalogs

> 📘 **Resource**  
> Check out our
> [video on how to use Klaviyo's JavaScript for onsite tracking](#).

---

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

---

## About JavaScript and Server-Side Event APIs

This guide focuses on how to sync important metrics, or key customer activities,
to Klaviyo. These events can be created in the browser with the JavaScript API
and on the backend with the server-side API.

> 🚧 **Important**  
> It's important that you map your metrics for event tracking in the
> account-level mapping section. Klaviyo's predictive analytics for measuring
> customer lifetime value (CLV) and Benchmarks tool rely on this mapping to
> calculate predictive analytics and revenue-based performance.

### JavaScript API - Onsite Metrics

Use our JavaScript API to track customer actions during a browsing session:

- **Active on Site** - When someone visits your website
- **Viewed Product** - When someone views a product
- **Added to Cart** - When someone adds an item to their cart
- **Started Checkout** - When someone lands on the checkout page

### Server-Side API - Backend Events

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

> 🚧 **Important**  
> For populating your Klaviyo product catalog, you can use either a custom
> catalog feed or the new catalog API. You can only populate products using one
> option. To shift from a custom catalog feed to the new catalog API you must
> first disable the existing custom catalog feed before using the API.

---

## Data Structure and Segmentation

The level of detail in the data you send within these events will determine how
you can filter and segment based on these events in Klaviyo. To understand how
data must be structured so that key event details are available for
segmentation, check out our articles on:

- Segment conditions
- How to structure your data for segment and flow filters

> 🚧 **Note**  
> The code snippets in this guide use example data. You will need to update the
> values of the JSON properties in these snippets so that they dynamically pull
> from the relevant information needed for that property.

Check out our [Custom integration FAQ](#) for questions about custom
integrations.

---

## JavaScript Track API for Onsite Metrics

### Active on Site Tracking Snippet

To be able to publish forms directly from Klaviyo to your site, add the
following JavaScript snippet so it appears on every page on your website (the
end of the footer is often a good place to add it).

**Make sure to replace `PUBLIC_API_KEY` with your Klaviyo account's six
character public API key:**

```javascript
<script
  type='text/javascript'
  async=''
  src='https://static.klaviyo.com/onsite/js/PUBLIC_API_KEY/klaviyo.js'
></script>
```

Once you've added the snippet above, an **Active on Site** metric will trigger
for any person who is cookied. A browser can be cookied in any of the ways
listed in our article on Klaviyo onsite tracking.

### Initialize the klaviyo Object

Ensure that you have initialized the `klaviyo` object on your page before
executing any of the following code snippets.

---

### Viewed Product Tracking Snippet

If you'd like to set up a browse abandonment flow or build segments based on
product browsing activity, you'll need to add JavaScript event tracking for the
**Viewed Product** metric. All Viewed Product metrics are tied to user profiles.

Add the following snippet to your product page template or associated
JavaScript:

> 📘 **Note**  
> Make sure to replace `item.___` in the below code snippet with whatever item
> object your platform uses for product properties.

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

#### Recently Viewed Items

Additionally, there is another snippet that allows entries to be added to a
"Recently Viewed Items" table for a profile. Calling the Klaviyo object's
`trackViewedItem` function below will populate a product feed of recently viewed
products that can be included in emails.

For more information on how to use the "Recently Viewed Items" feature in a
template, check out our article on
[inserting recently viewed items into an email](#).

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

---

### Added to Cart Tracking Snippet

If you'd like to send abandoned cart emails to visitors who add items to their
cart, but don't make it to the checkout page, you'll need to track an **Added to
Cart** metric. A customer must be identified, (i.e., cookied), to track this
event.

For the payload, you should include:

- All of the cart information (like Started Checkout below)
- Information about the item that was just added (like Viewed Product above)

You can add as many key/value pairs as you'd like to the JSON payload, with one
restriction: you can only use top-level properties in the JSON when adding
filters to segments based on this event (Added to Cart in this case).

That is why there is a top-level property `AddedItemCategories` in the below
example that is the union of unique `ProductCategories` values of each of the
products in the `Items` array. With this top-level property, you can create a
segment of profiles who have viewed products in specific categories.

**Example Track request** where the cart already contained one item (Winnie the
Pooh) and another item was just added to the cart (A Tale of Two Cities):

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

---

### Started Checkout

Checkout data is important if you'd like to send abandoned cart emails once a
person makes it to the checkout page. Abandoned cart emails based on **Started
Checkout**, as opposed to Added to Cart, will target shoppers who are
potentially more serious about completing their purchase.

When someone starts the checkout process, you'll send Klaviyo a metric
indicating they've started checking out. The best place to trigger this event is
either:

- When someone visits the checkout page after they've been identified
- When they enter their email address on the checkout page if they have not
  already been identified

Include all line item details so your abandoned checkout emails can be
customized to include pictures, links, and other information about the products
in someone's cart.

**Example call to track a Started Checkout event:**

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
data on the server-side versus the front-end.

For example, if someone has a slow connection or an ad-blocking extension on
their browser, the JavaScript API requests might not fire. In the case of more
crucial metrics (e.g., transactional events and properties) or ones that may
contain sensitive data, use our server-side POST create event API.

For more information on this question, check out our [custom integration FAQ](#)
on the topic.

Klaviyo also has [SDKs in several languages](#).

### Syncing Historical Data

Along with your ongoing data, it is best practice to send your historical order
data, which will enhance your ability to segment off past data and improve
historical accuracy in revenue tracking and predictive analytics.

Historical data can be sent to Klaviyo by iterating through your historical
orders and generating POST create event API requests for each server-side event
as needed. The special `time` property for these events should be in ISO 8601
datetime (i.e. `2023-10-15T00:00:00`) of when that order occurred.

---

### Placed Order

After an order is placed, make a call to our server-side POST create event API
to create a **Placed Order** event. Tracking Placed Order events is useful for
calculating predictive analytics such as average order value and predicted CLV.

#### Sending Order Data

Send order data to Klaviyo in one of two ways:

**Real-time**

- Make requests as soon as an order is placed

**Batch**

- Write some code that will run (for example) at least every 30 minutes (e.g.,
  on a cron) to send all order events that occurred in that past 30 minutes

> **Note**  
> If you plan to send abandoned cart messages, you'll need to send order data at
> a frequency that falls within your flow time delay (at least) in order to stop
> the flow email from going to people who have completed their order. For
> example, if you have a one hour time delay between when someone triggers the
> abandoned cart flow and when they receive the first email, make sure that you
> send data over at least once every hour to fall within that window and filter
> them out of the flow before the email sends.

#### Event Types

For each order, we recommend you send two types of events:

1. **One event named Placed Order for the entire order**
   - Useful for triggering post-purchase flows and managing conversion revenue
   - Includes a `value` property that represents the total value of the entire
     order

2. **One event for each line item named Ordered Product** (see below)
   - Allows for deeper segmentation and filtering based on product-specific data
   - Includes a `value` property that represents the total cost of an item in
     the order before any adjustments as well as more SKU-level detailed
     information about the item

#### Example POST Create Event Request for Placed Order

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

> 📘 **Note**  
> Creating an event requires at least one profile identifier. For example, the
> Placed Order event from the POST Create Event call above uses email as a
> profile identifier. Providing every identifier is unnecessary. You should
> limit your provided identifiers to known values.

#### Key Things to Be Aware Of

When tracking server-side events:

- Make sure to replace `PRIVATE_API_KEY` with a private key from your Klaviyo
  account; this key must have write permissions to create events
- The `unique_id` should be a unique identifier for the order (e.g., Order ID)
- If the `unique_id` is repeated for the same profile and metric, only the first
  processed event will be recorded. If the `unique_id` is not present, it will
  default to the event's datetime value
- `value` is a special property that allows Klaviyo to track revenue; this
  should be the total numeric (not a string), monetary value of the event it's
  associated with
- The `Items` array should contain one JSON block/dictionary for each line item
- `time` is a special property that should be an ISO 8601 datetime (i.e.
  `2023-10-15T00:00:00Z`) for the order date and time
- Note that the billing address is not used to determine a profile's location.
  You'll need to set profiles' locations with the location object (Profiles API)

---

### Ordered Product

For each line item, you should also generate an **Ordered Product** event. This
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

---

### Fulfilled Order, Canceled Order, and Refunded Order

Depending on how your products are sent to the customer, and whether they are
able to be canceled or refunded, you may want to send additional metrics that
reflect these actions. Each of these order-related metrics will have a similar
payload to a Placed Order event.

> 📘 **Important**  
> For Canceled Order and Refunded Order to be included in CLV calculations, they
> must have `unique_id`s that correspond to a previously tracked Placed Order
> event.

#### Fulfilled Order Example

For **Fulfilled Order**, the only update needed is the metric name and the time
at which the fulfillment took place. You can also track additional details about
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

For **Canceled Order**, update the metric name and timestamp, and add an
additional property for the cancellation reason. You can also include which
items were and weren't canceled in the event payload, in case the order is only
partially canceled.

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

For **Refunded Order**, update the metric name and timestamp, and add an
additional property for the refund reason. You can also include which items were
and weren't refunded in the event payload, in case the order is only partially
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

## Set Up API-Based Website Activity Events

Learn how to set up tracking for events on your website using Klaviyo's APIs to
enhance your marketing goals.

While our pre-built integrations offer some common onsite events by default, you
may have other event information that you'd like to track. This guide will
review some examples of additional data you can track which can enhance your
marketing goals.

The first question to ask when you consider tracking additional data is: **"What
is the marketing or reporting goal of tracking this data?"**

If there is a clear answer, it makes sense to track it! If not, it may just add
clutter to your Klaviyo account. Remember, while more data can be better,
unnecessary data may add unneeded overhead and detract from the
user-friendliness of your account.

### Common Onsite Activity Events

This guide will provide examples of how to implement the following common onsite
activity events:

#### Referrals and Shares

- Send to a Friend (product, article, page)
- Refer a Friend (referral code)

#### Website Activity

- Viewed Category
- Searched Site
- Clicked Banner

The level of detailed data you send to Klaviyo within these web activity events
will determine how you can filter and segment based on these events in Klaviyo.
To understand how data must be structured so that key event details are
available for segmentation, check out our [guide on segment conditions](#).

> **Note**  
> The snippets in this guide use example data. You will need to update the
> values of the JSON properties in these snippets such that they dynamically
> pull from the relevant information needed for that property.

If you have questions about custom integrations check out our
[Custom integration FAQ](#).

---

### JavaScript Requests

To enable our JavaScript API and the ability to push events and profile
properties to Klaviyo from your site, add the following snippet so it appears on
every page on your website. Often, the end of the footer is a good place to add
it.

Make sure to replace `PUBLIC_API_KEY` (also known as your Company ID) with your
Klaviyo account's 6 character Public API Key:

```javascript
<script
  type='application/javascript'
  async
  src='https://static.klaviyo.com/onsite/js/<PUBLIC_API_KEY>/klaviyo.js'
></script>
```

---

### Server-Side Requests

For sending server-side events and profile properties, you should use our
server-side API. We have libraries available for Python, Ruby, Node, and PHP but
in a general sense the API requires making an HTTP POST request with a JSON
payload.

You'll want to send server-side data to Klaviyo in one of two ways:

**Real-time**

- Requests are made as soon as an action is taken

**Batch**

- Script is run at least once an hour, sending all events from the past hour to
  your Klaviyo account

#### Key Things to Be Aware Of

When tracking server-side events:

- Make sure to replace `PRIVATE_API_KEY` with your private API key
- The `unique_id` should be a unique identifier for the order (e.g. Order ID)
- If the same combination of metric and `unique_id` are sent more than once, we
  will skip all tracked events after the first with the same combination
- If no `unique_id` is provided, time will be used
- `time` is a special property that should be a UNIX timestamp of the order date
  and time in the format of `2022-11-08T00:00:00`. If this is not submitted, it
  will be created upon submission of the event
- Build in retry logic to key off of the `Retry-After` header returned on any
  rate limited API calls that return a 429 error
- Server-side events should include any information about the person who took
  the action (e.g., first name) as profile properties in the
  `customer_properties` dictionary and any information specific to the event
  itself (e.g., a list of ordered items) in the `properties` dictionary

In this example, we will be using Python with the Requests library. Many other
language examples are available in our [API reference](#) as well as in our
[Postman Workspace](#).

---

## Shares and Referrals

Shares and referrals can be leveraged by your business to gain new customers and
increase brand awareness.

### Share an Item

There are two types of events you can track when someone shares something (a
product, an article, a page, etc.) with another person:

1. An event for the person who sent the item
2. An event per person who received the item

The first is sent using our JavaScript Track API, but the second must be sent
using our server-side API. For the sake of simplicity, we will use blog articles
as an example.

#### Shared Article Event

When the article is initially shared, the **Shared Article** event uses our
Track API to record the following information:

- The article recipient(s), identified by their email address (array of strings)
- The quantity of articles shared
- The name of the article (string)
- Article URL (string)
- Identifying picture for article (string)

Once someone enters the email address(es) of the person(s) they'd like to share
with, send a Shared Article event that looks something like this:

```javascript
<script>
    klaviyo.track("Shared Article", {
      "Recipients": ["email.on.list@email.com","email.2.on.list@email.com"],
      "Quantity": 2,
      "Name": "Top 10 flows for great holiday success!",
      "URL": "https://www.example.com/top-10-flows-holidays",
      "ImageURL": "https://www.example.com/top-10-flows-holidays-hero-image.png"
    });
</script>
```

#### Received Article Share Event

The **Received Article Share** event is sent to people who aren't cookied or
identified by Klaviyo on the front-end at the time of this action. So, this
event requires a server-side events request for each email in the Shared Article
event.

Server-side requests require use of your private API key, and this is passed
with additional details in the header of the request.

Successful requests to the Create Event endpoint return a `202/Accepted`
response with a response body value of `"1"`.

> 📘 **Note**  
> To make sure the Received Article Share events are recorded separately, each
> call needs to have a different `unique_id`. There are many ways to generate a
> `unique_id`; one method is to base64 encode the email address of the recipient
> and concatenate it with the current UNIX timestamp, as shown below.

```python
import requests
url = "https://a.klaviyo.com/api/events/"
payload = {"data": {
          "type": "event",
          "attributes": {
                "profile": {"email": "email.on.list@email.com"},
                "metric": {"name": "Received Article Share"},
                "properties": {
                     "SharerName": "Erin Smith",
                     "SharerEmail": "erin.smith@test.com",
                     "Name": "Top 10 flows for great holiday success!",
                     "URL": "https://www.example.com/top-10-flows-holidays",
                     "ImageURL": "https://www.example.com/top-10-flows-holidays-hero-image.png"
                },
                "time": "2023-02-08T11:10:15",
                "unique_id": "ZW1haWwub24ubGlzdEBlbWFpbC5jb20xNjc1ODgyMTYy"
          }
     }}
headers = {
     "accept": "application/json",
     "revision": "2024-02-15",
     "content-type": "application/json",
     "Authorization": "Klaviyo-API-Key your-private-api-key"
}
response = requests.post(url, json=payload, headers=headers)
```

---

### Referrals

If you'd like to report on who's referred your brand to a friend or send a thank
you note to the person who referred you, you can track **Referred Friend** and
**Referred by Friend** events. Similar to when someone shares content with a
friend, you'll need to track two kinds of events:

1. An event for the person who referred a friend, sent via the JavaScript Track
   API
2. An event per friend referred, sent via our server-side events API

As part of a server-side events request, you can also send profile properties,
which may be useful in this case if a person can use a referral code to gain
some kind of perk with your brand.

#### Referred Friend Event

When the referral is initially made, the **Referred Friend** event uses our
Track API to record the following information:

- The article recipient(s), identified by their email address (array of strings)
- The quantity of recipients

See the code below for an example of what the Referred Friend event looks like:

```javascript
<script type="text/javascript">
    klaviyo.track("Referred Friend", {
      "Recipients": ["email.on.list@email.com","email.2.on.list@email.com"],
      "Quantity": 2
    });
 </script>
```

#### Referred by Friend Event

At the same time, send something like the following payload for each referred
person:

```python
import requests
url = "https://a.klaviyo.com/api/events/"
payload = {"data": {
          "type": "event",
          "attributes": {
                "profile": {"email": "email.on.list@email.com"},
                "metric": {"name": "Referred by Friend"},
                "properties": {
                     "ReferrerName": "Erin Smith",
                     "ReferrerEmail": "erin.smith@test.com",
                     "ReferrerCode": "12abc456def",
                },
                "time": "2023-02-08T14:22:23",
                "unique_id": "ZW1haWwub24ubGlzdEBlbWFpbC5jb20xNjc1ODkxMDIy"
          }
     }}
headers = {
     "accept": "application/json",
     "revision": "2024-02-15",
     "content-type": "application/json",
     "Authorization": "Klaviyo-API-Key your-private-api-key"
}
response = requests.post(url, json=payload, headers=headers)
```

You can then use the `ReferrerCode` to create unique URLs for each referral, and
insert those URLs into a referral email. For example, if you had an email flow
triggered by the Referred by Friend event, you could include the following:

```html
{{ event|lookup:'ReferrerName'}} thought you might like this,
<a href="https://www.example.com/?referral_code={{ event|lookup:'ReferrerCode}}"
  >click here</a
>
to find out if you do!
```

---

## Website Activity

In addition to our standard events like Viewed Product, people can take other
actions on your website which you may want to track for targeting or reporting.
Below are some common examples.

### Viewed Category

Similar to a Viewed Product event, the **Viewed Category** event allows you to
capture when someone views a particular category of items, and triggers when a
person lands on a category page.

This event uses our JavaScript Track API to record the following information:

- The category name (string)
- The category ID (string)
- The category image URL (string)
- The category URL (string)

See the code below for an example of what the Viewed Category event looks like:

```javascript
<script type="text/javascript">
    klaviyo.track("Viewed Category",{
      "CategoryName": "Fantasy Books",
      "CategoryID": "01",
      "ImageURL": "http://www.example.com/path/to/category/hero/image.png",
      "URL": "http://www.example.com/path/to/category"
    });
</script>
```

---

### Searched Site

The **Searched Site** event allows you to track search terms users look for on
your site. This event also allows you to track any suggestions your site made
based off of the user's initial search term, such as correcting their spelling
or closest match.

This event should be triggered when someone submits a search query, and it uses
our JavaScript Track API to record the following information:

- The exact term the user searched for (string)
- The autocorrected term (string)
- The number of results returned (integer)

See the code below for an example of what the Searched Site event looks like:

```javascript
<script>
    klaviyo.track("Searched Site",{
      "SearchTerm": "Fantasty Boks",
      "SearchTerm (autocorrected)": "Fantasy Books",
      "ReturnedResults": 54
    });
</script>
```

---

### Clicked Banner

The **Clicked Banner** event is used to track when someone clicks a banner on
your site, allowing you to better target the users based on their click
activity. This event can be used for any kind of banner as long as the user will
be directed to a specific destination.

> 📘 **Info**  
> Before implementing this event, make sure there's a clear reason to track it,
> such as a strong marketing or reporting goal. Otherwise, it may add
> unnecessary clutter to your Klaviyo account.

The Clicked Banner event uses our JavaScript Track API to record the following
information:

- The URL the user was at when they clicked the banner (string)
- The URL they navigated to by clicking on the banner (string)
- The banner title (string)

The example below is specifically for banner ads, but this can be extrapolated
to other use-cases as well:

```javascript
<script>
    klaviyo.track("Clicked Banner",{
      "SourceURL": "https://www.example.com/home",
      "DestinationURL": "https://www.example.com/black-friday-deals",
      "BannerTitle": "Check out these awesome Black Friday sales!"
    });
</script>
```

---

## Track API Metrics with JavaScript

Track metrics in Klaviyo and use them for targeted messaging.

Metrics, individual instances of which we refer to as events, record actions
that customers take on your website, in response to an email, or through any
other data source where customer behavior takes place. Using the `klaviyo`
object that's automatically added by the Klaviyo.js tracking snippet, the
`track` method can be leveraged to capture all kinds of metrics, including API
metrics, i.e., metrics you've created via API.

Klaviyo's metric tracking and analytics are very flexible. You can customize
metrics to keep track of what's important to your business, whether you're
building a custom integration or looking to track additional metrics for a
native Klaviyo integration.

### Track a Metric

If you already have our "Active on Site" JavaScript (known as Klaviyo.js)
installed, the `klaviyo` object will be available to you. You will likely have
installed Klaviyo.js during your account setup, however, if you need to install
it, check out our [custom integration guide](#).

> 📘 **Note**  
> When you add the Klaviyo.js snippet to your site, we are only able to track
> the browsing activity of "known browsers" - browsers that have been cookied
> (e.g., via filling out a form). For this reason, in order to test your onsite
> metric tracking, you have to be manually cookied. Note that Klaviyo will not
> track anonymous browsers.

The `track` method accepts the metric name as a string, and can be given any
name you require:

```javascript
klaviyo.track('API Metric Name')
```

It also accepts an optional dictionary or hash of properties associated with
that metric. For example, if you wanted to include properties associated with
viewed items:

```javascript
<script type="text/javascript">
    var item = {
      "ProductName": "Winnie the Pooh",
      "ProductID": "1111",
      "SKU": "WINNIEPOOH",
      "Categories": ["Fiction", "Children"],
      "ImageURL": "http://www.example.com/path/to/product/image.png",
      "URL": "http://www.example.com/path/to/product",
      "Brand": "Kids Books",
      "Price": 9.99,
      "CompareAtPrice": 14.99
    };
    klaviyo.track("Viewed Product", item);
</script>
```

The `track` method accepts a variety of data types:

- `strings`
- `numbers`
- `booleans`
- `dates`

You can also track metrics when a customer clicks a custom button you have
defined. In this example, an event listener tracks when a customer clicks a
"Like" button on an item, creating an **Added Like** custom event. We can then
set up a custom flow trigger to send emails to customers about items they've
"liked" or view reports on "liked" items.

```javascript
<script type="text/javascript">
    document.getElementById("Like").addEventListener('click',function (){
        klaviyo.track('Added Like', item);
    });
</script>
```

---

### Use API Metrics in Flows

Once your metric tracking is set up, you can create a new flow and select your
API metric as the trigger. The flows library also has a variety of prebuilt
flows to choose from, which can be modified to suit the purpose of your metric.
For example, if you'd like to remind inactive customers of items they've
previously "liked", you can modify a standard winback flow with your Added Like
metric.

To learn more about these flows, read our [metric-triggered flow guide](#). The
metric trigger option allows you to queue people for a flow when they take a
certain action. This action can be any event activity created via the Klaviyo
API, or captured through an integration (e.g., started a checkout, placed an
order, filled out a form). For example, an abandoned cart flow would trigger off
the Started Checkout event, with an additional flow filter to restrict the flow
only to those who have not followed through with placing an order. Any API
metric can be used to trigger a flow.

---

### Report on API Metrics

Klaviyo's pre-built, customizable reports enable you to dive deeper into metric,
campaign, flow, or product performance. To track the performance of metrics
you've created via API, set up a custom report on those metrics.

To access custom reports, click on the **Analytics** tab and select **Custom
Reports** from the main dashboard. Create a new report by selecting **Create
from scratch**.

Next, click on **Select report type** and choose **Single Metric Deep Dive
Report** from the dropdown menu. With the single metric report, you can choose
any metric in your account to build a report around and can further customize it
by selecting different timeframes, properties, and groupings.

Select your API metric to report on. From the designated dropdown, you can
select any metric available in your account. Finally, customize and run your
report.

Read more about [creating a single metric deep dive report](#).

---

## Introduction to the klaviyo Object

Learn more about the new `klaviyo` JavaScript object, which offers full support
for callbacks and promises.

> 📘 **Resource**  
> Check out our
> [video on how to use Klaviyo's JavaScript for onsite tracking](#).

### What is the klaviyo Object?

The new `klaviyo` object replaces the legacy `_learnq` and `klOnsite` objects.
These JavaScript objects offer a shorthand way to interact with our APIs and
send events into Klaviyo with event tracking. The `klaviyo` object offers robust
support for asynchronous JavaScript implementations with callbacks and promises.
It also supports existing `klOnsite` functionality, such as opening sign up
forms with custom triggers and executing end-user provided callbacks, which
provide better control over when forms are displayed.

`klaviyo.js`, also known as Klaviyo's "Active on Site" JavaScript, automatically
supports the `klaviyo` object. If you have enabled an integration with your
Klaviyo account or installed `klaviyo.js` manually, you will be able to initiate
`klaviyo` to listen for relevant calls.

---

### How to Load the klaviyo Object

To use the `klaviyo` object immediately on page load, we recommend manually
installing the snippet on your site. This snippet would exist in addition to
Klaviyo's onsite script. The `klaviyo` object only needs to be loaded once per
page.

To load the `klaviyo` object:

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

---

### Callback Support

Klaviyo offers full support for callbacks, giving you more control over the
order in which your functions are invoked. Callbacks will be called with a
return value.

For example, to identify a cookied user without a callback using `klaviyo`:

```javascript
klaviyo.identify({})
```

With the `klaviyo` object, you can now pass in a callback to the `identify`
call. This allows the customer to be identified as well as track any onsite
event without having to reload the page (ex: viewed product):

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

---

### Promise Support

The `klaviyo` object also supports promises, which offer a cleaner approach to
resolving asynchronous requests. This option eliminates the potential complexity
of nested callbacks and can simplify your code. Promises will be resolved with a
return value.

For example, to return a promise when an identify call has been completed:

```javascript
klaviyo.identify({}).then(() => console.log('Identify has been completed'))
```

---

### Supported Methods

The `klaviyo` object supports the following methods. Optional parameters are
represented by a `?`.

#### openForm

- **Parameters** - `formId: string`, `callback?: Function`
- **Return type** - `none`

#### identify

- **Parameters** - `properties: Object`, `callback?: Function`
- **Return type** - `object`

#### track

- **Parameters** - `event: string`, `properties?: Object`, `callback?: Function`
- **Return type** - `boolean`

#### trackViewedItem

- **Parameters** - `item: Object`, `callback?: Function`
- **Return type** - `none`

#### account

- **Parameters** - `account_id?: string`, `callback?: Function`
- If an `account_id` string is provided, it will set the account id
- **Return type** - `string`

#### cookieDomain

- **Parameters** - `cookieDomain?: string`, `callback?: Function`
- If a `cookieDomain` string is provided, it will set the cookie domain
- **Return type** - `string`

#### isIdentified

- **Parameters** - `callback?: Function`
- **Return type** - `boolean`

#### Return Values

- `klaviyo.push(['method', ...params, callback])` returns `None`, and instead
  executes a callback with a return type
- `klaviyo.method(...params, callback)` returns a `Promise` that resolves to a
  return type

**Examples:**

- `klaviyo.push(['identify', {}, (result) => console.log("Identify result " + result))`
  returns `None`
- `klaviyo.identify({})` returns `Promise<Object>`
- `klaviyo.identify({}, (result) => console.log("Identify result " + result))`
  returns `Promise<Object>`

---

### Update \_learnq Code to Use klaviyo

If you have implemented custom code using the `_learnq` object, we recommend
that you update your code to use `klaviyo`.

You can quickly update instances of the legacy `learnq.push` to use the new
`klaviyo.push`.

For example:

```javascript
_learnq.push(['identify', {}])
```

becomes:

```javascript
klaviyo.push(['identify', {}])
```

---

### Can I Still Use \_learnq and klOnsite?

We will continue to support the functionality of legacy objects such as
`_learnq` and `klOnsite`, so that sites using them will not break and you will
have time to adopt the new `klaviyo` object.

However, we highly recommend moving to `klaviyo` as soon as possible to utilize
its additional features and broad support for callbacks, promises, and
functions.

---

## API Overview

> 📘 **Jumpstart Your Klaviyo API Journey**  
> Dive into Klaviyo's API tutorial playlist on YouTube, where we provide
> walkthroughs of some of our most popular Klaviyo API endpoints.

### Quickstart

**New Klaviyo developers:**

- Check out our [Get started with Klaviyo](#) series to set up an account,
  obtain API credentials, and authenticate

**Current Klaviyo developers:**

- Install one of our new [SDKs](#)
- Make test calls with the new API collection in our [Postman workspace](#)

To learn more, see below for an overview of the newly launched API features:

- Go into detail on the [JSON API features](#) supported by our new API surface

---

### OpenAPI and Postman

- View the latest OpenAPI spec [here](#)
- Import the spec into your favorite API tool, such as Postman, to start
  interacting with our new APIs right away!

You can also navigate to our [Postman Workspace](#), where you will find our
latest collection of requests, along with the API definitions. You can get
started by checking out our [Postman collection guide](#).

---

## Authentication

Klaviyo provides 3 methods of authentication including private key
authentication and OAuth (used to call server-side APIs) and public key
authentication (used to call client-side APIs). Read below for a quick overview
of each method.

### Private Key Authentication

All `/api` endpoints use private API keys with API key scopes to authenticate
requests. If you do not use an API key for your requests, or if you use a key
from the wrong account, your call will return an error. A 400 error indicates an
invalid or missing API key.

Private key authentication for `/api` endpoints is performed by setting the
following request header:

```
Authorization: Klaviyo-API-Key your-private-api-key
```

---

### OAuth

If you are a tech partner integrating with Klaviyo, we recommend using OAuth to
authenticate your app. OAuth offers multiple benefits over a private key
integration, including security, usability, and improved rate limits. Check out
our [guide on setting up OAuth](#).

---

### Public Key Authentication

All `/client` endpoints are designed to only be called from publicly-browseable
client-side environments and use public API keys to authorize and route
requests. Your public API key is your 6-character company ID, also known as a
site ID. We recommend using the Klaviyo object or our mobile SDKs for
interacting with our client-side APIs.

Public API keys are passed to `/client` endpoints using a query parameter:

```bash
curl --request POST \
  --url 'https://a.klaviyo.com/client/events/?company_id=COMPANY_ID'
  --header 'Content-Type: application/json'
  --data '{DATA}'
```

> 📘 **Note**  
> Client endpoints are specifically designed to limit functionality to object
> creation of specific types of objects and do not respond with any potentially
> sensitive response data. For security reasons, this data must be accessed
> using private key endpoints only (i.e., `/api`).

---

## API Key Scopes

Klaviyo's APIs support the use of API scopes, which allow you to restrict access
for third parties using a private API key. Adding a scope helps you protect your
and your customers' data by limiting what third parties can access.

You can add any of the following scopes to any new private API key in Klaviyo:

- **Read-only** - Only allows third parties to view all data associated with the
  endpoint
- **Full** - Allows third parties to create, delete, or make changes to anything
  associated with that endpoint (set by default)
- **Custom** - Allows you to decide how much access to give the third party

Note that you cannot add a scope to an existing private key. You also cannot
edit a private API key after it's been created. If you need to remove access to
a key based on its current scope, delete it and then create a new key with the
correct scope.

For more information about the supported scopes for each endpoint and how to add
a scope to an API key, please refer to the [Authenticate API requests guide](#).

---

## Versioning and Deprecation

Check out our [API versioning and deprecation policy](#) to learn about how
Klaviyo handles API versioning and support.

---

## Status Codes and Errors

Every response will include an HTTP status code with more details on whether the
request succeeded. Check out our [guide on status codes and errors](#) to learn
more about status codes used by Klaviyo's APIs and how to troubleshoot error
responses.

---

## Rate Limiting

All new API endpoints are rate limited on a per-account basis, and use a
fixed-window rate limiting algorithm with two distinct windows: burst (short)
and steady (long). All API traffic will be subject to rate limits, and will
receive HTTP 429 errors in the event either a burst or steady rate limit is
reached.

Each endpoint lists its burst and steady rate limits in our
[API reference documentation](#).

---

## JSON:API Feature Guides

### Relationships

Klaviyo's modern APIs offer powerful functionality via the `relationships`
object, a thorough set of syntax offered by JSON:API for modeling relationships
between resources. This syntax allows developers to efficiently query specific
groups of related resources, eliminating the need to perform redundant queries.

Check out our [guide on JSON:API relationships](#) for more information on how
use, create, modify, and delete resource relationships.

---

### Filtering

JSON:API's general filtering syntax and its supported operations can be used
across all new APIs. Please note that support for specific operators and fields
is highly specific to each endpoint. You can refer to the `filter` query
parameter in the API reference documentation for specific operator and field
support.

View our [JSON:API filtering guide](#) for a list of the filter operations and
comparison literals.

The filtering syntax for Klaviyo's new APIs uses the `?filter` query parameter
for all endpoints that support filter operations.

---

### Sorting

Where supported, sorting is handled using the `?sort` query parameter followed
by a field name. Reverse sorting is specified using a `-` prefix.

**Example:**

- `GET /api/events/?sort=datetime` sorts events by datetime ascending
- `GET /api/events/?sort=-datetime` sorts by datetime descending

For more examples, view our [JSON:API sorting guide](#).

---

### Sparse Fieldsets

Several endpoints support sparse fieldsets to allow developers to select only
requested fields of resources, rather than having to retrieve entire resources
(which may be very large).

Sparse fieldsets are specified using the `?fields[TYPE]=field1,field2` query
parameter, where `TYPE` is the resource type from which to select only `field1`
and `field2`. This also works for included resource types, e.g.
`?fields[INCLUDED-TYPE]=field1,field2`; however you also need to include that
resource in your request, using the `include` query parameter for this to work.

**Examples:**

- `GET /api/events?fields[event]=metric*id,profile*
