# REST Resource: properties.audienceExports

## Resource: AudienceExport

An audience export is a list of users in an audience at the time of the list's
creation. One audience may have multiple audience exports created for different
days.

| JSON representation                                                                                                                                                                                                                                                                                                                  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "audience": string,   "audienceDisplayName": string,   "dimensions": [     {       object (AudienceDimension)     }   ],   "creationQuotaTokensCharged": integer,   "state": enum (State),   "beginCreatingTime": string,   "rowCount": integer,   "errorMessage": string,   "percentageCompleted": number }` |

| Fields                       |                                                                                                                                                                                                                                                                                                                               |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                       | `string` Output only. Identifier. The audience export resource name assigned during creation. This resource name identifies this `AudienceExport`. Format: `properties/{property}/audienceExports/{audienceExport}`                                                                                                           |
| `audience`                   | `string` Required. The audience resource name. This resource name identifies the audience being listed and is shared between the Analytics Data & Admin APIs. Format: `properties/{property}/audiences/{audience}`                                                                                                            |
| `audienceDisplayName`        | `string` Output only. The descriptive display name for this audience. For example, "Purchasers".                                                                                                                                                                                                                              |
| `dimensions[]`               | `object (AudienceDimension)` Required. The dimensions requested and displayed in the query response.                                                                                                                                                                                                                          |
| `creationQuotaTokensCharged` | `integer` Output only. The total quota tokens charged during creation of the AudienceExport. Because this token count is based on activity from the `CREATING` state, this tokens charged will be fixed once an AudienceExport enters the `ACTIVE` or `FAILED` states.                                                        |
| `state`                      | `enum (State)` Output only. The current state for this AudienceExport.                                                                                                                                                                                                                                                        |
| `beginCreatingTime`          | `string (Timestamp format)` Output only. The time when audienceExports.create was called and the AudienceExport began the `CREATING` state. A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`. |
| `rowCount`                   | `integer` Output only. The total number of rows in the AudienceExport result.                                                                                                                                                                                                                                                 |
| `errorMessage`               | `string` Output only. Error message is populated when an audience export fails during creation. A common reason for such a failure is quota exhaustion.                                                                                                                                                                       |
| `percentageCompleted`        | `number` Output only. The percentage completed for this audience export ranging between 0 to 100\.                                                                                                                                                                                                                            |

## AudienceDimension

An audience dimension is a user attribute. Specific user attributed are
requested and then later returned in the `QueryAudienceExportResponse`.

| JSON representation             |
| :------------------------------ |
| `{   "dimensionName": string }` |

| Fields          |                                                                                                                                                                                                                      |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dimensionName` | `string` Optional. The API name of the dimension. See the [API Dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-list-api-schema#dimensions) for the list of dimension names. |

## State

The AudienceExport currently exists in this state.

| Enums               |                                                                                                                                                                                                                 |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STATE_UNSPECIFIED` | Unspecified state will never be used.                                                                                                                                                                           |
| `CREATING`          | The AudienceExport is currently creating and will be available in the future. Creating occurs immediately after the audienceExports.create call.                                                                |
| `ACTIVE`            | The AudienceExport is fully created and ready for querying. An AudienceExport is updated to active asynchronously from a request; this occurs some time (for example 15 minutes) after the initial create call. |
| `FAILED`            | The AudienceExport failed to be created. It is possible that re-requesting this audience export will succeed.                                                                                                   |

| Methods                                                                                                                       |                                                               |
| :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [`create`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/create) | Creates an audience export for later retrieval.               |
| [`get`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/get)       | Gets configuration metadata about a specific audience export. |
| [`list`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/list)     | Lists all audience exports for a property.                    |
| [`query`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/query)   | Retrieves an audience export of users.                        |
