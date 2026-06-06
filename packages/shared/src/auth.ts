import { KKConfig, getConfig } from './config';
import { TOOL_CONFIG } from './constants';

export function checkAuth(tool: 'claude' | 'codex', config?: KKConfig): boolean {
  const cfg = config ?? getConfig();
  const toolCfg = TOOL_CONFIG[tool];

  if (process.env[toolCfg.envKeyName]) return true;

  const key = cfg[toolCfg.configKeyField] as string | undefined;
  return !!key && key.length > 0;
}

export function getApiKey(tool: 'claude' | 'codex', config: KKConfig): string | undefined {
  const toolCfg = TOOL_CONFIG[tool];
  return (process.env[toolCfg.envKeyName] || cfg(config, toolCfg.configKeyField)) as string | undefined;
}

function cfg(config: KKConfig, field: string): unknown {
  return config[field];
}
