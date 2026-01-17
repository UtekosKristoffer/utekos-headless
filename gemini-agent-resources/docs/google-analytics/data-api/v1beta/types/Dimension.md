# Dimension

Dimensions are attributes of your data. For example, the dimension city
indicates the city from which an event originates. Dimension values in report
responses are strings; for example, the city could be "Paris" or "New York".
Requests are allowed up to 9 dimensions.

| JSON representation                                                                     |
| :-------------------------------------------------------------------------------------- |
| `{   "name": string,   "dimensionExpression": {     object (DimensionExpression)   } }` |

| Fields                |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                | `string` The name of the dimension. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema#dimensions) for the list of dimension names supported by core reporting methods such as `runReport` and `batchRunReports`. See [Realtime Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-api-schema#dimensions) for the list of dimension names supported by the `runRealtimeReport` method. See [Funnel Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/exploration-api-schema#dimensions) for the list of dimension names supported by the `runFunnelReport` method. If `dimensionExpression` is specified, `name` can be any string that you would like within the allowed character set. For example if a `dimensionExpression` concatenates `country` and `city`, you could call that dimension `countryAndCity`. Dimension names that you choose must match the regular expression `^[a-zA-Z0-9_]$`. Dimensions are referenced by `name` in `dimensionFilter`, `orderBys`, `dimensionExpression`, and `pivots`. |
| `dimensionExpression` | `object (DimensionExpression)` One dimension can be the result of an expression of multiple dimensions. For example, dimension "country, city": concatenate(country, ", ", city).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## DimensionExpression

Used to express a dimension which is the result of a formula of multiple
dimensions. Example usages: 1\) lowerCase(dimension) 2\) concatenate(dimension1,
symbol, dimension2).

| JSON representation                                                                                                                                                                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_expression can be only one of the following:   "lowerCase": {     object (CaseExpression)   },   "upperCase": {     object (CaseExpression)   },   "concatenate": {     object (ConcatenateExpression)   }   // End of list of possible types for union field one_expression. }` |

| Fields                                                                                                                                               |                                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Union field `one_expression`. Specify one type of dimension expression for `DimensionExpression`. `one_expression` can be only one of the following: |                                                                                                                                                                    |
| `lowerCase`                                                                                                                                          | `object (CaseExpression)` Used to convert a dimension value to lower case.                                                                                         |
| `upperCase`                                                                                                                                          | `object (CaseExpression)` Used to convert a dimension value to upper case.                                                                                         |
| `concatenate`                                                                                                                                        | `object (ConcatenateExpression)` Used to combine dimension values to a single dimension. For example, dimension "country, city": concatenate(country, ", ", city). |

## CaseExpression

Used to convert a dimension value to a single case.

| JSON representation             |
| :------------------------------ |
| `{   "dimensionName": string }` |

| Fields          |                                                                                                      |
| :-------------- | :--------------------------------------------------------------------------------------------------- |
| `dimensionName` | `string` Name of a dimension. The name must refer back to a name in dimensions field of the request. |

## ConcatenateExpression

Used to combine dimension values to a single dimension.

| JSON representation                                               |
| :---------------------------------------------------------------- |
| `{   "dimensionNames": [     string   ],   "delimiter": string }` |

| Fields             |                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionNames[]` | `string` Names of dimensions. The names must refer back to names in the dimensions field of the request. |
| `delimiter`        | `string` The delimiter placed between dimension names. Delimiters are often single characters such as "  | " or "," but can be longer strings. If a dimension value contains the delimiter, both will be present in response with no distinction. For example if dimension 1 value \= "US,FR", dimension 2 value \= "JP", and delimiter \= ",", then the response will contain "US,FR,JP". |
