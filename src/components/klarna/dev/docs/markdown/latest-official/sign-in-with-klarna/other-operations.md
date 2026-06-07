# Refresh token

Implement proper token exchange, refresh, and validation using JWKS to support seamless and authenticated
integrations.

To receive a new set of tokens, perform a token exchange through a `POST` request to the token endpoint.
Remember to always save the new `refresh_token` in the database, since the old one will be invalid. Access
tokens are opaque - they are random strings that you cannot decode. Validation should only be performed on the
`id_token`. You do not have to validate the access token before using it.

```javascript
const data = new URLSearchParams()

data.append('refresh_token', '<your refresh token>')
data.append('client_id', '<your client id>')
data.append('grant_type', 'refresh_token')

fetch('https://login.klarna.com/eu/lp/idp/oauth2/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: data
})
  .then(response => response.json())
  .then(data => console.log(data))

//  data
//  {
//        "id_token":"id-token",
//        "access_token":"access-token",
//        "expires_in":299,
//        "token_type":"Bearer",
//        "refresh_token":"refresh-token"
//  }
```

## Request user data

At any point of time you can request the latest user data using the /userinfo endpoint. It requires a valid
access_token as authorization and returns the same data structure as you can find in the id_token. Remember to
get the fresh access_token, described in step
[5. Integrate in purchase flow](https://docs.klarna.com/sign-in-with-klarna/integrate-sign-in-with-klarna/web-sdk-integration/#integration-steps-5-integrate-in-purchase-flow),
using /userinfo. Using a new `access_token` in the `/userinfo` ensures you get the most up to date information
we have for the customer without requiring them to re-login.

```javascript
fetch('https://login.klarna.com/eu/lp/idp/userinfo', {
  headers: {
    Authorization: 'Bearer <access token>'
  }
})
```

## Token Validation

Validate `id_token`: validating an OAuth 2.0 token using a JWKS (JSON Web Key Set) endpoint, such as the one
provided by Klarna, involves several steps. Here's an outline of how you might proceed:

- Retrieve JWKS - Make a HTTP GET request to the JWKS endpoint to retrieve the public keys. The response
  should be a JSON object containing a keys array.
- Parse JWKS - parse the JSON response to extract the keys, which will be in JWK (JSON Web Key) format.
- Decode access token - decode the access token to obtain the header, which contains the Key ID or kid, which
  identifies the key within the JWKS that was used to sign the token.
- Find the signing key - use the kid from the token's header to find the corresponding key in JWKS.
- Verify signature - use the public key to verify the signature of the access_token. This usually requires
  using a library that supports JWT and the necessary cryptographic algorithms.
- Check claims - if the signature is valid, check the claims in the verified token to ensure they meet your
  requirements. Make sure to verify expiration time, audience, issuer and the signing algorithm.

**_Node sample implementation_**

```javascript
const jwt = require('jsonwebtoken')

const jwkToPem = require('jwk-to-pem')
async function verifyTokenWithJWKS(token, jwksUri) {
  try {
    // Decode the token header without verification
    const { header } = jwt.decode(token, { complete: true })
    if (!header || !header.kid) {
      throw new Error('Invalid token header')
    }

    // Retrieve the JWKS
    const response = await fetch('https://login.klarna.com/eu/lp/idp/.well-known/jwks.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch JWKS: ${response.statusText}`)
    }

    const { keys } = await response.json()
    // Find the signing key
    const signingKey = keys.find(key => key.kid === header.kid)
    if (!signingKey) {
      throw new Error('Signing key not found')
    }

    // Convert JWK to PEM
    const pem = jwkToPem(signingKey)

    // Verify the token
    jwt.verify(
      token,
      pem,
      { algorithms: ['RS256'], issuer: 'https://login.klarna.com', audience: '<your client id>' },
      (err, decoded) => {
        if (err) {
          throw err
        }

        // Token is valid, add your logic to check the claims here
        console.log('Token is valid. Claims:', decoded)
      }
    )
  } catch (error) {
    console.error('Token verification failed:', error)
  }
}

// Usage example

const jwksUri = 'https://your-auth-server.com/.well-known/jwks.json'
const yourToken = 'your.jwt.token.here'
verifyTokenWithJWKS(yourToken, jwksUri)
```
