


/**
 * 服务器回复数据
 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}


/**
 * 分页请求
 */
export interface PagerQueryData {
  page: number
  size: number
  sorts: Array<string>
  [prop: string]: any
}


/**
 * 分页服务回复
 */
export interface ResponseData<T = any> {
  content: Array<T>,
  totalElements: number
  totalPages: number
}


/**
 * 分页数据结果
 */
export interface PagerResponseData<T> extends Result<ResponseData<T>>{

}
