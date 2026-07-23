export const dynamic = 'force-dynamic';

import { getApprovedComments } from "@/lib/data";
import CommentForm from "@/components/site/CommentForm";
import StarRating from "@/components/site/StarRating";

export const metadata = { title: "Yorumlar" };

export default async function YorumlarPage() {
  const comments = await getApprovedComments();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">MÜŞTERİ YORUMLARI</div>
      <h1 className="max-w-xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Yorumlar
      </h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          {comments.length === 0 ? (
            <p className="text-sm text-metalDim">Henüz onaylanmış yorum bulunmuyor.</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="spec-card rounded-sm p-6">
                <StarRating rating={c.rating} />
                <p className="mt-3 text-sm leading-relaxed text-metalDim">&ldquo;{c.message}&rdquo;</p>
                <p className="mt-4 font-display text-sm font-semibold uppercase tracking-wide text-metal">
                  {c.name}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="lg:col-span-2">
          <CommentForm />
        </div>
      </div>
    </section>
  );
}
