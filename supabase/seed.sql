-- HT Makina Taşlama - başlangıç hizmet verileri
-- schema.sql çalıştırıldıktan SONRA bunu çalıştırın.

insert into services (title, slug, summary, detail, tolerance_note, order_index) values
(
  'Delik Taşlama',
  'delik-taslama',
  'Silindirik metal parçaların iç yüzeylerini ve iç çaplarını mikron hassasiyetinde işleme hizmeti.',
  'Rulman yatakları, kovanlar ve dişli iç yuvalarının pürüzsüzleştirilmesinde kullanılır. Parçanın iç çapı, tezgahımızda mikron toleransla ölçülür ve istenen ölçüye getirilir.',
  '⌀ toleransı ± 0.005 mm''e kadar',
  1
),
(
  'Silindirik Taşlama',
  'silindirik-taslama',
  'Miller, akslar, pleytler ve dönen mekanik parçaların dış yüzeylerini mükemmel dairesel forma ve hassas ölçüye getirme işlemi.',
  'Parçaların yüksek devirlerde balans yapmadan, sarsıntısız çalışmasını sağlar. Dönme simetrisi ve yüzey pürüzlülüğü sıkı toleranslarla kontrol edilir.',
  'Dairesellik sapması < 0.003 mm',
  2
),
(
  'Satıh (Yüzey) Taşlama',
  'satih-yuzey-taslama',
  'Metal plakaların, kalıp bloklarının ve şaselerin düz yüzeylerini pürüzsüzleştirme ve mikron düzeyinde düzleme işlemi.',
  'Lazer kesim veya ısıl işlem (sertleştirme) sonrası eğrilen metal parçaların kusursuz şekilde düzeltilmesi (parça düzleme) sağlanır.',
  'Düzlemsellik ± 0.01 mm',
  3
),
(
  'Çapak Alma ve Yüzey Temizleme',
  'capak-alma-yuzey-temizleme',
  'Lazer kesim, kaynak ya da döküm işlemlerinin ardından metal parçaların kenar ve yüzeyinde oluşan çapak, tufal ve kararmaları temizleme hizmeti.',
  'Parça, sonraki üretim adımına veya montaja hazır, pürüzsüz ve temiz yüzeyle teslim edilir.',
  null,
  4
)
on conflict (slug) do nothing;
