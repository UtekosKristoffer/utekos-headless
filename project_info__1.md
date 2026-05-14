# Utekos Headless — Codebase Overview (Tracking Codebase Note #1)

## Summary

This is a Next.js + TypeScript “headless” application that sends
analytics/tracking events to multiple third-party providers. Provider
integration is implemented as small, purpose-specific sender functions under
`src/lib/tracking/*`, using shared TypeScript types under `types/tracking/*`.

In this session, the targeted change was fixing an ESLint/TypeScript issue in
the Snapchat sender (`src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts`)
where the code used `(user as any)` to access Snapchat-specific identifiers; the
fix was to extend the shared `MetaUserData` type so the sender can use proper
typed properties.

## Architecture

**Pattern:** “Provider adapter” functions + shared payload/user types.

- **Shared types layer:** `types/tracking/meta/*` defines the cross-provider
  event/user payload shapes.
- **Provider layer:** `src/lib/tracking/<provider>/...` transforms a normalized
  Meta event/user payload into the provider’s HTTP/API request format.
- **Runtime:** sender functions build a payload object and call `fetch(...)`
  (Snapchat) or delegate to server helpers (Google).

**Execution entry points (conceptually):** Other parts of the app construct
`MetaEventPayload` + `MetaUserData` and call the provider-specific sender, e.g.:

- `sendSnapchatBrowserEvent(...)` for Snapchat Browser Conversion API calls.

## Directory Structure

```text
project-root/
├── src/
│   └── lib/
│       └── tracking/
│           ├── snapchat/
│           │   └── sendSnapchatBrowserEvent.ts
│           ├── google/
│           │   └── sendGA4BrowserEvent.ts
│           ├── pinterest/
│           └── utils/
└── types/
    └── tracking/
        ├── meta/
        │   ├── MetaUserData.ts
        │   ├── event/MetaEventPayload.ts
        │   └── index.ts
        └── google/...
```

## Key Abstractions

### `MetaUserData`

- **File**: `types/tracking/meta/MetaUserData.ts` (updated)
- **Responsibility**: Shared identity/contact fields attached to Meta-like
  tracking events, used by multiple providers.
- **Interface**: Optional fields like `email_hash`, `client_ip_address`, etc.
- **Lifecycle**: Pure type—lives only at compile-time; values are supplied by
  caller code.
- **Used by**:
  - `src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts` (now uses
    `user.scid` / `user.click_id` without casting)

**Change made in this session:** added:

- `scid?: string`
- `click_id?: string`

### `MetaEventPayload`

- **File**: `types/tracking/meta/event/MetaEventPayload.ts`
- **Responsibility**: Normalized event information (name, id, time, source URL)
  plus nested event data.
- **Interface**: Includes `eventName`, `eventId`, `eventTime`, `actionSource`,
  `userData`, and optional `eventData`.
- **Used by**:
  - `src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts`

### `sendSnapchatBrowserEvent`

- **File**: `src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts`
- **Responsibility**: Converts `MetaEventPayload` + `MetaUserData` into Snapchat
  Conversions API payload and POSTs to `https://tr.snapchat.com/v2/conversion`.
- **Interface**:
  - `event: MetaEventPayload | undefined`
  - `user: MetaUserData | undefined`
  - `extra?: { sc_cookie1?: string; sc_click_id?: string }` (fallback
    identifiers from cookies)
- **Lifecycle**: Stateless async function; returns parsed JSON response or
  `null` on fetch error.
- **Key behavior**:
  - Early return if required inputs/env vars are missing.
  - Computes `timestamp` from `event.eventTime` (falls back to current epoch
    seconds).
  - Builds `user_data` including hashed email and Snapchat cookie/click
    identifiers.
- **Used by**: caller code that triggers tracking from browser actions.

## Data Flow (Snapchat)

1. Caller builds `event` (`MetaEventPayload`) and `user` (`MetaUserData`) and
   calls `sendSnapchatBrowserEvent(...)`.
2. Function validates inputs/env:
   - If `event`, `user`, `SNAP_PIXEL_ID`, or `SNAP_API_TOKEN` are missing →
     returns `undefined`.
3. Identifiers are resolved:
   - `scCookie1 = user.scid ?? extra?.sc_cookie1`
   - `clickId = user.click_id ?? extra?.sc_click_id`
4. Payload is assembled:
   - `pixel_id`
   - `timestamp`
   - `event_conversion_type: 'WEB'`
   - `event_type` via `mapEventName`
   - `event_id`
   - `user_data` with hashed email + identifiers + UA/IP
   - optional commerce fields from `event.eventData`
5. HTTP POST:
   - `Authorization: Bearer ${SNAP_API_TOKEN}`
   - JSON body = payload
6. Response handling:
   - If `!res.ok` → parse error JSON and throw.
   - On success → returns `await res.json()`.
   - On catch → logs and returns `null`.

## Non-Obvious Behaviors & Design Decisions

- **Type safety vs. cookie-derived identifiers:** The function supports two
  sources for Snapchat identifiers:
  1. typed fields on `MetaUserData` (`scid`, `click_id`)
  2. an `extra` fallback parameter (typically cookie values passed separately)
- **Why this fix matters:** Previously the sender used `(user as any)` to access
  `scid` and `click_id`, which:
  - violates `@typescript-eslint/no-explicit-any` / ESLint rules
  - hides potential mismatches between the caller’s provided user object shape
    and what the sender expects  
    Extending `MetaUserData` makes the shape explicit and ensures all providers
    sharing this type remain consistent.
- **Lint noise note:** `npm run lint` currently reports many unrelated
  errors/warnings across the repo (not introduced by this change). The targeted
  ESLint “Unexpected any” in the Snapchat sender is addressed by removing
  explicit `any`.

## Module Reference

| File                                                    | Purpose                                                                       |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts` | Snapchat Conversion API sender (Meta → Snapchat payload + fetch)              |
| `types/tracking/meta/MetaUserData.ts`                   | Shared identity fields for tracking events (now includes `scid` + `click_id`) |
| `types/tracking/meta/event/MetaEventPayload.ts`         | Shared normalized event payload type                                          |

## Suggested Reading Order

1. `src/lib/tracking/snapchat/sendSnapchatBrowserEvent.ts` — see end-to-end
   payload construction
2. `types/tracking/meta/event/MetaEventPayload.ts` — understand what `event`
   contains
3. `types/tracking/meta/MetaUserData.ts` — understand which identity fields are
   expected
4. `src/lib/tracking/google/sendGA4BrowserEvent.ts` — compare another provider’s
   mapping style
5. `types/tracking/meta/index.ts` — see how types are exported/organized

## What a developer should know

- **Prefer extending shared types** (`types/tracking/*`) over using `(x as any)`
  in provider senders; provider modules rely on these types to remain
  consistent.
- **Provider senders should remain stateless** and pure in transformation; side
  effects are primarily the `fetch` calls and logging on failure.
- **Be aware lint currently fails broadly**; focus on the specific error
  targeted in your PR (here, `no-explicit-any`).
