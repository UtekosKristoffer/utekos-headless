# Google Analytics (GA4) and BigQuery for Marketing and Audience Insights

Google Cloud works with Google Analytics to help businesses become more
data-driven. Bringing Google Analytics data into BigQuery can help you reveal
business insights across more data and increase time to value.

## Overview

### Familiar Data Tools to Supercharge Your Marketing

If you're looking for a way to bring more data to your marketing and make
data-driven decisions about your business, leveraging Google Analytics and
BigQuery together with Looker Studio is a great place to start. These familiar
tools work together with built-in integrations to make it easy to bring your
data together for analysis, audience segmentation, and sharing insights.

### What is the Difference Between GA4 and Universal Analytics?

Google Analytics 4 (GA4) properties will replace Universal Analytics properties
on July 1, 2023. This means Universal Analytics properties will stop processing
new data, so you will not be able to process new data or show updated reports
and metrics about your app or website performance after that date. Google
Analytics 4 properties will be the only fully functional version of Google
Analytics after July 1, 2023. Universal Analytics 360 properties will continue
to process new data until July 1, 2024.

### Why Should You Export Google Analytics Data into BigQuery?

You can export all event data from Google Analytics properties to BigQuery for
free with the BigQuery Export, which resides in Google Analytics (GA4). In
BigQuery, you can import external data from other sources, like CRM data, and
combine it with your Google Analytics data, using SQL-like syntax to query the
data for advanced reporting beyond sampling and quota limits. This enables you
to build audience segments, explore custom traffic attribution, and build simple
ML models for reporting and audiences.

### How Do You Set Up the Google Analytics BigQuery Export?

First, you'll need to create a new Google Cloud project and enable BigQuery.
Then you'll need to prepare your project for BigQuery Export. If this is your
first time getting started, you can link Google Analytics to the BigQuery
sandbox, which is free and doesn't require a credit card to get started (sandbox
limits apply). If your organization already has existing BigQuery pipelines, you
can also link to your existing BigQuery project. Finally, you'll link BigQuery
to Google Analytics properties.

### Can BigQuery Bring Google Analytics Data into Looker Studio?

Organizations can connect Google Analytics data directly into Looker Studio to
build reports and dashboards that can be shared across teams. (Looker Studio
reports connected to Google Analytics data are subject to Google Analytics Data
API quotas). The BigQuery export feature to Looker Studio provides capabilities
beyond the Google Analytics Data API without the worry about dealing with high
cardinality, while allowing you to get an accurate picture of your marketing
data without limitations from the API.

What is BigQuery? BigQuery is a cloud-based data warehouse that can store and
analyze large amounts of data. You can use BigQuery to store data from Google
Analytics, as well as other sources, such as your website's logs and your CRM
system. This data can be used to run complex queries and identify trends that
you might not be able to see with Google Analytics alone.

What is the BigQuery sandbox? The BigQuery sandbox lets you explore BigQuery
capabilities at no cost to confirm whether BigQuery fits your needs. The sandbox
lets you experience BigQuery and the Google Cloud console without providing a
credit card, creating a billing account, or enabling billing for your project.

What is Google Analytics? Google Analytics is a measurement platform that
provides a detailed understanding of your customers across devices and platforms
free of charge. You can use Google Analytics to measure your website or app's
performance, make data-driven decisions based on how customers interact across
your sites and apps, and improve your marketing ROI.

### What is Looker Studio?

Looker Studio is a free tool used to power your data with interactive dashboards
and beautiful reports that inspire smarter business decisions. Easily access a
wide variety of data with Looker Studio's built-in connectors that make it easy
to bring in data from BigQuery and Google Analytics 4. These enable you to build
and share reports and dashboards across your stakeholders and collaborate in
real time across a single source of truth.

---

## Common Uses

### Uncover Marketing Insights with Speed

#### Query Google Analytics Data for Fast Business Insights

BigQuery allows you to query your Google Analytics data to get answers to your
important business questions quickly. Here are some of the questions you can get
answered in a matter of seconds:

1. What is the average number of transactions per purchaser?
2. What are the other products purchased by customers who purchased a certain
   product?
3. What are the top 10 items added to cart over the course of the last 12
   months?

### Build and Activate Audience Segments

#### Quickly Segment Audiences Based on Any Combination of Events

Better understand customer behavior and target digital marketing with audiences
that are valuable to your business while increasing marketing ROI.

Start by segmenting your audiences based on Google Analytics events, from site
visitors who added to cart but didn't purchase to high lifetime value customers.
BigQuery allows you to quickly segment and share these audiences back into
Google Analytics.

---

## Basic Queries for Google Analytics Event Data Export

The sample queries in this page apply to the BigQuery event export data for
Google Analytics.

### Query Your Dataset Instead of the Sample Dataset

Unless otherwise noted, all queries listed here use sample datasets and should
produce valid results. To use your own Google Analytics property's BigQuery
event export data, look for the comment `-- Replace table` in each query and
replace the sample table. To copy the table name from your dataset:

1. Go to the BigQuery UI and select the project that contains your dataset.
2. Locate the table in the Explorer.
3. Click the three vertical dots to the right of the table, then click **Copy
   ID**.
4. Paste the table name in place of the sample table in the query.
5. Replace the date portion of the table with `*`.

For example, if Copy ID copied the BigQuery table name
`my-first-gcp-project:analytics_28239234.events_20240718`, then replace:

```sql
-- Replace table
`bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
```

with:

```sql
-- Replace table
`my-first-gcp-project.analytics_28239234.events_*`
```

> **Note:** When adding your table in the sample queries, replace `:` with `.`.

### Query a Specific Date Range

To query a specific date range from a BigQuery event export dataset, use the
`_TABLE_SUFFIX` pseudo column in the WHERE clause of your query. For more info,
view Filtering selected tables using `_TABLE_SUFFIX`.

For example, the following query counts unique events by date and by event name
for a specifc period of days and selected events:

```sql
-- Example: Query a specific date range for selected events.
--
-- Counts unique events by date and by event name for a specifc period of days and
-- selected events(page_view, session_start, and purchase).

SELECT
  event_date,
  event_name,
  COUNT(*) AS event_count
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  event_name IN ('page_view', 'session_start', 'purchase')
  -- Replace date range.
  AND _TABLE_SUFFIX BETWEEN '20201201' AND '20201202'
GROUP BY 1, 2;
```

### User Count and New User Count

To get the total user count, count the number of distinct `user_id`. However, if
your Google Analytics client does not send back a `user_id` with each hit or if
you are unsure, count the number of distinct `user_pseudo_id`.

For new users, you can take the same count approach described above but for the
following values of `event_name`:

- `first_visit`
- `first_open`

```sql
-- Example: Get 'Total User' count and 'New User' count.

WITH
  UserInfo AS (
    SELECT
      user_pseudo_id,
      MAX(IF(event_name IN ('first_visit', 'first_open'), 1, 0)) AS is_new_user
    -- Replace table name.
    FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
    -- Replace date range.
    WHERE _TABLE_SUFFIX BETWEEN '20201101' AND '20201130'
    GROUP BY 1
  )
SELECT
  COUNT(*) AS user_count,
  SUM(is_new_user) AS new_user_count
FROM UserInfo;
```

### Average Number of Transactions per Purchaser

The following query shows the average number of transactions per purchaser.

```sql


-- Example: Average number of transactions per purchaser.

SELECT
  COUNT(*) / COUNT(DISTINCT user_pseudo_id) AS avg_transaction_per_purchaser
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  event_name IN ('in_app_purchase', 'purchase')
  -- Replace date range.
  AND _TABLE_SUFFIX BETWEEN '20201201' AND '20201231';
```

### Values for a Specific Event Name

The following query shows the `event_timestamp` for all purchase events and the
associated event parameter values:

```sql


-- Example: Query values for a specific event name.
--
-- Queries the individual timestamps and values for all 'purchase' events.

SELECT
  event_timestamp,
  (
    SELECT COALESCE(value.int_value, value.float_value, value.double_value)
    FROM UNNEST(event_params)
    WHERE key = 'value'
  ) AS event_value
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  event_name = 'purchase'
  -- Replace date range.
  AND _TABLE_SUFFIX BETWEEN '20201201' AND '20201202';
```

The previous query can be modified to show the total of event parameter values
instead of a list:

```sql


-- Example: Query total value for a specific event name.
--
-- Queries the total event value for all 'purchase' events.

SELECT
  SUM(
    (
      SELECT COALESCE(value.int_value, value.float_value, value.double_value)
      FROM UNNEST(event_params)
      WHERE key = 'value'
    ))
    AS event_value
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  event_name = 'purchase'
  -- Replace date range.
  AND _TABLE_SUFFIX BETWEEN '20201201' AND '20201202';
```

### Top 10 Items Added to Cart

The following query shows the top 10 item added to cart by the most number of
users.

```sql


-- Example: Top 10 items added to cart by most users.

SELECT
  item_id,
  item_name,
  COUNT(DISTINCT user_pseudo_id) AS user_count
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_web_ecommerce.events_*`, UNNEST(items)
WHERE
  -- Replace date range.
  _TABLE_SUFFIX BETWEEN '20201101' AND '20210131'
  AND event_name IN ('add_to_cart')
GROUP BY
  1, 2
ORDER BY
  user_count DESC
LIMIT 10;
```

### Average Number of Pageviews by Purchaser Type

The following query shows the average number of pageviews by purchaser type
(purchasers vs non-purchasers) of users:

```sql


-- Example: Average number of pageviews by purchaser type.

WITH
  UserInfo AS (
    SELECT
      user_pseudo_id,
      COUNTIF(event_name = 'page_view') AS page_view_count,
      COUNTIF(event_name IN ('in_app_purchase', 'purchase')) AS purchase_event_count
    -- Replace table name.
    FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
    -- Replace date range.
    WHERE _TABLE_SUFFIX BETWEEN '20201201' AND '20201202'
    GROUP BY 1
  )
SELECT
  (purchase_event_count > 0) AS purchaser,
  COUNT(*) AS user_count,
  SUM(page_view_count) AS total_page_views,
  SUM(page_view_count) / COUNT(*) AS avg_page_views,
FROM UserInfo
GROUP BY 1;
```

### Sequence of Pageviews

This query shows the sequence of pageviews made by each user. The query orders
the results using the following fields so that events are listed in the order
they occurred for the user, even if the events were sent in the same batch:

- `user_pseudo_id`
- `user_id`
- `batch_page_id`
- `batch_ordering_id`
- `batch_event_index`

Although the sample limits the results to only `page_view` events, you can use
the same ORDER BY clause to correctly order all events by removing the WHERE
clause condition for `event_name`.

The query also shows how to use user-defined functions `GetParamString` and
`GetParamInt` to reduce duplication and make your queries easier to understand
and maintain.

> **Note:** The sample dataset schema does not contain the `batch_page_id`,
> `batch_ordering_id`, or `batch_event_index` fields. Replace the table in the
> FROM clause of the query with your table.

```sql

-- Example: Sequence of pageviews.

/** Temporary function to retrieve the string_value of an event parameter by event name. */
CREATE TEMP FUNCTION GetParamString(event_params ANY TYPE, param_name STRING)
AS ((SELECT ANY_VALUE(value.string_value) FROM UNNEST(event_params) WHERE key = param_name));

/** Temporary function to retrieve the int_value of an event parameter by event name. */
CREATE TEMP FUNCTION GetParamInt(event_params ANY TYPE, param_name STRING)
AS ((SELECT ANY_VALUE(value.int_value) FROM UNNEST(event_params) WHERE key = param_name));

SELECT
  user_pseudo_id,
  user_id,
  batch_page_id,
  batch_ordering_id,
  batch_event_index,
  event_name,
  GetParamInt(event_params, 'ga_session_id') as ga_session_id,
  GetParamString(event_params, 'page_location') as page_location,
  GetParamString(event_params, 'page_title') as page_title,
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  event_name = 'page_view'
  -- Replace date range.
  AND _TABLE_SUFFIX BETWEEN '20240718' AND '20240731'
ORDER BY
  user_pseudo_id,
  user_id,
  batch_page_id,
  batch_ordering_id,
  batch_event_index;
```

### Event Parameter List

The following query lists all event parameters appearing in your dataset:

```sql


-- Example: List all available event parameters and count their occurrences.

SELECT
  EP.key AS event_param_key,
  COUNT(*) AS occurrences
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`, UNNEST(event_params) AS EP
WHERE
  -- Replace date range.
  _TABLE_SUFFIX BETWEEN '20201201' AND '20201202'
GROUP BY
  event_param_key
ORDER BY
  event_param_key ASC;
```

### Joining with Google Ads

To retrieve additional Google Ads data for your Google Analytics events, set up
the BigQuery Data Transfer Service for Google Ads, then join the
`collected_traffic_source.gclid` from Google Analytics event data to the `gclid`
field of `ads_ClickStats_customer_id` from the Google Ads transfer.

Keep in mind that the Google Analytics event data export creates a table for
each day, while the Google Ads transfer populates a single
`ads_ClickStats_customer_id` table per customer.

---

Advanced querys to build strategix audience segments

Advanced queries

The advanced queries in this page apply to the BigQuery event export data for
Google Analytics. See BigQuery cookbook for Universal Analytics if you are
looking for the same resource for Universal Analytics. Try the basic queries
first before trying out the advanced ones.

Products purchased by customers who purchased a certain product

The following query shows what other products were purchased by customers who
purchased a specific product. This example does not assume that the products
were purchased in the same order.

The optimized example relies on BigQuery scripting features to define a variable
that declares which items to filter on. While this does not improve performance,
this is a more readable approach for defining variables compared creating a
single value table using a WITH clause. The simplified query uses the latter
approach using the WITH clause.

The simplified query creates a separate list of "Product A buyers" and does a
join with that data. The optimized query, instead, creates a list of all items a
user has purchased across orders using the `ARRAY_AGG` function. Then using the
outer WHERE clause, purchase lists across all users are filtered for the
`target_item` and only relevant items are shown.

#### Simplified Query

```sql

-- Example: Products purchased by customers who purchased a specific product.
--
-- `Params` is used to hold the value of the selected product and is referenced
-- throughout the query.

WITH
  Params AS (
    -- Replace with selected item_name or item_id.
    SELECT 'Google Navy Speckled Tee' AS selected_product
  ),
  PurchaseEvents AS (
    SELECT
      user_pseudo_id,
      items
    FROM
      -- Replace table name.
      `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
    WHERE
      -- Replace date range.
      _TABLE_SUFFIX BETWEEN '20201101' AND '20210131'
      AND event_name = 'purchase'
  ),
  ProductABuyers AS (
    SELECT DISTINCT
      user_pseudo_id
    FROM
      Params,
      PurchaseEvents,
      UNNEST(items) AS items
    WHERE
      -- item.item_id can be used instead of items.item_name.
      items.item_name = selected_product
  )
SELECT
  items.item_name AS item_name,
  SUM(items.quantity) AS item_quantity
FROM
  Params,
  PurchaseEvents,
  UNNEST(items) AS items
WHERE
  user_pseudo_id IN (SELECT user_pseudo_id FROM ProductABuyers)
  -- item.item_id can be used instead of items.item_name
  AND items.item_name != selected_product
GROUP BY 1
ORDER BY item_quantity DESC;
```

### Average Amount of Money Spent per Purchase Session by User

The following query shows the average amount of money spent per session by each
user. This takes into account only the sessions where the user made a purchase.

```sql


-- Example: Average amount of money spent per purchase session by user.

WITH
  events AS (
    SELECT
      session.value.int_value AS session_id,
      COALESCE(spend.value.int_value, spend.value.float_value, spend.value.double_value, 0.0)
        AS spend_value,
      event.*

    -- Replace table name
    FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*` AS event
    LEFT JOIN UNNEST(event.event_params) AS session
      ON session.key = 'ga_session_id'
    LEFT JOIN UNNEST(event.event_params) AS spend
      ON spend.key = 'value'

    -- Replace date range
    WHERE _TABLE_SUFFIX BETWEEN '20201101' AND '20210131'
  )
SELECT
  user_pseudo_id,
  COUNT(DISTINCT session_id) AS session_count,
  SUM(spend_value) / COUNT(DISTINCT session_id) AS avg_spend_per_session_by_user
FROM events
WHERE event_name = 'purchase' and session_id IS NOT NULL
GROUP BY user_pseudo_id
```

### Latest Session ID and Session Number for Users

The following query provides the list of the latest `ga_session_id` and
`ga_session_number` from last 4 days for a list of users. You can provide either
a `user_pseudo_id` list or a `user_id` list.

#### Using user_pseudo_id

```sql

-- Get the latest ga_session_id and ga_session_number for specific users during last 4 days.

-- Replace timezone. List at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
DECLARE REPORTING_TIMEZONE STRING DEFAULT 'America/Los_Angeles';

-- Replace list of user_pseudo_id's with ones you want to query.
DECLARE USER_PSEUDO_ID_LIST ARRAY<STRING> DEFAULT
  [
    '1005355938.1632145814', '979622592.1632496588', '1101478530.1632831095'];

CREATE TEMP FUNCTION GetParamValue(params ANY TYPE, target_key STRING)
AS (
  (SELECT `value` FROM UNNEST(params) WHERE key = target_key LIMIT 1)
);

CREATE TEMP FUNCTION GetDateSuffix(date_shift INT64, timezone STRING)
AS (
  (SELECT FORMAT_DATE('%Y%m%d', DATE_ADD(CURRENT_DATE(timezone), INTERVAL date_shift DAY)))
);

SELECT DISTINCT
  user_pseudo_id,
  FIRST_VALUE(GetParamValue(event_params, 'ga_session_id').int_value)
    OVER (UserWindow) AS ga_session_id,
  FIRST_VALUE(GetParamValue(event_params, 'ga_session_number').int_value)
    OVER (UserWindow) AS ga_session_number
FROM
  -- Replace table name.
  `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
WHERE
  user_pseudo_id IN UNNEST(USER_PSEUDO_ID_LIST)
  AND RIGHT(_TABLE_SUFFIX, 8)
    BETWEEN GetDateSuffix(-3, REPORTING_TIMEZONE)
    AND GetDateSuffix(0, REPORTING_TIMEZONE)
WINDOW UserWindow AS (PARTITION BY user_pseudo_id ORDER BY event_timestamp DESC);
```

---

## Queries for Google Analytics User-Data Export

The sample queries in this page apply to the BigQuery user-data export for
Google Analytics. The BigQuery user-data export creates two tables for each day:

- A `users_YYYYMMDD` table, which contains a row for every user ID that changed.
- A `pseudonymous_users_YYYYMMDD` table, which contains a row for every
  pseudonymous identifier that changed.

Check out the BigQuery Export user-data schema for more details.

> **Tip:** In order to make the most of the example queries in this guide, set
> the `PROJECT_ID` and `PROPERTY_ID` variables with the values for your project
> and property. Retrieve the `PROJECT_ID` from your project dashboard, and the
> `PROPERTY_ID` from the Google Analytics property selector.

### Query a Specific Date Range

To query a specific date range from a BigQuery user-data export dataset, use the
`_TABLE_SUFFIX` pseudo column in the WHERE clause of your query.

For example, the following query counts the number of unique users updated
between August 1, 2023 and August 15, 2023 with a lifetime engagement of at
least five minutes.

#### Using users table

```sql

-- Example: Query a specific date range for users meeting a lifetime engagement criterion.
--
-- Counts unique users that are in the BigQuery user-data exports for a specific date range and have
-- a lifetime engagement of 5 minutes or more.

SELECT
  COUNT(DISTINCT user_id) AS user_count
FROM
  -- Uses a table suffix wildcard to define the set of daily tables to query.
  `PROJECT_ID.analytics_PROPERTY_ID.users_202308*`
WHERE
  -- Filters to users updated between August 1 and August 15.
  _TABLE_SUFFIX BETWEEN '01' AND '15'
  -- Filters by users who have a lifetime engagement of 5 minutes or more.
  AND user_ltv.engagement_time_millis >= 5 * 60 * 1000;
```

Each example limits the data to August 1, 2023 through August 15, 2023 by using
two features:

- The wildcard `202308*` in the FROM clause.
- A `_TABLE_SUFFIX` condition in the WHERE clause that filters tables based on
  the wildcard portion of the table name. For the wildcard of `202308*`, the
  wildcard portion is the day of the month.

You can use a similar approach to query multiple months of data. For example, to
query January through October of 2023, modify the query to have:

- The wildcard `2023*`.
- A `_TABLE_SUFFIX` condition of `_TABLE_SUFFIX BETWEEN '0101' AND '1031'`.

You can also query multiple years of data. For example, to query October 2022
through February 2023, modify the query to have:

- The wildcard `202*`.
- A `_TABLE_SUFFIX` condition of `_TABLE_SUFFIX BETWEEN '21001' AND '30331'`.

### User IDs for Recent User Property Changes

The following query shows how to retrieve the `user_id` and `pseudo_user_id` of
all users who recently changed a specific user property.

#### Using users table

```sql

-- Example: Get the list of user_ids with recent changes to a specific user property.
DECLARE
  UPDATE_LOWER_BOUND_MICROS INT64;

-- Replace timezone. List at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
DECLARE
  REPORTING_TIMEZONE STRING DEFAULT 'America/Los_Angeles';

-- Sets the variable for the earliest update time to include. This comes after setting
-- the REPORTING_TIMEZONE so this expression can use that variable.
SET UPDATE_LOWER_BOUND_MICROS = UNIX_MICROS(
    TIMESTAMP_SUB(
      TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), DAY, REPORTING_TIMEZONE),
      INTERVAL 14 DAY));

-- Selects users with changes to a specific user property since the lower bound.
SELECT
  users.user_id,
  FORMAT_TIMESTAMP('%F %T',
    TIMESTAMP_MICROS(
      MAX(properties.value.set_timestamp_micros)),
      REPORTING_TIMEZONE) AS max_set_timestamp
FROM
  -- Uses a table prefix to scan all data for 2023. Update the prefix as needed to query a different
  -- date range.
  `PROJECT_ID.analytics_PROPERTY_ID.users_2023*` AS users,
  users.user_properties properties
WHERE
  properties.value.user_property_name = 'job_function'
  AND properties.value.set_timestamp_micros >= UPDATE_LOWER_BOUND_MICROS
GROUP BY
  1;
```

### Summary of Updates

Use this query to understand why the user-data export included or excluded
different categories of users.

#### Using users table

```sql

-- Summarizes data by change type.

-- Defines the export date to query. This must match the table suffix in the FROM
-- clause below.
DECLARE EXPORT_DATE DATE DEFAULT DATE(2023,6,16);

-- Creates a temporary function that will return true if a timestamp (in micros) is for the same
-- date as the specified day value.
CREATE TEMP FUNCTION WithinDay(ts_micros INT64, day_value DATE)
AS (
  (ts_micros IS NOT NULL) AND
  -- Change the timezone to your property's reporting time zone.
  -- List at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
  (DATE(TIMESTAMP_MICROS(ts_micros), 'America/Los_Angeles') = day_value)
);

-- Creates a temporary function that will return true if a date string in 'YYYYMMDD' format is
-- for the same date as the specified day value.
CREATE TEMP FUNCTION SameDate(date_string STRING, day_value DATE)
AS (
  (date_string IS NOT NULL) AND
  (PARSE_DATE('%Y%m%d', date_string) = day_value)
);

WITH change_types AS (
SELECT user_id,
  WithinDay(user_info.last_active_timestamp_micros, EXPORT_DATE) AS user_activity,
  WithinDay(user_info.user_first_touch_timestamp_micros, EXPORT_DATE) AS first_touch,
  SameDate(user_info.first_purchase_date, EXPORT_DATE) as first_purchase,
  (EXISTS (SELECT 1 FROM UNNEST(audiences) AS aud
           WHERE WithinDay(aud.membership_start_timestamp_micros, EXPORT_DATE))) AS audience_add,
  (EXISTS (SELECT 1 FROM UNNEST(audiences) AS aud
           WHERE WithinDay(aud.membership_expiry_timestamp_micros, EXPORT_DATE))) AS audience_remove,
  (EXISTS (SELECT 1 FROM UNNEST(user_properties) AS prop
           WHERE WithinDay(prop.value.set_timestamp_micros, EXPORT_DATE))) AS user_property_change
FROM
  -- The table suffix must match the date used to define EXPORT_DATE above.
  `project_id.analytics_property_id.users_20230616`
)
SELECT
  user_activity,
  first_touch,
  first_purchase,
  audience_add,
  audience_remove,
  user_property_change,
  -- This field will be true if there are no changes for the other change types.
  NOT (user_activity OR first_touch OR audience_add OR audience_remove OR user_property_change) AS other_change,
  COUNT(DISTINCT user_id) AS user_id_count
FROM change_types
GROUP BY 1,2,3,4,5,6,7;
```

```
Use BigQuery ML for predictive analytics
build
How-tos
Create demand forecasts and build predictive audiences
Use BigQuery's built-in machine learning to better forecast and plan marketing performance. You can use historical marketing data to create accurate forecasts that include seasonality to better plan for business peaks.

BigQuery ML allows you to build predictive audiences like propensity to purchase or predictive customer lifetime value based on Google Analytics data that you can use to target potentially valuable new customers. ML-based predictive capabilities also allow you to predict churn.

Churn prediction for game developers

Build marketing performance dashboards
build
How-tos
Build marketing reports and dashboards with Looker Studio
Looker Studio connects with hundreds of data sources and allows you to create highly visual dashboards, so you can blend and analyze data from your marketing activities for rapid insights. Input your marketing analytics data, including Google Analytics and Google Search Console, and customize your own views, including tables and charts, to highlight performance.

```
