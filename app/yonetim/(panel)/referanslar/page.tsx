export const dynamic = 'force-dynamic';

import { Trash2, Plus } from "lucide-react";
import { getAllReferencesAdmin } from "@/lib/admin-data";
import { upsertReference, deleteReference } from "@/lib/actions/admin";

export default async function AdminReferanslarPage() {
  const references = await getAllReferencesAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Referanslar</h1>
      <p className="mt-1 text-sm text-metalDim">
        Anasayfa ve referanslar sayfasında logo + isim olarak gösterilen firmalar.
        Logoyu önce bir görsel barındırma sitesine (örn. imgur.com) yükleyip
        buraya linkini yapıştırmanız yeterli.
      </p>

      <details className="spec-card mt-8 rounded-sm p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark">
          <Plus size={16} /> Yeni Referans Ekle
        </summary>
        <form action={upsertReference} className="mt-6 space-y-4">
          <ReferenceFields />
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </details>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {references.map((r) => {
          const boundDelete = deleteReference.bind(null, r.id);
          return (
            <details key={r.id} className="spec-card rounded-sm p-6">
              <summary className="flex cursor-pointer items-center gap-3 font-display text-sm font-semibold uppercase tracking-wide text-metal">
                {r.logo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.logo_url} alt={r.name} className="h-8 w-auto object-contain" />
                )}
                {r.name}
              </summary>
              <form action={upsertReference} className="mt-6 space-y-4">
                <input type="hidden" name="id" value={r.id} />
                <ReferenceFields defaults={r} />
                <div className="flex items-center justify-between">
                  <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
                    Kaydet
                  </button>
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

function ReferenceFields({ defaults }: { defaults?: any }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Firma / Marka Adı</Label>
        <input name="name" required defaultValue={defaults?.name} className="input" />
      </div>
      <div>
        <Label>Sıra No</Label>
        <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className="input" />
      </div>
      <div className="sm:col-span-2">
        <Label>Logo Görsel URL</Label>
        <input name="logo_url" required defaultValue={defaults?.logo_url} placeholder="https://..." className="input" />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
