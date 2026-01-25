alter table public.projects enable row level security;
alter table public.leads enable row level security;
alter table public.finances enable row level security;
alter table public.certificates enable row level security;

create policy "projects_select_anon" on public.projects for select to anon using (true);
create policy "projects_select_authenticated" on public.projects for select to authenticated using (true);

create policy "leads_insert_authenticated" on public.leads for insert to authenticated with check (true);

create index idx_projects_created_at on public.projects (created_at desc);
create index idx_leads_created_at on public.leads (created_at desc);
create index idx_finances_created_at on public.finances (created_at desc);
create index idx_certificates_date_issued on public.certificates (date_issued desc);

alter table public.projects add constraint projects_status_check check (status in ('deployed','dev','archived'));
alter table public.leads add constraint leads_status_check check (status in ('new','contacted','closed'));
alter table public.finances add constraint finances_type_check check (type in ('income','expense'));
