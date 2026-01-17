Create and manage tags


You can attach tags to the following Google Cloud load balancing resources:

Backend bucket
Backend service
Forwarding rule
Health check
Instance group (zonal)
Network endpoint group
SSL policy
SSL certificate
Target instance
Target pool
Target gRPC proxy
Target HTTP(S) proxy
Target SSL proxy
Target TCP proxy
URL map
About tags
A tag is a key-value pair that can attach to a resource within Google Cloud. You can use tags to conditionally allow or deny policies based on whether a resource has a specific tag. For example, you can conditionally grant Identity and Access Management (IAM) roles based on whether a resource has a specific tag. For more information about tags, see Tags overview.

Tags are attached to resources by creating a tag binding resource that links the value to the Google Cloud resource.

To group load balancing resources for automation and billing purposes, use labels. Tags and labels work independently of each other, and you can apply both to resources.
Required permissions
To get the permissions that you need to manage tags, ask your administrator to grant you the following IAM roles:

Tag Viewer (roles/resourcemanager.tagViewer) on the resources the tags are attached to
View and manage tags at the organization level: Organization Viewer (roles/resourcemanager.organizationViewer) on the organization
Create, update, and delete tag definitions: Tag Administrator (roles/resourcemanager.tagAdmin) on the resource you're creating, updating, or deleting tags for
Attach and remove tags from resources: Tag User (roles/resourcemanager.tagUser) on the tag value and the resources that you are attaching or removing the tag value to
For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

To attach tags to load balancing resources, you need the Compute Network Admin role (roles/compute.networkAdmin) and the Compute Security Admin role (roles/compute.securityAdmin).

Create tag keys and values
Before you can attach a tag, you need to create a tag and configure its value. To create tag keys and tag values, see Creating a tag and Adding a tag value.

Add tags during resource creation
You can add tags at the time of creating backend services or backend buckets. Adding tags during resource creation, lets you instantly provide essential metadata for your resources and also helps with better organization, cost tracking, and automated policy application.

gcloud
To attach a tag to a resource during resource creation, add the --resource-manager-tags flag with the respective create command—for example, to attach a tag to a backend bucket, use the following command:



gcloud compute backend-buckets create BACKEND_BUCKET_NAME \
    --gcs-bucket-name=BUCKET_NAME \
    --resource-manager-tags=tagKeys/TAGKEY_ID=tagValues/TAGVALUE_ID
Replace the following:

BACKEND_BUCKET_NAME: the name of your backend bucket
BUCKET_NAME: the name of your storage bucket
TAGKEY_ID: the tag key number numeric ID
TAGVALUE_ID: the permanent numeric ID of the tag value that is attached—for example: 4567890123
Specify multiple tags by separating the tags with a comma, for example, TAGKEY1=TAGVALUE1,TAGKEY2=TAGVALUE2

Add tags to existing resources
To add a tag to existing load balancing resources, follow these steps:

gcloud
To attach a tag to a load balancing resource, you must create a tag binding resource by using the gcloud resource-manager tags bindings create command:



      gcloud resource-manager tags bindings create \
          --tag-value=TAGVALUE_NAME \
          --parent=RESOURCE_ID \
          --location=LOCATION
      
Replace the following:

TAGVALUE_NAME: the permanent ID or namespaced name of the tag value that is attached—for example, tagValues/567890123456.
RESOURCE_ID: the full ID of the resource, including the API domain name to identify the type of resource (//compute.googleapis.com/).
For example:

The resource ID of a global resource, such as a target HTTP proxy in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/global/targetHttpProxies/{resource-id}
The resource ID of a regional resource, such as a regional backend service in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/regions/REGION/backendServices/{resource-id}
The resource ID of a zonal resource, such as a network endpoint group in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/zones/ZONE/networkEndpointGroups/{resource-id}
LOCATION: the location of your resource. If you're attaching a tag to a global resource, such as a folder or a project, omit this flag. If you're attaching a tag to a regional or a zonal resource, you must specify the location—for example, us-central1 (region) or us-central1-a (zone).
List tags attached to resources
You can view a list of tag bindings directly attached to or inherited by the load balancing resource.

gcloud
To get a list of tag bindings attached to a resource, use the gcloud resource-manager tags bindings list command:



      gcloud resource-manager tags bindings list \
          --parent=RESOURCE_ID \
          --location=LOCATION
      
Replace the following:

RESOURCE_ID: the full ID of the resource, including the API domain name to identify the type of resource (//compute.googleapis.com/).
For example:

The resource ID of a global resource, such as a target HTTP proxy in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/global/targetHttpProxies/{resource-id}
The resource ID of a regional resource, such as a regional backend service in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/regions/REGION/backendServices/{resource-id}
The resource ID of a zonal resource, such as a network endpoint group in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/zones/ZONE/networkEndpointGroups/{resource-id}
LOCATION: the location of your resource. If you're viewing a tag attached to a global resource, such as a folder or a project, omit this flag. If you're viewing a tag attached to a regional or a zonal resource, you must specify the location—for example, us-central1 (region) or us-central1-a (zone).
You should get a response similar to the following:


name: tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F7890123456/tagValues/567890123456
          tagValue: tagValues/567890123456
          resource: 
//compute.googleapis.com/projects/7890123456/regions/REGION/targetHttpProxies/{resource-id}

      
Detach tags from resources
You can detach tags that have been directly attached to a load balancing resource. Inherited tags can be overridden by attaching a tag with the same key and a different value, but they can't be detached.

gcloud
To delete a tag binding, use the gcloud resource-manager tags bindings delete command:



      gcloud resource-manager tags bindings delete \
          --tag-value=TAGVALUE_NAME \
          --parent=RESOURCE_ID \
          --location=LOCATION
      
Replace the following:

TAGVALUE_NAME: the permanent ID or namespaced name of the tag value that is attached—for example, tagValues/567890123456.
RESOURCE_ID: the full ID of the resource, including the API domain name to identify the type of resource (//compute.googleapis.com/).
For example:

The resource ID of a global resource, such as a target HTTP proxy in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/global/targetHttpProxies/{resource-id}
The resource ID of a regional resource, such as a regional backend service in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/regions/REGION/backendServices/{resource-id}
The resource ID of a zonal resource, such as a network endpoint group in projects/7890123456, is as follows: //compute.googleapis.com/projects/7890123456/zones/ZONE/networkEndpointGroups/{resource-id}
LOCATION: the location of your resource. If you're attaching a tag to a global resource, such as a folder or a project, omit this flag. If you're attaching a tag to a regional or a zonal resource, you must specify the location—for example, us-central1 (region) or us-central1-a (zone).
Delete tag keys and values
When removing a tag key or value definition, ensure that the tag is detached from the load balancing resource. You must delete existing tag attachments, called tag bindings, before deleting the tag definition itself. To delete tag keys and tag values, see Deleting tags.

Identity and Access Management conditions and tags
You can use tags and IAM conditions to conditionally grant role bindings to users in your hierarchy. Changing or deleting the tag attached to a resource can remove user access to that resource if an IAM policy with conditional role bindings has been applied. For more information, see Identity and Access Management conditions and tags.

