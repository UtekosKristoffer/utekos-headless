# Organization (Organization) Structured Data

![Merchant knowledge panel in Google Search results](merchant-knowledge-panel.png)

Adding organization structured data to your home page can help Google better
understand your organization's administrative details and disambiguate your
organization in search results.

## Key Benefits

- **Disambiguation**: Some properties (like `iso6523` and `naics`) help
  distinguish your organization from others
- **Visual Elements**: Properties like `logo` influence how your organization
  appears in Search results and knowledge panels
- **Merchant Details**: Merchants can enhance their knowledge panel and brand
  profile with:
  - Return policy
  - Address
  - Contact information

**Note**: There are no required properties. Add as many relevant properties as
apply to your organization.

---

## How to Add Structured Data

Structured data is a standardized format for providing information about a page
and classifying the page content.

### Implementation Steps

1. **Add Properties**
   - Add as many recommended properties that apply to your web page
   - No required properties; add what applies to your content
   - Learn where to insert structured data based on your format

2. **Choose Your Method**
   - **Using a CMS?** Use a plugin integrated into your CMS
   - **Using JavaScript?** Learn how to generate structured data with JavaScript

3. **Follow Guidelines**
   - Adhere to all structured data guidelines

4. **Validate**
   - Use the [Rich Results Test](https://search.google.com/test/rich-results) to
     validate your code
   - Fix any critical errors
   - Consider fixing non-critical issues for improved quality

5. **Deploy and Test**
   - Deploy pages with your structured data
   - Use the URL Inspection tool to test how Google sees the page
   - Ensure your page is:
     - Accessible to Google
     - Not blocked by `robots.txt`
     - Not blocked by `noindex` tag
     - Not behind login requirements

6. **Request Recrawling**
   - If the page looks correct, ask Google to recrawl your URLs
   - **Note**: Allow time for re-crawling and re-indexing (may take several
     days)

7. **Maintain Updates**
   - Submit a sitemap to keep Google informed of future changes
   - Automate with the
     [Search Console Sitemap API](https://developers.google.com/search/apis/indexing-api/v3/quickstart)

---

## Examples

### Example 1: Organization

JSON-LD implementation for basic organization information:

```html
<html>
  <head>
    <title>About Us</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://www.example.com",
        "sameAs": [
          "https://example.net/profile/example1234",
          "https://example.org/example1234"
        ],
        "logo": "https://www.example.com/images/logo.png",
        "name": "Example Corporation",
        "description": "The example corporation is well-known for producing high-quality widgets",
        "email": "contact@example.com",
        "telephone": "+47-99-999-9999",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rue Improbable 99",
          "addressLocality": "Paris",
          "addressCountry": "FR",
          "addressRegion": "Ile-de-France",
          "postalCode": "75001"
        },
        "vatID": "FR12345678901",
        "iso6523Code": "0199:724500PMK2A2M1SQQ228"
      }
    </script>
  </head>
  <body></body>
</html>
```

### Example 2: OnlineStore with Shipping and Return Policy

JSON-LD implementation for an online store with both shipping policy and return
policy:

> **Note**: Refer to the separate
> [Merchant return policy markup documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-return-policy)
> for more examples and detailed information.

```html
<html>
  <head>
    <title>About Us</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        "name": "Example Online Store",
        "url": "https://www.example.com",
        "sameAs": [
          "https://example.net/profile/example12",
          "https://example.org/@example34"
        ],
        "logo": "https://www.example.com/assets/images/logo.png",
        "contactPoint": {
          "contactType": "Customer Service",
          "email": "support@example.com",
          "telephone": "+47-99-999-9900"
        },
        "vatID": "FR12345678901",
        "iso6523Code": "0199:724500PMK2A2M1SQQ228",
        "hasShippingService": [
          {
            "@type": "ShippingService",
            "name": "shipping to CH and FR",
            "description": "Shipping to CH 5% of order value, shipping to FR always free",
            "fulfillmentType": "FulfillmentTypeDelivery",
            "shippingConditions": [
              {
                "@type": "ShippingConditions",
                "shippingOrigin": {
                  "@type": "DefinedRegion",
                  "addressCountry": "FR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "CH"
                },
                "shippingRate": {
                  "@type": "ShippingRateSettings",
                  "orderPercentage": "0.05"
                }
              },
              {
                "@type": "ShippingConditions",
                "shippingOrigin": {
                  "@type": "DefinedRegion",
                  "addressCountry": "FR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "FR"
                },
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": "EUR"
                }
              }
            ]
          }
        ],
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": ["FR", "CH"],
          "returnPolicyCountry": "FR",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 60,
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/FreeReturn",
          "refundType": "https://schema.org/FullRefund"
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

---

## Guidelines

You must follow these guidelines to enable structured data to be eligible for
inclusion in Google Search results.

> **Warning**: If your site violates one or more of these guidelines, Google may
> take manual action against it. Once you have remedied the problem, you can
> submit your site for reconsideration.

### Required Compliance

- [Technical guidelines](#technical-guidelines)
- [Search Essentials](https://developers.google.com/search/docs/essentials)
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

---

## Technical Guidelines

### Placement Recommendations

- Place this information on your **home page** or a single page that describes
  your organization (e.g., "About Us" page)
- You **don't need** to include it on every page of your site

### Schema.org Type Selection

- Use the **most specific** schema.org subtype of `Organization` that matches
  your organization
- Examples:
  - **E-commerce site**: Use `OnlineStore` instead of `OnlineBusiness`
  - **Local business** (restaurant, physical store): Use the most specific
    subtype(s) of `LocalBusiness`
    - Follow the required and recommended fields for
      [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business)
      in addition to this guide

---

## Structured Data Type Definitions

Google recognizes the following properties of an `Organization`.

### Focus Areas

Prioritize properties that are useful to your users:

- **Business name**: `name` or `alternateName`
- **Real-world presence**: `address` or `telephone`
- **Online presence**: `url` or `logo`

---

## Recommended Properties

### `address`

| Property  | Type            | Description                                                                                                                                                                                                                                              |
| --------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `address` | `PostalAddress` | **Required for `LocalBusiness` type or subtypes**. The physical or mailing address of your organization. Include all applicable properties for your country. Multiple addresses can be provided for locations in different cities, states, or countries. |

**Example with multiple addresses:**

```json
"address": [
    {
        "@type": "PostalAddress",
        "streetAddress": "999 W Example St Suite 99 Unit 9",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "postalCode": "10019",
        "addressCountry": "US"
    },
    {
        "streetAddress": "999 Rue due exemple",
        "addressLocality": "Paris",
        "postalCode": "75001",
        "addressCountry": "FR"
    }
]
```

#### `address` Sub-properties

| Property                  | Type   | Description                                                |
| ------------------------- | ------ | ---------------------------------------------------------- |
| `address.addressCountry`  | `Text` | Two-letter ISO 3166-1 alpha-2 country code                 |
| `address.addressLocality` | `Text` | City of your postal address                                |
| `address.addressRegion`   | `Text` | Region (e.g., state) of your postal address, if applicable |
| `address.postalCode`      | `Text` | Postal code for your address                               |
| `address.streetAddress`   | `Text` | Full street address                                        |

---

### `alternateName`

| Property        | Type   | Description                                                  |
| --------------- | ------ | ------------------------------------------------------------ |
| `alternateName` | `Text` | Another common name your organization goes by, if applicable |

---

### `contactPoint`

| Property       | Type           | Description                                                                                                                         |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `contactPoint` | `ContactPoint` | The best way for users to contact your business. Include all support methods available following Google recommended best practices. |

**Example:**

```json
"contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+9-999-999-9999",
    "email": "contact@example.com"
}
```

#### `contactPoint` Sub-properties

| Property                 | Type   | Description                                                                                                                                                                                   |
| ------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contactPoint.email`     | `Text` | Email address to contact your business. For `LocalBusiness`, specify a primary email at the `LocalBusiness` level before using `contactPoint` for multiple contact methods.                   |
| `contactPoint.telephone` | `Text` | Phone number including country code and area code. For `LocalBusiness`, specify a primary phone number at the `LocalBusiness` level before using `contactPoint` for multiple contact methods. |

---

### `description`

| Property      | Type   | Description                                                |
| ------------- | ------ | ---------------------------------------------------------- |
| `description` | `Text` | A detailed description of your organization, if applicable |

---

### `duns`

| Property | Type   | Description                                                                                                                              |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `duns`   | `Text` | Dun & Bradstreet DUNS number for identifying your Organization. **Recommendation**: Use `iso6523Code` field with prefix `0060:` instead. |

---

### `email`

| Property | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| `email`  | `Text` | Email address to contact your business, if applicable |

---

### `foundingDate`

| Property       | Type   | Description                                                               |
| -------------- | ------ | ------------------------------------------------------------------------- |
| `foundingDate` | `Date` | Date your Organization was founded in ISO 8601 date format, if applicable |

---

### `globalLocationNumber`

| Property               | Type   | Description                                                                             |
| ---------------------- | ------ | --------------------------------------------------------------------------------------- |
| `globalLocationNumber` | `Text` | GS1 Global Location Number identifying the location of your Organization, if applicable |

---

### `hasMerchantReturnPolicy`

| Property                  | Type                            | Description                                                                                                                                                                                    |
| ------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasMerchantReturnPolicy` | Repeated `MerchantReturnPolicy` | Return policy of your Organization. See [Merchant return policy markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-return-policy) for detailed information. |

**Note**: If you don't provide a return policy for your Organization, or if
specific products need different return policies, use this property under
merchant listing markup as well.

---

### `hasMemberProgram`

| Property           | Type                     | Description                                                                                                                                                                      |
| ------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasMemberProgram` | Repeated `MemberProgram` | Member (loyalty) program you provide. See [Member program markup](https://developers.google.com/search/docs/appearance/structured-data/member-program) for detailed information. |

---

### `hasShippingService`

| Property             | Type                       | Description                                                                                                                                                                                   |
| -------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasShippingService` | Repeated `ShippingService` | Shipping policy of your Organization. See [Merchant shipping policy markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-shipping) for detailed information. |

**Note**: If you don't provide a shipping policy for your Organization, or if
specific products need different shipping policies, use this property under
merchant listing markup as well.

---

### `iso6523Code`

| Property      | Type   | Description                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------- |
| `iso6523Code` | `Text` | ISO 6523 identifier of your organization. Format: `ICD:identifier` (separated by colon). |

**Common ICD values:**

| ICD     | Description                                             |
| ------- | ------------------------------------------------------- |
| `0060:` | Dun & Bradstreet Data Universal Numbering System (DUNS) |
| `0088:` | GS1 Global Location Number (GLN)                        |
| `0199:` | Legal Entity Identifier (LEI)                           |

---

### `legalName`

| Property    | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `legalName` | `Text` | Registered, legal name of your Organization (if different from `name` property) |

---

### `leiCode`

| Property  | Type   | Description                                                                                                                        |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `leiCode` | `Text` | Identifier for your Organization as defined in ISO 17442. **Recommendation**: Use `iso6523Code` field with prefix `0199:` instead. |

---

### `logo`

| Property | Type                   | Description                                                                                                                 |
| -------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `logo`   | `URL` or `ImageObject` | Logo representative of your organization. Helps Google determine which logo to show in Search results and knowledge panels. |

**Image Guidelines:**

- Minimum size: 112x112px
- URL must be crawlable and indexable
- File format must be supported by Google Images
- Test appearance on white background
- For `ImageObject` type: must have valid `contentUrl` or `url` property

---

### `naics`

| Property | Type   | Description                                                                                     |
| -------- | ------ | ----------------------------------------------------------------------------------------------- |
| `naics`  | `Text` | North American Industry Classification System (NAICS) code for your Organization, if applicable |

---

### `name`

| Property | Type   | Description                                                                           |
| -------- | ------ | ------------------------------------------------------------------------------------- |
| `name`   | `Text` | Name of your organization. Use the same `name` and `alternateName` as your site name. |

---

### `numberOfEmployees`

| Property            | Type                | Description                                             |
| ------------------- | ------------------- | ------------------------------------------------------- |
| `numberOfEmployees` | `QuantitativeValue` | Number of employees in your Organization, if applicable |

**Example with specific number:**

```json
"numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 2056
}
```

**Example with range:**

```json
"numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 100,
    "maxValue": 999
}
```

---

### `sameAs`

| Property | Type  | Description                                                                                                                                                      |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sameAs` | `URL` | URL of a page on another website with additional information about your organization (e.g., social media or review site profile). Multiple URLs can be provided. |

---

### `taxID`

| Property | Type   | Description                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------- |
| `taxID`  | `Text` | Tax ID associated with your Organization. Must match the country provided in the `address` field. |

---

### `telephone`

| Property    | Type   | Description                                                                      |
| ----------- | ------ | -------------------------------------------------------------------------------- |
| `telephone` | `Text` | Primary business phone number for customers. Include country code and area code. |

---

### `url`

| Property | Type  | Description                                                                         |
| -------- | ----- | ----------------------------------------------------------------------------------- |
| `url`    | `URL` | Website URL of your organization. Helps Google uniquely identify your organization. |

---

### `vatID`

| Property | Type   | Description                                                                                                                                      |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `vatID`  | `Text` | VAT (Value Added Tax) code associated with your Organization. Important trust signal (users can look up your business in public VAT registries). |

---

## Troubleshooting

If you're having trouble implementing or debugging structured data, here are
some resources that may help you.

### Getting Help

- **Using a CMS?** Ask your CMS provider or site administrator for help. Forward
  any Search Console messages detailing the issue.
- **No guarantees**: Google does not guarantee that features consuming
  structured data will show up in search results. See the
  [General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
  for common reasons why content may not appear in rich results.

### Common Issues

#### Structured Data Errors

- Check the
  [list of structured data errors](https://support.google.com/webmasters/answer/7445569)
- Review the
  [Unparsable structured data report](https://support.google.com/webmasters/answer/7445569)

#### Manual Actions

- If you received a structured data manual action, the structured data on the
  page will be ignored (page can still appear in Search results)
- Use the
  [Manual Actions report](https://support.google.com/webmasters/answer/9044175)
  to fix issues

#### Guidelines Compliance

- Review guidelines to ensure content is compliant
- Issues may be caused by:
  - Spammy content
  - Spammy markup usage
- **Note**: The issue may not be a syntax issue, so the Rich Results Test won't
  identify these problems

#### Missing Rich Results

- Troubleshoot
  [missing rich results / drop in total rich results](https://support.google.com/webmasters/answer/7552505)

#### Crawling and Indexing

- **Allow time** for re-crawling and re-indexing (may take several days after
  publishing)
- For general questions, check the
  [Google Search crawling and indexing FAQ](https://developers.google.com/search/docs/crawling-indexing/overview)

#### Additional Support

- Post a question in the
  [Google Search Central forum](https://support.google.com/webmasters/community)
