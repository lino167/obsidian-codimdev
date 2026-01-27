-- Admin allowlist + RLS policies for admin-only access
-- Fill admin_emails with the authorized operators

create table if not exists public.admin_emails (
  email text primary key
);

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_emails e
    where lower(e.email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );
$$;

-- Projects: public read, admin write
alter table public.projects enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'projects' and policyname = 'read_projects_public'
  ) then
    create policy "read_projects_public" on public.projects for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'projects' and policyname = 'write_projects_admin_only_insert'
  ) then
    create policy "write_projects_admin_only_insert" on public.projects for insert with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'projects' and policyname = 'write_projects_admin_only_update'
  ) then
    create policy "write_projects_admin_only_update" on public.projects for update using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'projects' and policyname = 'write_projects_admin_only_delete'
  ) then
    create policy "write_projects_admin_only_delete" on public.projects for delete using (public.is_admin());
  end if;
end $$;

-- Leads: admin-only read and write
alter table public.leads enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'leads_admin_only_select'
  ) then
    create policy "leads_admin_only_select" on public.leads for select using (public.is_admin());
  end if;
  -- permitir inserção pública (site captura leads), leitura só admin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'leads_public_insert'
  ) then
    create policy "leads_public_insert" on public.leads for insert with check (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'leads_admin_only_update'
  ) then
    create policy "leads_admin_only_update" on public.leads for update using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'leads' and policyname = 'leads_admin_only_delete'
  ) then
    create policy "leads_admin_only_delete" on public.leads for delete using (public.is_admin());
  end if;
end $$;

-- Finances: admin-only read and write
alter table public.finances enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'finances' and policyname = 'finances_admin_only_select'
  ) then
    create policy "finances_admin_only_select" on public.finances for select using (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'finances' and policyname = 'finances_admin_only_insert'
  ) then
    create policy "finances_admin_only_insert" on public.finances for insert with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'finances' and policyname = 'finances_admin_only_update'
  ) then
    create policy "finances_admin_only_update" on public.finances for update using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'finances' and policyname = 'finances_admin_only_delete'
  ) then
    create policy "finances_admin_only_delete" on public.finances for delete using (public.is_admin());
  end if;
end $$;

-- Certificates: admin-only read and write
alter table public.certificates enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'certificates' and policyname = 'certificates_admin_only_select'
  ) then
    create policy "certificates_admin_only_select" on public.certificates for select using (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'certificates' and policyname = 'certificates_admin_only_insert'
  ) then
    create policy "certificates_admin_only_insert" on public.certificates for insert with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'certificates' and policyname = 'certificates_admin_only_update'
  ) then
    create policy "certificates_admin_only_update" on public.certificates for update using (public.is_admin()) with check (public.is_admin());
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'certificates' and policyname = 'certificates_admin_only_delete'
  ) then
    create policy "certificates_admin_only_delete" on public.certificates for delete using (public.is_admin());
  end if;
end $$;

-- Optional: seed example (remove in production)
-- insert into public.admin_emails(email) values ('admin@empresa.com');

-- Secure admin_emails with RLS: only service_role can read/write
alter table public.admin_emails enable row level security;
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'admin_emails' and policyname = 'admin_emails_service_role_select'
  ) then
    create policy "admin_emails_service_role_select" on public.admin_emails for select using ((auth.jwt() ->> 'role') = 'service_role');
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'admin_emails' and policyname = 'admin_emails_service_role_insert'
  ) then
    create policy "admin_emails_service_role_insert" on public.admin_emails for insert with check ((auth.jwt() ->> 'role') = 'service_role');
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'admin_emails' and policyname = 'admin_emails_service_role_delete'
  ) then
    create policy "admin_emails_service_role_delete" on public.admin_emails for delete using ((auth.jwt() ->> 'role') = 'service_role');
  end if;
end $$;

