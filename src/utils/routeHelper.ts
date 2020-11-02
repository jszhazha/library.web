import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';


export function genRouteModule(moduleList: AppRouteModule[]) {
  const ret: AppRouteRecordRaw[] = []
  for (const routeMod of moduleList) {
    const routes = routeMod.routes;
    const layout = routeMod.layout;
    layout.children = routes
    ret.push(layout);
  }
  return ret
}