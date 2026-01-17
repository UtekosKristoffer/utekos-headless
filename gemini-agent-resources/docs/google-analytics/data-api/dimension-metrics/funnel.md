# Dimensions & Metrics: Funnel Reports

## Overview

This reference documents dimensions and metrics supported in Analytics Data API
funnel reports. Specify the "API Name" in a Dimension resource's `name` field
when making API requests.

---

## Dimensions

### Standard Dimensions

#### Achievement & Game Events

| API Name        | UI Name        | Segments | Description                                                                                   |
| --------------- | -------------- | -------- | --------------------------------------------------------------------------------------------- |
| `achievementId` | Achievement ID | Yes      | The achievement ID in a game for an event. Populated by the event parameter `achievement_id`. |
| `character`     | Character      | Yes      | The player character in a game for an event. Populated by the event parameter `character`.    |
| `groupId`       | Group ID       | Yes      | The player group ID in a game for an event. Populated by the event parameter `group_id`.      |
| `level`         | Level          | Yes      | The player's level in a game. Populated by the event parameter `level`.                       |

#### Advertising Dimensions

| API Name       | UI Name   | Segments | Description                                                                                                                               |
| -------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `adFormat`     | Ad format | Yes      | Describes the way ads looked and where they were located. Typical formats include Interstitial, Banner, Rewarded, and Native advanced.    |
| `adSourceName` | Ad source | No       | The source network that served the ad. Typical sources include AdMob Network, Liftoff, Facebook Audience Network, and Mediated house ads. |
| `adUnitName`   | Ad unit   | No       | The name you chose to describe this Ad unit. Ad units are containers you place in your apps to show ads to users.                         |

#### App Dimensions

| API Name     | UI Name     | Segments | Description                                                    |
| ------------ | ----------- | -------- | -------------------------------------------------------------- |
| `appVersion` | App version | Yes      | The app's versionName (Android) or short bundle version (iOS). |

#### Audience Dimensions

| API Name               | UI Name                | Segments | Description                                                                                                                       |
| ---------------------- | ---------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `audienceId`           | Audience ID            | No       | The numeric identifier of an Audience. Users are reported in the audiences to which they belonged during the report's date range. |
| `audienceName`         | Audience name          | No       | The given name of an Audience. Users are reported in the audiences to which they belonged during the report's date range.         |
| `audienceResourceName` | Audience resource name | No       | The resource name of this audience. Resource names contain both collection & resource identifiers.                                |
| `brandingInterest`     | Interests              | No       | Interests demonstrated by users higher in the shopping funnel. Users can be counted in multiple interest categories.              |

#### Browser & Device Dimensions

| API Name                     | UI Name                       | Segments | Description                                                               |
| ---------------------------- | ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `browser`                    | Browser                       | Yes      | The browsers used to view your website.                                   |
| `deviceCategory`             | Device category               | Yes      | The type of device: Desktop, Tablet, or Mobile.                           |
| `deviceModel`                | Device model                  | Yes      | The mobile device model (example: iPhone 10,6).                           |
| `mobileDeviceBranding`       | Device brand                  | Yes      | Manufacturer or branded name (examples: Samsung, HTC, Verizon, T-Mobile). |
| `mobileDeviceMarketingName`  | Device                        | Yes      | The branded device name (examples: Galaxy S10 or P30 Pro).                |
| `mobileDeviceModel`          | Mobile model                  | Yes      | The mobile device model name (examples: iPhone X or SM-G950F).            |
| `operatingSystem`            | Operating system              | Yes      | The operating systems used by visitors to your app or website.            |
| `operatingSystemVersion`     | OS version                    | Yes      | The operating system versions used by visitors (example: 10, 13.5.1).     |
| `operatingSystemWithVersion` | Operating system with version | Yes      | The operating system and version (example: Android 10, Windows 7).        |
| `platform`                   | Platform                      | Yes      | The platform on which your app or website ran (web, iOS, or Android).     |
| `platformDeviceCategory`     | Platform / device category    | Yes      | The platform and type of device (example: Android / mobile).              |
| `screenResolution`           | Screen resolution             | Yes      | The screen resolution of the user's monitor (example: 1920x1080).         |

#### Campaign Dimensions

| API Name       | UI Name     | Segments | Description                                                            |
| -------------- | ----------- | -------- | ---------------------------------------------------------------------- |
| `campaignId`   | Campaign ID | Yes      | The identifier of the marketing campaign. Present only for key events. |
| `campaignName` | Campaign    | Yes      | The name of the marketing campaign. Present only for key events.       |

#### Channel Group Dimensions

| API Name              | UI Name               | Segments | Description                                                                                                                                                                                              |
| --------------------- | --------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultChannelGroup` | Default channel group | Yes      | The key event's default channel group based primarily on source and medium. Includes: Direct, Organic Search, Paid Social, Organic Social, Email, Affiliates, Referral, Paid Search, Video, and Display. |
| `primaryChannelGroup` | Primary channel group | No       | The primary channel group attributed to the key event. Primary channel groups serve as an active record of your property's data in alignment with channel grouping over time.                            |

#### CM360 Dimensions

| API Name                      | UI Name                        | Segments | Description                                                            |
| ----------------------------- | ------------------------------ | -------- | ---------------------------------------------------------------------- |
| `cm360AccountId`              | CM360 account ID               | Yes      | The CM360 Account ID that led to the key event.                        |
| `cm360AccountName`            | CM360 account name             | Yes      | The CM360 Account Name that led to the key event.                      |
| `cm360AdvertiserId`           | CM360 advertiser ID            | Yes      | The CM360 Advertiser ID that led to the key event.                     |
| `cm360AdvertiserName`         | CM360 advertiser name          | Yes      | The CM360 Advertiser Name that led to the key event.                   |
| `cm360CampaignId`             | CM360 campaign ID              | Yes      | The CM360 Campaign ID that led to the key event.                       |
| `cm360CampaignName`           | CM360 campaign name            | Yes      | The CM360 Campaign Name that led to the key event.                     |
| `cm360CreativeFormat`         | CM360 creative format          | Yes      | The CM360 Creative Format that led to the key event.                   |
| `cm360CreativeId`             | CM360 creative ID              | Yes      | The CM360 Creative ID that led to the key event.                       |
| `cm360CreativeName`           | CM360 creative name            | Yes      | The CM360 Creative Name that led to the key event.                     |
| `cm360CreativeType`           | CM360 creative type            | Yes      | The CM360 Creative Type that led to the key event (Display, Tracking). |
| `cm360CreativeTypeId`         | CM360 creative type ID         | Yes      | The CM360 Creative Type ID that led to the key event.                  |
| `cm360CreativeVersion`        | CM360 creative version         | Yes      | The CM360 Creative Version that led to the key event.                  |
| `cm360Medium`                 | CM360 medium                   | Yes      | The CM360 Medium that led to the key event (placement cost structure). |
| `cm360PlacementCostStructure` | CM360 placement cost structure | Yes      | The CM360 Placement Cost Structure (example: CPM).                     |
| `cm360PlacementId`            | CM360 placement ID             | Yes      | The CM360 Placement ID that led to the key event.                      |
| `cm360PlacementName`          | CM360 placement name           | Yes      | The CM360 Placement Name that led to the key event.                    |
| `cm360RenderingId`            | CM360 rendering ID             | Yes      | The CM360 Rendering ID that led to the key event.                      |
| `cm360SiteId`                 | CM360 site ID                  | Yes      | The CM360 Site ID that led to the key event.                           |
| `cm360SiteName`               | CM360 site name                | Yes      | The CM360 Site Name from which the ad space was purchased.             |
| `cm360Source`                 | CM360 source                   | Yes      | The CM360 Source that led to the key event (site name).                |
| `cm360SourceMedium`           | CM360 source / medium          | Yes      | The CM360 Source Medium (combination of source and medium).            |

#### Cohort Dimensions

| API Name         | UI Name        | Segments | Description                                                                                                                          |
| ---------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `cohort`         | Cohort         | No       | The cohort's name in the request. A cohort is a set of users who started using your website or app in any consecutive group of days. |
| `cohortNthDay`   | Daily cohort   | No       | Day offset relative to the firstSessionDate for the users in the cohort.                                                             |
| `cohortNthMonth` | Monthly cohort | No       | Month offset relative to the firstSessionDate for the users in the cohort.                                                           |
| `cohortNthWeek`  | Weekly cohort  | No       | Week offset relative to the firstSessionDate for the users in the cohort. Weeks start on Sunday.                                     |

#### Content Dimensions

| API Name       | UI Name       | Segments | Description                                                                          |
| -------------- | ------------- | -------- | ------------------------------------------------------------------------------------ |
| `contentGroup` | Content group | Yes      | A category that applies to items of published content. Populated by `content_group`. |
| `contentId`    | Content ID    | Yes      | The identifier of the selected content. Populated by `content_id`.                   |
| `contentType`  | Content type  | Yes      | The category of the selected content. Populated by `content_type`.                   |

#### Date & Time Dimensions

| API Name         | UI Name                  | Segments | Description                                                                      |
| ---------------- | ------------------------ | -------- | -------------------------------------------------------------------------------- |
| `date`           | Date                     | Yes      | The date of the event, formatted as YYYYMMDD.                                    |
| `dateHour`       | Date + hour (YYYYMMDDHH) | Yes      | The combined values of date and hour formatted as YYYYMMDDHH.                    |
| `dateHourMinute` | Date hour and minute     | No       | The combined values of date, hour, and minute formatted as YYYYMMDDHHMM.         |
| `day`            | Day                      | Yes      | The day of the month, a two-digit number from 01 to 31.                          |
| `dayOfWeek`      | Day of week              | Yes      | The integer day of the week (0-6, Sunday as first day).                          |
| `dayOfWeekName`  | Day of week name         | No       | The day of the week in English (Sunday, Monday, etc.).                           |
| `hour`           | Hour                     | Yes      | The two-digit hour of the day (0-23) in property's timezone.                     |
| `minute`         | Minute                   | Yes      | The two-digit minute of the hour (0-59) in property's timezone.                  |
| `month`          | Month                    | Yes      | The month of the event, a two digit integer from 01 to 12.                       |
| `week`           | Week                     | Yes      | The week of the event, a two-digit number from 01 to 53.                         |
| `year`           | Year                     | Yes      | The four-digit year of the event (example: 2020, 2024).                          |
| `yearMonth`      | Year month               | No       | The combined values of year and month (example: 202212).                         |
| `yearWeek`       | Year week                | No       | The combined values of year and week (example: 202253).                          |
| `isoWeek`        | ISO week of the year     | No       | ISO week number, where each week starts on Monday.                               |
| `isoYear`        | ISO year                 | No       | The ISO year of the event.                                                       |
| `isoYearIsoWeek` | ISO week of ISO year     | No       | The combined values of isoWeek and isoYear (example: 201652).                    |
| `nthDay`         | Nth day                  | No       | The number of days since the start of the date range.                            |
| `nthHour`        | Nth hour                 | No       | The number of hours since the start of the date range (starting hour: 0000).     |
| `nthMinute`      | Nth minute               | No       | The number of minutes since the start of the date range (starting minute: 0000). |
| `nthMonth`       | Nth month                | No       | The number of months since the start of a date range (starting month: 0000).     |
| `nthWeek`        | Nth week                 | No       | The number of weeks since the start of a date range.                             |
| `nthYear`        | Nth year                 | No       | The number of years since the start of the date range (starting year: 0000).     |

#### DV360 Dimensions

| API Name                  | UI Name                    | Segments | Description                                                 |
| ------------------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `dv360AdvertiserId`       | DV360 advertiser ID        | Yes      | The DV360 Advertiser ID that led to the key event.          |
| `dv360AdvertiserName`     | DV360 advertiser name      | Yes      | The DV360 Advertiser Name that led to the key event.        |
| `dv360CampaignId`         | DV360 campaign ID          | Yes      | The DV360 Campaign ID that led to the key event.            |
| `dv360CampaignName`       | DV360 campaign name        | Yes      | The DV360 Campaign Name that led to the key event.          |
| `dv360CreativeFormat`     | DV360 creative format      | Yes      | The DV360 Creative Format (expandable, video, or native).   |
| `dv360CreativeId`         | DV360 creative ID          | Yes      | The DV360 Creative ID that led to the key event.            |
| `dv360CreativeName`       | DV360 creative name        | Yes      | The DV360 Creative Name that led to the key event.          |
| `dv360ExchangeId`         | DV360 exchange ID          | Yes      | The DV360 Exchange ID that led to the key event.            |
| `dv360ExchangeName`       | DV360 exchange name        | Yes      | The DV360 Exchange Name that led to the key event.          |
| `dv360InsertionOrderId`   | DV360 insertion order ID   | Yes      | The DV360 Insertion Order ID that led to the key event.     |
| `dv360InsertionOrderName` | DV360 insertion order name | Yes      | The DV360 Insertion Order Name that led to the key event.   |
| `dv360LineItemId`         | DV360 line item ID         | Yes      | The DV360 Line Item ID that led to the key event.           |
| `dv360LineItemName`       | DV360 line item name       | Yes      | The DV360 Line Item Name that led to the key event.         |
| `dv360Medium`             | DV360 medium               | Yes      | The DV360 Medium (billable outcome, example: cpm).          |
| `dv360PartnerId`          | DV360 partner ID           | Yes      | The DV360 Partner ID that led to the key event.             |
| `dv360PartnerName`        | DV360 partner name         | Yes      | The DV360 Partner Name that led to the key event.           |
| `dv360Source`             | DV360 source               | Yes      | The DV360 Source (site name where ad was displayed).        |
| `dv360SourceMedium`       | DV360 source / medium      | Yes      | The DV360 Source Medium (combination of source and medium). |

#### E-commerce Dimensions

| API Name        | UI Name        | Segments | Description                                                                             |
| --------------- | -------------- | -------- | --------------------------------------------------------------------------------------- |
| `currencyCode`  | Currency       | No       | The local currency code (ISO 4217 standard) of the eCommerce event (example: USD, GBP). |
| `orderCoupon`   | Order coupon   | Yes      | Code for the order-level coupon.                                                        |
| `shippingTier`  | Shipping tier  | No       | The shipping tier selected (Ground, Air, Next-day). Populated by `shipping_tier`.       |
| `transactionId` | Transaction ID | Yes      | The ID of the ecommerce transaction.                                                    |

#### Event Dimensions

| API Name     | UI Name      | Segments | Description                                                        |
| ------------ | ------------ | -------- | ------------------------------------------------------------------ |
| `eventName`  | Event name   | Yes      | The name of the event.                                             |
| `isKeyEvent` | Is key event | Yes      | The string "true" if the event is a key event.                     |
| `method`     | Method       | Yes      | The method by which an event was triggered. Populated by `method`. |

#### File Download Dimensions

| API Name        | UI Name        | Segments | Description                                                                                      |
| --------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `fileExtension` | File extension | Yes      | The extension of the downloaded file (pdf, txt). Auto-populated if Enhanced Measurement enabled. |
| `fileName`      | File name      | Yes      | The page path of the downloaded file. Auto-populated if Enhanced Measurement enabled.            |

#### First User Dimensions (CM360)

| API Name                               | UI Name                                   | Segments | Description                                                           |
| -------------------------------------- | ----------------------------------------- | -------- | --------------------------------------------------------------------- |
| `firstUserCm360AccountId`              | First user CM360 account ID               | Yes      | The CM360 Account ID that originally acquired the user.               |
| `firstUserCm360AccountName`            | First user CM360 account name             | Yes      | The CM360 Account Name that originally acquired the user.             |
| `firstUserCm360AdvertiserId`           | First user CM360 advertiser ID            | Yes      | The CM360 Advertiser ID that originally acquired the user.            |
| `firstUserCm360AdvertiserName`         | First user CM360 advertiser name          | Yes      | The CM360 Advertiser Name that originally acquired the user.          |
| `firstUserCm360CampaignId`             | First user CM360 campaign ID              | Yes      | The CM360 Campaign ID that originally acquired the user.              |
| `firstUserCm360CampaignName`           | First user CM360 campaign name            | Yes      | The CM360 Campaign Name that originally acquired the user.            |
| `firstUserCm360CreativeFormat`         | First user CM360 creative format          | Yes      | The CM360 Creative Format that originally acquired the user.          |
| `firstUserCm360CreativeId`             | First user CM360 creative ID              | Yes      | The CM360 Creative ID that originally acquired the user.              |
| `firstUserCm360CreativeName`           | First user CM360 creative name            | Yes      | The CM360 Creative Name that originally acquired the user.            |
| `firstUserCm360CreativeType`           | First user CM360 creative type            | Yes      | The CM360 Creative Type that originally acquired the user.            |
| `firstUserCm360CreativeTypeId`         | First user CM360 creative type ID         | Yes      | The CM360 Creative Type ID that originally acquired the user.         |
| `firstUserCm360CreativeVersion`        | First user CM360 creative version         | Yes      | The CM360 Creative Version that originally acquired the user.         |
| `firstUserCm360Medium`                 | First user CM360 medium                   | Yes      | The CM360 Medium that originally acquired the user.                   |
| `firstUserCm360PlacementCostStructure` | First user CM360 placement cost structure | Yes      | The CM360 Placement Cost Structure that originally acquired the user. |
| `firstUserCm360PlacementId`            | First user CM360 placement ID             | Yes      | The CM360 Placement ID that originally acquired the user.             |
| `firstUserCm360PlacementName`          | First user CM360 placement name           | Yes      | The CM360 Placement Name that originally acquired the user.           |
| `firstUserCm360RenderingId`            | First user CM360 rendering ID             | Yes      | The CM360 Rendering ID that originally acquired the user.             |
| `firstUserCm360SiteId`                 | First user CM360 site ID                  | Yes      | The CM360 Site ID that originally acquired the user.                  |
| `firstUserCm360SiteName`               | First user CM360 site name                | Yes      | The CM360 Site Name that originally acquired the user.                |
| `firstUserCm360Source`                 | First user CM360 source                   | Yes      | The CM360 Source that originally acquired the user.                   |
| `firstUserCm360SourceMedium`           | First user CM360 source / medium          | Yes      | The CM360 Source Medium that originally acquired the user.            |

#### First User Dimensions (DV360)

| API Name                           | UI Name                               | Segments | Description                                                       |
| ---------------------------------- | ------------------------------------- | -------- | ----------------------------------------------------------------- |
| `firstUserDv360AdvertiserId`       | First user DV360 advertiser ID        | Yes      | The DV360 Advertiser ID that originally acquired the user.        |
| `firstUserDv360AdvertiserName`     | First user DV360 advertiser name      | Yes      | The DV360 Advertiser Name that originally acquired the user.      |
| `firstUserDv360CampaignId`         | First user DV360 campaign ID          | Yes      | The DV360 Campaign ID that originally acquired the user.          |
| `firstUserDv360CampaignName`       | First user DV360 campaign name        | Yes      | The DV360 Campaign Name that originally acquired the user.        |
| `firstUserDv360CreativeFormat`     | First user DV360 creative format      | Yes      | The DV360 Creative Format that originally acquired the user.      |
| `firstUserDv360CreativeId`         | First user DV360 creative ID          | Yes      | The DV360 Creative ID that originally acquired the user.          |
| `firstUserDv360CreativeName`       | First user DV360 creative name        | Yes      | The DV360 Creative Name that originally acquired the user.        |
| `firstUserDv360ExchangeId`         | First user DV360 exchange ID          | Yes      | The DV360 Exchange ID that originally acquired the user.          |
| `firstUserDv360ExchangeName`       | First user DV360 exchange name        | Yes      | The DV360 Exchange Name that originally acquired the user.        |
| `firstUserDv360InsertionOrderId`   | First user DV360 insertion order ID   | Yes      | The DV360 Insertion Order ID that originally acquired the user.   |
| `firstUserDv360InsertionOrderName` | First user DV360 insertion order name | Yes      | The DV360 Insertion Order Name that originally acquired the user. |
| `firstUserDv360LineItemId`         | First user DV360 line item ID         | Yes      | The DV360 Line Item ID that originally acquired the user.         |
| `firstUserDv360LineItemName`       | First user DV360 line item name       | Yes      | The DV360 Line Item Name that originally acquired the user.       |
| `firstUserDv360Medium`             | First user DV360 medium               | Yes      | The DV360 Medium that originally acquired the user.               |
| `firstUserDv360PartnerId`          | First user DV360 partner ID           | Yes      | The DV360 Partner ID that originally acquired the user.           |
| `firstUserDv360PartnerName`        | First user DV360 partner name         | Yes      | The DV360 Partner Name that originally acquired the user.         |
| `firstUserDv360Source`             | First user DV360 source               | Yes      | The DV360 Source that originally acquired the user.               |
| `firstUserDv360SourceMedium`       | First user DV360 source / medium      | Yes      | The DV360 Source Medium that originally acquired the user.        |

#### First User Dimensions (Google Ads)

| API Name                          | UI Name                               | Segments | Description                                                                |
| --------------------------------- | ------------------------------------- | -------- | -------------------------------------------------------------------------- |
| `firstUserGoogleAdsAccountName`   | First user Google Ads account name    | Yes      | The Account name from Google Ads that first acquired the user.             |
| `firstUserGoogleAdsAdGroupId`     | First user Google Ads ad group ID     | Yes      | The Ad Group Id in Google Ads that first acquired the user.                |
| `firstUserGoogleAdsAdGroupName`   | First user Google Ads ad group name   | Yes      | The Ad Group Name in Google Ads that first acquired the user.              |
| `firstUserGoogleAdsAdNetworkType` | First user Google Ads ad network type | Yes      | The advertising network that first acquired the user.                      |
| `firstUserGoogleAdsCampaignId`    | First user Google Ads campaign ID     | No       | Identifier of the Google Ads campaign that first acquired the user.        |
| `firstUserGoogleAdsCampaignName`  | First user Google Ads campaign        | No       | Name of the Google Ads campaign that first acquired the user.              |
| `firstUserGoogleAdsCampaignType`  | First user Google Ads campaign type   | No       | The campaign type of the Google Ads campaign that first acquired the user. |
| `firstUserGoogleAdsCreativeId`    | First user Google Ads creative ID     | No       | The ID of the Google Ads creative that first acquired the user.            |
| `firstUserGoogleAdsCustomerId`    | First user Google Ads customer ID     | Yes      | The Customer ID from Google Ads that first acquired the user.              |
| `firstUserGoogleAdsKeyword`       | First user Google Ads keyword text    | Yes      | First user Google Ads keyword text.                                        |
| `firstUserGoogleAdsQuery`         | First user Google Ads query           | Yes      | The search query that first acquired the user.                             |

#### First User Dimensions (General)

| API Name                       | UI Name                          | Segments | Description                                                        |
| ------------------------------ | -------------------------------- | -------- | ------------------------------------------------------------------ |
| `firstSessionDate`             | First session date               | Yes      | The date the user's first session occurred, formatted as YYYYMMDD. |
| `firstUserCampaignId`          | First user campaign ID           | Yes      | Identifier of the marketing campaign that first acquired the user. |
| `firstUserCampaignName`        | First user campaign              | Yes      | Name of the marketing campaign that first acquired the user.       |
| `firstUserDefaultChannelGroup` | First user default channel group | Yes      | The default channel group that first acquired the user.            |
| `firstUserMedium`              | First user medium                | Yes      | The medium that first acquired the user.                           |
| `firstUserPrimaryChannelGroup` | First user primary channel group | No       | The primary channel group that originally acquired a user.         |
| `firstUserSource`              | First user source                | Yes      | The source that first acquired the user.                           |
| `firstUserSourceMedium`        | First user source / medium       | Yes      | The combined values of firstUserSource and firstUserMedium.        |
| `firstUserSourcePlatform`      | First user source platform       | Yes      | The source platform that first acquired the user.                  |

#### First User Dimensions (Manual)

| API Name                         | UI Name                            | Segments | Description                                                                                         |
| -------------------------------- | ---------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `firstUserManualAdContent`       | First user manual ad content       | Yes      | The ad content that first acquired the user. Populated by `utm_content`.                            |
| `firstUserManualCampaignId`      | First user manual campaign ID      | Yes      | The manual Campaign ID that originally acquired the user. Populated by `utm_id`.                    |
| `firstUserManualCampaignName`    | First user manual campaign name    | Yes      | The manual Campaign Name that originally acquired the user. Populated by `utm_campaign`.            |
| `firstUserManualCreativeFormat`  | First user manual creative format  | Yes      | The manual Creative Format that originally acquired the user. Populated by `utm_creative_format`.   |
| `firstUserManualMarketingTactic` | First user manual marketing tactic | No       | The manual Marketing Tactic that originally acquired the user. Populated by `utm_marketing_tactic`. |
| `firstUserManualMedium`          | First user manual medium           | Yes      | The manual Medium that originally acquired the user. Populated by `utm_medium`.                     |
| `firstUserManualSource`          | First user manual source           | Yes      | The manual Source that originally acquired the user. Populated by `utm_source`.                     |
| `firstUserManualSourceMedium`    | First user manual source / medium  | Yes      | The manual Source Medium that originally acquired the user.                                         |
| `firstUserManualSourcePlatform`  | First user manual source platform  | Yes      | The manual Source Platform that originally acquired the user. Populated by `utm_source_platform`.   |
| `firstUserManualTerm`            | First user manual term             | Yes      | The term that first acquired the user. Populated by `utm_term`.                                     |

#### First User Dimensions (SA360)

| API Name                           | UI Name                               | Segments | Description                                                       |
| ---------------------------------- | ------------------------------------- | -------- | ----------------------------------------------------------------- |
| `firstUserSa360AdGroupId`          | First user SA360 ad group ID          | Yes      | The SA360 Ad Group ID that originally acquired the user.          |
| `firstUserSa360AdGroupName`        | First user SA360 ad group name        | Yes      | The SA360 Ad Group Name that originally acquired the user.        |
| `firstUserSa360CampaignId`         | First user SA360 campaign ID          | Yes      | The SA360 Campaign ID that originally acquired the user.          |
| `firstUserSa360CampaignName`       | First user SA360 campaign             | Yes      | The SA360 Campaign Name that originally acquired the user.        |
| `firstUserSa360CreativeFormat`     | First user SA360 creative format      | No       | The SA360 Creative Format that originally acquired the user.      |
| `firstUserSa360EngineAccountId`    | First user SA360 engine account ID    | Yes      | The SA360 Engine Account ID that originally acquired the user.    |
| `firstUserSa360EngineAccountName`  | First user SA360 engine account name  | Yes      | The SA360 Engine Account Name that originally acquired the user.  |
| `firstUserSa360EngineAccountType`  | First user SA360 engine account type  | Yes      | The SA360 Engine Account Type that originally acquired the user.  |
| `firstUserSa360KeywordText`        | First user SA360 keyword text         | Yes      | The SA360 Keyword Text that originally acquired the user.         |
| `firstUserSa360ManagerAccountId`   | First user SA360 manager account ID   | Yes      | The SA360 Manager Account ID that originally acquired the user.   |
| `firstUserSa360ManagerAccountName` | First user SA360 manager account name | Yes      | The SA360 Manager Account Name that originally acquired the user. |
| `firstUserSa360Medium`             | First user SA360 medium               | Yes      | The SA360 Medium that originally acquired the user.               |
| `firstUserSa360Query`              | First user SA360 query                | Yes      | The SA360 Query that originally acquired the user.                |
| `firstUserSa360Source`             | First user SA360 source               | Yes      | The SA360 Source that originally acquired the user.               |
| `firstUserSa360SourceMedium`       | First user SA360 source / medium      | Yes      | The SA360 Source Medium that originally acquired the user.        |

#### Funnel-Specific Dimensions

| API Name                    | UI Name            | Segments | Description                                                                                              |
| --------------------------- | ------------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `funnelStepName`            | Step               | No       | The descriptive name assigned to the funnel step (example: "3. Purchase").                               |
| `funnelStepNewVsContinuing` | New vs continuing  | No       | Whether user was present in prior funnel step ("new" or "continuing"). Only meaningful for open funnels. |
| `funnelStepNextAction`      | Funnel next action | No       | The next dimension value attained by the user after completing the current step.                         |

#### Geography Dimensions

| API Name      | UI Name      | Segments | Description                                                             |
| ------------- | ------------ | -------- | ----------------------------------------------------------------------- |
| `city`        | City         | Yes      | The city from which the user activity originated.                       |
| `cityId`      | City ID      | Yes      | The geographic ID of the city, derived from IP address.                 |
| `continent`   | Continent    | Yes      | The continent from which the user activity originated (Americas, Asia). |
| `continentId` | Continent ID | No       | The geographic ID of the continent, derived from IP address.            |
| `country`     | Country      | Yes      | The country from which the user activity originated.                    |
| `countryId`   | Country ID   | Yes      | The geographic ID of the country (ISO 3166-1 alpha-2 standard).         |
| `region`      | Region       | Yes      | The geographic region from which the user activity originated.          |

#### Google Ads Dimensions

| API Name                 | UI Name                    | Segments | Description                                                                  |
| ------------------------ | -------------------------- | -------- | ---------------------------------------------------------------------------- |
| `googleAdsAccountName`   | Google Ads account name    | Yes      | The Account name from Google Ads for the campaign that led to the key event. |
| `googleAdsAdGroupId`     | Google Ads ad group ID     | No       | The Google Ads ad group ID attributed to the key event.                      |
| `googleAdsAdGroupName`   | Google Ads ad group name   | No       | The ad group name attributed to the key event.                               |
| `googleAdsAdNetworkType` | Google Ads ad network type | Yes      | The advertising network type of the key event.                               |
| `googleAdsCampaignId`    | Google Ads campaign ID     | No       | The campaign ID for the Google Ads campaign attributed to the key event.     |
| `googleAdsCampaignName`  | Google Ads campaign        | No       | The campaign name for the Google Ads campaign attributed to the key event.   |
| `googleAdsCampaignType`  | Google Ads campaign type   | No       | The campaign type for the Google Ads campaign attributed to the key event.   |
| `googleAdsCreativeId`    | Google Ads creative ID     | No       | The ID of the Google Ads creative attributed to the key event.               |
| `googleAdsCustomerId`    | Google Ads customer ID     | Yes      | The Customer ID from Google Ads for the campaign that led to key event.      |
| `googleAdsKeyword`       | Google Ads keyword text    | No       | The matched keyword that led to the key event.                               |
| `googleAdsQuery`         | Google Ads query           | No       | The search query that led to the key event.                                  |

#### Item Dimensions

| API Name                    | UI Name                      | Segments | Description                                                                                  |
| --------------------------- | ---------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `itemAffiliation`           | Item affiliation             | Yes      | The name or code of the affiliate associated with an item. Populated by `affiliation`.       |
| `itemBrand`                 | Item brand                   | Yes      | Brand name of the item.                                                                      |
| `itemCategory`              | Item category                | Yes      | The hierarchical category level 1 (example: Apparel in Apparel/Mens/Summer/Shirts/T-shirts). |
| `itemCategory2`             | Item category 2              | Yes      | The hierarchical category level 2 (example: Mens).                                           |
| `itemCategory3`             | Item category 3              | Yes      | The hierarchical category level 3 (example: Summer).                                         |
| `itemCategory4`             | Item category 4              | Yes      | The hierarchical category level 4 (example: Shirts).                                         |
| `itemCategory5`             | Item category 5              | Yes      | The hierarchical category level 5 (example: T-shirts).                                       |
| `itemId`                    | Item ID                      | Yes      | The ID of the item.                                                                          |
| `itemListId`                | Item list ID                 | Yes      | The ID of the item list.                                                                     |
| `itemListName`              | Item list name               | Yes      | The name of the item list.                                                                   |
| `itemListPosition`          | Item list position           | Yes      | The position of an item in a list. Populated by `index` in items array.                      |
| `itemLocationID`            | Item location ID             | Yes      | The physical location associated with the item. Recommended: Google Place ID.                |
| `itemName`                  | Item name                    | Yes      | The name of the item.                                                                        |
| `itemPromotionCreativeName` | Item promotion creative name | Yes      | The name of the item-promotion creative.                                                     |
| `itemPromotionCreativeSlot` | Item promotion creative slot | Yes      | The name of the promotional creative slot associated with the item.                          |
| `itemPromotionId`           | Item promotion ID            | Yes      | The ID of the item promotion.                                                                |
| `itemPromotionName`         | Item promotion name          | Yes      | The name of the promotion for the item.                                                      |
| `itemVariant`               | Item variant                 | Yes      | The specific variation of a product (XS, S, M, L or Red, Blue, Green, Black).                |

#### Language Dimensions

| API Name       | UI Name       | Segments | Description                                                              |
| -------------- | ------------- | -------- | ------------------------------------------------------------------------ |
| `language`     | Language      | Yes      | The language setting of the user's browser or device (example: English). |
| `languageCode` | Language code | Yes      | The language setting (ISO 639) of the user's browser (example: en-us).   |

#### Link Dimensions

| API Name      | UI Name      | Segments | Description                                                                                                           |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `linkClasses` | Link classes | Yes      | The HTML class attribute for an outbound link. Auto-populated if Enhanced Measurement enabled.                        |
| `linkDomain`  | Link domain  | Yes      | The destination domain of the outbound link. Auto-populated if Enhanced Measurement enabled.                          |
| `linkId`      | Link ID      | Yes      | The HTML ID attribute for an outbound link or file download. Auto-populated if Enhanced Measurement enabled.          |
| `linkText`    | Link text    | Yes      | The link text of the file download. Auto-populated if Enhanced Measurement enabled.                                   |
| `linkUrl`     | Link URL     | Yes      | The full URL for an outbound link or file download. Auto-populated if Enhanced Measurement enabled.                   |
| `outbound`    | Outbound     | Yes      | Returns true if the link led to a site outside the property's domain. Auto-populated if Enhanced Measurement enabled. |

#### Manual Campaign Dimensions

| API Name                | UI Name                 | Segments | Description                                                                                 |
| ----------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `manualAdContent`       | Manual ad content       | Yes      | The ad content attributed to the key event. Populated by `utm_content`.                     |
| `manualCampaignId`      | Manual campaign ID      | Yes      | The manual Campaign ID that led to the key event. Populated by `utm_id`.                    |
| `manualCampaignName`    | Manual campaign name    | Yes      | The manual Campaign Name that led to the key event. Populated by `utm_campaign`.            |
| `manualCreativeFormat`  | Manual creative format  | Yes      | The manual Creative Format that led to the key event. Populated by `utm_creative_format`.   |
| `manualMarketingTactic` | Manual marketing tactic | No       | The manual Marketing Tactic that led to the key event. Populated by `utm_marketing_tactic`. |
| `manualMedium`          | Manual medium           | Yes      | The manual Medium that led to the key event. Populated by `utm_medium`.                     |
| `manualSource`          | Manual source           | Yes      | The manual Source that led to the key event. Populated by `utm_source`.                     |
| `manualSourceMedium`    | Manual source / medium  | Yes      | The manual Source Medium (combination of source and medium).                                |
| `manualSourcePlatform`  | Manual source platform  | Yes      | The manual Source Platform that led to the key event. Populated by `utm_source_platform`.   |
| `manualTerm`            | Manual term             | Yes      | The term attributed to the key event. Populated by `utm_term`.                              |

#### Medium & Source Dimensions

| API Name         | UI Name         | Segments | Description                                              |
| ---------------- | --------------- | -------- | -------------------------------------------------------- |
| `medium`         | Medium          | Yes      | The medium attributed to the key event.                  |
| `source`         | Source          | Yes      | The source attributed to the key event.                  |
| `sourceMedium`   | Source / medium | Yes      | The combined values of the dimensions source and medium. |
| `sourcePlatform` | Source platform | Yes      | The source platform of the key event's campaign.         |

#### Page Dimensions

| API Name                     | UI Name                     | Segments | Description                                                                                              |
| ---------------------------- | --------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `fullPageUrl`                | Full page URL               | No       | The hostname, page path, and query string (example: www.example.com/store/contact-us?query_string=true). |
| `hostName`                   | Hostname                    | Yes      | Includes the subdomain and domain names of a URL (example: www.example.com).                             |
| `landingPage`                | Landing page                | No       | The page path associated with the first pageview in a session.                                           |
| `landingPagePlusQueryString` | Landing page + query string | Yes      | The page path + query string associated with the first pageview in a session.                            |
| `pageLocation`               | Page location               | Yes      | The protocol, hostname, page path, and query string. Populated by `page_location`.                       |
| `pagePath`                   | Page path                   | No       | The portion of the URL between the hostname and query string (example: /store/contact-us).               |
| `pagePathPlusQueryString`    | Page path + query string    | Yes      | The portion of the URL following the hostname (example: /store/contact-us?query_string=true).            |
| `pageReferrer`               | Page referrer               | Yes      | The full referring URL including hostname and path. Populated by `page_referrer`.                        |
| `pageTitle`                  | Page title                  | Yes      | The web page titles used on your site.                                                                   |

#### SA360 Dimensions

| API Name                  | UI Name                    | Segments | Description                                                 |
| ------------------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `sa360AdGroupId`          | SA360 ad group ID          | Yes      | The SA360 Ad Group ID that led to the key event.            |
| `sa360AdGroupName`        | SA360 ad group name        | Yes      | The SA360 Ad Group Name that led to the key event.          |
| `sa360CampaignId`         | SA360 campaign ID          | Yes      | The SA360 Campaign ID that led to the key event.            |
| `sa360CampaignName`       | SA360 campaign             | Yes      | The SA360 Campaign Name that led to the key event.          |
| `sa360CreativeFormat`     | SA360 creative format      | No       | The SA360 Creative Format that led to the key event.        |
| `sa360EngineAccountId`    | SA360 engine account ID    | Yes      | The SA360 Engine Account ID that led to the key event.      |
| `sa360EngineAccountName`  | SA360 engine account name  | Yes      | The SA360 Engine Account Name that led to the key event.    |
| `sa360EngineAccountType`  | SA360 engine account type  | Yes      | The SA360 Engine Account Type that led to the key event.    |
| `sa360KeywordText`        | SA360 keyword text         | Yes      | The SA360 Keyword Text that led to the key event.           |
| `sa360ManagerAccountId`   | SA360 manager account ID   | Yes      | The SA360 Manager Account ID that led to the key event.     |
| `sa360ManagerAccountName` | SA360 manager account name | Yes      | The SA360 Manager Account Name that led to the key event.   |
| `sa360Medium`             | SA360 medium               | Yes      | The SA360 Medium (payment mode, example: cpc).              |
| `sa360Query`              | SA360 query                | Yes      | The SA360 Query that led to the key event.                  |
| `sa360Source`             | SA360 source               | Yes      | The SA360 Source that led to the key event.                 |
| `sa360SourceMedium`       | SA360 source / medium      | Yes      | The SA360 Source Medium (combination of source and medium). |

#### Scroll Dimensions

| API Name          | UI Name          | Segments | Description                                                                                                            |
| ----------------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `percentScrolled` | Percent scrolled | Yes      | The percentage down the page that the user has scrolled (example: 90). Auto-populated if Enhanced Measurement enabled. |

#### Search Dimensions

| API Name     | UI Name     | Segments | Description                                                                                                |
| ------------ | ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `searchTerm` | Search term | Yes      | The term searched by the user. Auto-populated if Enhanced Measurement enabled. Populated by `search_term`. |

#### Segment Dimensions

| API Name  | UI Name | Segments | Description                                                                                           |
| --------- | ------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `segment` | Segment | No       | A subset of your Analytics data. Returns the name with a 1-based prefix (example: "1. Paid Traffic"). |

#### Session Dimensions (CM360)

| API Name                             | UI Name                                | Segments | Description                                                 |
| ------------------------------------ | -------------------------------------- | -------- | ----------------------------------------------------------- |
| `sessionCm360AccountId`              | Session CM360 account ID               | Yes      | The CM360 Account ID that led to the session.               |
| `sessionCm360AccountName`            | Session CM360 account name             | Yes      | The CM360 Account Name that led to the session.             |
| `sessionCm360AdvertiserId`           | Session CM360 advertiser ID            | Yes      | The CM360 Advertiser ID that led to the session.            |
| `sessionCm360AdvertiserName`         | Session CM360 advertiser name          | Yes      | The CM360 Advertiser Name that led to the session.          |
| `sessionCm360CampaignId`             | Session CM360 campaign ID              | Yes      | The CM360 Campaign ID that led to the session.              |
| `sessionCm360CampaignName`           | Session CM360 campaign name            | Yes      | The CM360 Campaign Name that led to the session.            |
| `sessionCm360CreativeFormat`         | Session CM360 creative format          | Yes      | The CM360 Creative Format that led to the session.          |
| `sessionCm360CreativeId`             | Session CM360 creative ID              | Yes      | The CM360 Creative ID that led to the session.              |
| `sessionCm360CreativeName`           | Session CM360 creative name            | Yes      | The CM360 Creative Name that led to the session.            |
| `sessionCm360CreativeType`           | Session CM360 creative type            | Yes      | The CM360 Creative Type that led to the session.            |
| `sessionCm360CreativeTypeId`         | Session CM360 creative type ID         | Yes      | The CM360 Creative Type ID that led to the session.         |
| `sessionCm360CreativeVersion`        | Session CM360 creative version         | Yes      | The CM360 Creative Version that led to the session.         |
| `sessionCm360Medium`                 | Session CM360 medium                   | Yes      | The CM360 Medium that led to the session.                   |
| `sessionCm360PlacementCostStructure` | Session CM360 placement cost structure | Yes      | The CM360 Placement Cost Structure that led to the session. |
| `sessionCm360PlacementId`            | Session CM360 placement ID             | Yes      | The CM360 Placement ID that led to the session.             |
| `sessionCm360PlacementName`          | Session CM360 placement name           | Yes      | The CM360 Placement Name that led to the session.           |
| `sessionCm360RenderingId`            | Session CM360 rendering ID             | Yes      | The CM360 Rendering ID that led to the session.             |
| `sessionCm360SiteId`                 | Session CM360 site ID                  | Yes      | The CM360 Site ID that led to the session.                  |
| `sessionCm360SiteName`               | Session CM360 site name                | Yes      | The CM360 Site Name that led to the session.                |
| `sessionCm360Source`                 | Session CM360 source                   | Yes      | The CM360 Source that led to the session.                   |
| `sessionCm360SourceMedium`           | Session CM360 source / medium          | Yes      | The CM360 Source Medium that led to the session.            |

#### Session Dimensions (DV360)

| API Name                         | UI Name                            | Segments | Description                                             |
| -------------------------------- | ---------------------------------- | -------- | ------------------------------------------------------- |
| `sessionDv360AdvertiserId`       | Session DV360 advertiser ID        | Yes      | The DV360 Advertiser ID that led to the session.        |
| `sessionDv360AdvertiserName`     | Session DV360 advertiser name      | Yes      | The DV360 Advertiser Name that led to the session.      |
| `sessionDv360CampaignId`         | Session DV360 campaign ID          | Yes      | The DV360 Campaign ID that led to the session.          |
| `sessionDv360CampaignName`       | Session DV360 campaign name        | Yes      | The DV360 Campaign Name that led to the session.        |
| `sessionDv360CreativeFormat`     | Session DV360 creative format      | Yes      | The DV360 Creative Format that led to the session.      |
| `sessionDv360CreativeId`         | Session DV360 creative ID          | Yes      | The DV360 Creative ID that led to the session.          |
| `sessionDv360CreativeName`       | Session DV360 creative name        | Yes      | The DV360 Creative Name that led to the session.        |
| `sessionDv360ExchangeId`         | Session DV360 exchange ID          | Yes      | The DV360 Exchange ID that led to the session.          |
| `sessionDv360ExchangeName`       | Session DV360 exchange name        | Yes      | The DV360 Exchange Name that led to the session.        |
| `sessionDv360InsertionOrderId`   | Session DV360 insertion order ID   | Yes      | The DV360 Insertion Order ID that led to the session.   |
| `sessionDv360InsertionOrderName` | Session DV360 insertion order name | Yes      | The DV360 Insertion Order Name that led to the session. |
| `sessionDv360LineItemId`         | Session DV360 line item ID         | Yes      | The DV360 Line Item ID that led to the session.         |
| `sessionDv360LineItemName`       | Session DV360 line item name       | Yes      | The DV360 Line Item Name that led to the session.       |
| `sessionDv360Medium`             | Session DV360 medium               | Yes      | The DV360 Medium that led to the session.               |
| `sessionDv360PartnerId`          | Session DV360 partner ID           | Yes      | The DV360 Partner ID that led to the session.           |
| `sessionDv360PartnerName`        | Session DV360 partner name         | Yes      | The DV360 Partner Name that led to the session.         |
| `sessionDv360Source`             | Session DV360 source               | Yes      | The DV360 Source that led to the session.               |
| `sessionDv360SourceMedium`       | Session DV360 source / medium      | Yes      | The DV360 Source Medium that led to the session.        |

#### Session Dimensions (Google Ads)

| API Name                        | UI Name                            | Segments | Description                                                             |
| ------------------------------- | ---------------------------------- | -------- | ----------------------------------------------------------------------- |
| `sessionGoogleAdsAccountName`   | Session Google Ads account name    | Yes      | The Account name from Google Ads that led to the session.               |
| `sessionGoogleAdsAdGroupId`     | Session Google Ads ad group ID     | Yes      | The Ad Group Id in Google Ads for a session.                            |
| `sessionGoogleAdsAdGroupName`   | Session Google Ads ad group name   | Yes      | The Ad Group Name in Google Ads for a session.                          |
| `sessionGoogleAdsAdNetworkType` | Session Google Ads ad network type | Yes      | The advertising network that led to the session.                        |
| `sessionGoogleAdsCampaignId`    | Session Google Ads campaign ID     | No       | The Campaign ID for the Google Ads Campaign that led to this session.   |
| `sessionGoogleAdsCampaignName`  | Session Google Ads campaign        | No       | The Campaign name for the Google Ads Campaign that led to this session. |
| `sessionGoogleAdsCampaignType`  | Session Google Ads campaign type   | No       | The campaign type for the Google Ads campaign that led to this session. |
| `sessionGoogleAdsCreativeId`    | Session Google Ads creative ID     | No       | The ID of the Google Ads creative that led to a session.                |
| `sessionGoogleAdsCustomerId`    | Session Google Ads customer ID     | Yes      | The Customer ID from Google Ads that led to the session.                |
| `sessionGoogleAdsKeyword`       | Session Google Ads keyword text    | Yes      | The matched keyword that led to the session.                            |
| `sessionGoogleAdsQuery`         | Session Google Ads query           | Yes      | The search query that led to the session.                               |

#### Session Dimensions (General)

| API Name                     | UI Name                       | Segments | Description                                                               |
| ---------------------------- | ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `sessionCampaignId`          | Session campaign ID           | Yes      | The marketing campaign ID for a session.                                  |
| `sessionCampaignName`        | Session campaign              | Yes      | The marketing campaign name for a session.                                |
| `sessionDefaultChannelGroup` | Session default channel group | Yes      | The session's default channel group based primarily on source and medium. |
| `sessionMedium`              | Session medium                | Yes      | The medium that initiated a session.                                      |
| `sessionPrimaryChannelGroup` | Session primary channel group | No       | The primary channel group that led to the session.                        |
| `sessionSource`              | Session source                | Yes      | The source that initiated a session.                                      |
| `sessionSourceMedium`        | Session source / medium       | Yes      | The combined values of sessionSource and sessionMedium.                   |
| `sessionSourcePlatform`      | Session source platform       | Yes      | The source platform of the session's campaign.                            |

#### Session Dimensions (Manual)

| API Name                       | UI Name                         | Segments | Description                                                                               |
| ------------------------------ | ------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `sessionManualAdContent`       | Session manual ad content       | Yes      | The ad content that led to a session. Populated by `utm_content`.                         |
| `sessionManualCampaignId`      | Session manual campaign ID      | Yes      | The manual Campaign ID that led to the session. Populated by `utm_id`.                    |
| `sessionManualCampaignName`    | Session manual campaign name    | Yes      | The manual Campaign Name that led to the session. Populated by `utm_campaign`.            |
| `sessionManualCreativeFormat`  | Session manual creative format  | Yes      | The manual Creative Format that led to the session. Populated by `utm_creative_format`.   |
| `sessionManualMarketingTactic` | Session manual marketing tactic | No       | The manual Marketing Tactic that led to the session. Populated by `utm_marketing_tactic`. |
| `sessionManualMedium`          | Session manual medium           | Yes      | The manual Medium that led to the session. Populated by `utm_medium`.                     |
| `sessionManualSource`          | Session manual source           | Yes      | The manual Source that led to the session. Populated by `utm_source`.                     |
| `sessionManualSourceMedium`    | Session manual source / medium  | Yes      | The manual Source Medium that led to the session.                                         |
| `sessionManualSourcePlatform`  | Session manual source platform  | Yes      | The manual Source Platform that led to the session. Populated by `utm_source_platform`.   |
| `sessionManualTerm`            | Session manual term             | Yes      | The term that led to a session. Populated by `utm_term`.                                  |

#### Session Dimensions (SA360)

| API Name                         | UI Name                            | Segments | Description                                             |
| -------------------------------- | ---------------------------------- | -------- | ------------------------------------------------------- |
| `sessionSa360AdGroupId`          | Session SA360 ad group ID          | Yes      | The SA360 Ad Group ID that led to the session.          |
| `sessionSa360AdGroupName`        | Session SA360 ad group name        | Yes      | The SA360 Ad Group Name that led to the session.        |
| `sessionSa360CampaignId`         | Session SA360 campaign ID          | Yes      | The SA360 Campaign ID that led to the session.          |
| `sessionSa360CampaignName`       | Session SA360 campaign             | Yes      | The SA360 Campaign Name that led to the session.        |
| `sessionSa360CreativeFormat`     | Session SA360 creative format      | No       | The SA360 Creative Format that led to the session.      |
| `sessionSa360EngineAccountId`    | Session SA360 engine account ID    | Yes      | The SA360 Engine Account ID that led to the session.    |
| `sessionSa360EngineAccountName`  | Session SA360 engine account name  | Yes      | The SA360 Engine Account Name that led to the session.  |
| `sessionSa360EngineAccountType`  | Session SA360 engine account type  | Yes      | The SA360 Engine Account Type that led to the session.  |
| `sessionSa360Keyword`            | Session SA360 keyword text         | Yes      | The SA360 Keyword Text that led to the session.         |
| `sessionSa360ManagerAccountId`   | Session SA360 manager account ID   | Yes      | The SA360 Manager Account ID that led to the session.   |
| `sessionSa360ManagerAccountName` | Session SA360 manager account name | Yes      | The SA360 Manager Account Name that led to the session. |
| `sessionSa360Medium`             | Session SA360 medium               | Yes      | The SA360 Medium that led to the session.               |
| `sessionSa360Query`              | Session SA360 query                | Yes      | The SA360 Query that led to the session.                |
| `sessionSa360Source`             | Session SA360 source               | Yes      | The SA360 Source that led to the session.               |
| `sessionSa360SourceMedium`       | Session SA360 source / medium      | Yes      | The SA360 Source Medium that led to the session.        |

#### Stream Dimensions

| API Name     | UI Name     | Segments | Description                                                 |
| ------------ | ----------- | -------- | ----------------------------------------------------------- |
| `streamId`   | Stream ID   | Yes      | The numeric data stream identifier for your app or website. |
| `streamName` | Stream name | Yes      | The data stream name for your app or website.               |

#### Test Data Dimensions

| API Name             | UI Name               | Segments | Description                                               |
| -------------------- | --------------------- | -------- | --------------------------------------------------------- |
| `testDataFilterId`   | Test data filter ID   | No       | The numeric identifier of a data filter in testing state. |
| `testDataFilterName` | Test data filter name | No       | The name of data filters in testing state.                |

#### Unified Dimensions

| API Name                | UI Name                                   | Segments | Description                                                               |
| ----------------------- | ----------------------------------------- | -------- | ------------------------------------------------------------------------- |
| `unifiedPagePathScreen` | Page path and screen class                | Yes      | The page path (web) or screen class (app) on which the event was logged.  |
| `unifiedPageScreen`     | Page path + query string and screen class | Yes      | The page path and query string (web) or screen class (app).               |
| `unifiedScreenClass`    | Page title and screen class               | Yes      | The page title (web) or screen class (app) on which the event was logged. |
| `unifiedScreenName`     | Page title and screen name                | Yes      | The page title (web) or screen name (app) on which the event was logged.  |

#### User Dimensions

| API Name             | UI Name                | Segments | Description                                                                                                  |
| -------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `newVsReturning`     | New / returning        | Yes      | New users have 0 previous sessions; returning users have 1+ previous sessions. Returns "new" or "returning". |
| `signedInWithUserId` | Signed in with user ID | Yes      | The string "yes" if the user signed in with the User-ID feature.                                             |
| `userAgeBracket`     | Age                    | Yes      | User age brackets.                                                                                           |
| `userGender`         | Gender                 | Yes      | User gender.                                                                                                 |

#### Video Dimensions

| API Name        | UI Name        | Segments | Description                                                                                                     |
| --------------- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `videoProvider` | Video provider | Yes      | The source of the video (example: youtube). Auto-populated for embedded videos if Enhanced Measurement enabled. |
| `videoTitle`    | Video title    | Yes      | The title of the video. Auto-populated for embedded videos if Enhanced Measurement enabled.                     |
| `videoUrl`      | Video URL      | Yes      | The URL of the video. Auto-populated for embedded videos if Enhanced Measurement enabled.                       |
| `visible`       | Visible        | Yes      | Returns true if the content is visible. Auto-populated for embedded videos if Enhanced Measurement enabled.     |

#### Virtual Currency Dimensions

| API Name              | UI Name               | Segments | Description                                                                                     |
| --------------------- | --------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `virtualCurrencyName` | Virtual currency name | Yes      | The name of a virtual currency (example: gems in a game). Populated by `virtual_currency_name`. |

---

### Custom Dimensions

The Data API can create reports on Event and User scoped Custom Dimensions.

#### Syntax

| Generic API Name                         | Segments | Description                                                                        |
| ---------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `customEvent:parameter_name`             | Yes      | Event-scoped Custom Dimension for parameter_name                                   |
| `customEvent:parameter_name[event_name]` | Yes      | Event-scoped Custom Dimension for parameter_name if registered before October 2020 |
| `customUser:parameter_name`              | Yes      | User-scoped Custom Dimension for parameter_name                                    |

**Note:** Custom dimensions are specified by the dimension's parameter name and
scope. For example, use `"customEvent:achievement_id"` to create a report for
the Event-scoped Custom Dimension with parameter name `"achievement_id"`.

**Historical Note:** If an Event-scoped Custom Dimension was registered before
October 2020, specify it with its event name:
`"customEvent:achievement_id[level_up]"`.

#### Resources

- [Event-scoped custom dimensions and metrics reporting](link)
- [Custom user properties](link)
- [Metadata API method](link) to list all Custom Dimensions for a Property

---

### Custom Channel Groups

The Data API can create reports on Custom Channel Groups.

#### Syntax

| Generic API Name                                | Description                                       |
| ----------------------------------------------- | ------------------------------------------------- |
| `sessionCustomChannelGroup:custom_channel_id`   | The custom channel that lead to this session.     |
| `firstUserCustomChannelGroup:custom_channel_id` | The custom channel that first acquired this user. |
| `customChannelGroup:custom_channel_id`          | The custom channel that led to the key event.     |

**Example:** Include `"sessionCustomChannelGroup:9432931"` to create a report
for the Session-scoped Custom Channel with an ID of 9432931.

#### Resources

- [Custom channel groups in Google Analytics](link)
- [Metadata API method](link) to list all Custom Channel Groups for a Property

---

## Metrics

The following metrics can be in funnel reports for any property.

| API Name                    | UI Name          | Description                                                                                                     |
| --------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `activeUsers`               | Active users     | The number of distinct users who visited your site or app.                                                      |
| `funnelStepAbandonmentRate` | Abandonment rate | The percentage of users that abandon the funnel at this step. Returned as a fraction (example: 0.412 = 41.2%).  |
| `funnelStepAbandonments`    | Abandonments     | The absolute number of users that abandon the funnel at this step.                                              |
| `funnelStepCompletionRate`  | Completion rate  | The percentage of users that complete this step of the funnel. Returned as a fraction (example: 0.588 = 58.8%). |

---

## Additional Resources

- **Documentation:**
  [Event-scoped custom dimensions and metrics reporting](link)
- **Documentation:** [Custom user properties](link)
- **Documentation:** [Custom channel groups](link)
- **API Reference:** [Metadata API method](link)
- **License:** Content licensed under
  [Creative Commons Attribution 4.0 License](link)
- **Code Samples:** Licensed under [Apache 2.0 License](link)

**Last Updated:** 2025-03-10 UTC
