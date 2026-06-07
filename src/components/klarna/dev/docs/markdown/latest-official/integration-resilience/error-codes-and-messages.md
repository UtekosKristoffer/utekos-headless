# Error codes and messages

Klarna's API uses HTTP status codes for request outcomes- 2xx for success, 4xx/5xx for client/server errors,
with details in the response body. Check PSP or Klarna logs for more.

Klarna's API relies on standard HTTP response codes to signal the success or failure of a request. When an API
call is successful, Klarna will respond with a 2xx status code and when the API call fails Klarna will respond
with a 4xx or 5xx status code together with a response body containing an error object with the error code, an
array of error messages and a unique correlation id to be used to identify the request.

- `2xx` codes indicate success.
- `4xx` codes indicate an an error on the client side (e.g., missing parameters or failed transactions).
- `5xx` codes indicate server-side errors.

**\[INFO]**

In order to deep dive on error make sure you check \`PSP logs dashboard\` or \`Klarna Developers Logs\`app in
Merchant Portal for error messages to see what's exactly wrong in the details.
