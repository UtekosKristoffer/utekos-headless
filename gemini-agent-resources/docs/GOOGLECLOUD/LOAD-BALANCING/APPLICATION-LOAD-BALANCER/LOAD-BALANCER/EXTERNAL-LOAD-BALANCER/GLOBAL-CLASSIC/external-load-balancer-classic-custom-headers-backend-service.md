# Create custom headers in backend services

This page describes how to configure custom headers in backend services used by
the classic Application Load Balancer.

Custom request and response headers let you specify additional headers that the
load balancer can add to HTTP(S) requests and responses. Depending on the
information detected by the load balancer, these headers can include information
such as:

- Latency to the client
- Geographic location of the client's IP address
- Parameters of the TLS connection

Custom request headers are supported for backend services, while custom response
headers are supported for backend services and backend buckets.

> The load balancer adds certain headers by default to all HTTP(S) requests and
> responses. For more information, see
> [Target proxies](https://cloud.google.com/load-balancing/docs/target-proxies).

---

## How custom headers work

- When the load balancer forwards a request to the backend, it adds request
  headers.
- The load balancer sets response headers before returning responses to the
  client.

To enable custom headers, you specify a list of headers in a backend service or
backend bucket. You specify each header as a `header-name:header-value` string.

**Header names must:**

- Be a valid HTTP header-field name (per RFC 7230).
- Not be `X-User-IP` or `CDN-Loop`.
- Not be a hop-by-hop header (`Keep-Alive`, `Transfer-Encoding`, etc.).
- Not begin with `X-Google`, `X-Goog-`, `X-GFE`, or `X-Amz-`.
- Not appear more than once in the list of added headers.

**Header values must:**

- Be a valid HTTP header field definition (per RFC 7230).
- Can be blank.
- Can include one or more variables, enclosed by curly braces (`{}`), that
  expand to values provided by the load balancer.

The `gcloud` command-line tool has a flag for specifying request headers:
`--custom-request-header`.

```bash
--custom-request-header='HEADER_NAME:[HEADER_VALUE]'
```

Example with two variables:

```bash
--custom-request-header='X-Client-Geo-Location:{client_region},{client_city}'
```

For a client in Mountain View, California, the load balancer adds a header like
this: `X-Client-Geo-Location:US,Mountain View`

---

## Variables supported with header values

The following variables can appear in custom header values.

| Variable                    | Description                                                                          |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| `cdn_cache_id`              | Location code and ID of the cache instance.                                          |
| `cdn_cache_status`          | Current cache status (`hit`, `miss`, `revalidated`, etc.).                           |
| `origin_request_header`     | Reflects the value of the `Origin` header for CORS use cases.                        |
| `client_rtt_msec`           | Estimated round-trip time between the load balancer and the client, in milliseconds. |
| `client_region`             | The country/region associated with the client's IP address (e.g., `US`).             |
| `client_region_subdivision` | Subdivision (e.g., a state) of the country (e.g., `USCA`).                           |
| `client_city`               | Name of the city from which the request originated.                                  |
| `client_city_lat_long`      | Latitude and Longitude of the city.                                                  |
| `client_ip_address`         | The client's IP address.                                                             |
| `client_port`               | The client's source port.                                                            |
| `client_encrypted`          | `true` if the connection is encrypted (HTTPS, HTTP/2, HTTP/3).                       |
| `client_protocol`           | HTTP protocol used (`HTTP/1.0`, `HTTP/1.1`, `HTTP/2`, `HTTP/3`).                     |
| `device_request_type`       | The client's device, derived from `User-Agent`.                                      |
| `server_ip_address`         | The IP address of the load balancer that the client connects to.                     |
| `server_port`               | The destination port number that the client connects to.                             |
| `tls_sni_hostname`          | Server Name Indication (SNI) provided by the client.                                 |
| `tls_version`               | TLS version negotiated (e.g., `TLSv1.2`).                                            |
| `tls_cipher_suite`          | Cipher suite negotiated during the TLS handshake.                                    |
| `tls_ja3_fingerprint`       | JA3 TLS/SSL fingerprint.                                                             |
| `tls_ja4_fingerprint`       | JA4 TLS/SSL fingerprint.                                                             |
| `user_agent_family`         | The client's browser type, derived from `User-Agent`.                                |

The load balancer expands variables to empty strings when it cannot determine
their values.

### Mutual TLS custom headers

The following additional header variables are available if mutual TLS (mTLS) is
configured on the `TargetHttpsProxy`.

| Variable                         | Description                                                               |
| :------------------------------- | :------------------------------------------------------------------------ |
| `client_cert_present`            | `true` if the client has provided a certificate.                          |
| `client_cert_chain_verified`     | `true` if the client certificate chain is verified.                       |
| `client_cert_error`              | Predefined strings representing error conditions.                         |
| `client_cert_sha256_fingerprint` | Base64-encoded SHA-256 fingerprint of the client certificate.             |
| `client_cert_serial_number`      | The serial number of the client certificate.                              |
| `client_cert_spiffe_id`          | The SPIFFE ID from the subject alternative name (SAN) field.              |
| `client_cert_uri_sans`           | Comma-separated Base64-encoded list of SAN extensions of type URI.        |
| `client_cert_dnsname_sans`       | Comma-separated Base64-encoded list of SAN extensions of type DNSName.    |
| `client_cert_valid_not_before`   | Timestamp before which the client certificate is not valid.               |
| `client_cert_valid_not_after`    | Timestamp after which the client certificate is not valid.                |
| `client_cert_issuer_dn`          | Base64-encoded DER encoding of the full Issuer field.                     |
| `client_cert_subject_dn`         | Base64-encoded DER encoding of the full Subject field.                    |
| `client_cert_leaf`               | The client leaf certificate for an established mTLS connection.           |
| `client_cert_chain`              | The comma-delimited list of certificates in the client certificate chain. |

---

## Configure custom request headers

To add or remove custom request headers to an existing backend service:

1.  Go to the
    [Load balancing summary page](https://console.cloud.google.com/net-services/loadbalancing/advanced/backendServices)
    and click **Backends**.
2.  Click the name of a backend service and then click **Edit**.
3.  Click **Advanced configurations**.
4.  Under **Custom request headers**, click **Add header** to add a new header,
    or click the **X** to remove an existing one.
5.  Enter the **Header name** and **Header value**.
6.  Click **Save**.

---

## Configure custom response headers

The process is the same as for request headers, but you will use the **Custom
response headers** section in the backend service configuration.

### Set response headers for Cloud Storage

To set HTTP headers on responses from Cloud Storage (like
`Cross-Origin Resource Policy`), you can use custom headers for Cloud CDN with
Cloud Storage by configuring them at the backend bucket level.

---

## Use custom headers with Google Cloud Armor

If you configure a Google Cloud Armor security policy to insert a custom header
with the same name as your load balancer's custom headers, the value specified
in the Cloud Armor policy will be **overwritten** by the value from the load
balancer. To avoid this, use different names.

---

## Limitations

The following limitations apply to custom headers used with global load
balancers:

- The total size of all custom request headers for each backend service must not
  exceed 8 KB or 16 headers.
- The total size of all custom response headers for each backend service must
  not exceed 8 KB or 16 headers.
