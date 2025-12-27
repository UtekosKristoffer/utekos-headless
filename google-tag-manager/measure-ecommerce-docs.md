# Measure Ecommerce

You can set up ecommerce events to collect information about the shopping
behavior of your users. The events enable you to quantify your most popular
products and see the influence of promotions and product placement on revenue.

This document describes each ecommerce event and when to set up the event. For a
step-by-step example of how to set up an ecommerce event, see Set up a purchase
event.

> **Important**: Web display dynamic remarketing is available in Google
> Analytics. This feature allows advertisers to transfer dynamic attributes,
> such as product IDs or price values, directly to Google Ads for dynamic
> remarketing campaigns. This eliminates the need to manually define and map
> parameters, simplifying the setup process and enabling more dynamic and
> relevant ad experiences.

> **Got 3 mins?** Help us improve the Google Analytics ecommerce documentation
> by taking a quick online survey.

## Before You Begin

### Add the GA4 Configuration Tag to Your Website

Make sure you've added the Google Analytics: GA4 Configuration tag to your
website and can access Analytics and the website source code.

## Measure Ecommerce Events with the GA4 Event Tag

To send ecommerce events and parameters to your Google Analytics property:

1. Open Google Tag Manager
2. In your workspace, open the Tags menu
3. Create a New tag. Click the Tag Configuration box and select the Google
   Analytics: GA4 Event tag
4. For Event Name use the built-in variable `{{Event}}`. This will use the
   Google Analytics ecommerce event name sent using the gtag.js API
5. Under More Settings > Ecommerce, check **Send Ecommerce data**
6. For Data Source select **Data Layer**
7. Set up a trigger for the GA4 Event, for example when a user clicks a checkout
   button. See all available trigger types
8. Name and Save the tag

## Recommendations

- Enable debug mode so you can see events in realtime and troubleshoot issues
- Review the custom dimension and metric limits when sending custom parameters
  with ecommerce events
- Set currency when sending value (revenue) data to ensure revenue metrics are
  calculated correctly
- Set each ecommerce parameter you have data for, regardless of whether the
  parameter is optional
- Use the sample ecommerce website to see an example of how to tag your website
- To ensure data populates properly in reports, follow the format in this
  document. If you need to set the items array outside of the ecommerce array,
  set the currency parameter at the event level when you send value (revenue)
  data

## Set Up Google Ads Dynamic Remarketing

Dynamic remarketing lets you show your website and app users ads that are
relevant to the specific products and services they viewed. Other benefits
include:

- **Simple implementation**: You don't need to manually map parameters between
  your website and Google Ads
- **Event-based setup**: To enable dynamic remarketing, implement the
  recommended events for your business type. Learn more about Dynamic
  remarketing events and parameters

## Implementation

A typical ecommerce implementation measures any of the following actions:

- Select an item from a list
- View item details
- Add/remove a product from a shopping cart
- Initiate the checkout process
- Make purchases or refunds
- Apply promotions

At the heart of these actions are the products and services you sell. You can
represent products and services as an array of items that can be added to
ecommerce events. You can include up to 27 custom parameters in the items array,
in addition to the prescribed parameters.

The following example demonstrates how to create the collection of items that
are referenced throughout this guide. The items array can include up to 200
elements.

### Items Array Structure

```javascript
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
    google_business_vertical: 'retail',
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
    google_business_vertical: 'retail',
    quantity: 2
  }
]
```

### Item Object Parameters

| Parameter                  | Type   | Description                            | Example                         |
| -------------------------- | ------ | -------------------------------------- | ------------------------------- |
| `item_id`                  | String | Unique identifier for the product      | `"SKU_12345"`                   |
| `item_name`                | String | Display name of the product            | `"Stan and Friends Tee"`        |
| `affiliation`              | String | Store or entity selling the item       | `"Google Merchandise Store"`    |
| `coupon`                   | String | Coupon code applied to this item       | `"SUMMER_FUN"`                  |
| `discount`                 | Number | Monetary discount applied to the item  | `2.22`                          |
| `index`                    | Number | Item's position in a list (zero-based) | `0`                             |
| `item_brand`               | String | Brand of the product                   | `"Google"`                      |
| `item_category`            | String | Primary category                       | `"Apparel"`                     |
| `item_category2`           | String | Secondary category                     | `"Adult"`                       |
| `item_category3`           | String | Tertiary category                      | `"Shirts"`                      |
| `item_category4`           | String | Fourth-level category                  | `"Crew"`                        |
| `item_category5`           | String | Fifth-level category                   | `"Short sleeve"`                |
| `item_list_id`             | String | ID for the list in which item appeared | `"related_products"`            |
| `item_list_name`           | String | Name of the list                       | `"Related Products"`            |
| `item_variant`             | String | Specific variant (color, size, etc.)   | `"green"`                       |
| `location_id`              | String | Google Place ID for physical location  | `"ChIJIQBpAG2ahYAR_6128GcTUEo"` |
| `price`                    | Number | Unit price of the item                 | `10.01`                         |
| `google_business_vertical` | String | Business vertical                      | `"retail"`                      |
| `quantity`                 | Number | Number of units                        | `3`                             |

---

## Select an Item from a List

When a user is presented with a list of results, send a `view_item_list` event
including an items array parameter containing the displayed items. For details
on the parameters to send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `view_item_list`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Item List ID` - Data Layer Variable Name:
  `ecommerce.item_list_id`
- Name: `Ecommerce Item List Name` - Data Layer Variable Name:
  `ecommerce.item_list_name`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `item_list_id` - Value: `{{Ecommerce Item List ID}}`
- Parameter Name: `item_list_name` - Value: `{{Ecommerce Item List Name}}`

**Trigger**: `event equals view_item_list`

### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `view_item_list`

**This trigger fires on**: All Custom Events

### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'view_item_list',
  ecommerce: {
    item_list_id: 'related_products',
    item_list_name: 'Related products',
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
        price: 10.03,
        google_business_vertical: 'retail',
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
        google_business_vertical: 'retail',
        quantity: 2
      }
    ]
  }
})
```

### Code Explanation

1. **Clear Previous Ecommerce Data**: The first line clears any previously
   existing ecommerce object in the dataLayer to prevent unintended data merging
2. **Push view_item_list Event**: Sends the event with item list details and all
   items in the viewed list
3. **Event Structure**: Contains list identification and array of item objects
   with detailed product information

---

## Select Item Event

Once a user selects an item from the list, send the `select_item` event with the
selected item in an items array parameter. For details on the parameters to
send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `select_item`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Item List ID` - Data Layer Variable Name:
  `ecommerce.item_list_id`
- Name: `Ecommerce Item List Name` - Data Layer Variable Name:
  `ecommerce.item_list_name`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `item_list_id` - Value: `{{Ecommerce Item List ID}}`
- Parameter Name: `item_list_name` - Value: `{{Ecommerce Item List Name}}`

**Trigger**: `event equals select_item`

### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `select_item`

**This trigger fires on**: All Custom Events

### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'select_item',
  ecommerce: {
    item_list_id: 'related_products',
    item_list_name: 'Related products',
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4) Setup**: GA4 property created and configured
2. **Google Tag Manager (GTM)**: GTM account and container created and installed
3. **GA4 Configuration Tag**: GA4 configuration tag in GTM set up to read
   ecommerce data from dataLayer

### Code Explanation

1. **Clear Previous Data**: Sets `ecommerce` to null to prevent data
   contamination from previous events
2. **Push select_item Event**: Sends event when user selects an item from a list
3. **Event Properties**:
   - `event`: Specifies the event name (`select_item`)
   - `item_list_id` and `item_list_name`: Identify the list from which item was
     selected
   - `items`: Array containing the selected item's detailed information

---

## View Item Details

To measure how many times item details are viewed, send a `view_item` event
whenever a user views an item's details screen. For details on the parameters to
send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `view_item`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`

**Trigger**: `event equals view_item`

### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `view_item`

**This trigger fires on**: All Custom Events

### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'view_item',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4) Property**: Set up through the Google Analytics
   interface
2. **Google Tag Manager (GTM)**: Account and container created via the Google
   Tag Manager website
3. **GA4-GTM Link**: GA4 Configuration tag in GTM using your GA4 Measurement ID
4. **GTM Container Snippet**: Correctly installed on all pages where you intend
   to track ecommerce events

### Code Explanation

1. **Clear Previous Data**: Clears any previously existing ecommerce object from
   the dataLayer to prevent data contamination
2. **Push view_item Event**: Standard GA4 ecommerce event used to track when a
   user views a specific product
3. **Ecommerce Object Properties**:
   - `currency`: Currency used for monetary values (e.g., "USD")
   - `value`: Total monetary value of the items in the event
   - `items`: Array containing product objects with comprehensive details
     including ID, name, brand, categories, price, and quantity

---

## Add or Remove an Item from a Shopping Cart

### Add to Cart Event

Measure an item being added to a shopping cart by sending an `add_to_cart` event
with the relevant items in an items array. For details on the parameters to
send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `add_to_cart`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`

**Trigger**: `event equals add_to_cart`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `add_to_cart`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

### View Cart Event

When a user subsequently views the cart, send the `view_cart` event with all
items in the cart. For details on the parameters to send, see the Events
reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `view_cart`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`

**Trigger**: `event equals view_cart`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `view_cart`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'view_cart',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

#### Code Explanation

1. **Clear Previous Data**: Clears any previously existing ecommerce object to
   ensure data accuracy
2. **Push view_cart Event**: Signifies that a user has viewed their shopping
   cart
3. **Ecommerce Object Structure**:
   - `currency`: Currency used for the transaction (USD)
   - `value`: Total value of items in the cart (30.03)
   - `items`: Array of product objects with detailed information

### Remove from Cart Event

To measure when a user removes an item from a cart, send the `remove_from_cart`
event. For details on the parameters to send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `remove_from_cart`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`

**Trigger**: `event equals remove_from_cart`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `remove_from_cart`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'remove_from_cart',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

#### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4)**: Property set up and configured
2. **Google Tag Manager (GTM)**: Container correctly installed and functioning

#### Code Explanation

1. **Clear Previous Data**: Initializes or clears the ecommerce object to avoid
   data discrepancies
2. **Push remove_from_cart Event**: Sends event to GA4 with detailed ecommerce
   information
3. **Event Properties**:
   - `event`: Specifies event name (`remove_from_cart`)
   - `currency`: Currency code for the transaction
   - `value`: Total value of items being removed (price × quantity - discount)
   - `items`: Array of product objects being removed with comprehensive details

---

## Initiate the Checkout Process

### Begin Checkout Event

Measure the first step in a checkout process by sending a `begin_checkout` event
with one or more items defined with the relevant fields. A coupon can also be
added at this stage to the entire order by adding it to the event or applied to
a particular item by adding it to specific elements in the items array. For
details on the parameters to send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `begin_checkout`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`
- Name: `Ecommerce Coupon` - Data Layer Variable Name: `ecommerce.coupon`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`
- Parameter Name: `coupon` - Value: `{{Ecommerce Coupon}}`

**Trigger**: `event equals begin_checkout`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `begin_checkout`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'begin_checkout',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
    coupon: 'SUMMER_FUN',
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

#### Prerequisites

Before implementing this code, ensure:

1. **Google Tag Manager (GTM) and Google Analytics 4 (GA4)**: Configured on your
   website
2. **GA4 Property**: Created in your Google Analytics account
3. **GTM Setup**:
   - GTM account and container created
   - GTM container snippet installed on every page (after opening `<head>` and
     `<body>` tags)
4. **GA4 Configuration Tag**: Created in GTM container that fires on all pages

#### Code Explanation

1. **Clear ecommerce Object**: Prevents unintended data merging from previous
   events
2. **Push begin_checkout Event**: Indicates user has started checkout process
3. **Event Properties**:
   - `event`: Standard GA4 event name for starting checkout
   - `currency`: Currency used for the transaction
   - `value`: Total value of items in checkout (including discounts, before
     taxes/shipping)
   - `coupon`: General coupon applied to entire checkout
   - `items`: Array of product objects with comprehensive details

### Add Shipping Info Event

When a user proceeds to the next step in the checkout process and adds shipping
information, send an `add_shipping_info` event. Use the parameter
`shipping_tier` to specify the user's delivery option, such as "Ground", "Air",
or "Next-day". For details on the parameters to send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `add_shipping_info`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`
- Name: `Ecommerce Coupon` - Data Layer Variable Name: `ecommerce.coupon`
- Name: `Ecommerce Shipping Tier` - Data Layer Variable Name:
  `ecommerce.shipping_tier`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`
- Parameter Name: `coupon` - Value: `{{Ecommerce Coupon}}`
- Parameter Name: `shipping_tier` - Value: `{{Ecommerce Shipping Tier}}`

**Trigger**: `event equals add_shipping_info`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `add_shipping_info`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'add_shipping_info',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
    coupon: 'SUMMER_FUN',
    shipping_tier: 'Ground',
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

#### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4)**: Property set up
2. **Google Tag Manager (GTM)**: Container created and integrated into your
   website
3. **GA4 Configuration Tag**: Configured in GTM container, linked to GA4
   Measurement ID
4. **GTM Container Published**: Changes published after configuration
5. **dataLayer Initialized**: The dataLayer array initialized on your page
   before GTM container snippet

#### Code Explanation

1. **Clear Previous Data**: Resets ecommerce object to null to avoid unintended
   data merging
2. **Push add_shipping_info Event**: Part of GA4's enhanced ecommerce tracking
   for measuring when user adds shipping information
3. **Event Properties**:
   - `currency`: Currency used for transaction
   - `value`: Total value of items after discounts, before taxes/shipping
   - `coupon`: Coupon code applied at transaction level
   - `shipping_tier`: Selected shipping method (e.g., "Ground")
   - `items`: Array of product details with comprehensive information

### Add Payment Info Event

Send the `add_payment_info` event when a user submits their payment information.
If applicable, include `payment_type` with this event for the chosen method of
payment. For details on the parameters to send, see the Events reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `add_payment_info`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`
- Name: `Ecommerce Coupon` - Data Layer Variable Name: `ecommerce.coupon`
- Name: `Ecommerce Payment Type` - Data Layer Variable Name:
  `ecommerce.payment_type`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`
- Parameter Name: `coupon` - Value: `{{Ecommerce Coupon}}`
- Parameter Name: `payment_type` - Value: `{{Ecommerce Payment Type}}`

**Trigger**: `event equals add_payment_info`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `add_payment_info`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
dataLayer.push({
  event: 'add_payment_info',
  ecommerce: {
    currency: 'USD',
    value: 30.03,
    coupon: 'SUMMER_FUN',
    payment_type: 'Credit Card',
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
        google_business_vertical: 'retail',
        quantity: 3
      }
    ]
  }
})
```

#### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4)**: Property set up and configured
2. **Google Tag Manager (GTM)**: Implemented on your website/application
3. **GA4 Configuration and Event Tags**: Configured in GTM container to listen
   for this event and send data to GA4

#### Code Explanation

1. **Clear Previous E-commerce Data**: Prevents data contamination from previous
   interactions
2. **Push add_payment_info Event**: Indicates user has initiated payment
   process, crucial for understanding checkout funnel
3. **Event Parameters**:
   - `event`: Event name sent to GA4 (`add_payment_info`)
   - `currency`: Currency for transaction
   - `value`: Total value of items after discounts
   - `coupon`: Coupon code applied to entire cart
   - `payment_type`: Type of payment method chosen
   - `items`: Array with detailed product information

---

## Make a Purchase or Issue a Refund

### Purchase Event

Measure a purchase by sending a `purchase` event with one or more items defined
with the relevant fields. For details on the parameters to send, see the Events
reference.

> **Note**: The Send Ecommerce data option can be used as an alternative to the
> following tag configuration.

#### Tag Configuration

**Tag type**: Google Analytics: GA4 Event

**Event Name**: `purchase`

**Data Layer Variables**:

- Name: `Ecommerce Items` - Data Layer Variable Name: `ecommerce.items`
- Name: `Ecommerce Transaction ID` - Data Layer Variable Name:
  `ecommerce.transaction_id`
- Name: `Ecommerce Value` - Data Layer Variable Name: `ecommerce.value`
- Name: `Ecommerce Tax` - Data Layer Variable Name: `ecommerce.tax`
- Name: `Ecommerce Shipping` - Data Layer Variable Name: `ecommerce.shipping`
- Name: `Ecommerce Currency` - Data Layer Variable Name: `ecommerce.currency`
- Name: `Ecommerce Coupon` - Data Layer Variable Name: `ecommerce.coupon`

**Event Parameters**:

- Parameter Name: `items` - Value: `{{Ecommerce Items}}`
- Parameter Name: `transaction_id` - Value: `{{Ecommerce Transaction ID}}`
- Parameter Name: `value` - Value: `{{Ecommerce Value}}`
- Parameter Name: `tax` - Value: `{{Ecommerce Tax}}`
- Parameter Name: `shipping` - Value: `{{Ecommerce Shipping}}`
- Parameter Name: `currency` - Value: `{{Ecommerce Currency}}`
- Parameter Name: `coupon` - Value: `{{Ecommerce Coupon}}`

**Trigger**: `event equals purchase`

#### Trigger Configuration

**Trigger Type**: Custom Event

**Event Name**: `purchase`

**This trigger fires on**: All Custom Events

#### Implementation Code

```javascript
dataLayer.push({ ecommerce: null }) // Clear the previous ecommerce object.
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

#### Prerequisites

Before implementing this code, ensure:

1. **Google Analytics 4 (GA4)**: Property configured
2. **Google Tag Manager (GTM) or gtag.js**: Implemented on your website
3. **GTM Container or gtag.js Snippet**: Correctly installed on all pages where
   you intend to track e-commerce events

#### Code Explanation

1. **Clear Previous E-commerce Data**: Setting `ecommerce` to null ensures a
   clean state for the subsequent event
2. **Define Purchase Event**: The `event` key specifies the type of interaction
   (`purchase`)
3. **Transaction-Level Details**:
   - `transaction_id`: Unique identifier for the purchase (crucial for
     de-duplication and data joining)
   - `value`: Total revenue of transaction (sum of item prices × quantities,
     after discounts, before tax/shipping)
   - `tax`: Total tax amount for transaction
   - `shipping`: Total shipping cost for transaction
   - `currency`: Currency used for transaction
   - `coupon`: Coupon code applied to entire transaction
   - `customer_type`: Custom dimension to categorize customer (e.g., new or
     returning)
4. **Items Array**: Contains details for each product in the purchase with
   comprehensive information including:
   - Item identification (ID, name)
   - Store affiliation
   - Pricing details (price, discount)
   - Product categorization (up to 5 levels)
   - List information (where item was selected from)
   - Variant details (color, size)
   - Location information
   - Promotion details (if applicable)
   - Quantity purchased

This comprehensive dataLayer structure allows for detailed reporting and
analysis of individual items within a purchase, along with overall transaction
metrics in Google Analytics 4.
