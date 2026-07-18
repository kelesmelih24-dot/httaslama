import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-graphite px-5 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-steel2 bg-steel text-spark">
        <Wrench size={28} />
      </div>
      <p className="dim-line mt-6 w-fit text-metalDim">HATA 404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-metal sm:text-4xl">
        Bu sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-metalDim">
        Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
      </p>
      <Link
        href="/"
        className="bg-spark-gradient mt-8 flex items-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-white transition hover:opacity-90"
      >
        Anasayfaya Dön <ArrowRight size={16} />
      </Link>
    </div>
  );
}
