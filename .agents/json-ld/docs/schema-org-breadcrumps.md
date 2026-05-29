# BreadcrumbList

A Schema.org Type

[Thing](https://schema.org/Thing 'Thing') > [Intangible](https://schema.org/Intangible 'Intangible') >
[ItemList](https://schema.org/ItemList 'ItemList') >
[BreadcrumbList](https://schema.org/BreadcrumbList 'BreadcrumbList')

- Canonical URL: https://schema.org/BreadcrumbList
- [Check for open issues.](https://github.com/schemaorg/schemaorg/issues?q=is%3Aissue+is%3Aopen+BreadcrumbList)

A BreadcrumbList is an ItemList consisting of a chain of linked Web pages, typically described using at least
their URL and their name, and typically ending with the current page.

The [position](https://schema.org/position) property is used to reconstruct the order of the items in a
BreadcrumbList. The convention is that a breadcrumb list has an
[itemListOrder](https://schema.org/itemListOrder) of
[ItemListOrderAscending](https://schema.org/ItemListOrderAscending) (lower values listed first), and that the
first items in this list correspond to the "top" or beginning of the breadcrumb trail, e.g. with a site or
section homepage. The specific values of 'position' are not assigned meaning for a BreadcrumbList, but they
should be integers, e.g. beginning with '1' for the first item in the list.

| Property                                                                     | Expected Type                                          | Description                                                                                                           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Properties from [ItemList](https://schema.org/ItemList 'ItemList')           |
| `[aggregateElement](https://schema.org/aggregateElement "aggregateElement")` | [Thing](https://schema.org/Thing 'Thing')              | Indicates a prototype of the elements in the list that is used to hold aggregate information (ratings, offers, etc.). |
| `[itemListElement](https://schema.org/itemListElement "itemListElement")`    | [ListItem](https://schema.org/ListItem 'ListItem')  or |

[Text](https://schema.org/Text 'Text')  or  
[Thing](https://schema.org/Thing 'Thing') | For itemListElement values, you can use simple strings (e.g.
"Peter", "Paul", "Mary"), existing entities, or use ListItem.

Text values are best if the elements in the list are plain strings. Existing entities are best for a simple,
unordered list of existing things in your data. ListItem is used with ordered lists when you want to provide
additional context about the element in that list or when the same item might be in different places in
different lists.

Note: The order of elements in your mark-up is not sufficient for indicating the order or elements. Use
ListItem with a 'position' property in such cases. | |
`[itemListOrder](https://schema.org/itemListOrder "itemListOrder")` |
[ItemListOrderType](https://schema.org/ItemListOrderType 'ItemListOrderType')  or  
[Text](https://schema.org/Text 'Text') | Type of ordering (e.g. Ascending, Descending, Unordered). | |
`[numberOfItems](https://schema.org/numberOfItems "numberOfItems")` |
[Integer](https://schema.org/Integer 'Integer') | The number of items in an ItemList. Note that some
descriptions might not fully describe all items in a list (e.g., multi-page pagination); in such cases, the
numberOfItems would be for the entire list. | | Properties from [Thing](https://schema.org/Thing 'Thing') | |
`[additionalType](https://schema.org/additionalType "additionalType")` |
[Text](https://schema.org/Text 'Text')  or  
[URL](https://schema.org/URL 'URL') | An additional type for the item, typically used for adding more specific
types from external vocabularies in microdata syntax. This is a relationship between something and a class
that the thing is in. Typically the value is a URI-identified RDF class, and in this case corresponds to the
use of rdf:type in RDF. Text values can be used sparingly, for cases where useful information can be added
without their being an appropriate schema to reference. In the case of text values, the class label should
follow the schema.org [style guide](https://schema.org/docs/styleguide.html). | |
`[alternateName](https://schema.org/alternateName "alternateName")` | [Text](https://schema.org/Text 'Text') |
An alias for the item. | | `[description](https://schema.org/description "description")` |
[Text](https://schema.org/Text 'Text')  or  
[TextObject](https://schema.org/TextObject 'TextObject') | A description of the item. | |
`[disambiguatingDescription](https://schema.org/disambiguatingDescription "disambiguatingDescription")` |
[Text](https://schema.org/Text 'Text') | A sub property of description. A short description of the item used
to disambiguate from other, similar items. Information from other properties (in particular, name) may be
necessary for the description to be useful for disambiguation. | |
`[identifier](https://schema.org/identifier "identifier")` |
[PropertyValue](https://schema.org/PropertyValue 'PropertyValue')  or  
[Text](https://schema.org/Text 'Text')  or  
[URL](https://schema.org/URL 'URL') | The identifier property represents any kind of identifier for any kind
of [Thing](https://schema.org/Thing), such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated
properties for representing many of these, either as textual strings or as URL (URI) links. See
[background notes](https://schema.org/docs/datamodel.html#identifierBg) for more details. | |
`[image](https://schema.org/image "image")` | [ImageObject](https://schema.org/ImageObject 'ImageObject') 
or  
[URL](https://schema.org/URL 'URL') | An image of the item. This can be a [URL](https://schema.org/URL) or a
fully described [ImageObject](https://schema.org/ImageObject). | |
`[mainEntityOfPage](https://schema.org/mainEntityOfPage "mainEntityOfPage")` |
[CreativeWork](https://schema.org/CreativeWork 'CreativeWork')  or  
[URL](https://schema.org/URL 'URL') | Indicates a page (or other CreativeWork) for which this thing is the
main entity being described. See
[background notes](https://schema.org/docs/datamodel.html#mainEntityBackground) for details.  
Inverse property: [mainEntity](https://schema.org/mainEntity 'mainEntity') | |
`[name](https://schema.org/name "name")` | [Text](https://schema.org/Text 'Text') | The name of the item. | |
`[owner](https://schema.org/owner "owner")` | [Organization](https://schema.org/Organization 'Organization') 
or  
[Person](https://schema.org/Person 'Person') | A person or organization who owns this Thing.  
Inverse property: [owns](https://schema.org/owns 'owns') | |
`[potentialAction](https://schema.org/potentialAction "potentialAction")` |
[Action](https://schema.org/Action 'Action') | Indicates a potential Action, which describes an idealized
action in which this thing would play an 'object' role. | | `[sameAs](https://schema.org/sameAs "sameAs")` |
[URL](https://schema.org/URL 'URL') | URL of a reference Web page that unambiguously indicates the item's
identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. | |
`[subjectOf](https://schema.org/subjectOf "subjectOf")` |
[CreativeWork](https://schema.org/CreativeWork 'CreativeWork')  or  
[Event](https://schema.org/Event 'Event') | A CreativeWork or Event about this Thing.  
Inverse property: [about](https://schema.org/about 'about') | | `[url](https://schema.org/url "url")` |
[URL](https://schema.org/URL 'URL') | URL of the item. |

Instances of [BreadcrumbList](https://schema.org/BreadcrumbList 'BreadcrumbList') may appear as a value for
the following properties

| Property                                                 | On Types                                        | Description                                                                      |
| -------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------- |
| [breadcrumb](https://schema.org/breadcrumb 'breadcrumb') | [WebPage](https://schema.org/WebPage 'WebPage') | A set of links that can help a user understand and navigate a website hierarchy. |

### Examples

Use the same breadcrumb hierarchy in each supported format.

#### HTML

```html
<ol>
  <li>
    <a href="https://example.com/dresses">Dresses</a>
  </li>
  <li>
    <a href="https://example.com/dresses/real">Real Dresses</a>
  </li>
</ol>
```

#### Microdata

```html
<ol itemscope itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="https://example.com/dresses">
      <span itemprop="name">Dresses</span>
    </a>
    <meta itemprop="position" content="1" />
  </li>
  <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
    <a itemprop="item" href="https://example.com/dresses/real">
      <span itemprop="name">Real Dresses</span>
    </a>
    <meta itemprop="position" content="2" />
  </li>
</ol>
```

#### RDFa

```html
<ol vocab="https://schema.org/" typeof="BreadcrumbList">
  <li property="itemListElement" typeof="ListItem">
    <a property="item" typeof="WebPage" href="https://example.com/dresses">
      <span property="name">Dresses</span>
    </a>
    <meta property="position" content="1" />
  </li>
  <li property="itemListElement" typeof="ListItem">
    <a property="item" typeof="WebPage" href="https://example.com/dresses/real">
      <span property="name">Real Dresses</span>
    </a>
    <meta property="position" content="2" />
  </li>
</ol>
```

#### JSON-LD

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@id": "https://example.com/dresses",
          "name": "Dresses"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@id": "https://example.com/dresses/real",
          "name": "Real Dresses"
        }
      }
    ]
  }
</script>
```
