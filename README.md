# HT Makina Taşlama — Web Sitesi

Next.js 14 + Supabase + Telegram bildirimleri ile hazırlanmış, admin panelinden
tamamen yönetilebilen bir işletme sitesi.

## İçerik

- **Anasayfa, Hakkımızda, Hizmetler, Galeri, Referanslar, Blog, SSS, İletişim,
  Ön Sipariş, Yorumlar** sayfaları
- **Teklif formu** (ad soyad, firma, telefon, e-posta, malzeme, adet, teslim
  tarihi, teknik resim/PDF yükleme) → Supabase'e kaydedilir + Telegram'a
  anlık bildirim
- **Hızlı teklif al** popup'ı (sitenin her yerinde sol altta)
- **Ön sipariş sihirbazı** (kategori → detay → onay) → Supabase + Telegram
- **Galeri**: atölye / makine / tamamlanan iş / öncesi-sonrası kaydırmalı
  karşılaştırma
- **Blog/Haber sistemi** (taslak/yayında durumu ile)
- **Yorum/yorum onay sistemi** (yayınlanmadan önce admin onayı gerekir)
- **SEO**: her sayfada özel başlık/açıklama, otomatik `sitemap.xml` ve
  `robots.txt` (yönetim paneli arama motorlarından gizli tutulur)
- **Yönetim paneli** (`/yonetim`) — hizmetler, referanslar, galeri, blog,
  SSS, teklifler, ön siparişler, yorumlar, hakkımızda metinleri, çalışma
  saatleri ve iletişim bilgileri buradan yönetilir; koda dokunmaya gerek
  yoktur
- Yönetim girişi **hiçbir yerde link olarak görünmez** (menüde, footer'da vs.
  yok); sadece `/yonetim` adresine giden bilir

---

## 1. Supabase Kurulumu

1. [supabase.com](https://supabase.com) üzerinden ücretsiz bir proje açın.
2. Sol menüden **SQL Editor**'a girin, `supabase/schema.sql` dosyasının
   tamamını yapıştırıp **Run**'a basın. (Bu, tüm tabloları — hizmetler,
   referanslar, teklifler, ön siparişler, yorumlar, galeri, SSS, blog — ve
   teknik resim/PDF yüklemeleri için `teklif-dosyalari` adında bir storage
   bucket'ı oluşturur.)
3. Ardından `supabase/seed.sql` dosyasını da aynı şekilde çalıştırın (bu,
   işletmenizin 4 gerçek hizmetini ekler).
4. `supabase/seed_content.sql` dosyasını çalıştırın — bu, SSS ve Blog
   bölümlerinin boş görünmemesi için hazır içerik ekler (istediğiniz zaman
   admin panelden düzenleyebilir veya silebilirsiniz).
5. `supabase/migrate_v3_expansion.sql` dosyasını çalıştırın — bu, 5 yeni
   hizmeti (CNC Taşlama, Kalıp Taşlama, Hassas Taşlama, Parça Revizyonu,
   Özel Üretim Çözümleri), örnek galeri görsellerini, 4 yeni blog yazısını,
   5 yeni SSS sorusunu, teklif/ön sipariş formlarındaki yeni alanları ve
   anasayfadaki "Rakamlarla Biz" istatistik kutularını ekler.
4. **Daha önce eski bir sürümü kurduysanız**: `supabase/migrate_v2_expansion.sql`
   dosyasını çalıştırın, mevcut verileriniz silinmeden yeni sütun/tablolar
   eklenir.
5. Sol menüden **Project Settings → API** sayfasına gidin, şu 3 değeri not
   edin:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**gizli tutun, asla
     paylaşmayın**)

---

## 2. Telegram Bot Kurulumu

1. Telegram'da **@BotFather**'a yazın, `/newbot` komutunu gönderin, botunuza
   bir isim verin. Size bir **token** verecek (örn: `123456:ABC-...`) → bu,
   `TELEGRAM_BOT_TOKEN`.
2. Botu bildirimlerin geleceği kişisel hesabınıza veya bir gruba ekleyin, ona
   herhangi bir mesaj gönderin (örn: "merhaba").
3. Chat ID'nizi öğrenmek için tarayıcıda şu adresi açın (TOKEN kısmını kendi
   tokenınızla değiştirin):
   `https://api.telegram.org/botTOKEN/getUpdates`
4. Dönen JSON içinde `"chat":{"id": 123456789, ...}` kısmındaki sayı sizin
   `TELEGRAM_CHAT_ID`'niz.

---

## 3. Ortam Değişkenleri (Environment Variables)

`.env.example` dosyasını `.env.local` olarak kopyalayın ve yukarıda
topladığınız değerlerle doldurun:

```bash
cp .env.example .env.local
```

`ADMIN_USERNAME` / `ADMIN_PASSWORD`: yönetim paneline giriş bilgileri.
İstediğiniz zaman değiştirebilirsiniz — **varsayılan `admin` / `123` şifresi
zayıftır, canlıya almadan önce güçlü bir şifreyle değiştirmenizi öneririz.**

`ADMIN_SESSION_SECRET`: rastgele, uzun bir metin (oturum imzalama anahtarı).

---

## 4. Yerelde Çalıştırma

```bash
npm install
npm run dev
```

Site: `http://localhost:3000`
Yönetim paneli: `http://localhost:3000/yonetim` (giriş sayfasına yönlendirir)

---

## 5. GitHub'a Yükleme

```bash
git init
git add .
git commit -m "İlk sürüm"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/ht-makina-taslama.git
git push -u origin main
```

`.env.local` dosyası `.gitignore` içinde olduğu için GitHub'a **gitmez** —
gizli anahtarlarınız güvende kalır.

---

## 6. Vercel'e Deploy

1. [vercel.com](https://vercel.com) üzerinden GitHub reponuzu import edin.
2. **Environment Variables** kısmına `.env.local` içindeki tüm değişkenleri
   tek tek ekleyin (Production + Preview için). `NEXT_PUBLIC_SITE_URL`'i
   gerçek alan adınızla (örn. `https://www.htmakinataslama.com`) doldurmayı
   unutmayın — bu, `sitemap.xml` dosyasının doğru linkler üretmesini sağlar.
3. **Deploy**'a basın.
4. Deploy tamamlandıktan sonra Supabase panelinden **Authentication → URL
   Configuration** veya **API → CORS** ayarlarına gerek yoktur (bu proje
   Supabase'e sadece sunucu tarafından bağlanır).

---

## 7. Admin Paneli Kullanımı

- Giriş: `sitenizinadresi.com/yonetim`
- Kullanıcı adı/şifre: `.env` dosyasındaki `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- Panelden yapılabilecekler:
  - **Hizmetler**: ekle / düzenle / sil
  - **Referanslar**: logo + isim olarak ekleyin (görseli önce örneğin
    [imgur.com](https://imgur.com) gibi bir yere yükleyip linkini yapıştırmanız
    yeterli)
  - **Galeri**: atölye/makine/tamamlanan iş fotoğrafları ve öncesi-sonrası
    karşılaştırmaları ekleyin
  - **Blog**: yazı ekleyin, yayınlamadan önce taslak olarak saklayın
  - **SSS**: soru-cevap ekleyin/düzenleyin
  - **Teklif Talepleri**: gelen talepleri (yüklenen dosya dahil) görün,
    durumunu güncelleyin
  - **Ön Siparişler**: gelen ön siparişleri (yüklenen dosya dahil) görün,
    durumunu güncelleyin
  - **Yorumlar**: yayınlamadan önce onaylayın/reddedin
  - **Site Ayarları**: telefon, WhatsApp, e-posta, adres, çalışma saatleri,
    anasayfa metinleri, Hakkımızda içeriği ve anasayfadaki "Rakamlarla Biz"
    istatistik kutularını güncelleyin
  - **Panel**: yeni teklif/ön sipariş/yorum sayıları, tüm zamanların toplam
    teklif sayısı, tamamlanan iş sayısı ve son 6 ayın teklif/ön sipariş
    grafiğini görün

Değişiklikler kaydedildiği anda siteye yansır, yeniden deploy gerekmez.

---

## Teknik Notlar

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase**: veritabanı + Row Level Security (herkes sadece izin verilen
  işlemleri yapabilir; admin işlemleri sunucu tarafında `service_role` anahtarı
  ile yapılır ve tarayıcıya asla gönderilmez)
- **jose** ile imzalı, `httpOnly` çerez tabanlı admin oturumu (12 saat geçerli)
- Genel sayfalar 60 saniyede bir yenilenir (ISR) + admin bir şey kaydettiğinde
  anında yenilenir (on-demand revalidation)

## Notlar

- **Logo**: Şu an `components/site/Logo.tsx` içinde tasarlanmış bir amblem
  kullanılıyor. Gerçek logonuzu gönderdiğinizde bu dosyayı güncelleyip
  Navbar/Footer'da otomatik olarak yeni logonun görünmesini sağlayabiliriz.
  Favicon (`app/icon.svg`) de aynı şekilde güncellenecek.
- **Gizlilik Politikası / Kullanım Şartları**: Bu sayfalardaki metinler genel
  bir şablondur, hukuki danışmanlık yerine geçmez. Yayına almadan önce bir
  hukuk danışmanına gözden geçirtmenizi öneririz.
- **AI destekli canlı sohbet botu**: Bu özellik şimdilik ertelendi, istediğiniz
  zaman ayrı bir aşama olarak ekleyebiliriz.

## AI Destekli Sohbet Botu (Groq / Llama 3.3 70B) Kurulumu

1. [console.groq.com](https://console.groq.com) adresinden ücretsiz bir hesap açın
   (kredi kartı gerekmez).
2. **API Keys** sayfasından yeni bir API anahtarı oluşturun.
3. Vercel'de **Environment Variables** kısmına ekleyin:
   - `GROQ_API_KEY` → oluşturduğunuz anahtar
   - `GROQ_MODEL` → `llama-3.3-70b-versatile` (varsayılan)
4. Ücretsiz katman günlük istek/token limitleriyle gelir; yoğun kullanımda
   limitlere takılırsanız [console.groq.com](https://console.groq.com)
   üzerinden ücretli plana geçebilirsiniz. Güncel model isimlerini
   [console.groq.com/docs/models](https://console.groq.com/docs/models)
   üzerinden kontrol edin, model isimleri zaman zaman değişebiliyor.

Bot, sitenizdeki güncel hizmetler, iletişim bilgileri, çalışma saatleri ve
SSS içeriğini otomatik olarak bilgi kaynağı olarak kullanır — ayrıca bir şey
yapılandırmanıza gerek yoktur. Kesin fiyat veya teslim tarihi vermemesi,
Türkçe yanıt vermesi ve alakasız konularda nazikçe yönlendirmesi için
talimatlandırılmıştır.

**Maliyet koruması:** Bot, bir oturumda en fazla 20 mesajla sınırlıdır ve
her istekte sohbet geçmişinin yalnızca son birkaç mesajı gönderilir; bu,
beklenmedik yüksek kullanım/maliyeti önler.
