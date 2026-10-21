import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { createServer } from "vite";
import sharp from "sharp";
import { validatePortfolio } from "./content-contract.mjs";

const output = path.resolve("dist");
const data = validatePortfolio(
  JSON.parse(await readFile("src/data/portfolio.json", "utf8")),
);
const template = await readFile(path.join(output, "index.html"), "utf8");
const manifest = JSON.parse(
  await readFile(path.join(output, ".vite/manifest.json"), "utf8"),
);
const routes = ["/", ...data.projects.map((project) => project.href)];
const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

function replaceTag(html, selector, replacement) {
  const start = html.indexOf(selector);
  if (start < 0) throw new Error(`Missing metadata: ${selector}`);
  const tagStart = html.lastIndexOf("<", start);
  const tagEnd = html.indexOf(">", start);
  return html.slice(0, tagStart) + replacement + html.slice(tagEnd + 1);
}

function metadataHtml(html, metadata) {
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escape(metadata.title)}</title>`,
  );
  const entries = [
    ["name", "description", metadata.description],
    ["property", "og:title", metadata.title],
    ["property", "og:description", metadata.description],
    ["property", "og:url", metadata.url],
    ["property", "og:image", metadata.image],
    ["property", "og:image:alt", metadata.imageAlt],
    ["name", "twitter:title", metadata.title],
    ["name", "twitter:description", metadata.description],
    ["name", "twitter:image", metadata.image],
  ];
  for (const [attribute, key, value] of entries)
    html = replaceTag(
      html,
      `${attribute}="${key}"`,
      `<meta ${attribute}="${key}" content="${escape(value)}" />`,
    );
  html = replaceTag(
    html,
    'rel="canonical"',
    `<link rel="canonical" href="${escape(metadata.url)}" />`,
  );
  return html.replace(
    /<script id="portfolio-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="portfolio-structured-data" type="application/ld+json">${JSON.stringify(metadata.structuredData).replaceAll("<", "\\u003c")}</script>`,
  );
}

function routeStyles(entry, seen = new Set()) {
  if (seen.has(entry)) return [];
  seen.add(entry);
  const chunk = manifest[entry];
  if (!chunk) return [];
  return [
    ...(chunk.css ?? []),
    ...(chunk.imports ?? []).flatMap((dependency) =>
      routeStyles(dependency, seen),
    ),
  ];
}

for (const image of [
  ...data.projects.flatMap((project) => project.gallery),
  data.site.contactImage,
  ...data.site.contactImage.sources,
  ...Object.values(data.about.portraits),
  data.about.bulb,
]) {
  const file = path.resolve("public", image.src.slice(1));
  if (!file.startsWith(path.resolve("public") + path.sep))
    throw new Error("Image escapes public directory");
  const dimensions = await sharp(file).metadata();
  if (dimensions.width !== image.width || dimensions.height !== image.height)
    throw new Error(`Stale dimensions: ${image.src}`);
}
for (const file of [
  data.site.resumeUrl,
  data.site.portraitUrl,
  ...data.about.training.flatMap((item) =>
    item.credentialUrl ? [item.credentialUrl] : [],
  ),
])
  await readFile(path.join("public", file.slice(1)));

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  for (const route of routes) {
    const destination = path.resolve(output, "." + route, "index.html");
    if (!destination.startsWith(output + path.sep))
      throw new Error(`Unsafe output path: ${route}`);
    const result = render(route);
    let html = metadataHtml(template, result.metadata).replace(
      '<div id="root"></div>',
      `<div id="root">${result.html}</div>`,
    );
    const entry = route === "/" ? "src/App.tsx" : "src/ProjectCaseStudy.tsx";
    const styles = [...new Set(routeStyles(entry))]
      .map((file) => `<link rel="stylesheet" href="/${file}" />`)
      .join("\n");
    html = html.replace("</head>", styles + "\n</head>");
    if (!html.includes("<h1"))
      throw new Error(`Missing static content: ${route}`);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, html);
    console.log(`Prerendered ${route}`);
  }
} finally {
  await server.close();
}

await writeFile(
  path.join(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${escape(data.site.canonicalOrigin + route)}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  path.join(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${data.site.canonicalOrigin}/sitemap.xml\n`,
);
const initScript = [...template.matchAll(/<script>([\s\S]*?)<\/script>/g)]
  .map(
    (match) =>
      `'sha256-${createHash("sha256").update(match[1]).digest("base64")}'`,
  )
  .join(" ");
await writeFile(
  path.join(output, "_headers"),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' ${initScript}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'none'
/documents/*
  Content-Type: application/pdf
  Content-Disposition: inline
`,
);
await writeFile(
  path.join(output, "404.html"),
  template.replace(
    '<div id="root"></div>',
    '<div id="root"><main><h1>Page not found</h1><a href="/">Return to the portfolio</a></main></div>',
  ),
);
