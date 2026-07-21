import type { Metadata, Viewport } from "next";
import PwaRegister from "@/components/admin/PwaRegister";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#D8301F",
};

export default function YonetimLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PwaRegister />
      {children}
    </>
  );
}
