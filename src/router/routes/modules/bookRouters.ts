import type { AppRouteModule  } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';

const BASE_PATH = '/@/views/pages/book-manage'

const LIST_PATH = '/data-list/list-page.vue'

const DATA_PATH = '/data-page/data-page.vue'


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
      component: (): unknown => import(`${BASE_PATH}/subject-category${LIST_PATH}`),
      meta: {
        title: '学科类别'
      },
    },
    {
      path: "subject-category-data-page",
      name: 'subject-category-data-page',
      component: (): unknown => import(`${BASE_PATH}/subject-category${DATA_PATH}`),
      meta: {
        title: '学科类别详情'
      },
    },
    {
      path: 'book-info-list-page',
      name: 'book-info-list-page',
      component: (): unknown => import(`${BASE_PATH}/book-info${LIST_PATH}`),
      meta: {
        title: '图书信息'
      },
    },
    {
      path: 'book-info-data-page',
      name: 'book-info-data-page',
      component: (): unknown => import(`${BASE_PATH}/book-info${DATA_PATH}`),
      meta: {
        title: '图书信息详情'
      },
    },
  ]
}



export default routers