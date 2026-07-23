-- Çalışma saatlerini doğrudan istediğiniz değerle güncellemek için
-- (aynı işlemi /yonetim/ayarlar sayfasından da yapabilirsiniz)

insert into site_settings (key, value) values
  ('hours', jsonb_build_object(
    'hafta_ici_cumartesi', '08:30 - 18:30',
    'pazar', 'Kapalı'
  ))
on conflict (key) do update set value = excluded.value;
