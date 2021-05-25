/* eslint-disable @typescript-eslint/no-explicit-any */
import { pointStore } from '/@/store/modules/point'

interface Store {
  uuid: string

  key: string

  value: any
}

// 处理 vuex 使用重载
export function handleStore(type: 'd', { uuid }: { uuid: string }): void

export function handleStore(type: 'u', { uuid, key, value }: Store): void

export function handleStore(type: string, { uuid, key, value }: Store): void {
  const mapState = {
    u: () => {
      // 更新
      pointStore.commitUpdatePointState({ uuid, key, value: value as never })
    },
    d: () => {
      // 删除
      pointStore.commitDeletePointState({ uuid })
    }
  }

  mapState[type as 'u' | 'd']()
}
