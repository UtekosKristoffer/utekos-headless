Global external Application Load Balancer logging and monitoring

This document shows you how to configure and use Cloud Logging and Cloud Monitoring with classic Application Load Balancers, global external Application Load Balancers, and Cloud CDN.
Logging
You can enable, disable, and view logs for an external Application Load Balancer backend service. For external Application Load Balancers with backend buckets, logging is automatically enabled and cannot be disabled.

You enable or disable logging for each backend service. You can configure whether to log all requests or a randomly sampled fraction.

You must ensure that you don't have a logs exclusion that applies to external Application Load Balancers. For information about how to verify that Cloud HTTP Load Balancer logs are allowed, see Exclusion filters.

Note: If the backend service is created after the General Availability release of Logging for external Application Load Balancers, logging is disabled for a backend service. If you enabled logging during the alpha release or beta release, logging continues to be enabled for the backend service.
Logs sampling and collection
The requests (and corresponding responses) handled by load balancer backend virtual machine (VM) instances are sampled. These sampled requests are then processed to generate logs. You control the fraction of the requests that are emitted as log entries according to the logConfig.sampleRate parameter. When logConfig.sampleRate is 1.0 (100%), this means that logs are generated for all of the requests and written to Cloud Logging.

Optional fields
Log records contain required fields and optional fields. The What is logged section lists which fields are optional and which are required. All required fields are always included. You can customize which optional fields you keep.

If you select include all optional, all optional fields in the log record format are included in the logs. When new optional fields are added to the record format, the logs automatically include the new fields.

If you select exclude all optional, all optional fields are omitted.

If you select custom, you can specify the optional fields that you want to include, such as tls.protocol,tls.cipher,orca_load_report.cpu_utilization,orca_load_report.mem_utilization.

For information about customizing optional fields, see Enable logging on a new backend service.

Enabling logging on a new backend service
Console
gcloud
In the Google Cloud console, go to the Load Balancing page.

Go to Load balancing

Click the name of your load balancer.

Click editEdit.

Click Backend Configuration.

Select Create a backend service.

Complete the required backend service fields.

In the Logging section, select the Enable logging checkbox.

Set a Sample rate fraction. You can set a number from 0.0 through 1.0, where 0.0 means that no requests are logged and 1.0 means that 100% of the requests are logged. The default value is 1.0.

Optional: To include all the optional fields in the logs, in the Optional fields section, click Include all optional fields.

To finish editing the backend service, click Update.

To finish editing the load balancer, click Update.

Enabling logging on an existing backend service
Console
gcloud
In the Google Cloud console, go to the Load Balancing page.

Go to Load balancing

Click the name of your load balancer.

Click editEdit.

Click Backend Configuration.

Click editEdit next to your backend service.

In the Logging section, select the Enable logging checkbox.

In the Sample rate field, set the sampling probability. You can set a number from 0.0 through 1.0, where 0.0 means that no requests are logged and 1.0 means that 100% of the requests are logged. The default value is 1.0.

Optional: To include all the optional fields in the logs, in the Optional fields section, click Include all optional fields.

To finish editing the backend service, click Update.

To finish editing the load balancer, click Update.

Disabling or modifying logging on an existing backend service
Console
gcloud: Global mode
gcloud: Classic mode
In the Google Cloud console, go to the Load Balancing page.

Go to Load balancing

Click the name of your load balancer.

Click editEdit.

Click Backend Configuration.

Click editEdit next to your backend service.

To disable logging entirely, in the Logging section, clear the Enable logging checkbox.

If you leave logging enabled, you can set a different Sample rate fraction. You can set a number from 0.0 through 1.0, where 0.0 means that no requests are logged and 1.0 means that 100% of the requests are logged. The default value is 1.0. For example, 0.2 means 20% of the sampled requests generate logs.

To finish editing the backend service, click Update.

To finish editing the load balancer, click Update.

View logs
To follow step-by-step guidance for this task directly in the Google Cloud console, click Guide me:

Guide me

HTTP(S) logs are indexed first by a forwarding rule, then by a URL map.

To view logs, go to the Logs Explorer page:

Go to Logs Explorer

To view all logs, in the Resource filter menu, select Cloud HTTP Load Balancer > All forwarding rules.

To view logs for one forwarding rule, select a single forwarding rule name.

To view logs for one URL map, select a forwarding rule, and then select a URL map.

Log fields of type boolean typically only appear if they have a value of true. If a boolean field has a value of false, that field is omitted from the log.

UTF-8 encoding is enforced for log fields. Characters that are not UTF-8 characters are replaced with question marks. For classic Application Load Balancers and global external Application Load Balancers, you can export logs-based metrics using resource logs (resource.type="http_load_balancer"). The metrics created are based on the Application Load Balancer Rule (Logs-based Metrics) resource (l7_lb_rule), which is available under Cloud Monitoring dashboards instead of under the https_lb_rule resource.

What is logged
External Application Load Balancer log entries contain information useful for monitoring and debugging your HTTP(S) traffic. Log records contain required fields, which are the default fields of every log record.

Log records contain optional fields that add additional information about your HTTP(S) traffic. Optional fields can be omitted to save storage costs.

Some log fields are in a multi-field format, with more than one piece of data in a given field. For example, the tls field is of the TlsInfo format, which contains the earlyDataRequest field. These multi-field fields are described in the following record format table.
Field	Field format	Field type: Required or Optional	Description
severity
insertID
logName	LogEntry	Required	The general fields as described in a log entry.
timestamp	string (Timestamp format)	Optional	The time when the first layer GFE receives the request.
httpRequest	HttpRequest	Required	A common protocol for logging HTTP requests.
HttpRequest.protocol isn't populated for resource.type="http_load_balancer"

.
resource	MonitoredResource	Required	
The MonitoredResource is the resource type associated with a log entry.

The MonitoredResourceDescriptor describes the schema of a MonitoredResource object by using a type name and a set of labels. For more information, see Resource labels.

jsonPayload	object (Struct format)	Required	The log entry payload that is expressed as a JSON object. The JSON object contains the following fields:
statusDetails
backendTargetProjectNumber
overrideResponseCode
errorService
errorBackendStatusDetails
authzPolicyInfo
loadBalancingScheme
tls
orca_load_report
string	Required	The statusDetails field holds a string that explains why the load balancer returned the HTTP status code that it did. For more information about these log strings, see statusDetails HTTP success messages and statusDetails HTTP failure messages.
string	Required	The backendTargetProjectNumber field holds the project number where the backend target—backend service or backend bucket—has been created. This field is in the format: "projects/PROJECT_NUMBER". This information is only available for global external Application Load Balancers using custom error responses.
integer	Required	The overrideResponseCode holds the override response code applied to the response sent to the client. This information is only available for global external Application Load Balancers using custom error responses.
string	Required	The errorService field holds the backend service that provided the custom error response. This information is only available for global external Application Load Balancers using custom error responses.
string	Required	The errorBackendStatusDetails field holds the statusDetails of the final response served to the client. This information is only available for global external Application Load Balancers using custom error responses.
AuthzPolicyInfo	Required	The authzPolicyInfo field stores information about the authorization policy result. This information is only available for global external Application Load Balancers that have enabled authorization policies. For more information, see what is logged for authorization policies.
string	Optional	The loadBalancingScheme field is only populated if you use the classic Application Load Balancer migration feature. This field holds a string that describes which load balancing scheme was used to route the request. The possible values are either EXTERNAL or EXTERNAL_MANAGED.
TlsInfo	Required	
The tls field holds the TlsInfo field that specifies the TLS metadata for the connection between the client and the load balancer. This field is only available if the client is using TLS/SSL encryption.

Use the --logging-optional-fields parameter to specify which elements must be logged:

Optional: tls.protocol
Optional: tls.cipher
Required: tls.earlyDataRequest
You can't set --logging-optional-fields to tls to specify all elements.

OrcaLoadReport	Optional	
The orca_load_report field contains some or all elements of the ORCA load report returned by the backend. This field is only present if the backend returns an ORCA load report and you configured the load balancer to log the ORCA load report.

Use the --logging-optional-fields parameter to specify which of the following elements of the ORCA load report must be logged:

orca_load_report.cpu_utilization
orca_load_report.mem_utilization
orca_load_report.request_cost
orca_load_report.utilization
orca_load_report.rps_fractional
orca_load_report.eps
orca_load_report.named_metrics
orca_load_report.application_utilization
You can also set --logging-optional-fields to orca_load_report to specify that all elements must be logged.

Note: Redirects (HTTP response status code 302 Found) that are issued from the load balancer are not logged. Redirects issued from the backend instances are logged.
TlsInfo field format
Field	Field format	Field type: Required or Optional	Description
protocol	string	Optional	TLS protocol that clients use to establish a connection with the load balancer. Possible values are TLSv1, TLSv1.1, TLSv1.2, TLSv1.3, or QUIC. This value is set to NULL if the client is not using TLS/SSL encryption.
cipher	string	Optional	TLS cipher that clients use to establish a connection with the load balancer. This value is set to NULL if the client isn't using HTTP(S) or the client isn't using TLS/SSL encryption.
earlyDataRequest	boolean	Required	The request includes early data in the TLS handshake.
Resource labels
The following table lists the resource labels for resource.type="http_load_balancer".

Field	Type	Description
backend_service_name	string	The name of the backend service.
forwarding_rule_name	string	The name of the forwarding rule object.
project_id	string	The identifier of the Google Cloud project associated with this resource.
target_proxy_name	string	The name of the target proxy object referenced by the forwarding rule.
url_map_name	string	The name of the URL map object configured to select a backend service.
zone	string	The zone in which the load balancer is running. The zone is global.
statusDetails HTTP success messages
statusDetails (successful)	Meaning	Common accompanying response codes
byte_range_caching	The HTTP request was served using Cloud CDN byte range caching.	Any cacheable response code is possible.
response_from_cache	The HTTP request was served from a Cloud CDN cache.	Any cacheable response code is possible.
response_from_cache_validated	The return code was set from a Cloud CDN cached entry that was validated by a backend.	Any cacheable response code is possible.
response_sent_by_backend	The HTTP request was proxied successfully to the backend, and the response was returned by the backend.	The HTTP response code is set by the software running on the backend.
statusDetails HTTP failure messages
Filter this table:
Enter a filter string
Meaning	Common accompanying status codes
aborted_request_due_to_backend_early_response	A request with body was aborted due to the backend sending an early response with a status code. The response was forwarded to the client. The request was terminated.	4XX or 5XX
backend_connection_closed_after_partial_response_sent	The backend connection closed unexpectedly after a partial response had been sent to the client.	
The HTTP status code is set by the software running on the backend. HTTP status code 0 (zero) means that the backend sent incomplete HTTP headers.

The HTTP status code is 101 if the HTTP(S) connection was upgraded to a websocket connection.

backend_connection_closed_before_data_sent_to_client	The backend unexpectedly closed its connection to the load balancer before the response was proxied to the client.	
502, 503

The HTTP status code is 101 if the HTTP(S) connection was upgraded to a websocket connection.

backend_early_response_with_non_error_status	The backend sent a non-error status code (1XX or 2XX) to a request before receiving the whole request body.	502, 503
backend_interim_response_not_supported	The backend sent an interim 1XX status code to the request in a context where interim responses aren't supported.	
502, 503

backend_response_corrupted	The HTTP response body sent by the backend has invalid chunked transfer-encoding or is otherwise corrupted.	Any status code possible depending on the nature of the corruption. Often 502, 503.
backend_response_headers_too_long	The HTTP response headers sent by the backend exceeded the allowed limit. See the Header size for external Application Load Balancers section for more information.	502, 503
backend_timeout	
The backend timed out while generating a response.

For a websocket connection:

For global external Application Load Balancer, a status code is generated when the GFE closes the websocket connection in idle state after the backend service timeout expires.
For classic Application Load Balancer, a status code is generated when the GFE closes the websocket connection in either idle or active state, after the backend service timeout expires.
502, 503

The HTTP status code is 101 if the HTTP(S) connection was upgraded to a websocket connection.

banned_by_security_policy	The request was banned by a Cloud Armor rate-based ban rule.	429
body_not_allowed	The client sent an HTTP request with a body, but the HTTP method used doesn't allow a body.	400
byte_range_caching_aborted	The load balancer previously received a response indicating that the resource was cacheable and supported byte ranges. Cloud CDN received an inconsistent response (for example, one with a status code other than the expected 206 Partial Content). This happened when attempting to perform cache fill using a byte range request. As a result, the load balancer aborted the response to the client.	2XX
byte_range_caching_forwarded_backend_response	The load balancer previously received a response indicating that the resource was cacheable and supported byte ranges. Cloud CDN received an inconsistent response (for example, one with a status code other than the expected 206 Partial Content). This happened when attempting to perform cache fill using a byte range request. The load balancer then forwarded the inconsistent response to the client.	
Returned from the backend—any status code is possible.

byte_range_caching_retrieval_abandoned	The client canceled a byte range request or validation request initiated by Cloud CDN.	
Returned from the backend—any status code is possible.

byte_range_caching_retrieval_from_backend_failed_after_partial_response	A byte range request or validation request initiated by Cloud CDN encountered an error. Refer to the corresponding Cloud Logging log entry for the request initiated by Cloud CDN for the detailed backend status.	2XX
cache_lookup_failed_after_partial_response	The load balancer failed to serve a full response from Cloud CDN cache due to an internal error.	2XX
cache_lookup_timeout_after_partial_response	The Cloud CDN cache lookup stream timed out because the client didn't retrieve the content in a timely manner.	2XX
client_cert_chain_invalid_eku	Either the client certificate or its issuer doesn't have Extended Key Usage (EKU) that includes clientAuth. For more information, see Logged errors for closed connections.	0
client_cert_chain_max_name_constraints_exceeded	An intermediate certificate provided for validation had more than ten name constraints. For more information, see Logged errors for closed connections.	0
client_cert_invalid_rsa_key_size	A client leaf or intermediate certificate had an invalid RSA key size. For more information, see Logged errors for closed connections.	0
client_cert_not_provided	The client didn't provide the requested certificate during the handshake. For more information, see Logged errors for closed connections.	0
client_cert_pki_too_large	The PKI to be used for validation has more than ten intermediate certificates that share the same Subject and Subject Public Key Info. For more information, see Logged errors for closed connections.	0
client_cert_unsupported_elliptic_curve_key	A client or intermediate certificate is using an unsupported elliptic curve. For more information, see Logged errors for closed connections.	0
client_cert_unsupported_key_algorithm	A client or intermediate certificate is using a non-RSA or non-ECDSA algorithm. For more information, see Logged errors for closed connections.	0
client_cert_validation_failed	Client certificate fails validation with the TrustConfig when hashing algorithms such as MD4, MD5, and SHA-1 are used. For more information, see Logged errors for closed connections.	0
client_cert_validation_not_performed	You have configured mTLS without setting up a TrustConfig. For more information, see Logged errors for closed connections.	0
client_cert_validation_search_limit_exceeded	The depth or iteration limit is reached while attempting to validate the certificate chain. For more information, see Logged errors for closed connections.	0
client_cert_validation_timed_out	Time limit exceeded while validating the certificate chain. For more information, see Logged errors for closed connections.	0
client_disconnected_after_partial_response	The connection to the client was broken after the load balancer sent a partial response.	
Returned from the backend—any status code is possible.

The HTTP status code is 101 if the HTTP(S) connection was upgraded to a websocket connection.

client_disconnected_before_any_response	The connection to the client was broken before the load balancer sent any response.	
0

The HTTP status code is 101 if the HTTP(S) connection was upgraded to a websocket connection.

client_timed_out	The Google Front End (GFE) idled out the client connection due to lack of progress while it was proxying either the request or the response.	0 or 408
config_not_found	
The load balancer is missing project configuration. This can occur intermittently after you've made configuration changes that add a new resource.

Another cause of the error is that the first-layer GFE fails to communicate with the second-layer GFE. This can be due to an internal error, such as an in-progress rollout, load balancer overload, or intermittent configuration issues.

These errors are transient in nature and are expected to fall well within the SLA. However, if the error rate exceeds 0.01%, please contact Google Cloud support for further assistance.

404, 502, 503
denied_by_security_policy	The load balancer denied this request because of a Google Cloud Armor security policy.	Configured in the security policy.
direct_response	The load balancer overrode this request and returned a fixed response.	You might see any HTTP status code depending on the nature of the issue. For example, the HTTP 410 status code means that the backend is unavailable due to payment delinquency.
early_data_rejected	
The request sent in TLS early data was invalid.

This might occur in the following cases but isn't limited to them:

The TargetHttpsProxy has TLS early data set to STRICT, but the request included query parameters.
The TargetHttpsProxy has TLS early data set to STRICT or PERMISSIVE, but the request used a nonidempotent HTTP method (such as POST or PUT).
425
error_uncompressing_gzipped_body	There was an error uncompressing a gzipped HTTP response.	502, 503
failed_parsing_client_headers	
Requests that use methods (for example, GET or POST) that aren't compliant with RFC 9110, Section 5.6.2 are rejected by a first-layer Google Front End (GFE).

This failure code applies only to global external Application Load Balancers and classic Application Load Balancers.

400
failed_to_connect_to_backend	The load balancer failed to connect to the backend. This includes timeouts during the connection phase.	502, 503
failed_to_negotiate_alpn	The load balancer and the backend failed to negotiate an application layer protocol (such as HTTP/2) to use to communicate with each other over TLS.	502, 503
failed_to_pick_backend	The load balancer failed to pick a healthy backend to handle the request.	502, 503
fault_filter_abort	This error can happen if the customer has configured a fault filter and the fault filter was triggered for the given request.	The value must be from 200 to 599.
handled_by_identity_aware_proxy	This response was generated by IAP during identity verification of the client before allowing access.	
200, 302, 400, 401, 403, 500, 502, 503

429 (throttled by IAP)

headers_too_long	The request headers were larger than the maximum allowed.	413
http_version_not_supported	HTTP version not supported. Only HTTP 0.9, 1.0, 1.1, and 2.0 are supported.	400
internal_error	Internal error at the load balancer. Normally represents a transient error in the load balancer infrastructure. Retry your query.	4XX or 5XX
invalid_chunk_framing	Requests and responses sent with the Transfer-Encoding: Chunked header are not RFC 9112 compliant. As per the RFC, both the chunked_body and the last-chunk fields must end in CRLF.	400
invalid_external_origin_endpoint	The configuration for the external backend is invalid. Review the internet NEG configuration and ensure that it specifies a valid FQDN/IP address and port.	4XX
invalid_http2_client_header_format	The HTTP/2 headers from a client are invalid. For more information, see invalid_request_headers.	400
invalid_http2_client_request_path	
The HTTP/2 request path from a client contains at least one character that isn't allowed under the URI specification.

For more information, see the "3.3. Path" section of RFC 3986.

400
invalid_request_headers	
The HTTP request headers received from a client contain at least one character that isn't allowed under an applicable HTTP specification.

For example, header field names that include a double quotation mark (") or any characters outside of the standard ASCII range (that is, any byte >= 0x80) are invalid.

For more information, see:

The "5.5. Field Values" section of RFC 9110
The "5. Field Syntax" section of RFC 9112
The "8.2.1. Field Validity" section of RFC 9113
400
malformed_chunked_body	The request body was improperly chunk encoded.	411
multiple_iap_policies	Multiple Identity-Aware Proxy (IAP) policies cannot be combined. If you have an IAP policy attached to a backend service and another policy attached to a serverless object, remove one of the policies and try again. Serverless objects include App Engine, Cloud Run, and Cloud Run functions.	500
request_body_too_large	The HTTP request body exceeded the maximum supported by the backend. Not applicable for VM backends.	413
request_loop_detected	The load balancer detected a request loop. This loop might be caused by a misconfiguration where the backend forwarded the request back to the load balancer.	502, 503
required_body_but_no_content_length	The HTTP request requires a body but the request headers don't include a content length or transfer-encoding chunked header.	400, 403, 411
retriable_error	
The load balancer has encountered an infrastructure error and the request can be retried. This can occur intermittently after you've made configuration changes that add or reference a new resource.

This can also occur when the first-layer GFE fails to communicate with the second-layer GFE due to an internal error, such as an in-progress rollout, load balancer overload, or intermittent configuration issue.

These errors are transient in nature and are expected to fall well within the SLA. However, if the error rate exceeds 0.01% over a sustained period, please contact Google Cloud support for further assistance.

404, 502, 503
secure_url_rejected	A request with an https:// URL was received over a plaintext HTTP/1.1 connection.	400
server_cert_chain_exceeded_limit	The server certificate chain is too long (more than 10 intermediate certificates included with the server certificate).	502, 503
server_cert_chain_invalid_eku

The server certificate has an Extended Key Usage (EKU) extension field but that field doesn't include serverAuth.
server_cert_chain_max_name_constraints_exceeded

An intermediate certificate provided for validation had more than 10 name constraints.	502, 503
server_cert_exceeded_size_limit	The server certificate payload (including any intermediate certificates) is too large (more than 16 KB).	503
server_cert_invalid_rsa_key_size	
A server or an intermediate certificate has an invalid RSA key size.

No validation is performed.

RSA keys can range from 2048 to 4096 bits.

503
server_cert_not_provided	The server did not provide the requested certificate during the handshake.	503
server_cert_pki_too_large	
The PKI to be used for validation has more than ten intermediate certificates that share the same Subject and Subject Public Key Info.

No validation is performed.

503
server_cert_trust_config_not_found	Matching TrustConfig not found.	503
server_cert_unsupported_elliptic_curve_key	
A server or an intermediate certificate is using an unsupported elliptic curve.

No validation is performed.

Valid curves are P-256 and P-384.

503
server_cert_unsupported_key_algorithm	
A server or an intermediate certificate is using a non-RSA or non-ECDSA algorithm.

No validation is performed.

503
server_cert_validation_internal_error	Internal error validating certificate chain.	503
server_cert_validation_not_performed	
You configured mTLS without setting up a TrustConfig resource.

503
server_cert_validation_search_limit_exceeded	
The depth or iteration limit is reached while attempting to validate the certificate chain.

The maximum depth for a certificate chain is ten, including the root and server certificates. The maximum number of iterations is 100 (certificates examined to validate the server certificate chain).

503
server_cert_validation_timed_out	The time limit is exceeded while attempting to validate the certificate chain.	503
server_cert_validation_unavailable	Service is unable to perform certificate chain validation.	503
serverless_neg_routing_failed	The serverless NEG request cannot be dispatched. This error can happen when the region specified in the NEG cannot be reached, or when the resource name (for example, the Cloud Run functions name) cannot be found.	404, 502, 503
service_extension_error	
There was an error calling out to a service extension used by the load balancer.

This might occur if the Wasm plugin is slow to respond and exceeds the 1 millisecond limit to send its response.

425
ssl_certificate_chain_verification_failed	The SSL certificate presented by the backend failed SSL certificate verification.	502, 503
ssl_certificate_san_verification_failed	The load balancer cannot find a Subject Alternative Name (SAN) in the SSL certificate presented by the backend that matches the configured hostname.	502, 503
throttled_by_security_policy	The request was blocked by a Cloud Armor throttle rule.	429
unsupported_100_continue	The client request included the 'Expect: 100-continue' header on a protocol that doesn't support it.	400
unsupported_method	The client supplied an unsupported HTTP request method.	400
upgrade_header_rejected	The client HTTP request contained the Upgrade header and was refused.	400
websocket_closed	The websocket connection was closed.	101
websocket_handshake_failed	The websocket handshake failed.	Any status code possible depending on the nature of the handshake failure.
View logs for mTLS client certificate validation
To view the logged errors for closed connections during mutual TLS client certificate validation, complete the following steps.

Console query
In the Google Cloud console, go to the Logs Explorer page.

Go to Logs Explorer

Click the Show query toggle.

Paste the following into the query field. Replace FORWARDING_RULE_NAME with the name of your forwarding rule.



jsonPayload.statusDetails=~"client_cert"
jsonPayload.@type="type.googleapis.com/google.cloud.loadbalancing.type.LoadBalancerLogEntry"
resource.labels.forwarding_rule_name=FORWARDING_RULE_NAME
Click Run query.

Authorization policy request logs
The authz_info object in the Load Balancer Log Entry JSON payload contains information about authorization policies. You can configure log-based metrics for traffic allowed or denied by these policies. Check more authorization policies log details.

Field	Type	Description
authz_info.policies[]	object	The list of policies that match the request.
authz_info.policies[].name	string	The name of the authorization policy that matches the request.
The name is empty for the following reasons:

No ALLOW policy matches the request and the request is denied.
No DENY policy matches the request and the request is allowed.
authz_info.policies[].result	enum	The result can be ALLOWED or DENIED.
authz_info.policies[].details	string	The details include the following:
allowed_as_no_deny_policies_matched_request
denied_as_no_allow_policies_matched_request
denied_by_authz_extension
denied_by_cloud_iap
authz_info.overall_result	enum	The result can be ALLOWED or DENIED.
Logging for backend buckets
Logging is automatically enabled for load balancers with backend buckets. You cannot modify or disable logging for backend buckets.

Logging for Cloud Armor
The table for statusDetail HTTP failure messages contains some messages that apply to Cloud Armor. For more information about what Cloud Armor logs, see Use request logging.

Logging for Shared VPC deployments
Application Load Balancer logs and metrics are typically exported to the project that has the forwarding rule. Therefore, service admins—owners or users of projects where the backend service is created—won't have access to the load balancer's logs and metrics by default. You can use IAM roles to grant these permissions to service admins. To learn more about the IAM roles that are available, and the steps to provide access, see Grant access to Monitoring.

Interacting with the logs
You can interact with the external Application Load Balancer logs by using the Cloud Logging API. The Logging API provides ways to interactively filter logs that have specific fields set. It exports matching logs to Cloud Logging, Cloud Storage, BigQuery, or Pub/Sub. For more information about the Logging API, see Logging API overview.

Monitoring
The load balancer exports monitoring data to Monitoring.

You can use monitoring metrics to do the following:

Evaluate a load balancer's configuration, usage, and performance
Troubleshoot problems
Improve resource utilization and user experience
In addition to the predefined dashboards in Monitoring, you can create custom dashboards, set up alerts, and query the metrics through the Cloud Monitoring API.

Note: Metrics are based on sampled traffic, that is, they won't correspond one-to-one with actual requests. The sampling rate is dynamic and cannot be adjusted.
Viewing predefined Cloud Monitoring dashboards
Cloud Monitoring provides predefined dashboards to monitor your load balancers. These dashboards are automatically populated by Monitoring.

Load balancers don't appear as a resource that can be monitored unless a load balancer exists in the current project.

Perform the following steps to access the predefined dashboards:

In the Google Cloud console, go to the Monitoring page.

Go to Monitoring

In the Monitoring navigation panel, click Dashboards.

Under Categories, click GCP.

To view a list of dashboards for all your Google Cloud load balancers, select the dashboard named Google Cloud Load Balancers. To view a specific load balancer's dashboard, locate the load balancer in the list and click its name.

To view the predefined dashboards for only your external Application Load Balancers, select the dashboard named External HTTP(S) Load Balancers. This page displays a dashboard that shows the 5XX response ratios and backend latency for all external Application Load Balancers in your project. It also provides a list of dashboards for all the external Application Load Balancers in your project.

You can click through to each load balancer's dashboard. Each dashboard includes the following:

Pre-populated graphs that display breakdowns for responses by status code classes (5xx, 4xx, 3xx, 2xx)
Total latency
Backend latency
Frontend RTT
Request count
A link to the logs for the load balancer
To view dashboards for third-party services, go back to the Dashboards page. Under Categories, click Other.

To view a specific third-party service dashboard, locate it in the list and click its name.
Defining alerting policies
To follow step-by-step guidance for this task directly in the Google Cloud console, click Guide me:

Guide me

You can create alerting policies to monitor the values of metrics and to notify you when those metrics violate a condition.

In the Google Cloud console, go to the notifications Alerting page:

Go to Alerting

If you use the search bar to find this page, then select the result whose subheading is Monitoring.

If you haven't created your notification channels and if you want to be notified, then click Edit Notification Channels and add your notification channels. Return to the Alerting page after you add your channels.
From the Alerting page, select Create policy.
To select the metric, expand the Select a metric menu and then do the following:
To limit the menu to relevant entries, enter Global External Application Load Balancer Rule into the filter bar. If there are no results after you filter the menu, then disable the Show only active resources & metrics toggle.
For the Resource type, select Global External Application Load Balancer Rule.
Select a Metric category and a Metric, and then select Apply.
Click Next.
The settings in the Configure alert trigger page determine when the alert is triggered. Select a condition type and, if necessary, specify a threshold. For more information, see Create metric-threshold alerting policies.
Click Next.
Optional: To add notifications to your alerting policy, click Notification channels. In the dialog, select one or more notification channels from the menu, and then click OK.
Optional: Update the Incident autoclose duration. This field determines when Monitoring closes incidents in the absence of metric data.
Optional: Click Documentation, and then add any information that you want included in a notification message.
Click Alert name and enter a name for the alerting policy.
Click Create Policy.
For more information, see Alerting overview.
Defining Cloud Monitoring custom dashboards
You can create custom Cloud Monitoring dashboards for the load balancer's metrics:

In the Google Cloud console, go to the Monitoring page.

Go to Monitoring

Select Dashboards > Create Dashboard.

Click Add Chart, and then give the chart a title.

To identify the time series to be displayed, choose a resource type and metric type:

In the Resource & Metric section, click the chart, and then in the Select a metric section, select from the available options:
For a global external Application Load Balancer, select the resource type Global External Application Load Balancer Rule.
Click Apply.
To specify monitoring filters, click Filters > Add filter.

Click Save.

Metric reporting frequency and retention
Metrics for the external Application Load Balancers are exported to Cloud Monitoring in 1-minute granularity batches. Monitoring data is retained for six (6) weeks.

The dashboard provides data analysis in default intervals of 1H (one hour), 6H (six hours), 1D (one day), 1W (one week), and 6W (six weeks). You can manually request analysis in any interval from 6W to 1 minute.

Monitoring metrics
You can monitor the following metrics for external Application Load Balancers.

The following metrics for global external Application Load Balancers are reported into Cloud Monitoring.

Note: The Response code class fraction metric is available per entire load balancer only, with no further breakdowns available.
Filter this table:
Enter a filter string
Name	Description
Backend configured rate (Preview)	network.googleapis.com/loadbalancer/backend/configured_rate	The maximum rate in requests per second configured per backend group. This is the result of scaling the target capacity by the (capacity scaler), if specified.
Backend configured utilization (Preview)	network.googleapis.com/loadbalancer/backend/configured_utilization	The maximum CPU utilization capacity as a fraction, configured per backend group. This is the result of scaling the target capacity by the capacity scaler, if specified.
Backend error rate (Preview)	network.googleapis.com/loadbalancer/backend/error_rate	The errors served by each backend group per second.
Backend fullness (Preview)	network.googleapis.com/loadbalancer/backend/fullness	The current fullness of each backend group as a percentage, based on the load balancer's balancing mode.
Backend latencies†	loadbalancing.googleapis.com/https/backend_latencies	
A distribution of the backend latency. Backend latency is the time in milliseconds between the last byte of the request sent to the backend and the last byte of the response received by the proxy. It includes the time taken by the backend to process the request and the time taken for the response to be sent back to the proxy.

Backend load balancing custom metrics (Preview)	network.googleapis.com/loadbalancer/backend/lb_custom_metric	The current utilization by each backend group, based on your defined custom metrics.
Backend rate (Preview)	network.googleapis.com/loadbalancer/backend/rate	The requests received by each backend group per second.
Backend request bytes count	loadbalancing.googleapis.com/https/backend_request_bytes_count	The number of bytes sent as requests from the external Application Load Balancer to the backends.
Backend request count	loadbalancing.googleapis.com/https/backend_request_count	The number of requests sent from the external Application Load Balancer to the backends.
Backend response bytes count	loadbalancing.googleapis.com/https/backend_response_bytes_count	The number of bytes sent as responses from the backends (including cache) to the external Application Load Balancer.
Backend utilization (Preview)	network.googleapis.com/loadbalancer/backend/utilization	The aggregate CPU utilization of the VMs in the group as a fraction.
Frontend RTT†	loadbalancing.googleapis.com/https/frontend_tcp_rtt	
A distribution of the frontend RTT. Frontend RTT is the time in milliseconds it takes for data to travel from the client to the proxy and back again. It includes the time taken for a request to travel from the client to the proxy and back from the proxy to the client. This is not updated during the lifetime of the connection. For example, setting up a (TCP) connection with a 3-way handshake would take 1.5 RTTs.

When requests are processed, the load balancer samples and averages the time it takes for data to travel back and forth between the client and the proxy, and then logs a smoothed RTT value. Smoothed RTT is an algorithm that deals with variations and anomalies that might occur in RTT measurements.

Request bytes count	loadbalancing.googleapis.com/https/request_bytes_count	The number of bytes sent as requests from clients to the external Application Load Balancer
Request count	loadbalancing.googleapis.com/https/request_count	The number of requests served by the external Application Load Balancer
Response bytes count	loadbalancing.googleapis.com/https/response_bytes_count	The number of bytes sent as responses from the external Application Load Balancer to clients
Response code class fraction		Fraction of total external Application Load Balancer responses that are in each response code class (2xx, 4xx, ...). In Monitoring, this value is only available on default dashboards. It isn't available for custom dashboards. You can use the Monitoring API to set alerts for it.
Total latencies	loadbalancing.googleapis.com/https/total_latencies	
A distribution of the total latency. Total latency is the time in milliseconds between the first byte of the request received by the proxy and the last byte of the response sent by the proxy. It includes: the time taken by the proxy to process the request, the time taken for the request to be sent from the proxy to the backend, the time taken by the backend to process the request, the time taken for the response to be sent back to the proxy, and the time taken for the proxy to process the response and send the response to the client.

It doesn't include the RTT between the client and the proxy. Additionally, pauses between requests on the same connection that use Connection: keep-alive do not affect the measurement. This measurement is typically reduced to the 95th percentile in Cloud Monitoring views.

For websocket connections, this field refers to the entire time duration of the connection.*

Example: A load balancer has 1 request per second from the UK, all with 100 ms latency, and 9 requests per second from the US, all with 50 ms latency. Over a certain minute there were 60 requests from the UK and 540 requests from the US. Monitoring metrics preserves the distribution over all dimensions. You can request information such as the following:

median overall latency (300/600) - 50 ms
median UK latency (30/60) - 100 ms
95th percentile overall latency (570/600) - 100 ms
* For monitoring websocket connections, create a backend service specifically for websockets.

† The sum of Frontend RTT and Backend latencies might not be less than or equal to Total latencies. This is because although we poll RTT over the socket from the GFE to the client at the time the HTTP response is acknowledged, we rely on kernel reporting for some of these measurements, and we cannot be sure that the kernel will have an RTT measurement for the given HTTP response. The end result is a smoothed RTT value that is also affected by previous HTTP responses, SYN/ACKs, and SSL handshakes that aren't affecting current HTTP request actual timings.

Filtering dimensions for metrics
You can apply filters for metrics for external Application Load Balancers.

Metrics are aggregated for each classic Application Load Balancer and global external Application Load Balancer. You can filter aggregated metrics by the following dimensions for resource.type="http_load_balancer" or resource.type="https_lb_rule". Note that not all dimensions are available on all metrics.

Filter this table:
Enter a filter string
Description
backend_name	The name of the backend instance group, bucket, or NEG. UNKNOWN is returned if the backend wasn't assigned, or NO_BACKEND_SELECTED if an error or interruption occurred before a backend was selected, a URL redirect occurred, or a classic Application Load Balancer with serverless backends returned a 200 OK response.
backend_scope	The Google Cloud scope (region or zone) of the backend service instance group that served the connection.
If no instance group was available or if the request was served by another entity, you see one of the following values instead of the region or zone of the backend service instance group.

FRONTEND_5xx: an internal error occurred before the GFE could select a backend. The GFE returned 5xx to the client.
INVALID_BACKEND: the GFE couldn't find a healthy backend to assign the request to, so it returned a 5xx status code to the requestor.
NO_BACKEND_SELECTED: either an error or interruption occurred before a backend was selected, a URL redirect occurred, or a classic Application Load Balancer with serverless backends returned a 200 OK response.
MULTIPLE_BACKENDS: the request was served by potentially multiple backends. This can happen when Cloud CDN has served the request partially from its cache and has also sent one or more byte range requests to the backend. Use the backend_scope breakdown to visualize each load balancer-to-backend request.
When this breakdown is chosen, the charts show backend metrics (load balancer-to-backends), not frontend metrics (client-to-load balancer).

backend_scope_type	
The type of the scope of the backend group. Can be GLOBAL, REGION, ZONE, MULTIPLE_BACKENDS, or NO_BACKEND_SELECTED if an error or interruption occurred before a backend was selected, a URL redirect occurred, or a classic Application Load Balancer with serverless backends returned a 200 OK response, or other possible backend_type outputs.

MULTIPLE_BACKENDS is used when chunk caching is used. Multiple queries are sent to the same backend for different chunks of data to support a single client request.

backend_target_name	The name of the backend target. The target can be either a backend service or backend bucket. UNKNOWN is returned if a backend wasn't assigned.
backend_target_type	The name of the backend service that served the request. Can be BACKEND_SERVICE, BACKEND_BUCKET, UNKNOWN if the backend wasn't assigned, or NO_BACKEND_SELECTED if an error or interruption occurred before a backend was selected, a URL redirect occurred, or a classic Application Load Balancer with serverless backends returned a 200 OK response.
backend_type	
The name of the backend group that served the client's request. Can be INSTANCE GROUP, NETWORK_ENDPOINT_GROUP, or UNKNOWN is returned if the backend wasn't assigned. If no backend group was available or if the request was served by another entity, one of the following values is displayed instead of a backend group.

FRONTEND_5XX: an internal error occurred before the GFE could select a backend. The GFE returned 5xx to the client.
INVALID_BACKEND: the GFE couldn't find a healthy backend to assign the request to, so it returned a 5xx status code to the requestor.
NO_BACKEND_SELECTED: either an error or interruption occurred before a backend was selected, a URL redirect occurred, or a classic Application Load Balancer with serverless backends returned a 200 OK response.
MULTIPLE_BACKENDS: the request was served by potentially multiple backends. This can happen when Cloud CDN has served the request partially from its cache and has also sent one or more byte range requests to the backend. Use the backend_scope breakdown to visualize each load balancer-to-backend request.
cache_result	Cache result for serving HTTP request by proxy: HIT, MISS, DISABLED, PARTIAL_HIT (for a request served partially from cache and partially from backend), or UNKNOWN.
client_country	Country of the client that issued the HTTP request—for example, United States or Germany.
forwarding_rule_name	The name of the forwarding rule used by the client to send the request.
load_balancing_scheme	The load balancing scheme used. If classic Application Load Balancer is used, the value is EXTERNAL. If global external Application Load Balancer is used, the value is EXTERNAL_MANAGED.
matched_url_path_rule	The URL map path rule that matched the prefix of the HTTP(S) request (up to 50 characters).
protocol	Protocol used by the client, one of HTTP/1.0, HTTP/1.1, HTTP/2.0, QUIC/HTTP/2.0, UNKNOWN.
proxy_continent	Continent of the HTTP(S) GFE that terminated the HTTP(S) connection—for example, America, Europe, Asia
response_code	The HTTP status code of the request.
response_code_class	The HTTP status code class of the request: 200, 300, 400, 500 or 0 for none.
target_proxy_name	The name of the target HTTP(S) proxy object referenced by the forwarding rule.
url_map_name	
The URL map path rule or route rule configured as part of the URL map key. Can be UNMATCHED or UNKNOWN as fallbacks.

UNMATCHED refers to a request that doesn't match any URL path rules, so url_map_name uses the default path rule.
UNKNOWN indicates an internal error.