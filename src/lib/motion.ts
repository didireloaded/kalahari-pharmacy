import { useEffect, useRef } from "react";

/** Adds `is-in` to every [data-reveal] descendant when it enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [root, ...Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"))].filter((e) => e.hasAttribute("data-reveal"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Scroll-linked editorial parallax. Skip it on touch-size screens and with reduced motion. */
export function useParallax() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let frame = 0;

    const reset = () => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        element.style.removeProperty("transform");
      });
    };

    const tick = () => {
      frame = 0;
      if (motionQuery.matches || !desktopQuery.matches) return;
      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((element) => {
        const parent = element.parentElement;
        if (!parent) return;
        const bounds = parent.getBoundingClientRect();
        // Only update the sections close to the visible viewport.
        if (bounds.bottom < -150 || bounds.top > viewport + 150) return;
        const speed = Number(element.dataset.parallax || 0);
        if (!Number.isFinite(speed)) return;
        const center = bounds.top + bounds.height / 2 - viewport / 2;
        const scale = element.hasAttribute("data-scale")
          ? 1 + Math.max(0, Math.min(0.12, -center / 4000 + 0.06))
          : 1;
        element.style.transform = `translate3d(0, ${(center * speed).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      });
    };

    const update = () => {
      if (!frame && desktopQuery.matches && !motionQuery.matches) {
        frame = window.requestAnimationFrame(tick);
      }
    };
    const change = () => {
      if (motionQuery.matches || !desktopQuery.matches) reset();
      else update();
    };

    change();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", change);
    motionQuery.addEventListener("change", change);
    desktopQuery.addEventListener("change", change);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", change);
      motionQuery.removeEventListener("change", change);
      desktopQuery.removeEventListener("change", change);
      window.cancelAnimationFrame(frame);
      reset();
    };
  }, []);
}
