import { userStore } from '/@/store/modules/user'

// 判断是否有权限
export function useAuthorities(auth: string[] = []): boolean {
  const authorities = userStore.getAuthorities

  return auth?.length ? auth.every((el) => authorities.includes(el)) : true
}
