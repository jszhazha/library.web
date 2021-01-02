
import type { Router } from 'vue-router'
import { PageEnum } from '/@/enums/pageEnum'
import { userStore } from '/@/store/modules/user'
import { isNull } from '/@/utils/is'

// 设置守卫
export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to, _form, next) => {
    let userInfo = userStore.getUserInfoState

    if (isNull(userInfo)) {
      const data = await userStore.getAccountInfoAction()
      userInfo = data.user
    }

    const { ignoreAuth } = to.meta

    if (ignoreAuth) {
      // 忽略身份验证,直接跳转
      next()
    } else if (isNull(userInfo.id)) {
      // 身份要验证,但是没有登录,跳转到登录页面
      next({ name: PageEnum.BASE_LOGIN })
    } else if (to.name === PageEnum.BASE_LOGIN) {
       // 已登录, 但是要跳转到登录页面重定向
      next({ name: PageEnum.BASE_HOME })
    } else {
      next()
    }
  })
}