import { useState } from "react";
import { Tooltip } from "radix-ui";
import portfolio from "../data/portfolio.json";
import type { Theme } from "./SitePreferences";

export function AboutPortrait({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) {
  const portraitColor = theme === "light" ? "black" : "white";
  const portrait = portfolio.about.portraits[portraitColor];
  const bulb = portfolio.about.bulb;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  return (
    <figure className="about-image">
      <div className="about-portrait-frame" data-portrait={portraitColor}>
        <img
          className="about-portrait-photo"
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          alt={portrait.alt}
          loading="lazy"
          decoding="async"
        />
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root
            open={tooltipOpen || keyboardFocus}
            onOpenChange={setTooltipOpen}
          >
            <Tooltip.Trigger asChild>
              <button
                className="portrait-theme-toggle"
                type="button"
                aria-label="Toggle dark mode"
                aria-pressed={theme === "dark"}
                onFocus={(event) =>
                  setKeyboardFocus(
                    event.currentTarget.matches(":focus-visible"),
                  )
                }
                onBlur={() => setKeyboardFocus(false)}
                onPointerDown={() => setKeyboardFocus(false)}
                onClick={() =>
                  onThemeChange(theme === "dark" ? "light" : "dark")
                }
              >
                <img
                  src={bulb.src}
                  width={bulb.width}
                  height={bulb.height}
                  alt=""
                />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="portrait-theme-tooltip"
                side="right"
                sideOffset={8}
                collisionPadding={12}
                onEscapeKeyDown={() => setKeyboardFocus(false)}
              >
                Switch appearance
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
      <figcaption>
        <span>Learning with intention. Building with care.</span>
        <span>Valk</span>
      </figcaption>
    </figure>
  );
}
