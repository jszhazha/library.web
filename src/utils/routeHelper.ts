import type { RouteRecordRaw } from 'vue-router';
import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
// import { createRouter, createWebHistory } from 'vue-router';
// import { toRaw } from 'vue'

// import config from '/@/config/index'

export function genRouteModule(moduleList: AppRouteModule[]): RouteRecordRaw[] {
  const ret: AppRouteRecordRaw[] = []
  for (const routeMod of moduleList) {
    const routes = (routeMod.routes as unknown) as RouteRecordRaw[];
    const layout = routeMod.layout;
    // const router = createRouter({ routes, history: createWebHistory(config.publicPath) });
    // const flatList = toRaw(router.getRoutes()).filter((item) => item.children.length === 0);
    // flatList.forEach((item) => item.path = `${layout.path}${item.path}`);
    layout.children = (routes as unknown) as AppRouteRecordRaw[];
    ret.push(layout);
  }
  return ret as RouteRecordRaw[];
}