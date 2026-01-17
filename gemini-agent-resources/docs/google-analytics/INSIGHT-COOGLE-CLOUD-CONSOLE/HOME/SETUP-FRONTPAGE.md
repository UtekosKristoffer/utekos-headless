# Welcome | FrontPage GCP UI

## Welcome

## Google Cloud Console Resource

**Name**

- Utekos Marketing Cloud

**Type**

- Project

**ID**

- utekos-marketing-cloud

**Ancestry**

- utekos.no > Utekos Marketing Cloud

### Set up Google Cloud for your organization

> 4 of 10 tasks completed

Set up a foundation for running production workloads that uses Google's best practices. This foundation is customizable and integrated with Terraform. Setup task status

1.  Create an organization - ✓
2.  Configure users and groups - ✓
3.  Assign administrative access - ✓
4.  Set up billing - ✓
5.  Configure hierarchy and assign access - (undone)
6.  Enable security capabilities - (undone)
7.  Set up central logging and monitoring - (undone)
8.  Set up VPC networks - (undone)
9.  Configure hybrid connectivity - (undone)
10. Choose a support model - (undone)

---

Set up your hierarchy, assign access, and deploy or download from here. This task enables you to set up a hierarchy of folders and projects and assign access to people within your organization. At the end, you can deploy this configuration directly from here, or download it to a Terraform file and deploy locally.

**Good news!** You’re logged in as someone who can perform these steps. Anyone at your organization in the `gcp-organization-admins@utekos.no` group (created in Task 2: Users & groups) can also perform these steps. By continuing, Google will set up a configuration project and grant necessary roles for you in order to complete these steps.

### Overview

In this task, you will create a resource hierarchy–a basic structure for folders and projects. You will also assign access to them.

**Who performs this task?**

To perform this task you need to have org admin access: a member of the group `gcp-organization-admins@utekos.no` which was set up in Task 2: Users & groups.

**What you do in this task?**

Create an initial structure for folders and projects; and set identity and access management policies on the organization, folder, and project level.

**Why we recommend this task?**

Creating a structure for folders and projects makes it easier to manage your Google Cloud resources and assign access to your colleagues (set IAM policies) at scale.

**Your setup**

-   **Resource hierarchy:** Not configured
-   **Access:** Not configured

---

### Choose resource hierarchy model

#### Understanding the resource hierarchy

The Google Cloud resource hierarchy is the way you organize your cloud resources. The most complete form of the Google Cloud resource hierarchy includes an organization resource, folders , and projects . This allows companies to map their organization onto Google Cloud and provides logical attach points for access management policies (IAM) and Organization policies.

In this step, you leverage common examples to map to the structure of your organization.

**Which of the following configurations would you like to start with?**

Select a starting configuration to view more details. Continue to modify it to fit your organization’s needs.

*   **Simple, environment-oriented hierarchy:** Recommended for small companies with centralized environments.
    *   *Illustration of an organization with Environment folders.*
*   **Simple, team-oriented hierarchy:** Recommended for small companies with autonomous teams.
    *   *Illustration of an organization with a folder structure of Teams containing Environments.*
*   **Environment-oriented hierarchy:** Recommended for large companies with centralized environments.
    *   *Illustration of an organization with a folder structure of Environments containing Business Units containing Teams.*
*   **Business unit-oriented hierarchy:** Recommended for large companies with autonomous teams.
    *   *Illustration of an organization with a folder structure of Business Units containing Teams containing Environments.*
