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
