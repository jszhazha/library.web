
export interface CreateStorage {
  set: (key: string, value: unknown) => void
  get: (key: string) => unknown
  remove: (key: string) => void
}


export const createStorage = ({ storage = sessionStorage } = {}): CreateStorage => {
  class WebStorage {
    private storage: Storage;

    constructor() {
      this.storage = storage;
    }

    // 获取 键 
    private getKey(key: string): string {
      return `${key}`.toUpperCase()
    }

    // 设置 键值
    set(key: string, value: unknown): void {
      const stringData = JSON.stringify({ value })
      this.storage.setItem(this.getKey(key), stringData)
    }

    // 读取 键值
    get(key: string): unknown {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        const { value } = JSON.parse(item)
        return value
      }
      return ''
    }

    // 删除 键值
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }
  }
  return new WebStorage()
}