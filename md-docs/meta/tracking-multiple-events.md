# Track Multiple Events with Meta Pixels

## Overview

Implementing a Pixel is one of the cornerstones of Meta Marketing to help you
measure, optimize your ads and create the most relevant audiences for your
business. Quite often, planning the optimal setup for your site may simply be
getting the base Pixel code on to your site and tagging key elements or critical
parts of your funnel. But in some cases, you may legitimately need to have
multiple Pixels on the site to satisfy business realities.

## Multiple Pixels Use Case

There are instances where multiple Pixels could be a viable option to manage
your marketing needs—especially when there are multiple stakeholders involved.

### Example Scenario

Imagine your large organization deals with one agency (Agency A) for performance
marketing and another agency for branding activity (Agency B). Agency A and B
have different processes to update their tags (for example, tag
managers/containers and ownership) and plan all their activity separately.

**Key Question**: What would be the best recommendation to consolidate these
multiple codes to reduce the maintenance burden, ensure the most accurate
tracking and minimize the possibility of technical errors?

## Unexpected Behavior with Multiple Pixels

The two following examples demonstrate instances where there may be unexpected
behavior or extraneous Pixel events firing. This firing could skew reporting and
yield undesirable results when working with multiple codes.

### Scenario Setup

- **Agency A** wants to track a `Purchase` event in Pixel A
- **Agency B** wants to track a custom event (`Step4`) on Pixel B
- Two base codes are installed on the same page to fire when it loads

### Example 1: Two Pixels in Two Base Codes

#### Code Implementation

```html
<script>
  //... base code truncated
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL-A');
  fbq('track', 'PageView');
  fbq('track', 'Purchase', {
                                  'value': 4,
                                  'currency': 'GBP'
  });
</script>

<script>
  // ... base code truncated
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL-B');
  fbq('track', 'PageView');
  fbq('trackCustom', 'Step4'); //fires for both Pixel A and B
</script>
```

#### Expected vs. Actual Results

**Expected Behavior:**

- `Purchase` events captured in Pixel A only
- `Step4` custom event captured in Pixel B only

**Actual Behavior:**

| Pixel   | PageView Event | Purchase Event | Step4 Event           |
| ------- | -------------- | -------------- | --------------------- |
| Pixel A | ✅ Fired       | ✅ Fired       | ⚠️ Fired (Unexpected) |
| Pixel B | ✅ Fired       | -              | ✅ Fired              |

#### Root Cause

Even if there are two base Pixel codes, the `fbevents.js` code only downloads or
loads once.

### Example 2: Two Pixel IDs in a Single Base Code

#### Code Implementation

```html
<script>
  // ... base code truncated
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL-A');
  fbq('track', 'PageView');
  fbq('track', 'Purchase', {
                                  'value': 4,
                                  'currency': 'GBP'
  });

  fbq('init', 'PIXEL-B');
  fbq('track', 'PageView');
  fbq('trackCustom', 'Step4'); //fires for both Pixel A and B
</script>
```

#### Result

This code yields the exact same overfiring behavior as Example 1.

### Why Do These Snippets Yield Unexpected Results?

**Technical Explanation:**

When the `init` function is called against a Pixel ID, it stores it in a global
queue structure where any subsequent call to `track` or `trackCustom` is fired
for any Pixel that was previously initialized.

**Consequence:**

In the previous example, the `Step4` custom event is fired for Pixel A, even
when the `trackCustom` call is inserted after the initialization call for Pixel
B. If unaware of this behavior, you may be firing extra events that may
inadvertently affect reporting.

## Solution: New Capabilities

### trackSingle and trackSingleCustom

**Release Date:** Early November 2017

**Purpose:** These options enable you to selectively fire events for a specific
Pixel—even when multiple Pixels are initialized on the page—without unexpected
consequences.

### Correct Implementation

#### Code Example

```html
<script>
  //... base code truncated
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL-A');
  fbq('init', 'PIXEL-B');
  fbq('track', 'PageView'); //fire PageView for both initialized pixels

  // only fire the Purchase event for Pixel A
  fbq('trackSingle', 'PIXEL-A', 'Purchase', {
              value: 4,
              currency: 'GBP',
  });

  // only fire the custom event Step4 for Pixel B
  fbq('trackSingleCustom', 'PIXEL-B', 'Step4',{
      //optional parameters
  });
</script>
```

#### Results

| Pixel   | PageView Event | Purchase Event | Step4 Event |
| ------- | -------------- | -------------- | ----------- |
| Pixel A | ✅ Fired       | ✅ Fired       | -           |
| Pixel B | ✅ Fired       | -              | ✅ Fired    |

## Key Takeaways

1. **Understand Behavioral Differences:** Understanding the behavioral
   differences among `track`, `trackSingle` or `trackSingleCustom` is important
   when there's a possibility of multiple Pixels interacting on your page.

2. **Use Selective Tracking:** Using these new capabilities allows accurate
   tracking for multiple Pixels and ensures there's no conflicting or unexpected
   behavior when events are defined to fire.

3. **API Methods Summary:**
   - `track()` - Fires for all initialized Pixels
   - `trackCustom()` - Fires for all initialized Pixels
   - `trackSingle()` - Fires only for the specified Pixel ID
   - `trackSingleCustom()` - Fires only for the specified Pixel ID

## Implementation Guidelines

### When to Use Each Method

- **Use `track()` / `trackCustom()`:** When you want an event to fire for all
  initialized Pixels
- **Use `trackSingle()` / `trackSingleCustom()`:** When you need precise control
  over which Pixel receives specific events in a multi-Pixel environment

### Best Practices

1. Initialize all Pixels at the beginning of your script
2. Use `track('PageView')` for global events that should fire on all Pixels
3. Use `trackSingle()` or `trackSingleCustom()` for Pixel-specific events
4. Document which agency or stakeholder owns which Pixel ID
5. Test thoroughly to ensure events fire only for intended Pixels
