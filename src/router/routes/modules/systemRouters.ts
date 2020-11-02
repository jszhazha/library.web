import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const routers: AppRouteModule = {
  layout: {
    path: '/system-manager',
    name: 'system-manager',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/system-manager/user-manage',
    meta: {
      title: '系统管理',
    },
  },

  routes: [
    {
      path: "user-manage",
      name: 'user-manage',
      meta: {
        title: '用户管理'
      },
    },
    {
      path: "user-manage-page",
      name: 'user-manage-page',
      meta: {
        title: '用户详情'
      },
    },
    {
      path: 'role-manager',
      name: 'role-manager',
      meta: {
        title: '角色管理'
      },
    },
    {
      path: 'role-manager-page',
      name: 'role-manager-page',
      meta: {
        title: '角色详情'
      },
    },
  ]
}



export default routers