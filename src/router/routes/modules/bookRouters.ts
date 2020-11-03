import type { AppRouteModule  } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';



const routers: AppRouteModule = {
  layout: {
    path: '/book-manage',
    name: 'book-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'subject-category-list-page' },
    meta: {
      title: '图书管理',
    },
  },

  routes: [
    {
      path: "subject-category-list-page",
      name: 'subject-category-list-page',
      component: (): unknown => import(`/@/views/pages/book-manage/subject-category/data-list/list-page.vue`),
      meta: {
        title: '学科类别'
      },
    },
    {
      path: "subject-category-data-page",
      name: 'subject-category-data-page',
      component: (): unknown => import(`/@/views/pages/book-manage/subject-category/data-page/data-page.vue`),
      meta: {
        title: '学科类别详情'
      },
    },
    {
      path: 'book-info-list-page',
      name: 'book-info-list-page',
      component: (): unknown => import(`/@/views/pages/book-manage/book-info/data-list/list-page.vue`),
      meta: {
        title: '图书信息'
      },
    },
    {
      path: 'book-info-data-page',
      name: 'book-info-data-page',
      component: (): unknown => import(`/@/views/pages/book-manage/book-info/data-page/data-page.vue`),
      meta: {
        title: '图书信息详情'
      },
    },
  ]
}



export default routers