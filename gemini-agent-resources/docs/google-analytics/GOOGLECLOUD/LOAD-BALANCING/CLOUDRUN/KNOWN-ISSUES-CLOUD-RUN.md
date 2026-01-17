# Known Issues in Cloud Run

This page lists known issues, limitations, and unsupported features in Cloud
Run.

You can also check for existing issues or open new issues in the public issue
trackers.

## Deployment Issues

### Cloud Run job tasks might be spuriously marked as retried

In some situations, a task can be marked as retried, even when the task
succeeded on its first try. Until this issue is resolved, Google recommends
keeping the `--max-retries` parameter set to 3 or higher to avoid spurious
execution failures.

### Volume Mounts are incompatible with Config Connector

If you deploy your Cloud Run service or job with Config Connector, your volume
mounts won't be persisted next time you deploy. You may also experience issues
using Config Connector with services or jobs that have volume mounts already
applied.

## Serving Issues

### HOME environment variable is set to /home in first generation execution environment

Cloud Run first generation execution environment sets the HOME environment
variable to `/home`. The second generation execution environment sets the HOME
variable to the value in `/etc/passwd` for the running user, or falls back to
`/home` if the `/etc/passwd` doesn't exist, or if the user can't be found in
`/etc/passwd`.

### You can't mount secrets on /tmp in first generation execution environment

If you use first generation execution environment, you can't mount secrets on
`/tmp` directly. However, you can mount secrets on any subdirectory of `/tmp`.

### High request latency with custom domains when invoking from some regions

Requests to Cloud Run services using custom domains might have a very high
latency from some locations. This issue is more pronounced for Cloud Run
services in `asia-northeast1` and `us-east4`. If you observe this issue, you can
achieve greater performance with Cloud Load Balancing using a serverless NEG.

### Sometimes a request might be sent to instances before startup probe results are known

Cloud Run might use the request sent to the service endpoint to start an
instance. Before the startup probe results are known, Cloud Run might also
assign the request to the instance. If the probe passes, then the instance will
process the request at the receiveTimestamp listed in the Cloud Run request log.
If the probe fails, then Cloud Run logs failure without entering the service's
code.

## Connectivity and Security Issues

### Custom domain mappings require enabled run.app URLs

You can only map custom domains for Cloud Run services that have a default
`run.app` URL. Until this issue is resolved, if you've disabled the default
`run.app` URL, we recommend that you enable the default `run.app` URL, map the
custom domain, and then disable the default `run.app` URL again.

### Serverless VPC Access doesn't support IPv6

You can't use IPv6 when sending traffic through Serverless VPC Access
connectors. IPv6 is supported when Direct VPC egress uses dual-stack subnets or
when accessing non-VPC endpoints while `vpc-egress` is set to
`private-ranges-only`.

### IP addresses not clearly identified when in use by serverless

When you use Direct VPC egress, you can identify IP addresses reserved by Cloud
Run that are currently in use, displayed as **None** instead of **Serverless**
on the IP addresses page in the Google Cloud console.

## URL Issues

### Reserved URL paths

You can't use the following URL paths:

- `/eventlog`
- Paths starting with `/_ah/`
- Some paths ending with `z`. To prevent conflicts with reserved paths, we
  recommend avoiding all paths that end in `z`

### Some encoded URL characters are decoded

Cloud Run decodes some encoded characters in the Cloud Run services URL before
reaching the container instance. For example, `%41` is automatically decoded to
`A`.

## Unsupported Services and Features

### Unsupported services

- Web Security Scanner

### HTTP/2 Push

Cloud Run supports HTTP/2, but not HTTP/2 Server Push.

### HTTP methods

Cloud Run doesn't support requests with HTTP methods like `TRACE` and `CONNECT`.
As a result, these methods aren't received by services running on Cloud Run.

### Built-in Cloud SQL connections aren't available for Cloud Run jobs running with multiple containers

The Cloud Run feature of connecting to Cloud SQL instances is not supported for
Cloud Run jobs running with multiple containers. Your jobs will continue to run,
but Cloud Run won't mount the `/cloudsql` directory inside the containers.
