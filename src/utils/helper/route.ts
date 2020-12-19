import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types'

export function routerHasChildren(routerItem: AppRouteRecordRaw): boolean {
  return (
    Reflect.has(routerItem, 'children') &&
    !!routerItem.children &&
    routerItem.children.length > 0
  )
}

/**
 * 获取路由模块
 */
export function getRouteModule(moduleList: AppRouteModule[]): AppRouteRecordRaw[] {
  const ret: AppRouteRecordRaw[] = []
  for (const routeMod of moduleList) {
    const routes = routeMod.routes
    const layout = routeMod.layout
    layout.redirect = { name: `${layout.name}-${layout.redirect?.name}` }
    layout.children = childroutes(routes, layout.name)
    ret.push(layout)
  }
  return ret as AppRouteRecordRaw[]
}

/**
 * 子路由
 */
function childroutes(routes: AppRouteRecordRaw[], parentName: string) {
  return routes.map((route) => {
    route.name = `${parentName}-${route.name as string}`
    if (routerHasChildren(route)) {
      route.children = childroutes(route.children!, route.name)
    }
    return route
  })
}