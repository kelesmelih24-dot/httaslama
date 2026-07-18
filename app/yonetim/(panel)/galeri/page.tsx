export const dynamic = 'force-dynamic';

import { Trash2, Plus } from "lucide-react";
import { getAllGalleryAdmin } from "@/lib/admin-data";
import { upsertGalleryItem, deleteGalleryItem } from "@/lib/actions/admin";

const categories = [
  { value: "atolye", label: "Atölye" },
  { value: "makine", label: "Makineler" },
  { value: "tamamlanan", label: "Tamamlanan İşler" },
  { value: "oncesi-sonrasi", label: "Öncesi / Sonrası" },
];

export default async function AdminGaleriPage() {
  const items = await getAllGalleryAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Galeri</h1>
      <p className="mt-1 text-sm text-metalDim">
        Görseli önce imgur.com gibi bir yere yükleyip linkini yapıştırın. &quot;Öncesi / Sonrası&quot;
        kategorisinde hem önce hem sonra görseli girin.
      </p>

      <details className="spec-card mt-8 rounded-sm p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark">
          <Plus size={16} /> Yeni Görsel Ekle
        </summary>
        <form action={upsertGalleryItem} className="mt-6 space-y-4">
          <GalleryFields />
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </details>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => {
          const boundDelete = deleteGalleryItem.bind(null, item.id);
          return (
            <details key={item.id} className="spec-card rounded-sm p-6">
              <summary className="flex cursor-pointer items-center gap-3 font-display text-sm font-semibold uppercase tracking-wide text-metal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image_url} alt={item.title} className="h-10 w-14 rounded-sm object-cover" />
                {item.title}
              </summary>
              <form action={upsertGalleryItem} className="mt-6 space-y-4">
                <input type="hidden" name="id" value={item.id} />
                <GalleryFields defaults={item} />
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

function GalleryFields({ defaults }: { defaults?: any }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Başlık</Label>
        <input name="title" required defaultValue={defaults?.title} className="input" />
      </div>
      <div>
        <Label>Kategori</Label>
        <select name="category" defaultValue={defaults?.category || "atolye"} className="input">
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Görsel URL (Öncesi/Sonrası&apos;nda &quot;sonra&quot; görseli)</Label>
        <input name="image_url" required defaultValue={defaults?.image_url} placeholder="https://..." className="input" />
      </div>
      <div>
        <Label>Önce Görseli URL (sadece Öncesi/Sonrası için)</Label>
        <input name="before_image_url" defaultValue={defaults?.before_image_url} placeholder="https://..." className="input" />
      </div>
      <div>
        <Label>Video URL (opsiyonel — YouTube linki veya doğrudan .mp4 linki)</Label>
        <input name="video_url" defaultValue={defaults?.video_url} placeholder="https://youtube.com/watch?v=... veya .mp4 linki" className="input" />
      </div>
      <div>
        <Label>Sıra No</Label>
        <input name="order_index" type="number" defaultValue={defaults?.order_index ?? 0} className="input" />
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
