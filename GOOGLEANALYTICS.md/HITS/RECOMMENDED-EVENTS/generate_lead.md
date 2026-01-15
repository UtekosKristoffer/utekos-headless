# Leads

## `generate_lead`

This event measures when a lead has been generated (for example, through a
form). Log this to understand the effectiveness of your marketing campaigns and
how many customers re-engage with your business after remarketing to the
customers.

### Parameters

| Name          | Type     | Required | Example value | Description                                                                                                                                                                                                                                                                  |
| :------------ | :------- | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`    | `string` | Yes\*    | USD           | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                   |
| `value`       | `number` | Yes\*    | 30.03         | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `lead_source` | `string` | No       | Trade show    | The source of the lead.                                                                                                                                                                                                                                                      |

### Example

The following example is for Tag Manager implementations:

#### Show me the tag configuration

Tag configuration:

- Tag type: GA4 Event
- Event Name: `generate_lead`
- Event Parameters (Parameter Name \- Value):
  - `currency` \- USD
  - `value` \- 30.03
  - `lead_source` \- Trade show
- Trigger the event when a lead has been generated
-

## `generate_lead`

This event measures when a lead has been generated (for example, through a
form). Log this to understand the effectiveness of your marketing campaigns and
how many customers re-engage with your business after remarketing to the
customers.

### Parameters

| Name          | Type     | Required | Example value | Description                                                                                                                                                                                                                                                                  |
| :------------ | :------- | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`    | `string` | Yes\*    | USD           | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                   |
| `value`       | `number` | Yes\*    | 30.03         | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `lead_source` | `string` | No       | Trade show    | The source of the lead.                                                                                                                                                                                                                                                      |

### Example

The following example is for gtag.js implementations:

```javascript
gtag('event', 'generate_lead', {
  currency: 'USD',
  value: 30.03,
  lead_source: 'Trade show'
})
```

## `qualify_lead`

This event measures when a user is marked as meeting the criteria to become a
qualified lead.

### Parameters

| Name       | Type     | Required | Example value | Description                                                                                                                                                                                                                                                                  |
| :--------- | :------- | :------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency` | `string` | Yes\*    | USD           | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately.                                                   |
| `value`    | `number` | Yes\*    | 30.03         | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |

### Example

The following example is for gtag.js implementations:

```
gtag("event", "qualify_lead", {
  currency: "USD",
  value: 30.03
});
```

## `close_convert_lead`

This event measures when a lead has been converted and closed (for example, through a purchase).

### Parameters

| Name | Type | Required | Example value | Description |
| :---- | :---- | :---- | :---- | :---- |
| `currency` | `string` | Yes\* | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | Yes\* | 30.03 | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |

### Example

The following example is for gtag.js implementations:

```
gtag("event", "close_convert_lead", {
  currency: "USD",
  value: 30.03
});
```

## `close_unconvert_lead`

This event measures when a user is marked as not becoming a converted lead, along with the reason.

### Parameters

| Name | Type | Required | Example value | Description |
| :---- | :---- | :---- | :---- | :---- |
| `currency` | `string` | Yes\* | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | Yes\* | 30.03 | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `unconvert_lead_reason` | `string` | No | Never responded | The reason the lead was unconverted. |

### Example

The following example is for gtag.js implementations:

```
gtag("event", "close_unconvert_lead", {
  currency: "USD",
  value: 30.03,
  unconvert_lead_reason: "Never responded"
});
```

## `disqualify_lead`

T## `disqualify_lead`

This event measures when a user is marked as disqualified to become a lead, along with the reason for the disqualification.

### Parameters

| Name | Type | Required | Example value | Description |
| :---- | :---- | :---- | :---- | :---- |
| `currency` | `string` | Yes\* | USD | Currency of the `value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. \* If you set `value` then `currency` is required for revenue metrics to be computed accurately. |
| `value` | `number` | Yes\* | 30.03 | The monetary value of the event. \* `value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `value`. \* `currency` is required if you set `value`. |
| `disqualified_lead_reason` | `string` | No | Not looking to buy | The reason a lead was marked as disqualified. |

### Example

The following example is for Tag Manager implementations:

```javascript
gtag("event", "disqualify_lead", {
  currency: "USD",
  value: 30.03,
  disqualified_lead_reason: "Not looking to buy"
});
```


#### Tag configuration:

* Tag type: GA4 Event  
* Event Name: `disqualify_lead`  
* Event Parameters (Parameter Name \- Value):  
  * `currency` \- USD  
  * `value` \- 30.03  
  * `disqualified_lead_reason` \- Not looking to buy  
* Trigger the event when a user is marked as disqualified to become a lead for one of several reasons

