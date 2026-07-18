"use client";

import { useState } from "react";
import type { GalleryItem, GalleryCategory } from "@/lib/types";
import BeforeAfterSlider from "@/components/site/BeforeAfterSlider";

const tabs: { value: GalleryCategory | "hepsi"; label: string }[] = [
  { value: "hepsi", label: "Tümü" },
  { value: "atolye", label: "Atölye" },
  { value: "makine", label: "Makineler" },
  { value: "tamamlanan", label: "Tamamlanan İşler" },
  { value: "oncesi-sonrasi", label: "Öncesi / Sonrası" },
];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryCategory | "hepsi">("hepsi");
  const filtered = active === "hepsi" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActive(t.value)}
            className={`rounded-sm border px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider transition ${
              active === t.value
                ? "border-spark bg-steel text-spark"
                : "border-steel2 text-metalDim hover:border-metalDim hover:text-metal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-metalDim">Bu kategoride henüz görsel eklenmedi.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="spec-card overflow-hidden rounded-sm">
              {item.category === "oncesi-sonrasi" && item.before_image_url ? (
                <BeforeAfterSlider before={item.before_image_url} after={item.image_url} alt={item.title} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              )}
              <p className="p-4 text-sm text-metal">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
