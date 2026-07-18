export const dynamic = 'force-dynamic';

import { getReferences } from "@/lib/data";

export const metadata = { title: "Referanslar | HT Makina Taşlama" };

export default async function ReferanslarPage() {
  const references = await getReferences();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">BİRLİKTE ÇALIŞTIĞIMIZ FİRMALAR</div>
      <h1 className="max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Referanslarımız
      </h1>

      {references.length === 0 ? (
        <p className="mt-8 max-w-md text-sm text-metalDim">
          Henüz yayınlanmış referans bulunmuyor. Yakında birlikte çalıştığımız
          firmalar burada yer alacak.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {references.map((r) => (
            <div
              key={r.id}
              className="spec-card flex flex-col items-center justify-center gap-3 rounded-sm p-6 text-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={r.logo_url}
                alt={r.name}
                className="h-14 w-full object-contain grayscale transition hover:grayscale-0"
              />
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-metalDim">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
