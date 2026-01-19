# Global external Application Load Balancer logging and monitoring

This document shows you how to configure and use Cloud Logging and Cloud
Monitoring with classic Application Load Balancers, global external Application
Load Balancers, and Cloud CDN.

---

## Logging

You can enable, disable, and view logs for an external Application Load Balancer
backend service. For external Application Load Balancers with backend buckets,
logging is automatically enabled and cannot be disabled.

You enable or disable logging for each backend service. You can configure
whether to log all requests or a randomly sampled fraction.

You must ensure that you don't have a logs exclusion that applies to external
Application Load Balancers. For information about how to verify that Cloud HTTP
Load Balancer logs are allowed, see
[Exclusion filters](https://cloud.google.com/logging/docs/routing/exclusions#viewing_exclusions).

> **Note:** If the backend service is created after the General Availability
> release of Logging for external Application Load Balancers, logging is
> disabled for a backend service. If you enabled logging during the alpha
> release or beta release, logging continues to be enabled for the backend
> service.

### Logs sampling and collection

The requests (and corresponding responses) handled by load balancer backend
virtual machine (VM) instances are sampled. These sampled requests are then
processed to generate logs. You control the fraction of the requests that are
emitted as log entries according to the `logConfig.sampleRate` parameter. When
`logConfig.sampleRate` is `1.0` (100%), this means that logs are generated for
all of the requests and written to Cloud Logging.

### Optional fields

Log records contain required fields and optional fields. The
[What is logged](https://cloud.google.com/load-balancing/docs/l7-external/logging-monitoring#what_is_logged)
section lists which fields are optional and which are required. All required
fields are always included. You can customize which optional fields you keep.

- If you select **include all optional**, all optional fields in the log record
  format are included in the logs. When new optional fields are added to the
  record format, the logs automatically include the new fields.
- If you select **exclude all optional**, all optional fields are omitted.
- If you select **custom**, you can specify the optional fields that you want to
  include, such as `tls.protocol`, `tls.cipher`,
  `orca_load_report.cpu_utilization`, `orca_load_report.mem_utilization`.

For information about customizing optional fields, see
[Enable logging on a new backend service](#enabling-logging-on-a-new-backend-service).
