import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsappButton from "@/components/site/WhatsappButton";
import QuickQuotePopup from "@/components/site/QuickQuotePopup";
import { getSiteSettings, getHoursSettings, getServices } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, hours, services] = await Promise.all([
    getSiteSettings(),
    getHoursSettings(),
    getServices(),
  ]);

  return (
    <>
      <Navbar phone={settings.phone} />
      <main>{children}</main>
      <Footer settings={settings} hours={hours} />
      <WhatsappButton whatsapp={settings.whatsapp} />
      <QuickQuotePopup services={services} />
    </>
  );
}
