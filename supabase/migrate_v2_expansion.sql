-- Daha önce schema.sql'i çalıştırdıysanız ve şimdi yeni özellikleri
-- (genişletilmiş teklif formu, galeri, SSS, blog) eklemek istiyorsanız
-- bu dosyayı SQL Editor'da çalıştırın. Mevcut verileriniz SİLİNMEZ.
-- Sıfırdan kuruyorsanız bu dosyaya gerek yok, güncel schema.sql yeterli.

alter table quotes add column if not exists company_name text;
alter table quotes add column if not exists material text;
alter table quotes add column if not exists quantity int;
alter table quotes add column if not exists delivery_date date;
alter table quotes add column if not exists file_url text;

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

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

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

alter table gallery enable row level security;
alter table faqs enable row level security;
alter table posts enable row level security;

drop policy if exists "gallery_public_read" on gallery;
create policy "gallery_public_read" on gallery for select using (true);
drop policy if exists "faqs_public_read" on faqs;
create policy "faqs_public_read" on faqs for select using (true);
drop policy if exists "posts_public_read_published" on posts;
create policy "posts_public_read_published" on posts for select using (published = true);

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

insert into storage.buckets (id, name, public)
values ('teklif-dosyalari', 'teklif-dosyalari', true)
on conflict (id) do nothing;
