# Comparison

Defines an individual comparison. Most requests will include multiple
comparisons so that the report compares between the comparisons.

| JSON representation                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   // Union field one_comparison can be only one of the following:   "dimensionFilter": {     object (FilterExpression)   },   "comparison": string   // End of list of possible types for union field one_comparison. }` |

| Fields                                                                                                        |                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                        | `string` Each comparison produces separate rows in the response. In the response, this comparison is identified by this name. If name is unspecified, we will use the saved comparisons display name. |
| Union field `one_comparison`. One kind of comparison value `one_comparison` can be only one of the following: |                                                                                                                                                                                                       |
| `dimensionFilter`                                                                                             | `object (FilterExpression)` A basic comparison.                                                                                                                                                       |
| `comparison`                                                                                                  | `string` A saved comparison identified by the comparison's resource name. For example, 'comparisons/1234'.                                                                                            |
