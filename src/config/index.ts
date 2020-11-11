import logo from '/@/assets/svg/logo.svg'
import { useSetting } from '/@/hooks/core/useSetting'

const { title, publicPath } = useSetting()

/**
 *  系统配置文件可用于设置使用系统运行的参数
 **/
export default {
  // 系统名称
  title: title,

  // logo
  logo: logo,

  // 路由
  publicPath: publicPath,

  // 主题
  theme: 'dark'

}


