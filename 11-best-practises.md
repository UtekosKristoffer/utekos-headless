# Best Practices for Conversions API to Help Improve Ad Performance

This article applies to businesses that use the Conversions API to send website
events.

The following Conversions API best practices can help improve your ad
performance by lowering your cost per action.

To maximize the effectiveness of Meta ads, apply these Conversions API best
practices when setting it up initially. If you have already set up the
Conversions API, consider implementing these practices to refine your existing
setup.

## Redundant Setups

- **Use the Conversions API alongside the Meta Pixel**, sharing the same events
  through both tools. This is known as a redundant event setup. For example, if
  you share purchase, initiate checkout, and contact events via the pixel, share
  those same events from your server using the Conversions API. Redundant setups
  are beneficial because the Conversions API can capture website events that the
  pixel might miss due to network issues or page loading errors.
  [Learn how to check if you're sharing redundant web events](https://www.facebook.com/business/help/823677331451951).

- **Ensure parity between Meta Pixel and Conversions API integrations** by
  monitoring event coverage. Event coverage shows the total browser and server
  events sent to Meta. Aim for a 75% event coverage ratio of Conversions API to
  Meta Pixel events for accurate reporting and optimal ad performance. Achieve
  this by sending all relevant events through the Conversions API, including
  those potentially lost due to browser restrictions or technical issues.
  Regular monitoring in Meta Events Manager can help identify improvement areas
  and optimize your setup.
  [Learn how to check event coverage in Meta Events Manager](https://www.facebook.com/business/help/2041148702818936).

- **Deduplicate redundant events** to avoid double reporting. When using both
  the pixel and Conversions API, you may receive identical events from the
  browser and server. Deduplication allows you to keep one event and discard
  duplicates. Indicate whether an event is a duplicate by including specific
  parameters.
  [Learn more about deduplication and how to monitor your deduplicated events](https://www.facebook.com/business/help/823677331451951).

## Event Match Quality

Aim to improve **event match quality**, which indicates how effectively customer
information parameters match events with a Meta account. Better event match
quality can increase additional conversions reported. Find recommended actions
to enhance event matching in Events Manager. You can also track conversion rate
impacts over time by monitoring the trendline for additional conversions in Meta
Events Manager. This metric offers insights into how changes in data quality
affect conversion rates, helping refine your strategy and optimize ad
performance.
[Learn more about event match quality and how to check it in Meta Events Manager](https://www.facebook.com/business/help/765081237991954).

Include parameters to improve your event match quality in Meta Events Manager:

- **Increase coverage of customer information parameters.** More events with
  these parameters increase the likelihood of a match.
  [Learn how customer information parameters can enhance event match quality](https://www.facebook.com/business/help/611774685654668).

  > **Note:** Ensure you have obtained lawful permissions and necessary consents
  > before sharing information with third parties. For guidance, refer to our
  > [consent guide](https://www.facebook.com/business/gdpr) and consult your
  > legal counsel to develop a compliance plan.

- **Prioritize customer information parameters** that are likely to improve
  event match quality. The target audience influences parameter effectiveness,
  but there is a general priority for each parameter.
  [Learn more about customer information parameters and how to prioritize them](https://www.facebook.com/business/help/611774685654668).

## Other Best Practices

- **Share your events in real time** or as close to real time as possible.
  Prompt event sharing enables the ad delivery system to evaluate the likelihood
  of a person taking the desired action after viewing your ad.
  [Learn more about event delay times and how to check the data freshness of your server events in Events Manager](https://www.facebook.com/business/help/2041148702818936).

- **Expand integration** by connecting more pixels and sharing more events, if
  applicable. Connecting unlinked pixels to a Conversions API integration can
  improve ad performance. Sharing events using both the pixel and Conversions
  API provides more data for ad optimization.

- **Continue to monitor your Conversions API setup regularly.** Regular event
  data monitoring ensures the setup functions correctly and identifies
  opportunities for improvement.
  [Learn how to monitor your Conversions API setup](https://www.facebook.com/business/help/2041148702818936).

- **Apply opportunity score recommendations when they're available:** When
  eligible, you can get experimentally proven mobile video ads recommendations
  in opportunity score. Opportunity score is a tool from Meta that helps you
  identify and prioritize effective campaign recommendations in near real time.
  [Learn about opportunity score](https://www.facebook.com/business/help/465262127820558).

  > **Note:** Opportunity score is not yet available to all ad accounts. The
  > score (including a high score) itself does not reflect your actual or future
  > performance. Actual performance depends on many factors and your opportunity
  > score does not guarantee performance.
