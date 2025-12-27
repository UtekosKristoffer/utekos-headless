Measure ecommerce

bookmark_border


You can set up ecommerce events to collect information about the shopping behavior of your users. The events enable you to quantify your most popular products and see the influence of promotions and product placement on revenue.

This document describes each ecommerce event and when to set up the event. For a step-by-step example of how to set up an ecommerce event, see Set up a purchase event.

Important: Web display dynamic remarketing is available in Google Analytics. This feature allows advertisers to transfer dynamic attributes, such as product IDs or price values, directly to Google Ads for dynamic remarketing campaigns. This eliminates the need to manually define and map parameters, simplifying the setup process and enabling more dynamic and relevant ad experiences.
Got 3 mins? Help us improve the Google Analytics ecommerce documentation by taking a quick online survey.
gtag.js Tag Manager

Before you begin
Add the GA4 configuration tag to your website
Make sure you've added the Google Analytics: GA4 Configuration tag to your website and can access Analytics and the website source code.

Measure ecommerce events with the GA4 Event tag
To send ecommerce events and parameters to your Google Analytics property:

Open Google Tag Manager

In your workspace, open the Tags menu.

Create a New tag. Click the Tag Configuration box and select the Google Analytics: GA4 Event tag.

For Event Name use the built-in variable {{Event}}. This will use the Google Analytics ecommerce event name sent using the gtag.js API.

Under More Settings > Ecommerce, check Send Ecommerce data.

For Data Source select Data Layer. Tag Manager UI showing ecommerce tag configuration.

Set up a trigger for the GA4 Event, for example when a user clicks a checkout button. See all available trigger types.

Name and Save the tag.

Recommendations
Enable debug mode so you can see events in realtime and troubleshoot issues.
Review the custom dimension and metric limits when sending custom parameters with ecommerce events.
Set currency when sending value (revenue) data to ensure revenue metrics are calculated correctly.
Set each ecommerce parameter you have data for, regardless of whether the parameter is optional.
Use the sample ecommerce website to see an example of how to tag your website.
To ensure data populates properly in reports, follow the format in this document. If you need to set the items array outside of the ecommerce array, set the currency parameter at the event level when you send value (revenue) data.
Set up Google Ads Dynamic remarketing
Dynamic remarketing lets you show your website and app users ads that are relevant to the specific products and services they viewed. Other benefits include:

Simple implementation: You don't need to manually map parameters between your website and Google Ads.
Event-based setup: To enable dynamic remarketing, implement the recommended events for your business type. Learn more about Dynamic remarketing events and parameters.
Implementation
A typical ecommerce implementation measures any of the following actions:

Select an item from a list
View item details
Add/remove a product from a shopping cart
Initiate the checkout process
Make purchases or refunds
Apply promotions
At the heart of these actions are the products and services you sell. You can represent products and services as an array of items that can be added to ecommerce events. You can include up to 27 custom parameters in the items array, in addition to the prescribed parameters.

The following example demonstrates how to create the collection of items that are referenced throughout this guide. The items array can include up to 200 elements.


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
      google_business_vertical: "retail",
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      google_business_vertical: "retail",
      quantity: 2
    }
]


Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Understand the Data Structure
This code snippet represents a list of items, typically used in an e-commerce or analytics context to define product details. Each item is an object with various attributes describing the product, such as ID, name, brand, category, price, and quantity.

Step 2. Google Analytics 4 (GA4) Integration Context
While this snippet is a standalone data structure, it is commonly used as the items array within Google Analytics 4 (GA4) e-commerce events (e.g., view_item_list, add_to_cart, purchase). If you intend to use this data with GA4, ensure you have:

A Google Cloud project set up with billing enabled, if you are using other Google Cloud services. You can create one here and enable billing here.
Familiarity with GA4 event implementation for your platform (web, Android, iOS).
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Defining the First Item Object

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
      google_business_vertical: "retail",
      quantity: 3
    },
This section initiates the items array and defines the first product object. Each item object represents a single product with various attributes.

item_id: A unique identifier for the product (e.g., "SKU_12345").
item_name: The display name of the product (e.g., "Stan and Friends Tee").
affiliation: The store or entity selling the item (e.g., "Google Merchandise Store").
coupon: Any coupon code applied to this specific item (e.g., "SUMMER_FUN").
discount: The monetary discount applied to the item (e.g., 2.22).
index: The item's position in a list (zero-based, e.g., 0).
item_brand: The brand of the product (e.g., "Google").
item_category, item_category2, ..., item_category5: Hierarchical categorization of the product. This allows for detailed filtering and analysis (e.g., "Apparel", "Adult", "Shirts", "Crew", "Short sleeve").
item_list_id: An ID for the list in which the item appeared (e.g., "related_products").
item_list_name: The name of the list (e.g., "Related Products").
item_variant: The specific variant of the item, like color or size (e.g., "green").
location_id: A Google Place ID representing the physical location associated with the item (e.g., "ChIJIQBpAG2ahYAR_6128GcTUEo").
price: The unit price of the item (e.g., 10.01).
google_business_vertical: The business vertical of the item, commonly "retail".
quantity: The number of units of this item purchased or viewed (e.g., 3).

Defining the Second Item Object

    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      google_business_vertical: "retail",
      quantity: 2
    }
]
This section defines a second product object within the items array, following the same structure as the first. This demonstrates how multiple products can be included in a single list. Notice the different item_id, item_name, index, item_variant, price, and quantity to distinguish this product from the first. All other attributes can remain the same if they apply to both items (e.g., affiliation, coupon, item_list_id, item_list_name, google_business_vertical).


Select an item from a list
When a user is presented with a list of results, send a view_item_list event including an items array parameter containing the displayed items. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: view_item_list
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Item List ID - ecommerce.item_list_id
Ecommerce Item List Name - ecommerce.item_list_name
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
item_list_id - {{Ecommerce Item List ID}}
item_list_name - {{Ecommerce Item List Name}}
Trigger: event equals view_item_list
Trigger configuration:

Trigger Type: Custom Event
Event Name: view_item_list
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_item_list",
  ecommerce: {
    item_list_id: "related_products",
    item_list_name: "Related products",
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
      price: 10.03,
      google_business_vertical: "retail",
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      google_business_vertical: "retail",
      quantity: 2
    }]
  }
});


Once a user selects an item from the list, send the select_item event with the selected item in an items array parameter. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: select_item
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Item List ID - ecommerce.item_list_id
Ecommerce Item List Name - ecommerce.item_list_name
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
item_list_id - {{Ecommerce Item List ID}}
item_list_name - {{Ecommerce Item List Name}}
Trigger: event equals select_item
Trigger configuration:

Trigger Type: Custom Event
Event Name: select_item
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "select_item",
  ecommerce: {
    item_list_id: "related_products",
    item_list_name: "Related products",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});


Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Set up Google Analytics 4 (GA4)
Before implementing dataLayer.push for ecommerce events, ensure you have Google Analytics 4 set up on your website or application. This involves:

Creating a Google Analytics 4 property.
Integrating the GA4 measurement code (gtag.js or Google Tag Manager) into your site or app.
For more information on setting up GA4, refer to the official Google Analytics documentation.

Step 2. Install Google Tag Manager (GTM) (Recommended)
While dataLayer can be used directly with gtag.js, using Google Tag Manager (GTM) is recommended for managing your analytics tags efficiently.

Create a GTM account and container.
Install the GTM container snippet on your website, replacing the standard gtag.js implementation.
Ensure your GA4 configuration tag in GTM is set up to read ecommerce data from the dataLayer.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous Ecommerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line is crucial for ensuring data accuracy. It clears any previous ecommerce object that might have been pushed to the dataLayer. This prevents unintended merging of ecommerce data from previous events with the current event, especially in single-page applications or scenarios where users navigate quickly between pages or actions. By setting ecommerce to null, you ensure that the subsequent ecommerce object contains only the relevant data for the current event.


Push `select_item` Event with Ecommerce Data

dataLayer.push({
  event: "select_item",
  ecommerce: {
    item_list_id: "related_products",
    item_list_name: "Related products",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This dataLayer.push call sends a select_item event to Google Analytics 4 (GA4). The event key specifies the event name, which in this case is select_item, indicating that a user has selected an item from a list.

The ecommerce object within the dataLayer contains detailed information about the item that was selected. This includes properties like item_list_id and item_list_name to identify the list from which the item was selected. The items array holds objects, each representing an individual item. Here, a single item is defined with various attributes such as item_id, item_name, price, quantity, item_brand, and multiple item_category fields for detailed product categorization. Other optional parameters like affiliation, coupon, discount, index, item_variant, location_id, and google_business_vertical provide richer context about the selected item. These fields allow for comprehensive reporting and analysis within GA4, enabling insights into product performance and user behavior.


View item details
To measure how many times item details are viewed, send a view_item event whenever a user views an item's details screen. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: view_item
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
Trigger: event equals view_item
Trigger configuration:

Trigger Type: Custom Event
Event Name: view_item
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_item",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});


Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Analytics 4 and Google Tag Manager Setup
Ensure you have a Google Analytics 4 (GA4) property set up. If not, create one through the Google Analytics interface.
Set up Google Tag Manager (GTM) for your website or application. You can create an account and container by visiting the Google Tag Manager website.
Link your GA4 property to your GTM container. This typically involves creating a GA4 Configuration tag in GTM that uses your GA4 Measurement ID.
Ensure the Google Tag Manager container snippet is correctly installed on all pages of your website where you intend to track ecommerce events. Instructions for installation are provided during GTM container creation.
Step 2. Understanding `dataLayer`
The dataLayer is a JavaScript array that Google Tag Manager uses to temporarily hold information. This information can include variables that GTM tags read and event data that GTM triggers use to fire tags.
For more details on how dataLayer works with Google Tag Manager, refer to the official Google Tag Manager documentation.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous Ecommerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line of code clears any previously existing ecommerce object from the dataLayer. This is a crucial step to prevent data contamination from previous ecommerce events, ensuring that the current view_item event only includes the relevant product information. Without clearing, subsequent ecommerce events might incorrectly inherit data from prior events.


Push `view_item` Event with Ecommerce Data

dataLayer.push({
  event: "view_item",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This block pushes an event named view_item to the dataLayer, along with a detailed ecommerce object. The view_item event is a standard Google Analytics 4 (GA4) ecommerce event used to track when a user views a specific product or item.

The ecommerce object contains comprehensive details about the item being viewed:

currency: The currency used for monetary values (e.g., "USD").
value: The total monetary value of the items in the event.
items: An array containing one or more product objects. Each object provides extensive information about a product, such as its ID (item_id), name (item_name), brand (item_brand), category (item_category and subsequent item_category fields for hierarchical categorization), price, and quantity. Additional parameters like coupon, discount, affiliation, item_list_id, item_list_name, item_variant, location_id, and google_business_vertical provide further context for detailed reporting and analysis in GA4.
When this code executes, Google Tag Manager can be configured to listen for the view_item event and send this rich ecommerce data to Google Analytics 4, enabling detailed product performance reporting.


Add or remove an item from a shopping cart
Measure an item being added to a shopping cart by sending an add_to_cart event with the relevant items in an items array. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: add_to_cart
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
Trigger: event equals add_to_cart
Trigger configuration:

Trigger Type: Custom Event
Event Name: add_to_cart
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});


When a user subsequently views the cart, send the view_cart event with all items in the cart. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: view_cart
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
Trigger: event equals view_cart
Trigger configuration:

Trigger Type: Custom Event
Event Name: view_cart
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Tag Manager and Google Analytics 4 Setup
Before implementing this code, ensure you have set up Google Tag Manager (GTM) and Google Analytics 4 (GA4) on your website or application. This code is designed to push data to the dataLayer, which GTM typically reads to send data to GA4.

Step 2. Understanding the `dataLayer`
This tutorial assumes familiarity with the dataLayer object, which is a JavaScript array used by Google Tag Manager to temporarily hold information that you want to pass to your tags. You should understand how to initialize the dataLayer on your page before this code is executed.

Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous Ecommerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line of code is crucial for ensuring data accuracy. It clears any previously existing ecommerce object within the dataLayer. If not cleared, subsequent ecommerce events might merge with old data, leading to incorrect reporting in Google Analytics. It's a best practice to always clear the ecommerce object before pushing new ecommerce event data.


Push `view_cart` Event with Item Details

dataLayer.push({
  event: "view_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This block pushes a new event to the dataLayer named view_cart. This event signifies that a user has viewed their shopping cart. The ecommerce object within this event contains detailed information about the items in the cart, following the Google Analytics 4 ecommerce schema.

The currency field specifies the currency used for the transaction, in this case, USD.
The value field represents the total value of the items in the cart, 30.03.
The items array contains one or more objects, each representing a product in the cart.
For each item, various properties are defined:

item_id: A unique identifier for the product (e.g., SKU_12345).
item_name: The name of the product (e.g., Stan and Friends Tee).
affiliation: The store or affiliation where the item was purchased.
coupon: Any coupon code applied to the item.
discount: The discount amount applied to this specific item.
index: The position of the item in a list or promotion.
item_brand: The brand of the item (e.g., Google).
item_category, item_category2, etc.: Hierarchical categories for the item, allowing for detailed product classification.
item_list_id and item_list_name: Identify the list from which the item was selected (e.g., related_products).
item_variant: Specific variant of the item (e.g., green).
location_id: A Google Place ID or similar identifier for the physical location associated with the event.
price: The individual price of the item.
google_business_vertical: Specifies the business vertical, typically retail for e-commerce.
quantity: The number of units of this item in the cart.

To measure when a user removes an item from a cart, send the remove_from_cart event. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: remove_from_cart
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
Trigger: event equals remove_from_cart
Trigger configuration:

Trigger Type: Custom Event
Event Name: remove_from_cart
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "remove_from_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Analytics 4 Setup
Ensure you have a Google Analytics 4 (GA4) property set up and configured for your website or application.
Verify that your Google Tag Manager (GTM) container or direct GA4 implementation is correctly installed and functioning on your platform.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous Ecommerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line of code initializes or clears the ecommerce object within the dataLayer. It's a best practice to clear any existing ecommerce data before pushing new events to avoid data discrepancies from previous interactions. This ensures that the current event, in this case, remove_from_cart, processes fresh data.


Push `remove_from_cart` Event to Data Layer

dataLayer.push({
  event: "remove_from_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This dataLayer.push() call sends a remove_from_cart event to Google Analytics 4 (GA4). It includes detailed ecommerce information about the item(s) being removed from the shopping cart.

event: "remove_from_cart": Specifies the event name that will be captured by GA4.
ecommerce: Contains an object with details about the transaction.
currency: The currency code for the transaction (e.g., USD).
value: The total value of the items being removed from the cart after discounts (price * quantity - discount).
items: An array of objects, where each object represents a product being removed.
item_id: Unique identifier for the product.
item_name: Name of the product.
affiliation: The store or affiliation associated with the product.
coupon: Any coupon applied to the item.
discount: The discount amount applied to this specific item.
index: The item's position in a list or collection.
item_brand: The brand of the product.
item_category, item_category2, etc.: Hierarchical categories for the product, allowing for detailed segmentation.
item_list_id, item_list_name: Identifiers for the list from which the item was removed (e.g., "Related Products").
item_variant: Specific variant of the item (e.g., "green").
location_id: A physical location ID (e.g., a Google Place ID for a store).
price: The price of a single unit of the item.
google_business_vertical: Indicates the business vertical, often retail for e-commerce.
quantity: The number of units of the item removed.

Initiate the checkout process
Measure the first step in a checkout process by sending a begin_checkout event with one or more items defined with the relevant fields. A coupon can also be added at this stage to the entire order by adding it to the event or applied to a particular item by adding it to specific elements in the items array. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: begin_checkout
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Ecommerce Coupon - ecommerce.coupon
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
coupon - {{Ecommerce Coupon}}
Trigger: event equals begin_checkout
Trigger configuration:

Trigger Type: Custom Event
Event Name: begin_checkout
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "begin_checkout",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Tag Manager and Google Analytics Setup
To implement this code, ensure you have Google Tag Manager (GTM) and Google Analytics 4 (GA4) configured on your website. This code snippet interacts with the dataLayer object, which is fundamental to GTM for sending data to GA4.

Create a Google Analytics 4 property: If you haven't already, create a GA4 property in your Google Analytics account.
Set up Google Tag Manager: a. Create a Google Tag Manager account and container for your website. b. Install the Google Tag Manager container snippet on every page of your website, immediately after the opening <head> tag and the opening <body> tag.
Configure GA4 Configuration Tag in GTM: In your GTM container, create a new GA4 Configuration tag that fires on all pages. This tag initializes the GA4 tracking and makes the dataLayer available.
Step 2. Developer Tools
For testing and debugging your dataLayer implementations, ensure you have access to your browser's developer console.

Access browser developer console: Most browsers allow you to open the developer console by pressing F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS).
Use Google Tag Assistant: Install the Google Tag Assistant Legacy extension from the Chrome Web Store to help validate your GTM installation and dataLayer pushes.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clearing the `ecommerce` object

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line of code initiates a dataLayer.push to clear any previously existing ecommerce object. This is a crucial first step when sending new e-commerce events to Google Analytics 4 (GA4) via Google Tag Manager (GTM). By setting ecommerce to null, you ensure that data from previous e-commerce actions does not inadvertently merge with the new event data, preventing data contamination and ensuring accuracy for the current begin_checkout event.


Pushing the `begin_checkout` event with `ecommerce` data

dataLayer.push({
  event: "begin_checkout",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This dataLayer.push sends a begin_checkout event, indicating that a user has started the checkout process. The ecommerce object nested within contains detailed information about the transaction and the items involved.

event: "begin_checkout": Specifies the standard GA4 event name for starting a checkout.
currency: "USD": Defines the currency used for the transaction.
value: 30.03: Represents the total value of the items in the checkout, typically including discounts but before taxes and shipping.
coupon: "SUMMER_FUN": Indicates a general coupon applied to the entire checkout.
items: An array containing objects, each representing an individual product being checked out. This array is crucial for detailed product analytics in GA4.

Defining individual item properties within `items` array

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
      google_business_vertical: "retail",
      quantity: 3
Each object within the items array describes a single product in the checkout. GA4 provides a rich set of parameters for items to capture granular details:

item_id: A unique identifier for the product (e.g., SKU).
item_name: The product's name.
affiliation: The store or affiliation a product belongs to.
coupon: A coupon specifically applied to this item.
discount: The discount amount applied to this specific item.
index: The item's position in a list or promotion.
item_brand: The brand of the product.
item_category (and up to item_category5): Hierarchical categories for product classification.
item_list_id, item_list_name: Identifiers for the list from which the item was selected.
item_variant: Specific variant of the item (e.g., color, size).
location_id: The physical location associated with the item (e.g., store ID, for local inventory ads).
price: The price of a single unit of the item.
google_business_vertical: Specifies the type of business vertical, retail in this case.
quantity: The number of units of this item being purchased.
These parameters enable in-depth analysis of product performance and user behavior within your e-commerce funnels in Google Analytics.


When a user proceeds to the next step in the checkout process and adds shipping information, send an add_shipping_info event. Use the parameter shipping_tier to specify the user's delivery option, such as "Ground", "Air", or "Next-day". For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: add_shipping_info
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Ecommerce Coupon - ecommerce.coupon
Ecommerce Shipping Tier - ecommerce.shipping_tier
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
coupon - {{Ecommerce Coupon}}
shipping_tier - {{Ecommerce Shipping Tier}}
Trigger: event equals add_shipping_info
Trigger configuration:

Trigger Type: Custom Event
Event Name: add_shipping_info
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_shipping_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    shipping_tier: "Ground",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Analytics 4 and Google Tag Manager Setup
Ensure you have a Google Analytics 4 (GA4) property set up.
Create a Google Tag Manager (GTM) container for your website or app.
Integrate Google Tag Manager into your website by placing the GTM container snippet in your HTML. Refer to the official Google Tag Manager documentation for detailed instructions.
Configure a Google Analytics: GA4 Configuration tag in your GTM container, linking it to your GA4 Measurement ID.
Publish your GTM container after making these changes.
Step 2. Implement `dataLayer`
The dataLayer array should be initialized on your page before the GTM container snippet. A typical initialization looks like this:

<script>
  window.dataLayer = window.dataLayer || [];
</script>
Ensure this dataLayer is accessible in the JavaScript context where you intend to push events.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous Ecommerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line clears any previously stored ecommerce data in the dataLayer. It's a best practice to reset the ecommerce object to null before pushing a new ecommerce event to avoid unintended data merging from previous interactions. This ensures that the current event's data is clean and accurate.


Push `add_shipping_info` Event

dataLayer.push({
  event: "add_shipping_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    shipping_tier: "Ground",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This code block pushes an add_shipping_info event to the dataLayer. This event is part of Google Analytics 4's enhanced ecommerce tracking, used to measure when a user adds shipping information during a checkout process. The ecommerce object contains details about the transaction and the items involved.

Key fields within the ecommerce object include:

currency: The currency used for the transaction, e.g., "USD".
value: The total value of the items in the cart or transaction after discounts, before taxes and shipping.
coupon: A coupon code applied at the transaction level.
shipping_tier: The selected shipping method, e.g., "Ground".
items: An array containing details for each individual product in the transaction.

Item-Level Data

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
      google_business_vertical: "retail",
      quantity: 3
Within the items array, each object represents a product and includes comprehensive details about it. These fields provide granular insights into user behavior and product performance. Important fields include:

item_id: The unique identifier for the product, e.g., "SKU_12345".
item_name: The name of the product, e.g., "Stan and Friends Tee".
affiliation: The store or affiliation from which the product was acquired, e.g., "Google Merchandise Store".
coupon: A coupon code applied specifically to this item.
discount: The discount amount applied to this item.
price: The price of a single unit of the product.
quantity: The number of units of the product.
item_brand, item_category, item_category2...item_category5: Categorization fields to describe the product hierarchy.
item_list_id, item_list_name: Information about the list from which the item was selected.
item_variant: The specific variant of the product, e.g., "green".
location_id: The physical location associated with the item, often useful for local inventory ads.

Send the add_payment_info event when a user submits their payment information. If applicable, include payment_type with this event for the chosen method of payment. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: add_payment_info
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Value - ecommerce.value
Ecommerce Currency - ecommerce.currency
Ecommerce Coupon - ecommerce.coupon
Ecommerce Payment Type - ecommerce.payment_type
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
value - {{Ecommerce Value}}
currency - {{Ecommerce Currency}}
coupon - {{Ecommerce Coupon}}
payment_type - {{Ecommerce Payment Type}}
Trigger: event equals add_payment_info
Trigger configuration:

Trigger Type: Custom Event
Event Name: add_payment_info
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_payment_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    payment_type: "Credit Card",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Tag Manager and Google Analytics 4 Setup
Ensure you have a Google Analytics 4 (GA4) property set up and configured.
Ensure you have Google Tag Manager (GTM) implemented on your website or application. This code relies on the dataLayer object, which is typically initialized by GTM.
Make sure the GA4 configuration tag and an event tag for add_payment_info are configured in your GTM container to listen for this event and send the data to GA4.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous E-commerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
This line clears any previously existing e-commerce data from the dataLayer. It is a recommended practice before pushing new e-commerce events to ensure that data from previous interactions does not inadvertently get mixed with the current event data. This prevents data contamination and ensures the accuracy of your analytics reports.


Push `add_payment_info` Event

dataLayer.push({
  event: "add_payment_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    payment_type: "Credit Card",
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
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
This block pushes an add_payment_info event to the dataLayer, indicating that a user has initiated the payment process. This event is crucial for understanding the checkout funnel and identifying where users might be dropping off.

Event Parameters
event: "add_payment_info": Specifies the name of the event being sent to Google Analytics 4 (GA4).
ecommerce: This object contains detailed information about the e-commerce transaction.
currency: "USD": The currency in which the transaction is made.
value: 30.03: The total value of the items in the cart, after discounts.
coupon: "SUMMER_FUN": The coupon code applied to the entire cart.
payment_type: "Credit Card": The type of payment method chosen by the user.
items: An array containing details for each product in the cart. Each item object includes various parameters:
item_id: Unique identifier for the item.
item_name: The name of the item.
affiliation: The store or affiliation that sold the item.
coupon: A coupon specifically applied to this item.
discount: The discount amount applied to this specific item.
index: The position of the item in a list or promotion.
item_brand: The brand of the item.
item_category, item_category2, ..., item_category5: Up to five levels of categorization for the item.
item_list_id, item_list_name: Identifiers for the list from which the item was selected.
item_variant: The variant of the item, such as color or size.
location_id: A physical location ID associated with the item (e.g., store ID).
price: The price of a single unit of the item.
google_business_vertical: "retail": Indicates the business vertical, useful for specific GA4 reports.
quantity: The number of units of the item.

Make a purchase or issue a refund
Measure a purchase by sending a purchase event with one or more items defined with the relevant fields. For details on the parameters to send, see the Events reference.

Note: The Send Ecommerce data option can be used as an alternative to the following tag configuration.
Show me the tag configuration
Tag configuration:

Tag type: Google Analytics: GA4 Event
Event Name: purchase
Data Layer Variables (Name - Data Layer Variable Name):
Ecommerce Items - ecommerce.items
Ecommerce Transaction ID - ecommerce.transaction_id
Ecommerce Value - ecommerce.value
Ecommerce Tax - ecommerce.tax
Ecommerce Shipping - ecommerce.shipping
Ecommerce Currency - ecommerce.currency
Ecommerce Coupon - ecommerce.coupon
Event Parameters (Parameter Name - Value):
items - {{Ecommerce Items}}
transaction_id - {{Ecommerce Transaction ID}}
value - {{Ecommerce Value}}
tax - {{Ecommerce Tax}}
shipping - {{Ecommerce Shipping}}
currency - {{Ecommerce Currency}}
coupon - {{Ecommerce Coupon}}
Trigger: event equals purchase
Trigger configuration:

Trigger Type: Custom Event
Event Name: purchase
This trigger fires on: All Custom Events

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: "T_12345",
    // Sum of (price * quantity) for all items.
    value: 72.05,
    tax: 3.60,
    shipping: 5.99,
    currency: "USD",
    coupon: "SUMMER_SALE",
    customer_type: "new",
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
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      quantity: 2
    }]
  }
});
Code Tutor
expand_more
thumb_up_off_alt
thumb_down_off_alt
Prerequisites
Before we begin, let's walk through the setup to ensure we can run the code without any issues.

Step 1. Google Tag Manager (GTM) or Global Site Tag (gtag.js) Setup
Ensure you have a Google Analytics 4 property configured.
Implement Google Tag Manager on your website or use the global site tag (gtag.js). This code relies on the dataLayer object, which is typically initialized by GTM or gtag.js.
Verify that your Google Tag Manager container or gtag.js snippet is correctly installed on all pages where you intend to track e-commerce events. For more information on GTM, refer to the official documentation.
Code Walkthrough
Now, let's walk through the code. The following sections break down the implementation, explaining the purpose of each logical chunk.

Clear Previous E-commerce Data

dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
Before pushing a new e-commerce event like a purchase, it's good practice to clear any previously existing e-commerce object in the dataLayer. This prevents unintended data from being sent with the new event. Setting ecommerce to null ensures a clean state for the subsequent event.


Define the 'purchase' Event

dataLayer.push({
  event: "purchase",
  ecommerce: {
This line initiates a dataLayer.push for a purchase event. The event key specifies the type of interaction being tracked, which in this case is a completed purchase. The ecommerce object will contain all the details related to this transaction.


Provide Transaction-Level Details

    transaction_id: "T_12345",
    // Sum of (price * quantity) for all items.
    value: 72.05,
    tax: 3.60,
    shipping: 5.99,
    currency: "USD",
    coupon: "SUMMER_SALE",
    customer_type: "new",
Within the ecommerce object, these fields describe the overall transaction:

transaction_id: A unique identifier for the purchase. This is crucial for de-duplication and joining data.
value: The total revenue of the transaction, typically the sum of item prices multiplied by quantities, after discounts and before tax/shipping.
tax: The total tax amount for the transaction.
shipping: The total shipping cost for the transaction.
currency: The currency used for the transaction (e.g., USD).
coupon: Any coupon code applied to the entire transaction.
customer_type: A custom dimension to categorize the customer (e.g., new or returning).

Define First Item Details

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
    },
The items array contains details for each product included in the purchase. The first item in this example is a Stan and Friends Tee:

item_id: Unique identifier for the product.
item_name: The name of the product.
affiliation: The store or affiliation where the item was purchased.
coupon: A coupon specific to this item.
discount: Discount applied to this specific item.
index: The item's position in a list or collection.
item_brand: The brand of the item.
item_category to item_category5: Up to five levels of categorization for the item.
item_list_id and item_list_name: Identifiers for the list from which the item was selected.
item_variant: Specific variant of the item (e.g., color, size).
location_id: A geographical ID relevant to the item's location.
price: The price of a single unit of the item.
quantity: The number of units purchased.

Define Second Item Details and Complete the Event

    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      quantity: 2
    }]
  }
});
This block defines the second item purchased, a Google Grey Women's Tee, following the same structure as the first item. It also includes promotion_id and promotion_name specific to this item, indicating that it might have been part of a particular promotion. The closing braces complete the items array, the ecommerce object, and finally, the dataLayer.push call for the purchase event.

This comprehensive dataLayer structure allows for detailed reporting and analysis of individual items within a purchase, along with overall transaction metrics in Google Analytics 4.