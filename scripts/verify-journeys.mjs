import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { expect } from "playwright/test";

const data = JSON.parse(await readFile("src/data/portfolio.json", "utf8"));
const canonicalOrigin =
  process.env.PORTFOLIO_CANONICAL_ORIGIN || data.site.canonicalOrigin;
const siteName = process.env.PORTFOLIO_SITE_NAME || data.site.displayName;
const routes = ["/", ...data.projects.map((item) => item.href)];
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

async function verifyPdfPopup(popup) {
  await popup.waitForURL("**/*.pdf", { waitUntil: "commit" });
  const isViewer = (frame) =>
    frame.url().startsWith("chrome-extension://") &&
    frame.url().endsWith("/index.html");
  const viewer =
    popup.frames().find(isViewer) ??
    (await popup.waitForEvent("framenavigated", { predicate: isViewer }));
  const plugin = viewer.locator("embed");
  await plugin.waitFor({ state: "visible", timeout: 10000 });
  assert.match(await plugin.getAttribute("type"), /pdf/);
  await popup.waitForTimeout(400);
  return {
    url: popup.url(),
    viewerFrame: viewer.url(),
    pluginType: await plugin.getAttribute("type"),
  };
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (
      let position = 0;
      position < document.documentElement.scrollHeight;
      position += innerHeight * 0.8
    ) {
      scrollTo({ top: position, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
    await Promise.all(
      [...document.images].map((image) =>
        image.decode().catch(() => undefined),
      ),
    );
    scrollTo({ top: 0, behavior: "instant" });
  });
}

export async function verifyJourneys({ browser, base, evidence, check }) {
  const observations = [];
  for (const width of [1440, 390, 320]) {
    for (const theme of ["dark", "light"]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
      });
      await context.addInitScript(
        (value) => localStorage.setItem("v6-theme", value),
        theme,
      );
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      for (const route of routes) {
        await check(`Route ${route} at ${width}px, ${theme}`, async () => {
          errors.length = 0;
          const response = await page.goto(base + route, {
            waitUntil: "networkidle",
          });
          assert.equal(response.status(), 200);
          await scrollPage(page);
          assert.equal(await page.locator("h1").count(), 1);
          assert.equal(
            await page.locator("html").getAttribute("data-theme"),
            theme,
          );
          assert.equal(
            await page.locator('link[rel="canonical"]').getAttribute("href"),
            canonicalOrigin + route,
          );
          const project = data.projects.find((item) => item.href === route);
          assert.equal(
            await page.title(),
            project
              ? `${project.title} | ${siteName}`
              : data.site.title.replace(data.site.displayName, siteName),
          );
          assert.equal(
            await page
              .locator('meta[property="og:image"]')
              .getAttribute("content"),
            await page
              .locator('meta[name="twitter:image"]')
              .getAttribute("content"),
          );
          const geometry = await page.evaluate(() => ({
            width: innerWidth,
            document: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight,
            toolkit: document.querySelector("#stack")?.getBoundingClientRect()
              .height,
            brokenImages: [...document.images]
              .filter((image) => !image.complete || !image.naturalWidth)
              .map((image) => image.src),
            unreserved: [...document.images]
              .filter(
                (image) =>
                  !image.getAttribute("width") || !image.getAttribute("height"),
              )
              .map((image) => image.src),
            resources: performance
              .getEntriesByType("resource")
              .filter((entry) => entry.name.endsWith(".js"))
              .map((entry) => ({
                name: new URL(entry.name).pathname,
                encodedBodySize: entry.encodedBodySize,
              })),
            skip: document
              .querySelector(".skip-link, .case-skip-link")
              ?.getBoundingClientRect().bottom,
          }));
          observations.push({
            route,
            width,
            theme,
            ...geometry,
            errors: [...errors],
          });
          assert.ok(geometry.document <= width, JSON.stringify(geometry));
          assert.deepEqual(geometry.brokenImages, []);
          assert.deepEqual(geometry.unreserved, []);
          assert.ok(geometry.skip <= 0, "Unfocused skip link is hidden");
          assert.deepEqual(errors, [], "No page or hydration errors");
          if (project)
            assert.ok(
              !geometry.resources.some((item) =>
                /\/(App-|portfolioMotion-)/.test(item.name),
              ),
              "Case studies omit home and motion scripts",
            );
          else {
            const sizes = await page
              .locator(
                ".project-role-summary, .hero .button, .toolkit-items li",
              )
              .evaluateAll((elements) =>
                elements.map((element) =>
                  parseFloat(getComputedStyle(element).fontSize),
                ),
              );
            assert.ok(
              sizes.every((size) => size >= 14),
              `Supporting text sizes: ${sizes}`,
            );
          }
          const name = route === "/" ? "home" : project.id;
          await page.screenshot({
            path: `${evidence}/verified-${name}-${width}-${theme}.png`,
            fullPage: true,
            animations: "disabled",
          });
        });
      }
      await context.close();
    }
  }

  for (const width of [768, 1023, 1024]) {
    await check(`Navigation boundary at ${width}px`, async () => {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(base);
      assert.equal(
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .isVisible(),
        width < 1024,
      );
      assert.equal(
        await page.locator(".desktop-nav").isVisible(),
        width >= 1024,
      );
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      );
      if (width < 1024) {
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .click();
        await page
          .locator("#mobile-navigation")
          .getByRole("link", { name: "Experience", exact: true })
          .click();
        await page.waitForTimeout(80);
        assert.equal(
          await page.evaluate(() => document.activeElement.id),
          "experience",
        );
      }
      await page.screenshot({
        path: `${evidence}/navigation-${width}.png`,
        animations: "disabled",
      });
      await page.close();
    });
  }

  for (const width of [1440, 390, 320]) {
    for (const theme of ["dark", "light"]) {
      await check(
        `All filters, previews, and galleries at ${width}px, ${theme}`,
        async () => {
          const context = await browser.newContext({
            viewport: { width, height: 900 },
          });
          await context.addInitScript(
            (value) => localStorage.setItem("v6-theme", value),
            theme,
          );
          const page = await context.newPage();
          let downloads = 0;
          page.on("download", () => downloads++);
          await page.goto(base, { waitUntil: "networkidle" });
          await page
            .getByRole("button", { name: "Show all technologies", exact: true })
            .click();
          assert.equal(
            await page
              .locator('.toolkit-panel[data-state="active"] .toolkit-items li')
              .count(),
            data.stack.reduce((count, group) => count + group.items.length, 0),
          );
          await page
            .getByRole("button", {
              name: "Show core technologies",
              exact: true,
            })
            .click();
          assert.equal(
            await page
              .locator('.toolkit-panel[data-state="active"] .toolkit-items li')
              .count(),
            data.stack.reduce(
              (count, group) => count + Math.min(group.items.length, 3),
              0,
            ),
          );
          for (const group of data.stack) {
            await page
              .getByRole("tab", { name: group.title, exact: true })
              .click();
            assert.equal(
              await page
                .getByRole("tab", { name: group.title, exact: true })
                .getAttribute("aria-selected"),
              "true",
            );
            assert.equal(
              await page
                .locator(
                  '.toolkit-panel[data-state="active"] .toolkit-items li',
                )
                .count(),
              group.items.length,
            );
          }
          await page.getByRole("tab", { name: "All", exact: true }).click();
          await page.getByRole("tab", { name: "All", exact: true }).focus();
          await page.keyboard.press("ArrowRight");
          await page.waitForFunction(
            () =>
              document.querySelector('[role="tab"][aria-selected="true"]')
                ?.textContent === "Languages",
          );
          assert.equal(
            await page
              .getByRole("tab", { name: "Languages", exact: true })
              .getAttribute("aria-selected"),
            "true",
          );
          assert.ok(
            await page
              .getByRole("tab", { name: "Languages", exact: true })
              .evaluate((element) => element.matches(":focus-visible")),
          );
          const triggers = page.getByRole("button", {
            name: "Quick preview",
            exact: true,
          });
          for (let index = 0; index < data.projects.length; index++) {
            const trigger = triggers.nth(index);
            await trigger.click();
            const dialog = page.getByRole("dialog");
            assert.equal(
              await dialog.getByRole("heading", { level: 2 }).innerText(),
              data.projects[index].title,
            );
            assert.equal(
              await page.evaluate(() =>
                document.activeElement.getAttribute("aria-label"),
              ),
              "Close project preview",
            );
            for (let tab = 0; tab < 5; tab++) {
              await page.keyboard.press("Tab");
              assert.ok(
                await page.evaluate(
                  () =>
                    !document.hasFocus() ||
                    !!document.activeElement.closest("dialog"),
                ),
                "Preview contains page focus; browser chrome remains reachable",
              );
            }
            assert.equal(
              await dialog
                .getByRole("link", { name: "Read the full case study" })
                .getAttribute("href"),
              data.projects[index].href,
            );
            if (index === 0) await page.keyboard.press("Escape");
            else if (index === 1)
              await dialog
                .getByRole("button", { name: "Close project preview" })
                .click();
            else await page.mouse.click(1, 1);
            await dialog.waitFor({ state: "detached" });
            await expect(trigger).toBeFocused();
          }
          for (const project of data.projects) {
            await page.goto(base + project.href, { waitUntil: "networkidle" });
            const buttons = page.getByRole("button", {
              name: /^Enlarge screenshot:/,
            });
            assert.equal(await buttons.count(), 3);
            for (let index = 0; index < 3; index++) {
              await buttons.nth(index).click();
              const dialog = page.getByRole("dialog");
              assert.equal(
                await page.evaluate(() =>
                  document.activeElement.getAttribute("aria-label"),
                ),
                "Close screenshot",
              );
              await dialog.locator("img").evaluate((image) => image.decode());
              assert.equal(
                await dialog.locator("img").getAttribute("src"),
                project.gallery[index].src,
              );
              await dialog
                .getByRole("button", {
                  name: "View original size",
                  exact: true,
                })
                .click();
              assert.ok(
                await dialog
                  .locator(".viewer-image")
                  .evaluate(
                    (element) => element.scrollWidth >= element.clientWidth,
                  ),
              );
              for (let tab = 0; tab < 5; tab++) {
                await page.keyboard.press("Tab");
                assert.ok(
                  await page.evaluate(
                    () =>
                      !document.hasFocus() ||
                      !!document.activeElement.closest("dialog"),
                  ),
                  "Image viewer contains page focus",
                );
              }
              await dialog
                .getByRole("button", { name: "Fit to screen", exact: true })
                .click();
              if (index === 0)
                await dialog.screenshot({
                  path: `${evidence}/viewer-${project.id}-${width}-${theme}.png`,
                  animations: "disabled",
                });
              await page.keyboard.press("Escape");
              await dialog.waitFor({ state: "detached" });
              await expect(buttons.nth(index)).toBeFocused();
              assert.notEqual(
                await page.evaluate(() => document.body.style.overflow),
                "hidden",
              );
            }
          }
          assert.equal(downloads, 0, "Gallery viewing never downloads images");
          await context.close();
        },
      );
    }
  }

  await check(
    "Theme and motion controls persist across every route",
    async () => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(base);
      await page
        .getByRole("button", { name: "Light theme", exact: true })
        .click();
      await page
        .getByRole("button", {
          name: "Motion on. Pause animations",
          exact: true,
        })
        .click();
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "networkidle" });
        assert.equal(
          await page.locator("html").getAttribute("data-theme"),
          "light",
        );
        assert.equal(
          await page.locator("html").getAttribute("data-motion"),
          "reduced",
        );
        assert.equal(
          await page.evaluate(
            () => getComputedStyle(document.documentElement).scrollBehavior,
          ),
          "auto",
        );
        assert.ok(
          !(await page.evaluate(() =>
            performance
              .getEntriesByType("resource")
              .some((item) => item.name.includes("portfolioMotion-")),
          )),
        );
      }
      await page
        .getByRole("button", {
          name: "Motion paused. Enable animations",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", { name: "Dark theme", exact: true })
        .click();
      await page.goto(base, { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-motion"),
        "full",
      );
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "dark",
      );
      await context.close();
    },
  );

  await check(
    "System reduced motion applies on all direct routes",
    async () => {
      const context = await browser.newContext({ reducedMotion: "reduce" });
      const page = await context.newPage();
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "networkidle" });
        assert.equal(
          await page.locator("html").getAttribute("data-motion"),
          "reduced",
        );
        assert.ok(
          await page
            .getByRole("button", {
              name: "Reduced motion follows your system preference",
            })
            .isDisabled(),
        );
        assert.equal(
          await page.evaluate(
            () =>
              document
                .getAnimations()
                .filter((animation) => animation.playState === "running")
                .length,
          ),
          0,
        );
        assert.ok(
          !(await page.evaluate(() =>
            performance
              .getEntriesByType("resource")
              .some((item) => item.name.includes("portfolioMotion-")),
          )),
        );
      }
      await context.close();
    },
  );

  await check(
    "Copy email success and permission failure give usable feedback",
    async () => {
      const context = await browser.newContext({
        permissions: ["clipboard-read", "clipboard-write"],
      });
      const page = await context.newPage();
      await page.goto(base);
      await page
        .getByRole("button", { name: "Copy email address", exact: true })
        .click();
      await expect(page.locator(".copy-feedback")).toHaveText(
        "Email address copied to clipboard.",
      );
      assert.equal(
        await page.evaluate(() => navigator.clipboard.readText()),
        data.site.email,
      );
      await page.screenshot({ path: `${evidence}/copy-success.png` });
      await page.addInitScript(() => {
        Object.defineProperty(navigator.clipboard, "writeText", {
          value: () =>
            Promise.reject(
              new DOMException("Permission denied", "NotAllowedError"),
            ),
        });
      });
      await page.reload();
      await page
        .getByRole("button", { name: "Copy email address", exact: true })
        .click();
      await expect(page.locator(".copy-feedback")).toHaveText(
        /Copy unavailable/,
      );
      assert.equal(
        await page
          .locator(".contact-value[href^='mailto:']")
          .getAttribute("href"),
        `mailto:${data.site.email}`,
      );
      await page.screenshot({ path: `${evidence}/copy-denied.png` });
      await context.close();
    },
  );

  await check(
    "Every visible resume CTA and AWS action actually open the PDF viewer",
    async () => {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 1000 },
      });
      const page = await context.newPage();
      const documents = [];
      let downloads = 0;
      context.on("page", (opened) => opened.on("download", () => downloads++));
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "networkidle" });
        const links = page.locator(`a[href="${data.site.resumeUrl}"]:visible`);
        assert.ok((await links.count()) > 0);
        for (let index = 0; index < (await links.count()); index++) {
          const link = links.nth(index);
          const expectedLabel = await link.evaluate((element) =>
            element.closest("nav") ? "Resume" : "View Resume",
          );
          assert.equal((await link.innerText()).trim(), expectedLabel);
          assert.equal(await link.getAttribute("download"), null);
          const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            link.click(),
          ]);
          const viewing = await verifyPdfPopup(popup);
          documents.push({
            route,
            label: (await link.innerText()).trim(),
            ...viewing,
          });
          if (documents.length === 1)
            await popup.screenshot({
              path: `${evidence}/resume-browser-viewer.png`,
            });
          await popup.close();
        }
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(base);
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      const [mobileResume] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .locator("#mobile-navigation")
          .getByRole("link", { name: "Resume", exact: true })
          .click(),
      ]);
      const mobileViewing = await verifyPdfPopup(mobileResume);
      documents.push({
        route: "/",
        label: "Mobile navigation Resume",
        ...mobileViewing,
      });
      await mobileResume.close();
      const [certificate] = await Promise.all([
        page.waitForEvent("popup"),
        page
          .getByRole("link", { name: "View course completion", exact: true })
          .click(),
      ]);
      const certificateViewing = await verifyPdfPopup(certificate);
      documents.push({
        route: "/#experience",
        label: "AWS completion",
        ...certificateViewing,
      });
      await certificate.screenshot({
        path: `${evidence}/aws-browser-viewer.png`,
      });
      await certificate.close();
      assert.equal(downloads, 0);
      const resumeResponse = await fetch(base + data.site.resumeUrl);
      assert.match(
        resumeResponse.headers.get("content-type"),
        /application\/pdf/,
      );
      assert.doesNotMatch(
        resumeResponse.headers.get("content-disposition") || "",
        /attachment/,
      );
      const resumeBytes = Buffer.from(await resumeResponse.arrayBuffer());
      // Digests come from the supplied originals, recorded in docs/evidence-sources.md.
      assert.equal(
        hash(resumeBytes),
        "bade4049a4b7be0f0272659151f20f3c769f44cf90a010d6f74edb86a3f4361d",
      );
      const awsResponse = await fetch(
        base + "/documents/aws-cloud-quest-completion.pdf",
      );
      assert.equal(awsResponse.status, 200);
      assert.equal(
        hash(Buffer.from(await awsResponse.arrayBuffer())),
        "af0a095b69bec81f41ab9e534c6dc072476a5b2398eb4c2da59faf136a7d9a36",
      );
      await writeFile(
        `${evidence}/documents.json`,
        JSON.stringify(
          {
            documents,
            downloads,
            resumeSha256: hash(resumeBytes),
            awsContentType: awsResponse.headers.get("content-type"),
          },
          null,
          2,
        ),
      );
      await context.close();
    },
  );

  await check(
    "Portrait alpha, static rendering, and discovery files",
    async () => {
      const portrait = await sharp(
        "public/images/portraits/hero-formal.webp",
      ).metadata();
      assert.equal(portrait.hasAlpha, true);
      const alpha = (
        await sharp("public/images/portraits/hero-formal.webp").stats()
      ).channels[3];
      assert.equal(alpha.min, 0);
      assert.equal(alpha.max, 255);
      assert.equal(
        (await sharp("public/images/portraits/about-portrait.webp").metadata())
          .hasAlpha,
        false,
      );
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      for (const route of routes) {
        await page.goto(base + route);
        assert.ok(await page.locator("h1").isVisible());
        assert.ok((await page.locator("main").innerText()).length > 500);
        assert.equal(
          (await page.locator(`a[href="${data.site.resumeUrl}"]`).count()) > 0,
          true,
        );
      }
      await context.close();
      const sitemap = await fetch(base + "/sitemap.xml");
      assert.equal(sitemap.status, 200);
      assert.equal((await sitemap.text()).match(/<loc>/g).length, 4);
      assert.ok(
        (await (await fetch(base + "/robots.txt")).text()).includes(
          `Sitemap: ${canonicalOrigin}/sitemap.xml`,
        ),
      );
      assert.match(
        await readFile("dist/_headers", "utf8"),
        /Content-Security-Policy-Report-Only:/,
      );
    },
  );
  await check(
    "Full-study links, next projects, and home destinations navigate",
    async () => {
      const page = await browser.newPage({
        viewport: { width: 390, height: 900 },
      });
      for (let index = 0; index < data.projects.length; index++) {
        await page.goto(base);
        await page
          .getByRole("button", { name: "Quick preview", exact: true })
          .nth(index)
          .click();
        await page
          .getByRole("dialog")
          .getByRole("link", { name: "Read the full case study" })
          .click();
        await page.waitForURL(base + data.projects[index].href);
        assert.equal(
          await page.locator("h1").innerText(),
          data.projects[index].title,
        );
        const next = data.projects.find(
          (item) => item.id === data.projects[index].nextProjectId,
        );
        await page
          .getByRole("link", { name: `Next: ${next.title}`, exact: true })
          .click();
        await page.waitForURL(base + next.href);
        assert.equal(await page.locator("h1").innerText(), next.title);
        await page
          .getByRole("link", { name: "All projects", exact: true })
          .click();
        await page.waitForURL(base + "/#projects");
      }
      for (const destination of [
        "Projects",
        "About",
        "Stack",
        "Experience",
        "Contact",
      ]) {
        await page
          .getByRole("button", { name: "Open menu", exact: true })
          .click();
        const link = page
          .locator("#mobile-navigation")
          .getByRole("link", { name: destination, exact: true });
        const target = await link.getAttribute("href");
        await link.click();
        await expect(page.locator(target)).toBeFocused();
      }
      await page.goto(base + "/missing-project/");
      await expect(page.locator("h1")).toHaveText("Page not found");
      await page.close();
    },
  );

  await check(
    "Dot field responds, settles, and stays static when paused",
    async () => {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
      });
      await page.goto(base, { waitUntil: "networkidle" });
      const pixels = () =>
        page
          .locator(".ambient-background canvas")
          .evaluate((canvas) => canvas.toDataURL());
      const initial = await pixels();
      await page.mouse.move(400, 250);
      await page.waitForTimeout(25);
      assert.notEqual(await pixels(), initial);
      await page.waitForTimeout(800);
      const settled = await pixels();
      await page.waitForTimeout(150);
      assert.equal(await pixels(), settled);
      await page
        .getByRole("button", {
          name: "Motion on. Pause animations",
          exact: true,
        })
        .click();
      await expect(
        page.getByRole("button", {
          name: "Motion paused. Enable animations",
          exact: true,
        }),
      ).toBeVisible();
      const paused = await pixels();
      await page.mouse.move(600, 300);
      await page.waitForTimeout(150);
      assert.equal(await pixels(), paused);
      await page.close();
    },
  );

  await check(
    "Static text contrast, identifiers, and ARIA references",
    async () => {
      const contrast = [];
      const rgb = (hex) =>
        [0, 2, 4].map((offset) =>
          parseInt(hex.replace("#", "").slice(offset, offset + 2), 16),
        );
      const luminance = (color) =>
        color
          .map((channel) => channel / 255)
          .map((channel) =>
            channel <= 0.04045
              ? channel / 12.92
              : ((channel + 0.055) / 1.055) ** 2.4,
          )
          .reduce(
            (value, channel, index) =>
              value + channel * [0.2126, 0.7152, 0.0722][index],
            0,
          );
      const ratio = (foreground, background) => {
        const first = luminance(foreground);
        const second = luminance(background);
        return (
          (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
        );
      };
      for (const theme of ["dark", "light"]) {
        const context = await browser.newContext();
        await context.addInitScript(
          (value) => localStorage.setItem("v6-theme", value),
          theme,
        );
        const page = await context.newPage();
        for (const route of routes) {
          await page.goto(base + route, { waitUntil: "networkidle" });
          const structure = await page.evaluate(() => {
            const ids = [...document.querySelectorAll("[id]")].map(
              (element) => element.id,
            );
            const references = [
              ...document.querySelectorAll(
                "[aria-labelledby], [aria-controls]",
              ),
            ].flatMap((element) =>
              [
                element.getAttribute("aria-labelledby"),
                element.getAttribute("aria-controls"),
              ]
                .filter(Boolean)
                .flatMap((value) => value.split(/\s+/)),
            );
            return {
              duplicateIds: ids.filter(
                (id, index) => ids.indexOf(id) !== index,
              ),
              missingReferences: references.filter(
                (id) => !document.getElementById(id),
              ),
            };
          });
          assert.deepEqual(structure, {
            duplicateIds: [],
            missingReferences: [],
          });
        }
        const tokens = await page.evaluate(() => {
          const style = getComputedStyle(document.documentElement);
          return Object.fromEntries(
            [
              "ink",
              "paper",
              "muted",
              "text-secondary",
              "accent",
              "button-primary-bg",
              "button-primary-text",
              "photo-backing",
              "photo-text",
              "photo-secondary",
            ].map((name) => [name, style.getPropertyValue(`--${name}`).trim()]),
          );
        });
        for (const foreground of [
          "paper",
          "muted",
          "text-secondary",
          "accent",
        ]) {
          const value = ratio(rgb(tokens[foreground]), rgb(tokens.ink));
          contrast.push({ theme, foreground, background: "ink", ratio: value });
          assert.ok(value >= 4.5, `${theme} ${foreground}: ${value}`);
        }
        assert.ok(
          ratio(
            rgb(tokens["button-primary-text"]),
            rgb(tokens["button-primary-bg"]),
          ) >= 4.5,
        );
        const opacity = parseInt(tokens["photo-backing"].slice(-2), 16) / 255;
        for (const channel of [0, 255]) {
          const backing = rgb(tokens["photo-backing"]).map(
            (value) => value * opacity + channel * (1 - opacity),
          );
          for (const foreground of ["photo-text", "photo-secondary"]) {
            const value = ratio(rgb(tokens[foreground]), backing);
            contrast.push({
              theme,
              foreground,
              background: `photo backing over ${channel}`,
              ratio: value,
            });
            assert.ok(value >= 4.5);
          }
        }
        await context.close();
      }
      await writeFile(
        `${evidence}/contrast-observations.json`,
        JSON.stringify(contrast, null, 2),
      );
    },
  );
  await writeFile(
    `${evidence}/route-observations.json`,
    JSON.stringify(observations, null, 2),
  );
}
