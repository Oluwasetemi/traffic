#!/usr/bin/env bun

/**
 * Generate PWA icons with Jamaican theme colors
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Jamaican flag colors
const GREEN = '#009B3A';
const GOLD = '#FFC72C';
const BLACK = '#000000';

function generateSVG(size: number): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${GREEN};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${GOLD};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Rounded rectangle background -->
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>

  <!-- JM text -->
  <text
    x="50%"
    y="50%"
    font-family="Arial, Helvetica, sans-serif"
    font-size="${size * 0.45}"
    font-weight="bold"
    fill="${BLACK}"
    text-anchor="middle"
    dominant-baseline="central">
    JM
  </text>
</svg>`;
}

async function convertSVGtoPNG(svgContent: string, outputPath: string, size: number) {
  try {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Failed to generate ${path.basename(outputPath)}:`, error);
  }
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public', 'icons');

  // Ensure directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate icons
  const sizes = [192, 512];

  for (const size of sizes) {
    const svg = generateSVG(size);
    const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
    await convertSVGtoPNG(svg, outputPath, size);
  }

  // Generate badge icon (96x96)
  const badgeSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <circle cx="48" cy="48" r="48" fill="${GREEN}"/>
  <text
    x="50%"
    y="50%"
    font-family="Arial, Helvetica, sans-serif"
    font-size="48"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="central">
    !
  </text>
</svg>`;

  const badgePath = path.join(publicDir, 'badge.png');
  await sharp(Buffer.from(badgeSVG))
    .resize(96, 96)
    .png()
    .toFile(badgePath);
  console.log(`✓ Generated badge.png`);

  console.log('\n✅ Icon generation complete!');
}

main().catch(console.error);
