# Create item-scoped custom parameters

The
[`items` array](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce#implementation)
in ecommerce events lets you describe the products or services on your ecommerce
website. Google provides a
[list of required and recommended parameters](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
to include in the `items` array.

In addition to these parameters, you can include up to 27 custom parameters in
the `items` array. These custom parameters are called **custom item-scoped
parameters** and they let you capture data that's useful to your business. Of
these 27 custom item parameters, you can configure:

- 10 item-scoped custom dimensions for standard properties
- 25 item-scoped custom dimensions for Analytics 360 properties

Make sure to review the list of required and recommended parameters before
creating your own item-scoped custom parameters.

## Add an item-scoped custom parameter

To add an item-scoped custom parameter, include the parameter in the `items`
array. For example, to capture whether a product is in stock, you can add the
following `in_stock` custom parameter to the event:

```
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
    in_stock: true, // The item-scoped custom parameter "in_stock"
    location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
    price: 10.01,
    quantity: 3
  }
]
```

Note that these steps apply to both gtag.js and Google Tag Manager
implementations.

## Next steps

To analyze item-scoped custom parameters, you must create an item-scoped custom
dimension. For information about how to set up the item-scoped custom dimension,
see
[Custom dimensions and metrics](https://support.google.com/analytics/answer/10075209).
