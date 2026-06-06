<div align="center">
  <h1>kk-vibe-cli</h1>
  <p><strong>Claude Code & Codex CLI accelerator for developers in China</strong></p>
  <p>Use Claude Code and OpenAI Codex without network barriers. One command to install, zero config to start.</p>

  <a href="https://www.npmjs.com/package/kk-claude">
    <img src="https://img.shields.io/npm/v/kk-claude.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/kk-codex">
    <img src="https://img.shields.io/npm/v/kk-codex.svg?style=flat-square" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/kk-claude">
    <img src="https://img.shields.io/npm/dm/kk-claude.svg?style=flat-square" alt="downloads">
  </a>
  <a href="https://github.com/xklingyu/kk-vibe-cli/stargazers">
    <img src="https://img.shields.io/github/stars/xklingyu/kk-vibe-cli?style=flat-square" alt="stars">
  </a>
  <a href="https://www.kk-vibe.top">
    <img src="https://img.shields.io/badge/Platform-kk--vibe.top-blue?style=flat-square" alt="KK-Vibe Platform">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/xklingyu/kk-vibe-cli?style=flat-square" alt="license">
  </a>

  <br/>
  <br/>

  **English** · [简体中文](./README.zh-CN.md)
</div>

---

## Why kk-vibe-cli?

| Problem | Solution |
|---------|----------|
| Claude Code / Codex CLI inaccessible in China | Built-in acceleration nodes for direct access |
| Complex setup and API key procurement | Register at [kk-vibe.top](https://www.kk-vibe.top) and start coding |
| Original CLI commands get overwritten | `kk-claude` / `kk-codex` coexist with original commands |

## Packages

| Package | Description | Install |
|---------|-------------|---------|
| [kk-claude](https://www.npmjs.com/package/kk-claude) | Claude Code accelerated launcher | `npm i -g kk-claude` |
| [kk-codex](https://www.npmjs.com/package/kk-codex) | OpenAI Codex accelerated launcher | `npm i -g kk-codex` |

## Quick Start

```bash
# Install
npm install -g kk-claude
# or use China mirror for faster download
npm install -g kk-claude --registry=https://registry.npmmirror.com

# Run (original `claude` command stays untouched)
kk-claude
```

On first launch, `kk-claude` will:
1. Auto-download the official Claude Code CLI to an isolated directory (`~/.kk-vibe/cli/`)
2. Detect the fastest npm registry (npmmirror or npmjs.org)
3. Guide you to get an API key from [kk-vibe.top](https://www.kk-vibe.top)

After setup, every subsequent launch is instant — just like running `claude` directly.

Same for Codex:

```bash
npm install -g kk-codex
kk-codex
```

## How It Works

```
┌─────────────────────────────────────────────────────────┐
│  You type: kk-claude --model opus "fix this bug"        │
├─────────────────────────────────────────────────────────┤
│  1. Read config from ~/.kk-vibe/config.json             │
│  2. Set ANTHROPIC_BASE_URL + ANTHROPIC_API_KEY          │
│  3. spawn claude CLI with all your args                 │
│  4. Full stdio passthrough — same experience as claude  │
└─────────────────────────────────────────────────────────┘
```

- Your original `claude` / `codex` commands are **never** overwritten
- CLI binaries are downloaded to `~/.kk-vibe/cli/` (isolated, no global pollution)
- Auto-detects fastest registry (npmmirror vs npmjs.org)
- Built-in update notifier with configurable modes (auto / prompt / disabled)

## Configuration

All config lives in `~/.kk-vibe/config.json`:

```jsonc
{
  "anthropic_api_key": "sk-ant-...",
  "anthropic_base_url": "https://api.kk-vibe.top/v1",
  "openai_api_key": "sk-...",
  "openai_base_url": "https://api.kk-vibe.top/openai/v1",
  "update_mode": "prompt"  // "auto" | "prompt" | "disabled"
}
```

## Project Structure

```
kk-vibe-cli/
├── packages/
│   ├── kk-claude/          # npm package: kk-claude
│   ├── kk-codex/           # npm package: kk-codex
│   └── shared/             # Shared core logic (not published)
│       └── src/
│           ├── launcher.ts     # CLI spawner
│           ├── installer.ts    # Runtime download
│           ├── auth.ts         # Auth detection
│           ├── config.ts       # Config read/write
│           ├── updater.ts      # Version check
│           └── ...
├── scripts/
│   └── bundle.js           # Build script
└── package.json            # Workspace root
```

## Related

- [KK-Vibe Platform](https://www.kk-vibe.top) — API key management, usage dashboard, billing
- [Claude Code](https://github.com/anthropics/claude-code) — Official Anthropic CLI
- [OpenAI Codex](https://github.com/openai/codex) — Official OpenAI CLI

## Contributing

Issues and PRs are welcome. Please open an issue before submitting large changes.

## License

[MIT](./LICENSE)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://www.kk-vibe.top">KK-Vibe</a></sub>
</div>
