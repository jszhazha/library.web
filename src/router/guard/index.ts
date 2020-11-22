import type { Router } from 'vue-router'
import { createPageLoadingGuard } from './pageLoadingGuard'
import { createPageTitleGuard } from './pageTitleGuard';
import { createPermissionGuard } from './permissionGuard';
import {createRouteStateGuard} from './routeStateGuard'


export function createGuard(router: Router): void {
  // 路由拦截
  createRouteStateGuard(router)

  // 权限拦截
  createPermissionGuard(router)

  // 加载
  createPageLoadingGuard(router)

  // 设置页面标题
  createPageTitleGuard(router)
}