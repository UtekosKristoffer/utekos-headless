# Update customer token status

Use this API call to update the status of a Klarna Customer Token. This should be used if you want to cancel a
specific customer token. Read more on Update the status of a customer token.

**ENDPOINT:** "https://api.klarna.com/customer-token/v1/tokens/{customerToken}/status"

```json
{
  "status": "CANCELLED"
}
```

### PATH PARAMETERS

- `customerToken`
- **required**

- `status` required

  -Type: string

Value: "CANCELLED"

**The token status to update to.**
