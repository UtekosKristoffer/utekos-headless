# Custom Events

If our predefined standard events aren't suitable for your needs, you can track
your own custom events, which also can be used to define custom audiences for ad
optimization. Custom events also support parameters, which you can include to
provide additional information about each custom event.

Learn more about conversion tracking and custom events with
[Blueprint](https://www.facebookblueprint.com).

## Tracking Custom Events

You can track custom events by calling the Pixel's `fbq('trackCustom')`
function, with:

- Your custom event name
- (Optionally) A JSON object as its parameters

Just like standard events, you can call the `fbq('trackCustom')` function
anywhere between your webpage's opening and closing `<body>` tags, either:

- When your page loads
- When a visitor performs an action like clicking a button

### Example: Custom Event for Discount Sharing

Let's say you wanted to track visitors who share a promotion in order to get a
discount. You could track them using a custom event like this:

```javascript
fbq('trackCustom', 'ShareDiscount', { promotion: 'share_discount_10%' })
```

**Important:** Custom event names must be strings, and cannot exceed 50
characters in length.

---

# Custom Conversions

Each time the Pixel loads, it automatically calls `fbq('track', 'PageView')` to
track a PageView standard event. PageView standard events record the referrer
URL of the page that triggered the function call. You can use these recorded
URLs in the Events Manager to define visitor actions that should be tracked.

## Example Use Case

Let's say that you send visitors who subscribe to your mailing list to a thank
you page. You could set up a custom conversion that tracks website visitors who
have viewed any page that has `/thank-you` in its URL. Assuming your thank you
page is the only page with `/thank-you` in its URL, and you've installed the
Pixel on that page, anyone who views it will be tracked using that custom
conversion.

## Benefits

Once tracked, custom conversions can be used to:

- Optimize your ad campaigns
- Define custom audiences
- Further refine custom audiences that rely on standard or custom events

Learn more about custom conversions with
[Blueprint](https://www.facebookblueprint.com).

**Important:** Since custom conversions rely on complete or partial URLs, you
should make sure that you can define visitor actions exclusively based on unique
strings in your website URLs.

## Creating Custom Conversions

Custom conversions are created entirely within the Events Manager. Refer to our
[Advertiser Help document](https://www.facebook.com/business/help) to learn how.

---

# Rule-Based Custom Conversions

Optimize for actions and track them without adding anything to your Meta Pixel
base code. You can do this beyond the 17 standard events.

## Setup Steps

1. Create a custom conversion at `/{AD_ACCOUNT_ID}/customconversions`
2. Specify a URL, or partial URL, representing an event in `pixel_rule`. For
   example, `thankyou.html` is a page appearing after purchase
3. This records a PURCHASE conversion when `thankyou.html` displays

## Campaign Creation

You can then create your campaign using the CONVERSIONS objective.

At the ad set level, specify the same custom conversion (`pixel_id`,
`pixel_rule`, `custom_event_type`) in `promoted_object`.

---

# Custom Conversions Insights

Ads Insights returns information about Custom Conversions:

```bash
curl -i -G \
-d 'fields=actions,action_values' \
-d 'access_token=<ACCESS_TOKEN>' \
https://graph.facebook.com/v2.7/<AD_ID>/insights
```

## Response Example

Returns both standard and custom conversions:

```json
{
  "data": [
    {
      "actions": [
        {
          "action_type": "offsite_conversion.custom.17067367629523",
          "value": 1225
        },
        {
          "action_type": "offsite_conversion.fb_pixel_purchase",
          "value": 205
        }
      ],
      "action_values": [
        {
          "action_type": "offsite_conversion.custom.1706736762929507",
          "value": 29390.89
        },
        {
          "action_type": "offsite_conversion.fb_pixel_purchase",
          "value": 29390.89
        }
      ],
      "date_start": "2016-07-28",
      "date_stop": "2016-08-26"
    }
  ],
  "paging": {
    "cursors": {
      "before": "MAZDZD",
      "after": "MjQZD"
    },
    "next": "https://graph.facebook.com/v2.7/<AD_ID>/insights?access_token=<ACCESS_TOKEN>&amp;pretty=0&amp;fields=actions%2Caction_values&amp;date_preset=last_30_days&amp;level=adset&amp;limit=25&amp;after=MjQZD"
  }
}
```

## Query Specific Conversion

Custom conversions have unique IDs; query it for a specific conversion, such as
a rule-based one:

```bash
curl -i -G \
-d 'fields=name,pixel,pixel_aggregation_rule' \
-d 'access_token=ACCESS-TOKEN' \
https://graph.facebook.com/v2.7/<CUSTOM_CONVERSION_ID>
```

---

# Custom Conversions Limitations

The maximum number of custom conversions per ad account is **100**.

## Ads Insights API Restrictions

If you use Ads Insights API to get metrics on custom conversions:

- Getting product ID breakdowns are not supported
- Getting unique action counts are not supported

---

# Flagged Custom Conversions

If a custom conversion is flagged, the `is_unavailable` field will be set to
`true`.

```json
{
  "is_unavailable": true,
  "id": "30141209892193360"
}
```

## How to Resolve Flagged Custom Conversions

If any of your custom conversions are flagged for suggesting information that is
not allowed under our terms, you may want to consider the following options:

### For New Campaign Creation

**Option 1: Create new custom conversion**

- Use a new custom conversion and make sure that it does not include information
  that is not allowed under our terms

**Option 2: Choose a different custom conversion**

- Select a different existing custom conversion and make sure it does not
  include information that is not allowed under our terms

### For Existing Campaigns

**Duplicate your campaign and select an existing custom conversion**

- If you have a running campaign that is flagged due to a flagged custom
  conversion, consider duplicating the campaign and selecting a different custom
  conversion that is not flagged before publishing the new duplicated campaign
- **Note:** Once the campaign is published, you cannot remove or select a
  different custom conversion

### Request a Review

If you believe your custom conversion has been flagged in error and doesn't
include non-permitted information, you can request a review via:

- Ads Manager under the campaigns table
- Events Manager under the custom conversions page

---

# Custom Events Examples

Track a custom event specific to your website. Replace `CUSTOM-EVENT-NAME` with
your custom event name and `custom_parameter` with your custom parameter name.

```javascript
fbq('trackCustom', 'CUSTOM-EVENT-NAME', {
  custom_parameter: 'ABC',
  value: 10.0,
  currency: 'USD'
})
```

## Custom Events (Image Tag)

```html
<img
  src="https://www.facebook.com/tr?id=PIXEL-ID&amp;ev=CustomEventName&amp;cd[custom_param1]=value1&amp;noscript=1"
  height="1"
  width="1"
  style="display:none"
/>
```

---
