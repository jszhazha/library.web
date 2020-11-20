import logo from '/@/assets/svg/logo.svg'
import { useSetting } from '/@/hooks/core/useSetting'

const { title, publicPath } = useSetting()

/**
 *  系统配置文件可用于设置使用系统运行的参数
 **/

interface Config {
  title: string,

  logo: string,

  publicPath: string

  theme: "dark" | "light" | undefined,

  menuWidth: number,

  collapsed: boolean;

  collapsedWidth: number
}


const config: Config = {
  // 系统名称
  title: title,

  // logo
  logo: logo,

  // 路由
  publicPath: publicPath,

  // 主题
  theme: 'dark',

  // 菜单宽度
  menuWidth: 260,

  // 菜单是否收起状态
  collapsed: false,

  // 收缩宽度
  collapsedWidth: 49
}



export default config

