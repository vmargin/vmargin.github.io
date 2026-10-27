import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";
import { validatePortfolio } from "./content-contract.mjs";

const source = JSON.parse(await readFile("src/data/portfolio.json", "utf8"));

test("all three projects provide a playable showcase and a lightweight poster", async () => {
  const data = validatePortfolio(source);
  for (const project of data.projects) {
    assert.ok(project.showcase, `${project.title} needs its showcase`);
    const { src, poster, width, height, durationSeconds, description } =
      project.showcase;
    assert.match(src, /^\/videos\/[a-z-]+\.mp4$/);
    assert.match(poster, /^\/images\/projects\/[a-z-]+\.webp$/);
    assert.equal(width / height, 16 / 9);
    assert.ok(durationSeconds > 0 && durationSeconds < 60);
    assert.ok(description.length > 30);
    assert.ok((await stat(`public${src}`)).size > 100_000);
    assert.ok((await stat(`public${poster}`)).size < 200_000);
  }
});

for (const [name, change] of [
  ["unsafe video URL", { src: "javascript:alert(1)" }],
  ["traversal in video URL", { src: "/videos/../../outside.mp4" }],
  ["missing poster", { poster: "" }],
  ["zero video dimensions", { width: 0 }],
  ["missing duration", { durationSeconds: 0 }],
]) {
  test(`rejects ${name}`, () => {
    const data = structuredClone(source);
    data.projects[0].showcase = {
      src: "/videos/assethub-showcase.mp4",
      poster: "/images/projects/assethub-showcase.webp",
      width: 1920,
      height: 1080,
      durationSeconds: 43.2,
      description:
        "Equipment search, checkout, maintenance, and workspace switching.",
      ...change,
    };
    assert.throws(() => validatePortfolio(data));
  });
}
