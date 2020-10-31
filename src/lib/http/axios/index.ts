import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'
import { Result } from './types'




export default function request<T extends Result>(requestConfig: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    // 设置用户的请求参数
    const config = requestConfig

    axios.request(config).then((response) => {
      const res = response.data as T
      res.data 
      resolve(res)
    }).then((err) => {
      reject(err)
    })
  })
}
