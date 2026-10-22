const playedScopes = new WeakMap<HTMLElement, WeakSet<Element>>();

/** Every effect owns its cancellation and leaves the underlying layout intact. */
function createSession(scope: HTMLElement) {
  const animations = new Set<Animation>();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const easing = getComputedStyle(scope).getPropertyValue("--ease").trim();
  const allowed = () =>
    !document.hidden &&
    !reduced.matches &&
    document.documentElement.dataset.motion === "full";
  const cancel = () => {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  };
  const sync = () => {
    if (!allowed()) cancel();
  };
  const preferences = new MutationObserver(sync);
  preferences.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  return {
    allowed,
    play(
      element: Element,
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
    ) {
      if (!allowed()) return;
      const animation = element.animate(frames, {
        easing,
        fill: "backwards",
        ...options,
      });
      animations.add(animation);
      animation.onfinish = () => {
        animations.delete(animation);
        animation.cancel();
      };
    },
    dispose() {
      cancel();
      preferences.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    },
  };
}

export function startMotion(scope: HTMLElement, allowEntrance: boolean) {
  const session = createSession(scope);
  let played = playedScopes.get(scope);
  if (!played) {
    played = new WeakSet<Element>();
    playedScopes.set(scope, played);
  }
  const seen = played;
  const pending = new Set<Element>();
  const reveal = (
    element: Element,
    frames: Keyframe[],
    duration: number,
    easing?: string,
  ) => {
    if (seen.has(element)) return;
    seen.add(element);
    session.play(element, frames, { duration, ...(easing ? { easing } : {}) });
  };
  const portrait = scope.querySelector(".hero-portrait");
  const observer = new IntersectionObserver(
    (entries) => {
      if (!session.allowed()) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target;
        observer.unobserve(element);
        pending.delete(element);
        if (element === portrait) {
          reveal(
            element,
            [
              { opacity: 0.8, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            560,
          );
        } else if (element.hasAttribute("data-stagger")) {
          if (seen.has(element)) continue;
          seen.add(element);
          Array.from(element.children).forEach((child, index) => {
            seen.add(child);
            session.play(
              child,
              [
                { opacity: 0.65, transform: "translateY(8px)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: 280, delay: Math.min(index * 45, 135) },
            );
          });
        } else {
          reveal(
            element,
            [
              { opacity: 0.5, transform: "translateY(12px)" },
              { opacity: 1, transform: "none" },
            ],
            360,
            "cubic-bezier(.2,.8,.2,1)",
          );
        }
      }
    },
    { threshold: 0.05 },
  );
  const observe = (element: Element) => {
    if (seen.has(element)) return;
    pending.add(element);
    observer.observe(element);
  };
  const hero = scope.querySelector(".hero");
  if (hero && !seen.has(hero)) {
    seen.add(hero);
    if (allowEntrance && !location.hash && scrollY < 80) {
      scope
        .querySelectorAll(".hero-name-first, .hero-name-last")
        .forEach((line, index) => {
          // Generous negative insets preserve the serif overhang and descenders.
          session.play(
            line,
            [
              {
                opacity: 0.65,
                transform: "translateY(12px)",
                clipPath: "inset(-35% -15% 18% -15%)",
              },
              {
                opacity: 1,
                transform: "none",
                clipPath: "inset(-35% -15% -35% -15%)",
              },
            ],
            { duration: 520, delay: index * 50 },
          );
        });
      scope
        .querySelectorAll(
          ".hero-content > .eyebrow, .hero-role, .hero-description, .hero-availability, .hero-content > .button-row",
        )
        .forEach((element, index) => {
          session.play(
            element,
            [
              { opacity: 0.7, transform: "translateY(6px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 360, delay: Math.min(index * 40, 160) },
          );
        });
      if (portrait) {
        const bounds = portrait.getBoundingClientRect();
        if (bounds.top < innerHeight && bounds.bottom > 0) {
          seen.add(portrait);
          session.play(
            portrait,
            [
              { opacity: 0.8, transform: "translateY(10px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 560, delay: 80 },
          );
        } else observe(portrait);
      }
    } else if (portrait) seen.add(portrait);
  } else if (portrait && !seen.has(portrait)) observe(portrait);
  scope.querySelectorAll("[data-reveal], [data-stagger]").forEach(observe);
  const visibility = () => {
    observer.disconnect();
    if (!document.hidden)
      pending.forEach((element) => observer.observe(element));
  };
  document.addEventListener("visibilitychange", visibility);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    session.dispose();
  };
}

export function startEntry(scope: HTMLElement, kind: "toolkit" | "preview") {
  const session = createSession(scope);
  if (kind === "toolkit") {
    const panel = scope.querySelector('.toolkit-panel[data-state="active"]');
    if (panel)
      session.play(
        panel,
        [
          { opacity: 0.75, transform: "translateY(4px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 180 },
      );
  } else {
    session.play(
      scope,
      [
        { opacity: 0.7, transform: "scale(0.985)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 200 },
    );
    session.play(scope, [{ opacity: 0 }, { opacity: 1 }], {
      duration: 160,
      pseudoElement: "::backdrop",
    });
  }
  return () => session.dispose();
}
