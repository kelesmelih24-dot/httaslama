"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2, X, Zap } from "lucide-react";
import { submitQuote } from "@/lib/actions/public";
import type { Service } from "@/lib/types";
import HoneypotField from "@/components/site/HoneypotField";

export default function QuickQuotePopup({ services }: { services: Service[] }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{ ok: boolean; error?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitQuote(formData);
      setState(res.ok ? { ok: true } : { ok: false, error: res.error });
      if (res.ok) formRef.current?.reset();
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-spark-gradient fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-sm px-4 py-3 font-display text-xs font-semibold uppercase tracking-wider text-graphite shadow-lg shadow-black/40 transition hover:opacity-90"
      >
        <Zap size={16} /> Hızlı Teklif Al
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-5">
          <div className="spec-card w-full max-w-md rounded-t-sm p-6 sm:rounded-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
                Hızlı Teklif Al
              </h3>
              <button onClick={() => setOpen(false)} aria-label="Kapat" className="text-metalDim hover:text-spark">
                <X size={18} />
              </button>
            </div>

            {state?.ok ? (
              <div className="mt-6 flex flex-col items-center gap-2 py-6 text-center">
                <CheckCircle2 className="text-spark" size={32} />
                <p className="text-sm text-metalDim">Talebiniz alındı, en kısa sürede dönüş yapacağız.</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-spark hover:underline"
                >
                  Kapat
                </button>
              </div>
            ) : (
              <form ref={formRef} action={handleSubmit} className="mt-5 space-y-3">
                <HoneypotField />
                <input name="full_name" required placeholder="Ad Soyad" className="input" />
                <input name="phone" required placeholder="Telefon" type="tel" className="input" />
                <select name="service_type" className="input">
                  <option value="">İlgili hizmet (opsiyonel)</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
                <textarea
                  name="description"
                  required
                  rows={2}
                  placeholder="Kısaca ne yaptırmak istiyorsunuz?"
                  className="input"
                />
                {state?.error && <p className="text-xs text-spark">{state.error}</p>}
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-spark-gradient flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3 font-display text-xs font-semibold uppercase tracking-wider text-graphite disabled:opacity-60"
                >
                  {pending && <Loader2 className="animate-spin" size={14} />}
                  Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
