/**
 * Regenerates the favicons / app icons from the raster brand logo.
 *
 *   node scripts/generate-icons.mjs
 *
 * Sourced from `public/images/logo-color.webp`, not the SVG: the SVG builds
 * the badge's hollow centre with a luminance mask, which many rasterizers
 * ignore — that's how the old icons ended up with a solid black centre.
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const pub = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url))
const SOURCE = pub('images/logo-color.webp')
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

const meta = await sharp(SOURCE).metadata()
console.log(`source ${meta.width}x${meta.height}, alpha: ${meta.hasAlpha}`)

// Crop the source's wide margins so the badge fills small icons.
const trimmed = await sharp(SOURCE).trim().png().toBuffer()

/** Square PNG of `size`, logo inset by `pad` (fraction of size). */
function icon(size, { pad = 0.06, background = TRANSPARENT } = {}) {
  const inner = Math.round(size * (1 - pad * 2))
  return sharp(trimmed)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .extend({
      top: Math.floor((size - inner) / 2),
      bottom: Math.ceil((size - inner) / 2),
      left: Math.floor((size - inner) / 2),
      right: Math.ceil((size - inner) / 2),
      background: TRANSPARENT,
    })
    .flatten(background.alpha ? { background } : false)
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** ICO container holding PNG-encoded images (supported by all modern browsers). */
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  const entries = []
  let offset = 6 + 16 * pngs.length
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0)
    e.writeUInt8(size >= 256 ? 0 : size, 1)
    e.writeUInt16LE(1, 4) // colour planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    entries.push(e)
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

const outputs = {
  'favicon-16x16.png': await icon(16, { pad: 0 }),
  'favicon-32x32.png': await icon(32, { pad: 0.02 }),
  'favicon-192.png': await icon(192),
  'favicon-512.png': await icon(512),
  // iOS paints transparent pixels black, so the touch icon gets a white tile.
  'apple-touch-icon.png': await icon(180, { pad: 0.1, background: WHITE }),
}

for (const [name, data] of Object.entries(outputs)) {
  await writeFile(pub(name), data)
  console.log(`wrote ${name}`)
}

const icoSizes = [16, 32, 48]
const icoPngs = await Promise.all(icoSizes.map(async (size) => ({ size, data: await icon(size, { pad: size < 32 ? 0 : 0.02 }) })))
await writeFile(pub('favicon.ico'), ico(icoPngs))
console.log('wrote favicon.ico')
