import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validatePortfolio } from "./content-contract.mjs";

const source = JSON.parse(await readFile("src/data/portfolio.json", "utf8"));
test("accepts the confirmed portfolio", () =>
  assert.doesNotThrow(() => validatePortfolio(source)));
for (const [name, mutate] of [
  [
    "dangling screenshot reference",
    (data) => {
      const project = data.projects.find((item) => item.id === "arctic");
      project.gallery = project.gallery.slice(0, 1);
    },
  ],
  [
    "missing responsive image dimensions",
    (data) => {
      delete data.site.contactImage.sources[0].width;
    },
  ],
  [
    "empty gallery",
    (data) => {
      data.projects[0].gallery = [];
    },
  ],
  [
    "duplicate route",
    (data) => {
      data.projects[1].href = data.projects[0].href;
    },
  ],
  [
    "path traversal",
    (data) => {
      data.projects[0].href = "/projects/../../outside/";
    },
  ],
  [
    "script URL",
    (data) => {
      data.projects[0].sourceUrl = "javascript:alert(1)";
    },
  ],
  [
    "protocol-relative URL",
    (data) => {
      data.site.resumeUrl = "//untrusted.invalid/file.pdf";
    },
  ],
  [
    "unknown category",
    (data) => {
      data.stack[0].id = "unmapped";
    },
  ],
  [
    "missing dimensions",
    (data) => {
      delete data.projects[0].gallery[0].width;
    },
  ],
  [
    "unmapped next project",
    (data) => {
      data.projects[0].nextProjectId = "missing";
    },
  ],
]) {
  test(`rejects ${name}`, () => {
    const data = structuredClone(source);
    mutate(data);
    assert.throws(() => validatePortfolio(data));
  });
}
