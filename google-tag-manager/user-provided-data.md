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
- Remove all periods (`.`) that precede the domain name in `gmail.com` and
  `googlemail.com` email addresses

## JSON Post Body Schema

### Required Parameters

| Key         | Type   | Description                                                                                                      |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `user_id`   | string | A unique identifier for a user. See User-ID for cross-platform analysis for more information on this identifier. |
| `user_data` | object | Enhanced user data fields identifying a user.                                                                    |

### User Data Fields

| Field                              | Type         | Description                                                                                                                                                                                                                                     |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_data.sha256_email_address[]` | string array | Hashed and encoded email address of the user. Normalized as such:<br>• lowercase<br>• remove periods before @ for gmail.com/googlemail.com addresses<br>• remove all spaces<br>• hash using SHA256 algorithm<br>• encode with hex string format |
| `user_data.sha256_phone_number[]`  | string array | Hashed and encoded phone number of the user. Normalized as such:<br>• remove all non digit characters<br>• add + prefix<br>• hash using SHA256 algorithm<br>• encode with hex string format                                                     |
| `user_data.address[]`              | array        | Identifies a user based on physical location.                                                                                                                                                                                                   |

### Address Fields

| Field                                   | Type   | Description                                                                                                                                                                                                                        |
| --------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_data.address[].sha256_first_name` | string | Hashed and encoded first name of the user. Normalized as such:<br>• remove digits and symbol characters<br>• lowercase<br>• remove leading and trailing spaces<br>• hash using SHA256 algorithm<br>• encode with hex string format |
| `user_data.address[].sha256_last_name`  | string | Hashed and encoded last name of the user. Normalized as such:<br>• remove digits and symbol characters<br>• lowercase<br>• remove leading and trailing spaces<br>• hash using SHA256 algorithm<br>• encode with hex string format  |
| `user_data.address[].sha256_street`     | string | Hashed and encoded street and number of the user. Normalized as such:<br>• remove symbol characters<br>• lowercase<br>• remove leading and trailing spaces<br>• hash using SHA256 algorithm<br>• encode with hex string format     |
| `user_data.address[].city`              | string | City for the address of the user. Normalized as such:<br>• remove digits and symbol characters<br>• lowercase<br>• remove leading and trailing spaces                                                                              |
| `user_data.address[].region`            | string | State or territory for the address of the user. Normalized as such:<br>• remove digits and symbol characters<br>• lowercase<br>• remove leading and trailing spaces                                                                |
| `user_data.address[].postal_code`       | string | Postal code for the address of the user. Normalized as such:<br>• remove `.` and `~` characters<br>• remove leading and trailing spaces                                                                                            |
| `user_data.address[].country`           | string | Country code for the address of the user. Formatted according to ISO 3166-1 alpha-2 standard.                                                                                                                                      |

> **Note:** See the Measurement Protocol reference documentation for more
> information about how the transport and payload are formatted.

## Implementation Guide

### Send User-Provided Data

Unlike gtag, which automatically hashes sensitive user-provided data, the
Measurement Protocol requires a developer to hash sensitive user-provided data
using a secure one-way hashing algorithm called SHA256 and encode it using hex
string format prior to calling the API.

**Important:** All user data fields starting with the `sha256` prefix in their
name should be only populated with hashed and hex-encoded values.

### Hashing Function Example

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

#### Prerequisites

Before running the code:

1. **Install Node.js:** Ensure you have Node.js installed (v15 or later). This
   code relies on the webcrypto API which is available in Node.js environments.
   Download from the [official website](https://nodejs.org/).
2. **Basic JavaScript Knowledge:** Familiarity with asynchronous JavaScript
   (async/await) is beneficial.

#### Code Explanation

**Import Web Crypto API**

```javascript
const { subtle } = require('crypto').webcrypto
```

Imports the `subtle` interface from Node.js's built-in webcrypto module.
Provides cryptographic primitives like hashing, encryption, and signing.

**Define Asynchronous Hashing Function**

```javascript
async function populateSensitiveUserData(value) {
```

Defines an asynchronous function that takes a string value as input and returns
a Promise.

**Encode Input String to UTF-8**

```javascript
const encoder = new TextEncoder()
const valueUtf8 = encoder.encode(value)
```

Uses TextEncoder API to convert string into UTF-8 encoded bytes. Cryptographic
operations operate on byte arrays rather than strings.

**Compute SHA-256 Hash**

```javascript
const hashSha256 = await subtle.digest('SHA-256', valueUtf8)
```

Calls `subtle.digest()` method to compute cryptographic hash using SHA-256
algorithm. Returns hash value as ArrayBuffer.

**Format Hash to Hexadecimal String**

```javascript
const hashArray = Array.from(new Uint8Array(hashSha256))
return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
```

Converts ArrayBuffer to Uint8Array, then to regular array. Converts each byte to
hexadecimal representation with leading zero padding and joins into single hex
string.

**Main Execution Function**

```javascript
async function main() {
  return await populateSensitiveUserData('<value>')
}

main()
  .then(v => console.log(v))
  .catch(err => console.error(err))
```

Entry point demonstrating the function. Executes and handles Promise
resolution/rejection.

### Convenience Shortcut

As a convenience shortcut, all repeated fields inside the `user_data` object
(such as `address`, `sha256_email_address`, `sha256_phone_number`) can be passed
a singular value instead of an array.

### Complete Implementation Example

The following sample code calls the Measurement Protocol and passes user data
along with User-ID.

> **Tip:** This sample shows how to send user data along with an event. You can
> also send a request that contains only user data, without any events.

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

#### Setup Prerequisites

1. **Google Analytics 4 Setup:**
   - Create a Google Analytics 4 property if you don't have one
   - Locate your `MEASUREMENT_ID` in Admin → Data Streams → Your Web Data Stream
   - Generate an `API_SECRET` in Admin → Data Streams → Your Web Data Stream →
     Measurement Protocol API secrets
   - Store API secret securely and avoid public exposure

2. **Hashing Sensitive Data:**
   - Use the `populateSensitiveUserData` function defined above
   - All sensitive data must be hashed using SHA256 before sending

#### Code Explanation

**Initialize Google Analytics Parameters**

```javascript
const measurementId = 'MEASUREMENT_ID'
const apiSecret = 'API_SECRET'
```

Replace with actual values from GA4 property settings. `measurementId` directs
data to correct property. `apiSecret` authenticates requests.

**Hash Sensitive User Data**

```javascript
const yourEmailSha256Variable = await populateSensitiveUserData(
  'test@yourdomain.com'
)
const yourPhoneSha256Variable = await populateSensitiveUserData('+15555555555')
const yourFirstNameSha256Variable = await populateSensitiveUserData('john')
const yourLastNameSha256Variable = await populateSensitiveUserData('doe')
const yourStreetAddressSha256Variable =
  await populateSensitiveUserData('123 main street')
```

Demonstrates hashing sensitive information. GA4 Measurement Protocol requires
SHA256 hashing for email, phone, names, and addresses. Replace placeholder
values with actual user data.

**Define Unencrypted User Data**

```javascript
const yourCityVariable = 'san francisco'
const yourRegionVariable = 'california'
const yourPostalCodeVariable = '94000'
const yourCountryVariable = 'US'
```

Less sensitive fields that don't require hashing. Replace with actual user data.

**Send Event Data to Google Analytics 4**

```javascript
fetch(
  `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
  {
    method: 'POST',
    body: JSON.stringify({
      client_id: 'CLIENT_ID',
      user_id: 'USER_ID',
      events: [{ name: 'purchase' }],
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

Constructs POST request to Measurement Protocol endpoint:

- **URL Construction:** Embeds `measurementId` and `apiSecret` in query
  parameters
- **Request Body:**
  - `client_id`: Unique identifier for user's device/browser
  - `user_id`: Unique identifier for logged-in user (enables cross-device
    tracking)
  - `events`: Array of event objects (customize event name and add params)
  - `user_data`: Contains hashed and unencrypted user attributes

Replace `"CLIENT_ID"` and `"USER_ID"` with actual identifiers.

## Multiple Values Support

Developers can optionally provide multiple values by using an array value rather
than a string:

- **Email and phone:** Up to 3 values
- **Address:** Up to 2 values

Providing multiple values increases the likelihood of a match.

### Multiple Values Example

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

#### Setup Prerequisites

1. **Google Analytics 4 and Measurement Protocol Setup:**
   - Create or select a Google Cloud project via
     [Google Cloud console](https://console.cloud.google.com/)
   - Enable the Google Analytics Data API in API Library
   - Obtain Measurement ID and API Secret from GA4 property settings
   - Ensure necessary permissions to send data to GA4 property

2. **Development Environment:**
   - Install Node.js if not already installed
   - Set up environment where you can execute JavaScript fetch requests (modern
     browsers or recent Node.js versions support fetch natively)

#### Code Explanation

**Define Measurement ID and API Secret**

```javascript
const measurementId = 'MEASUREMENT_ID'
const apiSecret = 'API_SECRET'
```

Initializes constants for GA4 data stream identification and API authentication.
Replace with actual values from GA4 property settings.

**Initiate Fetch Request to Measurement Protocol**

```javascript
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
```

Begins fetch request to GA4 Measurement Protocol endpoint with measurement ID
and API secret as query parameters.

**Specify HTTP Method**

```javascript
method: "POST",
```

GA4 Measurement Protocol requires POST requests for sending event data.

**Construct Request Body with Event and User Data**

```javascript
body: JSON.stringify({
  client_id: 'CLIENT_ID',
  user_id: 'USER_ID',
  events: [{ name: 'purchase' }],
  user_data: {
    sha256_email_address: [yourEmailSha256Variable1, yourEmailSha256Variable2],
    sha256_phone_number: [yourPhoneSha256Variable1, yourPhoneSha256Variable2],
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
```

Core of the request defining JSON body with:

- `client_id`: Unique identifier for user/device (typically stored in cookie)
- `user_id`: Optional stable user identifier
- `events`: Array of event objects (single purchase event shown)
- `user_data`: PII hashed with SHA256 for privacy compliance
  - Includes `sha256_email_address`, `sha256_phone_number`, and address details
  - Example shows two sets of user data demonstrating multiple
    profiles/addresses

Replace `yourEmailSha256Variable1`, `yourPhoneSha256Variable1`, etc., with
actual SHA256-hashed data variables.

---

**Important:** All PII must be hashed before sending to Google Analytics for
privacy compliance.
