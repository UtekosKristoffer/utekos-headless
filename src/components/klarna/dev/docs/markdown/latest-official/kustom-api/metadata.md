# Metadata

You can store additional metadata with Kustom that will be returned whenever an order is read from Kustom. The
data take two forms: two reference fields to be used to store your internal order reference, and general
metadata fields on the order and on each order line that can be used to store arbitrary data.

The reference fields are `merchant_reference1` and `merchant_reference2` used to store the interal reference
to the order.

The general metadata fields are `merchant_data` on the order and `merchant_data` on each order line.
