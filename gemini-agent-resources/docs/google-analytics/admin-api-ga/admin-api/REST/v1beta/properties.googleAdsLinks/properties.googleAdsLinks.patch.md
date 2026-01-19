# Method: properties.googleAdsLinks.patch

Updates a GoogleAdsLink on a property

### HTTP request

`PATCH https://analyticsadmin.googleapis.com/v1beta/{googleAdsLink.name=properties/*/googleAdsLinks/*}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters           |                                                                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `googleAdsLink.name` | `string` Output only. Format: properties/{propertyId}/googleAdsLinks/{googleAdsLinkId} Note: googleAdsLinkId is not the Google Ads customer ID. |

### Query parameters

| Parameters   |                                                                                                                                                                                                                                                                                                                                                                       |
| :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updateMask` | `string (FieldMask format)` Required. The list of fields to be updated. Field names must be in snake case (e.g., "field_to_update"). Omitted fields will not be updated. To replace the entire entity, use one path with the string "\*" to match all fields. This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`. |

### Request body

The request body contains an instance of
[`GoogleAdsLink`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks#GoogleAdsLink).

### Response body

If successful, the response body contains an instance of
[`GoogleAdsLink`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.googleAdsLinks#GoogleAdsLink).

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
