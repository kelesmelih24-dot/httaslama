"use client";

import { useState } from "react";

export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={`${alt} - sonra`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={`${alt} - önce`} className="h-full w-full max-w-none object-cover" style={{ width: `${100 / (pos / 100)}%` }} draggable={false} />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-spark"
        style={{ left: `${pos}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Öncesi / sonrası karşılaştırma kaydırıcısı"
        className="absolute inset-x-0 bottom-3 mx-auto w-[85%] accent-spark"
      />
      <span className="absolute left-2 top-2 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-metalDim">
        Önce
      </span>
      <span className="absolute right-2 top-2 rounded-sm bg-graphite/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-metalDim">
        Sonra
      </span>
    </div>
  );
}
