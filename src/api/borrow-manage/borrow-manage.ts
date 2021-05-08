import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface BorrowManage {
  //  主键
  id?: number

  // 流水号
  code?: string

  // 索书号
  bookCode?: string

  // 归还日期
  revertDate?: string

  // 状态
  state?: string

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
export type DataPager = PagerResponseData<BorrowManage>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/epi/borrow",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: BorrowManage): Promise<Result<BorrowManage>> {
    return request<Result<BorrowManage>>({
      url: "/epi/borrow",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<BorrowManage>> {
    return request<Result<BorrowManage>>({
      url: "/epi/borrow/" + id,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: BorrowManage): Promise<Result<BorrowManage>> {
    return request<Result<BorrowManage>>({
      url: "/epi/borrow/" + id,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/epi/borrow/" + id,
      method: "delete"
    })
  }
}
