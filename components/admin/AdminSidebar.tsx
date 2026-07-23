"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { adminLogout } from "@/lib/actions/auth";
import InstallAppButton from "@/components/admin/InstallAppButton";
import PushNotificationButton from "@/components/admin/PushNotificationButton";

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
  const [open, setOpen] = useState(false);

  function handleLogout() {
    adminLogout().then(() => {
      router.push("/yonetim/giris");
      router.refresh();
    });
  }

  return (
    <>
      {/* Mobil üst çubuk */}
      <div className="flex items-center justify-between border-b border-steel2 bg-steel px-4 py-3.5 lg:hidden">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-metal">
          <span className="text-spark">HT</span> Yönetim
        </p>
        <button
          onClick={() => setOpen(true)}
          aria-label="Menüyü aç"
          className="text-metal"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobilde arka plan karartma */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar: mobilde kayan panel, lg+ ekranda sabit */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] shrink-0 flex-col border-r border-steel2 bg-steel transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-steel2 px-6 py-5">
          <p className="font-display text-sm font-bold uppercase tracking-wide text-metal">
            <span className="text-spark">HT</span> Yönetim
          </p>
          <button onClick={() => setOpen(false)} aria-label="Menüyü kapat" className="text-metalDim lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
          <PushNotificationButton />
          <InstallAppButton />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-metalDim transition hover:bg-graphite hover:text-spark"
          >
            <LogOut size={17} /> Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}
