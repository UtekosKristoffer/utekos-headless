# Control the event parameters available to tags with Transformations

This document is for users of server-side tagging who need control over which event parameters are exposed to tags.

A server-side container contains a client that accepts incoming HTTP requests. The information in the HTTP request is translated into an event data object. Your server-side tags read the event data object.

## What are transformations?

Transformations allow you to include, exclude or modify event parameters output from your client before they are exposed to tags. With transformations you can safeguard sensitive information and have fine-grained control over what event parameters are available for further processing.

Transformations let you create rules to:

-   Allow sharing of only explicitly defined event parameters with tags.
-   Augment event parameters by creating rules to edit or add event parameters.
-   Redact incoming information by excluding event parameters from tags.

You can apply a transformation to all of your tags, entire tag types or an individually selected set. Furthermore, you can apply a set of conditions that have to be met before the transformation runs.

Variables are evaluated every time a transformation runs. Depending on what your transformations do, your variables might resolve to different values.

### Allow tags to use event parameters

The **Allow parameters** transformation lets you specify certain event parameters that you want to expose to your tags. Event parameters that aren't explicitly defined are discarded.

**Caution**: The **Allow parameters** transformation removes all event parameters that aren't explicitly specified - even values required by Google tags. Before you create this transformation, inspect which event parameters your tags use and make sure to include all needed event parameters. Otherwise, your measurement may be impaired. See the [event data reference](https://developers.google.com/tag-platform/tag-manager/server-side/reference#event_data) and [measurement protocol events](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) for more information.

To allow tags to use certain event parameters:

1.  In your workspace, open the **Transformations** menu.
2.  Create a **New** transformation rule.
3.  Click **Transformation Configuration** and select **Allow parameters**.
4.  Add event parameters that tags can use. See all [common event parameters](https://developers.google.com/tag-platform/tag-manager/server-side/common-event-data).
5.  Optional: **Matching Conditions** lets you define rules for when to activate the transformation. By default, transformation rules always apply.
6.  In **Affected Tags**, choose the tag types or individual tags that respond to this transformation rule. By default, the transformation applies to all tags.
7.  Name and **Save** the transformation rule.

#### Example: Log select information to your BigQuery table

Taking control over the parameters you log lets you:

-   Ensure that sensitive information isn't logged in your internal datastore.
-   Prevent over-logging which saves you storage and Cloud costs.
-   Store relevant metrics for monitoring and reporting.

[Show me how to do it!](https://developers.google.com/tag-platform/tag-manager/server-side/send-data-to-bigquery#log-select-information)

### Augment event parameters

The **Augment event** transformation lets you modify values of event parameters or add new parameters to be made available to tags.

**Caution**: Tags might not work as expected when the parameters they use are modified. Check which parameters your tags rely on before augmenting parameters.

To modify or add certain event parameters:

1.  In your workspace, open the **Transformations** menu.
2.  Create a **New** transformation rule.
3.  Click **Transformation Configuration** and select **Augment event**.
4.  In **Parameters to Augment**:
    -   To modify existing event parameters, enter the parameter you want to modify in **Name** and add a new **Value**. See all [common event parameters](https://developers.google.com/tag-platform/tag-manager/server-side/common-event-data).
    -   To add a new event data object value, enter a **Name** and **Variable** of your choice.
5.  Optional: **Matching Conditions** lets you define rules for when to activate the transformation. By default, transformation rules always apply.
6.  In **Affected Tags**, choose the tag types or individual tags that respond to this transformation rule. By default, the transformation applies to all tags.
7.  Name and **Save** the transformation rule.

#### Example: Set up value-based bidding for purchase events

Value-based bidding helps you improve campaign performance optimizing your ad spend to target users who have higher value to the business. Once you set up value-based bidding, Google Ads uses your conversion value to set bids that have more worth to you. The **Augment event** transformation is useful to set up value-based bidding server-side.

[Show me how to do it!](https://developers.google.com/google-ads/bidding/guides/set-up-value-based-bidding#implement-vbb-with-server-side-tag-manager)

The following instructions apply only if the Google Ads Conversion Tracking tag does not specify a conversion value.

To set up value-based bidding:

1.  Create a **New** transformation rule.
2.  Click **Transformation Configuration** and select **Augment event**.
3.  In **Parameters to Augment**, add a new row. Set up a variable to load your item's monetary value into the transformation:
    -   In the parameter **Name**, enter the name of the value you want to adjust, for example `value`. Replace all `value` fields since they represent the monetary value of an event.
    -   In the parameter **Value**, configure a variable that retrieves prices from your database. For example, if you store product data in Firestore, add a **Firestore Lookup** variable.
4.  In **Matching Conditions**, set up that this transformation should only apply to certain events. To apply value-based bidding only for purchase events, set: `{{Event Name}} equals purchase`.
5.  In **Affected Tags**, add all Google Ads Conversion Tracking tags for which this transformation should apply.
6.  Name and **Save** your tag.

### Exclude event parameters from tags

The **Exclude parameters** transformation is useful to remove specific event parameters from your tags.

**Caution**: Tags might not work as expected when the parameters they require are excluded. Check which parameters your tags rely on before transforming parameters.

To exclude tags certain event parameters:

1.  In your workspace, open the **Transformations** menu.
2.  Create a **New** transformation rule.
3.  Click **Transformation Configuration** and select **Exclude parameters**.
4.  Add event parameters that tags cannot use. See all [common event parameters](https://developers.google.com/tag-platform/tag-manager/server-side/common-event-data).
5.  Optional: **Matching Conditions** lets you define rules for when to activate the transformation. By default, transformation rules always apply.
6.  In **Affected Tags**, choose the tag types or individual tags that respond to this transformation rule. By default, the transformation applies to all tags.
7.  Name and **Save** the transformation rule.

#### Example: Exclude select GA4 custom dimensions based on user consent

The **Exclude parameters** lets you stay in control of what first-party data is sent to Google. For example, when a user denies `analytics_storage` cookies, you may want to remove select custom dimensions.

To remove a custom dimension:

1.  Create a **New** transformation rule.
2.  Click **Transformation Configuration** and select **Exclude parameters**.
3.  In **Parameters to Exclude**, add a new row and set the custom dimensions you want to exclude, for example, `payment_type`, `payment_status`.
4.  In **Matching Conditions**, set up that the transformation should only apply when a user denies `analytics_storage` cookies.
    Form the following conditions:
    -   `{{gcs}}` equals `G100`
    -   `{{gcs}}` equals `G110`
5.  Optional: In **Affected Tags**, add all tags for which this transformation should apply.
6.  Name and **Save** your tag. It should look similar to this:

### Verify your transformation rules are applied

You can verify your transformation rules by previewing your workspace:

1.  Open your website.
2.  In your Google Tag Manager server container, select **Preview**.
3.  Tag Assistant starts and loads your server container.
4.  To see all tags and actions that fired for an event, select an event name from the list on the left.
5.  Verify a transformation ran:
    1.  In the event you want to verify, open the **Tags** tab.
    2.  Select a tag that fired to view the tag properties, outgoing HTTP requests, firing triggers, and transformations.

**Note**: Transformations only affect tags that fired. A transformation can cause your tag to not fire if it modifies or removes required event parameter fields.

The **Tag Details** overview shows you which transformations ran for a tag and in what order. The default order is:

1.  Allow parameters
2.  Augment parameters
3.  Exclude parameters

**Tip**: You can change the default order by assigning a priority value to a transformation. The higher the value, the higher the priority.

To view transformation details, click on a transformation. The event parameters provided to the tag are displayed under the **Event Data** section.

When you click on the **Event Data** box, you can see the state of event parameters after all transformations ran. To view both the original and the transformed event parameters, check **Show Original**.
