## Set up audiences

# \[GA4\] Create, edit, and archive audiences

[Next: Suggested audiences](https://support.google.com/analytics/answer/10427338?hl=en&ref_topic=14272803)

_This article is for website and/or app owners who want to create audiences for
reporting in Analytics and for export to ad platforms for remarketing._

Audiences let you segment your users in the ways that are important to your
business. You can segment by dimensions, metrics, and events to include
practically any subset of users.

As Analytics gets new data about users, their audience memberships are
reevaluated to ensure they still meet the audience criteria. If the latest data
indicate they no longer meet the criteria, they are removed from those
audiences.

If you
[link your Analytics account to Google Ads](https://support.google.com/analytics/answer/9379420)
and keep the default option to _Enable Personalized Advertising_, then your
audiences are available in your
[shared library in Google Ads](https://support.google.com/google-ads/answer/3176171),
and you can use them in your ad campaigns. You can remarket to existing or
previous users, and you can create similar audiences to prospect for new users.

The user lists in Ads that correspond to your audiences are prepopulated with up
to 30 days of data when that data is available.

_In this article_:

- [Management table](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#management-table)
- [Create an audience](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#create-an-audience)
- [Share audiences with Google Ads for activation and measurement](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#share-audiences)
- [Edit an audience](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#edit)
- [Archive an audience](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#archive)
- [Detailed step examples](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#examples)
- [Related resources](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#resources)

## Management table

The table lists predefined audiences and ones you have customized. The following
audiences are predefined:

- All users: Users who have ever launched your app or visited your website.
- Purchasers: Users who have completed a purchase.

Click an audience in the table to see a detailed report for that audience. The
user metrics in this report count users who were active during the date range
you're using for the report (as opposed to counting the total number of users in
the audience).

### Duplicate, edit, archive, apply to dashboards

Click ![action menu][image1] at the far right of a row to duplicate, edit,
archive, or apply the audience to your dashboard.

You need the
[Marketer role](https://support.google.com/analytics/answer/9305587) (not an
editor role) for the property in which you want to create the audience.

### Limits

There are a few limits to consider when managing your audiences:

- You have a limit of up to 100 audiences for each property for Standard
  properties. For 360 properties, there is a limit of up to
  [400 audiences per property](https://support.google.com/analytics/answer/11202874).
- You can export an audience to an unlimited number of destinations, including
  [native integrations](https://support.google.com/analytics/answer/12800258)
  with Google Ads, DV360, SA360, Ad Manager, Firebase, or export via the
  [Audience Export API](https://developers.google.com/analytics/devguides/reporting/data/v1/audience-export-basics).
  However, you can only save a maximum of 100 audiences for each Google
  Analytics standard property.
- Each audience condition has a character limit of 500 characters.

## Create an audience

You create an audience by setting conditions based on the dimension, metric, and
event data you collect from a property. After you create an audience, it
accumulates users who meet the conditions from that point onward.

For subtitles in your language, turn on YouTube captions. Select the settings
icon Image of YouTube settings icon at the bottom of the video player, then
select "Subtitles/CC" and choose your language.

---

When you create a new audience, it can take 24-48 hours for the audience to
accumulate new users. In general, when a new user satisfies the audience
criteria, it can take a day or two for that new user to be included in the
audience.

#### **Scope**

When you set conditions, you set the scope of when the conditions must be met:
across all sessions, in a single session, or in a single event. You can set a
maximum of 10 conditions.

#### **Static vs. dynamic evaluation**

Conditions support static and dynamic evaluation. Static evaluation includes
users if the condition was ever true for them. Dynamic evaluation includes users
when they meet the condition and excludes them when they do not.

#### **Time-windowed metrics**

Conditions also support time-windowed metrics: you can specify that a metric
condition can be true during any point in the lifetime of a user or that it must
be true during a specific number of days (e.g., \> 5 during any 7 day period).

#### **Sequences**

Sequences let you specify the order in which conditions must be met: indirectly
followed by (anytime after the previous step), directly followed by (immediately
after the previous step), or within a specific timeframe. Sequences also let you
specify scope for the entire sequence.

#### **After you create an audience**

After you create an audience, it accumulates users who meet the conditions from
that point onward.

When you create an audience, Analytics adds any users who have met the audience
criteria during the last 30 days. This applies to Google Ads audiences only.

As you define your audience, the Summary card updates with the number of users
who have met your criteria during the last 30 days so you have an idea of
potential audience size.

#### **Create**

To create an audience:

1. In
   [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks),
   under _Data display_, click
   [Audiences](https://analytics.google.com/analytics/web/#/?pagename=admin-audiences&utm_source=gahc&utm_medium=dlinks).

Note: The previous link opens to the last Analytics property you accessed. You
must be signed in to a
[Google Account](https://support.google.com/analytics/answer/27441) to open the
property. You can
[change the property](https://support.google.com/analytics/answer/12813202)
using the property selector. You must be a
[Marketer or above](https://support.google.com/analytics/answer/9305587) at the
property level to create audiences.

2. Click New audience.
3. You have three options for creating an audience:
   - [Create a new audience](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#create)
     by defining all the parameters yourself.
   - [Use a template](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#template)
     and modify the existing parameters.
   - [Select a suggested audience](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#suggested).
     You can use it as is, or modify it to suit your needs.

The image below identifies the different controls you use when you build an
audience.

![][image2]

### Create a new audience

1. Click New audience.
2. Click Create a custom audience.
3. Enter a name and description for the audience. This name and description let
   you identify the audience in the management table.
4. Click Add new condition to add users who meet conditions based on dimensions,
   metrics, and events. For example: Age is one of 18-24, 25-34.  
   [See examples of using this part of the audience builder](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#step4).
   - Set the scope of the condition. Use the menu at the top right to choose an
     option:
     - Across all sessions: all conditions must be met during the lifetime of
       the user
     - Within the same session: all conditions must be met within the same
       session
       ([Learn more](https://support.google.com/analytics/answer/9191807) about
       how sessions are calculated)
     - Within the same event: all conditions must be met in a single event
   - Dimensions
     - Conditions support static and dynamic evaluation of dimensions. Select At
       any point to include users if they ever met the condition (static
       evaluation). If you don't select this option, then user evaluation for an
       audience is dynamic: users are added to an audience when they meet the
       conditions and then removed when they no longer meet them.
   - Metrics
     - For information on working with predictive metrics, see
       [Predictive audiences](https://support.google.com/analytics/answer/9805833).
     - Conditions support time-windowed metrics. For example: LTV \> 5 _in any 7
       day period_
     - Select the Time period option to use a time-windowed count vs. a lifetime
       count.
   - Events
     - Conditions support dynamic lookback for events when the scope is Across
       all sessions and you select the `event_count` parameter.
       - Turn on the switch for Time Period.  
         Select either:  
         At any point in time (condition is true if `event_count` threshold was
         ever exceeded)  
         or  
         Most recent time period (condition is true if `event_count` threshold
         was exceeded during the past number of days you specify).  
         Enter the number of days for the time period.
   - Add OR or AND conditions as necessary.
5. Click Add condition group to add another condition.
6. Click Add sequence to add users who meet conditions that occur in a specific
   order, and optionally within a specific time period. For example: Step 1:
   first_open, Step 2: in_app_purchase.  
   [See examples of using this part of the audience builder](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#step6).
   - Set the scope of the sequence: Across all sessions, Within the same
     session.
   - Set _Time Constraint_ to ON, and define the time period in which the whole
     sequence must occur (e.g., 30 Minutes).
   - Set the scope for Step 1: Across all sessions, Within the same session,
     Within the same event.
   - Configure the condition for Step 1\.
   - Click Add step for each additional step you want to include in the
     sequence.
     - Select is indirectly followed by if the additional step can occur any
       time after the previous step.
     - Select is directly followed by if the additional step has to occur
       immediately after the previous step.
     - Select Within to define the maximum amount of time between steps.
     - Set the scope for the step.
7. Click Add group to exclude to create a condition that excludes specific
   users.

   Select Temporarily exclude users when to exclude users from the audience
   during periods when they meet the condition.

   Select Permanently exclude users when to exclude users from the audience if
   they've ever met the condition.

   Users are first evaluated by INCLUDE conditions, and then any EXCLUDE
   conditions. If they meet the EXCLUDE conditions, they are not added to the
   audience.

   [See examples of using this part of the audience builder](https://support.google.com/analytics/answer/9267572?sjid=14517523887100826568-EU#step7).

8. Membership duration: Max 540 days/18 months from the time user is added to
   audience last.

   [Reset on new activity](https://support.google.com/analytics/answer/7667196#resetnewact):
   When enabled, the membership audience duration is limited to 14 months.  
   When disabled, it overrides max audience duration to 14 months (or 2 months
   in future when user data TTL rolls out and customer explicitly selects 2
   months).

9. Each time you engage in behavior that meets the criteria for being included
   in the audience, your membership duration is reset to the full value of this
   option.

   For audiences exported to other products, GA retention settings no longer
   have control. The receiving product will apply their own policies.

10. Click Save to save your conditions and create the audience.

### Use a template

Audience templates are partially configured audiences that already identify a
set of dimensions and/or metrics that form the basis of widely applicable
audiences for app- and web-based businesses.

For example, the _Demographics_ template includes the Age, Gender, Language,
Interest IDs, and Location dimensions that you can use to define a particular
audience in which you're interested. Using this template, you supply the
operators and dimension values that define the audience you want, e.g.:

- Age exactly matches 18-24
- Gender exactly matches female
- etc.

After you complete the audience definition, enter a name, and click Save.

### Select a suggested audience

Analytics also provides a number of fully configured audiences that you can use
as is or modify if necessary. These suggested audiences are based on the
categories you specify for your apps in Apple's App Store and in Google Play and
on the industry category you specify when you configure a property.
[Learn more](https://support.google.com/analytics/answer/10427338)

For example, the _Recently active users_ audience is defined as follows:

- Include Users when (event \=) user_engagement

You can use the audience as is, or you can add conditions or sequences, or
change the membership duration as necessary.

Use the default name or enter a new name, then click Save.

For information on working with suggested predictive audiences, see
[Predictive audiences](https://support.google.com/analytics/answer/9805833).

## Share audiences with Google Ads for activation and measurement

If you have
[linked your Analytics account to Google Ads](https://support.google.com/analytics/answer/9379420)
and keep the default option to _Enable Personalized Advertising_, then your
audiences are automatically shared with Google Ads for use in advertising
campaigns.

An audience accumulates users who meet the specified criteria from the point of
creation onward by virtue of the events that their devices log. When defining
new audiences, it may take some time for the lists to populate.

Note that GA4 audience size will typically be different from remarketing-list
size shown in Google Ads. Learn more about the
[Audience size differences between Google Analytics and Google Ads](https://support.google.com/analytics/answer/13656908).

## Share audiences with Display & Video 360 and Search Ads 360

When you link Analytics to
[Display & Video 360](https://support.google.com/analytics/answer10439659) or
[Search Ads 360](https://support.google.com/analytics/answer/11085214), your
Analytics audiences are automatically exported if you have activated either
[Google signals](https://support.google.com/analytics/answer/9445345) or
[user-provided data collection](https://support.google.com/analytics/answer/14077171)
in the Analytics property and if you keep the default link setting to enable
personalized advertising.

## Edit an audience

After you create an audience, you can edit only the name and description.

To edit an audience:

1. In
   [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks),
   under _Data display_, click
   [Audiences](https://analytics.google.com/analytics/web/#/?pagename=admin-audiences&utm_source=gahc&utm_medium=dlinks).  
   Note:
   The previous link opens to the last Analytics property you accessed. You must
   be signed in to a
   [Google Account](https://support.google.com/analytics/answer/27441) to open
   the property. You can
   [change the property](https://support.google.com/analytics/answer/12813202)
   using the property selector. You must be a
   [Marketer or above](https://support.google.com/analytics/answer/9305587) at
   the property level to edit the audiences.
2. In the row for the audience, click ![More][image3] \> Edit.
3. Edit the name or description.
4. Click Save.

## Archive an audience

If you have reached your limit of 100 audiences and need to create new ones, you
can archive the ones that are no longer relevant, and then create new ones.
After you archive an audience, it may take up to 48 hours before you can create
an audience with the same name.

Archiving an audience permanently removes it. You can’t access or restore
archived audiences.

To archive an audience:

1. In
   [Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks),
   under _Data display_, click
   [Audiences](https://analytics.google.com/analytics/web/#/?pagename=admin-audiences&utm_source=gahc&utm_medium=dlinks).  
   Note:
   The previous link opens to the last Analytics property you accessed. You must
   be signed in to a
   [Google Account](https://support.google.com/analytics/answer/27441) to open
   the property. You can
   [change the property](https://support.google.com/analytics/answer/12813202)
   using the property selector. You must be a
   [Marketer or above](https://support.google.com/analytics/answer/9305587) at
   the property level to archive the audiences.
2. In the row for that audience, click ![More][image4] \> Archive.

## Detailed step examples

Step 4: Add new conditions

Step 5: Add sequences

Step 6: Add group to exclude

## Related resources

- [\[GA4\] Import user data](https://support.google.com/analytics/answer/10071143)
- [Why your audiences may not be populating in Google Ads](https://support.google.com/analytics/answer/13327091)
- [Create new Google Analytics audiences directly in your Google Ads account](https://support.google.com/google-ads/answer/13315615)
