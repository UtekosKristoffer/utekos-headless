# Realtime Dimensions & Metrics

The dimensions and metrics supported in queries to the Realtime method of the
Analytics Data API. The Core Reporting methods (RunReport for example) accept a
different set of Dimensions & Metrics than the Realtime method.

## Dimensions

The following dimensions can be requested in reports for any property. Specify
the "API Name" in a Dimension resource's name field for a column of the
dimension in the report response.

| API Name               | UI Name                    | Description                                                                                                                                                                                                        |
| :--------------------- | :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `appVersion`           | App version                | The app's versionName (Android) or short bundle version (iOS).                                                                                                                                                     |
| `audienceId`           | Audience ID                | The numeric identifier of an Audience. Users are reported in the audiences to which they belonged during the report's date range. Current user behavior does not affect historical audience membership in reports. |
| `audienceName`         | Audience name              | The given name of an Audience. Users are reported in the audiences to which they belonged during the report's date range. Current user behavior does not affect historical audience membership in reports.         |
| `audienceResourceName` | Audience resource name     | The resource name of this audience. Resource names contain both collection & resource identifiers to uniquely identify a resource; to learn more, see Resource names.                                              |
| `city`                 | City                       | The city from which the user activity originated.                                                                                                                                                                  |
| `cityId`               | City ID                    | The geographic ID of the city from which the user activity originated, derived from their IP address.                                                                                                              |
| `country`              | Country                    | The country from which the user activity originated.                                                                                                                                                               |
| `countryId`            | Country ID                 | The geographic ID of the country from which the user activity originated, derived from their IP address. Formatted according to ISO 3166-1 alpha-2 standard.                                                       |
| `deviceCategory`       | Device category            | The type of device: Desktop, Tablet, or Mobile.                                                                                                                                                                    |
| `eventName`            | Event name                 | The name of the event.                                                                                                                                                                                             |
| `minutesAgo`           | Realtime minutes ago       | The number of minutes ago that an event was collected. 00 is the current minute, and 01 means the previous minute.                                                                                                 |
| `platform`             | Platform                   | The platform on which your app or website ran; for example, web, iOS, or Android. To determine a stream's type in a report, use both platform and streamId.                                                        |
| `streamId`             | Stream ID                  | The numeric data stream identifier for your app or website.                                                                                                                                                        |
| `streamName`           | Stream name                | The data stream name for your app or website.                                                                                                                                                                      |
| `unifiedScreenName`    | Page title and screen name | The page title (web) or screen name (app) on which the event was logged.                                                                                                                                           |

### Custom Dimensions

The Realtime Data API can create reports on User scoped Custom Dimensions. See
Custom user properties to learn more about custom dimensions. Custom dimensions
are specified in an API report request by the dimension's parameter name and
scope. For example, include "customUser:last_level" in a Data API request to
create a report for the User-scoped Custom Dimension with parameter name
"last_level". This API request will fail if the property has not registered this
User-scoped Custom Dimension.

The following are the general syntax for Custom Dimensions. You can query the
Metadata API method to list all Custom Dimensions for a Property.

| Generic API Name            | Description                                      |
| :-------------------------- | :----------------------------------------------- |
| `customUser:parameter_name` | User-scoped Custom Dimension for parameter_name. |

> Event-scoped custom dimensions aren't supported in the Realtime API.

## Metrics

The following metrics can be requested in reports for any property. Specify the
"API Name" in a Metric resource's name field for a column of the metric in the
report response.

| API Name          | UI Name      | Description                                                                                                                                                                                                                                                               |
| :---------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activeUsers`     | Active users | The number of distinct users who visited your site or app.                                                                                                                                                                                                                |
| `eventCount`      | Event count  | The count of events.                                                                                                                                                                                                                                                      |
| `keyEvents`       | Key events   | The count of key events. Marking an event as a key event affects reports from time of creation. It doesn't change historic data. You can mark any event as key in Google Analytics, and some events (such as first_open or purchase) are marked as key events by default. |
| `screenPageViews` | Views        | The number of app screens or web pages your users viewed. Repeated views of a single page or screen are counted. (screen_view + page_view events).                                                                                                                        |

> Event-scoped custom metrics aren't supported in the Realtime API.
