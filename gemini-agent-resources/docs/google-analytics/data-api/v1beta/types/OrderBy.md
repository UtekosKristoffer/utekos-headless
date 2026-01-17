# OrderBy

Order bys define how rows will be sorted in the response. For example, ordering
rows by descending event count is one ordering, and ordering rows by the event
name string is a different ordering.

| JSON representation                                                                                                                                                                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "desc": boolean,   // Union field one_order_by can be only one of the following:   "metric": {     object (MetricOrderBy)   },   "dimension": {     object (DimensionOrderBy)   },   "pivot": {     object (PivotOrderBy)   }   // End of list of possible types for union field one_order_by. }` |

| Fields                                                                                                                   |                                                                                         |
| :----------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `desc`                                                                                                                   | `boolean` If true, sorts by descending order.                                           |
| Union field `one_order_by`. Specify one type of order by for `OrderBy`. `one_order_by` can be only one of the following: |                                                                                         |
| `metric`                                                                                                                 | `object (MetricOrderBy)` Sorts results by a metric's values.                            |
| `dimension`                                                                                                              | `object (DimensionOrderBy)` Sorts results by a dimension's values.                      |
| `pivot`                                                                                                                  | `object (PivotOrderBy)` Sorts results by a metric's values within a pivot column group. |

## MetricOrderBy

Sorts by metric values.

| JSON representation          |
| :--------------------------- |
| `{   "metricName": string }` |

| Fields       |                                                    |
| :----------- | :------------------------------------------------- |
| `metricName` | `string` A metric name in the request to order by. |

## DimensionOrderBy

Sorts by dimension values.

| JSON representation                                              |
| :--------------------------------------------------------------- |
| `{   "dimensionName": string,   "orderType": enum (OrderType) }` |

| Fields          |                                                                    |
| :-------------- | :----------------------------------------------------------------- |
| `dimensionName` | `string` A dimension name in the request to order by.              |
| `orderType`     | `enum (OrderType)` Controls the rule for dimension value ordering. |

## OrderType

Rule to order the string dimension values by.

| Enums                           |                                                                                                                                                                                                                                       |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ORDER_TYPE_UNSPECIFIED`        | Unspecified.                                                                                                                                                                                                                          |
| `ALPHANUMERIC`                  | Alphanumeric sort by Unicode code point. For example, "2" \< "A" \< "X" \< "b" \< "z".                                                                                                                                                |
| `CASE_INSENSITIVE_ALPHANUMERIC` | Case insensitive alphanumeric sort by lower case Unicode code point. For example, "2" \< "A" \< "b" \< "X" \< "z".                                                                                                                    |
| `NUMERIC`                       | Dimension values are converted to numbers before sorting. For example in NUMERIC sort, "25" \< "100", and in `ALPHANUMERIC` sort, "100" \< "25". Non-numeric dimension values all have equal ordering value below all numeric values. |

## PivotOrderBy

Sorts by a pivot column group.

| JSON representation                                                                                |
| :------------------------------------------------------------------------------------------------- |
| `{   "metricName": string,   "pivotSelections": [     {       object (PivotSelection)     }   ] }` |

| Fields              |                                                                                                                                                                                                                                                    |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metricName`        | `string` In the response to order by, order rows by this column. Must be a metric name from the request.                                                                                                                                           |
| `pivotSelections[]` | `object (PivotSelection)` Used to select a dimension name and value pivot. If multiple pivot selections are given, the sort occurs on rows where all pivot selection dimension name and value pairs match the row's dimension name and value pair. |

## PivotSelection

A pair of dimension names and values. Rows with this dimension pivot pair are
ordered by the metric's value.

For example if pivots \= ('browser', 'Chrome') and metricName \= "Sessions",
then the rows will be sorted based on Sessions in Chrome.

```
---------|----------|----------------|----------|----------------
         |  Chrome  |    Chrome      |  Safari  |     Safari
---------|----------|----------------|----------|----------------
 Country | Sessions | Pages/Sessions | Sessions | Pages/Sessions
---------|----------|----------------|----------|----------------
    US   |    2     |       2        |     3    |        1
---------|----------|----------------|----------|----------------
  Canada |    3     |       1        |     4    |        1
---------|----------|----------------|----------|----------------
```

| JSON representation                                         |
| :---------------------------------------------------------- |
| `{   "dimensionName": string,   "dimensionValue": string }` |

| Fields           |                                                                |
| :--------------- | :------------------------------------------------------------- |
| `dimensionName`  | `string` Must be a dimension name from the request.            |
| `dimensionValue` | `string` Order by only when the named dimension is this value. |

Was this helpful?
