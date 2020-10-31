import { resolve } from 'path';
import type { UserConfig } from 'vite';
import { loadEnv } from './build/utils'
import { createProxy } from './build/config/vite/proxy';

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = loadEnv();


const viteConfig: UserConfig = {

  /**
   * 端口号
   * @default 3000
   */
  port: VITE_PORT,

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

  /**
   * 基本公共路径
   * @default '/'
  */
  base: VITE_PUBLIC_PATH,

  // 配置Dep优化行为
  // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
  optimizeDeps: {
    include: [
      'ant-design-vue/es/locale/zh_CN',
      '@ant-design/icons-vue',
    ],
  },

  // 本地跨域代理
  proxy: createProxy(VITE_PROXY),
}


export default viteConfig;