import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface BookCategory {
  //  主键
  id?: number;

  // 类别名
  name?: string;

  // 编码
  code?: string;

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
export type DataPager = PagerResponseData<BookCategory>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/book-category",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: BookCategory): Promise<Result<BookCategory>> {
    return request<Result<BookCategory>>({
      url: "/api/book-category",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<BookCategory>> {
    return request<Result<BookCategory>>({
      url: "/api/book-category/" + id,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: BookCategory): Promise<Result<BookCategory>> {
    return request<Result<BookCategory>>({
      url: "/api/book-category/" + id,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemByIds(ids: Array<number>): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/api/book-category",
      method: "delete",
      data: ids
    })
  }
}
