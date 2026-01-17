# Set up a purchase event

This tutorial shows you how to set up a `purchase` event on your website so you
can measure when someone makes a purchase. The tutorial includes the dimensions,
metrics, and reports that Analytics populates with data from the event. To learn
more about the ecommerce events, see
[Measure ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce).

**Got 3 mins?** Help us improve the Google Analytics ecommerce documentation by
taking [a quick online survey](https://forms.gle/7CVQx2XgneNT35u46).

## Before you begin

This tutorial assumes that you've done the following:

- [Create a Google Analytics account and property](https://support.google.com/analytics/answer/9304153#account)
- [Create a web data stream for your website](https://support.google.com/analytics/answer/9304153#stream&zippy=%2Cweb)
- [Place the Google Analytics tag on your website](https://support.google.com/analytics/answer/9304153#add-tag&zippy=%2Cadd-the-google-tag-directly-to-your-web-pages)

It also assumes that you have the following:

- Access to your website source code
- The Editor (or above) role to the Google Analytics account

## Step 1: Add the event to your website

You should place
[the `purchase` event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase)
on the page of your website where someone makes a purchase. For example, you
could add the event on the confirmation page that appears when someone makes a
purchase. This tutorial shows you how to add the event to a page where someone
clicks a "Purchase" button.

Place the event in a `<script>` tag at the end of the `<body>` tag. Placing the
event directly in the `<script>` tag triggers the event when the page loads. The
next section describes how to trigger the event when someone clicks "Purchase".

```
<!--
  Note: In the following code sample, make sure to
  replace "TAG_ID" with your tag ID.
  Learn more: https://support.google.com/tagmanager/answer/12326985
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'TAG_ID');
    </script>
</head>
<body>
    <div>This is where the purchase form would go</div>
    <button>Submit</button>
    <script>
    gtag("event", "purchase", {
        transaction_id: "T_12345_1",
        value: 30.03,
        tax: 4.90,
        shipping: 5.99,
        currency: "USD",
        coupon: "SUMMER_SALE",
        items: [
        // If someone purchases more than one item,
        // you can add those items to the items array
         {
          item_id: "SKU_12345",
          item_name: "Stan and Friends Tee",
          affiliation: "Google Merchandise Store",
          coupon: "SUMMER_FUN",
          discount: 2.22,
          index: 0,
          item_brand: "Google",
          item_category: "Apparel",
          item_category2: "Adult",
          item_category3: "Shirts",
          item_category4: "Crew",
          item_category5: "Short sleeve",
          item_list_id: "related_products",
          item_list_name: "Related Products",
          item_variant: "green",
          location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
          price: 10.01,
          quantity: 3
        }]
    });
    </script>
</body>
</html>
```

## Step 2: Connect the event to a button

You can set up the `purchase` event so it triggers when someone clicks a
"Purchase" button in a few ways. One way is to add an ID to the "Purchase"
button and then place the event code in an event listener. In the following
example, the event is only sent when someone clicks a button with the ID
`purchase`.

```
<!--
  Note: In the following code sample, make sure to
  replace "TAG_ID" with your tag ID.
  Learn more: https://support.google.com/tagmanager/answer/12326985
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'TAG_ID');
    </script>
</head>
<body>
    <div>This is where the purchase form would go</div>
    <button id="purchase">Purchase</button>
    <script>
    document.getElementById("purchase").addEventListener("click", function () {
        gtag("event", "purchase", {
                // This purchase event uses a different transaction ID
                // from the previous purchase event so Analytics
                // doesn't deduplicate the events.
                // Learn more: https://support.google.com/analytics/answer/12313109
                transaction_id: "T_12345_2",
                value: 30.03,
                tax: 4.90,
                shipping: 5.99,
                currency: "USD",
                coupon: "SUMMER_SALE",
                items: [
                {
                  item_id: "SKU_12345",
                  item_name: "Stan and Friends Tee",
                  affiliation: "Google Merchandise Store",
                  coupon: "SUMMER_FUN",
                  discount: 2.22,
                  index: 0,
                  item_brand: "Google",
                  item_category: "Apparel",
                  item_category2: "Adult",
                  item_category3: "Shirts",
                  item_category4: "Crew",
                  item_category5: "Short sleeve",
                  item_list_id: "related_products",
                  item_list_name: "Related Products",
                  item_variant: "green",
                  location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
                  price: 10.01,
                  quantity: 3
                }]
          });
      });
    </script>
</body>
</html>
```

## Step 3: Verify that you're collecting the data

The [_DebugView_ report](https://support.google.com/analytics/answer/7201382)
shows realtime data from your website so you can make sure you're setting up
events correctly. To enable debug mode on a web page, add the following
`debug_mode` parameter to the `config` command:

```
<!--
  Note: In the following code sample, make sure to
  replace "TAG_ID" with your tag ID.
  Learn more: https://support.google.com/tagmanager/answer/12326985
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'TAG_ID',{ 'debug_mode': true });
    </script>
</head>
<body>
    <div>This is where the purchase form would go</div>
    <button id="purchase">Purchase</button>
    <script>
    document.getElementById("purchase").addEventListener("click", function () {
        gtag("event", "purchase", {
                // This purchase event uses a different transaction ID
                // from the previous purchase event so Analytics
                // doesn't deduplicate the events.
                // Learn more: https://support.google.com/analytics/answer/12313109
                transaction_id: "T_12345_3",
                value: 30.03,
                tax: 4.90,
                shipping: 5.99,
                currency: "USD",
                coupon: "SUMMER_SALE",
                items: [
                {
                  item_id: "SKU_12345",
                  item_name: "Stan and Friends Tee",
                  affiliation: "Google Merchandise Store",
                  coupon: "SUMMER_FUN",
                  discount: 2.22,
                  index: 0,
                  item_brand: "Google",
                  item_category: "Apparel",
                  item_category2: "Adult",
                  item_category3: "Shirts",
                  item_category4: "Crew",
                  item_category5: "Short sleeve",
                  item_list_id: "related_products",
                  item_list_name: "Related Products",
                  item_variant: "green",
                  location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
                  price: 10.01,
                  quantity: 3
                }]
        });
    });
    </script>
</body>
</html>
```

Once you enable debug mode, you will start to see events populate the
_DebugView_ report as people use your website. For example, clicking the
"Purchase" button on your website populates the report with the following data.
You can select an event to see the parameters, user properties, and items
associated with the event.

A screenshot of the DebugView report

## Step 4: See your ecommerce data

After about 24 hours, the data you sent with the `purchase` event becomes
available in your
[reports](https://support.google.com/analytics/answer/9212670),
[explorations](https://support.google.com/analytics/answer/7579450), and
[Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1).
You can also access the data in BigQuery when you
[set up BigQuery Export](https://support.google.com/analytics/answer/9823238).

The "purchase" event automatically populates a variety of prebuilt
[dimensions and metrics](https://support.google.com/analytics/answer/9143382),
which are used in reports and explorations. The following are some of the
dimensions that are populated with data from the `purchase` event in the first
step:

| Parameter        | Dimension              | Value                                                               |
| :--------------- | :--------------------- | :------------------------------------------------------------------ |
| `affiliation`    | _Item affiliation_     | Google Merchandise Store                                            |
| `currency`       | _Currency_             | USD                                                                 |
| `discount`       | _Item discount amount_ | 2.22                                                                |
| `index`          | _Item list position_   | 0                                                                   |
| `item_brand`     | _Item brand_           | Google                                                              |
| `item_category`  | _Item category_        | Apparel                                                             |
| `item_id`        | _Item ID_              | SKU_12345                                                           |
| `item_list_id`   | _Item list ID_         | related_products                                                    |
| `item_list_name` | _Item list name_       | Related Products                                                    |
| `item_name`      | _Item name_            | Stan and Friends Tee                                                |
| `item_variant`   | _Item variant_         | green                                                               |
| `location_id`    | _Item location ID_     | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) |
| `shipping`       | _Shipping amount_      | 5.99                                                                |
| `tax`            | _Tax amount_           | 4.90                                                                |
| `transaction_id` | _Transaction ID_       | T_12345                                                             |

In addition to the dimensions, Google Analytics populates a number of ecommerce
and revenue-related metrics. For example, if a user clicks the "Purchase" button
once, then the following metrics are populated in Google Analytics:

- _Item revenue_ metric has a value of $30.03
- _Total revenue_ metric has a value of $30.03
- _Ecommerce purchases_ metric has a value of 1

You can use these dimensions and metrics to build explorations and custom
reports, but you can also use the following prebuilt
[_Ecommerce purchases_ report](https://support.google.com/analytics/answer/9786881)
to see your ecommerce data
