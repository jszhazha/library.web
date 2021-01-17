import type { Result, PagerQueryData, PagerResponseData } from "/@/lib/http/axios/types"
import { BookCategory } from "./book-category"
import request from "/@/lib/http/axios/"


export interface BookInfo {
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

  // 学科分类 ID
  bookCategoryId?: number

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



/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<BookInfo>

export default class Service {
  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: "/api/book",
      method: "get",
      params: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: BookInfo): Promise<Result<BookInfo>> {
    return request<Result<BookInfo>>({
      url: "/api/book",
      method: "post",
      data: item
    })
  }

  // 通过ID取得数据
  static getItemById(id: number): Promise<Result<BookInfo>> {
    return request<Result<BookInfo>>({
      url: "/api/book/" + id,
      method: "get"
    })
  }

  // 更新数据到远程服务器
  static updateItem(id: number, item: BookInfo): Promise<Result<BookInfo>> {
    return request<Result<BookInfo>>({
      url: "/api/book/" + id,
      method: "put",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemByIds(ids: Array<number>): Promise<Result<null>> {
    return request<Result<null>>({
      url: "/api/book",
      method: "delete",
      data: ids
    })
  }
}
