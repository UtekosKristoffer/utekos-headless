# CohortSpec

The specification of cohorts for a cohort report.

Cohort reports create a time series of user retention for the cohort. For
example, you could select the cohort of users that were acquired in the first
week of September and follow that cohort for the next six weeks. Selecting the
users acquired in the first week of September cohort is specified in the
`cohort` object. Following that cohort for the next six weeks is specified in
the `cohortsRange` object.

For examples, see
[Cohort Report Examples](https://developers.google.com/analytics/devguides/reporting/data/v1/advanced#cohort_report_examples).

The report response could show a weekly time series where say your app has
retained 60% of this cohort after three weeks and 25% of this cohort after six
weeks. These two percentages can be calculated by the metric
`cohortActiveUsers/cohortTotalUsers` and will be separate rows in the report.

| JSON representation                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "cohorts": [     {       object (Cohort)     }   ],   "cohortsRange": {     object (CohortsRange)   },   "cohortReportSettings": {     object (CohortReportSettings)   } }` |

| Fields                 |                                                                                                                                                                                                                              |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cohorts[]`            | `object (Cohort)` Defines the selection criteria to group users into cohorts. Most cohort reports define only a single cohort. If multiple cohorts are specified, each cohort can be recognized in the report by their name. |
| `cohortsRange`         | `object (CohortsRange)` Cohort reports follow cohorts over an extended reporting date range. This range specifies an offset duration to follow the cohorts over.                                                             |
| `cohortReportSettings` | `object (CohortReportSettings)` Optional settings for a cohort report.                                                                                                                                                       |

## Cohort

Defines a cohort selection criteria. A cohort is a group of users who share a
common characteristic. For example, users with the same `firstSessionDate`
belong to the same cohort.

| JSON representation                                                                        |
| :----------------------------------------------------------------------------------------- |
| `{   "name": string,   "dimension": string,   "dateRange": {     object (DateRange)   } }` |

| Fields      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`      | `string` Assigns a name to this cohort. The dimension `cohort` is valued to this name in a report response. If set, cannot begin with `cohort_` or `RESERVED_`. If not set, cohorts are named by their zero based index `cohort_0`, `cohort_1`, etc.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `dimension` | `string` Dimension used by the cohort. Required and only supports `firstSessionDate`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `dateRange` | `object (DateRange)` The cohort selects users whose first touch date is between start date and end date defined in the `dateRange`. This `dateRange` does not specify the full date range of event data that is present in a cohort report. In a cohort report, this `dateRange` is extended by the granularity and offset present in the `cohortsRange`; event data for the extended reporting date range is present in a cohort report. In a cohort request, this `dateRange` is required and the `dateRanges` in the `RunReportRequest` or `RunPivotReportRequest` must be unspecified. This `dateRange` should generally be aligned with the cohort's granularity. If `CohortsRange` uses daily granularity, this `dateRange` can be a single day. If `CohortsRange` uses weekly granularity, this `dateRange` can be aligned to a week boundary, starting at Sunday and ending Saturday. If `CohortsRange` uses monthly granularity, this `dateRange` can be aligned to a month, starting at the first and ending on the last day of the month. |

## CohortsRange

Configures the extended reporting date range for a cohort report. Specifies an
offset duration to follow the cohorts over.

| JSON representation                                                                         |
| :------------------------------------------------------------------------------------------ |
| `{   "granularity": enum (Granularity),   "startOffset": integer,   "endOffset": integer }` |

| Fields        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `granularity` | `enum (Granularity)` Required. The granularity used to interpret the `startOffset` and `endOffset` for the extended reporting date range for a cohort report.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `startOffset` | `integer startOffset` specifies the start date of the extended reporting date range for a cohort report. `startOffset` is commonly set to 0 so that reports contain data from the acquisition of the cohort forward. If `granularity` is `DAILY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset` days. If `granularity` is `WEEKLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 7` days. If `granularity` is `MONTHLY`, the `startDate` of the extended reporting date range is `startDate` of the cohort plus `startOffset * 30` days.                                            |
| `endOffset`   | `integer` Required. `endOffset` specifies the end date of the extended reporting date range for a cohort report. `endOffset` can be any positive integer but is commonly set to 5 to 10 so that reports contain data on the cohort for the next several granularity time periods. If `granularity` is `DAILY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset` days. If `granularity` is `WEEKLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 7` days. If `granularity` is `MONTHLY`, the `endDate` of the extended reporting date range is `endDate` of the cohort plus `endOffset * 30` days. |

## Granularity

The granularity used to interpret the `startOffset` and `endOffset` for the
extended reporting date range for a cohort report.

| Enums                     |                                                                                                                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GRANULARITY_UNSPECIFIED` | Should never be specified.                                                                                                                                                |
| `DAILY`                   | Daily granularity. Commonly used if the cohort's `dateRange` is a single day and the request contains `cohortNthDay`.                                                     |
| `WEEKLY`                  | Weekly granularity. Commonly used if the cohort's `dateRange` is a week in duration (starting on Sunday and ending on Saturday) and the request contains `cohortNthWeek`. |
| `MONTHLY`                 | Monthly granularity. Commonly used if the cohort's `dateRange` is a month in duration and the request contains `cohortNthMonth`.                                          |

## CohortReportSettings

Optional settings of a cohort report.

| JSON representation           |
| :---------------------------- |
| `{   "accumulate": boolean }` |

| Fields       |                                                                                                                     |
| :----------- | :------------------------------------------------------------------------------------------------------------------ |
| `accumulate` | `boolean` If true, accumulates the result from first touch day to the end day. Not supported in `RunReportRequest`. |
