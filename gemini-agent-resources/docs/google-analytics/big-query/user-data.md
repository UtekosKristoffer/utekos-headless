# GA4 | BigQuery Export user-data schema

## Setup

When you
[set up BigQuery Export](https://support.google.com/analytics/answer/9823238#step3),
you have the option to include a daily export of user data.

![][image1]

## Data tables

When you export user data, Analytics creates two new tables in your BigQuery
project:

- Pseudo ID
  - Contains a row for every pseudonymous identifier. Data for a user is updated
    when there is a change to one of the fields.
  - Data for unconsented users is not exported to this table.
  - User IDs are not exported to this table.
  - Last active timestamp is exported to this table.
- User ID
  - Contains a row for every user ID. Data for a user is updated when there is a
    change to one of the fields.
  - Data for unconsented users can be exported to this table if it includes a
    user ID.
  - Pseudo IDs are not exported to this table
  - Last active timestamp is exported to this table.

## Active users vs. all users in user-data export

This export includes any user whose data has changed that day. For example, if a
user initiates a session and thus increments the lifetime value of
`user_ltv.sessions`, then that user is included in the export. If a user is
dropped from an audience because on this day they no longer match the include
condition for the audience (e.g., they haven't made a purchase for the last 7
days), then that user's data has changed and they are included in the export.

Because users are included based on changes in data and not only on activity,
the number of users in the export may exceed the value of the _Active users_
metric for a given day or date range. (The _Active users_ metric appears as
_Users_ in Reports.)

If you want to query your exported data to get just the number of active users,
you can use some of the example queries outlined in our
[developer documentation](https://developers.google.com/analytics/bigquery/user-data-queries#summary_of_updates).

## Schema

The following sections describe the user data that Analytics exports to the
Pseudo ID and User ID tables (subject to the differences enumerated in the
section above).

### Audit

| Field name        | Data type | Description                                   |
| :---------------- | :-------- | :-------------------------------------------- |
| occurrence_date   | STRING    | Date when the record change was triggered     |
| last_updated_date | STRING    | Date when the record was updated in the table |

### User

| Field name     | Data type | Description                                                             |
| :------------- | :-------- | :---------------------------------------------------------------------- |
| user_id        | STRING    | ID for the User-ID namespace in reporting identity (User ID table only) |
| pseudo_user_id | STRING    | ID for the Pseudonymous namespace (Pseudo ID table only)                |
| stream_id      | INTEGER   | Data-stream ID (Pseudo ID table only)                                   |

### User info

| Field name                                  | Data type | Description                                                                                          |
| :------------------------------------------ | :-------- | :--------------------------------------------------------------------------------------------------- |
| user_info.last_active_timestamp_micros      | INTEGER   | Date of the user's last activity (timestamp in microseconds)                                         |
| user_info.user_first_touch_timestamp_micros | INTEGER   | Date of the user's first_open or first_visit event, whichever is earlier (timestamp in microseconds) |
| user_info.first_purchase_date               | STRING    | Date of the user's first purchase (YYYYMMDD)                                                         |

### Privacy info

| Field name                                  | Data type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| privacy_info                                | RECORD    | Privacy information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| privacy_info.is_ads_personalization_allowed | STRING    | If a user is eligible for ads personalization, isAdsPersonalizationAllowed returns 'true'. If a user is not eligible for ads personalization, isAdsPersonalizationAllowed returns 'false'. isAdsPersonalizationAllowed returns '(not set)' if Google Analytics is not currently able to return whether this user is eligible for ads personalization; users where isAdsPersonalizationAllowed returns '(not set)' may or may not be eligible for personalized ads. For personalized ads, you should treat users where isAdsPersonalizationAllowed \= '(not set)' as isAdsPersonalizationAllowed \= 'false' because, in the most general case, some of the '(not set)' rows will include users that are not eligible for ads personalization. Users where isAdsPersonalizationAllowed \= 'false' can still be used for non-advertising use cases like A/B testing & data explorations. |
| privacy_info.is_limited_ad_tracking         | STRING    | The device's Limit Ad Tracking setting. Possible values include: 'true', 'false', and '(not set)'. isLimitedAdTracking returns '(not set)' if Google Analytics is not currently able to return this device's Limit Ad Tracking setting.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### Audiences

| Field name                                   | Data type | Description                                                                                                                                                                       |
| :------------------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| audiences                                    | RECORD    | Audience information                                                                                                                                                              |
| audiences.id                                 | INTEGER   | ID of the audience                                                                                                                                                                |
| audiences.name                               | STRING    | Name of the audience                                                                                                                                                              |
| audiences.membership_start_timestamp_micros  | INTEGER   | When the user was first included in the audience (timestamp in microseconds)                                                                                                      |
| audiences.membership_expiry_timestamp_micros | INTEGER   | When the user's audience membership will expire (timestamp in microseconds) Membership duration is reset when new activity requalifies the user for the audience                  |
| audience.npa                                 | BOOLEAN   | true or false based on your [NPA settings for events and user-scoped custom dimensions](https://support.google.com/analytics/answer/9494752) included in your audience definition |

### Properties

| Field name                                 | Data type | Description                                                       |
| :----------------------------------------- | :-------- | :---------------------------------------------------------------- |
| user_properties                            | RECORD    | User-property information                                         |
| user_properties.key                        | STRING    | User-property dimension name                                      |
| user_properties.value.string_value         | STRING    | User-property dimension value                                     |
| user_properties.value.set_timestamp_micros | INTEGER   | When the dimension value was last set (timestamp in microseconds) |
|                                            |           |                                                                   |

### Device

| Field name                 | Data type | Description                                      |
| :------------------------- | :-------- | :----------------------------------------------- |
| device                     | RECORD    | Device information                               |
| device.operating_system    | STRING    | Device operating system                          |
| device.category            | STRING    | Category of the device (mobile, tablet, desktop) |
| device.mobile_brand_name   | STRING    | Device brand name                                |
| device.mobile_model_name   | STRING    | Device model name                                |
| device.unified_screen_name | STRING    | Screen name                                      |

### Geo

| Field name    | Data type | Description                               |
| :------------ | :-------- | :---------------------------------------- |
| geo           | RECORD    | Geographic information                    |
| geo.city      | STRING    | City from which events were reported      |
| geo.country   | STRING    | Country from which events were reported   |
| geo.continent | STRING    | Continent from which events were reported |
| geo.region    | STRING    | Region from which events were reported    |

### Lifetime

| Field name                       | Data type | Description                                       |
| :------------------------------- | :-------- | :------------------------------------------------ |
| user_ltv                         | RECORD    | Lifetime information                              |
| user_ltv.revenue_in_usd          | DOUBLE    | Lifetime total revenue (in USD)                   |
| user_ltv.sessions                | INTEGER   | Lifetime total number of sessions                 |
| user_ltv.engagement_time_millis  | INTEGER   | Lifetime total engagement time (in milliseconds)  |
| user_ltv.purchases               | INTEGER   | Lifetime total number of purchases                |
| user_ltv.engaged_sessions        | INTEGER   | Lifetime total number of engaged sessions         |
| user_ltv.session_duration_micros | INTEGER   | Lifetime total session duration (in milliseconds) |

### Predictions

| Field name                           | Data type | Description                                                                                                                 |
| :----------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------- |
| predictions                          | RECORD    | Prediction information                                                                                                      |
| predictions.in_app_purchase_score_7d | DOUBLE    | Probability that a user who was active in the last 28 days will log an `in_app_purchase` event within the next 7 days       |
| predictions.purchase_score_7d        | DOUBLE    | Probability that a user who was active in the last 28 days will log a `purchase` event within the next 7 days               |
| predictions.churn_score_7d           | DOUBLE    | Probability that a user who was active on your app or site within the last 7 days will not be active within the next 7 days |
| predictions.revenue_28d_in_usd       | FLOAT     | Revenue expected (in USD) from all purchase events within the next 28 days from a user who was active in the last 28 days   |
