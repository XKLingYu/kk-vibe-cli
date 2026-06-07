import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import { CLI_DIR, TOOL_CONFIG } from './constants';
import { getConfig, saveConfig } from './config';
import { findCLIBin } from './resolve';

export async function detectRegistry(): Promise<string> {
  const registries = [
    'https://registry.npmmirror.com',
    'https://registry.npmjs.org',
  ];

  for (const registry of registries) {
    try {
      execSync(`npm ping --registry=${registry}`, {
        timeout: 3000,
        stdio: 'ignore',
      });
      return registry;
    } catch {
      continue;
    }
  }
  return 'https://registry.npmmirror.com';
}

export async function ensureCLIInstalled(tool: 'claude' | 'codex') {
  const toolCfg = TOOL_CONFIG[tool];
  const installDir = resolve(CLI_DIR, toolCfg.installDir);
  const pkgPath = resolve(installDir, 'node_modules', ...toolCfg.pkg.split('/'));

  if (existsSync(pkgPath)) {
    try {
      const bin = findCLIBin(tool);
      if (existsSync(bin)) return;
    } catch (err: unknown) {
      const code = (err as NodeJS.ErrnoException).code;
      if (!(err instanceof SyntaxError) && code !== 'ENOENT') throw err;
    }
    console.log(`\n⚠️  检测到 ${toolCfg.pkg} 安装不完整，正在修复...\n`);
    rmSync(resolve(installDir, 'node_modules'), { recursive: true, force: true });
  }

  console.log(`\n📦 首次使用，正在下载 ${toolCfg.pkg}...`);
  console.log('   (仅首次需要，后续启动无需等待)\n');

  mkdirSync(installDir, { recursive: true });

  const config = getConfig();
  let registry = config.registry as string | undefined;
  if (!registry) {
    registry = await detectRegistry();
    config.registry = registry;
    saveConfig(config);
  }

  try {
    execSync(
      `npm install ${toolCfg.pkg} --prefix "${installDir}" --registry=${registry}`,
      { stdio: 'inherit', timeout: 120000 }
    );
    console.log('✅ 下载完成\n');
  } catch {
    console.error('❌ 下载失败，请检查网络或手动执行:');
    console.error(`   npm install ${toolCfg.pkg} --prefix "${installDir}" --registry=${registry}`);
    process.exit(1);
  }
}
