import type { AppRouteRecordRaw } from '/@/router/types'

/**
 * @description 概述页面
 */
export const OverviewPage: AppRouteRecordRaw = {
  path: 'overview-page',
  name: 'overview-page',
  component: (): unknown => import('/@/views/pages/overview/overview-page.vue'),
  meta: {
    title: '首页',
    affix: true,
    icon: 'ant-design:home-outlined'
  }
}

/**
 * @description 系统首页
 */
export const IndexPage: AppRouteRecordRaw = {
  path: '/',
  name: 'index-page',
  component: (): unknown => import('/@/views/frame/index-page/index-page.vue'),
  meta: {
    title: '首页',
    ignoreAuth: true
  }
}

/**
 * @description 页面丢失
 */
export const NoFountPage: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'no-fount-page',
  component: (): unknown => import('/@/views/pages/exception/404.vue'),
  meta: {
    title: '404',
    ignoreTab: true,
    ignoreAuth: true
  }
}

/**
 * @description 没有权限, 禁止访问
 */
export const Forbidden: AppRouteRecordRaw = {
  path: '/403',
  name: 'forbidden-page',
  component: (): unknown => import('/@/views/pages/exception/403.vue'),
  meta: {
    title: '403',
    ignoreTab: true,
    ignoreAuth: true
  }
}