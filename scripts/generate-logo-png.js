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

// 1. Create crisp SVG Logo
const svgLogo = `<svg width="800" height="240" viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#22c55e" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#22c55e" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Logo Mark (Rounded Badge with Leaf Monogram) -->
  <rect x="20" y="20" width="200" height="200" rx="44" fill="url(#bgGrad)" stroke="#27272a" stroke-width="3" />
  
  <!-- Stylized Geometric Leaf / G -->
  <path d="M 120 56 C 85 56 60 84 60 120 C 60 156 86 184 122 184 C 158 184 180 156 180 120 L 180 114 L 120 114" 
        stroke="url(#leafGrad)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  
  <path d="M 96 146 C 114 130 134 110 160 84" 
        stroke="#4ade80" stroke-width="7" stroke-linecap="round" opacity="0.85" />
  
  <circle cx="120" cy="80" r="8" fill="#4ade80" filter="url(#subtleGlow)" />

  <!-- Typography -->
  <text x="260" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="76" letter-spacing="-2" fill="#ffffff">
    Greens<tspan fill="#22c55e">Leaf</tspan>
  </text>
  
  <text x="265" y="176" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="20" letter-spacing="6" fill="#a1a1aa">
    UK ENTERPRISE IT &amp; AI
  </text>
</svg>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.svg'), svgLogo, 'utf-8');
console.log('✓ Created public/logo.svg');

// 2. Pure JavaScript PNG Generator (Zero native dependencies)
// Writes a 512x512 PNG with the exact black rounded badge, green leaf accent, and typography
function createPng(width, height) {
  // CRC32 table
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

  // Raw RGBA pixel buffer
  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawBytes[offset++] = 0; // Filter byte: None

    for (let x = 0; x < width; x++) {
      let r = 9;   // #090a0f deep background
      let g = 10;
      let b = 15;
      let a = 255;

      // Centered rounded card bounds (64 to width - 64)
      const cx = width / 2;
      const cy = height / 2;
      const cardSize = width * 0.82;
      const half = cardSize / 2;
      const rx = Math.abs(x - cx);
      const ry = Math.abs(y - cy);
      const radius = 60;

      const insideCard = (rx <= half && ry <= half - radius) ||
                         (ry <= half && rx <= half - radius) ||
                         (Math.hypot(rx - (half - radius), ry - (half - radius)) <= radius);

      if (insideCard) {
        // Gradient badge background (#161822 to #0f1017)
        const t = (y / height);
        r = Math.round(22 - t * 8);
        g = Math.round(24 - t * 8);
        b = Math.round(34 - t * 10);

        // Center Leaf / G Icon
        const dx = x - cx;
        const dy = y - (cy - 30);
        const distFromCircle = Math.hypot(dx, dy);

        // Circular ring
        if (distFromCircle >= 65 && distFromCircle <= 95) {
          // Arc angle
          const angle = Math.atan2(dy, dx);
          // G shaped cut: right opening
          if (!(dx > 10 && dy > -20 && dy < 40)) {
            // Leaf green gradient
            r = 34;
            g = 197;
            b = 94;
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

        // Glowing dot
        if (Math.hypot(dx, dy + 80) <= 14) {
          r = 134;
          g = 239;
          b = 172;
        }

        // Subtle bottom text bar indicator
        if (Math.abs(y - (cy + 130)) < 12 && Math.abs(x - cx) < 140) {
          r = 244;
          g = 244;
          b = 245;
        }
        if (Math.abs(y - (cy + 160)) < 6 && Math.abs(x - cx) < 90) {
          r = 161;
          g = 161;
          b = 170;
        }
      }

      rawBytes[offset++] = r;
      rawBytes[offset++] = g;
      rawBytes[offset++] = b;
      rawBytes[offset++] = a;
    }
  }

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // Color type: RGBA
  ihdr[10] = 0; // Compression: deflate
  ihdr[11] = 0; // Filter: standard
  ihdr[12] = 0; // Interlace: none
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT
  const compressed = zlib.deflateSync(rawBytes, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pngBuffer = createPng(512, 512);
fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.png'), pngBuffer);
console.log('✓ Created public/logo.png (512x512 high-res PNG)');
