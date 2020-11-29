import type { AppRouteRecordRaw } from '/@/router/types'


export const loginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('/@/views/frame/login/index.vue'),
  meta: {
    title: '登录',
    ignoreTab: true
  },
}


/**
 * @description 首页
 */
export const overviewPage: AppRouteRecordRaw = {
  path: 'overview-page',
  name: 'overview-page',
  component: (): unknown => import('/@/views/pages/overview/overview-page.vue'),
  meta: {
    title: '首页',
    affix: true,
    icon: "ant-design:home-outlined"
  }
}