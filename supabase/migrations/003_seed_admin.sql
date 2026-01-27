-- Seed admin allowlist for tests
insert into public.admin_emails(email) values ('admin@codimdev.com')
on conflict (email) do nothing;
