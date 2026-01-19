# Analytics Admin API

Manage properties in Google Analytics.
> **Warning:** Creating multiple Customer Applications, Accounts, or Projects to simulate or act as a single Customer Application, Account, or Project (respectively) or to circumvent Service-specific usage limits or quotas is a direct violation of Google Cloud Platform Terms of Service as well as Google APIs Terms of Service. These actions can result in immediate termination of your GCP project(s) without any warning.

## Service: analyticsadmin.googleapis.com
To call this service, we recommend that you use the Google-provided client libraries. If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document
A Discovery Document is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery documents:
```
https://analyticsadmin.googleapis.com/$discovery/rest?version=v1beta
https://analyticsadmin.googleapis.com/$discovery/rest?version=v1alpha
```

### Service endpoint
A service endpoint is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:
```
https://analyticsadmin.googleapis.com
```

## REST Resource: v1beta.accountSummaries
### Methods
| Method | HTTP request | Description |
|---|---|---|
| list | `GET /v1beta/accountSummaries` | Returns summaries of all accounts accessible by the caller. |

## REST Resource: v1beta.accounts
### Methods
| Method | HTTP request | Description |
|---|---|---|
| delete | `DELETE /v1beta/{name=accounts/*}` | Marks target Account as soft-deleted (ie: "trashed") and returns it. |
| get | `GET /v1beta/{name=accounts/*}` | Lookup for a single Account. |
| getDataSharingSettings | `GET /v1beta/{name=accounts/*/dataSharingSettings}` | Get data sharing settings on an account. |
| list | `GET /v1beta/accounts` | Returns all accounts accessible by the caller. |
| patch | `PATCH /v1beta/{account.name=accounts/*}` | Updates an account. |
| provisionAccountTicket | `POST /v1beta/accounts:provisionAccountTicket` | Requests a ticket for creating an account. |
| runAccessReport | `POST /v1beta/{entity=accounts/*}:runAccessReport` | Returns a customized report of data access records. |
| searchChangeHistoryEvents | `POST /v1beta/{account=accounts/*}:searchChangeHistoryEvents` | Searches through all changes to an account or its children given the specified set of filters. |

## REST Resource: v1beta.properties
### Methods
| Method | HTTP request | Description |
|---|---|---|
| acknowledgeUserDataCollection | `POST /v1beta/{property=properties/*}:acknowledgeUserDataCollection` | Acknowledges the terms of user data collection for the specified property. |
| create | `POST /v1beta/properties` | Creates a Google Analytics property with the specified location and attributes. |
| delete | `DELETE /v1beta/{name=properties/*}` | Marks target Property as soft-deleted (ie: "trashed") and returns it. |
| get | `GET /v1beta/{name=properties/*}` | Lookup for a single GA Property. |
| getDataRetentionSettings | `GET /v1beta/{name=properties/*/dataRetentionSettings}` | Returns the singleton data retention settings for this property. |
| list | `GET /v1beta/properties` | Returns child Properties under the specified parent Account. |
| patch | `PATCH /v1beta/{property.name=properties/*}` | Updates a property. |
| runAccessReport | `POST /v1beta/{entity=properties/*}:runAccessReport` | Returns a customized report of data access records. |
| updateDataRetentionSettings | `PATCH /v1beta/{dataRetentionSettings.name=properties/*/dataRetentionSettings}` | Updates the singleton data retention settings for this property. |

## REST Resource: v1beta.properties.conversionEvents
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create (deprecated) | `POST /v1beta/{parent=properties/*}/conversionEvents` | Deprecated: Use CreateKeyEvent instead. |
| delete (deprecated) | `DELETE /v1beta/{name=properties/*/conversionEvents/*}` | Deprecated: Use DeleteKeyEvent instead. |
| get (deprecated) | `GET /v1beta/{name=properties/*/conversionEvents/*}` | Deprecated: Use GetKeyEvent instead. |
| list (deprecated) | `GET /v1beta/{parent=properties/*}/conversionEvents` | Deprecated: Use ListKeyEvents instead. |
| patch (deprecated) | `PATCH /v1beta/{conversionEvent.name=properties/*/conversionEvents/*}` | Deprecated: Use UpdateKeyEvent instead. |

## REST Resource: v1beta.properties.customDimensions
### Methods
| Method | HTTP request | Description |
|---|---|---|
| archive | `POST /v1beta/{name=properties/*/customDimensions/*}:archive` | Archives a CustomDimension on a property. |
| create | `POST /v1beta/{parent=properties/*}/customDimensions` | Creates a CustomDimension. |
| get | `GET /v1beta/{name=properties/*/customDimensions/*}` | Lookup for a single CustomDimension. |
| list | `GET /v1beta/{parent=properties/*}/customDimensions` | Lists CustomDimensions on a property. |
| patch | `PATCH /v1beta/{customDimension.name=properties/*/customDimensions/*}` | Updates a CustomDimension on a property. |

## REST Resource: v1beta.properties.customMetrics
### Methods
| Method | HTTP request | Description |
|---|---|---|
| archive | `POST /v1beta/{name=properties/*/customMetrics/*}:archive` | Archives a CustomMetric on a property. |
| create | `POST /v1beta/{parent=properties/*}/customMetrics` | Creates a CustomMetric. |
| get | `GET /v1beta/{name=properties/*/customMetrics/*}` | Lookup for a single CustomMetric. |
| list | `GET /v1beta/{parent=properties/*}/customMetrics` | Lists CustomMetrics on a property. |
| patch | `PATCH /v1beta/{customMetric.name=properties/*/customMetrics/*}` | Updates a CustomMetric on a property. |

## REST Resource: v1beta.properties.dataStreams
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1beta/{parent=properties/*}/dataStreams` | Creates a DataStream. |
| delete | `DELETE /v1beta/{name=properties/*/dataStreams/*}` | Deletes a DataStream on a property. |
| get | `GET /v1beta/{name=properties/*/dataStreams/*}` | Lookup for a single DataStream. |
| list | `GET /v1beta/{parent=properties/*}/dataStreams` | Lists DataStreams on a property. |
| patch | `PATCH /v1beta/{dataStream.name=properties/*/dataStreams/*}` | Updates a DataStream on a property. |

## REST Resource: v1beta.properties.dataStreams.measurementProtocolSecrets
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1beta/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets` | Creates a measurement protocol secret. |
| delete | `DELETE /v1beta/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Deletes target MeasurementProtocolSecret. |
| get | `GET /v1beta/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Lookup for a single MeasurementProtocolSecret. |
| list | `GET /v1beta/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets` | Returns child MeasurementProtocolSecrets under the specified parent Property. |
| patch | `PATCH /v1beta/{measurementProtocolSecret.name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Updates a measurement protocol secret. |

## REST Resource: v1beta.properties.firebaseLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1beta/{parent=properties/*}/firebaseLinks` | Creates a FirebaseLink. |
| delete | `DELETE /v1beta/{name=properties/*/firebaseLinks/*}` | Deletes a FirebaseLink on a property |
| list | `GET /v1beta/{parent=properties/*}/firebaseLinks` | Lists FirebaseLinks on a property. |

## REST Resource: v1beta.properties.googleAdsLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1beta/{parent=properties/*}/googleAdsLinks` | Creates a GoogleAdsLink. |
| delete | `DELETE /v1beta/{name=properties/*/googleAdsLinks/*}` | Deletes a GoogleAdsLink on a property |
| list | `GET /v1beta/{parent=properties/*}/googleAdsLinks` | Lists GoogleAdsLinks on a property. |
| patch | `PATCH /v1beta/{googleAdsLink.name=properties/*/googleAdsLinks/*}` | Updates a GoogleAdsLink on a property |

## REST Resource: v1beta.properties.keyEvents
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1beta/{parent=properties/*}/keyEvents` | Creates a Key Event. |
| delete | `DELETE /v1beta/{name=properties/*/keyEvents/*}` | Deletes a Key Event. |
| get | `GET /v1beta/{name=properties/*/keyEvents/*}` | Retrieve a single Key Event. |
| list | `GET /v1beta/{parent=properties/*}/keyEvents` | Returns a list of Key Events in the specified parent property. |
| patch | `PATCH /v1beta/{keyEvent.name=properties/*/keyEvents/*}` | Updates a Key Event. |

## REST Resource: v1alpha.accountSummaries
### Methods
| Method | HTTP request | Description |
|---|---|---|
| list | `GET /v1alpha/accountSummaries` | Returns summaries of all accounts accessible by the caller. |

## REST Resource: v1alpha.accounts
### Methods
| Method | HTTP request | Description |
|---|---|---|
| delete | `DELETE /v1alpha/{name=accounts/*}` | Marks target Account as soft-deleted (ie: "trashed") and returns it. |
| get | `GET /v1alpha/{name=accounts/*}` | Lookup for a single Account. |
| getDataSharingSettings | `GET /v1alpha/{name=accounts/*/dataSharingSettings}` | Get data sharing settings on an account. |
| list | `GET /v1alpha/accounts` | Returns all accounts accessible by the caller. |
| patch | `PATCH /v1alpha/{account.name=accounts/*}` | Updates an account. |
| provisionAccountTicket | `POST /v1alpha/accounts:provisionAccountTicket` | Requests a ticket for creating an account. |
| runAccessReport | `POST /v1alpha/{entity=accounts/*}:runAccessReport` | Returns a customized report of data access records. |
| searchChangeHistoryEvents | `POST /v1alpha/{account=accounts/*}:searchChangeHistoryEvents` | Searches through all changes to an account or its children given the specified set of filters. |

## REST Resource: v1alpha.accounts.accessBindings
### Methods
| Method | HTTP request | Description |
|---|---|---|
| batchCreate | `POST /v1alpha/{parent=accounts/*}/accessBindings:batchCreate` | Creates information about multiple access bindings to an account or property. |
| batchDelete | `POST /v1alpha/{parent=accounts/*}/accessBindings:batchDelete` | Deletes information about multiple users' links to an account or property. |
| batchGet | `GET /v1alpha/{parent=accounts/*}/accessBindings:batchGet` | Gets information about multiple access bindings to an account or property. |
| batchUpdate | `POST /v1alpha/{parent=accounts/*}/accessBindings:batchUpdate` | Updates information about multiple access bindings to an account or property. |
| create | `POST /v1alpha/{parent=accounts/*}/accessBindings` | Creates an access binding on an account or property. |
| delete | `DELETE /v1alpha/{name=accounts/*/accessBindings/*}` | Deletes an access binding on an account or property. |
| get | `GET /v1alpha/{name=accounts/*/accessBindings/*}` | Gets information about an access binding. |
| list | `GET /v1alpha/{parent=accounts/*}/accessBindings` | Lists all access bindings on an account or property. |
| patch | `PATCH /v1alpha/{accessBinding.name=accounts/*/accessBindings/*}` | Updates an access binding on an account or property. |

## REST Resource: v1alpha.properties
### Methods
| Method | HTTP request | Description |
|---|---|---|
| acknowledgeUserDataCollection | `POST /v1alpha/{property=properties/*}:acknowledgeUserDataCollection` | Acknowledges the terms of user data collection for the specified property. |
| create | `POST /v1alpha/properties` | Creates a Google Analytics property with the specified location and attributes. |
| createRollupProperty | `POST /v1alpha/properties:createRollupProperty` | Create a roll-up property and all roll-up property source links. |
| delete | `DELETE /v1alpha/{name=properties/*}` | Marks target Property as soft-deleted (ie: "trashed") and returns it. |
| get | `GET /v1alpha/{name=properties/*}` | Lookup for a single GA Property. |
| getAttributionSettings | `GET /v1alpha/{name=properties/*/attributionSettings}` | Lookup for a AttributionSettings singleton. |
| getDataRetentionSettings | `GET /v1alpha/{name=properties/*/dataRetentionSettings}` | Returns the singleton data retention settings for this property. |
| getGoogleSignalsSettings | `GET /v1alpha/{name=properties/*/googleSignalsSettings}` | Lookup for Google Signals settings for a property. |
| getReportingIdentitySettings | `GET /v1alpha/{name=properties/*/reportingIdentitySettings}` | Returns the reporting identity settings for this property. |
| list | `GET /v1alpha/properties` | Returns child Properties under the specified parent Account. |
| patch | `PATCH /v1alpha/{property.name=properties/*}` | Updates a property. |
| provisionSubproperty | `POST /v1alpha/properties:provisionSubproperty` | Create a subproperty and a subproperty event filter that applies to the created subproperty. |
| runAccessReport | `POST /v1alpha/{entity=properties/*}:runAccessReport` | Returns a customized report of data access records. |
| submitUserDeletion | `POST /v1alpha/{name=properties/*}:submitUserDeletion` | Submits a request for user deletion for a property. |
| updateAttributionSettings | `PATCH /v1alpha/{attributionSettings.name=properties/*/attributionSettings}` | Updates attribution settings on a property. |
| updateDataRetentionSettings | `PATCH /v1alpha/{dataRetentionSettings.name=properties/*/dataRetentionSettings}` | Updates the singleton data retention settings for this property. |
| updateGoogleSignalsSettings | `PATCH /v1alpha/{googleSignalsSettings.name=properties/*/googleSignalsSettings}` | Updates Google Signals settings for a property. |

## REST Resource: v1alpha.properties.accessBindings
### Methods
| Method | HTTP request | Description |
|---|---|---|
| batchCreate | `POST /v1alpha/{parent=properties/*}/accessBindings:batchCreate` | Creates information about multiple access bindings to an account or property. |
| batchDelete | `POST /v1alpha/{parent=properties/*}/accessBindings:batchDelete` | Deletes information about multiple users' links to an account or property. |
| batchGet | `GET /v1alpha/{parent=properties/*}/accessBindings:batchGet` | Gets information about multiple access bindings to an account or property. |
| batchUpdate | `POST /v1alpha/{parent=properties/*}/accessBindings:batchUpdate` | Updates information about multiple access bindings to an account or property. |
| create | `POST /v1alpha/{parent=properties/*}/accessBindings` | Creates an access binding on an account or property. |
| delete | `DELETE /v1alpha/{name=properties/*/accessBindings/*}` | Deletes an access binding on an account or property. |
| get | `GET /v1alpha/{name=properties/*/accessBindings/*}` | Gets information about an access binding. |
| list | `GET /v1alpha/{parent=properties/*}/accessBindings` | Lists all access bindings on an account or property. |
| patch | `PATCH /v1alpha/{accessBinding.name=properties/*/accessBindings/*}` | Updates an access binding on an account or property. |

## REST Resource: v1alpha.properties.adSenseLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/adSenseLinks` | Creates an AdSenseLink. |
| delete | `DELETE /v1alpha/{name=properties/*/adSenseLinks/*}` | Deletes an AdSenseLink. |
| get | `GET /v1alpha/{name=properties/*/adSenseLinks/*}` | Looks up a single AdSenseLink. |
| list | `GET /v1alpha/{parent=properties/*}/adSenseLinks` | Lists AdSenseLinks on a property. |

## REST Resource: v1alpha.properties.audiences
### Methods
| Method | HTTP request | Description |
|---|---|---|
| archive | `POST /v1alpha/{name=properties/*/audiences/*}:archive` | Archives an Audience on a property. |
| create | `POST /v1alpha/{parent=properties/*}/audiences` | Creates an Audience. |
| get | `GET /v1alpha/{name=properties/*/audiences/*}` | Lookup for a single Audience. |
| list | `GET /v1alpha/{parent=properties/*}/audiences` | Lists Audiences on a property. |
| patch | `PATCH /v1alpha/{audience.name=properties/*/audiences/*}` | Updates an Audience on a property. |

## REST Resource: v1alpha.properties.bigQueryLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/bigQueryLinks` | Creates a BigQueryLink. |
| delete | `DELETE /v1alpha/{name=properties/*/bigQueryLinks/*}` | Deletes a BigQueryLink on a property. |
| get | `GET /v1alpha/{name=properties/*/bigQueryLinks/*}` | Lookup for a single BigQuery Link. |
| list | `GET /v1alpha/{parent=properties/*}/bigQueryLinks` | Lists BigQuery Links on a property. |
| patch | `PATCH /v1alpha/{bigqueryLink.name=properties/*/bigQueryLinks/*}` | Updates a BigQueryLink. |

## REST Resource: v1alpha.properties.calculatedMetrics
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/calculatedMetrics` | Creates a CalculatedMetric. |
| delete | `DELETE /v1alpha/{name=properties/*/calculatedMetrics/*}` | Deletes a CalculatedMetric on a property. |
| get | `GET /v1alpha/{name=properties/*/calculatedMetrics/*}` | Lookup for a single CalculatedMetric. |
| list | `GET /v1alpha/{parent=properties/*}/calculatedMetrics` | Lists CalculatedMetrics on a property. |
| patch | `PATCH /v1alpha/{calculatedMetric.name=properties/*/calculatedMetrics/*}` | Updates a CalculatedMetric on a property. |

## REST Resource: v1alpha.properties.channelGroups
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/channelGroups` | Creates a ChannelGroup. |
| delete | `DELETE /v1alpha/{name=properties/*/channelGroups/*}` | Deletes a ChannelGroup on a property. |
| get | `GET /v1alpha/{name=properties/*/channelGroups/*}` | Lookup for a single ChannelGroup. |
| list | `GET /v1alpha/{parent=properties/*}/channelGroups` | Lists ChannelGroups on a property. |
| patch | `PATCH /v1alpha/{channelGroup.name=properties/*/channelGroups/*}` | Updates a ChannelGroup. |

## REST Resource: v1alpha.properties.conversionEvents
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create (deprecated) | `POST /v1alpha/{parent=properties/*}/conversionEvents` | Deprecated: Use CreateKeyEvent instead. |
| delete (deprecated) | `DELETE /v1alpha/{name=properties/*/conversionEvents/*}` | Deprecated: Use DeleteKeyEvent instead. |
| get (deprecated) | `GET /v1alpha/{name=properties/*/conversionEvents/*}` | Deprecated: Use GetKeyEvent instead. |
| list (deprecated) | `GET /v1alpha/{parent=properties/*}/conversionEvents` | Deprecated: Use ListKeyEvents instead. |
| patch (deprecated) | `PATCH /v1alpha/{conversionEvent.name=properties/*/conversionEvents/*}` | Deprecated: Use UpdateKeyEvent instead. |

## REST Resource: v1alpha.properties.customDimensions
### Methods
| Method | HTTP request | Description |
|---|---|---|
| archive | `POST /v1alpha/{name=properties/*/customDimensions/*}:archive` | Archives a CustomDimension on a property. |
| create | `POST /v1alpha/{parent=properties/*}/customDimensions` | Creates a CustomDimension. |
| get | `GET /v1alpha/{name=properties/*/customDimensions/*}` | Lookup for a single CustomDimension. |
| list | `GET /v1alpha/{parent=properties/*}/customDimensions` | Lists CustomDimensions on a property. |
| patch | `PATCH /v1alpha/{customDimension.name=properties/*/customDimensions/*}` | Updates a CustomDimension on a property. |

## REST Resource: v1alpha.properties.customMetrics
### Methods
| Method | HTTP request | Description |
|---|---|---|
| archive | `POST /v1alpha/{name=properties/*/customMetrics/*}:archive` | Archives a CustomMetric on a property. |
| create | `POST /v1alpha/{parent=properties/*}/customMetrics` | Creates a CustomMetric. |
| get | `GET /v1alpha/{name=properties/*/customMetrics/*}` | Lookup for a single CustomMetric. |
| list | `GET /v1alpha/{parent=properties/*}/customMetrics` | Lists CustomMetrics on a property. |
| patch | `PATCH /v1alpha/{customMetric.name=properties/*/customMetrics/*}` | Updates a CustomMetric on a property. |

## REST Resource: v1alpha.properties.dataStreams
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/dataStreams` | Creates a DataStream. |
| delete | `DELETE /v1alpha/{name=properties/*/dataStreams/*}` | Deletes a DataStream on a property. |
| get | `GET /v1alpha/{name=properties/*/dataStreams/*}` | Lookup for a single DataStream. |
| getDataRedactionSettings | `GET /v1alpha/{name=properties/*/dataStreams/*/dataRedactionSettings}` | Lookup for a single DataRedactionSettings. |
| getEnhancedMeasurementSettings | `GET /v1alpha/{name=properties/*/dataStreams/*/enhancedMeasurementSettings}` | Returns the enhanced measurement settings for this data stream. |
| getGlobalSiteTag | `GET /v1alpha/{name=properties/*/dataStreams/*/globalSiteTag}` | Returns the Site Tag for the specified web stream. |
| list | `GET /v1alpha/{parent=properties/*}/dataStreams` | Lists DataStreams on a property. |
| patch | `PATCH /v1alpha/{dataStream.name=properties/*/dataStreams/*}` | Updates a DataStream on a property. |
| updateDataRedactionSettings | `PATCH /v1alpha/{dataRedactionSettings.name=properties/*/dataStreams/*/dataRedactionSettings}` | Updates a DataRedactionSettings on a property. |
| updateEnhancedMeasurementSettings | `PATCH /v1alpha/{enhancedMeasurementSettings.name=properties/*/dataStreams/*/enhancedMeasurementSettings}` | Updates the enhanced measurement settings for this data stream. |

## REST Resource: v1alpha.properties.dataStreams.eventCreateRules
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*/dataStreams/*}/eventCreateRules` | Creates an EventCreateRule. |
| delete | `DELETE /v1alpha/{name=properties/*/dataStreams/*/eventCreateRules/*}` | Deletes an EventCreateRule. |
| get | `GET /v1alpha/{name=properties/*/dataStreams/*/eventCreateRules/*}` | Lookup for a single EventCreateRule. |
| list | `GET /v1alpha/{parent=properties/*/dataStreams/*}/eventCreateRules` | Lists EventCreateRules on a web data stream. |
| patch | `PATCH /v1alpha/{eventCreateRule.name=properties/*/dataStreams/*/eventCreateRules/*}` | Updates an EventCreateRule. |

## REST Resource: v1alpha.properties.dataStreams.eventEditRules
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*/dataStreams/*}/eventEditRules` | Creates an EventEditRule. |
| delete | `DELETE /v1alpha/{name=properties/*/dataStreams/*/eventEditRules/*}` | Deletes an EventEditRule. |
| get | `GET /v1alpha/{name=properties/*/dataStreams/*/eventEditRules/*}` | Lookup for a single EventEditRule. |
| list | `GET /v1alpha/{parent=properties/*/dataStreams/*}/eventEditRules` | Lists EventEditRules on a web data stream. |
| patch | `PATCH /v1alpha/{eventEditRule.name=properties/*/dataStreams/*/eventEditRules/*}` | Updates an EventEditRule. |
| reorder | `POST /v1alpha/{parent=properties/*/dataStreams/*}/eventEditRules:reorder` | Changes the processing order of event edit rules on the specified stream. |

## REST Resource: v1alpha.properties.dataStreams.measurementProtocolSecrets
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets` | Creates a measurement protocol secret. |
| delete | `DELETE /v1alpha/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Deletes target MeasurementProtocolSecret. |
| get | `GET /v1alpha/{name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Lookup for a single MeasurementProtocolSecret. |
| list | `GET /v1alpha/{parent=properties/*/dataStreams/*}/measurementProtocolSecrets` | Returns child MeasurementProtocolSecrets under the specified parent Property. |
| patch | `PATCH /v1alpha/{measurementProtocolSecret.name=properties/*/dataStreams/*/measurementProtocolSecrets/*}` | Updates a measurement protocol secret. |

## REST Resource: v1alpha.properties.dataStreams.sKAdNetworkConversionValueSchema
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*/dataStreams/*}/sKAdNetworkConversionValueSchema` | Creates a SKAdNetworkConversionValueSchema. |
| delete | `DELETE /v1alpha/{name=properties/*/dataStreams/*/sKAdNetworkConversionValueSchema/*}` | Deletes target SKAdNetworkConversionValueSchema. |
| get | `GET /v1alpha/{name=properties/*/dataStreams/*/sKAdNetworkConversionValueSchema/*}` | Looks up a single SKAdNetworkConversionValueSchema. |
| list | `GET /v1alpha/{parent=properties/*/dataStreams/*}/sKAdNetworkConversionValueSchema` | Lists SKAdNetworkConversionValueSchema on a stream. |
| patch | `PATCH /v1alpha/{skadnetworkConversionValueSchema.name=properties/*/dataStreams/*/sKAdNetworkConversionValueSchema/*}` | Updates a SKAdNetworkConversionValueSchema. |

## REST Resource: v1alpha.properties.displayVideo360AdvertiserLinkProposals
### Methods
| Method | HTTP request | Description |
|---|---|---|
| approve | `POST /v1alpha/{name=properties/*/displayVideo360AdvertiserLinkProposals/*}:approve` | Approves a DisplayVideo360AdvertiserLinkProposal. |
| cancel | `POST /v1alpha/{name=properties/*/displayVideo360AdvertiserLinkProposals/*}:cancel` | Cancels a DisplayVideo360AdvertiserLinkProposal. |
| create | `POST /v1alpha/{parent=properties/*}/displayVideo360AdvertiserLinkProposals` | Creates a DisplayVideo360AdvertiserLinkProposal. |
| delete | `DELETE /v1alpha/{name=properties/*/displayVideo360AdvertiserLinkProposals/*}` | Deletes a DisplayVideo360AdvertiserLinkProposal on a property. |
| get | `GET /v1alpha/{name=properties/*/displayVideo360AdvertiserLinkProposals/*}` | Lookup for a single DisplayVideo360AdvertiserLinkProposal. |
| list | `GET /v1alpha/{parent=properties/*}/displayVideo360AdvertiserLinkProposals` | Lists DisplayVideo360AdvertiserLinkProposals on a property. |

## REST Resource: v1alpha.properties.displayVideo360AdvertiserLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/displayVideo360AdvertiserLinks` | Creates a DisplayVideo360AdvertiserLink. |
| delete | `DELETE /v1alpha/{name=properties/*/displayVideo360AdvertiserLinks/*}` | Deletes a DisplayVideo360AdvertiserLink on a property. |
| get | `GET /v1alpha/{name=properties/*/displayVideo360AdvertiserLinks/*}` | Look up a single DisplayVideo360AdvertiserLink |
| list | `GET /v1alpha/{parent=properties/*}/displayVideo360AdvertiserLinks` | Lists all DisplayVideo360AdvertiserLinks on a property. |
| patch | `PATCH /v1alpha/{displayVideo360AdvertiserLink.name=properties/*/displayVideo360AdvertiserLinks/*}` | Updates a DisplayVideo360AdvertiserLink on a property. |

## REST Resource: v1alpha.properties.expandedDataSets
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/expandedDataSets` | Creates a ExpandedDataSet. |
| delete | `DELETE /v1alpha/{name=properties/*/expandedDataSets/*}` | Deletes a ExpandedDataSet on a property. |
| get | `GET /v1alpha/{name=properties/*/expandedDataSets/*}` | Lookup for a single ExpandedDataSet. |
| list | `GET /v1alpha/{parent=properties/*}/expandedDataSets` | Lists ExpandedDataSets on a property. |
| patch | `PATCH /v1alpha/{expandedDataSet.name=properties/*/expandedDataSets/*}` | Updates a ExpandedDataSet on a property. |

## REST Resource: v1alpha.properties.firebaseLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/firebaseLinks` | Creates a FirebaseLink. |
| delete | `DELETE /v1alpha/{name=properties/*/firebaseLinks/*}` | Deletes a FirebaseLink on a property |
| list | `GET /v1alpha/{parent=properties/*}/firebaseLinks` | Lists FirebaseLinks on a property. |

## REST Resource: v1alpha.properties.googleAdsLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/googleAdsLinks` | Creates a GoogleAdsLink. |
| delete | `DELETE /v1alpha/{name=properties/*/googleAdsLinks/*}` | Deletes a GoogleAdsLink on a property |
| list | `GET /v1alpha/{parent=properties/*}/googleAdsLinks` | Lists GoogleAdsLinks on a property. |
| patch | `PATCH /v1alpha/{googleAdsLink.name=properties/*/googleAdsLinks/*}` | Updates a GoogleAdsLink on a property |

## REST Resource: v1alpha.properties.keyEvents
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/keyEvents` | Creates a Key Event. |
| delete | `DELETE /v1alpha/{name=properties/*/keyEvents/*}` | Deletes a Key Event. |
| get | `GET /v1alpha/{name=properties/*/keyEvents/*}` | Retrieve a single Key Event. |
| list | `GET /v1alpha/{parent=properties/*}/keyEvents` | Returns a list of Key Events in the specified parent property. |
| patch | `PATCH /v1alpha/{keyEvent.name=properties/*/keyEvents/*}` | Updates a Key Event. |

## REST Resource: v1alpha.properties.reportingDataAnnotations
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/reportingDataAnnotations` | Creates a Reporting Data Annotation. |
| delete | `DELETE /v1alpha/{name=properties/*/reportingDataAnnotations/*}` | Deletes a Reporting Data Annotation. |
| get | `GET /v1alpha/{name=properties/*/reportingDataAnnotations/*}` | Lookup a single Reporting Data Annotation. |
| list | `GET /v1alpha/{parent=properties/*}/reportingDataAnnotations` | List all Reporting Data Annotations on a property. |
| patch | `PATCH /v1alpha/{reportingDataAnnotation.name=properties/*/reportingDataAnnotations/*}` | Updates a Reporting Data Annotation. |

## REST Resource: v1alpha.properties.rollupPropertySourceLinks
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/rollupPropertySourceLinks` | Creates a roll-up property source link. |
| delete | `DELETE /v1alpha/{name=properties/*/rollupPropertySourceLinks/*}` | Deletes a roll-up property source link. |
| get | `GET /v1alpha/{name=properties/*/rollupPropertySourceLinks/*}` | Lookup for a single roll-up property source Link. |
| list | `GET /v1alpha/{parent=properties/*}/rollupPropertySourceLinks` | Lists roll-up property source Links on a property. |

## REST Resource: v1alpha.properties.searchAds360Links
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/searchAds360Links` | Creates a SearchAds360Link. |
| delete | `DELETE /v1alpha/{name=properties/*/searchAds360Links/*}` | Deletes a SearchAds360Link on a property. |
| get | `GET /v1alpha/{name=properties/*/searchAds360Links/*}` | Look up a single SearchAds360Link |
| list | `GET /v1alpha/{parent=properties/*}/searchAds360Links` | Lists all SearchAds360Links on a property. |
| patch | `PATCH /v1alpha/{searchAds360Link.name=properties/*/searchAds360Links/*}` | Updates a SearchAds360Link on a property. |

## REST Resource: v1alpha.properties.subpropertyEventFilters
### Methods
| Method | HTTP request | Description |
|---|---|---|
| create | `POST /v1alpha/{parent=properties/*}/subpropertyEventFilters` | Creates a subproperty Event Filter. |
| delete | `DELETE /v1alpha/{name=properties/*/subpropertyEventFilters/*}` | Deletes a subproperty event filter. |
| get | `GET /v1alpha/{name=properties/*/subpropertyEventFilters/*}` | Lookup for a single subproperty Event Filter. |
| list | `GET /v1alpha/{parent=properties/*}/subpropertyEventFilters` | List all subproperty Event Filters on a property. |
| patch | `PATCH /v1alpha/{subpropertyEventFilter.name=properties/*/subpropertyEventFilters/*}` | Updates a subproperty Event Filter. |

## REST Resource: v1alpha.properties.subpropertySyncConfigs
### Methods
| Method | HTTP request | Description |
|---|---|---|
| get | `GET /v1alpha/{name=properties/*/subpropertySyncConfigs/*}` | Lookup for a single SubpropertySyncConfig. |
| list | `GET /v1alpha/{parent=properties/*}/subpropertySyncConfigs` | List all SubpropertySyncConfig resources for a property. |
| patch | `PATCH /v1alpha/{subpropertySyncConfig.name=properties/*/subpropertySyncConfigs/*}` | Updates a SubpropertySyncConfig. |