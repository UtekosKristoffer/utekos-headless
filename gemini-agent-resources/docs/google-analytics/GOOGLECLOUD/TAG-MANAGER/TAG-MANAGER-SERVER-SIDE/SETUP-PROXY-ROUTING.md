# Set Up Proxy Server Routing

This document is for developers who want to route all server-side tagging traffic through a proxy server.

---

## Before You Begin

Before you can set up proxy server routing, make sure you have:

-   A server container deployed on Cloud Run or via manual setup
    -   **Note:** App Engine deployments don't support proxying traffic
-   A proxy server deployed that supports HTTP CONNECT requests
-   The ability to allowlist specific outbound traffic from the proxy server (e.g., using VPC, Firewall, or Proxy access control lists (ACLs))

---

## Configure Proxy Server Routing

### Method 1: Manual Deployment

To forward traffic to a proxy for manual deployments:

#### 1. Define an Environment Variable

Create an environment variable accessible to the Docker image:

-   **Name:** `HTTP_PROXY`
-   **Value:** URI of the proxy server (e.g., `https://proxy.example.com` or `http://32.12.83.10:1234`)
    -   **Note:** The protocol must be either HTTP or HTTPS

#### 2. Run Your Docker Image

Run your Docker image with the new environment variable:

```bash
docker run -p 8080:8080 \
  -e CONTAINER_CONFIG=CONTAINER_CONFIG \
  -e HTTP_PROXY=PROXY_URL \
  gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable
```

**Result:** Your server-side tagging deployment sends all outbound traffic to the proxy endpoint you specified in the environment variable.

---

### Method 2: Cloud Run

To forward traffic to a proxy for Cloud Run deployments:

#### Steps

1.  Open Cloud Run
2.  Choose your server-side tagging Cloud Run instance
3.  Click **EDIT & DEPLOY NEW REVISION**
    -   The deploy revision screen opens
4.  Under **Container(s)**, choose your server container
    -   A new screen with the container settings opens
5.  To expand the service configuration, select the **Variables & Secrets** tab
6.  Click the **Add Variable** button and add the following environment variable:
    -   **Name:** `HTTP_PROXY`
    -   **Value:** URI of the proxy server (e.g., `https://proxy.example.com:3333` or `http://32.12.83.10`)
        -   **Note:** The protocol must be either HTTP or HTTPS
7.  Click **Done**
8.  Confirm your revisions and click **Deploy**

**Result:** Your server-side tagging deployment sends all outbound traffic to the proxy endpoint you specified in the environment variable.

---

## Verify the Proxy Server Setup

To verify your proxy requests setup, check both Google Tag Manager and your proxy server configuration.

### Verify Your Server Container Proxies Requests

1.  Open Google Tag Manager
2.  Open your server container
3.  Open **Preview mode**
4.  In the **Requests** tab:
    -   Ensure your client claims the incoming request
    -   Ensure that your tags and variables successfully send outgoing HTTP requests
    -   To check whether a request was sent through a proxy server, click a HTTP request to view the **HTTP Request Details**

### Verify Your Proxy Setup

Check your network and proxy server logs. At a minimum you should see successful requests to the following endpoints:

-   `https://www.googletagmanager.com`
-   `https://tagmanager.google.com`

Check if there are requests to other endpoints. Depending on the server-side tagging features you use, you may also see requests made to other endpoints, such as:

-   `www.google-analytics.com`
-   `bigquery.googleapis.com`
-   Third-party endpoints

**Action:** Allow-list any other endpoints that are needed for your tagging setup.

---

## Optional: Allow-List Outbound Traffic from Your Proxy Server

If you block outbound traffic from your network or from your proxy server, you must allowlist Google Tag Manager domains for your tagging server instance to work. How you allowlist outbound traffic depends on your network environment and proxy software. Before you begin allowlisting endpoints, make sure that you understand your network topology.

### Required Domains

The following domains are used to fetch, preview, and debug your Google Tag Manager container:

-   `https://www.googletagmanager.com`
-   `https://tagmanager.google.com`
-   `${Preview server URL}`

**Note:** If you host your Preview server on a different network than your proxy server or have restrictive network rules, allowlist outbound traffic from the proxy to the Preview server. The Preview server URL is defined when you deploy your server container.

---

## Optional: Use BASIC Authentication with Your Proxy Server

If your organization requires authentication, you can use BASIC authentication with all server types.

### Configuration

To use BASIC authentication, include the credentials (username/password) as part of the proxy server URL in the following format:

```
HTTP_PROXY=http(s)://USER_NAME:PASSWORD@PROXY_URL
```

Each request to the proxy sets the username and password in the `Proxy-Authorization` header as Base64 values.

### Security Best Practices

**Caution:** Follow your cloud provider's best practices when storing and providing the `HTTP_PROXY` environment variable with BASIC authentication to the tagging server.

**For Cloud Run:**

-   Store the proxy endpoint credentials in Secret Manager
-   Secret Manager gives Cloud Run access to the secret at startup time and resolves the value
-   Learn how to configure secrets in Cloud Run

---

## Optional: Disable the Proxy for Specific Hosts

The `NO_PROXY` environment variable lets you define a comma-delimited list of hostnames that can't be sent through the proxy server.

### Example

Given: `NO_PROXY=example.com,169.254.169.254,diagnostics.example2.com:3131`

The sGTM container doesn't proxy any of the following requests:

-   `http://example.com`, `https://sub.example.com`, `https://other.example.com:123`
-   `http://169.254.169.254`, `https://169.254.169.254`, `http://169.254.169.254:123`
-   `http://diagnostics.example2.com:3131`, `https://diagnostics.example2.com:3131`

### Tip

If you integrate with BigQuery or Firestore and you deploy your tagging server to Google Cloud, you may need to define an exception for Google's metadata server with:

```
NO_PROXY=169.254.169.254,metadata.google.internal
```