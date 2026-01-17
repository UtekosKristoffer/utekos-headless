# Method: properties.getMetadata

Returns metadata for dimensions and metrics available in reporting methods. Used
to explore the dimensions and metrics. In this method, a Google Analytics
property identifier is specified in the request, and the metadata response
includes Custom dimensions and metrics as well as Universal metadata.

For example if a custom metric with parameter name `levels_unlocked` is
registered to a property, the Metadata response will contain
`customEvent:levels_unlocked`. Universal metadata are dimensions and metrics
applicable to any property such as `country` and `totalUsers`.

### HTTP request

`GET https://analyticsdata.googleapis.com/v1beta/{name=properties/*/metadata}`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Path parameters

| Parameters |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `string` Required. The resource name of the metadata to retrieve. This name field is specified in the URL path and not URL parameters. Property is a numeric Google Analytics property identifier. To learn more, see [where to find your Property ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id). Example: properties/1234/metadata Set the Property ID to 0 for dimensions and metrics common to all properties. In this special mode, this method will not return custom dimensions and metrics. |

### Request body

The request body must be empty.

### Response body

The dimensions, metrics and comparisons currently accepted in reporting methods.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "dimensions": [     {       object (DimensionMetadata)     }   ],   "metrics": [     {       object (MetricMetadata)     }   ],   "comparisons": [     {       object (ComparisonMetadata)     }   ] }` |

| Fields          |                                                            |
| :-------------- | :--------------------------------------------------------- |
| `name`          | `string` Resource name of this metadata.                   |
| `dimensions[]`  | `object (DimensionMetadata)` The dimension descriptions.   |
| `metrics[]`     | `object (MetricMetadata)` The metric descriptions.         |
| `comparisons[]` | `object (ComparisonMetadata)` The comparison descriptions. |

### Authorization scopes

Requires one of the following OAuth scopes:

- `https://www.googleapis.com/auth/analytics.readonly`
- `https://www.googleapis.com/auth/analytics`

## ComparisonMetadata

The metadata for a single comparison.

| JSON representation                                                    |
| :--------------------------------------------------------------------- |
| `{   "apiName": string,   "uiName": string,   "description": string }` |

| Fields        |                                                                                                                                                                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiName`     | `string` This comparison's resource name. Useable in [Comparison](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/getMetadata#Comparison)'s `comparison` field. For example, 'comparisons/1234'. |
| `uiName`      | `string` This comparison's name within the Google Analytics user interface.                                                                                                                                                                 |
| `description` | `string` This comparison's description.                                                                                                                                                                                                     |
