import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const evidence = "artifacts/portfolio-latest-update-2026-10-21";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
const description =
  "I'm a Computer Engineering graduate who builds software with a systems-first mindset—turning complex workflows into simple, reliable solutions without compromising quality or efficiency.";
const about = [
  "I'm Valkenburgh Margin, also known as Valk, a Computer Engineering graduate from the Polytechnic University of the Philippines. I've completed Java programming training, with experience building Java applications, PERN-stack personal projects, and client websites.",
  "I'm a builder who thinks in systems. I care not just about what I build, but how I build it—planning thoughtfully, simplifying complexity, and finding efficient ways to deliver quality results.",
  "I approach AI the same way. Beyond prompting, I continuously refine my AI development environment through custom skills, automations, and structured workflows. My goal is to make development faster and more effective without compromising quality. I review and verify the results rather than relying on AI output alone.",
];
const urls = {
  AssetHub: "https://erlassethub.vercel.app/",
  ARCTIC: "https://arcticaircon.vercel.app/",
  "CASH-G": "https://banking-app-v2.onrender.com/",
};
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
    "Exact hero copy, location, Resume navigation, and no hero PDF action",
    async () => {
      const page = await browser.newPage();
      await page.goto(base);
      await expect(page.locator(".hero-role")).toHaveText(
        "Think deeply. Build deliberately.",
      );
      await expect(page.locator(".hero-description")).toHaveText(description);
      await expect(page.locator(".hero .location")).toHaveText(
        "Based in Antipolo, Rizal, Philippines.",
      );
      await expect(
        page
          .locator(".desktop-nav")
          .getByRole("link", { name: "Resume", exact: true }),
      ).toHaveAttribute("href", "/documents/valkenburgh-margin-resume.pdf");
      assert.equal(await page.locator('.hero a[href$=".pdf"]').count(), 0);
      await page.close();
    },
  );
  await check("Three exact About paragraphs and removal of SIL", async () => {
    const page = await browser.newPage();
    await page.goto(base);
    const paragraphs = await page.locator(".about-copy > p").allTextContents();
    assert.deepEqual(paragraphs, about);
    assert.doesNotMatch(
      await page.locator("#certifications").innerText(),
      /Supervised Internship|Spring Valley|\bSIL\b/,
    );
    assert.match(
      await page.locator("#certifications").innerText(),
      /Java Programming NC III Training/,
    );
    assert.match(
      await page.locator("#certifications").innerText(),
      /AWS Cloud Quest/,
    );
    await page.close();
  });
  await check(
    "Neutral black palette and centered responsive landscape section",
    async () => {
      const page = await browser.newPage();
      await page.goto(base, { waitUntil: "networkidle" });
      const color = await page.evaluate(() =>
        getComputedStyle(document.body)
          .backgroundColor.match(/\d+/g)
          .slice(0, 3)
          .map(Number),
      );
      assert.ok(
        Math.max(...color) <= 16 &&
          Math.max(...color) - Math.min(...color) <= 4,
        `Expected neutral near-black: ${color}`,
      );
      for (const width of [1920, 1440, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await page.locator(".contact-photo").scrollIntoViewIfNeeded();
        const geometry = await page
          .locator(".contact-photo")
          .evaluate(async (image) => {
            await image.decode();
            const box = image.getBoundingClientRect();
            const section = image.closest("#contact").getBoundingClientRect();
            return {
              source: image.currentSrc,
              width: box.width,
              height: box.height,
              left: section.left,
              right: innerWidth - section.right,
              ratio: image.naturalWidth / image.naturalHeight,
              document: document.documentElement.scrollWidth,
            };
          });
        assert.match(geometry.source, /contact-landscape/);
        assert.ok(geometry.width <= 1350.5 && geometry.width <= width);
        assert.ok(
          Math.abs(geometry.left - geometry.right) <= 2,
          JSON.stringify(geometry),
        );
        assert.ok(
          Math.abs(geometry.width / geometry.height - geometry.ratio) < 0.01,
          "Display the full photo without distortion or cropping",
        );
        assert.ok(geometry.document <= width);
      }
      await page.close();
    },
  );
  await check(
    "All project cards expose genuine previews and exact Try Demo destinations",
    async () => {
      const page = await browser.newPage();
      await page.goto(base);
      assert.deepEqual(
        await page.locator(".project-card h3").allTextContents(),
        ["AssetHub", "ARCTIC", "CASH-G"],
      );
      for (const [title, url] of Object.entries(urls)) {
        const card = page.locator(".project-card").filter({
          has: page.getByRole("heading", { name: title, exact: true }),
        });
        await expect(
          card.getByRole("link", { name: "Try Demo", exact: true }),
        ).toHaveAttribute("href", url);
        assert.equal(await card.locator("img").count(), 1);
        assert.equal(
          await card
            .getByRole("button", { name: "Quick preview", exact: true })
            .count(),
          1,
        );
        assert.ok(
          (await card.locator(".project-role-summary").innerText()).length > 30,
        );
      }
      await page.close();
    },
  );
  if (phase === "final")
    await check("Try Demo clicks open each supplied live URL", async () => {
      const context = await browser.newContext();
      const page = await context.newPage();
      const navigation = [];
      for (const [title, url] of Object.entries(urls)) {
        await page.goto(base);
        const card = page.locator(".project-card").filter({
          has: page.getByRole("heading", { name: title, exact: true }),
        });
        const [popup] = await Promise.all([
          page.waitForEvent("popup"),
          card.getByRole("link", { name: "Try Demo", exact: true }).click(),
        ]);
        await popup.waitForURL(
          (actual) => actual.origin === new URL(url).origin,
          { waitUntil: "commit", timeout: 45000 },
        );
        navigation.push({ title, requested: url, reached: popup.url() });
        await popup.close();
      }
      await writeFile(
        `${evidence}/card-demo-navigation.json`,
        JSON.stringify(navigation, null, 2),
      );
      await context.close();
    });
  if (phase === "final")
    await check(
      "ARCTIC decisions navigate to the matching work-order and invoice captures",
      async () => {
        for (const width of [1440, 390, 320])
          for (const theme of ["dark", "light"]) {
            const context = await browser.newContext({
              viewport: { width, height: 900 },
            });
            await context.addInitScript((theme) => {
              localStorage.setItem("v6-theme", theme);
              localStorage.setItem("v6-motion-paused", "true");
            }, theme);
            const page = await context.newPage();
            const errors = [];
            page.on("pageerror", (error) => errors.push(error.message));
            await page.goto(base + "/projects/arctic/", {
              waitUntil: "networkidle",
            });
            for (const [label, id] of [
              ["See work-order details", "screen-2"],
              ["See invoices and payments", "screen-3"],
            ]) {
              await page
                .getByRole("link", { name: label, exact: true })
                .click({ timeout: 1500 });
              await page.waitForURL(base + "/projects/arctic/#" + id);
              await expect(page.locator("#" + id)).toBeInViewport();
            }
            assert.deepEqual(errors, []);
            await context.close();
          }
      },
    );
} finally {
  await browser.close();
  await writeFile(
    `${evidence}/${phase}-latest-acceptance.json`,
    JSON.stringify(results, null, 2),
  );
}
if (results.some((result) => !result.pass)) process.exitCode = 1;
