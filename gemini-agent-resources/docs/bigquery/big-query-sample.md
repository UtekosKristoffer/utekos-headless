# BigQuery sample dataset for Google Analytics ecommerce web implementation

[Google Merchandise Store](https://shop.googlemerchandisestore.com/) is an
online store that sells Google-branded merchandise. The site uses Google
Analytics's standard web
[ecommerce implementation](https://developers.google.com/tag-manager/ecommerce-ga4)
along with
[enhanced measurement](https://support.google.com/analytics/answer/9216061). The
[`ga4_obfuscated_sample_ecommerce` dataset](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=ga4_obfuscated_sample_ecommerce&t=events_20210131&page=table)
available through the BigQuery Public Datasets program contains a sample of
obfuscated BigQuery event export data for three months from 2020-11-01 to
2021-01-31.

## Pre-requisite

- You need access to a Google Cloud project with BigQuery API enabled. Complete
  the _Before you begin_ section in the
  [BigQuery Quickstart guide](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-web-ui#before-you-begin)
  to create a new Google Cloud project or to enable the BigQuery API in an
  existing one.
- You can use the
  [BigQuery Sandbox mode](https://cloud.google.com/bigquery/docs/sandbox) for
  free with certain limitations. The
  [Free usage tier](https://cloud.google.com/bigquery/pricing#free-tier) should
  be sufficient to explore this dataset and run the sample queries. You can
  optionally
  [Enable Billing](https://cloud.google.com/billing/docs/how-to/modify-project)
  to go beyond the Free usage tier.

## Limitations

This dataset contains obfuscated data that emulates what a real world dataset
would look like from an actual Google Analytics implementation. Certain fields
will contain placeholder values including `<Other>`, `NULL`, and `''`. Due to
obfuscation, internal consistency of the dataset might be somewhat limited.

The dataset can not be compared to the
[Google Analytics Demo Account](https://support.google.com/analytics/answer/6367342)
for Google Merchandise store as the data is different.

## Using the dataset

1. The Cloud Console provides an interface to query tables. You can use the
   [BigQuery UI](https://console.cloud.google.com/bigquery?p=bigquery-public-data&d=ga4_obfuscated_sample_ecommerce&t=events_20210131&page=table)
   to access the `ga4_obfuscated_sample_ecommerce` dataset.
2. If the **Editor** tab isn't visible, then click add_box **Compose new
   query**.
3. Copy and paste the following query into the Editor field. This query will
   show to number of unique events, users, and days in the dataset.

```
SELECT
  COUNT(*) AS event_count,
  COUNT(DISTINCT user_pseudo_id) AS user_count,
  COUNT(DISTINCT event_date) AS day_count
FROM `bigquery-public-data.ga4_obfuscated_sample_ecommerce.events_*`
```

4.  For valid queries, a check mark will appear along with the amount of data
    that the query will process. This metric helps you determine the cost of
    running the query.

BigQuery UI showing query validation and query size  
5. Click **Run**. The query results page will appear below the query window.

BigQuery UI showing query results  
6. Try running some
[sample queries](https://developers.google.com/analytics/bigquery/basic-queries).

## Next Steps

- Learn more about the schema for
  [Google Analytics BigQuery event export schema](https://developers.google.com/analytics/bigquery/event-schema).
- Run some of the
  [advanced queries](https://developers.google.com/analytics/bigquery/advanced-queries)
  on the dataset.
- If you are not familiar with BigQuery, explore
  [BigQuery How-to Guides](https://cloud.google.com/bigquery/docs/how-to).
- Use
  [Connected Sheets](https://cloud.google.com/bigquery/docs/connected-sheets) to
  analyze the dataset from Google Sheets spreadsheet.
- [Visualize](https://cloud.google.com/bigquery/docs/visualize-looker-studio)
  the dataset using [Looker Studio](https://lookerstudio.google.com/).
-
