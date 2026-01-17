# Set up audiences

## Suggested audiences

Create audiences relevant to your business goals.

[Next: \[GA4\] Predictive audiences](https://support.google.com/analytics/answer/9805833?hl=en&ref_topic=14272803)

_This article is for Google Analytics users who want suggestions for generating
leads and creating audiences that are relevant to their businesses. These
audiences can be used for measurement within Google Analytics, and exported for
both activation and measurement._

On this page

- [About suggested audiences](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#Aboutsuggestaudience)
- [How to create and view suggested audiences](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#Howtocreateview)
- [Audience descriptions and configurations](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#Audiencedescripsconfigs)

---

## About suggested audiences

Analytics uses different signals to display suggested audiences for your
property.

- When you create a property, you should specify the industry category for your
  business as the same audience can appear for a number of different categories.
  This helps Analytics to provide the best suggestions.
- Similarly, when you offer an app for download in Apple's App Store or in
  Google Play, you specify one or more categories for the app. Analytics will
  then also use these categories to provide you with the best suggestions.

Analytics displays a number of preconfigured suggested audiences based on the
above, that you can use to meet your business goals.

- Suggested audiences are based on the recommended events for those categories.
  Be sure to
  [review recommended events](https://support.google.com/analytics/answer/9267735)
  for key categories like eCommerce, Gaming, Lead Generation, and implement them
  to take advantage of the suggested audiences feature to quickly create
  audiences for use in measurement and advertising.
- Automatically generate and export created audiences to your linked products:
  Google Ads, Display & Video 360, Search Ads 360, Ad Manager, and Firebase. You
  may also export your audience using the
  [Audience Export API](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics).
- Although you can only review the suggestions relevant to your category, you
  can quickly create any of these audiences based on where they are if you find
  them appropriate to your business. You need to collect the events and
  parameters that form the basis of the audiences you want to use in order for
  the audience to populate users.
- If your property generates the data required for
  [predictive metrics](https://support.google.com/analytics/answer/9846734),
  then you can also view suggested
  [predictive audiences](https://support.google.com/analytics/answer/9805833).
- Use a pre-built suggestion to
  [generate leads](https://support.google.com/analytics/answer/12941105), reach
  your ideal target audience, and make data-driven decisions.
- You can use pre-built suggestions that align well with your customer lifecycle
  goals. For example, the “High Value Purchasers” template can be used to
  optimize for High Value New Customer Mode, while the “Disengaged Purchasers”
  template is helpful for Re-engagement Mode. Learn more
  [About customer lifecycle goals](https://support.google.com/google-ads/answer/12080169).

---

## How to create and view suggested audiences

1. In
   [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks),
   under "Data display", select
   [Audiences](https://analytics.google.com/analytics/web/#/a54516992p153293282/admin/audiences/hub?utm_source=gahc&utm_medium=dlinks).
2. Select the Objects section to expand it.
3. To view suggested audiences for your property, select Audiences on the left,
   then select New audience.
4. Next, select the tab under which your property is currently collecting events
   (Top Suggestions, General, Drive online sales, Generate leads, Predictive).
5. Based on available events, select the preconfigured, suggested audience for
   your current business objective. Learn more about how to
   [Create, edit, and archive audiences](https://support.google.com/analytics/answer/9267572)
   .

_Suggested audiences to Generate leads_

Note: Google Analytics offers 3 ways you can create and build an audience.
Suggested audiences use your data to quickly generate pre-built recommendations.
Audience templates can provide you with a more structured approach to creating
audiences using demographics, behaviors, and specific objectives. Custom
audiences gives you control to customize and tailor audiences based on a number
of criteria resulting in highly specific targeting. Learn more
[Examples of audiences in Google Analytics and how to create them](https://support.google.com/analytics/answer/12799863).

---

## Top Suggestions

The "Top Suggestions" tab recommends audiences for which you are already
collecting the events and parameters to populate the audience with users.

---

## Audience descriptions and configurations

- [Predictive audiences](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#predictive)
- [Suggested audiences that drive online sales](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#online_sales)
- [Suggested audiences to generate leads](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#audiences_leads)
- [Suggested audiences for Gaming](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#audiences_gaming)
- [Additional suggested audiences](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#additional_audiences)

### Predictive audiences

| Audience                           | Description                                                                    | Configuration                                                                                                                                                 |
| :--------------------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Likely 7-day churning purchasers   | Purchasing users who are likely to not visit your property in the next 7 days. | Include: (event) in_app_purchase OR purchase OR ecommerce_purchase OR (metric) LTV \> 0 AND (predictive metric) Churn probability \> 80th percentile          |
| Likely 7-day churning users        | Users who are likely to not visit your property in the next 7 days.            | Include: (predictive metric) Churn probability \> 80th percentile                                                                                             |
| Likely 7-day purchasers            | Users who are likely to make a purchase in the next 7 days.                    | Include: (predictive metric) Purchase probability \> 90th percentile                                                                                          |
| Likely first-time 7-day purchasers | Users who are likely to make their first purchase in the next 7 days.          | Include: (predictive metric) Purchase probability \> 90th percentile AND (metric) LTV \= 0 Exclude: (event) in_app_purchase OR purchase OR ecommerce_purchase |
| Predicted 28-day top spenders      | Users who are predicted to generate the most revenue in the next 28 days.      | Include: (predictive metric) Predicted revenue \> 95th percentile                                                                                             |

### Suggested audiences that drive online sales

| Audience                  | Description                                                                             | Configuration                                                                                                                                                                                                                                                           |
| :------------------------ | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7-day inactive purchasers | Purchasers who were once active, but haven't been active for the last 7 days.           | Include: Event name: in_app_purchase OR Event name: purchase OR Event name: ecommerce_purchase AND Event name: session_start Event parameter: event_count \= 0 Time period \= 7 days Most recent time period                                                            |
| Billable users            | Users who registered a form of payment.                                                 | Include: Event name: add_payment_info                                                                                                                                                                                                                                   |
| Cart abandoners           | Users who added items to their carts but didn't purchase.                               | Include: Event name: add_to_cart Exclude: Event_name: purchase                                                                                                                                                                                                          |
| Checkout starters         | Users who started checking out but didn't complete the purchase.                        | Include: Event name: begin_checkout Exclude: Event name: purchase                                                                                                                                                                                                       |
| Disengaged purchasers     | Users who purchased previously but haven’t purchased within a specified number of days. | Include: Event name: in_app_purchase OR Event name: purchase OR Event name: ecommerce_purchase AND Event name: in_app_purchase OR purchase OR ecommerce_purchase Event parameter: event_count \= 0 Time period \= 30 days (or your time period) Most recent time period |
| High value purchasers     | Purchasers that bring in the most lifetime revenue.                                     | Include: (event) Event name: in_app_purchase OR purchase OR ecommerce_purchaseEvent parameter: event_count \>= Time period \= Most recent time period AND (metrics) LTV \> 500 (or your amount) OR LTV percentile \> 90 (or your percentile)                            |
| Item searchers            | Users who conducted item searches.                                                      | Include: Event name: search Event parameter: search_term Operator: exactly matches Parameter value: \<item name\>                                                                                                                                                       |
| Item viewers              | Users who viewed specific items                                                         | Include: Event name: view_item Event parameter: item_id Operator: exactly matches Parameter value: \<item ID\>                                                                                                                                                          |
| Registered users          | Users who registered with your business (e.g., by providing an email address).          | Include: Event name: sign_up                                                                                                                                                                                                                                            |
| Wishlist users            | Users who added items to a wishlist.                                                    | Include: Event name: add_to_wishlist                                                                                                                                                                                                                                    |

### Suggested audiences to generate leads

| Audience                | Description                                                                                                                 | Configuration                                                                                                               |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| New Leads               | Users who interact with the generate_lead event and are marked as leads but not yet working, qualified, or converted leads. | Include: Event name: generate_lead                                                                                          |
| Leads                   | Users who are potential business leads.                                                                                     | Include: Event name: generate_lead                                                                                          |
| Submitted Leads         | Users who submit a form online or submit information offline.                                                               | Include: Event name: generate_lead                                                                                          |
| Qualified Leads         | Users who are marked as qualified leads, but haven’t been marked as converted or unconverted.                               | Include: Event name: qualify_lead Temporarily Exclude: close_convert_lead close_uncovert_lead                               |
| Disqualified Leads      | Users who are marked as disqualified to become a lead.                                                                      | Include: Event name: disqualify_lead                                                                                        |
| Working New Leads       | Users who are marked as working leads, but not yet considered working, qualified, or converted.                             | Include: Event name: working_lead Temporarily Exclude: qualify_lead close_convert_lead close_unconvert_lead                 |
| Working Qualified Leads | Users who are marked as working qualified leads, but haven’t yet converted.                                                 | Include: Event name: working_lead qualify_lead Temporarily Exclude: disqualify_lead close_convert_lead close_unconvert_lead |
| Converted Leads         | Users who became a converted lead (a customer).                                                                             | Include: Event name: close_convert_lead                                                                                     |
| Unconverted Leads       | Users who are marked as not becoming a converted lead.                                                                      | Include: Event name: close_unconvert_lead Temporarily Exclude: close_convert_lead                                           |

### Suggested audiences for Gaming

| Audience               | Description                                                                    | Configuration                                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| Registered users       | Users who registered with your business (e.g., by providing an email address). | Include: Event name: sign_up                                                                                              |
| Top players            | Users who reached a specific level.                                            | Include: Event name: level_up Event parameter: level Operator: \>= Parameter value: 10                                    |
| Top scorers            | Users who achieved a high score.                                               | Include: Event name: post_score Event parameter: score Operator: \>= Parameter value: 1000                                |
| Achievers              | Users who unlocked a specific achievement.                                     | Include: Event name: unlock_achievement Event parameter: name_of_achievement                                              |
| Tutorial abandoners    | Users who didn't complete a tutorial.                                          | Include: Event name: tutorial_begin Exclude: Event name: tutorial_complete                                                |
| Tutorial finishers     | Users who completed a tutorial.                                                | Include: Event name: tutorial_complete                                                                                    |
| 7-day unnotified users | Users who haven't received a push notification in the last 7 days.             | Include: Event name: notification_receive Event parameter: event_count \= 0 Time period \= 7 days Most recent time period |
| Streamers              | Users who streamed content.                                                    | Include: Event name: video_start                                                                                          |

### Additional suggested audiences

| Audience               | Description                                                                    | Configuration                                                                                                             |
| :--------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| 7-day unnotified users | Users who haven't received a push notification in the last 7 days.             | Include: Event name: notification_receive Event parameter: event_count \= 0 Time period \= 7 days Most recent time period |
| 7-day inactive users   | Users who were once active, but haven't been active for the last 7 days.       | Include: Event name: session_start Event parameter: event_count \= 0 Time period \= 7 days Most recent time period        |
| Video completed        | Users who completed watching a video.                                          | Include: Event name: video_complete                                                                                       |
| Video start            | Users who started watching a video.                                            | Include: Event name: video_progress                                                                                       |
| Streamers              | Users who streamed content.                                                    | Include: Event name: video_start                                                                                          |
| Registered users       | Users who registered with your business (e.g., by providing an email address). | Include: Event name: sign_up                                                                                              |
| Searchers              | Users who conducted any type of search.                                        | Include: Event name: view_search_results                                                                                  |
