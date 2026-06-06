import * as readline from 'readline';

export function promptForKey(tool: 'claude' | 'codex'): Promise<string | null> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const label = tool === 'claude' ? 'Anthropic' : 'OpenAI';

  return new Promise((resolve) => {
    console.log(`\n  请选择配置方式：`);
    console.log(`  [1] 直接粘贴 API Key`);
    console.log(`  [2] 退出，稍后手动编辑 ~/.kk-vibe/config.json\n`);

    rl.question('请选择 (1/2): ', (answer) => {
      if (answer.trim() === '1') {
        rl.question(`请输入您的 ${label} API Key: `, (key) => {
          rl.close();
          resolve(key.trim() || null);
        });
      } else {
        rl.close();
        resolve(null);
      }
    });
  });
}
