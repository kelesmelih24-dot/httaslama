/**
 * HT Makina Taşlama gerçek logosu (kartvizitten alınan amblem,
 * arka planı şeffaflaştırılmış PNG olarak /public/logo-icon.png içinde).
 *
 * Logo değişirse: yeni dosyayı aynı isimle (logo-icon.png) public/ klasörüne
 * koymanız yeterli, kodda başka bir değişiklik gerekmez.
 */
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-icon.png"
      alt="HT Makina Taşlama amblemi"
      className={`${className} object-contain`}
    />
  );
}
