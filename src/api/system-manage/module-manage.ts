import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface ModuleManage {
  //  主键
  id?: number

  // 权限项名称
  name?: string

  // 权限项
  authorities?: string

  // 内容
  description?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  //更新时间
  updateTime?: string
}

// 权限项
export interface Authority {
  [prop: string]: unknown
}


/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<ModuleManage>

export default class Service {

  static fecthListByAuthority(): Promise<Result<Authority>> {
    return request<Result<Authority>>({
      url: "/api/authority",
      method: "get"
    })
  }

  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/modular",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: ModuleManage): Promise<Result<ModuleManage>> {
    return request<Result<ModuleManage>>({
      url: "/api/modular",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(name: string): Promise<Result<ModuleManage>> {
    return request<Result<ModuleManage>>({
      url: "/api/modular/" + name,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(name: string, item: ModuleManage): Promise<Result<ModuleManage>> {
    return request<Result<ModuleManage>>({
      url: "/api/modular/" + name,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/api/problem-manage/" + id,
      method: "delete"
    })
  }
}
