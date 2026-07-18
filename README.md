# HT Makina Taşlama — Web Sitesi

Next.js 14 + Supabase + Telegram bildirimleri ile hazırlanmış, admin panelinden
tamamen yönetilebilen bir işletme sitesi.

## İçerik

- **Anasayfa, Hizmetler, Referanslar, İletişim, Ön Sipariş, Yorumlar** sayfaları
- **Teklif formu** → Supabase'e kaydedilir + Telegram'a anlık bildirim
- **Ön sipariş sihirbazı** (kategori → detay → onay) → Supabase + Telegram
- **Yorum/yorum onay sistemi** (yayınlanmadan önce admin onayı gerekir)
- **Yönetim paneli** (`/yonetim`) — hizmetler, referanslar, teklifler, ön
  siparişler, yorumlar ve site metinleri buradan yönetilir; koda dokunmaya
  gerek yoktur
- Yönetim girişi **hiçbir yerde link olarak görünmez** (menüde, footer'da vs.
  yok); sadece `/yonetim` adresine giden bilir

---

## 1. Supabase Kurulumu

1. [supabase.com](https://supabase.com) üzerinden ücretsiz bir proje açın.
2. Sol menüden **SQL Editor**'a girin, `supabase/schema.sql` dosyasının
   tamamını yapıştırıp **Run**'a basın.
3. Ardından `supabase/seed.sql` dosyasını da aynı şekilde çalıştırın (bu,
   Batuhan Usta'nın 4 gerçek hizmetini ekler).
4. Sol menüden **Project Settings → API** sayfasına gidin, şu 3 değeri not
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
   tek tek ekleyin (Production + Preview için).
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
  - **Referanslar**: ekle / düzenle / sil (görsel için bir URL yapıştırmanız
    yeterli — görseli önce örneğin [imgur.com](https://imgur.com) gibi bir
    yere yükleyip linkini kullanabilirsiniz)
  - **Teklif Talepleri**: gelen talepleri görün, durumunu güncelleyin
  - **Ön Siparişler**: gelen ön siparişleri görün, durumunu güncelleyin
  - **Yorumlar**: yayınlamadan önce onaylayın/reddedin
  - **Site Ayarları**: telefon, WhatsApp, e-posta, adres ve anasayfa
    metinlerini güncelleyin

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
