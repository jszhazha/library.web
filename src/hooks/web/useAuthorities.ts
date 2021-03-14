import { userStore } from '/@/store/modules/user'
import { isString } from '/@/utils/is'

// 判断是否有权限
export function useAuthorities(auth: string[] = []): boolean {
  const authorities = userStore.getAuthorities

  return auth?.length ? auth.every((el) => authorities.includes(el)) : true
}


export function showByAuth(auth: string): boolean {
  if (!auth || !isString(auth)) return true
  return useAuthorities([auth])
}