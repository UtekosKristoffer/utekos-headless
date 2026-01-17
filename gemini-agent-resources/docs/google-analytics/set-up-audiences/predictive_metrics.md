## Set up audiences

# \[GA4\] Predictive metrics

[Next: \[GA4\] Audience triggers](https://support.google.com/analytics/answer/9934109?hl=en&ref_topic=14272803)

## About predictive metrics

Google Analytics automatically enriches your data by bringing Google
machine-learning expertise to bear on your dataset to predict the future
behavior of your users. With predictive metrics, you learn more about your
customers just by collecting structured event data.

| Metric                      | Definition                                                                                                                                                                      |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Purchase probability        | The probability that a user who was active in the last 28 days will log a specific [**key event**](https://support.google.com/analytics/answer/9355848) within the next 7 days. |
| Churn probability           | The probability that a user who was active on your app or site within the last 7 days will not be active within the next 7 days.                                                |
| Predicted revenue           | The revenue expected from all purchase key events within the next 28 days from a user who was active in the last 28 days.                                                       |
| In-app purchase probability | The probability that a user who was active in the last 28 days will trigger an `in_app_purchase` event within the prediction window.                                            |

Currently, only `purchase`/`ecommerce_purchase` and `in_app_purchase` events are
supported for the Purchase probability and Revenue prediction metrics.

Although we will continue to process the `ecommerce_purchase` event, we now
recommend the `purchase` event instead.

## Prerequisites

To train predictive models successfully, Analytics requires that the following
criteria are met:

1. A minimum number of positive and negative examples of purchasers and churned
   users. In the last 28 days, over a seven-day period, at least 1,000 returning
   users must have triggered the relevant predictive condition (purchase or
   churn) and at least 1,000 returning users must not.
2. Model quality must be sustained over a period of time to be eligible.
   ([Learn more](https://support.google.com/analytics/answer/9846734#bestpractices)
   about what actions you can take to make sure your property has the best
   chance possible of being eligible for predictive metrics.)
3. To be eligible for both the purchase probability and predicted revenue
   metrics, a property has to send the `purchase`
   ([recommended for collection](https://support.google.com/analytics/answer/9267735))
   and/or `in_app_purchase`
   ([collected automatically](https://support.google.com/analytics/answer/9234069))
   events. When you collect the `purchase` event, you need to also collect the
   `value` and `currency` parameters for that event. Learn more about
   [purchase events](https://developers.google.com/gtagjs/reference/ga4-events#purchase).

Predictive metrics for each eligible model will be generated for each active
user once per day. If the model quality for your property falls below the
minimum threshold, then Analytics will stop updating the corresponding
predictions and they may become unavailable in Analytics.

You can check the eligibility status of each prediction by going to the
_predictive_ section within suggested-audience templates in the audience
builder.

## Using predictive metrics

Predictive metrics are available in the
[audience builder](https://support.google.com/analytics/answer/9267572) and in
[Explorations](https://support.google.com/analytics/answer/7579450).

### Audience builder

Predictive metrics can be used to create
[predictive audiences](https://support.google.com/analytics/answer/9805833) in
the audience builder.

### Exploration

You can use _Purchase probability_ and _Churn probability_ in Explorations
within the
[User lifetime technique](https://support.google.com/analytics/answer/9947257).

Not all users have the same data available. This means when you use a query that
includes all users in Google Analytics 4, you'll see results broken down into 2
groups:

- Users with prediction metrics: This group includes users for whom Google
  Analytics 4 can calculate things like purchase probability.
- Users without prediction metrics: This group includes users for whom Google
  Analytics 4 doesn't yet have enough data to calculate predictions.

Example: If you use the "User Lifetime" technique and look at "Total users" and
"Purchase probability" by "Last audience name," you'll likely see two rows for
each audience. One row will show results for users with a purchase probability
metric, and the other row will show results for users without one.

## Best practices

In your
[data-sharing settings](https://support.google.com/analytics/answer/1011397),
enable the Modeling contributions & business insights setting. You benefit when
this setting is ON because Analytics is able to use shared aggregated data to
improve model quality and improve your predictions.

Make sure to maximize the use of
[event recommendations](https://support.google.com/analytics/answer/9322688) in
your property.

Make sure you are collecting the `purchase`, and/or `in_app_purchase` events.
`in_app_purchase` events are collected automatically. However, you must
[link to Google Play via your Firebase account](https://support.google.com/firebase/answer/6392038)
in order to view the `in_app_purchase` event if you have an Android app. Keep in
mind that although we will continue to process the `ecommerce_purchase` event,
we now recommend the `purchase` event instead.

If you define a custom audience and add predictive conditions to use In-app
purchase probability and Purchase probability, only users who complete both a
`purchase` and an `in_app_purchase` will be included in the audience.

Collecting a larger variety or volume of
[recommended events](https://support.google.com/analytics/answer/9267735)
corresponding to user behavior will help enhance our models and improve
predictions. Likewise minimizing noisy events that are not meaningful in terms
of user behavior will also help improve predictions.
