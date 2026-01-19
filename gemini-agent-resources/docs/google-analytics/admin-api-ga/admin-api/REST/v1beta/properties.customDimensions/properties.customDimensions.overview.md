# REST Resource: properties.customDimensions

## Resource: CustomDimension

A definition for a CustomDimension.

| JSON representation                                                                                                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "parameterName": string,   "displayName": string,   "description": string,   "scope": enum (DimensionScope),   "disallowAdsPersonalization": boolean }` |

| Fields                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                       | `string` Output only. Resource name for this CustomDimension resource. Format: properties/{property}/customDimensions/{customDimension}                                                                                                                                                                                                                                                                                                                                                                                            |
| `parameterName`              | `string` Required. Immutable. Tagging parameter name for this custom dimension. If this is a user-scoped dimension, then this is the user property name. If this is an event-scoped dimension, then this is the event parameter name. If this is an item-scoped dimension, then this is the parameter name found in the eCommerce items array. May only contain alphanumeric and underscore characters, starting with a letter. Max length of 24 characters for user-scoped dimensions, 40 characters for event-scoped dimensions. |
| `displayName`                | `string` Required. Display name for this custom dimension as shown in the Analytics UI. Max length of 82 characters, alphanumeric plus space and underscore starting with a letter. Legacy system-generated display names may contain square brackets, but updates to this field will never permit square brackets.                                                                                                                                                                                                                |
| `description`                | `string` Optional. Description for this custom dimension. Max length of 150 characters.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `scope`                      | `enum (DimensionScope)` Required. Immutable. The scope of this dimension.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `disallowAdsPersonalization` | `boolean` Optional. If set to true, sets this dimension as NPA and excludes it from ads personalization. This is currently only supported by user-scoped custom dimensions.                                                                                                                                                                                                                                                                                                                                                        |

## DimensionScope

Valid values for the scope of this dimension.

| Enums                         |                                     |
| :---------------------------- | :---------------------------------- |
| `DIMENSION_SCOPE_UNSPECIFIED` | Scope unknown or not specified.     |
| `EVENT`                       | Dimension scoped to an event.       |
| `USER`                        | Dimension scoped to a user.         |
| `ITEM`                        | Dimension scoped to eCommerce items |

| Methods                                                                                                                        |                                           |
| :----------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| [`archive`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions/archive) | Archives a CustomDimension on a property. |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions/create)   | Creates a CustomDimension.                |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions/get)         | Lookup for a single CustomDimension.      |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions/list)       | Lists CustomDimensions on a property.     |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.customDimensions/patch)     | Updates a CustomDimension on a property.  |
