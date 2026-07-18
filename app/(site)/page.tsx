export const dynamic = 'force-dynamic';

import Link from "next/link";
import { ArrowRight, CircleDot, Layers, Sparkles, Wind } from "lucide-react";
import { getServices, getReferences, getApprovedComments, getSiteSettings } from "@/lib/data";
import HeroDiagram from "@/components/site/HeroDiagram";
import ServiceCard from "@/components/site/ServiceCard";
import StarRating from "@/components/site/StarRating";

export default async function HomePage() {
  const [services, references, comments, settings] = await Promise.all([
    getServices(),
    getReferences(),
    getApprovedComments(),
    getSiteSettings(),
  ]);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-steel2 bg-graphite">
        <div className="bg-brushed-metal pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="animate-riseIn">
            <div className="dim-line mb-6 w-fit">
              <span className="whitespace-nowrap">EST. ATÖLYE — BATUHAN USTA</span>
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-metal text-balance sm:text-5xl lg:text-6xl">
              {settings.hero_title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-metalDim">
              {settings.hero_subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/iletisim"
                className="bg-spark-gradient flex items-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-graphite transition hover:opacity-90"
              >
                Teklif Al <ArrowRight size={16} />
              </Link>
              <Link
                href="/on-siparis"
                className="flex items-center gap-2 rounded-sm border border-steel2 px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-metal transition hover:border-spark hover:text-spark"
              >
                Ön Sipariş Ver
              </Link>
            </div>
          </div>

          <div className="relative animate-riseIn [animation-delay:150ms]">
            <HeroDiagram />
          </div>
        </div>
      </section>

      {/* ---------------- HİZMETLER ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="dim-line mb-4 w-fit">HİZMETLERİMİZ</div>
        <h2 className="max-w-xl font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
          Mikron toleransında dört temel işlem
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------- SÜREÇ (gerçek sıralı akış) ---------------- */}
      <section className="border-y border-steel2 bg-steel">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="dim-line mb-4 w-fit">NASIL ÇALIŞIYORUZ</div>
          <h2 className="max-w-xl font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
            Parçanız 4 adımda size döner
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              { n: "01", t: "Ölçü & Teklif", d: "Parça ölçüsünü ve malzemeyi paylaşın, aynı gün teklif alın.", icon: Layers },
              { n: "02", t: "Kabul & Planlama", d: "Tezgah müsaitliğine göre iş sıraya alınır, tarih netleşir.", icon: CircleDot },
              { n: "03", t: "Hassas Taşlama", d: "İşlem mikron toleransla yapılır, ara kontrolle doğrulanır.", icon: Sparkles },
              { n: "04", t: "Teslim", d: "Son kalite kontrolünden geçen parça size teslim edilir.", icon: Wind },
            ].map((step) => (
              <div key={step.n} className="relative pl-1">
                <span className="font-mono text-xs text-spark">{step.n}</span>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-sm border border-steel2 bg-graphite text-spark">
                  <step.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-wide text-metal">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-metalDim">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- REFERANSLAR ÖNİZLEME ---------------- */}
      {references.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="dim-line w-fit">BİRLİKTE ÇALIŞTIĞIMIZ FİRMALAR</div>
            <Link href="/referanslar" className="font-display text-sm font-semibold uppercase tracking-wider text-spark hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {references.slice(0, 6).map((r) => (
              <div key={r.id} className="flex items-center justify-center rounded-sm border border-steel2 bg-steel p-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.logo_url}
                  alt={r.name}
                  className="h-10 w-full object-contain grayscale transition hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- YORUMLAR ÖNİZLEME ---------------- */}
      {comments.length > 0 && (
        <section className="border-t border-steel2 bg-steel">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="dim-line mb-4 w-fit">MÜŞTERİ YORUMLARI</div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
              Bizimle çalışanlar ne diyor
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {comments.slice(0, 3).map((c) => (
                <div key={c.id} className="spec-card rounded-sm p-6">
                  <StarRating rating={c.rating} />
                  <p className="mt-4 text-sm leading-relaxed text-metalDim">&ldquo;{c.message}&rdquo;</p>
                  <p className="mt-4 font-display text-sm font-semibold uppercase tracking-wide text-metal">
                    {c.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="bg-spark-gradient flex flex-col items-start justify-between gap-6 rounded-sm p-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-graphite sm:text-3xl">
              İşinizi bugün teklife dönüştürün
            </h2>
            <p className="mt-2 max-w-md text-sm text-graphite/80">
              Parça ölçünüzü ve malzeme türünü paylaşın, tezgah kapasitemize uygunluğunu birlikte değerlendirelim.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="whitespace-nowrap rounded-sm bg-graphite px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-metal transition hover:bg-steel"
          >
            Teklif Formu
          </Link>
        </div>
      </section>
    </>
  );
}
