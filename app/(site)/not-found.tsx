import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-20 text-center lg:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-steel2 bg-steel text-spark">
        <Wrench size={28} />
      </div>
      <p className="dim-line mt-6 w-fit">HATA 404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
        Bu sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-metalDim">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Anasayfaya dönüp aradığınızı oradan
        bulabilirsiniz.
      </p>
      <Link
        href="/"
        className="bg-spark-gradient mt-8 flex items-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-graphite transition hover:opacity-90"
      >
        Anasayfaya Dön <ArrowRight size={16} />
      </Link>
    </section>
  );
}
