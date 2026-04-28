import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const INPUT_DIR = './public/gallery';
const OUTPUT_DIR = './public/gallery-optimized';
const MAX_WIDTH = 800;
const QUALITY = 70;

mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f => ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()));

console.log(`Found ${files.length} images to optimize...\n`);

for (const file of files) {
  const inputPath = join(INPUT_DIR, file);
  const outputPath = join(OUTPUT_DIR, file);
  const originalSize = statSync(inputPath).size;
  
  await sharp(inputPath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: QUALITY, progressive: true })
    .toFile(outputPath);
    
  const newSize = statSync(outputPath).size;
  const saved = ((1 - newSize / originalSize) * 100).toFixed(0);
  console.log(`${file}: ${(originalSize/1024/1024).toFixed(1)}MB → ${(newSize/1024).toFixed(0)}KB (-${saved}%)`);
}

console.log('\nDone! Optimized images saved to', OUTPUT_DIR);
