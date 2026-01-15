# Method: properties.acknowledgeUserDataCollection

Acknowledges the terms of user data collection for the specified property.

This acknowledgement must be completed (either in the Google Analytics UI or
through this API) before MeasurementProtocolSecret resources may be created.

### HTTP request

`POST https://analyticsadmin.googleapis.com/v1beta/{property=properties/*}:acknowledgeUserDataCollection`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                |
| :--------- | :----------------------------------------------------------------------------- |
| `property` | `string` Required. The property for which to acknowledge user data collection. |

### Request body

The request body contains data with the following structure:

| JSON representation               |
| :-------------------------------- |
| `{   "acknowledgement": string }` |

| Fields            |                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `acknowledgement` | `string` Required. An acknowledgement that the caller of this method understands the terms of user data collection. This field must contain the exact value: "I acknowledge that I have the necessary privacy disclosures and rights from my end users for the collection and processing of their data, including the association of such data with the visitation information Google Analytics collects from my site and/or app property." |

### Response body

If successful, the response body is empty.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/analytics.edit`
