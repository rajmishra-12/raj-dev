"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      // Ultra-smooth iOS-like scroll physics
      duration: 1.6,
      easing: (t) => {
        // Custom cubic bezier approximation of iOS momentum curve
        // Starts fast, decelerates with a soft landing
        return 1 - Math.pow(1 - t, 4);
      },
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Sync with requestAnimationFrame for the smoothest possible rendering
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance to window for integration with other components
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      resizeObserver.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
