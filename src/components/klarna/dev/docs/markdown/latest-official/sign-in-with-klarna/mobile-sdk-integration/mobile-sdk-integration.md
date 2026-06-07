# 1. Request a new client

It is possible to integrate directly with Klarna OpenIDConnect.

Obtain a client with either the `client_secret_basic` or `client_secret_post` authentication methods selected
and save the secret. You will need to use it to authenticate requests to the OIDC.

## 2. Choose a right IDP URL

Employ an IDP URL specific to your service's geographic region and run IDP discovery. This step will retrieve
the authorization and token endpoints, available scopes and other essential components needed for the standard
OAuth flow.

```markup
EU: https://login.klarna.com
NA: https://login.klarna.com/na/lp/idp

```

**\[INFO]**

To test Sign in with Klarna direct integration on playground, please use the following issuer URLs:

\* EU: \[https\://login.playground.klarna.com]\(https\://login.playground.klarna.com) \* NA:
\[https\://login.playground.klarna.com/na/lp/idp]\(https\://login.playground.klarna.com/na/lp/idp)

## 3. Authenticate your client at the token endpoint

When calling the token endpoint, you must authenticate your client on every request. The method depends on how
your client was registered.

**`client_secret_basic`** — Pass your `client_id` and `client_secret` as HTTP Basic Auth in the
`Authorization` header. The value must be Base64-encoded and **must** include the `Basic` prefix:
`Authorization: Basic <base64(client_id:client_secret)>` Example (before encoding):
`ca89d7d6-f74e-4c4f-9fa9-a28fd13d4074:your-secret`

⚠️ The `Basic` prefix is required. Sending the raw credentials or API key directly in the `Authorization`
header without this prefix will result in a `400 Invalid authorization header` error.

**`client_secret_post`** — Pass `client_id` and `client_secret` as form fields in the request body
(`application/x-www-form-urlencoded`). Do not set an `Authorization` header in this case.

## 4. Follow standard OAuth flow

Follow the rest of the OAuth flow according to the standard
[RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749). page. Please ensure you're visiting a React
application.

```text
Internet Engineering Task Force (IETF)                     D. Hardt, Ed.
Request for Comments: 6749                                     Microsoft
Obsoletes: 5849                                             October 2012
Category: Standards Track
ISSN: 2070-1721


                 The OAuth 2.0 Authorization Framework

Abstract

   The OAuth 2.0 authorization framework enables a third-party
   application to obtain limited access to an HTTP service, either on
   behalf of a resource owner by orchestrating an approval interaction
   between the resource owner and the HTTP service, or by allowing the
   third-party application to obtain access on its own behalf.  This
   specification replaces and obsoletes the OAuth 1.0 protocol described
   in RFC 5849.

Status of This Memo

   This is an Internet Standards Track document.

   This document is a product of the Internet Engineering Task Force
   (IETF).  It represents the consensus of the IETF community.  It has
   received public review and has been approved for publication by the
   Internet Engineering Steering Group (IESG).  Further information on
   Internet Standards is available in Section 2 of RFC 5741.

   Information about the current status of this document, any errata,
   and how to provide feedback on it may be obtained at
   http://www.rfc-editor.org/info/rfc6749.

Copyright Notice

   Copyright (c) 2012 IETF Trust and the persons identified as the
   document authors.  All rights reserved.

   This document is subject to BCP 78 and the IETF Trust's Legal
   Provisions Relating to IETF Documents
   (http://trustee.ietf.org/license-info) in effect on the date of
   publication of this document.  Please review these documents
   carefully, as they describe your rights and restrictions with respect
   to this document.  Code Components extracted from this document must
   include Simplified BSD License text as described in Section 4.e of
   the Trust Legal Provisions and are provided without warranty as
   described in the Simplified BSD License.
```
