Why deduplication matters
Deduplication directly impacts the accuracy of your ad performance metrics, such as:

Conversion rate: Prevents inflation by ensuring each conversion is counted only once.
Return on ad spend (ROAS): Accurate event counts lead to more reliable ROAS calculations.
Attribution: Ensures conversions are attributed correctly, avoiding over-reporting.
Without deduplication, you may see artificially high conversion numbers, which can mislead optimization and budget allocation decisions.

Understanding event sources: Meta Pixel vs. Conversions API
Meta Pixel: A browser-based tool that tracks user actions (events) on your website, such as page views, purchases, or form submissions.
Conversions API: A server-side method for sending web events directly from your server to Meta, increasing reliability and data completeness.
Key differences:

Pixel relies on browser data, which can be blocked or lost due to browser settings or connectivity issues.
Conversions API sends data from your server, making it more resilient to browser limitations and ad blockers.
For more on which events you can send and how to configure them, see About standard and custom website events.

When and how to deduplicate events
Deduplication is necessary when you send the same event (e.g., a purchase) from both the browser (Pixel) and the server (Conversions API). This is often done to recover lost events or improve data accuracy.

Deduplication needed:
You send the same event (e.g., Purchase) from both sources.
Deduplication not needed:
You send different events from each source (e.g., AddToCart from browser, Purchase from server).
Deduplication conditions and logic
For Meta to deduplicate events, the following conditions must be met:

The event_name (e.g., Purchase) must match between the Pixel and Conversions API events.
The event_id must be identical for both events.
Alternatively, deduplication can also occur if the event_name and either the external_ID or fbp parameters match.

Why are these parameters important? They allow Meta to recognize that two events (one from browser, one from server) represent the same user action.

Deduplication logic:

If server and pixel events are similar, Meta prefers the event received first.
Deduplication applies to:
Redundant pixel events (identical event and eventID)
Redundant server events (identical event_name and event_id)
Redundant pixel and server events (matching event_name and event_id, or event_name and external_ID/fbp)
Examples of deduplication scenarios
Redundant Pixel events:
The same event is sent multiple times from the browser.
Redundant server events:
The same event is sent multiple times from the server.
Redundant Pixel and server events:
The same event is sent from both sources.
Using fbp and external_ID:
If event_id is not available, deduplication can use these parameters.
