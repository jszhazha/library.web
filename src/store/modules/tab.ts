import store from '/@/store/index'
import { toRaw } from 'vue';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import { RouteMeta } from '/@/router/types'

export interface TabItem {
  // 完整路由
  fullPath?: string;
  // 路径
  path?: string;
  // 参数
  params?: unknown;
  // 参数
  query?: unknown;
  // 名称
  name?: string | symbol | null | undefined;
  // 参数
  meta?: RouteMeta;
}

const NAME = 'TAB'

@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Tab extends VuexModule {

  // 列表
  private tabsState: TabItem[] = [];

  // 路由改变
  private lastChangeRouteState: TabItem = {}


  get getTabsState(): TabItem[] {
    return this.tabsState
  }

  get getLastChangeRouteState(): TabItem {
    return this.lastChangeRouteState
  }

  // 添加
  @Mutation
  commitAddTab(route: TabItem): void {
    const { path, name, meta, fullPath, params, query } = route

    let updateIndex = -1;
    const hasTab = this.tabsState.some((tab, index) => {
      updateIndex = index
      return tab.name === name
    });
    if (hasTab) {
      const curTab = toRaw(this.tabsState)[updateIndex];
      if (!curTab) return
      curTab.params = params || curTab.params;
      curTab.query = query || curTab.query;
      this.tabsState.splice(updateIndex, 1, curTab);
      return
    }
    this.tabsState.push({ path, fullPath, name, meta, params, query });
  }

  @Mutation
  commitLastChangeRouteState(route: TabItem): void {
    this.lastChangeRouteState = route;
  }

  @Mutation
  commitCloseTab(route: TabItem): void {
    const { name, meta: { affix } = {} } = route;
    if (affix) return;
    const index = this.tabsState.findIndex((item) => item.name === name);
    index !== -1 && this.tabsState.splice(index, 1);
  }

}



export { Tab };
export const tabStore = getModule<Tab>(Tab)

