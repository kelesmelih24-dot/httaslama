"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function StatusSelect<T extends string>({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: T;
  options: { value: T; label: string }[];
  action: (id: string, status: T) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <select
        defaultValue={value}
        disabled={pending}
        onChange={(e) => startTransition(() => action(id, e.target.value as T))}
        className="rounded-sm border border-steel2 bg-steel px-2.5 py-1.5 text-xs text-metal focus:border-spark"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {pending && <Loader2 className="animate-spin text-metalDim" size={14} />}
    </div>
  );
}
