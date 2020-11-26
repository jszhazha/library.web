import type { AppRouteRecordRaw } from "/@/router/types";
import { defineComponent, computed, unref, watch, ref } from "vue";
import { useGo } from "/@/hooks/web/usePage";
import { tabStore, TabItem } from "/@/store/modules/tab";
import { Tabs, Dropdown, Menu } from "ant-design-vue";
import { closeTab, useCacheTabs, useTabDropdown } from "/@/hooks/web/useTab";
import { getActions } from "./tab.data";
import Icon from "/@/components/Icon";

import router from "/@/router";

export default defineComponent({
  setup() {
    let isAddAffix = false;
    // 当前激活标签
    const activeKey = ref<string>("");
    // 页面跳转
    const pageGo = useGo();

    // 当前tab列表;
    const getTabsState = computed(() => {
      return tabStore.getTabsState;
    });
    // 使用缓存
    const { setCacheTabs, readCacheTabs } = useCacheTabs();
    // 使用下拉菜单
    const { handelMenuClick } = useTabDropdown();
    // 设置缓存
    setCacheTabs();

    // 监听路由变化
    watch(
      () => tabStore.getLastChangeRouteState,
      (value) => {
        if (!isAddAffix) {
          addAffixTabs();
          isAddAffix = true;
        }
        const lastChangeRoute = unref(value);
        activeKey.value = value.name as string;
        tabStore.commitAddTab(lastChangeRoute);
      },
      { immediate: true }
    );

    // 添加过滤固定标签
    function filterAffixTabs(routes: AppRouteRecordRaw[]) {
      return routes.filter((route) => route.meta.affix);
    }
    /**
     * @description: 设置固定tabs
     */
    function addAffixTabs(): void {
      const affixTabs = filterAffixTabs((router.getRoutes() as unknown) as AppRouteRecordRaw[]);
      const cacheTabs = readCacheTabs();
      if (cacheTabs) {
        for (const tab of cacheTabs) {
          tabStore.commitAddTab(tab);
        }
      }
      for (const tab of affixTabs) {
        tabStore.commitAddTab(tab);
      }
    }

    // 查找数据
    function findItem(key: string): TabItem | undefined {
      return unref(getTabsState).find((item: TabItem) => item.name === key);
    }

    // 切换面板的回调
    function handleChange(key: string) {
      activeKey.value = key;
      const item = findItem(key);
      if (item) {
        pageGo(item as any, false);
      }
    }

    // 删除页签的回调
    function handleEdit(key: string) {
      const item = findItem(key);
      if (item) {
        closeTab(item);
      }
    }

    // 渲染标签
    function renderTabs() {
      return unref(getTabsState).map((item: TabItem) => {
        const key = item.name as string;
        return (
          <Tabs.TabPane key={key} closable={!item.meta!.affix}>
            {{
              tab: () => item.meta!.title,
            }}
          </Tabs.TabPane>
        );
      });
    }

    // 渲染菜单
    function renderMenu() {
      return getActions().map((el) => {
        return (
          <Menu.Item key={el.event}>
            {() => (
              <div class="p-1 index-middle">
                <Icon icon={el.icon!} />
                <span class="pl-3">{el.text}</span>
              </div>
            )}
          </Menu.Item>
        );
      });
    }

    // 渲染下拉菜单
    function readerDropdown() {
      return (
        <Dropdown>
          {{
            default: () => (
              <Icon
                icon="radix-icons:caret-down"
                class="default-dropdown-icon"
                size="20"
              />
            ),
            overlay: () => <Menu onClick={handelMenuClick}>{() => renderMenu()}</Menu>,
          }}
        </Dropdown>
      );
    }

    return () => (
      <div class="default-tabs">
        <Tabs
          type="editable-card"
          size="small"
          hideAdd={true}
          tabBarGutter={6}
          activeKey={unref(activeKey)}
          onChange={handleChange}
          onEdit={handleEdit}
        >
          {{ default: () => renderTabs(), tabBarExtraContent: () => readerDropdown() }}
        </Tabs>
      </div>
    );
  },
});
