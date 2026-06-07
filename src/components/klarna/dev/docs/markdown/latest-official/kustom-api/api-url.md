# API URLs

Kustom APIs are available through differentÂ **base URLs**Â relating to your location and interaction needs.
To access these APIs, combine theÂ **base URLÂ +Â endpoint**, for example to "create an order" construct the
URL to call like this: `Base URL for environment` + `/payments/v1/authorizations/`

### Example url for Live environment

```text
https://api.kustom.co/payments/v1/authorizations/
```

> Use the testing environments to get familiarized with API behaviour and try out things; use the live
> environments to start real transactions with Kustom.

**NOTE**:Â UseÂ `HTTPS`Â for all of your interactions with Kustom APIs.

### Live (production)

- `https://api.kustom.co/`

### Testing (playground)

- `https://api.playground.kustom.co/`

Important information Klarnaâ€™s live API **(https://api.klarna.com/)** will remain functional alongside
Kustomâ€™s own API for an undefined transitional period.

## HTTP versions

The API endpoints supports the HTTP/1.1 and HTTP/2 protocol.
