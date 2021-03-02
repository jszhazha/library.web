import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '../_utils'

export default [
  {
    url: '/api/user/me',
    method: 'get',
    response: () => {
      return resultSuccess({
        user: {
          id: 1,
          username: 'admin'
        },
        _csrf: {
          token: '662C63B4-FD43-66F4-3328-C54E3FF0D56E',
          parameterName: 'XSRF',
          headerName: 'XSRF-TOKEN'
        }
      })
    }
  }
] as MockMethod[]
