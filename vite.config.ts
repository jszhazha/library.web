import { resolve } from 'path';
import type { UserConfig } from 'vite';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}

const viteConfig: UserConfig = {
  /**
   * 端口号
   * @default '3000'
   */
  port: 3000,

  // 别名
  alias: {
    '/@/': pathResolve('src'),
  },
}


export default viteConfig;