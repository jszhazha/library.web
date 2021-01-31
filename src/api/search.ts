import type { Result } from "/@/lib/http/axios/types"
import { BookCategory } from "./book-manage/book-category"
import request from "/@/lib/http/axios/"

export interface Search {
  // 主键
  id?: number;

  // 编码
  code?: string;

  // 书名
  name?: string;

  // 国际标准书号(ISBN)
  isbn?: string;

  // 作者
  author?: string;

  // 出版社
  publisher?: string;

  // 描述
  description?: string;

  // 价格
  price?: number;

  // 出版时间
  publicationTime?: string;

  // 学科分类
  bookCategory?: BookCategory

  // 创建者
  createBy?: string

  // 更新者
  updateBy?: string

  // 创建时间
  createTime?: string

  //更新时间
  updateTime?: string
}





export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: { keyword: string, page: number, size: number }): Promise<Result<Search[]>> {
    return request<Result<Search[]>>({
      url: "/api/search/high",
      method: "get",
      params: query
    })
  }
}
