import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsappButton from "@/components/site/WhatsappButton";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar phone={settings.phone} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsappButton whatsapp={settings.whatsapp} />
    </>
  );
}
