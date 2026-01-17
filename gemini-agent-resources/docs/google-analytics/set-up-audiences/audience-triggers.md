## Set up audiences

## GA4 Audience triggers

[Next: Advertising segments](https://support.google.com/analytics/answer/14994291?hl=en&ref_topic=14272803)

Audience triggers let you trigger events when users match the definition of an
audience and become members.

You can trigger events, for example, when users reach key milestones like
initiating a certain number of sessions or reading a certain number of articles,
or
[crossing key event thresholds](https://support.google.com/analytics/answer/9934109?hl=en&ref_topic=14272803&sjid=14517523887100826568-EU#thresholds).

You can analyze these events in your reports, and you can enable them as
[**key events**](https://support.google.com/analytics/answer/9355848) as with
any other events.

In cases where audience conditions are fully satisfied by a single event,
metadata from that event is copied to the triggered event. In cases where
audience conditions are satisfied by multiple events, metadata from the last
event is copied to the triggered event. Copied metadata includes timestamp and
session information but does not include the page/screen associated with the
event.

The following are some examples of metadata that could be copied from the
original event to the triggered event:

1. User information
   - User ID (if enabled)
2. Session information
   - Session ID
   - Start time
   - Duration
3. Event details
   - Timestamp
   - Event name

You can't use audience-trigger events as the basis for audience conditions.

## Create audience-trigger events

You can create up to 20 audience-trigger events per property.

To create a trigger event as you're building an audience:

1. To the right of the condition builder, under "Audience trigger", click \+
   Create new.
2. Enter a name for the event.
3. Select Create an additional event (up to one per day) when audience
   membership refreshes if you want to trigger an event each time a user meets
   the audience criteria, even if they are already a member of that audience.
   - Note: Users added to an audience list are evaluated against the audience
     criteria each time they visit your website or app. If these criteria are
     met and the Create an additional event (up to one per day) when audience
     membership refreshes option is selected, the audience-trigger event will be
     triggered (up to one per day) regardless of the user’s current membership
     status.
4. Click Save.

#### **Example**

Let’s say you have an audience that includes users when the `purchase` count is
greater than or equal to 2 in the last 7 days. You then created an
audience-trigger event named `audience_trigger_purchase` for this audience list.

Now, a user made 2 purchases on your website and returned 4 more times within 7
days without buying anything else.

In this example, the user would be added to your audience list and would have 2
`purchase` counts and one event count for `audience_trigger_purchase`. If the
Create an additional event (up to one per day) when audience membership
refreshes was selected when you set up the audience-trigger event, the
`audience_trigger_purchase` would have an event count of 5\.

## Edit / delete audience triggers

To edit an event, click ![Edit][image1] next to the event name.

To delete an event, click Delete next to the event name.

## Key event thresholds

You can trigger events for simple thresholds. For example, if the condition for
your audience "High-value customers" defines members as users whose lifetime
value is greater than 100, then each time a user meets that condition and
becomes an audience member, you can trigger an event like
`new_high_value_customer`.

You can also use these events as proxies for more complex key events, for
example, if you define the audience "Frequent long-term guests" as

`Event: booked_hotel`

`Parameter: days_booked`

`Parameter condition: > 13 days`

`AND`

`Event: booked_hotel`

`Parameter: event_count`

`Parameter condition: > 1 in any 60-day period`

then anytime a user met those conditions, you could trigger an event like
`new_frequent_longterm`.

By monitoring the count of those events, you can see the pace at which your
audiences grow.
