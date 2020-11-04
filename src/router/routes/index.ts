import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { genRouteModule } from '/@/utils/routeHelper'

import { DEFAULT_LAYOUT_COMPONENT } from '../constant';
import loginRoute from './modules/loginRoute';

// 路由
import systemRouters from './modules/systemRouters'
import bookRouters from './modules/bookRouters'

const routeModuleList: AppRouteModule[] = [
  bookRouters,
  systemRouters,
]

const routeList = genRouteModule(routeModuleList)


// 获取菜单 树级
export const getRouteList = (): AppRouteRecordRaw[] => {
  return routeList
};



// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  meta: {
    title: ''
  },
  children: routeList
};


export const basicRoutes = [loginRoute, RootRoute];