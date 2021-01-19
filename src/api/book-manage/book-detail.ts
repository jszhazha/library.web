
import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import request from "/@/lib/http/axios/"

export interface BookDetail {
  //  主键
  id?: number;

  // 索书号
  searchCode?: string;

  // 在馆的位置
  address?: string;

  // 归还时间
  backTime?: number;

  // 状态
  status?: string

  // 借出次数
  borrowingTimes?: string

  // 归还次数
  renewalTimes?: string

  // 图书
  bookId?: number
}



/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<BookDetail>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/book-detail",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: BookDetail): Promise<Result<BookDetail>> {
    return request<Result<BookDetail>>({
      url: "/api/book-detail",
      method: "post",
      data: item
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: BookDetail): Promise<Result<BookDetail>> {
    return request<Result<BookDetail>>({
      url: "/api/book-detail/" + id,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemById(id: number): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/api/book-detail/" + id,
      method: "delete"
    })
  }
}
