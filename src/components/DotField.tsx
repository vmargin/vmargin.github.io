import { useEffect, useRef } from "react";
import type { Theme } from "./SitePreferences";

/** Original local pointer distortion. Frames stop when the field settles. */
export function DotField({
  enabled,
  theme,
}: {
  enabled: boolean;
  theme: Theme;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;
    let width = 0;
    let height = 0;
    let frame = 0;
    let strength = 0;
    let pointer = { x: -1000, y: -1000 };
    const draw = () => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      context.fillStyle =
        theme === "dark" ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.85)";
      for (let y = 18; y < height; y += 38) {
        for (let x = 18; x < width; x += 38) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const push = Math.max(0, 1 - distance / 170) * strength * 16;
          context.beginPath();
          context.arc(
            x + (dx / (distance || 1)) * push,
            y + (dy / (distance || 1)) * push,
            0.8,
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      }
      strength *= 0.88;
      if (strength > 0.015 && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * scale;
      element.height = height * scale;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      cancelAnimationFrame(frame);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse" || document.hidden) return;
      pointer = { x: event.clientX, y: event.clientY };
      strength = 1;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      strength = 0;
      if (!document.hidden) draw();
    };
    resize();
    window.addEventListener("resize", resize);
    if (enabled)
      window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [enabled, theme]);
  return (
    <div className="ambient-background" aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
