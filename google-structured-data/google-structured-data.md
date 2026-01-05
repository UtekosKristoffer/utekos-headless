# Introduction to Product Structured Data

When you add structured data to your product pages, your product information can
appear in richer ways in Google Search results (including Google Images and
Google Lens). For example, users can see price, availability, review ratings,
shipping information, and more right in search results.

## Deciding Which Markup to Use

There are two main classes of product structured data. Follow the requirements
for the type that best suits your use case:

- **Product snippets**: For product pages where people can't directly purchase
  the product. This markup has more options for specifying review information,
  like pros and cons on an editorial product review page.
- **Merchant listings**: For pages where customers can purchase products from
  you. This markup has more options for specifying detailed product information,
  like apparel sizing, shipping details, and return policy information.

> **Note**: There is some overlap between the two product features. In general,
> adding the required product information properties for merchant listings means
> that your product pages can also be eligible for product snippets. Both
> features have their own enhancements, so be sure to review both when deciding
> which markup makes sense in the context of your site (the more properties you
> can add, the more enhancements your page can be eligible for).

### Product Variants

Do you offer variants of your products? Adding product variant structured data
can help Google better understand which products are variations of the same
parent product. Both product snippets and merchant listings support product
variants.

### Organization-Level Policies

In addition to structured data for the individual products that you sell, we
also recommend you add structured data defining the policies of your ecommerce
business, nested under Organization markup:

- **Merchant return policy**: Specify the return policy (or policies) for your
  business.
- **Loyalty Program**: Specify the loyalty program that you offer.

## How Shopping Experiences Can Appear on Google Search

Here's how shopping experiences can appear in Google Search results. This list
is not exhaustive—Google Search is constantly exploring new and better ways to
help people find what they're looking for, and the experiences may change over
time.

### Product Snippet

A text result that includes additional product information such as ratings,
review information, price, and availability.

### Popular Products

Visually rich presentation of products for sale.

### Shopping Knowledge Panel

Detailed product information with a list of sellers (using details such as
product identifiers).

### Google Images

Annotated images of products available for sale.

## Result Enhancements

Search result enhancements are shown at the discretion of each experience, and
may change over time. For this reason, it is recommended to provide as much rich
product information as available, without concern for the exact experiences that
will use it. Here are some examples of how product rich results may be enhanced:

- **Ratings**: Enhance the appearance of your search result by providing
  customer reviews and ratings.
- **Pros and Cons**: Identify pros and cons in your product review description
  so they can be highlighted in search results.
- **Shipping**: Share shipping costs, especially free shipping, so shoppers
  understand the total cost.
- **Availability**: Provide availability data to help customers know when you
  have a product in stock.
- **Price drop**: Price drops are computed by Google by observing price changes
  for the product over time. Price drops are not guaranteed to be shown.
- **Returns**: Share return information, such as your return policy, fees
  involved in returns, and how many days customers have to return a product.

## Providing Product Data to Google Search

To provide rich product data to Google Search you can add Product structured
data to your web pages, upload data feeds with Google Merchant Center and opt
into free listings within the Merchant Center console, or both. The Search
Central documentation focuses on structured data on web pages.

Providing both structured data on web pages and a Merchant Center feed maximizes
your eligibility to experiences and helps Google correctly understand and verify
your data. Some experiences combine data from structured data and Google
Merchant Center feeds if both are available. For example, product snippets may
use pricing data from your merchant feed if it's not present in the structured
data on the page. The Google Merchant Center feed documentation includes
additional recommendations and requirements for feed attributes.

In addition to Google Search, learn more about eligibility to the Google
Shopping tab by reading the data and eligibility requirements in Google Merchant
Center.

---

# Product Snippet (Product, Review, Offer) Structured Data

When you add Product markup to your page, it can be eligible for display as a
product snippet, which is a text result that includes additional product
information such as ratings, review information, price, and availability.

This guide focuses on the Product structured data requirements for product
snippets. If you're not sure which markup to use, read our intro to Product
markup.

> **Can customers purchase products from you?** Consider adding merchant listing
> markup.

## How to Add Structured Data

Structured data is a standardized format for providing information about a page
and classifying the page content. If you're new to structured data, you can
learn more about how structured data works.

Here's an overview of how to build, test, and release structured data:

1. Add the required properties. Based on the format you're using, learn where to
   insert structured data on the page.

- Using a CMS? It may be easier to use a plugin that's integrated into your CMS.
- Using JavaScript? Learn how to generate structured data with JavaScript.

2. Follow the guidelines.
3. Validate your code using the Rich Results Test and fix any critical errors.
   Consider also fixing any non-critical issues that may be flagged in the tool,
   as they can help improve the quality of your structured data (however, this
   isn't necessary to be eligible for rich results).
4. Deploy a few pages that include your structured data and use the URL
   Inspection tool to test how Google sees the page. Be sure that your page is
   accessible to Google and not blocked by a robots.txt file, the noindex tag,
   or login requirements. If the page looks okay, you can ask Google to recrawl
   your URLs.

- **Note**: Allow time for re-crawling and re-indexing. Remember that it may
  take several days after publishing a page for Google to find and crawl it.

5. To keep Google informed of future changes, we recommend that you submit a
   sitemap. You can automate this with the Search Console Sitemap API.

## Examples

The following examples illustrate how to include structured data on your web
pages for different situations.

### Product Review Page

Here's an example of structured data on a product review page for product
snippets treatment in search results.

**JSON-LD**

```html
<html>
  <head>
    <title>Executive Anvil</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Executive Anvil",
        "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 4,
            "bestRating": 5
          },
          "author": {
            "@type": "Person",
            "name": "Fred Benson"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.4,
          "reviewCount": 89
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### Pros and Cons

Here's an example of an editorial product review page with pros and cons for
product snippets treatment in search results.

**JSON-LD**

```html
<html>
  <head>
    <title>Cheese Knife Pro review</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Cheese Grater Pro",
        "review": {
          "@type": "Review",
          "name": "Cheese Knife Pro review",
          "author": {
            "@type": "Person",
            "name": "Pascal Van Cleeff"
          },
          "positiveNotes": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Consistent results"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Still sharp after many uses"
              }
            ]
          },
          "negativeNotes": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "No child protection"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Lacking advanced features"
              }
            ]
          }
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### Shopping Aggregator Page

Here's an example of a shopping aggregator page for product snippets treatment
in search results.

**JSON-LD**

```html
<html>
  <head>
    <title>Executive Anvil</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "Executive Anvil",
        "image": [
          "https://example.com/photos/1x1/photo.jpg",
          "https://example.com/photos/4x3/photo.jpg",
          "https://example.com/photos/16x9/photo.jpg"
        ],
        "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
        "sku": "0446310786",
        "mpn": "925872",
        "brand": {
          "@type": "Brand",
          "name": "ACME"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": 4,
            "bestRating": 5
          },
          "author": {
            "@type": "Person",
            "name": "Fred Benson"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.4,
          "reviewCount": 89
        },
        "offers": {
          "@type": "AggregateOffer",
          "offerCount": 5,
          "lowPrice": 119.99,
          "highPrice": 199.99,
          "priceCurrency": "USD"
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

## Guidelines

For your Product markup to be eligible for product snippets, you must follow
these guidelines:

- General structured data guidelines
- Search Essentials
- Technical guidelines
- Content guidelines

### Technical Guidelines

- Currently, product rich results only support pages that focus on a single
  product (or multiple variants of the same product). For example, "shoes in our
  shop" is not a specific product. This includes product variants where each
  product variant has a distinct URL. We recommend focusing on adding markup to
  product pages instead of pages that list products or a category of products.
- For details about how to mark up product variants, refer to product variant
  structured data documentation.
- When offering products for sale in multiple currencies, have a distinct URL
  per currency. For example, if a product is available for sale in Canadian and
  US dollars, use two distinct URLs, one per currency.
- Car isn't supported automatically as a subtype of Product. For now, include
  both Car and Product types if you want to attach ratings to it and be eligible
  for the Search feature. For example in JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": ["Product", "Car"],
  ...
}
```

- For pros and cons structured data: Only editorial product review pages are
  eligible for the pros and cons appearance in Search, not merchant product
  pages or customer product reviews.
- If you're a merchant optimizing for all types of shopping results, we
  recommend putting Product structured data in the initial HTML for best
  results.
- For JavaScript-generated Product markup: Be aware that dynamically-generated
  markup can make Shopping crawls less frequent and less reliable, which can be
  an issue for fast-changing content like product availability and price. If
  you're using JavaScript to generate Product markup, make sure your server has
  enough computing resources to handle increased traffic from Google.

### Content Guidelines

We don't allow content that promotes widely prohibited or regulated goods,
services, or information that may facilitate serious, immediate, or long term
harm to people. This includes content related to firearms and weapons,
recreational drugs, tobacco and vaping products, and gambling-related products.

---

# Structured Data Type Definitions

You must include the required properties for your content to be eligible for
display as a rich result. You can also include the recommended properties to add
more information to your structured data, which could provide a better user
experience.

## Product

The full definition of Product is available at
[schema.org/Product](https://schema.org/Product). When you mark up your content
for product information, use the following properties of the Product type:

### Required Properties

#### `name`

**Type**: Text

The name of the product.

#### Product Snippets Require Either `review` or `aggregateRating` or `offers`

You must include one of the following properties:

- `review`
- `aggregateRating`
- `offers`

> **Note**: You only need to provide one of `review`, `aggregateRating`, and
> `offers`, but the product snippets section of the Rich Results Test may report
> a warning if you provide `offers` without `review` or `aggregateRating`
> properties.

### Recommended Properties

#### `aggregateRating`

**Type**: AggregateRating

A nested aggregateRating of the product. Follow the Review snippet guidelines
and the list of required and recommended AggregateRating properties.

#### `offers`

**Type**: Offer or AggregateOffer

A nested Offer or AggregateOffer to sell the product. Include the required and
recommended properties for either Offer or AggregateOffer (whichever is
applicable to your content).

> **Note**: To be eligible for the price drop enhancement, use Offer, not
> AggregateOffer.

#### `review`

**Type**: Review

A nested Review of the product. Follow the Review snippet guidelines and the
list of required and recommended review properties.

> **Important**: If you add a review for the product, the reviewer's name must
> be a valid name for a Person or Team.
>
> - **Not recommended**: "50% off on Black Friday"
> - **Recommended**: "James Smith" or "CNET Reviewers"

To manually tell Google about the pros and cons of an editorial product review
page, add the `positiveNotes` and/or `negativeNotes` properties to your nested
product review.

---

## Product Reviews

### Review

As reviews are shared by multiple structured data types (such as Recipe and
Movie), the Review type is described separately in the review snippet
documentation.

The following properties are additional properties for the Review type to help
people see a high-level summary of the pros and cons of an editorial product
review. The pros and cons experience is available in Dutch, English, French,
German, Italian, Japanese, Polish, Portuguese, Spanish, and Turkish in all
countries where Google Search is available.

While Google tries to automatically understand the pros and cons of an editorial
product review, you can explicitly provide this information by adding the
`positiveNotes` and/or `negativeNotes` properties to your nested product review.
Be sure to follow the pros and cons guidelines.

#### Required Properties

**Two statements about the product**: You must provide at least two statements
about the product in any combination of positive or negative statements (for
example, ItemList markup with two positive statements is valid):

- `negativeNotes`
- `positiveNotes`

#### Recommended Properties

##### `negativeNotes`

**Type**: ItemList (see ItemList for Positive and Negative Notes on usage of
ItemList in this context)

An optional nested list of negative statements about the product (cons).

To list multiple negative statements, specify multiple ListItem properties in an
itemListElement array. For example:

```json
"review": {
  "@type": "Review",
  "negativeNotes": {
   "@type": "ItemList",
   "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "No child protection"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Lacking advanced features"
    }
   ]
  }
}
```

##### `positiveNotes`

**Type**: ItemList (see ItemList for Positive and Negative Notes on usage of
ItemList in this context)

An optional nested list of positive statements about the product (pros).

To list multiple positive statements, specify multiple ListItem properties in an
itemListElement array. For example:

```json
"review": {
  "@type": "Review",
  "positiveNotes": {
   "@type": "ItemList",
   "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Consistent results"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Still sharp after many uses"
    }
   ]
  }
}
```

---

## ItemList for Positive and Negative Notes

Positive and negative notes (pros and cons) inside the Review type make use of
the generic ItemList and ListItem types. This section describes how to use these
types for positive and negative notes.

The following properties are used to capture pros and cons in a review.

### Required Properties

#### `itemListElement`

**Type**: ListItem

A list of statements about the product, listed in a specific order. Specify each
statement with a ListItem.

#### `itemListElement.name`

**Type**: Text

The key statement of the review.

### Recommended Properties

#### `itemListElement.position`

**Type**: Integer

The position of the review. Position 1 signifies the first statement in the
list.

---

## Offer Details

### Offer

The full definition of Offer is available at
[schema.org/Offer](https://schema.org/Offer). When marking up offers within a
product, use the following properties of the schema.org Offer type.

#### Required Properties

##### `price` or `priceSpecification.price`

**Type**: Number

The offer price of a product. Follow schema.org usage guidelines.

Here's an example of the price property (the value can be a JSON string or
number):

```json
"offers": {
  "@type": "Offer",
  "price": 39.99,
  "priceCurrency": "USD"
}
```

Here's an example of how to specify that a product is available without payment:

```json
"offers": {
  "@type": "Offer",
  "price": 0,
  "priceCurrency": "EUR"
}
```

Alternatively, the offer price may be nested inside a priceSpecification
property instead of being provided at the Offer level.

```json
"offers": {
  "@type": "Offer",
  "priceSpecification": {
   "@type": "PriceSpecification",
   "price": 9.99,
   "priceCurrency": "AUD"
  }
}
```

> **Note**: If you use both the `offers.price` and `offers.priceSpecification`
> properties to encode an active price, Google will use the price provided
> through the `offers.price` property and ignore the `offers.priceSpecification`
> property.

If you have complex pricing, check out the pricing examples and supported
pricing properties in the merchant listing documentation.

#### Recommended Properties

##### `availability`

**Type**: ItemAvailability

Use the single most appropriate product availability option from the following
list:

- `https://schema.org/BackOrder`: The item is on back order.
- `https://schema.org/Discontinued`: The item has been discontinued.
- `https://schema.org/InStock`: The item is in stock.
- `https://schema.org/InStoreOnly`: The item is only available for purchase in
  store.
- `https://schema.org/LimitedAvailability`: The item has limited availability.
- `https://schema.org/OnlineOnly`: The item is available online only.
- `https://schema.org/OutOfStock`: The item is currently out of stock.
- `https://schema.org/PreOrder`: The item is available for pre-order.
- `https://schema.org/PreSale`: The item is available for ordering and delivery
  before general availability.
- `https://schema.org/SoldOut`: The item has been sold out.

The short names without the URL prefix are also supported (for example,
`BackOrder`).

##### `priceCurrency` or `priceSpecification.priceCurrency`

**Type**: Text

The currency used to describe the product price, in three-letter ISO 4217
format.

> **Important**: This property is currently recommended for product snippets to
> help Google determine the currency more accurately, but required for merchant
> listing experiences. It is therefore best to always provide this property.

##### `priceValidUntil`

**Type**: Date

The date (in ISO 8601 date format) after which the price will no longer be
available, if applicable. Your product snippet may not display if the
`priceValidUntil` property indicates a past date.

---

## UnitPriceSpecification

The full definition of UnitPriceSpecification is available at
[schema.org/UnitPriceSpecification](https://schema.org/UnitPriceSpecification).
Use the following properties to capture more complex pricing schemes.

### Required Properties

#### `price`

**Type**: Number

The offer price of a product. See also the price property of Offer.

### Recommended Properties

#### `priceCurrency`

**Type**: Text

The currency used to describe the product price, in three-letter ISO 4217
format. See also the priceCurrency property of Offer.

> **Note**: While this property is optional for product snippets, it's strongly
> recommended because it avoids pricing ambiguities and it's required for
> merchant listing experiences.

---

## AggregateOffer

The full definition of AggregateOffer is available at
[schema.org/AggregateOffer](https://schema.org/AggregateOffer). An
AggregateOffer is a kind of Offer representing an aggregation of other offers.
For example, it can be used for a product that is being sold by multiple
merchants. Don't use AggregateOffer to describe a set of product variants. When
marking up aggregate offers within a product, use the following properties of
the schema.org AggregateOffer type:

### Required Properties

#### `lowPrice`

**Type**: Number

The lowest price of all offers available. Use a decimal separator (`.`) when
expressing fractions of a currency unit, such as `1.23` for $1.23 US dollars.

#### `priceCurrency`

**Type**: Text

The currency used to describe the product price, in three-letter ISO 4217
format.

### Recommended Properties

#### `highPrice`

**Type**: Number

The highest price of all offers available. Use a floating point number if
necessary.

#### `offerCount`

**Type**: Number

The number of offers for the product.

---

# Monitor Rich Results with Search Console

Search Console is a tool that helps you monitor how your pages perform in Google
Search. You don't have to sign up for Search Console to be included in Google
Search results, but it can help you understand and improve how Google sees your
site. We recommend checking Search Console in the following cases:

- After deploying structured data for the first time
- After releasing new templates or updating your code
- Analyzing traffic periodically

## After Deploying Structured Data for the First Time

After Google has indexed your pages, look for issues using the relevant Rich
result status report. Ideally, there will be an increase of valid items, and no
increase in invalid items. If you find issues in your structured data:

1. Fix the invalid items.
2. Inspect a live URL to check if the issue persists.
3. Request validation using the status report.

## After Releasing New Templates or Updating Your Code

When you make significant changes to your website, monitor for increases in
structured data invalid items.

- If you see an increase in invalid items, perhaps you rolled out a new template
  that doesn't work, or your site interacts with the existing template in a new
  and bad way.
- If you see a decrease in valid items (not matched by an increase in invalid
  items), perhaps you are no longer embedding structured data in your pages. Use
  the URL Inspection tool to learn what is causing the issue.

## Analyzing Traffic Periodically

Analyze your Google Search traffic using the Performance Report. The data will
show you how often your page appears as a rich result in Search, how often users
click on it and what is the average position you appear on search results. You
can also automatically pull these results with the Search Console API.

There are two Search Console reports related to Product structured data:

- **Merchant listings report**: For pages where shoppers can buy products.
- **Product snippets report**: For other product related pages such as product
  reviews and aggregator sites.

Both reports provide warnings and errors related to Product structured data, but
are separate due to the different requirements for the associated experiences.
For example, the Merchant listings report includes checks for product snippets
that include Offer structured data, so the Product snippets report only needs to
be consulted for non-merchant listing pages.

---

# General Structured Data Guidelines

To be eligible for rich result appearance in Google Search results, structured
data shouldn't violate the Content policies for Google Search (which include our
spam policies). In addition, this page details the general guidelines that apply
to all structured data: they must be followed in order to be eligible for
appearance as a rich result in Google Search.

If your page contains a structured data issue, it can result in a manual action.
A structured data manual action means that a page loses eligibility for
appearance as a rich result; it doesn't affect how the page ranks in Google web
search. To check if you have a manual action, open the Manual Actions report in
Search Console.

> **Important**: Google does not guarantee that your structured data will show
> up in search results, even if your page is marked up correctly according to
> the Rich Results Test. Here are some common reasons why:
>
> - Using structured data enables a feature to be present, it does not guarantee
>   that it will be present. The Google algorithm tailors search results to
>   create what it thinks is the best search experience for a user, depending on
>   many variables, including search history, location, and device type. In some
>   cases it may determine that one feature is more appropriate than another, or
>   even that a text result is best.
> - The structured data is not representative of the main content of the page,
>   or is potentially misleading.
> - The structured data is incorrect in a way that the Rich Results Test was not
>   able to catch.
> - The content referred to by the structured data is hidden from the user.
> - The page doesn't meet the guidelines for structured data described on this
>   page, the guidelines for a specific structured data feature, the Search
>   Essentials, or the Content policies for Google Search.

## Technical Guidelines

You can test compliance with technical guidelines using the Rich Results Test
and the URL Inspection tool, which catch most technical errors.

### Format

In order to be eligible for rich results, mark up your site's pages using one of
three supported formats:

- JSON-LD (recommended)
- Microdata
- RDFa

### Access

Do not block your structured data pages to Googlebot using robots.txt, noindex,
or any other access control methods.

## Quality Guidelines

These quality guidelines are not easily testable using an automated tool.
Violating a quality guideline can prevent syntactically correct structured data
from being displayed as a rich result in Google Search, or possibly cause it to
be marked as spam.

### Content

- Follow the spam policies for Google web search.
- Provide up-to-date information. We won't show a rich result for time-sensitive
  content that is no longer relevant.
- Provide original content that you or your users have generated.
- Don't mark up content that is not visible to readers of the page. For example,
  if the JSON-LD markup describes a performer, the HTML body must describe that
  same performer.
- Don't mark up irrelevant or misleading content, such as fake reviews or
  content unrelated to the focus of a page.
- Don't use structured data to deceive or mislead users. Don't impersonate any
  person or organization, or misrepresent your ownership, affiliation, or
  primary purpose.
- Content in structured data must also follow the additional content guidelines
  or policies, as documented in the specific feature guide. For example, content
  in JobPosting structured data must follow the job posting content policies.
  Content in Practice problems structured data must follow the Practice problems
  content guidelines.

### Relevance

Your structured data must be a true representation of the page content. Here are
some examples of irrelevant data:

- A sports live streaming site labeling broadcasts as local events.
- A woodworking site labeling instructions as recipes.

### Completeness

- Specify all required properties listed in the documentation for your specific
  rich result type. Items that are missing required properties are not eligible
  for rich results.
- The more recommended properties that you provide, the higher quality the
  result is to users. For example: users prefer job postings with explicitly
  stated salaries than those without; users prefer recipes with actual user
  reviews and genuine star ratings (note that reviews or ratings not by actual
  users may result in manual action). Rich result ranking takes extra
  information into consideration.

### Location

Put the structured data on the page that it describes, unless specified
otherwise by the documentation.

If you have duplicate pages for the same content, we recommend placing the same
structured data on all page duplicates, not just on the canonical page.

### Specificity

Try to use the most specific applicable type and property names defined by
schema.org for your markup.

Follow all additional guidelines given in the documentation for your specific
rich result type.

### Images

When specifying an image as a structured data property, make sure that the image
is relevant to the page that it's on. For example, if you define the image
property of NewsArticle, the image must be relevant to that news article.

All image URLs specified in structured data must be crawlable and indexable.
Otherwise, Google Search can't find and display them on the search results page.
To check if Google can access your URLs, use the URL Inspection tool.

## Multiple Items on a Page

Multiple items on a page means that there is more than one kind of thing on a
page. For example, a page could contain a recipe, a video that shows how to make
that recipe, and breadcrumb information for how people can discover that recipe.
All of this user-visible information can also be marked up with structured data,
which makes it easier for search engines like Google Search to understand the
information on a page. When you add more items that apply to a page, Google
Search has a fuller picture of what the page is about and can display that page
in different search features.

Google Search understands multiple items on a page, whether you nest the items
or specify each item individually:

- **Nesting**: When there is one main item, and additional items are grouped
  under the main item. This is particularly helpful when grouping related items
  (for example, a recipe with a video and reviews).
- **Individual items**: When each item is a separate block on the same page.

If there are items that are more helpful when they are linked together (for
example, a recipe and a video), use `@id` in both the recipe and the video items
to specify that the video is about the recipe on the page. If you didn't link
the items together, Google Search may not know that it can show the video as a
Recipe rich result.

> **Note**: These examples are trimmed for brevity, and they don't include all
> the required and recommended properties for the features. For a full example,
> refer to the specific structured data type documentation.

### Nested Items Example

```html
<html>
  <head>
    <title>How To Make Banana Bread</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": "Banana Bread Recipe",
        "description": "The best banana bread recipe you'll ever find! Learn how to use up all those extra bananas.",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": 4.7,
          "ratingCount": 123
        },
        "video": {
          "@type": "VideoObject",
          "name": "How To Make Banana Bread",
          "description": "This is how you make banana bread, in 5 easy steps.",
          "contentUrl": "https://www.example.com/video123.mp4"
        }
      }
    </script>
  </head>
  <body></body>
</html>
```

### Individual Items on a Page

```html
<html>
  <head>
    <title>How To Make Banana Bread</title>
    <script type="application/ld+json">
      [
        {
          "@context": "https://schema.org/",
          "@type": "Recipe",
          "name": "Banana Bread Recipe",
          "description": "The best banana bread recipe you'll ever find! Learn how to use up all those extra bananas."
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Recipes",
              "item": "https://example.com/recipes"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bread recipes",
              "item": "https://example.com/recipes/bread-recipes"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "How To Make Banana Bread"
            }
          ]
        }
      ]
    </script>
  </head>
  <body></body>
</html>
```

---

# Sitelinks

Sitelinks are links from the same domain that are clustered together under a
text result. Our systems analyze the link structure of your site to find
shortcuts that will save users time and allow them to quickly find the
information they're looking for.

We only show sitelinks for results when we think they'll be useful to the user.
If the structure of your site doesn't allow our algorithms to find good
sitelinks, or we don't think that the sitelinks for your site are relevant for
the user's query, we won't show them.

## Sitelinks Best Practices

At the moment, sitelinks are automated. We're always working to improve our
sitelinks algorithms, and we may incorporate site owner input in the future.
There are best practices you can follow, however, to improve the quality of your
sitelinks.

- Make sure that the text you use as your page titles and in your headings is
  informative, relevant, and compact.
- Create a logical site structure that is easy for users to navigate, and make
  sure you link to your important pages from other relevant pages.
- Ensure that your internal links' anchor text is concise and relevant to the
  page they're pointing to.
- Avoid repetitions in your content.
- If you need to remove a sitelink, consider removing the page from your site or
  using noindex.

---

# Share Your Product Data with Google

To increase eligibility for richer appearances and on more surfaces across
Google that can bring more relevant traffic to your site, share your ecommerce
product data with Google. To take advantage of these benefits, Google recommends
that you do the following:

1. **Include structured data in your site's product pages**. Learn more about
   the benefits of adding structured data to your web pages.
2. **Tell Google directly which products you want to show on Google by uploading
   a feed to Google Merchant Center**. Google Merchant Center is a Google
   service that has a deeper understanding of commerce data. Learn more about
   the benefits of Google Merchant Center.

## Add Product Structured Data to Web Pages

Where feasible, add structured data to your product pages. While structured data
isn't required to appear in Google Search results, it can help Google understand
your page better and display it as a rich result. For example:

- Structured data increases eligibility for Product rich results.
- Structured data can improve the accuracy of Google's understanding of content
  such as price, discount, and shipping costs on a page (this can also help the
  accuracy of Google Merchant Center verification of product feeds against your
  site).

Ready to start implementing? Check out Include structured data relevant to
ecommerce for more information.

> **Note**: Google may at times use other approaches to extract data from pages.
> If you want to explicitly tell Google not to use content on a page to form a
> snippet, add a `data-nosnippet` attribute to that HTML element.

## Upload Data to Google Merchant Center

While uploading product data to Google Merchant Center isn't mandatory to appear
in Google search results, it can enhance Google's understanding of your
products. Participation in Google Merchant Center is mandatory for some Google
surfaces, such as listings in the Google Shopping tab.

### What is Product Data?

Product data describes various attributes of products, such as its title,
description, color, pricing, and availability.

- For smaller sites that are updated less frequently, you can use an automated
  feed to build your product data from crawled web content (structured data can
  help improve the accuracy of data extraction). This approach can also be
  useful to get started with less effort.
- For larger sites or sites with frequently changing content, periodically
  upload new data feed files to Google Merchant Center (or for immediate updates
  use the Content API). This gives you greater control over your data in Google.
  Benefits of uploading feed files include:
  - **Increase confidence Google knows all of your products**. Web crawling is
    not guaranteed to find all products on your site.
  - **Gain greater control over the timing of updates**. Google does not
    guarantee how long it takes before changes on your site will be processed
    through crawling. Feeds can be used for weekly, daily, or even hourly
    updates, at your time of choice. The Content API allows immediate content
    updates, which is particularly useful for stock level updates.
  - **Share data that's not present on your website**. You may decide some
    information is not appropriate to include on your web site, such as physical
    store level inventory data. Feeds and the Content API let you share this
    data with Google without it being present on your website.

Learn more about how to Sign up for Google Merchant Center.

---

# How Google Uses Structured Data and Google Merchant Center Data

The following are examples of how Google uses structured data embedded in web
pages and Google Merchant Center data for different experiences. Note that
experiences may vary by country, device, and other factors.

| Experience                                         | Structured Data                                                                                               | Google Merchant Center                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Product rich results in Google Search**          | Google Search uses Product structured data to display product rich results.                                   | Google Search may use Google Merchant Center data to display product rich results.        |
| **Google Images results with product annotations** | Google Images uses Product structured data to display product annotations on images.                          | Google Images uses images listed in Google Merchant Center.                               |
| **Google Shopping tab**                            | Adding structured data can help Google Merchant Center in some cases (for example, during data verification). | Participation in Google Merchant Center is required to appear in the Google Shopping tab. |
| **Google Lens image search results**               | Google Lens uses image structured data properties where available.                                            | Google Images uses images listed in Google Merchant Center.                               |

---

# Resolving Update Delay Issues

When Google combines data from your website and Google Merchant Center feeds, it
can lead to data inconsistency issues due to lag. For example, if a product
sells out, your website would typically immediately mark it as unavailable for
purchase, but Google Merchant Center may not be updated until some time later,
especially if you're using feeds.

To avoid this potential conflict in pricing and stock availability data (a
common cause of synchronization issues), tell Google Merchant Center to
automatically update its copy of your product data based on the website
contents, when such a discrepancy is noticed.
