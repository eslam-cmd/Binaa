"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker({ email = null }) {
  const pathname = usePathname();
  const lastTrackedRef = useRef("");

  useEffect(() => {
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId =
        "visitor_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("visitorId", visitorId);
    }

    // منع التكرار لنفس الصفحة
    const trackKey = `${visitorId}_${pathname}`;
    if (lastTrackedRef.current === trackKey) return;
    lastTrackedRef.current = trackKey;

    const trackVisit = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            visitorId,
            page: pathname || "/",
            email: email || null,
          }),
        });

        const data = await response.json();

        if (data.success && data.data?.isNew) {
          console.log("🆕 زائر جديد للموقع!");
        }
      } catch (error) {
        console.error("خطأ في تتبع الزائر:", error);
      }
    };

    const timeoutId = setTimeout(trackVisit, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, email]);

  return null;
}
