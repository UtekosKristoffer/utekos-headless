# Method: properties.getPropertyQuotasSnapshot

Get all property quotas organized by quota category for a given property. This
will charge 1 property quota from the category with the most quota.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1alpha/{name=properties/*/propertyQuotasSnapshot}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                     |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. Quotas from this property will be listed in the response. Format: `properties/{property}/propertyQuotasSnapshot` |

### Request body

The request body must be empty.

### Response body

Current state of all Property Quotas organized by quota category.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{   "name": string,   "corePropertyQuota": {     object (PropertyQuota)   },   "realtimePropertyQuota": {     object (PropertyQuota)   },   "funnelPropertyQuota": {     object (PropertyQuota)   } }` |

| Fields                  |                                                                      |
| :---------------------- | :------------------------------------------------------------------- |
| `name`                  | `string` Identifier. The property quota snapshot resource name.      |
| `corePropertyQuota`     | `object (PropertyQuota)` Property Quota for core property tokens     |
| `realtimePropertyQuota` | `object (PropertyQuota)` Property Quota for realtime property tokens |
| `funnelPropertyQuota`   | `object (PropertyQuota)` Property Quota for funnel property tokens   |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`
-
