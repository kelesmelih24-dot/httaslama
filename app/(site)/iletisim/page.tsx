export const dynamic = 'force-dynamic';

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getServices, getSiteSettings, getHoursSettings } from "@/lib/data";
import QuoteForm from "@/components/site/QuoteForm";
import MapEmbed from "@/components/site/MapEmbed";

export const metadata = { title: "İletişim & Teklif Al | HT Makina Taşlama" };

export default async function IletisimPage() {
  const [services, settings, hours] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getHoursSettings(),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">İLETİŞİM</div>
      <h1 className="max-w-xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Bize ulaşın, teklif alın
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="spec-card space-y-6 rounded-sm p-7">
            <ContactRow icon={<Phone size={18} />} label="Telefon" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, "")}`} />
            <ContactRow icon={<Mail size={18} />} label="E-posta" value={settings.email} href={`mailto:${settings.email}`} />
            <ContactRow icon={<MapPin size={18} />} label="Adres" value={settings.address} />
          </div>
          <div className="mt-6">
            <MapEmbed address={settings.address} />
          </div>
          <div className="spec-card mt-6 rounded-sm p-5">
            <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-metal">
              <Clock size={15} className="text-spark" /> Çalışma Saatleri
            </p>
            <div className="mt-3 space-y-1 text-sm text-metalDim">
              <p>Pazartesi - Cumartesi: {hours.hafta_ici_cumartesi}</p>
              <p>Pazar: {hours.pazar}</p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-metalDim">
            Formu doldurduğunuzda talebiniz ekibimize anında iletilir; parça ölçüsü ve malzeme
            türünü ne kadar net paylaşırsanız teklifimiz o kadar hızlı netleşir.
          </p>
        </div>

        <div className="lg:col-span-3">
          <QuoteForm services={services} />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-spark">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wider text-metalDim">{label}</p>
        <p className="mt-0.5 text-sm text-metal">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}
