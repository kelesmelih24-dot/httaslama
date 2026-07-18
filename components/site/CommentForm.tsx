"use client";

import { useRef, useState, useTransition } from "react";
import { CheckCircle2, Loader2, Star } from "lucide-react";
import { submitComment } from "@/lib/actions/public";
import HoneypotField from "@/components/site/HoneypotField";

export default function CommentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [rating, setRating] = useState(5);
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<{ ok: boolean; error?: string } | null>(null);

  function handleSubmit(formData: FormData) {
    formData.set("rating", String(rating));
    startTransition(async () => {
      const res = await submitComment(formData);
      setState(res.ok ? { ok: true } : { ok: false, error: res.error });
      if (res.ok) {
        formRef.current?.reset();
        setRating(5);
      }
    });
  }

  if (state?.ok) {
    return (
      <div className="spec-card flex flex-col items-center gap-3 rounded-sm p-8 text-center">
        <CheckCircle2 className="text-spark" size={32} />
        <p className="text-sm text-metalDim">
          Yorumunuz alındı, onaylandıktan sonra sitede yayınlanacak. Teşekkürler!
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={handleSubmit} className="spec-card space-y-4 rounded-sm p-7">
      <HoneypotField />
      <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
        Yorum bırakın
      </h3>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setRating(i + 1)}
            aria-label={`${i + 1} yıldız ver`}
          >
            <Star size={22} className={i < rating ? "fill-ember text-ember" : "text-steel2"} />
          </button>
        ))}
      </div>

      <input
        name="name"
        required
        placeholder="Adınız"
        className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
      />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Deneyiminizi paylaşın"
        className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal placeholder:text-metalDim/60 focus:border-spark"
      />

      {state?.error && <p className="text-sm text-spark">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 rounded-sm border border-steel2 px-6 py-2.5 font-display text-sm font-semibold uppercase tracking-wider text-metal hover:border-spark hover:text-spark disabled:opacity-60"
      >
        {pending && <Loader2 className="animate-spin" size={16} />}
        Gönder
      </button>
    </form>
  );
}
