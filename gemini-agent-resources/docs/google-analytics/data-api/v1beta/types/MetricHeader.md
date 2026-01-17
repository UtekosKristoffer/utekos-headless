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
