export const dynamic = 'force-dynamic';

import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Gizlilik Politikası | HT Makina Taşlama" };

export default async function GizlilikPolitikasiPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">YASAL</div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Gizlilik Politikası
      </h1>
      <p className="mt-3 text-xs text-metalDim">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="prose-invert mt-10 space-y-6 text-sm leading-relaxed text-metalDim">
        <p>
          HT Makina Taşlama (&quot;biz&quot;) olarak, bu web sitesi üzerinden elde ettiğimiz kişisel
          verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
          korunmasına önem veriyoruz. Bu politika, hangi verileri topladığımızı, neden topladığımızı
          ve haklarınızı açıklar.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          1. Toplanan Veriler
        </h2>
        <p>
          Teklif formu, ön sipariş formu veya yorum formu doldurduğunuzda; ad soyad, telefon, e-posta,
          firma adı ve paylaştığınız iş/parça detayları gibi bilgileri topluyoruz. Bu bilgiler yalnızca
          sizinle iletişime geçmek ve talebinizi değerlendirmek amacıyla kullanılır.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          2. Verilerin Kullanım Amacı
        </h2>
        <p>
          Paylaştığınız veriler; teklif hazırlamak, siparişinizi yönetmek, sizinle iletişime geçmek ve
          yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılır. Verileriniz, açık rızanız
          olmadan üçüncü taraflarla pazarlama amacıyla paylaşılmaz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          3. Çerezler
        </h2>
        <p>
          Sitemiz, deneyiminizi iyileştirmek amacıyla temel çerezler kullanabilir. Çerez tercihlerinizi
          tarayıcı ayarlarınızdan yönetebilirsiniz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          4. Veri Saklama Süresi
        </h2>
        <p>
          Kişisel verileriniz, işlem amacının gerektirdiği süre boyunca ve yasal saklama yükümlülüklerimiz
          çerçevesinde saklanır; bu sürenin sonunda silinir veya anonim hale getirilir.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          5. Haklarınız (KVKK Madde 11)
        </h2>
        <p>
          KVKK kapsamında; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi
          talep etme, işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde
          veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse düzeltilmesini
          isteme, silinmesini/yok edilmesini isteme haklarına sahipsiniz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          6. İletişim
        </h2>
        <p>
          Kişisel verilerinizle ilgili taleplerinizi aşağıdaki iletişim bilgileri üzerinden bize
          iletebilirsiniz:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>Telefon: {settings.phone}</li>
          <li>E-posta: {settings.email}</li>
          <li>Adres: {settings.address}</li>
        </ul>

        <p className="mt-8 text-xs text-metalDim/70">
          Bu metin genel bir şablon olarak hazırlanmıştır ve hukuki danışmanlık yerine geçmez.
          İşletmenizin özel durumuna göre bir hukuk danışmanına gözden geçirtmenizi öneririz.
        </p>
      </div>
    </section>
  );
}
