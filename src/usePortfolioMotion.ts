import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/** One owner for decorative motion; semantic navigation never depends on it. */
export function usePortfolioMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  overlayOpen: boolean,
) {
  useEffect(() => {
    if (!root.current || !enabled) return;
    const scope = root.current;
    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        stagger: 0.11,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: group, start: "top 92%", once: true },
        });
      });
      gsap.from(".about-image", {
        clipPath: "inset(0 100% 0 0 round 14px)",
        duration: 1.35,
        ease: "power3.inOut",
        clearProps: "clipPath",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 90%",
          once: true,
        },
      });
      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 85%",
            end: "bottom 48%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        ".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        },
      );
      gsap.utils
        .toArray<HTMLElement>(".process-step, .milestone")
        .forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 78%",
            toggleClass: "is-active",
          });
        });
      media.add(
        "(min-width: 768px) and (hover: hover) and (pointer: fine)",
        () => {
          gsap.to(".hero-photo", {
            yPercent: 12,
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
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: "#contact",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
          const cleanups: (() => void)[] = [];
          scope
            .querySelectorAll<HTMLElement>("[data-magnetic]")
            .forEach((el) => {
              const xTo = gsap.quickTo(el, "x", {
                duration: 0.4,
                ease: "power3.out",
              });
              const yTo = gsap.quickTo(el, "y", {
                duration: 0.4,
                ease: "power3.out",
              });
              const move = (e: PointerEvent) => {
                const bounds = el.getBoundingClientRect();
                xTo((e.clientX - bounds.left - bounds.width / 2) * 0.11);
                yTo((e.clientY - bounds.top - bounds.height / 2) * 0.15);
              };
              const reset = () => {
                xTo(0);
                yTo(0);
              };
              el.addEventListener("pointermove", move);
              el.addEventListener("pointerleave", reset);
              el.addEventListener("blur", reset);
              cleanups.push(() => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", reset);
                el.removeEventListener("blur", reset);
                xTo.tween.kill();
                yTo.tween.kill();
                gsap.set(el, { clearProps: "transform" });
              });
            });
          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
    }, scope);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      ctx.revert();
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
