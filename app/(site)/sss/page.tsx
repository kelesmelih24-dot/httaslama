export const dynamic = 'force-dynamic';

import { getFaqs } from "@/lib/data";
import FaqAccordion from "@/components/site/FaqAccordion";

export const metadata = { title: "Sık Sorulan Sorular" };

export default async function SssPage() {
  const faqs = await getFaqs();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8">
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="dim-line mb-4 w-fit">SIK SORULAN SORULAR</div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Merak Edilenler
      </h1>

      <div className="mt-10">
        {faqs.length === 0 ? (
          <p className="text-sm text-metalDim">Henüz eklenmiş bir soru bulunmuyor.</p>
        ) : (
          <FaqAccordion faqs={faqs} />
        )}
      </div>
    </section>
  );
}
