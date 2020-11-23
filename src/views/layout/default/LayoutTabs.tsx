import type { AppRouteRecordRaw } from "/@/router/types";
import { defineComponent, computed, unref, watch, ref } from "vue";
import { useGo } from "/@/hooks/web/usePage";
import { tabStore, TabItem } from "/@/store/modules/tab";
import router from "/@/router";
import { Tabs } from "ant-design-vue";
import { closeTab } from "/@/hooks/web/useTab";

export default defineComponent({
  setup() {
    let isAddAffix = false;
    const activeKey = ref<string>("");
    const pageGo = useGo();

    // 当前tab列表;
    const getTabsState = computed(() => {
      return tabStore.getTabsState;
    });

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

    function filterAffixTabs(routes: AppRouteRecordRaw[]) {
      return routes.filter((route) => route.meta.affix);
    }
    /**
     * @description: 设置固定tabs
     */
    function addAffixTabs(): void {
      const affixTabs = filterAffixTabs(
        (router.getRoutes() as unknown) as AppRouteRecordRaw[]
      );
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
          {() => renderTabs()}
        </Tabs>
      </div>
    );
  },
});
