# Method: properties.checkCompatibility

This compatibility method lists dimensions and metrics that can be added to a
report request and maintain compatibility. This method fails if the request's
dimensions and metrics are incompatible.

In Google Analytics, reports fail if they request incompatible dimensions and/or
metrics; in that case, you will need to remove dimensions and/or metrics from
the incompatible report until the report is compatible.

The Realtime and Core reports have different compatibility rules. This method
checks compatibility for Core reports.

### HTTP request

`POST https://analyticsdata.googleapis.com/v1beta/{property=properties/*}:checkCompatibility`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                                                                                                                                                                              |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `property` | `string` A Google Analytics property identifier whose events are tracked. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). `property` should be the same value as in your `runReport` request. Example: properties/1234 |

### Request body

The request body contains data with the following structure:

| JSON representation                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensions": [     {       object (Dimension)     }   ],   "metrics": [     {       object (Metric)     }   ],   "dimensionFilter": {     object (FilterExpression)   },   "metricFilter": {     object (FilterExpression)   },   "compatibilityFilter": enum (Compatibility) }` |

| Fields                |                                                                                                                                                                                                              |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensions[]`        | `object (Dimension)` The dimensions in this report. `dimensions` should be the same value as in your `runReport` request.                                                                                    |
| `metrics[]`           | `object (Metric)` The metrics in this report. `metrics` should be the same value as in your `runReport` request.                                                                                             |
| `dimensionFilter`     | `object (FilterExpression)` The filter clause of dimensions. `dimensionFilter` should be the same value as in your `runReport` request.                                                                      |
| `metricFilter`        | `object (FilterExpression)` The filter clause of metrics. `metricFilter` should be the same value as in your `runReport` request                                                                             |
| `compatibilityFilter` | `enum (Compatibility)` Filters the dimensions and metrics in the response to just this compatibility. Commonly used as `”compatibilityFilter”: “COMPATIBLE”` to only return compatible dimensions & metrics. |

### Response body

The compatibility response with the compatibility of each dimension & metric.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensionCompatibilities": [     {       object (DimensionCompatibility)     }   ],   "metricCompatibilities": [     {       object (MetricCompatibility)     }   ] }` |

| Fields                       |                                                                        |
| :--------------------------- | :--------------------------------------------------------------------- |
| `dimensionCompatibilities[]` | `object (DimensionCompatibility)` The compatibility of each dimension. |
| `metricCompatibilities[]`    | `object (MetricCompatibility)` The compatibility of each metric.       |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`

## Compatibility

The compatibility types for a single dimension or metric.

| Enums                       |                                                                                                             |
| :-------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `COMPATIBILITY_UNSPECIFIED` | Unspecified compatibility.                                                                                  |
| `COMPATIBLE`                | The dimension or metric is compatible. This dimension or metric can be successfully added to a report.      |
| `INCOMPATIBLE`              | The dimension or metric is incompatible. This dimension or metric cannot be successfully added to a report. |

## DimensionCompatibility

The compatibility for a single dimension.

| JSON representation                                                                                        |
| :--------------------------------------------------------------------------------------------------------- |
| `{   "dimensionMetadata": {     object (DimensionMetadata)   },   "compatibility": enum (Compatibility) }` |

| Fields              |                                                                                                                                                                                                                |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionMetadata` | `object (DimensionMetadata)` The dimension metadata contains the API name for this compatibility information. The dimension metadata also contains other helpful information like the UI name and description. |
| `compatibility`     | `enum (Compatibility)` The compatibility of this dimension. If the compatibility is COMPATIBLE, this dimension can be successfully added to the report.                                                        |

## MetricCompatibility

The compatibility for a single metric.

| JSON representation                                                                                  |
| :--------------------------------------------------------------------------------------------------- |
| `{   "metricMetadata": {     object (MetricMetadata)   },   "compatibility": enum (Compatibility) }` |

| Fields           |                                                                                                                                                                                                       |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metricMetadata` | `object (MetricMetadata)` The metric metadata contains the API name for this compatibility information. The metric metadata also contains other helpful information like the UI name and description. |
| `compatibility`  | `enum (Compatibility)` The compatibility of this metric. If the compatibility is COMPATIBLE, this metric can be successfully added to the report.                                                     |
