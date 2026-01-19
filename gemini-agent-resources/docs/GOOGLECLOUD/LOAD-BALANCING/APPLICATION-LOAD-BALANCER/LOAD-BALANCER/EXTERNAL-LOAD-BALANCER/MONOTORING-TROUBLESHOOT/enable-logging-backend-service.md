Certainly. Here is the provided text formatted as structured markdown.

# Global external Application Load Balancer logging and monitoring

This document shows you how to configure and use Cloud Logging and Cloud
Monitoring with classic Application Load Balancers, global external Application
Load Balancers, and Cloud CDN.

---

## Logging

You can enable, disable, and view logs for an external Application Load Balancer
backend service. Logging is automatically enabled for backend buckets.

### Logs sampling and collection

The requests handled by backend VMs are sampled. You control the fraction of
requests emitted as log entries using `logConfig.sampleRate`. A `sampleRate` of
`1.0` means logs are generated for all requests.

### Optional fields

Log records contain required and optional fields. You can customize which
optional fields to keep to save on storage costs.

- **Include all optional:** All optional fields are included.
- **Exclude all optional:** All optional fields are omitted.
- **Custom:** Specify which optional fields you want to include (e.g.,
  `tls.protocol`, `tls.cipher`, `orca_load_report.cpu_utilization`).

### Enabling logging on a new backend service

1.  Go to the **Load Balancing** page.
2.  Click the name of your load balancer and then **Edit**.
3.  Click **Backend Configuration** > **Create a backend service**.
4.  In the **Logging** section, select the **Enable logging** checkbox.
5.  Set a **Sample rate** fraction (0.0 to 1.0).
6.  (Optional) Choose which optional fields to include.
7.  Click **Update** to finish.

### Enabling logging on an existing backend service

1.  Go to the **Load Balancing** page.
2.  Click the name of your load balancer and then **Edit**.
3.  Click **Backend Configuration** and then **Edit** next to your backend
    service.
4.  In the **Logging** section, select the **Enable logging** checkbox.
5.  Set the **Sample rate**.
6.  (Optional) Choose which optional fields to include.
7.  Click **Update** to finish.

### Disabling or modifying logging on an existing backend service

1.  Follow the steps to edit an existing backend service.
2.  To disable logging, clear the **Enable logging** checkbox.
3.  If logging is enabled, you can change the **Sample rate**.
4.  Click **Update** to finish.

### View logs

To view logs, go to the
[Logs Explorer](https://console.cloud.google.com/logs/viewer) page. You can
filter logs by `Cloud HTTP Load Balancer` and then by forwarding rule or URL
map.

### What is logged

Log records contain required fields and optional fields that add information
about your HTTP(S) traffic.

**Key `jsonPayload` fields:**

- `statusDetails`: Explains why the load balancer returned a specific HTTP
  status code.
- `backendTargetProjectNumber`: The project number where the backend target
  resides.
- `tls`: Holds `TlsInfo` which specifies TLS metadata for the
  client-to-load-balancer connection.
- `orca_load_report`: Contains elements of the ORCA load report returned by the
  backend.

---

## Monitoring

The load balancer exports monitoring data to Cloud Monitoring. You can use
metrics to:

- Evaluate a load balancer's configuration, usage, and performance.
- Troubleshoot problems.
- Improve resource utilization and user experience.

### Viewing predefined Cloud Monitoring dashboards

1.  Go to the **Monitoring** page.
2.  In the navigation panel, click **Dashboards**.
3.  Under **Categories**, click **GCP**.
4.  Select the dashboard named **Google Cloud Load Balancers** to see all load
    balancers, or **External HTTP(S) Load Balancers** for a specific view.

### Defining alerting policies

You can create alerting policies to monitor metric values and notify you when a
condition is violated.

1.  Go to the **Alerting** page in Monitoring.
2.  Click **Create policy**.
3.  Select a metric, such as one from the **Global External Application Load
    Balancer Rule** resource type.
4.  Configure the alert trigger (condition and threshold).
5.  (Optional) Add notification channels and documentation.
6.  Name the policy and click **Create Policy**.

### Defining Cloud Monitoring custom dashboards

1.  Go to the **Monitoring** page.
2.  Select **Dashboards > Create Dashboard**.
3.  Click **Add Chart**.
4.  Choose a resource type (e.g., **Global External Application Load Balancer
    Rule**) and a metric type.
5.  (Optional) Add filters.
6.  Click **Save**.

---

## Monitoring metrics

The following metrics for global external Application Load Balancers are
reported into Cloud Monitoring.

| Name                             | Description                                                                                                                                  |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend configured rate**      | The maximum rate in requests per second configured per backend group.                                                                        |
| **Backend latencies**            | A distribution of the time between the last byte of the request sent to the backend and the last byte of the response received by the proxy. |
| **Backend request count**        | The number of requests sent from the load balancer to the backends.                                                                          |
| **Frontend RTT**                 | A distribution of the time it takes for data to travel from the client to the proxy and back again.                                          |
| **Request count**                | The number of requests served by the load balancer.                                                                                          |
| **Response code class fraction** | Fraction of total responses in each response code class (2xx, 4xx, etc.).                                                                    |
| **Total latencies**              | A distribution of the time between the first byte of the request received by the proxy and the last byte of the response sent by the proxy.  |

### Filtering dimensions for metrics

You can filter aggregated metrics by dimensions such as:

- `backend_name`
- `backend_scope`
- `cache_result`
- `client_country`
- `forwarding_rule_name`
- `protocol`
- `response_code`
- `url_map_name`
