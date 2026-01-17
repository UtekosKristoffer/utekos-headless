# ResponseMetaData

Response's metadata carrying additional information about the report content.

| JSON representation                                                                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "dataLossFromOtherRow": boolean,   "samplingMetadatas": [     {       object (SamplingMetadata)     }   ],   "schemaRestrictionResponse": {     object (SchemaRestrictionResponse)   },   "currencyCode": string,   "timeZone": string,   "emptyReason": string,   "subjectToThresholding": boolean }` |

| Fields                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataLossFromOtherRow`      | `boolean` If true, indicates some buckets of dimension combinations are rolled into "(other)" row. This can happen for high cardinality reports. The metadata parameter dataLossFromOtherRow is populated based on the aggregated data table used in the report. The parameter will be accurately populated regardless of the filters and limits in the report. For example, the (other) row could be dropped from the report because the request contains a filter on sessionSource \= google. This parameter will still be populated if data loss from other row was present in the input aggregate data used to generate this report. To learn more, see [About the (other) row and data sampling](https://support.google.com/analytics/answer/13208658#reports). |
| `samplingMetadatas[]`       | `object (SamplingMetadata)` If this report results is [sampled](https://support.google.com/analytics/answer/13331292), this describes the percentage of events used in this report. One `samplingMetadatas` is populated for each date range. Each `samplingMetadatas` corresponds to a date range in order that date ranges were specified in the request. However if the results are not sampled, this field will not be defined.                                                                                                                                                                                                                                                                                                                                  |
| `schemaRestrictionResponse` | `object (SchemaRestrictionResponse)` Describes the schema restrictions actively enforced in creating this report. To learn more, see [Access and data-restriction management](https://support.google.com/analytics/answer/10851388).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `currencyCode`              | `string` The currency code used in this report. Intended to be used in formatting currency metrics like `purchaseRevenue` for visualization. If currencyCode was specified in the request, this response parameter will echo the request parameter; otherwise, this response parameter is the property's current currencyCode. Currency codes are string encodings of currency types from the ISO 4217 standard ([https://en.wikipedia.org/wiki/ISO_4217)](<https://en.wikipedia.org/wiki/ISO_4217)>); for example "USD", "EUR", "JPY". To learn more, see [https://support.google.com/analytics/answer/9796179](https://support.google.com/analytics/answer/9796179).                                                                                               |
| `timeZone`                  | `string` The property's current timezone. Intended to be used to interpret time-based dimensions like `hour` and `minute`. Formatted as strings from the IANA Time Zone database ([https://www.iana.org/time-zones)](<https://www.iana.org/time-zones)>); for example "America/New_York" or "Asia/Tokyo".                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `emptyReason`               | `string` If empty reason is specified, the report is empty for this reason.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `subjectToThresholding`     | `boolean` If `subjectToThresholding` is true, this report is subject to thresholding and only returns data that meets the minimum aggregation thresholds. It is possible for a request to be subject to thresholding thresholding and no data is absent from the report, and this happens when all data is above the thresholds. To learn more, see [Data thresholds](https://support.google.com/analytics/answer/9383630).                                                                                                                                                                                                                                                                                                                                          |

## SchemaRestrictionResponse

The schema restrictions actively enforced in creating this report. To learn
more, see
[Access and data-restriction management](https://support.google.com/analytics/answer/10851388).

| JSON representation                                                                          |
| :------------------------------------------------------------------------------------------- |
| `{   "activeMetricRestrictions": [     {       object (ActiveMetricRestriction)     }   ] }` |

| Fields                       |                                                                                                                                                                                                                                                                                                        |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `activeMetricRestrictions[]` | `object (ActiveMetricRestriction)` All restrictions actively enforced in creating the report. For example, `purchaseRevenue` always has the restriction type `REVENUE_DATA`. However, this active response restriction is only populated if the user's custom role disallows access to `REVENUE_DATA`. |

## ActiveMetricRestriction

A metric actively restricted in creating the report.

| JSON representation                                                                            |
| :--------------------------------------------------------------------------------------------- |
| `{   "restrictedMetricTypes": [     enum (RestrictedMetricType)   ],   "metricName": string }` |

| Fields                    |                                                                         |
| :------------------------ | :---------------------------------------------------------------------- |
| `restrictedMetricTypes[]` | `enum (RestrictedMetricType)` The reason for this metric's restriction. |
| `metricName`              | `string` The name of the restricted metric.                             |

## RestrictedMetricType

Categories of data that you may be restricted from viewing on certain Google
Analytics properties.

| Enums                                |                                            |
| :----------------------------------- | :----------------------------------------- |
| `RESTRICTED_METRIC_TYPE_UNSPECIFIED` | Unspecified type.                          |
| `COST_DATA`                          | Cost metrics such as `adCost`.             |
| `REVENUE_DATA`                       | Revenue metrics such as `purchaseRevenue`. |

## SamplingMetadata

If this report results is
[sampled](https://support.google.com/analytics/answer/13331292), this describes
the percentage of events used in this report. Sampling is the practice of
analyzing a subset of all data in order to uncover the meaningful information in
the larger data set.

| JSON representation                                               |
| :---------------------------------------------------------------- |
| `{   "samplesReadCount": string,   "samplingSpaceSize": string }` |

| Fields              |                                                                                                                                                                                                                                                                                                                                                                                                  |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `samplesReadCount`  | `string (int64 format)` The total number of events read in this sampled report for a date range. This is the size of the subset this property's data that was analyzed in this report.                                                                                                                                                                                                           |
| `samplingSpaceSize` | `string (int64 format)` The total number of events present in this property's data that could have been analyzed in this report for a date range. Sampling uncovers the meaningful information about the larger data set, and this is the size of the larger data set. To calculate the percentage of available data that was used in this report, compute `samplesReadCount/samplingSpaceSize`. |
