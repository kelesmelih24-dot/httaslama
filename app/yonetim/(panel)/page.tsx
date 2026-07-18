export const dynamic = 'force-dynamic';

import Link from "next/link";
import { FileText, PackageSearch, MessageSquare, ClipboardList, CheckCircle2 } from "lucide-react";
import { getDashboardCounts, getMonthlyActivity } from "@/lib/admin-data";
import MonthlyChart from "@/components/admin/MonthlyChart";

export default async function DashboardPage() {
  const [counts, monthly] = await Promise.all([getDashboardCounts(), getMonthlyActivity()]);

  const cards = [
    { label: "Yeni Teklif Talebi", value: counts.newQuotes, href: "/yonetim/teklifler", icon: FileText },
    { label: "Yeni Ön Sipariş", value: counts.newPreorders, href: "/yonetim/on-siparisler", icon: PackageSearch },
    { label: "Onay Bekleyen Yorum", value: counts.pendingComments, href: "/yonetim/yorumlar", icon: MessageSquare },
    { label: "Toplam Teklif (tüm zamanlar)", value: counts.totalQuotes, href: "/yonetim/teklifler", icon: ClipboardList },
    { label: "Tamamlanan İş", value: counts.completedJobs, href: "/yonetim/teklifler", icon: CheckCircle2 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-metal">Panel</h1>
      <p className="mt-1 text-sm text-metalDim">Sitenizdeki güncel talepleri ve genel durumu buradan takip edin.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="spec-card rounded-sm p-6 transition hover:-translate-y-1">
            <c.icon className="text-spark" size={22} />
            <p className="mt-4 font-display text-3xl font-bold text-metal">{c.value}</p>
            <p className="mt-1 text-sm text-metalDim">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="spec-card mt-8 rounded-sm p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
          Son 6 Ay — Teklif & Ön Sipariş Sayısı
        </h2>
        <div className="mt-6">
          <MonthlyChart data={monthly} />
        </div>
      </div>
    </div>
  );
}
