
import type { Router } from 'vue-router';

export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to) => {
    console.log(to)
  })
}