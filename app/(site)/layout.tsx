import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsappButton from "@/components/site/WhatsappButton";
import QuickQuotePopup from "@/components/site/QuickQuotePopup";
import CookieConsent from "@/components/site/CookieConsent";
import ChatWidget from "@/components/site/ChatWidget";
import { getSiteSettings, getHoursSettings, getServices } from "@/lib/data";
import { buildLocalBusinessSchema } from "@/lib/structuredData";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, hours, services] = await Promise.all([
    getSiteSettings(),
    getHoursSettings(),
    getServices(),
  ]);

  const schema = buildLocalBusinessSchema(settings, hours);

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar phone={settings.phone} />
      <main>{children}</main>
      <Footer settings={settings} hours={hours} />
      <WhatsappButton whatsapp={settings.whatsapp} />
      <QuickQuotePopup services={services} />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
