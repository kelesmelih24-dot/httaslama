export const dynamic = 'force-dynamic';

import { Paperclip } from "lucide-react";
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
                  {q.full_name} {q.company_name && <span className="text-metalDim">· {q.company_name}</span>}
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
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-spark">
              {q.service_type && <span>{q.service_type}</span>}
              {q.material && <span>Malzeme: {q.material}</span>}
              {q.quantity && <span>Adet: {q.quantity}</span>}
              {q.delivery_date && <span>Teslim: {q.delivery_date}</span>}
              {q.budget_range && <span>Bütçe: {q.budget_range}</span>}
              {q.preferred_contact && <span>İletişim tercihi: {q.preferred_contact}</span>}
            </div>
            <p className="mt-2 text-sm text-metalDim">{q.description}</p>
            {q.file_url && (
              <a
                href={q.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-metal underline hover:text-spark"
              >
                <Paperclip size={13} /> Yüklenen dosyayı görüntüle
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
