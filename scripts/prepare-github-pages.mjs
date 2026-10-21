import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { validatePortfolio } from "./content-contract.mjs";

const root = path.resolve("dist");
const config = validatePortfolio(
  JSON.parse(await readFile("src/data/portfolio.json", "utf8")),
);
const target = new URL("https://vmargin.github.io");
if (
  target.protocol !== "https:" ||
  target.username ||
  target.password ||
  target.pathname !== "/" ||
  target.search ||
  target.hash
)
  throw new Error("GitHub Pages origin must be an HTTPS site root");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) => {
        const filename = path.resolve(directory, entry.name);
        if (!filename.startsWith(root + path.sep))
          throw new Error("GitHub Pages output escapes dist");
        return entry.isDirectory() ? walk(filename) : [filename];
      }),
    )
  ).flat();
}

const files = (await walk(root)).filter((filename) =>
  /\.(html|xml|txt)$/.test(filename),
);
if (files.length < 7)
  throw new Error("Build output is missing prerendered site routes");
for (const filename of files) {
  let content = await readFile(filename, "utf8");
  content = content.replaceAll(config.site.canonicalOrigin, target.origin);
  if (filename.endsWith(".html")) {
    content = content.replaceAll(
      `${config.site.displayName} | Software Developer`,
      "Valk | Software Developer",
    );
    content = content.replaceAll(` | ${config.site.displayName}`, " | Valk");
    if (!content.includes('<meta name="portfolio-site-name"'))
      content = content.replace(
        "<head>",
        '<head>\n    <meta name="portfolio-site-name" content="Valk" />',
      );
    if (!content.includes('<meta name="portfolio-site-name" content="Valk"'))
      throw new Error(`Valk site name metadata is missing: ${filename}`);
    if (content.includes(config.site.canonicalOrigin))
      throw new Error(`Old canonical origin remains: ${filename}`);
    if (!content.includes(`<link rel="canonical" href="${target.origin}/`))
      throw new Error(`GitHub Pages canonical URL is missing: ${filename}`);
  }
  await writeFile(filename, content);
}
console.log(
  `Prepared ${files.length} HTML/XML/text files for ${target.origin} as Valk.`,
);
