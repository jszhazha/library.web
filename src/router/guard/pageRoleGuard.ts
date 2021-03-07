import type { Router } from 'vue-router'
// import { PageEnum } from '/@/enums/pageEnum'
import { userStore } from '/@/store/modules/user'

// 设置角色守卫
export function createPageRoleGuard(router: Router): void {
  router.beforeEach(async (to, _from, next) => {
    // 获取当前用户全部权限
    const authorities = await userStore.gatAuthoritiesAction()
    // 获取页面权限
    const { auth } = to.meta as { auth?: string[] }
    // 结果
    const result = auth?.length ? auth.every(el => authorities.includes(el)) : true

    if (result) {
      next()
    } else {
      next('/403')
    }
  })
}