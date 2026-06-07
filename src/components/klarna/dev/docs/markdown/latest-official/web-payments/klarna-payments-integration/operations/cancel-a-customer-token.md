# Cancelling a token

You can cancel a customer token if it's no longer needed, for example, if a customer cancels their
subscription.

**\[WARNING]**

Once you cancel a token, it becomes unavailable and you can't restore it. If the customer signs up for your
services in the future, you'll need to generate a new customer token.

To cancel a customer token, send a `PATCH` request to the `apiUrl`:
`customer-token/v1/tokens/{customerToken}/status` endpoint

Specify the token identifier as the`customerToken`path parameter and set the`status`body parameter
to`CANCELLED`.

```json
{
  "status": "CANCELLED"
}
```

A sample request to cancel a customer token.

### Success response

In response to your call, you'll get a confirmation that the token is being canceled.

```json
Token patch request has been accepted and is being processed.

```

A success response to the token cancelation request.

### Error response

If a token can't be canceled, you'll get an error response.

```json
{
  "correlation_id": "6a9b1cb1-73a3-4936-a030-481ba4bb203b",
  "error_code": "ERROR_CODE",
  "error_messages": ["ERROR_MESSAGE"]
}
```

An error response to the token cancelation request.

Here are examples of common errors with troubleshooting suggestions. You can use the value in `correlation_id`
to find entries related to the request under **Logs** in the Merchant portal.

| Error code  | Error message       | Description                                                                                           |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| `NOT_FOUND` | `Invalid token ID`  | A specified token doesn't exist. Check if the value in \{`customerToken`} is correct, then try again. |
| `BAD_VALUE` | `{incorrect field}` | Your request contains a value that isn't allowed.                                                     |
