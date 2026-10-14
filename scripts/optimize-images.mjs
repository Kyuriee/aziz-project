// Convert + compress foto mentah jadi WebP siap web.
//
//   npm install
//   npm run images              -> semua folder di assets-src/
//   npm run images -- fitnation -> satu brand saja
//
// Taruh foto mentah di assets-src/<slug-brand>/ (jpg, png, webp, tiff, avif; HEIC dari iPhone ekspor ke JPG dulu).
// File bernama hero.* jadi cover (hero.webp); sisanya diberi nomor 01, 02, ... sesuai urutan nama file.
// Hasil: public/work/<slug-brand>/*.webp, sisi terpanjang maks 2000px, EXIF diputar otomatis, metadata dibuang.
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_EDGE = 2000;
const QUALITY = 80;
const SOURCE = path.resolve("assets-src");
const IMAGE = /\.(jpe?g|png|webp|tiff?|avif)$/i;

const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true });

async function listBrandFolders() {
  const entries = await readdir(SOURCE, { withFileTypes: true }).catch(() => null);
  if (!entries) {
    console.error("Folder assets-src/ belum ada. Buat assets-src/<slug-brand>/ lalu isi dengan foto mentah.");
    process.exit(1);
  }
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function optimizeBrand(slug) {
  const files = (await readdir(path.join(SOURCE, slug))).filter((f) => IMAGE.test(f)).sort(byName);
  if (!files.length) return console.log(`${slug}: tidak ada foto, dilewati`);

  const outDir = path.resolve("public/work", slug);
  await mkdir(outDir, { recursive: true });

  const rows = [];
  let count = 0;
  for (const file of files) {
    const name = /^hero\./i.test(file) ? "hero" : String(++count).padStart(2, "0");
    const { width, height, size } = await sharp(path.join(SOURCE, slug, file))
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${name}.webp`));

    rows.push(`["${name}", ${width}, ${height}]`);
    console.log(`${slug}/${name}.webp  ${width}x${height}  ${Math.round(size / 1024)} KB`);
  }

  // Baris siap tempel ke `brands` di data/site.js
  console.log(`\nshots("${slug}", "<Nama Brand>", [${rows.join(", ")}])\n`);
}

const only = process.argv[2];
for (const slug of only ? [only] : await listBrandFolders()) await optimizeBrand(slug);
