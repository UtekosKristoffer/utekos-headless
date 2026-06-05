create table if not exists marketing.leads (
  id uuid primary key default gen_random_uuid(),

  email text,
  phone text,
  first_name text,
  last_name text,

  source text not null default 'unknown',
  campaign text,
  medium text,
  content text,
  term text,

  consent_marketing boolean not null default false,
  consent_source text,
  consented_at timestamptz,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
  on marketing.leads (created_at desc);

create index if not exists leads_email_idx
  on marketing.leads (email)
  where email is not null;

create table if not exists marketing.attribution_events (
  id uuid primary key default gen_random_uuid(),

  anonymous_id text,
  lead_id uuid references marketing.leads(id) on delete set null,

  source text,
  medium text,
  campaign text,
  content text,
  term text,

  landing_path text,
  referrer text,
  user_agent text,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index if not exists attribution_events_created_at_idx
  on marketing.attribution_events (created_at desc);

create index if not exists attribution_events_anonymous_id_idx
  on marketing.attribution_events (anonymous_id)
  where anonymous_id is not null;