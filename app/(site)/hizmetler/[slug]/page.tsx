export const revalidate = 60;

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getServiceBySlug, getServices } from "@/lib/data";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">HİZMET DETAYI</div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-metal">
        {service.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-metalDim">{service.summary}</p>

      {service.detail && (
        <div className="spec-card mt-8 rounded-sm p-7">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
            Süreç
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-metalDim">{service.detail}</p>
          {service.tolerance_note && (
            <p className="mt-5 font-mono text-sm text-spark">{service.tolerance_note}</p>
          )}
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/iletisim"
          className="bg-spark-gradient flex items-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-graphite"
        >
          Bu İş İçin Teklif Al <ArrowRight size={16} />
        </Link>
        <Link
          href="/hizmetler"
          className="flex items-center gap-2 rounded-sm border border-steel2 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-metal hover:border-spark hover:text-spark"
        >
          Tüm Hizmetler
        </Link>
      </div>
    </section>
  );
}
