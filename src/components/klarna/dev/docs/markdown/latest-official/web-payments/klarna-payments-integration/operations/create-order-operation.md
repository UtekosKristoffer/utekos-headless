# Create an order

Use this API call to create a new order. Placing an order towards Klarna means that the Klarna Payments
session will be closed and that an order will be created in Klarna's system.

When you have received the `authorization_token` for a successful authorization you can place the order. Among
the other order details in this request, you include a URL to the confirmation page for the customer. When the
Order has been successfully placed at Klarna, you need to handle it either through the Merchant Portal or
using Klarna’s Order Management API. Read more on Create a new order.
