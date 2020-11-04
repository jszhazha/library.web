import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';


export function genRouteModule(moduleList: AppRouteModule[]): AppRouteRecordRaw[] {
  const ret: AppRouteRecordRaw[] = []
  for (const routeMod of moduleList) {
    const routes = routeMod.routes;
    const layout = routeMod.layout;
    layout.children = (routes as unknown) as AppRouteRecordRaw[];
    ret.push(layout);
  }
  return ret as AppRouteRecordRaw[];
}