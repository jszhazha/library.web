import type { RouteRecordRaw } from 'vue-router'
import { RoleEnum } from '/@/enums/roleEnum'


export interface RouteMeta {

  // 标题
  title?: string;

  // 忽略身份验证
  ignoreAuth?: boolean;

  // 角色信息
  roles?: RoleEnum[];

  // 缓存页面
  keepAlive?: boolean,

  // 忽略标签缓存
  ignoreKeepAlive?: boolean;

  // 菜单隐藏
  hideInMenu?: boolean

  // 图标
  icon?: string;

  // 固定标签
  affix?: boolean,

  // 忽略标签
  ignoreTab?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'name' | 'redirect'> {

  name: string

  meta: RouteMeta

  children?: AppRouteRecordRaw[]

  redirect?: { name: string }

  props?: unknown
}


export interface AppRouteModule {

  layout: AppRouteRecordRaw;

  routes: AppRouteRecordRaw[];
}


export interface Menu extends RouteMeta {
  name?: string | symbol;

  title?: string

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

}


export interface FlatMenu {
  path: string

  name: string

  meta?: RouteMeta
}