# Google Cloud Console | Account Insight

**Cloud Run**

## Oversikt

### Mest brukte ressurser

| Navn          | Region        | Type    | Sist oppdatert |
| :------------ | :------------ | :------ | :------------- |
| sgtm-preview  | europe-north1 | Service | 2 dager siden  |
| sgtm-tracking | europe-north1 | Service | 2 dager siden  |

---

## Tjenester

En tjeneste eksponerer et unikt endepunkt og skalerer automatisk den
underliggende infrastrukturen for å håndtere innkommende forespørsler.

Deployer et container-image, kildekode eller en funksjon for å opprette en
tjeneste.

## Domain Mapping

- Ikke satt opp.

**Årsak**: Dokumentasjonen sier "Limited availability and Preview"

Dermed: `No domain mappings to display`

### Tjenesteliste

| Navn          | Deployment type | Req/sec | Region        | Autentisering | Ingress | Sist deployert | Deployert av        |
| :------------ | :-------------- | :------ | :------------ | :------------ | :------ | :------------- | :------------------ |
| sgtm-preview  | Container       | 0.01    | europe-north1 | Public access | All     | 2 dager siden  | marketing@utekos.no |
| sgtm-tracking | Container       | 0       | europe-north1 | Public access | All     | 2 dager siden  | marketing@utekos.no |

---

### Detaljer: `sgtm-preview`

#### Skalering

- **Auto scaling**
  - **Minimum antall instanser:** 0
  - **Maksimum antall instanser:** 1
- **Manuell skalering**
  - **Region:** europe-north1
  - **URL:** Ingen

#### Triggers

Triggers er deaktivert siden standard HTTP-endepunkt URL er deaktivert.

#### Nettverk

- **Ingress:**
  - Intern
  - Tillat trafikk fra eksterne Application Load Balancers
  - **All (valgt)**
- **Endepunkter:**
  - Standard HTTPS endepunkt URL: **Deaktivert**
  - Egendefinerte domener: Ingen

#### Sikkerhet

- **Autentisering:**
  - **Krev autentisering (valgt)**
    - **Identity and Access Management (IAM) (valgt)**
    - Identity Aware Proxy (IAP)
- **Advarsel:** Denne tjenesten er offentlig tilgjengelig fordi 'allUsers' har
  fått tillatelse på tjenesten.
- **Trusseldeteksjon:** Deaktivert

#### YAML-konfigurasjon

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: sgtm-preview
  namespace: '351763550388'
  selfLink: /apis/serving.knative.dev/v1/namespaces/351763550388/services/sgtm-preview
  uid: f7d83a3a-8c08-4fe6-a8bf-730daead5b3e
  resourceVersion: AAZIQQvMk0w
  generation: 5
  creationTimestamp: '2026-01-10T12:58:15.186516Z'
  labels:
    cloud.googleapis.com/location: europe-north1
  annotations:
    serving.knative.dev/creator: utekosmeta@gmail.com
    serving.knative.dev/lastModifier: marketing@utekos.no
    run.googleapis.com/client-name: cloud-console
    run.googleapis.com/operation-id: 3c83e62c-bac9-45db-b8e4-321bf7883ed3
    run.googleapis.com/ingress: all
    run.googleapis.com/ingress-status: all
    run.googleapis.com/default-url-disabled: 'true'
    run.googleapis.com/maxScale: '1'
spec:
  template:
    metadata:
      labels:
        client.knative.dev/nonce: d2891da7-e81a-4196-9b2d-f03539794f28
        run.googleapis.com/startupProbeType: Default
      annotations:
        autoscaling.knative.dev/maxScale: '1'
        run.googleapis.com/client-name: cloud-console
        run.googleapis.com/startup-cpu-boost: 'true'
    spec:
      containerConcurrency: 80
      timeoutSeconds: 60
      serviceAccountName: 351763550388-compute@developer.gserviceaccount.com
      containers:
        - name: gtm-cloud-image-1
          image: gcr.io/cloud-tagging-10302018/gtm-cloud-image:stable
          ports:
            - name: http1
              containerPort: 8080
          env:
            - name: CONTAINER_CONFIG
              value: aWQ9R1RNLVBEOFRTVFFYJmVudj0xJmF1dGg9eTFVdjNsSk12ZFU4VFQtbkkxZHpFdw==
            - name: RUN_AS_PREVIEW_SERVER
              value: 'true'
          resources:
            limits:
              cpu: 1000m
              memory: 512Mi
          startupProbe:
            timeoutSeconds: 240
            periodSeconds: 240
            failureThreshold: 1
            tcpSocket:
              port: 8080
  traffic:
    - percent: 100
      latestRevision: true
status:
  observedGeneration: 5
  conditions:
    - type: Ready
      status: 'True'
      lastTransitionTime: '2026-01-13T08:47:48.294476Z'
    - type: ConfigurationsReady
      status: 'True'
      lastTransitionTime: '2026-01-13T08:47:39.079644Z'
    - type: RoutesReady
      status: 'True'
      lastTransitionTime: '2026-01-13T08:47:48.268743Z'
  latestReadyRevisionName: sgtm-preview-00003-752
  latestCreatedRevisionName: sgtm-preview-00003-752
  traffic:
    - revisionName: sgtm-preview-00003-752
      percent: 100
      latestRevision: true
  address: {}
```

#### Revisionsinnstillinger (`sgtm-preview`)

- **Fakturering:** Request-based
- **Startup CPU boost:** Aktivert
- **Concurrency:** 80
- **Request timeout:** 60 sekunder
- **CPU-grense:** 1
- **Minnegrense:** 512MiB
- **Tjenestekonto:** `351763550388-compute@developer.gserviceaccount.com`

---

### Detaljer: `sgtm-tracking`

#### Revisjon: `sgtm-tracking-00006-ns5`

- Deployert av `marketing@utekos.no` via Cloud Console.

#### Revisionsinnstillinger (`sgtm-tracking`)

- **Fakturering:** Instance-based
- **Startup CPU boost:** Aktivert
- **Concurrency:** 80
- **Request timeout:** 60 sekunder
- **Autoskalering:**
  - **Minimum instanser:** 2
  - **Maksimum instanser:** 10
- **CPU-grense:** 1
- **Minnegrense:** 512MiB
- **Tjenestekonto:** `351763550388-compute@developer.gserviceaccount.com`

#### Miljøvariabler

| Navn                                                                 | Verdi                                                                  |
| :------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `aWQ9R1RNLVBEOFRTVFFYJmVudj0xJmF1dGg9eTFVdjNsSk12ZFU4VFQtbkkxZHpFdw` | `=`                                                                    |
| `PREVIEW_SERVER_URL`                                                 | `https://preview.sgtm.utekos.no`                                       |
| `CONTAINER_CONFIG`                                                   | `aWQ9R1RNLVBEOFRTVFFYJmVudj0xJmF1dGg9eTFVdjNsSk12ZFU4VFQtbkkxZHpFdw==` |

#### YAML-konfigurasjon

```yaml
apiVersion: serving.knative.dev/v1
kind: Revision
metadata:
  name: sgtm-tracking-00006-ns5
  namespace: '351763550388'
  selfLink: /apis/serving.knative.dev/v1/namespaces/351763550388/revisions/sgtm-tracking-00006-ns5
  uid: 77c03bdd-12c4-43a8-ba4b-087cca4f099f
  resourceVersion: AAZIQPfw9Ig
  generation: 1
  creationTimestamp: '2026-01-12T16:39:52.322699Z'
  labels:
    client.knative.dev/nonce: 2c6bdbec-9c67-48af-9116-655d14948193
    serving.knative.dev/configuration: sgtm-tracking
    serving.knative.dev/configurationGeneration: '6'
    serving.knative.dev/service: sgtm-tracking
    serving.knative.dev/serviceUid: 660869d2-ab8b-4118-b596-f1dd015e82c4
    serving.knative.dev/route: sgtm-tracking
    cloud.googleapis.com/location: europe-north1
    run.googleapis.com/startupProbeType: Default
  annotations:
    autoscaling.knative.dev/maxScale: '10'
    autoscaling.knative.dev/minScale: '2'
    run.googleapis.com/client-name: cloud-console
    serving.knative.dev/creator: marketing@utekos.no
    run.googleapis.com/operation-id: 63979788-e1e7-4e71-a648-a582a3bded6f
    run.googleapis.com/cpu-throttling: 'false'
    run.googleapis.com/startup-cpu-boost: 'true'
  ownerReferences:
    - kind: Configuration
      name: sgtm-tracking
      uid: 84416afe-6c60-487e-ad17-12c3cef60720
      apiVersion: serving.knative.dev/v1
      controller: true
      blockOwnerDeletion: true
spec:
  containerConcurrency: 80
  timeoutSeconds: 60
  serviceAccountName: 351763550388-compute@developer.gserviceaccount.com
  containers:
    - name: gtm-cloud-image-1
      image: gcr.io/cloud-tagging-10302018/gtm-cloud-image@sha256:16c407168e2089ef6ed6a43253be1294a2bf693dbdef98e05283ef1299dff8ba
      ports:
        - name: http1
          containerPort: 8080
      env:
        - name: aWQ9R1RNLVBEOFRTVFFYJmVudj0xJmF1dGg9eTFVdjNsSk12ZFU4VFQtbkkxZHpFdw
          value: =
        - name: PREVIEW_SERVER_URL
          value: https://preview.sgtm.utekos.no
        - name: CONTAINER_CONFIG
          value: aWQ9R1RNLVBEOFRTVFFYJmVudj0xJmF1dGg9eTFVdjNsSk12ZFU4VFQtbkkxZHpFdw==
      resources:
        limits:
          cpu: 1000m
          memory: 512Mi
      startupProbe:
        timeoutSeconds: 240
        periodSeconds: 240
        failureThreshold: 1
        tcpSocket:
          port: 8080
```

---

## Logger

### Logger - `sgtm-tracking`

**Dato: 2026-01-15**

Normal `stdout`-logg som viser en "aggregate usage beacon" sendt til Google Tag
Manager.

```json
{
  "insertId": "696961c500031f4cfb4edf53",
  "labels": {
    "instanceId": "005eb6974c01b5225b1f23ba2bc7f6ce4f240b172853b3f5a5903c7487d229700a571727589e86d17f05385e4113fd199ff30e34d9476180e70cded095bc44ac36377409de5601fad4acd2"
  },
  "logName": "projects/utekos-marketing-cloud/logs/run.googleapis.com%2Fstdout",
  "payload": "textPayload",
  "receiveTimestamp": "2026-01-15T21:53:09.206602704Z",
  "severity": "DEFAULT",
  "textPayload": "Sending aggregate usage beacon (see https://www.google.com/analytics/terms/tag-manager/): https://www.googletagmanager.com/sgtm/a?v=s1&id=GTM-PD8TSTQX&iv=40&bv=10&rv=61e0&ts=d_dt!2*1.d_node-ver!24*1.d_xdk!1*1&cu=0.00&cs=0.00&mh=26812704&eb=0&z",
  "timestamp": "2026-01-15T21:53:09.204620Z"
}
```

Eksempel på `request`-logg med `WARNING` (Status 400).

```json
{
  "httpRequest": {
    "latency": "0.008142579s",
    "protocol": "HTTP/1.1",
    "referer": "https://utekos.no/produkter/utekos-techdown?utm_medium=paid&utm_id=120236001163100788&utm_content=120236001163120788&utm_term=120236001163110788&utm_campaign=120236001163100788&fbclid=PAZXh0bgNhZW0BMABhZGlkAasqAYvc2iRzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeQGGxZZj-FemHTJzqB_682VOJQBMtm-vmpbdtVJWL1mIXG7I058XxGs-r_Pg_aem_TSB34JpT2jCkmpWExasDNA&utm_source=facebook&campaign_id=120236001163100788&ad_id=120236001163120788",
    "remoteIp": "13.51.172.63",
    "requestMethod": "GET",
    "requestUrl": "https://sgtm-tracking-351763550388.europe-north1.run.app/gtm.js?id=GTM-5TWMJQFP",
    "status": 400
  },
  "insertId": "6961fe4f0002821d6c30ab54",
  "logName": "projects/utekos-marketing-cloud/logs/run.googleapis.com%2Frequests",
  "severity": "WARNING",
  "timestamp": "2026-01-10T07:22:55.149844Z",
  "trace": "projects/utekos-marketing-cloud/traces/c3df7b09141a3b7ae374e07346cbd014"
}
```

### Logger - `sgtm-preview`

`WARNING`-logg som indikerer et forsøk på å få tilgang til `/.env`, resulterer i
en 404.

```json
{
  "httpRequest": {
    "latency": "0.002334206s",
    "protocol": "HTTP/1.1",
    "remoteIp": "142.93.161.74",
    "requestMethod": "GET",
    "requestUrl": "https://34.8.204.153/.env",
    "status": 404,
    "userAgent": "Mozilla/5.0; Keydrop.io/1.0(onlyscans.com/about);"
  },
  "insertId": "6969227c00069b87970cf582",
  "logName": "projects/utekos-marketing-cloud/logs/run.googleapis.com%2Frequests",
  "severity": "WARNING",
  "timestamp": "2026-01-15T17:23:08.429022Z",
  "trace": "projects/utekos-marketing-cloud/traces/b29ff65f95efd4fe2beb184fc1de8570"
}
```

`INFO`-logg som viser en vellykket GET-forespørsel til `/gtm/get_memo` med
status 204.

```json
{
  "httpRequest": {
    "latency": "20.002651231s",
    "protocol": "HTTP/1.1",
    "referer": "https://sgtm.utekos.no/gtm/debug?id=GTM-PD8TSTQX&gtm_auth=JDQRr2YEWP7EZxjTiuak-A&gtm_preview=env-4&hl=en",
    "remoteIp": "80.212.18.22",
    "requestMethod": "GET",
    "requestUrl": "https://sgtm.utekos.no/gtm/get_memo?id=GTM-PD8TSTQX",
    "status": 204
  },
  "insertId": "69691535000abbf23753b0a6",
  "logName": "projects/utekos-marketing-cloud/logs/run.googleapis.com%2Frequests",
  "severity": "INFO",
  "timestamp": "2026-01-15T16:26:09.698947Z",
  "trace": "projects/utekos-marketing-cloud/traces/90a1b78a5325a5e3933820d6e39b12da"
}
```

---

## Network Services: Load Balancing

### `sgtm-load-balancer`

- **Type:** Application Load Balancer (External)
- **Protokoll:** HTTPS

#### Frontend

| Protokoll | IP:Port          | Sertifikat              | SSL Policy  |
| :-------- | :--------------- | :---------------------- | :---------- |
| HTTPS     | 34.8.204.153:443 | sgtm-cert, sgtm-cert-v2 | GCP default |

#### Routing-regler

| Hosts                   | Paths                   | Backend                     |
| :---------------------- | :---------------------- | :-------------------------- |
| All unmatched (default) | All unmatched (default) | sgtm-utekos-backend-service |
| preview.sgtm.utekos.no  | `/*`                    | preview-sgtm-neg            |
| sgtm.utekos.no          | `/*`                    | sgtm-utekos-backend-service |

#### Backends

| Navn                          | Type                              | Protokoll |
| :---------------------------- | :-------------------------------- | :-------- |
| `preview-sgtm-neg`            | Serverless network endpoint group | HTTPS     |
| `sgtm-utekos-backend-service` | Serverless network endpoint group | HTTPS     |

---

## Certificate Manager

### Classic Certificates

Liste over sertifikater levert av Cloud Load Balancing.

| Navn         | Domene                                 | Utløper       | Type           | Omfang | Status | I bruk av                       |
| :----------- | :------------------------------------- | :------------ | :------------- | :----- | :----- | :------------------------------ |
| sgtm-cert    | sgtm.utekos.no                         | 12. apr. 2026 | Google managed | Global | Aktiv  | sgtm-load-balancer-target-proxy |
| sgtm-cert-v2 | preview.sgtm.utekos.no, sgtm.utekos.no | 12. apr. 2026 | Google managed | Global | Aktiv  | sgtm-load-balancer-target-proxy |
