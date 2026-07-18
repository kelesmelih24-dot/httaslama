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
          <stop offset="0%" stopColor="#D8301F" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#FF6B3A" stopOpacity="1" />
          <stop offset="100%" stopColor="#D8301F" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Zemin çerçeve */}
      <rect x="0.5" y="0.5" width="559" height="459" rx="4" fill="#FAFAFA" stroke="#E0E0E0" />

      {/* Merkez silindirik parça (üstten görünüm çemberleri + kesit) */}
      <g transform="translate(280,190)">
        <circle r="120" fill="none" stroke="#DADADA" strokeWidth="1" />
        <circle r="86" fill="none" stroke="#C2C2C2" strokeWidth="1" strokeDasharray="2 4" />
        <circle r="52" fill="#EFEFEF" stroke="#4A4A4A" strokeWidth="1.5" />
        <circle r="14" fill="#FFFFFF" stroke="#D8301F" strokeWidth="2" />

        {/* Taşlama diski temas noktası */}
        <g transform="rotate(-28)">
          <rect x="118" y="-10" width="70" height="20" rx="2" fill="#E5E5E5" stroke="#4A4A4A" />
          <rect x="112" y="-14" width="10" height="28" rx="2" fill="#4A4A4A" />
        </g>
      </g>

      {/* Kıvılcım animasyonu - taşlama temas noktasından, çok yönlü parlama */}
      <g transform="translate(280,190) rotate(-28)">
        <circle cx="95" cy="0" r="5" fill="#FF6B3A" opacity="0.9">
          <animate attributeName="r" values="4;9;4" dur="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="0.7s" repeatCount="indefinite" />
        </circle>

        <g transform="rotate(0 95 0)">
          <rect x="92" y="-2.5" width="42" height="5" rx="2.5" fill="url(#sparkGrad)" className="animate-spark" />
        </g>
        <g transform="rotate(20 95 0)">
          <rect x="92" y="-2" width="32" height="4" rx="2" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "0.3s" }} />
        </g>
        <g transform="rotate(-24 95 0)">
          <rect x="92" y="-1.75" width="28" height="3.5" rx="1.75" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "0.6s" }} />
        </g>
        <g transform="rotate(40 95 0)">
          <rect x="92" y="-1.5" width="22" height="3" rx="1.5" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "0.9s" }} />
        </g>
        <g transform="rotate(-42 95 0)">
          <rect x="92" y="-1.5" width="20" height="3" rx="1.5" fill="url(#sparkGrad)" className="animate-spark" style={{ animationDelay: "1.2s" }} />
        </g>
      </g>

      {/* Ölçü çizgisi - çap */}
      <g stroke="#4A4A4A" strokeWidth="1">
        <line x1="160" y1="360" x2="400" y2="360" />
        <line x1="160" y1="352" x2="160" y2="368" />
        <line x1="400" y1="352" x2="400" y2="368" />
      </g>
      <text x="280" y="384" textAnchor="middle" fill="#111111" fontFamily="var(--font-mono)" fontSize="14">
        ⌀ 45.000 ±0.005 mm
      </text>

      {/* Sol üst etiket */}
      <text x="24" y="36" fill="#6B6B6B" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.05em">
        DETAY A — SİLİNDİRİK YÜZEY
      </text>
      <text x="24" y="52" fill="#D8301F" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.05em">
        ÖLÇEK 2:1
      </text>
    </svg>
  );
}
