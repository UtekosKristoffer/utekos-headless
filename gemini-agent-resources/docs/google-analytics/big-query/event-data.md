# BigQuery Export schema

This article explains the format and schema of the Google Analytics property
data and the Google Analytics for Firebase data that is exported to BigQuery.

---

## Datasets

For each Google Analytics property and each Firebase project that is linked to
BigQuery, a single dataset named "analytics\_\<property_id\>" is added to your
BigQuery project. Property ID refers to your Analytics Property ID, which you
can find in the property settings for your Google Analytics property, and in App
Analytics Settings in Firebase. Each Google Analytics property and each app for
which BigQuery exporting is enabled will export its data to that single dataset.

---

## Tables

Within each dataset, a table named `events_YYYYMMDD` is created each day if the
Daily export option is enabled.

If the Streaming export option is enabled, a table named
`events_intraday_YYYYMMDD` is created. This table is populated continuously as
events are recorded throughout the day. This table is deleted at the end of each
day once `events_YYYYMMDD` is complete.

Not all devices on which events are triggered send their data to Analytics on
the same day the events are triggered. To account for this latency, Analytics
will update the daily tables (`events_YYYYMMDD`) with events for those dates for
up to three days after the dates of the events. Events will have the correct
time stamp regardless of arriving late. Events that arrive after that three-day
window are not recorded.

If you are using
[BigQuery sandbox](https://cloud.google.com/bigquery/docs/sandbox), there is no
intraday import of events, and
[additional limits apply](https://cloud.google.com/bigquery/docs/sandbox#limits).

[Upgrade from the sandbox](https://cloud.google.com/bigquery/docs/sandbox#upgrading_from_the_sandbox)
if you want intraday imports.

---

## Columns

Each column in the `events_YYYYMMDD` table represents an event-specific
parameter. Note that some parameters are nested within RECORDS, and some RECORDS
such as [`items`](https://support.google.com/analytics/answer/7029846#items) and
[`event_params`](https://support.google.com/analytics/answer/7029846#event_params)
are repeatable. Table columns are described below.

[Expand all](https://support.google.com/analytics/answer/7029846#event&user&device&geo&app_info&collected_traffic_source&traffic_source&stream&ecommerce&items)
[Collapse all](https://support.google.com/analytics/answer/7029846)  
event  
user  
device  
geo  
app_info  
collected_traffic_source  
session_traffic_source_last_click  
traffic_source  
stream and platform  
ecommerce  
items  
publisher (Early access only)

---

## Rows

Data for a single event may be represented in one or multiple rows, depending on
whether it contains repeated RECORDS. A `page_view` event with multiple
[`event_params`](https://support.google.com/analytics/answer/7029846#event_params),
for example, would look similar to the following table. The initial row contains
the event name, date, timestamp and other non-repeated data items. The
[`event_params`](https://support.google.com/analytics/answer/7029846#event_params)
RECORD is repeated for each parameter associated with the event. These repeated
RECORDS are populated in subsequent rows directly under the initial event row.

| event_date | event_timestamp  | event_name | event_params.key    | event_params_value.string_value |
| :--------- | :--------------- | :--------- | :------------------ | :------------------------------ |
| 20220222   | 1643673600483790 | page_view  | page_location       | https://example.com             |
|            |                  |            | page_title          | Home                            |
|            |                  |            | medium              | referral                        |
|            |                  |            | source              | google                          |
|            |                  |            | page_referrer       | https://www.google.com          |
|            |                  |            | _\<parameters...\>_ | _\<values...\>_                 |
