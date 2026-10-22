import { useEffect, useRef, type RefObject } from "react";

/** Motion code is loaded only after the visit's preferences permit it. */
export function useNativeMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current ??= performance.now();
    if (!enabled || !root.current) return;
    const scope = root.current;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("./portfolioMotion")
      .then(({ startMotion }) => {
        const firstPaint = performance.getEntriesByName(
          "first-contentful-paint",
        )[0]?.startTime;
        const initialTime =
          firstPaint ?? mountedAt.current ?? performance.now();
        if (!disposed)
          cleanup = startMotion(scope, performance.now() - initialTime < 900);
      })
      .catch(() => {
        /* Decorative enhancement failure leaves all content readable. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [root, enabled]);
}

/** Pointer transitions share the preference-gated, interruptible motion runtime. */
export function useNativeEntry(
  root: RefObject<HTMLElement | null>,
  enabled: boolean,
  kind: "toolkit" | "preview",
  revision = "",
) {
  const previous = useRef<{ scope: HTMLElement; revision: string } | null>(
    null,
  );
  useEffect(() => {
    if (!root.current) return;
    const scope = root.current;
    if (!enabled) {
      previous.current = { scope, revision };
      return;
    }
    if (
      previous.current?.scope === scope &&
      previous.current.revision === revision
    )
      return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("./portfolioMotion")
      .then(({ startEntry }) => {
        if (!disposed) {
          previous.current = { scope, revision };
          cleanup = startEntry(scope, kind);
        }
      })
      .catch(() => {
        /* The default panel and native dialog remain fully usable. */
      });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [root, enabled, kind, revision]);
}
