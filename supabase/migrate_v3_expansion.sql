-- HT Makina Taşlama - v3 genişletme paketi
-- SQL Editor'da bir kez çalıştırmanız yeterli. Mevcut verileriniz silinmez.

-- ---------------- YENİ HİZMETLER (5 adet) ----------------
insert into services (title, slug, summary, detail, tolerance_note, order_index) values
(
  'CNC Taşlama',
  'cnc-taslama',
  'Bilgisayar kontrollü tezgahlarda, karmaşık geometrili parçaların tam otomasyonla ve tekrarlanabilir hassasiyette taşlanması.',
  'CNC taşlama, aynı parçadan çok sayıda üretilecekse veya karmaşık bir profil söz konusuysa manuel taşlamaya göre çok daha tutarlı sonuç verir. Programlanan ölçüler, her parçada birebir aynı hassasiyetle tekrarlanır.',
  'Tekrarlanabilirlik ± 0.005 mm',
  5
),
(
  'Kalıp Taşlama',
  'kalip-taslama',
  'Enjeksiyon ve sac metal kalıplarının yüzeylerinin, ayna gibi pürüzsüz ve ölçüsel olarak tam uyumlu hale getirilmesi.',
  'Kalıp yüzeyindeki en küçük pürüz veya sapma, üretilen parçalarda kusura dönüşür. Kalıp taşlama ile kalıp blokları ve komponentleri mikron hassasiyetinde düzeltilir, kalıbın ömrü ve baskı kalitesi artar.',
  'Yüzey pürüzlülüğü Ra ≤ 0.4 µm',
  6
),
(
  'Hassas Taşlama',
  'hassas-taslama',
  'Standart toleransların yetersiz kaldığı, mikron altı hassasiyet gerektiren kritik parçalar için özel taşlama hizmeti.',
  'Havacılık, medikal veya hassas ölçüm ekipmanlarında kullanılan parçalar gibi çok sıkı toleranslı işler için tezgahımızın üst sınır hassasiyetini kullanıyoruz. Her parça, işlem sonrası ölçüm raporu ile teslim edilebilir.',
  'Tolerans ± 0.002 mm''e kadar',
  7
),
(
  'Parça Revizyonu',
  'parca-revizyonu',
  'Aşınmış, ölçüsünden çıkmış veya hasarlı metal parçaların taşlanarak orijinal ölçü ve fonksiyonuna kavuşturulması.',
  'Yeni parça üretmek yerine mevcut parçayı revize etmek çoğu zaman daha hızlı ve ekonomiktir. Aşınan yüzeyler taşlanarak düzeltilir, gerekirse ölçüsel toleranslar yeniden sağlanır.',
  null,
  8
),
(
  'Özel Üretim Çözümleri',
  'ozel-uretim-cozumleri',
  'Standart kalıplara uymayan, özel tasarım veya prototip parçalar için baştan sona kişiye özel taşlama çözümü.',
  'Elinizde sadece bir teknik resim veya numune parça varsa, ihtiyacınıza göre özel bir işleme planı çıkarıp uyguluyoruz. Prototip ve tekil üretimlerde de aynı hassasiyetle çalışıyoruz.',
  null,
  9
)
on conflict (slug) do nothing;

-- ---------------- GALERİ: video desteği ----------------
alter table gallery add column if not exists video_url text;

-- Not: Galeriye örnek/placeholder görsel eklenmiyor — rastgele stok fotoğraf
-- servisleri (picsum.photos vb.) konuyla alakasız görseller döndürüyor.
-- Gerçek atölye/makine fotoğraflarınızı admin panelden (/yonetim/galeri)
-- eklemeniz yeterli. Video eklemek isterseniz aynı panelde "Video URL"
-- alanına bir mp4 linki veya YouTube linki yapıştırabilirsiniz.

-- ---------------- BLOG: 4 yeni yazı ----------------
insert into posts (title, slug, excerpt, content, published) values
(
  'CNC Taşlama ile Manuel Taşlama Arasındaki Fark Nedir?',
  'cnc-taslama-ile-manuel-taslama-arasindaki-fark-nedir',
  'Aynı parçadan çok sayıda üretilecekse hangi yöntemin daha avantajlı olduğunu anlatıyoruz.',
  'Manuel taşlama, operatörün tecrübesine ve el hassasiyetine dayanır; tekil veya az sayıda parça için hızlı ve esnek bir çözümdür.

CNC taşlama ise bilgisayar kontrollü bir program üzerinden çalışır. Programlanan ölçüler her parçada birebir tekrarlanır, bu da seri üretimde büyük fark yaratır.

Hangi yöntem ne zaman tercih edilmeli?
- Tek parça veya birkaç adet iş için manuel taşlama genelde yeterli ve daha hızlıdır
- Onlarca/yüzlerce aynı parça üretilecekse CNC taşlama tutarlılık sağlar
- Karmaşık profil veya çok sıkı tolerans gerektiren işlerde CNC tercih edilir

İşinizin hacmine ve toleransına göre en uygun yöntemi birlikte değerlendirebiliriz.',
  true
),
(
  'Kalıp Taşlamada Yüzey Pürüzlülüğü (Ra) Ne Anlama Gelir?',
  'kalip-taslamada-yuzey-puruzlulugu-ra-ne-anlama-gelir',
  'Kalıp yüzeylerinde neden Ra değeri takip edilir, düşük Ra ne sağlar, kısaca anlatıyoruz.',
  'Ra (ortalama pürüzlülük), bir yüzeydeki mikroskobik iniş çıkışların ortalama değeridir ve mikron (µm) cinsinden ölçülür.

Kalıp yüzeylerinde düşük Ra değeri neden önemlidir?
- Enjeksiyon kalıplarında yüzey pürüzü, üretilen parçaya doğrudan yansır
- Pürüzlü yüzeyler parça çıkarmada (demoulding) zorluk yaratabilir
- Düşük Ra, kalıbın daha uzun ömürlü olmasını sağlar

Kalıp taşlama işlemimizde Ra ≤ 0.4 µm seviyesinde ayna gibi bir yüzey elde etmeyi hedefliyoruz. Kalıbınızın mevcut durumunu paylaşırsanız uygun işlem planını önerebiliriz.',
  true
),
(
  'Aşınmış Parçaları Yenilemek mi, Yeniden Üretmek mi Daha Mantıklı?',
  'asinmis-parcalari-yenilemek-mi-yeniden-uretmek-mi-daha-mantikli',
  'Parça revizyonunun ne zaman yeni üretimden daha avantajlı olduğunu değerlendiriyoruz.',
  'Zamanla kullanılan mekanik parçalarda aşınma kaçınılmazdır. Bu noktada iki seçenek vardır: parçayı revize etmek (taşlayarak düzeltmek) ya da sıfırdan yeni bir parça ürettirmek.

Parça revizyonu ne zaman mantıklıdır?
- Aşınma yüzeysel ise ve parçanın temel yapısı sağlamsa
- Yeni parça tedariki uzun sürecekse veya parça artık üretilmiyorsa
- Maliyet açısından revizyon, yeni üretimden belirgin şekilde ucuzsa

Parçanızın fotoğrafını ve ölçülerini paylaşırsanız, revize edilip edilemeyeceğini hızlıca değerlendirebiliriz.',
  true
),
(
  'Prototip ve Tekil Üretimde Taşlama Süreci Nasıl İşler?',
  'prototip-ve-tekil-uretimde-taslama-sureci-nasil-isler',
  'Standart kalıba uymayan özel/tekil parçalarda süreç nasıl ilerliyor, adım adım anlatıyoruz.',
  'Prototip veya tek seferlik özel parçalarda süreç, seri üretimden biraz farklı ilerler; çünkü genelde standart bir teknik resim yerine bir fikir, numune parça veya kaba bir çizim ile başlar.

Süreç genellikle şu şekilde işler:
1. Parçanın amacı ve kullanılacağı yer netleştirilir
2. Mevcut numune veya çizim üzerinden ölçüler belirlenir
3. Uygun malzeme ve işleme yöntemi (hangi taşlama türü) belirlenir
4. Tek parça üzerinde işlem yapılır, gerekirse ara kontrol ile doğrulanır

Elinizde net bir teknik resim olmasa bile bize ulaşabilirsiniz; birlikte netleştirebiliriz.',
  true
)
on conflict (slug) do nothing;

-- ---------------- SSS: 5 yeni soru ----------------
insert into faqs (question, answer, order_index) values
(
  'Fiyatlandırma nasıl belirleniyor?',
  'Fiyat; parçanın ölçüsü, malzemesi, istenen tolerans ve adedine göre değişir. Teklif formunu doldurduğunuzda size özel net bir fiyat veriyoruz, sitede sabit bir fiyat listesi bulunmuyor.',
  7
),
(
  'Garanti/iade politikanız nedir?',
  'Teslim ettiğimiz her parça, belirtilen ölçü ve tolerans dahilinde işlenir. İşlemden kaynaklanan bir hata olması durumunda parçanızı ücretsiz olarak yeniden işleriz.',
  8
),
(
  'Ödeme yöntemleriniz neler?',
  'Ödeme, iş teslim alınırken elden veya banka havalesi ile yapılabilir. Detaylar, teklif onaylandıktan sonra sizinle netleştirilir.',
  9
),
(
  'Toplu veya bayi siparişleri için özel koşul var mı?',
  'Evet, düzenli veya yüksek adetli siparişlerde size özel fiyatlandırma ve teslim planı oluşturabiliyoruz. Teklif formunda adet ve sıklığı belirtmeniz yeterli.',
  10
),
(
  'İş teslim edildikten sonra destek veya garanti süreniz var mı?',
  'Teslim edilen parçada işlemden kaynaklanan bir sorun fark ederseniz bize ulaşmanız yeterli; parçanızı inceleyip gerekirse ücretsiz düzeltiyoruz.',
  11
)
on conflict do nothing;

-- ---------------- TEKLİF FORMU: yeni alanlar ----------------
alter table quotes add column if not exists budget_range text;
alter table quotes add column if not exists preferred_contact text;

-- ---------------- ÖN SİPARİŞ: dosya yükleme desteği ----------------
alter table preorders add column if not exists file_url text;

-- ---------------- SİTE AYARLARI: "Rakamlarla Biz" istatistik bölümü ----------------
insert into site_settings (key, value) values
  ('stats', jsonb_build_object(
    'stat1_value', '10+',
    'stat1_label', 'Yıllık Deneyim',
    'stat2_value', '500+',
    'stat2_label', 'Tamamlanan İş',
    'stat3_value', '± 0.005 mm',
    'stat3_label', 'Hassasiyet Seviyesi'
  ))
on conflict (key) do nothing;
