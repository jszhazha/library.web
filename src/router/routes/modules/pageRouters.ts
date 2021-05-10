import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

const routers: AppRouteModule = {
  layout: {
    path: 'book-manage',
    name: 'book-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'book-category-list-page' },
    meta: {
      title: '页面管理',
      icon: 'ant-design:file-text-outlined'
    }
  },

  routes: [
  ],
  sortValue: 4
}

export default routers
