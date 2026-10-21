import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const evidence = "artifacts/portfolio-bulb-refinement-2026-10-21";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const results = [];
async function check(name, run) {
  try {
    await run();
    results.push({ name, pass: true });
  } catch (error) {
    results.push({ name, pass: false, error: error.message });
  }
  console.log(
    `${results.at(-1).pass ? "PASS" : "FAIL"} ${name}${results.at(-1).error ? ": " + results.at(-1).error.split("\n")[0] : ""}`,
  );
}
async function raysState(button) {
  return button.locator("img").evaluate((image) => {
    const style = getComputedStyle(image);
    const matrix = new DOMMatrix(style.transform);
    const properties = style.transitionProperty.split(", ");
    const durations = style.transitionDuration.split(", ");
    const transformIndex = properties.indexOf("transform");
    return {
      angle: (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI,
      scale: Math.hypot(matrix.a, matrix.b),
      duration: durations[transformIndex] ?? durations[0],
      property: properties[transformIndex] ?? properties[0],
    };
  });
}
async function checkRays(button, active) {
  await expect
    .poll(
      async () => {
        const { angle, scale } = await raysState(button);
        return (
          Math.abs(angle - (active ? 45 : 0)) < 0.1 &&
          Math.abs(scale - (active ? 1.1 : 1)) < 0.001
        );
      },
      { timeout: 1800 },
    )
    .toBe(true);
}
try {
  for (const theme of ["dark", "light"]) {
    for (const width of [1440, 320]) {
      await check(
        `Bare rays, hover/focus tooltip, and toggle at ${width}px, ${theme}`,
        async () => {
          const context = await browser.newContext({
            viewport: { width, height: 900 },
            reducedMotion: "no-preference",
          });
          try {
            await context.addInitScript(
              (value) => localStorage.setItem("v6-theme", value),
              theme,
            );
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (error) => errors.push(error.message));
            await page.goto(base, { waitUntil: "networkidle" });
            await expect(page.locator("html")).toHaveAttribute(
              "data-motion",
              "full",
            );
            const button = page.getByRole("button", {
              name: "Toggle dark mode",
              exact: true,
            });
            await button.scrollIntoViewIfNeeded();
            await page.mouse.move(0, 0);
            const metrics = await button.evaluate((element) => {
              const box = element.getBoundingClientRect();
              const image = element.querySelector("img");
              const style = getComputedStyle(element);
              const frame = element
                .closest(".about-portrait-frame")
                .getBoundingClientRect();
              return {
                width: box.width,
                height: box.height,
                rays: image.getBoundingClientRect().width,
                border: style.borderTopWidth,
                background: style.backgroundColor,
                shadow: style.boxShadow,
                cursor: style.cursor,
                left: box.left - frame.left,
                top: box.top - frame.top,
              };
            });
            assert.ok(metrics.width >= 40 && metrics.height >= 40);
            assert.ok(metrics.rays <= 24 && metrics.rays < metrics.width);
            assert.equal(metrics.border, "0px");
            assert.equal(metrics.background, "rgba(0, 0, 0, 0)");
            assert.equal(metrics.shadow, "none");
            assert.equal(metrics.cursor, "pointer");
            assert.ok(
              metrics.left >= 8 &&
                metrics.left <= 28 &&
                metrics.top >= 8 &&
                metrics.top <= 28,
            );
            assert.equal(
              await button.getAttribute("title"),
              null,
              "Avoid a duplicate native tooltip",
            );
            const tip = page.locator(".portrait-theme-tooltip");
            await expect(tip).toBeHidden();
            await checkRays(button, false);
            assert.equal((await raysState(button)).duration, "0.25s");
            assert.equal((await raysState(button)).property, "transform");
            if (phase === "final" && width === 1440)
              await page
                .locator(".about-image")
                .screenshot({ path: `${evidence}/default-${theme}.png` });
            await button.hover();
            await checkRays(button, true);
            await expect(tip).toBeVisible();
            await expect(page.getByRole("tooltip")).toHaveText(
              "Switch appearance",
            );
            const tooltipId = await page
              .getByRole("tooltip")
              .getAttribute("id");
            assert.ok(tooltipId);
            await expect(button).toHaveAttribute("aria-describedby", tooltipId);
            const bounds = await tip.boundingBox();
            assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width);
            assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= 900);
            await tip.hover();
            await expect(tip).toBeVisible();
            await page.keyboard.press("Escape");
            await expect(tip).toBeHidden();
            await page.mouse.move(0, 0);
            await page.locator("#about").focus();
            await page.keyboard.press("Tab");
            await expect(button).toBeFocused();
            await checkRays(button, true);
            await expect(tip).toBeVisible();
            const focus = await button.evaluate(
              (element) => getComputedStyle(element).outlineStyle,
            );
            assert.notEqual(focus, "none");
            if (phase === "final" && width === 1440)
              await page.screenshot({
                path: `${evidence}/focus-${theme}.png`,
                clip: await page.locator(".about-portrait-frame").boundingBox(),
              });
            await page.keyboard.press("Escape");
            await expect(tip).toBeHidden();
            await expect(button).toBeFocused();
            await page.keyboard.press("Enter");
            const next = theme === "dark" ? "light" : "dark";
            await expect(page.locator("html")).toHaveAttribute(
              "data-theme",
              next,
            );
            await expect(page.locator(".about-portrait-frame")).toHaveAttribute(
              "data-portrait",
              next === "light" ? "black" : "white",
            );
            await expect(button).toHaveAttribute(
              "aria-pressed",
              String(next === "dark"),
            );
            await page.keyboard.press("Space");
            await expect(page.locator("html")).toHaveAttribute(
              "data-theme",
              theme,
            );
            await page.keyboard.press("Tab");
            await checkRays(button, false);
            await expect(tip).toBeHidden();
            assert.deepEqual(errors, []);
          } finally {
            await context.close();
          }
        },
      );
    }
  }
  await check(
    "Reduced motion and saved pause remove the transition without disabling the control",
    async () => {
      for (const reduced of [true, false]) {
        const context = await browser.newContext({
          reducedMotion: reduced ? "reduce" : "no-preference",
        });
        try {
          if (!reduced)
            await context.addInitScript(() =>
              localStorage.setItem("v6-motion-paused", "true"),
            );
          const page = await context.newPage();
          await page.goto(base, { waitUntil: "networkidle" });
          const button = page.getByRole("button", {
            name: "Toggle dark mode",
            exact: true,
          });
          await button.scrollIntoViewIfNeeded();
          await button.hover();
          await checkRays(button, true);
          assert.equal((await raysState(button)).duration, "0s");
          await expect(page.locator(".portrait-theme-tooltip")).toBeVisible();
          await button.click();
          await expect(page.locator("html")).toHaveAttribute(
            "data-theme",
            "light",
          );
          await expect(page.locator("html")).toHaveAttribute(
            "data-motion",
            "reduced",
          );
        } finally {
          await context.close();
        }
      }
    },
  );
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/${phase}-acceptance.json`,
    JSON.stringify(results, null, 2) + "\n",
  );
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
