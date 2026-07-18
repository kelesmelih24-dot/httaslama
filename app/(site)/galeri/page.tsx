export const dynamic = 'force-dynamic';

import { getGallery } from "@/lib/data";
import GalleryGrid from "@/components/site/GalleryGrid";

export const metadata = { title: "Galeri | HT Makina Taşlama" };

export default async function GaleriPage() {
  const items = await getGallery();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">GALERİ</div>
      <h1 className="max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Atölyeden kareler
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-metalDim">
        Atölyemiz, makinelerimiz ve tamamladığımız işlerden görseller.
      </p>
      <div className="mt-10">
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
