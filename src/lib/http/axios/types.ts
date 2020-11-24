


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
  pageSize: number
  sorts: Array<string>
  [prop: string]: any
}
