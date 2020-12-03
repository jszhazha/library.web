import type { AppRouteRecordRaw } from '/@/router/types'


export const LoginRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: (): unknown => import('/@/views/frame/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/login/choose-account',
    name: 'login-choose-account',
    component: (): unknown => import('/@/views/frame/login/choose-account/index.vue'),
    meta: {
      title: '选择登录帐号',

    },
  }
]

export const ForgetRoute: AppRouteRecordRaw = {
  path: '/forget',
  name: 'forget',
  component: () => import('/@/views/frame/forget/index.vue'),
  meta: {
    ignoreTab: true
  },
}


/**
 * @description 后台管理系统 首页
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

/**
 * @description 系统首页
 */
export const IndexPage: AppRouteRecordRaw = {
  path: '/',
  name: 'index-page',
  component: (): unknown => import('/@/views/pages/index-page/index.vue'),
  meta: {
    title: '首页',
  }
}


/**
 * @description 页面丢失
 */
export const NoFountPage: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'no-fount-page',
  component: (): unknown => import("/@/views/pages/exception/404.vue"),
  meta: {
    title: '404',
    ignoreTab: true
  },
}
