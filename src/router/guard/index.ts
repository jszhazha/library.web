import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './pageLoadingGuard'


export function createGuard(router: Router): void {

  // 创建页面路由守卫
  createPageLoadingGuard(router)
}