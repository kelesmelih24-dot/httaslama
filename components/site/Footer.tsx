import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { SiteSettings, HoursSettings } from "@/lib/types";
import Logo from "@/components/site/Logo";

export default function Footer({
  settings,
  hours,
}: {
  settings: SiteSettings;
  hours: HoursSettings;
}) {
  return (
    <footer className="border-t border-steel2 bg-steel">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 font-display text-lg font-bold tracking-wide text-metal">
            <Logo className="h-8 w-8 shrink-0" />
            <span><span className="text-spark">HT</span> <span className="text-metal">MAKİNA TAŞLAMA</span></span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-metalDim">
            HT Makina Taşlama ekibi ile hassas metal işlemede mikron toleransla çalışan
            taşlama atölyesi.
          </p>
          <div className="mt-5 space-y-1.5 text-sm text-metalDim">
            <p className="flex items-center gap-2"><Clock size={14} className="text-spark shrink-0" /> Pazartesi - Cumartesi: {hours.hafta_ici_cumartesi}</p>
            <p className="flex items-center gap-2 pl-[22px]">Pazar: {hours.pazar}</p>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
            Hizmetler
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-metalDim">
            <li><Link href="/hizmetler/delik-taslama" className="hover:text-spark">Delik Taşlama</Link></li>
            <li><Link href="/hizmetler/silindirik-taslama" className="hover:text-spark">Silindirik Taşlama</Link></li>
            <li><Link href="/hizmetler/satih-yuzey-taslama" className="hover:text-spark">Satıh Taşlama</Link></li>
            <li><Link href="/hizmetler/capak-alma-yuzey-temizleme" className="hover:text-spark">Çapak Alma</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
            Kurumsal
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-metalDim">
            <li><Link href="/hakkimizda" className="hover:text-spark">Hakkımızda</Link></li>
            <li><Link href="/galeri" className="hover:text-spark">Galeri</Link></li>
            <li><Link href="/referanslar" className="hover:text-spark">Referanslar</Link></li>
            <li><Link href="/blog" className="hover:text-spark">Blog</Link></li>
            <li><Link href="/sss" className="hover:text-spark">SSS</Link></li>
            <li><Link href="/on-siparis" className="hover:text-spark">Ön Sipariş</Link></li>
            <li><Link href="/gizlilik-politikasi" className="hover:text-spark">Gizlilik Politikası</Link></li>
            <li><Link href="/kullanim-sartlari" className="hover:text-spark">Kullanım Şartları</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-metal">
            İletişim
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-metalDim">
            <li className="flex items-center gap-2"><Phone size={15} className="text-spark shrink-0" /> {settings.phone}</li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-spark shrink-0" /> {settings.email}</li>
            <li className="flex items-center gap-2"><MapPin size={15} className="text-spark shrink-0" /> {settings.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-steel2 py-6 text-center text-xs text-metalDim">
        <p>© {new Date().getFullYear()} HT Makina Taşlama. Tüm hakları saklıdır.</p>
        <p className="mt-1.5">
          <a
            href="https://mksoftware.com.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-spark"
          >
            MK Software tarafından yapılmıştır — mksoftware.com.tr
          </a>
        </p>
      </div>
    </footer>
  );
}
