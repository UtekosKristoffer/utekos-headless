# MetricHeader

Describes a metric column in the report. Visible metrics requested in a report
produce column entries within rows and MetricHeaders. However, metrics used
exclusively within filters or expressions do not produce columns in a report;
correspondingly, those metrics do not produce headers.

| JSON representation                                 |
| :-------------------------------------------------- |
| `{   "name": string,   "type": enum (MetricType) }` |

| Fields |                                             |
| :----- | :------------------------------------------ |
| `name` | `string` The metric's name.                 |
| `type` | `enum (MetricType)` The metric's data type. |

## MetricType

A metric's value type.

| Enums                     |                                                                  |
| :------------------------ | :--------------------------------------------------------------- |
| `METRIC_TYPE_UNSPECIFIED` | Unspecified type.                                                |
| `TYPE_INTEGER`            | Integer type.                                                    |
| `TYPE_FLOAT`              | Floating point type.                                             |
| `TYPE_SECONDS`            | A duration of seconds; a special floating point type.            |
| `TYPE_MILLISECONDS`       | A duration in milliseconds; a special floating point type.       |
| `TYPE_MINUTES`            | A duration in minutes; a special floating point type.            |
| `TYPE_HOURS`              | A duration in hours; a special floating point type.              |
| `TYPE_STANDARD`           | A custom metric of standard type; a special floating point type. |
| `TYPE_CURRENCY`           | An amount of money; a special floating point type.               |
| `TYPE_FEET`               | A length in feet; a special floating point type.                 |
| `TYPE_MILES`              | A length in miles; a special floating point type.                |
| `TYPE_METERS`             | A length in meters; a special floating point type.               |
| `TYPE_KILOMETERS`         | A length in kilometers; a special floating point type.           |
