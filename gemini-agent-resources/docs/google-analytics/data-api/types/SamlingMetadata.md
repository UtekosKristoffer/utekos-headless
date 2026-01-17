# SamplingMetadata

If funnel report results are
[sampled](https://support.google.com/analytics/answer/13331292), this metadata
describes what percentage of events were used in this funnel report for a date
range. Sampling is the practice of analyzing a subset of all data in order to
uncover the meaningful information in the larger data set.

| JSON representation                                               |
| :---------------------------------------------------------------- |
| `{   "samplesReadCount": string,   "samplingSpaceSize": string }` |

| Fields              |                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `samplesReadCount`  | `string (int64 format)` The total number of events read in this sampled report for a date range. This is the size of the subset this property's data that was analyzed in this funnel report.                                                                                                                                                                                                                  |
| `samplingSpaceSize` | `string (int64 format)` The total number of events present in this property's data that could have been analyzed in this funnel report for a date range. Sampling uncovers the meaningful information about the larger data set, and this is the size of the larger data set. To calculate the percentage of available data that was used in this funnel report, compute `samplesReadCount/samplingSpaceSize`. |
