
import type { Router } from 'vue-router';


// 设置守卫
export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to) => {
    console.log(to)
  })
}