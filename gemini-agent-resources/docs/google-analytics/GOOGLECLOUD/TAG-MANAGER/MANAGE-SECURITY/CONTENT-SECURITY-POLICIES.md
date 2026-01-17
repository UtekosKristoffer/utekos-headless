# Use Tag Manager with a Content Security Policy

Content Security Policy (CSP) is a widely supported Web security standard intended to prevent certain types of injection-based attacks by giving developers control over the resources loaded by their applications. Use this guide to understand how to deploy Google Tag Manager on sites that use a CSP.

> **Note**: To ensure the CSP behaves as expected, it is best to use the `report-uri` and/or `report-to` directives to get reports of policy violations.

## Enable the container tag to use CSP

To use Google Tag Manager on a page with a CSP, the CSP must allow for the execution of your Tag Manager container code. This code is built as inline JavaScript code that injects the `gtm.js` script. There are several ways to do this, such as the use of a nonce or a hash. The recommended method is to use a nonce, which should be an unguessable, random value that the server generates individually for each response. Supply the nonce value in the `Content-Security-Policy` `script-src` directive:

```
Content-Security-Policy:
script-src 'nonce-{SERVER-GENERATED-NONCE}';
img-src www.googletagmanager.com;
connect-src www.googletagmanager.com www.google.com
```

Then use the nonce-aware version of the inline Tag Manager container code. Set the nonce attribute on the inline script element to this same value:

```html
<!-- Google Tag Manager -->
<script nonce='{SERVER-GENERATED-NONCE}'>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');
n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```

Tag Manager will then propagate the nonce to any scripts that it adds to the page.

There are other approaches to enabling the execution of an inline script, such as supplying the hash of the inline script in the CSP.

If the recommended nonce or hash approaches are not feasible, it is possible to enable the Tag Manager inline script by adding the `'unsafe-inline'` directive to the CSP's `script-src` section.

> **The use of `'unsafe-inline'` is discouraged.** You should carefully consider the security ramifications of adding this directive to the CSP before using this approach.

The following directives are needed in the CSP to use this approach:

| Directive     | Content                                             |
| :------------ | :-------------------------------------------------- |
| `script-src`  | `'unsafe-inline' https://www.googletagmanager.com`    |
| `img-src`     | `www.googletagmanager.com`                          |
| `connect-src` | `www.googletagmanager.com www.google.com`           |

> **Note**: Certain tags load content from or make requests to other origins, so they require the use of additional CSP directives to function properly.

## Custom JavaScript Variables

Due to how Custom JavaScript variables are implemented, they will evaluate to `undefined` in the presence of a CSP unless the `'unsafe-eval'` directive is given in the `script-src` section of the CSP.

> To avoid potential security vulnerabilities, use `'unsafe-eval'` only when absolutely necessary.

| Directive    | Content         |
| :----------- | :-------------- |
| `script-src` | `'unsafe-eval'` |

> **Note**: Custom Templates are the recommended alternative to Custom JavaScript variables. They can be used to create custom tags and variables that don't require the use of `'unsafe-eval'`.

## Preview Mode

In order to use Google Tag Manager's Preview Mode, the CSP must include the following directives:

| Directive   | Content                                                               |
| :---------- | :-------------------------------------------------------------------- |
| `script-src`| `https://googletagmanager.com https://tagmanager.google.com`          |
| `style-src` | `https://googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com` |
| `img-src`   | `https://googletagmanager.com https://ssl.gstatic.com https://www.gstatic.com` |
| `font-src`  | `https://fonts.gstatic.com data:`                                   |

## Google Analytics 4 (Google Analytics)

To use the Google Analytics 4 (Google Analytics) tag, the CSP must include the following directives:

| Directive     | Content                                                                                   |
| :------------ | :---------------------------------------------------------------------------------------- |
| `script-src`  | `https://*.googletagmanager.com`                                                          |
| `img-src`     | `https://*.google-analytics.com https://*.googletagmanager.com`                           |
| `connect-src` | `https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com` |

For Google Analytics 4 (Google Analytics) deployments using Google Signals, the CSP must include the following directives:

| Directive     | Content                                                                                                                                                                                                |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `script-src`  | `https://*.googletagmanager.com`                                                                                                                                                                       |
| `img-src`     | `https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.<TLD>`                                                              |
| `connect-src` | `https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.<TLD> https://pagead2.googlesyndication.com`                            |
| `frame-src`   | `https://www.googletagmanager.com`                                                                                                                                                                     |

> **Note**: Each Google top-level domain (TLD) must be specified individually, since CSP syntax does not allow the use of wildcards on the right side of the hostname. A list of all supported Google TLDs is available at: [https://www.google.com/supported_domains](https://www.google.com/supported_domains).

## Google Ads

To use a Google Ads Conversion, Remarketing, or Conversion Linker tag, the CSP must include the following directives:

| Directive     | Content                                                                                                                                                                                 |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `script-src`  | `https://www.googleadservices.com https://www.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net`                          |
| `img-src`     | `https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.google.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://google.com https://www.google.<TLD>` |
| `frame-src`   | `https://www.googletagmanager.com`                                                                                                                                                      |
| `connect-src` | `https://pagead2.googlesyndication.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://www.google.com https://google.com https://www.google.<TLD>`                |

## Google Ads User Data Beacon

To use the Google Ads user data beacons when running in secure contexts, the CSP must include the following directives:

| Directive     | Content                                       |
| :------------ | :-------------------------------------------- |
| `script-src`  | `https://www.googletagmanager.com`              |
| `frame-src`   | `https://www.googletagmanager.com`              |
| `connect-src` | `https://google.com https://www.google.com` |

The Google ads user data beacon does not run in insecure contexts, so CSP configuration in those cases is not applicable.

## Floodlight

Floodlight users can enable CSPs using the following configurations. Replace `<FLOODLIGHT-CONFIG-ID>` values with either a specific Floodlight advertiser ID, or `*` to allow any advertiser ID:

For all users:

| Directive     | Content                                                                                                             |
| :------------ | :------------------------------------------------------------------------------------------------------------------ |
| `img-src`     | `https://ad.doubleclick.net https://ade.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com` |
| `frame-src`   | `https://www.googletagmanager.com`                                                                                  |
| `connect-src` | `https://pagead2.googlesyndication.com https://www.google.com https://www.googleadservices.com https://ad.doubleclick.net` |

For "custom scripts" beacons:

| Directive   | Content                                               |
| :---------- | :---------------------------------------------------- |
| `frame-src` | `https://<FLOODLIGHT-CONFIG-ID>.fls.doubleclick.net` |

For image tags:

| Directive | Content                                                        |
| :-------- | :------------------------------------------------------------- |
| `img-src` | `https://ad.doubleclick.net https://ade.googlesyndication.com` |

## Service Worker

To use the Service Worker for enhanced match, user data beacons, and Ads conversions, the CSP must include the following directives:

| Directive   | Content                            |
| :---------- | :--------------------------------- |
| `frame-src` | `https://www.googletagmanager.com` |

## Troubleshoot with Tag Assistant

To troubleshoot Content Security Policy (CSP) issues, use Tag Assistant. Tag Assistant will display the list of resources that are blocked by your Content Security Policy.

1.  Open **Tag Assistant** and Enter your website's URL. A new tab with your website opens.
2.  If the Content Security Policy on your page is blocking a resource, a CSP issue is displayed in the **Page issues** section of Tag Assistant.
3.  Select **View issue** next to the CSP issue to view the list of all blocked resources on your page.
4.  Add all blocked resources to your Content Security Policy.