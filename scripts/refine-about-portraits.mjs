import sharp from "sharp";

const width = 800;
const height = 1000;
const smoothstep = (low, high, value) => {
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)));
  return t * t * (3 - 2 * t);
};

// Flood only the connected backdrop, preserving similarly colored clothing.
function backdropMask(pixels, light) {
  const mask = Buffer.alloc(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;
  const visit = (index) => {
    if (mask[index]) return;
    const offset = index * 3;
    const rgb = pixels.subarray(offset, offset + 3);
    const min = Math.min(...rgb);
    const max = Math.max(...rgb);
    if (light ? min < 242 || max - min > 16 : max > 22 || max - min > 12)
      return;
    mask[index] = 255;
    queue[tail++] = index;
  };
  for (let x = 0; x < width; x++) visit(x);
  while (head < tail) {
    const index = queue[head++];
    const x = index % width;
    if (x > 0) visit(index - 1);
    if (x < width - 1) visit(index + 1);
    if (index >= width) visit(index - width);
    if (index < width * (height - 1)) visit(index + width);
  }
  return mask;
}

let darkBackdrop;
for (const light of [false, true]) {
  const source = light
    ? "about-portrait-white-original.png"
    : "about-portrait-original.png";
  const destination = light
    ? "about-portrait-white.webp"
    : "about-portrait.webp";
  const pixels = await sharp(`assets/source/portraits/${source}`)
    .resize(width, height, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer();
  const backdrop = backdropMask(pixels, light);
  if (!light) {
    darkBackdrop = await sharp(backdrop, {
      raw: { width, height, channels: 1 },
    })
      .blur(4)
      .extractChannel(0)
      .raw()
      .toBuffer();
  } else {
    // The matching dark portrait's silhouette protects bright sweater fibers.
    for (let index = 0; index < backdrop.length; index++) {
      if (darkBackdrop[index] <= 1) backdrop[index] = 0;
    }
  }
  const mask = await sharp(backdrop, {
    raw: { width, height, channels: 1 },
  })
    .blur(0.7)
    .extractChannel(0)
    .raw()
    .toBuffer();
  const background = light ? [216, 208, 196] : [32, 37, 43];
  const output = Buffer.alloc(pixels.length);
  for (let index = 0; index < width * height; index++) {
    const offset = index * 3;
    const rgb = Array.from(pixels.subarray(offset, offset + 3));
    const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    const y = Math.floor(index / width);
    const sweater = smoothstep(530, 700, y);
    const neutral = 1 - smoothstep(28, 65, Math.max(...rgb) - Math.min(...rgb));
    const orange = !light && rgb[0] > rgb[1] * 1.6 && rgb[0] - rgb[2] > 55;
    for (let channel = 0; channel < 3; channel++) {
      let value = rgb[channel];
      if (light) {
        value -= sweater * neutral * Math.max(0, value - 150) * 0.24;
      } else {
        value += sweater * neutral * 10 * (1 - smoothstep(15, 75, luminance));
        if (orange) value = (value * 0.9 + luminance * 0.1) * 0.98;
      }
      const alpha = mask[index] / 255;
      output[offset + channel] = Math.round(
        value * (1 - alpha) + background[channel] * alpha,
      );
    }
  }
  await sharp(output, { raw: { width, height, channels: 3 } })
    .webp({ quality: 94, effort: 6 })
    .toFile(`public/images/portraits/${destination}`);
  console.log(
    `Refine ${destination} with ${light ? "#D8D0C4" : "#20252B"} backdrop`,
  );
}
