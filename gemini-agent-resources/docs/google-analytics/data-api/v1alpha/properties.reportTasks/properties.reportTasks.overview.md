- # REST Resource: properties.reportTasks

- ## Resource: ReportTask

- A specific report task configuration.

| JSON representation                                                                                                                      |
| :--------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "reportDefinition": {     object (ReportDefinition)   },   "reportMetadata": {     object (ReportMetadata)   } }` |

-

| Fields             |                                                                                                                                                                                                                                                                                         |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`             | `string` Output only. Identifier. The report task resource name assigned during creation. Format: "properties/{property}/reportTasks/{reportTask}"                                                                                                                                      |
| `reportDefinition` | `object (ReportDefinition)` Optional. A report definition to fetch report data, which describes the structure of a report. It typically includes the fields that will be included in the report and the criteria that will be used to filter the data.                                  |
| `reportMetadata`   | `object (ReportMetadata)` Output only. The report metadata for a specific report task, which provides information about a report. It typically includes the following information: the resource name of the report, the state of the report, the timestamp the report was created, etc, |

- ## ReportDefinition

- The definition of how a report should be run.

| JSON representation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensions": [     {       object (Dimension)     }   ],   "metrics": [     {       object (Metric)     }   ],   "dateRanges": [     {       object (DateRange)     }   ],   "dimensionFilter": {     object (FilterExpression)   },   "metricFilter": {     object (FilterExpression)   },   "offset": string,   "limit": string,   "metricAggregations": [     enum (MetricAggregation)   ],   "orderBys": [     {       object (OrderBy)     }   ],   "currencyCode": string,   "cohortSpec": {     object (CohortSpec)   },   "keepEmptyRows": boolean,   "samplingLevel": enum (SamplingLevel) }` |

-

| Fields                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensions[]`         | `object (Dimension)` Optional. The dimensions requested and displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `metrics[]`            | `object (Metric)` Optional. The metrics requested and displayed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `dateRanges[]`         | `object (DateRange)` Optional. Date ranges of data to read. If multiple date ranges are requested, each response row will contain a zero based date range index. If two date ranges overlap, the event data for the overlapping days is included in the response rows for both date ranges. In a cohort request, this `dateRanges` must be unspecified.                                                                                                                                                                                                                                                        |
| `dimensionFilter`      | `object (FilterExpression)` Optional. Dimension filters let you ask for only specific dimension values in the report. To learn more, see [Fundamentals of Dimension Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters) for examples. Metrics cannot be used in this filter.                                                                                                                                                                                                                                                                                |
| `metricFilter`         | `object (FilterExpression)` Optional. The filter clause of metrics. Applied after aggregating the report's rows, similar to SQL having-clause. Dimensions cannot be used in this filter.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `offset`               | `string (int64 format)` Optional. The row count of the start row from Google Analytics Storage. The first row is counted as row 0\. When creating a report task, the `offset` and `limit` parameters define the subset of data rows from Google Analytics storage to be included in the generated report. For example, if there are a total of 300,000 rows in Google Analytics storage, the initial report task may have the first 10,000 rows with a limit of 10,000 and an offset of 0\. Subsequently, another report task could cover the next 10,000 rows with a limit of 10,000 and an offset of 10,000. |
| `limit`                | `string (int64 format)` Optional. The number of rows to return in the Report. If unspecified, 10,000 rows are returned. The API returns a maximum of 250,000 rows per request, no matter how many you ask for. `limit` must be positive. The API can also return fewer rows than the requested `limit`, if there aren't as many dimension values as the `limit`. For instance, there are fewer than 300 possible values for the dimension `country`, so when reporting on only `country`, you can't get more than 300 rows, even if you set `limit` to a higher value.                                         |
| `metricAggregations[]` | `enum (MetricAggregation)` Optional. Aggregation of metrics. Aggregated metric values will be shown in rows where the dimensionValues are set to "RESERVED\_(MetricAggregation)".                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `orderBys[]`           | `object (OrderBy)` Optional. Specifies how rows are ordered in the response.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `currencyCode`         | `string` Optional. A currency code in ISO4217 format, such as "AED", "USD", "JPY". If the field is empty, the report uses the property's default currency.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `cohortSpec`           | `object (CohortSpec)` Optional. Cohort group associated with this request. If there is a cohort group in the request the 'cohort' dimension must be present.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `keepEmptyRows`        | `boolean` Optional. If false or unspecified, each row with all metrics equal to 0 will not be returned. If true, these rows will be returned if they are not separately removed by a filter. Regardless of this `keepEmptyRows` setting, only data recorded by the Google Analytics property can be displayed in a report. For example if a property never logs a `purchase` event, then a query for the `eventName` dimension and `eventCount` metric will not have a row containing eventName: "purchase" and eventCount: 0\.                                                                                |
| `samplingLevel`        | `enum (SamplingLevel)` Optional. The report's sampling level.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

- ## Dimension

- Dimensions are attributes of your data. For example, the dimension city
  indicates the city from which an event originates. Dimension values in report
  responses are strings; for example, the city could be "Paris" or "New York".

| JSON representation                                                                     |
| :-------------------------------------------------------------------------------------- |
| `{   "name": string,   "dimensionExpression": {     object (DimensionExpression)   } }` |

-

| Fields                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `string` The name of the dimension. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions) for the list of dimension names supported by core reporting methods such as `runReport` and `batchRunReports`. See [Realtime Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema#dimensions) for the list of dimension names supported by the `runRealtimeReport` method. See [Funnel Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/exploration-api-schema#dimensions) for the list of dimension names supported by the `runFunnelReport` method. If `dimensionExpression` is specified, `name` can be any string that you would like within the allowed character set. For example if a `dimensionExpression` concatenates `country` and `city`, you could call that dimension `countryAndCity`. Dimension names that you choose must match the regular expression `^[a-zA-Z0-9_]$`. Dimensions are referenced by `name` in `dimensionFilter`, `orderBys`, `dimensionExpression`, and `pivots`. |
| `dimensionExpression` | `object (DimensionExpression)` One dimension can be the result of an expression of multiple dimensions. For example, dimension "country, city": concatenate(country, ", ", city).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

- ## DimensionExpression

- Used to express a dimension which is the result of a formula of multiple
  dimensions. Example usages: 1\) lowerCase(dimension) 2\)
  concatenate(dimension1, symbol, dimension2).

| JSON representation                                                                                                                                                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_expression can be only one of the following:   "lowerCase": {     object (CaseExpression)   },   "upperCase": {     object (CaseExpression)   },   "concatenate": {     object (ConcatenateExpression)   }   // End of list of possible types for union field one_expression. }` |

-

| Fields                                                                                                                                               |                                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Union field `one_expression`. Specify one type of dimension expression for `DimensionExpression`. `one_expression` can be only one of the following: |                                                                                                                                                                    |
| `lowerCase`                                                                                                                                          | `object (CaseExpression)` Used to convert a dimension value to lower case.                                                                                         |
| `upperCase`                                                                                                                                          | `object (CaseExpression)` Used to convert a dimension value to upper case.                                                                                         |
| `concatenate`                                                                                                                                        | `object (ConcatenateExpression)` Used to combine dimension values to a single dimension. For example, dimension "country, city": concatenate(country, ", ", city). |

- ## CaseExpression

- Used to convert a dimension value to a single case.

| JSON representation             |
| :------------------------------ |
| `{   "dimensionName": string }` |

-

| Fields          |                                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------------- |
| `dimensionName` | `string` Name of a dimension. The name must refer back to a name in dimensions field of the request. |

- ## ConcatenateExpression

- Used to combine dimension values to a single dimension.

| JSON representation                                               |
| :---------------------------------------------------------------- |
| `{   "dimensionNames": [     string   ],   "delimiter": string }` |

-

| Fields             |                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionNames[]` | `string` Names of dimensions. The names must refer back to names in the dimensions field of the request. |
| `delimiter`        | `string` The delimiter placed between dimension names. Delimiters are often single characters such as "  | " or "," but can be longer strings. If a dimension value contains the delimiter, both will be present in response with no distinction. For example if dimension 1 value \= "US,FR", dimension 2 value \= "JP", and delimiter \= ",", then the response will contain "US,FR,JP". |

- ## Metric

- The quantitative measurements of a report. For example, the metric
  `eventCount` is the total number of events. Requests are allowed up to 10
  metrics.

| JSON representation                                                    |
| :--------------------------------------------------------------------- |
| `{   "name": string,   "expression": string,   "invisible": boolean }` |

-

| Fields       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | `string` The name of the metric. See the [API Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#metrics) for the list of metric names supported by core reporting methods such as `runReport` and `batchRunReports`. See [Realtime Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema#metrics) for the list of metric names supported by the `runRealtimeReport` method. See [Funnel Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/exploration-api-schema#metrics) for the list of metric names supported by the `runFunnelReport` method. If `expression` is specified, `name` can be any string that you would like within the allowed character set. For example if `expression` is `screenPageViews/sessions`, you could call that metric's name \= `viewsPerSession`. Metric names that you choose must match the regular expression `^[a-zA-Z0-9_]$`. Metrics are referenced by `name` in `metricFilter`, `orderBys`, and metric `expression`. |
| `expression` | `string` A mathematical expression for derived metrics. For example, the metric Event count per user is `eventCount/totalUsers`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `invisible`  | `boolean` Indicates if a metric is invisible in the report response. If a metric is invisible, the metric will not produce a column in the response, but can be used in `metricFilter`, `orderBys`, or a metric `expression`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

- ## DateRange

- A contiguous set of days: `startDate`, `startDate + 1`, ..., `endDate`.
  Requests are allowed up to 4 date ranges.

| JSON representation                                                |
| :----------------------------------------------------------------- |
| `{   "startDate": string,   "endDate": string,   "name": string }` |

-

| Fields      |                                                                                                                                                                                                                                                                                             |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `startDate` | `string` The inclusive start date for the query in the format `YYYY-MM-DD`. Cannot be after `endDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the property's reporting time zone.                                 |
| `endDate`   | `string` The inclusive end date for the query in the format `YYYY-MM-DD`. Cannot be before `startDate`. The format `NdaysAgo`, `yesterday`, or `today` is also accepted, and in that case, the date is inferred based on the property's reporting time zone.                                |
| `name`      | `string` Assigns a name to this date range. The dimension `dateRange` is valued to this name in a report response. If set, cannot begin with `date_range_` or `RESERVED_`. If not set, date ranges are named by their zero based index in the request: `date_range_0`, `date_range_1`, etc. |

- ## FilterExpression

- To express dimension or metric filters. The fields in the same
  FilterExpression need to be either all dimensions or all metrics.

| JSON representation                                                                                                                                                                                                                                                                                                               |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field expr can be only one of the following:   "andGroup": {     object (FilterExpressionList)   },   "orGroup": {     object (FilterExpressionList)   },   "notExpression": {     object (FilterExpression)   },   "filter": {     object (Filter)   }   // End of list of possible types for union field expr. }` |

-

| Fields                                                                                                                     |                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Union field `expr`. Specify one type of filter expression for `FilterExpression`. `expr` can be only one of the following: |                                                                                                                                                      |
| `andGroup`                                                                                                                 | `object (FilterExpressionList)` The FilterExpressions in andGroup have an AND relationship.                                                          |
| `orGroup`                                                                                                                  | `object (FilterExpressionList)` The FilterExpressions in orGroup have an OR relationship.                                                            |
| `notExpression`                                                                                                            | `object (FilterExpression)` The FilterExpression is NOT of notExpression.                                                                            |
| `filter`                                                                                                                   | `object (Filter)` A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. |

- ## FilterExpressionList

- A list of filter expressions.

| JSON representation                                                      |
| :----------------------------------------------------------------------- |
| `{   "expressions": [     {       object (FilterExpression)     }   ] }` |

-

| Fields          |                                                           |
| :-------------- | :-------------------------------------------------------- |
| `expressions[]` | `object (FilterExpression)` A list of filter expressions. |

- ## Filter

- An expression to filter dimension or metric values.

| JSON representation                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{   "fieldName": string,   // Union field one_filter can be only one of the following:   "stringFilter": {     object (StringFilter)   },   "inListFilter": {     object (InListFilter)   },   "numericFilter": {     object (NumericFilter)   },   "betweenFilter": {     object (BetweenFilter)   },   "emptyFilter": {     object (EmptyFilter)   }   // End of list of possible types for union field one_filter. }` |

-

| Fields                                                                                                            |                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `fieldName`                                                                                                       | `string` The dimension name or metric name. Must be a name defined in dimensions or metrics. |
| Union field `one_filter`. Specify one type of filter for `Filter`. `one_filter` can be only one of the following: |                                                                                              |
| `stringFilter`                                                                                                    | `object (StringFilter)` Strings related filter.                                              |
| `inListFilter`                                                                                                    | `object (InListFilter)` A filter for in list values.                                         |
| `numericFilter`                                                                                                   | `object (NumericFilter)` A filter for numeric or date values.                                |
| `betweenFilter`                                                                                                   | `object (BetweenFilter)` A filter for between two values.                                    |
| `emptyFilter`                                                                                                     | `object (EmptyFilter)` A filter for empty values such as "(not set)" and "" values.          |

- ## StringFilter

- The filter for string

| JSON representation                                                                  |
| :----------------------------------------------------------------------------------- |
| `{   "matchType": enum (MatchType),   "value": string,   "caseSensitive": boolean }` |

-

| Fields          |                                                        |
| :-------------- | :----------------------------------------------------- |
| `matchType`     | `enum (MatchType)` The match type for this filter.     |
| `value`         | `string` The string value used for the matching.       |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

- ## MatchType

- The match type of a string filter

| Enums                    |                                                                 |
| :----------------------- | :-------------------------------------------------------------- |
| `MATCH_TYPE_UNSPECIFIED` | Unspecified                                                     |
| `EXACT`                  | Exact match of the string value.                                |
| `BEGINS_WITH`            | Begins with the string value.                                   |
| `ENDS_WITH`              | Ends with the string value.                                     |
| `CONTAINS`               | Contains the string value.                                      |
| `FULL_REGEXP`            | Full match for the regular expression with the string value.    |
| `PARTIAL_REGEXP`         | Partial match for the regular expression with the string value. |

- ## InListFilter

- The result needs to be in a list of string values.

| JSON representation                                            |
| :------------------------------------------------------------- |
| `{   "values": [     string   ],   "caseSensitive": boolean }` |

-

| Fields          |                                                        |
| :-------------- | :----------------------------------------------------- |
| `values[]`      | `string` The list of string values. Must be non-empty. |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

- ## NumericFilter

- Filters for numeric or date values.

| JSON representation                                                               |
| :-------------------------------------------------------------------------------- |
| `{   "operation": enum (Operation),   "value": {     object (NumericValue)   } }` |

-

| Fields      |                                                          |
| :---------- | :------------------------------------------------------- |
| `operation` | `enum (Operation)` The operation type for this filter.   |
| `value`     | `object (NumericValue)` A numeric value or a date value. |

- ## Operation

- The operation applied to a numeric filter

| Enums                   |                       |
| :---------------------- | :-------------------- |
| `OPERATION_UNSPECIFIED` | Unspecified.          |
| `EQUAL`                 | Equal                 |
| `LESS_THAN`             | Less than             |
| `LESS_THAN_OR_EQUAL`    | Less than or equal    |
| `GREATER_THAN`          | Greater than          |
| `GREATER_THAN_OR_EQUAL` | Greater than or equal |

- ## NumericValue

- To represent a number.

| JSON representation                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_value can be only one of the following:   "int64Value": string,   "doubleValue": number   // End of list of possible types for union field one_value. }` |

-

| Fields                                                                                        |                                       |
| :-------------------------------------------------------------------------------------------- | :------------------------------------ |
| Union field `one_value`. One of a numeric value `one_value` can be only one of the following: |                                       |
| `int64Value`                                                                                  | `string (int64 format)` Integer value |
| `doubleValue`                                                                                 | `number` Double value                 |

- ## BetweenFilter

- To express that the result needs to be between two numbers (inclusive).

| JSON representation                                                                                |
| :------------------------------------------------------------------------------------------------- |
| `{   "fromValue": {     object (NumericValue)   },   "toValue": {     object (NumericValue)   } }` |

-

| Fields      |                                                  |
| :---------- | :----------------------------------------------- |
| `fromValue` | `object (NumericValue)` Begins with this number. |
| `toValue`   | `object (NumericValue)` Ends with this number.   |

- ## EmptyFilter

- This type has no fields.
- Filter for empty values.

- ## MetricAggregation

- Represents aggregation of metrics.

| Enums                            |                       |
| :------------------------------- | :-------------------- |
| `METRIC_AGGREGATION_UNSPECIFIED` | Unspecified operator. |
| `TOTAL`                          | SUM operator.         |
| `MINIMUM`                        | Minimum operator.     |
| `MAXIMUM`                        | Maximum operator.     |
| `COUNT`                          | Count operator.       |

- ## OrderBy

- Order bys define how rows will be sorted in the response. For example,
  ordering rows by descending event count is one ordering, and ordering rows by
  the event name string is a different ordering.

| JSON representation                                                                                                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "desc": boolean,   // Union field one_order_by can be only one of the following:   "metric": {     object (MetricOrderBy)   },   "dimension": {     object (DimensionOrderBy)   }   // End of list of possible types for union field one_order_by.` |

-

| Fields                                                                                                                   |                                                                    |
| :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `desc`                                                                                                                   | `boolean` If true, sorts by descending order.                      |
| Union field `one_order_by`. Specify one type of order by for `OrderBy`. `one_order_by` can be only one of the following: |                                                                    |
| `metric`                                                                                                                 | `object (MetricOrderBy)` Sorts results by a metric's values.       |
| `dimension`                                                                                                              | `object (DimensionOrderBy)` Sorts results by a dimension's values. |

- ## MetricOrderBy

- Sorts by metric values.

| JSON representation          |
| :--------------------------- |
| `{   "metricName": string }` |

-

| Fields       |                                                    |
| :----------- | :------------------------------------------------- |
| `metricName` | `string` A metric name in the request to order by. |

- ## DimensionOrderBy

- Sorts by dimension values.

| JSON representation                                              |
| :--------------------------------------------------------------- |
| `{   "dimensionName": string,   "orderType": enum (OrderType) }` |

-

| Fields          |                                                                    |
| :-------------- | :----------------------------------------------------------------- |
| `dimensionName` | `string` A dimension name in the request to order by.              |
| `orderType`     | `enum (OrderType)` Controls the rule for dimension value ordering. |

- ## OrderType

- Rule to order the string dimension values by.

| Enums                           |                                                                                                                                                                                                                                       |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ORDER_TYPE_UNSPECIFIED`        | Unspecified.                                                                                                                                                                                                                          |
| `ALPHANUMERIC`                  | Alphanumeric sort by Unicode code point. For example, "2" \< "A" \< "X" \< "b" \< "z".                                                                                                                                                |
| `CASE_INSENSITIVE_ALPHANUMERIC` | Case insensitive alphanumeric sort by lower case Unicode code point. For example, "2" \< "A" \< "b" \< "X" \< "z".                                                                                                                    |
| `NUMERIC`                       | Dimension values are converted to numbers before sorting. For example in NUMERIC sort, "25" \< "100", and in `ALPHANUMERIC` sort, "100" \< "25". Non-numeric dimension values all have equal ordering value below all numeric values. |

- ## CohortSpec

- The specification of cohorts for a cohort report.
- Cohort reports create a time series of user retention for the cohort. For
  example, you could select the cohort of users that were acquired in the first
  week of September and follow that cohort for the next six weeks. Selecting the
  users acquired in the first week of September cohort is specified in the
  `cohort` object. Following that cohort for the next six weeks is specified in
  the `cohortsRange` object.
- For examples, see
  [Cohort Report Examples](https://developers.google.com/analytics/devguides/reporting/data/v1/advanced#cohort_report_examples).
- The report response could show a weekly time series where say your app has
  retained 60% of this cohort after three weeks and 25% of this cohort after six
  weeks. These two percentages can be calculated by the metric
  `cohortActiveUsers/cohortTotalUsers` and will be separate rows in the report.

| JSON representation                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "cohorts": [     {       object (Cohort)     }   ],   "cohortsRange": {     object (CohortsRange)   },   "cohortReportSettings": {     object (CohortReportSettings)   } }` |

-

| Fields                 |                                                                                                                                                                                                                              |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cohorts[]`            | `object (Cohort)` Defines the selection criteria to group users into cohorts. Most cohort reports define only a single cohort. If multiple cohorts are specified, each cohort can be recognized in the report by their name. |
| `cohortsRange`         | `object (CohortsRange)` Cohort reports follow cohorts over an extended reporting date range. This range specifies an offset duration to follow the cohorts over.                                                             |
| `cohortReportSettings` | `object (CohortReportSettings)` Optional settings for a cohort report.                                                                                                                                                       |

- ## Cohort

- Defines a cohort selection criteria. A cohort is a group of users who share a
  common characteristic. For example, users with the same `firstSessionDate`
  belong to the same cohort.

| JSON representation                                                                        |
| :----------------------------------------------------------------------------------------- |
| `{   "name": string,   "dimension": string,   "dateRange": {     object (DateRange)   } }` |

-

| Fields      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | `string` Assigns a name to this cohort. The dimension `cohort` is valued to this name in a report response. If set, cannot begin with `cohort_` or `RESERVED_`. If not set, cohorts are named by their zero based index `cohort_0`, `cohort_1`, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `dimension` | `string` Dimension used by the cohort. Required and only supports `firstSessionDate`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `dateRange` | `object (DateRange)` The cohort selects users whose first touch date is between start date and end date defined in the `dateRange`. This `dateRange` does not specify the full date range of event data that is present in a cohort report. In a cohort report, this `dateRange` is extended by the granularity and offset present in the `cohortsRange`; event data for the extended reporting date range is present in a cohort report. In a cohort request, this `dateRange` is required and the `dateRanges` in the `RunReportRequest` or `RunPivotReportRequest` must be unspecified. This `dateRange` should generally be aligned with the cohort's granularity. If `CohortsRange` uses daily granularity, this `dateRange` can be a single day. If `CohortsRange` uses weekly granularity, this `dateRange` can be aligned to a week boundary, starting at Sunday and ending Saturday. If `CohortsRange` uses monthly granularity, this `dateRange` can be aligned to a month, starting at the first and ending on the last day of the month. |

- ## CohortsRange

- Configures the extended reporting date range for a cohort report. Specifies an
  offset duration to follow the cohorts over.

| JSON representation                                                                         |
| :------------------------------------------------------------------------------------------ |
| `{   "granularity": enum (Granularity),   "startOffset": integer,   "endOffset": integer }` |

-

| Fields        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `granularity` | `enum (Granularity)` Required. The granularity used to interpret the `startOffset` and `endOffset` for the extended reporting date range for a cohort report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `startOffset` | `integer startOffset` specifies the start date of the extended reporting date range for a cohort report. `startOffset` is commonly set to 0 so that reports contain data from the acquisition of the cohort forward. If `granularity` is `DAILY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset` days. If `granularity` is `WEEKLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 7` days. If `granularity` is `MONTHLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 30` days.                                            |
| `endOffset`   | `integer` Required. `endOffset` specifies the end date of the extended reporting date range for a cohort report. `endOffset` can be any positive integer but is commonly set to 5 to 10 so that reports contain data on the cohort for the next several granularity time periods. If `granularity` is `DAILY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset` days. If `granularity` is `WEEKLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 7` days. If `granularity` is `MONTHLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 30` days. |

- ## Granularity

- The granularity used to interpret the `startOffset` and `endOffset` for the
  extended reporting date range for a cohort report.

| Enums                     |                                                                                                                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GRANULARITY_UNSPECIFIED` | Should never be specified.                                                                                                                                                |
| `DAILY`                   | Daily granularity. Commonly used if the cohort's `dateRange` is a single day and the request contains `cohortNthDay`.                                                     |
| `WEEKLY`                  | Weekly granularity. Commonly used if the cohort's `dateRange` is a week in duration (starting on Sunday and ending on Saturday) and the request contains `cohortNthWeek`. |
| `MONTHLY`                 | Monthly granularity. Commonly used if the cohort's `dateRange` is a month in duration and the request contains `cohortNthMonth`.                                          |

- ## CohortReportSettings

- Optional settings of a cohort report.

| JSON representation           |
| :---------------------------- |
| `{   "accumulate": boolean }` |

-

| Fields       |                                                                                                                     |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |
| `accumulate` | `boolean` If true, accumulates the result from first touch day to the end day. Not supported in `RunReportRequest`. |

- ## SamplingLevel

- Categories of sampling levels for the requests.

| Enums                        |                                                                                                                                                                                                                                                                                               |
| :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SAMPLING_LEVEL_UNSPECIFIED` | Unspecified type.                                                                                                                                                                                                                                                                             |
| `LOW`                        | Applies a sampling level of 10 million to standard properties and 100 million to Google Analytics 360 properties.                                                                                                                                                                             |
| `MEDIUM`                     | Exclusive to Google Analytics 360 properties with a sampling level of 1 billion.                                                                                                                                                                                                              |
| `UNSAMPLED`                  | Exclusive to Google Analytics 360 properties. Unsampled explorations are more accurate and can reveal insights that aren't visible in standard explorations. To learn more, see [https://support.google.com/analytics/answer/10896953](https://support.google.com/analytics/answer/10896953). |

- ## ReportMetadata

- The report metadata for a specific report task.

| JSON representation                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "creationQuotaTokensCharged": integer,   "state": enum (State),   "beginCreatingTime": string,   "taskRowCount": integer,   "errorMessage": string,   "totalRowCount": integer }` |

-

| Fields                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `creationQuotaTokensCharged` | `integer` Output only. The total quota tokens charged during creation of the report. Because this token count is based on activity from the `CREATING` state, this tokens charge will be fixed once a report task enters the `ACTIVE` or `FAILED` state.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `state`                      | `enum (State)` Output only. The current state for this report task.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `beginCreatingTime`          | `string (Timestamp format)` Output only. The time when `reportTasks.create` was called and the report began the `CREATING` state. A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `taskRowCount`               | `integer` Output only. The total number of rows in the report result. This field will be populated when the state is active. You can utilize `taskRowCount` for pagination within the confines of their existing report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `errorMessage`               | `string` Output only. Error message is populated if a report task fails during creation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `totalRowCount`              | `integer` Output only. The total number of rows in Google Analytics storage. If you want to query additional data rows beyond the current report, they can initiate a new report task based on the `totalRowCount`. The `taskRowCount` represents the number of rows specifically pertaining to the current report, whereas `totalRowCount` encompasses the total count of rows across all data retrieved from Google Analytics storage. For example, suppose the current report's `taskRowCount` is 20, displaying the data from the first 20 rows. Simultaneously, the `totalRowCount` is 30, indicating the presence of data for all 30 rows. The `taskRowCount` can be utilizated to paginate through the initial 20 rows. To expand the report and include data from all 30 rows, a new report task can be created using the totalRowCount to access the full set of 30 rows' worth of data. |

- ## State

- The processing state.

| Enums               |                                                                                                                                |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------- |
| `STATE_UNSPECIFIED` | Unspecified state will never be used.                                                                                          |
| `CREATING`          | The report is currently creating and will be available in the future. Creating occurs immediately after the CreateReport call. |
| `ACTIVE`            | The report is fully created and ready for querying.                                                                            |
| `FAILED`            | The report failed to be created.                                                                                               |

-

| Methods                                                                                                                    |                                                    |
| :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| [`create`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/create) | Initiates the creation of a report task.           |
| [`get`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/get)       | Gets report metadata about a specific report task. |
| [`list`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/list)     | Lists all report tasks for a property.             |
| [`query`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1alpha/properties.reportTasks/query)   | Retrieves a report task's content.                 |

-
