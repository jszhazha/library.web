import type { PointInfo } from '/@/lib/interface/PointInfo'
import store from '/@/store/index'
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators'


const NAME = 'component'

/**
 * dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的,
 * store,当前模块注册到store上.也可以写在getModule上,即 getModule(PassengerStore,store)
 * namespaced: true, name: 'passenger' 命名空间
 */
@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Point extends VuexModule {

  // 组件数据
  private pointDataState: PointInfo[] = []

  // 获取组件数据
  get getPointState(): PointInfo[] {
    return this.pointDataState
  }

  // 添加数据
  @Mutation
  commitPointState(data:PointInfo): void {
    this.pointDataState.push(data)
  }
}



export { Point }
export const pointStore = getModule<Point>(Point)
