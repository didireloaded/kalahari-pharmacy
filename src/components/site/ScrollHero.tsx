import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import introAsset from "@/assets/wellness-intro.jpg.asset.json";
import { images, objects } from "@/content/site";
import { ArrowRight } from "lucide-react";

/**
 * Intro begins as an edge-to-edge wellness photograph. Native scrolling advances
 * a sticky assembly sequence into the established blue brand composition.
 * No scroll interception. Keyboard users retain the global skip-to-content link.
 */
export function ScrollHero() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const tick = () => {
      frame = 0;
      const height = Math.max(1, root.offsetHeight - window.innerHeight);
      const scroll = clamp(-root.getBoundingClientRect().top / height);
      const reduced = mq.matches;
      // Reduced-motion users still see the original photo first, with a
      // direct switch to the assembled scene only after scrolling.
      const complete = reduced ? (scroll >= 0.08 ? 1 : 0) : clamp((scroll - 0.12) / 0.68);
      const intro = reduced ? (scroll < 0.08 ? 1 : 0) : clamp(1 - scroll / 0.48);
      const assembled = root.querySelector<HTMLElement>(".hero-assembled");
      if (assembled) {
        const hidden = complete < 0.25;
        assembled.inert = hidden;
        assembled.setAttribute("aria-hidden", String(hidden));
      }
      root.style.setProperty("--intro-visibility", String(intro));
      root.style.setProperty("--assembled-visibility", String(complete));
      root.style.setProperty("--assembled-offset", String(reduced ? 0 : Math.round((1 - complete) * 90)) + "px");
      root.style.setProperty("--object-offset", String(reduced ? 0 : Math.round((1 - complete) * 155)) + "px");
      root.style.setProperty("--portrait-scale", String(reduced ? 1 : 0.8 + complete * 0.2));
    };
    const update = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} className="scroll-hero relative h-[190svh] md:h-[205svh]" data-nav="dark" aria-label="Kalahari Pharmacy introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-hero">
        <div className="hero-intro absolute inset-0" aria-hidden="true">
          <img src={introAsset.url} alt="" width={1600} height={900} decoding="async" className="h-full w-full object-cover object-center" fetchPriority="high" />

        </div>
        <div inert aria-hidden="true" className="hero-assembled absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-hero px-5 text-center text-paper md:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-[65vw] w-[65vw] rounded-full bg-hero-deep/20" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[55vw] w-[55vw] rounded-full bg-ice/10" />
          <img src={images.hero} alt="" aria-hidden="true" loading="lazy" decoding="async" width={900} height={1100}
            className="hero-person absolute left-1/2 top-[47%] z-10 h-[48vh] max-h-[500px] w-[min(44vw,330px)] rounded-t-full rounded-b-3xl object-cover shadow-[var(--shadow-float)] md:top-[46%] md:h-[65vh] md:w-[min(28vw,390px)]" />
          <img src={objects.jar} alt="" aria-hidden="true" loading="lazy" decoding="async" width={816} height={816}
            className="hero-object hero-object-left pointer-events-none absolute bottom-[14%] left-[1%] z-20 w-[25vw] max-w-[235px] md:bottom-[19%] md:left-[10%]" />
          <img src={objects.pump} alt="" aria-hidden="true" loading="lazy" decoding="async" width={816} height={816}
            className="hero-object hero-object-right pointer-events-none absolute right-[1%] top-[16%] z-20 w-[24vw] max-w-[230px] md:right-[11%] md:top-[21%]" />
          <div className="hero-copy relative z-30 w-full">
            <p className="mb-6 text-sm font-semibold tracking-wide text-paper md:text-base">Kalahari Pharmacy · Windhoek</p>
            <h1 className="display mx-auto max-w-[13ch] text-[clamp(2.85rem,11vw,4.75rem)] leading-[0.94] md:text-[clamp(3.3rem,10vw,10rem)] md:leading-[0.9] text-paper [text-shadow:0_3px_18px_rgba(0,0,0,0.23)]">
              Care that<br />feels closer.
            </h1>
          </div>
          <div className="hero-copy absolute bottom-[10%] z-30 flex w-full flex-col items-center gap-3 px-4 md:bottom-[11%] md:gap-4 md:px-5">
            <p className="max-w-md text-base leading-relaxed md:text-lg">Everyday essentials and a familiar place to ask.</p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <Link to="/store" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 py-3 text-sm font-medium text-ink sm:px-5 sm:text-base">Explore the store <ArrowRight className="size-4" /></Link>
              <Link to="/visit" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-paper px-4 py-3 text-sm font-medium text-paper sm:px-5 sm:text-base">Find us</Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}