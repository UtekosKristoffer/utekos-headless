# Mapping Custom Domains to Cloud Run

You can set up a custom domain rather than the default address that Cloud Run provides for a deployed service.

## Available Methods

There are a few ways to set up a custom domain for a Cloud Run service:

1.  **Use a global external Application Load Balancer** (Recommended)
2.  **Use Firebase Hosting**
3.  **Use Cloud Run domain mapping** (Limited availability and Preview)

**Note:** You can map multiple custom domains to the same Cloud Run service.

---

## Before You Begin

Purchase a new domain, unless you already have one that you want to use. You can use any domain name registrar.

---

## Method 1: Map Using Global External Application Load Balancer (Recommended)

### Overview

With this option, you add a global external Application Load Balancer in front of your Cloud Run service and configure a custom domain at the load balancer level.

### Advantages

-   Gives you a lot of control around your custom domain setup
-   Lets you use your own TLS certificate
-   Allows routing specific URL paths to the Cloud Run service
-   Lets you configure Cloud CDN for caching
-   Enables Google Cloud Armor for additional security
-   Supports mapping multiple services to a dynamic hostname or path in your custom domain URL pattern for a single load balancer (e.g., `<service>.example.com`) using URL masks

### Documentation

Refer to the documentation on setting up a global external Application Load Balancer with Cloud Run.

---

## Method 2: Map Using Firebase Hosting

### Overview

**Note:** Firebase Hosting is not covered by Google Cloud Terms of Service. See [Terms of Service for Firebase Services](https://firebase.google.com/terms/).

With this option, you configure Firebase Hosting in front of your Cloud Run service and connect a domain to Firebase Hosting.

### Advantages

-   Low price
-   Optionally lets you host and serve static content alongside the dynamic content served by your Cloud Run service

### Setup Steps

#### 1. Add Firebase to Your Google Cloud Project

#### 2. Install the Firebase CLI

#### 3. Create Firebase Configuration

In a folder different from the source code of your service, create a `firebase.json` file with the following content:

```json
{
  "hosting": {
    "rewrites": [
      {
        "source": "**",
        "run": {
          "serviceId": "SERVICE_NAME",
          "region": "REGION"
        }
      }
    ]
  }
}
```

Replace `SERVICE_NAME` and `REGION` with the name and region of your Cloud Run service.

#### 4. Deploy the Firebase Hosting Configuration

```bash
firebase deploy --only hosting --project PROJECT_ID
```

#### 5. Connect a Custom Domain to Firebase Hosting

Read more about [Firebase Hosting and Cloud Run](https://firebase.google.com/docs/hosting/cloud-run).

---

## Method 3: Map Using Cloud Run Domain Mapping (Preview)

### Preview Status

**Preview — Cloud Run domain mappings**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the [launch stage descriptions](https://cloud.google.com/products#launch_stages).

### Cloud Run Domain Mapping Limitations

-   **Not Production-Ready:** Cloud Run domain mappings are in the preview launch stage. Due to latency issues, they are not production-ready and are not supported at General Availability. At the moment, this option is not recommended for production services.
-   **Automatic SSL Certificate:** A Google-managed certificate for HTTPS connections is automatically issued and renewed when you map a service to a custom domain.
-   **Certificate Provisioning Time:** Provisioning the SSL certificate usually takes about 15 minutes but can take up to 24 hours.
-   **TLS Versions:** You cannot disable TLS 1.0 and 1.1. If this is an issue, you can use Firebase Hosting or Cloud Load Balancing to enable TLS 1.2-only traffic.
-   **Self-Managed Certificates:** You cannot upload and use your own (self-managed) certificates.
-   **Character Limit:** Cloud Run domain mappings are limited to 64 characters.
-   **No Wildcard Certificates:** You cannot use wildcard certificates with this feature.
-   **Path Mapping:** You can only map a domain to `/`, not to a specific URL path like `/users`.

### Supported Regions

Domain mapping is available in the following regions:

-   `asia-east1`
-   `asia-northeast1`
-   `asia-southeast1`
-   `europe-north1`
-   `europe-west1`
-   `europe-west4`
-   `us-central1`
-   `us-east1`
-   `us-east4`
-   `us-west1`

**Note:** To map custom domains in other regions, you must use one of the other mapping options.

### Domain Types

You can map:

-   A domain, such as `example.com`
-   A subdomain, such as `subdomain.example.com`

### How It Works

When you use Cloud Run domain mappings, you map a custom domain to your service, then update your DNS records.

**Note:** If you have already configured domain forwarding on a third-party load balancer, you don't need to use Cloud Run domain mapping. Ensure that the forwarding settings on the third-party load balancer are set correctly.

---

## Map a Custom Domain to a Service

You can use the Google Cloud console, gcloud CLI, or Terraform to map a custom domain to a service.

### Using Google Cloud Console

1.  Open the domain mappings page in the Google Cloud console: [Domain mappings page]
2.  Click **Add Mapping**
    -   If your display window is too small, the Add Mapping button isn't displayed and you must click the three-dot vertical ellipse icon in the corner of the page
3.  From the drop-down list, select the service you are mapping the custom domain to
4.  Select **Cloud Run Domain Mappings**
5.  In the Add mapping form, select **Verify a new domain**
6.  In the **Base domain to verify** field, you must verify the ownership of a domain before you can use it, unless you purchased your domain from Google
    -   If you want to map `subdomain.example.com` or `subdomain1.subdomain2.example.com`, you must verify ownership of `example.com`
    -   For more information on verifying domain ownership, refer to [Search Console help](https://support.google.com/webmasters/answer/9008080)
7.  Click **Continue**
8.  After domain verification is finished, click **Continue verification and close**
9.  Update your DNS records at your domain registrar website using the DNS records displayed in the last step
    -   You can display the records at any time by clicking **DNS Records** in the "..." action menu for a domain mapping
10. Click **Done**

### Using gcloud CLI

#### 1. Verify Domain Ownership

You must verify domain ownership the first time you use that domain in the Google Cloud project, unless you purchased your custom domain from Google.

**Check if domain is already verified:**

```bash
gcloud domains list-user-verified
```

**If verification is needed:**

```bash
gcloud domains verify BASE-DOMAIN
```

Where `BASE-DOMAIN` is the base domain you want to verify. For example, if you want to map `subdomain.example.com`, you must verify the ownership of `example.com`.

In Search Console, complete domain ownership verification. For more information, refer to [Search Console help](https://support.google.com/webmasters/answer/9008080).

#### 2. Map Service to Custom Domain

```bash
gcloud beta run domain-mappings create --service SERVICE --domain DOMAIN
```

Replace:

-   `SERVICE` with your service name
-   `DOMAIN` with your custom domain, for example, `example.com` or `subdomain.example.com`

**Note:** If you are using a domain that is already mapped to another service, use the `--force-override` flag when you create the domain mapping. That domain will be removed from the other service to point to this one.

### Using Terraform

To learn how to apply or remove a Terraform configuration, see [Basic Terraform commands](https://developer.hashicorp.com/terraform/cli/commands).

#### 1. Create Cloud Run Service

To create a Cloud Run service, add the following to your existing `main.tf` file:

```hcl
resource "google_cloud_run_v2_service" "default" {
  name     = "custom-domain" # Replace with your service name
  location = "us-central1"

  deletion_protection = false # set to true to prevent destruction of the resource

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" # Replace with your container image
    }
  }
}
```

Replace:

-   `custom-domain` with your Cloud Run service name
-   `us-docker.pkg.dev/cloudrun/container/hello` with a reference to your container image
    -   If you use Artifact Registry, the repository `REPO_NAME` must already be created
    -   The URL has the shape `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG`

#### 2. Map Service to Custom Domain

```hcl
data "google_project" "project" {}

resource "google_cloud_run_domain_mapping" "default" {
  name     = "verified-domain.com"
  location = google_cloud_run_v2_service.default.location
  metadata {
    namespace = data.google_project.project.project_id
  }
  spec {
    route_name = google_cloud_run_v2_service.default.name
  }
}
```

Replace `verified-domain.com` with your custom verified domain, for example, `example.com` or `subdomain.example.com`.

---

## Add Your DNS Records at Your Domain Registrar

After you've mapped your service to a custom domain in Cloud Run, you must update your DNS records at your domain registrar. As a convenience, Cloud Run generates and displays the DNS records you must enter. You must add these records that point to the Cloud Run service at your domain registrar for the mapping to go into effect.

If you're using Cloud DNS as your DNS provider, see [Adding a record](https://cloud.google.com/dns/docs/records#adding_a_record).

**Note:** Some third-party CDN providers might inadvertently intercept validation requests, preventing them from reaching the Cloud Run service and causing the domain mapping to fail or its certificate to fail to renew. For example, if you are using Cloudflare CDN, you must turn off the "Always use https" option in the "Edge Certificates" tab of the SSL/TLS tab.

### Retrieve DNS Record Information

#### Using Google Cloud Console

1.  Go to the Cloud Run domain mappings page: [Domain mappings page]
2.  Click the three-dot vertical ellipse icon to the right of your service
3.  Click **DNS RECORDS** to display all the DNS records

### Update DNS Records at Your Registrar

1.  Sign in to your account at your domain registrar and then open the DNS configuration page
2.  Locate the host records section of your domain's configuration page
3.  Add each of the resource records that you received when you mapped your domain to your Cloud Run service

**When adding DNS records:**

-   Select the type returned in the DNS record: A, or AAAA, or CNAME
-   Use the name `www` to map to `www.example.com`
-   Use the name `@` to map `example.com`

4.  Save your changes in the DNS configuration page

**DNS Propagation Time:**

-   In most cases, it takes only a few minutes for these changes to take effect
-   In some cases it can take up to several hours, depending on the registrar and the Time-To-Live (TTL) of any previous DNS records for your domain
-   You can use a `dig` tool, such as the [online dig version](https://www.google.com/search?q=online+dig), to confirm the DNS records have been successfully updated

5.  Test for success by browsing to your service at its new URL, for example, `https://www.example.com`
    -   It can take several minutes for the managed SSL certificate to be issued

---

## Add Verified Domain Owners to Other Users or Service Accounts

When a user verifies a domain, that domain is only verified to that user's account. This means that only that user can add more domain mappings that use that domain. So, to enable other users to add mappings that use that domain, you must add them as verified owners.

**Note:** A verified domain owner can override existing domain mappings from other projects after confirmation.

### Steps to Add Verified Owners

If you need to add verified owners of your domain to other users or service accounts, you can add permission through the Search Console page:

1.  Navigate to the following address in your web browser: `https://search.google.com/search-console/welcome`
2.  Under **Properties**, click the domain that you want to add a user or service account to
3.  Go to the **Verified owners** list, click **Add an owner**, and then enter a Google Account email address or service account ID

**To view a list of your service accounts:**

-   Open the Service Accounts page in the Google Cloud console: [Go to Service Accounts page]

---

## Delete a Cloud Run Domain Mapping

You can use the Google Cloud console or the gcloud CLI to delete a domain mapping.

### Using Google Cloud Console

1.  Open the Domain mappings page in the Google Cloud console: [Domain mappings page]
2.  In the Domain mappings page, select the domain mapping that you want to delete
3.  Click **Delete**

### Using gcloud CLI

(Follow gcloud CLI deletion commands as documented)

---

## Using Custom Domains with Authenticated Services

Authenticated services are protected by IAM. Such Cloud Run services require client authentication that declares the intended recipient of a request at credential-generation time (the audience).

**Audience** is usually the full URL of the target service, which by default for Cloud Run services is a generated URL ending in `run.app`.

If you use a custom domain, however, you can configure a custom audience so that your service accepts your custom domain as a valid audience.