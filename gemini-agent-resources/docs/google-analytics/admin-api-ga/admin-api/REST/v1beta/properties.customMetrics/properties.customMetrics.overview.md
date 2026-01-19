# REST Resource: properties.customMetrics

## Resource: CustomMetric

A definition for a custom metric.

| JSON representation                                                                                                                                                                                                                              |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "parameterName": string,   "displayName": string,   "description": string,   "measurementUnit": enum (MeasurementUnit),   "scope": enum (MetricScope),   "restrictedMetricType": [     enum (RestrictedMetricType)   ] }` |

| Fields                   |                                                                                                                                                                                                                                                                                                                  |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                   | `string` Output only. Resource name for this CustomMetric resource. Format: properties/{property}/customMetrics/{customMetric}                                                                                                                                                                                   |
| `parameterName`          | `string` Required. Immutable. Tagging name for this custom metric. If this is an event-scoped metric, then this is the event parameter name. May only contain alphanumeric and underscore charactes, starting with a letter. Max length of 40 characters for event-scoped metrics.                               |
| `displayName`            | `string` Required. Display name for this custom metric as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets. |
| `description`            | `string` Optional. Description for this custom dimension. Max length of 150 characters.                                                                                                                                                                                                                          |
| `measurementUnit`        | `enum (MeasurementUnit)` Required. The type for the custom metric's value.                                                                                                                                                                                                                                       |
| `scope`                  | `enum (MetricScope)` Required. Immutable. The scope of this custom metric.                                                                                                                                                                                                                                       |
| `restrictedMetricType[]` | `enum (RestrictedMetricType)` Optional. Types of restricted data that this metric may contain. Required for metrics with CURRENCY measurement unit. Must be empty for metrics with a non-CURRENCY measurement unit.                                                                                              |

## MeasurementUnit

Possible types of representing the custom metric's value.

Currency representation may change in the future, requiring a breaking API
change.

| Enums                          |                                         |
| :----------------------------- | :-------------------------------------- |
| `MEASUREMENT_UNIT_UNSPECIFIED` | MeasurementUnit unspecified or missing. |
| `STANDARD`                     | This metric uses default units.         |
| `CURRENCY`                     | This metric measures a currency.        |
| `FEET`                         | This metric measures feet.              |
| `METERS`                       | This metric measures meters.            |
| `KILOMETERS`                   | This metric measures kilometers.        |
| `MILES`                        | This metric measures miles.             |
| `MILLISECONDS`                 | This metric measures milliseconds.      |
| `SECONDS`                      | This metric measures seconds.           |
| `MINUTES`                      | This metric measures minutes.           |
| `HOURS`                        | This metric measures hours.             |

## MetricScope

The scope of this metric.

| Enums                      |                                 |
| :------------------------- | :------------------------------ |
| `METRIC_SCOPE_UNSPECIFIED` | Scope unknown or not specified. |
| `EVENT`                    | Metric scoped to an event.      |

## RestrictedMetricType

Labels that mark the data in this custom metric as data that should be
restricted to specific users.

| Enums                                |                              |
| :----------------------------------- | :--------------------------- |
| `RESTRICTED_METRIC_TYPE_UNSPECIFIED` | Type unknown or unspecified. |
| `COST_DATA`                          | Metric reports cost data.    |
| `REVENUE_DATA`                       | Metric reports revenue data. |

| Methods                                                                                                                     |                                        |
| :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| [`archive`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics/archive) | Archives a CustomMetric on a property. |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics/create)   | Creates a CustomMetric.                |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics/get)         | Lookup for a single CustomMetric.      |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics/list)       | Lists CustomMetrics on a property.     |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customMetrics/patch)     | Updates a CustomMetric on a property.  |
