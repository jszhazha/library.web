import type { Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'
import { useAuthorities } from '/@/hooks/web/useAuthorities'

// 设置角色守卫
export function createPageRoleGuard(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    // 获取页面权限
    const { auth } = to.meta as { auth?: string[] }
    // 结果
    const result = useAuthorities(auth)

    if (result) {
      next()
    } else {
      next({ name: PageEnum.FORBIDDEN_PAGE })
    }
  })
}
