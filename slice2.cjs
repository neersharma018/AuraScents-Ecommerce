const sharp = require('sharp');
const fs = require('fs');

async function sliceImage() {
  const imagePath = 'public/assets/shop-grid.jpg';
  const outDir = 'public/assets/perfumes';
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  const w5 = Math.floor(metadata.width / 5);
  const h = Math.floor(metadata.height / 3);
  
  // The bottom row might be 4 columns wide
  const w4 = Math.floor(metadata.width / 4);

  // Slice Moonlit Sage (row 2, col 0 of 4-col layout)
  await sharp(imagePath)
    .extract({ left: 0, top: 2 * h, width: w4, height: h })
    .toFile(`${outDir}/moonlit-sage-fix.jpg`);
    
  // Slice Golden Haze (row 2, col 1 of 4-col layout)
  await sharp(imagePath)
    .extract({ left: w4, top: 2 * h, width: w4, height: h })
    .toFile(`${outDir}/golden-haze-fix.jpg`);

  // Slice Crimson Touch (row 2, col 2 of 4-col layout)
  await sharp(imagePath)
    .extract({ left: w4 * 2, top: 2 * h, width: w4, height: h })
    .toFile(`${outDir}/crimson-touch-fix.jpg`);
    
  console.log('Fixed slices created.');
}

sliceImage().catch(console.error);
