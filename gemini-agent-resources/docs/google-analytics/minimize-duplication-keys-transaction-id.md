## Measure ecommerce

# Minimize duplicate key events with transaction IDs

[Next: \[GA4\] About ecommerce metrics](https://support.google.com/analytics/answer/13428834?hl=en&ref_topic=12270146)

Important: Transaction ID deduplication only works for data collected through
web streams, not app streams.

A transaction ID is a unique identifier that you can create for each
transaction, such as an order confirmation number. You must add a transaction ID
(such as an order confirmation number) to each ecommerce event to deduplicate
transactions from the same user and to properly process refunds.

By adding a transaction ID, Google Analytics will deduplicate purchases if two
purchases are registered with the same transaction ID.

Google Analytics deduplicates purchase events with the same transaction ID. The
same transaction ID shouldn’t be used across different users. If you provide a
unique transaction ID, then Google Analytics will deduplicate and reconcile the
data.

Note: Don't send an empty string as the transaction ID. Google Analytics will
deduplicate all purchase events that have transaction_id="".

---

## Before you begin

The transaction ID must be unique for each order. For example, you could use the
order confirmation numbers for your transactions.

The transaction IDs can include numbers, letters, and special characters like
dashes or spaces. They must be unique for each transaction. The transaction IDs
must omit any information that could be used to identify individual customers.

---

## Add a transaction ID

You need to modify your code to collect the transaction ID. You don't need to
make any changes in Google Analytics.

Make sure you’re passing a dynamic value for the transaction ID. If your tag
sends Google Analytics the same ID for different transactions, you could
significantly undercount your
[**key events**](https://support.google.com/analytics/answer/9355848).

As an example, the following instructions use Active Server Pages (ASP) and
update the gtag.js measurement code . The exact code will vary depending on the
server language you use. Make sure to use the right language for your website.

1. Open the ASP file (or the appropriate file for the server language you use)
   for your key event page.
2. Find the ASP expression that stores that information. For example:
   `<%= orderId %>`.
3. Open the HTML for your key event page, and find your event snippet.
4. In the `script` section of the event snippet (between the `<script></script>`
   tags), replace `<%= orderId %>` with the ASP expression you found in step
   2:  
   Event snippet example:

```
    <script>
     gtag('event', 'purchase', {
      transaction_id: '<%= orderId %>',
      value: 25.42,
      currency: "USD",
      //...
     });
    </script>
```

---

## Verify the transaction ID

1. Trigger the event on your website.
2. In your web browser, view the source of the webpage. (In most browsers,
   right-click the page and select View source.)
3. You should see the measurement code between the `<head>` and `</head>` tags
   on your page. The ASP expression will be replaced by the actual transaction
   ID.
