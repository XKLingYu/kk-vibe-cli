import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { KK_VIBE_DIR, CONFIG_FILE } from './constants';

export interface KKConfig {
  first_launch_claude?: boolean;
  first_launch_codex?: boolean;
  anthropic_api_key?: string;
  anthropic_base_url?: string;
  openai_api_key?: string;
  openai_base_url?: string;
  update_mode?: 'prompt' | 'auto' | 'disabled';
  update_check_interval_hours?: number;
  skip_version?: string | null;
  registry?: string;
  [key: string]: unknown;
}

export function getConfig(): KKConfig {
  if (!existsSync(CONFIG_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CONFIG_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

export function saveConfig(config: KKConfig): void {
  mkdirSync(KK_VIBE_DIR, { recursive: true });
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}
