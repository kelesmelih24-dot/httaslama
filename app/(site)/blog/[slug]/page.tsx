export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/data";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} - Blog`,
    description: post.excerpt || post.title,
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.htmakinataslama.com";
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.created_at,
    dateModified: post.created_at,
    image: post.cover_image_url || `${siteUrl}/og-image.png`,
    author: { "@type": "Organization", name: "HT Makina Taşlama" },
    publisher: { "@type": "Organization", name: "HT Makina Taşlama" },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <p className="text-xs text-metalDim">{new Date(post.created_at).toLocaleDateString("tr-TR")}</p>
      <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
        {post.title}
      </h1>
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="mt-8 aspect-[16/9] w-full rounded-sm object-cover" />
      )}
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-metalDim">
        {post.content.split("\n").filter(Boolean).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
