-- Kartvizitin arkasında listelenen ve henüz sitede olmayan 2 hizmeti ekler:
-- Puntalı Taşlama (punta/merkezli taşlama) ve Puntasız Taşlama (centerless taşlama).
-- SQL Editor'da bir kez çalıştırmanız yeterli.

insert into services (title, slug, summary, detail, tolerance_note, order_index) values
(
  'Puntalı Taşlama',
  'puntali-taslama',
  'Parçanın iki uçtan punta (merkez) ile desteklenerek silindirik yüzeyinin hassas taşlanması.',
  'Uzun ve ince miller gibi parçalarda, iş parçası iki uçtan punta ile sabitlenerek taşlanır. Bu yöntem, parçanın taşlama sırasında esnemesini veya kaçmasını önleyerek dairesellik ve ölçü hassasiyetini artırır.',
  'Dairesellik sapması < 0.003 mm',
  10
),
(
  'Puntasız Taşlama',
  'puntasiz-taslama',
  'Parçanın punta ile sabitlenmeden, iki taşlama diski arasında döndürülerek yüksek hızda ve seri şekilde taşlanması.',
  'Puntasız (centerless) taşlama, özellikle uzun ve ince silindirik parçalarda ya da seri üretimde tercih edilir. Parça punta ile tutulmadığı için hazırlık süresi kısalır ve yüksek adetli işlerde verimlilik artar.',
  'Yüzey pürüzlülüğü Ra ≤ 0.4 µm',
  11
)
on conflict (slug) do nothing;
