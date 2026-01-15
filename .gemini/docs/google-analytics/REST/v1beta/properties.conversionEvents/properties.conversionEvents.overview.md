# REST Resource: properties.conversionEvents

## Resource: ConversionEvent

A conversion event in a Google Analytics property.

| JSON representation                                                                                                                                                                                                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "eventName": string,   "createTime": string,   "deletable": boolean,   "custom": boolean,   "countingMethod": enum (ConversionCountingMethod),   "defaultConversionValue": {     object (DefaultConversionValue)   } }` |

| Fields                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                   | `string` Output only. Resource name of this conversion event. Format: properties/{property}/conversionEvents/{conversionEvent}                                                                                                                                                                                                                                                                                                                     |
| `eventName`              | `string` Immutable. The event name for this conversion event. Examples: 'click', 'purchase'                                                                                                                                                                                                                                                                                                                                                        |
| `createTime`             | `string (Timestamp format)` Output only. Time when this conversion event was created in the property. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.                                                                                |
| `deletable`              | `boolean` Output only. If set, this event can currently be deleted with conversionEvents.delete.                                                                                                                                                                                                                                                                                                                                                   |
| `custom`                 | `boolean` Output only. If set to true, this conversion event refers to a custom event. If set to false, this conversion event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom conversion events that may be created per property. |
| `countingMethod`         | `enum (ConversionCountingMethod)` Optional. The method by which conversions will be counted across multiple events within a session. If this value is not provided, it will be set to `ONCE_PER_EVENT`.                                                                                                                                                                                                                                            |
| `defaultConversionValue` | `object (DefaultConversionValue)` Optional. Defines a default value/currency for a conversion event.                                                                                                                                                                                                                                                                                                                                               |

## ConversionCountingMethod

The method by which conversions will be counted across multiple events within a
session.

| Enums                                    |                                                                                 |
| :--------------------------------------- | :------------------------------------------------------------------------------ |
| `CONVERSION_COUNTING_METHOD_UNSPECIFIED` | Counting method not specified.                                                  |
| `ONCE_PER_EVENT`                         | Each Event instance is considered a Conversion.                                 |
| `ONCE_PER_SESSION`                       | An Event instance is considered a Conversion at most once per session per user. |

## DefaultConversionValue

Defines a default value/currency for a conversion event. Both value and currency
must be provided.

| JSON representation                               |
| :------------------------------------------------ |
| `{   "value": number,   "currencyCode": string }` |

| Fields         |                                                                                                                                                                                                                                                                             |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `number` This value will be used to populate the value for all conversions of the specified eventName where the event "value" parameter is unset.                                                                                                                           |
| `currencyCode` | `string` When a conversion event for this eventName has no set currency, this currency will be applied as the default. Must be in ISO 4217 currency code format. See [https://en.wikipedia.org/wiki/ISO_4217](https://en.wikipedia.org/wiki/ISO_4217) for more information. |

| Methods                                                                                                                                     |                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------- |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.conversionEvents/create) `(deprecated)` | Deprecated: Use `CreateKeyEvent` instead. |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.conversionEvents/delete) `(deprecated)` | Deprecated: Use `DeleteKeyEvent` instead. |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.conversionEvents/get) `(deprecated)`       | Deprecated: Use `GetKeyEvent` instead.    |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.conversionEvents/list) `(deprecated)`     | Deprecated: Use `ListKeyEvents` instead.  |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.conversionEvents/patch) `(deprecated)`   | Deprecated: Use `UpdateKeyEvent` instead. |
