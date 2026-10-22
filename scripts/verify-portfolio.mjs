import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
const evidence =
  process.env.PORTFOLIO_EVIDENCE ||
  "artifacts/portfolio-latest-update-2026-10-21/browser";
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  channel: "chromium",
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
});
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
try {
  await check("Confirmed portfolio content and credentials", async () => {
    const page = await browser.newPage();
    await page.goto(base);
    await page.locator("#experience").waitFor({ timeout: 4000 });
    assert.match(
      await page.locator("#about").innerText(),
      /also known as Valk/,
    );
    assert.doesNotMatch(
      await page.locator("#experience").innerText(),
      /Spring Valley|Supervised Internship|\bSIL\b/,
    );
    assert.equal(await page.locator(".project-card").count(), 3);
    assert.equal(await page.locator("#about a").count(), 0);
    await page.close();
  });
  await check(
    "Mobile selection focuses destination; Escape restores trigger",
    async () => {
      const page = await browser.newPage({
        viewport: { width: 390, height: 844 },
      });
      await page.goto(base);
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      await page
        .locator("#mobile-navigation")
        .getByRole("link", { name: "Projects", exact: true })
        .click();
      await page.waitForTimeout(100);
      assert.equal(
        await page.evaluate(() => document.activeElement?.id),
        "projects",
      );
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      await page.keyboard.press("Escape");
      assert.equal(
        await page.evaluate(() =>
          document.activeElement?.getAttribute("aria-label"),
        ),
        "Open menu",
      );
      await page.close();
    },
  );
  await check(
    "Saved pause applies on fresh direct case-study loads",
    async () => {
      const context = await browser.newContext();
      await context.addInitScript(() =>
        localStorage.setItem("v6-motion-paused", "true"),
      );
      const page = await context.newPage();
      for (const route of [
        "/",
        "/projects/cash-g/",
        "/projects/arctic/",
        "/projects/assethub/",
      ]) {
        await page.goto(base + route);
        assert.equal(
          await page.locator("html").getAttribute("data-motion"),
          "reduced",
          route,
        );
      }
      await context.close();
    },
  );
  await check("Every route contains readable prerendered HTML", async () => {
    for (const route of [
      "/",
      "/projects/cash-g/",
      "/projects/arctic/",
      "/projects/assethub/",
    ]) {
      const response = await fetch(base + route);
      assert.equal(response.status, 200);
      assert.match(await response.text(), /<h1[^>]*>/, route);
    }
  });
  if (phase === "final") {
    const { verifyJourneys } = await import("./verify-journeys.mjs");
    await verifyJourneys({ browser, base, evidence, check });
  }
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/${phase}-acceptance.json`,
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
