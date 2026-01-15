# RunAccessReportResponse

The customized Data Access Record Report response.

| JSON representation                                                                                                                                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensionHeaders": [     {       object (AccessDimensionHeader)     }   ],   "metricHeaders": [     {       object (AccessMetricHeader)     }   ],   "rows": [     {       object (AccessRow)     }   ],   "rowCount": integer,   "quota": {     object (AccessQuota)   } }` |

| Fields               |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionHeaders[]` | `object (AccessDimensionHeader)` The header for a column in the report that corresponds to a specific dimension. The number of DimensionHeaders and ordering of DimensionHeaders matches the dimensions present in rows.                                                                                                                                                                                                                                                                                          |
| `metricHeaders[]`    | `object (AccessMetricHeader)` The header for a column in the report that corresponds to a specific metric. The number of MetricHeaders and ordering of MetricHeaders matches the metrics present in rows.                                                                                                                                                                                                                                                                                                         |
| `rows[]`             | `object (AccessRow)` Rows of dimension value combinations and metric values in the report.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `rowCount`           | `integer` The total number of rows in the query result. `rowCount` is independent of the number of rows returned in the response, the `limit` request parameter, and the `offset` request parameter. For example if a query returns 175 rows and includes `limit` of 50 in the API request, the response will contain `rowCount` of 175 but only 50 rows. To learn more about this pagination parameter, see [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination). |
| `quota`              | `object (AccessQuota)` The quota state for this Analytics property including this request. This field doesn't work with account-level requests.                                                                                                                                                                                                                                                                                                                                                                   |

## AccessDimensionHeader

Describes a dimension column in the report. Dimensions requested in a report
produce column entries within rows and DimensionHeaders. However, dimensions
used exclusively within filters or expressions do not produce columns in a
report; correspondingly, those dimensions do not produce headers.

| JSON representation             |
| :------------------------------ |
| `{   "dimensionName": string }` |

| Fields          |                                                         |
| :-------------- | :------------------------------------------------------ |
| `dimensionName` | `string` The dimension's name; for example 'userEmail'. |

## AccessMetricHeader

Describes a metric column in the report. Visible metrics requested in a report
produce column entries within rows and MetricHeaders. However, metrics used
exclusively within filters or expressions do not produce columns in a report;
correspondingly, those metrics do not produce headers.

| JSON representation          |
| :--------------------------- |
| `{   "metricName": string }` |

| Fields       |                                                        |
| :----------- | :----------------------------------------------------- |
| `metricName` | `string` The metric's name; for example 'accessCount'. |

## AccessRow

Access report data for each row.

| JSON representation                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensionValues": [     {       object (AccessDimensionValue)     }   ],   "metricValues": [     {       object (AccessMetricValue)     }   ] }` |

| Fields              |                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `dimensionValues[]` | `object (AccessDimensionValue)` List of dimension values. These values are in the same order as specified in the request. |
| `metricValues[]`    | `object (AccessMetricValue)` List of metric values. These values are in the same order as specified in the request.       |

## AccessDimensionValue

The value of a dimension.

| JSON representation     |
| :---------------------- |
| `{   "value": string }` |

| Fields  |                                                                                                    |
| :------ | :------------------------------------------------------------------------------------------------- |
| `value` | `string` The dimension value. For example, this value may be 'France' for the 'country' dimension. |

## AccessMetricValue

The value of a metric.

| JSON representation     |
| :---------------------- |
| `{   "value": string }` |

| Fields  |                                                                      |
| :------ | :------------------------------------------------------------------- |
| `value` | `string` The measurement value. For example, this value may be '13'. |

## AccessQuota

Current state of all quotas for this Analytics property. If any quota for a
property is exhausted, all requests to that property will return Resource
Exhausted errors.

| JSON representation                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{   "tokensPerDay": {     object (AccessQuotaStatus)   },   "tokensPerHour": {     object (AccessQuotaStatus)   },   "concurrentRequests": {     object (AccessQuotaStatus)   },   "serverErrorsPerProjectPerHour": {     object (AccessQuotaStatus)   },   "tokensPerProjectPerHour": {     object (AccessQuotaStatus)   } }` |

| Fields                          |                                                                                                                                                                                                                                                                                                                                   |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokensPerDay`                  | `object (AccessQuotaStatus)` Properties can use 250,000 tokens per day. Most requests consume fewer than 10 tokens.                                                                                                                                                                                                               |
| `tokensPerHour`                 | `object (AccessQuotaStatus)` Properties can use 50,000 tokens per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas.                                                                                                              |
| `concurrentRequests`            | `object (AccessQuotaStatus)` Properties can use up to 50 concurrent requests.                                                                                                                                                                                                                                                     |
| `serverErrorsPerProjectPerHour` | `object (AccessQuotaStatus)` Properties and cloud project pairs can have up to 50 server errors per hour.                                                                                                                                                                                                                         |
| `tokensPerProjectPerHour`       | `object (AccessQuotaStatus)` Properties can use up to 25% of their tokens per project per hour. This amounts to Analytics 360 Properties can use 12,500 tokens per project per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. |

## AccessQuotaStatus

Current state for a particular quota group.

| JSON representation                                 |
| :-------------------------------------------------- |
| `{   "consumed": integer,   "remaining": integer }` |

| Fields      |                                               |
| :---------- | :-------------------------------------------- |
| `consumed`  | `integer` Quota consumed by this request.     |
| `remaining` | `integer` Quota remaining after this request. |
