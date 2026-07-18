"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Lock, Loader2 } from "lucide-react";
import { adminLogin } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await adminLogin(formData);
      if (res.ok) {
        router.push("/yonetim");
        router.refresh();
      } else {
        setError(res.error || "Giriş başarısız.");
      }
    });
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <form
        action={handleSubmit}
        className="spec-card w-full max-w-sm rounded-sm p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-steel text-spark">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="font-display text-base font-semibold uppercase tracking-wide text-metal">
              Yönetim Paneli
            </h1>
            <p className="text-xs text-metalDim">HT Makina Taşlama</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
              Kullanıcı Adı
            </label>
            <input
              name="username"
              required
              autoFocus
              className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal focus:border-spark"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-metalDim">
              Şifre
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-sm border border-steel2 bg-steel px-3 py-2.5 text-sm text-metal focus:border-spark"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-spark">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="bg-spark-gradient mt-6 flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider text-graphite disabled:opacity-60"
        >
          {pending && <Loader2 className="animate-spin" size={16} />}
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
