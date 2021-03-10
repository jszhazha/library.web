import type { App } from 'vue'
import { useAuthorities } from '../hooks/web/useAuthorities'
import { isString } from '../utils/is'

export default class MixinPlugins {
  static init(app: App<Element>): void {
    app.mixin({
      methods: {
        // 判断 角色是否有当前权限
        MixinShowByAuth(auth: string) {
          if (!auth || !isString(auth)) return true
          return useAuthorities([auth])
        }
      }
    })
  }
}
