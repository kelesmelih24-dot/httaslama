export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getPublishedPosts } from "@/lib/data";

export const metadata = { title: "Blog | HT Makina Taşlama" };

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">HABERLER & YAZILAR</div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-metal">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-metalDim">Henüz yayınlanmış bir yazı yok.</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="spec-card overflow-hidden rounded-sm">
              {p.cover_image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_image_url} alt={p.title} className="aspect-[16/9] w-full object-cover" />
              )}
              <div className="p-5">
                <p className="text-xs text-metalDim">
                  {new Date(p.created_at).toLocaleDateString("tr-TR")}
                </p>
                <h2 className="mt-2 font-display text-base font-semibold uppercase tracking-wide text-metal">
                  {p.title}
                </h2>
                {p.excerpt && <p className="mt-2 text-sm text-metalDim">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
