import { unref, computed } from 'vue'
import router from '/@/router';
import { tabStore, TabItem } from "/@/store/modules/tab";
import { PageEnum } from '/@/enums/pageEnum';

// 关闭
export function closeTab(closedTab: TabItem): void {
  const { currentRoute, replace } = router;

  // 当前tab列表
  const getTabsState = computed(() => {
    return tabStore.getTabsState;
  });

  const { name } = unref(currentRoute);
  // 关闭不是当前路由的标签
  if (closedTab.name !== name) {
    tabStore.commitCloseTab(closedTab);
    return
  }

  // 关闭的为当前路由的atb
  let toPageName = '';
  const index = unref(getTabsState).findIndex((item) => item.name === name);

  if (index === 0) {
    if (unref(getTabsState).length === 1) {
      toPageName = PageEnum.BASE_HOME;
    } else {
      //  跳转至右边tab
      const page = unref(getTabsState)[index + 1];
      const { name } = page;
      toPageName = name as string
    }
  } else {
    const page = unref(getTabsState)[index - 1];
    const { name } = page;
    toPageName = name as string
  }
  tabStore.commitCloseTab(closedTab);
  replace({ name: toPageName });
}