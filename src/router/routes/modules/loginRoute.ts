import type { AppRouteRecordRaw } from '/@/router/types';

const routes: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('/@/views/frame/login/index.vue'),
  meta: {
    title: '登录',
  },
};

export default routes;