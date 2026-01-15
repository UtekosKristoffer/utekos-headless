# AccessOrderBy

Order bys define how rows will be sorted in the response. For example, ordering
rows by descending access count is one ordering, and ordering rows by the
country string is a different ordering.

| JSON representation                                                                                                                                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "desc": boolean,   // Union field one_order_by can be only one of the following:   "metric": {     object (MetricOrderBy)   },   "dimension": {     object (DimensionOrderBy)   }   // End of list of possible types for union field one_order_by. }` |

| Fields                                                                                                                   |                                                                                                  |
| :----------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `desc`                                                                                                                   | `boolean` If true, sorts by descending order. If false or unspecified, sorts in ascending order. |
| Union field `one_order_by`. Specify one type of order by for `OrderBy`. `one_order_by` can be only one of the following: |                                                                                                  |
| `metric`                                                                                                                 | `object (MetricOrderBy)` Sorts results by a metric's values.                                     |
| `dimension`                                                                                                              | `object (DimensionOrderBy)` Sorts results by a dimension's values.                               |

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
