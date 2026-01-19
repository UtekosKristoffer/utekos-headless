# Method: accounts.getDataSharingSettings

Get data sharing settings on an account. Data sharing settings are singletons.

### HTTP request

`GET https://analyticsadmin.googleapis.com/v1beta/{name=accounts/*/dataSharingSettings}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |  |
| :---- | :---- |
| `name` | `string` Required. The name of the settings to lookup. Format: accounts/{account}/dataSharingSettings Example: `accounts/1000/dataSharingSettings` |

### Request body

The request body must be empty.

### Response body

A resource message representing data sharing settings of a Google Analytics account.

If successful, the response body contains data with the following structure:

| JSON representation |
| :---- |
| `{   "name": string,   "sharingWithGoogleSupportEnabled": boolean,   "sharingWithGoogleAssignedSalesEnabled": boolean,   "sharingWithGoogleAnySalesEnabled": boolean,   "sharingWithGoogleProductsEnabled": boolean,   "sharingWithOthersEnabled": boolean }` |

| Fields |  |
| :---- | :---- |
| `name` | `string` Output only. Resource name. Format: accounts/{account}/dataSharingSettings Example: "accounts/1000/dataSharingSettings" |
| `sharingWithGoogleSupportEnabled` | `boolean` Allows Google technical support representatives access to your Google Analytics data and account when necessary to provide service and find solutions to technical issues. This field maps to the "Technical support" field in the Google Analytics Admin UI. |
| `sharingWithGoogleAssignedSalesEnabled` | `boolean` Allows Google access to your Google Analytics account data, including account usage and configuration data, product spending, and users associated with your Google Analytics account, so that Google can help you make the most of Google products, providing you with insights, offers, recommendations, and optimization tips across Google Analytics and other Google products for business. This field maps to the "Recommendations for your business" field in the Google Analytics Admin UI. |
| `sharingWithGoogleAnySalesEnabled (deprecated)` | `boolean` This item is deprecated\! Deprecated. This field is no longer used and always returns false. |
| `sharingWithGoogleProductsEnabled` | `boolean` Allows Google to use the data to improve other Google products or services. This fields maps to the "Google products & services" field in the Google Analytics Admin UI. |
| `sharingWithOthersEnabled` | `boolean` Enable features like predictions, modeled data, and benchmarking that can provide you with richer business insights when you contribute aggregated measurement data. The data you share (including information about the property from which it is shared) is aggregated and de-identified before being used to generate business insights. This field maps to the "Modeling contributions & business insights" field in the Google Analytics Admin UI. |

### Authorization scopes

Requires one of the following OAuth scopes:

* `https://www.googleapis.com/auth/analytics.readonly`  
* `https://www.googleapis.com/auth/analytics.edit`
