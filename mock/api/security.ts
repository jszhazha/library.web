import { MockMethod } from 'vite-plugin-mock';




export default [
  {
    url: '/api/user/me',
    method: 'get',
    response: {
      code: 200,
      msg: 'OK',
      data: {
        user: {
          id: 1,
          username: 'admin'
        },
        _csrf: {
          token: 'a762091f-6812-404e-b63f-2380d4bd95d8',
          parameterName: '',
          headerName: ''
        }
      }
    }
  }


] as MockMethod[]