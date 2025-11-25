# About Maximizing the Value of Conversions

## Overview

When you optimize for value, we use machine learning to predict how much return
on ad spend (ROAS) a person may generate. We then use this prediction to bid for
your highest value customers. By bidding more for people who are likely to
generate higher value for your business, you can help ensure you are maximizing
the value of conversions for your campaigns.

## Key Definitions

### Value

The value of the value parameters you set for a given conversion event, where
conversion events include:

- All standard events (like purchase, in-app ad impressions)
- Custom events

Value is measured within a day or a week (depending on which attribution setting
you choose).

### Optimization

The result our delivery system is working to get for you. If you meet the
eligibility requirements for maximize value of conversions, you can make this
selection as your performance goal when creating your ad set.

## Best Practices for Maximizing Value of Conversions

If you can maximize value of conversions, we recommend that you do. You'll be
more likely to have better ROAS and conversions you care about.

### Viewing Results

- Make sure you're viewing the value column in Meta Ads Reporting for your
  conversion event
- You may need to customize your columns to see this metric
- To view In-app ad ROAS in Meta Ads Reporting:
  - Calculate a custom metric, or
  - Manually calculate using the formula:
    `in-app ad impressions value ÷ ad spend`

### iOS 14+ Campaign Setup

When you create an iOS 14+ app promotion campaign:

1. Select **Aggregated Event Measurement** as the campaign attribution method
2. This provides access to 7-day click attribution settings
3. This enables delivery to Audience Network

## Considerations for Maximize Value of Conversions

### ROAS Goal Setting

- You can set a ROAS goal when you select **In-app purchase** as your conversion
  event
- This tells our delivery system to try to deliver against that over the
  campaign's lifetime
- The system dynamically bids as high as needed to maximize results
- If you don't enter a ROAS goal, you'll bid using the highest value bid
  strategy

**Note:** You can't set a ROAS goal when you optimize for in-app ad impressions
at this time. ROAS goal is only available when you optimize for in-app
purchases.

### How It Works

- Maximizing value of conversions still gets you conversions
- However, it can tell the difference between higher-value conversions and
  lower-value ones
- It prioritizes higher-value ones, which can lead to better return on ad spend

### Cost Implications

Maximizing value of conversions could lead to a higher average cost per result
compared to maximizing the number of conversions. Remember that this type of
optimization is about:

- ✅ Finding the purchase or ad impression conversions that are likely to get
  you the highest value (within the constraint of your budget)
- ❌ **Not** finding the least expensive purchase or ad impression conversions

### Strategic Choice

If you're still not sure if maximize value of conversions is right for you, you
could think of it as a choice between:

| Strategy                           | Focus                                         | Result                                     |
| ---------------------------------- | --------------------------------------------- | ------------------------------------------ |
| **Maximize Number of Conversions** | Lower average cost per conversion             | More conversions at lower individual value |
| **Maximize Value of Conversions**  | Higher average amount of value per conversion | Fewer but higher-value conversions         |

### Example Decision

**Choose the $2 conversion with a $10 value over the $1 conversion with a $2
value**, as it offers a higher ROAS despite a higher cost per result.

## Important Notes

### Platform-Specific Requirements

#### iOS 14.5 and Later

To continue using maximize value of conversions and reach people on iOS 14.5 and
later devices:

- Turn on maximize value of conversions in your event configuration in Events
  Manager
- You need to turn on maximize value of conversions in your app event
  configuration for SKAdNetwork
- You don't need to turn on maximize value of conversions for events sent
  through Aggregated Event Measurement
- Learn how to set up maximize value of conversions in your SKAdNetwork
  configuration

#### Android

Maximizing value of conversions for in-app ad impressions is currently only
available for Android.

### Feature Access

To keep our platform safe from harm and to prevent advertising abuse, we only
grant access to some features when an advertiser has met certain requirements.
This means:

- When you create a new business portfolio or ad account, you may not have
  access to all advertising features
- You can see what features you currently have access to in Business Support
  Home
- You can find out what actions you may need to take to access additional
  features in Business Support Home
