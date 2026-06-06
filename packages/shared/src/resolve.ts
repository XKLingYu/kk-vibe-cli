import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import { CLI_DIR, TOOL_CONFIG } from './constants';

export function findCLIBin(tool: 'claude' | 'codex'): string {
  const toolCfg = TOOL_CONFIG[tool];
  const installDir = resolve(CLI_DIR, toolCfg.installDir);
  const pkgParts = toolCfg.pkg.split('/');
  const pkgJsonPath = resolve(installDir, 'node_modules', ...pkgParts, 'package.json');
  const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'));
  const binEntry = typeof pkgJson.bin === 'string'
    ? pkgJson.bin
    : pkgJson.bin[toolCfg.binName];
  return resolve(dirname(pkgJsonPath), binEntry);
}
