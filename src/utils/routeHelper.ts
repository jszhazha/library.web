
import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
// import { createRouter, createWebHashHistory } from 'vue-router';


export function genRouteModule(moduleList: AppRouteModule[]) {
  // const ret: AppRouteRecordRaw = []

  for (const routeMod of moduleList) {
    const routes = routeMod.routes;
    const layout = routeMod.layout;
    // cosnt router = createRouter({routes,history:cre})

  }
}