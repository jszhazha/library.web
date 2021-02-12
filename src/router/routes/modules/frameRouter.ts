import type { AppRouteRecordRaw } from '/@/router/types'


export const LoginRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: (): unknown => import('/@/views/frame/login-page/index.vue'),
    meta: {
      title: '登录',
      ignoreAuth: true
    }
  },
  {
    path: '/login/choose-account',
    name: 'login-choose-account',
    component: (): unknown => import('/@/views/frame/login-page/choose-account/index.vue'),
    meta: {
      title: '选择登录帐号'
    }
  }
]

// 密码重置
export const ResetPasswordRoute: AppRouteRecordRaw = {
  path: '/reset-password',
  name: 'reset-password',
  component: () => import('/@/views/frame/reset-password/index.vue'),
  meta: {
    ignoreAuth: true
  }
}

// 编辑
export const EditorRoute: AppRouteRecordRaw = {
  path: '/editor',
  name: 'editor',
  component: () => import('/@/views/frame/editor-page/index.vue'),
  meta: {
    title: '编辑'
  }
}

// 编辑
export const SearchRoute: AppRouteRecordRaw = {
  path: '/search',
  name: 'search',
  component: () => import('/@/views/frame/search-page/index.vue'),
  meta: {
    title: '搜索',
    ignoreAuth: true
  }
}


// 编辑
export const HelpRoute: AppRouteRecordRaw = {
  path: '/help',
  name: 'help',
  component: () => import('/@/views/frame/help-page/index-page.vue'),
  meta: {
    title: '帮助中心',
    ignoreAuth: true
  }
}