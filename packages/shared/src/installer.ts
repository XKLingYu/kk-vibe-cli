import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname, sep } from 'path';
import { CLI_DIR } from './constants';
import { getConfig, saveConfig } from './config';

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
  const pkg = tool === 'claude'
    ? '@anthropic-ai/claude-code'
    : '@openai/codex';
  const installDir = resolve(CLI_DIR, tool === 'claude' ? 'claude-code' : 'codex');
  const pkgPath = resolve(installDir, 'node_modules', ...pkg.split('/'));

  if (existsSync(pkgPath)) return;

  console.log(`\n📦 首次使用，正在下载 ${pkg}...`);
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
      `npm install ${pkg} --prefix "${installDir}" --registry=${registry}`,
      { stdio: 'inherit', timeout: 120000 }
    );
    console.log('✅ 下载完成\n');
  } catch {
    console.error('❌ 下载失败，请检查网络或手动执行:');
    console.error(`   npm install ${pkg} --prefix "${installDir}" --registry=${registry}`);
    process.exit(1);
  }
}
