/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from "./is"

export const rules = {
  telephone: /^1\d{10}$/,

  dataPage: /data-page$/
}


interface Parameter {
  data: string,
  rule: 'telephone' | 'dataPage'
}

// 检查数据
export function validData({ data, rule }: Parameter): boolean {
  return rules[rule].test(data)
}






// 系统模块 path -> 模块
export function queryModule(path: string): string {
  const mapState = {
    'book-category': '图书类别',
    'book': "图书信息"
  }
  const mapKey = Reflect.ownKeys(mapState)
  const key = mapKey.find((value: string) => new RegExp(value).test(path))

  return isString(key) ? (mapState as any)[key] : "未知模块"
}
