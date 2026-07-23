-- Anlık bildirim (Web Push) abonelikleri için tablo.
-- Sadece admin panelinden (service role ile) kullanılır, herkese açık
-- erişim yoktur — RLS açık ama hiçbir public policy tanımlı değil.
-- SQL Editor'da bir kez çalıştırmanız yeterli.

create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);

alter table push_subscriptions enable row level security;
-- Bilerek hiçbir public policy eklenmiyor: anon rolü hiçbir işlem yapamaz,
-- yalnızca sunucu tarafındaki SUPABASE_SERVICE_ROLE_KEY erişebilir.
