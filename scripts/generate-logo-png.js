import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Create clean SVG Logo (No bottom tagline, pure minimal lockup)
const svgLogo = `<svg width="600" height="180" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#16a34a" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
  </defs>

  <!-- Logo Mark (Rounded Badge with Leaf Monogram) -->
  <rect x="20" y="20" width="140" height="140" rx="32" fill="url(#bgGrad)" stroke="#27272a" stroke-width="2" />
  
  <!-- Stylized Geometric Leaf / G -->
  <path d="M 90 48 C 65 48 48 68 48 90 C 48 114 65 132 90 132 C 114 132 130 114 130 90 L 130 86 L 90 86" 
        stroke="url(#leafGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  
  <path d="M 72 108 C 85 96 100 82 116 66" 
        stroke="#4ade80" stroke-width="5" stroke-linecap="round" opacity="0.9" />
  
  <circle cx="90" cy="64" r="5" fill="#4ade80" />

  <!-- Typography: GreensLeaf -->
  <text x="185" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="72" letter-spacing="-2" fill="#09090b">
    Greens<tspan fill="#16a34a">Leaf</tspan>
  </text>
</svg>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.svg'), svgLogo, 'utf-8');
console.log('✓ Created public/logo.svg (clean lockup without tagline)');

// 2. Pure JavaScript PNG Generator (512x512)
function createPng(width, height) {
  const crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c;
  }

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ -1) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(combined), 0);
    return Buffer.concat([len, combined, crcBuf]);
  }

  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawBytes[offset++] = 0; // Filter byte: None

    for (let x = 0; x < width; x++) {
      // Light background (#fbfbfd)
      let r = 251;
      let g = 251;
      let b = 253;
      let a = 255;

      const cx = width / 2;
      const cy = height / 2;
      const cardSize = width * 0.72;
      const half = cardSize / 2;
      const rx = Math.abs(x - cx);
      const ry = Math.abs(y - cy);
      const radius = 54;

      const insideCard = (rx <= half && ry <= half - radius) ||
                         (ry <= half && rx <= half - radius) ||
                         (Math.hypot(rx - (half - radius), ry - (half - radius)) <= radius);

      if (insideCard) {
        // Dark minimal emblem inside card (#18181b)
        r = 24;
        g = 24;
        b = 27;

        // Leaf / G Icon
        const dx = x - cx;
        const dy = y - cy;
        const distFromCircle = Math.hypot(dx, dy);

        // Circular ring
        if (distFromCircle >= 65 && distFromCircle <= 96) {
          if (!(dx > 10 && dy > -20 && dy < 40)) {
            r = 22;
            g = 163;
            b = 74; // emerald green
          }
        }

        // Inner horizontal bar for G
        if (dx >= 0 && dx <= 75 && Math.abs(dy - 10) <= 15) {
          r = 74;
          g = 222;
          b = 128;
        }

        // Leaf diagonal stem
        const leafDist = Math.abs((dx - dy * 0.8) - 10);
        if (leafDist < 8 && dx >= -50 && dx <= 50 && dy >= -40 && dy <= 50) {
          r = 74;
          g = 222;
          b = 128;
        }

        // Accent dot
        if (Math.hypot(dx, dy + 80) <= 14) {
          r = 134;
          g = 239;
          b = 172;
        }
      }

      rawBytes[offset++] = r;
      rawBytes[offset++] = g;
      rawBytes[offset++] = b;
      rawBytes[offset++] = a;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const compressed = zlib.deflateSync(rawBytes, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createPng(512, 512);
fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.png'), pngBuffer);
console.log('✓ Created public/logo.png (512x512 high-res clean PNG)');
