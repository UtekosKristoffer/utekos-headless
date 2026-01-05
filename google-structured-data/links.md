# Link Best Practices for Google

Google uses links as a signal when determining the relevancy of pages and to
find new pages to crawl. Learn how to make your links crawlable so that Google
can find other pages on your site via the links on your page, and how to improve
your anchor text so that it's easier for people and Google to make sense of your
content.

## Make Your Links Crawlable

Generally, Google can only crawl your link if it's an `<a>` HTML element (also
known as anchor element) with an `href` attribute. Most links in other formats
won't be parsed and extracted by Google's crawlers. Google can't reliably
extract URLs from `<a>` elements that don't have an `href` attribute or other
tags that perform as links because of script events.

### Examples of Links Google Can and Can't Parse

#### ✅ Recommended (Google can parse)

```html
<a href="https://example.com">
  <a href="/products/category/shoes">
    <a href="./products/category/shoes">
      <a href="/products/category/shoes" onclick="javascript:goTo('shoes')">
        <a href="/products/category/shoes" class="pretty"></a></a></a></a
></a>
```

**Note:** Links are also crawlable when you use JavaScript to insert them into a
page dynamically as long as it uses the HTML markup shown above.

#### ❌ Not Recommended (but Google may still attempt to parse this)

```html
<a routerLink="products/category">
  <span href="https://example.com">
    <a onclick="goto('https://example.com')"></a></span
></a>
```

### Ensure URLs Resolve to Actual Web Addresses

Make sure that the URL in your `<a>` element resolves into an actual web address
(meaning, it resembles a URI) that Google crawlers can send requests to.

#### ✅ Recommended (Google can resolve)

```html
<a href="https://example.com/stuff">
  <a href="/products"> <a href="/products.php?id=123"></a></a
></a>
```

#### ❌ Not Recommended (but Google may still attempt to resolve this)

```html
<a href="javascript:goTo('products')">
  <a href="javascript:window.location.href='/products'"></a
></a>
```

## Anchor Text Placement

Anchor text (also known as link text) is the visible text of a link. This text
tells people and Google something about the page you're linking to. Place anchor
text between `<a>` elements that Google can crawl.

### Examples

**✅ Good:**

```html
<a href="https://example.com/ghost-peppers">ghost peppers</a>
```

**❌ Bad (empty link text):**

```html
<a href="https://example.com"></a>
```

### Fallback: Using the Title Attribute

As a fallback, Google can use the `title` attribute as anchor text if the `<a>`
element is for some reason empty.

```html
<a
  href="https://example.com/ghost-pepper-recipe"
  title="how to pickle ghost peppers"
></a>
```

### Images as Links

For images as links, Google uses the `alt` attribute of the `img` element as
anchor text, so be sure to add descriptive alt text to your images.

**✅ Good:**

```html
<a href="/add-to-cart.html"
  ><img src="enchiladas-in-shopping-cart.jpg" alt="add enchiladas to your cart"
/></a>
```

**❌ Bad (empty alt text and empty link text):**

```html
<a href="/add-to-cart.html"
  ><img src="enchiladas-in-shopping-cart.jpg" alt=""
/></a>
```

**Tip:** If you are using JavaScript to insert anchor text, use the URL
Inspection Tool to make sure it's present in the rendered HTML.

## Write Good Anchor Text

Good anchor text is descriptive, reasonably concise, and relevant to the page
that it's on and to the page it links to. It provides context for the link, and
sets the expectation for your readers. The better your anchor text, the easier
it is for people to navigate your site and for Google to understand what the
page you're linking to is about.

### Be Descriptive

**❌ Bad (too generic):**

```html
<a href="https://example.com">Click here</a> to learn more.
<a href="https://example.com">Read more</a>. Learn more about our cheese on our
<a href="https://example.com">website</a>. We have an
<a href="https://example.com">article</a> that provides more background on how
the cheese is made.
```

> **Tip:** Try reading only the anchor text (out of context) and check if it's
> specific enough to make sense by itself. If you don't know what the page could
> be about, you need more descriptive anchor text.

**✅ Better (more descriptive):**

```html
For a full list of cheese available for purchase, see the
<a href="https://example.com">list of cheese types</a>.
```

### Be Concise

**❌ Bad (weirdly long):**

```html
Starting next Tuesday, the
<a href="https://example.com"
  >Knitted Cow invites local residents of Wisconsin to their grand re-opening by
  also offering complimentary cow-shaped ice sculptures</a
>
to the first 20 customers.
```

**✅ Better (more concise):**

```html
Starting next Tuesday, the
<a href="https://example.com"
  >Knitted Cow invites local residents of Wisconsin</a
>
to their grand re-opening by also offering complimentary cow-shaped ice
sculptures to the first 20 customers.
```

### Write Naturally and Provide Context

- Write as naturally as possible
- Resist the urge to cram every keyword that's related to the page you're
  linking to (keyword stuffing is a violation of spam policies)
- Ask yourself: does the reader need these keywords to understand the next page?
- Give context to your links: the words before and after links matter
- Pay attention to the sentence as a whole
- Don't chain up links next to each other

**❌ Bad (too many links next to each other):**

```html
I've written about cheese <a href="https://example.com/page1">so</a>
<a href="https://example.com/page2">many</a>
<a href="https://example.com/page3">times</a>
<a href="https://example.com/page4">this</a>
<a href="https://example.com/page5">year</a>.
```

**✅ Better (links are spaced out with context):**

```html
I've written about cheese so many times this year: who can forget the
<a href="https://example.com/blue-cheese-vs-gorgonzola"
  >controversy over blue cheese and gorgonzola</a
>, the
<a href="https://example.com/worlds-oldest-brie">world's oldest brie</a> piece
that won the Cheesiest Research Medal, the epic retelling of
<a href="https://example.com/the-lost-cheese">The Lost Cheese</a>, and my
personal favorite,
<a href="https://example.com/boy-and-his-cheese"
  >A Boy and His Cheese: a story of two unlikely friends</a
>.
```

## Internal Links: Cross-Reference Your Own Content

You may usually think about linking in terms of pointing to external websites,
but paying more attention to the anchor text used for internal links can help
both people and Google make sense of your site more easily and find other pages
on your site.

### Key Principles

- Every page you care about should have a link from at least one other page on
  your site
- Think about what other resources on your site could help your readers
  understand a given page
- Link to those pages in context
- There's no magical ideal number of links a given page should contain
- However, if you think it's too much, then it probably is

## External Links: Link to Other Sites

Linking to other sites isn't something to be scared of; in fact, using external
links can help establish trustworthiness (for example, citing your sources).
Link out to external sites when it makes sense, and provide context to your
readers about what they can expect.

### Example: Citing Sources

**✅ Good (citing your sources):**

```html
According to a recent study from Swiss researchers, Emmental cheese wheels that
were exposed to music had a milder flavor when compared to the control cheese
wheels (which experienced no such musical treatment), with the full findings
available in
<a href="https://example.com"
  >Cheese in Surround Sound—a culinary art experiment</a
>.
```

### When to Use Nofollow

Use `nofollow` only when you don't trust the source, and not for every external
link on your site.

**Example scenario:** You're a cheese enthusiast and someone published a story
badmouthing your favorite cheese, so you want to write an article in response;
however, you don't want to give the site some of your reputation from your link.
This would be a good time to use `nofollow`.

### Additional Qualifiers

- If you were paid in some way for the link, qualify these links with
  `sponsored` or `nofollow`
- If users can insert links on your site (for example, you have a forum section
  or Q&A site), add `ugc` or `nofollow` to these links too
