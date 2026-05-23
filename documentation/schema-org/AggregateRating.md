# AggregateRating Implementation Guide

## Overview

This document describes the implementation of Schema.org `AggregateRating` structured data in the Utekos e-commerce application. AggregateRating provides search engines with aggregated review information, improving rich snippet visibility in search results.

## Purpose

`AggregateRating` markup helps:

- Display star ratings in Google search results
- Improve click-through rates with rich snippets
- Provide trustworthy social proof to potential customers
- Enhance SEO performance for product pages

## Implementation Location

The AggregateRating implementation is located in:

```
src/app/produkter/[handle]/components/ProductJsonLd.tsx
```

Supporting data structures are defined in:

```
src/db/data/reviews/productReviews.ts
```

## Data Structure

### Type Definitions

```typescript
export type ProductReviewBundle = {
  aggregateRating: {
    ratingValue: number
    reviewCount: number
    ratingCount: number
    bestRating: 1 | 2 | 3 | 4 | 5
    worstRating: 1 | 2 | 3 | 4 | 5
  }
  reviews: ProductReviewItem[]
}
```

### Schema.org Structure

The implementation follows Schema.org specifications for `AggregateRating`:

```json
{
  "@type": "AggregateRating",
  "ratingValue": 4.9,
  "reviewCount": 8,
  "ratingCount": 8,
  "bestRating": 5,
  "worstRating": 4
}
```

## Key Properties

### Required Properties

- **`@type`**: Always set to `"AggregateRating"`
- **`ratingValue`**: Average rating (0-5 scale)
- **`reviewCount`**: Total number of reviews
- **`ratingCount`**: Total number of ratings

### Recommended Properties

- **`bestRating`**: Highest possible rating (typically 5)
- **`worstRating`**: Lowest rating in dataset (typically 4 or 5)

## Implementation Details

### Review Data Storage

Product reviews are stored in a typed object map:

```typescript
export const productReviewBundles: Record<string, ProductReviewBundle> = {
  'utekos-techdown': {
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 8,
      ratingCount: 8,
      bestRating: 5,
      worstRating: 4
    },
    reviews: [/* individual reviews */]
  }
}
```

### Markup Generation

The `getReviewMarkup` function generates structured data:

```typescript
const getReviewMarkup = (
  handle: string
): Pick<ProductJsonLdShape, 'aggregateRating' | 'review'> => {
  const bundle = productReviewBundles[handle]
  if (!bundle) return {}

  const aggregateRating: AggregateRating = {
    '@type': 'AggregateRating',
    'ratingValue': bundle.aggregateRating.ratingValue,
    'reviewCount': bundle.aggregateRating.reviewCount,
    'ratingCount': bundle.aggregateRating.ratingCount,
    'bestRating': bundle.aggregateRating.bestRating,
    'worstRating': bundle.aggregateRating.worstRating
  }

  // Returns aggregateRating and optional review array
  return { aggregateRating, review }
}
```

### Integration with Product Schema

AggregateRating is integrated into both Product and ProductGroup schemas:

```typescript
const jsonLd: ProductJsonLdShape = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${productUrl}#product`,
  ...commonData,
  ...reviewMarkup,  // Spreads aggregateRating and review
  // ... other properties
}
```

## Best Practices

### Data Quality

- **Authentic reviews only**: Only include genuine customer reviews
- **Accurate statistics**: Ensure `ratingValue` matches actual average
- **Consistent scale**: Maintain 1-5 rating scale across all products
- **Regular updates**: Update review data as new reviews are collected

### Rating Value Calculation

The `ratingValue` should be the arithmetic mean of all ratings:

```typescript
ratingValue = sum(all individual ratings) / ratingCount
```

### Review Count vs Rating Count

- **`reviewCount`**: Number of written reviews with text
- **`ratingCount`**: Total number of ratings (may include ratings without text)

In our implementation: `reviewCount === ratingCount` (all ratings include review text)

### Worst Rating Consideration

The `worstRating` represents the lowest rating in your dataset, not the theoretical minimum:

- If all reviews are 4-5 stars: `worstRating: 4`
- If reviews include 3 stars: `worstRating: 3`
- This provides accurate representation of actual review distribution

## Validation

### Google Rich Results Test

Validate markup using:

```
https://search.google.com/test/rich-results
```

### Schema.org Validator

Additional validation available at:

```
https://validator.schema.org/
```

### Key Validation Points

- AggregateRating must be nested within Product or ProductGroup
- `ratingValue` must be within bestRating-worstRating range
- `reviewCount` must be ≥ 1 for AggregateRating to appear
- All required properties must be present

## Example Output

### Complete JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://utekos.no/produkter/utekos-techdown#product",
  "name": "Utekos TechDown",
  "description": "Premium outdoor comfort blanket",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 8,
    "ratingCount": 8,
    "bestRating": 5,
    "worstRating": 4
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Kjetil Hodne"
      },
      "datePublished": "2026-03-16",
      "reviewBody": "Veldig kjekk å ha på kalde kvelder...",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5,
        "worstRating": 4
      }
    }
  ]
}
```

## Current Products with Reviews

As of the latest update, the following products have AggregateRating data:

- **utekos-techdown**: 4.9 average (8 reviews)
- **utekos-mikrofiber**: 5.0 average (4 reviews)

## Adding New Product Reviews

To add reviews for a new product:

1. Add entry to `productReviewBundles` in `productReviews.ts`
2. Calculate accurate `ratingValue` from all ratings
3. Set `reviewCount` and `ratingCount` to actual counts
4. Determine `worstRating` from your dataset
5. Add individual review objects to `reviews` array

### Example Template

```typescript
'product-handle': {
  aggregateRating: {
    ratingValue: 0.0,  // Calculate average
    reviewCount: 0,     // Count of reviews
    ratingCount: 0,     // Count of ratings
    bestRating: 5,      // Always 5
    worstRating: 4      // Min rating in dataset
  },
  reviews: [
    {
      author: 'Customer Name',
      datePublished: 'YYYY-MM-DD',
      ratingValue: 5,
      reviewBody: 'Review text'
    }
  ]
}
```

## SEO Impact

### Expected Benefits

- **Rich snippets**: Star ratings displayed in search results
- **Increased CTR**: 15-30% improvement in click-through rates
- **Trust signals**: Social proof visible before click
- **Competitive advantage**: Stand out from competitors without reviews

### Monitoring

Track performance using:

- Google Search Console (Search Appearance → Rich Results)
- Click-through rate changes for products with ratings
- Impressions and position changes

## Technical Considerations

### Caching

The ProductJsonLd component uses Next.js caching:

```typescript
'use cache'
cacheLife('max')
cacheTag(`product-${handle}`, 'products')
```

After updating review data, revalidate cache:

```typescript
revalidateTag(`product-${handle}`)
```

### Security

- **XSS Prevention**: Review text is sanitized via `sanitizeText()`
- **JSON Escaping**: Output uses `serializeJsonLd()` for safe JSON-LD
- **Input Validation**: TypeScript ensures type safety

### Performance

- Server-side generation ensures no client-side overhead
- Static generation with long cache times
- Minimal impact on page load performance

## Troubleshooting

### Reviews Not Appearing in Search

1. Verify markup with Google Rich Results Test
2. Check `reviewCount` ≥ 1
3. Ensure proper Product/ProductGroup nesting
4. Wait 2-4 weeks for Google to recognize changes

### Invalid Markup Errors

- Verify `ratingValue` is within worstRating-bestRating range
- Ensure all required properties are present
- Check for proper type declarations
- Validate date format: `YYYY-MM-DD`

### Inconsistent Data

- Recalculate `ratingValue` average
- Verify `reviewCount` matches actual review array length
- Ensure `worstRating` reflects minimum in dataset

## References

### Schema.org Documentation

- [AggregateRating](https://schema.org/AggregateRating)
- [Product](https://schema.org/Product)
- [Review](https://schema.org/Review)

### Google Guidelines

- [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)

## Maintenance

### Regular Tasks

- **Monthly**: Review and update statistics as new reviews come in
- **Quarterly**: Validate markup with Google Rich Results Test
- **After updates**: Test on staging before production deployment

### Data Integrity Checks

- `ratingValue` matches calculated average
- `reviewCount` equals length of reviews array
- All reviews have valid dates and content
- Author names are sanitized and appropriate

## Version History

| Date       | Change                                    |
| ---------- | ----------------------------------------- |
| 2026-05-23 | Initial documentation created             |
| 2026-05-23 | Added comprehensive examples and guidance |

## Contact

For questions or issues with AggregateRating implementation, refer to:

- Product team for review collection processes
- Development team for technical implementation
- SEO team for performance monitoring
