export const dynamic = 'force-dynamic';

import { getServices } from "@/lib/data";
import PreorderWizard from "@/components/site/PreorderWizard";

export const metadata = { title: "Ön Sipariş" };

export default async function OnSiparisPage() {
  const services = await getServices();

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">ÖN SİPARİŞ</div>
      <h1 className="max-w-xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        İşinizi sıraya alalım
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-metalDim">
        3 adımda ön siparişinizi oluşturun; ekibimiz tezgah müsaitliğine göre size dönüş yapıp
        tarih ve fiyatı netleştirsin.
      </p>
      <div className="mt-10">
        <PreorderWizard services={services} />
      </div>
    </section>
  );
}
