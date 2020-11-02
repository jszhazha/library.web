import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const routers: AppRouteModule = {
  layout: {
    path: '/system-manage',
    name: 'system-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/system-manage/user-manage',
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
      path: 'role-manage',
      name: 'role-manage',
      meta: {
        title: '角色管理'
      },
    },
    {
      path: 'role-manage-page',
      name: 'role-manage-page',
      meta: {
        title: '角色详情'
      },
    },
  ]
}



export default routers