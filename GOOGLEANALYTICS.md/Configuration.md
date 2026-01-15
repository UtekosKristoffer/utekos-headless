# Google Analytics Configuration

This document lists all configuration fields for Google Analytics.

**Note:** Do not use any of the fields listed on this page as names for your own custom parameters.

---

## allow_google_signals

To disable advertising features based on third-party advertising identifiers, set `allow_google_signals` to `false`.

- **Type:** `boolean`
- **Default:** `true`

**Examples:**

Set globally:
```javascript
gtag('set', 'allow_google_signals', true);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'allow_google_signals': true
});
```

---

## allow_ad_personalization_signals

Set to `false` to disable advertising personalization features.

- **Type:** `boolean`
- **Default:** `true`

**Examples:**

Set globally:
```javascript
gtag('set', 'allow_ad_personalization_signals', true);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'allow_ad_personalization_signals': true
});
```

---

## campaign_content

Used for A/B testing and content-targeted ads. Use `campaign_content` to differentiate ads or links that point to the same URL.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_content` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_content', 'logolink');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_content': 'logolink'
});
```

---

## campaign_id

Used to identify which campaign this referral references. Use `campaign_id` to identify a specific campaign.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_id` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_id', 'abc.123');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_id': 'abc.123'
});
```

---

## campaign_medium

Use `campaign_medium` to identify a medium such as email or cost-per-click.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_medium` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_medium', 'cpc');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_medium': 'cpc'
});
```

---

## campaign_name

Used for keyword analysis. Use `campaign_name` to identify a specific product promotion or strategic campaign.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_name` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_name', 'spring_sale');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_name': 'spring_sale'
});
```

---

## campaign_source

Use `campaign_source` to identify a search engine, newsletter name, or other source.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_source` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_source', 'google');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_source': 'google'
});
```

---

## campaign_term

Used for paid search. Use `campaign_term` to note the keywords for this ad.

- **Type:** `string`
- **Default:** `undefined`

**Note:** Setting this value will override the `utm_term` query parameter.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign_term', 'running+shoes');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign_term': 'running+shoes'
});
```

---

## campaign

An object containing all campaign values that can be set.

- **Type:** `object`
- **Default:** `undefined`

**Note:** The `campaign` object is provided to support legacy implementations, and is not recommended for most cases. Instead, use the `campaign_`-prefixed version of each field: `campaign_id`, `campaign_source`, `campaign_medium`, `campaign_name`, `campaign_term`, `campaign_content`.

Any campaign details you provide will override any `utm_` query parameters.

**Examples:**

Set globally:
```javascript
gtag('set', 'campaign', {
  'id': 'abc.123',
  'source': 'google',
  'medium': 'cpc',
  'name': 'spring_sale',
  'term': 'running+shoes',
  'content': 'logolink'
});
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'campaign': {
    'id': 'abc.123',
    'source': 'google',
    'medium': 'cpc',
    'name': 'spring_sale',
    'term': 'running+shoes',
    'content': 'logolink'
  }
});
```

---

## client_id

Pseudonymously identifies a browser instance. By default, this value is stored as part of the first-party Analytics cookie with a two-year expiration.

- **Type:** `string`
- **Default:** A randomly generated value for each user

**Examples:**

Set globally:
```javascript
gtag('set', 'client_id', 'aaa.bbb');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'client_id': 'aaa.bbb'
});
```

---

## content_group

- **Type:** `string`
- **Default:** (empty)

**Examples:**

Set globally:
```javascript
gtag('set', 'content_group', '/news/sports');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'content_group': '/news/sports'
});
```

---

## cookie_domain

Specifies the domain used to store the analytics cookie.

- **Type:** `string`
- **Default:** `'auto'`

Set to `'none'` to set the cookie without specifying a domain.

Set to `'auto'` (the default value) to set the cookie to the top level domain plus one subdomain (eTLD +1). For example if `cookie_domain` is set to `'auto'`, `https://example.com` would use `example.com` for the domain, and `https://subdomain.example.com` would also use `example.com` for the domain.

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_domain', 'example.com');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_domain': 'example.com'
});
```

---

## cookie_expires

Every time a hit is sent to Google Analytics, the cookie expiration time is updated to be the current time plus the value of the `cookie_expires` field. This means that if you use the default value time of two years (63072000 seconds), and a user visits your site every month, their cookie will never expire.

If you set the `cookie_expires` time to 0 (zero) seconds, the cookie turns into a session based cookie and expires once the current browser session ends.

- **Type:** `number`
- **Default:** `63072000`

**Caution:** If you set the cookie to expire too quickly, you will inflate your user count and decrease the quality of your measurement.

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_expires', 28 * 24 * 60 * 60 /* 28 days, in seconds */);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_expires': 28 * 24 * 60 * 60 /* 28 days, in seconds */
});
```

---

## cookie_flags

Appends additional flags to the cookie when set. Flags must be separated by semicolons.

- **Type:** `string`
- **Default:** (empty)

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_flags', 'SameSite=None;Secure');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_flags': 'SameSite=None;Secure'
});
```

---

## cookie_path

Specifies the subpath used to store the analytics cookie.

- **Type:** `string`
- **Default:** `'/'`

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_path', '/example_path');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_path': '/example_path'
});
```

---

## cookie_prefix

Specifies a prefix to prepend to analytics cookie names.

- **Type:** `string`
- **Default:** (empty)

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_prefix', 'prefix');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_prefix': 'prefix'
});
```

---

## cookie_update

When `cookie_update` is set to `true`, gtag.js will update cookies on each page load. This will update the cookie expiration to be set relative to the most recent visit to the site. For example, if cookie expiration is set to one week, and a user visits using the same browser every five days, the cookie expiration will be updated on each visit and will effectively never expire.

When set to `false`, cookies are not updated on each page load. This has the effect of cookie expiration being relative to the first time a user visited the site.

- **Type:** `boolean`
- **Default:** `true`

**Examples:**

Set globally:
```javascript
gtag('set', 'cookie_update', true);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'cookie_update': true
});
```

---

## ignore_referrer

Set to `true` to indicate to Analytics that the referrer shouldn't be displayed as a traffic source.

- **Type:** `boolean`
- **Default:** `false`

**Examples:**

Set globally:
```javascript
gtag('set', 'ignore_referrer', true);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'ignore_referrer': true
});
```

---

## language

Specifies the language preference of the user. Defaults to the user's `navigator.language` value.

- **Type:** `string`
- **Default:** `navigator.language`

**Examples:**

Set globally:
```javascript
gtag('set', 'language', 'en-us');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'language': 'en-us'
});
```

---

## page_location

Specifies the full URL of the page. Defaults to the user's `document.location` value.

- **Type:** `string`
- **Default:** `document.location`
- **Character Limit:** 1000

**Examples:**

Set globally:
```javascript
gtag('set', 'page_location', 'https://example.com/page1');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'page_location': 'https://example.com/page1'
});
```

---

## page_referrer

Specifies which referral source brought traffic to a page. This value is also used to compute the traffic source. The format of this value is a URL. Defaults to the user's `document.referrer` value.

- **Type:** `string`
- **Default:** `document.referrer`
- **Character Limit:** 420

**Examples:**

Set globally:
```javascript
gtag('set', 'page_referrer', 'https://example.com');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'page_referrer': 'https://example.com'
});
```

---

## page_title

The title of the page or document. Defaults to the user's `document.title` value.

- **Type:** `string`
- **Default:** `document.title`
- **Character Limit:** 300

**Examples:**

Set globally:
```javascript
gtag('set', 'page_title', 'Settings');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'page_title': 'Settings'
});
```

---

## send_page_view

Set to false to prevent the default snippet from sending a page_view.

- **Type:** `boolean`
- **Default:** `true`

**Examples:**

Set globally:
```javascript
gtag('set', 'send_page_view', false);
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'send_page_view': false
});
```

---

## screen_resolution

Specifies the resolution of the screen. Should be two positive integers separated by an `x`. For example, for an 800px by 600px screen, the value would be `800x600`. Calculated from the user's `window.screen` value.

- **Type:** `string`
- **Default:** Calculated from `window.screen`

**Examples:**

Set globally:
```javascript
gtag('set', 'screen_resolution', '800x600');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'screen_resolution': '800x600'
});
```

---

## user_id

Specifies a known identifier for a user provided by the site owner/library user. It must not itself be PII (personally identifiable information). The value should never be persisted in Google Analytics cookies or other Analytics provided storage.

- **Type:** `string`
- **Default:** (empty)
- **Character Limit:** 256

**Examples:**

Set globally:
```javascript
gtag('set', 'user_id', 'id');
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'user_id': 'id'
});
```

---

## user_properties

User properties are attributes that can be used to describe segments of your user base, such as language preference or geographic location. Up to 25 additional user properties can be set per project.

- **Type:** `object`
- **Default:** (empty)
- **Character Limits:** property name = 24, property value = 36

**Examples:**

Set globally:
```javascript
gtag('set', 'user_properties', {
  'favorite_color': 'blue'
});
```

Set for a single stream:
```javascript
gtag('config', 'STREAM_ID', {
  'user_properties': {
    'favorite_color': 'blue'
  }
});
```