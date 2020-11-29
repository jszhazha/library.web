import type { Router } from 'vue-router'
import config from '/@/config/index'

/**
 * 设置页面标题
 * @param {*} title  :页面标题
 */
const setDocumentTitle = (title: string) => {
  document.title = title
}


export function createPageTitleGuard(router: Router): void {
  router.beforeEach((to) => {
    setTimeout(() => {
      if (to.meta.title) {
        const title = config.title
        const _title = to.meta.title ? ` ${to.meta.title} ● ${title} ` : `${title}`
        setDocumentTitle(_title)
      }
    }, 30)
  })
}
