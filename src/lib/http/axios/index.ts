import type { AxiosRequestConfig } from 'axios';
import axios from 'axios'
import qs from 'qs'
import { Result } from './types'
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { userStore } from '/@/store/modules/user';



export default function request<T extends Result>(requestConfig: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    // 设置用户的请求参数
    let config = requestConfig

    const token = userStore.getTokenState

    if (token) {
      if (!config.headers) config.headers = {}
      config.headers['AUTHORIZATION'] = token
    }

    if (config.headers && config.headers['Content-Type'] === ContentTypeEnum.FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }

    axios.request(config).then((response) => {
      const res = response.data as T
      resolve(res)
    }).catch((err) => {
      reject(err?.response?.data)
    })
  })
}
