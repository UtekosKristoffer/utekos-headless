# Introducing Graph API v24.0 and Marketing API v24.0

**By:** Manjari Jain

Here are the highlights of the new GAPI/MAPI changes below for V24. Please visit
our changelog for a complete list of changes and details.

---

## General Updates

### Insights GraphAPI: Introducing the Content Monetization Earnings metric for Creators

From September 1, 2025, onwards we had started to default the dynamic media
media_type_automation field to OPT_IN for Advantage+ catalog ads (single image,
carousel, and collection formats). This change brings parity with Ads Manager
which has the Dynamic Media toggle set to “On” by default, increasing creative
liquidity and improving utilization of Catalog Product Video (CPV) assets to
drive better ad performance.

This change affects all Advantage+ catalog ads created using the Marketing API
after the launch date and can be applied to single image, carousel, and
collection ad formats.

- **What is the expected behavior before and after the change?** Before: Dynamic
  media is disabled by default for Advantage+ catalog ads via the API. After:
  Dynamic media will be enabled by default for these ads unless explicitly opted
  out.
- **When will developers need to implement the code changes?** Developers should
  review and update their API integrations before September 1, 2025, if they
  want to opt out of dynamic media.
- **When will they have until to implement the code changes?** The rollout is
  gradual, starting on September 1, 2025 and with 100% enforcement by October
  20, 2025.
- **Is there any recommended guidance to prepare for this change?** Partners and
  advertisers should ensure that videos are only added to product catalogs when
  they are ready for immediate ad use. Partners may also continue to utilize
  preferred_video_tags and add tags to the videos within their product catalogs.
  For more information on preferred_video_tags, please reference the Dynamic
  Media FAQ page.

**Impacted endpoints**

- `act_<AD_ACCOUNT_ID>/adcreatives`
- `act_<AD_ACCOUNT_ID>/ads`

**Link to developer documentation**

- Marketing API Developer Documentation - Dynamic Media for Advantage+ Catalog
  Ads

**Link to help article on feature**

- About Dynamic Media - Meta Business Help Center

---

## Marketing API: Field Type Enforcement for Lookalike Audience Creation

Applies to v24.0+ and will apply to all versions January 6, 2026.

The lookalike_spec field for creating a new lookalike audience is now required
to match the types stated in the documentation. Requests with a lookalike_spec
field containing invalid subfields may fail to create a new lookalike audience.

**The following endpoints are affected:**

- `POST /act_{ad-account-id}/customaudiences`

---

## Marketing API: Optimize your website destination

When you optimize your website destination, you allow us to dynamically select
where to send someone who clicks on your ad based on their intent. When your
website destination can be optimized, we’ll automatically detect and change the
default landing page URL to a more performant destination URL. This can either
be your website homepage or a product page.

**Key Updates:**

- Set up the website destination optimization, including the status in the ad
  creative to enable your ads to enroll in this optimization.

**Updating existing endpoints:**

- `POST /act_{ad_account_id}/adcreative`
- `GET /{ad-creative-id}/?fields=destination_spec`

---

## Marketing API: Introducing Limited Spend on Placements

For Graph API v24.0, we’re introducing a new feature that offers greater
flexibility when setting up your campaigns. Now, during campaign creation, if
you use placement controls to exclude certain placements for your ad sets, you
can allow up to 5% of your spend to be allocated to each excluded placement when
it’s likely to improve performance. This update allows you to allocate limited
spend to specific placements you would otherwise exclude. This feature is
available for Sales and Leads objectives.

Marketing API campaigns can now choose between fully excluding placements (the
existing method) or applying limited spend using the new placement_soft_opt_out
parameter.

### Fully opt out

There is no change in how placements are fully opted out. Continue to use the
existing Placements API. Placements opted out here will not have limited spend.

### Opt out with limited spend

To opt out of a placement with limited spend, pass the desired placement
positions within placement_soft_opt_out as a part of POST API calls. The shape
of the fields is the same as what is already supported as a part of the
Placements API.

The positions available are facebook_positions, audience_network_positions,
instagram_positions, threads_positions, and messenger_positions. See the Device,
Publisher and Positions section for more information.

- `POST act_{ad-account-id}/adsets`
- `POST {ad-set-id}`

```json
"placement_soft_opt_out": {
    "facebook_positions": [
        "marketplace",
        "profile_feed"
    ],
    "audience_network_positions": [
        "classic",
        "rewarded_video"
    ]
}
```

### Retrieve opt outs with limited spend

Query for the new field placement_soft_opt_out as a part of the GET AdSetId to
retrieve the placements which have limited spend set on a given AdSet.

- `GET {ad-set-id}?fields=placement_soft_opt_out`

**Learn more about limited spend on placements**

---

## Breaking Change in WhatsApp Templates Pagination

With the release of Meta Graph API v24, we are introducing a new error code for
the GET /<WHATSAPP_BUSINESS_ACCOUNT_ID>/message_templates endpoint. This error
will be returned when the pagination cursor provided by the client is outdated
or invalid.

**What does this mean for developers?**

- If your request includes an invalid or expired pagination cursor, the API will
  now respond with a specific error code.
- Upon receiving this error, you must restart your GET request without before
  and after parameters to obtain fresh pagination cursors.
- This update is a breaking change—existing integrations relying on previous
  cursor behavior will need to update their error handling logic to accommodate
  this new flow.

**Why this change?**

This enhancement ensures more reliable and predictable pagination, helping
clients avoid issues caused by stale cursors and improving overall data
consistency.

**Action Required:** Review your integration and update your error handling to
restart pagination from the first page when you encounter the new error code.
This will ensure continued access to WhatsApp Templates and compatibility with
v24 of the Meta Graph API.

---

## Adding the ability to “Upsert” Product Items

Starting with Graph API v24.0, users can now not only create product items using
the POST /{product-item-id} endpoint, but also update existing items. This is
achieved by adding a new functionality to “Upsert” (i.e., Update + Insert)
products with the allow_upsert parameter.

If allow_upsert is passed as true, Upsert mode will be enabled, allowing a
request with a product having an existing retailer_id to update the existing
product, and if the product does not exist, a new product will be created as
normal. If it is passed as false, it will throw an error if a product with the
retailer_id specified in the request already exists. If not specified, the
allow_upsert parameter will default to true.

---

## Consolidating the Selection of Detailed Targeting Interest Options

We are updating the detailed targeting interest options by combining some of the
interests currently available into relevant groupings.

This aims to make it easier for you to set up your campaigns, while maintaining
existing campaign performance. We will continue to maintain a wide variety of
detailed targeting interest options.

Beginning, October 8, 2025 here’s what you can expect as part of this change:

- You will start to see notifications within our ads interfaces, notifying you
  that some detailed targeting interests have been combined.
- Marketing API v24.0 will no longer support certain detailed targeting interest
  options for new campaigns. When creating new or updating an existing campaign
  with affected interest options, you will encounter an error preventing
  publishing your changes. If an interest option has been combined, the search
  results will show the new, consolidated option. Marketing API v23.0 and
  earlier versions are unaffected until January 6, 2026.
- For example, if you search for the interest “Animal ethics” it will return
  “Animal rights” because “Animal ethics” is now included under “Animal rights”
  and you can now use the “Animal rights” interest option which also includes a
  selection of related interests to reach your audience.
- Campaigns created before October 8, 2025 can continue to run. You can begin
  implementing code changes now and not be affected until January 6, 2026. After
  this date, affected interest options will be unavailable on all Marketing API
  versions. Existing campaigns using these options will stop delivering by
  January 15, 2026, unless removed or updated with the suggested combined
  options.
- For example, if you created a campaign with the interest option “Animal
  ethics” prior to October 8, 2025 you can continue using this. However you will
  either need to remove it or replace it with the suggested alternative “Animal
  rights” by January 6, 2026.
- Beginning October 8, 2025, duplicated campaigns using the affected interest
  options will automatically be replaced with suggested combined options for
  Marketing API v24.0. This functionality will be applied to all Marketing API
  versions by January 6, 2026.

**Updated Endpoints:**

- `POST {ad-account-id}/adsets`
- `POST {adset-id}`
- `POST {adset-id}/copies`
- `GET {ad-account-id}/delivery_estimate`
- `GET {ad-set-id}/delivery_estimate`
- `GET {ad-account-id}/reachestimate`
- `GET {ad-account-id}/targetingsearch`
- `GET {ad-account-id}/targetingsuggestions`
- `GET {ad-account-id}/targetingvalidation`
- `GET /search`

---

## Marketing API: Increasing daily budget flexibility

We are gradually introducing greater daily budget flexibility to some Meta Ads
Manager accounts. This means on days when better opportunities are available for
you, we may spend up to 75% over your daily budget on some days and less on
others. On a weekly basis, we won’t spend more than 7 times your daily budget.
If your campaign is less than 7 days, the total spend will not exceed your daily
budget, multiplied by the campaign duration.

**Key Updates:**

- We are increasing daily budget flexibility from 25% to 75%. This means we may
  spend up to 75% over your daily budget on days when better opportunities are
  available, and less on others.
- Your daily budget is used as an average over the seven-day calendar week from
  Sunday through Saturday. Your weekly spend will not change, and will not be
  greater than 7 times your daily budget.

**Updating existing endpoints:**

- `POST /act_{ad_account_id}/adsets`
- `POST /act_{ad_account_id}/campaigns`
- `POST /{ad_set_id}/`
- `POST /{campaign_id}/`

---

## Marketing API: Ad Set Budget Sharing

We’re excited to announce a major update to Meta’s Marketing API—the
introduction of ad set budget sharing! This new feature empowers advertisers and
developers to optimize campaign performance with greater flexibility alongside
control.

This product is expected to improve performance for campaigns using ad set
budgets (not using Advantage+ campaign budget) while ensuring that the majority
of the budget will remain in the advertiser’s control. For advertisers already
using Advantage+ campaign budget, we recommend that they continue to do so.

### What is Ad Set Budget Sharing?

Ad set budget sharing is a new budget feature that allows you to share up to 20%
of your budget with other ad sets in the same campaign. This is designed to
improve performance for campaigns that are not using a campaign budget. With
this feature, you can:

- Maintain majority of budget control at the ad set level while allowing some
  flexibility.
- Reduce manual guesswork by automating a portion of your budget allocation in
  real time, based on performance.
- Use different ad set schedules and still benefit from flexible budget
  allocation across ad sets.

This means you can control budgets for each ad set, while the system
automatically adjusts up to 20% of your ad sets’ spend in real time—helping you
capture more opportunities and improve your campaign’s overall performance.

**More About Ad set Budget Sharing Help Center Article and Ad Set Budget Sharing
Marketing API guide**

### Developer Details

1. **Is Ad Set Budget Sharing Enabled Field**
   - Field Name: IS_ADSET_BUDGET_SHARING_ENABLED
   - Type: Boolean
   - Required: NO (conditionally mandatory field in API requests starting v24)
   - How to Use:
     - Set to False to keep ad set budget sharing OFF.
     - Set to True to turn ad set budget sharing ON.
   - Example:

     **Request:**

     ```bash
     curl -X POST \
         -F 'name="My campaign"' \
         -F 'objective="OUTCOME_TRAFFIC"' \
         -F 'status="PAUSED"' \
         -F 'special_ad_categories=[]' \
         -F 'is_adset_budget_sharing_enabled'= False \
         -F 'access_token=<ACCESS_TOKEN>' \
         https://graph.facebook.com/v23.0/act_<AD_ACCOUNT_ID>/campaigns
     ```

     **Response:**

     ```json
     {
         "data": [
                 {
                     "id": [campaign ID]
                     "success": true,
                 }
             ]
     }
     ```

2. **Field Description**
   - Purpose: Controls whether the ad set participates in budget sharing.
   - Behavior: When enabled (1), up to 20% of the ad set’s daily budget can be
     dynamically shared with other ad sets in the same campaign (if campaign
     budget optimization is not used).
   - Default: If not specified, the default is False (OFF).

3. **API Release Version**
   - Available In: Marketing API +v21 (replace with actual version number)
   - Release Date: [9.3.2025]
   - Changelog Reference: [change log]

---

## Graph API: Onboard businesses with embedded signup v4

Embedded signup now enables businesses to onboard to multiple Meta Business
Messaging and advertising APIs in one streamlined flow. Supported products
include Marketing Messages Lite, Cloud API, Ads that Click to WhatsApp on
Marketing API, and Conversions API.

Embedded signup version 4 will be released on October 8th. More details about
the change and integration details can be found in the “versioning” section
within the embedded signup documentation.

---

## Limiting the request size on the Items Batch API

A new limit on the size of the requests parameter is being introduced to the
Items Batch API for creating or modifying Catalog items starting Graph API v24.
This limit is 30 MB and will be enforced in addition to the existing limit in
terms of the number of items that can be passed in a request (which remains
unchanged at 5,000). This limit has been introduced to avoid users receiving
errors sending in requests that are too large.

If you are affected by this new limit, it is recommended that you divide your
request into multiple smaller requests that satisfy the 30 MB limit.

---

## Marketing API: Upcoming updates to Custom Audience and Custom Conversion

Starting September 2, 2025, we began rolling out more proactive restrictions for
custom audiences and custom conversions that may include information not
permitted under our terms. For example, any custom audience or custom
conversions suggesting specific health conditions (e.g., “arthritis”,
“diabetes”) or financial status (e.g., “credit score”, “high income”) will be
flagged and prevented from being used to run ad campaigns.

With the upcoming release of Marketing API v24.0, we are offering more specific
guidance to help businesses as they determine how best to resolve issues
efficiently through the Marketing API if their custom audiences or custom
conversions have been flagged. Please note that review requests will continue to
be available only through our native interfaces. This update requires action
from all API users and partners.

**Is there any recommended guidance to prepare for this update?**

All partners and advertisers must continue to ensure their audiences don't share
information that is not allowed under our terms. You won’t be able to use
flagged custom audiences or custom conversions when creating new campaigns. If
you have an active campaign using flagged custom audiences or custom
conversions, you should promptly review and determine what steps to take to
resolve the issues by considering the resolution steps to help avoid delivery
and performance issues. More information on this update and guidance to help
businesses as they determine how best to resolve flagged custom audiences or
custom conversions is available in the links to resources below.

**Impacted endpoints**

_Custom Audiences -_

- `GET {custom-audience-id}`
- `POST {ad-account-id}/customaudiences`
- `POST {custom-audience-id}`
- `POST {custom-audience-id}/users`
- `POST {custom-audience-id}/usersreplace`
- `DELETE {custom-audience-id}/users`

_Ad Sets -_

- `POST {ad-account-id}/adsets`.
- `POST {adset-id}`

_Custom Conversions -_

- `POST {custom-conversion-id}`

**Link to Resources**

- **Link to developer documentation:**
  - Custom Audience
  - Custom Conversions
  - Ad Sets
- **Link to help article:**
  - Understanding restrictions on certain custom audiences
  - Understanding restrictions on certain custom conversions

---

## Deprecations & Breaking Changes

### Marketing API: Video Feed Ad Placement No Longer Available

Beginning with Marketing API v24.0, the Facebook video feeds ad placement will
no longer be available. Delivery of video feeds ad placements will be stopped
and campaign spending will be shifted to other placements automatically. After
the change, attempting to create or update an ad campaign with the Facebook
video feeds ad placement will produce an error.

**Updated endpoints:**

- `POST /act_{ad_account_id}/adsets`
- `POST /{ad_set_id}/`

### Marketing API: Discontinuation of the Click to Messenger Lead Gen Ads

The ability to create Click to Messenger lead gen (CTMLG) ads with the Marketing
API (dev documentation) is being deprecated. Businesses may still create CTMLG
ads via Ads Manager. If you have any questions or concerns about this change.

### Live Video API: "Overlay URL" Field Deprecated

The `overlay_url` field on the GET /<LIVE_VIDEO_ID> endpoint has been removed
for v24.0. It will continue to return null for v23.0 and older requests. This
field previously supported integration with the Live Producer Graphics product
from third-party video streaming apps.

### Removing conversation object from message status webhooks

After the move to per-message pricing on July 1 2025, from Graph API v24
onwards, we are removing the conversation object from the message status
webhooks for all messages that are not free entry point conversations.

Since all businesses are now charged per-message, the conversation object in the
webhook payload is not reflective of the previous conversation-based pricing
model and is being deprecated. The following fields in the webhook payload will
be impacted

- conversation_id

**Version 24.0 and higher:** The conversation object will be omitted entirely,
unless the webhook is for a free entry point conversation, in which case the
value will be unique per free entry point conversation.

**Version 23.0 and lower:** Value will now be set to a unique ID per-message,
instead of per-conversation, unless the webhook is for a free entry point
conversation, in which case the value will be unique per free entry point
conversation.

---

## Upcoming ASC and AAC MAPI deprecation, Migration Options to Advantage+

Following the launch of the streamlined Advantage+ experience for sales and app
objectives in V23.0 of the Marketing API and the planned deprecation of the
Advantage Shopping Campaigns (ASC) and Advantage App Campaign (AAC) APIs for
campaign creation in MAPI V25.0 (Q1 2026), we are launching Advantage+
Migrations to support developers in transitioning legacy ASC/AAC campaigns into
the new Advantage+ structure.

Furthermore, from V24.0 (8th October), we will no longer allow new ASC/AAC
campaigns to be created using the legacy ASC/AAC APIs. Developers may revert to
previous MAPI versions (i.e., v23.0 or less) to continue using or editing legacy
ASC/AAC APIs, however we highly recommend that developers start creating and
using Advantage+ campaigns.

Starting from 8th October, we are also making the following options available
for developers:

- Copy and Migrate using the new, optional migrate_to_advantage_plus field
  - Developers may use the existing Copies endpoint to copy their ASC campaign
    into a new campaign in the Advantage+ structure. This will yield a new
    campaign ID, and the new campaign will reflect the updated Advantage+
    structure.
  - This applies to ASC campaigns only. AAC campaigns can not be copied.
- Migrate only using the new, optional migrate_to_advantage_plus field
  - Developers may initiate a POST call on their existing ASC/AAC campaign with
    the new migrate_to_advantage_plus field to migrate the campaign into
    Advantage+ structure. This will maintain the same campaign ID, and the new
    campaign will reflect the updated Advantage+ structure.
- Manual Ads Manager Migration
  - Partners and advertisers can also choose to use the existing manual Ads
    Manager migration by editing an existing campaign. For eligible campaigns,
    making any campaign edit such as name or budget will trigger a prompt to
    upgrade to ‘Advantage + Campaign Budget’. Once the change is published it
    will migrate and will reflect the updated Advantage+ structure.
  - This method is only available where developers have the required access and
    permissions to advertisers’ Ads Manager accounts.

**Note: Not all campaigns are eligible for migration at this stage, exclusions
include;**

- Campaigns using existing_customer_budget_percentage can only be migrated to
  Advantage+ structure by duplicating the campaign in the Ads Manager. You may
  open the campaign in Ads Manager for instructions on how to duplicate into the
  Advantage+ structure. For recreating as a new campaign, please see “Replicate
  Existing Customer Budget Percentage”.
- ASC Campaigns that contain more than 50 ads in the ad set. These will still be
  editable after v25.0 of the Marketing API launches, but will be unable to be
  duplicated.

Please review the updated developer docs and FAQs to see all details of this
change.
