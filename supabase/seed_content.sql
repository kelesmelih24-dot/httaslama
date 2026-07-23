-- SSS ve Blog bölümlerini boş bırakmamak için örnek/gerçek içerik.
-- SQL Editor'da bir kez çalıştırmanız yeterli. İçerikleri admin panelden
-- (/yonetim/sss ve /yonetim/blog) istediğiniz zaman düzenleyebilir veya
-- silebilirsiniz.

-- ---------------- SSS ----------------
insert into faqs (question, answer, order_index) values
(
  'Teklif almak için hangi bilgileri paylaşmalıyım?',
  'Parçanın ölçüsünü (çap/uzunluk), malzeme türünü, adedini ve varsa teknik resmini paylaşmanız yeterli. Bu bilgilerle tezgah kapasitemizin işinize uygunluğunu ve fiyatı hızlıca değerlendirebiliyoruz.',
  1
),
(
  'Teknik resim veya PDF olmadan iş alıyor musunuz?',
  'Evet. Teknik resim olmasa da parça ölçüsünü ve ne yapılmasını istediğinizi yazılı olarak ya da fotoğrafla iletmeniz çoğu zaman yeterli oluyor. Gerekirse detayları telefonla netleştiriyoruz.',
  2
),
(
  'Hangi malzemelerle çalışıyorsunuz?',
  'Çelik, döküm, alüminyum ve paslanmaz çelik başta olmak üzere çoğu metal malzemede taşlama yapabiliyoruz. Farklı bir malzemeniz varsa teklif formunda belirtmeniz yeterli.',
  3
),
(
  'Toleranslarınız / hassasiyet seviyeniz nedir?',
  'İşin türüne göre mikron seviyesinde (örneğin ⌀ toleransı ± 0.005 mm''e kadar) hassasiyetle çalışabiliyoruz. Kesin tolerans, parçanın ölçüsüne ve talep edilen işleme göre değişir.',
  4
),
(
  'Teslim süreniz ne kadar?',
  'Süre, işin yoğunluğuna ve parça sayısına göre değişir. Teklif talebinizi aldıktan sonra size net bir teslim tarihi veriyoruz; ön sipariş formundan tercih ettiğiniz tarihi de belirtebilirsiniz.',
  5
),
(
  'Şehir dışından sipariş kabul ediyor musunuz?',
  'Evet, şehir dışından gelen parçalar için de çalışıyoruz. Kargo/nakliye detaylarını teklif talebinizde belirtirseniz süreci birlikte planlarız.',
  6
)
on conflict do nothing;

-- ---------------- BLOG ----------------
insert into posts (title, slug, excerpt, content, published) values
(
  'Silindirik Taşlama Nedir, Hangi Parçalarda Kullanılır?',
  'silindirik-taslama-nedir-hangi-parcalarda-kullanilir',
  'Miller, akslar ve dönen mekanik parçaların dış yüzeyini mikron hassasiyetinde işleyen bu yöntemin ne işe yaradığını anlatıyoruz.',
  'Silindirik taşlama, dönen mekanik parçaların dış yüzeyini mükemmel bir dairesel forma ve hassas ölçüye getirmek için kullanılan bir metal işleme yöntemidir.

Özellikle miller, akslar, pleytler ve yüksek devirde çalışan parçalarda tercih edilir. Amaç, parçanın dönme simetrisini bozmadan yüzeyini pürüzsüzleştirmek ve istenen çapa mikron hassasiyetinde ulaşmaktır.

Bu işlem doğru yapılmadığında parçalar yüksek devirlerde titreşim yapar, rulman ve yatak ömrü kısalır. Silindirik taşlama sayesinde parça, balans ihtiyacı duymadan sarsıntısız çalışabilir.

Hangi parçalarda kullanılır?
- Motor milleri ve şaftlar
- Redüktör ve dişli kutusu akslari
- Hidrolik piston ve kovanlar
- Yüksek devirli döner ekipman parçaları

Parçanızın ölçüsünü ve malzemesini bize ilettiğinizde, tezgah kapasitemizin işinize uygunluğunu hızlıca değerlendirebiliriz.',
  true
),
(
  'Yüzey Taşlamada Mikron Tolerans Neden Önemlidir?',
  'yuzey-taslamada-mikron-tolerans-neden-onemlidir',
  'Kalıp blokları ve şaseler gibi düz yüzeylerin neden mikron seviyesinde düzeltilmesi gerektiğini açıklıyoruz.',
  'Satıh (yüzey) taşlama, metal plakaların, kalıp bloklarının ve şase gibi düz yüzeylerin pürüzsüzleştirilmesi ve mikron düzeyinde düzeltilmesi işlemidir.

Özellikle lazer kesim veya ısıl işlem (sertleştirme) sonrası metal parçalarda küçük eğrilmeler oluşur. Bu eğrilmeler gözle görülmese bile, parça bir kalıba veya montaj noktasına oturduğunda ciddi sorunlara yol açabilir.

Mikron seviyesinde düzlemsellik neden önemli?
- Kalıp yüzeyleri tam temas etmezse baskı kalitesi düşer
- Montaj noktalarında boşluk kalırsa titreşim ve aşınma artar
- Hassas ölçüm gerektiren parçalarda küçük sapmalar bile toleransı aşabilir

Atölyemizde satıh taşlama işlemini mikron hassasiyetinde (± 0.01 mm seviyesinde) yaparak parçanızın kusursuz bir düzlem yüzeye kavuşmasını sağlıyoruz.',
  true
),
(
  'Lazer Kesim Sonrası Çapak Alma İşlemi Neden Gereklidir?',
  'lazer-kesim-sonrasi-capak-alma-islemi-neden-gereklidir',
  'Lazer kesim, kaynak veya döküm sonrası oluşan çapak ve tufalların neden temizlenmesi gerektiğini anlatıyoruz.',
  'Lazer kesim, kaynak ya da döküm işlemlerinin ardından metal parçaların kenarlarında ve yüzeyinde sert çapaklar, tufallar ve kararmalar oluşur.

Bu çapaklar gözle küçük görünse de, parçanın bir sonraki üretim adımına veya montaja hazır hale gelmesini engeller. Keskin çapaklar ayrıca montaj sırasında yaralanma riski de taşır.

Çapak alma ve yüzey temizleme işlemiyle:
- Parça montaja hazır, pürüzsüz bir yüzeye kavuşur
- Sonraki işlem adımları (boyama, kaplama, taşlama) daha sağlıklı yapılabilir
- Keskin kenarlardan kaynaklı iş güvenliği riskleri azalır

Lazer kesim veya kaynak sonrası parçalarınızı bize ulaştırarak bu süreci hızlıca tamamlatabilirsiniz.',
  true
),
(
  'Doğru Taşlama Atölyesi Seçerken Nelere Dikkat Etmelisiniz?',
  'dogru-taslama-atolyesi-secerken-nelere-dikkat-etmelisiniz',
  'Hassas metal işleme ihtiyacınız için atölye seçerken sormanız gereken soruları derledik.',
  'Hassas taşlama işleri, küçük bir hata payıyla bile parçanın kullanılamaz hale gelmesine yol açabilir. Bu yüzden doğru atölyeyi seçmek üretim sürecinizin en kritik adımlarından biridir.

Atölye seçerken dikkat edilmesi gerekenler:

1. Tolerans kapasitesi: Atölyenin hangi hassasiyette çalışabildiğini (örneğin mikron seviyesinde tolerans) sorun.
2. Malzeme deneyimi: Kullandığınız malzemede (çelik, döküm, alüminyum vb.) daha önce çalışmışlar mı?
3. Teslim süresi netliği: İşin ne zaman teslim edileceği konusunda net bir tarih verebiliyorlar mı?
4. İletişim hızı: Teklif talebine ne kadar sürede dönüş yapıyorlar?
5. Referanslar: Daha önce hangi firmalarla çalıştıklarını görebiliyor musunuz?

Bu kriterleri göz önünde bulundurarak seçim yapmak, hem zamandan hem maliyetten tasarruf etmenizi sağlar. Sorularınız için bize ulaşabilirsiniz.',
  true
)
on conflict (slug) do nothing;
