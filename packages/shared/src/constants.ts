import { resolve } from 'path';
import { homedir } from 'os';

export const SITE_URL = 'https://www.kk-vibe.top';
export const KK_VIBE_DIR = resolve(homedir(), '.kk-vibe');
export const CLI_DIR = resolve(KK_VIBE_DIR, 'cli');
export const CONFIG_FILE = resolve(KK_VIBE_DIR, 'config.json');
export const UPDATE_CHECK_FILE = resolve(KK_VIBE_DIR, 'update-check.json');

export const TOOL_CONFIG = {
  claude: {
    pkg: '@anthropic-ai/claude-code',
    installDir: 'claude-code',
    binName: 'claude',
    envKeyName: 'ANTHROPIC_API_KEY',
    envBaseName: 'ANTHROPIC_BASE_URL',
    configKeyField: 'anthropic_api_key',
    configBaseField: 'anthropic_base_url',
    defaultBaseUrl: 'https://api.kk-vibe.top/v1',
  },
  codex: {
    pkg: '@openai/codex',
    installDir: 'codex',
    binName: 'codex',
    envKeyName: 'OPENAI_API_KEY',
    envBaseName: 'OPENAI_BASE_URL',
    configKeyField: 'openai_api_key',
    configBaseField: 'openai_base_url',
    defaultBaseUrl: 'https://api.kk-vibe.top/openai/v1',
  },
} as const;
