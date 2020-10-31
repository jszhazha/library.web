import type { AppRouteRecordRaw } from '/@/router/types';
import loginRoute from './modules/loginRoute';
import config from '/@/config/'




// 主框架根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  component: () => import('/@/views/frame/about.vue'),
  meta: {
    title: config.systemTitle
  }
};


// 基础路由 不用权限
export const basicRoutes = [loginRoute, RootRoute];