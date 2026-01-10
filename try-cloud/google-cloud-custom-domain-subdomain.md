# Custom Domain Configuration

This article is for developers who want to host server-side tagging in the same
first-party context as their website. Same-origin serving is a best practice
that lets you leverage the security and durability benefits of server-set
cookies. The below instructions apply for setting up same-origin serving
regardless of the Google tag deployed on your site (gtag.js or gtm.js).

## Overview

When you first set up a tagging server, it is hosted on a domain provided by the
cloud provider. When you use the default endpoint, it delivers data to the
server container, but runs in a third-party context. To unlock the benefits of a
first-party context, such as more durable cookies, your tagging server and your
website have to run on the same domain.

### Hosting Options

The table below illustrates how you can host a tagging server when the parent
website is hosted on `www.example.com`:

| Option                       | Same Origin (Best Practice)                                                          | Subdomain                                       | Default Domain                        |
| ---------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------- |
| **Example URL**              | `https://www.example.com/metrics`                                                    | `https://metrics.example.com`                   | `https://metrics.run.app`             |
| **Server-set Cookie Access** | Full access to security and durability benefits                                      | Full access to security and durability benefits | None. Can only set Javascript cookies |
| **Setup Complexity**         | Configure a CDN or load balancer to forward requests. May need to update DNS entries | Update DNS entries                              | Comes pre-configured                  |

Pick your implementation option to get started.

---

## Subdomain Configuration

### Prerequisites

This guide assumes that you have:

- Set up a server container in Tag Manager
- Set up a tagging server

### Configure the Custom Domain

> **Tip**: For Cloud Run deployments, Google recommends using a global external
> Application Load Balancer.

**Important**: Your server container subdomain must be separate from the
subdomain that serves your application. For example, if your application serves
web traffic at `www.example.com`, use another subdomain such as
`metrics.example.com` for your server container.

---

## Setup Steps

### Step 1: Map a Subdomain to Your App

1. In the Google Cloud Console, navigate to **Custom Domains** in your service
   settings. Make sure you're in the project that matches your container ID.

2. Click **Add a custom domain**.

3. **Verify your domain**:
   - If your domain is already verified, select it from the **Select the domain
     you want to use** section
   - Otherwise, select **Verify a new domain** from the drop-down menu
   - If you haven't verified your domain:
     - Enter your subdomain (such as `metrics.example.com`) and click **Verify**
     - A new Webmaster Central window will appear
     - Follow the steps as prompted in Webmaster Central to verify your
       ownership
     - After completing the steps, close the window and return to the **Add a
       new custom domain** page in Google Cloud Console
     - You may need to click **Refresh domains** to see your newly verified
       domain

4. In the **Point your domain to [project-ID]** section, remove the `www.`
   prefixed subdomain and **Save mappings**.

---

### Step 2: Update DNS Records at Your Domain Registrar

After you've mapped your service to a custom domain in App Engine, update the
DNS records at your domain registrar. As a convenience, GCP generates and
displays the DNS records you need to enter.

#### Retrieve DNS Records

1. To retrieve the DNS record information for your domain mappings, open the
   **Custom Domains** tab in Google Cloud Console. This page lists DNS records
   for all of the domains you have mapped to your app.

#### Configure DNS at Your Registrar

2. Log in to your account at your domain registrar and open the DNS
   configuration page.

3. Locate the host records section of your domain's configuration page and add
   each of the DNS records that you retrieved when you mapped your domain to
   your service. Enter the following information in the record fields:
   - **Record type**: Enter the record type shown in the DNS record that Google
     created for you (`A` and `AAAA`)
   - **Record name**: For `A` and `AAAA` records, enter the subdomain you
     registered. For example, enter "metrics" to map `metrics.example.com`
   - **Data**: Enter the record data (rrdata) that is shown in the DNS record
     Google created for you. For `A` or `AAAA` records, the record data is an IP
     address

   > **Note**: If there is a CNAME record shown in addition to the A and AAAA
   > records, do not map the CNAME record.

   > **Important**: There are multiple IP addresses for the `A` or `AAAA`
   > records. You should register multiple addresses to the same record, rather
   > than creating separate records for each address.

4. Save your changes in the DNS configuration page of your domain's account.

#### Verification Timeline

- In most cases, it takes only a few minutes for DNS changes to take effect, but
  in some cases it can take several hours
- You can use `dig` to confirm the DNS records have been successfully updated
- It can take up to an hour for the automatic SSL certificate to be issued

---

## Testing Your Configuration

To test your subdomain:

1. Navigate to your server-side Tag Manager container under **Admin > Container
   Settings**
2. Paste your subdomain URL into the **Server container URL** field
3. Click **Save**
4. Navigate back to your workspace
5. Click **Preview**
6. You should see the Debug panel pop up

---
