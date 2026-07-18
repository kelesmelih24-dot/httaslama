export const dynamic = 'force-dynamic';

import { Trash2, Plus } from "lucide-react";
import { getAllFaqsAdmin } from "@/lib/admin-data";
import { upsertFaq, deleteFaq } from "@/lib/actions/admin";

export default async function AdminSssPage() {
  const faqs = await getAllFaqsAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Sık Sorulan Sorular</h1>
      <p className="mt-1 text-sm text-metalDim">Sitedeki SSS sayfasında görünen soru-cevaplar.</p>

      <details className="spec-card mt-8 rounded-sm p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark">
          <Plus size={16} /> Yeni Soru Ekle
        </summary>
        <form action={upsertFaq} className="mt-6 space-y-4">
          <FaqFields />
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </details>

      <div className="mt-8 space-y-4">
        {faqs.map((f) => {
          const boundDelete = deleteFaq.bind(null, f.id);
          return (
            <details key={f.id} className="spec-card rounded-sm p-6">
              <summary className="cursor-pointer font-display text-sm font-semibold text-metal">
                {f.question}
              </summary>
              <form action={upsertFaq} className="mt-6 space-y-4">
                <input type="hidden" name="id" value={f.id} />
                <FaqFields defaults={f} />
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

function FaqFields({ defaults }: { defaults?: any }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Soru</Label>
        <input name="question" required defaultValue={defaults?.question} className="input" />
      </div>
      <div>
        <Label>Cevap</Label>
        <textarea name="answer" required rows={3} defaultValue={defaults?.answer} className="input" />
      </div>
      <div className="max-w-[140px]">
        <Label>Sıra No</Label>
        <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className="input" />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
