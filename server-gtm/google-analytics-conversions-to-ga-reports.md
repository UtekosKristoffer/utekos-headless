# Add Google Analytics Data to Google Ads Reports

## Prerequisites

Before you can add Google Analytics data to your Google Ads reports, complete
the following steps:

1. **Enable auto-tagging** in your Google Ads accounts
2. **Link Google Analytics 4 properties and Google Ads**
   - Ensure you import site metrics for the view you want to see in your Google
     Ads account
3. **Activate Google signals** to import cross-device conversions from Google
   Analytics
4. **Verify import status**
   - Go to Google Ads → Click Admin icon → Select "Linked accounts" → Click
     "Google Analytics"
   - Check the status message in the "Actions" column to confirm data was
     imported

> **Note:** In most cases, data becomes visible in Google Ads within an hour,
> but larger accounts may take longer.

## How to Add Google Analytics Reporting Columns

1. Navigate to the tab where you want to add columns: **Campaigns**, **Ad
   groups**, **Ads**, or **Search keywords**
2. Click the **Columns** icon (labeled "Modify columns for campaigns")
3. Select **Google Analytics** from the dropdown options
4. Check the boxes next to each column you want to add
5. Click **Apply**

Your Google Analytics data will now appear in your Google Ads reports.

## How It Works

Once you've enabled auto-tagging, linked your accounts, and selected Google
Analytics views, you can add Google Analytics columns to your reports. These
metrics help you understand user behavior after they click your ads:

### Key Metrics (GA4)

- **% Engaged sessions:** Percentage of sessions where users were actively
  engaged (default: 10+ seconds)
- **Events per session:** Average number of events triggered per session
- **Avg. engagement duration per session:** Total active time spent on your
  site/app (in seconds)

### Why This Matters

Viewing Google Analytics engagement metrics alongside Google Ads performance
stats reveals what happens after users click your ads. This information helps
you:

- Assess campaign and ad group effectiveness
- Make informed decisions about budgets, bids, landing pages, and ad text
- Identify opportunities for optimization

### Example Use Case

**Scenario:** Dan sells flowers online and runs two ad groups:

- "Birthday bouquets"
- "Birthday flower arrangements"

**Initial observation:** The "bouquet" ad group has higher CTR (8%) compared to
"flower arrangements" (6%).

**After adding Bounce Rate column:**

| Ad Group Theme               | Impressions | CTR | Ad Clicks | Bounce Rate | Users Who Don't Bounce |
| ---------------------------- | ----------- | --- | --------- | ----------- | ---------------------- |
| Birthday bouquets            | 1,000       | 8%  | 80        | 60%         | 32                     |
| Birthday flower arrangements | 1,000       | 6%  | 60        | 30%         | 42                     |

**Insight:** Despite fewer clicks, the "flower arrangements" ad group is more
valuable because users stay to explore the site (lower bounce rate).

## Important Considerations

### Data Limitations

- **Historical data:** As of October 2019, Google Analytics data prior to May
  2016 is not available in Google Ads. Access older data directly in Google
  Analytics.
- **Visibility:** Everyone with access to your Google Ads account can see
  imported Google Analytics metrics
- **View linking:** Link your Google Ads account to all relevant Google
  Analytics views
  - Example: If ads target landing pages on 4 different websites, link to a view
    for each site
- **Import limits:** One view per property, maximum 10 properties
- **Tracking requirements:** Tag every page you want to track in Google
  Analytics for complete data
- **Mobile apps:** Mobile app property metrics cannot be imported
- **Segmentation:** You cannot segment Google Analytics metrics by some
  dimensions (e.g., device)

### Data Discrepancies Between Google Ads and Google Analytics

Differences may occur due to:

1. **Clicks vs. Sessions:**
   - Multiple clicks on the same ad in one session = multiple clicks in Google
     Ads, one session in Analytics
   - Users returning via bookmark = one click in Google Ads, multiple sessions
     in Analytics
   - Stopped page loads = click in Google Ads, no session in Analytics

2. **Invalid clicks:** Google Ads automatically filters invalid clicks from
   reports

3. **Date ranges:** Long date ranges may include periods when accounts weren't
   linked

### Data Availability and Freshness

- **Historical access:** Google Analytics data in Google Ads is available from
  May 2016 onward
- **Import time:** Typically less than one hour; may take longer for larger
  accounts
- **Data collection start:** Google Analytics begins storing Google Ads-specific
  data once accounts are linked
- **Processing delay:** Up to 24 hours for all data to be fully updated

**Example:** If you linked accounts on May 1 and imported data on May 15,
reports will include data back to May 1.

## Troubleshooting

- **Fix a linking issue:** Review connection settings
- **Need help?** Contact Google Ads support

## Related Resources

- [About Google Analytics data in Google Ads reports](https://support.google.com/google-ads/answer/6209127)
- [Product linking: Link Google Analytics 4 properties and Google Ads](https://support.google.com/analytics/answer/9379420)
- [Import Google Analytics conversions into Google Ads](https://support.google.com/google-ads/answer/6331304)
