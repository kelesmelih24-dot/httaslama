export const dynamic = 'force-dynamic';

import { getAdminSettings } from "@/lib/admin-data";
import {
  updateContactSettings,
  updateContentSettings,
  updateAboutSettings,
  updateHoursSettings,
} from "@/lib/actions/admin";

export default async function AdminAyarlarPage() {
  const { contact, content, about, hours } = await getAdminSettings();

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Site Ayarları</h1>
        <p className="mt-1 text-sm text-metalDim">
          İletişim bilgileri ve anasayfa metinleri buradan güncellenir, kod değiştirmeye gerek yok.
        </p>
      </div>

      <section className="spec-card rounded-sm p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
          İletişim Bilgileri
        </h2>
        <form action={updateContactSettings} className="mt-5 space-y-4">
          <div>
            <Label>Telefon</Label>
            <input name="phone" defaultValue={contact.phone} className="input" />
          </div>
          <div>
            <Label>WhatsApp Numarası (ülke koduyla, boşluksuz — örn: 905373491402)</Label>
            <input name="whatsapp" defaultValue={contact.whatsapp} className="input" />
          </div>
          <div>
            <Label>E-posta</Label>
            <input name="email" defaultValue={contact.email} className="input" />
          </div>
          <div>
            <Label>Adres</Label>
            <textarea name="address" rows={2} defaultValue={contact.address} className="input" />
          </div>
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </section>

      <section className="spec-card rounded-sm p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
          Anasayfa Metinleri
        </h2>
        <form action={updateContentSettings} className="mt-5 space-y-4">
          <div>
            <Label>Ana Başlık</Label>
            <input name="hero_title" defaultValue={content.hero_title} className="input" />
          </div>
          <div>
            <Label>Alt Başlık</Label>
            <textarea name="hero_subtitle" rows={2} defaultValue={content.hero_subtitle} className="input" />
          </div>
          <div>
            <Label>Hakkımızda Metni</Label>
            <textarea name="about_text" rows={3} defaultValue={content.about_text} className="input" />
          </div>
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </section>

      <section className="spec-card rounded-sm p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
          Hakkımızda Sayfası
        </h2>
        <form action={updateAboutSettings} className="mt-5 space-y-4">
          <div>
            <Label>Firma Hikayesi</Label>
            <textarea name="story" rows={3} defaultValue={about.story} className="input" />
          </div>
          <div className="max-w-[160px]">
            <Label>Deneyim Yılı</Label>
            <input name="years_experience" type="number" defaultValue={about.years_experience} className="input" />
          </div>
          <div>
            <Label>Misyon</Label>
            <textarea name="mission" rows={2} defaultValue={about.mission} className="input" />
          </div>
          <div>
            <Label>Vizyon</Label>
            <textarea name="vision" rows={2} defaultValue={about.vision} className="input" />
          </div>
          <div>
            <Label>Kalite Politikası</Label>
            <textarea name="quality_policy" rows={2} defaultValue={about.quality_policy} className="input" />
          </div>
          <div>
            <Label>İş Güvenliği Politikası</Label>
            <textarea name="safety_policy" rows={2} defaultValue={about.safety_policy} className="input" />
          </div>
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </section>

      <section className="spec-card rounded-sm p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
          Çalışma Saatleri
        </h2>
        <form action={updateHoursSettings} className="mt-5 space-y-4">
          <div>
            <Label>Pazartesi - Cumartesi</Label>
            <input name="hafta_ici_cumartesi" defaultValue={hours.hafta_ici_cumartesi} placeholder="08:30 - 18:30" className="input" />
          </div>
          <div>
            <Label>Pazar</Label>
            <input name="pazar" defaultValue={hours.pazar} placeholder="Kapalı" className="input" />
          </div>
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </section>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
