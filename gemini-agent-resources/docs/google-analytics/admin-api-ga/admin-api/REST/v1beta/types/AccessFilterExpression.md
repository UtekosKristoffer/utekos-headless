# AccessFilterExpression

Expresses dimension or metric filters. The fields in the same expression need to
be either all dimensions or all metrics.

| JSON representation                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_expression can be only one of the following:   "andGroup": {     object (AccessFilterExpressionList)   },   "orGroup": {     object (AccessFilterExpressionList)   },   "notExpression": {     object (AccessFilterExpression)   },   "accessFilter": {     object (AccessFilter)   }   // End of list of possible types for union field one_expression. }` |

| Fields                                                                                                                                         |                                                                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Union field `one_expression`. Specify one type of filter expression for `FilterExpression`. `one_expression` can be only one of the following: |                                                                                                                                                            |
| `andGroup`                                                                                                                                     | `object (AccessFilterExpressionList)` Each of the FilterExpressions in the andGroup has an AND relationship.                                               |
| `orGroup`                                                                                                                                      | `object (AccessFilterExpressionList)` Each of the FilterExpressions in the orGroup has an OR relationship.                                                 |
| `notExpression`                                                                                                                                | `object (AccessFilterExpression)` The FilterExpression is NOT of notExpression.                                                                            |
| `accessFilter`                                                                                                                                 | `object (AccessFilter)` A primitive filter. In the same FilterExpression, all of the filter's field names need to be either all dimensions or all metrics. |

## AccessFilterExpressionList

A list of filter expressions.

| JSON representation                                                            |
| :----------------------------------------------------------------------------- |
| `{   "expressions": [     {       object (AccessFilterExpression)     }   ] }` |

| Fields          |                                                                 |
| :-------------- | :-------------------------------------------------------------- |
| `expressions[]` | `object (AccessFilterExpression)` A list of filter expressions. |

## AccessFilter

An expression to filter dimension or metric values.

| JSON representation                                                                                                                                                                                                                                                                                                                                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "fieldName": string,   // Union field one_filter can be only one of the following:   "stringFilter": {     object (AccessStringFilter)   },   "inListFilter": {     object (AccessInListFilter)   },   "numericFilter": {     object (AccessNumericFilter)   },   "betweenFilter": {     object (AccessBetweenFilter)   }   // End of list of possible types for union field one_filter. }` |

| Fields                                                                                                            |                                                                     |
| :---------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `fieldName`                                                                                                       | `string` The dimension name or metric name.                         |
| Union field `one_filter`. Specify one type of filter for `Filter`. `one_filter` can be only one of the following: |                                                                     |
| `stringFilter`                                                                                                    | `object (AccessStringFilter)` Strings related filter.               |
| `inListFilter`                                                                                                    | `object (AccessInListFilter)` A filter for in list values.          |
| `numericFilter`                                                                                                   | `object (AccessNumericFilter)` A filter for numeric or date values. |
| `betweenFilter`                                                                                                   | `object (AccessBetweenFilter)` A filter for two values.             |

## AccessStringFilter

The filter for strings.

| JSON representation                                                                  |
| :----------------------------------------------------------------------------------- |
| `{   "matchType": enum (MatchType),   "value": string,   "caseSensitive": boolean }` |

| Fields          |                                                        |
| :-------------- | :----------------------------------------------------- |
| `matchType`     | `enum (MatchType)` The match type for this filter.     |
| `value`         | `string` The string value used for the matching.       |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

## MatchType

The match type of a string filter.

| Enums                    |                                                                 |
| :----------------------- | :-------------------------------------------------------------- |
| `MATCH_TYPE_UNSPECIFIED` | Unspecified                                                     |
| `EXACT`                  | Exact match of the string value.                                |
| `BEGINS_WITH`            | Begins with the string value.                                   |
| `ENDS_WITH`              | Ends with the string value.                                     |
| `CONTAINS`               | Contains the string value.                                      |
| `FULL_REGEXP`            | Full match for the regular expression with the string value.    |
| `PARTIAL_REGEXP`         | Partial match for the regular expression with the string value. |

## AccessInListFilter

The result needs to be in a list of string values.

| JSON representation                                            |
| :------------------------------------------------------------- |
| `{   "values": [     string   ],   "caseSensitive": boolean }` |

| Fields          |                                                        |
| :-------------- | :----------------------------------------------------- |
| `values[]`      | `string` The list of string values. Must be non-empty. |
| `caseSensitive` | `boolean` If true, the string value is case sensitive. |

## AccessNumericFilter

Filters for numeric or date values.

| JSON representation                                                               |
| :-------------------------------------------------------------------------------- |
| `{   "operation": enum (Operation),   "value": {     object (NumericValue)   } }` |

| Fields      |                                                          |
| :---------- | :------------------------------------------------------- |
| `operation` | `enum (Operation)` The operation type for this filter.   |
| `value`     | `object (NumericValue)` A numeric value or a date value. |

## Operation

The operation applied to a numeric filter.

| Enums                   |                       |
| :---------------------- | :-------------------- |
| `OPERATION_UNSPECIFIED` | Unspecified.          |
| `EQUAL`                 | Equal                 |
| `LESS_THAN`             | Less than             |
| `LESS_THAN_OR_EQUAL`    | Less than or equal    |
| `GREATER_THAN`          | Greater than          |
| `GREATER_THAN_OR_EQUAL` | Greater than or equal |

## NumericValue

To represent a number.

| JSON representation                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_value can be only one of the following:   "int64Value": string,   "doubleValue": number   // End of list of possible types for union field one_value. }` |

| Fields                                                                                        |                                       |
| :-------------------------------------------------------------------------------------------- | :------------------------------------ |
| Union field `one_value`. One of a numeric value `one_value` can be only one of the following: |                                       |
| `int64Value`                                                                                  | `string (int64 format)` Integer value |
| `doubleValue`                                                                                 | `number` Double value                 |

## AccessBetweenFilter

To express that the result needs to be between two numbers (inclusive).

| JSON representation                                                                                |
| :------------------------------------------------------------------------------------------------- |
| `{   "fromValue": {     object (NumericValue)   },   "toValue": {     object (NumericValue)   } }` |

| Fields      |                                                  |
| :---------- | :----------------------------------------------- |
| `fromValue` | `object (NumericValue)` Begins with this number. |
| `toValue`   | `object (NumericValue)` Ends with this number.   |
