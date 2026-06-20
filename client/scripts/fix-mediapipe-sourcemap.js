const fs = require('fs');
const path = require('path');

const packageDir = path.join(__dirname, '..', 'node_modules', '@mediapipe', 'tasks-vision');
const sourceMap = path.join(packageDir, 'vision_bundle.mjs.map');
const expectedMap = path.join(packageDir, 'vision_bundle_mjs.js.map');

try {
  if (!fs.existsSync(packageDir)) {
    console.log('[fix-mediapipe-sourcemap] @mediapipe/tasks-vision is not installed. Skipping.');
    process.exit(0);
  }

  if (!fs.existsSync(sourceMap)) {
    console.log('[fix-mediapipe-sourcemap] Source map file not found. Skipping.');
    process.exit(0);
  }

  if (fs.existsSync(expectedMap)) {
    console.log('[fix-mediapipe-sourcemap] Expected sourcemap already exists.');
    process.exit(0);
  }

  fs.copyFileSync(sourceMap, expectedMap);
  console.log('[fix-mediapipe-sourcemap] Created vision_bundle_mjs.js.map to suppress CRA source-map-loader warning.');
} catch (error) {
  console.warn('[fix-mediapipe-sourcemap] Non-fatal error:', error.message);
  process.exit(0);
}
