import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

const routers: AppRouteModule = {
  layout: {
    path: 'book-manage',
    name: 'book-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'book-category-list-page' },
    meta: {
      title: '图书管理',
      icon: 'ant-design:book-outlined'
    }
  },

  routes: [
    {
      path: 'book-category-list-page',
      name: 'book-category-list-page',
      component: (): unknown =>
        import(`/@/views/pages/book-manage/book-category/data-list/list-page.vue`),
      meta: {
        title: '图书类别',
        auth: ['BOOK_CATEGORY_READ'],
        keepAlive: true
      }
    },
    {
      path: 'book-category-data-page',
      name: 'book-category-data-page',
      component: (): unknown =>
        import(`/@/views/pages/book-manage/book-category/data-page/data-page.vue`),
      meta: {
        title: '图书类别详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['BOOK_CATEGORY_CREATE'],
          view: ['BOOK_CATEGORY_READ'],
          edit: ['BOOK_CATEGORY_UPDATE']
        }
      }
    },
    {
      path: 'book-info-list-page',
      name: 'book-info-list-page',
      component: (): unknown =>
        import(`/@/views/pages/book-manage/book-info/data-list/list-page.vue`),
      meta: {
        title: '图书信息',
        auth: ['BOOK_READ', 'BOOK_CATEGORY_READ'],
        keepAlive: true
      }
    },
    {
      path: 'book-info-data-page',
      name: 'book-info-data-page',
      component: (): unknown =>
        import(`/@/views/pages/book-manage/book-info/data-page/data-page.vue`),
      meta: {
        title: '图书信息详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['BOOK_CREATE'],
          view: ['BOOK_READ'],
          edit: ['BOOK_UPDATE']
        }
      }
    }
  ],
  sortValue: 2
}

export default routers
