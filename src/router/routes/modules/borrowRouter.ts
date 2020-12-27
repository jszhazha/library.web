import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'



const routers: AppRouteModule = {
  layout: {
    path: 'borrow-manage',
    name: 'borrow-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'book-borrow-list-page' },
    meta: {
      title: '借阅管理',
      icon: 'ant-design:database-outlined'
    }
  },

  routes: [
    {
      path: "book-borrow-list-page",
      name: 'book-borrow-list-page',
      component: (): unknown => import(`/@/views/pages/system-manage/user-manage/data-list/list-page.vue`),
      meta: {
        title: '图书借阅'
      }
    },
    {
      path: 'book-renew-list-page',
      name: 'book-renew-list-page',
      component: (): unknown => import(`/@/views/pages/system-manage/role-manage/data-list/list-page.vue`),
      meta: {
        title: '图书续借'
      }
    },
    {
      path: "book-revert-list-page",
      name: 'book-revert-list-page',
      component: (): unknown => import(`/@/views/pages/system-manage/user-manage/data-list/list-page.vue`),
      meta: {
        title: '图书归还'
      }
    }
  ]
}



export default routers