import type { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '/@/enums/roleEnum';


export interface RouteMeta {

  // 标题
  title: string;

  // 忽略身份验证
  ignoreAuth?: boolean;

  // 角色信息
  roles?: RoleEnum[];

  // 是否不缓存
  ignoreKeepAlive?: boolean;

  // 菜单隐藏
  hideInMenu?: boolean
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta;
  children?: AppRouteRecordRaw[];
  props?: unknown;
}


export interface AppRouteModule {
  layout: AppRouteRecordRaw;
  routes: AppRouteRecordRaw[];
}


export interface Menu extends RouteMeta {
  name?: string | symbol;

  title: string

  icon?: string;

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

}