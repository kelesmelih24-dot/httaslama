export default function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 560 460"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Silindirik parçanın taşlama işlemini gösteren teknik çizim"
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFA630" stopOpacity="1" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Zemin çerçeve */}
      <rect x="0.5" y="0.5" width="559" height="459" rx="4" fill="#1C1F23" stroke="#2E3339" />

      {/* Merkez silindirik parça (üstten görünüm çemberleri + kesit) */}
      <g transform="translate(280,190)">
        <circle r="120" fill="none" stroke="#2E3339" strokeWidth="1" />
        <circle r="86" fill="none" stroke="#3A4046" strokeWidth="1" strokeDasharray="2 4" />
        <circle r="52" fill="#23262B" stroke="#8A9096" strokeWidth="1.5" />
        <circle r="14" fill="#15171A" stroke="#FF5A1F" strokeWidth="2" />

        {/* Taşlama diski temas noktası */}
        <g transform="rotate(-28)">
          <rect x="118" y="-10" width="70" height="20" rx="2" fill="#2E3339" stroke="#8A9096" />
          <rect x="112" y="-14" width="10" height="28" rx="2" fill="#8A9096" />
        </g>
      </g>

      {/* Kıvılcım animasyonu - taşlama temas noktasından */}
      <g transform="translate(280,190) rotate(-28)">
        <rect x="90" y="-2" width="34" height="4" fill="url(#sparkGrad)" className="animate-spark" />
        <rect x="90" y="4" width="26" height="3" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "0.4s" }} />
        <rect x="90" y="-8" width="20" height="3" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "0.8s" }} />
      </g>

      {/* Ölçü çizgisi - çap */}
      <g stroke="#8A9096" strokeWidth="1">
        <line x1="160" y1="360" x2="400" y2="360" />
        <line x1="160" y1="352" x2="160" y2="368" />
        <line x1="400" y1="352" x2="400" y2="368" />
      </g>
      <text x="280" y="384" textAnchor="middle" fill="#C8CDD2" fontFamily="var(--font-mono)" fontSize="14">
        ⌀ 45.000 ±0.005 mm
      </text>

      {/* Sol üst etiket */}
      <text x="24" y="36" fill="#8A9096" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.05em">
        DETAY A — SİLİNDİRİK YÜZEY
      </text>
      <text x="24" y="52" fill="#FF5A1F" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.05em">
        ÖLÇEK 2:1
      </text>
    </svg>
  );
}
