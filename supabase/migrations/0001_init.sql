-- שלובות: סכמת בסיס - נרשמים, תשלומים, audit log של callbacks מנדרים פלוס.
-- ראו /Users/arieadler/.claude/plans/velvety-finding-river.md §3 לפירוט מלא.

create extension if not exists pgcrypto;

create type registrant_status as enum ('pending', 'active', 'cancelled');
create type payment_status as enum ('pending', 'paid', 'failed', 'overdue');
create type billing_cycle as enum ('monthly', 'annual');
create type payment_kind as enum ('one_time', 'recurring_setup', 'recurring_charge');

create table registrants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),  -- NULL ב-v1; ל-Phase 2 (פורטל חברים)
  full_name text not null,
  national_id text,
  email text not null,
  phone text not null,
  address text,
  city text,
  billing_cycle billing_cycle not null,
  status registrant_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  registrant_id uuid not null references registrants(id) on delete cascade,
  reference uuid not null unique default gen_random_uuid(),
  kind payment_kind not null,
  amount_ils numeric(10,2) not null,
  billing_cycle billing_cycle not null,
  status payment_status not null default 'pending',
  nedarim_transaction_id text,
  nedarim_raw_payload jsonb,
  manually_overridden boolean not null default false,
  manual_override_reason text,
  manual_override_by uuid references auth.users(id),
  due_date date,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table nedarim_webhook_audit (
  id bigint generated always as identity primary key,
  received_at timestamptz not null default now(),
  reference uuid,
  raw_payload jsonb not null,
  raw_headers jsonb,
  processed boolean not null default false,
  processing_error text
);

create index on payments (registrant_id);
create index on payments (status);
create index on payments (reference);
create index on registrants (status);
create index on registrants (email);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_registrants before update on registrants
  for each row execute function set_updated_at();
create trigger set_updated_at_payments before update on payments
  for each row execute function set_updated_at();

-- RLS
alter table registrants enable row level security;
alter table payments enable row level security;
alter table nedarim_webhook_audit enable row level security;

create policy "anon can insert registrant" on registrants
  for insert to anon
  with check (true);

create policy "staff select registrants" on registrants
  for select to authenticated
  using (true);

create policy "staff update registrants" on registrants
  for update to authenticated
  using (true);

create policy "staff select payments" on payments
  for select to authenticated
  using (true);

create policy "staff update payments" on payments
  for update to authenticated
  using (true);

-- nedarim_webhook_audit: אין policies בכלל - רק service_role (Edge Functions) נוגע בטבלה.
