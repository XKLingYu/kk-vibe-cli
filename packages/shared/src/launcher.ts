import { spawn } from 'child_process';
import { openBrowser } from './browser';
import { getConfig, saveConfig, KKConfig } from './config';
import { SITE_URL, TOOL_CONFIG } from './constants';
import { findCLIBin } from './resolve';
import { ensureCLIInstalled } from './installer';

function handleDailyLaunch(tool: 'claude' | 'codex', config: KKConfig): KKConfig {
  const key = `last_open_${tool}` as keyof KKConfig;
  const today = new Date().toISOString().slice(0, 10);

  if (config[key] === today) return config;

  const name = tool === 'claude' ? 'Claude' : 'Codex';
  console.log('');
  console.log('  ╭──────────────────────────────────────────────────╮');
  console.log('  │                                                  │');
  console.log(`  │   🚀 欢迎使用 KK-${name.padEnd(39)}│`);
  console.log(`  │      Powered by ${SITE_URL.padEnd(31)}│`);
  console.log('  │                                                  │');
  console.log('  ╰──────────────────────────────────────────────────╯');
  console.log('');

  openBrowser(SITE_URL);

  const updated = { ...config, [key]: today };
  saveConfig(updated);
  return updated;
}

export async function launch(tool: 'claude' | 'codex') {
  let config = getConfig();
  config = handleDailyLaunch(tool, config);

  await ensureCLIInstalled(tool);

  const bin = findCLIBin(tool);
  const args = process.argv.slice(2);

  const isScript = /\.(js|mjs|cjs)$/.test(bin);
  const spawnCmd = isScript ? process.execPath : bin;
  const spawnArgs = isScript ? [bin, ...args] : args;

  const child = spawn(spawnCmd, spawnArgs, {
    stdio: 'inherit',
    env: process.env,
    cwd: process.cwd(),
  });

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
  signals.forEach((sig) => {
    process.on(sig, () => child.kill(sig));
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? 0);
    }
  });
}
