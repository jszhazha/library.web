import type { Result, PagerQueryData, PagerResponseData } from '/@/lib/http/axios/types'
import request from '/@/lib/http/axios/'

export interface SubjectCategory {

  //  主键
  id?: number

  // 类别名
  name?: string

  // 类别号
  code?: string
}


/**
 * 分页结果定义
 */
export type DataPager = PagerResponseData<SubjectCategory>



export default class Service {

  // 向服务查询数据并分页返回结果
  static fecthList(query?: PagerQueryData): Promise<DataPager> {
    return request<DataPager>({
      url: '/api/book-category',
      method: 'get',
      data: query
    })
  }

  // 保存数据到远程服务器
  static saveNewItem(item: SubjectCategory): Promise<Result<SubjectCategory>> {
    return request<Result<SubjectCategory>>({
      url: "/api/book-category",
      method: "post",
      data: item
    })
  }

  // 删除指定ID的数据
  static deleteItemByIds (ids: Array<number>): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/api/book-category',
      method: 'delete',
      data: ids
    })
  }
}