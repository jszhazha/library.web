


/**
 * 服务器回复数据
 */
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

