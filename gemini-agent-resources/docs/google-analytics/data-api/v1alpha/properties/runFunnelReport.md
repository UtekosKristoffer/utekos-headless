# Method: properties.runFunnelReport


Returns a customized funnel report of your Google Analytics event data. The data returned from the API is as a table with columns for the requested dimensions and metrics.

Funnel exploration lets you visualize the steps your users take to complete a task and quickly see how well they are succeeding or failing at each step. For example, how do prospects become shoppers and then become buyers? How do one time buyers become repeat buyers? With this information, you can improve inefficient or abandoned customer journeys. To learn more, see [GA4 Funnel Explorations](https://support.google.com/analytics/answer/9327974).

This method is introduced at alpha stability with the intention of gathering feedback on syntax and capabilities before entering beta. To give your feedback on this API, complete the [Google Analytics Data API Funnel Reporting Feedback](https://docs.google.com/forms/d/e/1FAIpQLSdwOlQDJAUoBiIgUZZ3S_Lwi8gr7Bb0k1jhvc-DEg7Rol3UjA/viewform).

### HTTP request

`POST https://analyticsdata.googleapis.com/v1alpha/{property=properties/*}:runFunnelReport`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |  |
| :---- | :---- |
| `property` | `string` Optional. A Google Analytics property identifier whose events are tracked. Specified in the URL path and not the body. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Within a batch request, this property should either be unspecified or consistent with the batch-level property. Example: properties/1234 |

### Request body

The request body contains data with the following structure:

| JSON representation |
| :---- |
| `{   "dateRanges": [     {       object (DateRange)     }   ],   "funnel": {     object (Funnel)   },   "funnelBreakdown": {     object (FunnelBreakdown)   },   "funnelNextAction": {     object (FunnelNextAction)   },   "funnelVisualizationType": enum (FunnelVisualizationType),   "segments": [     {       object (Segment)     }   ],   "limit": string,   "dimensionFilter": {     object (FilterExpression)   },   "returnPropertyQuota": boolean }` |

| Fields |  |
| :---- | :---- |
| `dateRanges[]` | `object (DateRange)` Optional. Date ranges of data to read. If multiple date ranges are requested, each response row will contain a zero based date range index. If two date ranges overlap, the event data for the overlapping days is included in the response rows for both date ranges. |
| `funnel` | `object (Funnel)` Optional. The configuration of this request's funnel. This funnel configuration is required. |
| `funnelBreakdown` | `object (FunnelBreakdown)` Optional. If specified, this breakdown adds a dimension to the funnel table sub report response. This breakdown dimension expands each funnel step to the unique values of the breakdown dimension. For example, a breakdown by the `deviceCategory` dimension will create rows for `mobile`, `tablet`, `desktop`, and the total. |
| `funnelNextAction` | `object (FunnelNextAction)` Optional. If specified, next action adds a dimension to the funnel visualization sub report response. This next action dimension expands each funnel step to the unique values of the next action. For example a next action of the `eventName` dimension will create rows for several events (for example `session_start` & `click`) and the total. Next action only supports `eventName` and most Page / Screen dimensions like `pageTitle` and `pagePath`. |
| `funnelVisualizationType` | `enum (FunnelVisualizationType)` Optional. The funnel visualization type controls the dimensions present in the funnel visualization sub report response. If not specified, `STANDARD_FUNNEL` is used. |
| `segments[]` | `object (Segment)` Optional. The configurations of segments. Segments are subsets of a property's data. In a funnel report with segments, the funnel is evaluated in each segment. Each segment specified in this request produces a separate row in the response; in the response, each segment identified by its name. The segments parameter is optional. Requests are limited to 4 segments. |
| `limit` | `string (int64 format)` Optional. The number of rows to return. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. |
| `dimensionFilter` | `object (FilterExpression)` Optional. Dimension filters allow you to ask for only specific dimension values in the report. To learn more, see [Creating a Report: Dimension Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters) for examples. Metrics cannot be used in this filter. |
| `returnPropertyQuota` | `boolean` Optional. Toggles whether to return the current state of this Analytics Property's quota. Quota is returned in [PropertyQuota](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties/runFunnelReport#PropertyQuota). |

### Response body

The funnel report response contains two sub reports. The two sub reports are different combinations of dimensions and metrics.

If successful, the response body contains data with the following structure:

| JSON representation |
| :---- |
| `{   "funnelTable": {     object (FunnelSubReport)   },   "funnelVisualization": {     object (FunnelSubReport)   },   "propertyQuota": {     object (PropertyQuota)   },   "kind": string }` |

| Fields |  |
| :---- | :---- |
| `funnelTable` | `object (FunnelSubReport)` The funnel table is a report with the funnel step, segment, breakdown dimension, active users, completion rate, abandonments, and abandonments rate. The segment dimension is only present in this response if a segment was requested. The breakdown dimension is only present in this response if it was requested. |
| `funnelVisualization` | `object (FunnelSubReport)` The funnel visualization is a report with the funnel step, segment, date, next action dimension, and active users. The segment dimension is only present in this response if a segment was requested. The date dimension is only present in this response if it was requested through the `TRENDED_FUNNEL` funnel type. The next action dimension is only present in the response if it was requested. |
| `propertyQuota` | `object (PropertyQuota)` This Analytics Property's quota state including this request. |
| `kind` | `string` Identifies what kind of resource this message is. This `kind` is always the fixed string "analyticsData\#runFunnelReport". Useful to distinguish between response types in JSON. |

### Authorization scopes

Requires one of the following OAuth scopes:

* `https://www.googleapis.com/auth/analytics.readonly`  
* `https://www.googleapis.com/auth/analytics`  
* 
