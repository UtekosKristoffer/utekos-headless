# Row

Report data for each row. For example if RunReportRequest contains:

```
"dimensions": [
  {
    "name": "eventName"
  },
  {
    "name": "countryId"
  }
],
"metrics": [
  {
    "name": "eventCount"
  }
]
```

One row with 'in_app_purchase' as the eventName, 'JP' as the countryId, and 15
as the eventCount, would be:

```
"dimensionValues": [
  {
    "value": "in_app_purchase"
  },
  {
    "value": "JP"
  }
],
"metricValues": [
  {
    "value": "15"
  }
]
```

| JSON representation                                                                                                                        |
| :----------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dimensionValues": [     {       object (DimensionValue)     }   ],   "metricValues": [     {       object (MetricValue)     }   ] }` |

| Fields              |                                                                                                                                                     |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionValues[]` | `object (DimensionValue)` List of requested dimension values. In a PivotReport, dimensionValues are only listed for dimensions included in a pivot. |
| `metricValues[]`    | `object (MetricValue)` List of requested visible metric values.                                                                                     |

## DimensionValue

The value of a dimension.

| JSON representation                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_value can be only one of the following:   "value": string   // End of list of possible types for union field one_value. }` |

| Fields                                                                                             |                                                               |
| :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| Union field `one_value`. One kind of dimension value `one_value` can be only one of the following: |                                                               |
| `value`                                                                                            | `string` Value as a string if the dimension type is a string. |

## MetricValue

The value of a metric.

| JSON representation                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   // Union field one_value can be only one of the following:   "value": string   // End of list of possible types for union field one_value. }` |

| Fields                                                                                     |                                                        |
| :----------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| Union field `one_value`. One of metric value `one_value` can be only one of the following: |                                                        |
| `value`                                                                                    | `string` Measurement value. See MetricHeader for type. |
