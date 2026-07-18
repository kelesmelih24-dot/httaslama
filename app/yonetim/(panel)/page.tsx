export const dynamic = 'force-dynamic';

import Link from "next/link";
import { FileText, PackageSearch, MessageSquare } from "lucide-react";
import { getDashboardCounts } from "@/lib/admin-data";

export default async function DashboardPage() {
  const counts = await getDashboardCounts();

  const cards = [
    {
      label: "Yeni Teklif Talebi",
      value: counts.newQuotes,
      href: "/yonetim/teklifler",
      icon: FileText,
    },
    {
      label: "Yeni Ön Sipariş",
      value: counts.newPreorders,
      href: "/yonetim/on-siparisler",
      icon: PackageSearch,
    },
    {
      label: "Onay Bekleyen Yorum",
      value: counts.pendingComments,
      href: "/yonetim/yorumlar",
      icon: MessageSquare,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Panel</h1>
      <p className="mt-1 text-sm text-metalDim">Sitenizdeki güncel talepleri buradan takip edin.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="spec-card rounded-sm p-6 transition hover:-translate-y-1">
            <c.icon className="text-spark" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-metal">{c.value}</p>
            <p className="mt-1 text-sm text-metalDim">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
