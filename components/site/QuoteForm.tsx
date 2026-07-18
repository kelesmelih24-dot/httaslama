"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2, Paperclip } from "lucide-react";
import { submitQuote } from "@/lib/actions/public";
import type { Service } from "@/lib/types";
import HoneypotField from "@/components/site/HoneypotField";

export default function QuoteForm({ services }: { services: Service[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{ ok: boolean; error?: string } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitQuote(formData);
      setState(result.ok ? { ok: true } : { ok: false, error: result.error });
      if (result.ok) {
        formRef.current?.reset();
        setFileName(null);
      }
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
      <HoneypotField />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad Soyad *" name="full_name" required />
        <Field label="Firma Adı" name="company_name" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefon *" name="phone" type="tel" required />
        <Field label="E-posta" name="email" type="email" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
            İlgili Hizmet
          </label>
          <select name="service_type" className="input">
            <option value="">Seçiniz (opsiyonel)</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
        </div>
        <Field label="Malzeme Türü" name="material" placeholder="Çelik, döküm, alüminyum..." />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Adet" name="quantity" type="number" />
        <Field label="Teslim Tarihi (tercih)" name="delivery_date" type="date" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Bütçe Aralığı (opsiyonel)" name="budget_range" placeholder="Örn: 5.000 - 10.000 TL" />
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
            Tercih Edilen İletişim Şekli
          </label>
          <select name="preferred_contact" className="input">
            <option value="">Farketmez</option>
            <option value="Telefon">Telefon</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="E-posta">E-posta</option>
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
          className="input"
        />
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-metalDim">
          <Paperclip size={13} /> Teknik Resim / PDF (opsiyonel, max 10 MB)
        </label>
        <input
          name="file"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
          className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metalDim file:mr-3 file:rounded-sm file:border-0 file:bg-steel2 file:px-3 file:py-1.5 file:text-xs file:text-metal file:uppercase"
        />
        {fileName && <p className="mt-1.5 font-mono text-xs text-spark">{fileName}</p>}
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
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
        {label}
      </label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="input" />
    </div>
  );
}
