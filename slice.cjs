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
  
  const cols = 5;
  const rows = 3;
  const w = Math.floor(metadata.width / cols);
  const h = Math.floor(metadata.height / rows);
  
  const perfumes = [
    'velvet-oud', 'noir-amber', 'santal-elan', 'azure-mist', 'citrus-veil',
    'rose-nocturne', 'amber-solace', 'forest-whisper', 'midnight-bloom', 'blaze',
    'moonlit-sage', 'golden-haze', 'crimson-touch'
  ];

  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (index >= 13) break;
      
      const outName = `${outDir}/${perfumes[index]}.jpg`;
      await sharp(imagePath)
        .extract({ left: c * w, top: r * h, width: w, height: h })
        .toFile(outName);
      
      console.log(`Saved ${outName}`);
      index++;
    }
  }
}

sliceImage().catch(console.error);
