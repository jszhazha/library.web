import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const BASE_PATH = '/@/views/pages/system-manage'

const LIST_PATH = '/data-list/list-page.vue'

const DATA_PATH = '/data-page/data-page.vue'


const routers: AppRouteModule = {
  layout: {
    path: '/system-manage',
    name: 'system-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'user-manage-list-page' },
    meta: {
      title: '系统管理',
    },
  },

  routes: [
    {
      path: "user-manage-list-page",
      name: 'user-manage-list-page',
      component: (): unknown => import(`${BASE_PATH}/user-manage${LIST_PATH}`),
      meta: {
        title: '用户管理'
      },
    },
    {
      path: "user-manage-data-page",
      name: 'user-manage-data-page',
      component: (): unknown => import(`${BASE_PATH}/user-manage${DATA_PATH}`),
      meta: {
        title: '用户详情'
      },
    },
    {
      path: 'role-manage-list-page',
      name: 'role-manage-list-page',
      component: (): unknown => import(`${BASE_PATH}/role-manage${LIST_PATH}`),
      meta: {
        title: '角色管理'
      },
    },
    {
      path: 'role-manage-data-page',
      name: 'role-manage-data-page',
      component: (): unknown => import(`${BASE_PATH}/role-manage${DATA_PATH}`),
      meta: {
        title: '角色详情'
      },
    },
  ]
}



export default routers