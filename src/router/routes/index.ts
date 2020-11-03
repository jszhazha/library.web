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

const MenuRouter = genRouteModule(routeModuleList)


// 获取菜单 树级
export const getMenus = (): AppRouteRecordRaw[] => {
  return MenuRouter
};



// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'root-router',
  component: DEFAULT_LAYOUT_COMPONENT,
  meta: {
    title: ''
  },
  children: MenuRouter
};


export const basicRoutes = [loginRoute, RootRoute];