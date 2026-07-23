-- v3 migration'daki anlamsız placeholder galeri görsellerini kaldırır.
-- SQL Editor'da çalıştırmanız yeterli. Gerçek fotoğraflarınızı admin
-- panelden (/yonetim/galeri) eklediğinizde galeri dolacak.

delete from gallery where image_url like 'https://picsum.photos/%';
