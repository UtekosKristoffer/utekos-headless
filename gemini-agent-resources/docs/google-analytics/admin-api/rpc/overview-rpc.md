# Google Analytics Admin API: REST

Manage properties in Google Analytics.

> **Warning:** Creating multiple Customer Applications, Accounts, or Projects to
> simulate or act as a single Customer Application, Account, or Project
> (respectively) or to circumvent Service-specific usage limits or quotas is a
> direct violation of Google Cloud Platform Terms of Service as well as Google
> APIs Terms of Service. These actions can result in immediate termination of
> your GCP project(s) without any warning.

## Service: analyticsadmin.googleapis.com

The Service name `analyticsadmin.googleapis.com` is needed to create RPC client
stubs.

## google.analytics.admin.v1alpha.AnalyticsAdminService

### Methods

| Method                                       | Description                                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| AcknowledgeUserDataCollection                | Acknowledges the terms of user data collection for the specified property.                     |
| ApproveDisplayVideo360AdvertiserLinkProposal | Approves a DisplayVideo360AdvertiserLinkProposal.                                              |
| ArchiveAudience                              | Archives an Audience on a property.                                                            |
| ArchiveCustomDimension                       | Archives a CustomDimension on a property.                                                      |
| ArchiveCustomMetric                          | Archives a CustomMetric on a property.                                                         |
| BatchCreateAccessBindings                    | Creates information about multiple access bindings to an account or property.                  |
| BatchDeleteAccessBindings                    | Deletes information about multiple users' links to an account or property.                     |
| BatchGetAccessBindings                       | Gets information about multiple access bindings to an account or property.                     |
| BatchUpdateAccessBindings                    | Updates information about multiple access bindings to an account or property.                  |
| CancelDisplayVideo360AdvertiserLinkProposal  | Cancels a DisplayVideo360AdvertiserLinkProposal.                                               |
| CreateAccessBinding                          | Creates an access binding on an account or property.                                           |
| CreateAdSenseLink                            | Creates an AdSenseLink.                                                                        |
| CreateAudience                               | Creates an Audience.                                                                           |
| CreateBigQueryLink                           | Creates a BigQueryLink.                                                                        |
| CreateCalculatedMetric                       | Creates a CalculatedMetric.                                                                    |
| CreateChannelGroup                           | Creates a ChannelGroup.                                                                        |
| CreateConversionEvent (deprecated)           | Deprecated: Use CreateKeyEvent instead.                                                        |
| CreateCustomDimension                        | Creates a CustomDimension.                                                                     |
| CreateCustomMetric                           | Creates a CustomMetric.                                                                        |
| CreateDataStream                             | Creates a DataStream.                                                                          |
| CreateDisplayVideo360AdvertiserLink          | Creates a DisplayVideo360AdvertiserLink.                                                       |
| CreateDisplayVideo360AdvertiserLinkProposal  | Creates a DisplayVideo360AdvertiserLinkProposal.                                               |
| CreateEventCreateRule                        | Creates an EventCreateRule.                                                                    |
| CreateEventEditRule                          | Creates an EventEditRule.                                                                      |
| CreateExpandedDataSet                        | Creates a ExpandedDataSet.                                                                     |
| CreateFirebaseLink                           | Creates a FirebaseLink.                                                                        |
| CreateGoogleAdsLink                          | Creates a GoogleAdsLink.                                                                       |
| CreateKeyEvent                               | Creates a Key Event.                                                                           |
| CreateMeasurementProtocolSecret              | Creates a measurement protocol secret.                                                         |
| CreateProperty                               | Creates a Google Analytics property with the specified location and attributes.                |
| CreateReportingDataAnnotation                | Creates a Reporting Data Annotation.                                                           |
| CreateRollupProperty                         | Create a roll-up property and all roll-up property source links.                               |
| CreateRollupPropertySourceLink               | Creates a roll-up property source link.                                                        |
| CreateSKAdNetworkConversionValueSchema       | Creates a SKAdNetworkConversionValueSchema.                                                    |
| CreateSearchAds360Link                       | Creates a SearchAds360Link.                                                                    |
| CreateSubpropertyEventFilter                 | Creates a subproperty Event Filter.                                                            |
| DeleteAccessBinding                          | Deletes an access binding on an account or property.                                           |
| DeleteAccount                                | Marks target Account as soft-deleted (ie: "trashed") and returns it.                           |
| DeleteAdSenseLink                            | Deletes an AdSenseLink.                                                                        |
| DeleteBigQueryLink                           | Deletes a BigQueryLink on a property.                                                          |
| DeleteCalculatedMetric                       | Deletes a CalculatedMetric on a property.                                                      |
| DeleteChannelGroup                           | Deletes a ChannelGroup on a property.                                                          |
| DeleteConversionEvent (deprecated)           | Deprecated: Use DeleteKeyEvent instead.                                                        |
| DeleteDataStream                             | Deletes a DataStream on a property.                                                            |
| DeleteDisplayVideo360AdvertiserLink          | Deletes a DisplayVideo360AdvertiserLink on a property.                                         |
| DeleteDisplayVideo360AdvertiserLinkProposal  | Deletes a DisplayVideo360AdvertiserLinkProposal on a property.                                 |
| DeleteEventCreateRule                        | Deletes an EventCreateRule.                                                                    |
| DeleteEventEditRule                          | Deletes an EventEditRule.                                                                      |
| DeleteExpandedDataSet                        | Deletes a ExpandedDataSet on a property.                                                       |
| DeleteFirebaseLink                           | Deletes a FirebaseLink on a property                                                           |
| DeleteGoogleAdsLink                          | Deletes a GoogleAdsLink on a property                                                          |
| DeleteKeyEvent                               | Deletes a Key Event.                                                                           |
| DeleteMeasurementProtocolSecret              | Deletes target MeasurementProtocolSecret.                                                      |
| DeleteProperty                               | Marks target Property as soft-deleted (ie: "trashed") and returns it.                          |
| DeleteReportingDataAnnotation                | Deletes a Reporting Data Annotation.                                                           |
| DeleteRollupPropertySourceLink               | Deletes a roll-up property source link.                                                        |
| DeleteSKAdNetworkConversionValueSchema       | Deletes target SKAdNetworkConversionValueSchema.                                               |
| DeleteSearchAds360Link                       | Deletes a SearchAds360Link on a property.                                                      |
| DeleteSubpropertyEventFilter                 | Deletes a subproperty event filter.                                                            |
| GetAccessBinding                             | Gets information about an access binding.                                                      |
| GetAccount                                   | Lookup for a single Account.                                                                   |
| GetAdSenseLink                               | Looks up a single AdSenseLink.                                                                 |
| GetAttributionSettings                       | Lookup for a AttributionSettings singleton.                                                    |
| GetAudience                                  | Lookup for a single Audience.                                                                  |
| GetBigQueryLink                              | Lookup for a single BigQuery Link.                                                             |
| GetCalculatedMetric                          | Lookup for a single CalculatedMetric.                                                          |
| GetChannelGroup                              | Lookup for a single ChannelGroup.                                                              |
| GetConversionEvent (deprecated)              | Deprecated: Use GetKeyEvent instead.                                                           |
| GetCustomDimension                           | Lookup for a single CustomDimension.                                                           |
| GetCustomMetric                              | Lookup for a single CustomMetric.                                                              |
| GetDataRedactionSettings                     | Lookup for a single DataRedactionSettings.                                                     |
| GetDataRetentionSettings                     | Returns the singleton data retention settings for this property.                               |
| GetDataSharingSettings                       | Get data sharing settings on an account.                                                       |
| GetDataStream                                | Lookup for a single DataStream.                                                                |
| GetDisplayVideo360AdvertiserLink             | Look up a single DisplayVideo360AdvertiserLink                                                 |
| GetDisplayVideo360AdvertiserLinkProposal     | Lookup for a single DisplayVideo360AdvertiserLinkProposal.                                     |
| GetEnhancedMeasurementSettings               | Returns the enhanced measurement settings for this data stream.                                |
| GetEventCreateRule                           | Lookup for a single EventCreateRule.                                                           |
| GetEventEditRule                             | Lookup for a single EventEditRule.                                                             |
| GetExpandedDataSet                           | Lookup for a single ExpandedDataSet.                                                           |
| GetGlobalSiteTag                             | Returns the Site Tag for the specified web stream.                                             |
| GetGoogleSignalsSettings                     | Lookup for Google Signals settings for a property.                                             |
| GetKeyEvent                                  | Retrieve a single Key Event.                                                                   |
| GetMeasurementProtocolSecret                 | Lookup for a single MeasurementProtocolSecret.                                                 |
| GetProperty                                  | Lookup for a single GA Property.                                                               |
| GetReportingDataAnnotation                   | Lookup a single Reporting Data Annotation.                                                     |
| GetReportingIdentitySettings                 | Returns the reporting identity settings for this property.                                     |
| GetRollupPropertySourceLink                  | Lookup for a single roll-up property source Link.                                              |
| GetSKAdNetworkConversionValueSchema          | Looks up a single SKAdNetworkConversionValueSchema.                                            |
| GetSearchAds360Link                          | Look up a single SearchAds360Link                                                              |
| GetSubpropertyEventFilter                    | Lookup for a single subproperty Event Filter.                                                  |
| GetSubpropertySyncConfig                     | Lookup for a single SubpropertySyncConfig.                                                     |
| ListAccessBindings                           | Lists all access bindings on an account or property.                                           |
| ListAccountSummaries                         | Returns summaries of all accounts accessible by the caller.                                    |
| ListAccounts                                 | Returns all accounts accessible by the caller.                                                 |
| ListAdSenseLinks                             | Lists AdSenseLinks on a property.                                                              |
| ListAudiences                                | Lists Audiences on a property.                                                                 |
| ListBigQueryLinks                            | Lists BigQuery Links on a property.                                                            |
| ListCalculatedMetrics                        | Lists CalculatedMetrics on a property.                                                         |
| ListChannelGroups                            | Lists ChannelGroups on a property.                                                             |
| ListConversionEvents (deprecated)            | Deprecated: Use ListKeyEvents instead.                                                         |
| ListCustomDimensions                         | Lists CustomDimensions on a property.                                                          |
| ListCustomMetrics                            | Lists CustomMetrics on a property.                                                             |
| ListDataStreams                              | Lists DataStreams on a property.                                                               |
| ListDisplayVideo360AdvertiserLinkProposals   | Lists DisplayVideo360AdvertiserLinkProposals on a property.                                    |
| ListDisplayVideo360AdvertiserLinks           | Lists all DisplayVideo360AdvertiserLinks on a property.                                        |
| ListEventCreateRules                         | Lists EventCreateRules on a web data stream.                                                   |
| ListEventEditRules                           | Lists EventEditRules on a web data stream.                                                     |
| ListExpandedDataSets                         | Lists ExpandedDataSets on a property.                                                          |
| ListFirebaseLinks                            | Lists FirebaseLinks on a property.                                                             |
| ListGoogleAdsLinks                           | Lists GoogleAdsLinks on a property.                                                            |
| ListKeyEvents                                | Returns a list of Key Events in the specified parent property.                                 |
| ListMeasurementProtocolSecrets               | Returns child MeasurementProtocolSecrets under the specified parent Property.                  |
| ListProperties                               | Returns child Properties under the specified parent Account.                                   |
| ListReportingDataAnnotations                 | List all Reporting Data Annotations on a property.                                             |
| ListRollupPropertySourceLinks                | Lists roll-up property source Links on a property.                                             |
| ListSKAdNetworkConversionValueSchemas        | Lists SKAdNetworkConversionValueSchema on a stream.                                            |
| ListSearchAds360Links                        | Lists all SearchAds360Links on a property.                                                     |
| ListSubpropertyEventFilters                  | List all subproperty Event Filters on a property.                                              |
| ListSubpropertySyncConfigs                   | List all SubpropertySyncConfig resources for a property.                                       |
| ProvisionAccountTicket                       | Requests a ticket for creating an account.                                                     |
| ProvisionSubproperty                         | Create a subproperty and a subproperty event filter that applies to the created subproperty.   |
| ReorderEventEditRules                        | Changes the processing order of event edit rules on the specified stream.                      |
| RunAccessReport                              | Returns a customized report of data access records.                                            |
| SearchChangeHistoryEvents                    | Searches through all changes to an account or its children given the specified set of filters. |
| SubmitUserDeletion                           | Submits a request for user deletion for a property.                                            |
| UpdateAccessBinding                          | Updates an access binding on an account or property.                                           |
| UpdateAccount                                | Updates an account.                                                                            |
| UpdateAttributionSettings                    | Updates attribution settings on a property.                                                    |
| UpdateAudience                               | Updates an Audience on a property.                                                             |
| UpdateBigQueryLink                           | Updates a BigQueryLink.                                                                        |
| UpdateCalculatedMetric                       | Updates a CalculatedMetric on a property.                                                      |
| UpdateChannelGroup                           | Updates a ChannelGroup.                                                                        |
| UpdateConversionEvent (deprecated)           | Deprecated: Use UpdateKeyEvent instead.                                                        |
| UpdateCustomDimension                        | Updates a CustomDimension on a property.                                                       |
| UpdateCustomMetric                           | Updates a CustomMetric on a property.                                                          |
| UpdateDataRedactionSettings                  | Updates a DataRedactionSettings on a property.                                                 |
| UpdateDataRetentionSettings                  | Updates the singleton data retention settings for this property.                               |
| UpdateDataStream                             | Updates a DataStream on a property.                                                            |
| UpdateDisplayVideo360AdvertiserLink          | Updates a DisplayVideo360AdvertiserLink on a property.                                         |
| UpdateEnhancedMeasurementSettings            | Updates the enhanced measurement settings for this data stream.                                |
| UpdateEventCreateRule                        | Updates an EventCreateRule.                                                                    |
| UpdateEventEditRule                          | Updates an EventEditRule.                                                                      |
| UpdateExpandedDataSet                        | Updates a ExpandedDataSet on a property.                                                       |
| UpdateGoogleAdsLink                          | Updates a GoogleAdsLink on a property                                                          |
| UpdateGoogleSignalsSettings                  | Updates Google Signals settings for a property.                                                |
| UpdateKeyEvent                               | Updates a Key Event.                                                                           |
| UpdateMeasurementProtocolSecret              | Updates a measurement protocol secret.                                                         |
| UpdateProperty                               | Updates a property.                                                                            |
| UpdateReportingDataAnnotation                | Updates a Reporting Data Annotation.                                                           |
| UpdateSKAdNetworkConversionValueSchema       | Updates a SKAdNetworkConversionValueSchema.                                                    |
| UpdateSearchAds360Link                       | Updates a SearchAds360Link on a property.                                                      |
| UpdateSubpropertyEventFilter                 | Updates a subproperty Event Filter.                                                            |
| UpdateSubpropertySyncConfig                  | Updates a SubpropertySyncConfig.                                                               |

## google.analytics.admin.v1beta.AnalyticsAdminService

### Methods

| Method                             | Description                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| AcknowledgeUserDataCollection      | Acknowledges the terms of user data collection for the specified property.                     |
| ArchiveCustomDimension             | Archives a CustomDimension on a property.                                                      |
| ArchiveCustomMetric                | Archives a CustomMetric on a property.                                                         |
| CreateConversionEvent (deprecated) | Deprecated: Use CreateKeyEvent instead.                                                        |
| CreateCustomDimension              | Creates a CustomDimension.                                                                     |
| CreateCustomMetric                 | Creates a CustomMetric.                                                                        |
| CreateDataStream                   | Creates a DataStream.                                                                          |
| CreateFirebaseLink                 | Creates a FirebaseLink.                                                                        |
| CreateGoogleAdsLink                | Creates a GoogleAdsLink.                                                                       |
| CreateKeyEvent                     | Creates a Key Event.                                                                           |
| CreateMeasurementProtocolSecret    | Creates a measurement protocol secret.                                                         |
| CreateProperty                     | Creates a Google Analytics property with the specified location and attributes.                |
| DeleteAccount                      | Marks target Account as soft-deleted (ie: "trashed") and returns it.                           |
| DeleteConversionEvent (deprecated) | Deprecated: Use DeleteKeyEvent instead.                                                        |
| DeleteDataStream                   | Deletes a DataStream on a property.                                                            |
| DeleteFirebaseLink                 | Deletes a FirebaseLink on a property                                                           |
| DeleteGoogleAdsLink                | Deletes a GoogleAdsLink on a property                                                          |
| DeleteKeyEvent                     | Deletes a Key Event.                                                                           |
| DeleteMeasurementProtocolSecret    | Deletes target MeasurementProtocolSecret.                                                      |
| DeleteProperty                     | Marks target Property as soft-deleted (ie: "trashed") and returns it.                          |
| GetAccount                         | Lookup for a single Account.                                                                   |
| GetConversionEvent (deprecated)    | Deprecated: Use GetKeyEvent instead.                                                           |
| GetCustomDimension                 | Lookup for a single CustomDimension.                                                           |
| GetCustomMetric                    | Lookup for a single CustomMetric.                                                              |
| GetDataRetentionSettings           | Returns the singleton data retention settings for this property.                               |
| GetDataSharingSettings             | Get data sharing settings on an account.                                                       |
| GetDataStream                      | Lookup for a single DataStream.                                                                |
| GetKeyEvent                        | Retrieve a single Key Event.                                                                   |
| GetMeasurementProtocolSecret       | Lookup for a single MeasurementProtocolSecret.                                                 |
| GetProperty                        | Lookup for a single GA Property.                                                               |
| ListAccountSummaries               | Returns summaries of all accounts accessible by the caller.                                    |
| ListAccounts                       | Returns all accounts accessible by the caller.                                                 |
| ListConversionEvents (deprecated)  | Deprecated: Use ListKeyEvents instead.                                                         |
| ListCustomDimensions               | Lists CustomDimensions on a property.                                                          |
| ListCustomMetrics                  | Lists CustomMetrics on a property.                                                             |
| ListDataStreams                    | Lists DataStreams on a property.                                                               |
| ListFirebaseLinks                  | Lists FirebaseLinks on a property.                                                             |
| ListGoogleAdsLinks                 | Lists GoogleAdsLinks on a property.                                                            |
| ListKeyEvents                      | Returns a list of Key Events in the specified parent property.                                 |
| ListMeasurementProtocolSecrets     | Returns child MeasurementProtocolSecrets under the specified parent Property.                  |
| ListProperties                     | Returns child Properties under the specified parent Account.                                   |
| ProvisionAccountTicket             | Requests a ticket for creating an account.                                                     |
| RunAccessReport                    | Returns a customized report of data access records.                                            |
| SearchChangeHistoryEvents          | Searches through all changes to an account or its children given the specified set of filters. |
| UpdateAccount                      | Updates an account.                                                                            |
| UpdateConversionEvent (deprecated) | Deprecated: Use UpdateKeyEvent instead.                                                        |
| UpdateCustomDimension              | Updates a CustomDimension on a property.                                                       |
| UpdateCustomMetric                 | Updates a CustomMetric on a property.                                                          |
| UpdateDataRetentionSettings        | Updates the singleton data retention settings for this property.                               |
| UpdateDataStream                   | Updates a DataStream on a property.                                                            |
| UpdateGoogleAdsLink                | Updates a GoogleAdsLink on a property                                                          |
| UpdateKeyEvent                     | Updates a Key Event.                                                                           |
| UpdateMeasurementProtocolSecret    | Updates a measurement protocol secret.                                                         |
| UpdateProperty                     | Updates a property.                                                                            |
