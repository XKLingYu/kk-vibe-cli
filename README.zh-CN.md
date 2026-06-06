<div align="center">
  <h1>kk-vibe-cli</h1>
  <p><strong>Claude Code & Codex CLI 国内加速启动器</strong></p>
  <p>无需翻墙，一行命令安装，即刻使用 Claude Code 和 OpenAI Codex 进行 AI 编程</p>

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
    <img src="https://img.shields.io/badge/平台-kk--vibe.top-blue?style=flat-square" alt="KK-Vibe 平台">
  </a>
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/xklingyu/kk-vibe-cli?style=flat-square" alt="license">
  </a>

  <br/>
  <br/>

  [English](./README.md) · **简体中文**
</div>

---

## 为什么选择 kk-vibe-cli？

| 痛点 | 解决方案 |
|------|----------|
| Claude Code / Codex CLI 国内无法直连 | 内置加速节点，开箱即用 |
| API Key 获取门槛高、配置复杂 | 注册 [kk-vibe.top](https://www.kk-vibe.top) 即获 Key |
| 担心覆盖原始 CLI 命令 | `kk-claude` / `kk-codex` 与原命令完全共存 |

## 包含的包

| 包名 | 说明 | 安装命令 |
|------|------|----------|
| [kk-claude](https://www.npmjs.com/package/kk-claude) | Claude Code 加速启动器 | `npm i -g kk-claude` |
| [kk-codex](https://www.npmjs.com/package/kk-codex) | OpenAI Codex 加速启动器 | `npm i -g kk-codex` |

## 快速开始

```bash
# 安装（推荐使用淘宝镜像）
npm install -g kk-claude --registry=https://registry.npmmirror.com

# 运行（原始 claude 命令不受任何影响）
kk-claude
```

首次启动时，`kk-claude` 会自动：
1. 下载官方 Claude Code CLI 到隔离目录（`~/.kk-vibe/cli/`）
2. 自动检测最快的 npm 源（npmmirror 或 npmjs.org）
3. 引导你前往 [kk-vibe.top](https://www.kk-vibe.top) 获取 API Key

配置完成后，后续每次启动都是瞬间完成，体验和直接使用 `claude` 完全一致。

Codex 同理：

```bash
npm install -g kk-codex --registry=https://registry.npmmirror.com
kk-codex
```

## 工作原理

```
┌─────────────────────────────────────────────────────────┐
│  你输入: kk-claude --model opus "修复这个 bug"           │
├─────────────────────────────────────────────────────────┤
│  1. 读取 ~/.kk-vibe/config.json 配置                    │
│  2. 设置 ANTHROPIC_BASE_URL + ANTHROPIC_API_KEY         │
│  3. spawn 原始 claude CLI，透传所有参数                  │
│  4. stdio 完全透传 — 使用体验与 claude 完全一致          │
└─────────────────────────────────────────────────────────┘
```

- 原始 `claude` / `codex` 命令**永远不会**被覆盖
- CLI 二进制下载到 `~/.kk-vibe/cli/`（隔离安装，不污染全局）
- 自动探测最快 registry（npmmirror vs npmjs.org）
- 内置更新提醒，支持配置模式（auto / prompt / disabled）

## 配置说明

所有配置存储在 `~/.kk-vibe/config.json`：

```jsonc
{
  "anthropic_api_key": "sk-ant-...",
  "anthropic_base_url": "https://api.kk-vibe.top/v1",
  "openai_api_key": "sk-...",
  "openai_base_url": "https://api.kk-vibe.top/openai/v1",
  "update_mode": "prompt"  // "auto" | "prompt" | "disabled"
}
```

## 项目结构

```
kk-vibe-cli/
├── packages/
│   ├── kk-claude/          # npm 包：kk-claude
│   ├── kk-codex/           # npm 包：kk-codex
│   └── shared/             # 共享核心逻辑（不发布）
│       └── src/
│           ├── launcher.ts     # CLI 启动器
│           ├── installer.ts    # 运行时下载
│           ├── auth.ts         # 认证检测
│           ├── config.ts       # 配置读写
│           ├── updater.ts      # 版本检测
│           └── ...
├── scripts/
│   └── bundle.js           # 构建脚本
└── package.json            # Workspace 根配置
```

## 相关链接

- [KK-Vibe 平台](https://www.kk-vibe.top) — API Key 管理、用量查看、充值
- [Claude Code](https://github.com/anthropics/claude-code) — Anthropic 官方 CLI
- [OpenAI Codex](https://github.com/openai/codex) — OpenAI 官方 CLI

## 参与贡献

欢迎提 Issue 和 PR。较大的改动请先开 Issue 讨论。

## 许可证

[MIT](./LICENSE)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://www.kk-vibe.top">KK-Vibe</a></sub>
</div>
