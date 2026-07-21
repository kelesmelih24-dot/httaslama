"use client";

import { useEffect } from "react";

export default function ClearBadgeOnView() {
  useEffect(() => {
    if ("clearAppBadge" in navigator) {
      (navigator as any).clearAppBadge().catch(() => {});
    }
  }, []);

  return null;
}
