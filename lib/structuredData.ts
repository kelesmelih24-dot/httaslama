import type { SiteSettings, HoursSettings } from "@/lib/types";

function parseTimeRange(value: string): { opens: string; closes: string } | null {
  const match = value.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  if (!match) return null;
  return { opens: match[1], closes: match[2] };
}

export function buildLocalBusinessSchema(settings: SiteSettings, hours: HoursSettings) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.htmakinataslama.com";

  const openingHoursSpecification: any[] = [];

  const weekdayRange = parseTimeRange(hours.hafta_ici_cumartesi);
  if (weekdayRange) {
    openingHoursSpecification.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: weekdayRange.opens,
      closes: weekdayRange.closes,
    });
  }

  const sundayRange = parseTimeRange(hours.pazar);
  if (sundayRange) {
    openingHoursSpecification.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: sundayRange.opens,
      closes: sundayRange.closes,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HT Makina Taşlama",
    image: `${siteUrl}/og-image.png`,
    "@id": siteUrl,
    url: siteUrl,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Yenimahalle",
      addressRegion: "Ankara",
      postalCode: "06374",
      addressCountry: "TR",
    },
    areaServed: {
      "@type": "City",
      name: "Ankara",
    },
    priceRange: "$$",
    openingHoursSpecification,
  };
}
