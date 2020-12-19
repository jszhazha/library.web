import type { Menu as MenuType, AppRouteRecordRaw, FlatMenu } from '/@/router/types'
import { getRouteList } from '/@/router/routes/'
import { routerHasChildren } from '/@/utils/helper/route'


export function menuHasChildren(menuTreeItem: MenuType): boolean {
  return (
    Reflect.has(menuTreeItem, 'children') &&
    !!menuTreeItem.children &&
    menuTreeItem.children.some((el) => !el.hideInMenu)
  )
}

// 获取菜单
export function getMenus(): MenuType[] {
  const routeList = getRouteList()
  return getMenuItem(routeList)
}

// 获取深层扁平化菜单
export function getFlatMenus(): FlatMenu[] {
  const routeList = getRouteList()
  return flatMenus(routeList, '')
}

// 获取全部父级路由名称
export function getAllParentPathName(treeData: FlatMenu[], name: string): string[] {
  const menuList = findPathName(treeData, name)
  return menuList.map(el => el.name as string)
}

// 获取全部父级路由

export function getAllParentPath(treeData: FlatMenu[], name: string): FlatMenu[] {
  return findPathName(treeData, name)
}


function flatMenus(router: AppRouteRecordRaw[], parentPath = ''): FlatMenu[] {
  let result: FlatMenu[] = []
  router.forEach((el) => {
    const currPath = `${parentPath}/${el.path}`.replace(/[/]{2,}/, '/')
    result.push({ name: el.name as string, path: currPath, meta: el.meta })
    if (routerHasChildren(el)) {
      result = result.concat(flatMenus(el.children!, currPath))
    }
  })
  return result
}


function getMenuItem(menus: AppRouteRecordRaw[], parentPath = ''): MenuType[] {
  return menus.map((el: AppRouteRecordRaw) => {
    const { path, name, meta } = el
    const currPath = `${parentPath}/${path}`.replace(/[/]{2,}/, '/')
    const item: MenuType = { path: currPath, name, ...meta }
    if (routerHasChildren(el)) {
      item.children = getMenuItem(el.children!, currPath)
    }
    return item
  })
}


function findPathName(tree: FlatMenu[], name: string) {
  return tree.filter((el) => new RegExp(el.name).test(name))
}

