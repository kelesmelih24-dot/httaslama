export const revalidate = 60;

import { getServices } from "@/lib/data";
import ServiceCard from "@/components/site/ServiceCard";

export const metadata = { title: "Hizmetlerimiz | HT Makina Taşlama" };

export default async function HizmetlerPage() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">HİZMETLERİMİZ</div>
      <h1 className="max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Taşlama hizmetlerimiz
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-metalDim">
        Batuhan Usta ve ekibi tarafından sunulan temel teknik hizmetler. Parça ölçünüzü ve
        malzeme türünü paylaştığınızda tezgah kapasitemizin işinize uygunluğunu doğrudan
        değerlendirebiliriz.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
