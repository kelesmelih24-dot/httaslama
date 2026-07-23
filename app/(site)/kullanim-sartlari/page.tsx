export const dynamic = 'force-dynamic';

import { getSiteSettings } from "@/lib/data";

export const metadata = { title: "Kullanım Şartları" };

export default async function KullanimSartlariPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">YASAL</div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Kullanım Şartları
      </h1>
      <p className="mt-3 text-xs text-metalDim">Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>

      <div className="prose-invert mt-10 space-y-6 text-sm leading-relaxed text-metalDim">
        <p>
          Bu web sitesini (&quot;Site&quot;) kullanarak aşağıdaki şartları kabul etmiş olursunuz.
          Lütfen siteyi kullanmadan önce bu şartları dikkatlice okuyun.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          1. Sitenin Amacı
        </h2>
        <p>
          Bu site, HT Makina Taşlama&apos;nın sunduğu hizmetler hakkında bilgi vermek, teklif ve ön
          sipariş talebi almak amacıyla hazırlanmıştır. Sitede yer alan içerikler bilgilendirme
          amaçlıdır; bağlayıcı bir teklif niteliği taşımaz. Kesin fiyat ve teslim şartları, tarafınıza
          özel olarak iletilen teklif ile netleşir.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          2. Form Aracılığıyla Paylaşılan Bilgiler
        </h2>
        <p>
          Teklif, ön sipariş veya yorum formları aracılığıyla paylaştığınız bilgilerin doğru ve güncel
          olduğunu kabul edersiniz. Yanlış veya eksik bilgi paylaşılması durumunda oluşabilecek
          gecikme veya yanlış anlaşılmalardan HT Makina Taşlama sorumlu tutulamaz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          3. Fikri Mülkiyet
        </h2>
        <p>
          Sitedeki metin, görsel, logo ve tasarım unsurları HT Makina Taşlama&apos;ya aittir veya
          kullanım izni ile yayınlanmaktadır. İzinsiz kopyalanamaz veya ticari amaçla kullanılamaz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          4. Sorumluluk Sınırlaması
        </h2>
        <p>
          Site içeriği güncel ve doğru tutulmaya çalışılsa da, teknik aksaklıklar veya güncelleme
          gecikmeleri nedeniyle oluşabilecek hatalardan HT Makina Taşlama sorumlu tutulamaz.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          5. Değişiklikler
        </h2>
        <p>
          Bu kullanım şartları zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada
          yayınlanır.
        </p>

        <h2 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
          6. İletişim
        </h2>
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
