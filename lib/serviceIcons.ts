import {
  CircleDot,
  Disc,
  Layers,
  Brush,
  Cpu,
  Box,
  Target,
  RefreshCw,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Hizmet slug'ına göre temsili ikon eşleştirmesi.
 * Yeni bir hizmet eklediğinizde slug'ı burada tanımlı değilse
 * otomatik olarak varsayılan (Wrench) ikonu kullanılır.
 */
const iconMap: Record<string, LucideIcon> = {
  "delik-taslama": CircleDot,
  "silindirik-taslama": Disc,
  "satih-yuzey-taslama": Layers,
  "capak-alma-yuzey-temizleme": Brush,
  "cnc-taslama": Cpu,
  "kalip-taslama": Box,
  "hassas-taslama": Target,
  "parca-revizyonu": RefreshCw,
  "ozel-uretim-cozumleri": Sparkles,
};

export function getServiceIcon(slug: string): LucideIcon {
  return iconMap[slug] || Wrench;
}
