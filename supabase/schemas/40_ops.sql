create table if not exists ops.integration_events (
  id uuid primary key default gen_random_uuid(),

  provider text not null,
  event_type text not null,

  status text not null default 'pending',
  payload jsonb not null default '{}'::jsonb,
  error_message text,

  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists integration_events_status_idx
  on ops.integration_events (status, created_at);

create index if not exists integration_events_provider_idx
  on ops.integration_events (provider, created_at desc);