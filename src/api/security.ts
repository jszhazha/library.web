import type { Result } from '/@/lib/http/axios/types'
import type { RoleManage } from './system-manage/role-mange'
import request from '/@/lib/http/axios/'
import { ContentTypeEnum } from '/@/enums/httpEnum'

export interface UserInfo {
  // 主键
  id?: number

  // 账户名称
  username?: string

  // 昵称
  nickName?: string

  // 角色权限
  roles: RoleManage[]

  // 电话
  mobile?: string

  // 邮件
  email?: string

  // 性别
  sex?: string

  // 图片
  md5?: string

  // 账户未过期
  accountNonExpired?: boolean

  // 账户未锁定
  accountNonLocked?: boolean

  // 凭证是否过期
  credentialsNonExpired?: boolean

  // 是否禁用
  enabled?: boolean
}


export interface Register {
  // 账户
  username?: string

  // 密码
  password?: string

  // 电话
  mobile?: string

  // 邮箱
  email?: string

  // 重复
  repeat?: string

}

export interface CSRF {
  // 用户标识符
  token: string

  // 参数名称
  parameterName: string

  // 请求头名称
  headerName: string
}

export interface Security {
  user: UserInfo
  _csrf: CSRF
}

export interface LoginParams {
  password: string

  username: string
}

export default class Service {
  // 获取用户信息和token
  static getAccountInfo(): Promise<Result<Security>> {
    return request<Result<Security>>({
      url: '/api/user/me',
      method: 'get'
    })
  }

  // 登录
  static loginApi(data: LoginParams): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/api/user/login',
      method: 'post',
      data: data,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_URLENCODED
      }
    })
  }

  // 退出
  static logoutApi(): Promise<Result<null>> {
    return request<Result<null>>({
      url: '/api/user/logout',
      method: 'post'
    })
  }
}
