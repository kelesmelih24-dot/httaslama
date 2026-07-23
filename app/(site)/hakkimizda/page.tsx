export const dynamic = 'force-dynamic';

import { Target, Eye, ShieldCheck, BadgeCheck } from "lucide-react";
import { getAboutSettings } from "@/lib/data";

export const metadata = { title: "Hakkımızda" };

export default async function HakkimizdaPage() {
  const about = await getAboutSettings();

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
      <div className="dim-line mb-4 w-fit">HAKKIMIZDA</div>
      <h1 className="max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-metal">
        Uzman Ekibimiz
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-base leading-relaxed text-metalDim">{about.story}</p>
        </div>
        <div className="spec-card flex flex-col items-center justify-center rounded-sm p-8 text-center">
          <span className="font-display text-5xl font-bold text-spark">{about.years_experience}+</span>
          <span className="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-metalDim">
            Yıllık Deneyim
          </span>
        </div>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        <div className="spec-card rounded-sm p-7">
          <Target className="text-spark" size={22} />
          <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-metal">Misyon</h2>
          <p className="mt-2 text-sm leading-relaxed text-metalDim">{about.mission}</p>
        </div>
        <div className="spec-card rounded-sm p-7">
          <Eye className="text-spark" size={22} />
          <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-metal">Vizyon</h2>
          <p className="mt-2 text-sm leading-relaxed text-metalDim">{about.vision}</p>
        </div>
        <div className="spec-card rounded-sm p-7">
          <BadgeCheck className="text-spark" size={22} />
          <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-metal">
            Kalite Politikası
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-metalDim">{about.quality_policy}</p>
        </div>
        <div className="spec-card rounded-sm p-7">
          <ShieldCheck className="text-spark" size={22} />
          <h2 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-metal">
            İş Güvenliği Politikası
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-metalDim">{about.safety_policy}</p>
        </div>
      </div>
    </section>
  );
}
