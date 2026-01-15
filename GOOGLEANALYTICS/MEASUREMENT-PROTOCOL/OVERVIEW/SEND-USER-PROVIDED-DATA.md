# Send User-Provided Data with User-ID using the Measurement Protocol

Similar to using gtag, it is possible to use the Google Analytics Measurement
Protocol to send user-provided data along with User-ID, which can be used to
improve behavior and conversion measurement.

## Overview

To send user-provided data along with a Measurement Protocol request, add the
`user_data` parameter in the JSON payload. The `user_id` parameter must be
present whenever `user_data` is provided.

The Measurement Protocol is using the same normalization and hashing algorithm
as the Google Ads API Enhanced Measurement feature. For privacy concerns, email
addresses, phone numbers, first names, last names, and street addresses must be
hashed using the SHA-256 algorithm before being uploaded. The hashed value
should be encoded in hex string format (string object containing only
hexadecimal digits), such as `88d7ecb5c5b21d7b1`.

## Normalization Requirements

In order to standardize the hash results, prior to hashing one of these values
you must:

- Remove leading and trailing whitespaces
- Convert the text to lowercase
- Format phone numbers according to the E164 standard
- Remove all periods (.) that precede the domain name in gmail.com and
  googlemail.com email addresses

## JSON Post Body Parameters

| Key                                     | Type         | Description                                                                                                                                                                                                                 |
| --------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`                               | string       | A unique identifier for a user. See User-ID for cross-platform analysis for more information on this identifier.                                                                                                            |
| `user_data`                             | object       | Enhanced user data fields identifying a user.                                                                                                                                                                               |
| `user_data.sha256_email_address[]`      | string array | Hashed and encoded email address of the user. Normalized as such: lowercase, remove periods before @ for gmail.com/googlemail.com addresses, remove all spaces, hash using SHA256 algorithm, encode with hex string format. |
| `user_data.sha256_phone_number[]`       | string array | Hashed and encoded phone number of the user. Normalized as such: remove all non digit characters, add + prefix, hash using SHA256 algorithm, encode with hex string format.                                                 |
| `user_data.address[]`                   | array        | Identifies a user based on physical location.                                                                                                                                                                               |
| `user_data.address[].sha256_first_name` | string       | Hashed and encoded first name of the user. Normalized as such: remove digits and symbol characters, lowercase, remove leading and trailing spaces, hash using SHA256 algorithm, encode with hex string format.              |
| `user_data.address[].sha256_last_name`  | string       | Hashed and encoded last name of the user. Normalized as such: remove digits and symbol characters, lowercase, remove leading and trailing spaces, hash using SHA256 algorithm, encode with hex string format.               |
| `user_data.address[].sha256_street`     | string       | Hashed and encoded street and number of the user. Normalized as such: remove symbol characters, lowercase, remove leading and trailing spaces, hash using SHA256 algorithm, encode with hex string format.                  |
| `user_data.address[].city`              | string       | City for the address of the user. Normalized as such: remove digits and symbol characters, lowercase, remove leading and trailing spaces.                                                                                   |
| `user_data.address[].region`            | string       | State or territory for the address of the user. Normalized as such: remove digits and symbol characters, lowercase, remove leading and trailing spaces.                                                                     |
| `user_data.address[].postal_code`       | string       | Postal code for the address of the user. Normalized as such: remove . and ~ characters, remove leading and trailing spaces.                                                                                                 |
| `user_data.address[].country`           | string       | Country code for the address of the user. Formatted according to ISO 3166-1 alpha-2 standard.                                                                                                                               |

See the Measurement Protocol reference documentation for more information about
how the transport and payload are formatted.

## Send User-Provided Data

Unlike gtag, which automatically hashes sensitive user-provided data, the
Measurement Protocol requires a developer to hash sensitive user-provided data
using a secure one-way hashing algorithm called SHA256 and encode it using hex
string format prior to calling the API.

All user data fields starting with the `sha256` prefix in their name should be
only populated with hashed and hex-encoded values.

### Encryption and Encoding Example

The following example code performs the necessary encryption and encoding steps:

```javascript
const { subtle } = require('crypto').webcrypto

async function populateSensitiveUserData(value) {
  const encoder = new TextEncoder()
  // Convert a string value to UTF-8 encoded text.
  const valueUtf8 = encoder.encode(value)
  // Compute the hash (digest) using the SHA-256 algorithm.
  const hashSha256 = await subtle.digest('SHA-256', valueUtf8)
  // Convert buffer to byte array.
  const hashArray = Array.from(new Uint8Array(hashSha256))
  // Return a hex-encoded string.
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Test the encryption function by calling it.
async function main() {
  return await populateSensitiveUserData('<value>')
}

main()
  .then(v => console.log(v))
  .catch(err => console.error(err))
```

### Sending User Data with Events

As a convenience shortcut, all repeated fields inside the `user_data` object
(such as `address`, `sha256_email_address`, `sha256_phone_number`) can be passed
a singular value instead of an array.

**Tip:** This sample shows how to send user data along with an event. You can
also send a request that contains only user data, without any events.

```javascript
const measurementId = 'MEASUREMENT_ID'
const apiSecret = 'API_SECRET'

// Populate mock User Data using the `populateSensitiveUserData` function defined above.
const yourEmailSha256Variable = await populateSensitiveUserData(
  'test@yourdomain.com'
)
const yourPhoneSha256Variable = await populateSensitiveUserData('+15555555555')
const yourFirstNameSha256Variable = await populateSensitiveUserData('john')
const yourLastNameSha256Variable = await populateSensitiveUserData('doe')
const yourStreetAddressSha256Variable =
  await populateSensitiveUserData('123 main street')

// Populate mock unencrypted user data.
const yourCityVariable = 'san francisco'
const yourRegionVariable = 'california'
const yourPostalCodeVariable = '94000'
const yourCountryVariable = 'US'

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'CLIENT_ID',
      user_id: 'USER_ID',
      events: [
        {
          name: 'purchase'
        }
      ],
      user_data: {
        sha256_email_address: yourEmailSha256Variable,
        sha256_phone_number: yourPhoneSha256Variable,
        address: {
          sha256_first_name: yourFirstNameSha256Variable,
          sha256_last_name: yourLastNameSha256Variable,
          sha256_street: yourStreetAddressSha256Variable,
          city: yourCityVariable,
          region: yourRegionVariable,
          postal_code: yourPostalCodeVariable,
          country: yourCountryVariable
        }
      }
    })
  }
)
```

## Multiple Values

Developers can optionally provide multiple values (up to 3 for phone and email
and 2 for address) by using an array value rather than a string. If you capture
more than one value, providing this will increase the likelihood of a match.

```javascript
const measurementId = 'MEASUREMENT_ID'
const apiSecret = 'API_SECRET'

fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'CLIENT_ID',
      user_id: 'USER_ID',
      events: [
        {
          name: 'purchase'
        }
      ],
      user_data: {
        sha256_email_address: [
          yourEmailSha256Variable1,
          yourEmailSha256Variable2
        ],
        sha256_phone_number: [
          yourPhoneSha256Variable1,
          yourPhoneSha256Variable2
        ],
        address: [
          {
            sha256_first_name: yourFirstNameSha256Variable1,
            sha256_last_name: yourLastNameSha256Variable1,
            sha256_street: yourStreetAddressSha256Variable1,
            city: yourCityVariable1,
            region: yourRegionVariable1,
            postal_code: yourPostalCodeVariable1,
            country: yourCountryVariable1
          },
          {
            sha256_first_name: yourFirstNameSha256Variable2,
            sha256_last_name: yourLastNameSha256Variable2,
            sha256_street: yourStreetAddressSha256Variable2,
            city: yourCityVariable2,
            region: yourRegionVariable2,
            postal_code: yourPostalCodeVariable2,
            country: yourCountryVariable2
          }
        ]
      }
    })
  }
)
```
