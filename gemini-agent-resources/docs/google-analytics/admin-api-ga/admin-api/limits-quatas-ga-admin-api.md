## Admin API Limits and Quotas

The following limits and quotas apply to the Admin API, in addition to the
shared limits and quotas for all Google Analytics API usage. Quota limits might
be throttled for projects that violate the Google Analytics Terms of Service.

| Quota Name                   | Limit |
| ---------------------------- | ----- |
| Requests per minute          | 1,200 |
| Requests per minute per user | 600   |
| Writes per minute            | 600   |
| Writes per minute per user   | 180   |

Each request to the Google Analytics Admin API consumes Requests per minute and
Requests per minute per user quotas. A request to any method that alters the
Google Analytics account configuration in any way (create, patch, delete,
archive, update methods) also consumes Writes per minute and Writes per minute
per user quotas.

For more information on how to limit the total number of API requests per user,
see Capping API usage.

## Capping API Usage

You can explicitly cap requests in two ways: requests per second per user and
requests per day.

### Limiting Requests Per Second Per User

To prevent individual users from using up your API quota, limit the number of
requests per second per user for an API. Each API includes a default per-user
limit, but you can modify that value as described in the following section.

Individual users are identified by a unique string; if you're creating a
server-side application (where the calling code is hosted on a server that you
own) that makes requests on behalf of users, your requests must include the
`quotaUser` parameter, as described below.

**Note:** Although per-user limits are specified in queries per second, we
permit short-term usage spikes. Therefore, you should set your limits based on
sustained average traffic levels. If anyone tries to use an API in excess of
these settings, the requests will trigger a limit exceeded error.

To identify a user, use the `quotaUser=userID` parameter. This value is for
short term quota enforcement only, so you don't need to use a real user ID. You
can choose any arbitrary string under forty characters long that uniquely
identifies a user.

The `quotaUser` parameter is only used for capping requests per user per second.
If you don't send the `quotaUser` parameter, then all calls are attributed to
your server machines, in which case calls can't be capped by user.

When sending any user identifier, be sure that you comply with any local laws,
including any laws relating to the disclosure of any personal information you
send with each request. Best practice is to include as little personal
information as possible.

### Modify the Number of Requests (Available Only When Billing is Enabled)

You can set daily limits to all requests to any billable API. Most APIs set
default limits, but you can change that limit up to a maximum specified by
Google.

To view or change daily billable limits for your API, do the following:

1. Go to the API Console.
2. From the projects list, select a project or create a new one.
3. If the APIs & services page isn't already open, open the left side menu and
   select APIs & services.
4. Click the name of the API you're interested in.
5. Click Quotas.
6. On the requests per day or requests per 100 seconds per user line, click the
   edit icon, then enter the preferred total billable daily quota, up to the
   limit specified by Google.

**Note:** You can set daily billable limits only on billable APIs. If your
project doesn't use any billable APIs, then you can't set daily limits.
