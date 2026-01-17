## Set up audiences

# \[GA4\] Predictive audiences

[Next: \[GA4\] Predictive metrics](https://support.google.com/analytics/answer/9846734?hl=en&ref_topic=14272803)

## About predictive audiences

A predictive audience is an audience with at least one condition based on a
[predictive metric](https://support.google.com/analytics/answer/9846734). For
example, you could build an audience for ‘likely 7-day purchasers’ that includes
users who are likely to make a purchase in the next 7 days.

## Prerequisites

Availability of predictive audiences depends on the
[underlying predictive metrics](https://support.google.com/analytics/answer/9846734)
being eligible for use by meeting all prerequisites. If you have exported
predictive audiences to linked product accounts, those audiences will not
accumulate new users if the property becomes ineligible for the predictive
metric and new predictions are not generated.

## Create predictive audiences

Once your property is eligible for predictions, you can use suggested audience
templates to create your own audiences with conditions based on those
predictions.

1. In
   [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks),
   under _Data display_, click
   [Audiences](https://analytics.google.com/analytics/web/#/?pagename=admin-audiences&utm_source=gahc&utm_medium=dlinks).  
   Note:
   The previous link opens to the last Analytics property you accessed. You must
   be signed in to a
   [Google Account](https://support.google.com/analytics/answer/27441) to open
   the property. You can
   [change the property](https://support.google.com/analytics/answer/12813202)
   using the property selector. You must be a
   [Marketer or above](https://support.google.com/analytics/answer/9305587) at
   the property level to create predictive audiences.
2. Click New audience.  
   To create the audience based on a suggested audience:
   - Under _Suggested audiences_, click Predictive.
   - Suggested predictive audiences that meet prediction-modeling prerequisites
     are labeled as Ready to use. Click one of the templates that's ready.
   - Modify the template to your needs using the audience builder.
3. To create a custom audience with conditions based on predictive metrics:
   - Starting with
     [Step 4 of the audience-creation process](https://support.google.com/analytics/answer/9267572#create),
     select one of the predictive metrics.

To edit a predictive condition as you create an audience, choose one of the
configuration options:

- Most likely… (includes the top N% of users)
- Least likely… (includes the bottom N% of users)
- Custom (enter a percentage range or use the sliders to the right to select a
  range)

If you're using a custom range, the sliders let you see how many users are
included and the likelihood of those users to meet the predicted condition. With
a larger range, you can see that more users are included, but that a greater
portion of them are less likely to meet the condition.

## Using predictive audiences

### In your advertising products

Predictive audiences are automatically shared with any advertising accounts you
have linked to your property (e.g., Google Ads, Display & Video 360, Search Ads
360).

### As remarketing audiences

Users who are on the threshold of converting are more easily convinced to
complete those
[**key events**](https://support.google.com/analytics/answer/9355848). For
example, users who have studied product details or added items to their carts
have given strong signals that they’re already taking ownership of those
products. Analytics goes beyond these simple signals and uses machine learning
to find deep patterns of behavior that are unique to your property and show that
a user is likely to interact with a key event on the path to a key event. A
persuasive follow-up from you via a well-crafted remarketing campaign can
provide that last nudge they need to complete the process.

### In re-engagement campaigns

While users who are likely to churn are signaling a waning interest in your
business, they have also previously demonstrated engagement with your business.
Approach them again with reminders of the value you offer in terms of product
variety, quality, and price, or convenient shipping and return options. Remind
them of their value to you with special offers.

## Suggested predictive audiences

The suggested audiences include users who exceed thresholds for the predictive
metrics. For example, users are included in the "Likely 7-day purchasers"
audience when their "Purchase probability \> 90th percentile". If, for example,
the modeled data were based on 1000 users, the 90th \- 100th percentile would
include the 100 users (the top 10%) with the greatest purchase probability.
Users who exceed or are at the 90th percentile, the top 100 users, would be
included in the audience.

If you add other conditions to the audience, you can reduce the number of users
who will be included. For example, if you include Age or Region, or add a
condition based on an event count, you might eliminate some of the 99 users who
would otherwise be included.

| Audience                           | Description                                                                    | Configuration                                                                                                                                                 |
| :--------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Likely 7-day churning purchasers   | Purchasing users who are likely to not visit your property in the next 7 days. | Include: (event) in_app_purchase OR purchase OR ecommerce_purchase OR (metric) LTV \> 0 AND (predictive metric) Churn probability \> 80th percentile          |
| Likely 7-day churning users        | Users who are likely to not visit your property in the next 7 days.            | Include: (predictive metric) Churn probability \> 80th percentile                                                                                             |
| Likely 7-day purchasers            | Users who are likely to make a purchase in the next 7 days.                    | Include: (predictive metric) Purchase probability \> 90th percentile                                                                                          |
| Likely first-time 7-day purchasers | Users who are likely to make their first purchase in the next 7 days.          | Include: (predictive metric) Purchase probability \> 90th percentile AND (metric) LTV \= 0 Exclude: (event) in_app_purchase OR purchase OR ecommerce_purchase |
| Predicted 28-day top spenders      | Users who are predicted to generate the most revenue in the next 28 days.      | Include: (predictive metric) Predicted revenue \> 95th percentile                                                                                             |
