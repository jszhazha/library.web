/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from "./is"




// 系统模块 path -> 模块
export function queryModule(path: string): string {
    const mapState = {
        'book-category': '学科类别'
    }
    const mapKey = Reflect.ownKeys(mapState)
    const key = mapKey.find((value: string) => new RegExp(value).test(path))
    
    return isString(key) ? (mapState as any)[key] : '未知模块'
}