import type { Result } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface Authority {
  [prop: string]: unknown
}



export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(): Promise<Result<Authority>> {
    return request<Result<Authority>>({
      url: "/api/authority",
      method: "get"
    })
  }
}
