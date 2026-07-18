export const dynamic = 'force-dynamic';

import { Trash2, Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/lib/admin-data";
import { upsertPost, deletePost } from "@/lib/actions/admin";

export default async function AdminBlogPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Blog / Haberler</h1>
      <p className="mt-1 text-sm text-metalDim">
        &quot;Yayınla&quot; işaretlenmeyen yazılar sitede görünmez, taslak olarak kalır.
      </p>

      <details className="spec-card mt-8 rounded-sm p-6">
        <summary className="flex cursor-pointer items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark">
          <Plus size={16} /> Yeni Yazı Ekle
        </summary>
        <form action={upsertPost} className="mt-6 space-y-4">
          <PostFields />
          <button className="bg-spark-gradient rounded-sm px-6 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-graphite">
            Kaydet
          </button>
        </form>
      </details>

      <div className="mt-8 space-y-4">
        {posts.map((p) => {
          const boundDelete = deletePost.bind(null, p.id);
          return (
            <details key={p.id} className="spec-card rounded-sm p-6">
              <summary className="flex cursor-pointer items-center justify-between font-display text-sm font-semibold uppercase tracking-wide text-metal">
                <span>{p.title}</span>
                <span
                  className={`rounded-sm px-2.5 py-1 text-xs font-medium ${
                    p.published ? "bg-spark/20 text-spark" : "bg-steel2 text-metalDim"
                  }`}
                >
                  {p.published ? "Yayında" : "Taslak"}
                </span>
              </summary>
              <form action={upsertPost} className="mt-6 space-y-4">
                <input type="hidden" name="id" value={p.id} />
                <PostFields defaults={p} />
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

function PostFields({ defaults }: { defaults?: any }) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Başlık</Label>
        <input name="title" required defaultValue={defaults?.title} className="input" />
      </div>
      <div>
        <Label>Kısa Özet (liste sayfasında görünür)</Label>
        <textarea name="excerpt" rows={2} defaultValue={defaults?.excerpt} className="input" />
      </div>
      <div>
        <Label>Kapak Görseli URL</Label>
        <input name="cover_image_url" defaultValue={defaults?.cover_image_url} placeholder="https://..." className="input" />
      </div>
      <div>
        <Label>İçerik</Label>
        <textarea name="content" required rows={8} defaultValue={defaults?.content} className="input" />
      </div>
      <label className="flex items-center gap-2 text-sm text-metalDim">
        <input type="checkbox" name="published" defaultChecked={defaults?.published} className="accent-spark" />
        Yayınla (işaretlenmezse taslak olarak kalır)
      </label>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{children}</label>;
}
