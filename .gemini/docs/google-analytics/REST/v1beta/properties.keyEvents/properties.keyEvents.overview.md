# REST Resource: properties.keyEvents

## Resource: KeyEvent

A key event in a Google Analytics property.

| JSON representation                                                                                                                                                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "eventName": string,   "createTime": string,   "deletable": boolean,   "custom": boolean,   "countingMethod": enum (CountingMethod),   "defaultValue": {     object (DefaultValue)   } }` |

| Fields           |                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | `string` Output only. Resource name of this key event. Format: properties/{property}/keyEvents/{keyEvent}                                                                                                                                                                                                                                                                                                                     |
| `eventName`      | `string` Immutable. The event name for this key event. Examples: 'click', 'purchase'                                                                                                                                                                                                                                                                                                                                          |
| `createTime`     | `string (Timestamp format)` Output only. Time when this key event was created in the property. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.                                                                  |
| `deletable`      | `boolean` Output only. If set to true, this event can be deleted.                                                                                                                                                                                                                                                                                                                                                             |
| `custom`         | `boolean` Output only. If set to true, this key event refers to a custom event. If set to false, this key event refers to a default event in GA. Default events typically have special meaning in GA. Default events are usually created for you by the GA system, but in some cases can be created by property admins. Custom events count towards the maximum number of custom key events that may be created per property. |
| `countingMethod` | `enum (CountingMethod)` Required. The method by which Key Events will be counted across multiple events within a session.                                                                                                                                                                                                                                                                                                     |
| `defaultValue`   | `object (DefaultValue)` Optional. Defines a default value/currency for a key event.                                                                                                                                                                                                                                                                                                                                           |

## CountingMethod

The method by which Key Events will be counted across multiple events within a
session.

| Enums                         |                                                                                |
| :---------------------------- | :----------------------------------------------------------------------------- |
| `COUNTING_METHOD_UNSPECIFIED` | Counting method not specified.                                                 |
| `ONCE_PER_EVENT`              | Each Event instance is considered a Key Event.                                 |
| `ONCE_PER_SESSION`            | An Event instance is considered a Key Event at most once per session per user. |

## DefaultValue

Defines a default value/currency for a key event.

| JSON representation                                      |
| :------------------------------------------------------- |
| `{   "numericValue": number,   "currencyCode": string }` |

| Fields         |                                                                                                                                                                                                                                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `numericValue` | `number` Required. This will be used to populate the "value" parameter for all occurrences of this Key Event (specified by eventName) where that parameter is unset.                                                                                                                                    |
| `currencyCode` | `string` Required. When an occurrence of this Key Event (specified by eventName) has no set currency this currency will be applied as the default. Must be in ISO 4217 currency code format. See [https://en.wikipedia.org/wiki/ISO_4217](https://en.wikipedia.org/wiki/ISO_4217) for more information. |

| Methods                                                                                                               |                                                                |
| :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents/create) | Creates a Key Event.                                           |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents/delete) | Deletes a Key Event.                                           |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents/get)       | Retrieve a single Key Event.                                   |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents/list)     | Returns a list of Key Events in the specified parent property. |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.keyEvents/patch)   | Updates a Key Event.                                           |
