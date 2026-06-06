const { cpSync, mkdirSync } = require('fs');
const { resolve } = require('path');

const target = process.argv[2];
if (!target) {
  console.error('Usage: node bundle.js <kk-claude|kk-codex>');
  process.exit(1);
}

const root = resolve(__dirname, '..');
const sharedDist = resolve(root, 'packages/shared/dist');
const pkgDir = resolve(root, 'packages', target);
const libDir = resolve(pkgDir, 'lib');

mkdirSync(libDir, { recursive: true });
cpSync(sharedDist, libDir, { recursive: true });
console.log(`Bundled shared/dist → ${target}/lib/`);
