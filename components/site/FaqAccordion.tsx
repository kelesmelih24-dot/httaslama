"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((f) => {
        const open = openId === f.id;
        return (
          <div key={f.id} className="spec-card rounded-sm">
            <button
              onClick={() => setOpenId(open ? null : f.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={open}
            >
              <span className="font-display text-sm font-semibold text-metal">{f.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-metalDim transition-transform ${open ? "rotate-180 text-spark" : ""}`}
              />
            </button>
            {open && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-metalDim">{f.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
