import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const output =
  process.env.PORTFOLIO_EVIDENCE ||
  "artifacts/portfolio-experience-publication-2026-10-23";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
const data = JSON.parse(await readFile("src/data/portfolio.json", "utf8"));
const browser = await chromium.launch({ headless: true });
const results = [];
await mkdir(output, { recursive: true });
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
    "Experience navigation opens the three-column project journey",
    async () => {
      const page = await browser.newPage({
        reducedMotion: "reduce",
        viewport: { width: 1440, height: 1000 },
      });
      await page.goto(base);
      await page
        .locator(".desktop-nav")
        .getByRole("link", { name: "Experience", exact: true })
        .click({ timeout: 2500 });
      await expect(page.locator("#experience")).toBeInViewport();
      await expect(page.locator(".journey-column > h3")).toHaveText([
        "Education",
        "Experience",
        "Training",
      ]);
      await expect(page.locator(".project-experience h4")).toHaveText([
        "Task Manager",
        "Multi-Tenant Asset Manager",
        "ARCTIC",
        "Banking App",
      ]);
      assert.equal(
        await page.locator(".project-experience .journey-entry").count(),
        4,
      );
      assert.equal(await page.locator(".project-card").count(), 3);
      assert.doesNotMatch(
        await page.locator(".project-experience").innerText(),
        /paid employment|professional employment|delivered to the client/i,
      );
      await expect(
        page
          .locator(".project-experience")
          .getByRole("link", { name: "API source" }),
      ).toHaveAttribute("href", "https://github.com/vmargin/task-manager-api");
      await expect(
        page
          .locator(".project-experience")
          .getByRole("link", { name: "Client source" }),
      ).toHaveAttribute(
        "href",
        "https://github.com/vmargin/task-manager-client",
      );
      for (const project of data.projects) {
        await page.goto(base + project.href);
        await expect(
          page
            .locator(".case-header")
            .getByRole("link", { name: "Experience", exact: true }),
        ).toHaveAttribute("href", "/#experience");
      }
      await page.goto(base + "/#certifications");
      assert.equal(await page.locator("#certifications").count(), 1);
      await expect(page.locator("#experience")).toBeInViewport();
      await page.close();
    },
  );
  await check(
    "AI tools move into the toolkit with working category navigation",
    async () => {
      const page = await browser.newPage({ reducedMotion: "reduce" });
      await page.goto(base);
      assert.equal(await page.locator(".ai-workflow, #ai-title").count(), 0);
      const tab = page.getByRole("tab", { name: "AI tools", exact: true });
      await tab.click({ timeout: 2500 });
      await expect(tab).toHaveAttribute("aria-selected", "true");
      const items = await page
        .locator(".toolkit-panel[data-state='active'] .toolkit-items li")
        .allTextContents();
      assert.deepEqual(items, [
        "Claude",
        "Codex",
        "OpenCode",
        "Hermes Agent",
        "OpenClaw Agent",
        "Cline",
        "Cursor",
        "Anti Gravity",
      ]);
      await tab.focus();
      await page.keyboard.press("ArrowLeft");
      await expect(
        page.getByRole("tab", { name: "Tools & delivery", exact: true }),
      ).toBeFocused();
      await page.close();
    },
  );
  await check(
    "Hero identity and journey stay readable in both themes at five widths",
    async () => {
      for (const theme of ["dark", "light"]) {
        const context = await browser.newContext({ reducedMotion: "reduce" });
        await context.addInitScript(
          (value) => localStorage.setItem("v6-theme", value),
          theme,
        );
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        for (const width of [1440, 1024, 768, 390, 320]) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(base);
          await expect(page.locator(".hero h1")).toHaveText("Hi, I’m Valk.");
          const heading = await page
            .locator(".hero-greeting")
            .evaluate((element) => {
              const style = getComputedStyle(element);
              return {
                font: parseFloat(style.fontSize),
                width: element.clientWidth,
                scroll: element.scrollWidth,
              };
            });
          assert.ok(heading.font >= 48, `Greeting is too small at ${width}px`);
          assert.ok(
            heading.scroll <= heading.width + 1,
            `Greeting overflows at ${width}px`,
          );
          await expect(page.locator(".hero-position")).toHaveText(
            "Software & Full-Stack Developer",
          );
          await expect(page.locator(".hero-description")).toHaveText(
            data.site.heroDescription,
          );
          assert.equal(
            await page.locator("#experience .journey-entry").count(),
            7,
          );
          const columns = await page
            .locator(".journey-column")
            .evaluateAll((elements) =>
              elements.map((element) => ({
                x: element.getBoundingClientRect().x,
                y: element.getBoundingClientRect().y,
              })),
            );
          if (width >= 1024)
            assert.ok(
              columns[0].x < columns[1].x && columns[1].x < columns[2].x,
            );
          else
            assert.ok(
              columns[0].y < columns[1].y && columns[1].y < columns[2].y,
            );
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            `${theme} ${width}px overflows`,
          );
          if (width < 1024) {
            await page
              .getByRole("button", { name: "Open menu", exact: true })
              .click();
            await page
              .locator("#mobile-navigation")
              .getByRole("link", { name: "Experience", exact: true })
              .click();
            await expect(page.locator("#experience")).toBeFocused();
          }
          if ([1440, 390].includes(width)) {
            for (const section of [".hero", "#experience", "#stack"]) {
              await page.locator(section).scrollIntoViewIfNeeded();
              await page.locator(section).screenshot({
                path: `${output}/${theme}-${width}-${section.replaceAll(/[^a-z]/g, "")}.png`,
                style:
                  section === ".hero"
                    ? ""
                    : ".site-header, .skip-link { visibility: hidden !important; }",
              });
            }
          }
        }
        assert.deepEqual(errors, []);
        await context.close();
      }
    },
  );
} finally {
  await browser.close();
  await writeFile(`${output}/${phase}.json`, JSON.stringify(results, null, 2));
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
