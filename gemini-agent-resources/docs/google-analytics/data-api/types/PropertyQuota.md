# PropertyQuota

Current state of all quotas for this Analytics Property. If any quota for a
property is exhausted, all requests to that property will return Resource
Exhausted errors.

| JSON representation                                                                                                                                                                                                                                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{   "tokensPerDay": {     object (QuotaStatus)   },   "tokensPerHour": {     object (QuotaStatus)   },   "concurrentRequests": {     object (QuotaStatus)   },   "serverErrorsPerProjectPerHour": {     object (QuotaStatus)   },   "potentiallyThresholdedRequestsPerHour": {     object (QuotaStatus)   },   "tokensPerProjectPerHour": {     object (QuotaStatus)   } }` |

| Fields                                  |                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokensPerDay`                          | `object (QuotaStatus)` Standard Analytics Properties can use up to 200,000 tokens per day; Analytics 360 Properties can use 2,000,000 tokens per day. Most requests consume fewer than 10 tokens.                                                                                                                                                                                                                          |
| `tokensPerHour`                         | `object (QuotaStatus)` Standard Analytics Properties can use up to 40,000 tokens per hour; Analytics 360 Properties can use 400,000 tokens per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas.                                                                                                                          |
| `concurrentRequests`                    | `object (QuotaStatus)` Standard Analytics Properties can send up to 10 concurrent requests; Analytics 360 Properties can use up to 50 concurrent requests.                                                                                                                                                                                                                                                                 |
| `serverErrorsPerProjectPerHour`         | `object (QuotaStatus)` Standard Analytics Properties and cloud project pairs can have up to 10 server errors per hour; Analytics 360 Properties and cloud project pairs can have up to 50 server errors per hour.                                                                                                                                                                                                          |
| `potentiallyThresholdedRequestsPerHour` | `object (QuotaStatus)` Analytics Properties can send up to 120 requests with potentially thresholded dimensions per hour. In a batch request, each report request is individually counted for this quota if the request contains potentially thresholded dimensions.                                                                                                                                                       |
| `tokensPerProjectPerHour`               | `object (QuotaStatus)` Analytics Properties can use up to 35% of their tokens per project per hour. This amounts to standard Analytics Properties can use up to 14,000 tokens per project per hour, and Analytics 360 Properties can use 140,000 tokens per project per hour. An API request consumes a single number of tokens, and that number is deducted from all of the hourly, daily, and per project hourly quotas. |

## QuotaStatus

Current state for a particular quota group.

| JSON representation                                 |
| :-------------------------------------------------- |
| `{   "consumed": integer,   "remaining": integer }` |

| Fields      |                                               |
| :---------- | :-------------------------------------------- |
| `consumed`  | `integer` Quota consumed by this request.     |
| `remaining` | `integer` Quota remaining after this request. |
