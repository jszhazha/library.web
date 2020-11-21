import type { Router } from 'vue-router';


// 设置加载
export function createPageLoadingGuard(router: Router): void {

  router.beforeEach((): void => {
    // console.log(to)
  })
}