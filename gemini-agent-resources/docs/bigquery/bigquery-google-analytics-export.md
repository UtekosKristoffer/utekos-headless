# BigQuery Export: Google Analytics 4 to BigQuery

## Overview

BigQuery is a cloud data warehouse that lets you run highly performant queries
of large datasets. You can export all raw events from Google Analytics
properties (including subproperties and roll-up properties) to BigQuery, then
query that data using SQL-like syntax.

### Key Benefits

- **Data ownership**: When you export data to BigQuery, you own that data
- **Access control**: Use BigQuery ACLs to manage permissions on projects and
  datasets
- **Full data access**: Export all raw events from GA4 properties
- **External integration**: Combine Analytics data with external data sources

### Export Schedule

- Full export occurs once daily
- Continuous data export throughout the day via streaming
- Standard properties limited to 1M events/day

## BigQuery Export Types

| Export Type                      | Best For                                             | Export Details                                                                                                                               | Limits                                                                            | Caveats                                                         |
| -------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Daily Export** (Standard, 360) | Complete data for previous day; don't need fast data | • Exports all raw, unsampled event data once per day<br>• Typically mid-afternoon in property timezone<br>• Last click observed, no modeling | **Standard**: up to 1M events/day with filtering<br>**360**: up to 20B events/day | Some data (like user attribution) may be delayed up to 24 hours |
| **Fresh Daily** (360 only)       | Faster, more complete data throughout the day        | • Data typically by 5am<br>• Batched updates ~60 min<br>• Same schema as daily<br>• Last click observed                                      | Not available for XL properties                                                   | Only for "Normal" and "Large" 360 properties                    |
| **Streaming** (Standard, 360)    | Near real-time data (within minutes)                 | • Real-time export<br>• Best-effort (no completeness SLO)<br>• May contain data gaps                                                         | No volume limits                                                                  | New user/session traffic source data excluded                   |

## Key Differences from GA Interface

BigQuery export provides **raw event and user-level data** without GA's value
additions. Data may differ from GA interface reports.

**See:** [Bridging the gap between Google Analytics UI and BigQuery
export](internal link)

## Export Tables

### Streaming Export Tables

- **`events_intraday_YYYYMMDD`**: Internal staging table with current day's data
  - Updated continuously 12:00am - 11:59pm (property timezone)
  - Deleted when daily export completes
  - Best-effort basis (may have gaps)

### Daily Export Tables

- **`events_YYYYMMDD`**: Complete daily export
  - Created after all events collected for the day
  - Updated for up to 2 calendar days + today
  - Query this instead of intraday for stable datasets

## Streaming Export Limitations

**Excluded user-attribution data for new users:**

- `traffic_source.name` (User campaign)
- `traffic_source.source` (User source)
- `traffic_source.medium` (User medium)

**Note:** Existing user attribution data included but requires ~24 hours to
process. Use daily export for user attribution data.

## Fresh Daily Export (GA360)

- Available independently alongside Daily and Streaming
- Requires billing setup on Google Cloud Platform
- Includes **completeness signal** when previous day's data fully exported

### Accessing Completeness Signal

1. Sign in to Cloud Logging → "Logs Explorer"
2. Search for "export complete"
3. Check around 5am in property timezone
4. Available in Log Router → can push to Cloud Pub/Sub

**Caution:** Signal may be missing/inaccurate first day after:

- Property timezone changes
- BigQuery link creation

## Table Update Schedule

**Governed by property timezone** - timezone changes impact exports and may
cause data discrepancies or skipped exports.

**Streaming tables** (`events_intraday_YYYYMMDD`):

- Updated continuously 12:00am - 11:59pm (property timezone)
- New day = new intraday table

**Daily tables** (`events_YYYYMMDD`):

- Created after day's events collected
- Updated through 2 calendar days + today with late events
- Occasional updates beyond window for reprocessing (bug fixes)

## Cookieless Pings & Customer Data

When consent mode implemented:

- Cookieless pings present in BigQuery export
- Includes customer-provided data (user_id, custom dimensions)

## Backfilling Traffic Source Data

For "Not Available" traffic source dimensions, lookup using GCLID from
`collected_traffic_source` column.

**Note:** wBRAID and gBRAID identifiers not included in BigQuery Export.

### Lookup Resources:

- Google Ads API
- Google Ads Scripts
- BigQuery Data Transfer Service for Google Ads

**See:** [Backfill Google Ads traffic source data (GA360)](internal link)

## Firebase Integration

**Important:** Integrated GA property + Firebase project cannot link to separate
BigQuery projects.

## Costs

**Additional BigQuery costs for streaming:** $0.05 per GB

- ~600,000 GA events per GB (varies by event size)

**Standard exports:** Only standard BigQuery storage/processing costs

[Learn more about BigQuery pricing](external link)

## Important Notes

- Raw event data only (no product data from linked sources)
- Cannot re-export data once exported to BigQuery
- Standard properties: 1M event daily limit
- Use BigQuery ACLs to manage permissions
- Free BigQuery sandbox available (charges for exceeding limits)

## Related Resources

- [BigQuery Developers Guide](external link)
- [Google Analytics and BigQuery](external link)
- [BigQuery Export schema](external link)
- [BigQuery ACLs](external link)
- [BigQuery syntax](external link)
