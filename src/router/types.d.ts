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

  // 固定在标签上
  affix?: boolean;

  // 图标选项卡
  icon?: string;

  // 跳转地址
  frameSrc?: string;

  // 外链路跳转地址
  externalLink?: string;

  // 当前页面过渡
  transitionName?: string;

  // 是否已动态添加路由
  hideBreadcrumb?: boolean;

  // 禁用重定向
  disabledRedirect?: boolean;

  // 关闭加载
  afterCloseLoading?: boolean;

  inTab?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: RouteMeta;
  component?: any;
  components?: any;
  children?: AppRouteRecordRaw[];
  props?: any;
}


export interface AppRouteModule {
  layout: AppRouteRecordRaw;
  routes: AppRouteRecordRaw[];
}