# Tips for Creating and Managing Product Sets in Your Catalog

Product sets are groups of products in your catalog that you can use for
advertising or to feature as "collections" in your shop on Facebook and
Instagram. You can create product sets in Commerce Manager or Meta Ads Manager.

## How Product Set Filters Work

When you create a product set, you can use filters to determine which products
from your catalog are added to it. You'll select a product attribute (such as
title) and then how you want to filter that attribute. Here's how the filters
work:

### Filter Types and Descriptions

#### Is

Includes all products that are an exact match for the search term.

**Example:** Filtering products by color `is "blue"` will only include products
in the set that are blue.

#### Is Any of These

Includes all products that are an exact match for at least one of the search
terms.

**Example:** Filtering products by color
`is any of these "red", "green", "blue"` will include any products with a color
value of red, green or blue.

#### Is Not

Includes all products that are not an exact match for the search term.

**Example:** Filtering products by material `is not "leather"` will include
products in the set that are not made from "leather". Products made from "faux
leather" will still be included.

#### Contains

Includes all products that contain the search term. The search term must match
an entire word, not just part of a word.

**Important considerations:**

- A search term that is contained in a longer word will not match this filter.
  For example, filtering by title `contains "board"` will not match "skateboard"
  and vice versa.
- Consider plural words. For example, filtering by title `contains "shoes"` will
  not match "shoe" and vice versa.
- Consider numbers. For example, filtering by custom number 1 `contains "2024"`
  will not match "120243" and vice versa.

**Punctuation and special characters:**

- **Separators:** Spaces and `,?@$%^*()+=~[{}];"<>|—/®™【】` are separators,
  meaning they will break your search term into separate words. For example,
  filtering by title `contains "running+shoes"` will match "running" and
  "shoes".
- **Combined separators:** `&:/._#-` are also separators, but the combined term
  will also match. For example, filtering by title `contains "T-shirt"` will
  match "T", "shirt" and "T-shirt". Filtering by internal label
  `contains "autumn_2024"` will match "autumn", "2024" and "autumn_2024".
- **Apostrophes:** An apostrophe (`'`) is not a separator. For example,
  filtering by title `contains "women's"` will not match "women" and vice versa.
- **Multiple words:** If your search term contains multiple words, all of the
  words must match but they don't need to be in consecutive order. For example,
  filtering by title `contains "jeans blue"` will match "blue cropped jeans" but
  will not match "jeans" or "black jeans".
- **Taxonomy levels:** Since `>` is a separator, this filter doesn't work for
  search terms that contain taxonomy levels separated by `>` such as product
  categories. For example, filtering products by Google product category
  `contains "personal care > cosmetics"` won't work correctly. Change your
  search term to match entire words, such as Google product category
  `contains "cosmetics"`, or use the `starts with` filter instead.

#### Does Not Contain

Includes all products that do not contain the search term. The search term must
match an entire word, not just part of a word. Refer to the description of
`contains` for how a word is defined.

**Important:** This filter only matches a product when the entire search term
doesn't appear.

**Examples:**

- Filtering products by title `does not contain "knitted sweater"` will include
  "striped sweater" in the product set but will not include "chunky white
  knitted sweater".
- Filtering products by title `does not contain "sweater"` will not include
  "knitted sweater" or "chunky white knitted sweater" in the product set.

#### Starts With

Includes all products that start with the search term.

**Example:** Filtering by Google product category
`starts with "Clothing & Accessories"` will include all products under this
top-level category, such as "Clothing & Accessories > Clothing > Dresses" and
"Clothing & Accessories > Handbags, Wallets & Cases > Handbags".

**Note:** This filter is only available for the Google product category
attribute. For other attributes, you could use `contains` or `is` instead.

#### Is Greater Than

Includes all products with a number value that is greater than the search term.

**Example:** Filtering by price `is greater than "50"` will include all products
with a price that is higher than 50.

**Note:** This filter does not support numbers with decimals.

**Tip:** To include products on sale, you can filter by sale price
`is greater than 0`. This will include all products with a sale price in your
product set.

#### Is Greater Than or Equal To

Includes all products with a number value that is greater than or equal to the
search term.

**Example:** Filtering by price `is greater than or equal to "50"` will include
all products with a price that is 50 or higher.

**Note:** This filter does not support numbers with decimals.

#### Is Less Than

Includes all products with a number value that is less than the search term.

**Example:** Filtering by custom number 0 `is less than "100"` will include all
products with a custom number 0 value attribute that is lower than 100.

**Note:** This filter does not support numbers with decimals.

#### Is Equal To or Less Than

Includes all products with a number value that is less than or equal to the
search term.

**Example:** Filtering by custom number 0 `is less than or equal to "100"` will
include all products with a custom number 0 attribute value that is 100 or
lower.

**Note:** This filter does not support numbers with decimals.

#### Is Present

Includes all products that have the selected attribute.

**Example:** Filtering by video `is present` will include all products that have
a video.

#### Is Not Present

Includes all products that do not have the selected attribute.

**Example:** Filtering by video `is not present` will include all products that
do not have a video.

## Tips for Filtering Product Sets

- Filters are not case sensitive.
- A larger product set gives the ad delivery system more options to display the
  most relevant products possible for your audience, so filtering by a few broad
  attributes is recommended. For example, all women's clothing that costs less
  than $100. Avoid adding very narrow filters since this limits product
  recommendations.
- Don't add redundant filters. For example, for ads, you don't need to filter
  products by availability `is "in stock"` because out of stock items are
  already excluded from your ads.
- You can choose whether products must match **All filters** or **At least one
  filter**. Make sure to select the correct option to include the products you
  want in the set.
- When filtering by the Product and Item group ID attributes, you can paste in a
  list of values separated by commas, spaces or line breaks. For example, you
  could copy and paste a list of group IDs directly from the `item_group_id`
  column of your data feed.
- To create your own filters, you can add custom data to your products using the
  internal label and custom number attributes and then select those attributes
  when filtering. Learn more about optional fields.
- **Note:** If you're currently using custom labels for product set filtering,
  we recommend switching to internal labels instead. Unlike custom labels, you
  can add or update internal labels as often as needed without sending items
  through policy review each time, which can impact ad delivery.
- You can't filter products by an attribute if your catalog doesn't contain that
  information. For example, if you haven't provided the color attribute for your
  products, filtering them by color won't have any effect.
- If you have a very large catalog, don't create product sets with a very high
  number of `contains` or `does not contain` filters because they can slow down
  product filtering.

## Tips for Ensuring Your Product Sets Contain Enough Products

- Monitor your product sets regularly to ensure they always contain enough
  products to enable ad delivery. Ads in collection format must contain at least
  four products and ads in carousel format must contain at least two. This
  minimum number of products must be unique (not variants of one another) and
  must not be invalid, meaning they're out of stock, archived, or have policy
  violations or other issues.
- Remember that product set filters are dynamic so your product sets may change
  over time when your catalog is updated. For example, you could accidentally
  remove some or all products from a set.
- If your set contains variants of the same product, such as different sizes or
  colors, remember that only one variant will appear in each ad. Learn more
  about variants.
- Provide a different image for each product. If multiple products in a product
  set have the same image, only one of them will display in your ads.
- If your product set falls below the minimum required number of products, your
  ad may be paused and you may see an error message in Ads Manager that your
  product set doesn't contain enough products or is empty. Learn more about
  troubleshooting not enough items in your product set.
