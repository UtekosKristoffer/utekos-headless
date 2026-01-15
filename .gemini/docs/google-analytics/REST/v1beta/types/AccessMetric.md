# AccessMetric

The quantitative measurements of a report. For example, the metric `accessCount`
is the total number of data access records.

| JSON representation          |
| :--------------------------- |
| `{   "metricName": string }` |

| Fields       |                                                                                                                                                                                                                                                                  |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metricName` | `string` The API name of the metric. See [Data Access Schema](https://developers.google.com/analytics/devguides/config/admin/v1/access-api-schema) for the list of metrics supported in this API. Metrics are referenced by name in `metricFilter` & `orderBys`. |
