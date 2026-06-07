# **API updates**

We always try to update our APIs in a backwards compatible way to avoid breaking existing integrations.
Unfortunatly that's not always possible when we iterate on our APIs and release new products and features.
Sometimes we need to make breaking changes which will result in a version bump of our APIs. We have collected
a list of what we consider to be "non-breaking" changes as well as some integration guidelines.

#### Non-breaking changes

- Addition of a response body when one didn't previously exist
- Addition of optional or read-only fields/properties
- Re-ordering of fields in the JSON
- Addition of HTTP headers
- Addition of new values to an enum if there is a default defined
- Addition of new HTTP methods to existing resources

#### Guidelines

- Accept any 2xx codes as success, do not code for a specific error response code
- Interpret any 4xx as an error, do not code for a specific error response code
- Interpret any 5xx as an error, do not code for a specific error response code
