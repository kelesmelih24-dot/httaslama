import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-steel2 bg-steel">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="font-display text-lg font-bold tracking-wide text-metal">
            <span className="text-spark">HT</span> MAKİNA TAŞLAMA
          </div>
          <p className="mt-3 max-w-xs text-sm text-metalDim">
            Batuhan Usta ve ekibi ile hassas metal işlemede mikron toleransla çalışan
            taşlama atölyesi.
          </p>
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
            <li><Link href="/referanslar" className="hover:text-spark">Referanslar</Link></li>
            <li><Link href="/on-siparis" className="hover:text-spark">Ön Sipariş</Link></li>
            <li><Link href="/yorumlar" className="hover:text-spark">Yorumlar</Link></li>
            <li><Link href="/iletisim" className="hover:text-spark">İletişim</Link></li>
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
        © {new Date().getFullYear()} HT Makina Taşlama. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
