export const dynamic = 'force-dynamic';

import { getAllPreorders } from "@/lib/admin-data";
import { updatePreorderStatus } from "@/lib/actions/admin";
import StatusSelect from "@/components/admin/StatusSelect";

const statusOptions = [
  { value: "yeni", label: "Yeni" },
  { value: "onaylandi", label: "Onaylandı" },
  { value: "uretimde", label: "Üretimde" },
  { value: "tamamlandi", label: "Tamamlandı" },
  { value: "iptal", label: "İptal" },
] as const;

export default async function AdminOnSiparislerPage() {
  const preorders = await getAllPreorders();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Ön Siparişler</h1>
      <p className="mt-1 text-sm text-metalDim">Ön sipariş sihirbazından gelen talepler.</p>

      <div className="mt-8 space-y-4">
        {preorders.length === 0 && <p className="text-sm text-metalDim">Henüz ön sipariş yok.</p>}
        {preorders.map((p) => (
          <div key={p.id} className="spec-card rounded-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-metal">
                  {p.full_name}
                </p>
                <p className="mt-0.5 text-xs text-metalDim">
                  {p.phone} {p.email && `· ${p.email}`}
                </p>
                <p className="mt-1 text-xs text-metalDim">
                  {new Date(p.created_at).toLocaleString("tr-TR")}
                </p>
              </div>
              <StatusSelect id={p.id} value={p.status} options={[...statusOptions]} action={updatePreorderStatus} />
            </div>
            <p className="mt-3 font-mono text-xs text-spark">{p.category}</p>
            <div className="mt-2 space-y-1 text-sm text-metalDim">
              {p.part_detail && <p>Parça: {p.part_detail}</p>}
              {p.material && <p>Malzeme: {p.material}</p>}
              {p.quantity && <p>Adet: {p.quantity}</p>}
              {p.preferred_date && <p>Tercih edilen tarih: {p.preferred_date}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
