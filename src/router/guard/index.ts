import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './pageLoadingGuard'
import { createPageTitleGuard } from './pageTitleGuard';
import { createPermissionGuard } from './permissionGuard';


export function createGuard(router: Router): void {

  // 设置菜单
  createPermissionGuard(router)

  // 创建页面路由守卫
  createPageLoadingGuard(router)

  // 设置页面标题
  createPageTitleGuard(router)
}