import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";
import sharp from "sharp";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5180";
const evidence =
  process.env.PORTFOLIO_EVIDENCE || "artifacts/portrait-polish-2026-10-22";
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
  console.log(JSON.stringify(results.at(-1)));
}
try {
  await check(
    "Cards preserve facts and share Java's spacing and hierarchy",
    async () => {
      const page = await browser.newPage();
      await page.goto(base, { waitUntil: "networkidle" });
      for (const width of [1440, 1024, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.locator(".background-grid").scrollIntoViewIfNeeded();
        const cards = await page
          .locator(".background-card")
          .evaluateAll((elements) =>
            elements.map((card) => {
              const rect = card.getBoundingClientRect();
              const style = getComputedStyle(card);
              const selectors = [
                ".background-date",
                "h3",
                ":scope > p",
                ".background-detail",
                ".background-footer",
              ];
              return {
                top: rect.top,
                height: rect.height,
                padding: style.padding,
                parts: selectors.map((selector) => {
                  const element = card.querySelector(selector);
                  if (!element) return null;
                  const s = getComputedStyle(element);
                  return {
                    top: element.getBoundingClientRect().top - rect.top,
                    font: s.fontFamily,
                    size: s.fontSize,
                    weight: s.fontWeight,
                    line: s.lineHeight,
                    color: s.color,
                  };
                }),
              };
            }),
          );
        assert.equal(cards.length, 3);
        for (const card of cards) {
          assert.equal(card.padding, cards[1].padding);
          assert.ok(
            card.parts.every(Boolean),
            "Each card exposes the same content hierarchy",
          );
          card.parts.slice(0, 4).forEach((part, index) => {
            const { top, ...type } = part;
            const { top: referenceTop, ...referenceType } =
              cards[1].parts[index];
            assert.deepEqual(type, referenceType);
          });
          const neighbor = cards.find(
            (other) => other !== card && Math.abs(other.top - card.top) < 1,
          );
          if (neighbor)
            card.parts.forEach((part, index) =>
              assert.ok(
                Math.abs(part.top - neighbor.parts[index].top) < 1,
                `Row alignment at ${width}px: ${part.top} / ${neighbor.parts[index].top}`,
              ),
            );
        }
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        );
      }
      await expect(
        page.locator(".education-card .education-qualification"),
      ).toContainText("Bachelor’s degree");
      await expect(
        page.locator(".education-card .background-detail"),
      ).toContainText(
        "This is where I developed the engineering mindset and skill set I bring to building software.",
      );
      await expect(page.locator(".education-coursework li")).toHaveCount(4);
      await page.close();
    },
  );
  await check("Requested copy and matching date typography", async () => {
    const page = await browser.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await expect(page.locator(".hero")).toContainText(
      "Based in Antipolo, Rizal, Philippines.",
    );
    await expect(page.locator("body")).not.toContainText(/junior/i);
    await expect(page.locator(".contact-description")).toHaveText(
      "Have a software developer role or a question about my work? I’d like to hear from you.",
    );
    await expect(page.locator(".education-card")).toContainText(
      "This is where I developed the engineering mindset and skill set I bring to building software.",
    );
    const dates = await page
      .locator(".background-date")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const s = getComputedStyle(element);
          return [
            s.fontFamily,
            s.fontSize,
            s.fontWeight,
            s.lineHeight,
            s.letterSpacing,
            s.color,
          ];
        }),
      );
    assert.equal(dates.length, 3);
    assert.deepEqual(dates[0], dates[1]);
    assert.deepEqual(dates[0], dates[2]);
    await page.close();
  });
  await check(
    "Responsive theme mapping, keyboard toggle and a real crossfade",
    async () => {
      const page = await browser.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(base, { waitUntil: "networkidle" });
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        const frame = page.locator(".about-portrait-frame");
        await frame.scrollIntoViewIfNeeded();
        const button = frame.getByRole("button", { name: "Toggle dark mode" });
        await expect(frame.locator("img.about-portrait-photo")).toHaveCount(2);
        await frame
          .locator("img.about-portrait-photo")
          .evaluateAll((images) =>
            Promise.all(images.map((image) => image.decode())),
          );
        for (const theme of ["light", "dark"]) {
          const target = theme === "light" ? "black" : "white";
          if (
            (await page.locator("html").getAttribute("data-theme")) !== theme
          ) {
            await button.focus();
            await page.keyboard.press("Enter");
            await page.waitForTimeout(130);
            const opacity = await frame
              .locator('.about-portrait-photo[data-portrait="white"]')
              .evaluate((image) => Number(getComputedStyle(image).opacity));
            assert.ok(opacity > 0 && opacity < 1, String(opacity));
          }
          await expect(frame).toHaveAttribute("data-portrait", target);
          const active = frame.locator(
            '.about-portrait-photo[data-active="true"]',
          );
          await expect(active).toHaveCSS("opacity", "1");
          await expect(
            frame.locator('.about-portrait-photo[data-portrait="white"]'),
          ).toHaveCSS("opacity", theme === "dark" ? "1" : "0");
          assert.equal(
            await frame.locator('img[aria-hidden="true"]').count(),
            1,
          );
          await expect(button).toHaveAttribute(
            "aria-pressed",
            String(theme === "dark"),
          );
          await expect(page.locator(".contact-content")).toHaveCSS(
            "background-color",
            "rgb(32, 37, 43)",
          );
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          );
          await page.screenshot({
            path: `${evidence}/portrait-${width}-${theme}.png`,
          });
          await page.locator(".education-card").scrollIntoViewIfNeeded();
          await page.screenshot({
            path: `${evidence}/education-${width}-${theme}.png`,
          });
          await page.locator(".contact-content").scrollIntoViewIfNeeded();
          await page.screenshot({
            path: `${evidence}/contact-${width}-${theme}.png`,
          });
          await frame.scrollIntoViewIfNeeded();
        }
      }
      await page.reload({ waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(page.locator(".about-portrait-photo").first()).toHaveCSS(
        "transition-duration",
        "0s",
      );
      assert.deepEqual(errors, []);
      await page.close();
    },
  );
  await check(
    "Graded portrait background colors and retained dimensions",
    async () => {
      for (const [file, color] of [
        ["about-portrait.webp", [32, 37, 43]],
        ["about-portrait-white.webp", [216, 208, 196]],
      ]) {
        const { data, info } = await sharp(`public/images/portraits/${file}`)
          .removeAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        assert.equal(info.width, 800);
        assert.equal(info.height, 1000);
        for (const [x, y] of [
          [20, 20],
          [780, 20],
          [20, 500],
          [780, 500],
        ]) {
          const pixel = Array.from(
            data.subarray(
              (y * info.width + x) * 3,
              (y * info.width + x) * 3 + 3,
            ),
          );
          assert.ok(
            pixel.every((value, i) => Math.abs(value - color[i]) <= 3),
            `${file}: ${pixel}`,
          );
        }
      }
    },
  );
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/results.json`,
    JSON.stringify(results, null, 2) + "\n",
  );
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
