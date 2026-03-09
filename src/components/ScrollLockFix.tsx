"use client";

import { useEffect } from "react";

export function ScrollLockFix() {
  useEffect(() => {
    // Run immediately
    const resetStyles = () => {
      document.documentElement.style.overflow = "visible !important";
      document.documentElement.style.paddingRight = "0px !important";
      document.body.style.overflow = "visible !important";
      document.body.style.paddingRight = "0px !important";
      document.body.style.marginRight = "0px !important";
    };

    // Run immediately on mount
    resetStyles();

    // Watch for changes
    const observer = new MutationObserver(() => {
      resetStyles();
    });

    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ["data-scroll-locked", "style"]
    });

    // Also set an interval to keep resetting
    const interval = setInterval(resetStyles, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return null;
}
