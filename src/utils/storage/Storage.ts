import { DEFAULT_CACHE_TIME } from '/@/config/encryptionSetting'
import { isString, isEmpty, isNumber } from '/@/utils/is'
import { stringify } from '/@/utils/stringify'
import md5 from 'md5'

export interface CreateStorage {
  set: (key: string, value: unknown) => void
  get: (key: string) => unknown
  remove: (key: string) => void
}


export const createStorage = ({ storage = sessionStorage } = {}): CreateStorage => {
  class WebStorage {
    private storage: Storage

    constructor() {
      this.storage = storage
    }

    // 获取 键 
    private getKey(key: string): string {
      return md5(`${key}`).toUpperCase()
    }

    // 设置 键值
    set(key: string, value: unknown, expire = DEFAULT_CACHE_TIME): void {
      // 有数据再进行缓存
      const result = stringify(value)
      if (isString(result)) {
        const stringData = stringify({ value, expire: new Date().getTime() + expire * 1000 })
        this.storage.setItem(this.getKey(key), stringData as string)
      }
    }

    // 读取 键值
    get(key: string, def = null): unknown {
      const item = this.storage.getItem(this.getKey(key))
      if (item) {
        // 防止 item 不符合 JSON 格式
        try {
          const { value, expire } = JSON.parse(item)
          if (isEmpty(value) && isNumber(expire) && expire >= new Date().getTime()) {
            return value
          }
          throw 'value null'
        } catch (e) {
          return (this.remove(key), def)
        }
      }
      return def
    }

    // 删除 键值
    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }
  }
  return new WebStorage()
}