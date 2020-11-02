import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const routers: AppRouteModule = {
  layout: {
    path: '/book-manage',
    name: 'book-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/book-manage/subject-category',
    meta: {
      title: '主数据管理',
    },
  },

  routes: [
    {
      path: "subject-category",
      name: 'subject-category',
      meta: {
        title: '学科类别'
      },
    },
    {
      path: "subject-category-page",
      name: 'subject-category-page',
      meta: {
        title: '学科类别详情'
      },
    },
    {
      path: '/book-info',
      name: 'book-info',
      meta: {
        title: '图书信息'
      },
    },
    {
      path: '/book-info-page',
      name: 'book-info-page',
      meta: {
        title: '图书信息详情'
      },
    },
  ]
}



export default routers