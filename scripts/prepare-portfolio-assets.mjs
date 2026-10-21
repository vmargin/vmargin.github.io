import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const source = "assets/source/portraits";
await mkdir("public/images/portraits", { recursive: true });
for (const [name, width] of [
  ["hero-formal", 850],
  ["about-portrait", 800],
  ["about-portrait-white", 800],
]) {
  await sharp(`${source}/${name}-original.png`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100 })
    .toFile(`public/images/portraits/${name}.webp`);
}
await mkdir("public/images/controls", { recursive: true });
await sharp("assets/source/controls/theme-bulb-original.png")
  .trim()
  .resize(96, 96, { fit: "contain", background: "#00000000" })
  .webp({ lossless: true })
  .toFile("public/images/controls/theme-bulb.webp");
const file = "src/data/portfolio.json";
for (const width of [660, 1080, 1800, 2700]) {
  await sharp("assets/source/landscape/contact-landscape-original.jpg")
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(`public/images/contact-landscape-${width}.webp`);
}
const data = JSON.parse(await readFile(file, "utf8"));
for (const project of data.projects) {
  for (const image of project.gallery) {
    const metadata = await sharp(`public${image.src}`).metadata();
    image.width = metadata.width;
    image.height = metadata.height;
  }
}
await writeFile(file, JSON.stringify(data, null, 2) + "\n");
