import type { Metadata, Viewport } from "next";
import PwaRegister from "@/components/admin/PwaRegister";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  title: "HT Yönetim",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HT Yönetim",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#D8301F",
};

export default function YonetimLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        // Sayfa React tarafından hidrate edilmeden ÖNCE çalışır; tarayıcı
        // yükleme sinyalini (beforeinstallprompt) erken gönderirse kaçırmamak için.
        dangerouslySetInnerHTML={{
          __html: `window.addEventListener('beforeinstallprompt', function(e){ e.preventDefault(); window.__deferredInstallPrompt = e; });`,
        }}
      />
      <PwaRegister />
      {children}
    </>
  );
}
