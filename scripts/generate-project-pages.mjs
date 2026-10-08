import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");
const data = JSON.parse(
  await readFile(path.join(root, "src", "data", "portfolio.json"), "utf8"),
);
const template = await readFile(path.join(output, "index.html"), "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceTag(html, selector, replacement) {
  const start = html.indexOf(selector);
  if (start < 0) throw new Error("Missing metadata selector: " + selector);
  const tagStart = html.lastIndexOf("<", start);
  const tagEnd = html.indexOf(">", start);
  if (tagStart < 0 || tagEnd < 0) {
    throw new Error("Malformed metadata tag: " + selector);
  }
  return html.slice(0, tagStart) + replacement + html.slice(tagEnd + 1);
}

function meta(attribute, key, content) {
  return (
    "<meta " +
    attribute +
    '="' +
    escapeHtml(key) +
    '" content="' +
    escapeHtml(content) +
    '" />'
  );
}

function link(attribute, key, href) {
  return (
    "<link " +
    attribute +
    '="' +
    escapeHtml(key) +
    '" href="' +
    escapeHtml(href) +
    '" />'
  );
}

function createProjectHtml(project) {
  const title = project.title + " | " + data.site.displayName;
  const description = project.summary;
  const url = data.site.canonicalOrigin + project.href;
  const image = data.site.canonicalOrigin + project.cover;
  const imageAlt = project.gallery[0].alt;
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    "<title>" + escapeHtml(title) + "</title>",
  );

  html = replaceTag(
    html,
    'name="description"',
    meta("name", "description", description),
  );
  html = replaceTag(
    html,
    'property="og:title"',
    meta("property", "og:title", title),
  );
  html = replaceTag(
    html,
    'property="og:description"',
    meta("property", "og:description", description),
  );
  html = replaceTag(html, 'property="og:url"', meta("property", "og:url", url));
  html = replaceTag(
    html,
    'property="og:image"',
    meta("property", "og:image", image),
  );
  html = replaceTag(
    html,
    'property="og:image:alt"',
    meta("property", "og:image:alt", imageAlt),
  );
  html = replaceTag(
    html,
    'name="twitter:title"',
    meta("name", "twitter:title", title),
  );
  html = replaceTag(
    html,
    'name="twitter:description"',
    meta("name", "twitter:description", description),
  );
  html = replaceTag(
    html,
    'name="twitter:image"',
    meta("name", "twitter:image", image),
  );
  html = replaceTag(html, 'rel="canonical"', link("rel", "canonical", url));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    image,
    about: {
      "@type": "CreativeWork",
      name: project.title,
      description,
    },
  };
  html = html.replace(
    /<script id="portfolio-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    '<script id="portfolio-structured-data" type="application/ld+json">' +
      JSON.stringify(structuredData).replaceAll("<", "\\u003c") +
      "</script>",
  );
  return html;
}

for (const project of data.projects) {
  const route = new URL(project.href, "https://portfolio.invalid");
  const segments = route.pathname.split("/").filter(Boolean);
  const destination = path.join(output, ...segments, "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, createProjectHtml(project), "utf8");
  console.log("Generated " + route.pathname);
}
