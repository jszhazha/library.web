import type { PointInfo } from '/@/lib/interface/PointInfo'
import store from '/@/store/index'
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators'

const NAME = 'component'

interface UpdatePointState {
  // 唯一值
  uuid: string
  // 下标
  key: keyof PointInfo
  // 值
  value: never
}
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
  commitAddPointState(data: PointInfo): void {
    this.pointDataState.push(data)
  }

  // 更新数据
  @Mutation
  commitUpdatePointState({ uuid, key, value }: UpdatePointState): void {
    // 查找数据
    const point = this.pointDataState.find((el) => el.uuid === uuid)

    // 更新数据
    point && (point[key] = value)
  }

  // 清空
  @Mutation
  commitEmptyPointState():void{
    this.pointDataState = []
  }
}

export { Point }
export const pointStore = getModule<Point>(Point)
