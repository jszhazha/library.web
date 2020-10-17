import type { Router } from 'vue-router';


export function createPageLoadingGuard(router: Router): void {

  router.beforeEach((to): void => {
    console.log(to)
  })
}