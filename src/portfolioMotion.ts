export function startMotion(scope: HTMLElement) {
  const animations = new Set<Animation>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const animation = entry.target.animate(
          [
            { opacity: 0.5, transform: "translateY(12px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 360, easing: "cubic-bezier(.2,.8,.2,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    },
    { threshold: 0.05 },
  );
  scope
    .querySelectorAll("[data-reveal]")
    .forEach((element) => observer.observe(element));
  return () => {
    observer.disconnect();
    animations.forEach((animation) => animation.cancel());
  };
}
