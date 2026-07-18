export const dynamic = 'force-dynamic';

import { Trash2, Plus } from "lucide-react";
import { getAllServicesAdmin } from "@/lib/admin-data";
import { upsertService, deleteService } from "@/lib/actions/admin";

export default async function AdminHizmetlerPage() {
  const services = await getAllServicesAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Hizmetler</h1>
      </div>
      <p className="mt-1 text-sm text-metalDim">
        Sitede listelenen hizmetleri buradan ekleyin, düzenleyin veya kaldırın.
      </p>

      <details className="spec-card mt-8 rounded-sm p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark">
          <Plus size={16} /> Yeni Hizmet Ekle
        </summary>
        <form action={upsertService} className="mt-6 space-y-4">
          <ServiceFields />
          <SubmitButton />
        </form>
      </details>

      <div className="mt-8 space-y-4">
        {services.map((s) => {
          const boundDelete = deleteService.bind(null, s.id);
          return (
            <details key={s.id} className="spec-card rounded-sm p-6">
              <summary className="flex cursor-pointer items-center justify-between font-display text-sm font-semibold uppercase tracking-wide text-metal">
                <span>{String(s.order_index).padStart(2, "0")} — {s.title}</span>
                <span className="font-mono text-xs text-metalDim">/{s.slug}</span>
              </summary>
              <form action={upsertService} className="mt-6 space-y-4">
                <input type="hidden" name="id" value={s.id} />
                <ServiceFields defaults={s} />
                <div className="flex items-center justify-between">
                  <SubmitButton />
                  <form action={boundDelete}>
                    <button className="flex items-center gap-1.5 text-xs text-metalDim hover:text-spark">
                      <Trash2 size={14} /> Sil
                    </button>
                  </form>
                </div>
              </form>
            </details>
          );
        })}
      </div>
    </div>
  );
}

function ServiceFields({ defaults }: { defaults?: any }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Başlık</Label>
        <input name="title" required defaultValue={defaults?.title} className="input" />
      </div>
      <div>
        <Label>Sıra No</Label>
        <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className="input" />
      </div>
      <div className="sm:col-span-2">
        <Label>Kısa Açıklama (listelerde görünür)</Label>
        <textarea name="summary" required rows={2} defaultValue={defaults?.summary} className="input" />
      </div>
      <div className="sm:col-span-2">
        <Label>Detay Metni (hizmet sayfasında görünür)</Label>
        <textarea name="detail" rows={3} defaultValue={defaults?.detail} className="input" />
      </div>
      <div className="sm:col-span-2">
        <Label>Tolerans / Teknik Not (opsiyonel)</Label>
        <input name="tolerance_note" defaultValue={defaults?.tolerance_note} placeholder="Örn: ⌀ toleransı ± 0.005 mm" className="input" />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}

function SubmitButton() {
  return (
    <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
      Kaydet
    </button>
  );
}
