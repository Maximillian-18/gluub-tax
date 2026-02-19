"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollSpy(sectionIds: string[], threshold: number = 0.3) {
  const [activeId, setActiveId] = useState<string>("");
  const activeIdRef = useRef<string>("");

  // Keep ref in sync with state
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const validSectionIds = sectionIds.filter((id) => id && id.trim() !== "");
    if (validSectionIds.length === 0) return;

    // Get the pixel area of intersection for each element
    const getVisibleArea = (element: HTMLElement): number => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate visible portion
      const top = Math.max(0, rect.top);
      const bottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, bottom - top);
      
      return visibleHeight * rect.width;
    };

    const updateActiveSection = () => {
      let maxArea = 0;
      let bestId = "";

      // Find the section with the most visible area
      for (const id of validSectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const area = getVisibleArea(element);
        if (area > maxArea) {
          maxArea = area;
          bestId = id;
        }
      }

      // Only update if we have a valid section and it's different
      if (bestId && bestId !== activeIdRef.current) {
        setActiveId(bestId);
      }
    };

    // Use IntersectionObserver to detect when sections enter/exit viewport
    const observer = new IntersectionObserver(
      () => {
        // When any section visibility changes, recalculate
        updateActiveSection();
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // 0, 0.05, 0.1, ... 1
        rootMargin: "0px",
      }
    );

    // Observe all sections
    validSectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Also update on scroll for smooth updates
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle hash changes from sidebar clicks
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && validSectionIds.includes(hash)) {
        setActiveId(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Initial check
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [sectionIds]);

  return activeId;
}
