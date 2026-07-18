"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Images,
  FileText,
  PackageSearch,
  MessageSquare,
  Settings,
  LogOut,
  GalleryHorizontal,
  HelpCircle,
  Newspaper,
} from "lucide-react";
import { adminLogout } from "@/lib/actions/auth";

const items = [
  { href: "/yonetim", label: "Panel", icon: LayoutDashboard },
  { href: "/yonetim/hizmetler", label: "Hizmetler", icon: Wrench },
  { href: "/yonetim/referanslar", label: "Referanslar", icon: Images },
  { href: "/yonetim/galeri", label: "Galeri", icon: GalleryHorizontal },
  { href: "/yonetim/blog", label: "Blog", icon: Newspaper },
  { href: "/yonetim/sss", label: "SSS", icon: HelpCircle },
  { href: "/yonetim/teklifler", label: "Teklif Talepleri", icon: FileText },
  { href: "/yonetim/on-siparisler", label: "Ön Siparişler", icon: PackageSearch },
  { href: "/yonetim/yorumlar", label: "Yorumlar", icon: MessageSquare },
  { href: "/yonetim/ayarlar", label: "Site Ayarları", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-steel2 bg-steel">
      <div className="border-b border-steel2 px-6 py-5">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-metal">
          <span className="text-spark">HT</span> Yönetim
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition ${
                active ? "bg-graphite text-spark" : "text-metalDim hover:bg-graphite hover:text-metal"
              }`}
            >
              <item.icon size={17} /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-steel2 p-3">
        <button
          onClick={() =>
            adminLogout().then(() => {
              router.push("/yonetim/giris");
              router.refresh();
            })
          }
          className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim transition hover:bg-graphite hover:text-spark"
        >
          <LogOut size={17} /> Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
