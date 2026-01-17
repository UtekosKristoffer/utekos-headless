## Measure ecommerce

# GA 4 Set up ecommerce events

Understand how users interact with the products and services you sell

Understanding how users interact with the products and services you sell can
help you optimize the shopping experience on your ecommerce website or mobile
app. For example, you can measure the products your users view most frequently
and how product placement, promotions, and banners impact
[**key events**](https://support.google.com/analytics/answer/9355848).

## Collect ecommerce data

To collect ecommerce data, you need to add
[ecommerce events](https://support.google.com/analytics/answer/9267735#online-sales)
to your website or app or in your Google Tag Manager container. Because these
events require additional context to be meaningful, the events aren't sent
automatically. Once you add the events and someone uses the website or app, you
will start to notice ecommerce data in Analytics.

For more information about each event, read
[Measure ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag).

Note: If you manage your site using
[Shopify](https://support.google.com/analytics/answer/12183125) as your website
builder or CMS, some events will be automatically tracked through the Shopify
Pixel.

You can place an ecommerce event anywhere
[in your data layer](https://developers.google.com/tag-platform/tag-manager/web/datalayer).
Once an ecommerce event is in the data layer and you've created
[a Google Analytics 4 Configuration tag](https://support.google.com/tagmanager/answer/9442095#config),
create
[a Google Analytics 4 Event tag](https://support.google.com/tagmanager/answer/13034206)
for the event.

To create a Google Analytics 4 Event tag for the event, follow these steps:

1. In [Google Tag Manager](https://tagmanager.google.com/?), click Tags \> New.
2. Click Tag Configuration \> Google Analytics: GA4 Event.
3. In _Configuration Tag_, select your Google Analytics 4 Configuration tag.
4. In _Event Name_, enter the name of the event (for example, `view_item_list`).
5. In _Event Parameters_, add a row for each event-level parameter.  
   Event-level parameters are parameters that you include within the event,
   outside of the `items` array, such as the `item_list_id` and `item_list_name`
   parameters in the `view_item_list` event.
6. In Parameter Name, enter a name for the parameter.
7. In Value, click \+ next to the field and choose an existing variable or add a
   new one.
8. Save and publish the container.

When you want to trigger an event based on a condition (for example, when
someone clicks a button),
[create a trigger](https://support.google.com/tagmanager/topic/7679108) and then
add the trigger to the Google Analytics 4 Event tag.

For more information about how to send events, read
[Set up events](https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag).
For more information about each event, including about ecommerce parameters,
read
[Measure ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm).

You can place an ecommerce event anywhere
[in your data layer](https://developers.google.com/tag-platform/tag-manager/web/datalayer).
Once an ecommerce event is in the data layer and you've created
[a Google Analytics 4 Configuration tag](https://support.google.com/tagmanager/answer/9442095#config),
create
[a Google Analytics 4 Event tag](https://support.google.com/tagmanager/answer/13034206)
for the event.  
To create a Google Analytics 4 Event tag for the event, follow these steps:

1. In [Google Tag Manager](https://tagmanager.google.com/?), click Tags \> New.
2. Click Tag Configuration \> Google Analytics: GA4 Event.
3. In _Configuration Tag_, select your Google Analytics 4 Configuration tag.
4. In _Event Name_, enter the name of the event (for example, `view_item_list`).
5. In _Event Parameters_, add a row for each event-level parameter.  
   Event-level parameters are parameters that you include within the event,
   outside of the `items` array, such as the `item_list_id` and `item_list_name`
   parameters in the `view_item_list` event.
6. In Parameter Name, enter a name for the parameter.
7. In Value, click \+ next to the field and choose an existing variable or add a
   new one.
8. Save and publish the container.

When you want to trigger an event based on a condition (for example, when
someone clicks a button),
[create a trigger](https://support.google.com/tagmanager/topic/7679108) and then
add the trigger to the Google Analytics 4 Event tag.

For more information about how to send events, read
[Set up events](https://developers.google.com/analytics/devguides/collection/ga4/events?client_type=gtag).
For more information about each event, including about ecommerce parameters,
read
[Measure ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm).
