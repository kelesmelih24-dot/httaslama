"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitQuote } from "@/lib/actions/public";
import type { Service } from "@/lib/types";

export default function QuoteForm({ services }: { services: Service[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{ ok: boolean; error?: string } | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitQuote(formData);
      setState(result.ok ? { ok: true } : { ok: false, error: result.error });
      if (result.ok) formRef.current?.reset();
    });
  }

  if (state?.ok) {
    return (
      <div className="spec-card flex flex-col items-center gap-3 rounded-sm p-10 text-center">
        <CheckCircle2 className="text-spark" size={40} />
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
          Talebiniz alındı
        </h3>
        <p className="text-sm text-metalDim">
          En kısa sürede size dönüş yapacağız. İlginiz için teşekkür ederiz.
        </p>
        <button
          onClick={() => setState(null)}
          className="mt-2 font-display text-xs font-semibold uppercase tracking-wider text-spark hover:underline"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} className="spec-card space-y-5 rounded-sm p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad Soyad *" name="full_name" required />
        <Field label="Telefon *" name="phone" type="tel" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="E-posta" name="email" type="email" />
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
            İlgili Hizmet
          </label>
          <select
            name="service_type"
            className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal focus:border-spark"
          >
            <option value="">Seçiniz (opsiyonel)</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
          İş Detayı / Parça Ölçüsü *
        </label>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Örn: 45 mm çapında, 300 mm boy, çelik mil - dış çap taşlama"
          className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
        />
      </div>

      {state?.error && <p className="text-sm text-spark">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-spark-gradient flex w-full items-center justify-center gap-2 rounded-sm px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-wider text-graphite transition hover:opacity-90 disabled:opacity-60"
      >
        {pending && <Loader2 className="animate-spin" size={16} />}
        Teklif Talebi Gönder
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
      />
    </div>
  );
}
