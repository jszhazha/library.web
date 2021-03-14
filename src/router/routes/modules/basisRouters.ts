import type { AppRouteModule } from '/@/router/types'

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant'

const routers: AppRouteModule = {
  layout: {
    path: 'basis-manage',
    name: 'basis-manage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: { name: 'date-manage-list-page' },
    meta: {
      title: '基础数据',
      icon: 'ant-design:appstore-outlined'
    }
  },

  routes: [
    {
      path: 'date-manage-list-page',
      name: 'date-manage-list-page',
      component: (): unknown =>
        import(`/@/views/pages/basis-manage/date-manage/data-list/list-page.vue`),
      meta: {
        title: '日期管理'
      }
    },
    {
      path: 'data-dictionary-list-page',
      name: 'data-dictionary-list-page',
      component: (): unknown =>
        import(`/@/views/pages/basis-manage/data-dictionary/data-list/list-page.vue`),
      meta: {
        title: '数据字典'
      }
    },
    {
      path: 'data-dictionary-data-page',
      name: 'data-dictionary-data-page',
      component: (): unknown =>
        import(`/@/views/pages/basis-manage/data-dictionary/data-page/data-page.vue`),
      meta: {
        title: '数据字典详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true
      }
    },
    {
      path: 'problem-manage-list-page',
      name: 'problem-manage-list-page',
      component: (): unknown =>
        import(`/@/views/pages/basis-manage/problem-manage/data-list/list-page.vue`),
      meta: {
        title: '问题管理',
        auth: ['PROBLEM_MANAGE_READ']
      }
    },
    {
      path: 'problem-manage-data-page',
      name: 'problem-manage-data-page',
      component: (): unknown =>
        import(`/@/views/pages/basis-manage/problem-manage/data-page/data-page.vue`),
      meta: {
        title: '问题管理详情',
        hideInMenu: true,
        ignoreTabKeepAlive: true,
        auth: {
          new: ['PROBLEM_MANAGE_CREATE'],
          view: ['PROBLEM_MANAGE_READ'],
          edit: ['PROBLEM_MANAGE_UPDATE']
        }
      }
    }
  ],
  sortValue: 1
}

export default routers
