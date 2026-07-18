"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Paperclip } from "lucide-react";
import { submitPreorder } from "@/lib/actions/public";
import type { Service } from "@/lib/types";

type FormState = {
  category: string;
  part_detail: string;
  material: string;
  quantity: string;
  preferred_date: string;
  full_name: string;
  phone: string;
  email: string;
};

const initial: FormState = {
  category: "",
  part_detail: "",
  material: "",
  quantity: "",
  preferred_date: "",
  full_name: "",
  phone: "",
  email: "",
};

const TOTAL_STEPS = 4;

export default function PreorderWizard({ services }: { services: Service[] }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(initial);
  const [file, setFile] = useState<File | null>(null);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleConfirm() {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.set(k, v));
    if (file) fd.set("file", file);
    startTransition(async () => {
      const res = await submitPreorder(fd);
      setResult(res.ok ? { ok: true } : { ok: false, error: res.error });
    });
  }

  if (result?.ok) {
    return (
      <div className="spec-card flex flex-col items-center gap-3 rounded-sm p-10 text-center">
        <CheckCircle2 className="text-spark" size={40} />
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
          Ön siparişiniz alındı
        </h3>
        <p className="text-sm text-metalDim">
          Ekibimiz tezgah uygunluğunu değerlendirip sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  return (
    <div className="spec-card rounded-sm p-7">
      {/* İlerleme çubuğu */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs ${
                step > i + 1
                  ? "bg-spark text-white"
                  : step === i + 1
                    ? "border border-spark text-spark"
                    : "border border-steel2 text-metalDim"
              }`}
            >
              {i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div className={`h-px flex-1 ${step > i + 1 ? "bg-spark" : "bg-steel2"}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
            1. Kategori seçin
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => update("category", s.title)}
                className={`rounded-sm border p-4 text-left text-sm transition ${
                  data.category === s.title
                    ? "border-spark bg-steel text-metal"
                    : "border-steel2 text-metalDim hover:border-metalDim"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={next}
              disabled={!data.category}
              className="bg-spark-gradient flex items-center gap-2 rounded-sm px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-40"
            >
              Devam <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
            2. Parça detayı
          </h3>
          <div className="mt-5 space-y-4">
            <Textarea
              label="Parça / iş tanımı"
              value={data.part_detail}
              onChange={(v) => update("part_detail", v)}
              placeholder="Örn: 30 mm çaplı mil, 250 mm boy"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              <Input label="Malzeme" value={data.material} onChange={(v) => update("material", v)} placeholder="Çelik, döküm..." />
              <Input label="Adet" type="number" value={data.quantity} onChange={(v) => update("quantity", v)} />
              <Input label="Tercih edilen tarih" type="date" value={data.preferred_date} onChange={(v) => update("preferred_date", v)} />
            </div>
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={back} className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-metalDim hover:text-metal">
              <ChevronLeft size={16} /> Geri
            </button>
            <button
              onClick={next}
              className="bg-spark-gradient flex items-center gap-2 rounded-sm px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white"
            >
              Devam <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
            3. Teknik resim / fotoğraf (opsiyonel)
          </h3>
          <p className="mt-2 text-sm text-metalDim">
            Elinizde parçaya ait bir teknik resim, PDF veya fotoğraf varsa ekleyebilirsiniz. Bu adımı boş geçebilirsiniz.
          </p>
          <div className="mt-5">
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-metalDim">
              <Paperclip size={13} /> Dosya (max 10 MB)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metalDim file:mr-3 file:rounded-sm file:border-0 file:bg-steel2 file:px-3 file:py-1.5 file:text-xs file:text-metal file:uppercase"
            />
            {file && <p className="mt-1.5 font-mono text-xs text-spark">{file.name}</p>}
          </div>
          <div className="mt-8 flex justify-between">
            <button onClick={back} className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-metalDim hover:text-metal">
              <ChevronLeft size={16} /> Geri
            </button>
            <button
              onClick={next}
              className="bg-spark-gradient flex items-center gap-2 rounded-sm px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white"
            >
              Devam <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-metal">
            4. İletişim bilgileri & özet onay
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Ad Soyad *" value={data.full_name} onChange={(v) => update("full_name", v)} />
            <Input label="Telefon *" value={data.phone} onChange={(v) => update("phone", v)} />
            <Input label="E-posta" value={data.email} onChange={(v) => update("email", v)} type="email" />
          </div>

          <div className="mt-6 space-y-1.5 rounded-sm border border-steel2 bg-graphite p-4 text-sm text-metalDim">
            <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-metal">
              Özet
            </p>
            <p><span className="text-metal">Kategori:</span> {data.category}</p>
            {data.part_detail && <p><span className="text-metal">Parça:</span> {data.part_detail}</p>}
            {data.material && <p><span className="text-metal">Malzeme:</span> {data.material}</p>}
            {data.quantity && <p><span className="text-metal">Adet:</span> {data.quantity}</p>}
            {data.preferred_date && <p><span className="text-metal">Tercih edilen tarih:</span> {data.preferred_date}</p>}
            <p><span className="text-metal">Dosya:</span> {file ? file.name : "Eklenmedi"}</p>
          </div>

          {result?.error && <p className="mt-4 text-sm text-spark">{result.error}</p>}

          <div className="mt-8 flex justify-between">
            <button onClick={back} className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-metalDim hover:text-metal">
              <ChevronLeft size={16} /> Geri
            </button>
            <button
              onClick={handleConfirm}
              disabled={pending || !data.full_name || !data.phone}
              className="bg-spark-gradient flex items-center gap-2 rounded-sm px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-40"
            >
              {pending && <Loader2 className="animate-spin" size={16} />}
              Ön Siparişi Onayla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">{label}</label>
      <textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
      />
    </div>
  );
}
