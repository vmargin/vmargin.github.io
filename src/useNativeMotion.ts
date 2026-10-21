import { useEffect, type RefObject } from "react";

/** Motion code is loaded only after the visit's preferences permit it. */
export function useNativeMotion(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled || !root.current) return;
    const scope = root.current;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    import("./portfolioMotion")
      .then(({ startMotion }) => {
        if (!disposed) cleanup = startMotion(scope);
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
