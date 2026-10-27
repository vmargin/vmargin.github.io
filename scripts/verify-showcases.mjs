import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const evidence = "artifacts/portfolio-showcases-2026-10-28";
const { projects } = JSON.parse(
  await readFile("src/data/portfolio.json", "utf8"),
);
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
    "Home offers three showcases without downloading video or nesting interactive controls",
    async () => {
      const page = await browser.newPage();
      const media = [];
      page.on("request", (request) => {
        if (request.url().includes("/videos/")) media.push(request.url());
      });
      await page.goto(base);
      await expect(page.locator(".project-watch")).toHaveCount(3);
      await expect(page.locator(".quick-preview-trigger")).toHaveCount(3);
      await expect(page.locator(".project-demo-link")).toHaveCount(3);
      assert.equal(await page.locator("a button, button a, a a").count(), 0);
      assert.equal(await page.locator("video").count(), 0);
      assert.deepEqual(media, []);
      await page.close();
    },
  );
  for (const project of projects) {
    await check(
      `${project.title}: viewer plays actual media, traps focus, closes and restores the trigger`,
      async () => {
        const page = await browser.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto(base);
        const trigger = page.getByRole("button", {
          name: `Watch ${project.title} showcase`,
          exact: true,
        });
        await trigger.click();
        const dialog = page.getByRole("dialog", {
          name: project.title,
          exact: true,
        });
        await expect(dialog).toBeVisible();
        const video = dialog.locator("video");
        await expect
          .poll(() => video.evaluate((element) => element.currentTime), {
            timeout: 20000,
          })
          .toBeGreaterThan(0.1);
        const media = await video.evaluate((element) => ({
          width: element.videoWidth,
          height: element.videoHeight,
          duration: element.duration,
          controls: element.controls,
          inline: element.playsInline,
        }));
        assert.equal(media.width, 1920);
        assert.equal(media.height, 1080);
        assert.ok(
          Math.abs(media.duration - project.showcase.durationSeconds) < 0.15,
        );
        assert.ok(media.controls && media.inline);
        for (let index = 0; index < 5; index++) {
          await page.keyboard.press("Tab");
          assert.ok(
            await dialog.evaluate((element) =>
              element.contains(document.activeElement),
            ),
          );
        }
        await page.screenshot({
          path: `${evidence}/${project.id}-viewer-desktop.png`,
        });
        await page.keyboard.press("Escape");
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        assert.equal(await page.locator("video").count(), 0);
        assert.equal(
          await page.evaluate(() => document.body.style.overflow),
          "",
        );
        await trigger.click();
        await page
          .getByRole("button", { name: "Close showcase", exact: true })
          .click();
        await expect(trigger).toBeFocused();
        assert.deepEqual(errors, []);
        await page.close();
      },
    );
    await check(
      `${project.title}: case study defers media until play and keeps gallery available`,
      async () => {
        const page = await browser.newPage();
        const media = [];
        page.on("request", (request) => {
          if (request.url().includes("/videos/")) media.push(request.url());
        });
        await page.goto(base + project.href);
        const section = page.locator("#showcase");
        await section.scrollIntoViewIfNeeded();
        assert.deepEqual(media, []);
        assert.equal(await section.locator("video").count(), 0);
        const poster = section.locator("img");
        assert.ok(
          await poster.evaluate(async (element) => {
            await element.decode();
            return element.naturalWidth === 1280;
          }),
        );
        await page
          .getByRole("button", {
            name: `Play ${project.title} showcase`,
            exact: true,
          })
          .click();
        await expect
          .poll(
            () =>
              section
                .locator("video")
                .evaluate((element) => element.currentTime),
            { timeout: 20000 },
          )
          .toBeGreaterThan(0.1);
        await expect(section.locator("video")).toBeFocused();
        await expect(page.locator(".case-gallery-item")).toHaveCount(
          project.gallery.length,
        );
        await page.close();
      },
    );
  }
  await check(
    "Responsive showcase layouts fit both themes at 320, 390, 768 and 1440 pixels",
    async () => {
      for (const theme of ["dark", "light"]) {
        const page = await browser.newPage({ reducedMotion: "reduce" });
        await page.addInitScript(
          (value) => localStorage.setItem("v6-theme", value),
          theme,
        );
        for (const width of [320, 390, 768, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(base);
          const trigger = page.locator(".project-watch").first();
          await trigger.scrollIntoViewIfNeeded();
          assert.ok(
            await trigger.evaluate((element) => {
              const box = element.getBoundingClientRect();
              return (
                box.width >= 44 &&
                box.height >= 44 &&
                box.left >= 0 &&
                box.right <= innerWidth
              );
            }),
          );
          await trigger.click();
          await expect(page.locator(".showcase-dialog")).toBeVisible();
          assert.ok(
            await page.locator(".showcase-dialog").evaluate((element) => {
              const box = element.getBoundingClientRect();
              return (
                box.left >= 0 &&
                box.right <= innerWidth &&
                box.top >= 0 &&
                box.bottom <= innerHeight
              );
            }),
          );
          if (width === 390)
            await page.screenshot({
              path: `${evidence}/viewer-mobile-${theme}.png`,
            });
          await page.keyboard.press("Escape");
          if (width === 390 || width === 1440)
            await page
              .locator(".project-card")
              .first()
              .screenshot({ path: `${evidence}/card-${width}-${theme}.png` });
          for (const project of projects) {
            await page.goto(base + project.href);
            await page.locator("#showcase").scrollIntoViewIfNeeded();
            await page
              .locator(".showcase-poster img")
              .evaluate((image) => image.decode());
            const size = await page
              .locator(".showcase-screen")
              .evaluate((element) => {
                const box = element.getBoundingClientRect();
                return {
                  width: box.width,
                  height: box.height,
                  right: box.right,
                };
              });
            assert.ok(Math.abs(size.width / size.height - 16 / 9) < 0.02);
            assert.ok(size.right <= width);
            assert.ok(
              await page.evaluate(
                () => document.documentElement.scrollWidth <= innerWidth,
              ),
            );
            if (width === 390 && project.id === "arctic")
              await page.screenshot({
                path: `${evidence}/case-mobile-${theme}.png`,
              });
          }
        }
        await page.close();
      }
    },
  );
  await check(
    "Failed video requests show recovery actions and retry successfully",
    async () => {
      const page = await browser.newPage();
      await page.route("**/videos/*.mp4", (route) => route.abort());
      await page.goto(base + projects[0].href);
      await page
        .getByRole("button", { name: `Play ${projects[0].title} showcase` })
        .click();
      await expect(page.locator(".showcase-error")).toBeVisible({
        timeout: 10000,
      });
      await expect(
        page.getByRole("link", { name: "Open video", exact: true }),
      ).toHaveAttribute("href", projects[0].showcase.src);
      await page.unroute("**/videos/*.mp4");
      await page
        .getByRole("button", { name: "Try again", exact: true })
        .click();
      await expect
        .poll(
          () =>
            page
              .locator(".showcase video")
              .evaluate((element) => element.currentTime),
          { timeout: 20000 },
        )
        .toBeGreaterThan(0.1);
      await page.close();
    },
  );
} finally {
  await browser.close();
}
await writeFile(
  `${evidence}/results.json`,
  JSON.stringify(results, null, 2) + "\n",
);
if (results.some((result) => !result.pass)) process.exitCode = 1;
