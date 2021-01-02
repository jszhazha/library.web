import store from '/@/store/index'
import { VuexModule, Mutation, Module, getModule, Action } from 'vuex-module-decorators'
import SecurityService, { CSRF, UserInfo } from '/@/api/security'
import { isNull } from '/@/utils/is'

const NAME = 'user'

/**
 * dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的,
 * store,当前模块注册到store上.也可以写在getModule上,即 getModule(PassengerStore,store)
 * namespaced: true, name: 'passenger' 命名空间
 */
@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class User extends VuexModule {
  private userInfoState: UserInfo | null = null

  private tokenState: CSRF | null = null

  // 获取用户信息
  get getUserInfoState(): UserInfo | null {
    return this.userInfoState
  }

  get getTokenState(): CSRF | null {
    return this.tokenState
  }


  @Mutation
  commitResetState(): void {
    this.userInfoState = null
    this.tokenState = null
  }


  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info
  }


  @Mutation
  commitTokenState(info: CSRF): void {
    this.tokenState = info
  }

  @Action
  async getUserInfoAction(): Promise<UserInfo> {

    if (isNull(this.userInfoState)) {
      return new Promise(async (resolve, reject) => {
        try {
          const { data: accountInfo } = await SecurityService.getAccountInfo()
          const { user, _csrf } = accountInfo
          this.commitUserInfoState(user)
          this.commitTokenState(_csrf)
          resolve(user)
        } catch (err) {
          reject(err)
        }
      })
    }
    
    return new Promise((resolve) => {
      resolve(this.userInfoState!)
    })
  }



}

export { User }
export const userStore = getModule<User>(User)