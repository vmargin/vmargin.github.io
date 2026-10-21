import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";
import sharp from "sharp";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const evidence =
  process.env.PORTFOLIO_EVIDENCE ||
  "artifacts/portfolio-portrait-split-2026-10-21";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const results = [];
const observations = [];
async function check(name, run) {
  try {
    await run();
    results.push({ name, pass: true });
  } catch (error) {
    results.push({ name, pass: false, error: error.message });
  }
  console.log(`${results.at(-1).pass ? "PASS" : "FAIL"} ${name}`);
}
async function verifyMapping(page, theme) {
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  const portrait = theme === "light" ? "black" : "white";
  const frame = page.locator(".about-portrait-frame");
  await frame.scrollIntoViewIfNeeded();
  await expect(frame).toHaveAttribute("data-portrait", portrait);
  await expect(
    frame.locator('.about-portrait-photo[data-portrait="white"]'),
  ).toHaveCSS("opacity", theme === "dark" ? "1" : "0");
  await expect(
    frame.locator('.about-portrait-photo[data-active="true"]'),
  ).toHaveAttribute(
    "src",
    portrait === "black"
      ? "/images/portraits/about-portrait.webp"
      : "/images/portraits/about-portrait-white.webp",
  );
  const toggle = page.getByRole("button", {
    name: "Toggle dark mode",
    exact: true,
  });
  await expect(toggle).toHaveAttribute(
    "aria-pressed",
    String(theme === "dark"),
  );
  const style = await toggle.evaluate((button) => ({
    color: getComputedStyle(button).color,
    filter: getComputedStyle(button.querySelector("img")).filter,
  }));
  assert.equal(
    style.color,
    theme === "light" ? "rgb(250, 250, 250)" : "rgb(9, 9, 11)",
  );
  assert.equal(
    style.filter,
    theme === "light" ? "brightness(0) invert(1)" : "brightness(0)",
  );
  await frame
    .locator('.about-portrait-photo[data-active="true"]')
    .evaluate((image) => image.decode());
  await expect(
    page.getByRole("button", {
      name: theme === "dark" ? "Dark theme" : "Light theme",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
}
try {
  await check(
    "Bulb keyboard control switches portrait, theme, and color together",
    async () => {
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(base, { waitUntil: "networkidle" });
      const button = page.getByRole("button", {
        name: "Toggle dark mode",
        exact: true,
      });
      await expect(button).toBeVisible({ timeout: 1500 });
      await verifyMapping(page, "dark");
      await button.scrollIntoViewIfNeeded();
      // Reach it with native Tab navigation, then use both native activation keys.
      await page.locator("#about").focus();
      await page.keyboard.press("Tab");
      await expect(button).toBeFocused();
      for (const [key, theme] of [
        ["Enter", "light"],
        ["Space", "dark"],
      ]) {
        await page.keyboard.press(key);
        await verifyMapping(page, theme);
        await expect(button).toBeFocused();
        const geometry = await button.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const frame = element.parentElement.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            width: box.width,
            height: box.height,
            left: box.left - frame.left,
            top: box.top - frame.top,
            outline: style.outlineStyle,
            outlineWidth: parseFloat(style.outlineWidth),
            outlineColor: style.outlineColor,
            background: style.backgroundColor,
          };
        });
        assert.ok(geometry.width >= 44 && geometry.height >= 44);
        assert.ok(
          geometry.left >= 8 &&
            geometry.left <= 28 &&
            geometry.top >= 8 &&
            geometry.top <= 28,
        );
        assert.notEqual(geometry.outline, "none");
        assert.ok(geometry.outlineWidth >= 2);
        const channels = (value) => value.match(/[\d.]+/g).map(Number);
        const foreground = channels(geometry.outlineColor).slice(0, 3);
        // Sample the real portrait behind the now-transparent control.
        const { data: pixels, info } = await sharp(await button.screenshot())
          .removeAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        const backgrounds = [
          [1, 1],
          [info.width - 2, 1],
          [1, info.height - 2],
          [info.width - 2, info.height - 2],
        ].map(([x, y]) => [
          ...pixels.subarray(
            (y * info.width + x) * info.channels,
            (y * info.width + x) * info.channels + 3,
          ),
        ]);
        const luminance = (rgb) =>
          rgb
            .map((channel) => {
              const value = channel / 255;
              return value <= 0.04045
                ? value / 12.92
                : ((value + 0.055) / 1.055) ** 2.4;
            })
            .reduce(
              (sum, value, index) =>
                sum + value * [0.2126, 0.7152, 0.0722][index],
              0,
            );
        const ratios = backgrounds.map((background) => {
          const values = [luminance(foreground), luminance(background)].sort(
            (a, b) => b - a,
          );
          return (values[0] + 0.05) / (values[1] + 0.05);
        });
        assert.ok(Math.min(...ratios) >= 4.5, `Control contrast: ${ratios}`);
        geometry.minimumContrast = Math.min(...ratios);
        geometry.sampledBackgrounds = backgrounds;
        observations.push({ type: "keyboard", theme, ...geometry });
        if (phase === "final")
          await page
            .locator(".about-image")
            .screenshot({ path: `${evidence}/about-keyboard-${theme}.png` });
      }
      assert.deepEqual(errors, []);
      await page.close();
    },
  );
  await check(
    "Header controls and saved preferences synchronize the portrait",
    async () => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(base);
      await page
        .getByRole("button", { name: "Light theme", exact: true })
        .click();
      await verifyMapping(page, "light");
      await page.reload({ waitUntil: "networkidle" });
      await verifyMapping(page, "light");
      await page
        .getByRole("button", { name: "Toggle dark mode", exact: true })
        .click();
      await verifyMapping(page, "dark");
      await page.goto(base + "/projects/arctic/");
      await expect(
        page.getByRole("button", { name: "Dark theme", exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
      await page
        .getByRole("button", { name: "Light theme", exact: true })
        .click();
      await page.goto(base);
      await verifyMapping(page, "light");
      await context.close();
    },
  );
  await check(
    "Bulb works on mobile with reduced motion and saved pause",
    async () => {
      for (const reduced of [false, true]) {
        const context = await browser.newContext({
          viewport: { width: 320, height: 844 },
          hasTouch: true,
          isMobile: true,
          reducedMotion: reduced ? "reduce" : "no-preference",
        });
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
        await expect(button).toBeVisible({ timeout: 1500 });
        await button.scrollIntoViewIfNeeded();
        await button.tap();
        await verifyMapping(page, "light");
        await expect(page.locator("html")).toHaveAttribute(
          "data-motion",
          "reduced",
        );
        await context.close();
      }
    },
  );
  await check(
    "Editorial landscape splits on desktop and stacks without cropping on mobile",
    async () => {
      for (const theme of ["dark", "light"]) {
        const context = await browser.newContext({ reducedMotion: "reduce" });
        await context.addInitScript(
          (value) => localStorage.setItem("v6-theme", value),
          theme,
        );
        const page = await context.newPage();
        await page.goto(base, { waitUntil: "networkidle" });
        for (const width of [1920, 1440, 1024, 768, 390, 320]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.locator("#contact").scrollIntoViewIfNeeded();
          await page.locator(".contact-photo").scrollIntoViewIfNeeded();
          const geometry = await page
            .locator("#contact")
            .evaluate(async (section) => {
              await document.fonts.ready;
              const image = section.querySelector(".contact-photo");
              await image.decode();
              const rect = (element) => {
                const box = element.getBoundingClientRect();
                return {
                  left: box.left,
                  top: box.top,
                  right: box.right,
                  bottom: box.bottom,
                  width: box.width,
                  height: box.height,
                };
              };
              return {
                section: rect(section),
                image: rect(image),
                content: rect(section.querySelector(".contact-content")),
                source: image.currentSrc,
                ratio: image.naturalWidth / image.naturalHeight,
                documentWidth: document.documentElement.scrollWidth,
                photoPainted:
                  document.elementFromPoint(
                    image.getBoundingClientRect().left +
                      image.getBoundingClientRect().width / 2,
                    image.getBoundingClientRect().top +
                      image.getBoundingClientRect().height / 2,
                  ) === image,
              };
            });
          assert.match(geometry.source, /contact-landscape/);
          assert.ok(
            geometry.photoPainted,
            "The photograph must paint above its panel background",
          );
          assert.ok(geometry.section.width <= 1350.5);
          assert.ok(
            Math.abs(geometry.section.left - (width - geometry.section.right)) <
              2,
          );
          assert.ok(
            Math.abs(
              geometry.image.width / geometry.image.height - geometry.ratio,
            ) < 0.01,
          );
          assert.ok(geometry.documentWidth <= width);
          if (width >= 1024) {
            assert.ok(
              geometry.image.right <= geometry.content.left + 1,
              JSON.stringify(geometry),
            );
            assert.ok(
              geometry.image.top < geometry.content.bottom &&
                geometry.content.top < geometry.image.bottom,
              "Photo and contact must share a row",
            );
          } else
            assert.ok(
              geometry.image.bottom <= geometry.content.top + 1,
              "Photo precedes contact on mobile",
            );
          await expect(
            page.locator("#contact").getByRole("link", {
              name: "Email me about a role",
              exact: true,
            }),
          ).toHaveAttribute("href", "mailto:marginvalkenburgh@gmail.com");
          await expect(
            page
              .locator("#contact")
              .getByRole("link", { name: "View Resume", exact: true }),
          ).toHaveAttribute("href", "/documents/valkenburgh-margin-resume.pdf");
          observations.push({ type: "layout", width, theme, ...geometry });
          if (phase === "final" && [1440, 390, 320].includes(width))
            await page.locator("#contact").screenshot({
              path: `${evidence}/contact-${width}-${theme}.png`,
            });
        }
        await context.close();
      }
    },
  );
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/${phase}-acceptance.json`,
    JSON.stringify({ results, observations }, null, 2) + "\n",
  );
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
