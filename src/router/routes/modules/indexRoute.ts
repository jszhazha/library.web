import type { AppRouteRecordRaw } from '/@/router/types'


export const loginRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: (): unknown => import('/@/views/frame/login/index.vue'),
    meta: {
      title: '登录',
      ignoreTab: true
    },
  },
  {
    path: '/login/choose-account',
    name: 'login-choose-account',
    component: (): unknown => import('/@/views/frame/login/choose-account/index.vue'),
    meta: {
      title: '选择登录帐号',
      ignoreTab: true
    },
  }
]

export const forgetRoute: AppRouteRecordRaw = {
  path: '/forget',
  name: 'forget',
  component: () => import('/@/views/frame/forget/index.vue'),
  meta: {
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