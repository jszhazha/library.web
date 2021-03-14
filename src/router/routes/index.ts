import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'
import { getRouteModule } from '/@/utils/helper/route'
import { PageEnum } from '/@/enums/pageEnum'

import { DEFAULT_LAYOUT_COMPONENT } from '../constant'
import { overviewPage, NoFountPage, IndexPage, Forbidden } from './modules/indexRoutes'
import { LoginRoutes, ResetPasswordRoute, SearchRoute, HelpRoute } from './modules/frameRouters'

// 路由
const modulesRouters = import.meta.globEager('./modules/**-routers.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modulesRouters).forEach((key) => routeModuleList.push(modulesRouters[key].default))


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

const frameRouter = [...LoginRoutes, ResetPasswordRoute, ...SearchRoute, HelpRoute]

const indexRoute = [Forbidden, NoFountPage]

export const basicRoutes = [...frameRouter, IndexPage, RootRoute, ...indexRoute]
