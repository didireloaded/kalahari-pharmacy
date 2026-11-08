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

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll-linked parallax for [data-parallax="speed"] elements (translateY). Disabled on reduced motion and small screens. */
export function useParallax() {
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const small = window.innerWidth < 768;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || "0") * (small ? 0.4 : 1);
        const r = el.parentElement!.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        const scale = el.dataset.scale ? 1 + Math.max(0, Math.min(0.12, -center / 4000 + 0.06)) : 1;
        el.style.transform = `translate3d(0, ${(center * speed).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
}
