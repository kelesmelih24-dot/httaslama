export const dynamic = 'force-dynamic';

import { getAdminSettings } from "@/lib/admin-data";
import { updateContactSettings, updateContentSettings } from "@/lib/actions/admin";

export default async function AdminAyarlarPage() {
  const { contact, content } = await getAdminSettings();

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
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
