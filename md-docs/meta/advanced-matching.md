# Advanced Matching

This document explains how to manually implement advanced matching for tracked
conversion events using the Meta Pixel.

> **Note:** Please visit the Privacy and Data Use Guide to learn what data is
> sent when using the Meta Pixel.

To automatically implement advanced matching use the Events Manager.

## Implementation

To use advanced matching, format the visitor's data as a JSON object and include
it in the pixel base code `fbq('init')` function call as a third parameter.

**Important:** Be sure to place advanced matching parameters in the pixel base
code or the values will not be treated as manual advanced matching values.

### Example

If your pixel ID was `283859598862258`, you could do this:

```javascript
fbq('init', '283859598862258', {
  em: 'email@email.com', // Values will be hashed automatically by the pixel using SHA-256
  fn: 'first_name',
  ln: 'last_name'
  // ...
})
```

> **Note:** We accept both lowercase unhashed and normalized SHA-256 hashed
> email addresses in your function calls.

### Sending More Hashed Values

You can use the `<img>` tag to pass your own visitor data if you format and hash
your user data using a SHA-256 hashing algorithm.

The following is an example of passing hashed user email, first name, and last
name:

```html
<img
  height="1"
  width="1"
  style="display:none"
  src="https://www.facebook.com/tr/?id=PIXEL_ID&ev=Purchase
    &ud[em]=f1904cf1a9d73a55fa5de0ac823c4403ded71afd4c3248d00bdcd0866552bb79
    &ud[fn]=4ca6f6d5a544bf57c323657ad33aae1a019c775518cf4414beedb86962aea7c1
    &ud[ln]=41f3e15ff8a4e4117da46465954304497ef29bdf35afaa9e36d527864d24c266
    &cd[value]=0.00
    &cd[currency]=USD"
/>
```

## Reference

### User Data Parameters

| User Data              | Parameter     | Format                                                                                            | Example                                                                                    |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Email**              | `em`          | Unhashed lowercase or hashed SHA-256                                                              | `jsmith@example.com` or `6e3913852f512d76acff15d1e402c7502a5bbe6101745a7120a2a4833ebd2350` |
| **First Name**         | `fn`          | Lowercase letters                                                                                 | `john`                                                                                     |
| **Last Name**          | `ln`          | Lowercase letters                                                                                 | `smith`                                                                                    |
| **Phone**              | `ph`          | Digits only including country code and area code                                                  | `16505554444`                                                                              |
| **External ID**        | `external_id` | Any unique ID from the advertiser, such as loyalty membership ID, user ID, and external cookie ID | `a@example.com`                                                                            |
| **Gender**             | `ge`          | Single lowercase letter, `f` or `m`, if unknown, leave blank                                      | `f`                                                                                        |
| **Birthdate**          | `db`          | Digits only with birth year, month, then day                                                      | `19910526` for May 26, 1991                                                                |
| **City**               | `ct`          | Lowercase with any spaces removed                                                                 | `menlopark`                                                                                |
| **State or Province**  | `st`          | Lowercase two-letter state or province code                                                       | `ca`                                                                                       |
| **Zip or Postal Code** | `zp`          | String                                                                                            | `94025`                                                                                    |
| **Country**            | `country`     | Lowercase two-letter country code                                                                 | `us`                                                                                       |

# Best Practices for Advanced Matching for Web

There are 2 types of advanced matching for web: **manual** and **automatic**.

## Deciding Which Option to Use

### Use Automatic Advanced Matching If:

- **You don't have access to developer help**: You can turn on the automatic
  version with a few clicks in Meta Events Manager.
  [Learn how to set up automatic advanced matching](https://www.facebook.com/business/help/611774685654668).

### Use Both Manual and Automatic Advanced Matching If Possible:

- Because manual and automatic advanced matching work in different ways, this
  helps you achieve maximum performance from advanced matching
- The manual version involves coding so you may need help from a developer
- [Learn how to set up advanced matching manually](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)
- If you don't have the resources to set up advanced matching manually, you may
  still benefit from using automatic advanced matching alone

### Use Manual Advanced Matching If:

#### Your Meta Pixel is in an iframe

- Automatic advanced matching won't work if your pixel is set up in an iframe,
  but manual advanced matching will

#### You use an IMG pixel

- Automatic advanced matching won't work if you use an IMG pixel, but manual
  advanced matching will
- If you use an IMG pixel, you must format and hash your visitor input on your
  own
- [Learn more on our Meta for Developers site](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)

#### Your business is in a restricted vertical

- Businesses (including event data sources they own, such as the Meta Pixel) may
  not have certain features available to them if they're categorized as being in
  a restricted vertical
- If you see a message in Meta Events Manager that says you're unable to use
  automatic advanced matching, this may be because your business is categorized
  as being in a restricted vertical
- Examples of restricted verticals include industries such as banking, lending,
  financial services, insurance, pharmaceuticals and health
- [Learn how to set up advanced matching manually](https://developers.facebook.com/docs/meta-pixel/advanced/advanced-matching)

#### Users often remain logged in for extended periods

- Automatic advanced matching doesn't know who a person is unless they take an
  action, such as filling out a form or logging into your website
- If you have a website where people remain logged in, instead of logging in
  each time they visit, set up advanced matching manually
- Manual setup allows us to receive hashed customer information, regardless of
  if someone recently logged into the website

## Additional Best Practices

### When Using Automatic Advanced Matching:

- Make sure your website contains form fields where visitors enter relevant
  information (e.g., email address, phone number, first name, last name, city,
  state, country, ZIP code or gender)
- Place the Meta Pixel on web pages where people are most likely to enter
  relevant information

## Feature Comparison

| Feature                                   | Automatic Advanced Matching | Manual Advanced Matching |
| ----------------------------------------- | --------------------------- | ------------------------ |
| Increase custom audience size             | ✔                          | ✔                       |
| Increase number of attributed conversions | ✔                          | ✔                       |
| Decrease cost per conversion              | ✔                          | ✔                       |
| No coding required                        | ✔                          |                          |
| Works when the pixel is in an iframe      |                             | ✔                       |
| Works with an IMG pixel                   |                             | ✔                       |
| Available for all business verticals      |                             | ✔                       |
