import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const [hero, contact, portrait] = process.argv.slice(2);
if (!hero || !contact || !portrait)
  throw new Error(
    "Usage: node scripts/prepare-images.mjs <hero-source> <contact-source> <portrait-source>",
  );
await mkdir("public/images", { recursive: true });
for (const [source, name, width] of [
  [hero, "hero-cinematic", 1920],
  [contact, "contact-cinematic", 1920],
  [portrait, "antipolo-original", 1200],
]) {
  const result = await sharp(source)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(`public/images/${name}.webp`);
  console.log(
    `${name}: ${result.width}x${result.height}, ${Math.round(result.size / 1024)} KB`,
  );
}
console.log(
  "The original photograph remains unchanged. Replace project-generated images only through this script and an explicit source image.",
);
