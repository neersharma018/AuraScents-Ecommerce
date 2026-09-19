const sharp = require('sharp');
const fs = require('fs');

async function enhanceImages() {
  const imagePath = 'public/assets/shop-grid.jpg';
  const outDir = 'public/assets/perfumes';
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  const w5 = Math.floor(metadata.width / 5);
  const h = Math.floor(metadata.height / 3);
  const w4 = Math.floor(metadata.width / 4);
  
  const perfumesTop2 = [
    'velvet-oud', 'noir-amber', 'santal-elan', 'azure-mist', 'citrus-veil',
    'rose-nocturne', 'amber-solace', 'forest-whisper', 'midnight-bloom', 'blaze'
  ];

  // Top 2 rows (10 perfumes)
  let index = 0;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const outName = `${outDir}/${perfumesTop2[index]}.jpg`;
      await sharp(imagePath)
        .extract({ left: c * w5, top: r * h, width: w5, height: h })
        .resize({ width: w5 * 3, kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8, x1: 2, y2: 10, y3: 20 })
        .toFile(outName);
      console.log(`Enhanced ${outName}`);
      index++;
    }
  }

  // Bottom row (Moonlit Sage and Golden Haze are index 0 and 1 of 4-col split)
  const bottomPerfumes = [
    { name: 'moonlit-sage-fix', col: 0 },
    { name: 'golden-haze-fix', col: 1 }
  ];

  for (let p of bottomPerfumes) {
    const outName = `${outDir}/${p.name}.jpg`;
    await sharp(imagePath)
      .extract({ left: p.col * w4, top: 2 * h, width: w4, height: h })
      .resize({ width: w4 * 3, kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 1.5, m1: 1.2, m2: 0.8, x1: 2, y2: 10, y3: 20 })
      .toFile(outName);
    console.log(`Enhanced ${outName}`);
  }
}

enhanceImages().catch(console.error);
