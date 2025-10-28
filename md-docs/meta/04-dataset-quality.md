# Dataset Quality API

Advertisers that share server events using the Conversions API can see the event
match quality score in Meta Events Manager. However, this only works on an
individual basis and is difficult to scale in cases where a Tech Provider
partner, agency partner or advertiser is managing hundreds and thousands of Meta
Pixels for their businesses. The Dataset Quality (formerly known as Integration
Quality) API can help solve this problem by consolidating dataset quality
metrics programmatically at scale.

## What's New

As of May 28th, 2025, the following additional metrics have been added to the
API for querying:

- Additional Conversions Reported
- Additional Conversions Reported per parameter
- Additional Conversions Reported for per event
- Additional Conversions Reported for event coverage
- Event Coverage
- Event Deduplication
- Data Freshness
- Event Match Quality Diagnostics

Also, the Dataset Quality API for Offline Events, currently under beta, and new
metrics are now available.

## Common Use Cases

Partners and agencies may use the Dataset Quality API to:

- Provide a quality dashboard and insights
- Help their advertisers enhance and optimize their integrations
- Monitor the stability of their Conversions API integration

Advertisers may use this endpoint to aggregate dataset quality data to
incorporate in their monitoring.

## Setup Requirements

### Ownership and Access

#### Advertiser Authentication Using Meta Business Manager

1. In Business Manager, go to the **Users** section and select the **System
   User** tab
2. Click on the specific system user you are using for the Conversions API
3. Go to the **Assign Asset** dialog and choose **Pixels**
4. Select the pixels you want to send events on behalf of
5. For each pixel, select the **Manage Pixel** permission, and click **Save
   Changes**
6. Go back to your system user's details page and verify that the selected
   pixels are visible there
7. To generate the access token, follow instructions
   [here](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#access-token)

#### Partner Platform Authentication

You must first request authorization to send events on behalf of your clients.
You have the following authentication options:

##### Facebook Login for Business (Recommended)

Facebook Login for Business is the preferred authentication and authorization
solution for Tech Providers and business app developers who need access to their
business clients' assets. It allows you to specify the access token type, types
of assets, and permissions your app needs, and save it as a set (configuration).
You can then present the set to your business clients to complete the flow and
grant your app access to their business assets.

##### Meta Business Extension (Recommended)

With this option, Meta Business Extension (MBE) returns all the necessary
information needed to send events on behalf of the client. MBE provides an
endpoint to retrieve system user access tokens created in the client's Business
Manager. This process includes permissions to send server events and is done
automatically and securely. MBE is currently under beta. Please contact your
Meta representative for access.

The endpoint requires a user access token as an input parameter. If you are a
new MBE user, call this endpoint to fetch the system user access token after you
have finished setting up MBE. Existing users need to ask for re-authentication
before calling the new API endpoint.

##### Client Shares Meta Pixel to Partner's Business Manager

With this option, the client shares their Meta Pixel to the partner using
Business Manager settings or by the API. Then, the partner can assign the
partner system user to the client pixel and generate an access token to send
server events.

##### Client Generates Token Manually Using Events Manager

Advertisers can generate access tokens in Events Manager to set up the
Conversions API and access the Dataset Quality API. You can configure a direct
integration or share the generated access token with your partners to send
events to Meta. You can copy and save this new token. Note that Meta will not
store these tokens. The generated token will be able to fetch quality data and
send events using the Conversions API.

### User Permission

The user or system user used to make the API call requires (at minimum) the
following user permission: **Partial access → Use events dataset**

User access may be granted (in bulk) by using the instructions provided
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#user-permissions).

### App Permission

**Basic:** If you manage a small number of Meta datasets and/or wish to test the
Dataset Quality API, then the following app permissions are required: `ads_read`
and (`ads_management` or `business_management`).

**Advanced:** If you manage a high number of Meta datasets on behalf of other
businesses and/or require higher rate limits, then the advanced level of the
`ads_management` app permission and app feature **Ads Management Standard
Access** is required. Advanced level app permissions and features require app
review.

---

## Retrieving Dataset Quality Information

### Endpoint

```
https://graph.facebook.com/v24.0/dataset_quality
```

### Parameters

| Parameter      | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_id`   | integer | **Required.** The ID of dataset (Pixel) to retrieve quality data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `access_token` | string  | **Required.** Valid (unexpired) access token for given dataset (Pixel) ID. We recommend setting up a long-lived system user access token. Read more about different types of access tokens in our [dedicated guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `agent_name`   | string  | **Optional.** The normalized value of the `partner_agent` field is used to filter only events sent with `partner_agent` param in `/{pixel_id}/events` POST request (see attributing your events best practices [here](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices#attribution) and [here](https://www.facebook.com/business/help/2041148702652965)). For example, if your `partner_agent` value is `[partner_name]_[majorversion]_[minorVersion]`, your normalized agent string value will be `partner_name` in lowercase. The `agent_name` allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner/agency, work with your Meta representative to agree on an identifier for your platform. If you are an advertiser, most of the time you should not worry about `agent_name` attribution. If you do not provide an `agent_name`, all events regardless of whether they were sent by an agent or not, will be included in the EMQ calculation. |

### Fields

| Field                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web`                              | **array** - This field denotes a structured set of data related to website events. The filter is an array containing `event_name` and its metrics. This field is required by default in this API. See example section.                                                                                                                                                                                                                                                                                   |
| `event_name`                       | **string** - A standard event or custom event name.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `event_match_quality`              | **AdsPixelCAPIEMQ** - Event Match Quality indicates how effective the customer information sent from your server may be at matching event instances to a Facebook account. See more details [here](#emq).                                                                                                                                                                                                                                                                                                |
| `event_potential_aly_acr_increase` | **AdsPixelCAPIEventALYACR** - Additional Conversions Reported (ACR) for Conversions API Event is a metric that estimates how many conversions (for example, purchases or link clicks) are measured as a result of an advertiser's Conversions API setup. See more details [here](#additional-conversions-reported-acr-for-conversions-api-event).                                                                                                                                                        |
| `acr`                              | **AdsDatasetCAPIACR** - Additional Conversions Reported (ACR) is a metric that helps you understand how much your business benefits from using the Conversions API alongside the Meta Pixel. It also can help you determine if you can improve your Conversions API setup to measure more reported conversions. More reported conversions can help you decrease your cost per result and show your ads to people that find them relevant. See more details [here](#additional-conversions-reported-acr). |
| `event_coverage`                   | **AdsDatasetEventCoverage** - Event coverage is the 7-day average percent of Pixel events that are covered by the Conversions API, and share deduplication keys with events from the Conversions API. See more details [here](#event-coverage).                                                                                                                                                                                                                                                          |
| `dedup_key_feedback`               | **AdsDatasetDedupKeyFeedback** - Deduplication is a process used to prevent our system from counting the same event twice. In order for you to have a high event coverage, covered events must have a proper deduplication setup. Deduplication key feedback helps to identify any active issues with deduplication. See more details [here](#event-deduplication).                                                                                                                                      |
| `data_freshness`                   | **AdsDatasetDataFreshness** - Data freshness tells you how current your data is. Use this information to understand the delay between the time the event occurred and when we received it. See more details [here](#data-freshness).                                                                                                                                                                                                                                                                     |

> **Tip:** Look inside the node (follow hyperlink to the separate developers
> page) to find out all fields and child nodes for fields in the table above.

---

## EMQ

### About Event Match Quality

#### Event Match Quality

Event match quality (EMQ) is a score (out of 10) that indicates how effective
the customer information sent from your server may be at matching event
instances to a Meta account. High quality event matching may improve ads
attribution and performance.

#### How It's Calculated

Event match quality is calculated by looking at which customer information
parameters are received from your server using a Conversions API integration,
the quality of the information received and the percent of event instances that
are matched to a Meta account.

#### How It's Used

Event match quality is used to assess whether you're sending through the
Conversions API the right customer information to match your events to a Meta
account, and whether you have set up your customer information parameters
correctly. Customer information parameters help match your events to a Meta
account so you can attribute conversions to your ads and deliver them to people
who are most likely to convert. Event match quality is calculated in real time.
Learn more about EMQ best practices
[here](https://www.facebook.com/business/help/2041148702652965).

EMQ is currently available only for web events. For other event types such as
offline and physical store events, app events, conversion leads or any
integration under alpha or beta stages, contact your Meta representative for
guidance on improving match quality.

**Use case:** Monitor event match quality score per event, along with match keys
being sent, build an EMQ trendline or historical extracts, then hook up
alerts/detectors for EMQ score and match keys drops.

**Documentation:** All fields available for EMQ diagnostics can be found on this
[developer's page](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web{event_match_quality,event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_match_quality,event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'agent_name=<AGENT_NAME>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_match_quality": {
        "composite_score": 6.2,
        "match_key_feedback": [
          {
            "identifier": "user_agent",
            "coverage": {
              "percentage": 100
            }
          },
          {
            "identifier": "external_id",
            "coverage": {
              "percentage": 100
            }
          }
        ]
      },
      "event_name": "pLTVPurchase"
    },
    {
      "event_match_quality": {
        "composite_score": 7.2,
        "match_key_feedback": [
          {
            "identifier": "email",
            "coverage": {
              "percentage": 100
            }
          },
          {
            "identifier": "ip_address",
            "coverage": {
              "percentage": 99.9
            }
          }
        ]
      },
      "event_name": "CompleteRegistration"
    }
  ]
}
```

---

## Additional Conversions Reported (ACR) for Event Match Quality parameters

Additional Conversions Reported (ACR) is a metric that estimates how many
conversions (e.g. purchases or link clicks) are measured as a result of an
advertiser's Conversions API setup.

To learn more about this metric, see the
[About ACR article](https://www.facebook.com/business/help/2041148702652965) and
the [Learn More section](#additional-conversions-reported-acr).

**Use case:** For events connected to the Conversions API that have an EMQ
score, monitor the uplift in additional conversions which the Conversions API is
able to add when sending more and/or higher quality match keys.

**Documentation:** All fields available for ACR EMQ parameters can be found in
the developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web{event_match_quality{match_key_feedback{identifier,potential_aly_acr_increase{percentage,description}}},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_match_quality{match_key_feedback{identifier,potential_aly_acr_increase{percentage,description}}},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'agent_name=<AGENT_NAME>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_match_quality": {
        "match_key_feedback": [
          {
            "identifier": "email",
            "potential_aly_acr_increase": {
              "percentage": 58.96,
              "description": "Similar advertisers who sent valid Email for Purchase saw a 58.96% median increase in their existing additional conversions reported."
            }
          },
          {
            "identifier": "ip_address",
            "potential_aly_acr_increase": {
              "percentage": 20.65,
              "description": "Similar advertisers who sent valid Ip Address for Purchase saw a 20.65% median increase in their existing additional conversions reported."
            }
          }
        ]
      },
      "event_name": "Purchase"
    }
  ]
}
```

---

## EMQ Diagnostics

Event match quality diagnostics are issues we've identified with your
Conversions API integration. Follow the provided recommendations to send higher
quality match keys, optimize your ad performance and improve your EMQ score.

**Use case:** Extract and store EMQ diagnostics in your environment, set up
notifications using channels like email, messenger or in-app notifications in
order to resolve issues reactively.

**Documentation:** All fields available for EMQ diagnostics can be found in the
developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web{event_match_quality{diagnostics},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_match_quality{diagnostics},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'agent_name=<AGENT_NAME>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_match_quality": {
        "diagnostics": [
          {
            "name": "Update your IPv4 IP addresses to IPv6 IP addresses",
            "description": "Your server is sending IPV4 IP addresses through the Conversions API. We recommend updating to IPV6 IP addresses because this is the industry standard and offers better durability for this integration.",
            "solution": "You can update your web server and DNS provider configuration to support IPv6. In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it's sent to Meta. If this issue is not applicable or actionable, you can ignore it.",
            "percentage": 59.5,
            "affected_event_count": 18930,
            "total_event_count": 31830
          },
          {
            "name": "Server sending mismatched IP addresses",
            "description": "Your server is sending client IP addresses that do not match those from Meta Pixel. This may impact the attribution and optimization of your ad campaigns.",
            "solution": "In your server payload, send the client_ip_address retrieved from customer interactions. Use the payload helper to see how this value should be structured when it's sent to Meta.",
            "percentage": 61.5,
            "affected_event_count": 19567,
            "total_event_count": 31830
          }
        ]
      },
      "event_name": "Purchase"
    }
  ]
}
```

---

## Event Coverage

Event coverage is the 7-day average percentage of Meta Pixel events that are
covered by the Conversions API, and share deduplication keys with events from
the Conversions API.

Learn more about event coverage best practices by reading this
[Business Help Center article](https://www.facebook.com/business/help/2041148702652965).

**Use case:** Evaluate the events which are connected by server versus those
which are not. For example, if an advertiser has three events, ViewContent,
AddToCart and Purchase, but only Purchase is sent by server, the event coverage
will be 33%.

**Documentation:** All fields available for event coverage can be found in the
developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web{event_coverage{percentage,goal_percentage,description},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_coverage{percentage,goal_percentage,description},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_coverage": {
        "percentage": 34.1,
        "goal_percentage": 75,
        "description": "The percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel."
      },
      "event_name": "B2B Purchase"
    }
  ]
}
```

---

## Additional Conversions Reported (ACR) for Event Coverage

Additional Conversions Reported (ACR) for Event Coverage is a metric that helps
you understand how much your business benefits from using the Conversions API
alongside the Meta Pixel. For event coverage, you can see the potential
improvement in additional conversions reported if the event coverage and
deduplication both meet the best practices.

To learn more about additional conversions reported, see the
[About ACR article](https://www.facebook.com/business/help/2041148702652965) and
the [Learn More section](#additional-conversions-reported-acr).

**Use case:** For events connected to the Conversions API that have event
coverage below 75% threshold, monitor the uplift in additional conversions which
the Conversions API is able to add when covering more events (increasing server
versus browser ratio).

**Documentation:** All fields available for ACR for Event Coverage can be found
in the developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web{event_coverage{potential_aly_acr_increase{percentage,description}},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_coverage{potential_aly_acr_increase{percentage,description}},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_coverage": {
        "potential_aly_acr_increase": {
          "percentage": 35.8,
          "description": "Similar advertisers who send the same AddToCart pixel events with matching deduplication keys through Conversions API saw a median of 35.8% additional conversions reported versus those that only used Meta Pixel."
        }
      },
      "event_name": "AddToCart"
    }
  ]
}
```

---

## Event Deduplication

The Meta Pixel and the Conversions API enable you to share standard and custom
events with Meta so you can measure and optimize ad performance. The Pixel
enables you to share web events from a web browser, while the Conversions API
enables you to share web events directly from your server.

If you connect website activity using both the Pixel and the Conversions API, we
may receive the same events from the browser and the server. If we know that the
events are the same and therefore redundant, we can keep one and discard the
rest. This is called deduplication.

The deduplication key feedback shows the percentages of events from the Pixel
and the Conversions API that were received with each deduplication key. We
recommend sharing deduplication keys for all of your events – the higher the
percentage, the better.

To learn more about deduplication best practices, see the
[Business Help Center article](https://www.facebook.com/business/help/2041148702652965).

**Use case:** Monitor the rate of deduplication between browser and server
events to help to increase event coverage rate for your Conversions
API-connected events.

**Documentation:** All fields available for dedupe key feedback can be found in
the developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web{dedupe_key_feedback{dedupe_key,browser_events_with_dedupe_key{percentage,description},server_events_with_dedupe_key{percentage,description},overall_browser_coverage_from_dedupe_key{percentage,description}},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{dedupe_key_feedback{dedupe_key,browser_events_with_dedupe_key{percentage,description},server_events_with_dedupe_key{percentage,description},overall_browser_coverage_from_dedupe_key{percentage,description}},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'agent_name=<AGENT_NAME>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "dedupe_key_feedback": [
        {
          "dedupe_key": "event_id",
          "browser_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 14.8,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        },
        {
          "dedupe_key": "external_id",
          "browser_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 100,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 15.96,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        },
        {
          "dedupe_key": "fbp",
          "browser_events_with_dedupe_key": {
            "percentage": 0,
            "description": "The percentage of browser events that contain this dedupe key."
          },
          "server_events_with_dedupe_key": {
            "percentage": 0,
            "description": "The percentage of server events that contain this dedupe key."
          },
          "overall_browser_coverage_from_dedupe_key": {
            "percentage": 0,
            "description": "The overall percentage of browser events that are deduped with Conversions API events using this key. This percentage is incremental for each dedupe key."
          }
        }
      ],
      "event_name": "AddToCart"
    }
  ]
}
```

---

## Data Freshness

Data freshness indicates the delay between the time the event occurred and when
we received it. Best practice is to share your events in real time, or as close
to real time as possible.

The Meta Pixel defaults to sending web browser events in real time. To get the
most value from your events, we recommend you send them in real time or as close
to real time as possible. Events sent with a delay may impact how effectively
your ads can be delivered to the right audiences.

To learn more about data freshness best practices, see the
[Business Help Center article](https://www.facebook.com/business/help/2041148702652965).

**Use case:** Evaluate how quickly events are received from server versus
browser. Improve frequency to `real_time` when possible to get the most value
from your event data.

**Documentation:** All fields available for data freshness can be found in the
developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&agent_name=<AGENT_NAME>&access_token=<ACCESS_TOKEN>&fields=web{data_freshness{upload_frequency,description},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{data_freshness{upload_frequency,description},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'agent_name=<AGENT_NAME>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "data_freshness": {
        "upload_frequency": "real_time",
        "description": "The average frequency with which instances of this event are received through the Conversions API."
      },
      "event_name": "ViewContent"
    },
    {
      "data_freshness": {
        "upload_frequency": "hourly",
        "description": "The average frequency with which instances of this event are received through the Conversions API."
      },
      "event_name": "Lead"
    }
  ]
}
```

---

## Additional Conversions Reported (ACR) for Conversions API Event

Additional Conversions Reported (ACR) for Conversions API Event is a metric that
estimates how many conversions (for example, purchases or link clicks) are
measured as a result of an advertiser's Conversions API setup.

To learn more about additional conversions reported, see the
[About ACR article](https://www.facebook.com/business/help/2041148702652965) and
the [Learn More section](#additional-conversions-reported-acr).

**Use case:** For Meta Pixels not connected to the Conversions API, extract the
additional conversions reported metric to estimate the impact a Conversions API
integration may have.

**Documentation:** All fields available for ACR for Conversion API event can be
found in the developer documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web{event_potential_aly_acr_increase{description,percentage},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{event_potential_aly_acr_increase{description,percentage},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "event_potential_aly_acr_increase": {
        "description": "Similar advertisers who set up Conversions API for Search events saw a median of 32.9% additional conversions reported versus those that only used Meta Pixel.",
        "percentage": 32.9
      },
      "event_name": "Search"
    },
    {
      "event_potential_aly_acr_increase": {
        "description": "Similar advertisers who set up Conversions API for PageView events saw a median of 30.1% additional conversions reported versus those that only used Meta Pixel.",
        "percentage": 30.1
      },
      "event_name": "PageView"
    }
  ]
}
```

---

## Additional Conversions Reported (ACR)

Additional Conversions Reported (ACR) is a metric that helps you understand how
much your business benefits from using the Conversions API alongside the Meta
Pixel. It also can help you determine if you can improve your Conversions API
setup to measure more reported conversions. More reported conversions can help
you decrease your cost per result and show your ads to people that find them
relevant.

To learn more about additional conversions reported, see the
[About ACR article](https://www.facebook.com/business/help/2041148702652965) and
the Learn More section.

**Use case:** For events connected to the Conversions API and have an EMQ score,
monitor the uplift in additional conversions which the Conversions API is able
to drive.

**Documentation:** All fields available for ACR can be found in the developer
documentation
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters).

### Example

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&access_token=<ACCESS_TOKEN>&fields=web{acr{description,percentage},event_name}
```

**cURL**

```bash
curl -X GET -G \
    -d 'fields=web{acr{description,percentage},event_name}' \
    -d 'dataset_id=<DATASET_ID>' \
    -d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/<LATEST_VERSION>/dataset_quality
```

**API Response**

```json
{
  "web": [
    {
      "acr": {
        "description": "In the last 7 days, you saw about 37.9% more conversions reported for Search events by using the Conversions API alongside the Meta Pixel.",
        "percentage": 37.9
      },
      "event_name": "Search"
    },
    {
      "acr": {
        "description": "In the last 7 days, you saw about 45.5% more conversions reported for Page View events by using the Conversions API alongside the Meta Pixel.",
        "percentage": 45.5
      },
      "event_name": "PageView"
    }
  ]
}
```

---

# Dataset Quality API for Offline Events

> **Note:** This API is under beta. For access, please contact your Meta
> representative.

Dataset Quality API for offline events provides a breakdown of the score and
recommendations by several quality dimensions, including match key coverage,
frequency, and freshness. An optimal event setup allows for the collection of
high-quality data, which is essential for the ad system's performance.

A high-quality Conversions API multichannel setup will enable advertisers to use
omnichannel ads, which is the solution that lets you drive in-store and website
sales using one sales campaign.

## Common Use Cases

Partners and agencies may use the Dataset Quality API to:

- Provide a quality dashboard and insights
- Help their advertisers enhance and optimize their integrations
- Monitor the stability of their Conversions API integration

Advertisers may use this endpoint to aggregate dataset quality data to
incorporate in their monitoring.

## Setup Requirements

### Ownership and Access

#### Advertiser Authentication Using Business Manager

1. In Business Manager, go to the **Users** section and select the **System
   User** tab
2. Click on the specific system user you are using for the Conversions API
3. Go to the **Assign Asset** dialog and choose **Pixels**
4. Select the pixels you want to send events on behalf of
5. For each pixel, select the **Manage Pixel** permission, and click **Save
   Changes**
6. Go back to your system user's details page and verify that the selected
   pixels are visible there
7. To generate the access token, follow instructions
   [here](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#access-token)

#### Partner Platform Authentication

You must first request authorization to send events on behalf of your clients.
You have the following authentication options:

##### Facebook Login for Business (Recommended)

Facebook Login for Business is the preferred authentication and authorization
solution for tech providers and business app developers who need access to their
business clients' assets. It allows you to specify the access token type, types
of assets, and permissions your app needs, and save it as a set (configuration).
You can then present the set to your business clients to complete the flow and
grant your app access to their business assets.

##### Meta Business Extension (Recommended)

With this option, Meta Business Extension (MBE) returns all the necessary
information needed to send events on behalf of the client. MBE provides an
endpoint to retrieve system user access tokens created in the client's Business
Manager. This process includes permissions to send server events and is done
automatically and securely. MBE is currently under beta. Please contact your
Meta representative for access.

The endpoint requires a user access token as an input parameter. If you are a
new MBE user, call this endpoint to fetch the system user access token after you
have finished setting up MBE. Existing users need to ask for re-authentication
before calling the new API endpoint.

##### Client Sharing of a Meta Pixel to Partner's Business Manager

With this option, the client shares their Meta Pixel to the partner using
Business Manager settings or by the API. Then, the partner can assign the
partner system user to the client pixel and generate an access token to send
server events.

### User Permission

The user or system user used to make the API call requires (at minimum) the
following user permission: **Partial access → Use events dataset**

User access may be granted (in bulk) by using the instructions provided
[here](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started#user-permissions).

### App Permission

**Basic:** If you manage a small number of Meta datasets and/or wish to test the
Dataset Quality API, then the following app permissions are required: `ads_read`
and (`ads_management` or `business_management`).

**Advanced:** If you manage a high number of Meta datasets on behalf of other
businesses and/or require higher rate limits, then the **Advanced Level** of the
`ads_management` app permission and app feature **Ads Management Standard
Access** is required. Advanced Level app permissions and features require app
review.

---

## Retrieving Quality Information for Offline Events

You can monitor data quality score per offline event, along with match keys
being sent, using the following API endpoint, parameters and fields:

### API Call

**Endpoint:** `https://graph.facebook.com/v23.0/dataset_quality`

To get dataset quality metrics for a dataset, make a GET request to the
`dataset_quality` endpoint with the following parameters:

### Parameters

| Parameter      | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataset_id`   | integer | **Required.** The ID of dataset (Pixel) to retrieve quality data.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `access_token` | string  | **Required.** Valid (unexpired) access token for given dataset (Pixel) ID. We recommend setting up a long-lived system user access token. Read more about different types of access tokens in our [dedicated guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `agent_name`   | string  | **Optional.** The normalized value of the `partner_agent` field is used to filter only events sent with `partner_agent` param in `/{pixel_id}/events` POST request (see attributing your events best practices [here](https://developers.facebook.com/docs/marketing-api/conversions-api/best-practices#attribution) and [here](https://www.facebook.com/business/help/2041148702652965)). For example, if your `partner_agent` value is `[partner_name]_[majorversion]_[minorVersion]`, your normalized agent string value will be `partner_name` in lowercase. The `agent_name` allows you to set your own platform identifier when sending events on behalf of a client. If you are a managed partner/agency, work with your Meta representative to agree on an identifier for your platform. If you are an advertiser, most of the time you should not worry about `agent_name` attribution. If you do not provide an `agent_name`, all events regardless of whether they were sent by an agent or not, will be included in the EMQ calculation. |

### Fields

| Field        | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `offline`    | **array** - This field denotes a structured set of data related to offline events. The filter is an array containing `event_name` and its metrics. This field is required by default in this API. See example section.                                                                                                                                                                                                                 |
| `event_name` | **string** - A standard event or custom events.                                                                                                                                                                                                                                                                                                                                                                                        |
| `composite`  | **float** - The composite Data Quality Score for the offline events. To calculate the data quality score, we consider factors such as data freshness, frequency and attribution over the last 28 days. These factors, each weighted differently, combine to give a score out of 10. **Note:** A composite score of 8.5 or higher allows the access to use of omnichannel ads, ensuring ads reach the right audience at the right time. |
| `match_key`  | **integer** - The match_key score provides recommendations on how to improve that score and also the match key coverage for both email and phone. It gives a score out of 10.                                                                                                                                                                                                                                                          |
| `frequency`  | **integer** - The frequency score metric measures how often you send data, recommendation on how to improve the score. It gives a score out of 10.                                                                                                                                                                                                                                                                                     |
| `freshness`  | **integer** - The freshness score shows how real time your data is, and shares the recommendations on how to improve the score.                                                                                                                                                                                                                                                                                                        |

---

## Examples

### Example 1: Basic Offline Events Query

**Graph API Explorer**

```
GET /v24.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline
```

**cURL**

```bash
curl -X GET \
https://graph.facebook.com/v23.0/dataset_quality?dataset_id=<DATASET_ID> \
-F 'agent_name="My Agent Name"' \
-F 'fields="offline"' \
-F 'access_token=<ACCESS_TOKEN>'
```

**Sample Response**

```json
{
  "offline": [
    {
      "event_name": "Purchase",
      "composite": {
        "score": 6.6,
        "recommendation": "Your offline data quality score is ok, but could be improved."
      },
      "match_key": {
        "score": 5.6,
        "recommendation": "Sending email and phone number parameters can help improve your match key score."
      },
      "frequency": {
        "score": 4.6,
        "recommendation": "Sharing your offline data more often can help improve your frequency score and help you get better ad outcomes."
      },
      "freshness": {
        "score": 2.2,
        "recommendation": "Sending your most recent offline conversion data sooner can help improve your score and help you get better ad outcomes."
      }
    }
  ]
}
```

---

### Example 2: Event Names and Composite Scores Only

**Scenario:** You only want the event names and the composite scores for each
event.

**Graph API Explorer**

```
GET /v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline{event_name,composite}
```

**Sample Response**

```json
{
  "offline": [
    {
      "event_name": "Purchase",
      "composite": {
        "score": 6.6,
        "recommendation": "Your offline data quality score is ok, but could be improved."
      }
    }
  ]
}
```

---

### Example 3: Event Names and Match Key Details

**Scenario:** You only want the event names and the match key scores,
recommendations, coverages for each event.

**Graph API Explorer**

```
GET /v23.0/dataset_quality?dataset_id=<DATASET_ID>&fields=offline{event_name,match_key}
```

**Sample Response**

```json
{
  "offline": [
    {
      "event_name": "Purchase",
      "match_key": {
        "score": 6.6,
        "recommendation": "Send email and phone parameters to help improve your match key score.",
        "coverage": {
          "email": 100.0,
          "phone": 90.0
        }
      }
    }
  ]
}
```

---

## Error Codes

The following error codes may be returned when creating a dataset:

| Error Code | Description                                              |
| ---------- | -------------------------------------------------------- |
| `2044055`  | The `dataset_id` that was inputted doesn't exist.        |
| `10`       | The application doesn't have permission for this action. |

---

## Other Resources

### Dataset Quality API

- [Dataset Quality API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api/datasets)

### Omnichannel Ads

- [Omnichannel Ads Overview](https://www.facebook.com/business/help/omnichannel)
- [Omni Optimal Technical Setup Guide](https://www.facebook.com/business/help/omnichannel-setup)

### Conversions API

- [Conversions API for Offline Events](https://developers.facebook.com/docs/marketing-api/conversions-api/offline-events)

### Business Help Center Articles

- [About datasets in Meta Events Manager](https://www.facebook.com/business/help/datasets)
- [About Offline Dataset Quality](https://www.facebook.com/business/help/offline-dataset-quality)
- [How to create datasets in Meta Events Manager](https://www.facebook.com/business/help/create-datasets)

### Other Resources

- [Overview of the Graph API](https://developers.facebook.com/docs/graph-api/overview)
- [Ad Permissions and Access](https://developers.facebook.com/docs/marketing-api/overview/authorization)
