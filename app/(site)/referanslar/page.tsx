export const revalidate = 60;

import { getReferences } from "@/lib/data";

export const metadata = { title: "Referanslar | HT Makina Taşlama" };

export default async function ReferanslarPage() {
  const references = await getReferences();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">TAMAMLANAN İŞLER</div>
      <h1 className="max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Referanslarımız
      </h1>

      {references.length === 0 ? (
        <p className="mt-8 max-w-md text-sm text-metalDim">
          Henüz yayınlanmış referans bulunmuyor. Yakında tamamlanan işlerimizden örnekler burada
          yer alacak.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((r) => (
            <div key={r.id} className="spec-card overflow-hidden rounded-sm">
              {r.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.image_url} alt={r.project_title} className="h-52 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-metal">{r.project_title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-metalDim">{r.client_name}</p>
                {r.description && <p className="mt-3 text-sm text-metalDim">{r.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
