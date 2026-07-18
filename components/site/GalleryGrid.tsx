"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { GalleryItem, GalleryCategory } from "@/lib/types";
import BeforeAfterSlider from "@/components/site/BeforeAfterSlider";

const tabs: { value: GalleryCategory | "hepsi"; label: string }[] = [
  { value: "hepsi", label: "Tümü" },
  { value: "atolye", label: "Atölye" },
  { value: "makine", label: "Makineler" },
  { value: "tamamlanan", label: "Tamamlanan İşler" },
  { value: "oncesi-sonrasi", label: "Öncesi / Sonrası" },
];

function toEmbeddableVideoUrl(url: string): { type: "iframe" | "video"; src: string } {
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([\w-]+)/);
  if (ytMatch) {
    return { type: "iframe", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }
  return { type: "video", src: url };
}

function GalleryMedia({ item }: { item: GalleryItem }) {
  if (item.category === "oncesi-sonrasi" && item.before_image_url) {
    return <BeforeAfterSlider before={item.before_image_url} after={item.image_url} alt={item.title} />;
  }
  if (item.video_url) {
    const embed = toEmbeddableVideoUrl(item.video_url);
    return (
      <div className="aspect-[4/3] w-full bg-black">
        {embed.type === "iframe" ? (
          <iframe
            src={embed.src}
            title={item.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={embed.src} controls className="h-full w-full object-cover" />
        )}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.image_url} alt={item.title} className="aspect-[4/3] w-full object-cover" />;
}

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
              <div className="relative">
                <GalleryMedia item={item} />
                {item.video_url && (
                  <span className="absolute left-2 top-2 flex items-center gap-1 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-spark">
                    <Play size={10} /> Video
                  </span>
                )}
              </div>
              <p className="p-4 text-sm text-metal">{item.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
