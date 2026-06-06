import { spawn as cpSpawn, execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { UPDATE_CHECK_FILE, KK_VIBE_DIR } from './constants';

interface UpdateInfo {
  latest: string;
  current: string;
  lastCheck: string;
}

interface UpdateCache {
  [key: string]: UpdateInfo;
}

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000;

function readCache(): UpdateCache {
  if (!existsSync(UPDATE_CHECK_FILE)) return {};
  try {
    return JSON.parse(readFileSync(UPDATE_CHECK_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeCache(cache: UpdateCache): void {
  mkdirSync(KK_VIBE_DIR, { recursive: true });
  writeFileSync(UPDATE_CHECK_FILE, JSON.stringify(cache, null, 2), 'utf-8');
}

export function checkForUpdate(
  pkgName: string,
  currentVersion: string
): { latest: string; current: string } | null {
  const cache = readCache();
  const info = cache[pkgName];
  const now = Date.now();
  const lastCheck = info?.lastCheck ? new Date(info.lastCheck).getTime() : 0;

  if (now - lastCheck > DEFAULT_INTERVAL_MS) {
    checkInBackground(pkgName, currentVersion);
  }

  if (info && info.latest && info.latest !== info.current) {
    return { latest: info.latest, current: info.current };
  }
  return null;
}

function checkInBackground(pkgName: string, currentVersion: string): void {
  const child = cpSpawn(process.execPath, [
    resolve(__dirname, 'update-worker.js'),
    pkgName,
    currentVersion,
  ], { detached: true, stdio: 'ignore' });
  child.unref();
}

export function performUpdate(pkgName: string): boolean {
  try {
    execSync(`npm install -g ${pkgName}@latest`, { stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
}
