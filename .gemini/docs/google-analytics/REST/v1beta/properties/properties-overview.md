# REST Resource: properties

## Resource: Property

A resource message representing a Google Analytics property.

| JSON representation                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "propertyType": enum (PropertyType),   "createTime": string,   "updateTime": string,   "parent": string,   "displayName": string,   "industryCategory": enum (IndustryCategory),   "timeZone": string,   "currencyCode": string,   "serviceLevel": enum (ServiceLevel),   "deleteTime": string,   "expireTime": string,   "account": string }` |

| Fields             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`             | `string` Output only. Resource name of this property. Format: properties/{property_id} Example: "properties/1000"                                                                                                                                                                                                                                                                                                                                                                     |
| `propertyType`     | `enum (PropertyType)` Immutable. The property type for this Property resource. When creating a property, if the type is "PROPERTY_TYPE_UNSPECIFIED", then "ORDINARY_PROPERTY" will be implied.                                                                                                                                                                                                                                                                                        |
| `createTime`       | `string (Timestamp format)` Output only. Time when the entity was originally created. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.                                                                                                                                   |
| `updateTime`       | `string (Timestamp format)` Output only. Time when entity payload fields were last updated. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.                                                                                                                             |
| `parent`           | `string` Immutable. Resource name of this property's logical parent. Note: The Property-Moving UI can be used to change the parent. Format: accounts/{account}, properties/{property} Example: "accounts/100", "properties/101"                                                                                                                                                                                                                                                       |
| `displayName`      | `string` Required. Human-readable display name for this property. The max allowed display name length is 100 UTF-16 code units.                                                                                                                                                                                                                                                                                                                                                       |
| `industryCategory` | `enum (IndustryCategory)` Industry associated with this property Example: AUTOMOTIVE, FOOD_AND_DRINK                                                                                                                                                                                                                                                                                                                                                                                  |
| `timeZone`         | `string` Required. Reporting Time Zone, used as the day boundary for reports, regardless of where the data originates. If the time zone honors DST, Analytics will automatically adjust for the changes. NOTE: Changing the time zone only affects data going forward, and is not applied retroactively. Format: [https://www.iana.org/time-zones](https://www.iana.org/time-zones) Example: "America/Los_Angeles"                                                                    |
| `currencyCode`     | `string` The currency type used in reports involving monetary values. Format: [https://en.wikipedia.org/wiki/ISO_4217](https://en.wikipedia.org/wiki/ISO_4217) Examples: "USD", "EUR", "JPY"                                                                                                                                                                                                                                                                                          |
| `serviceLevel`     | `enum (ServiceLevel)` Output only. The Google Analytics service level that applies to this property.                                                                                                                                                                                                                                                                                                                                                                                  |
| `deleteTime`       | `string (Timestamp format)` Output only. If set, the time at which this property was trashed. If not set, then this property is not currently in the trash can. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.                                                         |
| `expireTime`       | `string (Timestamp format)` Output only. If set, the time at which this trashed property will be permanently deleted. If not set, then this property is not currently in the trash can and is not slated to be deleted. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `account`          | `string` Immutable. The resource name of the parent account Format: accounts/{account_id} Example: "accounts/123"                                                                                                                                                                                                                                                                                                                                                                     |

## PropertyType

Types of `Property` resources.

| Enums                       |                                      |
| :-------------------------- | :----------------------------------- |
| `PROPERTY_TYPE_UNSPECIFIED` | Unknown or unspecified property type |
| `PROPERTY_TYPE_ORDINARY`    | Ordinary Google Analytics property   |
| `PROPERTY_TYPE_SUBPROPERTY` | Google Analytics subproperty         |
| `PROPERTY_TYPE_ROLLUP`      | Google Analytics rollup property     |

## IndustryCategory

The category selected for this property, used for industry benchmarking.

| Enums                             |                                 |
| :-------------------------------- | :------------------------------ |
| `INDUSTRY_CATEGORY_UNSPECIFIED`   | Industry category unspecified   |
| `AUTOMOTIVE`                      | Automotive                      |
| `BUSINESS_AND_INDUSTRIAL_MARKETS` | Business and industrial markets |
| `FINANCE`                         | Finance                         |
| `HEALTHCARE`                      | Healthcare                      |
| `TECHNOLOGY`                      | Technology                      |
| `TRAVEL`                          | Travel                          |
| `OTHER`                           | Other                           |
| `ARTS_AND_ENTERTAINMENT`          | Arts and entertainment          |
| `BEAUTY_AND_FITNESS`              | Beauty and fitness              |
| `BOOKS_AND_LITERATURE`            | Books and literature            |
| `FOOD_AND_DRINK`                  | Food and drink                  |
| `GAMES`                           | Games                           |
| `HOBBIES_AND_LEISURE`             | Hobbies and leisure             |
| `HOME_AND_GARDEN`                 | Home and garden                 |
| `INTERNET_AND_TELECOM`            | Internet and telecom            |
| `LAW_AND_GOVERNMENT`              | Law and government              |
| `NEWS`                            | News                            |
| `ONLINE_COMMUNITIES`              | Online communities              |
| `PEOPLE_AND_SOCIETY`              | People and society              |
| `PETS_AND_ANIMALS`                | Pets and animals                |
| `REAL_ESTATE`                     | Real estate                     |
| `REFERENCE`                       | Reference                       |
| `SCIENCE`                         | Science                         |
| `SPORTS`                          | Sports                          |
| `JOBS_AND_EDUCATION`              | Jobs and education              |
| `SHOPPING`                        | Shopping                        |

## ServiceLevel

Various levels of service for Google Analytics.

| Enums                       |                                                |
| :-------------------------- | :--------------------------------------------- |
| `SERVICE_LEVEL_UNSPECIFIED` | Service level not specified or invalid.        |
| `GOOGLE_ANALYTICS_STANDARD` | The standard version of Google Analytics.      |
| `GOOGLE_ANALYTICS_360`      | The paid, premium version of Google Analytics. |

| Methods                                                                                                                                                   |                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| [`acknowledgeUserDataCollection`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/acknowledgeUserDataCollection) | Acknowledges the terms of user data collection for the specified property.      |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/create)                                               | Creates a Google Analytics property with the specified location and attributes. |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/delete)                                               | Marks target Property as soft-deleted (ie: "trashed") and returns it.           |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/get)                                                     | Lookup for a single GA Property.                                                |
| [`getDataRetentionSettings`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/getDataRetentionSettings)           | Returns the singleton data retention settings for this property.                |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/list)                                                   | Returns child Properties under the specified parent Account.                    |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/patch)                                                 | Updates a property.                                                             |
| [`runAccessReport`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/runAccessReport)                             | Returns a customized report of data access records.                             |
| [`updateDataRetentionSettings`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties/updateDataRetentionSettings)     | Updates the singleton data retention settings for this property.                |
