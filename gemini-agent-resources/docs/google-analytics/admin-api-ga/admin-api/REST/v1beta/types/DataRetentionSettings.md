# DataRetentionSettings

Settings values for data retention. This is a singleton resource.

| JSON representation                                                                                                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "eventDataRetention": enum (RetentionDuration),   "userDataRetention": enum (RetentionDuration),   "resetUserDataOnNewActivity": boolean }` |

| Fields                       |                                                                                                                                 |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `name`                       | `string` Output only. Resource name for this DataRetentionSetting resource. Format: properties/{property}/dataRetentionSettings |
| `eventDataRetention`         | `enum (RetentionDuration)` Required. The length of time that event-level data is retained.                                      |
| `userDataRetention`          | `enum (RetentionDuration)` Required. The length of time that user-level data is retained.                                       |
| `resetUserDataOnNewActivity` | `boolean` If true, reset the retention period for the user identifier with every event from that user.                          |

## RetentionDuration

Valid values for the data retention duration.

| Enums                            |                                                                                                                 |
| :------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `RETENTION_DURATION_UNSPECIFIED` | Data retention time duration is not specified.                                                                  |
| `TWO_MONTHS`                     | The data retention time duration is 2 months.                                                                   |
| `FOURTEEN_MONTHS`                | The data retention time duration is 14 months.                                                                  |
| `TWENTY_SIX_MONTHS`              | The data retention time duration is 26 months. Available to 360 properties only. Available for event data only. |
| `THIRTY_EIGHT_MONTHS`            | The data retention time duration is 38 months. Available to 360 properties only. Available for event data only. |
| `FIFTY_MONTHS`                   | The data retention time duration is 50 months. Available to 360 properties only. Available for event data only. |
