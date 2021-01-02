
import type { Router } from 'vue-router'
// import { PageEnum } from '/@/enums/pageEnum'
import { userStore } from '/@/store/modules/user'
import { isDef } from '/@/utils/is'

// 设置守卫
export function createPermissionGuard(router: Router): void {
  router.beforeEach(async (to) => {
    const tokenState = userStore.getTokenState

    if(isDef(tokenState)){
      const data = await userStore.getAccountInfoAction()
      console.log(data)
    }
    console.log()
    console.log(to.name)

  })
}