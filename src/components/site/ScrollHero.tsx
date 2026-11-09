import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import introAsset from "@/assets/wellness-intro.jpg.asset.json";
import { images, objects } from "@/content/site";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * Intro begins as an edge-to-edge wellness photograph. Native scrolling advances
 * a sticky assembly sequence into the established blue brand composition.
 * No scroll interception. Keyboard and reduced-motion users can skip the intro.
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
      const complete = clamp((scroll - 0.12) / 0.68);
      const intro = clamp(1 - scroll / 0.48);
      const reduced = mq.matches;
      root.style.setProperty("--intro-visibility", String(reduced ? 0 : intro));
      root.style.setProperty("--assembled-visibility", String(reduced ? 1 : complete));
      root.style.setProperty("--assembled-offset", String(reduced ? 0 : Math.round((1 - complete) * 90)) + "px");
      root.style.setProperty("--object-offset", String(reduced ? 0 : Math.round((1 - complete) * 155)) + "px");
      root.style.setProperty("--portrait-scale", String(reduced ? 1 : 0.8 + complete * 0.2));
      root.style.setProperty("--scroll-cue-opacity", String(reduced ? 0 : clamp(1 - scroll * 5)));
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

  const skip = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      block: "start",
    });
  };

  return (
    <section ref={section} className="scroll-hero relative h-[195svh] min-h-[1100px] md:h-[215svh]" data-nav="dark" aria-label="Kalahari Pharmacy introduction">
      <div className="sticky top-0 h-[100svh] min-h-[540px] overflow-hidden bg-hero">
        <div className="hero-intro absolute inset-0" aria-hidden="true">
          <img src={introAsset.url} alt="" className="h-full w-full object-cover object-center" fetchPriority="high" />
          <div className="absolute inset-0 bg-ink/20" />
        </div>
        <div className="hero-assembled absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-hero px-5 text-center text-paper md:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-[65vw] w-[65vw] rounded-full bg-hero-deep/20" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[55vw] w-[55vw] rounded-full bg-ice/10" />
          <img src={images.hero} alt="" aria-hidden="true" width={900} height={1100}
            className="hero-person absolute left-1/2 top-[47%] z-10 h-[48vh] max-h-[500px] w-[min(44vw,330px)] rounded-t-full rounded-b-3xl object-cover shadow-[var(--shadow-float)] md:top-[46%] md:h-[65vh] md:w-[min(28vw,390px)]" />
          <img src={objects.jar} alt="" aria-hidden="true" width={816} height={816}
            className="hero-object hero-object-left pointer-events-none absolute bottom-[14%] left-[1%] z-20 w-[25vw] max-w-[235px] md:bottom-[19%] md:left-[10%]" />
          <img src={objects.pump} alt="" aria-hidden="true" width={816} height={816}
            className="hero-object hero-object-right pointer-events-none absolute right-[1%] top-[16%] z-20 w-[24vw] max-w-[230px] md:right-[11%] md:top-[21%]" />
          <div className="hero-copy relative z-30 w-full">
            <p className="mb-6 text-sm font-semibold tracking-wide text-paper md:text-base">Kalahari Pharmacy · Windhoek</p>
            <h1 className="display mx-auto max-w-[13ch] text-[clamp(3.3rem,10vw,10rem)] leading-[0.9] text-paper [text-shadow:0_3px_18px_rgba(0,0,0,0.23)]">
              Care that<br />feels closer.
            </h1>
          </div>
          <div className="hero-copy absolute bottom-[10%] z-30 flex flex-col items-center gap-4 px-5 md:bottom-[11%]">
            <p className="max-w-md text-base leading-relaxed md:text-lg">Everyday essentials and a familiar place to ask.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/store" className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-base font-medium text-ink">Explore the store <ArrowRight className="size-4" /></Link>
              <Link to="/visit" className="inline-flex items-center gap-2 rounded-full border border-paper px-5 py-3 text-base font-medium text-paper">Find us</Link>
            </div>
          </div>
        </div>
        <div className="hero-scroll-cue pointer-events-none absolute inset-x-0 bottom-9 z-40 flex justify-center text-paper">
          <span className="flex items-center gap-2 rounded-full bg-ink/35 px-5 py-3 text-sm">Scroll to discover <ArrowDown className="size-4" /></span>
        </div>
        <button type="button" onClick={skip}
          className="absolute bottom-9 right-5 z-50 rounded-full bg-paper/90 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 md:right-10"
          aria-label="Skip the animated introduction and go to about Kalahari Pharmacy">Skip intro</button>
      </div>
    </section>
  );
}