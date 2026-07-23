-- Bu dosyayı SADECE daha önce eski schema.sql'i çalıştırdıysanız kullanın
-- (references_list tablosu client_name/project_title/description/image_url
-- sütunlarıyla oluşmuşsa). Henüz hiç çalıştırmadıysanız bu dosyayı atlayın,
-- güncel schema.sql zaten doğru yapıyı oluşturur.

drop table if exists references_list cascade;

create table references_list (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

alter table references_list enable row level security;

drop policy if exists "references_public_read" on references_list;
create policy "references_public_read" on references_list
  for select using (true);
