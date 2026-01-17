Regional external Application Load Balancer logging and monitoring

This document shows you how to configure and use Cloud Logging and Cloud Monitoring with regional external Application Load Balancers.
Logging
You can enable, disable, and view logs for an external Application Load Balancer backend service.

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

Pro tip: To specify the CUSTOM option, use the gcloud CLI and the REST API.

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

Pro tip: To specify the CUSTOM option, use the gcloud CLI and the REST API.

To finish editing the backend service, click Update.

To finish editing the load balancer, click Update.

Disabling or modifying logging on an existing backend service
Console
gcloud: Regional mode
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
HTTP(S) logs are indexed first by a forwarding rule, then by a URL map.

To view logs, go to the Logs Explorer page:

Go to Logs Explorer

To view all logs, in the Resource filter menu, select Cloud HTTP Load Balancer > All forwarding rules.

To view logs for one forwarding rule, select a single forwarding rule name.

To view logs for one URL map, select a forwarding rule, and then select a URL map.

Log fields of type boolean typically only appear if they have a value of true. If a boolean field has a value of false, that field is omitted from the log.

UTF-8 encoding is enforced for log fields. Characters that are not UTF-8 characters are replaced with question marks. For regional external Application Load Balancers, you can export logs-based metrics using resource logs (resource.type="http_external_regional_lb_rule").

What is logged
External Application Load Balancer log entries contain information useful for monitoring and debugging your HTTP(S) traffic. Log records contain required fields, which are the default fields of every log record.

Log records contain optional fields that add additional information about your HTTP(S) traffic. Optional fields can be omitted to save storage costs.

Some log fields are in a multi-field format, with more than one piece of data in a given field. For example, the tls field is of the TlsInfo format, which contains the TLS protocol and TLS cipher in a single field. These multi-field fields are described in the following record format table.
Field	Field format	Field type: Required or Optional	Description
severity
insertID
timestamp
logName	LogEntry	Required	The general fields as described in a log entry.
httpRequest	HttpRequest	Required	A common protocol for logging HTTP requests.
resource	MonitoredResource	Required	
The MonitoredResource is the resource type associated with a log entry.

The MonitoredResourceDescriptor describes the schema of a MonitoredResource object by using a type name and a set of labels. For more information, see Resource labels.

jsonPayload	object (Struct format)	Required	The log entry payload that is expressed as a JSON object. The JSON object contains the following fields:
proxyStatus
tls
backendTargetProjectNumber
mtls
authzPolicyInfo
backendNetworkName
orca_load_report
string	Required	
The proxyStatus field holds a string that specifies why the regional external Application Load Balancer returned the HttpRequest.status.

The field isn't logged if the value is an empty string. This can happen if the proxy or backend doesn't return a status code or the status code that is returned isn't 0, 4xx, or 5xx.

The proxyStatus field has two parts:

proxyStatus error
Optional: proxyStatus details
AuthzPolicyInfo	Required	The authzPolicyInfo field stores information about the authorization policy result. This information is only available for regional external Application Load Balancers that have enabled authorization policies. For more information, see what is logged for authorization policies.
TlsInfo	Optional	
The tls field holds the TlsInfo field that specifies the TLS metadata for the connection between the client and the load balancer. This field is only available if the client is using TLS/SSL encryption.

Use the --logging-optional-fields parameter to specify which elements must be logged:

tls.protocol
tls.cipher
You can't set --logging-optional-fields to tls to specify all elements.

MtlsInfo	Optional	
The mtls field holds the MtlsInfo value that specifies the mTLS metadata for the connection between the client and the load balancer. This field is only available if the load balancer uses frontend mutual TLS (mTLS).

string	Required	The backendNetworkName field specifies the VPC network of the backend.
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
MtlsInfo field format
Field	Field format	Field type: Required or Optional	Description
clientCertPresent	bool	Optional	
true if the client has provided a certificate during the TLS handshake; otherwise, false.

clientCertChainVerified	bool	Optional	
true if the client certificate chain is verified against a configured TrustStore; otherwise, false.

clientCertError	string	Optional	
Predefined strings representing the error conditions. For more information about the error strings, see Client validation mode.

clientCertSha256Fingerprint	string	Optional	
Base64-encoded SHA-256 fingerprint of the client certificate.

clientCertSerialNumber	string	Optional	
The serial number of the client certificate. If the serial number is longer than 50 bytes, the string client_cert_serial_number_exceeded_size_limit is added to client_cert_error, and the serial number is set to an empty string.

clientCertValidStartTime	string	Optional	
Timestamp (RFC 3339 date string format) before which the client certificate isn't valid. For example, 2022-07-01T18:05:09+00:00.

clientCertValidEndTime	string	Optional	
Timestamp (RFC 3339 date string format) after which the client certificate isn't valid. For example, 2022-07-01T18:05:09+00:00.

clientCertSpiffeId	string	Optional	
The SPIFFE ID from the subject alternative name (SAN) field. If the value isn't valid or exceeds 2048 bytes, the SPIFFE ID is set to an empty string.

If the SPIFFE ID is longer than 2048 bytes, the string client_cert_spiffe_id_exceeded_size_limit is added to client_cert_error.

clientCertUriSans	string	Optional	
Comma-separated Base64-encoded list of the SAN extensions of type URI. The SAN extensions are extracted from the client certificate. The SPIFFE ID is not included in the client_cert_uri_sans field.

If the client_cert_uri_sans field is longer than 512 bytes, the string client_cert_uri_sans_exceeded_size_limit is added to client_cert_error, and the comma-separated list is set to an empty string.

clientCertDnsnameSans	string	Optional	
Comma-separated Base64-encoded list of the SAN extensions of type DNSName. The SAN extensions are extracted from the client certificate.

If the client_cert_dnsname_sans field is longer than 512 bytes, the string client_cert_dnsname_sans_exceeded_size_limit is added to client_cert_error, and the comma-separated list is set to an empty string.

clientCertIssuerDn	string	Optional	
Base64-encoded full Issuer field from the certificate.

If the client_cert_issuer_dn field is longer than 512 bytes, the string client_cert_issuer_dn_exceeded_size_limit is added to client_cert_error, and client_cert_issuer_dn is set to an empty string.

clientCertSubjectDn	string	Optional	
Base64-encoded full Subject field from the certificate.

If the client_cert_subject_dn field is longer than 512 bytes, the string client_cert_subject_dn_exceeded_size_limit is added to client_cert_error, and client_cert_subject_dn is set to an empty string.

clientCertLeaf	string	Optional	
The client leaf certificate for an established mTLS connection where the certificate passed validation. Certificate encoding is compliant with RFC 9440: the binary DER certificate is encoded using Base64 (without line breaks, spaces, or other characters outside the Base64 alphabet) and delimited with colons on either side.

If client_cert_leaf exceeds 16 KB unencoded, the string client_cert_validated_leaf_exceeded_size_limit is added to client_cert_error, and client_cert_leaf is set to an empty string.

clientCertChain	string	Optional	
The comma-delimited list of certificates, in standard TLS order, of the client certificate chain for an established mTLS connection where the client certificate passed validation, not including the leaf certificate. Certificate encoding is compliant with RFC 9440.

If the combined size of client_cert_leaf and client_cert_chain before Base64 encoding exceeds 16 KB, the string client_cert_validated_chain_exceeded_size_limit is added to client_cert_error, and client_cert_chain is set to an empty string.

Resource labels
The following table lists the resource labels for resource.type="http_external_regional_lb_rule".

Field	Type	Description
backend_name	string	The name of the backend instance group or NEG. However, the label is empty for a failed TLS connection.
backend_scope	string	The scope of the backend (either a zone name or a region name). Might be UNKNOWN whenever backend_name is unknown.
backend_scope_type	string	The scope of the backend (REGION/ZONE). Might be UNKNOWN whenever backend_name is unknown.
backend_target_name	string	The name of the backend selected to handle the request, based on the URL map path rule or route rule that matches the request.
backend_target_type	string	The type of backend target. Can be BACKEND_SERVICE, or UNKNOWN is returned if the backend wasn't assigned.
backend_type	string	The type of the backend group. Can be INSTANCE_GROUP, NETWORK_ENDPOINT_GROUP, or UNKNOWN is returned if the backend wasn't assigned.
forwarding_rule_name	string	The name of the forwarding rule object.
matched_url_path_rule	string	The URL map path rule or route rule configured as part of the URL map key. Can be UNMATCHED or UNKNOWN as fallbacks.
UNMATCHED refers to a request that matches no URL path rules, so it uses the default path rule.
UNKNOWN indicates an internal error or a failed TLS connection.
network_name	string	The name of the load balancer's VPC network.
project_id	string	The identifier of the Google Cloud project associated with this resource.
region	string	The region in which the load balancer is defined.
target_proxy_name	string	The name of the target proxy object referenced by the forwarding rule.
url_map_name	string	The name of the URL map object configured to select a backend service. For a failed TLS connection, url_map_name is empty.
proxyStatus error field
The proxyStatus field contains a string that specifies why the load balancer returned an error. There are two parts in the proxyStatus field, proxyStatus error and proxyStatus details. This section describes the strings that are supported in the proxyStatus error field.

The proxyStatus error field is applicable to the following load balancers:

Regional external Application Load Balancer
Cross-region internal Application Load Balancer
Regional internal Application Load Balancer
Filter this table:
Enter a filter string
Description	Common accompanying response codes
connection_limit_reached	
The load balancer is configured to limit the number of connections it has to the backend, and that limit has been exceeded.

This proxyStatus error is returned during any of the following scenarios:

If any backend is in maintenance mode, the traffic can't be routed to the backend.
If the request is locally rate limited.
Envoy is handling error conditions such as running out of memory.
502, 503
connection_refused	The load balancer's connection to the backend is refused.	502, 503
connection_terminated	
The load balancer's connection to the backend ended before a complete response is received.

This proxyStatus error is returned during any of the following scenarios:

The load balancer's connection to the backend ended before a complete response is received.
The TLS connection failed on the SSL handshake, and the client didn't establish a connection with the load balancer.
0, 502, 503
connection_timeout	The load balancer's attempt to open a connection to the backend has timed out.	504
destination_not_found	The load balancer can't determine the appropriate backend to use for this request. For example, the backend might not be configured.	500, 404
destination_unavailable	The load balancer considers the backend to be unavailable. For example, recent attempts to communicate with the backend have failed, or a health check might have resulted in a failure.	500, 503
dns_error	The load balancer encountered a DNS error when trying to find an IP address for the backend hostname.	502, 503
http_protocol_error	The load balancer encountered an HTTP protocol error while communicating with the backend.	502
http_request_error	The load balancer encountered an HTTP 4xx error, indicating problems with the client request.	400, 403, 405, 406, 408, 411, 413, 414, 415, 416, 417, or 429
http_response_timeout	The load balancer reached a configured backend service timeout limit while waiting for the complete response from the backend.	504, 408
proxy_configuration_error	The load balancer encountered an internal configuration error.	500
proxy_internal_error	The load balancer encountered an internal error. The error can be due to a scheduled restart of the proxy managing the connections.	0, 500, 502
proxy_internal_response	The load balancer generated the response without attempting to connect to the backend.	Any status code depending on the type of problem. For example, the 410 status code means that the backend is unavailable due to payment delinquency.
tls_alert_received	The load balancer encountered a fatal TLS alert during the TLS handshake.	0
tls_certificate_error	The load balancer encountered an error at the time of verifying the certificate presented by the server or by the client when mTLS is enabled.	0
tls_protocol_error	The load balancer encountered a TLS error during the TLS handshake.	0
proxyStatus details field
The proxyStatus field contains a string that specifies why the load balancer returned an error. There are two parts in the proxyStatus field, proxyStatus error and proxyStatus details. The proxyStatus details field is optional and is shown only when additional information is available. This section describes the strings that are supported in the proxyStatus details field.

The proxyStatus details field is applicable to the following load balancers:

Regional external Application Load Balancer
Regional internal Application Load Balancer
Cross-region internal Application Load Balancer
Filter this table:
Enter a filter string
Description	Common accompanying response status codes
access_denied	A valid certificate or PSK was received, but when access control was applied, the client didn't proceed with negotiation. The error results in a closed TLS connection.	0
backend_connection_closed	The backend unexpectedly closed its connection to the load balancer. This can happen if the load balancer is sending traffic to another entity such as a third-party application that has a TCP timeout shorter than the 10-minute (600-second) timeout of the load balancer.	502
backend_timeout	
The backend timed out while generating a response.

502
bad_certificate	A certificate is invalid, or it contains signatures that couldn't be verified. The error results in a closed TLS connection.	0
bad_certificate_status_response	Sent by clients when an invalid or unacceptable OCSP response is provided by the server through the "status_request" extension. See TLS extension definitions. The error results in a closed TLS connection.	0
bad_record_mac	A record is received that can't be deprotected. The error results in a closed TLS connection.	0
certificate_expired	A certificate has expired or it isn't valid. The error results in a closed TLS connection.	0
certificate_revoked	A certificate was revoked by its signer. The error results in a closed TLS connection.	0
certificate_unknown	Some unspecified issues arose while processing the certificate, rendering it unacceptable. The error results in a closed TLS connection.	0
client_cert_chain_invalid_eku	Either the client certificate or its issuer doesn't have extended key usage that includes clientAuth. For more information, see Logged errors for closed connections.	0
client_cert_chain_max_name_constraints_exceeded	An intermediate certificate provided for validation had more than 10 name constraints. For more information, see Logged errors for closed connections.	0
client_cert_invalid_rsa_key_size	A client leaf or intermediate certificate had an invalid RSA key size. For more information, see Logged errors for closed connections.	0
client_cert_not_provided	The client didn't provide the requested certificate during the handshake. For more information, see Logged errors for closed connections.	0
client_cert_pki_too_large	The PKI to be used for validation has more than three intermediate certificates that share the same Subject and Subject Public Key Info. For more information, see Logged errors for closed connections.	0
client_cert_unsupported_elliptic_curve_key	A client or intermediate certificate is using an unsupported elliptic curve. For more information, see Logged errors for closed connections.	0
client_cert_unsupported_key_algorithm	A client or intermediate certificate is using a non-RSA or non-ECDSA algorithm. For more information, see Logged errors for closed connections.	0
client_cert_validation_failed	The client certificate fails validation with the TrustConfig. For more information, see Logged errors for closed connections.	0
client_cert_validation_not_performed	You have configured mutual TLS without setting up a TrustConfig. For more information, see Logged errors for closed connections.	0
client_cert_validation_search_limit_exceeded	The depth or iteration limit is reached while attempting to validate the certificate chain. For more information, see Logged errors for closed connections.	0
client_cert_validation_timed_out	The time limit exceeded (200 ms) while validating the certificate chain. For more information, see Logged errors for closed connections.	0
client_disconnected_before_any_response	The connection to the client was broken before the load balancer sent any response.	0
client_timed_out	
The connection between the load balancer and client exceeded the idle timeout.

For more information about regional external Application Load Balancer, see Client HTTP keepalive timeout. For more information about internal Application Load Balancer, see Client HTTP keepalive timeout.	0, 408
decode_error	A message couldn't be decoded because some fields are out of the specified range, or the length of the message is incorrect. The error results in a closed TLS connection.	0
decrypt_error	A handshake (not record layer) cryptographic operation failed, including being unable to correctly verify a signature or validate a finished message or a PSK binder. The error results in a closed TLS connection.	0
denied_by_security_policy	The load balancer denied this request because of a Google Cloud Armor security policy.	403
failed_to_connect_to_backend	The load balancer failed to connect to the backend. This failure includes timeouts during the connection phase.	503
failed_to_pick_backend	The load balancer failed to pick a healthy backend to handle the request.	502
handled_by_identity_aware_proxy	This response was generated by Identity-Aware Proxy (IAP) during verifying the identity of the client before allowing access.	200, 302, 400, 401, 403, 500, 502
handshake_failure	Unable to negotiate an acceptable set of security parameters given the options available. The error results in a closed TLS connection.	0
http_protocol_error_from_backend_response	The backend response contains an HTTP protocol error.	501, 502
http_protocol_error_from_request	The client request contains an HTTP protocol error.	400, 503
http_version_not_supported	The HTTP protocol version isn't supported. Only HTTP 1.1 and 2.0 are supported.	400
illegal_parameter	A field in the handshake was incorrect or inconsistent with other fields. The error results in a closed TLS connection.	0
inappropriate_fallback	Sent by a server in response to an invalid connection retry attempt from a client. The error results in a closed TLS connection.	0
insufficient_security	A negotiation has failed specifically because the server requires parameters that are more secure than those supported by the client. The error results in a closed TLS connection.	0
invalid_request_headers	
The HTTP request headers received from a client contain at least one character that isn't allowed under an applicable HTTP specification.

For example, header field names that include a double quotation mark (") or any characters outside of the standard ASCII range (that is, any byte >= 0x80) are invalid.

For more information, see:

The "5.5. Field Values" section of RFC 9110
The "5. Field Syntax" section of RFC 9112
The "8.2.1. Field Validity" section of RFC 9113
400, 404
ip_detection_failed	The original IP address couldn't be detected.	Any status code possible depending on the nature of the failure. The value must be from 400 to 599.
load_balancer_configured_resource_limits_reached	The load balancer has reached the configured resource limits, such as the maximum number of connections.	0
missing_extension	Sent by endpoints that receive a handshake message not containing an extension that is mandatory to send for the offered TLS version or other negotiated parameters. The error results in a closed TLS connection.	0
no_application_protocol	Sent by servers when a client "application_layer_protocol_negotiation" extension advertises only protocols that the server doesn't support. See TLS application-layer protocol negotiation extension. The error results in a closed TLS connection.	0
no_certificate	No certificate was found. The error results in a closed TLS connection.	0
record_overflow	A TLSCiphertext record was received that has a length more than 214+256 bytes, or a record was decrypted to a TLSPlaintext record with more than 214 bytes (or some other negotiated limit). The error results in a closed TLS connection.	0
request_body_too_large	The HTTP request body exceeded the maximum length supported by the load balancer.	413, 507
request_header_timeout	The request header timed out because the load balancer didn't receive the complete request within 5 seconds.	408, 504
response_sent_by_backend	The HTTP request was proxied successfully to the backend, and the response was returned by the backend.	The HTTP status code is set by the software running on the backend.
throttled_by_security_policy	The request was blocked by a Cloud Armor throttle rule.	429
tls_version_not_supported	The TLS protocol version is recognized but not supported. The error results in a closed TLS connection.	0
unexpected_message	An inappropriate message, such as a wrong handshake message or premature application data was received. The error results in a closed TLS connection.	0
unknown_ca	A valid certificate chain or partial chain was received, but the certificate can't be accepted because the CA certificate cannot be located or matched with a known trust anchor. The error results in a closed TLS connection.	0
unknown_psk_identity	Servers send this error when PSK key establishment is required, but the client doesn't provide an acceptable PSK identity. The error results in a closed TLS connection.	0
unrecognized_name	Sent by servers when no server exists that can be identified by the name provided by the client through the "server_name" extension. See TLS extension definitions.	0
unsupported_certificate	A certificate is of an unsupported type. The error results in a closed TLS connection.	0
unsupported_extension	Sent by endpoints that receive any handshake message containing an extension known to be prohibited for inclusion in the given handshake message, or including any extensions in ServerHello or Certificate that was not first offered in the corresponding ClientHello or CertificateRequest. The error results in a closed TLS connection.	0
user_cancelled	The user canceled the handshake for some reason unrelated to a protocol failure. The error results in a closed TLS connection.	0
Failed TLS connection log entries
When the TLS connection between the client and the load balancer fails before any backend is selected, log entries record the errors. You can configure the backend services with different log sample rates. When a TLS connection fails, the failed TLS connection log sample rate is the highest sample rate for any backend service. For example, if you have configured two backend services with logging sample rate as 0.3 and 0.5, the failed TLS connection log sample rate is 0.5.

You can identify failed TLS connections by checking for these log entry details:

proxyStatus error type is tls_alert_received, tls_certificate_error, tls_protocol_error, or connection_terminated.
There is no backend information.
The following sample shows a failed TLS log entry with the proxyStatus error field:


   json_payload:    {
   @type: "type.googleapis.com/google.cloud.loadbalancing.type.LoadBalancerLogEntry"
   proxyStatus: "error="tls_alert_received"; details="server_to_client: handshake_failure""
   log_name: "projects/529254013417/logs/mockservice.googleapis.com%20name"
   }
   http_request {
    latency {
      nanos: 12412000
    }
    protocol: "HTTP/1.0"
    remote_ip: "127.0.0.2"
   }
  resource {
    type: "mock_internal_http_lb_rule"
    labels {
      backend_name: ""
      backend_scope: ""
      backend_scope_type: "UNKNOWN"
      backend_target_name: ""
      backend_target_type: "UNKNOWN"
      backend_type: "UNKNOWN"
      forwarding_rule_name: "l7-ilb-https-forwarding-rule-dev"
      matched_url_path_rule: "UNKNOWN"
      network_name: "lb-network"
      region: "REGION"
      target_proxy_name: "l7-ilb-https-proxy-dev"
      url_map_name: ""
    }
  }
  timestamp: "2023-08-15T16:49:30.850785Z"
  
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
Interacting with the logs
You can interact with the external Application Load Balancer logs by using the Cloud Logging API. The Logging API provides ways to interactively filter logs that have specific fields set. It exports matching logs to Cloud Logging, Cloud Storage, BigQuery, or Pub/Sub. For more information about the Logging API, see Logging API overview.

Monitoring
The load balancer exports monitoring data to Monitoring.

You can use monitoring metrics to do the following:

Evaluate a load balancer's configuration, usage, and performance
Troubleshoot problems
Improve resource utilization and user experience
In addition to the predefined dashboards in Monitoring, you can create custom dashboards, set up alerts, and query the metrics through the Cloud Monitoring API.

Defining alerting policies
You can create alerting policies to monitor the values of metrics and to notify you when those metrics violate a condition.

In the Google Cloud console, go to the notifications Alerting page:

Go to Alerting

If you use the search bar to find this page, then select the result whose subheading is Monitoring.

If you haven't created your notification channels and if you want to be notified, then click Edit Notification Channels and add your notification channels. Return to the Alerting page after you add your channels.
From the Alerting page, select Create policy.
To select the metric, expand the Select a metric menu and then do the following:
To limit the menu to relevant entries, enter Regional External Application Load Balancer Rule into the filter bar. If there are no results after you filter the menu, then disable the Show only active resources & metrics toggle.
For the Resource type, select Regional External Application Load Balancer Rule.
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
For a regional external Application Load Balancer, select the resource type Regional External Application Load Balancer Rule.
Click Apply.
To specify monitoring filters, click Filters > Add filter.

Click Save.

Metric reporting frequency and retention
Metrics for the external Application Load Balancers are exported to Cloud Monitoring in 1-minute granularity batches. Monitoring data is retained for six (6) weeks.

The dashboard provides data analysis in default intervals of 1H (one hour), 6H (six hours), 1D (one day), 1W (one week), and 6W (six weeks). You can manually request analysis in any interval from 6W to 1 minute.

Monitoring metrics
You can monitor the following metrics for external Application Load Balancers.

The following metrics for regional external Application Load Balancers are reported into Cloud Monitoring. These metrics are prepended with loadbalancing.googleapis.com/.

Filter this table:
Enter a filter string
Metric	Name	Description
Backend configured rate (Preview)	network.googleapis.com/loadbalancer/backend/configured_rate	The maximum rate in requests per second configured per backend group. This is the result of scaling the target capacity by the (capacity scaler), if specified.
Backend configured utilization (Preview)	network.googleapis.com/loadbalancer/backend/configured_utilization	The maximum CPU utilization capacity as a fraction, configured per backend group. This is the result of scaling the target capacity by the capacity scaler, if specified.
Backend error rate (Preview)	network.googleapis.com/loadbalancer/backend/error_rate	The errors served by each backend group per second.
Backend fullness (Preview)	network.googleapis.com/loadbalancer/backend/fullness	The current fullness of each backend group as a percentage, based on the load balancer's balancing mode.
Backend latencies	loadbalancing.googleapis.com/https/external/regional/backend_latencies	
A distribution of the backend latency. Backend latency is the time in milliseconds between the last byte of the request sent to the backend and the last byte of the response received by the proxy. It includes the time taken by the backend to process the request and the time taken for the response to be sent back to the proxy.

Backend load balancing custom metrics (Preview)	network.googleapis.com/loadbalancer/backend/lb_custom_metric	The current utilization by each backend group, based on your defined custom metrics.
Backend rate (Preview)	network.googleapis.com/loadbalancer/backend/rate	The requests received by each backend group per second.
Backend utilization (Preview)	network.googleapis.com/loadbalancer/backend/utilization	The aggregate CPU utilization of the VMs in the group as a fraction.
Request count	loadbalancing.googleapis.com/https/external/regional/request_count	The number of requests served by the regional external Application Load Balancer.
Request bytes count	loadbalancing.googleapis.com/https/external/regional/request_bytes	The number of bytes sent as requests from clients to the regional external Application Load Balancer.
Response bytes count	loadbalancing.googleapis.com/https/external/regional/response_bytes	The number of bytes sent as responses from the regional external Application Load Balancer to the client.
Total latencies	loadbalancing.googleapis.com/https/external/regional/total_latencies	
A distribution of the total latency. Total latency is the time in milliseconds between the first byte of the request received by the proxy and the last byte of the response sent by the proxy. It includes: the time taken by the proxy to process the request, the time taken for the request to be sent from the proxy to the backend, the time taken by the backend to process the request, the time taken for the response to be sent back to the proxy, and the time taken for the proxy to process the response and send the response to the client.

It doesn't include the RTT between the client and the proxy. Additionally, pauses between requests on the same connection that use Connection: keep-alive do not affect the measurement. This measurement is typically reduced to the 95th percentile in Cloud Monitoring views.

Filtering dimensions for metrics
You can apply filters for metrics for external Application Load Balancers.

Metrics are aggregated for each regional external Application Load Balancer. You can filter aggregated metrics by using the following dimensions for resource.type="http_external_regional_lb_rule".

Filter this table:
Enter a filter string
Property	Description
backend_name	The name of the backend instance group or NEG.
backend_scope	The scope of the backend (either a zone name or a region name). Might be UNKNOWN whenever backend_name is unknown.
backend_scope_type	The scope of the backend (REGION/ZONE). Might be UNKNOWN whenever backend_name is unknown.
backend_target_name	The name of the backend selected to handle the request, based on the URL map path rule or route rule that matches the request.
backend_target_type	The type of backend target. Can be BACKEND_SERVICE, or UNKNOWN is returned if the backend wasn't assigned.
backend_type	The type of the backend group. Can be INSTANCE_GROUP, NETWORK_ENDPOINT_GROUP, or UNKNOWN is returned if the backend wasn't assigned.
forwarding_rule_name	The name of the forwarding rule object.
matched_url_path_rule	The URL map path rule or route rule configured as part of the URL map key. Can be UNMATCHED or UNKNOWN as fallbacks.
UNMATCHED refers to a request that doesn't match any URL path rules, so it uses the default path rule.
UNKNOWN indicates an internal error.
network_name	The name of the load balancer's VPC network.
project_id	The identifier of the Google Cloud project associated with this resource.
region	The region in which the load balancer is defined.
target_proxy_name	The name of the target proxy object referenced by the forwarding rule.
url_map_name	The name of the URL map object configured to select a backend service.