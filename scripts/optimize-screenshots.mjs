/**
 * Optimize screenshot images:
 * - Convert PNG to WebP (quality 82, good balance of size vs fidelity)
 * - Resize to max 1440px wide (sufficient for retina marketing pages)
 * - Keep original PNGs as fallback
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sharp = require('../www/node_modules/sharp');
import { readdirSync, statSync } from 'fs';
import { join, parse } from 'path';

const SCREENSHOTS_DIR = 'www/public/images/screenshots';
const MAX_WIDTH = 1440;
const WEBP_QUALITY = 82;

const files = readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'));

console.log(`\nOptimizing ${files.length} screenshots...\n`);
console.log('File'.padEnd(25) + 'Original'.padEnd(12) + 'WebP'.padEnd(12) + 'Savings');
console.log('-'.repeat(60));

let totalOriginal = 0;
let totalWebp = 0;

for (const file of files) {
  const inputPath = join(SCREENSHOTS_DIR, file);
  const { name } = parse(file);
  const outputPath = join(SCREENSHOTS_DIR, `${name}.webp`);

  const originalSize = statSync(inputPath).size;
  totalOriginal += originalSize;

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputPath);

  const webpSize = statSync(outputPath).size;
  totalWebp += webpSize;

  const savings = ((1 - webpSize / originalSize) * 100).toFixed(0);
  console.log(
    file.padEnd(25) +
    `${(originalSize / 1024).toFixed(0)} KB`.padEnd(12) +
    `${(webpSize / 1024).toFixed(0)} KB`.padEnd(12) +
    `${savings}%`
  );
}

console.log('-'.repeat(60));
console.log(
  'TOTAL'.padEnd(25) +
  `${(totalOriginal / 1024).toFixed(0)} KB`.padEnd(12) +
  `${(totalWebp / 1024).toFixed(0)} KB`.padEnd(12) +
  `${((1 - totalWebp / totalOriginal) * 100).toFixed(0)}%`
);
console.log('\nDone! WebP files created alongside originals.');
