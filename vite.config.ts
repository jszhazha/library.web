import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { loadEnv } from './build/utils'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
loadEnv()


const viteConfig: UserConfig = {

  /**
   * 端口号
   * @default 3000
   */
  port: 3000,

  /**
   * 服务地址
   * @default 'localhost'
   */
  hostname: 'localhost',

  /**
   * 运行自动打开浏览器·
   * @default 'false'
   */
  open: true,

  // 别名
  alias: {
    '/@/': pathResolve('src'),
  },
}


export default viteConfig;