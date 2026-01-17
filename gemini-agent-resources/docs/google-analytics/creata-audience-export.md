# Create an audience export

[Audiences in Google Analytics](https://support.google.com/analytics/answer/9267572)
let you segment your users in the ways that are important to your business. With
audiences, you can group users of your site or application based on shared
attributes.

You can export your audiences, including a snapshot of their users, using the
[Data API](https://developers.google.com/analytics/devguides/reporting/data/v1/rest).

Refer to the
[Audience export data expectations](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-expectations)
guide for important information about the data you see in audience exports.

## Overview

Make the following Data API requests to create and query an audience export:

1. Call the
   [`audienceExports.create`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/create)
   method to create an audience export.
2. Call the
   [`audienceExports.query`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/query)
   method is used to retrieve the users in the audience.

For more information, you can call
[`audienceExports.get`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/get)
to retrieve configuration metadata about a specific audience export, and
[`audienceExports.list`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/list)
to list all your audience exports for a specific property.

## Select a reporting entity

All Data API methods require the
[Google Analytics property identifier](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id)
to be specified inside a URL request path, in the form of
`properties/GA_PROPERTY_ID`. Here's an example:

```
  POST  https://analyticsdata.googleapis.com/v1beta/properties/GA_PROPERTY_ID/audienceExports
```

The report is generated based on the Google Analytics event data collected in
the specified Google Analytics property.

If you're using one of the
[Data API client libraries](https://developers.google.com/analytics/devguides/reporting/data/v1/client-libraries),
you don't need to change the request URL path. Most API clients provide a
`property` parameter that expects a string in the form of
`properties/GA_PROPERTY_ID`. See
[Quick start guide](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart-client-libraries)
for examples of using the client libraries.

## Create an audience export

To create an audience export, call the
[`audienceExports.create`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/create)
method using the
[`AudienceExport`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport)
object in your request. The following parameters are required:

- A valid audience name in the
  [`audience`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport.FIELDS.audience)
  field, formatted as `properties/{propertyId}/audiences/{audienceId}`. You can
  use the
  [`audiences.list`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/properties.audiences/list)
  method of the Google Analytics Admin API v1 to obtain this value. The
  [`Audience.name`](https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1alpha/properties.audiences#Audience.FIELDS.name)
  field of the `audiences.list` response contains the audience name.
- A valid list of dimensions in the
  [`dimensions`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport.FIELDS.dimensions)
  field. The list of dimensions supported by this method can be found in the
  [Audience export schema](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-api-schema)
  documentation. Only the data for dimensions mentioned in this field is
  included in an audience export.

Here's a sample request to create an audience export:

[HTTP Request](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-request)

```
POST https://analyticsdata.googleapis.com/v1beta/properties/1234567/audienceExports
{
  "audience": "properties/1234567/audiences/12345",
  "dimensions": [
    {
      "dimensionName": "deviceId"
    }
  ]
}
```

A response of the `audienceExports.create` method contains the audience export's
name in the `name` field, for example `properties/1234567/audienceExports/123`.
Here's a sample response:

[HTTP Response](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-response)

```
{
  "response": {
    "@type": "type.googleapis.com/google.analytics.data.v1alpha.AudienceExport",
    "name": "properties/1234567/audienceExports/123",
    "audience": "properties/1234567/audiences/12345",
    "audienceDisplayName": "Purchasers",
    "dimensions": [
      {
        "dimensionName": "deviceId"
      }
    ],
    "state": "CREATING",
    "beginCreatingTime": "2023-06-22T23:35:28.787910949Z"
  }
}
```

You can use the `name` to query the users from the audience export.

## Query the audience export's readiness state

It might take several minutes to generate the audience export after the
[`audienceExports.create`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/create)
call.

You can check the readiness state of an audience export by calling the
[`audienceExports.get`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/get)
method.

Use the audience export name from an `audienceExports.create` response to
specify the audience export in your request.

Here's a sample request:

[HTTP Request](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-request)

```
GET https://analyticsdata.googleapis.com/v1beta/properties/1234567/audienceExports/123
```

The readiness state for an audience export is returned in the
[`state`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports#AudienceExport.FIELDS.state)
field of the response. Once the audience export generation is complete, its
state changes from `CREATING` to `ACTIVE`.

Here's a sample response:

[HTTP Response](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-response)

```
{
  "name": "properties/1234567/audienceExports/123",
  "audience": "properties/1234567/audiences/12345",
  "audienceDisplayName": "Purchasers",
  "dimensions": [
    {
      "dimensionName": "deviceId"
    }
  ],
  "state": "CREATING",
  "beginCreatingTime": "2023-06-22T23:35:28.787910949Z"
}
```

You can obtain the state of all audience exports by calling the
[`audienceExports.list`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/list)
method.

## Retrieve users from an audience export

Once the audience export is generated, call the
[`audienceExports.query`](https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties.audienceExports/query)
method, and specify the audience export's `name` in the request.

Here's a sample request:

[HTTP Request](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-request)

```
POST https://analyticsdata.googleapis.com/v1beta/properties/1234567/audienceExports/123:query
```

If the audience export is ready, this call returns the list of users in the
audience.

Here's a sample response:

[HTTP Response](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics#http-response)

```
{
  "audienceExport": {
    "name": "properties/1234567/audienceExports/123",
    "audience": "properties/1234567/audiences/12345",
    "audienceDisplayName": "Purchasers",
    "dimensions": [
      {
        "dimensionName": "deviceId"
      }
    ],
    "state": "ACTIVE",
    "beginCreatingTime": "2023-06-22T23:35:28.787910949Z"
  },
  "audienceRows": [
    {
      "dimensionValues": [
        {
          "value": "1000276123.1681742376"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "1000374452.1668627377"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "1000391956.1652750758"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "1000410539.1682018694"
        }
      ]
    },
    {
      "dimensionValues": [
        {
          "value": "1000703969.1666725875"
        }
      ]
    }
  ],
  "rowCount": 5
}
```
