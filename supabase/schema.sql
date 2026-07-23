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

-- ---------- REFERANSLAR (logo + isim) ----------
create table if not exists references_list (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- TEKLİF TALEPLERİ ----------
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company_name text,
  phone text not null,
  email text,
  service_type text,
  material text,
  quantity int,
  delivery_date date,
  file_url text,
  description text not null,
  status text not null default 'yeni'
    check (status in ('yeni','iletisimde','tamamlandi','iptal')),
  created_at timestamptz not null default now()
);

-- ---------- GALERİ ----------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'atolye'
    check (category in ('atolye','makine','tamamlanan','oncesi-sonrasi')),
  image_url text not null,
  before_image_url text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- SSS ----------
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- BLOG / HABER ----------
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  published boolean not null default false,
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
    'hero_subtitle', 'Uzman ekibimiz; delik, silindirik ve satıh taşlama işlerinde hızlı, ölçülü ve garantili çözüm sunar.',
    'about_text', 'HT Makina Taşlama, hassas metal işleme ihtiyaçlarında mikron toleransla çalışır.'
  ))
on conflict (key) do nothing;

insert into site_settings (key, value) values
  ('about', jsonb_build_object(
    'story', 'HT Makina Taşlama, yılların verdiği tecrübeyle kuruldu. Bugün uzman ekibimizle birlikte hassas taşlama işlerinde bölgemizin güvenilir çözüm ortağı olmaya devam ediyoruz.',
    'years_experience', 10,
    'mission', 'Her parçayı istenen toleransta, zamanında ve ilk seferde doğru teslim etmek.',
    'vision', 'Hassas metal işlemede bölgenin ilk tercih edilen atölyesi olmak.',
    'quality_policy', 'Her iş, ölçüm ve kontrolden geçmeden teslim edilmez. Mikron toleransı taviz vermeden takip ederiz.',
    'safety_policy', 'Ekibimiz ve ziyaretçilerimiz için atölyede iş güvenliği kurallarına eksiksiz uyulur; koruyucu ekipman kullanımı zorunludur.'
  ))
on conflict (key) do nothing;

insert into site_settings (key, value) values
  ('hours', jsonb_build_object(
    'hafta_ici_cumartesi', '08:30 - 18:30',
    'pazar', 'Kapalı'
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
alter table gallery enable row level security;
alter table faqs enable row level security;
alter table posts enable row level security;

-- Herkes hizmetleri ve referansları okuyabilir
drop policy if exists "services_public_read" on services;
create policy "services_public_read" on services
  for select using (true);

drop policy if exists "references_public_read" on references_list;
create policy "references_public_read" on references_list
  for select using (true);

-- Site ayarları herkese açık okunur (iletişim bilgisi, başlıklar vs.)
drop policy if exists "settings_public_read" on site_settings;
create policy "settings_public_read" on site_settings
  for select using (true);

-- Herkes teklif / ön sipariş formu gönderebilir (insert), ama okuyamaz
drop policy if exists "quotes_public_insert" on quotes;
create policy "quotes_public_insert" on quotes
  for insert with check (true);

drop policy if exists "preorders_public_insert" on preorders;
create policy "preorders_public_insert" on preorders
  for insert with check (true);

-- Yorumlar: herkes ekleyebilir, sadece onaylanmış olanlar okunabilir
drop policy if exists "comments_public_insert" on comments;
create policy "comments_public_insert" on comments
  for insert with check (true);

drop policy if exists "comments_public_read_approved" on comments;
create policy "comments_public_read_approved" on comments
  for select using (approved = true);

-- Galeri ve SSS herkese açık okunur
drop policy if exists "gallery_public_read" on gallery;
create policy "gallery_public_read" on gallery
  for select using (true);

drop policy if exists "faqs_public_read" on faqs;
create policy "faqs_public_read" on faqs
  for select using (true);

-- Blog: sadece yayınlanmış yazılar herkese açık okunur
drop policy if exists "posts_public_read_published" on posts;
create policy "posts_public_read_published" on posts
  for select using (published = true);

-- =========================================================
-- STORAGE: teklif formundaki teknik resim/PDF yüklemeleri için
-- =========================================================
insert into storage.buckets (id, name, public)
values ('teklif-dosyalari', 'teklif-dosyalari', true)
on conflict (id) do nothing;

-- Dosya yükleme ve okuma sunucu tarafında SUPABASE_SERVICE_ROLE_KEY ile
-- yapıldığı için (RLS bypass), ekstra bir storage politikasına gerek yoktur.
