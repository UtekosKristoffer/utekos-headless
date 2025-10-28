# Setting Up Your Email

Email is essential for receiving notifications and communicating with customers.
This guide covers configuring your **store owner email** and **sender email**.

---

## Email Types

### Store Contact Address

The email used when signing up for Shopify. Receives:

- Exported product lists
- Order exports
- Customer list exports

### Sender Email

Your customer-facing address where:

- Customers contact you directly
- Automatic order notifications originate
- Marketing emails are sent from

---

## Authentication Requirements

> **Important:** Add a DMARC policy and Shopify's CNAME records to connect to
> Shopify's SPF and DKIM records, ensuring email delivery to customers.

---

## Change Your Store Email Address

**Default:** The email used during Shopify signup. This is where Shopify
contacts you and sends exported files.

### Steps (Desktop)

1. Go to **Settings → General**
2. Find **Store details** section
3. Click the pencil icon next to your store name
4. Update **Store email** or **Account email**
5. Click **Save**
6. Open verification email from Shopify
7. Click the verification link

> **Note:** If single login isn't set up, **Account email** displays instead of
> **Store email**.

---

## Change Your Sender Email Address

> ⚠️ **Gmail & Yahoo Requirement (Feb 1, 2024):**  
> Domain authentication and DMARC record required for branded email addresses.  
> Without action, sender email rewrites to `store+123@shopifyemail.com` (where
> `123` is your unique store number).

### Steps

1. Go to **Settings → Notifications**
2. Enter your email in **Sender email** section
3. Click **Save**

### Using a Forwarding Address

If you have a Shopify-managed custom domain:

1. Set up email forwarding to create a custom address
2. Change **Sender email** to your forwarding address
3. Customer replies forward to your configured personal email

> ⚠️ **Avoid these terms in sender email:**  
> `no-reply`, `do-not-reply`, `noreply` — many hosts automatically reject these
> addresses.

> **Note:** Cannot reply from custom domain unless using third-party email
> hosting. If domain expires, forwarded email becomes unavailable as sender
> email.

---

## Authenticate Your Third-Party Domain

> ⚠️ **Gmail & Yahoo Requirement (Feb 1, 2024):**  
> Authentication prevents spam flagging and ensures delivery.

### Required Records

Add these to your third-party domain DNS:

| Record Type | Purpose                         |
| ----------- | ------------------------------- |
| **CNAME**   | Connect to Shopify SPF and DKIM |
| **DMARC**   | Email authentication policy     |

Contact your domain provider if you need help modifying records.

---

### Add CNAME Records

> ⚠️ **Requirement:** Store must be on active paid plan (not available for
> development or Pause and Build stores).

**Prerequisites:**

- Login credentials for domain provider
- Sender email address

#### Steps

1. Go to **Settings → Notifications**
2. Click **authenticate your domain** in **Sender email** section
3. Enter new CNAME records into third-party domain manager

**Verification:**

- Changes take up to 48 hours
- If verification fails, ensure DNS records match those provided in Shopify
  admin
- Contact domain provider for assistance

---

### Add DMARC Record

Required by Gmail, Yahoo, and other providers for branded email addresses.

**Resources:**

- [DMARC Record Checker](https://example.com)
- [Add Your DMARC Record](https://example.com)

> ⚠️ **Note:** Steps below are general. Default Shopify DMARC is
> `v=DMARC1; p=none`.  
> Other platforms may require different settings. For Apple Branded Mail, see
> [Apple's verification guide](https://example.com).

#### Steps

1. Log into domain host management console
2. Navigate to DNS records page
3. Add TXT record for DMARC:
   - **Record name:** `_dmarc` (some hosts auto-add domain:
     `_dmarc.example.com`)
   - **Value:** `v=DMARC1; p=none;`
4. Verify formatting is correct

**DMARC Policy Options:**

| Policy         | Action                      |
| -------------- | --------------------------- |
| `p=none`       | No action (monitoring only) |
| `p=quarantine` | Move to spam folder         |
| `p=reject`     | Block email entirely        |

---

## Email Forwarding

Directs emails from custom domain to existing email account (Gmail, Outlook,
Yahoo, etc.).

**Example:**

- Own `example.com`
- Create `info@example.com`
- Forward to `john@gmail.com`
- Customers email `info@example.com` → arrives at `john@gmail.com`

---

# Domains

## Domain Terminology

### A Record

**Address Record** — DNS setting linking domain to IPv4 address.

- **Shopify default IPv4:** `23.227.38.65`
- **Regional variations:** `23.227.38.32`, `23.227.38.36`, `23.227.38.65-74`

> **Note:** Your A record may show different host ID after connecting (e.g.,
> `23.227.38.32`) — this is normal and region-dependent.

---

### AAAA Record

**Quad-A Record** — DNS setting linking domain to IPv6 address.

- **Shopify condensed IPv6:** `2620:0127:f00f:5::`
- **Shopify expanded IPv6:** `2620:0127:f00f:0005:0000:0000:0000:0000`

> Use expanded version if provider rejects condensed format.

---

### CAA Record

**Certification Authority Authorization** — Specifies which certificate
authorities can issue certificates for your domain.

---

### CNAME Record

**Canonical Name Record** — DNS alias pointing subdomains to another domain.

> **Key Difference:** A record points to IP address; CNAME points to domain
> name.

**Common Use:** Point subdomain to external service (Office 365, Blogger, etc.)

---

### DKIM Record

**Domain Keys Identified Mail** — Email authentication via digital signature.

Proves email was sent and authorized by domain owner. Adding Shopify DKIM
records prevents spam flagging.

---

### DMARC Record

**Domain-based Message Authentication, Reporting, and Conformance** — Email
authentication standard.

Email must pass authentication checks:

| Policy         | Result      |
| -------------- | ----------- |
| `p=none`       | No action   |
| `p=quarantine` | Spam folder |
| `p=reject`     | Block email |

---

### DNS

**Domain Name Systems** — Database translating domain names to IP addresses.

**Example:** `shopify.com` → `23.227.38.65`

> **Note:** Cannot change DNS for `myshopify.com` domain. Add custom domain to
> configure DNS records for third-party services or subdomains.

**Other terms:** DNS records, DNS settings, resource records, DNS file zone

---

### Domain Name

Website address displayed in browser address bar, linked to specific IP address.

---

### Domain Provider

Company registering your domain (subscription-based). When buying through
Shopify, Shopify is your provider working with partners like OpenSRS.

> ⚠️ **Support:** Contact Shopify Support for domain management help — not
> OpenSRS or registry.

**Other terms:** domain reseller, registrar, registry, host

---

### Email Hosting

Service enabling custom email addresses for sending/receiving messages.

> Not provided by Shopify — connect third-party email hosting to custom domain.

---

### Email Forwarding

Redirects emails from one address to another.

**Shopify-managed domains:** Unlimited custom addresses forwarding to
third-party accounts.

**Example:** `info@example.com` → `john@gmail.com`

---

### HTTP Strict Transport Security (HSTS)

Security mechanism ensuring browser-only HTTPS connections.

- **Shopify default:** 90-day policy
- **After leaving Shopify:** Remains active for 90 additional days

---

### ICANN

**Internet Corporation for Assigned Names and Numbers** — Governs DNS and
internet protocols.

**IANA:** ICANN's operational affiliate (Internet Assigned Numbers Authority)

---

### International Domain

Country/region-specific URL for localized languages and currencies.

**Requirements:** Shopify plan or higher

**Other terms:** regional domain, regional subdomain

---

### International Targeting

Displays correct store version to local customers.

**Example:** US-only sales → set target country to United States

Configure per domain/subdomain in Google Search Console.

**Other terms:** geo-targeting

---

### IP Address

**Internet Protocol Address** — Unique numerical identifier for
internet-connected devices.

**Shopify third-party domain:** `23.227.38.65`

**Shopify-managed domain options:**

- `23.227.38.32`
- `23.227.38.36`
- `23.227.38.65` to `23.227.38.74`

> Domain can switch between these IPs anytime. Check current IP in **DNS
> Settings → A RECORD → Points to** value.

---

### MX Record

**Mail Exchange Record** — DNS setting routing email through custom domain.

Supports multiple records for backup servers.

**Other terms:** Mail eXchanger record, mail server record

---

### Primary Domain

Domain displayed in address bar when customers browse your store.

- **Options:** Root domain or subdomain
- **Limit:** One primary domain per store
- **Default:** Pre-generated `myshopify.com` domain
- **Changes allowed:** Two `.myshopify.com` domain changes total

> Initial store name counts as first change.

---

### Root Domain

Domain purchased from provider with TLD extension (`.com`, `.org`, `.net`) but
no prefix.

**Example:** `shopify.com`

**Other terms:** base domain, top-level domain and second-level domain, apex
domain

---

### SPF Record

**Sender Policy Framework** — Verifies sender email for automatic customer
notifications.

**Benefits:**

- Prevents spam flagging
- Removes "via Shopify" note
- Displays sender email instead of `store@shopifyemail.com`

---

### SSL Certificate

See **TLS Certificate**

---

### Subdirectory

Website section defined by `/` after domain name.

**Example:** `shopify.com/pricing` → `/pricing` is subdirectory

**Store examples:** `/collections`, `/products`, `/pages`

> Cannot edit subdirectory names — remain constant across all domains.

---

### Subdomain

Root domain prefix for organizing website content.

**Example:** `help.shopify.com` → `help.` is subdomain, `shopify.com` is root

**Use case:** Shopify plan or higher — create regional subdomains for
international markets.

---

### Time to Live (TTL)

Determines DNS record update frequency.

**Example:** 86400 seconds = 24-hour update cycle

Changing TTL affects subsequent change speed.

---

### Top-Level and Second-Level Domains

Root domain hierarchy components.

**Example:** `shopify.com`

- **TLD:** `.com`
- **Second-level:** `shopify`

---

### TLS Certificate

**Transport Layer Security** — Protocol creating secure server-browser
connection.

**Features:**

- Encrypts store content
- Publishes via HTTPS
- Displays padlock icon in address bar
- Always active while domain connected

**Other terms:** Transport Layer Security, Secure Sockets Layer, SSL

---

### TXT Record

**Text Record** — DNS setting containing text information for external services.

**Common use:** Domain ownership verification for third-party services.

---

### WHOIS Privacy

Service hiding domain owner information from WHOIS lookups.

- **Replaces contact info:** contactprivacy.com details
- **Availability:** Purchase from domain provider
- **Shopify domains:** Included free

---

# Configuration Examples

## Shopify Notifications Settings

```
Sender email: erling@utekos.no
Status: Domain authentication pending (up to 24 hours)
Display: store+63421546744@shopifyemail.com (until authenticated)
```

### Authentication Records Required

Create 4 CNAME records with your domain provider:

| #   | Type  | Host Name         | Value                                        |
| --- | ----- | ----------------- | -------------------------------------------- |
| 1   | CNAME | `54o._domainkey`  | `dkim1.eefb5840943.p487.email.myshopify.com` |
| 2   | CNAME | `54o2._domainkey` | `dkim2.eefb5840943.p487.email.myshopify.com` |
| 3   | CNAME | `54o3._domainkey` | `dkim3.eefb5840943.p487.email.myshopify.com` |
| 4   | CNAME | `mailer54o`       | `eefb5840943.p487.email.myshopify.com`       |

---

## Current Domains

| Domain                      | Status  | Actions   |
| --------------------------- | ------- | --------- |
| `erling-7921.myshopify.com` | Primary | Connected |

> **Available:** Change to new `.myshopify.com` domain or buy/connect custom
> domain.

---

# One.com Integration Guide

## Creating a CNAME Record

**CNAME (Canonical name):** Alias/nickname for another domain.

**Key Difference:**

- **A record:** Points to IP address
- **CNAME:** Points to domain name

**Common use:** Point subdomain to external service (Office 365, Blogger)

### Steps

1. Log into one.com Control Panel
2. Click **DNS settings** on **Advanced settings** tile
3. Go to **DNS records**
4. Under **Create new record**, click **CNAME**
5. Enter details:
   - **Hostname:** Subdomain (e.g., `www`)
   - **Is an alias of:** Target domain name (not IP)
   - **TTL:** Optional (defaults to 3600 seconds)
6. Click **Create record**

**Example:**  
Making `blog.one-example.net` alias of `ghs.google.com` for Blogger integration.

---

## Connect Domain to Shopify

Manual connection via DNS settings.

> **Note:** Shopify requirements may change — verify their official guide
> alongside these steps.

### Step 1: Access DNS Settings

1. Log into one.com Control Panel
2. Scroll to **Advanced settings** → **DNS settings**
3. Go to **DNS records** tab

---

### Step 2: Create A Record

1. Choose **A** below **Create new record**
2. Leave **Hostname** empty
3. Enter Shopify IPv4: `23.227.38.65`
4. Leave **TTL** empty
5. Click **Create record**

> ⚠️ **Limitation:** Only one custom record per location. Remove existing A
> record (empty hostname) pointing to different IP before adding Shopify's.

---

### Step 3: Create AAAA Record

1. Choose **AAAA** below **Create new record**
2. Leave **Hostname** empty
3. Enter Shopify IPv6: `2620:0127:f00f:5::`
4. Leave **TTL** empty
5. Click **Create record**

---

### Step 4: Create CNAME Record

1. Choose **CNAME** below **Create new record**
2. **Hostname:** `www`
3. **Is an alias of:** `shops.myshopify.com` (no trailing period — auto-added)
4. Leave **TTL** empty
5. Click **Create record**

---

### Step 5: Complete Setup

- Connection establishes within 90 minutes
- Verify domain and connection in Shopify dashboard
- See Shopify's official guide for verification steps

---

## Sending Emails from Website

Two methods available for script-based email sending.

### Method 1: PHP Mail Function (Recommended)

Use [PHP's mail function](https://example.com).

**Requirement:** `To` or `From` must be active email account on your one.com
domain.

---

### Method 2: SMTP

**Configuration:**

| Setting                | Value                           |
| ---------------------- | ------------------------------- |
| **Outgoing server**    | `mailout.one.com`               |
| **Port (recommended)** | 587 with STARTTLS               |
| **Port (SSL/TLS)**     | 465                             |
| **Port (unencrypted)** | 25 with STARTTLS or none        |
| **Authentication**     | Your email address and password |

**Requirements:**

- `From` address must be active email account on your one.com domain
- Must match authentication email account

---
