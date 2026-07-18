import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";
import { getServiceIcon } from "@/lib/serviceIcons";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = getServiceIcon(service.slug);

  return (
    <Link
      href={`/hizmetler/${service.slug}`}
      className="spec-card group flex flex-col rounded-sm p-6 transition hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-metalDim">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-steel2 bg-graphite text-spark transition group-hover:border-spark">
          <Icon size={18} />
        </div>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-metal">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-metalDim">{service.summary}</p>
      {service.tolerance_note && (
        <p className="mt-4 font-mono text-xs text-spark">{service.tolerance_note}</p>
      )}
      <span className="mt-5 flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wider text-metal group-hover:text-spark">
        Detay <ArrowRight size={14} />
      </span>
    </Link>
  );
}
