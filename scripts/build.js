const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

// Clean and recreate public folder
if (fs.existsSync(PUBLIC)) {
  fs.rmSync(PUBLIC, { recursive: true, force: true });
}
fs.mkdirSync(PUBLIC, { recursive: true });

// Copy root HTML files
const filesToCopy = ['index.html', 'doctor-profile.html', 'tooth-viewer.html'];
for (const file of filesToCopy) {
  const src = path.join(ROOT, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(PUBLIC, file));
  }
}

// Copy assets folder
const assetsSrc = path.join(ROOT, 'assets');
const assetsDest = path.join(PUBLIC, 'assets');
if (fs.existsSync(assetsSrc)) {
  fs.cpSync(assetsSrc, assetsDest, { recursive: true });
}

console.log('✅ Static build complete: ready in public/');
