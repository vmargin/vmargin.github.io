import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import { expect } from "playwright/test";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4176";
const phase = process.argv.includes("--baseline") ? "baseline" : "final";
const output = "artifacts/portfolio-content-layout-2026-10-23";
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
  await check("Hero follows the supplied five-part hierarchy", async () => {
    const page = await browser.newPage();
    await page.goto(base);
    const copy = await page.locator(".hero-content").innerText();
    const ordered = [
      "Open to Software Developer and Full-Stack Developer Roles",
      "Hi, I’m Valk.",
      "Software & Full-Stack Developer",
      "Think deeply. Build deliberately.",
      "I build practical software solutions and refine development workflows through engineering fundamentals and structured AI assistance.",
    ];
    let last = -1;
    for (const text of ordered) {
      const index = copy.indexOf(text);
      assert.ok(index > last, `Missing or out-of-order hero text: ${text}`);
      last = index;
    }
    await expect(page.locator(".hero h1")).toHaveText(ordered[1]);
    assert.doesNotMatch(copy, /Junior/);
    await page.close();
  });
  await check("About uses the exact replacement paragraphs", async () => {
    const page = await browser.newPage();
    await page.goto(base);
    await expect(page.locator("#about h2")).toHaveText("About Me");
    assert.deepEqual(await page.locator(".about-copy > p").allTextContents(), [
      "I'm Valkenburgh Margin, also known as Valk, a Computer Engineering graduate from the Polytechnic University of the Philippines. I've completed Java programming training and have experience building Java applications, PERN-stack projects, and client websites.",
      "I'm a builder who thinks in systems. I enjoy understanding problems, simplifying complex workflows, and finding efficient ways to build software without compromising quality.",
      "I bring the same mindset to AI-assisted development. Beyond prompting, I build custom skills, automations, and structured workflows to improve how I work. I stay involved in planning, technical decisions, and reviewing results while continuously strengthening my skills as a software developer.",
    ]);
    await page.close();
  });
  await check(
    "All cards share the new hierarchy and complete verified stacks",
    async () => {
      const page = await browser.newPage();
      await page.goto(base);
      const cards = page.locator(".project-card");
      assert.equal(await cards.count(), 3);
      assert.equal(
        await page
          .locator(".project-number, .project-preview-label, .project-featured")
          .count(),
        0,
      );
      for (const [index, name] of [
        "ERL AssetHub",
        "ARCTIC",
        "CASH-G",
      ].entries()) {
        const card = cards.nth(index);
        await expect(card.locator("h3")).toHaveText(name);
        await expect(card.locator(".project-type")).toHaveText(
          [
            "Full Stack Application",
            "Client Project",
            "Java Full-Stack Application",
          ][index],
        );
        assert.deepEqual(
          await card.locator(".tags > span").allTextContents(),
          data.projects[index].stack,
        );
        await card.getByRole("button", { name: "Quick preview" }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(
          card.getByRole("button", { name: "Quick preview" }),
        ).toBeFocused();
      }
      assert.match(await cards.nth(0).innerText(), /Hand-coded original/);
      assert.match(
        await cards.nth(0).innerText(),
        /tracking assets, checkout, returns, location transfers, maintenance, audits, and lifecycle history/,
      );
      assert.match(
        await cards.nth(2).innerText(),
        /requests.*billers.*savings goals.*cards.*activity.*statement export/s,
      );
      await page.close();
    },
  );
  await check(
    "Journey and cards remain readable at five widths in both themes",
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
          await page.evaluate((value) => {
            document.documentElement.dataset.theme = value;
          }, theme);
          await expect(page.locator("#experience h2")).toHaveText(
            "Experience & Education",
          );
          await expect(page.locator(".journey-column > h3")).toHaveText([
            "Education",
            "Experience",
            "Training",
          ]);
          assert.equal(await page.locator(".journey-entry").count(), 7);
          const journey = await page.locator("#experience").innerText();
          assert.match(journey, /Graduated 2020/);
          assert.match(journey, /July 6.*August 24, 2026/);
          assert.match(journey, /September 5, 2026/);
          assert.match(journey, /awaits issuance/);
          assert.match(
            journey,
            /not the AWS Certified Cloud Practitioner exam/,
          );
          assert.doesNotMatch(journey, /Spring Valley|Achievements|Hackathons/);
          assert.equal(
            await page.locator(".education-coursework li").count(),
            4,
          );
          for (const card of await page.locator(".project-card").all()) {
            await card.scrollIntoViewIfNeeded();
            await expect(card.locator(".tags")).toBeVisible();
            await expect(card.locator(".project-status-label")).toBeVisible();
          }
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            `${theme} ${width}px overflows`,
          );
          if ([1440, 390].includes(width)) {
            for (const section of [".hero", "#projects", "#experience"]) {
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
