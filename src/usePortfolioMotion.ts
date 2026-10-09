import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** Decorative motion has one owner. Every reading/navigation path also works without it. */
export function usePortfolioMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  overlayOpen: boolean,
) {
  useEffect(() => {
    if (!root.current || !enabled) return;
    const scope = root.current;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out", clearProps: "transform,opacity" },
      });
      intro
        .from(
          ".hero-photo",
          { scale: 1.06, duration: 1.5, clearProps: "scale" },
          0,
        )
        .from(
          ".hero-reveal",
          { y: 26, opacity: 0, duration: 0.85, stagger: 0.075 },
          0.1,
        );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: group, start: "top 94%", once: true },
        });
      });
      gsap.from(".about-image", {
        clipPath: "inset(0 100% 0 0 round 18px)",
        duration: 1.1,
        ease: "power3.inOut",
        clearProps: "clipPath",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 92%",
          once: true,
        },
      });
      media.add(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
        () => {
          gsap.to(".hero-photo", {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: "#home",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
          gsap.fromTo(
            ".contact-photo",
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: "#contact",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        },
      );
    }, scope);
    let disposed = false;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };
    // Font/image decoding and toolkit filters change section positions.
    const resize = new ResizeObserver(refresh);
    resize.observe(scope);
    document.fonts.ready.then(refresh);
    scope.addEventListener("load", refresh, true);
    return () => {
      disposed = true;
      resize.disconnect();
      cancelAnimationFrame(frame);
      scope.removeEventListener("load", refresh, true);
      media.revert();
      context.revert();
    };
  }, [root, enabled]);

  useEffect(() => {
    if (
      !enabled ||
      overlayOpen ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (seconds: number) => lenis.raf(seconds * 1000);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled, overlayOpen]);
}
