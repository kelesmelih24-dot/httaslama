-- =========================================================
-- HT Makina Taşlama - Supabase şeması
-- Bu dosyayı Supabase Dashboard > SQL Editor içine yapıştırıp
-- "Run" ile çalıştırın.
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------- HİZMETLER ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text not null,
  detail text,
  tolerance_note text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- REFERANSLAR ----------
create table if not exists references_list (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  project_title text not null,
  description text,
  image_url text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- TEKLİF TALEPLERİ ----------
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  service_type text,
  description text not null,
  status text not null default 'yeni'
    check (status in ('yeni','iletisimde','tamamlandi','iptal')),
  created_at timestamptz not null default now()
);

-- ---------- ÖN SİPARİŞLER ----------
create table if not exists preorders (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  category text not null,
  part_detail text,
  material text,
  quantity int,
  preferred_date date,
  status text not null default 'yeni'
    check (status in ('yeni','onaylandi','uretimde','tamamlandi','iptal')),
  created_at timestamptz not null default now()
);

-- ---------- YORUMLAR ----------
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  rating int not null check (rating between 1 and 5),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- SİTE AYARLARI (tek satır, key-value) ----------
create table if not exists site_settings (
  key text primary key,
  value jsonb not null
);

insert into site_settings (key, value) values
  ('contact', jsonb_build_object(
    'phone', '0537 349 14 02',
    'whatsapp', '905373491402',
    'email', 'info@htmakinataslama.com',
    'address', 'İvedik OSB, 1459. Sokak No:7, 06374 Yenimahalle/Ankara'
  ))
on conflict (key) do nothing;

insert into site_settings (key, value) values
  ('content', jsonb_build_object(
    'hero_title', 'MİKRON HASSASİYETİNDE TAŞLAMA',
    'hero_subtitle', 'Batuhan Usta ve ekibi; delik, silindirik ve satıh taşlama işlerinde hızlı, ölçülü ve garantili çözüm sunar.',
    'about_text', 'HT Makina Taşlama, hassas metal işleme ihtiyaçlarında mikron toleransla çalışır.'
  ))
on conflict (key) do nothing;

-- =========================================================
-- ROW LEVEL SECURITY
-- Admin panel işlemleri sunucu tarafında SUPABASE_SERVICE_ROLE_KEY
-- ile yapılır ve RLS'yi bypass eder. Aşağıdaki politikalar sadece
-- halka açık (anon) erişimi sınırlamak içindir.
-- =========================================================

alter table services enable row level security;
alter table references_list enable row level security;
alter table quotes enable row level security;
alter table preorders enable row level security;
alter table comments enable row level security;
alter table site_settings enable row level security;

-- Herkes hizmetleri ve referansları okuyabilir
create policy if not exists "services_public_read" on services
  for select using (true);

create policy if not exists "references_public_read" on references_list
  for select using (true);

-- Site ayarları herkese açık okunur (iletişim bilgisi, başlıklar vs.)
create policy if not exists "settings_public_read" on site_settings
  for select using (true);

-- Herkes teklif / ön sipariş formu gönderebilir (insert), ama okuyamaz
create policy if not exists "quotes_public_insert" on quotes
  for insert with check (true);

create policy if not exists "preorders_public_insert" on preorders
  for insert with check (true);

-- Yorumlar: herkes ekleyebilir, sadece onaylanmış olanlar okunabilir
create policy if not exists "comments_public_insert" on comments
  for insert with check (true);

create policy if not exists "comments_public_read_approved" on comments
  for select using (approved = true);
