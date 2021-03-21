import type { App } from 'vue'
import { showByAuth } from '../hooks/web/useAuthorities'
import { useMoment } from '/@/utils/dateFormat'
import config from '/@/config'
import { PageMode } from '../utils/helper/breadcrumb'




export default class MixinPlugins {
  static init(app: App<Element>): void {
    app.mixin({
      data() {
        return {
          // 配置
          MixinConfig: config,

          // 页面配置
          MixinPageMode: PageMode
        }
      },
      methods: {
        // 判断 角色是否有当前权限
        MixinShowByAuth: showByAuth,

        // 日期格式
        MixinUseMoment: useMoment

      }
    })
  }
}
