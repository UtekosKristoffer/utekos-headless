---
title: Google Analytics Data API
service: analyticsdata.googleapis.com
---

# Google Analytics Data API

Accesses report data in Google Analytics.

> **Warning**: Creating multiple Customer Applications, Accounts, or Projects to
> simulate or act as a single Customer Application, Account, or Project
> (respectively) or to circumvent Service-specific usage limits or quotas is a
> direct violation of Google Cloud Platform Terms of Service as well as Google
> APIs Terms of Service. These actions can result in immediate termination of
> your GCP project(s) without any warning.

## Service

- **Name**: `analyticsdata.googleapis.com`
- **Client libraries**: Prefer Google-provided client libraries. If you must
  call directly, use the details below.

## Discovery documents

A Discovery Document is a machine-readable specification for describing and
consuming REST APIs. This service provides:

- https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta
- https://analyticsdata.googleapis.com/$discovery/rest?version=v1alpha

## Service endpoint

- Base URL: `https://analyticsdata.googleapis.com`
- All URIs below are relative to this base URL.

## REST resources and methods

### v1beta.properties

- `POST /v1beta/{property=properties/*}:batchRunPivotReports` — Returns multiple
  pivot reports in a batch.
- `POST /v1beta/{property=properties/*}:batchRunReports` — Returns multiple
  reports in a batch.
- `POST /v1beta/{property=properties/*}:checkCompatibility` — Lists dimensions
  and metrics that can be added to a report request and maintain compatibility.
- `GET /v1beta/{name=properties/*/metadata}` — Returns metadata for dimensions
  and metrics available in reporting methods.
- `POST /v1beta/{property=properties/*}:runPivotReport` — Returns a customized
  pivot report of your Google Analytics event data.
- `POST /v1beta/{property=properties/*}:runRealtimeReport` — Returns a
  customized report of realtime event data for your property.
- `POST /v1beta/{property=properties/*}:runReport` — Returns a customized report
  of your Google Analytics event data.

### v1beta.properties.audienceExports

- `POST /v1beta/{parent=properties/*}/audienceExports` — Creates an audience
  export for later retrieval.
- `GET /v1beta/{name=properties/*/audienceExports/*}` — Gets configuration
  metadata about a specific audience export.
- `GET /v1beta/{parent=properties/*}/audienceExports` — Lists all audience
  exports for a property.
- `POST /v1beta/{name=properties/*/audienceExports/*}:query` — Retrieves an
  audience export of users.

### v1alpha.properties

- `GET /v1alpha/{name=properties/*/propertyQuotasSnapshot}` — Get all property
  quotas organized by quota category for a given property.
- `POST /v1alpha/{property=properties/*}:runFunnelReport` — Returns a customized
  funnel report of your Google Analytics event data.

### v1alpha.properties.audienceLists

- `POST /v1alpha/{parent=properties/*}/audienceLists` — Creates an audience list
  for later retrieval.
- `GET /v1alpha/{name=properties/*/audienceLists/*}` — Gets configuration
  metadata about a specific audience list.
- `GET /v1alpha/{parent=properties/*}/audienceLists` — Lists all audience lists
  for a property.
- `POST /v1alpha/{name=properties/*/audienceLists/*}:query` — Retrieves an
  audience list of users.

### v1alpha.properties.recurringAudienceLists

- `POST /v1alpha/{parent=properties/*}/recurringAudienceLists` — Creates a
  recurring audience list.
- `GET /v1alpha/{name=properties/*/recurringAudienceLists/*}` — Gets
  configuration metadata about a specific recurring audience list.
- `GET /v1alpha/{parent=properties/*}/recurringAudienceLists` — Lists all
  recurring audience lists for a property.

### v1alpha.properties.reportTasks

- `POST /v1alpha/{parent=properties/*}/reportTasks` — Initiates the creation of
  a report task.
- `GET /v1alpha/{name=properties/*/reportTasks/*}` — Gets report metadata about
  a specific report task.
- `GET /v1alpha/{parent=properties/*}/reportTasks` — Lists all report tasks for
  a property.
- `POST /v1alpha/{name=properties/*/reportTasks/*}:query` — Retrieves a report
  task's content.
