import { exec } from 'child_process';

export function openBrowser(url: string): void {
  const cmd = process.platform === 'darwin'
    ? `open "${url}"`
    : process.platform === 'win32'
      ? `start "" "${url}"`
      : `xdg-open "${url}"`;

  exec(cmd, () => {});
}
