import { unref, computed } from 'vue'
import router from '/@/router'
import { tabStore, TabItem } from "/@/store/modules/tab"
import { PageEnum } from '/@/enums/pageEnum'
import { createStorage } from "/@/utils/storage/"
import { menuEnum } from '/@/enums/menuEnum'
import { useGo } from '/@/hooks/web/usePage'

// 关闭
export function closeTab(closedTab: TabItem): void {
  const { currentRoute, replace } = router

  // 当前tab列表
  const getTabsState = computed(() => {
    return tabStore.getTabsState
  })

  const { name } = unref(currentRoute)
  // 关闭不是当前路由的标签
  if (closedTab.name !== name) {
    tabStore.commitCloseTab(closedTab)
    return
  }

  // 关闭的为当前路由的atb
  let toPageName = ''
  const index = unref(getTabsState).findIndex((item) => item.name === name)

  if (index === 0) {
    if (unref(getTabsState).length === 1) {
      toPageName = PageEnum.BASE_HOME
    } else {
      //  跳转至右边tab
      const page = unref(getTabsState)[index + 1]
      const { name } = page
      toPageName = name as string
    }
  } else {
    const page = unref(getTabsState)[index - 1]
    const { name } = page
    toPageName = name as string
  }
  tabStore.commitCloseTab(closedTab)
  replace({ name: toPageName })
}


// 缓存数据
export function useCacheTabs(): { setCacheTabs: () => void, readCacheTabs: () => TabItem[] } {

  const storage = createStorage(localStorage)

  const key = 'openTabs'

  // 缓存数据
  function setCacheTabs(): void {
    window.addEventListener("beforeunload", () => {
      const openTabs = filterTabs(tabStore.getTabsState)
      storage.set(key, openTabs)
    })
  }
  // 添加过滤缓存标签
  function filterTabs(routes: TabItem[]) {
    return routes.filter((route) => !route.meta?.ignoreKeepAlive)
  }

  // 读取缓存数据
  function readCacheTabs(): TabItem[] {
    return storage.get(key) as TabItem[]
  }

  return { setCacheTabs, readCacheTabs }
}



export function useTabDropdown(): { handelMenuClick: ({ key }: { key: menuEnum }) => void } {

  const { currentRoute } = router

  const pageGo = useGo()

  function closeLeft(): void {
    tabStore.commitSliceCloseTab({ start: 0, end: unref(currentRoute) })
  }
  function closeRight(): void {
    tabStore.commitSliceCloseTab({ start: unref(currentRoute), startBase: 1 })
  }
  function closeAll(): void {
    tabStore.commitSliceCloseTab({ start: 0 })
    gotoPage()
  }

  // 关闭所有页面时，跳转页面
  function gotoPage() {
    const len = unref(tabStore.getTabsState).length
    const { name } = unref(currentRoute)

    let toPageName: PageEnum | string = PageEnum.BASE_HOME

    if (len > 0) {
      const page = unref(tabStore.getTabsState)[len - 1]
      const name = page.name as string
      if (name) {
        toPageName = name
      }
    }
    // 跳到当前页面报错
    name !== toPageName && pageGo({ name: toPageName }, true)
  }

  function handelMenuClick({ key }: { key: menuEnum }): void {
    switch (key) {
      // 关闭左侧
      case menuEnum.CLOSE_LEFT:
        closeLeft()
        break
      // 关闭右侧
      case menuEnum.CLOSE_RIGHT:
        closeRight()
        break
      // 关闭其他
      case menuEnum.CLOSE_OTHER:
        closeLeft()
        closeRight()
        break
      // 关闭全部
      case menuEnum.CLOSE_ALL:
        closeAll()
        break
      default:
        break

    }

  }
  return { handelMenuClick }

}
