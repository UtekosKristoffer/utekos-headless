# Klarna Agentic product protocol

## The Agentic product protocol API is a standardized data interface built on Klarna’s production catalog. Access to the Agentic Product Protocol API is available for approved partners and developers, please reach out to <agenticproductprotocol@klarna.com> for access.

## <span>How to get started</span>

You can explore the API here:

- EU Swagger:
  [https://api.pricerunner.com/docs/?urls.primaryName=Agentic+Product+API](https://api.pricerunner.com/docs/?urls.primaryName=Agentic+Product+API)
- US Swagger:
  [https://api-us.pricerunner.com/docs/?urls.primaryName=Agentic+Product+API](https://api-us.pricerunner.com/docs/?urls.primaryName=Agentic+Product+API)

These Swagger environments allow you to review endpoints, test queries, and
understand the data model before starting an integration.

To request access to our API, please reach out to
<agenticproductprotocol@klarna.com>.

We’re continuously evolving this API together with our partners to ensure it
meets real-world needs and supports your agentic and product discovery use
cases.

## <span>What the Klarna Agentic Product Protocol API does</span>

The Agentic Product Protocol API exposes searchable products (unique items like
“Apple iPhone 17 Pro, 512GB Silver”) and merchant offers attached to those
products (price, stock, shipping, payment methods, etc.). Agents and apps can:

1.  search products by free text with flexible sorting/filtering; and
2.  fetch rich product details + current offers for any set of product IDs. It’s
    production-ready in the US and EU, backed by Klarna’s normalized catalog and
    unified taxonomy so results are comparable across merchants.

## <span>Data Model & Terminology</span>

The Agentic Product Protocol API is built around two core entities — Products
and Offers — which together describe what is being sold and under what
conditions. Understanding this distinction is key to using the API effectively.

| Term    | Description                                                                                                                                                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product | A unique item in Klarna’s catalog, defined by attributes such as brand, model, and specifications. Example: Apple iPhone 17 Pro, 256GB Silver. Products act as a single reference point that links all merchant listings for that item. |
| Offer   | A merchant’s listing of a specific product. Offers include pricing, stock status, shipping costs, delivery times, and supported payment methods. Multiple offers can exist for the same product, each from a different merchant.        |

**Example relationship:**

A search for “Apple iPhone 17 Pro” may return a single Product object.

When you request offers for that product, the API returns multiple Offers, such
as:

- Apple Store – \$1,599 (In Stock)
- Best Buy – \$1,579 (Preorder)

<span>In short:</span>

- <span>**Products** describe what the item is.</span>
- <span>**Offers** describe where and how it’s available for purchase.</span>

## <span>Environments & Markets</span>

### Regions deployed

- EU: AT, DE, DK, ES, FI, FR, IE, IT, NL, NO, SE, UK
- US: US

### Notes

- Market path parameter uses ISO-like codes (uppercase).
- UK and GB are synonymous in requests; responses use the canonical form.
- Currencies are the local market currency (e.g., USD for US, EUR for many EU
  markets, SEK for SE, etc.).

## <span>Versioning & Stability</span>

- Base path includes version: /agentic/v1/...
- <span>We aim for backward-compatible changes in minor updates.</span>
- <span>Breaking changes ship with a new major version path.</span>

## Core Endpoints

| Endpoint        | Description                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product Search  | The Product Search endpoint lets agents and applications find products across merchants using keywords or structured filters. Results are ranked and sortable by relevance, rating, or trend, returning normalized product data — including images and brands— ready for search, comparison, or AI reasoning.                                     |
| Product Listing | The Product Listing endpoint returns detailed information for a specific product and its offers from verified merchants. It includes prices, stock status, and shipping, all linked to a single product KRN. This enables instant offer comparison and accurate retrieval for features like recommendations, price tracking, or “save for later.” |

All responses are returned in JSON and include product-level and offer-level
identifiers for easy mapping.

### How to Retrieve Offers

This section walks through how to retrieve merchant offers for a specific
product using the two main endpoints:

1.  Product Search – Find the product and get its productIdentifier.
2.  Product Listings (Offers) – Use that identifier to request detailed product
    and offer data.

**<em>Example: Apple iPhone 16e, 128GB, Apple Intelligence</em>**

Let’s say you want to display all available merchant offers for the Apple iPhone
16e, 128GB, Apple Intelligence.

​​​**Step 1 — Search for the product**

- Use the **Product Search endpoint** to find the product and retrieve its
  Klarna productIdentifier.
- Copy the productIdentifier from the response.

**Step 2 — Retrieve offers for that product**

- Now, use the **Product Listings endpoint** to request all merchant offers for
  that product identifier. Offers will contain information such as SKU, price,
  stock status, shopping and more.
- This response lists multiple offers for the same product.

You can include multiple product identifiers (comma-separated) in a single
offers request to retrieve offers in bulk for several products at once.

## Product Search Endpoint

Use this endpoint to **search for products by free-text query**, such as “iphone
17 silver” or “wireless headphones.”

Results return a list of unique products (not individual merchant offers) that
match your query, along with basic product information such as name, image,
brand, and category.

### Request

`GET /agentic/v1/product/search/{market}`

#### Query Parameters

| Parameter    | Required | Description                                                                                                                                                                                                                                                                                                              |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `market`     | ✅       | EU: AT, DE, DK, ES, FI, FR, IE, IT, NL, NO, SE, UK US: US                                                                                                                                                                                                                                                                |
| `offset`     |          | Used for pagination. The number of products to skip before returning results (e.g., offset=10 retrieves the next “page” of products).                                                                                                                                                                                    |
| `q`          | ✅       | The free-text search term used to find products. Example: iphone 17 silver.                                                                                                                                                                                                                                              |
| `size`       |          | Number of products to include in the response. Default: 10. Minimum: 1. Maximum: 25.                                                                                                                                                                                                                                     |
| `sortOrders` |          | Comma-separated list of sorting methods. Default: POPULARITY. Available options: • POPULARITY – Current user engagement (default) • NAME – Alphabetical order by product name • RATING – User review ratings • TREND – Trending products over the past week • HOT – Weighted combination of popularity, trend, and sales |

#### Headers

| Header    | Required | Description                                                       |
| --------- | -------- | ----------------------------------------------------------------- |
| `tokenId` | ✅       | Access token provided during onboarding. Used for authentication. |

#### Example request

`https://api-us.pricerunner.com/agentic/v1/product/search/US?offset=5&q=silver%20iphone%2017&size=10&sortOrders=TREND`

This request searches for “silver iphone 17” in the US market, returns 10
products, starting from offset 5, and sorts them by their trend over the last
week.

### Response

When the request is successful, the API returns a list of products matching your
search query. Each product represents a unique item (for example, Apple iPhone
17 Pro Max, 1TB Silver), not an individual merchant offer.

#### Response Fields

| Field               | Type    | Description                                                                                               |
| ------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `totalNumberOfHits` | Integer | Total number of products matching the search query in the given market. Use this to calculate pagination. |
| `products`          | Array   | A list of product objects, each representing a unique item in Klarna’s product catalog.                   |

Each product object contains the following fields:

| Field                  | Type         | Description                                                                                                             |
| ---------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `productIdentifier`    | String       | Klarna’s unique product ID. Use this ID with the Product Offers endpoint to retrieve offers for this item.              |
| `name`                 | String       | The product’s display name, as listed in Klarna’s catalog.                                                              |
| `klarnaProductPageUrl` | String (URL) | Link to Klarna’s shopping page for the product, where users can see all merchant offers.                                |
| `imageUrl`             | String (URL) | A representative image of the product.                                                                                  |
| `brand`                | Object       | Contains brand details: <ul><li>name — Brand name (always provided).</li><li>logoUrl — Brand logo (nullable).</li></ul> |
| `categoryName`         | String       | The product’s main category in Klarna’s unified taxonomy (always present).                                              |
| `subcategoryName`      | String       | A more specific subcategory, where available. May be null for products that don’t belong to a subcategory.              |

### Example response (excerpt)

```json
{

 "totalNumberOfHits": 12,

 "products": [

   {

     "productIdentifier": "krn:kpdc:product:3431242055",

     "name": "Apple iPhone 17 Pro Max, 1TB Silver",

     "klarnaProductPageUrl": "https://www.klarna.com/us/shopping/pl/cl1/3431242055/Mobile-Phones/Apple-iPhone-17-Pro-Max-1TB-Silver/",

     "imageUrl": "https://owp.klarna.com/product/640x640/3239078895/Apple-iPhone-17-Pro-Max-1TB-Silver.jpg",

     "brand": {

       "name": "Apple",

       "logoUrl": null

     },

     "categoryName": "Mobile Phones",

     "subcategoryName": null

   },

   {

     "productIdentifier": "krn:kpdc:product:3431242200",

     "name": "Apple iPhone 17 Pro, 512GB Silver",

     "klarnaProductPageUrl": "https://www.klarna.com/us/shopping/pl/cl1/3431242200/Mobile-Phones/Apple-iPhone-17-Pro-512GB-Silver/",

     "imageUrl": "https://owp.klarna.com/product/640x640/3239078681/Apple-iPhone-17-Pro-512GB-Silver.jpg",

     "brand": {

       "name": "Apple",

       "logoUrl": null

     },

     "categoryName": "Mobile Phones",

     "subcategoryName": null

   },

   ...
```

## Product Listings

Use this endpoint to retrieve detailed product information and merchant offers
for specific product identifiers returned by the Product Search endpoint.

Each product returned includes:

- Enriched product details (e.g., description, rating, GTINs, and rank within
  category)
- All available merchant offers, including price, stock status, shipping cost,
  delivery times, and payment options

This endpoint is typically used when a user has selected or shown interest in a
specific product and you want to display merchants offering that item.

### Request

<span>`GET /agentic/v1/product/offers/{market}`</span>

#### Query Parameters

| Parameter              | Required | Description                                                                                                                                                                                                |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `itemConditionFilters` |          | Filters offers by condition. Accepted values: • NEW – Brand-new product • REFURBISHED – Professionally restored item • USED – Previously owned product • UNKNOWN – Condition not specified by the merchant |
| `market`               | ✅       | EU: AT, DE, DK, ES, FI, FR, IE, IT, NL, NO, SE, UK US: US                                                                                                                                                  |
| `maxPrice`             |          | Maximum price filter in the market’s local currency (integer). Example: maxPrice=500.                                                                                                                      |
| `minPrice`             |          | Minimum price filter in the market’s local currency (integer). Example: minPrice=100.                                                                                                                      |
| `productIdentifiers`   | ✅       | Comma-separated list of product identifiers returned from the Product Search endpoint. Example: krn:kpdc:product:3431242055,krn:kpdc:product:3431242200.                                                   |

#### Headers

| Header                 | Required        | Description                                                                    |
| ---------------------- | --------------- | ------------------------------------------------------------------------------ |
| <span>`tokenId`</span> | <span>✅</span> | <span>Access token provided during onboarding. Used for authentication.</span> |

#### Example request

`https://api-us.pricerunner.com/agentic/v1/product/offers/US?itemConditionFilters=NEW%2CUNKNOWN&productIdentifiers=krn%3Akpdc%3Aproduct%3A3431242055%2Ckrn%3Akpdc%3Aproduct%3A3431242200`

<span>This request retrieves product details and all available merchant offers
in the US market for two specified product identifiers, filtered to include only
NEW or UNKNOWN condition offers.</span>

### Response

The response contains a list of product listings, each including:

1.  A product object with enriched product details.
2.  A list of offers from merchants currently selling that product.

#### Response Fields

| Field             | Type  | Description                                                                                                                                                                              |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productListings` | Array | A list of product objects with connected offer objects, each representing a unique item in Klarna’s product catalog with connected prices and item merchant  from one or more merchants. |

#### Product Fields

| Field                  | Type             | Description                                                                                                                                                          |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productIdentifier`    | String           | Klarna’s unique product ID.                                                                                                                                          |
| `name`                 | String           | The full product name as listed in Klarna’s catalog.                                                                                                                 |
| `categoryName`         | String           | Product’s main category in Klarna’s taxonomy.                                                                                                                        |
| `subcategoryName`      | String           | More specific subcategory; may be null.                                                                                                                              |
| `brand`                | Object           | Contains brand details: <ul><li>name – Brand name.</li><li>logoUrl – URL to the brand logo (nullable).</li></ul>                                                     |
| `klarnaProductPageUrl` | String (URL)     | Klarna shopping page where the product and its offers are displayed.                                                                                                 |
| `imageUrl`             | String (URL)     | Product image URL.                                                                                                                                                   |
| `gtin14s`              | Array of Strings | GTIN-14 identifiers associated with this product.                                                                                                                    |
| `rating`               | String           | Average user rating, typically formatted as "X.Y". May be null.                                                                                                      |
| `numberOfRatings`      | Integer          | Number of user reviews associated with the product.                                                                                                                  |
| `rank`                 | Integer          | Product’s popularity rank within its category (lower = higher ranked).                                                                                               |
| `description`          | String           | Product description text. May be null.                                                                                                                               |
| `attributes`           | Array of Objects | Structured product attributes. Each attribute has: • name – Attribute name (e.g., "Screen Size (\"")) • values – Array of one or more string values (e.g., ["6.9"]). |

#### Offer Fields

| Field            | Type         | Description                                                                                                                                                                                                                             |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `offerName`      | String       | Merchant-specific name of the product offer.                                                                                                                                                                                            |
| `merchant`       | Object       | Merchant information: • merchantName – Display name of the merchant • merchantLogoUrl – Logo URL • merchantProductSku – SKU assigned by the merchant • international – true if the offer is cross-border (sold from a different market) |
| `offerUrl`       | String (URL) | Klarna-affiliated link to the merchant’s product page.                                                                                                                                                                                  |
| `price`          | Object       | Product price: • value – Price as a string • currency – ISO currency code                                                                                                                                                               |
| `shippingCost`   | Object       | Shipping cost: • value – Cost as a string • currency – ISO currency code                                                                                                                                                                |
| `stockStatus`    | Enum         | Product availability. Possible values: • IN_STOCK • OUT_OF_STOCK • PREORDER • SPECIAL_ORDER • BACKORDER • COLLECT_IN_STORE • UNKNOWN                                                                                                    |
| `deliveryTime`   | Object       | Estimated delivery window: • minDays – Minimum estimated delivery time (nullable) • maxDays – Maximum estimated delivery time (nullable)                                                                                                |
| `paymentMethods` | Array        | Supported payment options, each containing name and imageUrl.                                                                                                                                                                           |
| `gtin14`         | String       | GTIN-14 associated with the specific offer (nullable).                                                                                                                                                                                  |

### Example response (excerpt)

```json
{

 productListings": [

   {

     "product": {

       "productIdentifier": "krn:kpdc:product:3431242055",

       "name": "Apple iPhone 17 Pro Max, 1TB Silver",

       "categoryName": "Mobile Phones",

       "subcategoryName": null,

       "brand": {

         "name": "Apple",

         "logoUrl": null

       },

       "klarnaProductPageUrl": "https://www.klarna.com/us/shopping/pl/cl1/3431242055/Mobile-Phones/Apple-iPhone-17-Pro-Max-1TB-Silver/",

       "imageUrl": "https://owp.klarna.com/product/640x640/3239078895/Apple-iPhone-17-Pro-Max-1TB-Silver.jpg",

       "gtin14s": [

         "00195950640021",

         "00400064730309",

         "00195950640090",

         "00195950638059",

         "00195950639940",

         "00195950639964",

         "00195950640014"

       ],

       "rating": "3.9",

       "numberOfRatings": 1597,

       "rank": 49,

       "description": "Learn about the Apple iPhone 17 Pro Max, 1TB Silver, featuring a large 6.9-inch display and an A17 Bionic chip designed for smooth performance.",

       "attributes": [

         { "name": "Height (\")", "values": ["6.4"] },

         { "name": "Material (body)", "values": ["Glass", "Aluminum"] },

         { "name": "Screen Resolution", "values": ["2868x1320"] },

         { "name": "Manufacturer Color", "values": ["Silver"] },

         { "name": "Color", "values": ["Silver"] },

     ...

       ]

     },

     "offers": [

       {

         "offerName": "Apple iPhone 17 Pro Max 1TB in Silver |  Verizon (with 36 monthly installment payments + plan)",

         "merchant": {

           "merchantName": "Verizon",

           "merchantLogoUrl": "https://owp.klarna.com/images/logos/252231-1877882660.png",

           "merchantProductSku": "MFXN4LL/A",

           "international": false

         },

         "offerUrl": "https://www.klarna.com/us/api/frontend-transition-page/gotostore/v1/partner/US/09cb0c90fff396d9083ce2335989f9db/agentic_product_api?productId=3431242055",

         "price": {

           "value": "1599.99",

           "currency": "USD"

         },

         "shippingCost": {

           "value": "0.00",

           "currency": "USD"

         },

         "stockStatus": "IN_STOCK",

         "deliveryTime": {

           "minDays": 2,

           "maxDays": 5

         },

         "paymentMethods": [

           {

             "name": "Visa",

             "imageUrl": "https://owp.klarna.com/images/logos/addedvalues/10002-1138689398.png?d=100x40"

           },

           {

             "name": "Discover",

             "imageUrl": "https://owp.klarna.com/images/logos/addedvalues/10008-1490106682.png?d=100x40"

           },

           {

             "name": "Mastercard",

             "imageUrl": "https://owp.klarna.com/images/logos/addedvalues/10001-1085000540.png?d=100x40"

           },

           {

             "name": "American Express",

             "imageUrl": "https://owp.klarna.com/images/logos/addedvalues/10004-741715625.png?d=100x40"

           }

         ],

         "gtin14": "00195950638059",

         "attributes": []

       },

...
```

## Standard Response Codes

### Product Search Endpoint

| Code                  | Meaning             | Description                                                    |
| --------------------- | ------------------- | -------------------------------------------------------------- |
| 200 OK                | Success             | The response body contains the search result.                  |
| 400 Bad Request       | Invalid request     | One or more parameters are missing or malformed.               |
| 403 Forbidden         | Unauthorized token  | The provided token is invalid or not accepted for this region. |
| 429 Too Many Requests | Rate limit exceeded | Too many requests sent in a short time for this token.         |

### Product Listings Endpoint

| Code                  | Meaning             | Description                                                    |
| --------------------- | ------------------- | -------------------------------------------------------------- |
| 200 OK                | Success             | The response body contains the product listings and offers.    |
| 400 Bad Request       | Invalid request     | One or more parameters are missing or malformed.               |
| 403 Forbidden         | Unauthorized token  | The provided token is invalid or not accepted for this region. |
| 429 Too Many Requests | Rate limit exceeded | Too many requests sent in a short time for this token.         |

### Error Handling Best Practices

When your client application receives an error response:

- 400 — Check required parameters and ensure they match the expected format.
- 403 — Verify the validity and region scope of your tokenId.
- 429 — Implement exponential backoff or a short retry delay before resending
  the request.
- 5xx (Server Errors) — These are rare; retry with exponential
  backoff.</agenticproductprotocol@klarna.com></agenticproductprotocol@klarna.com>
