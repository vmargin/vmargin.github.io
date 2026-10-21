import { useEffect, useState } from "react";
import { Moon, Pause, Play, Sun } from "lucide-react";

export type Theme = "dark" | "light";

export function useSitePreferences() {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      let nextTheme: Theme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      let nextPaused = document.documentElement.dataset.paused === "true";
      try {
        nextTheme =
          localStorage.getItem("v6-theme") === "light" ? "light" : "dark";
        nextPaused = localStorage.getItem("v6-motion-paused") === "true";
      } catch {
        /* Use the active visit preferences when storage is unavailable. */
      }
      setThemeState(nextTheme);
      setPaused(nextPaused);
      setReduced(media.matches);
      setReady(true);
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const motionEnabled = ready && !paused && !reduced;
  useEffect(() => {
    if (!ready) return;
    const html = document.documentElement;
    html.dataset.theme = theme;
    html.dataset.motion = motionEnabled ? "full" : "reduced";
    html.dataset.paused = String(paused);
    html.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#fafafa" : "#09090b");
  }, [theme, motionEnabled, paused, ready]);
  const setTheme = (next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem("v6-theme", next);
    } catch {
      /* Visit state stays active. */
    }
  };
  const toggleMotion = () => {
    setPaused(!paused);
    try {
      localStorage.setItem("v6-motion-paused", String(!paused));
    } catch {
      /* Visit state stays active. */
    }
  };
  return { theme, setTheme, paused, reduced, motionEnabled, toggleMotion };
}

export function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        className="theme-toggle-option"
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === "light"}
        onClick={() => onChange("light")}
      >
        <Sun size={16} aria-hidden="true" />
      </button>
      <button
        className="theme-toggle-option"
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => onChange("dark")}
      >
        <Moon size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

export function MotionControl({
  preferences,
}: {
  preferences: ReturnType<typeof useSitePreferences>;
}) {
  const { motionEnabled, paused, reduced, toggleMotion } = preferences;
  return (
    <button
      className="motion-control"
      type="button"
      onClick={toggleMotion}
      aria-pressed={!motionEnabled}
      disabled={reduced}
      aria-label={
        reduced
          ? "Reduced motion follows your system preference"
          : paused
            ? "Motion paused. Enable animations"
            : "Motion on. Pause animations"
      }
    >
      {motionEnabled ? (
        <Pause size={14} aria-hidden="true" />
      ) : (
        <Play size={14} aria-hidden="true" />
      )}
      {reduced ? "Reduced motion" : paused ? "Motion paused" : "Motion on"}
    </button>
  );
}
