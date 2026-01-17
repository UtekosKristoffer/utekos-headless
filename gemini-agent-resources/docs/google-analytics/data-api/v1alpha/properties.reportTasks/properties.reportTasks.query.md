# Method: properties.reportTasks.query

Retrieves a report task's content. After requesting the `reportTasks.create`,
you are able to retrieve the report content once the report is ACTIVE. This
method will return an error if the report task's state is not `ACTIVE`. A query
response will return the tabular row & column values of the report.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1alpha/{name=properties/*/reportTasks/*}:query`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                 |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The report source name. Format: `properties/{property}/reportTasks/{report}` |

### Request body

The request body contains data with the following structure:

| JSON representation                         |
| :------------------------------------------ |
| `{   "offset": string,   "limit": string }` |

| Fields   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `offset` | `string (int64 format)` Optional. The row count of the start row in the report. The first row is counted as row 0\. When paging, the first request does not specify offset; or equivalently, sets offset to 0; the first request returns the first `limit` of rows. The second request sets offset to the `limit` of the first request; the second request returns the second `limit` of rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).                                                                                                                                                                                                                                                                                                  |
| `limit`  | `string (int64 format)` Optional. The number of rows to return from the report. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. The number of rows available to a QueryReportTaskRequest is further limited by the limit of the associated ReportTask. A query can retrieve at most ReportTask.limit rows. For example, if the ReportTask has a limit of 1,000, then a reportTasks.query request with offset=900 and limit=500 will return at most 100 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). |

### Response body

The report content corresponding to a report task.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                                                                                                                                                                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensionHeaders": [     {       object (DimensionHeader)     }   ],   "metricHeaders": [     {       object (MetricHeader)     }   ],   "rows": [     {       object (Row)     }   ],   "totals": [     {       object (Row)     }   ],   "maximums": [     {       object (Row)     }   ],   "minimums": [     {       object (Row)     }   ],   "rowCount": integer,   "metadata": {     object (ResponseMetaData)   } }` |

| Fields               |                                                                                                                                                                 |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionHeaders[]` | `object (DimensionHeader)` Describes dimension columns. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows. |
| `metricHeaders[]`    | `object (MetricHeader)` Describes metric columns. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows.                |
| `rows[]`             | `object (Row)` Rows of dimension value combinations and metric values in the report.                                                                            |
| `totals[]`           | `object (Row)` If requested, the totaled values of metrics.                                                                                                     |
| `maximums[]`         | `object (Row)` If requested, the maximum values of metrics.                                                                                                     |
| `minimums[]`         | `object (Row)` If requested, the minimum values of metrics.                                                                                                     |
| `rowCount`           | `integer` The total number of rows in the query result.                                                                                                         |
| `metadata`           | `object (ResponseMetaData)` Metadata for the report.                                                                                                            |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`

## ResponseMetaData

Response's metadata carrying additional information about the report content.

| JSON representation                                                                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dataLossFromOtherRow": boolean,   "samplingMetadatas": [     {       object (SamplingMetadata)     }   ],   "schemaRestrictionResponse": {     object (SchemaRestrictionResponse)   },   "currencyCode": string,   "timeZone": string,   "emptyReason": string,   "subjectToThresholding": boolean }` |

| Fields                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataLossFromOtherRow`      | `boolean` If true, indicates some buckets of dimension combinations are rolled into "(other)" row. This can happen for high cardinality reports. The metadata parameter dataLossFromOtherRow is populated based on the aggregated data table used in the report. The parameter will be accurately populated regardless of the filters and limits in the report. For example, the (other) row could be dropped from the report because the request contains a filter on sessionSource \= google. This parameter will still be populated if data loss from other row was present in the input aggregate data used to generate this report. To learn more, see [About the (other) row and data sampling](https://support.google.com/analytics/answer/13208658#reports). |
| `samplingMetadatas[]`       | `object (SamplingMetadata)` If this report results is [sampled](https://support.google.com/analytics/answer/13331292), this describes the percentage of events used in this report. One `samplingMetadatas` is populated for each date range. Each `samplingMetadatas` corresponds to a date range in order that date ranges were specified in the request. However if the results are not sampled, this field will not be defined.                                                                                                                                                                                                                                                                                                                                  |
| `schemaRestrictionResponse` | `object (SchemaRestrictionResponse)` Describes the schema restrictions actively enforced in creating this report. To learn more, see [Access and data-restriction management](https://support.google.com/analytics/answer/10851388).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `currencyCode`              | `string` The currency code used in this report. Intended to be used in formatting currency metrics like `purchaseRevenue` for visualization. If currencyCode was specified in the request, this response parameter will echo the request parameter; otherwise, this response parameter is the property's current currencyCode. Currency codes are string encodings of currency types from the ISO 4217 standard ([https://en.wikipedia.org/wiki/ISO_4217)](<https://en.wikipedia.org/wiki/ISO_4217)>); for example "USD", "EUR", "JPY". To learn more, see [https://support.google.com/analytics/answer/9796179](https://support.google.com/analytics/answer/9796179).                                                                                               |
| `timeZone`                  | `string` The property's current timezone. Intended to be used to interpret time-based dimensions like `hour` and `minute`. Formatted as strings from the IANA Time Zone database ([https://www.iana.org/time-zones)](<https://www.iana.org/time-zones)>); for example "America/New_York" or "Asia/Tokyo".                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `emptyReason`               | `string` If empty reason is specified, the report is empty for this reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `subjectToThresholding`     | `boolean` If `subjectToThresholding` is true, this report is subject to thresholding and only returns data that meets the minimum aggregation thresholds. It is possible for a request to be subject to thresholding thresholding and no data is absent from the report, and this happens when all data is above the thresholds. To learn more, see [Data thresholds](https://support.google.com/analytics/answer/9383630) and [About Demographics and Interests](https://support.google.com/analytics/answer/2799357).                                                                                                                                                                                                                                              |

## SchemaRestrictionResponse

The schema restrictions actively enforced in creating this report. To learn
more, see
[Access and data-restriction management](https://support.google.com/analytics/answer/10851388).

| JSON representation                                                                          |
| :------------------------------------------------------------------------------------------- |
| `{   "activeMetricRestrictions": [     {       object (ActiveMetricRestriction)     }   ] }` |

| Fields                       |                                                                                                                                                                                                                                                                                                        |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeMetricRestrictions[]` | `object (ActiveMetricRestriction)` All restrictions actively enforced in creating the report. For example, `purchaseRevenue` always has the restriction type `REVENUE_DATA`. However, this active response restriction is only populated if the user's custom role disallows access to `REVENUE_DATA`. |

## ActiveMetricRestriction

A metric actively restricted in creating the report.

| JSON representation                                                                            |
| :--------------------------------------------------------------------------------------------- |
| `{   "restrictedMetricTypes": [     enum (RestrictedMetricType)   ],   "metricName": string }` |

| Fields                    |                                                                         |
| :------------------------ | :---------------------------------------------------------------------- |
| `restrictedMetricTypes[]` | `enum (RestrictedMetricType)` The reason for this metric's restriction. |
| `metricName`              | `string` The name of the restricted metric.                             |

## RestrictedMetricType

Categories of data that you may be restricted from viewing on certain Google
Analytics properties.

| Enums                                |                                            |
| :----------------------------------- | :----------------------------------------- |
| `RESTRICTED_METRIC_TYPE_UNSPECIFIED` | Unspecified type.                          |
| `COST_DATA`                          | Cost metrics such as `adCost`.             |
| `REVENUE_DATA`                       | Revenue metrics such as `purchaseRevenue`. |
