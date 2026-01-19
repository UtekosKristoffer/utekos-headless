# REST Resource: properties.dataStreams

## Resource: DataStream

A resource message representing a data stream.

| JSON representation                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "name": string,   "type": enum (DataStreamType),   "displayName": string,   "createTime": string,   "updateTime": string,   // Union field stream_data can be only one of the following:   "webStreamData": {     object (WebStreamData)   },   "androidAppStreamData": {     object (AndroidAppStreamData)   },   "iosAppStreamData": {     object (IosAppStreamData)   }   // End of list of possible types for union field stream_data. }` |

| Fields                                                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                                                                                                                                                                               | `string` Output only. Resource name of this Data Stream. Format: properties/{property_id}/dataStreams/{stream_id} Example: "properties/1000/dataStreams/2000"                                                                                                                                                                                             |
| `type`                                                                                                                                                                               | `enum (DataStreamType)` Required. Immutable. The type of this DataStream resource.                                                                                                                                                                                                                                                                        |
| `displayName`                                                                                                                                                                        | `string` Human-readable display name for the Data Stream. Required for web data streams. The max allowed display name length is 255 UTF-16 code units.                                                                                                                                                                                                    |
| `createTime`                                                                                                                                                                         | `string (Timestamp format)` Output only. Time when this stream was originally created. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.      |
| `updateTime`                                                                                                                                                                         | `string (Timestamp format)` Output only. Time when stream payload fields were last updated. Uses RFC 3339, where generated output will always be Z-normalized and uses 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| Union field `stream_data`. Data for specific data stream types. The message that will be set corresponds to the type of this stream. `stream_data` can be only one of the following: |                                                                                                                                                                                                                                                                                                                                                           |
| `webStreamData`                                                                                                                                                                      | `object (WebStreamData)` Data specific to web streams. Must be populated if type is WEB_DATA_STREAM.                                                                                                                                                                                                                                                      |
| `androidAppStreamData`                                                                                                                                                               | `object (AndroidAppStreamData)` Data specific to Android app streams. Must be populated if type is ANDROID_APP_DATA_STREAM.                                                                                                                                                                                                                               |
| `iosAppStreamData`                                                                                                                                                                   | `object (IosAppStreamData)` Data specific to iOS app streams. Must be populated if type is IOS_APP_DATA_STREAM.                                                                                                                                                                                                                                           |

## WebStreamData

Data specific to web streams.

| JSON representation                                                                |
| :--------------------------------------------------------------------------------- |
| `{   "measurementId": string,   "firebaseAppId": string,   "defaultUri": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `measurementId` | `string` Output only. Analytics Measurement ID. Example: "G-1A2BCD345E"                                                                |
| `firebaseAppId` | `string` Output only. ID of the corresponding web app in Firebase, if any. This ID can change if the web app is deleted and recreated. |
| `defaultUri`    | `string` Domain name of the web app being measured, or empty. Example: "http://www.google.com", "https://www.google.com"               |

## AndroidAppStreamData

Data specific to Android app streams.

| JSON representation                                      |
| :------------------------------------------------------- |
| `{   "firebaseAppId": string,   "packageName": string }` |

| Fields          |                                                                                                                                                |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `firebaseAppId` | `string` Output only. ID of the corresponding Android app in Firebase, if any. This ID can change if the Android app is deleted and recreated. |
| `packageName`   | `string` Immutable. The package name for the app being measured. Example: "com.example.myandroidapp"                                           |

## IosAppStreamData

Data specific to iOS app streams.

| JSON representation                                   |
| :---------------------------------------------------- |
| `{   "firebaseAppId": string,   "bundleId": string }` |

| Fields          |                                                                                                                                        |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `firebaseAppId` | `string` Output only. ID of the corresponding iOS app in Firebase, if any. This ID can change if the iOS app is deleted and recreated. |
| `bundleId`      | `string` Required. Immutable. The Apple App Store Bundle ID for the app Example: "com.example.myiosapp"                                |

## DataStreamType

The type of the data stream.

| Enums                          |                                |
| :----------------------------- | :----------------------------- |
| `DATA_STREAM_TYPE_UNSPECIFIED` | Type unknown or not specified. |
| `WEB_DATA_STREAM`              | Web data stream.               |
| `ANDROID_APP_DATA_STREAM`      | Android app data stream.       |
| `IOS_APP_DATA_STREAM`          | iOS app data stream.           |

| Methods                                                                                                                 |                                     |
| :---------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| [`create`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams/create) | Creates a DataStream.               |
| [`delete`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams/delete) | Deletes a DataStream on a property. |
| [`get`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams/get)       | Lookup for a single DataStream.     |
| [`list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams/list)     | Lists DataStreams on a property.    |
| [`patch`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/properties.dataStreams/patch)   | Updates a DataStream on a property. |
