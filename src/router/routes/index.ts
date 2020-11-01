import type { AppRouteRecordRaw } from '/@/router/types';

import { DEFAULT_LAYOUT_COMPONENT } from '../constant';
import loginRoute from './modules/loginRoute';




// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: DEFAULT_LAYOUT_COMPONENT,
  meta: {
    title: ''
  }
};


// 基础路由 不用权限
export const basicRoutes = [loginRoute, RootRoute];