# REST Resource: properties.googleAdsLinks

## Resource: GoogleAdsLink

A link between a Google Analytics property and a Google Ads account.

| JSON representation                                                                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "customerId": string,   "canManageClients": boolean,   "adsPersonalizationEnabled": boolean,   "createTime": string,   "updateTime": string,   "creatorEmailAddress": string }` |

| Fields                      |                                                                                                                                                                                                                                                                                                                                                    |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                      | `string` Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID.                                                                                                                                                                                                    |
| `customerId`                | `string` Immutable. Google Ads customer ID.                                                                                                                                                                                                                                                                                                        |
| `canManageClients`          | `boolean` Output only. If true, this link is for a Google Ads manager account.                                                                                                                                                                                                                                                                     |
| `adsPersonalizationEnabled` | `boolean` Enable personalized advertising features with this integration. Automatically publish my Google Analytics audience lists and Google Analytics remarketing events/parameters to the linked Google Ads account. If this field is not set on create/update, it will be defaulted to true.                                                   |
| `createTime`                | `string (Timestamp format)` Output only. Time when this link was originally created. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `updateTime`                | `string (Timestamp format)` Output only. Time when this link was last updated. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.       |
| `creatorEmailAddress`       | `string` Output only. Email address of the user that created the link. An empty string will be returned if the email address can't be retrieved.                                                                                                                                                                                                   |

| Methods                                                                                                                    |                                       |
| :------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks/create) | Creates a GoogleAdsLink.              |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks/delete) | Deletes a GoogleAdsLink on a property |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks/list)     | Lists GoogleAdsLinks on a property.   |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks/patch)   | Updates a GoogleAdsLink on a property |
