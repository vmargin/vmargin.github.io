import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const baseline = process.argv.includes("--baseline");
const evidence = "artifacts/motion-implementation-2026-10-22";
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "chromium" });
const results = [];
const errors = [];
const frozenFiles = [
  "src/data/portfolio.json",
  "src/ProjectCaseStudy.tsx",
  "public/documents/valkenburgh-margin-resume.pdf",
  "package.json",
  "package-lock.json",
];
async function hashes() {
  return Object.fromEntries(
    await Promise.all(
      frozenFiles.map(async (file) => [
        file,
        createHash("sha256")
          .update(await readFile(file))
          .digest("hex"),
      ]),
    ),
  );
}
async function check(name, run) {
  try {
    await run();
    results.push({ name, pass: true });
  } catch (error) {
    results.push({ name, pass: false, error: error.message });
  }
  console.log(`${results.at(-1).pass ? "PASS" : "FAIL"} ${name}`);
}
async function open(options = {}) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    ...options,
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    window.motionLog = [];
    const animate = Element.prototype.animate;
    Element.prototype.animate = function (frames, options) {
      const animation = animate.call(this, frames, options);
      window.motionLog.push({
        target: this.className,
        options,
        frames,
        time: performance.now(),
      });
      return animation;
    };
  });
  return page;
}
async function visit(page) {
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute(
    "data-motion",
    /full|reduced/,
  );
}
async function count(page, target) {
  return page.evaluate(
    (target) =>
      window.motionLog.filter((item) => item.target.includes(target)).length,
    target,
  );
}
async function snapshot(page) {
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(() => {
    const root = document.querySelector(".portfolio");
    const selectors = [
      ".hero",
      "#hero-title",
      ".hero-name-first",
      ".hero-name-last",
      ".hero-portrait",
      "#projects",
      "#about",
      "#stack",
      "#certifications",
      "#contact",
    ];
    return {
      text: root.innerText,
      links: [...root.querySelectorAll("a")].map((el) => [
        el.textContent,
        el.getAttribute("href"),
        el.getAttribute("aria-label"),
      ]),
      images: [...root.querySelectorAll("img")].map((el) => [
        el.getAttribute("src"),
        el.getAttribute("srcset"),
        el.alt,
        el.width,
        el.height,
      ]),
      bounds: Object.fromEntries(
        selectors.map((selector) => {
          const { x, y, width, height } = root
            .querySelector(selector)
            .getBoundingClientRect();
          return [selector, { x, y: y + scrollY, width, height }];
        }),
      ),
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
}
try {
  await check(
    "Frozen content and settled layout match at six viewport/theme combinations",
    async () => {
      const captures = {};
      for (const width of [1440, 390, 320]) {
        for (const theme of ["dark", "light"]) {
          const page = await open({ viewport: { width, height: 960 } });
          await page.addInitScript(
            ({ theme }) => {
              localStorage.setItem("v6-theme", theme);
              localStorage.setItem("v6-motion-paused", "true");
            },
            { theme },
          );
          await visit(page);
          await expect(page.locator("html")).toHaveAttribute(
            "data-motion",
            "reduced",
          );
          await page.waitForLoadState("networkidle");
          captures[`${width}-${theme}`] = await snapshot(page);
          assert.equal(captures[`${width}-${theme}`].overflow, false);
          await page.screenshot({
            path: `${evidence}/${baseline ? "baseline" : "final"}-${width}-${theme}.png`,
          });
          await page.close();
        }
      }
      const current = { hashes: await hashes(), captures };
      if (baseline) {
        await writeFile(
          `${evidence}/content-layout-baseline.json`,
          JSON.stringify(current, null, 2),
        );
      } else {
        const original = JSON.parse(
          await readFile(`${evidence}/content-layout-baseline.json`, "utf8"),
        );
        assert.deepEqual(current, original);
      }
    },
  );
  await check(
    "Hero plays once and preserves its settled name and portrait",
    async () => {
      const page = await open();
      await visit(page);
      await expect
        .poll(() => count(page, "hero-name-first"), { timeout: 1800 })
        .toBe(1);
      await expect.poll(() => count(page, "hero-name-last")).toBe(1);
      await expect.poll(() => count(page, "hero-portrait")).toBe(1);
      await page.waitForTimeout(750);
      assert.equal(
        await page.locator("#hero-title").textContent(),
        "Valkenburgh Margin",
      );
      assert.equal(
        await page
          .locator(".hero")
          .evaluate((el) => el.getAnimations({ subtree: true }).length),
        0,
      );
      await page.locator(".quick-preview-trigger").first().click();
      await page.keyboard.press("Escape");
      await page.locator(".motion-control").click();
      await page.locator(".motion-control").click();
      await page.waitForTimeout(150);
      assert.equal(await count(page, "hero-name-first"), 1);
      await page.close();
    },
  );
  await check(
    "Mobile portrait waits until it enters the viewport",
    async () => {
      const page = await open({ viewport: { width: 390, height: 640 } });
      await visit(page);
      await expect
        .poll(() => count(page, "hero-name-first"), { timeout: 1800 })
        .toBe(1);
      assert.equal(await count(page, "hero-portrait"), 0);
      await page.locator(".hero-portrait").scrollIntoViewIfNeeded();
      await expect.poll(() => count(page, "hero-portrait")).toBe(1);
      await page.close();
    },
  );
  await check(
    "Contact blocks enter as a bounded once-played group",
    async () => {
      const page = await open();
      await visit(page);
      await page.locator(".contact-links").scrollIntoViewIfNeeded();
      await expect.poll(() => count(page, "contact-block")).toBeGreaterThan(0);
      const initial = await count(page, "contact-block");
      const options = await page.evaluate(() =>
        window.motionLog
          .filter((item) => item.target.includes("contact-block"))
          .map((item) => item.options),
      );
      assert.ok(
        options.every((item) => item.duration === 280 && item.delay <= 135),
      );
      await page.locator(".motion-control").click();
      await page.locator(".motion-control").click();
      await page.waitForTimeout(150);
      assert.equal(await count(page, "contact-block"), initial);
      await page.close();
    },
  );
  await check(
    "Toolkit pointer changes animate; keyboard changes stay immediate",
    async () => {
      const page = await open();
      await visit(page);
      const tabs = page.locator(".toolkit-tablist [role=tab]");
      await tabs.nth(1).click();
      await expect.poll(() => count(page, "toolkit-panel")).toBe(1);
      await page.keyboard.press("ArrowRight");
      await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
      assert.equal(await count(page, "toolkit-panel"), 1);
      assert.equal(
        await page
          .locator('.toolkit-panel[data-state="active"]')
          .evaluate((el) => el.getAnimations().length),
        0,
      );
      await tabs.nth(3).click();
      await tabs.nth(4).click();
      await page.waitForTimeout(250);
      await expect(tabs.nth(4)).toHaveAttribute("aria-selected", "true");
      assert.equal(
        await page
          .locator(".toolkit-panel[data-state=active]")
          .evaluate((el) => getComputedStyle(el).opacity),
        "1",
      );
      await page.close();
    },
  );
  await check(
    "Pointer preview enters; immediate Escape and keyboard opening preserve focus",
    async () => {
      const page = await open();
      await visit(page);
      const trigger = page.locator(".quick-preview-trigger").first();
      await trigger.click();
      await expect.poll(() => count(page, "quick-preview")).toBeGreaterThan(0);
      await expect(
        page.getByRole("button", { name: "Close project preview" }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      const initial = await count(page, "quick-preview");
      await page.keyboard.press("Enter");
      await expect(page.locator(".quick-preview")).toBeVisible();
      await page.waitForTimeout(100);
      assert.equal(await count(page, "quick-preview"), initial);
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      await page.close();
    },
  );
  await check(
    "Saved pause and system reduced motion suppress every new effect",
    async () => {
      for (const preference of ["paused", "reduced"]) {
        const page = await open(
          preference === "reduced" ? { reducedMotion: "reduce" } : {},
        );
        if (preference === "paused")
          await page.addInitScript(() =>
            localStorage.setItem("v6-motion-paused", "true"),
          );
        await visit(page);
        await page.locator(".toolkit-tablist [role=tab]").nth(1).click();
        await page.locator(".quick-preview-trigger").first().click();
        await page.waitForTimeout(100);
        assert.equal(await count(page, "hero-"), 0);
        assert.equal(await count(page, "toolkit-panel"), 0);
        assert.equal(await count(page, "quick-preview"), 0);
        await page.close();
      }
    },
  );
  await check(
    "Changing motion preference mid-entry cancels effects without replay",
    async () => {
      const page = await open();
      await visit(page);
      await expect
        .poll(() => count(page, "hero-name-first"), { timeout: 1800 })
        .toBe(1);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(page.locator("html")).toHaveAttribute(
        "data-motion",
        "reduced",
      );
      assert.equal(
        await page
          .locator(".hero")
          .evaluate((el) => el.getAnimations({ subtree: true }).length),
        0,
      );
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
      await page.waitForTimeout(100);
      assert.equal(await count(page, "hero-name-first"), 1);
      await page.close();
    },
  );
  await check("Hidden-document lifecycle settles active effects", async () => {
    const page = await open();
    await visit(page);
    await expect
      .poll(() => count(page, "hero-name-first"), { timeout: 1800 })
      .toBe(1);
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert.equal(
      await page
        .locator(".hero")
        .evaluate((el) => el.getAnimations({ subtree: true }).length),
      0,
    );
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(100);
    assert.equal(await count(page, "hero-name-first"), 1);
    await page.close();
  });
  if (!baseline) {
    await check(
      "Delayed enhancement leaves the already-readable hero still",
      async () => {
        const page = await open();
        await page.route("**/assets/portfolioMotion-*.js", async (route) => {
          await new Promise((resolve) => setTimeout(resolve, 1100));
          await route.continue();
        });
        await visit(page);
        await expect(page.locator("#hero-title")).toBeVisible();
        await page.waitForLoadState("networkidle");
        assert.equal(await count(page, "hero-"), 0);
        await page.close();
      },
    );
    await check("Touch filters and previews work without hover", async () => {
      const page = await open({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      });
      await visit(page);
      const tab = page.locator(".toolkit-tablist [role=tab]").nth(1);
      await tab.tap();
      await expect(tab).toHaveAttribute("aria-selected", "true");
      await expect.poll(() => count(page, "toolkit-panel")).toBe(1);
      await page.locator(".quick-preview-trigger").first().tap();
      await expect(page.locator(".quick-preview")).toBeVisible();
      await expect.poll(() => count(page, "quick-preview")).toBeGreaterThan(0);
      await page.getByRole("button", { name: "Close project preview" }).tap();
      await expect(page.locator(".quick-preview")).toHaveCount(0);
      await page.close();
    });
    await check(
      "Theme changes keep the hero sequence and final layout intact",
      async () => {
        const page = await open();
        await visit(page);
        await expect
          .poll(() => count(page, "hero-name-first"), { timeout: 1800 })
          .toBe(1);
        await page
          .getByRole("button", { name: "Light theme", exact: true })
          .click();
        await expect(page.locator("html")).toHaveAttribute(
          "data-theme",
          "light",
        );
        await page.waitForTimeout(650);
        assert.equal(await count(page, "hero-name-first"), 1);
        assert.equal(
          await page
            .locator(".hero-name-last")
            .evaluate((el) => getComputedStyle(el).clipPath),
          "none",
        );
        await page.close();
      },
    );
  }
  if (!baseline)
    await check(
      "Prerendered content remains visible without JavaScript",
      async () => {
        const page = await browser.newPage({ javaScriptEnabled: false });
        await page.goto(base);
        await expect(page.locator("#hero-title")).toBeVisible();
        await expect(
          page.getByRole("link", { name: "View Projects", exact: true }),
        ).toBeVisible();
        assert.equal(await page.locator(".project-card").count(), 3);
        await page.close();
      },
    );
  await check("Browser reports no application errors", async () =>
    assert.deepEqual(errors, []),
  );
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/${baseline ? "baseline" : "final"}-results.json`,
    JSON.stringify(results, null, 2),
  );
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
