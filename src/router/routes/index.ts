import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'
import { getRouteModule } from '/@/utils/helper/route'
import { PageEnum } from '/@/enums/pageEnum'

import { DEFAULT_LAYOUT_COMPONENT } from '../constant'
import { LoginRoutes, ForgetRoute, overviewPage, NoFountPage } from './modules/indexRoute'

// 路由
import systemRouters from './modules/systemRouters'
import bookRouters from './modules/bookRouters'
import accountRouters from './modules/accountRouters'

const routeModuleList: AppRouteModule[] = [
  bookRouters,
  systemRouters,
  accountRouters
]

const routeList = [overviewPage, ...getRouteModule(routeModuleList)]


// 获取菜单 树级
export const getRouteList = (): AppRouteRecordRaw[] => {
  return routeList
}





// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: { name: PageEnum.BASE_HOME },
  meta: {
    title: '首页'
  },
  children: routeList
}


export const basicRoutes = [ ...LoginRoutes, ForgetRoute, RootRoute, NoFountPage]