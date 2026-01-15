# Method: properties.getDataRetentionSettings

Returns the singleton data retention settings for this property.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=properties/*/dataRetentionSettings}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |  |
| :---- | :---- |
| `name` | `string` Required. The name of the settings to lookup. Format: properties/{property}/dataRetentionSettings Example: "properties/1000/dataRetentionSettings" |

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of [`DataRetentionSettings`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/DataRetentionSettings).

### Authorization scopes

Requires one of the following OAuth scopes:

* `https://www.googleapis.com/auth/analytics.readonly`  
* `https://www.googleapis.com/auth/analytics.edit`
