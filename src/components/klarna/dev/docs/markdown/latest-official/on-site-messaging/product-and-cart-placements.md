# Product and cart placements

Here you can find technical details about the placements of the messaging assets.

Placements are containers for the different messaging assets we offer. Depending on the type we recommend to
place the placements on different pages of your store (cart and product page, Frequently Asked Questions page,
or sitewide messaging).

You have to specify the placement in the source code of your online store by creating a small html snippet and
passing the necessary attributes.

The following tables list the placement types and their main characteristics.

The placements for the messaging assets that we recommend to appear on the product and cart pages are:

![null](/static/assets/Zp5lGB5LeNNTxXL9%20OSM-pdp-brand3.jpeg)

_An example of a credit-promotion-badge placement_

![](/static/assets/OSM2.0-example.png)

_An example of a credit-promotion-auto-size placement_

| Placement types              | Characteristics                                                                                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `credit-promotion-auto-size` | Displays interactive Klarna messaging. Your customers can click on it and expand the information on the payment methods with calculated prices. Mentions Klarna inline as part of the text. |
| `credit-promotion-badge`     | Displays interactive Klarna messaging. Your customers can click on it and expand the information on the payment methods with calculated prices. Displays Klarna's logo in svg,              |

```html
<klarna-placement
  data-key="credit-promotion-badge"
  data-locale="en-US"
  data-purchase-amount="12000"
></klarna-placement>
```

- An example of credit promotion placement snippet\*

## Checkout widget

A placement type to enhance the user experience by providing detailed information about payment methods,
promotions, and unique selling points, streamlining the checkout process for Klarna's partners and merchants.
This method guarantees the correct presentation of Klarna across all markets and to all customers, maintaining
consistency and simplicity, while providing merchants with the flexibility needed for a globally adaptable
checkout experience, aligning with their various customer experience requirements and expectations.

![null](/static/assets/Checkout%20Widget.jpeg)

_''An example of a checkout widget''_

### Promotions

Merchants can choose to run promotions with Klarna, which can help boost their sales. To make the most of
these promotions, we strongly recommend merchants incorporate our assets. These assets get updated whenever we
offer 0% financing. Key elements like the On-site messaging widget placed in the cart page and the checkout
widget are dynamically updated to stay up to date with the latest version available.

![CheckoutWidget0%Financing](/static/assets/widget-loaded-promotions.png)

_Klarna 0% financing messaging_

_Note that "0% financing available" messaging in sub header is not possible in all markets due to requirements
on having a link to representative example (which we have in On-site messaging assets)._

```html
<klarna-placement data-key="checkout" data-locale="en-US" data-purchase-amount="12000"></klarna-placement>
```

- An example of checkout placement snippet\*

## Site wide placements

The placements for the messaging assets that can be placed sitewide are:

![null](/static/assets/0cad56d9-24d4-4541-bd70-c0a9b8ebf675%20OSM%20topstrip-auto-size%202023-02%2001.jpeg)

_An example of a top-strip-promotion-auto-size placement_

![null](/static/assets/OSM-topbanner-brand.jpeg)

_An example of a top-strip-promotion-badge placement_

![null](/static/assets/Zp5UTR5LeNNTxWv9%20OSM-footer-brand2.jpeg)

_An example of a footer-promotion-auto-size placement_

| Placement types                 | Options                                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `top-strip-promotion-auto-size` | Recommended as static asset at the top of the pages of your online store. Displays interactive Klarna messaging. Your customers can click on it and expand the information on the payment methods. Mentions Klarna inline as part of the text. |
| `top-strip-promotion-badge`     | Recommended as static at the top of the pages of your online store. Displays interactive Klarna messaging. Your customers can click on it and expand the information on the payment methods.                                                   |
| `footer-promotion-auto-size`    | Recommended static asset at the bottom of every page of your online store showcasing the payment methods offered via Klarna.                                                                                                                   |

_An example of top strip promotion placement snippet_

```html
<klarna-placement data-key="top-strip-promotion-badge" data-locale="en-US"></klarna-placement>
```

## Frequently Asked Questions placement

To inform your customers for the Klarna services offered at checkout you can create a dedicated page and
create an FAQ placement:

![null](/static/assets/e74b438e-975e-4033-82c0-73e300ac11e8%20OSM%20FAQ%20cropped%20placements%202023-02%2001.jpeg)

_An example of an FAQ page_

| Placement type        | Characteristics                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info-page-auto-size` | Displays a FAQ to clarify common questions about buying with Klarna. The FAQ is dynamic based on your configuration and offered payment methods. |

```html
<klarna-placement data-key="info-page" data-locale="en-US"></klarna-placement>
```

## Attributes

Placement tags contain required and optional attributes which you can adjust to fit your needs.

| Attribute                        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `data-key`                       | Yes      | A unique identifier of a placement's type and size. The following values are applicable: top-strip-promotion-auto-size top-strip-promotion-badge credit-promotion-auto-size credit-promotion-badge footer-promotion-auto-size info-page                                                                                                                                                                                                                                                                                                                                              |
| `data-locale`                    | Yes      | The language and the billing country of the ad. The following values are applicable: `"en-AT", "de-AT", "nl-BE", "en-BE", "fr-BE", "en-CH", "de-CH", "it-CH", "fr-CH", "en-CZ", "cs-CZ", "de-DE", "en-DE", "da-DK", "en-DK", "es-ES", "en-ES", "fi-FI", "sv-FI", "en-FI", "fr-FR", "en-FR", "en-GB", "en-GR", "el-GR", "en-HU", "en-IE", "en-IT", "hu-HU", "it-IT", "nl-NL", "en-NL", "no-NO", "nb-NO", "en-NO", "en-PL", "pl-PL", "en-PT", "pt-PT", "en-RO", "ro-RO", "sv-SE", "en-SE", "sk-SK, "en-SK", en-CA", "fr-CA", "es-MX", "en-MX", "en-US", "es-US", "en-AU", "en-NZ"`.    |
| `data-purchase-amount`           | Yes      | The amount of money in minor units ($120.00 = 12000), used in amount-based credit promotions. Not required for some placements such as `info-page`.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `data-theme`                     | No       | Sets a theme to override the default or customised content. The following values are applicable: default dark custom                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `data-custom-payment-method-ids` | No       | You can dynamically trigger promotional credit offers. First, work with Klarna’s responsible account manager to determine the criteria for custom offers and a standard naming convention that will be referred to when requesting such offers via Klarna payments API. To be able to advertise these payment methods, pass the names as an array of strings to the On-site messaging placement. The array can be used to define which of the configured payment options within a payment category (`pay_later`, `pay_over_time`, and so on) should be included in the ad selection. |
| `data-message-prefix`            | No       | Prefixes the content of the message. Available for placements with `data-key="credit-promotion-auto-size"` or `data-key="credit-promotion-badge" `when it makes contextual sense. For `data-key="credit-promotion-badge"` prefix should only be used when Klarna badge is positioned to the right side of the placement. Allowed values: `Or`, `or`                                                                                                                                                                                                                                  |
| `data-message-preference`        | No       | This message preference fetches the configuration you need to customize your messaging. Some message preferences are only available for certain placements. The default messaging will be returned automatically if the preferred message preference is not available for this placement.                                                                                                                                                                                                                                                                                            |

_An example placement tag with required attributes._

```html
<klarna-placement
  data-key="credit-promotion-auto-size"
  data-locale="en-US"
  data-purchase-amount="12000"
  data-message-preference="klarna"
></klarna-placement>
```

### Message preference

The message preference is a field intended to return customized messaging according to the preference of the
field. The available options are `"klarna", "prequalification", "in-store"`.

- `klarna` will return the default message preference.
- `prequalification` will return the flow to help customers prequalify for Klarna's select payment plans.
- `in-store` will return messages promoting in store usage of klarna.

```html
<klarna-placement
  data-key="credit-promotion-auto-size"
  data-locale="en-US"
  data-purchase-amount="10000"
  data-message-preference="prequalification"
></klarna-placement>
```

![null](/static/assets/Zxeo34F3NbkBX148%20Prequalification-OSM-Credit-promotion-auto-size.jpeg)

_This is an example to return pre-qualification preference. Prequalification by Klarna is a feature designed
to provide customers with transparent information on their spending power and payment options before checkout,
aiming to enhance the shopping experience and reduce rejections._

### Purchase amount

Amount-based placements have to include the `data-purchase-amount `attribute. This attribute delivers
messaging with a specific price provided in minor units, where available. You can use these placements in
various places across the website, such as cart view, product details page, and product list page.

_Example of purchase amount included in the placement tag._

```html
<klarna-placement
  data-key="credit-promotion-auto-size"
  data-locale="en-US"
  data-purchase-amount="122500"
></klarna-placement>
```

In this example, the price equals $1,225.00 if the currency is US dollars.

To populate `data-purchase-amount`:

- For static values, use the value instead of an empty string, for example, `data-purchase-amount=“12350”`.
  The value must be is in minor units, so 12350 is $123,50 if the currency is US dollars.
- For dynamic values, use JavaScript. With a single placement on a page, you can use a query selector method,
  for example, `document.querySelector(‘klarna-placement’).dataset.purchaseAmount = 9999`. However, if you
  have multiple placements on one page, you have to use a more specific query selector.

After updating the values, remember to
[refresh placements](https://docs.klarna.com/conversion-boosters/on-site-messaging/additional-resources/placements/#refresh-placements).

**\[INFO]**

Don't provide the currency in \`data-purchase-amount\` . The currency is based on the passed locale.

## Refresh placements

In some cases, changes on a website require refreshing placements. The JavaScript library must be informed
about the changes to trigger delivery of updated messaging. The most common use cases are:

- Loading new content without refreshing a page (that is, Ajax refresh) when the new content contains a
  placement tag.
- Changing the purchase amount, locale or theme for placements dynamically without refreshing the page.
- Infinite scrolling on a page with dynamically loaded content on scroll.

To refresh placements, you have to call the `refresh` function exposed by OnsiteMessaging on the
window\.Klarna to inform the JavaScript Library that the placements on the page have been changed. The refresh
operation has to be triggered in the code after a change occurs.

```javascript
window.Klarna.OnsiteMessaging.refresh()
```

**\[INFO]**

At the moment, On-site messaging also exposes a \`window\.KlarnaOnsiteService.push(\{ eventName:
'refresh-placements' })\` function to \`refresh-placements\`. We aim to drop support for this function at the
end of 2023.

```javascript
// To be deprecated, use Klarna.OnsiteMessaging.refresh()
window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' })
```

## Deprecated placement types

We aim to deprecate the following placement types at the end of Q2 2024. Please switch your configuration to
the recommended alternatives as outlined in the table below:

| Legacy placement type                                                                                      | Recommended replacement                                                                                           |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `credit-promotion-small `(same size as standard can be achieved with a width:335px limit on the container) | `credit-promotion-auto-size`                                                                                      |
| `credit-promotion-standard`                                                                                | `credit-promotion-auto-size `(same size as standard can be achieved with a width:350px limit on the container)    |
| `info-page-standard`                                                                                       | `info-page` (same size as standard can be achieved with a width:900px, height:2000px limit on the container)      |
| `top-strip-promotion-standard`                                                                             | `top-strip-promotion-auto-size` (same size as standard can be achieved with a width:350px limit on the container) |
| `info-page-auto-size`                                                                                      | `info-page`                                                                                                       |
