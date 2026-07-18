export const dynamic = 'force-dynamic';

import Link from "next/link";
import { ArrowRight, CircleDot, Layers, Sparkles, Wind, Play } from "lucide-react";
import {
  getServices,
  getReferences,
  getApprovedComments,
  getSiteSettings,
  getAboutSettings,
  getGallery,
  getPublishedPosts,
  getStatsSettings,
} from "@/lib/data";
import HeroDiagram from "@/components/site/HeroDiagram";
import ServiceCard from "@/components/site/ServiceCard";
import StarRating from "@/components/site/StarRating";

export default async function HomePage() {
  const [services, references, comments, settings, about, gallery, posts, stats] = await Promise.all([
    getServices(),
    getReferences(),
    getApprovedComments(),
    getSiteSettings(),
    getAboutSettings(),
    getGallery(),
    getPublishedPosts(),
    getStatsSettings(),
  ]);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden border-b border-steel2 bg-graphite">
        <div className="bg-brushed-metal pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="animate-riseIn">
            <div className="dim-line mb-6 w-fit">
              <span className="whitespace-nowrap">EST. ATÖLYE — HASSAS TAŞLAMA</span>
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

      {/* ---------------- HAKKIMIZDA ÖNİZLEME + RAKAMLARLA BİZ ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="dim-line mb-4 w-fit">HAKKIMIZDA</div>
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:col-span-2">
            <h2 className="max-w-xl font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
              Mikron hassasiyetinde çözüm ortağınız
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-metalDim">{about.story}</p>
            <Link
              href="/hakkimizda"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-spark hover:underline"
            >
              Hikayemizi Okuyun <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            {[
              { value: stats.stat1_value, label: stats.stat1_label },
              { value: stats.stat2_value, label: stats.stat2_label },
              { value: stats.stat3_value, label: stats.stat3_label },
            ].map((s, i) => (
              <div key={i} className="spec-card flex flex-col items-center justify-center rounded-sm p-5 text-center">
                <span className="font-display text-2xl font-bold text-spark sm:text-3xl">{s.value}</span>
                <span className="mt-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-metalDim">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
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

      {/* ---------------- GALERİ ÖNİZLEME ---------------- */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="dim-line mb-4 w-fit">GALERİ</div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
                Atölyeden kareler
              </h2>
            </div>
            <Link href="/galeri" className="font-display text-sm font-semibold uppercase tracking-wider text-spark hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.slice(0, 4).map((item) => (
              <div key={item.id} className="spec-card relative overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image_url} alt={item.title} className="aspect-square w-full object-cover" />
                {item.video_url && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-spark">
                    <Play size={10} /> Video
                  </span>
                )}
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

      {/* ---------------- BLOG ÖNİZLEME ---------------- */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="dim-line mb-4 w-fit">HABERLER & YAZILAR</div>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
                Blogumuzdan son yazılar
              </h2>
            </div>
            <Link href="/blog" className="font-display text-sm font-semibold uppercase tracking-wider text-spark hover:underline">
              Tümünü Gör →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="spec-card overflow-hidden rounded-sm">
                {p.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.cover_image_url} alt={p.title} className="aspect-[16/9] w-full object-cover" />
                )}
                <div className="p-5">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-metal">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-metalDim">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
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
