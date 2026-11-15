create table public.enquiries (
  id uuid primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  service text not null check (service in (
    'New website or redesign',
    'Maintenance and support',
    'Website repair or improvement',
    'Custom web solution',
    'Something else'
  )),
  message text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

create index enquiries_created_at_id_idx on public.enquiries (created_at desc, id desc);

create table public.enquiry_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create table public.enquiry_rate_limits (
  bucket text not null,
  window_start timestamptz not null,
  count integer not null,
  primary key (bucket, window_start)
);

create index enquiry_rate_limits_window_idx on public.enquiry_rate_limits (window_start);

alter table public.enquiries enable row level security;
alter table public.enquiry_admins enable row level security;
alter table public.enquiry_rate_limits enable row level security;

revoke all on public.enquiries, public.enquiry_admins, public.enquiry_rate_limits
  from public, anon, authenticated, service_role;

grant select on public.enquiries, public.enquiry_admins to authenticated;
grant select, insert on public.enquiries to service_role;
grant select, insert, update, delete on public.enquiry_rate_limits to service_role;

create policy "Admins can check their own membership"
  on public.enquiry_admins for select to authenticated
  using (user_id = (select auth.uid()));

create policy "Admins can read enquiries"
  on public.enquiries for select to authenticated
  using (exists (
    select 1 from public.enquiry_admins where user_id = (select auth.uid())
  ));

create function public.record_enquiry(
  submission_id uuid, visitor_name text, visitor_email text,
  requested_service text, visitor_message text, email_bucket text, ip_bucket text
)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  existing public.enquiries%rowtype;
  current_window timestamptz := date_trunc('hour', now());
begin
  perform pg_advisory_xact_lock(hashtextextended('nifero-enquiry:' || submission_id::text, 0));

  select * into existing from public.enquiries where id = submission_id;
  if found then
    if (existing.name, existing.email, existing.service, existing.message)
        = (visitor_name, visitor_email, requested_service, visitor_message) then
      return 'duplicate';
    end if;
    return 'conflict';
  end if;

  delete from public.enquiry_rate_limits where window_start < current_window - interval '1 hour';

  if ip_bucket is not null then
    insert into public.enquiry_rate_limits as limits values (ip_bucket, current_window, 1)
    on conflict (bucket, window_start) do update set count = limits.count + 1
    where limits.count < 8;
    if not found then
      return 'limited';
    end if;
  end if;

  insert into public.enquiry_rate_limits as limits values (email_bucket, current_window, 1)
  on conflict (bucket, window_start) do update set count = limits.count + 1
  where limits.count < 3;
  if not found then
    return 'limited';
  end if;

  insert into public.enquiries (id, name, email, service, message)
    values (submission_id, visitor_name, visitor_email, requested_service, visitor_message);
  return 'saved';
end;
$$;

revoke execute on function public.record_enquiry(uuid, text, text, text, text, text, text)
  from public, anon, authenticated;
grant execute on function public.record_enquiry(uuid, text, text, text, text, text, text)
  to service_role;
