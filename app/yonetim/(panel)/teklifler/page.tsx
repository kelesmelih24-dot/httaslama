export const dynamic = 'force-dynamic';

import { getAllQuotes } from "@/lib/admin-data";
import { updateQuoteStatus } from "@/lib/actions/admin";
import StatusSelect from "@/components/admin/StatusSelect";

const statusOptions = [
  { value: "yeni", label: "Yeni" },
  { value: "iletisimde", label: "İletişimde" },
  { value: "tamamlandi", label: "Tamamlandı" },
  { value: "iptal", label: "İptal" },
] as const;

export default async function AdminTekliflerPage() {
  const quotes = await getAllQuotes();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Teklif Talepleri</h1>
      <p className="mt-1 text-sm text-metalDim">İletişim formundan gelen teklif talepleri.</p>

      <div className="mt-8 space-y-4">
        {quotes.length === 0 && <p className="text-sm text-metalDim">Henüz teklif talebi yok.</p>}
        {quotes.map((q) => (
          <div key={q.id} className="spec-card rounded-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-metal">
                  {q.full_name}
                </p>
                <p className="mt-0.5 text-xs text-metalDim">
                  {q.phone} {q.email && `· ${q.email}`}
                </p>
                <p className="mt-1 text-xs text-metalDim">
                  {new Date(q.created_at).toLocaleString("tr-TR")}
                </p>
              </div>
              <StatusSelect id={q.id} value={q.status} options={[...statusOptions]} action={updateQuoteStatus} />
            </div>
            {q.service_type && (
              <p className="mt-3 font-mono text-xs text-spark">{q.service_type}</p>
            )}
            <p className="mt-2 text-sm text-metalDim">{q.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
