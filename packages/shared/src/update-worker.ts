import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { UPDATE_CHECK_FILE, KK_VIBE_DIR } from './constants';

const pkgName = process.argv[2];
const currentVersion = process.argv[3];

if (!pkgName || !currentVersion) process.exit(1);

try {
  const latest = execSync(
    `npm view ${pkgName} version --registry=https://registry.npmmirror.com`,
    { timeout: 10000, encoding: 'utf-8' }
  ).trim();

  mkdirSync(KK_VIBE_DIR, { recursive: true });

  let cache: Record<string, unknown> = {};
  if (existsSync(UPDATE_CHECK_FILE)) {
    try {
      cache = JSON.parse(readFileSync(UPDATE_CHECK_FILE, 'utf-8'));
    } catch {}
  }

  cache[pkgName] = {
    latest,
    current: currentVersion,
    lastCheck: new Date().toISOString(),
  };

  writeFileSync(UPDATE_CHECK_FILE, JSON.stringify(cache, null, 2), 'utf-8');
} catch {
  // silent fail
}
