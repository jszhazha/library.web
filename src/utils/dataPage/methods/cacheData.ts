import type { CreateStorage } from "/@/utils/storage/Storage"
import useToast from "/@/components/Toast"
import toastNotice from './toastNotice'



// 新建状态 检查缓存中是否有数据 ()
export function checkCacheData<T>(name: string, storage: CreateStorage, callback: (data: T) => void): void {
  const data = storage.get(name) as T
  if (data) {
    useToast.cache(
      {
        component: toastNotice,
        listeners: {
          // 从缓存中读取数据
          confirmToast: () => callback(data),
          // 删除数据 不主动删除数据
          removeItem: () => storage.remove(name)
        }
      }
    )
  }
}


// 缓存数据
export function cacheData<T>(name: string, storage: CreateStorage, dataItem: T): void {
  storage.set(name, dataItem)
}