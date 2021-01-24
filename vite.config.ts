import { resolve } from 'path'
import type { UserConfig } from 'vite'
import { loadEnv } from './build/utils'
import { createProxy } from './build/config/vite/proxy'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}
const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_OPEN } = loadEnv()


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
  open: VITE_OPEN,

  // 别名
  alias: {
    '/@/': pathResolve('src')
  },

  /**
   * 基本公共路径
   * @default '/'
  */
  base: VITE_PUBLIC_PATH,

  /**
   * Static asset files smaller than this number (in bytes) will be inlined as
   * base64 strings. Default limit is `4096` (4kb). Set to `0` to disable.
   * @default 4096
   */
  assetsInlineLimit: 4096,

  /**
   * Transpile target for esbuild.
   * @default 'es2020'
   */
  esbuildTarget: 'es2020',

  /**
   * Whether to log asset info to console
   * @default false
   */
  silent: false,

  // 配置Dep优化行为
  // 会使用 rollup 对 包重新编译，将编译成符合 esm 模块规范的新的包放入 node_modules 下的 .
  optimizeDeps: {
    include: [
      '@kangc/v-md-editor/lib/theme/vuepress.js',
      'ant-design-vue/es/locale/zh_CN',
      '@ant-design/icons-vue',
      '@ant-design-vue/use'
    ]
  },


  // 本地跨域代理
  proxy: createProxy(VITE_PROXY)
}


export default viteConfig