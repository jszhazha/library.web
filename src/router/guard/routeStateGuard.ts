import type { Router } from 'vue-router';

import { tabStore } from '/@/store/modules/tab';

// 设置守卫
export function createRouteStateGuard(router: Router): void {
  router.beforeEach(async (to) => {
    const { fullPath, path, query, params, name, meta } = to;
    tabStore.commitLastChangeRouteState({ fullPath, path, query, params, name, meta })
  })
}