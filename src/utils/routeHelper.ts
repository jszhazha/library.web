import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';

export function routerHasChildren(routerItem: AppRouteRecordRaw): boolean {
  return (
    Reflect.has(routerItem, 'children') &&
    !!routerItem.children &&
    routerItem.children.length > 0
  );
}


export function genRouteModule(moduleList: AppRouteModule[]): AppRouteRecordRaw[] {
  const ret: AppRouteRecordRaw[] = []
  for (const routeMod of moduleList) {
    const routes = routeMod.routes;
    const layout = routeMod.layout;
    layout.children = childroutes(routes, layout.name as string)
    ret.push(layout);
  }
  return ret as AppRouteRecordRaw[];
}

function childroutes(routes: AppRouteRecordRaw[], parentName: string) {
  return routes.map((el) => {
    const route = el;
    route.name = `${parentName}-${route.name as string}`
    if (routerHasChildren(el)) {
      route.children = childroutes(el.children!, el.name as string)
    }
    return route
  })
}