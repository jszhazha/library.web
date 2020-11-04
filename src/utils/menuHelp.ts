import type { Menu as MenuType, AppRouteRecordRaw } from '/@/router/types';
import { getRouteList } from '/@/router/routes/'


export function menuHasChildren(menuTreeItem: MenuType): boolean {
  return (
    Reflect.has(menuTreeItem, 'children') &&
    !!menuTreeItem.children &&
    menuTreeItem.children.length > 0
  );
}

function getMenuItem(menus: AppRouteRecordRaw[], parentPath = ''): MenuType[] {
  return menus.map((el: AppRouteRecordRaw) => {
    const { path, name, meta } = el
    const currPath = `${parentPath}/${path}`.replace(/[/]{2,}/, '/')
    const item: MenuType = { path: currPath, name, ...meta }
    if (el.children) {
      item.children = getMenuItem(el.children, currPath)
    }
    return item
  })
}

// 获取菜单
export function getMenus(): MenuType[] {
  const routeList = getRouteList()
  return getMenuItem(routeList)
}
