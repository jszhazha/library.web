import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface ProblemManage {
  //  主键
  id?: number

  // 标题
  title?: string

  // 是否展示
  show?: boolean | 1 | 0

  // 内容
  text?: string,

  // 排序值
  sortValue?: number,

  // 图标
  icon?: string

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  //更新时间
  updateTime?: string
}

/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<ProblemManage>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/problem-manage",
      method: "get",
      params: query
    })
  }



  // 保存数据到远程服务器
  static saveNewItem(item: ProblemManage): Promise<Result<ProblemManage>> {
    return request<Result<ProblemManage>>({
      url: "/api/problem-manage",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<ProblemManage>> {
    return request<Result<ProblemManage>>({
      url: "/api/problem-manage/" + id,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: ProblemManage): Promise<Result<ProblemManage>> {
    return request<Result<ProblemManage>>({
      url: "/api/problem-manage/" + id,
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
