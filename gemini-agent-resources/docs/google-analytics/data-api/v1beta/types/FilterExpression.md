# FilterExpression

To express dimension or metric filters. The fields in the same FilterExpression need to be either all dimensions or all metrics.

| JSON representation |
| :---- |
| `{   // Union field expr can be only one of the following:   "andGroup": {     object (FilterExpressionList)   },   "orGroup": {     object (FilterExpressionList)   },   "notExpression": {     object (FilterExpression)   },   "filter": {     object (Filter)   }   // End of list of possible types for union field expr. }` |

| Fields |  |
| :---- | :---- |
| Union field `expr`. Specify one type of filter expression for `FilterExpression`. `expr` can be only one of the following: |  |
| `andGroup` | `object (FilterExpressionList)` The FilterExpressions in andGroup have an AND relationship. |
| `orGroup` | `object (FilterExpressionList)` The FilterExpressions in orGroup have an OR relationship. |
| `notExpression` | `object (FilterExpression)` The FilterExpression is NOT of notExpression. |
| `filter` | `object (Filter)` A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. |

## FilterExpressionList

A list of filter expressions.

| JSON representation |
| :---- |
| `{   "expressions": [     {       object (FilterExpression)     }   ] }` |

| Fields |  |
| :---- | :---- |
| `expressions[]` | `object (FilterExpression)` A list of filter expressions. |

## Filter

An expression to filter dimension or metric values.

| JSON representation |
| :---- |
| `{   "fieldName": string,   // Union field one_filter can be only one of the following:   "stringFilter": {     object (StringFilter)   },   "inListFilter": {     object (InListFilter)   },   "numericFilter": {     object (NumericFilter)   },   "betweenFilter": {     object (BetweenFilter)   },   "emptyFilter": {     object (EmptyFilter)   }   // End of list of possible types for union field one_filter. }` |

| Fields |  |
| :---- | :---- |
| `fieldName` | `string` The dimension name or metric name. In most methods, dimensions & metrics can be used for the first time in this field. However in a RunPivotReportRequest, this field must be additionally specified by name in the RunPivotReportRequest's dimensions or metrics. |
| Union field `one_filter`. Specify one type of filter for `Filter`. `one_filter` can be only one of the following: |  |
| `stringFilter` | `object (StringFilter)` Strings related filter. |
| `inListFilter` | `object (InListFilter)` A filter for in list values. |
| `numericFilter` | `object (NumericFilter)` A filter for numeric or date values. |
| `betweenFilter` | `object (BetweenFilter)` A filter for two values. |
| `emptyFilter` | `object (EmptyFilter)` A filter for empty values such as "(not set)" and "" values. |

## StringFilter

The filter for string

| JSON representation |
| :---- |
| `{   "matchType": enum (MatchType),   "value": string,   "caseSensitive": boolean }` |

| Fields |  |
| :---- | :---- |
| `matchType` | `enum (MatchType)` The match type for this filter. |
| `value` | `string` The string value used for the matching. |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

## MatchType

The match type of a string filter

| Enums |  |
| :---- | :---- |
| `MATCH_TYPE_UNSPECIFIED` | Unspecified |
| `EXACT` | Exact match of the string value. |
| `BEGINS_WITH` | Begins with the string value. |
| `ENDS_WITH` | Ends with the string value. |
| `CONTAINS` | Contains the string value. |
| `FULL_REGEXP` | Full match for the regular expression with the string value. |
| `PARTIAL_REGEXP` | Partial match for the regular expression with the string value. |

## InListFilter

The result needs to be in a list of string values.

| JSON representation |
| :---- |
| `{   "values": [     string   ],   "caseSensitive": boolean }` |

| Fields |  |
| :---- | :---- |
| `values[]` | `string` The list of string values. Must be non-empty. |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

## NumericFilter

Filters for numeric or date values.

| JSON representation |
| :---- |
| `{   "operation": enum (Operation),   "value": {     object (NumericValue)   } }` |

| Fields |  |
| :---- | :---- |
| `operation` | `enum (Operation)` The operation type for this filter. |
| `value` | `object (NumericValue)` A numeric value or a date value. |

## Operation

The operation applied to a numeric filter

| Enums |  |
| :---- | :---- |
| `OPERATION_UNSPECIFIED` | Unspecified. |
| `EQUAL` | Equal |
| `LESS_THAN` | Less than |
| `LESS_THAN_OR_EQUAL` | Less than or equal |
| `GREATER_THAN` | Greater than |
| `GREATER_THAN_OR_EQUAL` | Greater than or equal |

## NumericValue

To represent a number.

| JSON representation |
| :---- |
| `{   // Union field one_value can be only one of the following:   "int64Value": string,   "doubleValue": number   // End of list of possible types for union field one_value. }` |

| Fields |  |
| :---- | :---- |
| Union field `one_value`. One of a numeric value `one_value` can be only one of the following: |  |
| `int64Value` | `string (int64 format)` Integer value |
| `doubleValue` | `number` Double value |

## BetweenFilter

To express that the result needs to be between two numbers (inclusive).

| JSON representation |
| :---- |
| `{   "fromValue": {     object (NumericValue)   },   "toValue": {     object (NumericValue)   } }` |

| Fields |  |
| :---- | :---- |
| `fromValue` | `object (NumericValue)` Begins with this number. |
| `toValue` | `object (NumericValue)` Ends with this number. |

## EmptyFilter

This type has no fields.

Filter for empty values.
