import type { AppRouteRecordRaw } from '/@/router/types';


/**
 * @description: 默认路由
 */
export const DEFAULT_LAYOUT_COMPONENT = (): unknown => import('/@/views/layout/default/index');



/**
 * @description: 页面布局
 */
export const PAGE_LAYOUT_COMPONENT = (): unknown => import('/@/views/layout/page/index');


/**
 * @description 主页
 */
export const OVERVIEW_PAGE: AppRouteRecordRaw = {
  path: 'overview-page',
  name: 'overview-page',
  component: (): unknown => import('/@/views/pages/overview/overview-page.vue'),
  meta: {
    title: ''
  }
}