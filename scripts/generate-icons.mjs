// Regenerates the raster icons from src/app/icon.svg.
//   npm run icons
// Outputs:
//   src/app/favicon.ico     16/32/48 px (PNG-in-ICO, for browsers that ask for /favicon.ico)
//   src/app/apple-icon.png  180 px, square full-bleed (iOS rounds the corners itself)

import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile("src/app/icon.svg", "utf8");

// favicon.ico: an ICO container holding PNG images.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(Buffer.from(svg), { density: 384 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); // width
  e.writeUInt8(s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

// apple-icon.png: same artwork on a square background (no circle clip).
const square = svg
  .replace(/<clipPath[\s\S]*?<\/clipPath>/, "")
  .replace(' clip-path="url(#b)"', "");
await sharp(Buffer.from(square), { density: 576 }).resize(180, 180).png().toFile("src/app/apple-icon.png");

console.log("Wrote src/app/favicon.ico and src/app/apple-icon.png");
