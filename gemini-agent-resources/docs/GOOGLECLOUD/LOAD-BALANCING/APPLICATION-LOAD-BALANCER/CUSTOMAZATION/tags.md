# Create and manage tags

You can attach tags to the following Google Cloud load balancing resources:

- Backend bucket
- Backend service
- Forwarding rule
- Health check
- Instance group (zonal)
- Network endpoint group
- SSL policy
- SSL certificate
- Target instance
- Target pool
- Target gRPC proxy
- Target HTTP(S) proxy
- Target SSL proxy
- Target TCP proxy
- URL map

---

## About tags

A **tag** is a key-value pair that can be attached to a resource within Google
Cloud. You can use tags to conditionally allow or deny policies based on whether
a resource has a specific tag. For example, you can conditionally grant Identity
and Access Management (IAM) roles. For more information, see
[Tags overview](https://cloud.google.com/resource-manager/docs/tags/tags-overview).

Tags are attached to resources by creating a **tag binding** resource that links
the value to the Google Cloud resource.

> To group resources for automation and billing, use
> [labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels).
> Tags and labels work independently.

---

## Required permissions

To get the permissions you need to manage tags, ask your administrator to grant
you the following IAM roles:

- **Tag Viewer** (`roles/resourcemanager.tagViewer`) on the resources the tags
  are attached to.
- **Organization Viewer** (`roles/resourcemanager.organizationViewer`) on the
  organization to view and manage tags at the organization level.
- **Tag Administrator** (`roles/resourcemanager.tagAdmin`) on the resource to
  create, update, and delete tag definitions.
- **Tag User** (`roles/resourcemanager.tagUser`) on the tag value and the
  resources to attach and remove tags.

To attach tags to load balancing resources, you also need the **Compute Network
Admin** (`roles/compute.networkAdmin`) and **Compute Security Admin**
(`roles/compute.securityAdmin`) roles.

---

## Create tag keys and values

Before you can attach a tag, you need to create a tag and configure its value.
See
[Creating a tag](https://cloud.google.com/resource-manager/docs/tags/creating-managing-tags#creating_a_tag)
and
[Adding a tag value](https://cloud.google.com/resource-manager/docs/tags/creating-managing-tags#adding_a_tag_value).

---

## Add tags during resource creation

You can add tags at the time of creating backend services or backend buckets.

To attach a tag to a resource during creation, add the `--resource-manager-tags`
flag with the respective `create` command. For example, to attach a tag to a
backend bucket:

```bash
gcloud compute backend-buckets create BACKEND_BUCKET_NAME \
    --gcs-bucket-name=BUCKET_NAME \
    --resource-manager-tags=tagKeys/TAGKEY_ID=tagValues/TAGVALUE_ID
```

- `BACKEND_BUCKET_NAME`: The name of your backend bucket.
- `BUCKET_NAME`: The name of your storage bucket.
- `TAGKEY_ID`: The tag key's numeric ID.
- `TAGVALUE_ID`: The tag value's numeric ID.

Specify multiple tags by separating them with a comma.

---

## Add tags to existing resources

To attach a tag to an existing load balancing resource, create a tag binding
resource using `gcloud resource-manager tags bindings create`:

```bash
gcloud resource-manager tags bindings create \
    --tag-value=TAGVALUE_NAME \
    --parent=RESOURCE_ID \
    --location=LOCATION
```

- `TAGVALUE_NAME`: The permanent ID or namespaced name of the tag value (e.g.,
  `tagValues/567890123456`).
- `RESOURCE_ID`: The full ID of the resource, including the API domain name
  (e.g.,
  `//compute.googleapis.com/projects/7890123456/global/targetHttpProxies/{resource-id}`).
- `LOCATION`: The location of your resource (`us-central1` for regional,
  `us-central1-a` for zonal). Omit this flag for global resources.

---

## List tags attached to resources

You can view a list of tag bindings directly attached to or inherited by a
resource.

To get a list of tag bindings attached to a resource, use
`gcloud resource-manager tags bindings list`:

```bash
gcloud resource-manager tags bindings list \
    --parent=RESOURCE_ID \
    --location=LOCATION
```

---

## Detach tags from resources

You can detach tags that have been directly attached to a resource. Inherited
tags can be overridden but not detached.

To delete a tag binding, use `gcloud resource-manager tags bindings delete`:

```bash
gcloud resource-manager tags bindings delete \
    --tag-value=TAGVALUE_NAME \
    --parent=RESOURCE_ID \
    --location=LOCATION
```

---

## Delete tag keys and values

When removing a tag key or value definition, ensure that the tag is detached
from all resources first. You must delete existing tag bindings before deleting
the tag definition itself. See
[Deleting tags](https://cloud.google.com/resource-manager/docs/tags/creating-managing-tags#deleting_tags).

---

## Identity and Access Management conditions and tags

You can use tags and IAM conditions to conditionally grant role bindings to
users. Changing or deleting a tag attached to a resource can remove user access
if an IAM policy with conditional role bindings has been applied. For more
information, see
[Identity and Access Management conditions and tags](https://cloud.google.com/iam/docs/conditions-overview#tags).
