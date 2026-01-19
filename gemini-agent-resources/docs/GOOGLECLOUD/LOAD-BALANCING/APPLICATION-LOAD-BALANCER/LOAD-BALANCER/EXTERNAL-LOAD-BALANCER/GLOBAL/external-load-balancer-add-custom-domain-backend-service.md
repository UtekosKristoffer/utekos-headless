# Create Custom Headers in Backend Services

This page describes how to configure custom headers in backend services used by global external Application Load Balancers.

Custom request and response headers let you specify additional headers that the load balancer can add to HTTP(S) requests and responses. Depending on the information detected by the load balancer, these headers can include the following information:

*   Latency to the client
*   Geographic location of the client's IP address
*   Parameters of the TLS connection

Custom request headers are supported for backend services, while custom response headers are supported for backend services and backend buckets.

The load balancer adds certain headers by default to all HTTP(S) requests and responses that it proxies between backends and clients. For more information, see [Target proxies](https://cloud.google.com/load-balancing/docs/target-proxies).

## Before you begin

If necessary, update to the latest version of the Google Cloud CLI:
```bash
gcloud components update
```

## How custom headers work

*   When the load balancer forwards a request to the backend, it adds request headers.
*   The load balancer sets response headers before returning the responses to the client.

To enable custom headers, you specify a list of headers in a property of the backend service or backend bucket. You specify each header as a `header-name:header-value` string.

### Header name requirements:

*   Must be a valid HTTP header-field name definition (per RFC 7230).
*   Must not be `X-User-IP` or `CDN-Loop`.
*   Must not be a hop-by-hop header like `Keep-Alive`, `Transfer-Encoding`, etc.
*   Must not begin with `X-Google`, `X-Goog-`, `X-GFE` or `X-Amz-`.

### Header value requirements:

*   Must be a valid HTTP header field definition (per RFC 7230).
*   Can be blank.
*   Can include one or more variables, enclosed by curly braces.

## Supported variables in header values

The following variables can appear in custom header values. The load balancer expands variables to empty strings when it cannot determine their values.

| Variable                      | Description                                                  |
| :---------------------------- | :----------------------------------------------------------- |
| `cdn_cache_id`                | Location and ID of the cache instance.                       |
| `cdn_cache_status`            | `hit`, `miss`, `revalidated`, `stale`, `uncacheable`, or `disabled`. |
| `client_city`                 | City from which the request originated.                      |
| `client_city_lat_long`        | Latitude and Longitude of the city.                          |
| `client_encrypted`            | `true` if the connection is encrypted (HTTPS, HTTP/2, HTTP/3). |
| `client_ip_address`           | The client's IP address.                                     |
| `client_port`                 | The client's source port.                                    |
| `client_protocol`             | `HTTP/1.0`, `HTTP/1.1`, `HTTP/2`, or `HTTP/3`.               |
| `client_region`               | The country associated with the client's IP address.         |
| `client_region_subdivision`   | Subdivision (e.g., state or province).                       |
| `client_rtt_msec`             | Estimated round-trip time between the load balancer and the client. |
| `origin_request_header`       | Value of the Origin header in the request.                   |
| `server_ip_address`           | The IP address of the load balancer.                         |
| `server_port`                 | The destination port number.                                 |
| `tls_cipher_suite`            | Cipher suite negotiated during the TLS handshake.            |
| `tls_sni_hostname`            | Server name indication (SNI) from the TLS handshake.         |
| `tls_version`                 | `TLSv1`, `TLSv1.1`, `TLSv1.2`, `TLSv1.3`, or `QUIC`.          |

### Mutual TLS custom headers

If mutual TLS (mTLS) is configured, the following additional header variables are available:

| Variable                     | Description                                                  |
| :--------------------------- | :----------------------------------------------------------- |
| `client_cert_present`        | `true` if the client provided a certificate.                 |
| `client_cert_chain_verified` | `true` if the client certificate chain is verified.          |
| `client_cert_error`          | Error conditions, if any.                                    |
| `client_cert_sha256_fingerprint` | Base64-encoded SHA-256 fingerprint of the client certificate. |
| `client_cert_serial_number`  | The serial number of the client certificate.                 |
| `client_cert_spiffe_id`      | The SPIFFE ID from the subject alternative name (SAN) field.   |
| `client_cert_uri_sans`       | Comma-separated Base64-encoded list of SAN extensions of type URI. |
| `client_cert_dnsname_sans`   | Comma-separated Base64-encoded list of SAN extensions of type DNSName. |
| `client_cert_valid_not_before` | Timestamp before which the certificate is not valid.         |
| `client_cert_valid_not_after`| Timestamp after which the certificate is not valid.          |
| `client_cert_issuer_dn`      | Base64-encoded DER encoding of the full Issuer field.        |
| `client_cert_subject_dn`     | Base64-encoded DER encoding of the full Subject field.       |

## Configure custom request headers

### Using gcloud

To create a backend service with custom request headers:
```bash
gcloud compute backend-services create BACKEND_SERVICE_NAME \
    --global-health-checks \
    --global \
    --protocol HTTPS \
    --health-checks https-basic-check \
    --custom-request-header=\'HEADER_NAME:[HEADER_VALUE]'
```

To add custom headers to an existing backend service:
```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --custom-request-header=\'HEADER_1_NAME:[HEADER_1_VALUE]' \
    --custom-request-header=\'HEADER_2_NAME:[HEADER_2_VALUE]'
```

To remove all headers from a backend service:
```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME \
    --global \
    --no-custom-request-headers
```

## Configure custom response headers

### Using gcloud

For backend services:
```bash
gcloud compute backend-services (create | update) BACKEND_SERVICE_NAME \
    --custom-response-header=\'HEADER_NAME:[HEADER_VALUE]'
```

For backend buckets:
```bash
gcloud compute backend-buckets (create | update) BACKEND_BUCKET_NAME \
    --custom-response-header=\'HEADER_NAME:[HEADER_VALUE]'
```

**Example with `X-Frame-Options` header:**

```bash
gcloud compute backend-buckets update gaming-lab \
    --custom-response-header=\'X-Frame-Options: DENY'
```

**Example with `Strict-Transport-Security` header:**

```bash
gcloud compute backend-services update customer-bs-name \
    --global \
    --custom-response-header=\'Strict-Transport-Security: max-age=63072000'
```

## Limitations

*   The total size of all custom request headers for each backend service must not exceed 8 KB or 16 request headers.
*   The total size of all custom response headers for each backend service must not exceed 8 KB or 16 response headers.
